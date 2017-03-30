describe('item display panel', function() {
	var $compile, $rootScope, element, $scope, $displayPanel, panelOptions;

	beforeEach(module('ux-aspects'));
	beforeEach(module('ux-aspects.displayPanels'));

	beforeEach(inject(function(_$compile_, _$rootScope_, _$displayPanel_) {
		$compile = _$compile_;
		$rootScope = _$rootScope_;
		$displayPanel = _$displayPanel_;
		$scope = $rootScope.$new();
	}));

	beforeEach(function() {
		var html = '<li></li>';
		element = $compile(html)($scope);
		$scope.$digest();

		panelOptions = {
			"scope": $scope.$new(),
			"title": "The title",
			"main": "pages/en-us/components/panels/item_display_panel/template/PreviewPPT.tmpl.html",
			"footer": "pages/en-us/components/panels/item_display_panel/template/itemDisplayPanelFooterButtons.tmpl.html",
			"modalColumns": "col-lg-6 col-md-7 col-sm-9 col-xs-10",
			"top": 50	
		};
	});

	it('should create an instance of displayPanel factory', function() {
		expect($displayPanel).toBeDefined();
	});

	it('should not be open initially', function() {
		expect($displayPanel.panelOpen()).toBe(false);
	});

	it('should not be hidden initially', function() {
		expect($displayPanel.panelHidden()).toBe(false);
	});

	it('should open/close the display panel when the open/close functions are called', function() {
		$displayPanel.open(element, panelOptions, false, false, true);
		expect($displayPanel.panelOpen()).toBe(true);
		$displayPanel.close(panelOptions);
		expect($displayPanel.panelOpen()).toBe(false);
	});

});