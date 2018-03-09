describe('checkboxes', function () {
    var $rootScope, $scope, $controller;
    
    beforeEach(module("ux-aspects.checkbox"));

    beforeEach(inject(function (_$rootScope_, _$controller_) {
        $rootScope = _$rootScope_;
        $controller = _$controller_;
        $scope = $rootScope.$new();
    }));

    describe("checkbox directive", function () {

        it('should initialise correctly', function () {

            var controller = instantiateController({
                ngModel: true
            });

            expect(controller.ngModel).toBe(true);
            expect(controller.indeterminate).toBe(false);
        });

        it('should show indeterminate value intially', function () {

            var controller = instantiateController({
                ngModel: true,
                indeterminateValue: true
            });

            expect(controller.ngModel).toBe(true);
            expect(controller.indeterminate).toBe(true);
        });

        it('should show indeterminate value on value change', function () {

            var controller = instantiateController({
                ngModel: true,
                indeterminateValue: -1
            });

            expect(controller.ngModel).toBe(true);
            expect(controller.indeterminate).toBe(false);

            // set value to indeterminate value
            $scope.vm.ngModel = -1;

            // perform digest
            $scope.$digest();

            // should now be indeterminate
            expect(controller.indeterminate).toBe(true);

        });

        it('should toggle state', function () {

            var controller = instantiateController({
                ngModel: true
            });

            expect(controller.ngModel).toBe(true);
            expect(controller.indeterminate).toBe(false);

            // call controller function to toggle state
            controller.toggleChecked();

            // should be the opposite to the original
            expect(controller.ngModel).toBe(false);
            expect(controller.indeterminate).toBe(false);

        });

        it('should toggle state from indeterminate', function () {

            var controller = instantiateController({
                ngModel: -1,
                indeterminateValue: -1
            });

            expect(controller.ngModel).toBe(-1);
            expect(controller.indeterminate).toBe(true);

            // call controller function to toggle state
            controller.toggleChecked();

            // should be the opposite to the original
            expect(controller.ngModel).toBe(true);
            expect(controller.indeterminate).toBe(false);

        });

        it('should not toggle state when disabled', function () {

            var controller = instantiateController({
                ngModel: false,
                ngDisabled: true
            });

            expect(controller.ngModel).toBe(false);
            expect(controller.ngDisabled).toBe(true);

            // call controller function to toggle state
            controller.toggleChecked();

            // should be the opposite to the original
            expect(controller.ngModel).toBe(false);
            expect(controller.ngDisabled).toBe(true);

        });

        it('should not toggle when clickable false', function() {
            var controller = instantiateController({
                ngModel: false,
                clickable: false
            });

            expect(controller.ngModel).toBe(false);
            expect(controller.clickable).toBe(false);

            // call controller function to toggle state
            controller.toggleChecked();

            // should be the opposite to the original
            expect(controller.ngModel).toBe(false);
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

        var ctrl = $controller('CheckboxCtrl', {
            $scope: $scope
        }, props);

        // perform initial digest
        $scope.$apply();

        return ctrl;
    }
});