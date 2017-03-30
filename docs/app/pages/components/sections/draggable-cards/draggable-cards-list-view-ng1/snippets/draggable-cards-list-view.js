angular.module('app').controller('DraggableCardsListViewDemoCtrl', DraggableCardsListViewDemoCtrl);

DraggableCardsListViewDemoCtrl.$inject = ['$scope', '$colorService'];

function DraggableCardsListViewDemoCtrl($scope, $colorService) {
    var vm = this;

    var flotChartColors = {
        accent: $colorService.getColor('accent').toRgb(),
        grey5: $colorService.getColor('grey5').toRgb(),
        other: $colorService.getColor('accent').setAlpha(0.5).toRgba()
    };

    var labelColor = '#333';

    vm.availableItems = [{
        workbook: 'Privileged documents',
        items: 35,
        lastAccessed: 'Jul 14, 2013',
        author: chance.name(),
        category: 'Privileged'
    }, {
        workbook: 'Work Product',
        items: 60,
        lastAccessed: 'Jan 12, 2013',
        author: chance.name(),
        category: 'Privileged'
    }, {
        workbook: 'Hold',
        items: 22,
        lastAccessed: 'Aug 4, 2013',
        author: chance.name(),
        category: 'Privileged'
    }, {
        workbook: 'For export',
        items: 35,
        lastAccessed: 'June 29, 2013',
        author: chance.name(),
        category: 'Privileged'
    }, {
        workbook: 'Executive Email',
        items: 11,
        lastAccessed: 'Dec 24, 2013',
        author: chance.name(),
        category: 'Protected'
    }, {
        workbook: 'Work Product',
        items: 99,
        lastAccessed: 'Jan 12, 2013',
        author: chance.name(),
        category: 'Protected'
    }, {
        workbook: 'Hold',
        items: 12,
        lastAccessed: 'Nov 12, 2013',
        author: chance.name(),
        category: 'Protected'
    }, {
        workbook: 'Workbook 7',
        items: 44,
        lastAccessed: 'Feb 1, 2013',
        author: chance.name(),
        category: 'Relevant'
    }, {
        workbook: 'Workbook 10',
        items: 55,
        lastAccessed: 'Apr 2, 2013',
        author: chance.name(),
        category: 'Relevant'
    }, {
        workbook: 'Workbook 8',
        items: 66,
        lastAccessed: 'May 3, 2013',
        author: chance.name(),
        category: 'Relevant'
    },];

    vm.items = [];

    vm.onSelect = function (itemScope) {
        var category = itemScope.card.name;

        //if the selected category is all then show all available items
        if (category === 'All') {
            vm.items = vm.availableItems;
        } else {
            vm.items = vm.availableItems.filter(function (item) {
                return item.category === category;
            });
        }
        $scope.$digest();
    };

    vm.fixedCards = [{
        name: 'All',
        count: '(10)',
        selected: true
    }];

    vm.draggableCards = [{
        name: 'Protected',
        count: '(3)',
        status: '15% unique, 10% shared',
        description: 'NYC Preliminary Production 1 created from the protected items.',
        selected: false,
        data: [{
            data: 25,
            color: [flotChartColors.accent]
        }, {
            data: 15,
            color: [flotChartColors.other]
        }, {
            data: 18,
            color: [flotChartColors.grey5]
        }],
        options: getChartOptions('13.2M'),
        icons: [{
            icon: 'hpe-folder',
            tooltip: 'Folder',
            click: function () {
                //do stuff here when icon is clicked
            }
        }, {
            icon: 'hpe-bookmark',
            click: function () {
                //do stuff here when icon is clicked
            }
        }]
    }, {
        name: 'Privileged',
        count: '(4)',
        status: '7% unique, 10% shared',
        description: 'NYC Production 2 created as a follow up to Production 1.',
        selected: false,
        data: [{
            data: 10,
            color: [flotChartColors.accent]
        }, {
            data: 5,
            color: [flotChartColors.other]
        }, {
            data: 85,
            color: [flotChartColors.grey5]
        }],
        options: getChartOptions('6.5M')
    }, {
        name: 'Relevant',
        count: '(3)',
        status: '65% unique, 12% shared',
        description: 'NYC Production 3 Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        selected: false,
        data: [{
            data: 60,
            color: [flotChartColors.accent]
        }, {
            data: 15,
            color: [flotChartColors.other]
        }, {
            data: 25,
            color: [flotChartColors.grey5]
        }],
        options: getChartOptions('33.2M')
    }];

    function getChartOptions(label) {
        return {
            series: {
                pie: {
                    show: true,
                    innerRadius: 0.7,
                    centerLabel: {
                        show: true,
                        color: labelColor,
                        text: label,
                        font: 'Source Sans Pro',
                        fontSize: 15,
                        textBaseline: 'middle'
                    },
                    stroke: {
                        width: 0
                    }
                }
            }
        };
    }
}
