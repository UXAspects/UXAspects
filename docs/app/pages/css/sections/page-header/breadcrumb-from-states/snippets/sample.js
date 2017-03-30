$breadcrumbProvider.setOptions({
    includeAbstract: true
});

$stateProvider.state('/', {
    url: '/',
    templateUrl: "app/views/blank.html",
    ncyBreadcrumb: {
        label: "Home"
    }
}).state('components', {
    abstract: 'true',
    url: '/components',
    template: "<ui-view autoscroll=\"true\" />",
    ncyBreadcrumb: {
        label: 'Components',
        parent: "/"
    }
}).state('components.inputControls', {
    abstract: 'true',
    url: '/inputControls',
    template: "<ui-view autoscroll=\"true\" />",
    ncyBreadcrumb: {
        label: 'Input Controls'
    }
}).state('components.inputControls.basicControls', {
    url: '/basicControls',
    templateUrl: "app/inputControls/basicControls.html",
    data: {
        pageTitle: 'Basic Controls'
    }
});