import SafeAnimationFrameService from './safeAnimationFrame.service.js';

angular.module("ux-aspects.safeAnimationFrame", [])
  .service("safeAnimationFrame", ['$window', SafeAnimationFrameService]);
