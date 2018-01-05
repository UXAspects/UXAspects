describe('Select table', function() {
    var $compile, $rootScope, $scope, $timeout;
    var vm = {};
    var element, objectElement;

    beforeEach(module("ux-aspects.selectTable"));

    function getVM(){
      var vm = {};
      vm.clear = "clear";
      vm.reselect = "reselect";
      vm.selectedVal = "";
      vm.tableId = "example-table";
      vm.searchText = "";
      vm.heading = "Select an author";
      vm.selectKey = "name";
      vm.authors = [
          "Dale Holmes",
          "Emily Cain",
          "Marsha Glover",
          "Vanessa Barrett",
          "Sarah Lyons",
          "Johanna Cobb",
          "Greg Watson",
          "Frankie Young",
          "Phil Garcia",
          "Levi Smith",
          "Aaron Morgan",
          "Lucy Gill"

      ];
      vm.users = [{
        id:1,
        name:"Dale"
      },{
        id:2,
        name:"Emily"
      },{
        id:3,
        name:"Sarah"
      },
      {
        id:4,
        name:"Phil"

      },{
        id:5,
        name:"Frankie"

      },{
        id:6,
        name:"Vanessa"

      },{

      }];

      return vm;
    }

    beforeEach(inject(function(_$compile_, _$rootScope_, _$timeout_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
        $timeout = _$timeout_;
        $scope = $rootScope.$new();
    }));

    describe("Select table control directive", function() {

        beforeEach(function() {
            vm = {};
            vm = getVM();

            $scope.scopeValues = vm;

            var html = '<select-table values="scopeValues.authors" selected="scopeValues.selectedVal" id="scopeValues.tableId" search-text="scopeValues.searchText" table-height="300"></select-table>';
            element = $compile(html)($scope);
            var objectHtml = '<select-table values="scopeValues.users" selected="scopeValues.selectedVal" id="scopeValues.tableId" select-key="scopeValues.selectKey" search-text="scopeValues.searchText" table-height="300"></select-table>';
            objectElement = $compile(objectHtml)($scope);
            $scope.$digest();
        });
        it('should create the select table with options provided', function() {
            expect(element.find('tr')[0].innerText.trim()).toBe("Dale Holmes");
            expect(element.find('tr')[3].innerText.trim()).toBe("Vanessa Barrett");

        });
        it('should update the selected value to the selected attribute', function() {

            var e = document.createEvent('MouseEvents');
            e.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
            element.find('tr')[4].dispatchEvent(e);
            expect(vm.selectedVal).toBe("Sarah Lyons");
        });
        it('should filter the options according to the search text', function() {
            $scope.$apply(function() {
                vm.searchText = "na";
            });
            var filteredRows = element.find('tr');
            angular.forEach(filteredRows, function(row) {
                expect(row.innerText.trim().toLowerCase()).toContain('na');
            });

        });

        it('should select items hidden by the text filter by default', function(){
          expect(element.children().eq(0).scope().vm.selectFilteredItems).toBeTruthy();
        });
        it('should deselect items hidden by the text filter by configuration', function(){
          var html = '<select-table values="scopeValues.authors" selected="scopeValues.selectedVal" id="scopeValues.tableId" search-text="scopeValues.searchText" table-height="300" select-hidden-items="scopeValues.clear"></select-table>';
          var element = $compile(html)($scope);
          $scope.$digest();

          expect(element.children().eq(0).scope().vm.selectFilteredItems).toBeFalsy();
        });
        it('should reselect items hidden by the text filter by configuration', function(){
          var html = '<select-table values="scopeValues.authors" selected="scopeValues.selectedVal" id="scopeValues.tableId" search-text="scopeValues.searchText" table-height="300" select-hidden-items="scopeValues.reselect"></select-table>';
          var element = $compile(html)($scope);
          $scope.$digest();

          expect(element.children().eq(0).scope().vm.selectFilteredItems).toBeFalsy();
          expect(element.children().eq(0).scope().vm.reselectFilteredItems).toBeTruthy();
        });
        it('should, during filtering, deselect the selected value if no longer visible, when configured to do so', function(){
          var html = '<select-table values="scopeValues.authors" selected="scopeValues.selectedVal" id="scopeValues.tableId" search-text="scopeValues.searchText" table-height="300" select-hidden-items="scopeValues.clear"></select-table>';
          var element = $compile(html)($scope);
          $scope.$digest();

          var e = document.createEvent('MouseEvents');
          e.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
          element.find('tr')[3].dispatchEvent(e);
          expect(vm.selectedVal).toBeTruthy();

          $scope.$apply(function() {
              vm.searchText = "xxxxxxxxx";
          });

          expect(vm.selectedVal).toBeFalsy();

        });
        it('should reselect a filtered item if configured to do so', function(){
          var html = '<select-table values="scopeValues.authors" selected="scopeValues.selectedVal" id="scopeValues.tableId" search-text="scopeValues.searchText" table-height="300" select-hidden-items="scopeValues.reselect"></select-table>';
          var element = $compile(html)($scope);
          $scope.$digest();

          var e = document.createEvent('MouseEvents');
          e.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
          element.find('tr')[3].dispatchEvent(e);
          expect(vm.selectedVal).toBeTruthy();

          $scope.$apply(function() {
              vm.searchText = "xxxxxxxxx";
          });

          expect(vm.selectedVal).toBeFalsy();

          $scope.$apply(function() {
              vm.searchText = "";
          });

          expect(vm.selectedVal).toBeTruthy();

        });
        it('should, during filtering, retain the selected value if no longer visible, when configured to do so', function(){
          var e = document.createEvent('MouseEvents');
          e.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
          element.find('tr')[3].dispatchEvent(e);
          expect(vm.selectedVal).toBeTruthy();

          $scope.$apply(function() {
              vm.searchText = "xxxxxxxxx";
          });

          expect(vm.selectedVal).toBeTruthy();

        });
        it('should deselect the value when selected value is clicked again', function() {
            //Select a value by clicking a row
            var e = document.createEvent('MouseEvents');
            e.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
            element.find('tr')[3].dispatchEvent(e);
            expect(vm.selectedVal).toBe("Vanessa Barrett");
            //Click on the same row and check if it is deselected
            element.find('tr')[3].dispatchEvent(e);
            expect(vm.selectedVal).toBe("");

        });

        //Below are the unit tests for values passed as array of objects

          it('should create the select table with the values from select key provided', function() {
            expect(objectElement.find('tr')[0].innerText.trim()).toBe("Dale");
            expect(objectElement.find('tr')[3].innerText.trim()).toBe("Phil");

        });
          it('should update the selected value to the selected attribute when options are passed as array of objects', function() {

            var e = document.createEvent('MouseEvents');
            e.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
            objectElement.find('tr')[4].dispatchEvent(e);
            expect(vm.selectedVal.id).toBe(5);
            expect(vm.selectedVal.name).toBe("Frankie");

        });
           it('should filter the options according to the search text when options are passed as array of objects', function() {
            $scope.$apply(function() {
                vm.searchText = "ar";
            });
            var filteredRows = objectElement.find('tr');
            angular.forEach(filteredRows, function(row) {
                expect(row.innerText.trim().toLowerCase()).toContain('ar');
            });

        });
		it('should deselect the value when selected value is clicked again when options are passed as array of objects', function() {
            //Select a value by clicking a row
            var e = document.createEvent('MouseEvents');
            e.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
            objectElement.find('tr')[3].dispatchEvent(e);
            expect(vm.selectedVal.name).toBe("Phil");
            //Click on the same row and check if it is deselected
            objectElement.find('tr')[3].dispatchEvent(e);
            expect(vm.selectedVal).toBe("");

        });


    });

    describe('multiple select table', function() {
        beforeEach(function() {
            vm = {};
            vm.multipleSelectedVals = [];
            vm.multipleTableId = "multiple-example-table";
            vm.searchText = "";
            vm.selectKey="name";

            vm.authors = [
                {
                    id: 1,
                    name: "Casey Knight"
                }, {
                    id: 2,
                    name: "Casey Knight"
                }, {
                    id: 3,
                    name: "Ronnie Porter"
                }, {
                    id: 4,
                    name: "Kristen Mills"
                }
            ];

            $scope.vm = vm;
            var html = '<select-table values="vm.authors" selected="vm.multipleSelectedVals" select-key="vm.selectKey" id="vm.multipleTableId" search-text="vm.searchText" multiple-select="true"></select-table>';
            element = $compile(html)($scope);
            $scope.$digest();
            
        });

        it('should be able to select one value initially', function() {
            element.find('tr')[0].click();
            expect(vm.multipleSelectedVals[0].id).toBe(1);
        });
        it('should be able to select multiple values', function() {
            var trs = element.find('tr');
            trs[0].click();
            trs[1].click();
            trs[2].click();
            expect(vm.multipleSelectedVals[0].id).toBe(1);
            expect(vm.multipleSelectedVals[1].id).toBe(2);
            expect(vm.multipleSelectedVals[2].id).toBe(3);
        });
        it('should be able to deselect clicked values and then select them again', function() {
            var trs = element.find('tr');
            trs[0].click();
            trs[1].click();
            trs[2].click();
            expect(vm.multipleSelectedVals.indexOf(vm.authors[1])).not.toBeLessThan(0);
            // unselect
            trs[1].click();
            expect(vm.multipleSelectedVals.indexOf(vm.authors[0])).not.toBeLessThan(0);
            expect(vm.multipleSelectedVals.indexOf(vm.authors[1])).toBe(-1);
        });
    });

});
