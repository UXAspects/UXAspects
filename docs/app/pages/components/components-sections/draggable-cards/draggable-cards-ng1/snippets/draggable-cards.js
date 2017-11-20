angular.module('app').controller('DraggableCardsDemoCtrl', DraggableCardsDemoCtrl);

DraggableCardsDemoCtrl.$inject = ['$scope', '$colorService'];

function DraggableCardsDemoCtrl($scope, $colorService) {
    var vm = this;

    var flotChartColors = {
        accent: $colorService.getColor('accent').toRgb(),
        grey5: $colorService.getColor('grey5').toRgb(),
        other: $colorService.getColor('accent').setAlpha(0.5).toRgba()
    };

    vm.allowEditing = true;
    vm.allowRemoving = true;
    vm.allowReordering = true;

    var labelColor = '#333';

    vm.onReorder = function () {
        //do stuff here when cards are reordered
    };

    vm.onSelect = function () {
        //do stuff here when a card is selected
    };

    vm.onEdit = function () {
        //do stuff here when the edit button is clicked
    };

    vm.onRemove = function (itemScope) {

        //find the matching card
        var idx = vm.draggableCards.indexOf(itemScope.card);

        //remove and the item
        vm.draggableCards.splice(idx, 1);

        //ensure update occurs
        $scope.$digest();
    };

    vm.fixedCards = [{
        name: 'All',
        count: '(8)',
        selected: false
    }, {
        name: 'No Category',
        count: '(2)',
        selected: false
    }];

    vm.draggableCards = [{
        name: 'Protected',
        count: '(6)',
        status: '15% unique, 10% shared',
        description: 'NYC Preliminary Production 1 created from the protected items.',
        selected: true,
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
        options: getChartOptions('13.2M')
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
        count: '(2)',
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
    }, {
        name: 'Proprietary',
        count: '(3)',
        status: '7% unique, 10% shared',
        description: 'NYC Production 4 Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        selected: false,
        data: [{
            data: 7,
            color: [flotChartColors.accent]
        }, {
            data: 5,
            color: [flotChartColors.other]
        }, {
            data: 87,
            color: [flotChartColors.grey5]
        }],
        options: getChartOptions('5.4M')
    }, {
        name: 'Reviewed',
        count: '(2)',
        status: '65% unique, 12% shared',
        description: 'NYC Production 5 Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        selected: false,
        data: [{
            data: 60,
            color: [flotChartColors.accent]
        }, {
            data: 10,
            color: [flotChartColors.other]
        }, {
            data: 30,
            color: [flotChartColors.grey5]
        }],
        options: getChartOptions('36.0M')
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
