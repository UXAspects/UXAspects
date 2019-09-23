describe('Slider Control', function () {
    var $compile, $rootScope, $scope, $timeout, $controller;

    beforeEach(module("ux-aspects.slider"));

    beforeEach(inject(function (_$compile_, _$rootScope_, _$timeout_, _$controller_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
        $timeout = _$timeout_;
        $controller = _$controller_;
        $scope = $rootScope.$new();
    }));

    describe("Slider controller", function () {

        it('should create a slider with the default options', function () {

            var controller = instantiateController({
                ngModel: 50,
                options: {}
            });

            // thumb values and positions should be correct
            expect(controller.thumbLowerValue).toBe(50);
            expect(controller.thumbUpperValue).toBe(null);

            // the positions of the thumbs should be correct
            expect(controller.thumbPositions.lower).toBe('50%');
            expect(controller.thumbPositions.upper).toBe('0%');

            // expect the track sizes to be correct
            expect(controller.trackSizes.lower).toBe(50);
            expect(controller.trackSizes.higher).toBe(50);

            // show show the correct number of ticks
            expect(controller.ticks.length).toBe(21);

            // tooltips should be hidden
            expect(controller.tooltipLowerVisible).toBe(false);
            expect(controller.tooltipUpperVisible).toBe(false);
        });

        it('should position thumbs correctly when model is changed', function () {

            var controller = instantiateController({
                ngModel: 50,
                options: {}
            });

            // thumb values and positions should be correct
            expect(controller.thumbLowerValue).toBe(50);
            expect(controller.thumbUpperValue).toBe(null);

            // the positions of the thumbs should be correct
            expect(controller.thumbPositions.lower).toBe('50%');
            expect(controller.thumbPositions.upper).toBe('0%');

            // expect the track sizes to be correct
            expect(controller.trackSizes.lower).toBe(50);
            expect(controller.trackSizes.higher).toBe(50);

            // change the model
            updateScopeValue(controller, 'ngModel', 25);

            // perform a digest
            $scope.$digest();

            // thumb values and positions should be correct
            expect(controller.thumbLowerValue).toBe(25);
            expect(controller.thumbUpperValue).toBe(null);

            // the positions of the thumbs should be correct
            expect(controller.thumbPositions.lower).toBe('25%');
            expect(controller.thumbPositions.upper).toBe('0%');

            // expect the track sizes to be correct
            expect(controller.trackSizes.lower).toBe(25);
            expect(controller.trackSizes.higher).toBe(75);

        });

        it('should create a range slider', function () {

            var controller = instantiateController({
                ngModel: {
                    low: 25,
                    high: 75
                },
                options: {
                    type: 'range'
                }
            });

            // thumb values and positions should be correct
            expect(controller.thumbLowerValue).toBe(25);
            expect(controller.thumbUpperValue).toBe(75);

            // the positions of the thumbs should be correct
            expect(controller.thumbPositions.lower).toBe('25%');
            expect(controller.thumbPositions.upper).toBe('75%');

            // expect the track sizes to be correct
            expect(controller.trackSizes.lower).toBe(25);
            expect(controller.trackSizes.range).toBe(50);
            expect(controller.trackSizes.higher).toBe(25);

            // show show the correct number of ticks
            expect(controller.ticks.length).toBe(21);
        });

        it('should throw an error when creating a range without array of values', function () {

            expect(function () {
                instantiateController({
                    ngModel: 50,
                    options: {
                        type: 'range'
                    }
                });
            }).toThrow(new Error('Slider - For range input model must have low and high properties'));
        });

        it('should display only major ticks', function () {

            var controller = instantiateController({
                ngModel: 50,
                options: {
                    track: {
                        min: 1,
                        max: 5,
                        ticks: {
                            major: {
                                show: true,
                                steps: 4
                            },
                            minor: {
                                show: false
                            }
                        }
                    }
                }
            });

            expect(controller.ticks.length).toBe(2);
        });

        it('should display only minor ticks', function () {

            var controller = instantiateController({
                ngModel: 50,
                options: {
                    track: {
                        min: 1,
                        max: 5,
                        ticks: {
                            major: {
                                show: false
                            },
                            minor: {
                                show: true,
                                steps: 1
                            }
                        }
                    }
                }
            });

            expect(controller.ticks.length).toBe(5);
        });

        it('should display major and minor ticks - skipping minor ticks when they overlap major ticks', function () {

            var controller = instantiateController({
                ngModel: 50,
                options: {
                    track: {
                        min: 1,
                        max: 5,
                        ticks: {
                            major: {
                                show: true,
                                steps: 4
                            },
                            minor: {
                                show: true,
                                steps: 1
                            }
                        }
                    }
                }
            });

            expect(controller.ticks.length).toBe(5);
        });

        it('should display the correct track colors', function () {

            var controller = instantiateController({
                ngModel: 50,
                options: {
                    track: {
                        colors: {
                            lower: '#ff0000',
                            range: ['#fff000', '#000fff'],
                            higher: '#0000ff'
                        }
                    }
                }
            });

            expect(controller.trackColors.lower).toBe('#ff0000');
            expect(controller.trackColors.range).toBe('linear-gradient(to right, #fff000, #000fff)');
            expect(controller.trackColors.higher).toBe('#0000ff');
        });

        it('should always show persistent callouts', function () {

            var controller = instantiateController({
                ngModel: 50,
                options: {
                    handles: {
                        callout: {
                            trigger: 'persistent'
                        }
                    }
                }
            });

            expect(controller.tooltipLowerVisible).toBe(true);
            expect(controller.tooltipUpperVisible).toBe(true);
        });

    });

    function instantiateController(props) {

        // create a new scope
        $scope = $rootScope.$new();
    
        // add variables to controller as property
        $scope.vm = props;
    
        // prepare the controller
        var ctrlFn = $controller('SliderCtrl', {
          $scope: $scope
        }, true);
    
        // add all props to instance (as this component has bindToController: true)
        for (var prop in props) {
          ctrlFn.instance[prop] = props[prop];
        }
    
        // create the controller
        var ctrl = ctrlFn();
    
        // perform initial digest
        $scope.$digest();
    
        return ctrl;
    }

    function updateScopeValue(controller, property, value) {
        // update value on scope
        $scope.vm[property] = value;

        // as we bind to the controller update value on the controller too
        controller[property] = value;
    }

});