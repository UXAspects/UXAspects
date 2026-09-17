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
var path = require('path');
var Prism = require('prismjs');

module.exports = function (content) {
  this.cacheable();

  let filepath = this.resourcePath;
  let filename = path.basename(filepath);
  let extension = path.extname(filepath);

  let isSnippet = filename.toLowerCase().includes('.snippet.');
  let isExample = filename.toLowerCase().includes('.example.');
  let isBoth = !isSnippet && !isExample;

  let output = {};

  // determine if we should highlight the text
  if (isSnippet || isBoth) {
    switch (extension.toLowerCase()) {
      case '.html':
        output.snippet = Prism.highlight(content, Prism.languages.html);
        break;

      case '.css':
        output.snippet = Prism.highlight(content, Prism.languages.css);
        break;

      case '.ts':
      case '.js':
        output.snippet = Prism.highlight(content, Prism.languages.javascript);
        break;
    }
  }

  // determine if we should include the raw form of the file
  if (isExample || isBoth) {
    output.example = content;
  }

  return 'module.exports = ' + JSON.stringify(output);
};
