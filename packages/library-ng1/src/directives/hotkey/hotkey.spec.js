describe('hotkeys', function () {
  var $compile, $rootScope;

  var documentMock, hotkeys, onSpy, offSpy;

  beforeEach(module('ux-aspects.hotkey'));
  beforeEach(module('ux-aspects.keyboardService'));

  beforeEach(function () {

    documentMock = jasmine.createSpyObj("document", ["on", "off"]);
    hotkeys = [];
    onSpy = jasmine.createSpy("on");
    offSpy = jasmine.createSpy("off");
    documentMock.on = function (event, fn) {
      hotkeys.push({
        event: event,
        fn: fn
      });
      onSpy();
    };
    documentMock.off = function () {
      offSpy();
    };
    documentMock.nodeName = "document";
    documentMock.attributes = {
      getNamedItem: angular.noop
    };

    module(function ($provide) {
      $provide.value("$document", documentMock);
    });

    inject(function (_$compile_, _$rootScope_) {
      $compile = _$compile_;
      $rootScope = _$rootScope_;
    });

  });

  function create() {

    var scope = $rootScope.$new();
    scope.callback = jasmine.createSpy("callback");
    scope.buttonA = jasmine.createSpy("A");
    scope.buttonB = jasmine.createSpy("B");
    scope.buttonC = jasmine.createSpy("C");
    var html = '<div class="aspects-outline" hotkey="e" hotkey-action="callback" hotkey-hint id="1">';
    html += '<button class="btn button button-secondary" hotkey-item ng-click="buttonA()" id="2">A</button>';
    html += '<button class="btn button button-secondary" hotkey-item ng-click="buttonB()" id="3">B</button>';
    html += '<button class="btn button button-secondary" hotkey-item ng-click="buttonC()" id="4">C</button>';
    html += '</div>';

    var element = $compile(html)(scope);

    scope.$digest();

    return {
      element: element,
      scope: scope
    };

  }

  function keydownEvent(target, which, shiftKey, ctrlKey, altKey) {
    return jQuery.Event("keydown", {
      which: which,
      shiftKey: !!shiftKey,
      ctrlKey: !!ctrlKey,
      altKey: !!altKey,
      target: target
    });
  }

  describe('groups of controls', function () {
    it('should focus the group', function () {
      var directive = create();
      var eEvent = keydownEvent(documentMock, 69);
      hotkeys[0].fn(eEvent);
      //Voodoo - expecting the callback to have been invokved with the focused element
      expect(directive.scope.callback.calls.mostRecent().args[0].attr("id")).toEqual(directive.element.attr("id"));
    });
    it('should focus each control inside the group in turn', function () {
      var directive = create();
      var eEvent = keydownEvent(documentMock, 69);
      for (var i = 1; i < 5; i++) {
        hotkeys[0].fn(eEvent);
        expect(Number(directive.scope.callback.calls.mostRecent().args[0].attr("id"))).toEqual(i);
      }
    });
    it('should display a hotkey hint', function () {
      var directive = create();
      expect(directive.element.find(".hotkey-group-hint").text()).toEqual('e');
    });
    it('should run the supplied function for each element', function () {
      var directive = create();
      var eEvent = keydownEvent(documentMock, 69);
      hotkeys[0].fn(eEvent);
      expect(directive.scope.callback).toHaveBeenCalled();
    });
  });

});