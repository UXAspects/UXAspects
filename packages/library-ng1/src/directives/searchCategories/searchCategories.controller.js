SearchCategoriesCtrl.$inject = ["$scope", "$element", "$timeout", "keyboardService"];

export default function SearchCategoriesCtrl($scope, $element, $timeout, keyboardService) {
  var vm = this;

  var Keys = {
    enter: 13,
    esc: 27,
    up: 38,
    down: 40
  };

  var defaultOptions = {
    placeholder: "Type people, terms, or scenarios",
    inputKey: ";".charCodeAt(0)
  };

  vm.allOptions = angular.extend({}, defaultOptions, vm.options);

  // Special model for tag input control
  vm.tagsModel = initTagsModel(vm.ngModel);

  // Update UI when model changes
  $scope.$watch("vm.ngModel", function(nv) {
    vm.tagsModel = initTagsModel(nv);
  }, true);

  // Options for tag input control
  vm.tagOptions = {
    placeholder: vm.allOptions.placeholder,
    format: {
      key: "key",
      display: "query"
    },
    template: "searchCategories/templates/tag.tmpl.html",
    enableEditingLastTag: true
  };
  
  // Callbacks from tag input
  vm.tagApi = {
    // Prevent adding, tags are inserted into the model directly
    onTagAdding: function() { return false; },

    // Allow 'x' button and backspace to deselect from our model
    onTagRemoved: function($tag) {
      removeTag($tag);
    }
  };

  // User-entered text
  vm.inputText = "";

  // State of the category dropdown
  vm.dropdownOpen = false;

  // Category name of the category to have focus in the dropdown
  vm.highlightedCategory = null;

  // Regex match filter for categories
  vm.categoryFilter = function(category) {
    if (!angular.isDefined(category.match)) return true;
    return category.match.test(vm.inputText);
  };

  // Focus handler - hide dropdown
  $element.on("focus.searchCategories", "input", function() {
    $timeout(function() {
      vm.dropdownOpen = false;
      vm.highlightedCategory = null;
    });
  });

  // Keypress handler - show and focus dropdown on semicolon input
  $element.on("keypress.searchCategories", "input", function(e) {
    if (e.which !== vm.allOptions.inputKey) return;

    // Show panel
    $scope.$apply(function() {
      vm.dropdownOpen = true;
    });

    // Find first menu item
    var highlightElement = $element.find(".el-searchcategories-dropdown-item").first();

    // Set highlight on the catgory
    if (highlightElement.length > 0) {
      $scope.$apply(function() {
        vm.highlightedCategory = highlightElement.attr("data-key");
      });
    }

    e.stopPropagation();
    e.preventDefault();
  });

  // Navigation within the dropdown
  keyboardService.keydown($element, Keys.up, function(e) {
    $scope.$apply(function() {
      moveFocus(Keys.up);
    });
    e.preventDefault();
  }, 1, true);
  keyboardService.keydown($element, Keys.down, function(e) {
    $scope.$apply(function() {
      moveFocus(Keys.down);
    });
    e.preventDefault();
  }, 1, true);
  // Enter key commits the search tag
  keyboardService.keydown($element, Keys.enter, function(e) {
    var focusedElement = getFocusedCategoryDropdownItem();
    if (focusedElement) {
      var categoryName = focusedElement.attr("data-key");
      $scope.$apply(function() {
        vm.select(categoryName);
      });
    }
    e.preventDefault();
  }, 1, true);
  // Escape key returns focus to the input and closes the dropdown
  keyboardService.keydown($element, Keys.esc, function() {
    $element.find("input").focus();
  }, 1, true);

  // Clean up event handlers
  $scope.$on("$destroy", function() {
    $element.off("keypress.searchCategories");
  });

  vm.isHighlighted = function(category) {
    return category.name === vm.highlightedCategory;
  };

  vm.setHighlighted = function(category) {
    vm.highlightedCategory = category.name;
  };

  vm.select = function(categoryName) {
    vm.ngModel.push({
      query: vm.inputText,
      category: categoryName
    });
    vm.inputText = "";
    $element.find("input").focus();
  };

  function initTagsModel(model) {
    var tagsModel = [];
    for (var i in model) {
      var category = findCategory(model[i].category);
      var tag = {
        key: model[i].query + "[" + model[i].category + "]",
        query: model[i].query,
        category: model[i].category,
        iconClass: category.iconClass
      };
      tagsModel.push(tag);
    }
    return tagsModel;
  }

  function removeTag(tag) {
    var index = -1;
    for (var i in vm.ngModel) {
      if (vm.ngModel[i].query === tag.query && vm.ngModel[i].category === tag.category) {
        index = i;
        break;
      }
    }
    vm.ngModel.splice(index, 1);
  }

  function findCategory(categoryName) {
    for (var i in vm.categories) {
      if (vm.categories[i].name === categoryName) {
        return vm.categories[i];
      }
    }
    return {};
  }

  // Return the focused browser element if it's one of the category dropdown items
  function getFocusedCategoryDropdownItem() {
    var focusedElement = angular.element(document.activeElement);
    if ($element.has(focusedElement).length > 0 && focusedElement.hasClass("el-searchcategories-dropdown-item")) {
      return focusedElement;
    }
    return null;
  }

  // Change focus to next or previous category list item
  function moveFocus(directionKey) {
    var focusedElement = getFocusedCategoryDropdownItem();
    if (focusedElement) {
      var nextElement;
      if (directionKey === Keys.up) {
        nextElement = focusedElement.prev(".el-searchcategories-dropdown-item"); 
      }
      else {
        nextElement = focusedElement.next(".el-searchcategories-dropdown-item");
      }
      if (nextElement.length > 0) {
        vm.highlightedCategory = nextElement.attr("data-key");
      }
    }
  }

}