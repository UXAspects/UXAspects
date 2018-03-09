describe('scrollable table',function(){
  var $compile, $rootScope, $scope;
  var vm = {};
  var element;

  beforeEach(module("scrollable-table"));
  beforeEach(module("ux-aspects.sorters"));
  beforeEach(module("ux-aspects.resizeService"));
  beforeEach(module("ux-aspects.safeAnimationFrame"));

  beforeEach(inject(function (_$compile_, _$rootScope_){
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    $scope = $rootScope.$new();
  }));

  describe("sorter header directive", function() {
    beforeEach(function() {
      vm = {};
      vm.activeSorter = "date";
      vm.orderDesc=false;
      vm.gridColumnHeader={
        headers: [
          {
            sorterHeader: "NAME",
            sortable: true,
            sort: "document",
            select: function () {
                return;
            }
          },
          {
            sorterHeader: "AUTHOR",
            sortable: true,
            sort: "name",
            select: function () {
                return;
            }
          },
          {
            sorterHeader: "DATE MODIFIED",
            sortable: true,
            sort: "date"
          },
          {
            sorterHeader: "unclickable",
            sortable:false
          }
        ]
      };

      spyOn(vm.gridColumnHeader.headers[0], 'select');
      vm.gridColumnHeader.headers[0].select("name", true);


      $scope.vm = vm;
      var html =
      '<tr sortable-header headers="vm.gridColumnHeader.headers" default-sorter="vm.activeSorter", default-order="vm.orderDesc"></tr>';

      element = $compile(html)($scope);
      $scope.$digest();
    });

    it('should assign the correct name to the first header', function() {

      // get table elements
      var nameColumn = element.find('th').first();
      var columnTitle = nameColumn.find('p');

      expect(columnTitle.text()).toBe("NAME");
    });

    it('should assign ascending icon to default header', function() {

      // get table elements
      var dateColumn = element.find('th').eq(2);
      var columnIcon = dateColumn.find('i');

      expect(columnIcon.hasClass("hpe-ascend")).toBe(true);
    });

    it('should assign ascending icon to selected header and remove icon from default header & select to be called', function() {
      
      // get table elements
      var nameColumn = element.find('th').first();
      var columnIcon = nameColumn.find('i');

      // sort by first column
      nameColumn.trigger("click");

      $scope.$digest();

      expect(vm.gridColumnHeader.headers[0].select).toHaveBeenCalled();
      expect(columnIcon.hasClass('hpe-ascend')).toBe(true);
      expect(columnIcon.hasClass('hpe-descend')).toBe(false);
    });

    it('should assign descending icon to the selected header on second click', function() {

      // get table elements
      var nameColumn = element.find('th').first();
      var columnIcon = nameColumn.find('i');

      nameColumn.trigger("click");
      nameColumn.trigger("click");

      $scope.$digest();

      expect(columnIcon.hasClass('hpe-ascend')).toBe(false);
      expect(columnIcon.hasClass('hpe-descend')).toBe(true);
    });

    it('should remove sort from current collumn and sort by another column on click', function() {

      // get table elements
      var nameColumn = element.find('th').first();
      var authorColumn = element.find('th').eq(1);

      var nameIcon = nameColumn.find('i');
      var authorIcon = authorColumn.find('i');

      nameIcon.trigger("click");
      authorIcon.trigger("click");

      $scope.$digest();

      expect(nameIcon.hasClass('hpe-ascend')).toBe(false);
      expect(authorIcon.hasClass('hpe-ascend')).toBe(true);
    });

    it('should not sort unsortable columns and current sort should remain', function() {

      // get table elements
      var dateColumn = element.find('th').eq(2);
      var unsortableColumn = element.find('th').eq(3);

      var dateIcon = dateColumn.find('i');
      var unsortableIcon = unsortableColumn.find('i');      

      unsortableColumn.trigger("click");
      $scope.$digest();

      expect(dateIcon.hasClass('hpe-ascend')).toBe(true);
      expect(unsortableIcon.hasClass('hpe-ascend')).toBe(false);
    });

  });

});
