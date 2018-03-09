describe('sort direction toggle directive', function () {
  var $compile, $rootScope, $scope;
  var suite = {};

  beforeEach(module("ux-aspects.sorters"));

  beforeEach(inject(function (_$compile_, _$rootScope_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    $scope = $rootScope.$new();

    $scope.sortDirectionToggle = {
      label: 'Sort by:',
      sorters: [{
        name: 'Document',
        sort: 'document',
        select: jasmine.createSpy('spy')
      }, {
        name: 'Name',
        sort: 'name',
        defaultSorter: true,
        select: function () {
          return;
        }
      }, {
        name: 'Date',
        sort: 'date',
        select: function () {
          return;
        }
      }]
    };

    var html = '<sort-direction-toggle label="sortDirectionToggle.label" sorters="sortDirectionToggle.sorters"></sort-direction-toggle>';

    var htmlDescend = '<sort-direction-toggle label="sortDirectionToggle.label" sorters="sortDirectionToggle.sorters" descend="true"></sort-direction-toggle>';

    if (!suite.element) {
      suite.element = $compile(html)($scope);
      suite.elementDescend = $compile(htmlDescend)($scope);
      $scope.$digest();
    }
  }));

  afterAll(function () {
    $scope.$destroy();
    suite.element.remove();
    suite = null;
  });

  it('should display the default value', function () {
    expect(suite.element.find('button').first().text().slice(0, 4)).toBe('Name');
  });

  it('should show the icon ascending by default', function () {
    expect(suite.element.find('.sort-icon').hasClass('hpe-ascend')).toBe(true);
    expect(suite.element.find('.sort-icon').hasClass('hpe-descend')).toBe(false);
  });

  it('should have the correct number of dropdown items', function () {
    expect(suite.element.find('li').length).toBe(3);
  });

  it('should call the select function when a dropdown item is selected', function () {
    var scope = suite.element.scope();
    suite.element.find('a:first').trigger('click');
    $scope.$digest();
    expect(scope.sortDirectionToggle.sorters[0].select).toHaveBeenCalled();
  });

  it('should call the toggle function when the toggle icon is clicked', function () {
    var scope = suite.element.scope();
    expect(suite.element.find('.sort-icon').hasClass('hpe-descend')).toBe(false);
    suite.element.find('.sort-icon').trigger('click');
    $scope.$digest();
    expect(suite.element.find('.sort-icon').hasClass('hpe-descend')).toBe(true);
    expect(scope.sortDirectionToggle.sorters[0].select).toHaveBeenCalled();
  });

  it('should call the toggleKeypress function when the toggle recieves a keypress', function () {
    expect(suite.element.find('.sort-icon').hasClass('hpe-descend')).toBe(true);
    var scope = suite.element.scope();
    var enter = jQuery.Event("keypress");
    enter.keyCode = 13;
    suite.element.find('.sort-icon').trigger(enter);
    $scope.$digest();
    expect(suite.element.find('.sort-icon').hasClass('hpe-descend')).toBe(false);
    expect(scope.sortDirectionToggle.sorters[0].select).toHaveBeenCalled();
  });

  it('should show the icon decending when decend is set', function () {
    expect(suite.elementDescend.find('.sort-icon').hasClass('hpe-ascend')).toBe(false);
    expect(suite.elementDescend.find('.sort-icon').hasClass('hpe-descend')).toBe(true);
  });

});