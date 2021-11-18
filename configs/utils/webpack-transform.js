function applyWebpackTransforms(config) {
    // apply some transformations to modify the angular cli configuration
    const snippetExts = ['.ts', '.js', '.html', '.css', '.scss', '.less'];

    // iterate through all module rules in the config object
    for (const rule of config.module.rules) {
        if (snippetExts.some(ext => rule.test.test(ext)) && String(rule.include) !== String(/snippets/)) {
            rule.exclude = /snippets/;
        }
    }

    return config;
}

module.exports = {
    applyWebpackTransforms
}
