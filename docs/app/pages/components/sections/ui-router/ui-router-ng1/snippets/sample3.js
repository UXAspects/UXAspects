$urlRouterProvider.otherwise("/");

$stateProvider.state("/", {
    url: "/",
    templateUrl: "app/views/blank.html"
})
.state("patterns", {
    abstract: "true",
    url: "/patterns",
    template: "<ui-view autoscroll=\"true\"/>"
})
.state("patterns.sidenavigation", {
    url: "/sidenavigation",
    templateUrl: "app/sideNavigation/sideNavigation.html",
    controller: "SideNavigationCtrl as sn",
    data: {
        pageTitle:"Navigation"
    }
})
.state("patterns.uirouter", {
    url: "/uirouter",
    templateUrl: "app/uiRouter/uiRouter.html",
    data: {
        pageTitle: "UI Router"
    }
});