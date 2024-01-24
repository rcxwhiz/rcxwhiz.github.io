const sass = require("sass");
const path = require("node:path");

module.exports = function(eleventyConfig) {
    // copy .js files
    eleventyConfig.addPassthroughCopy("js/");

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
