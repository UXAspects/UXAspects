const path = require('path');

module.exports = {
    e2e: {
        src: path.join(process.cwd(), 'e2e', 'tests', '**', '*.ts'),
        tsconfig: path.join(process.cwd(), 'e2e', 'tests', 'tsconfig.json')
    }
};