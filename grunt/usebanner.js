const path = require('path');

const package = require(path.join(process.cwd(), 'src', 'package.json'));

module.exports = {
  styles: {
    options: {
      position: 'top',
      banner: `/*\n * ${package.name} - v${package.version}\n * © Copyright ${new Date().getFullYear()} Open Text. All Rights Reserved. Trademarks owned by Open Text\n */`,
      linebreak: true,
    },
    files: {
      src: [
        path.join(process.cwd(), 'dist', 'library', 'styles', 'ux-aspects.css'),
        path.join(process.cwd(), 'dist', 'library', 'styles', 'ux-aspects.min.css'),
      ],
    },
  },
};
