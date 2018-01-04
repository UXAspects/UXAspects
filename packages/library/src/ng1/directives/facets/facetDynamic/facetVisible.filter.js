export default function facetDynamicVisibleFilter() {
  return function(options, visibleList) {

    var excludeVisible = options.filter(function(item) {
      for (var i = 0; i < visibleList.length; i++) {
        if (visibleList[i].name === item.name) return false;
      }
      return true;
    });

    return excludeVisible;
  };
}
