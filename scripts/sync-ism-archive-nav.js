#!/usr/bin/env node

"use strict";

const fs = require("fs");
const path = require("path");

const repositoryRoot = path.resolve(__dirname, "..");
const startMarker = "<!-- BEGIN GENERATED ISM ARCHIVE NAV -->";
const endMarker = "<!-- END GENERATED ISM ARCHIVE NAV -->";

const pageTypes = [
  { key: "blogs", label: "Development Blogs" },
  { key: "original-work", label: "Original Work" },
  { key: "final-product", label: "Final Product" },
  { key: "research-articles", label: "Research Articles" },
  { key: "research-interviews", label: "Research Interviews" },
];

const archivePages = [1, 2].flatMap((year) =>
  pageTypes.map((pageType) => ({
    ...pageType,
    year,
    file: `projects/robotic-hand/ism/ism-${year}/${pageType.key}.html`,
    href: `/projects/robotic-hand/ism/ism-${year}/${pageType.key}.html`,
  }))
);

function renderArchiveNavigation(currentPage) {
  const currentYearPages = archivePages.filter(
    (page) => page.year === currentPage.year
  );
  const correspondingPage = archivePages.find(
    (page) =>
      page.year !== currentPage.year && page.key === currentPage.key
  );

  const pageLinks = currentYearPages
    .map((page) => {
      const currentAttribute =
        page.file === currentPage.file ? ' aria-current="page"' : "";
      return `                    <li><a href="${page.href}"${currentAttribute}>${page.label}</a></li>`;
    })
    .join("\n");

  return `${startMarker}
    <nav class="ism-archive-nav" aria-label="ISM ${currentPage.year} documentation navigation">
        <div class="container">
            <div class="ism-archive-nav-heading">
                <p class="project-eyebrow">Historical Project Documentation</p>
                <p><strong>ISM ${currentPage.year} Documentation</strong></p>
            </div>
            <div class="ism-archive-utility-links">
                <a href="/projects/robotic-hand.html">&larr; Back to Robotic Hand Project</a>
                <a href="/projects/robotic-hand/ism/index.html">Documentation Index</a>
            </div>
            <p class="ism-archive-nav-label">ISM ${currentPage.year} documentation pages</p>
            <ul class="ism-archive-page-links">
${pageLinks}
            </ul>
            <a class="ism-archive-year-switch" href="${correspondingPage.href}">View corresponding ISM ${correspondingPage.year} ${correspondingPage.label}</a>
        </div>
    </nav>
    ${endMarker}`;
}

function synchronizePage(page, checkOnly) {
  const filePath = path.join(repositoryRoot, page.file);
  const content = fs.readFileSync(filePath, "utf8");
  const startIndex = content.indexOf(startMarker);
  const endIndex = content.indexOf(endMarker);

  if (
    startIndex === -1 ||
    endIndex === -1 ||
    content.indexOf(startMarker, startIndex + startMarker.length) !== -1 ||
    content.indexOf(endMarker, endIndex + endMarker.length) !== -1 ||
    endIndex < startIndex
  ) {
    throw new Error(`${page.file}: expected exactly one generated navigation region`);
  }

  const regionEnd = endIndex + endMarker.length;
  const currentRegion = content.slice(startIndex, regionEnd);
  const expectedRegion = renderArchiveNavigation(page);

  if (currentRegion === expectedRegion) {
    return false;
  }

  if (!checkOnly) {
    const updatedContent =
      content.slice(0, startIndex) +
      expectedRegion +
      content.slice(regionEnd);
    fs.writeFileSync(filePath, updatedContent, "utf8");
  }

  return true;
}

const argumentsSet = new Set(process.argv.slice(2));
const allowedArguments = new Set(["--check"]);
const unknownArguments = [...argumentsSet].filter(
  (argument) => !allowedArguments.has(argument)
);

if (unknownArguments.length) {
  process.stderr.write(
    `Unknown argument${unknownArguments.length === 1 ? "" : "s"}: ${unknownArguments.join(", ")}\n`
  );
  process.exit(2);
}

const checkOnly = argumentsSet.has("--check");
const changedPages = [];

try {
  for (const page of archivePages) {
    if (synchronizePage(page, checkOnly)) {
      changedPages.push(page.file);
    }
  }
} catch (error) {
  process.stderr.write(`${error.message}\n`);
  process.exit(1);
}

if (checkOnly && changedPages.length) {
  process.stderr.write(
    `ISM archive navigation drift detected in:\n${changedPages
      .map((file) => `- ${file}`)
      .join("\n")}\n`
  );
  process.exit(1);
}

if (checkOnly) {
  process.stdout.write("ISM archive navigation is synchronized.\n");
} else if (changedPages.length) {
  process.stdout.write(
    `Updated ISM archive navigation in ${changedPages.length} page${changedPages.length === 1 ? "" : "s"}.\n`
  );
} else {
  process.stdout.write("ISM archive navigation was already synchronized.\n");
}
