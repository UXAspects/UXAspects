cardset.$inject = ["$window", "$compile", "safeTimeout"];

export default function cardset($window, $compile, safeTimeout) {
  return {
    restrict: 'E',
    template: require('./cardSet.html'),
    replace: true,
    transclude: true,
    link: function (scope, element, attrs) {

      //allow angular to finish ng-repeats
      var safeTimeoutInstance = safeTimeout.create(scope);
      safeTimeoutInstance.timeout(function () {
        //carousel properties
        var carousel = element.find('.card-tab-container');
        var belt = carousel.find('.card-tabs');

        //store all useful elements & tabs
        var cards = belt.find('.card-tab');
        var contentAreaTop = element[0].getElementsByClassName('tab-content-container top')[0];
        var contentAreaBottom = element[0].getElementsByClassName('tab-content-container bottom')[0];
        var previousButton = carousel.find('.page-btn.previous');
        var nextButton = carousel.find('.page-btn.next');

        //set list width to content width
        belt.width(belt[0].scrollWidth);

        var bounds = [];

        var widths = {
          carouselWidth: carousel.width(),
          beltWidth: belt.outerWidth()
        };

        //set bounds
        setBounds();

        var topContainer = attrs.contentPosition && attrs.contentPosition.toLowerCase() === 'bottom' ? false : true;

        //add event listeners
        previousButton.click(previousPage);
        nextButton.click(nextPage);

        //when finished animation then fire this
        belt.on('transitionend webkitTransitionEnd', function (e) {
          if (e.originalEvent.propertyName && e.originalEvent.propertyName.toLowerCase() === "left")
            buttonsVisibility();
        });

        //when window resizes recalculate everything
        $(window).bind('resize', function () {
          setBounds();
          buttonsVisibility();
          repositionBelt();
        });

        //add event listeners to all cards
        for (var i = 0; i < cards.length; i++) {
          cards[i].addEventListener('click', selectCard);
        }

        //show or hide buttons accordingly
        buttonsVisibility();

        //select first card by default
        selectInitialCard();

        function previousPage() {
          var oldX = parseInt(belt.css('left'));
          var newX = Math.min(oldX + widths.carouselWidth, bounds[0]);
          belt.css('left', newX);
        }

        function nextPage() {
          var oldX = parseInt(belt.css('left'));
          var newX = Math.max(oldX - widths.carouselWidth, bounds[1]);
          belt.css('left', newX);
        }

        function setBounds() {
          //ensure widths are up to date
          widths = {
            carouselWidth: carousel.width(),
            beltWidth: belt.outerWidth()
          };

          //now set bounds
          bounds = [0, Math.min(widths.carouselWidth - widths.beltWidth, 0)];
        }

        function buttonsVisibility() {
          var beltLeft = parseInt(belt.css('left'));

          if (belt.outerWidth() < carousel.width()) {
            previousButton.hide();
            nextButton.hide();
            return;
          }
          if (beltLeft >= bounds[0])
            previousButton.hide();
          else
            previousButton.show();
          if ((beltLeft <= bounds[1]))
            nextButton.hide();
          else
            nextButton.show();
        }

        function repositionBelt() {

          //ensure on resize that no gaps are left and the space is made best use of            
          var beltLeft = parseInt(belt.css('left'));

          if (beltLeft >= bounds[0]) {
            var newX = Math.min(beltLeft + widths.carouselWidth, bounds[0]);
            belt.css('left', newX);
          }

          if ((beltLeft <= bounds[1])) {
            var newXPos = Math.max(beltLeft - widths.carouselWidth, bounds[1]);
            belt.css('left', newXPos);
          }
        }

        function deselectAllCards() {
          for (var i = 0; i < cards.length; i++) {
            $(cards[i]).removeClass('active');
            $(cards[i]).removeClass('top');
            $(cards[i]).removeClass('bottom');
          }
        }

        function selectInitialCard() {
          if (cards.length === 0) return;

          //get first card
          var card = cards[0];

          //update content area
          updateContent(card);
        }

        function selectCard(e) {

          //ensure all other cards are deselected
          deselectAllCards();

          //select the new card
          var card = e.currentTarget;

          //update content area
          updateContent(card);

          //ensure card is fully on screen
          moveCardOnScreen(card);
        }

        function moveCardOnScreen(card) {
          var beltLeft = parseInt(belt.css('left'));

          var cardStart = card.offsetLeft + beltLeft;
          var cardEnd = (card.offsetLeft + $(card).outerWidth(true)) + beltLeft;

          if (cardStart < 0) {
            var newX = Math.abs(beltLeft) + cardStart;

            if (newX <= (bounds[0] + 5)) newX = bounds[0];

            belt.css('left', -newX);
            buttonsVisibility();
            return;
          }

          if (cardEnd > (widths.carouselWidth + 5)) {
            var newXPos = cardEnd - widths.carouselWidth;

            if (-newXPos < bounds[1]) newXPos = Math.abs(bounds[1]);

            belt.css('left', beltLeft - newXPos);
            buttonsVisibility();
            return;
          }
        }

        function updateContent(card) {

          //apply active class
          $(card).addClass('active');

          //apply appropriate callout class
          if (topContainer)
            $(card).addClass('top');
          else
            $(card).addClass('bottom');


          var cardScope = angular.element(card).scope();

          //now find its associated tab content
          var tabContent = card.getElementsByTagName('tab-content');

          //remove old tab content
          if (topContainer)
            angular.element(contentAreaTop).empty();
          else
            angular.element(contentAreaBottom).empty();

          if (!tabContent || tabContent.length === 0) return;

          var compiledContent = $compile(tabContent[0].innerHTML)(cardScope);

          //apply scope
          apply();

          if (topContainer)
            angular.element(contentAreaTop).append(compiledContent);
          else
            angular.element(contentAreaBottom).append(compiledContent);

        }

        function apply() {
          //only apply scope if we need to
          if (!scope.$$phase) {
            scope.$apply();
          }
        }
      });
    }
  };
}