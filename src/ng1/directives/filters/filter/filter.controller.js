FilterCtrl.$inject = ["$scope", "$timeout"];

export default function FilterCtrl($scope, $timeout) {
  var vm = this;

  vm.$timeout = $timeout;
  vm.filteroption = $scope;
  vm.default = $scope.name;
  vm.filteroptions = $scope.filteroptions = [];
  vm.previousFilter = null;
  vm.updateCallback = $scope.updateCallback || null;


  //Long List properties
  if ($scope.dynamicOptions && $scope.displayConfiguration) {
    //whether to render a dropdown (true) or individual items (false)
    $scope.showListControl = ($scope.displayConfiguration.maxIndividualItems) ? $scope.displayConfiguration.maxIndividualItems <= $scope.dynamicOptions.options.length : true;

    //how many characters the user should input before a dropdown typeahead is presented
    $scope.minCharsForTypeAhead = ($scope.displayConfiguration.minCharacters) || 3;

    //how many items to display in the dropdown at most
    $scope.maxDisplayableItems = ($scope.displayConfiguration.maxDisplayableItems) || $scope.dynamicOptions.options.length;

    $scope.dynamicSelected = null;
    $scope.dynamicTypeaheadSelected = {
      text: ""
    };
    $scope.type = $scope.name.replace(/\w+/g,
      function (w) {
        return w[0].toUpperCase() + w.slice(1).toLowerCase();
      });
  }

  vm.setTitle = function (title, defaultval) {
    var filterAlreadySelected = null;

    vm.filteroption.name = title;

    vm.filteroption.class = defaultval ? '' : 'filter-selected';

    if (vm.previousFilter === vm) {
      if (defaultval) {
        filterAlreadySelected = true;
        vm.previousFilter = null;
      }
    } else {
      if (!defaultval) {
        filterAlreadySelected = false;
        vm.previousFilter = vm;
      }
    }


    vm.filterContainer.setClass(filterAlreadySelected);
  };

  vm.addFilterOptions = function (val) {
    vm.filteroptions.push(val);
  };

  vm.dynamicFilterSelected = function ($item) {
    vm.filteroption.dynamicSelected = $item;
    //click 
    vm.setTitle($item.name, $item.default);
    for (var i = 0; i < vm.filteroptions.length; i++) {
      vm.filteroptions[i].filterOption.selectedClass = false;
    }
    $item.select();
    vm.filterContainer.filterContainer.provider.preview.previewFile = "";

    vm.dismiss();
    vm.filteroption.dynamicTypeaheadSelected.text = null;

  };

  vm.clearDynamic = function () {
    if (vm.filteroption.dynamicSelected !== null && vm.filteroption.dynamicSelected !== undefined) {
      vm.filteroption.dynamicSelected = null;
      vm.filteroption.dynamicTypeaheadSelected.text = null;
    }
    vm.dismiss();
  };

  vm.dismiss = function () {
    $('.dynamic-filter-toggle').removeClass("open");
  };

  vm.dynamicTypeaheadOnChange = function () {

    if (vm.updateCallback) {
      vm.filteroption.dynamicOptions.options = vm.updateCallback(vm.filteroption.dynamicTypeaheadSelected.text, vm.filteroption.dynamicOptions.options);
    }
  };
} 