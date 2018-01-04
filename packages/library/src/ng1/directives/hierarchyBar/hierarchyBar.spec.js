describe('hierarchyBar', function() {
    var $rootScope, $scope, $controller;

    beforeEach(module("ux-aspects.hierarchyBar"));

    beforeEach(inject(function(_$rootScope_, _$controller_) {
        $rootScope = _$rootScope_;
        $controller = _$controller_;
        $scope = $rootScope.$new();
    }));

    describe("hierarchyBar directive", function() {

        it('should initialise correctly', function() {

            var controller = instantiateController({
                data: getData()
            });

            // should get the correct default settings
            expect(JSON.stringify(controller.options)).toBe(JSON.stringify({
                enabled: true,
                overview: null,
                image: null,
                valueFormatter: function(data) {
                    return data.name ? data.name : '';
                }
            }));
        });


        it('should initially have only the root', function() {

            var controller = instantiateController({
                data: getData()
            });

            // there should be one hierarchyBar
            expect(controller.data.length).toBe(1);

            // first hierarchyBar should be the root node
            expect(controller.data[0]).toBe(controller.data[0]);
        });

        it('should get hierarchy bar children', function() {
            var controller = instantiateController({
                data: getData()
            });

            expect(controller.getHierarchyBarChildren(controller.data[0])).toBe(controller.data[0].children);
        });

        it('should get hierarchy name', function() {
            var controller = instantiateController({
                data: getData()
            });

            expect(controller.getHierarchyBarName(controller.data[0])).toBe('root');
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

        var ctrl = $controller('HierarchyBarCtrl', {
            $scope: $scope
        }, props);

        // perform initial digest
        $scope.$digest();

        return ctrl;
    }

    function getData() {
        var elem = [{
            name: 'root',
            children: [{
                name: 'level_1_child_1',
                children: [{
                    name: 'level_2_child_1',
                }, {
                    name: 'level_2_child_2',
                }, {
                    name: 'level_2_child_3',
                }]
            }, {
                name: 'level_1_child_2',
                children: [{
                    name: 'level_2_child_4',
                }, {
                    name: 'level_2_child_5',
                }, {
                    name: 'level_2_child_6',
                }]
            }]
        }];
        return elem;
    }

});