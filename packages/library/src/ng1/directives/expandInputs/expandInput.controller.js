ExpandInputCtrl.$inject = ['$element', '$window'];

export default function ExpandInputCtrl($element, $window) {
  var vm = this;

  vm.expanded = false;
  vm.value = '';
  vm.iconBase = vm.clearTextIcon && vm.clearTextIcon.indexOf('hp-') === -1 ? 'hpe-icon' : 'hp-icon';

  // store reference to a few elements
  var nativeElement = $element.get(0);
  var navigationParent = findParentWithClass(nativeElement, 'nav');

  // needs to be jquery element here
  var inputElement = $element.find('input');

  // bind to window resize event
  $window.addEventListener('resize', resize);

  vm.updateState = function (expand) {

    // store whether or not the input control should be expanded
    vm.expanded = expand;

    // take into account the expandAlways property
    if (vm.expanded === true) {

      if (vm.expandAlways) {
        // setting search expanded value to true and can be handled in the front end.
        vm.expanded = true;
        showSearch();
      } else {
        //force a condition where search if not always shown does not show up in smaller viewport.
        if ($window.innerWidth > 768) {
          vm.expanded = true;
          showSearch();
        } else {
          vm.expanded = false;
        }
      }
    } else {
      showElement();
    }

    // if a focus callback is defined call it with the state
    if (vm.focus) {
      vm.focus({
        value: vm.expanded
      });
    }
  };

  vm.clear = function (event) {

    // clear the input value
    vm.value = '';

    // ensure we stop this event propagating
    event.preventDefault();
  };

  vm.close = function () {

    // collapse the input
    vm.updateState(false);

    showElement();
  };

  vm.keyPressed = function (event) {

    // if the key pressed was the return key and we have an onEnter event call it with the current value
    if (event.keyCode === 13 && vm.onEnter) {
      vm.onEnter(vm.value);
    }
  };

  vm.keyDown = function (event) {

    // if key pressed was escape then trigger a blur event on input
    if (event.keyCode === 27) {
      inputElement.blur();
    }
  };

  /*
    Private Functions Not Exposed to View
  */

  function resize() {

    // if we are not always expanding then shrink the input
    if (!vm.expandAlways) {

      // trigger a blur event on the element
      inputElement.blur();
    }
  }

  function showElement() {

    // remove class from the element
    nativeElement.classList.remove('expanded');

    // if we are in a navigation bar remove the class from it
    if(navigationParent !== null) {
      navigationParent.classList.remove('inputexpanded');
    }

    // find parent with show-search class
    var showSearch = findParentWithClass(nativeElement, 'show-search');

    // if exists then remove the class
    if(showSearch !== null) {
      showSearch.classList.remove('show-search');
    }

  }

  function showSearch() {

    // add expanded class to the element
    nativeElement.classList.add('expanded');
    
    // if element is in a navigation bar
    if(navigationParent !== null) {
      navigationParent.classList.add('inputexpanded');
    }
  }

  function findParentWithClass(element, className) {

    // iterate through all parent elements
    while(element.parentElement) {
      
      // get the parent element
      var parentElement = element.parentElement;

      // check if the parent element has the class we are looking for
      if(parentElement.classList.contains(className)) {
        return parentElement;
      }

      // set element equal to the parent
      element = parentElement;
    }

    return null;
  }

}