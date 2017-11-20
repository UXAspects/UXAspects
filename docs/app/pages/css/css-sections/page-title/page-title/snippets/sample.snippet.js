$stateProvider.state('pagetitle', {
    url: '/pagetitle',
    templateUrl: "app/pageTitle/pageTitle.html",
    controller: "PageTitleCtrl as pt",
    data: {
        pageTitle:'Page Title'
    }
});