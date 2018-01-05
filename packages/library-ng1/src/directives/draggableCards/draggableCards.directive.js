draggableCards.$inject = ['safeTimeout', 'safeEventListener'];

export default function draggableCards(safeTimeout, safeEventListener) {
  return {
    restrict: "E",
    template: require('./draggableCards.html'),
    replace: true,
    transclude: true,
    scope: {
      allowEditing: '=?',
      allowRemoving: '=?',
      allowReordering: '=?',
      onEdit: '=?',
      onRemove: '=?',
      onReorder: '=?',
      onSelect: '=?',
      direction: '@?'
    },
    link: function (scope, element) {

      //store some things in this context
      var draggableContainer, cardElements, draggableTop, draggableBottom, draggableCards = [],
        fixedCards = [],
        draggingCard, dragging = false,
        cardCount = 0;

      //identify the container element
      draggableContainer = angular.element(element[0].getElementsByClassName('draggable-card-container')[0]);

      //identify the scroller element 
      var draggableScroller = angular.element(element[0].getElementsByClassName('draggable-card-scroller')[0]);

      //create a scope safe timeout
      var timeoutInstance = safeTimeout.create(scope);
      var safeEventInstance = safeEventListener.create(scope);

      //initialise tiny scrollbar
      var scrollPane = draggableScroller.jScrollPane({
        resizeSensor: true,
        verticalGutter: -9,
        enableKeyboardNavigation: true,
        isScrollableH: false
      });

      var api = scrollPane.data('jsp');

      //start timeout - this will callback when the child components have been rendered
      timeoutInstance.timeout(initialise);

      function initialise() {

        //get the card containers and store them
        cardElements = draggableContainer[0].getElementsByClassName('card-container');
        cardCount = cardElements.length;

        //order the cards
        orderCards();

        //prepare cards - add click handlers and position them top
        prepareCards();

        //add event listener to capture dragging
        safeEventInstance.bind(document, 'mousemove', onDrag);
        //add event listener to add keyboard control
        safeEventInstance.bind(document, 'keydown', accesibility);

        // set up an observer to watch for any changes to the number of cards
        var observer = new MutationObserver(cardsHaveChanged);

        // begin observations
        observer.observe(draggableContainer[0], {
          childList: true,
          subtree: true
        });

        // tidy up on scope destroy
        scope.$on('$destroy', function () {
          observer.disconnect();
        });

        selectDefault();

        //ensure we can handle resize events
        element.resize(function () {
          reorderCards();

          draggableContainer[0].style.height = '';
          draggableContainer[0].style.minHeight = element.height() + 'px';
          draggableContainer.height(draggableContainer[0].scrollHeight);
        });
      }

      function cardsHaveChanged() {
        var childNodes = draggableContainer[0].getElementsByClassName('card-container');

        if (childNodes.length !== cardCount) {
          cardCount = childNodes.length;
          reorderCards();
          prepareCards();
          return;
        }

        for (var i = 0; i < childNodes.length; i++) {
          var processed = childNodes[i].getAttribute('reorder') !== null;

          if (!processed) {
            reorderCards();
            prepareCards();
          }
        }
      }

      function selectDefault() {
        for (var i = 0; i < cardElements.length; i++) {
          var card = cardElements[i];

          var selected = card.getAttribute('default-selected-card');

          if (selected !== null)
            selectCard(cardFromContainer(card));
        }
      }

      function prepareCards() {

        //create wrapper function - pass the element from the event to the function
        var click = function (event) {
          if (dragging) return;

          //if the click was on the drag handle then ignore it
          if (angular.element(event.srcElement).hasClass('drag-handle')) return;

          //if the click was on an icon then ignore it
          if (angular.element(event.scrElement).hasClass('draggable-icon')) return;

          //fire select event
          selectCard(event.currentTarget);
        };

        var onArrowUpClick = function (evt) {
          //if dragging then we dont want to do anything
          if (dragging) return;

          //get the card element
          var container = $(evt.currentTarget).closest('.card')[0];

          //call appropriate function
          moveUp(container);

          //stop event bubbling up to select card
          evt.stopPropagation();
        };

        var onArrowDownClick = function (evt) {
          //if dragging then we dont want to do anything
          if (dragging) return;

          //get the card element
          var container = $(evt.currentTarget).closest('.card')[0];

          //call appropriate function
          moveDown(container);

          //stop event bubbling up to select card
          evt.stopPropagation();
        };

        var onEditClick = function (evt) {
          //if dragging then we dont want to do anything
          if (dragging) return;

          //get the card element
          var container = $(evt.currentTarget).closest('.card')[0];

          if (container.querySelector(".title-container .hpe-edit").classList.contains("disabled")) return;

          //call appropriate function
          editCard(container);

          //stop event bubbling up to select card
          evt.stopPropagation();
        };

        var onRemoveClick = function (evt) {
          //if dragging then we dont want to do anything
          if (dragging) return;

          //get the card element
          var container = $(evt.currentTarget).closest('.card')[0];

          if (container.querySelector(".title-container .close-btn").classList.contains("disabled")) return;

          //call appropriate function
          removeCard(container);

          //stop event bubbling up to select card
          evt.stopPropagation();
        };

        //iterate through each card container
        for (var i = 0; i < cardElements.length; i++) {

          if (cardElements[i].getAttribute('reorder') !== null) continue;

          //get the card element from each container
          var card = cardFromContainer(cardElements[i]);
          var dragHandle = card.getElementsByClassName('drag-handle');
          var upArrow = card.getElementsByClassName('arrow-up');
          var downArrow = card.getElementsByClassName('arrow-down');
          var editBtn = card.getElementsByClassName('editing-btn');
          var closeBtn = card.getElementsByClassName('close-btn');

          //set attribute so we know if it has been processed
          cardElements[i].setAttribute('reorder', '');

          //add event listeners
          card.addEventListener('click', click);

          if (upArrow && upArrow.length > 0)
            upArrow[0].addEventListener('click', onArrowUpClick);

          if (downArrow && downArrow.length > 0)
            downArrow[0].addEventListener('click', onArrowDownClick);

          if (editBtn && editBtn.length > 0)
            editBtn[0].addEventListener('click', onEditClick);

          if (closeBtn && closeBtn.length > 0)
            closeBtn[0].addEventListener('click', onRemoveClick);

          if (dragHandle && dragHandle.length > 0)
            dragHandle[0].addEventListener('mousedown', dragCard);
        }
      }

      function editCard(element) {
        var parentScope = angular.element(element.parentNode).scope();

        if (scope.onEdit) {
          scope.onEdit.apply(parentScope, [parentScope, element]);
        }
      }

      function removeCard(element) {
        var parentScope = angular.element(element.parentNode).scope();

        //get height of the container before the card is removed
        var oldHeight = parseInt(draggableContainer[0].style.height);

        if (scope.onRemove) {
          scope.onRemove.apply(parentScope, [parentScope, element]);
        }

        //wait for digest
        timeoutInstance.timeout(function () {
          //get height of the container after card is removed
          var newHeight = parseInt(draggableContainer[0].style.height);
          //scroll up to correct the container size change
          api.scrollByY(-(oldHeight - newHeight));
        });

      }

      function getFixedCards() {
        //get the latest card elements
        cardElements = draggableContainer[0].getElementsByClassName('card-container');

        var fixed = [];

        //group cards by type - ie. fixed or draggable
        for (var i = 0; i < cardElements.length; i++) {
          //get the card element from each container
          var card = angular.element(cardFromContainer(cardElements[i]));

          if (card.hasClass('fixed'))
            fixed.push(cardElements[i]);
        }

        return fixed;
      }

      function getDraggableCards() {
        //get the latest card elements
        cardElements = draggableContainer[0].getElementsByClassName('card-container');

        var draggable = [];

        //group cards by type - ie. fixed or draggable
        for (var i = 0; i < cardElements.length; i++) {
          //get the card element from each container
          var card = angular.element(cardFromContainer(cardElements[i]));

          if (card.hasClass('draggable'))
            draggable.push(cardElements[i]);
        }

        return draggable;
      }

      function reorderCards() {

        //initial top offset
        var top = 5;

        //revert values of stored draggable cards and fixed cards
        fixedCards = getFixedCards();
        draggableCards = getDraggableCards();

        var comparator = function (a, b) {
          var aProcessed = a.getAttribute('reorder') !== null;
          var bProcessed = b.getAttribute('reorder') !== null;

          //if one of them is not processed then move it to the bottom of the list
          if (!aProcessed && bProcessed) return 1;
          if (aProcessed && !bProcessed) return -1;

          var aTop = a.offsetTop;
          var bTop = b.offsetTop;

          if (aTop < bTop) return -1;
          if (aTop > bTop) return 1;
          return 0;
        };

        //sort each by offset and whether or not they have been previously ordered
        fixedCards.sort(comparator);
        draggableCards.sort(comparator);

        //now position cards based on their order
        for (var f = 0; f < fixedCards.length; f++) {
          //position each fixed card at the top
          var fixedCard = fixedCards[f];

          //set top position
          fixedCard.style.position = 'absolute';
          fixedCard.style.top = top + 'px';

          //store new top
          top += $(fixedCard).outerHeight(true);
        }

        //store upper bound
        draggableTop = top;

        for (var d = 0; d < draggableCards.length; d++) {
          //position each fixed card at the top
          var draggableCard = draggableCards[d];

          //set top position
          draggableCard.style.position = 'absolute';
          draggableCard.style.top = top + 'px';

          //store new top
          top += $(draggableCard).outerHeight(true);
        }

        //store lower bound
        draggableBottom = top;

        //find list base
        var listBase = draggableContainer[0].getElementsByClassName('list-base')[0];
        listBase.style.top = draggableBottom + 'px';

        //clear previous height - then set new one
        draggableContainer[0].style.height = '';
        draggableContainer[0].style.minHeight = element.height() + 'px';
        draggableContainer.height(draggableContainer[0].scrollHeight);

      }

      function orderCards() {

        var top = 5;

        //group cards by type - ie. fixed or draggable
        fixedCards = getFixedCards();
        draggableCards = getDraggableCards();

        //set the positions of each card
        for (var f = 0; f < fixedCards.length; f++) {
          //position each fixed card at the top
          var fixedCard = fixedCards[f];

          //set top position
          fixedCard.style.position = 'absolute';
          fixedCard.style.top = top + 'px';

          //store new top
          top += $(fixedCard).outerHeight(true);
        }

        //store upper bound
        draggableTop = top;

        for (var d = 0; d < draggableCards.length; d++) {
          //position each fixed card at the top
          var draggableCard = draggableCards[d];

          //set top position
          draggableCard.style.position = 'absolute';
          draggableCard.style.top = top + 'px';

          //store new top
          top += $(draggableCard).outerHeight(true);
        }

        //store lower bound
        draggableBottom = top;

        //create a base element to maintain height
        var base = document.createElement('div');
        base.style.position = 'absolute';
        base.style.width = '100%';
        base.style.height = '1px';
        base.style.top = draggableBottom + 'px';
        base.className = 'list-base';

        draggableContainer.append(base);
        draggableContainer[0].style.minHeight = element.height() + 'px';
        draggableContainer.height(draggableContainer[0].scrollHeight);
      }

      function selectCard(element) {
        //deselect any currently selected cards
        deselectCards();

        //select the current card
        if (scope.direction) {
          if (scope.direction.toLowerCase() === 'left')
            angular.element(element).addClass('active left');
          else
            angular.element(element).addClass('active right');
        } else {
          angular.element(element).addClass('active right');
        }

        if (scope.onSelect) {
          var cardScope = angular.element(element.parentNode).scope();
          scope.onSelect.apply(cardScope, [cardScope, element]);
        }
      }

      function deselectCards() {
        for (var i = 0; i < cardElements.length; i++) {
          angular.element(cardElements[i]).removeClass('tabbed');
          angular.element(cardFromContainer(cardElements[i])).removeClass('active right');
        }
      }

      function cardFromContainer(container) {

        //ensure container exists
        if (!container) throw new Error('Cannot find card');

        //get card element
        var card = container.getElementsByClassName('card');

        //ensure card element exists
        if (!card || card.length === 0) throw new Error('Card container is empty');

        //return card element
        return card[0];
      }

      function moveUp(element) {
        var cardContainer = element.parentNode;
        var previousCard = getPreviousCard(cardContainer);

        //if there is no previous card then dont do anything
        if (previousCard === null) return;

        //other wise lets swap their order
        var previousTop = previousCard.offsetTop;
        var currentHeight = $(cardContainer).outerHeight(true);

        var currentTop = previousTop + 'px';
        previousTop = (previousTop + currentHeight) + 'px';

        //animate the new positions
        moveCard(cardContainer, currentTop);
        moveCard(previousCard, previousTop, notifyReorder);

      }

      function moveCard(element, position, callback) {
        $(element).animate({
          top: position
        }, {
          duration: 100,
          queue: false,
          complete: callback
        });
      }

      function moveDown(element) {
        var cardContainer = element.parentNode;
        var nextCard = getNextCard(cardContainer);

        //if there is no next card then dont do anything
        if (nextCard === null) return;

        //other wise lets swap their order
        var currentTop = cardContainer.offsetTop;
        var nextHeight = $(nextCard).outerHeight(true);

        var nextTop = currentTop + 'px';
        currentTop = (currentTop + nextHeight) + 'px';

        //animate the new positions
        moveCard(cardContainer, currentTop);
        moveCard(nextCard, nextTop, notifyReorder);
      }

      function notifyReorder() {
        //when animation is completed then call the reorder callback
        if (scope.onReorder) {
          var sortedCards = allSortedCards();

          var scopes = [];

          for (var i = 0; i < sortedCards.length; i++) {
            //get the scope of the current card
            scopes.push(angular.element(sortedCards[i]).scope());
          }

          scope.onReorder(scopes);
        }
      }

      function clearSelection() {
        if (document.selection) document.selection.empty();
        else if (window.getSelection) window.getSelection().removeAllRanges();
      }

      function dragCard(event) {
        dragging = true;

        //ensure we remove any text selection before dragging
        clearSelection();

        var card = $(event.currentTarget).closest('.card');
        var cardContainer = card.closest('.card-container');

        //add drag styling
        card.addClass('dragging');

        var release = function () {

          //remove drag styling
          card.removeClass('dragging');

          //remove document event listener
          document.removeEventListener('mouseup', release);

          //remove reference to the card being dragged
          draggingCard.mouseOffset = null;
          draggingCard = null;

          //required so that mouse up event doesn't select the dragged item
          setTimeout(function () {
            dragging = false;
          });

          //snap dragged card to the correct location
          reorderAfterDrag(true);
        };

        //add event listener to document
        document.addEventListener('mouseup', release);

        //store dragging card
        draggingCard = cardContainer[0];
      }

      function onDrag(event) {
        if (!draggingCard) return;

        clearSelection();

        var elementY = draggableContainer[0].getBoundingClientRect().top;
        var mouseY = event.pageY;
        var cardTop = draggingCard.offsetTop;

        //calculate position from top
        var offsetY = (mouseY - elementY) + draggableContainer[0].scrollTop;

        var cardHeight = $(draggingCard).outerHeight(true);

        if (!draggingCard.mouseOffset)
          draggingCard.mouseOffset = offsetY - cardTop;

        //new top position
        var newYPos = (offsetY - draggingCard.mouseOffset);

        //if valid position then move
        if (newYPos < draggableTop) {
          draggingCard.style.top = draggableTop + 'px';
          return;
        } else if ((newYPos + cardHeight) > draggableBottom) {
          draggingCard.style.top = (draggableBottom - cardHeight) + 'px';
          return;
        }

        draggingCard.style.top = (offsetY - draggingCard.mouseOffset) + 'px';

        //reorder the cards based on the current drag position
        reorderAfterDrag(false);
      }

      function reorderAfterDrag(notify) {

        var cards = sortedDraggedCards();

        var top = draggableTop;

        for (var d = 0; d < cards.length; d++) {
          //position each fixed card at the top
          var draggableCard = cards[d];

          if (draggingCard !== draggableCard) {
            //set top position
            draggableCard.style.top = top + 'px';
          }

          //store new top
          top += $(draggableCard).outerHeight(true);
        }

        if (notify) notifyReorder();
      }

      function getPreviousCard(cardContainer) {
        var cards = sortedCards();

        var currentIdx = cards.indexOf(cardContainer);

        if (currentIdx === -1) throw new Error('Could not find container');

        //if there is no previous card then return null
        if (currentIdx === 0) return null;

        //otherwise return previous card
        return cards[currentIdx - 1];
      }

      function getNextCard(cardContainer) {
        var cards = sortedCards();

        var currentIdx = cards.indexOf(cardContainer);

        if (currentIdx === -1) throw new Error('Could not find container');

        //if there is no next card then return null
        if (currentIdx === (cards.length - 1)) return null;

        //otherwise return previous card
        return cards[currentIdx + 1];
      }

      function sortedCards() {

        //return the cards in order of top position
        return draggableCards.sort(function (a, b) {
          var aTop = a.offsetTop;
          var bTop = b.offsetTop;

          if (aTop < bTop) return -1;
          if (aTop > bTop) return 1;
          return 0;
        });
      }

      function allSortedCards() {

        //convert html collection to array
        var cards = [];
        for (var i = 0; i < cardElements.length; i++) cards.push(cardElements[i]);

        //return the cards in order of top position
        return cards.sort(function (a, b) {
          var aTop = a.offsetTop;
          var bTop = b.offsetTop;

          if (aTop < bTop) return -1;
          if (aTop > bTop) return 1;
          return 0;
        });
      }

      function sortedDraggedCards() {

        return draggableCards.sort(function (a, b) {

          var aTop = a.offsetTop;
          var aHeight = $(a).outerHeight(true);
          var aMidpoint = (aTop + (aHeight / 2));
          var aBottom = (aTop + aHeight);

          var bTop = b.offsetTop;
          var bHeight = $(b).outerHeight(true);
          var bMidpoint = (bTop + (bHeight / 2));
          var bBottom = (bTop + bHeight);

          if (a === draggingCard) {

            //need to cover this quirk - weird IE sorting
            if (aTop < bTop) {
              if (aBottom > bMidpoint) return 1;
            } else {
              if (bBottom > aMidpoint) return -1;
            }
          }

          if (b === draggingCard) {
            //need to cover this quirk - weird IE sorting
            if (aTop < bTop) {
              if (bTop < aMidpoint) return 1;
            } else {
              if (aTop < bMidpoint) return -1;
            }
          }

          if (aTop < bTop) return -1;
          if (aTop > bTop) return 1;
          return 0;
        });
      }

      function accesibility(evt) {
        //if we are not focused on our element dont do anything
        if (draggableContainer[0] !== document.activeElement) return;

        //get sorted cards
        var cards = allSortedCards();

        var tabbedCard, tabbedIndex = -1;

        //find the current tabbed card
        for (var i = 0; i < cards.length; i++) {
          if ($(cards[i]).hasClass('tabbed')) {
            tabbedCard = cards[i];
            tabbedIndex = i;
            break;
          }
        }

        //return key
        if (evt.keyCode === 13) {
          if (!tabbedCard) return;

          //get card element and select it
          selectCard(cardFromContainer(tabbedCard));
        }

        //up arrow
        if (evt.keyCode === 38) {
          //if we are trying to move to a non existent tab then stop
          if (tabbedIndex <= 0) return;

          //get new selected card
          var previousIndex = tabbedIndex - 1;

          //detabbify the old card
          if (tabbedCard) $(tabbedCard).removeClass('tabbed');

          //tabbify the new card
          $(cards[previousIndex]).addClass('tabbed');
        }

        //down arrow
        if (evt.keyCode === 40) {
          //if we are trying to move to a non existent tab then stop
          if (tabbedIndex >= (cards.length - 1)) return;

          //get new selected card
          var nextIndex = tabbedIndex + 1;

          //detabbify the old card
          if (tabbedCard) $(tabbedCard).removeClass('tabbed');

          //tabbify the new card
          $(cards[nextIndex]).addClass('tabbed');
        }

      }
    }
  };
}