const yaml = require("js-yaml");

module.exports = function (eleventyConfig) {
	eleventyConfig.addDataExtension("yaml,yml", (contents) => yaml.load(contents));

	eleventyConfig.addFilter("findByCode", (list, code) => list.find((item) => item.code === code));
	eleventyConfig.addFilter("exceptCode", (list, code) => list.filter((item) => item.code !== code));

	// Shared static assets referenced by every locale.
	eleventyConfig.addPassthroughCopy("CNAME");
	eleventyConfig.addPassthroughCopy("*.{png,jpg,jpeg,svg,webp,gif,ico}");
	eleventyConfig.addPassthroughCopy("emoji");
	eleventyConfig.addPassthroughCopy("src/styles.css");
	eleventyConfig.addPassthroughCopy("src/script.js");

	return {
		dir: {
			input: "src",
			output: "_site",
			data: "_data",
		},
		templateFormats: ["njk"],
		htmlTemplateEngine: "njk",
		markdownTemplateEngine: "njk",
	};
};
