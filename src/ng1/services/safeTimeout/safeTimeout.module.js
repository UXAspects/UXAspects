import SafeTimeoutService from './safeTimeout.service.js';

angular.module("ux-aspects.safeTimeout", [])
    .service("safeTimeout", SafeTimeoutService);
