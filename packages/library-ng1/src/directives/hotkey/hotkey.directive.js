hotkeyDirective.$inject = ["keyboardService", "$document"];

export default function hotkeyDirective(keyboardService, $document) {
  return {
    restrict: 'A',
    link: hotkeyDirectiveLink
  };

  function hotkeyDirectiveLink(scope, element, attrs) {
    var keyCode = getKeyCode(attrs);
    var callback = getCallback(scope, attrs);

    checkHotkeyHint(scope, element, attrs);

    var focusGroup = element.find("[hotkey-item]");

    //unshift adds to the start of an array
    //Invoking the method via voodoo because jquery-style nodelists don't follow the Array prototype but are array-like
    Array.prototype.unshift.call(focusGroup, element[0]);

    setTabIndices(focusGroup);

    var index = 0;
    var alsoFocusCallback = function () {
      //Loop the index back to the start if necessary
      if (index > focusGroup.length - 1) {
        index = 0;
      }

      //Focus the next item in the list
      if (focusGroup[index]) {
        focusGroup[index].focus();
      }
      //Perform the supplied logic
      //Invoke with the current element
      callback(angular.element(focusGroup[index]));

      index++;
    };

    keyboardService.bindKey(keyCode, alsoFocusCallback, element, $document);
  }

  function checkHotkeyHint(scope, element, attrs) {
    if (angular.isDefined(attrs.hotkeyHint)) {
      keyboardService.createHotkeyHint(element, attrs.hotkey);
    }
  }

  function setTabIndices(elements) {
    //Force this element to be tabbable
    for (var i in elements) {
      if (!elements.eq(i).attr("tabindex")) {
        elements.eq(i).attr("tabindex", "0");
      }
    }
  }

  function getKeyCode(attrs) {
    if (!attrs.hotkey || typeof attrs.hotkey !== "string") {
      console.error("Please refer to the UX Aspects documentation for how to set a hotkey");
      return 0;
    }
    var keyCode = keyboardService.getCharCode(attrs.hotkey);
    if (!keyCode) {
      console.error("Could not parse keycode for" + attrs.hotkey);
      return 0;
    }
    return keyCode;
  }

  function getCallback(scope, attrs) {
    var callback;
    if (attrs.hotkeyAction) {
      callback = scope.$eval(attrs.hotkeyAction);
    }
    return angular.isFunction(callback) ? callback : angular.noop;
  }

}