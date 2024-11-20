const { join } = require('path');
const { cwd } = require('process');

const scripts = join(cwd(), 'scripts');
const nxCli = join(cwd(), 'node_modules', 'nx', 'bin', 'nx.js');

module.exports = {
  iconset: {
    src: [join(scripts, 'iconset.js')],
  },
  licenses: {
    src: [join(scripts, 'licenses.js')],
  },
  less: {
    src: [join(scripts, 'inline-less.js')],
  },
  'build-library': {
    src: [nxCli],
    options: {
      args: ['build', 'ux-aspects', '--configuration=production'],
    },
  },
  'build-documentation': {
    src: [nxCli],
    options: {
      args: ['build', 'documentation', '--configuration=production'],
      nodeargs: ['--max-old-space-size=8192'],
    },
  },
};
