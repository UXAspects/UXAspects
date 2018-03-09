var path = require('path');
var Prism = require('prismjs');

module.exports = function (content) {

    this.cacheable();

    let filepath = this.resourcePath;
    let filename = path.basename(filepath);
    let extension = path.extname(filepath);

    let isSnippet = filename.toLowerCase().includes('.snippet.');
    let isExample = filename.toLowerCase().includes('.example.');
    let isBoth = !isSnippet && !isExample;

    let output = {};

    // determine if we should highlight the text
    if (isSnippet || isBoth) {

        switch (extension.toLowerCase()) {

            case '.html':
                output.snippet = Prism.highlight(content, Prism.languages.html);
                break;

            case '.css':
                output.snippet = Prism.highlight(content, Prism.languages.css);
                break;

            case '.ts':
            case '.js':
                output.snippet = Prism.highlight(content, Prism.languages.javascript);
                break;
        }
    }

    // determine if we should include the raw form of the file
    if (isExample || isBoth) {
        output.example = content;
    }

    return "module.exports = " + JSON.stringify(output);
};