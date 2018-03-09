describe('radiobuttons', function () {
    var $rootScope, $scope, $controller;

    beforeEach(module("ux-aspects.radiobutton"));

    beforeEach(inject(function (_$rootScope_, _$controller_) {
        $rootScope = _$rootScope_;
        $controller = _$controller_;
        $scope = $rootScope.$new();
    }));

    describe("radiobutton directive", function () {

        it('should initialise correctly', function () {

            var controller = instantiateController({
                ngModel: true,
                ngValue: true
            });

            expect(controller.ngModel).toBe(true);
            expect(controller.ngValue).toBe(true);
        });

        it('should not toggle state', function () {

            var controller = instantiateController({
                ngModel: true,
                ngValue: false
            });

            expect(controller.ngModel).toBe(true);
            expect(controller.ngValue).toBe(false);

            // call controller function to toggle state
            controller.toggleChecked();

            $scope.$digest();

            // should be the opposite to the original
            expect(controller.ngModel).toBe(false);
            expect(controller.ngValue).toBe(false);

        });

        it('should not toggle state when disabled', function () {

            var controller = instantiateController({
                ngModel: true,
                ngValue: false,
                ngDisabled: true
            });

            expect(controller.ngModel).toBe(true);
            expect(controller.ngValue).toBe(false);
            expect(controller.ngDisabled).toBe(true);

            // call controller function to toggle state
            controller.toggleChecked();

            $scope.$digest();

            // should be the opposite to the original
            expect(controller.ngModel).toBe(true);
            expect(controller.ngValue).toBe(false);
            expect(controller.ngDisabled).toBe(true);

        });

        it('should not toggle state when clickable is false', function () {

            var controller = instantiateController({
                ngModel: true,
                ngValue: false,
                clickable: false
            });

            expect(controller.ngModel).toBe(true);
            expect(controller.ngValue).toBe(false);
            expect(controller.clickable).toBe(false);

            // call controller function to toggle state
            controller.toggleChecked();

            $scope.$digest();

            // should be the opposite to the original
            expect(controller.ngModel).toBe(true);
            expect(controller.ngValue).toBe(false);
            expect(controller.clickable).toBe(false);

        });

    });

    function instantiateController(props) {

        // create a new scope
        $scope = $rootScope.$new();

        $scope.vm = {};

        // iterate each prop and add to scope
        for (var prop in props) {
            $scope.vm[prop] = props[prop];
        }

        var ctrl = $controller('RadiobuttonCtrl', {
            $scope: $scope
        }, props);

        // perform initial digest
        $scope.$digest();

        return ctrl;
    }
});