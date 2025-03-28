const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");


module.exports = function (eleventyConfig) {
    // Plugins
    eleventyConfig.addPlugin(eleventyNavigationPlugin);
    eleventyConfig.addPlugin(syntaxHighlight);

    // Filters

    const urlPattern = new RegExp(/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi);
    eleventyConfig.addFilter('isLink', (linkStr) => {
        return urlPattern.test(linkStr);
    });

    // copy public files
    eleventyConfig.addPassthroughCopy("src/public");

    // output dir
    return {
        dir: {
            input: "src"
        }
    }
};
