const path = require('path');

module.exports = {
    e2e: {
        src: path.join(process.cwd(), 'e2e', 'tests', '**', '*.ts'),
        outDir: path.join(process.cwd(), 'e2e', 'dist'),
        tsconfig: path.join(process.cwd(), 'e2e', 'tsconfig.json')
    }
};