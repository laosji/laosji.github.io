<!-- Copied/created by AI assistant to help coding agents be productive in this repo -->
# Copilot / AI Agent Instructions — laosji.github.io

Purpose: Short, actionable notes to help an AI coding agent become productive working on this Hugo-based blog.

Big picture
- This repository is a Hugo site using the `hugo-theme-stack` theme as a module (`config/_default/module.toml`).
- Source content and templates live under `content/`, `layouts/`, `assets/`, and `config/`. Many HTML files exist at the repo root and in `p/` — these are pre-built/generated HTML and should not be edited unless intentionally changing generated output.

Key directories & files (use these as your primary editing surface)
- `content/` — markdown pages and posts (e.g. `content/post/`).
- `archetypes ` — NOTE: directory name contains a trailing space (`archetypes `). Use this exact path when reading archetypes. Contains `default.md` (front-matter template) and other archetypes.
- `layouts/` — Hugo templates and partials. Look here to change page structure.
- `assets/` and `scss/` — scss and other assets processed by Hugo Pipes.
- `config/_default/config.toml` — main site configuration (baseurl, theme import, params).
- `config/_default/module.toml` — theme module import (`github.com/CaiJimmy/hugo-theme-stack/v3`).
- `.github/workflows/` — CI workflows: `deploy.yml` and `update-theme.yml` (automatic deploy and theme updates).

Developer workflows (commands & tasks)
- Run local dev server (watch drafts):
  - `hugo server -D`
  - VS Code Tasks: label `Serve Drafts` runs the same command.
- Build production HTML (minified):
  - `hugo --minify`
  - VS Code Tasks: label `Build` runs `hugo --minify`.
- Update theme module (when bumping theme):
  - `hugo mod get -u github.com/CaiJimmy/hugo-theme-stack/v3`
  - `hugo mod tidy`
  - Then commit `go.sum`/`go.mod` and any changed module files.

Project-specific conventions & patterns
- Front-matter: archetypes show the canonical keys. Example from `archetypes /default.md`:

```yaml
---
title: "你的文章标题"
description:
date: 2025-04-13T14:15:57Z
image:
categories: ["金融", "生活指南"]
tags: ["香港", "信用卡"]
draft: false
---
```

- Main sections: `post` and `micro` (see `config/_default/config.toml` `params.mainSections`). `micro` is used for short micro-blogs (280 chars). Keep `micro` front-matter and limits consistent with `config` (`params.microblog`).
- Widgets & params are configured in `config/_default/config.toml` (for example `params.sidebar` and `params.widgets`). When changing UI behavior prefer editing `params.*` rather than theme code unless necessary.
- Avoid editing generated HTML files at repo root or `p/` — prefer editing source Markdown, templates, or config and rebuilding.

Integration points & external dependencies
- Theme: `github.com/CaiJimmy/hugo-theme-stack/v3` (Hugo module). Manage via `hugo mod` commands.
- CI: GitHub Actions in `.github/workflows/` handle deployment and a daily theme update.
- Static assets: `static/` is for files served as-is (images, QR codes referenced by `config`), while `assets/` is for pipeline-processed resources.

Notes & gotchas for agents
- Directory name quirk: `archetypes ` (with trailing space). Many code search tools will miss it if you search for `archetypes` without the space. Use repo listing or exact path when reading archetypes.
- The repo includes pre-built output (HTML files). Do not change `index.html` at root or files under `p/` unless you intend to change built output; instead change `content/`, `layouts/`, or `config/` and run `hugo --minify`.
- When adding a new post, create `content/post/<slug>.md` (or a folder with `index.md`)—use the archetype front-matter as a template.

Example — add a new post and preview locally
1. Create `content/post/2025-xx-new-post.md` with front-matter following `archetypes /default.md`.
2. Run `hugo server -D` and open the local preview.

If you need more context
- Inspect `layouts/` for template structure and `layouts/partials/` for repeated components.
- Check `config/_default/` files (`params.toml`, `markup.toml`) for rendering behavior and shortcode configs.

If anything above is unclear or you'd like the instructions tailored (e.g., commit/check CI flow, or tests added), tell me what to expand.
