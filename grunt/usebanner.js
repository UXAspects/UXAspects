/*
 * Copyright 2015-2026 Micro Focus or one of its affiliates.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
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
        path.join(process.cwd(), 'dist', 'library', 'styles', 'ux-aspects-bootstrap.css'),
        path.join(process.cwd(), 'dist', 'library', 'styles', 'ux-aspects-bootstrap.min.css'),
      ],
    },
  },
};
