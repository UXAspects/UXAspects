/*!
LICENSE-START
The MIT License (MIT)

Copyright (c) 2014 Alec LaLonde and contributors

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

(function (angular) {
  'use strict';
  angular.module('scrollable-table', [])
    .directive('scrollableTable', ['$timeout', '$q', '$parse', '$animate', function ($timeout, $q, $parse, $animate) {
      return {
        transclude: true,
        restrict: 'E',
        scope: {
          rows: '=watch',
          containerHeight:"=",
          headerHeight: "=",
          watchHeaders: "="
        },
        template: '<div class="scrollableContainer">' +
                    '<div class="headerSpacer"></div>' +
                    '<div class="scrollArea" ng-transclude></div>' +
                  '</div>',
        controller: ['$scope', '$element', function ($scope, $element) {

          // UX Aspects Modification - supporting Angular 2^
          var nativeElement = $element.get(0);

          //UX Aspects  modification
          window.requestAnimFrame = (function(){
              return  window.requestAnimationFrame       ||
                      window.webkitRequestAnimationFrame ||
                      window.mozRequestAnimationFrame    ||
                      function( callback ){
                        window.setTimeout(callback, 1000 / 60);
                      };
          })();

          var rendered = false;
          var renderedHeader = false;

          // define an API for child directives to view and modify sorting parameters

          this.renderTalble = function (){
            return waitForRender().then(fixHeaderWidths);
          };

          this.getTableElement = function (){
            return $element;
          };

          /**
           * append handle function to execute after table header resize.
           */
          this.appendTableResizingHandler = function (handler){
            var handlerSequence = $scope.headerResizeHanlers || [];
            for(var i = 0;i < handlerSequence.length;i++){
              if(handlerSequence[i].name === handler.name){
                return;
              }
            }
            handlerSequence.push(handler);
            $scope.headerResizeHanlers = handlerSequence;
          };

          function defaultCompare(row1, row2) {
            var exprParts = $scope.sortExpr.match(/(.+)\s+as\s+(.+)/);
            var scope = {};
            scope[exprParts[1]] = row1;
            var x = $parse(exprParts[2])(scope);

            scope[exprParts[1]] = row2;
            var y = $parse(exprParts[2])(scope);

            if (x === y) return 0;
            return x > y ? 1 : -1;
          }

          function scrollToRow(row) {
            var offset = $element.find(".headerSpacer").height();
            var currentScrollTop = $element.find(".scrollArea").scrollTop();
            $element.find(".scrollArea").scrollTop(currentScrollTop + row.position().top - offset);
          }

          $scope.$on('rowSelected', function (event, rowId) {
            var row = $element.find(".scrollArea table tr[row-id='" + rowId + "']");
            if (row.length === 1) {
              // Ensure that the headers have been fixed before scrolling, to ensure accurate
              // position calculations
              $q.all([waitForRender(), headersAreFixed.promise]).then(function () {
                scrollToRow(row);
              });
            }
          });

          // Set fixed widths for the table headers in case the text overflows.
          // There's no callback for when rendering is complete, so check the visibility of the table
          // periodically -- see http://stackoverflow.com/questions/11125078

          //UX Aspects - modified to reduce flicker when element is initially hidden
          function waitForRender() {

            var deferredRender = $q.defer();

            var table = $element.find('table');

            //hide table until render is complete
            if(rendered === false)
              table.css('visibility', 'hidden');

            function wait() {

              var resolve = true;

              var tableDisplayed = table[0];

              while(tableDisplayed !== null) {

                // do some light checking first before checking for computed values
                if(tableDisplayed.style.display === 'none' || tableDisplayed.style.width === '0px' || tableDisplayed.style.width === '0%') {
                  resolve = false;
                  break;
                }

                var computedStyles = window.getComputedStyle(tableDisplayed);

                // get properties we are going to check
                var display = computedStyles.display;
                var width = parseInt(computedStyles.width);
                // use offsetHeight as getting height from computed style is buggy in IE
                var height = tableDisplayed.offsetHeight;

                //check if a parent element has a display of none or a width of 0px and if so dont fix the header widths
                if(display === 'none' || display === 'block' && height === 0 || width === 0){
                  resolve = false;                 
                  break;
                }

                tableDisplayed = tableDisplayed.parentElement || null;
              }

              if(resolve){
                deferredRender.resolve();
                renderedHeader = true;
              }
              else
                requestAnimFrame(wait);
            }

            requestAnimFrame(wait);

            return deferredRender.promise;
          }

          var headersAreFixed = $q.defer();

          function fixHeaderWidths() {
            
            if (!$element.find("thead th .th-inner").length) {
              $element.find("thead th").wrapInner('<div class="th-inner"></div>');
            }
            if($element.find("thead th .th-inner:not(:has(.box))").length) {
              $element.find("thead th .th-inner:not(:has(.box))").wrapInner('<div class="box"></div>');
            }
            $element.find("table th .th-inner:visible").each(function (index, el) {
              el = angular.element(el);
              var width = el.parent().width(),
                lastCol = $element.find("table th:visible:last"),
                headerWidth = width;
              if (lastCol.css("text-align") !== "center") {
                var hasScrollbar = $element.find(".scrollArea").height() < $element.find("table").height();
                if (lastCol[0] == el.parent()[0] && hasScrollbar) {
                  headerWidth += $element.find(".scrollArea").width() - $element.find("tbody tr").width();
                  headerWidth = Math.max(headerWidth, width);
                }
              }
              var minWidth = _getScale(el.parent().css('min-width')),
                title = el.parent().attr("titleName");
              headerWidth = Math.max(minWidth, headerWidth);
              el.css("width", headerWidth);
              if (!title) {
                // ordinary column(not sortableHeader) has box child div element that contained title string.
                title = el.find(".title .ng-scope").html() || el.find(".box").html();
              }
              el.attr("titleName", title.trim());
            });
            headersAreFixed.resolve();

            //UX Aspects - modification to show table after render
            if(rendered === false) {
              $element.find('table').css('visibility', '');      
            }
            if(renderedHeader === true) {
              $element.find('thead').css('visibility', '');      
            } 
          }

          // when the data model changes, fix the header widths.  See the comments here:
          // http://docs.angularjs.org/api/ng.$timeout
          $scope.$watch('rows', function (newValue, oldValue) {
            if (newValue) {
              renderChains($element.find('.scrollArea').width());
              // clean sort status and scroll to top of table once records replaced.
              $scope.sortExpr = null;
              // FIXME what is the reason here must scroll to top? This may cause confusing if using scrolling to implement pagination.
              $element.find('.scrollArea').scrollTop(0);
            }
          });

          //UX Aspects watch added for headers
          $scope.$watch('watchHeaders', function (newValue, oldValue) {
            if (newValue) {
              $element.find('thead').css('visibility', 'hidden');
              renderChains($element.find('.scrollArea').width());
            }
          });

          $scope.asc = !nativeElement.hasAttribute("desc");
          $scope.sortAttr = nativeElement.getAttribute('sort-attr');

          $element.find(".scrollArea").scroll(function (event) {
            $element.find("thead th .th-inner").css('margin-left', 0 - event.target.scrollLeft);
          });

          $scope.$on("renderScrollableTable", function() {
            renderChains($element.find('.scrollArea').width());
          });

          angular.element(window).on('resize', function(){
            $timeout(function(){
              $scope.$apply();
            });
          });
          $scope.$watch(function(){
            return $element.find('.scrollArea').width();
          }, function(newWidth, oldWidth){
            if(newWidth * oldWidth < 0) {
              return;
            }
            renderChains();
          });

          function renderChains(){
            var resizeQueue = waitForRender().then(fixHeaderWidths);
            
              var customHandlers = $scope.headerResizeHanlers || [];
              for(var i = 0;i < customHandlers.length;i++){
                resizeQueue = resizeQueue.then(customHandlers[i]);
              }
            return resizeQueue;
          }
        }],
        link: function(scope, element) {

          // UX Aspects - modification
          $animate.enabled(false, element);

          /*! UX Aspects  - code added to configure the container height */
          angular.element('.scrollableContainer').height(scope.containerHeight);
          angular.element('.scrollableContainer .headerSpacer').height(scope.headerHeight);
          /*! UX Aspects   - code added to configure the container height */
        }
      };
    }])
    .directive('resizable', ['$compile', function($compile){
      return {
        restrict: 'A',
        priority: 0,
        scope: false,
        require: 'scrollableTable',
        link: function postLink(scope, elm, attrs, tableController){
          tableController.appendTableResizingHandler(function(){
            _init();
          });

          tableController.appendTableResizingHandler(function relayoutHeaders(){
            var tableElement = tableController.getTableElement().find('.scrollArea table');
            if(tableElement.css('table-layout') === 'auto'){
              initRodPos();
            }else{
              _resetColumnsSize(tableElement.parent().width());
            }
          });

          scope.resizing = function(e){
            var screenOffset = tableController.getTableElement().find('.scrollArea').scrollLeft(),
              thInnerElm =  angular.element(e.target).parent(),
              thElm = thInnerElm.parent(),
              startPoint = _getScale(thInnerElm.css('left')) + thInnerElm.width() - screenOffset,
              movingPos = e.pageX,
              _document = angular.element(document),
              _body = angular.element('body'),
              coverPanel = angular.element('.scrollableContainer .resizing-cover'),
              scaler = angular.element('<div class="scaler">');

            _body.addClass('scrollable-resizing');
            coverPanel.addClass('active');
            angular.element('.scrollableContainer').append(scaler);
            scaler.css('left', startPoint);

            _document.bind('mousemove', function (e){
              var offsetX = e.pageX - movingPos,
                movedOffset = _getScale(scaler.css('left')) - startPoint,
                widthOfActiveCol = thElm.width(),
                nextElm = thElm.nextAll('th:visible').first(),
                minWidthOfActiveCol = _getScale(thElm.css('min-width')),
                widthOfNextColOfActive = nextElm.width(),
                minWidthOfNextColOfActive = _getScale(nextElm.css('min-width'));
              movingPos = e.pageX;
              e.preventDefault();
              if((offsetX > 0 && widthOfNextColOfActive - movedOffset <= minWidthOfNextColOfActive)
                || (offsetX < 0 && widthOfActiveCol + movedOffset <= minWidthOfActiveCol)){
                //stopping resize if user trying to extension and the active/next column already minimised.
                return;
              }
              scaler.css('left', _getScale(scaler.css('left')) + offsetX);
            });
            _document.bind('mouseup', function (e) {
              e.preventDefault();
              scaler.remove();
              _body.removeClass('scrollable-resizing');
              coverPanel.removeClass('active');
              _document.unbind('mousemove');
              _document.unbind('mouseup');

              var offsetX = _getScale(scaler.css('left')) - startPoint,
                newWidth = thElm.width(),
                minWidth = _getScale(thElm.css('min-width')),
                nextElm = thElm.nextAll('th:visible').first(),
                widthOfNextColOfActive = nextElm.width(),
                minWidthOfNextColOfActive = _getScale(nextElm.css('min-width')),
                tableElement = tableController.getTableElement().find('.scrollArea table');

              //hold original width of cells, to display cells as their original width after turn table-layout to fixed.
              if(tableElement.css('table-layout') === 'auto'){
                tableElement.find("th .th-inner").each(function (index, el) {
                  el = angular.element(el);
                  var width = el.parent().width();
                  el.parent().css('width', width);
                });
              }

              tableElement.css('table-layout', 'fixed');

              if(offsetX > 0 && widthOfNextColOfActive - offsetX <= minWidthOfNextColOfActive){
                offsetX = widthOfNextColOfActive - minWidthOfNextColOfActive;
              }
              nextElm.removeAttr('style');
              newWidth += offsetX;
              thElm.css('width', Math.max(minWidth, newWidth));
              nextElm.css('width', widthOfNextColOfActive - offsetX);
              tableController.renderTalble().then(resizeHeaderWidth());
            });
          };

          function _init(){
            var thInnerElms = elm.find('table th:not(:last-child) .th-inner');
            if(thInnerElms.find('.resize-rod').length == 0){
              tableController.getTableElement().find('.scrollArea table').css('table-layout', 'auto');
              var resizeRod = angular.element('<div class="resize-rod" ng-mousedown="resizing($event)"></div>');
              thInnerElms.append($compile(resizeRod)(scope));
            }
          }

          function initRodPos(){
            var tableElement = tableController.getTableElement();
            var headerPos = 1;//  1 is the width of right border;
            tableElement.find("table th .th-inner:visible").each(function (index, el) {
              el = angular.element(el);
              var width = el.parent().width(),   //to made header consistent with its parent.
              // if it's the last header, add space for the scrollbar equivalent unless it's centered
                minWidth = _getScale(el.parent().css('min-width'));
              width = Math.max(minWidth, width);
              el.css("left", headerPos);
              headerPos += width;
            });
          }

          function resizeHeaderWidth(){
            var headerPos = 1,//  1 is the width of right border;
              tableElement = tableController.getTableElement();
            tableController.getTableElement().find("table th .th-inner:visible").each(function (index, el) {
              el = angular.element(el);
              var width = el.parent().width(),   //to made header consistent with its parent.
              // if it's the last header, add space for the scrollbar equivalent unless it's centered
                lastCol = tableElement.find("table th:visible:last"),
                minWidth = _getScale(el.parent().css('min-width'));
              width = Math.max(minWidth, width);
              //following are resize stuff, to made th-inner position correct.
              //last column's width should be automatically, to avoid horizontal scroll.
              if (lastCol[0] != el.parent()[0]){
                el.parent().css('width', width);
              }
              el.css("left", headerPos);
              headerPos += width;
            });
          }

          function _resetColumnsSize(tableWidth){
            var tableElement = tableController.getTableElement(),
              columnLength = tableElement.find("table th:visible").length,
              lastCol = tableElement.find("table th:visible:last");
            tableElement.find("table th:visible").each(function (index, el) {
              el = angular.element(el);
              if(lastCol.get(0) == el.get(0)){
                //last column's width should be automaically, to avoid horizontal scroll.
                el.css('width', 'auto');
                return;
              }
              var _width = el.data('width');
              if(/\d+%$/.test(_width)){    //percentage
                _width = Math.ceil(tableWidth * _getScale(_width) / 100);
              } else {
                // if data-width not exist, use average width for each columns.
                _width = tableWidth / columnLength;
              }
              el.css('width', _width + 'px');
            });
            tableController.renderTalble().then(resizeHeaderWidth());
          }
        }
      }
    }]);

  function _getScale(sizeCss){
    return parseInt(sizeCss.replace(/px|%/, ''), 10);
  }
})(angular);
