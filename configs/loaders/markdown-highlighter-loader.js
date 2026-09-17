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
const marked = require('marked');
const { load } = require('cheerio');
const { highlightAuto } = require('highlight.js');

module.exports = function (markdown) {
  marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: false,
    smartLists: true,
    smartypants: false,
  });

  const markdownTpl = marked(markdown);

  this && this.cacheable && this.cacheable();

  const $ = load(markdownTpl);

  $('pre code').replaceWith(function (i, block) {
    const $e = $(block);
    const text = $e.text();

    const klass = $e.attr('class') || '';
    const languageType = klass.split('lang-').filter(id);

    if (languageType.length) {
      return highlightAuto(text, languageType).value;
    } else {
      return highlightAuto(text).value;
    }
  });

  $('pre').addClass('hljs');

  return $.html();
};

function id(type) {
  return type;
}
