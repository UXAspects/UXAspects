export default function ResizeService() {

    var listeners = [];

    return {
        bind: bind,
        unbind: unbind
    };

    function bind(element, callback) {

        // if no sensors added to element then attach some
        if (sensorsAttached(element) === false) {
            attachSensors(element);
        }

        // if listener no already attached
        if (listenerAttached(element, callback) === false) {

            // store the element and callback
            listeners.push({
                element: element,
                callback: callback
            });
        }
    }

    function unbind(element, callback) {

        // find any matching listeners
        var matches = listeners.filter(function(listener) {
            return listener.element === element && listener.callback === callback;
        });

        // iterate each match and remove
        matches.forEach(function(listener) {

            // find index of the listener
            var idx = listeners.indexOf(listener);

            // remove the item from the array
            listeners.splice(idx, 1);
        });
    }

    function attachSensors(element) {

        // create all elements
        var resizeWidth, resizeHeight;
        var resizeElement = document.createElement('div');
        var resizeGrowElement = document.createElement('div');
        var resizeGrowChildElement = document.createElement('div');
        var resizeShrinkElement = document.createElement('div');
        var resizeShrinkChildElement = document.createElement('div');

        // add necessary styling
        resizeElement.style.cssText = 'position: absolute; left: 0; top: 0; right: 0; bottom: 0; overflow: scroll; z-index: -1; visibility: hidden;';
        resizeGrowElement.style.cssText = 'position: absolute; left: 0; top: 0; right: 0; bottom: 0; overflow: scroll; z-index: -1; visibility: hidden;';
        resizeShrinkElement.style.cssText = 'position: absolute; left: 0; top: 0; right: 0; bottom: 0; overflow: scroll; z-index: -1; visibility: hidden;';

        resizeGrowChildElement.style.cssText = 'position: absolute; left: 0; top: 0;';
        resizeShrinkChildElement.style.cssText = 'position: absolute; left: 0; top: 0; width: 200%; height: 200%;';

        // Create a function to programmatically update sizes
        var updateSizes = function() {

            resizeGrowChildElement.style.width = resizeGrowElement.offsetWidth + 10 + 'px';
            resizeGrowChildElement.style.height = resizeGrowElement.offsetHeight + 10 + 'px';

            resizeGrowElement.scrollLeft = resizeGrowElement.scrollWidth;
            resizeGrowElement.scrollTop = resizeGrowElement.scrollHeight;

            resizeShrinkElement.scrollLeft = resizeShrinkElement.scrollWidth;
            resizeShrinkElement.scrollTop = resizeShrinkElement.scrollHeight;

            resizeWidth = element.offsetWidth;
            resizeHeight = element.offsetHeight;
        };

        // create functions to call when content grows
        var onGrow = function() {

            var currentWidth = element.offsetWidth,
                currentHeight = element.offsetHeight;

            // check to see if the content has change size
            if (currentWidth > resizeWidth || currentHeight > resizeHeight) {

                // if size has changed then call callbacks
                informCallbacks(currentWidth, currentHeight);
            }
            // after reinitialising update sizes
            updateSizes();
        };

        // create functions to call when content shrinks
        var onShrink = function() {

            var currentWidth = element.offsetWidth,
                currentHeight = element.offsetHeight;

            // check to see if the content has change size
            if (currentWidth < resizeWidth || currentHeight < resizeHeight) {

                // if size has changed then call callbacks
                informCallbacks(currentWidth, currentHeight);
            }
            // after reinitialising update sizes
            updateSizes();
        };

        var informCallbacks = function(width, height) {

            // return all callbacks for current element
            var matchingListeners = listeners.filter(function(listener) {
                return element === listener.element;
            }).map(function(listener) {
                return listener.callback;
            });

            matchingListeners.forEach(function(callback) {
                callback.call(this, element, width, height);
            });
        };

        // bind to scroll events
        resizeGrowElement.addEventListener('scroll', onGrow.bind(this));
        resizeShrinkElement.addEventListener('scroll', onShrink.bind(this));

        // nest elements before adding to pane
        resizeGrowElement.appendChild(resizeGrowChildElement);
        resizeShrinkElement.appendChild(resizeShrinkChildElement);

        resizeElement.appendChild(resizeGrowElement);
        resizeElement.appendChild(resizeShrinkElement);

        element.appendChild(resizeElement);

        // get all computed styles of element
        var styles = window.getComputedStyle(element, null);

        // ensure parent element is not statically positioned
        if (styles.getPropertyValue('position') === 'static') {
            element.style.position = 'relative';
        }

        // ensure element is not display inline
        if (styles.getPropertyValue('display') === 'inline') {
            console.log('UX Aspects Resize Service - This will not work correctly on inline elements. Consider using block or inline-block instead.');
        }

        // update sizes initially
        updateSizes();

    }

    function sensorsAttached(element) {
        var matchingElements = listeners.filter(function(listener) {
            return listener.element === element;
        });

        return matchingElements.length !== 0;
    }

    function listenerAttached(element, callback) {
        var matchingElements = listeners.filter(function(listener) {
            return listener.element === element && listener.callback === callback;
        });

        return matchingElements.length !== 0;
    }
}