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

module.exports = {
  ux: {
    src: path.join(process.cwd(), 'src', 'icons', 'ux', '*.svg'),
    dest: path.join(process.cwd(), 'src', 'fonts'),
    destCss: path.join(process.cwd(), 'src', 'styles'),
    options: {
      font: 'ux-icons',
      engine: 'node',
      types: ['woff', 'ttf'],
      hashes: false,
      stylesheet: 'less',
      htmlDemo: false,
      templateOptions: {
        baseClass: 'ux-icon',
        classPrefix: 'ux-icon-',
        mixinPrefix: 'ux-icon-mixin-',
      },
    },
  },
};
