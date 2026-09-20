# ISM Documentation Maintenance

The ISM material is historical development documentation for the Five-Finger Tendon-Driven Robotic Hand project. Its canonical pages and media are owned by the project rather than by repository-level archive directories.

The main entry points are:

- `/projects/robotic-hand.html#development-archive`
- `/projects/robotic-hand/ism/index.html`

## Directory structure

```text
projects/robotic-hand/ism/
├── index.html
├── ism-1/
│   ├── blogs.html
│   ├── original-work.html
│   ├── final-product.html
│   ├── research-articles.html
│   └── research-interviews.html
└── ism-2/
    ├── blogs.html
    ├── original-work.html
    ├── final-product.html
    ├── research-articles.html
    └── research-interviews.html
```

## Removed legacy locations

The former root pages (`/blogs.html`, `/original-work.html`, `/final-product.html`, `/research-articles.html`, and `/research-interviews.html`) and the corresponding `/ism-1/` pages were intentionally removed. The intermediate `archive/ism/` structure was also removed after its complete content moved under the project.

There are no compatibility pages or hosting redirects for those URLs. Do not recreate root aliases or duplicate maintained versions; link directly to `projects/robotic-hand/ism/`.

## Shared documentation navigation

Documentation navigation is delivered directly in each canonical static HTML file between marked generated-region comments. Its single definition and explicit page/year mapping live in `scripts/sync-ism-archive-nav.js`.

After changing the archive navigation definition, synchronize all ten pages:

```sh
node scripts/sync-ism-archive-nav.js
```

Check for drift without writing files:

```sh
node scripts/sync-ism-archive-nav.js --check
```

The synchronizer is limited to the generated navigation regions in the ten canonical documentation pages. It does not rewrite historical content.

## Media mappings

| Previous locations | Project-owned location |
| --- | --- |
| `images/ism-1/`, then `images/archive/ism/ism-1/` | `images/projects/robotic-hand/ism/ism-1/` |
| `images/ism-2/`, then `images/archive/ism/ism-2/` | `images/projects/robotic-hand/ism/ism-2/` |

Each year retains its original `original-work/` and `final-product/` subfolders. Preserve filenames, extensions, comments, and bytes, including:

- `images/projects/robotic-hand/ism/ism-1/original-work/Halway Culred Finger.png`
- `images/projects/robotic-hand/ism/ism-1/final-product/Side View Robotic Finger.png`

The former media locations are absent, and duplicate binary compatibility copies are intentionally not retained. All maintained HTML and fallbacks must use the project-owned paths.

## Known issues and deferred work

- Google Docs embeds and direct links may require authentication or restrict embedding. Preserve their existing URLs and permissions.
- `images/projects/robotic-hand/ism/ism-2/final-product/Hand Flexion.mov` is a QuickTime movie, while its historical `<source>` declaration uses `video/mp4`. Preserve the original file and declaration until a later media-transcoding pass.
- The commented-out legacy favicon reference points to an absent relative `images/favicon.png`; active favicon references resolve correctly.
- Root-relative URLs are the site's established routing convention. No repository-local deployment configuration, redirect file, or build system defines a subpath deployment.
- Dedicated cover and gallery media directly under `images/projects/robotic-hand/` remains separate deferred portfolio work; do not substitute or transcode ISM media during routine navigation maintenance.
