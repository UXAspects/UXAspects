describe('draggable cards', function () {
  
  var $compile, $rootScope, $scope, $timeout;
  var vm = {};
  var suite = {};

  beforeEach(module("ux-aspects.draggableCards"));
  beforeEach(module("ux-aspects.safeTimeout"));
  beforeEach(module("ux-aspects.safeEventListener"));
  beforeEach(module("ux-aspects.safeAnimationFrame"));

  beforeEach(inject(function (_$compile_, _$rootScope_, _$timeout_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    $timeout = _$timeout_;
    $scope = $rootScope.$new();
  }));

  describe("draggable card control directive", function () {

    beforeEach(function () {
      vm = {};

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

      vm.disableRemove = true;

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
        icons: [{
          icon: 'hpe-folder',
          tooltip: 'Folder',
          click: function () {
            //do stuff here when icon is clicked
          }
        }]
      }, {
        name: 'Privileged',
        count: '(4)',
        status: '7% unique, 10% shared',
        description: 'NYC Production 2 created as a follow up to Production 1.',
        selected: false
      }, {
        name: 'Relevant',
        count: '(2)',
        status: '65% unique, 12% shared',
        description: 'NYC Production 3 Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        selected: false
      }, {
        name: 'Proprietary',
        count: '(3)',
        status: '7% unique, 10% shared',
        description: 'NYC Production 4 Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        selected: false
      }, {
        name: 'Reviewed',
        count: '(2)',
        status: '65% unique, 12% shared',
        description: 'NYC Production 5 Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        selected: false
      }];

      $scope.vm = vm;

      var html = '<div class="draggable-card-demo">\n' +
        '<draggable-cards on-edit="vm.onEdit" on-remove="vm.onRemove" on-select="vm.onSelect" on-reorder="vm.onReorder" direction="right">\n' +
        '<fixed-card ng-repeat="card in vm.fixedCards" card-title="card.name" card-subtitle="card.count" card-selected="card.selected"></fixed-card>\n' +
        '<draggable-card ng-repeat="card in vm.draggableCards" card-title="card.name" disable-remove="vm.disableRemove" card-icons="card.icons" card-subtitle="card.count" card-selected="card.selected">\n' +
        '<div class="card-content">\n' +
        '<div class="text-container">\n' +
        '<p class="m-b-nil status" ng-bind="card.status" overflow-tooltip></p>\n' +
        '<p class="m-b-nil description text-muted" ng-bind="card.description" overflow-tooltip></p>\n' +
        '</div>\n' +
        '</div>\n' +
        '</draggable-card>\n' +
        '</draggable-cards>\n' +
        '</div>';

      if (!suite.element) {

        suite.element = $compile(html)($scope);
        $scope.$digest();
        $timeout.flush();
      }
    });

    afterAll(function () {
      //destroy our new scope
      $scope.$destroy();

      //remove element
      suite.element.remove();
      suite = null;
    });

    it('should initiate a draggable cards instance', function () {
      expect(vm.fixedCards).toBeDefined();
      expect(vm.draggableCards).toBeDefined();
      expect(vm.onSelect).toBeDefined();
      expect(vm.onReorder).toBeDefined();
      expect(vm.onEdit).toBeDefined();
      expect(vm.onRemove).toBeDefined();
    });

    it('should contain the correct number of cards', function () {
      var cards = suite.element[0].getElementsByClassName('card-container');
      expect(cards.length).toBe(7);
    });

    it('should contain the correct number of fixed cards', function () {
      var cards = suite.element[0].querySelectorAll('.card.fixed');
      expect(cards.length).toBe(2);
    });

    it('should contain the correct number of draggable cards', function () {
      var cards = suite.element[0].querySelectorAll('.card.draggable');
      expect(cards.length).toBe(5);
    });

    // FIXED CARDS

    it('should have title in fixed card', function () {
      var card = suite.element[0].querySelectorAll('.card.fixed')[0];
      var title = card.getElementsByClassName('title');

      expect(title.length).toBe(1);
    });

    it('should have subtitle in fixed card', function () {
      var card = suite.element[0].querySelectorAll('.card.fixed')[0];

      var title = card.getElementsByClassName('title');
      expect(title.length).toBe(1);

      var subtitle = title[0].getElementsByClassName('text-muted');
      expect(subtitle.length).toBe(1);
    });

    it('should not have draggable controls in fixed card', function () {
      var card = suite.element[0].querySelectorAll('.card.fixed')[0];
      var controls = card.getElementsByClassName('drag-container');

      expect(controls.length).toBe(0);
    });

    it('should not have remove button in fixed card', function () {
      var card = suite.element[0].querySelectorAll('.card.fixed')[0];
      var removeBtn = card.getElementsByClassName('close-btn');

      expect(removeBtn.length).toBe(0);
    });

    it('should not have edit button in fixed card', function () {
      var card = suite.element[0].querySelectorAll('.card.fixed')[0];
      var editButton = card.getElementsByClassName('editing-btn');

      expect(editButton.length).toBe(0);
    });

    // DRAGGABLE CARDS

    it('should have title in draggable card', function () {
      var card = suite.element[0].querySelectorAll('.card.draggable')[0];
      var title = card.getElementsByClassName('title');

      expect(title.length).toBe(1);
    });

    it('should have subtitle in draggable card', function () {
      var card = suite.element[0].querySelectorAll('.card.draggable')[0];

      var title = card.getElementsByClassName('title');
      expect(title.length).toBe(1);

      var subtitle = title[0].getElementsByClassName('text-muted');
      expect(subtitle.length).toBe(1);
    });

    it('should have draggable controls in draggable card', function () {
      var card = suite.element[0].querySelectorAll('.card.draggable')[0];
      var controls = card.getElementsByClassName('drag-container');

      expect(controls.length).toBe(1);
    });

    it('should have remove button in draggable card', function () {
      var card = suite.element[0].querySelectorAll('.card.draggable')[0];
      var removeBtn = card.getElementsByClassName('close-btn');

      expect(removeBtn.length).toBe(1);
    });

    it('should have edit button in draggable card', function () {
      var card = suite.element[0].querySelectorAll('.card.draggable')[0];
      var editButton = card.getElementsByClassName('editing-btn');

      expect(editButton.length).toBe(1);
    });

    it('should select the default card initially', function () {
      var card = suite.element[0].querySelectorAll('.card.draggable')[0];
      var isSelected = card.className === 'card draggable active right';

      expect(isSelected).toBe(true);
    });

    it('should disable the close button when required', function () {
      var card = suite.element[0].querySelectorAll('.card.draggable')[0];
      var disabled = card.getElementsByClassName('disabled');

      expect(disabled.length).toBe(1);
    });

    it('should have a dynamically added icon', function () {
      var card = suite.element[0].querySelectorAll('.card.draggable')[0];
      var folderBtn = card.getElementsByClassName('hpe-folder');

      expect(folderBtn.length).toBe(1);
    });

  });

});