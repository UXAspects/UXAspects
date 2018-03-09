describe('Sorters',function(){
  var $compile, $rootScope, $scope;
  var vm = {};
  var element;

  beforeEach(module("ux-aspects.sorters"));
  beforeEach(module("ux-aspects.previewPanes"));

  beforeEach(inject(function (_$compile_, _$rootScope_){
    $compile = _$compile_;
    $rootScope = _$rootScope_;
  }));
  describe("sorter directive", function() {
  	beforeEach(function() {
	$scope = $rootScope.$new();
      vm.activeSorter = "date";
      vm.orderDesc=false;
	vm.sorters={
      title: "Sort by",
      options: [
        {
          name: "NAME",
          sort: "document",
          default: false,
          iconClass: "hpe-icon hpe-manual"
        },
        {
          name: "AUTHOR",
          sort: "name",
          default: false
        },
        {
          name: "DATE MODIFIED (earliest)",
          sort: "date",
          default: false
        },
        {
          name: "DATE MODIFIED (latest)",
          sort: "date",
          orderDesc: true,
          default: true
        }
       ]
    };
     vm.sorters.options.forEach(function (option) {
        option.select = jasmine.createSpy();
        });

      $scope.vm = vm;
      var html = '<sorter sorter-title="vm.sorters.title">';
    html+= '<sorter-option ng-repeat="option in vm.sorters.options" name="option.name"';
    html+='select="option.select(option)" icon-class="option.iconClass" default="option.default"></sorter-option>';
	html+='</sorter>';
   element = $compile(html)($scope);
   $scope.$digest();

    });
     it('should assign the correct sorter title', function() {
      expect(element.find('.sorter-title').text()).toBe("Sort by");
    });
    it('should assign the correct sorter names', function() {
    	for(var i=0;i < vm.sorters.options.length;i++)
    	{
  		 expect(element.find('ul.dropdown-menu > li > a > p > span ').eq(i).text()).toBe(vm.sorters.options[i].name);
        }

    });
    it('should set the correct default sorter', function() {
		expect(element.find("button.filter-dropdown").text().trim()).toBe("DATE MODIFIED (latest)");

	});
	 it('should set the clicked sorter as the active sorter', function() {
		//Click the first option ie. NAME
		element.find('ul.dropdown-menu > li > a').eq(0).trigger("click");
		$scope.$digest();
		expect(element.find("button.filter-dropdown").text().trim()).toBe("NAME");
	});
 it('should set the checked icon on the active sorter', function() {
		element.find('ul.dropdown-menu > li > a').eq(2).trigger("click");
		$scope.$digest();
    //there are 2 <i> elements inside the hyperlink, hence the difference in index
		expect(element.find('ul.dropdown-menu > li > a > i').eq(4).hasClass('hpe-icon hpe-checkmark sorter-icon invisible')).toBe(false);
		expect(element.find('ul.dropdown-menu > li > a > i').eq(6).hasClass('hpe-icon hpe-checkmark sorter-icon invisible')).toBe(true);
	});
  it('should set the icon on the sorter if icon class is provided', function() {

    expect(element.find('ul.dropdown-menu > li > a > i').eq(1).hasClass('hpe-icon hpe-manual')).toBe(true);
    
  });
it('should call the select function of the corresponding sorter', function() {
		element.find('ul.dropdown-menu > li > a').eq(2).trigger("click");
		$scope.$digest();
		expect($scope.vm.sorters.options[2].select).toHaveBeenCalled();
	});
});


});
