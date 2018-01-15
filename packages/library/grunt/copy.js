module.exports = {
    develop: {
        files: [{
            src: ['./dist/bundles/ux-aspects.umd.js'],
            dest: './temp/ux-aspects.umd.js'
        },
        {
            src: ['./dist/@ux-aspects/ux-aspects.es5.js'],
            dest: './temp/ux-aspects.es5.js'
        },
        {
            src: ['./dist/@ux-aspects/ux-aspects.js'],
            dest: './temp/ux-aspects.js'
        },
        {
            cwd: 'dist',
            expand: true,
            src: ['./**/*.d.ts'],
            dest: './temp/'
        },
        {
            src: ['./dist/ux-aspects.metadata.json'],
            dest: './temp/ux-aspects.metadata.json'
        }]
    },
};