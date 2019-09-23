describe('component list control', function () {

  var $compile, $rootScope, $scope, $controller;

  beforeEach(module("ux-aspects.componentList"));

  beforeEach(inject(function (_$compile_, _$rootScope_, _$controller_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    $controller = _$controller_;
    $scope = $rootScope.$new();
  }));

  describe("component list directive controller", function () {

    it('should create a component list with the default options', function () {

      var controller = instantiateController({});

      expect(controller.addingDisabled).toBe(false);
      expect(controller.buttonText).toBe("Add a field");
      expect(controller.components.length).toBe(0);
      expect(controller.minComponents).toBe(0);
      expect(controller.removingDisabled).toBe(true);
    });

    it('should create a component list with specific button text', function () {

      var controller = instantiateController({
        buttonText: 'Add More Stuff'
      });

      expect(controller.addingDisabled).toBe(false);
      expect(controller.buttonText).toBe("Add More Stuff");
      expect(controller.components.length).toBe(0);
      expect(controller.minComponents).toBe(0);
      expect(controller.removingDisabled).toBe(true);
    });

    it('should create a component list with empty items when min components is set', function () {

      var controller = instantiateController({
        minComponents: 2
      });

      expect(controller.addingDisabled).toBe(true);
      expect(controller.components.length).toBe(2);
      expect(controller.minComponents).toBe(2);
      expect(controller.removingDisabled).toBe(true);
    });

    it('should ensure component list will only show no more than max components initially', function () {

      var controller = instantiateController({
        components: [1, 2, 3],
        maxComponents: 2
      });

      expect(controller.addingDisabled).toBe(true);
      expect(controller.components.length).toBe(2);
      expect(controller.minComponents).toBe(0);
      expect(controller.removingDisabled).toBe(false);
    });

    it('should ensure component list will not remove items if it would be less than min-components', function () {

      var controller = instantiateController({
        components: [1, 2],
        minComponents: 2
      });

      expect(controller.addingDisabled).toBe(false);
      expect(controller.components.length).toBe(2);
      expect(controller.minComponents).toBe(2);
      expect(controller.removingDisabled).toBe(true);

      // try and call the remove function
      controller.removeField(0);

      expect(controller.components.length).toBe(2);

    });

    it('should ensure component list will add items if it would be more than max-components', function () {

      var controller = instantiateController({
        components: [1, 2],
        maxComponents: 2
      });

      expect(controller.addingDisabled).toBe(true);
      expect(controller.components.length).toBe(2);
      expect(controller.maxComponents).toBe(2);
      expect(controller.removingDisabled).toBe(false);

      // try and call the remove function
      controller.addField();

      expect(controller.components.length).toBe(2);

    });

    it('should ensure component list wont allow adding of new items if all current fields are not populated', function () {

      var controller = instantiateController({
        components: [null, null]
      });

      expect(controller.addingDisabled).toBe(true);
      expect(controller.components.length).toBe(2);
      expect(controller.removingDisabled).toBe(false);

      // try and call the remove function
      controller.addField();

      expect(controller.components.length).toBe(2);

    });


  });

  function instantiateController(props) {

    // create a new scope
    $scope = $rootScope.$new();

    // add variables to controller as property
    $scope.vm = props;

    // prepare the controller
    var ctrlFn = $controller('ComponentListCtrl', {
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
});