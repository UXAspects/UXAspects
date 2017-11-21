DynamicSelectCtrl.$inject = ["$scope", "$element", "$attrs", "$compile", "$timeout", "$sanitize", "debounceService"];

export default function DynamicSelectCtrl($scope, $element, $attrs, $compile, $timeout, $sanitize, debounceService) {
  var vm = this;

  var inputModelCtrl = null;

  var Keys = {
    enter: 13,
    up: 38,
    down: 40
  };

  // True for multiselect
  vm.multiple = ("multiple" in $attrs);

  var defaultOptions = {
    placeholder: vm.multiple ? "Select some options" : "Select an option",
    allowNull: true,
    scroll: true,
    pageSize: 20,
    dropDirection: "down",
    initialPlaceholder: false
  };

  vm.allOptions = angular.extend({}, defaultOptions, vm.options);

  // Update UI when model changes
  $scope.$watch("vm.ngModel", function(nv) {
    if (vm.multiple) {
      vm.tagsModel = initTagsModel(nv);
    }
    else {
      if (nv !== null) {
        vm.singleText = displayValueOf(nv);
      }
    }
  }, true);

  // Modified copy of ngModel for tag input control
  vm.tagsModel = [];

  // Options for tag input control
  vm.tagOptions = {
    placeholder: vm.allOptions.placeholder,
    format: {
      key: "key",
      display: "display"
    }
  };

  // support showing placeholder only when there are no selected tags
  vm.tagOptions.initialPlaceholder = vm.allOptions.initialPlaceholder;

  // Callbacks from tag input
  vm.tagApi = {

    // Prevent adding, tags are inserted into the model directly
    onTagAdding: function() { return false; },

    // Allow 'x' button and backspace to deselect from our model
    onTagRemoved: function($tag) {
      deselect($tag.key);
    }
  };

  // Text for single select, either filter or selected value
  vm.singleText = "";
  if (!vm.multiple) {
    $scope.$watch("vm.singleText", function(nv) {
      if (nv === displayValueOf(vm.ngModel)) {
        vm.filterText = "";
        setDirty();
      }
      else {
        vm.filterText = nv;
        if (vm.allOptions.allowNull) {
          vm.ngModel = null;
        }
      }
    });
  }

  // Filter text from the tag input or single select input
  vm.filterText = "";

  // Debounced user input to feed into infinite scroll to avoid overlapping requests
  vm.debouncedFilter = "";
  $scope.$watch("vm.filterText", debounceService(function(nv) {
    vm.debouncedFilter = nv;

    // Open the dropdown when typing occurs
    if (nv !== "") {
      setDropdown(true);
    }

    // Reset the highlight
    vm.highlightedItemKey = null;
  }, 800));

  // Case insensitive filter for ng-repeat
  vm.dropdownFilter = function(item) {
    return displayValueOf(item).toLowerCase().indexOf(vm.debouncedFilter.toLowerCase()) !== -1;
  };

  // State of the select list
  vm.dropdownOpen = false;

  // Indicates whether dynamic paging is to be used
  vm.isPaging = angular.isFunction(vm.source);

  // Current item highlighted by mouseover or keyboard
  vm.highlightedItemKey = null;

  // Functions used by select items, using an object so that they can be added to the scope in infinite scroll
  vm.itemApi = {
    select: function(item) {
      if (!isSelected(item)) {
        // Add item to the model
        select(item);

        // Reset the search text
        vm.filterText = "";

        // Focus the input field
        $element.find("input").focus();

        // Close the dropdown 
        vm.dropdownOpen = false;

        // Reset highlight
        vm.highlightedItemKey = null;
      }
    },
    isSelected: isSelected,
    getKey: keyOf,
    getDisplay: displayValueOf,
    getDisplayHtml: displayValueWithFilterMatch,
    setHighlighted: setHighlighted,
    isHighlighted: isHighlighted
  };

  // Set up dropdown
  $element.append(getDropdownHtml());

  // Multiple select input click handler (using jquery since it's a plugin)
  $element.on("click.dynamicSelect", ".host", function() {
    $scope.$apply(function() {
      setDropdown(true);
    });
  });

  // Single select input click handler
  vm.onSingleInputClick = function() {
    setDropdown(true);

    // Select all text for easy removal
    $element.find("input.el-dynamicselect-singleinput").select();
  };

  // Blur event handler
  $element.on("blur.dynamicSelect", "input", function() {
    // Close the dropdown if selection leaves the input or its children
    // Timeout to allow click events in the dropdown to register 
    $timeout(function() {
      if ($element.has(document.activeElement).length === 0) {
        vm.dropdownOpen = false;

        // Remove the filter text and show selected value on blur
        if (!vm.multiple) {
          vm.singleText = displayValueOf(vm.ngModel);
        }
      }
    }, 200);
  });

  // Keyboard control
  $element.on("keydown.dynamicSelect", "input", function(e) {
    if ([Keys.up, Keys.down, Keys.enter].indexOf(e.which) === -1) return;
    var highlightedElement = $element.find(".el-dynamicselect-dropdown-item.highlighted").first();
    var nextElement = null;
    switch (e.which) {
      case Keys.up:
        if (highlightedElement.length > 0 && vm.dropdownOpen) {
          nextElement = highlightedElement.prevAll("li:not(.selected)").first();
        }
        break;
      case Keys.down:
        if (highlightedElement.length > 0 && vm.dropdownOpen) {
          nextElement = highlightedElement.nextAll("li:not(.selected)").first();
        }
        else {
          nextElement = $element.find(".el-dynamicselect-dropdown-item:not(.selected)").first();
        }
        // Show panel
        $scope.$apply(function() {
          setDropdown(true);
        });
        break;
      case Keys.enter:
        if (vm.dropdownOpen) {
          highlightedElement.click();
        }
        break;
    }
    $scope.$apply(function() {
      setHighlightOnElement(nextElement);
    });
    e.stopPropagation();
    e.preventDefault();
  });

  // Clean up event handlers
  $scope.$on("$destroy", function() {
    $element.off("click.dynamicSelect blur.dynamicSelect keydown.dynamicSelect");
  });

  // Set highlight on first result when opening dropdown
  $scope.$watch("vm.dropdownOpen", function(nv) {
    if (nv) {
      initHighlight();
    }
  });

  // Watch the children of the dropdown list for changes and set highlight on first result if unset
  // (used when results are loaded asynchronously)
  $timeout(function() {
    var dropdownObserver = new MutationObserver(function() {
      $scope.$apply(initHighlight);
    });
    var itemListElement = $element.find(".el-dynamicselect-dropdown ul");
    if (itemListElement.length > 0) {
      dropdownObserver.observe(itemListElement.get(0), { childList: true });
    }
  });

  function getDropdownHtml() {
    var dropdown = angular.element("<div/>", {
      "class": "el-dynamicselect-dropdown",
      "ng-class": "{'open': vm.dropdownOpen, 'dropup': vm.allOptions.dropDirection === 'up'}"
    });
    var contentContainer = dropdown;
    if (vm.isPaging || vm.allOptions.scroll) {
      dropdown.addClass("scroll");
      var scrollPane = angular.element("<div/>", {
        "scroll-pane": "",
        "scroll-name": "el-dynamicselect-scroll",
        "scroll-config": "{autoReinitialise: true}"
      });
      if (vm.isPaging) {
        scrollPane.attr("infinite-scroll", "");
        scrollPane.attr("page-size", "vm.allOptions.pageSize");
        scrollPane.attr("page-fn", "vm.source");
        scrollPane.attr("item-template", "'directives/dynamicSelect/dynamicSelectListItem.tmpl.html'");
        scrollPane.attr("item-api", "vm.itemApi");
        scrollPane.attr("container-id", "'el-dynamicselect-scrollcontainer'");
        scrollPane.attr("search-query", "vm.debouncedFilter");
      }
      dropdown.append(scrollPane);
      contentContainer = scrollPane;
    }

    var ul = angular.element("<ul/>");
    if (vm.isPaging) {
      ul.attr("infinite-scroll-container", "el-dynamicselect-scrollcontainer");
    }

    if (!vm.isPaging) {
      var li = angular.element("<li/>", {
        "ng-repeat": "item in filteredItems = (vm.source | filter: vm.dropdownFilter)",
        "class": "el-dynamicselect-dropdown-item",
        "ng-class": "{'selected': vm.itemApi.isSelected(item), 'highlighted': vm.itemApi.isHighlighted(item)}",
        "data-key": "{{vm.itemApi.getKey(item)}}",
        "ng-mouseover": "vm.itemApi.setHighlighted(item, true)",
        "ng-mouseleave": "vm.itemApi.setHighlighted(item, false)",
        "ng-click": "vm.itemApi.select(item)",
        "ng-bind-html": "vm.itemApi.getDisplayHtml(item)"
      });

      ul.append(li);
    }

    contentContainer.append(ul);

    return $compile(dropdown)($scope);
  }

  function displayValueOf(modelItem) {
    return (modelItem && vm.selectAs) ? modelItem[vm.selectAs] : modelItem;
  }

  function keyOf(modelItem) {
    return (modelItem && vm.trackBy) ? modelItem[vm.trackBy] : displayValueOf(modelItem);
  }

  function initTagsModel(model) {
    var tagsModel = [];
    for (var i in model) {
      var tag = {
        key: keyOf(model[i]),
        display: displayValueOf(model[i])
      };
      tagsModel.push(tag);
    }
    return tagsModel;
  }

  function modelIndexOfKey(key) {
    var index = -1;
    for (var i in vm.ngModel) {
      if (keyOf(vm.ngModel[i]) === key) {
        index = i;
        break;
      }
    }
    return index;
  }

  function select(item) {
    if (vm.multiple) {
      if (!vm.ngModel) vm.ngModel = [];
      if (modelIndexOfKey(keyOf(item)) === -1) {
        vm.ngModel.push(item);
      }
    }
    else {
      vm.ngModel = item;
    }
  }

  function deselect(key) {
    if (vm.multiple) {
      var index = modelIndexOfKey(key);
      vm.ngModel.splice(index, 1);
    }
  }

  function isSelected(item) {
    if (vm.multiple) {
      return modelIndexOfKey(keyOf(item)) >= 0;
    }
    return keyOf(item) === keyOf(vm.ngModel);
  }

  function setHighlighted(item, status) {
    if (isSelected(item)) return;
    vm.highlightedItemKey = (status ? keyOf(item) : null);
  }

  function isHighlighted(item) {
    return keyOf(item) === vm.highlightedItemKey;
  }

  function setHighlightOnElement(element) {
    if (element && element.length > 0) {
      scrollIntoView(element);
      var key = element.attr("data-key");
      vm.highlightedItemKey = key;
    }
  }

  function initHighlight() {
    // Set highlight on first available item, unless the user has already scrolled
    if (vm.highlightedItemKey === null && !isScrolled()) {
      var firstItem = $element.find(".el-dynamicselect-dropdown-item:not(.selected)").first();
      setHighlightOnElement(firstItem);
    }
  }

  function isScrolled() {
    var scrollPane = $element.find(".jspPane");
    if (scrollPane.length > 0) {
      var top = parseInt(scrollPane.css("top"));
      return top < 0;
    }
    return false;
  }

  function scrollIntoView(element) {
    var scrollPane = element.closest(".scroll-pane");
    if (scrollPane.length > 0) {
      var api = scrollPane.data("jsp");
      api.scrollToElement(element);
    }
  }

  function displayValueWithFilterMatch(item) {
    var displayText = $sanitize(displayValueOf(item));
    var displayHtml = displayText;
    if (vm.debouncedFilter.length && vm.debouncedFilter.length > 0) {
      var length = vm.debouncedFilter.length;
      var matchIndex = displayText.toLowerCase().indexOf(vm.debouncedFilter.toLowerCase());
      if (matchIndex >= 0) {
        var highlight = "<u>" + displayText.substr(matchIndex, length) + "</u>";
        displayHtml = displayText.substr(0, matchIndex) + highlight + displayText.substr(matchIndex + length);
      }
    }
    return displayHtml;
  }

  function setDropdown(state) {
    vm.dropdownOpen = (state && !vm.ngDisabled);
  }

  function setDirty() {
    inputModelCtrl = inputModelCtrl || $element.find("input").controller("ngModel");
    if (inputModelCtrl) {
      inputModelCtrl.$setDirty();
    }
  }

}