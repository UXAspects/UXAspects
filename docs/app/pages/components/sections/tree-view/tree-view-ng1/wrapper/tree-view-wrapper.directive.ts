angular.module('app').directive('uxdTreeViewWrapper', () => {
    return {
        restrict: 'E',
        template: require('./tree-view-wrapper.directive.html'),
        controller: 'TreeViewDocumentationCtrl as vm',
        scope: true
    };
});

angular.module('app').controller('TreeViewDocumentationCtrl', ['$scope', TreeViewDocumentationCtrl]);

  function TreeViewDocumentationCtrl($scope: angular.IScope) {

    var vm = this;

    vm.$onDestroy = function() {
      $scope.$destroy();
    };

    vm.selected = {
      id: '0',
      title: ''
    };

    vm.newValue = {
      allowChildren: false,
      title: '',
    };

    vm.iconConfig = {
      folder: {
        collapsed: 'hpe-folder',
        expanded: 'hpe-folder-open'
      },
      item: 'hpe-document',
      'default': 'hpe-3d'
    };

    vm.treeOptions = {
      showTreeLines: false,
      openOnSelect: false,
      loadHeight: 72
    };

    vm.addItem = function () {
      var item: any = {
        id: -1,
        allowChildren: vm.newValue.allowChildren,
        title: vm.newValue.title || 'New User Defined Item',
        type: vm.newValue.allowChildren ? 'folder' : 'item',
        nodes: []
      };

      return item;
    };

    vm.deleteFn = function () {
      return true;
    };

    vm.data = [{
      'id': 1,
      'title': 'Documents',
      'allowChildren': true,
      'type': 'folder',
      'nodes': [{
        'id': 12,
        'title': 'Pictures',
        'allowChildren': true,
        'type': 'folder',
        'nodes': [{
          'title': 'Alcazar',
          'type': 'item'
        }, {
          'title': 'Citadel',
          'type': 'item'
        }, {
          'title': 'Donjon',
          'type': 'item'
        }]
      }, {
        'id': 11,
        'title': 'Word files',
        'allowChildren': true,
        'type': 'folder',
        'nodes': [{
          'id': 111,
          'title': 'Accounts',
          'allowChildren': true,
          'type': 'folder',
          'nodes': [{
            'title': 'Castle',
            'type': 'item'
          }, {
            'title': 'Estate',
            'type': 'item'
          }, {
            'title': 'Manor',
            'type': 'item'
          }, {
            'title': 'Mansion',
            'type': 'item'
          }, {
            'title': 'Villa',
            'type': 'item'
          }]
        }]
      }]
    }, {
      'id': 2,
      'title': 'Emails',
      'allowChildren': true,
      'type': 'folder',
      'nodes': [{
        'id': 21,
        'title': 'Inbox',
        'allowChildren': true,
        'type': 'folder',
        'nodes': []
      }, {
        'id': 22,
        'title': 'Outbox',
        'allowChildren': true,
        'type': 'folder',
        'nodes': []
      }]
    }, {
      'id': 3,
      'title': 'Permissions Examples',
      'allowChildren': true,
      'type': 'folder',
      'nodes': [{
        'id': 32,
        'title': 'Add Disabled',
        'permissions': {
          add: false,
          edit: true,
          delete: true
        },
        'allowChildren': true,
        'type': 'folder',
        'nodes': []
      }, {
        'id': 31,
        'title': 'Edit Disabled',
        'permissions': {
          edit: false,
          add: true,
          delete: true
        },
        'allowChildren': true,
        'type': 'folder',
        'nodes': []
      }, {
        'id': 33,
        'title': 'Delete Disabled',
        'permissions': {
          delete: false,
          add: true,
          edit: true
        },
        'allowChildren': true,
        'type': 'folder',
        'nodes': []
      }]
    }];
    
  }