describe('scrollable table', function () {
  var $compile, $rootScope, $scope, $timeout;
  var vm = {};
  var element;

  beforeEach(module("scrollable-table"));
  beforeEach(module("ux-aspects.sorters"));
  beforeEach(module("ux-aspects.safeAnimationFrame"));
  beforeEach(module("ux-aspects.safeTimeout"));
  beforeEach(module("ux-aspects.resizeService"));


  beforeEach(inject(function (_$compile_, _$rootScope_, _$timeout_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    $scope = $rootScope.$new();
    $timeout = _$timeout_;
  }));

  describe("multi sorter header directive", function () {
    beforeEach(function () {
      vm = {};
      vm.activeSorter = ["none", "none", "none"];
      vm.orderDesc = ["none", "none", "none"];
      vm.gridColumnHeader = {
        headers: [{
          sorterHeader: "NAME",
          sortable: true,
          sort: "document",
          select: function () {
            return;
          }
        }, {
          sorterHeader: "AUTHOR",
          sortable: true,
          sort: "name",
          select: function () {
            return;
          }
        }, {
          sorterHeader: "DATE MODIFIED",
          sortable: true,
          sort: "date",
          select: function () {
            return;
          }
        }, {
          sorterHeader: "unclickable",
          sortable: false
        }]
      };

      spyOn(vm.gridColumnHeader.headers[0], 'select');
      vm.gridColumnHeader.headers[0].select("name", true);


      $scope.vm = vm;
      var html =
        '<tr multi-sortable-header headers="vm.gridColumnHeader.headers" default-sorter="vm.activeSorter", default-order="vm.orderDesc"></tr>';

      element = $compile(html)($scope);
      $timeout.flush();
      $scope.$digest();
    });

    it('should assign the correct name to the first header and no icon or numbers to be visible', function () {

      // get headers
      var headers = element.find('.header');

      // get the first header
      var firstHeader = headers.first();
      
      // get title and icon in table head
      var firstHeaderTitle = firstHeader.find('.multiSortTitle');
      var firstHeaderIcon = firstHeader.find('.sortableHeaderIcon');
      var firstHeaderNumber = firstHeader.find('.multiSortNumber');

      // check properties
      expect(firstHeaderTitle.text()).toBe("NAME");
      expect(firstHeaderIcon.hasClass('hpe-ascend')).toBe(false);
      expect(firstHeaderIcon.hasClass('hpe-descend')).toBe(false);
      expect(firstHeaderNumber.text()).toBe('');
    });

    it('should assign ascending icon to selected header and hide the number 1', function () {

      // get headers
      var headers = element.find('.header');

      // get the first header
      var firstHeader = headers.first();

      // get title and icon in table head
      var firstHeaderIcon = firstHeader.find('.sortableHeaderIcon');
      var firstHeaderNumber = firstHeader.find('.multiSortNumber');

      // click the header
      firstHeader.trigger("click");
      
      $scope.$digest();

      expect(vm.gridColumnHeader.headers[0].select).toHaveBeenCalled();
      expect(firstHeaderIcon.hasClass('hpe-ascend')).toBe(true);
      expect(firstHeaderIcon.hasClass('hpe-descend')).toBe(false);
      expect(firstHeaderNumber.text()).toBe('1');
      
    });

    it('should assign decending icon to selected header and hide the number 1', function () {

      // get headers
      var headers = element.find('.header');

      // get the first header
      var firstHeader = headers.first();

      // get title and icon in table head
      var firstHeaderIcon = firstHeader.find('.sortableHeaderIcon');
      var firstHeaderNumber = firstHeader.find('.multiSortNumber');

      // click the header twice
      firstHeader.trigger("click").trigger("click");

      $scope.$digest();

      expect(firstHeaderIcon.hasClass('hpe-ascend')).toBe(false);
      expect(firstHeaderIcon.hasClass('hpe-descend')).toBe(true);

      expect(firstHeaderNumber.text()).toBe('1');      
      
    });

    it('should remove sorting icon and number on 3rd click', function () {

      // get headers
      var headers = element.find('.header');

      // get the first header
      var firstHeader = headers.first();

      // get title and icon in table head
      var firstHeaderIcon = firstHeader.find('.sortableHeaderIcon');
      var firstHeaderNumber = firstHeader.find('.multiSortNumber');

      firstHeader.trigger("click");
      $scope.$digest();

      expect(firstHeaderIcon.hasClass('hpe-ascend')).toBe(true);
      expect(firstHeaderIcon.hasClass('hpe-descend')).toBe(false);
      expect(firstHeaderNumber.text()).toBe('1');

      firstHeader.trigger("click");

      $scope.$digest();

      expect(firstHeaderIcon.hasClass('hpe-ascend')).toBe(false);
      expect(firstHeaderIcon.hasClass('hpe-descend')).toBe(true);
      expect(firstHeaderNumber.text()).toBe('1');

      firstHeader.trigger("click");

      $scope.$digest();

      expect(firstHeaderIcon.hasClass('hpe-ascend')).toBe(false);
      expect(firstHeaderIcon.hasClass('hpe-descend')).toBe(false);
      expect(firstHeaderNumber.text()).toBe('');
    });

    it('should assign sorting to 3 columns in order of clicks and display appropriate order number', function () {

      // get headers
      var headers = element.find('.header');

      // get the headers
      var firstHeader = headers.first();
      var secondHeader = headers.eq(1);
      var thirdHeader = headers.eq(2);

      // get icons
      var firstHeaderIcon = firstHeader.find('.sortableHeaderIcon');
      var secondHeaderIcon = secondHeader.find('.sortableHeaderIcon');
      var thirdHeaderIcon = thirdHeader.find('.sortableHeaderIcon');
      

      firstHeader.trigger("click");
      $scope.$digest();

      secondHeader.trigger("click");
      $scope.$digest();

      thirdHeader.trigger("click");
      $scope.$digest();

      expect(firstHeaderIcon.hasClass('hpe-ascend')).toBe(true);
      expect(secondHeaderIcon.hasClass('hpe-ascend')).toBe(true);
      expect(thirdHeaderIcon.hasClass('hpe-ascend')).toBe(true);

    });

    it('should reorder sorting so last item click is lowest priority', function () {

      // get headers
      var headers = element.find('.header');

      // get the headers
      var firstHeader = headers.first();
      var secondHeader = headers.eq(1);
      var thirdHeader = headers.eq(2);

      // get icons
      var firstHeaderIcon = firstHeader.find('.sortableHeaderIcon');
      var secondHeaderIcon = secondHeader.find('.sortableHeaderIcon');
      var thirdHeaderIcon = thirdHeader.find('.sortableHeaderIcon');


      firstHeader.trigger("click");
      $scope.$digest();

      secondHeader.trigger("click");
      $scope.$digest();

      thirdHeader.trigger("click");
      $scope.$digest();

      secondHeader.trigger("click");
      $scope.$digest();

      expect(firstHeaderIcon.hasClass('hpe-ascend')).toBe(true);
      expect(secondHeaderIcon.hasClass('hpe-descend')).toBe(true);
      expect(thirdHeaderIcon.hasClass('hpe-ascend')).toBe(true);
    });

    it('should not apply sorting to unsortable column', function () {

      // get headers
      var headers = element.find('.header');
      
      // get the header
      var fourthHeader = headers.eq(3);

      // get the icon
      var fourthHeaderIcon = fourthHeader.find('.sortableHeaderIcon');

      fourthHeader.trigger("click");
      $scope.$digest();

      expect(fourthHeaderIcon.hasClass('hpe-ascend')).toBe(false);
      expect(fourthHeaderIcon.hasClass('hpe-descend')).toBe(false);
    });

  });

});