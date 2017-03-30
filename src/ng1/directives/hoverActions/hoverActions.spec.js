describe('hover actions directive', function () {

  var $compile, $rootScope, element, $scope, $timeout, $templateCache;

  beforeEach(module("ux-aspects.safeTimeout"));
  beforeEach(module("ux-aspects.hoverActions"));

  beforeEach(inject(function (_$compile_, _$rootScope_, _$timeout_, _$templateCache_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    $timeout = _$timeout_;
    $templateCache = _$templateCache_;
    $scope = $rootScope.$new();

    $scope.view = function () {

    };

    $scope.edit = function () {

    };

    //load all templates
    $templateCache.put(
      'hoverActions/templates/hoverAction.html',
      '<a tooltip="{{ name }}" aria-label="{{ name }}" class="hover-action" ng-show="icon" tabIndex="-1"><span class="hpe-icon" ng-class="icon" ></span></a>'
    );
  }));

  describe("hover action functionality", function () {
    beforeEach(function () {

      element = $compile('<div class="hover-actions-demo-container">' +
        '  <div class="actions">' +
        '    <hover-actions hover-element=".hover-actions-demo-container">' +
        '      <hover-action name="View" icon="hpe-view" click="view()"></hover-action>' +
        '      <hover-action name="Edit" icon="hpe-edit" click="edit()"></hover-action>' +
        '    </hover-actions>' +
        '  </div>' +
        '</div>')($scope);

      $timeout.flush();
      $scope.$digest();
    });

    it('should have the correct hover actions', function () {
      var hoverActionsContainer = element.find('.hover-actions');
      expect(hoverActionsContainer.length).toBe(1);

      var hoverActions = element.find('.hover-action');
      expect(hoverActions.length).toBe(2);
    });

    it('should not be initially visible', function () {
      var hoverActionsContainer = element.find('.hover-actions');
      expect(hoverActionsContainer.length).toBe(1);

      expect(hoverActionsContainer.hasClass('hovered')).toBe(false);
      expect(hoverActionsContainer.hasClass('focused')).toBe(false);
    });

    it('should be visible after element focus', function () {

      element.triggerHandler('focus');

      var hoverActionsContainer = element.find('.hover-actions');
      expect(hoverActionsContainer.length).toBe(1);

      expect(hoverActionsContainer.hasClass('hovered')).toBe(false);
      expect(hoverActionsContainer.hasClass('focused')).toBe(true);
    });

    it('should call functions on click', function () {
      var hoverActions = element.find('.hover-action');
      expect(hoverActions.length).toBe(2);

      spyOn($scope, "view");
      hoverActions.first().triggerHandler('click');
      expect($scope.view).toHaveBeenCalled();

      spyOn($scope, "edit");
      hoverActions.last().triggerHandler('click');
      expect($scope.edit).toHaveBeenCalled();

    });

  });

});