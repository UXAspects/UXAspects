describe('Slider Chart Control', function () {
    var $compile, $rootScope, $scope, $controller;

    beforeEach(module("ux-aspects.sliderChart"));

    beforeEach(inject(function (_$compile_, _$rootScope_, _$controller_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
        $controller = _$controller_;
        $scope = $rootScope.$new();
    }));

    describe("Slider chart controller", function () {

        it('should set the correct widths', function () {

            var controller = instantiateController({
                ngModel: {
                    low: 2,
                    high: 8
                },
                sliderOptions: {track: {
                    min: 1,
                    max: 9
                }},
                chartData: {},
                chartOptions: {}
            });

            expect(controller.left).toBe(12.5);
            expect(controller.right).toBe(12.5);
            expect(controller.middle).toBe(75);
        });

        it('should hide the borders when width is 0', function () {

            var controller = instantiateController({
                ngModel: {
                    low: 1,
                    high: 9
                },
                sliderOptions: {track: {
                    min: 1,
                    max: 9
                }},
                chartData: {},
                chartOptions: {}
            });
            
            expect(controller.hideRightBorder).toBe(true);
            expect(controller.hideLeftBorder).toBe(true);
        });

        it('should show the borders when width is not 0', function () {

            var controller = instantiateController({
                ngModel: {
                    low: 2,
                    high: 8
                },
                sliderOptions: {track: {
                    min: 1,
                    max: 9
                }},
                chartData: {},
                chartOptions: {}
            });
            
            expect(controller.hideRightBorder).toBe(false);
            expect(controller.hideLeftBorder).toBe(false);
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

        var ctrl = $controller('SliderChartCtrl', {
            $scope: $scope
        }, props);

        // perform initial digest
        $scope.$digest();

        return ctrl;
    }

});