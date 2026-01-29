const { Client } = require("@notionhq/client");
const { NotionToMarkdown } = require("notion-to-md");
const fs = require("fs");
const path = require("path");

// 配置
const NOTION_TOKEN = process.env.NOTION_TOKEN;
const PARENT_PAGE_ID = process.env.NOTION_PAGE_ID || "1ec6986a999a8071abb7df8146edc75c";
const CONTENT_DIR = path.join(__dirname, "../content/post");

// 初始化 Notion 客户端
const notion = new Client({ auth: NOTION_TOKEN });
const n2m = new NotionToMarkdown({ notionClient: notion });

// 获取已存在的文章标题（避免重复）
function getExistingPosts() {
  const existing = new Set();

  if (!fs.existsSync(CONTENT_DIR)) {
    return existing;
  }

  const dirs = fs.readdirSync(CONTENT_DIR, { withFileTypes: true });
  for (const dir of dirs) {
    if (dir.isDirectory()) {
      const indexPath = path.join(CONTENT_DIR, dir.name, "index.md");
      if (fs.existsSync(indexPath)) {
        const content = fs.readFileSync(indexPath, "utf-8");
        const titleMatch = content.match(/^title:\s*["']?(.+?)["']?\s*$/m);
        if (titleMatch) {
          existing.add(titleMatch[1].trim());
        }
      }
    }
  }

  return existing;
}

// 生成 URL 友好的 slug
function generateSlug(title) {
  // 简单处理：使用时间戳 + 标题拼音首字母或英文
  const date = new Date().toISOString().slice(0, 10);
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 50);
  return `${date}-${slug || "post"}`;
}

// 获取子页面列表
async function getChildPages(parentId) {
  const children = [];
  let cursor = undefined;

  do {
    const response = await notion.blocks.children.list({
      block_id: parentId,
      start_cursor: cursor,
      page_size: 100,
    });

    for (const block of response.results) {
      if (block.type === "child_page") {
        children.push({
          id: block.id,
          title: block.child_page.title,
        });
      }
    }

    cursor = response.has_more ? response.next_cursor : undefined;
  } while (cursor);

  return children;
}

// 获取页面属性
async function getPageProperties(pageId) {
  const page = await notion.pages.retrieve({ page_id: pageId });
  return {
    createdTime: page.created_time,
    lastEditedTime: page.last_edited_time,
  };
}

// 转换单个页面为 Markdown
async function convertPageToMarkdown(pageId, title) {
  const mdBlocks = await n2m.pageToMarkdown(pageId);
  const mdString = n2m.toMarkdownString(mdBlocks);
  return mdString.parent || mdString;
}

// 创建 Hugo 文章
function createHugoPost(title, content, properties) {
  const slug = generateSlug(title);
  const postDir = path.join(CONTENT_DIR, slug);

  // 创建文章目录
  if (!fs.existsSync(postDir)) {
    fs.mkdirSync(postDir, { recursive: true });
  }

  // 生成 front matter
  const date = new Date(properties.createdTime).toISOString();
  const frontMatter = `---
title: "${title.replace(/"/g, '\\"')}"
description: ""
date: ${date}
image: ""
categories:
  -
tags:
  -
---

`;

  // 写入文件
  const filePath = path.join(postDir, "index.md");
  fs.writeFileSync(filePath, frontMatter + content, "utf-8");

  console.log(`✅ Created: ${slug}/index.md`);
  return slug;
}

// 主函数
async function main() {
  if (!NOTION_TOKEN) {
    console.error("❌ NOTION_TOKEN is required");
    process.exit(1);
  }

  console.log("🔄 Starting Notion sync...");
  console.log(`📁 Content directory: ${CONTENT_DIR}`);

  // 获取已存在的文章
  const existingPosts = getExistingPosts();
  console.log(`📝 Found ${existingPosts.size} existing posts`);

  // 获取 Notion 子页面
  const childPages = await getChildPages(PARENT_PAGE_ID);
  console.log(`📄 Found ${childPages.length} pages in Notion`);

  let newCount = 0;
  let skipCount = 0;

  for (const page of childPages) {
    // 检查是否已存在
    if (existingPosts.has(page.title)) {
      console.log(`⏭️  Skipped (exists): ${page.title}`);
      skipCount++;
      continue;
    }

    try {
      // 获取页面属性
      const properties = await getPageProperties(page.id);

      // 转换为 Markdown
      const markdown = await convertPageToMarkdown(page.id, page.title);

      // 创建 Hugo 文章
      createHugoPost(page.title, markdown, properties);
      newCount++;
    } catch (error) {
      console.error(`❌ Error processing "${page.title}":`, error.message);
    }
  }

  console.log(`\n✨ Sync complete!`);
  console.log(`   - New posts: ${newCount}`);
  console.log(`   - Skipped: ${skipCount}`);
}

main().catch(console.error);
