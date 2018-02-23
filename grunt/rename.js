const path = require('path');

module.exports = {
    webdriver: {
        src: path.join(process.cwd(), 'e2e', 'chromedriver'),
        dest: path.join(process.cwd(), 'e2e', 'chromedriver.exe')
    }
};
