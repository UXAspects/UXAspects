// Set up states for each tab. The 'ncyBreadcrumb.label' property allows the breadcrumb text to be set for each tab.
.state('patterns.pagelayout.breadCrumbWithTabState', {
	abstract: true,
	url: '/breadCrumbWithTabState',
	template: "<div ui-view></div>",
	ncyBreadcrumb: {
		skip: true
	}
})
.state('patterns.pagelayout.breadCrumbWithTabState.documentationTab', {
	url: '/documentationTab',
	templateUrl: "app/breadCrumb/breadCrumbWithTabState/breadCrumbWithTabState.html",
	controller: 'BreadCrumbWithTabStateCtrl as vm',
	data: {
		pageTitle: 'Breadcrumb with Tab State'
	},
	ncyBreadcrumb: {
		label: 'Breadcrumb with Tab State - Documentation'
	}
})
.state('patterns.pagelayout.breadCrumbWithTabState.additionalTab', {
	url: '/additionalTab',
	templateUrl: "app/breadCrumb/breadCrumbWithTabState/breadCrumbWithTabState.html",
	controller: 'BreadCrumbWithTabStateCtrl as vm',
	data: {
		pageTitle: 'Breadcrumb with Tab State'
	},
	ncyBreadcrumb: {
		label: 'Breadcrumb with Tab State - Additional'
	}
})
.state('patterns.pagelayout.breadCrumbWithTabState.documentationDetail', {
	url: '/documentationDetail',
	templateUrl: "app/breadCrumb/breadCrumbWithTabState/documentationDetail.html",
	data: {
		pageTitle: 'Detail'
	},
	ncyBreadcrumb: {
		label: "Detail",
		parent: 'patterns.pagelayout.breadCrumbWithTabState.documentationTab'
	}
})