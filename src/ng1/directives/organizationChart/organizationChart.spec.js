describe('organization chart', function() {
    var $rootScope, $scope, $controller, $timeout;

    beforeEach(module("ux-aspects.organizationChart"));

    beforeEach(inject(function(_$rootScope_, _$controller_, _$timeout_) {
        $rootScope = _$rootScope_;
        $controller = _$controller_;
        $timeout = _$timeout_;
        $scope = $rootScope.$new();
    }));

    describe("organization chart directive", function() {

        it('should initialise correctly', function() {

            var controller = instantiateController({
                data: getData()
            });

            // should get the correct default settings
            expect(JSON.stringify(controller.options)).toBe(JSON.stringify({
                nodes: {
                    template: null,
                    toggle: true,
                    size: {
                        width: 210,
                        height: 90
                    }
                },
                transition: 750,
                levels: 1,
                reveal: null,
                connector: "curved",
                search: {
                    enabled: false,
                    template: 'directives/organizationChart/organizationChart.searchItem.html',
                    placeholder: '',
                    query: function(query, node) {
                        // if name contains the query
                        return node.name && node.name.toLowerCase().indexOf(query.toLowerCase()) !== -1;
                    },
                    selected: angular.noop,
                    key: 'name'
                }
            }));
        });

        it('should call reveal function', function() {

            // create a function for reveal
            var revealFn = jasmine.createSpy('reveal function');

            var controller = instantiateController({
                data: getData(),
                options: {
                    reveal: revealFn
                }
            });

            // should get the correct settings
            expect(controller.options.reveal).toBe(revealFn);

            // call the reveal function
            controller.reveal.call();

            // call the reveal function and expect the reveal function to be called
            $timeout.flush();

            // function should have been called
            expect(revealFn).toHaveBeenCalled();
        });

        it('should select a breadcrumb', function() {

            var controller = instantiateController({
                data: getData()
            });

            // select a child node
            var childNode = controller.data.children[0];

            // select the child node
            controller.selectNode(childNode);

            // select the root breadcrumb
            controller.selectBreadcrumb(controller.data);

            expect(controller.selectedNode).toBe(controller.data);
        });

        it('should extract correct field for searching', function() {

            var controller = instantiateController({
                data: getData()
            });

            // select a child node
            var childNode = controller.data.children[0];

            // extract search field
            var field = controller.extractSearchName(childNode);

            // ensure field extracted successfully
            expect(field).toBe(childNode.name);
        });

        it('should return correct results when searching', function() {

            var controller = instantiateController({
                data: getData()
            });

            // perform search
            var results = controller.getSearchItems('level');

            // expect there to be 8 results
            expect(results.length).toBe(8);
        });

        it('should call callback when a search item has been selected', function() {

            var controller = instantiateController({
                data: getData(),
                options: {
                    search: {
                        selected: jasmine.createSpy("Selected Spy")
                    }
                }
            });

            // select a child node
            var childNode = controller.data.children[0];

            // perform selection
            controller.searchSelect(childNode);

            // expect the selected function to have been called with the selected child node
            expect(controller.options.search.selected).toHaveBeenCalledWith(childNode);
        });

        function instantiateController(props) {

            // create a new scope
            $scope = $rootScope.$new();

            $scope.vm = {};

            // iterate each prop and add to scope
            for (var prop in props) {
                $scope.vm[prop] = props[prop];
            }

            var ctrl = $controller('OrganizationChartCtrl', {
                $scope: $scope
            }, props);

            // perform initial digest
            $scope.$digest();

            return ctrl;
        }

        function getData() {
            return {
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
            };
        }
    });
});