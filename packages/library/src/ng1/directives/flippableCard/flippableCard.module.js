import FlippableCardDirective from './flippableCard.directive.js';
import CardFrontDirective from './cardFront.directive.js';
import CardBackDirective from './cardBack.directive.js';

angular.module('ux-aspects.flippableCard', [])
	.directive('flippableCard', FlippableCardDirective)
	.directive('cardFront', CardFrontDirective)
	.directive('cardBack', CardBackDirective);