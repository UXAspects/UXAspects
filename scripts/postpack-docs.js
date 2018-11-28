const { copyFileSync, unlinkSync } = require('fs');
const { cwd } = require('process');
const { join } = require('path');

const packageFile = join(cwd(), 'src', 'package.json');
const tempFile = join(cwd(), 'src_package.json');

copyFileSync(tempFile, packageFile);
unlinkSync(tempFile);
