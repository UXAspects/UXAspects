const path = require('path');

module.exports = {
    components: {
        src: path.join(process.cwd(), 'src', 'components', '**', '*.less')
    }
};