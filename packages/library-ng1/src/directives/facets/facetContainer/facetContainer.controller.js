FacetContainerCtrl.$inject = ['$scope', "previewPaneProvider"];

export default function FacetContainerCtrl($scope, previewPaneProvider) {
  var vm = this;
  vm.selected = $scope.selected = [];
  vm.selectTitle = $scope.selectTitle;
  vm.clearText = $scope.clearText;
  vm.noItemsText = $scope.noItemsText;
  vm.scope = $scope;
  vm.scope.provider = previewPaneProvider;
  vm.clearAllFn = $scope.clearAllFn;

  vm.api = {
    getFacets: function () {
      var facets = [];

      for (var i in vm.container.facets) {

        var facet = vm.container.facets[i];
        var options = [];

        //Standard or Custom Facet
        if (!facet.selectedDynamicFacets) {
          if (facet.options) {
            for (var j = 0; j < facet.options.length; j++) {
              var option = facet.options[j];
              options[j] = {
                select: function (o) {
                  return function () {
                    o.select();
                  };
                }(option),
                deselect: function (o) {
                  return function () {
                    o.deselect();
                  };
                }(option),
                toggle: function (o) {
                  return function () {
                    o.toggle();
                  };
                }(option),
                name: option.option.name
              };
            }
          }
        }
        //Dynamic Facets
        else if (facet.selectedDynamicFacets) {
          if (facet.scope && facet.scope.facetOptions && facet.scope.facetOptions.options) {
            var dynamicOptionsCombined = [];
            var nonDynamicOptionsCount = 0;

            for (var m in facet.options) {
              dynamicOptionsCombined.push({
                dynamic: false,
                option: facet.options[m].option.fo
              });
              nonDynamicOptionsCount++;
            }

            for (var k = nonDynamicOptionsCount; k < facet.scope.facetOptions.options.length; k++) {
              dynamicOptionsCombined.push({
                dynamic: true,
                option: facet.scope.facetOptions.options[k]
              });
            }

            for (var n in dynamicOptionsCombined) {
              //var dynamicOption = facet.scope.facetOptions.options[k];
              var dynamicOption = dynamicOptionsCombined[n].option;
              options[n] = {
                select: function (o, f, d) {
                   return function () {
                    if (!d) {
                      //Option from the normal list - select via itself
                      o.select();
                    } else {
                      //Option from the typeahead - select via the facet
                     f.select(o, o, "");
                    }
                   };
                }(dynamicOption, facet, dynamicOptionsCombined[n].dynamic),
                deselect: function (o, f, d) {
                  return function () {
                    if (f.selectedDynamicFacets.length && d) {
                      var index = 0;
                      for (var fo in f.selectedDynamicFacets) {
                        if (f.selectedDynamicFacets[fo].option === o) {
                          break;
                        }
                        index++;
                      }
                      f.remove(null, index);
                    } else {
                      o.deselect();
                    }
                  };
                }(dynamicOption, facet, dynamicOptionsCombined[n].dynamic),
                name: dynamicOption.name
              };
            }
          }
        }



        facets[i] = {
          name: facet.name,
          options: options
        };
      }
      return facets;
    }
  };

  vm.container = {};
  vm.container.facets = [];
  //Return the facets for programatic selection
  if ($scope.api) {
    $scope.api = vm.api;
  }
}

FacetContainerCtrl.prototype.register = function (facet) {
  if (!this.hasFacet(facet.name)) {
    if (!this.container.facets) {
      this.container.facets = [];
    }
    this.container.facets.push(facet);
  }
};

FacetContainerCtrl.prototype.hasFacet = function (facetName) {
  return this.container.facets.some(function (facet) {
    return facet.name.toLowerCase() === facetName.toLowerCase();
  });
};

FacetContainerCtrl.prototype.addSelected = function (facetOptionCtrl) {
  var indexOfOption = this.selected.indexOf(facetOptionCtrl);
  if (indexOfOption === -1) {
    this.selected.push(facetOptionCtrl);
  }
};

FacetContainerCtrl.prototype.removeSelected = function (facetOptionCtrl) {
  var indexOfOption = this.selected.indexOf(facetOptionCtrl);
  if (indexOfOption >= 0) {
    this.selected.splice(indexOfOption, 1);
  }
};

FacetContainerCtrl.prototype.clearAll = function () {
  this.isClearAllFn = this.scope.isClearAllFn;
  for (var i = this.selected.length - 1; i >= 0; i--) {
    this.selected[i].deselect();
  }

  // if a clearAll function is defined, execute it.
  if (this.isClearAllFn) {
    this.clearAllFn();
    this.isClearAllFn = false;
  }
  this.scope.provider.preview.previewFile = "";
};