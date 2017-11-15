angular.module('app').controller('FlippableCardCtrl', FlippableCardCtrl);

FlippableCardCtrl.$inject = ['$colorService'];

function FlippableCardCtrl($colorService) {

    var vm = this;

    vm.card1 = {
        documents: '23,456',
        reviewed: '19,976',
        produced: '11,123'
    };

    vm.nestedDonutData1 = [{
        label: 'documents',
        color: $colorService.getColor('grey6').toHex(),
        value: 23456
    }, {
        label: 'reviewed',
        color: $colorService.getColor('vibrant1').toHex(),
        value: 19876
    }, {
        label: 'produced',
        color: $colorService.getColor('vibrant2').toHex(),
        value: 11123
    }];

    vm.nestedDonutOptions = {
        size: 70,
        donutWidth: 3,
        donutSpacing: 3,
        hoverAnimation: true,
        centerLabel: {
            show: false
        },
        tooltip: {
            show: false
        }
    };

    vm.spark = {
        type: 'spark-primary',
        type2: 'spark-warning'
    };

    vm.card2 = {
        documents: '15,678',
        reviewed: '10,123',
        produced: '3,123'
    };

    vm.nestedDonutData2 = [{
        label: 'documents',
        color: $colorService.getColor('grey6').toHex(),
        value: 15678
    }, {
        label: 'reviewed',
        color: $colorService.getColor('vibrant1').toHex(),
        value: 10123
    }, {
        label: 'produced',
        color: $colorService.getColor('vibrant2').toHex(),
        value: 3123
    }];

    vm.card3 = {
        documents: '256,987',
        reviewed: '143,567',
        produced: '45,678'
    };

    vm.nestedDonutData3 = [{
        label: 'documents',
        color: $colorService.getColor('grey6').toHex(),
        value: 256987
    }, {
        label: 'reviewed',
        color: $colorService.getColor('vibrant1').toHex(),
        value: 143567
    }, {
        label: 'produced',
        color: $colorService.getColor('vibrant2').toHex(),
        value: 45678
    }];
}