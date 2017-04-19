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
    plunker: {
        options: {
            hostname: '0.0.0.0',
            port: 8090,
            base: 'dist',
            keepalive: true,
            livereload: false,
            open: false,
            middleware: function (connect,  options,  middlewares) {
                          
                middlewares.unshift(function (req,  res,  next) {              
                    res.setHeader('Access-Control-Allow-Origin',  '*');              
                    res.setHeader('Access-Control-Allow-Methods',  '*');              
                    next();          
                });
          
                return  middlewares;        
            }
        }
    }
};