describe('Modal Inset Panel directive', function() {

    var $compile, $rootScope, $timeout, element;

    beforeEach(module("ux-aspects.modalInsetPanel"));
    beforeEach(module("ux-aspects.safeAnimationFrame"));

    beforeEach(inject(function(_$compile_, _$rootScope_, _$timeout_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
        $timeout = _$timeout_;
    }));

    it("should initialise correctly", function() {
        createElement(false, 'right', 300, true);

        var panelRegion = element.find('.modal-panel-region');
        var modalPanel = element.find('.modal-panel');
        var modalPanelContent = element.find('.modal-panel-content');

        expect(panelRegion.length).toBe(1);
        expect(modalPanel.length).toBe(1);
        expect(modalPanelContent.length).toBe(1);
    });

    it("should have correct panel width", function() {
        createElement(false, 'right', 300, true);

        var modalPanel = element.find('.modal-panel');
        expect(modalPanel.width()).toBe(300);
    });

    it("should be hidden", function() {
        createElement(false, 'right', 300, true);

        var modalPanel = element.find('.modal-panel');
        expect(modalPanel.get(0).style.transform).toBe('translateX(310px)');
    });

    it("should be shown", function() {
        var scope = createElement(true, 'right', 300, true);
        scope.$digest();

        var modalPanel = element.find('.modal-panel');
        expect(modalPanel.get(0).style.transform).not.toBe('translateX(310px)');
    });

    it("should start hidden then be shown", function(done) {
        var scope = createElement(false, 'right', 300, true);

        var modalPanel = element.find('.modal-panel');
        expect(modalPanel.get(0).style.transform).toBe('translateX(310px)');

        //ensure values are correctly set
        scope.$digest();

        scope.showPanel = true;

        scope.$digest();

        setTimeout(function() {
          expect(modalPanel.get(0).style.transform).toBe('translateX(0px)');
          done();
        }, 500);
    });

    it("should display on left side", function() {
        createElement(true, 'left', 300, true);
        var modalPanel = element.find('.modal-panel');
        expect(modalPanel.hasClass('left')).toBe(true);
        expect(modalPanel.hasClass('right')).toBe(false);
    });

    it("should display on right side", function() {
        createElement(true, 'right', 300, true);
        var modalPanel = element.find('.modal-panel');
        expect(modalPanel.hasClass('left')).toBe(false);
        expect(modalPanel.hasClass('right')).toBe(true);
    });

    function createElement(showPanel, panelSide, panelWidth, allowDismiss) {
      var html = "<div style=\"width: 500px; height: 500px\">";
      html += "  <modal-inset-panel show-panel=\"showPanel\" panel-side=\"panelSide\" panel-width=\"panelWidth\">";
      html += "    <modal-inset-header allow-dismiss=\"" + (allowDismiss ? "true" : "false") + "\">";
      html += "      <h3>Sample Title<\/h3>";
      html += "    <\/modal-inset-header>";
      html += "    <modal-inset-content>";
      html += "    <p>Sample Content</p>";
      html += "    <\/modal-inset-content>";
      html += "  <\/modal-inset-panel>";
      html += "<\/div>";

      var $scope = $rootScope.$new();
      $scope.showPanel = showPanel;
      $scope.panelSide = panelSide;
      $scope.panelWidth = panelWidth;

      element = $compile(html)($scope);

      return $scope;
    }

});
