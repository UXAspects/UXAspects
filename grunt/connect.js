module.exports = {
    documentation: {
        options: {
            hostname: 'localhost',
            port: 4000,
            base: 'dist/docs',
            keepalive: true,
            livereload: false,
            open: {
                target: 'http://localhost:4000',
                appName: 'open'
            }
        }
    },
    selenium: {
        options: {
            hostname: 'localhost',
            port: 4000,
            base: 'dist/docs',
            keepalive: true,
            livereload: false,
            open: false
        }
    },
    selenium_release: {
        options: {
            hostname: '0.0.0.0',
            port: 4001,
            base: 'dist/docs',
            keepalive: true,
            livereload: false,
            open: false
        }
    }
};