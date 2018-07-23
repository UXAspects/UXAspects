const marked = require('marked');
const { load } = require('cheerio');
const { highlightAuto } = require('highlight.js');

module.exports = function(markdown) {
  marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: false,
    smartLists: true,
    smartypants: false
  });

  const markdownTpl = marked(markdown);

  this && this.cacheable && this.cacheable();

  const $ = load(markdownTpl);

  $('pre code').replaceWith(function(i, block) {
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