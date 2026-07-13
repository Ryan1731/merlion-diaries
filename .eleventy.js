const { DateTime } = require("luxon");

module.exports = function (eleventyConfig) {
  // Copy static assets and the CMS admin folder straight through to the output
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("admin");

  // Human-friendly date, e.g. "May 12, 2024"
  eleventyConfig.addFilter("readableDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat("LLL d, yyyy");
  });

  // Turn a tags array into a lowercase space-separated string for data-tags="..."
  eleventyConfig.addFilter("tagList", (tags) => {
    return (tags || []).join(" ").toLowerCase();
  });

  // Collect every unique tag used across all posts, sorted alphabetically
  eleventyConfig.addFilter("uniqueTags", (posts) => {
    const set = new Set();
    (posts || []).forEach((p) => (p.data.tags || []).forEach((t) => set.add(t)));
    return [...set].sort();
  });

  eleventyConfig.addGlobalData("buildYear", () => new Date().getFullYear());

  // All markdown files in src/posts become the "posts" collection
  eleventyConfig.addCollection("posts", (collectionApi) => {
    return collectionApi.getFilteredByGlob("src/posts/*.md").sort((a, b) => {
      return b.date - a.date;
    });
  });

  return {
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "_site",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
};
