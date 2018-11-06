describe('tree view', function () {
  var $compile, $rootScope, $scope, element, $timeout, $interval;

  beforeEach(module("ux-aspects.treeview"));

  beforeEach(inject(function (_$compile_, _$rootScope_, _$timeout_, _$interval_) {
    $compile = _$compile_;
    $timeout = _$timeout_;
    $interval = _$interval_;
    $rootScope = _$rootScope_;
    $scope = $rootScope.$new();


    $scope.selected = {
      id: "0",
      title: ""
    };

    $scope.newValue = {
      allowChildren: false,
      title: "",
    };

    $scope.iconConfig = {
      folder: {
        collapsed: "hp-folder-closed",
        expanded: "hp-folder-opened"
      },
      item: "hp-general-document",
      'default': "hp-3d"
    };

    $scope.treeOptions = {
      showTreeLines: false,
      openOnSelect: false,
      loadHeight: 72
    };

    $scope.addItem = function () {
      return {
        id: -1,
        allowChildren: $scope.newValue.allowChildren,
        title: $scope.newValue.title || 'New User Defined Item',
        type: $scope.newValue.allowChildren ? 'folder' : 'item',
        nodes: []
      };
    };

    $scope.deleteFn = function () {
      return true;
    };

    $scope.data = [{
      'id': 1,
      'title': 'Documents',
      'allowChildren': true,
      'type': 'folder',
      'nodes': [{
        'id': 12,
        'title': 'Pictures',
        'allowChildren': true,
        'type': 'folder',
        'nodes': [{
          'title': 'Alcazar',
          'type': 'item'
        }]
      }]
    }];

    var html = '<div><tree-view data="data" selected="selected" add-item="addItem" icons="iconConfig" delete="deleteFn" options="treeOptions"></tree-view>' +
      '<button id="add" ng-click="addItem()"></button>' +
      '<button id="delete" ng-click="deleteFn()"></button></div>';

    element = $compile(html)($scope);
    $timeout.flush();
    $scope.$digest();

  }));

  afterAll(function () {
    $scope.$destroy();
  });

  it('should assign the correct names to the nodes', function () {
    expect(element.find('.title-readonly:first').text().trim()).toBe("Documents");
    expect(element.find('.title-readonly:last').text().trim()).toBe("Alcazar");
  });

  it('should have the correct icon when showing or hiding children', function () {
    expect(element.find('.icon:first i').hasClass('hp-folder-closed')).toBe(true);
    element.find('.chevron:first').trigger("click");
    $scope.$digest();
    expect(element.find('.icon:first i').hasClass('hp-folder-opened')).toBe(true);
    element.find('.chevron:first').trigger("click");
    $scope.$digest();
    expect(element.find('.icon:first i').hasClass('hp-folder-closed')).toBe(true);
  });

  it('should highlight selected node', function () {
    expect(element.find('.tree-node:first').hasClass('highlight')).toBe(false);
    element.find('.tree-node:first').trigger("click");
    $scope.$digest();
    expect(element.find('.tree-node:first').hasClass('highlight')).toBe(true);
  });

  it('should allow text edit on second click', function () {
    element.find('.tree-node:last').trigger("click");
    $scope.$digest();
    expect(element.find('.title-readonly:first').hasClass('ng-hide')).toBe(false);
    expect(element.find('.title-edit:first').hasClass('ng-hide')).toBe(true);
    element.find('.title-readonly:first').trigger("click");
    $scope.$digest();
    expect(element.find('.title-readonly:first').hasClass('ng-hide')).toBe(false);
    expect(element.find('.title-edit:first').hasClass('ng-hide')).toBe(true);
    element.find('.title-readonly:first').trigger("click");
    $scope.$digest();
    expect(element.find('.title-readonly:first').hasClass('ng-hide')).toBe(true);
    expect(element.find('.title-edit:first').hasClass('ng-hide')).toBe(false);
  });

  it('should show or hide child nodes on chevron click', function () {
    expect(element.find('li:first ol:first').hasClass('hidden')).toBe(true);
    element.find('.chevron:first').trigger("click");
    $scope.$digest();
    expect(element.find('li:first ol:first').hasClass('hidden')).toBe(false);
    element.find('.chevron:first').trigger("click");
    $scope.$digest();
    expect(element.find('li:first ol:first').hasClass('hidden')).toBe(true);
  });

  it('should add a new item', function () {
    expect(element.find('.title-readonly:last').text().trim()).toBe("Alcazar");
    element.find('li:first ol:first .title-readonly:first').trigger("click");
    $scope.$digest();
    element.find('#add:first').trigger("click");
    $scope.$digest();
    expect(element.find('.title-readonly:last').text().trim()).toBe("New User Defined Item");
  });

  it('should delete the last element', function (done) {
    expect(element.find('.title-readonly:last').text().trim()).toBe("Alcazar");
    element.find('.title-readonly:last').trigger("click");
    $scope.$digest();
    element.find('#delete:first').trigger("click");
    $scope.$digest();
    $timeout(function () {
      expect(element.find('.title-readonly:last').text().trim()).toBe("Pictures");
      done();
    });
    $timeout.flush();
  });

  it("should expand to the selected node", function() {
    expect(element.find('.icon:first i').hasClass('hp-folder-closed')).toBe(true);
    $scope.selected = $scope.data[0].nodes[0].nodes[0];
    $scope.$digest();
    expect(element.find('.icon:first i').hasClass('hp-folder-opened')).toBe(true);
    expect(element.find('li:first ol:first').hasClass('hidden')).toBe(false);
    expect(element.find('li:first ol:first li:first ol:first').hasClass('hidden')).toBe(false);
  });

});