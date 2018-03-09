describe('detail row header',function(){
  var $compile, $rootScope, $scope, $templateCache;
  var vm = {};
  var element;

  beforeEach(module("ux-aspects.sorters"));
  beforeEach(module("ux-aspects.safeTimeout"));

  beforeEach(inject(function (_$compile_, _$rootScope_,  _$templateCache_){
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    $scope = $rootScope.$new();
    $templateCache = _$templateCache_;
  }));

  describe("detail row header directive", function() {
    beforeEach(function() {
      vm = {};
      vm.activeSorter = [null, null, null];
      vm.sortOrder= ["none", "none", "none"];
      vm.detailRowHeaders=[
        {
          title:"Type",
          class:"col-xs-1"
        },
        {
          title:"Participant",
          class:"col-xs-3"
        },
        {
          title:"From Address",
          class:"col-xs-3",
          sort: "address",
          filter: "detailRowHeaderPopover.html",
          select: function () {
                return;
            }
        },
        { 
          title:"Subject",
          class:"col-xs-3",
          sort: "subject",
          select: function () {
                return;
            }          
        },
        {
          title:"Message Score",
          class:"col-xs-2",
          sort: "percent",
          select: function () {
                return;
            }
        }
      ];
       
      $templateCache.put('detailRowHeaderPopover.html', "<div></div>");

      $scope.vm = vm;
      var html = '<th detail-row-header headers="vm.detailRowHeaders"></th>';

      element = $compile(html)($scope);
      $scope.$digest();
    });

    it('should assign the correct names to the headers', function() {
      expect(angular.element(element.find(".title")[0]).text()).toBe("Type");
      expect(angular.element(element.find(".title")[4]).text()).toBe("Message Score");
    });

    it('should assign the correct classes to the headers', function() {
      expect(angular.element(element.find(".detail-row-header")[0]).hasClass("col-xs-1")).toBe(true);
      expect(angular.element(element.find(".detail-row-header")[4]).hasClass("col-xs-2")).toBe(true);
      expect(angular.element(element.find(".detail-row-header")[0]).hasClass("clickable")).toBe(false);
      expect(angular.element(element.find(".detail-row-header")[4]).hasClass("clickable")).toBe(true);
    });

    it('should add sort ascending icon to address column but not show number', function() {

      // get the third column as it is sortable
      var sortableColumn = element.find('.detail-row-header:eq(2)');

      sortableColumn.trigger("click");
      $scope.$digest();

      // get icon and number element
      var iconElement = sortableColumn.find('.sort i');
      var numberElement = sortableColumn.find('.sort .number');

      expect(iconElement.hasClass('hpe-ascend')).toBe(true);
      expect(iconElement.hasClass('hpe-descend')).toBe(false);
      expect(numberElement.text()).toBe("");
    });

    it('should add sort descending icon to address column but not show number', function() {

      // get the third column as it is sortable
      var sortableColumn = element.find('.detail-row-header:eq(2)');

      sortableColumn.trigger("click");
      sortableColumn.trigger("click");

      $scope.$digest();

      // get icon and number element
      var iconElement = sortableColumn.find('.sort i');
      var numberElement = sortableColumn.find('.sort .number');

      expect(iconElement.hasClass('hpe-ascend')).toBe(false);
      expect(iconElement.hasClass('hpe-descend')).toBe(true);
      expect(numberElement.text()).toBe("");
    });

    it('should remove sorting icon from address column', function() {

      // get the third column as it is sortable
      var sortableColumn = element.find('.detail-row-header:eq(2)');

      sortableColumn.trigger("click");
      sortableColumn.trigger("click");
      sortableColumn.trigger("click");

      $scope.$digest();

      // get icon element
      var iconElement = sortableColumn.find('.sort i');

      expect(iconElement.hasClass('hpe-ascend')).toBe(false);
      expect(iconElement.hasClass('hpe-descend')).toBe(false);
    });

    it('should add ascending to 3 rows and display numbers', function() {

      // get the several sortable columns
      var sortableColumnOne = element.find('.detail-row-header:eq(2)');
      var sortableColumnTwo = element.find('.detail-row-header:eq(3)');
      var sortableColumnThree = element.find('.detail-row-header:eq(4)');

      sortableColumnOne.trigger("click");
      sortableColumnTwo.trigger("click");
      sortableColumnThree.trigger("click");

      $scope.$digest();

      // get icon and number elements
      var iconElementOne = sortableColumnOne.find('.sort i');
      var iconElementTwo = sortableColumnTwo.find('.sort i');
      var iconElementThree = sortableColumnThree.find('.sort i');

      var numberElementOne = sortableColumnOne.find('.sort .number');
      var numberElementTwo = sortableColumnTwo.find('.sort .number');
      var numberElementThree = sortableColumnThree.find('.sort .number');
      

      expect(iconElementOne.hasClass('hpe-ascend')).toBe(true);
      expect(iconElementTwo.hasClass('hpe-ascend')).toBe(true);
      expect(iconElementThree.hasClass('hpe-ascend')).toBe(true);

      expect(numberElementOne.text()).toBe("1");
      expect(numberElementTwo.text()).toBe("2");
      expect(numberElementThree.text()).toBe("3");
    });

    it('should change sort order appropriately', function() {

      // get the several sortable columns
      var sortableColumnOne = element.find('.detail-row-header:eq(2)');
      var sortableColumnTwo = element.find('.detail-row-header:eq(3)');
      var sortableColumnThree = element.find('.detail-row-header:eq(4)');

      sortableColumnOne.trigger("click");
      sortableColumnTwo.trigger("click");
      sortableColumnThree.trigger("click");
      sortableColumnOne.trigger("click");
      
      $scope.$digest();

      // get icon and number elements
      var iconElementOne = sortableColumnOne.find('.sort i');
      var iconElementTwo = sortableColumnTwo.find('.sort i');
      var iconElementThree = sortableColumnThree.find('.sort i');

      var numberElementOne = sortableColumnOne.find('.sort .number');
      var numberElementTwo = sortableColumnTwo.find('.sort .number');
      var numberElementThree = sortableColumnThree.find('.sort .number');

      expect(iconElementOne.hasClass('hpe-descend')).toBe(true);
      expect(iconElementTwo.hasClass('hpe-ascend')).toBe(true);
      expect(iconElementThree.hasClass('hpe-ascend')).toBe(true);

      expect(numberElementOne.text()).toBe("3");
      expect(numberElementTwo.text()).toBe("1");
      expect(numberElementThree.text()).toBe("2");
    });

    it('should only display the filter on the correct row', function() {
      expect(element.find(".filter").length).toBe(1);
    });

  });

});