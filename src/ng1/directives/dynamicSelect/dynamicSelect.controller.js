import { DOWN_ARROW, ENTER, UP_ARROW } from '@angular/cdk/keycodes';

export default class DynamicSelectCtrl {

  /**
   * @param {ng.IScope} $scope
   * @param {JQuery} $element
   * @param {ng.IAttributes} $attrs
   * @param {ng.ICompileService} $compile
   * @param {ng.ITimeoutService} $timeout
   * @param {ng.ISCEService} $sanitize
   * @param {*} debounceService
   */
  constructor($scope, $element, $attrs, $compile, $timeout, $sanitize, debounceService) {

    // create initial instance variables
    this.$scope             = $scope;
    this.$element           = $element;
    this.$compile           = $compile;
    this.$sanitize          = $sanitize;
    this.$timeout           = $timeout;
    this.inputModelCtrl     = null;
    this.multiple           = 'multiple' in $attrs;
    this.dropdownFilterFn   = this.getItemVisible.bind(this);
    this.tagsModel          = [];
    this.singleText         = '';
    this.filterText         = '';
    this.debouncedFilter    = '';
    this.dropdownOpen       = false;
    this.isPaging           = angular.isFunction(this.source);
    this.highlightedItemKey = null;
    this.dropdown           = null;
    this.dropdownScope      = null;
    this.watchers           = [];
    this.scrollpane         = null;
    this.scrollpaneObserver = null;

    const defaultOptions = {
      placeholder: this.multiple ? 'Select some options' : 'Select an option',
      allowNull: true,
      scroll: true,
      pageSize: 20,
      dropDirection: 'down',
      initialPlaceholder: false
    };

    this.options = angular.extend({}, defaultOptions, this.options);

    // Options for tag input control
    this.tagOptions = {
      placeholder: this.options.placeholder,
      format: { key: 'key', display: 'display' }
    };

    // support showing placeholder only when there are no selected tags
    this.tagOptions.initialPlaceholder = this.options.initialPlaceholder;

    // Callbacks from tag input
    this.tagApi = {
      onTagAdding: () => false, // Prevent adding, tags are inserted into the model directly
      onTagRemoved: tag => this.deselect(tag.key) // Allow 'x' button and backspace to deselect from our model
    };

    // Functions used by select items, using an object so that they can be added to the scope in infinite scroll
    this.itemApi = {
      select: item => {
        if (!this.isSelected(item)) {
          // Add item to the model
          this.select(item);

          // Reset the search text
          this.filterText = '';

          // Focus the input field
          $element.find('input').focus();

          // Close the dropdown
          this.setDropdownOpen(false);

          // Reset highlight
          this.highlightedItemKey = null;
        }
      },
      isSelected    : this.isSelected.bind(this),
      getKey        : this.getItemKey.bind(this),
      getDisplay    : this.getItemValue.bind(this),
      getDisplayHtml: this.displayValueWithFilterMatch.bind(this),
      setHighlighted: this.setHighlighted.bind(this),
      isHighlighted : this.isHighlighted.bind(this)
    };

    // Update UI when model changes
    this.watchers.push($scope.$watch(() => this.ngModel, query => {
      if (this.multiple) {
        this.tagsModel = this.initTagsModel(query || []);
      }
      else {
        if (query !== null) {
          this.singleText = this.getItemValue(query);
        }
      }
    }, true));

    if (!this.multiple) {
      this.watchers.push($scope.$watch(() => this.singleText, query => {
        if (query === this.getItemValue(this.ngModel)) {
          this.filterText = '';
          this.setDirty();
        }
        else {
          this.filterText = query;
          if (this.options.allowNull) {
            this.ngModel = null;
          }
        }
      }));
    }

    this.watchers.push($scope.$watch(() => this.filterText, debounceService(query => {
      this.debouncedFilter = query;

      // Open the dropdown when typing occurs
      if (query !== '') {
        this.setDropdownOpen(true);
      }

      // Reset the highlight
      this.highlightedItemKey = null;
    }, 800)));

    // Multiple select input click handler (using jquery since it's a plugin)
    $element.on('click.dynamicSelect', '.host', () => $scope.$apply(() => this.setDropdownOpen(true)));

    // Blur event handler
    $element.on('blur.dynamicSelect', 'input', () => {
      // Close the dropdown if selection leaves the input or its children
      // Timeout to allow click events in the dropdown to register
      $timeout(() => {
        if ($element.has(document.activeElement).length === 0) {
          this.setDropdownOpen(false);

          // Remove the filter text and show selected value on blur
          if (!this.multiple) {
            this.singleText = this.getItemValue(this.ngModel);
          }
        }
      }, 200);
    });

    // Keyboard control
    $element.on('keydown.dynamicSelect', 'input', event => {
      if ([UP_ARROW, DOWN_ARROW, ENTER].indexOf(event.which) === -1) {
        return;
      }

      const highlightedElement = $element.find('.el-dynamicselect-dropdown-item.highlighted').first();
      let nextElement = null;

      switch (event.which) {
        case UP_ARROW:
          if (highlightedElement.length > 0 && this.dropdownOpen) {
            nextElement = highlightedElement.prevAll('li:not(.selected)').first();
          }
          break;

        case DOWN_ARROW:
          if (highlightedElement.length > 0 && this.dropdownOpen) {
            nextElement = highlightedElement.nextAll('li:not(.selected)').first();
          }
          else {
            nextElement = $element.find('.el-dynamicselect-dropdown-item:not(.selected)').first();
          }
          // Show panel
          if (!this.dropdownOpen) {
            $scope.$apply(() => this.setDropdownOpen(true));
          }
          break;

        case ENTER:
          if (this.dropdownOpen) {
            highlightedElement.click();
          }
          break;
      }

      $scope.$apply(() => this.setHighlightOnElement(nextElement));

      event.stopPropagation();
      event.preventDefault();
    });

    // Clean up event handlers
    $scope.$on('$destroy', () => {
      $element.off('click.dynamicSelect blur.dynamicSelect keydown.dynamicSelect');

      // destroy all watchers
      this.watchers.forEach(watcher => watcher());

      if (this.scrollpaneObserver) {
          this.scrollpaneObserver.disconnect();
      }
    });

    // Set highlight on first result when opening dropdown
    this.watchers.push($scope.$watch(() => this.dropdownOpen, isOpen => {
      if (isOpen) {
        this.initHighlight();
      }
    }));

    // Watch the children of the dropdown list for changes and set highlight on first result if unset
    // (used when results are loaded asynchronously)
    $timeout(() => {
      const dropdownObserver = new MutationObserver(() => $scope.$apply(() => this.initHighlight));

      const list = $element.find('.el-dynamicselect-dropdown ul');

      if (list.length > 0) {
        dropdownObserver.observe(list.get(0), { childList: true });
      }
    });
  }

  // Single select input click handler
  onSingleInputClick() {
    this.setDropdownOpen(true);

    // Select all text for easy removal
    this.$element.find('input.el-dynamicselect-singleinput').select();
  }

  // Case insensitive filter for ng-repeat
  getItemVisible(item) {
    return this.getItemValue(item).toLowerCase().indexOf(this.debouncedFilter.toLowerCase()) !== -1;
  }

  getDropdown() {
    const dropdown = angular.element('<div/>', {
      'class'   : 'el-dynamicselect-dropdown',
      'ng-class': '{ "open": vm.dropdownOpen, "dropup": vm.options.dropDirection === "up" }'
    });

    let contentContainer = dropdown;

    if (this.isPaging || this.options.scroll) {
      dropdown.addClass('scroll');
      const scrollPane = angular.element('<div/>', {
        'scroll-pane'  : '',
        'scroll-name'  : 'el-dynamicselect-scroll',
        'scroll-config': '{ autoReinitialise: true }'
      });
      if (this.isPaging) {
        scrollPane.attr('infinite-scroll', '');
        scrollPane.attr('page-size', 'vm.options.pageSize');
        scrollPane.attr('page-fn', 'vm.source');
        scrollPane.attr('loading-change', 'vm.onLoadingChange()');
        scrollPane.attr('item-template', '"directives/dynamicSelect/dynamicSelectListItem.tmpl.html"');
        scrollPane.attr('item-api', 'vm.itemApi');
        scrollPane.attr('container-id', '"el-dynamicselect-scrollcontainer"');
        scrollPane.attr('search-query', 'vm.debouncedFilter');
      }
      dropdown.append(scrollPane);
      contentContainer = scrollPane;
    }

    const ul = angular.element('<ul/>');
    if (this.isPaging) {
      ul.attr('infinite-scroll-container', 'el-dynamicselect-scrollcontainer');
    }

    if (!this.isPaging) {

      let repeatExpr = 'item in filteredItems = (vm.source | filter: vm.dropdownFilterFn)';
      if (this.trackBy) {
        repeatExpr += ` track by item.${this.trackBy}`;
      }

      const li = angular.element('<li/>', {
        'ng-repeat'    : repeatExpr,
        'class'        : 'el-dynamicselect-dropdown-item',
        'ng-class'     : '{ "selected": vm.itemApi.isSelected(item), "highlighted": vm.itemApi.isHighlighted(item) }',
        'data-key'     : '{{ vm.itemApi.getKey(item) }}',
        'ng-mouseover' : 'vm.itemApi.setHighlighted(item, true)',
        'ng-mouseleave': 'vm.itemApi.setHighlighted(item, false)',
        'ng-click'     : 'vm.itemApi.select(item)',
        'ng-bind-html' : 'vm.itemApi.getDisplayHtml(item)'
      });

      ul.append(li);
    }

    contentContainer.append(ul);

    this.dropdownScope = this.$scope.$new();

    // hide the element until the scrollpane is ready
    dropdown.css({ visibility: 'hidden' });

    // compile the element
    const compiled = this.$compile(dropdown)(this.dropdownScope);

    // once the scrollpane has initialised make the dropdown visible
    setTimeout(() => dropdown.css({ visibility: '' }));

    // return the compiled dropdown element
    return compiled;
  }

  getItemValue(item) {
    return (item && this.selectAs) ? item[this.selectAs] : item;
  }

  getItemKey(item) {
    return (item && this.trackBy) ? item[this.trackBy] : this.getItemValue(item);
  }

  /**
   * @param {ReadonlyArray<any>} items
   */
  initTagsModel(items) {
    return items.map(item => ({ key: this.getItemKey(item), display: this.getItemValue(item) }));
  }

  /**
   * @param {string} key
   */
  getModelIndex(key) {

    if (Array.isArray(this.ngModel)) {
        for (let idx = 0; idx < this.ngModel.length; idx++) {
            if (this.getItemKey(this.ngModel[idx]) === key) {
                return idx;
            }
        }
    }

    return -1;
  }

  select(item) {
    if (this.multiple) {

      if (!this.ngModel) {
        this.ngModel = [];
      }

      if (this.getModelIndex(this.getItemKey(item)) === -1) {
        this.ngModel.push(item);
      }
    }
    else {
      this.ngModel = item;
    }
  }

  /**
   * @param {string} key
   */
  deselect(key) {
    this.ngModel.splice(this.getModelIndex(key), 1);
  }

  isSelected(item) {
    return this.multiple ?
      this.getModelIndex(this.getItemKey(item)) !== -1 :
      this.getItemKey(item) === this.getItemKey(this.ngModel);
  }

  setHighlighted(item, status) {

    if (this.isSelected(item)) {
      return;
    }
    this.highlightedItemKey = (status ? this.getItemKey(item) : null);
  }

  isHighlighted(item) {
    return this.getItemKey(item) === this.highlightedItemKey;
  }

  setHighlightOnElement(element) {
    if (element && element.length > 0) {
      this.scrollIntoView(element);
      const key = element.attr('data-key');
      this.highlightedItemKey = key;
    }
  }

  initHighlight() {
    // Set highlight on first available item, unless the user has already scrolled
    if (this.highlightedItemKey === null && !this.isScrolled()) {
      const firstItem = this.$element.find('.el-dynamicselect-dropdown-item:not(.selected)').first();
      this.setHighlightOnElement(firstItem);
    }
  }

  isScrolled() {
    const scrollPane = this.$element.find('.jspPane');
    if (scrollPane.length > 0) {
      const top = parseInt(scrollPane.css('top'));
      return top < 0;
    }
    return false;
  }

  /**
   * @param {JQuery} element
   */
  scrollIntoView(element) {
    const scrollpane = element.closest('.scroll-pane').data('jsp');

    if (scrollpane) {
      scrollpane.scrollToElement(element);
    }
  }

  displayValueWithFilterMatch(item) {
    const displayText = this.$sanitize(this.getItemValue(item));
    let displayHtml = displayText;
    if (this.debouncedFilter.length && this.debouncedFilter.length > 0) {
      const length = this.debouncedFilter.length;
      const matchIndex = displayText.toLowerCase().indexOf(this.debouncedFilter.toLowerCase());
      if (matchIndex >= 0) {
        const highlight = '<u>' + displayText.substr(matchIndex, length) + '</u>';
        displayHtml = displayText.substr(0, matchIndex) + highlight + displayText.substr(matchIndex + length);
      }
    }
    return displayHtml;
  }

  /**
   * @param {boolean} open
   */
  setDropdownOpen(open) {

    // if the dropdown is already open then do nothing
    if (this.dropdownOpen === true && open === true) {
      return;
    }

    this.dropdownOpen = (open && !this.ngDisabled);

    if (open === true) {
      this.dropdown = this.getDropdown();
      this.$element.append(this.dropdown);

      // remove any existing observer
      if (this.scrollpaneObserver) {
          this.scrollpaneObserver.disconnect();
      }

      // find the scroll pane element
      this.scrollpane = this.$element.find('.scroll-pane');

      // start watching for any changes
      this.scrollpaneObserver = new MutationObserver(() => this.updateDropdownHeight());

      this.scrollpaneObserver.observe(this.scrollpane.get(0), { childList: true, subtree: true });
    } else {
      if (this.dropdown && this.dropdownScope) {
        this.dropdownScope.$destroy();
        this.dropdown.remove();
      }

      if (this.scrollpaneObserver) {
          this.scrollpaneObserver.disconnect();
      }
    }
  }

  setDirty() {
    this.inputModelCtrl = this.inputModelCtrl || this.$element.find('input').controller('ngModel');
    if (this.inputModelCtrl) {
      this.inputModelCtrl.$setDirty();
    }
  }

  updateDropdownHeight() {

    if (!this.scrollpane || !this.dropdown) {
        return;
    }

    const api = this.scrollpane.data('jsp');

    if (!api) {
        return;
    }

    api.reinitialise();
    this.dropdown.css('height', api.getContentHeight() + parseFloat(this.dropdown.css('padding-top')) + parseFloat(this.dropdown.css('padding-bottom')));
  }

  onLoadingChange() {
    this.$timeout(() => this.updateDropdownHeight());
  }
}

DynamicSelectCtrl.$inject = ['$scope', '$element', '$attrs', '$compile', '$timeout', '$sanitize', 'debounceService'];