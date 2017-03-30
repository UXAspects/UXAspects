angular.module('app').controller('GridDemoCtrl', GridDemoCtrl);

function GridDemoCtrl() {
    var vm = this;

    vm.source = [{
        "checked": false,
        "name": chance.name(),
        "age": 46,
        "city": "London",
        "active": true
    }, {
        "checked": false,
        "name": chance.name(),
        "age": 60,
        "city": "Berlin",
        "active": false
    }, {
        "checked": false,
        "name": chance.name(),
        "age": 57,
        "city": "Paris",
        "active": false
    }, {
        "checked": false,
        "name": chance.name(),
        "age": 28,
        "city": "California",
        "active": false
    }, {
        "checked": false,
        "name": chance.name(),
        "age": 31,
        "city": "Miami",
        "active": true
    }];

    vm.columns = [{
        title: '',
        template: '<checkbox style="margin-bottom: 0" ng-model="checked"></checkbox>',
        width: '40px'
    }, {
        title: 'Name',
        template: '<span ng-bind="::name"></span>',
    }, {
        title: 'Age',
        template: '<span ng-bind="::age"></span>',
    }, {
        title: 'City',
        template: '<span ng-bind="::city"></span>',
    }, {
        title: 'Active',
        template: '<i class="hpe-icon hpe-active" ng-show="::active"></i>',
    }];
}