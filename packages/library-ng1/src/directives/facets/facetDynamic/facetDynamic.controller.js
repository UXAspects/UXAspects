FacetDynamicCtrl.$inject = ['$scope'];

export default function FacetDynamicCtrl($scope) {
  var vm = this;
  vm.scope = $scope;
  vm.name = $scope.name;
  vm.facetOptions = $scope.facetOptions;
  vm.visibleFacetOptions = [];
  vm.displayConfiguration = $scope.displayConfiguration;
  vm.placeholder = $scope.placeholder;
  vm.updateCallback = $scope.updateCallback;

  vm.minCharsForTypeahead = vm.displayConfiguration.minCharacters || 3;
  vm.showZero = vm.displayConfiguration.showZero;

  vm.selectedDynamicFacets = [];
  vm.dynamicTypeaheadSelected = {
    text: ""
  };

  vm.expanded = true;

  vm.toggleExpand = function ($event) {
    vm.expanded = !vm.expanded;
    $event.currentTarget.blur();
  };
  vm.toggleExpandKey = function ($event) {
    if ($event.keyCode === 13) {
      vm.expanded = !vm.expanded;
      $event.preventDefault();
    }
  };
  vm.updateFacetOptions();
}


//limit the number of facet options shown
FacetDynamicCtrl.prototype.updateFacetOptions = function (updatedOptions) {

  //limit the number of facet options shown
  var vm = this;

  //Need to update facetOptions, in case of a change
  if (typeof updatedOptions !== "undefined")
    vm.facetOptions.options = updatedOptions;

  // Apply the changes to the other dependent properties of facetOptions
  vm.useTypeaheadControl = (vm.displayConfiguration.maxIndividualItems) ? vm.displayConfiguration.maxIndividualItems <= vm.facetOptions.options.length && (vm.displayConfiguration.minIndividualItems ? vm.displayConfiguration.minIndividualItems < vm.facetOptions.options.length : true) : true;
  vm.showFacetOptions = vm.displayConfiguration.minIndividualItems && vm.displayConfiguration.minIndividualItems > 0 ? true : !vm.useTypeaheadControl;
  vm.maxDisplayableItems = vm.displayConfiguration.maxDisplayableItems || vm.facetOptions.options.length;

  if (vm.showFacetOptions) {

    //if we are under the typeahead threshold then show all the items
    var maxItems = !vm.useTypeaheadControl ? vm.facetOptions.options : vm.displayConfiguration.minIndividualItems;

    var newOptions = [];

    vm.facetOptions.options.forEach(function (element) {
      if (newOptions.length >= maxItems) return false;
      if (element.count !== 0 || !vm.useTypeaheadControl || vm.showZero) newOptions.push(element);
    });

    vm.visibleFacetOptions = newOptions;
  }
};

FacetDynamicCtrl.prototype.remove = function (option, $index) {
  var vm = this;
  //call the FO deselect
  var filterOption = vm.selectedDynamicFacets[$index];
  if (filterOption.option.origDeselectFn) {
    filterOption.option.origDeselectFn.apply(filterOption);
  } else {
    filterOption.deselect();
  }
  //remove it from my list
  vm.selectedDynamicFacets.splice($index, 1);
};

FacetDynamicCtrl.prototype.select = function ($item) {
  var vm = this;
  //create FO control
  var filterOption = vm.foConstructor.$controller("FacetOptionCtrl", {
    '$scope': $item,
    'previewPaneProvider': vm.foConstructor.previewPaneProvider
  });

  filterOption.facetContainer = vm.foConstructor.facetContainer;
  //add it to my list of FOs
  vm.selectedDynamicFacets.push(filterOption);
  //decorate the deselect so that we can remove it later from the container panel too
  filterOption.option.origDeselectFn = angular.copy(filterOption.deselect);
  filterOption.deselect = function () {
    vm.remove(this.option, vm.selectedDynamicFacets.indexOf(this));
  };
  //trigger select
  filterOption.select();
  //clear the input text
  vm.dynamicTypeaheadSelected.text = "";
};

FacetDynamicCtrl.prototype.dynamicTypeaheadOnChange = function () {
  var vm = this;
  if (vm.updateCallback) {
    vm.facetOptions.options = vm.updateCallback(vm.dynamicTypeaheadSelected.text, vm.facetOptions.options);
  }
};

FacetDynamicCtrl.prototype.register = function (fo) {
  if (!this.options) {
    this.options = [];
  }
  this.options.push(fo);
};