import DraggableCardsDirective from './draggableCards.directive.js';
import DraggableCardDirective from './cards/draggableCard.directive.js';
import FixedCardDirective from './cards/fixedCard.directive.js';
import '../../services/safeTimeout/safeTimeout.module.js';
import '../../services/safeEventListener/safeEventListener.module.js';

angular.module("ux-aspects.draggableCards", ['ux-aspects.safeTimeout', 'ux-aspects.safeEventListener'])
	.directive('draggableCards', DraggableCardsDirective)
	.directive('draggableCard', DraggableCardDirective)
	.directive('fixedCard', FixedCardDirective);

