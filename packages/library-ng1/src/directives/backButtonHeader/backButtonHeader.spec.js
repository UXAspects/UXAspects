describe('back button directive', function() {
  
  var $compile, $rootScope, $scope, element, state;

  beforeEach(module("ux-aspects.backButtonHeader"));

  beforeEach(inject(function (_$compile_, _$rootScope_, $state){
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    $scope = $rootScope.$new();
    state = $state;

    var html = '<div><back-button-header target-state="\'/test\'"></back-button-header></div>';

    element = $compile(html)($scope);
    $scope.$digest();
  }));

  it('should call the state.go function when clicked', function(){
    spyOn(state, "go");
    element.find('.hpe-icon').trigger("click");
    $scope.$digest();
    expect(state.go).toHaveBeenCalled();
  });

  it('should call the state.go function with with the target-state', function() {
    spyOn(state, "go");
    element.find('.hpe-icon').trigger("click");
    $scope.$digest();
    expect(state.go).toHaveBeenCalledWith('/test');
  });

  it('should call the transitionTo function when clicked', function() {
    spyOn(state, "transitionTo");
    element.find('.hpe-icon').trigger("click");
    $scope.$digest();
    expect(state.transitionTo).toHaveBeenCalled();
  });
});
