const { DateTime } = require("luxon");
// const sass = require("sass");
// const path = require("node:path");
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");


module.exports = function (eleventyConfig) {
    // Tags
    function filterTagList(tags) {
        return (tags || []).filter(tag => ["all", "nav"].indexOf(tag) === -1);
    }  // ?
    eleventyConfig.setDataDeepMerge(true);

    function filterTagList(tags) {
        return (tags || []).filter(tag => ["all", "nav", "post", "posts"].indexOf(tag) === -1);
    }

    eleventyConfig.addFilter("filterTagList", filterTagList)

    eleventyConfig.addCollection("tagList", collection => {
        const tagsObject = {}
        collection.getAll().forEach(item => {
            if (!item.data.tags) return;
            item.data.tags
                .filter(tag => !['post', 'all'].includes(tag))
                .forEach(tag => {
                    if (typeof tagsObject[tag] === 'undefined') {
                        tagsObject[tag] = 1
                    } else {
                        tagsObject[tag] += 1
                    }
                });
        });

        const tagList = []
        Object.keys(tagsObject).forEach(tag => {
            tagList.push({ tagName: tag, tagCount: tagsObject[tag] })
        })
        return tagList.sort((a, b) => b.tagCount - a.tagCount)

    });

    // Add a filter using the Config API
    eleventyConfig.addWatchTarget("./src/scss/");
    eleventyConfig.setBrowserSyncConfig({
        reloadDelay: 400
    });

    // Plugins
    eleventyConfig.addPlugin(eleventyNavigationPlugin);
    eleventyConfig.addPlugin(syntaxHighlight);

    // Filters
    eleventyConfig.addFilter("readableDate", (dateObj, format, zone) => {
        // Formatting tokens for Luxon: https://moment.github.io/luxon/#/formatting?id=table-of-tokens
        return DateTime.fromJSDate(dateObj, { zone: zone || "utc" }).toFormat(format || "dd LLLL yyyy");
    });

    eleventyConfig.addFilter('htmlDateString', (dateObj) => {
        // dateObj input: https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
        return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toFormat('yyyy-LL-dd');
    });

    eleventyConfig.addFilter('shortDateString', (dateObj) => {
        return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toFormat("dd MMM yy");
    });

    const urlPattern = new RegExp(/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi);
    eleventyConfig.addFilter('isLink', (linkStr) => {
        return urlPattern.test(linkStr);
    });

    // eleventyConfig.addFilter('breadcrumbs', (linkStr) => {
    //     const segments = linkStr.split('/').filter(segment => segment !== '');

    //     let currentPath = '/';
    //     const result = [];

    //     for (const segment of segments) {
    //         currentPath += `${segment}/`;
    //         result.push([segment, currentPath]);
    //     }

    //     return result;
    // });

    // UNKNOWN if this is still necessary
    // copy public files
    eleventyConfig.addPassthroughCopy("public");

    // // .scss processing
    // eleventyConfig.addTemplateFormats("scss");
    // eleventyConfig.addExtension("scss", {
    //     outputFileExtension: "css",
    //     compile: function (inputContent, inputPath) {
    //         let parsed = path.parse(inputPath);
    //         let result = sass.compileString(inputContent, {
    //             loadPaths: [
    //                 parsed.dir || ".",
    //                 this.config.dir.includes
    //             ],
    //             style: "compressed"
    //         });
    //         return (data) => {
    //             return result.css;
    //         }
    //     }
    // });

    return {
        dir: {
            input: "src",
            output: "dev"
        }
    }
};
