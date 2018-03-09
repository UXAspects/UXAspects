export default function facetDynamicSelectedFilter() {
  return function (options, selectedList) {
    var filteredList = [];
    options.forEach(function (elem) {
      var selected = selectedList.some(function (sel) {
        return elem.name.toLowerCase() === sel.option.name.toLowerCase();
      });
      if (!selected) {
        filteredList.push(elem);
      }
    });
    return filteredList;
  };
}