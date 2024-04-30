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

    const urlPattern = new RegExp(/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi);
    eleventyConfig.addFilter('isLink', (linkStr) => {
        return urlPattern.test(linkStr);
    });

    eleventyConfig.addFilter('breadcrumbs', (linkStr) => {
        const segments = linkStr.split('/').filter(segment => segment !== '');
        
        let currentPath = '/';
        const result = [];

        for (const segment of segments) {
            currentPath += `${segment}/`;
            result.push([segment, currentPath]);
        }

        return result;
    });
    
    // copy public files
    eleventyConfig.addPassthroughCopy("public");

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
