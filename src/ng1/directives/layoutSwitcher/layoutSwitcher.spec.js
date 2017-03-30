describe('layout switcher directive', function () {
    var $compile, $rootScope, element, $scope;

    beforeEach(module('ux-aspects.layoutSwitcher'));
    beforeEach(module('ux-aspects.resizeService'));

    beforeEach(inject(function (_$compile_, _$rootScope_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
        $scope = _$rootScope_.$new();
    }));

    describe('layout switching tests', function () {

        beforeEach(function () {
            $scope.view = "card";

            var html = '<div class="ng-scope" style="display: block; width: 900px;">' +
                '<layout-switcher-container selected="view">' +
                '<layout-switcher-item collapse-layout="list" collapse-size="700" name="card"><p>Card</p></layout-switcher-item>' +
                '<layout-switcher-item name="list"><p>List</p></layout-switcher-item>' +
                '</layout-switcher-container>' +
                '</div>';

            element = $compile(html)($scope);
            $scope.$digest();
        });

        describe('switching from list view to card view', function () {

            it('should originally display the card view', function () {
                // get the evaluated value of the 'selected' attribute (binding to view)
                var currentSelectedView = element.find('layout-switcher-container').scope().view;

                // should show the card view
                expect(currentSelectedView).toBe("card");
            });

            it('should switch to list view layout when scope.view set to list', function () {
                $scope.view = "list";

                var currentSelectedView = element.find('layout-switcher-container').scope().view;

                // should show list view after scope.view changed
                expect(currentSelectedView).toBe("list");
            });

            it('should switch between list view and card view on scope.view change', function () {
                // switch to list view
                $scope.view = "list";

                var currentSelectedView = element.find('layout-switcher-container').scope().view;
                expect(currentSelectedView).toBe("list");

                // switch back to card view
                $scope.view = "card";

                currentSelectedView = element.find('layout-switcher-container').scope().view;
                expect(currentSelectedView).toBe("card");

                //switch to list view again
                $scope.view = "list";

                currentSelectedView = element.find('layout-switcher-container').scope().view;
                expect(currentSelectedView).toBe("list");
            });

        });

    });

});