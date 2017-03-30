export default function flippableCard() {
    return {
        restrict: 'E',
        scope: {
            flipStyle: '@',
            flipOn: '@',
            cardWidth: '@',
            cardHeight: '@'
        },
        transclude: true,
        template: '<div class="flip-container">' +
            '<div class="flipper" ng-transclude>' +
            '</div>' +
            '</div>',
        link: function (scope, element) {
            // if flip style set to vertical, then add vertical class
            if (scope.flipStyle === 'vertical') {
                element.find('.flip-container').addClass('vertical');
            }

            // set the width and height if specified by the user
            if (scope.cardWidth) {
                element.find('.flip-container').css('width', scope.cardWidth);
                element.find('.front').css('width', scope.cardWidth);
                element.find('.back').css('width', scope.cardWidth);
            }
            if (scope.cardHeight) {
                element.find('.flip-container').css('height', scope.cardHeight);
                element.find('.front').css('height', scope.cardHeight);
                element.find('.back').css('height', scope.cardHeight);

                if (scope.flipStyle === 'vertical') {
                    element.find('.flipper').css('transform-origin', '100% ' + scope.cardHeight / 2 + 'px');
                }
            }


            var flipOnItemClick = element.find('[flip-on-click]');
            var flipper = element.find('.flipper');

            // flip the item based on the appropriate event specified 
            if (scope.flipOn === "click") {
                if (flipOnItemClick.length > 0)
                    flipOnItemClick.on("click", flipCard);
                else
                    element.on("click", flipCard);
            } else {
                element.hover(flipCard, unflipCard);
            }


            // does the actual flipping
            function flipCard() {
                if (!flipper.hasClass('flip-card')) {
                    // if flipOn is by hover, the add the hover-flipper class for animation delay
                    if (scope.flipOn !== "click")
                        flipper.addClass('hover-flipper');

                    flipper.addClass('flip-card');
                } else {
                    flipper.removeClass('hover-flipper');
                    flipper.removeClass('flip-card');
                }
            }

            function unflipCard() {
                flipper.removeClass('hover-flipper');
                flipper.removeClass('flip-card');
            }
        }

    };
}