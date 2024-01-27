const { DateTime } = require("luxon");
const sass = require("sass");
const path = require("node:path");

module.exports = function(eleventyConfig) {
    // Filters
	eleventyConfig.addFilter("readableDate", (dateObj, format, zone) => {
		// Formatting tokens for Luxon: https://moment.github.io/luxon/#/formatting?id=table-of-tokens
		return DateTime.fromJSDate(dateObj, { zone: zone || "utc" }).toFormat(format || "dd LLLL yyyy");
	});

	eleventyConfig.addFilter('htmlDateString', (dateObj) => {
		// dateObj input: https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
		return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat('yyyy-LL-dd');
	});
    
    // copy .js files
    eleventyConfig.addPassthroughCopy("views/js");

    // .scss processing
    eleventyConfig.addTemplateFormats("scss");
    eleventyConfig.addExtension("scss", {
        outputFileExtension: "css",
        compile: function(inputContent, inputPath) {
            let parsed = path.parse(inputPath);
            let result = sass.compileString(inputContent, {
                loadPaths: [
                    parsed.dir || ".",
                    this.config.dir.includes
                ],
                style: "compressed"
            });
            return (data) => {
                return result.css;
            }
        }
    });

    // move input to /views
    return {
        dir: {
            input: "views"
        }
    }
};
