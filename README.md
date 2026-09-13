# seangreaves.xyz

Single-page personal site, built with Jekyll and deployed to GitHub Pages on every push to `master`.

- `index.html` — the page: bio, then a scroll-snap carousel of project covers generated from `_projects/*.md` front matter (`title`, `year`, `carousel_image`, optional `link`).
- `images/carousel/` — 1400px JPEG copies of the project covers used by the carousel; originals stay under `images/projects/`.
- `api/projects.json` — static export of the full project write-ups, kept for anything that links to it.

Build locally with `bundle install --path vendor/bundle && bundle exec jekyll serve`, then open http://127.0.0.1:4000.
