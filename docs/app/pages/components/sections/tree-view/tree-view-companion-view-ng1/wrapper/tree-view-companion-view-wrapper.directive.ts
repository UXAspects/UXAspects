angular.module('app').directive('uxdTreeViewCompanionViewWrapper', () => {
    return {
        restrict: 'E',
        template: require('./tree-view-companion-view-wrapper.directive.html'),
        controller: 'TreeViewCompanionViewCtrl as vm'
    };
});

angular.module('app').controller('TreeViewCompanionViewCtrl', TreeViewCompanionViewCtrl);

function TreeViewCompanionViewCtrl() {
    var vm = this;

    vm.selected = { id: '0', title: '' };

    vm.newValue = {
      allowChildren: false,
      title: '',
    };

    vm.iconConfig = {
      folder: 'hpe-folder',
      item: 'hpe-document'
    };

    vm.treeOptions = {
      showTreeLines: true,
      openOnSelect: false
    };

    vm.findNodeByTitle = function(title: any) {
      vm.selected = findItem(title, vm.data);
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

    vm.deleteFn = function() {
      return true;
    };

    function findItem(title: any, data: any): any {
      var result = null;
      for (var i = 0; i < data.length; i += 1) {
        if (data[i].title.toLowerCase() === title.toLowerCase()) {
          result = data[i];
        } else if (data[i].nodes) {
          result = findItem(title, data[i].nodes);
        }
        if (result !== null) {
            break;
        }
      }
      return result;
    }

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