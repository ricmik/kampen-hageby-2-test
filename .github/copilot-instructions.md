# Copilot instructions for Kampen Hageby 2

This repository is a Jekyll/GitHub Pages site for Sameiet Kampen Hageby 2. The content is primarily Markdown, the visual design is in `_layouts/`, `_includes/`, and `styles.css`, and the site is published from the repository root.

**Non-technical editors are a core requirement.** Every change must keep the site straightforward for non-technical people to maintain. Preserve and support WYSIWYG editing through Pages CMS or a similar visual content editor wherever practical. Avoid workflows that require editors to write HTML, CSS, or complex Markdown; when adding or changing editable content, keep the relevant Pages CMS configuration in `.pages.yml` aligned with the content structure. Do not make changes that silently remove or break visual editing without an explicit requirement.

## Build, test, and validation commands

This repo does not define a Node or Python test suite, package scripts, or lint configuration. The effective validation step is a Jekyll site build.

```bash
# Install Ruby/Jekyll dependencies if needed
bundle install

# Validate the site builds cleanly
bundle exec jekyll build

# Local preview while editing
bundle exec jekyll serve --livereload
```

There is no dedicated per-file test target or lint command in this repository. When changing content or layout, prefer a full Jekyll build to catch broken front matter, missing files, or invalid Markdown rendering.

## High-level architecture

- `index.md` is the landing page.
- `retningslinjer.md`, `dokumenter.md`, and `leverandorer.md` are static content pages.
- `_posts/` holds news posts; filenames follow the pattern `YYYY-MM-DD-short-title.md` and are sorted newest-first.
- `_layouts/` and `_includes/` define the page templates used by Jekyll.
- `assets/` contains images and other static media.
- `filer/` stores uploaded PDFs and other downloadable documents.
- `_config.yml` contains the Jekyll configuration, default page metadata, and permalink rules.
- `.pages.yml` configures the Pages CMS editor and maps CMS content to repository files and output paths.

The repository is intentionally content-first: most changes are Markdown edits, not HTML or CSS work. If a page is added or edited, check whether it should also be reflected in `_config.yml` defaults and the Pages CMS configuration in `.pages.yml`. Keep those content patterns manageable both for direct Markdown editing and for the visual editor.

## Key conventions and repo-specific patterns

- Publication workflow is GitHub Pages-based; site content is designed to be editable directly in Markdown and through Pages CMS (or a similar WYSIWYG editor) for non-technical editors. Preserve this dual editing workflow.
- Page content is localized to Norwegian (`nb`) with labels and guidance in Norwegian; preserve that language and tone unless the task explicitly changes the content scope.
- Do not add a `.nojekyll` file unless the site deployment explicitly requires it; the README notes that this project is expected to be built by GitHub Pages/Jekyll.
- Public-facing files should not contain personal data, unpublished decisions, or private documents. This repository is intended to be public and is served via GitHub Pages.
- For news items, use the `_posts/` front matter pattern already used by existing posts: `title`, `date`, `category`, `summary`, and Markdown body content.
- For document links, keep paths relative to the site root and use the public URL format described in the README, for example linking PDF files stored under `filer/`.
- When changing site behavior or base URLs, verify the `baseurl` setting in `_config.yml` and the corresponding `output` paths in `.pages.yml` remain consistent for the target deployment.
- Use only Jekyll-native, auto-generated components for any site feature that depends on content updates. Search, navigation, and similar features must be generated from the site content during the Jekyll build or by static content files already in the repository; do not add custom scripts or maintenance tasks that require humans to keep a separate index, database, or script up to date.

## Content and publishing notes

- The README explains the preferred content workflow for non-developers: direct Markdown edits and optional Pages CMS editing.
- Pages CMS writes directly to the repository; it is optional, but visual editing support is an important usability requirement. Keep `.pages.yml` aligned with the site’s editable content and avoid structures that make WYSIWYG editing impractical.
- Images and uploaded PDFs must have clear publishing rights before being added to `assets/` or `filer/`.

## Practical guidance for future sessions

- If a task is simply “update the content on the site,” prefer the existing Markdown files and front matter conventions over creating new templates or custom HTML. For new or changed editor-facing content, ensure it remains easy to edit with Pages CMS or a comparable WYSIWYG tool.
- If a task affects the site structure, check both `_config.yml` and `.pages.yml` before editing content, because they define page routing and CMS-backed content fields.
- Treat the repo as a static content platform rather than a full app framework: builds are simple, tests are minimal or absent, and correctness is validated by a Jekyll build plus a quick review of rendered Markdown output.
