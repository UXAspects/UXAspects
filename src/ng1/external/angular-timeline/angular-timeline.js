/*!
LICENSE-START
Copyright 2015 Robert Pocklington
http://github.com/rpocklin/angular-timeline

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
LICENSE-END
*/(function () {
'use strict';
angular.module('angular-timeline', []);// Source: src/timeline-badge-directive.js
/**
 * @ngdoc directive
 * @name angular-timeline.directive:timeline-badge
 * @restrict AE
 *
 * @description
 * Shown in the centre pane (or left on narrow devices) to indicate the activity.
 */
angular.module('angular-timeline').directive('timelineBadge',['$timeout',function($timeout) {
  return {
    require: '^timelineEvent',
    restrict: 'AE',
    transclude: true,
    template: '<div class="timeline-badge"><span ng-transclude></span></div>',
    link: function (scope, element, attrs,controller) {
        controller.setWidths(element.width());

      //Allow any bindings to be processed
      $timeout(function(){
          //make sure the span ellipsis text on overflow
          var textContainer= element.find('span')[0];
          textContainer.style.textOverflow= 'ellipsis';
          textContainer.style.whiteSpace= 'nowrap';
          textContainer.style.display= 'block';
          textContainer.style.overflow= 'hidden';
          //check if we need to truncate the text
          var textWidth= textContainer.scrollWidth;
          var textContainerWidth= textContainer.offsetWidth;
          //get the text
          var text= textContainer.innerHTML;

          //then show the tooltip
          if(textWidth > textContainerWidth)
            $(textContainer).tooltip({container:'body',title:text,html:true});
      });

    }
  };
}]);

// Source: src/timeline-directive.js
/**
 * @ngdoc directive
 * @name angular-timeline
 * @restrict AE
 *
 * @description
 * Primary container for displaying a vertical set of timeline events.
 */
angular.module('angular-timeline').directive('timeline', function() {
  return {
    restrict: 'AE',
    transclude: true,
    template: '<ul class="timeline hp-timeline-down-arrow" ng-transclude></ul>',
    controller: function() {}
  };
});

// Source: src/timeline-event-directive.js
/**
 * @ngdoc directive
 * @name angular-timeline.directive:timeline
 * @restrict AE
 *
 * @description
 * Represents an event occuring at a point in time, displayed on the left or the right
 * of the timeline line.
 *
 * You typically embed a `timeline-badge` and `timeline-panel` element within a `timeline-event`.
 *
 * @param {string=} side  Define the side of the element (i.e. side="left", side="right", or use an {{ expression }}).
 */

angular.module('angular-timeline').directive('timelineEvent', function() {
  return {
    require: '^timeline',
    restrict: 'AE',
    transclude: true,
    template: '<li ng-class-odd="oddClass" ng-class-even="evenClass" ng-transclude></li>',
    controller: ['$scope', '$element', function($scope,$element){
      this.setWidths= function(badgeWidth) {

        var side= $element[0].getAttribute("side");
        if(side==="alternate")
        {
          var alternateSubtractWidth= badgeWidth+25;
          $element.find("timeline-panel")[0].style.width='calc(50% - '+alternateSubtractWidth+'px)';
        }

      }
    }],
    link: function(scope, element, attrs, controller) {

      //Set the side as right for UX Aspects timeline
      element[0].setAttribute("side","right");
      attrs.side = "right";

      var checkClass = function(side, leftSide) {

        var leftClass = '';
        var rightClass = 'timeline-inverted';

        if (side === 'left' || (!side && leftSide === true)) {
          return leftClass;
        }
        else if ((side === 'alternate' || !side) && leftSide === false) {
          return rightClass;
        }
        else if (side === 'right') {
          return rightClass;
        }
        else {
          return leftClass;
        }
      };

      var updateRowClasses = function(value) {
        scope.oddClass = checkClass(value, true);
        scope.evenClass = checkClass(value, false);
         element[0].parentNode.parentNode.setAttribute("side",value);
      };

      attrs.$observe('side', function(newValue) {
        updateRowClasses(newValue);
      });

      updateRowClasses(attrs.side);
    }
  };
});

// Source: src/timeline-footer-directive.js
/**
 * @ngdoc directive
 * @name angular-timeline.directive:timeline-footer
 * @restrict AE
 *
 * @description
 * Optional element to add a footer section to the `timeline-panel` for links or other actions.
 */
angular.module('angular-timeline').directive('timelineFooter', function() {
  return {
    require: '^timelinePanel',
    restrict: 'AE',
    transclude: true,
    template: '<div class="timeline-footer" ng-transclude></div>'
  };
});

// Source: src/timeline-heading-directive.js
/**
 * @ngdoc directive
 * @name angular-timeline.directive:timeline-heading
 * @restrict AE
 *
 * @description
 * Optional element to show the heading for a `timeline-panel`.
 */
angular.module('angular-timeline').directive('timelineHeading', function() {
  return {
    require: '^timelinePanel',
    restrict: 'AE',
    transclude: true,
    template: '<div class="timeline-heading" ng-transclude></div>'
  };
});

// Source: src/timeline-panel-directive.js
/**
 * @ngdoc directive
 * @name angular-timeline.directive:timeline-panel
 * @restrict AE
 *
 * @description
 * An panel inside the `timeline-event` which shows detailed information about the event.
 */
angular.module('angular-timeline').directive('timelinePanel', function() {
  return {
    require: '^timeline',
    restrict: 'AE',
    transclude: true,
    template: '<div class="timeline-panel" ng-transclude></div>'
  };
});
})();