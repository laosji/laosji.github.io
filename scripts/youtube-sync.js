const https = require('https');
const fs = require('fs');
const path = require('path');

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID;
const CONTENT_DIR = path.join(__dirname, '..', 'content', 'post');
const MAX_RESULTS = 10;

function httpsGet(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        if (res.statusCode !== 200) {
          reject(new Error(`HTTP ${res.statusCode}: ${data}`));
        } else {
          resolve(JSON.parse(data));
        }
      });
    }).on('error', reject);
  });
}

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (res) => {
      if (res.statusCode === 302 || res.statusCode === 301) {
        file.close();
        fs.unlinkSync(dest);
        return downloadFile(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        file.close();
        fs.unlinkSync(dest);
        return reject(new Error(`Download failed: ${res.statusCode}`));
      }
      res.pipe(file);
      file.on('finish', () => { file.close(); resolve(); });
    }).on('error', (err) => {
      fs.unlinkSync(dest);
      reject(err);
    });
  });
}

// Get all existing youtube_id values from content posts
function getExistingVideoIds() {
  const ids = new Set();
  if (!fs.existsSync(CONTENT_DIR)) return ids;

  const dirs = fs.readdirSync(CONTENT_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);

  for (const dir of dirs) {
    const mdPath = path.join(CONTENT_DIR, dir, 'index.md');
    if (!fs.existsSync(mdPath)) continue;
    const content = fs.readFileSync(mdPath, 'utf-8');
    const match = content.match(/youtube_id:\s*["']?([a-zA-Z0-9_-]{11})["']?/);
    if (match) ids.add(match[1]);
  }
  return ids;
}

// Slugify title for directory name
function slugify(title) {
  return title
    .toLowerCase()
    .replace(/[^\w\u4e00-\u9fff\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .substring(0, 60);
}

// Create Hugo content post for a video
async function createVideoPost(video) {
  const videoId = video.snippet.resourceId
    ? video.snippet.resourceId.videoId
    : video.id.videoId || video.id;

  const title = video.snippet.title.replace(/"/g, '\\"');
  const description = (video.snippet.description || '')
    .split('\n')[0]
    .replace(/"/g, '\\"')
    .substring(0, 200);
  const publishedAt = video.snippet.publishedAt;
  const tags = extractTags(video.snippet.title, video.snippet.description);

  const slug = slugify(video.snippet.title) || `youtube-${videoId}`;
  const postDir = path.join(CONTENT_DIR, slug);

  if (fs.existsSync(postDir)) {
    // Append videoId to make unique
    const postDirUnique = `${postDir}-${videoId}`;
    if (fs.existsSync(postDirUnique)) return null;
    fs.mkdirSync(postDirUnique, { recursive: true });
    return await writePost(postDirUnique, videoId, title, description, publishedAt, tags);
  }

  fs.mkdirSync(postDir, { recursive: true });
  return await writePost(postDir, videoId, title, description, publishedAt, tags);
}

async function writePost(postDir, videoId, title, description, publishedAt, tags) {
  // Download thumbnail
  const thumbUrls = [
    `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
    `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
  ];

  let thumbDownloaded = false;
  for (const url of thumbUrls) {
    try {
      await downloadFile(url, path.join(postDir, 'image.jpg'));
      thumbDownloaded = true;
      break;
    } catch (e) {
      // try next
    }
  }

  const tagsYaml = tags.length > 0
    ? '\ntags:\n' + tags.map((t) => `  - ${t}`).join('\n')
    : '';

  const frontmatter = `---
title: "${title}"
description: "${description}"
date: ${publishedAt}
${thumbDownloaded ? 'image: image.jpg' : ''}
categories:
  - 视频
${tagsYaml ? tagsYaml : ''}
draft: false
hidden: false
comments: true
video: true
youtube_id: "${videoId}"
---

{{< youtube ${videoId} >}}
`;

  fs.writeFileSync(path.join(postDir, 'index.md'), frontmatter, 'utf-8');
  console.log(`Created: ${path.basename(postDir)} (${videoId})`);
  return postDir;
}

// Extract simple tags from title and description
function extractTags(title, description) {
  const text = `${title} ${description}`.toLowerCase();
  const tagMap = {
    '券商': '券商', '证券': '证券', '开户': '开户',
    '银行': '银行', 'wise': 'Wise', 'revolut': 'Revolut',
    '加密': '加密货币', 'crypto': '加密货币', 'bitcoin': 'Bitcoin',
    'usdt': 'USDT', '汇款': '汇款', '转账': '转账',
    'u卡': 'U卡', '虚拟卡': '虚拟卡', 'youtube': 'YouTube',
    '港股': '港股', '美股': '美股', '基金': '基金',
    '信用卡': '信用卡', '香港': '香港', '新加坡': '新加坡',
  };
  const tags = [];
  for (const [keyword, tag] of Object.entries(tagMap)) {
    if (text.includes(keyword) && !tags.includes(tag)) {
      tags.push(tag);
    }
  }
  return tags.slice(0, 5);
}

async function main() {
  if (!YOUTUBE_API_KEY) {
    console.error('Error: YOUTUBE_API_KEY is not set');
    process.exit(1);
  }
  if (!CHANNEL_ID) {
    console.error('Error: YOUTUBE_CHANNEL_ID is not set');
    process.exit(1);
  }

  console.log('Fetching channel uploads playlist...');

  // Get uploads playlist ID
  const channelUrl = `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${CHANNEL_ID}&key=${YOUTUBE_API_KEY}`;
  const channelData = await httpsGet(channelUrl);

  if (!channelData.items || channelData.items.length === 0) {
    console.error('Channel not found:', CHANNEL_ID);
    process.exit(1);
  }

  const uploadsPlaylistId = channelData.items[0].contentDetails.relatedPlaylists.uploads;
  console.log('Uploads playlist:', uploadsPlaylistId);

  // Get latest videos from uploads playlist
  const playlistUrl = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${uploadsPlaylistId}&maxResults=${MAX_RESULTS}&order=date&key=${YOUTUBE_API_KEY}`;
  const playlistData = await httpsGet(playlistUrl);

  if (!playlistData.items || playlistData.items.length === 0) {
    console.log('No videos found');
    return;
  }

  console.log(`Found ${playlistData.items.length} videos from channel`);

  // Check existing
  const existingIds = getExistingVideoIds();
  console.log(`Existing video posts: ${existingIds.size}`);

  const newVideos = playlistData.items.filter((item) => {
    const vid = item.snippet.resourceId.videoId;
    return !existingIds.has(vid);
  });

  if (newVideos.length === 0) {
    console.log('No new videos to sync');
    return;
  }

  console.log(`Syncing ${newVideos.length} new video(s)...`);

  let created = 0;
  for (const video of newVideos) {
    try {
      const result = await createVideoPost(video);
      if (result) created++;
    } catch (err) {
      console.error(`Failed to create post for ${video.snippet.title}:`, err.message);
    }
  }

  console.log(`Done! Created ${created} new video post(s)`);
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
