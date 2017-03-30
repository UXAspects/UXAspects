/*!
LICENSE-START
The MIT License (MIT)

Copyright (c) 2014 Geoffrey Bauduin

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
LICENSE-END
**/
/*
Modified for UX Aspects EL-1567
*/
(function() {
  angular.module("ngJScrollPane", []);

  angular.module("ngJScrollPane").directive("scrollPane", [
    '$timeout', function($timeout) {
      return {
        restrict: 'A',
        transclude: true,
        template: '<div class="scroll-pane"><div ng-transclude></div></div>',
        link: function($scope, $elem, $attrs) {
          var config, fn, selector;

          config = {};
          if ($attrs.scrollConfig) {
            config = $scope.$eval($attrs.scrollConfig);
          }
          fn = function() {
            $elem.jScrollPane(config);
            return $scope.pane = $elem.data("jsp");
          };
          if ($attrs.scrollTimeout) {
            $timeout(fn, $scope.$eval($attrs.scrollTimeout));
          } else {
            $timeout(fn, 0);
          }

          // UX Aspects Modification
          $scope.$on('$destroy', function() {
            if($scope.pane) {
              $scope.pane.destroy(true);
            }
          });
          // End Modification

          return $scope.$on("reinit-pane", function(event, id) {
            if ($scope.pane) {
              return $scope.$apply(function() {
                $scope.pane.destroy();
                return fn();
              });
            }
          });
        },
        replace: true
      };
    }
  ]);

}).call(this);
