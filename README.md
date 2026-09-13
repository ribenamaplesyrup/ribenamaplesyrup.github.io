# seangreaves.xyz

Single-page personal site, built with Jekyll and deployed to GitHub Pages on every push to `master`.

- `index.html` — the page: bio, then a scroll-snap strip of project images read from `_data/carousel.yml`.
- `tools/approved-images.txt` — the images allowed in the strip, one path per line. `tools/build_carousel.py` regenerates the data file and JPEGs from it, taking each slide's title, year and `link` from the project's front matter. Rerun it after editing the list.
- `images/carousel/` — generated 800px-tall JPEG copies at native aspect ratio; originals stay under `images/projects/`.
- `api/projects.json` — static export of the full project write-ups, kept for anything that links to it.

Build locally with `bundle install --path vendor/bundle && bundle exec jekyll serve`, then open http://127.0.0.1:4000.
