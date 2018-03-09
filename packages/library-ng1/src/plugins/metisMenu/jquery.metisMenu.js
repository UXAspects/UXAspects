/*!
LICENSE-START
 * metismenu - v1.0.3
 * Easy menu jQuery plugin for Twitter Bootstrap 3
 * https://github.com/onokumus/metisMenu
 *
 * Made by Osman Nuri Okumus
 * Under MIT License
 The MIT License (MIT)

Copyright (c) 2015 Osman Nuri Okumuş

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
LICENSE-END
 */
//===================================
//THIS HAS BEEN MODIFIED FOR UX ASPECTS
//===================================
//it now uses selected to expand items

(function ($, window, document, undefined) {

  var pluginName = "metisMenu",
      defaults = {
        toggle: true
      };

  function Plugin(element, options) {
    this.element = element;
    this.settings = $.extend({}, defaults, options);
    this._defaults = defaults;
    this._name = pluginName;
    this.init();
  }

  Plugin.prototype = {
    init: function () {

      var $this = $(this.element),
          $toggle = this.settings.toggle;

      $this.find('li.active').has('ul').children('ul').addClass('collapse in');
      $this.find('li').not('.active').has('ul').children('ul').addClass('collapse');

      $this.find('li').has('ul').children('a').on('click', function (e) {

        e.preventDefault();
        if($("body").hasClass('.mini-navbar')){
          return;
        }
        //if ie9 just toggle the class
        if(navigator.appVersion.indexOf("MSIE 9.")!=-1){
          $(this).parent('li').toggleClass('selected').children('ul').toggleClass('in');  
        } 
        else {
          // add the correct event listener depending on whether or not the menu is expanded (has 'in' class) 
          if (!$(this).parent('li').children('ul').hasClass('in')) {
            // only add selected class when collapsing show is done
            $(this).parent('li').children('ul').one('show.bs.collapse', function() {
              $(this).parent('li').addClass('selected');
            });
          }
          else {
            // only remove selected class when collapsing hide is done
            $(this).parent('li').children('ul').one('hide.bs.collapse', function() {
              $(this).parent('li').removeClass('selected');
            });
          }

          // begin collapsing animation
          $(this).parent('li').children('ul').collapse('toggle');
        }

        // CUSTOM - allow parent node to activate first child
        if ($(this).parent('li').children('ul').hasClass('cascade')) {
          $(this).parent('li').children('ul').children('li').first().find('a').click();
        }

        if ($toggle) {
          $(this).parent('li').siblings().removeClass('selected').children('ul.in').collapse('hide');
        }
      });
    }
  };

  $.fn[ pluginName ] = function (options) {
    return this.each(function () {
      if (!$.data(this, "plugin_" + pluginName)) {
        $.data(this, "plugin_" + pluginName, new Plugin(this, options));
      }
    });
  };

})(jQuery, window, document);
