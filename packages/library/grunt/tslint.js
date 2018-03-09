module.exports = {
    options: {
        configuration: "tslint.json",
        force: false,
        fix: false
    },
    library: {
        src: ['src/**/*.ts']
    },
    e2e: {
        src: ['e2e/**/*.ts']
    }
};