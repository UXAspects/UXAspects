import ThumbnailDirective from './thumbnail.directive.js';
import ThumbnailController from './thumbnail.controller.js';

angular.module("ux-aspects.thumbnail", [])
    .directive("thumbnail", ThumbnailDirective)
    .controller("ThumbnailCtrl", ThumbnailController);
