keyboardService.$inject = ["$document"];

export default function keyboardService($document) {
	var keyMap, nonViableNodeList, nonViableAttributeList, hotkeys, events = [];

    init();

    return {
    	keydown: keydown,
		getCharCode: getCharCode,
		viableHotKeyTarget: viableHotKeyTarget,
		bindKey: bindKey,
		unbindKey: unbindKey,
		createHotkeyHint: createHotkeyHint
    };

    function keydown(element, keyCode, callback, priority, stopPropagation) {

		var event = {
			element: element,
			keyCode: keyCode,
			callback: callback,
			priority: priority ? priority : 1,
			stopPropagation: stopPropagation ? stopPropagation : false
		};

		// check if the element already has a keydown event listener
		// only add another if it doesnt
		var eventAttached = false;
		
		for(var ev in events) {
			if(events[ev].element === element) {
				eventAttached = true;
				break;
			}
		}

		// if events array empty then add event to array
		// if non-empty check if event already exists in array and if not add it
		events.push(event);
		

		// sort events by priority
		events.sort(function(a, b) {
			if(a.priority > b.priority) {
				return 1;
			}
			if(a.priority < b.priority) {
				return -1;
			}
			return 0;
		});

		// watch for element being removed and then cleanup
		angular.element(element).on('remove', function() {

			for(var idx in events) {

				// get current event
				var event = events[idx];

				// if a match was found then remove event from list
				if(event.element === element) {
					events.splice(parseInt(idx), 1);
				}
			} 

		});

		// if element has event attached to it, create keydown for it 
		// and call each event on keydown if the keyCode matches
		if(!eventAttached) {

			element.on('keydown', function(keyEvent) {

				var matchingEvents = events.filter(function(event) {
					return event.keyCode === keyEvent.keyCode && event.element.is(element);
				});

				for (var i = 0; i < matchingEvents.length; i++) {
					
					var event = matchingEvents[i];

					event.callback.call(this, keyEvent);

					if(event.stopPropagation || keyEvent.isPropagationStopped()) {
						break;
					}
				}


			});
		}

	}

    function createHotkeyHint(element, hotkeyText) {
		var hotkeyHint = angular.element("<div class='hotkey-group-hint'>" + hotkeyText + "</div>");
		var wrapper = angular.element("<div></div");

		var hintStyle = {
			position: 'absolute',
			top: '0',
			left: '0'
		};

		var wrapperStyle = {
			position: 'relative',
			width: 0,
			height: 0
		};

		angular.extend(hotkeyHint[0].style, hintStyle);

		angular.extend(wrapper[0].style, wrapperStyle);

		wrapper.prepend(hotkeyHint);

		element.prepend(wrapper);
    }

    function bindKey(key, callback, boundElement, keyTarget) {
		// Get key and modifiers
		var hotkey = getHotkey(key);

		//Use the document by default
		if (!keyTarget) {
			keyTarget = $document;
		}

		//Wrap the callback in some keybind logic
		var keyFn = function (event) {
			if (viableHotKeyTarget(event.target)) {
				if (event.which === hotkey.code &&
				event.shiftKey === hotkey.shiftKey &&
				event.ctrlKey === hotkey.ctrlKey &&
				event.altKey === hotkey.altKey) {
					event.preventDefault();
					callback();
				}
			}
		};

		//In the event of a collision, new setting takes precedence
		if (getCallbackForHotkey(hotkey)) {
			unbindKey(hotkey, keyTarget);
		}
		//Store the function for easy deletion later
		hotkeys.push({
			hotkey: hotkey,
			callback: keyFn
		});

		//Bind the key to the function
		keyTarget.on('keydown', keyFn);

		//If this was invokved from a directive, unbind it when that element is cleaned up
		if (boundElement) {
			boundElement.scope().$on('$destroy', function () {
				unbindKey(hotkey, keyTarget);
			});
		}
    }

    function unbindKey(key, keyTarget) {
		// Get key and modifiers
		var hotkey = getHotkey(key);

		//Use the $document by default
		if (!keyTarget) {
			keyTarget = $document;
		}

		var callback = getCallbackForHotkey(hotkey);
		if (callback) {
			keyTarget.off('keydown', callback);
			hotkeys = hotkeys.filter(function(h) { return !hotkeyEquals(h.hotkey, hotkey); });
		}
    }

    function getCharCode(inputStr) {
		if (keyMap[inputStr]) {
			return keyMap[inputStr];
		}
		if (inputStr.length && inputStr.length === 1) {
			return inputStr.toUpperCase().charCodeAt();
		}
		return 0;
    }

    function viableHotKeyTarget(domElem) {
		var nodeName = domElem.nodeName;
		if (!nodeName) {
			return false;
		}
		nodeName = nodeName.toLowerCase();
		if (!!~nonViableNodeList.indexOf(nodeName)) {
			return false;
		}
		for (var i in nonViableAttributeList) {
			if (domElem.attributes.getNamedItem(nonViableAttributeList[i])) {
				return false;
			}
		}

		return true;
    }

    function init() {
		keyMap = {
			'backspace': 8,
			'tab': 9,
			'clear': 12,
			'enter': 13,
			'return': 13,
			'esc': 27,
			'escape': 27,
			'space': 32,
			'left': 37,
			'up': 38,
			'right': 39,
			'down': 40,
			'del': 46,
			'delete': 46,
			'home': 36,
			'end': 35,
			'pageup': 33,
			'pagedown': 34,
			',': 188,
			'.': 190,
			'/': 191,
			'`': 192,
			'-': 189,
			'=': 187,
			';': 186,
			'\'': 222,
			'[': 219,
			']': 221,
			'\\': 220,
		};

		nonViableNodeList = ["input", "textarea", "select", "option"];

		nonViableAttributeList = ["contenteditable", "hotkey-ignore"];

		hotkeys = [];
    }

    // Function to convert the numeric or object key param into hotkey object
    function getHotkey(key) {
		return {
			code: key.hasOwnProperty("code") ? key.code : key,
			shiftKey: !!key.shiftKey,
			ctrlKey: !!key.ctrlKey,
			altKey: !!key.altKey
		};
    }

    // Function to retrieve the callback function for a hotkey
    function getCallbackForHotkey(hotkey) {
		for (var i = 0; i < hotkeys.length; i += 1) {
			if (hotkeyEquals(hotkeys[i].hotkey, hotkey)) {
				return hotkeys[i].callback;
			}
		}
    }

	// Equality function for hotkey object
	function hotkeyEquals(a, b) {
		return a.code === b.code &&
		a.shiftKey === b.shiftKey &&
		a.ctrlKey === b.ctrlKey &&
		a.altKey === b.altKey;
	}

}