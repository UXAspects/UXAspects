describe('filters', function () {
    var $compile, $rootScope, $document;
  
    beforeEach(module("ux-aspects.fixed-header-table"));
  
    beforeEach(inject(function (_$compile_, _$rootScope_, _$document_) {
      $compile = _$compile_;
      $rootScope = _$rootScope_;
      $document = _$document_;
    }));
  
  
    describe("Fixed Header Table", function () {

        var element, $scope;

        beforeEach(function () {

            $scope = $rootScope.$new();

            $scope.people = [
                {
                    id: 1,
                    name: 'John Smith',
                    address: 'Main Street',
                    phone: '02890654321',
                    active: true
                }
            ];

            const html = `
            <table class="table" fixed-header-table table-height="500">

                <thead>
                    <tr><th class="fixed-header-table-col-id">Id</th>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Phone</th>
                    <th>Active</th>
                </tr></thead>

                <tbody>

                    <tr ng-repeat="person in people">
                        <td class="fixed-header-table-col-id" ng-bind="::person.id"></td>
                        <td ng-bind="::person.name"></td>
                        <td ng-bind="::person.address"></td>
                        <td ng-bind="::person.phone"></td>
                        <td>
                            <i class="hpe-icon hpe-checkmark" ng-if="person.active"></i>
                        </td>
                    </tr>
                </tbody>
            </table>
            `;

            element = $compile(html)($scope);

            $document.find('body').append(element);
            $scope.$apply();
        });

        afterEach(() => {
            element.remove();
        });

        it('should adjust table heading padding for the scrollbar', function () {
            
            const tableHead = element.find('thead');
            const tableBody = element.find('tbody');
            const theadPadding = parseInt(tableHead.css('padding-right'));
            const scrollbar = tableBody.get(0).offsetWidth - tableBody.get(0).clientWidth;

			expect(theadPadding).toBe(scrollbar);
        });

    });

  
  });