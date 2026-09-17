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
const { join } = require('path');
const { cwd } = require('process');

module.exports = {
  fonts: {
    cwd: join(cwd(), 'src', 'fonts'),
    src: '**',
    dest: join(cwd(), 'dist', 'library', 'fonts'),
    expand: true,
  },
  images: {
    cwd: join(cwd(), 'src', 'img'),
    src: '**',
    dest: join(cwd(), 'dist', 'library', 'img'),
    expand: true,
  },
  css: {
    cwd: join(cwd(), 'dist', 'library', 'styles'),
    src: '**',
    dest: join(cwd(), 'dist', 'docs', 'assets', 'css'),
    expand: true,
  },
  'npm_ux-aspects_tgz': {
    cwd: join(cwd(), 'dist', 'library'),
    src: 'ux-aspects-ux-aspects-*.*.*.tgz',
    dest: join(cwd(), 'target', 'npm'),
    expand: true,
    rename: path => join(path, 'ux-aspects-ux-aspects.tgz'),
  },
  md: {
    cwd: cwd(),
    src: ['README.md', 'LICENSE.md'],
    dest: join(cwd(), 'dist', 'library/'),
  },
  bootstrap_fonts: {
    cwd: join(cwd(), 'src', 'styles', 'fonts'),
    src: '**',
    dest: join(cwd(), 'dist', 'library', 'fonts'),
    expand: true,
  },
  bootstrap_license: {
    expand: true,
    cwd: join(cwd(), 'src', 'styles', 'bootstrap'),
    src: 'LICENSE',
    dest: join(cwd(), 'dist', 'library'),
    rename: () => join(cwd(), 'dist', 'library', 'LICENSE-bootstrap'),
  },
};
