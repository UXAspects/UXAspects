treegridMultipleSelectItem.$inject = ["multipleSelectProvider"];

/**
 * This directive handles the `row.selected` state and updates the `multipleSelectProvider`.
 */
export default function treegridMultipleSelectItem(multipleSelectProvider) {

    return {
        restrict: "A",
        link: function (scope, element, attrs) {

            if (attrs.treegridMultipleSelectItem) {

                var treeGridRow = scope.$eval(attrs.treegridMultipleSelectItem);
                var options = scope.$eval(attrs.treegridMultipleSelectOptions) || {};
                var selectOptions = options.select || {};

                if (treeGridRow) {

                    var multipleSelectInstance = multipleSelectProvider.getComponentInstance(treeGridRow.treegridId);

                    // Prevent text selection on shift-click
                    angular.element(element).children("*").css({
                        "user-select": "none",
                        "-ms-user-select": "none",
                        "-moz-user-select": "none",
                        "-webkit-user-select": "none"
                    });

                    //set up click
                    element.on("click.multiSelect", function (e) {
                        if (!selectOptions.row) return;

                        if (e.shiftKey) {
                            extendOrStartSelection();
                        }
                        else if (e.ctrlKey) {
                            addToOrStartSelection();
                        }
                        else {
                            startSelection();
                        }
                        element.focus();  // Workaround for IE, make sure parent element gets focus
                        e.preventDefault();
                        e.stopImmediatePropagation();
                        scope.$apply();
                    });

                    // for keyboard controls
                    element.on("keydown.multiSelect", function (e) {
                        if (!selectOptions.row) return;

                        if (e.keyCode === 32) {
                            addToOrStartSelection();
                            e.preventDefault();
                            e.stopImmediatePropagation();
                        }
                        scope.$apply();
                    });

                    // Custom event triggered by keyboardNavigableTable to handle shift key extension
                    element.on("receivedSelection.keyboardNavigableTable", function (e) {
                        if (!selectOptions.row) return;

                        if (!e.ctrlKey) {
                            if (e.shiftKey) {
                                extendSelectionFromPrevious();
                            }
                            else {
                                // if shift key not held then dont select any
                                multipleSelectInstance.selectNone();
                                multipleSelectInstance.multipleRowSelectOriginIndex = scope.$index;
                            }
                        }
                        scope.$apply();
                    });

                    // Prevent selection of text on shift click for IE
                    element.on("selectstart", function (e) {
                        e.preventDefault();
                        return false;
                    });

                    // Handler for row click, or external change to selection via multipleSelectProvider
                    scope.$watch(() => multipleSelectInstance.isSelected(treeGridRow.dataItem), isSelected => setSelected(treeGridRow, isSelected));

                    // watch for changes to the select all state
                    const subscription = multipleSelectInstance.onSelectAll.subscribe(() => setSelected(treeGridRow, true));

                    scope.$on("destroy", function () {
                        element.off("click.multiSelect");
                        element.off("keydown.multiSelect");
                        element.off("receivedSelection.keyboardNavigableTable");
                        element.off("selectstart");
                        subscription.unsubscribe();
                    });
                }
            }

            // Clear selection and select this row
            function startSelection() {
                multipleSelectInstance.state.selecting = true;
                if (multipleSelectInstance.state.selectedFromButton === false) {
                    multipleSelectInstance.state.selectedFromCheckBox = true;
                }

                multipleSelectInstance.selectNone();

                multipleSelectInstance.multipleRowSelectItemPreviousSelectionDirection = undefined;
                if (multipleSelectInstance.itemClicked(treeGridRow.dataItem)) {
                    multipleSelectInstance.multipleRowSelectOriginIndex = scope.$index;
                    setSelected(treeGridRow, true);
                }
            }

            // Add this row to the current selection
            function addToOrStartSelection() {
                if (!multipleSelectInstance.state.selecting) {
                    startSelection();
                }
                else {
                    multipleSelectInstance.multipleRowSelectItemPreviousSelectionDirection = undefined;
                    if (multipleSelectInstance.itemClicked(treeGridRow.dataItem)) {
                        multipleSelectInstance.multipleRowSelectOriginIndex = scope.$index;
                        setSelected(treeGridRow, true);
                    }
                    else {
                        setSelected(treeGridRow, false);
                    }
                }
            }

            // Add this row and all intermediate rows to the current selection
            function extendOrStartSelection() {
                if (!multipleSelectInstance.state.selecting) {
                    startSelection();
                }
                else {
                    extendSelection();
                }
            }

            // Select previous row, this row, and all intermediate rows
            function extendSelectionFromPrevious() {
                multipleSelectInstance.state.selecting = true;
                if (multipleSelectInstance.state.selectedFromButton === false) {
                    multipleSelectInstance.state.selectedFromCheckBox = true;
                }
                multipleSelectInstance.multipleRowSelectItemPreviousSelectionDirection = undefined;
                extendSelection();
            }

            function extendSelection() {
                var rows = getRowDataItemsToSelect(multipleSelectInstance.multipleRowSelectOriginIndex, scope.$index);
                var dataItems = rows.map(function(row) { return row.dataItem; });
                var isSelected = multipleSelectInstance.rangeClicked(dataItems);
                for (var row of rows) {
                    setSelected(row, isSelected);
                }
            }

            function getRowDataItemsToSelect(lastIndex, currentIndex) {
                var result = [];
                //Ensure we have an index for the clicked item (expected)
                if (currentIndex !== null && currentIndex !== undefined) {

                    //If this is the first item clicked there's no previous index to look at
                    if (lastIndex === null || lastIndex === undefined) {
                        result.push(getRowDataFromTableRow(currentIndex));
                    }
                    else {
                        var from = Math.min(lastIndex, currentIndex);
                        var to = Math.max(lastIndex, currentIndex);

                        for (var i = from; i <= to; i++) {
                            result.push(getRowDataFromTableRow(i));
                        }
                    }
                }

                return result;
            }

            function getRowDataFromTableRow(index) {
                var rowElement = element.parent().children("tr").eq(index);
                var rowData = rowElement.scope().$eval(rowElement.attr("treegrid-multiple-select-item"));
                return rowData;
            }

            function setSelected(row, isSelected) {

                // Set status for checkbox and the API
                row.selected = isSelected;

                // If selectChildren is set, set the selection state for the children
                if (selectOptions.selectChildren) {
                    setSelectedChildren(row.dataItem, isSelected);
                }
            }

            function setSelectedChildren(dataItem, isSelected) {
                var children = dataItem[options.childrenProperty];
                if (Array.isArray(children)) {
                    for (var i = 0; i < children.length; i += 1) {
                        multipleSelectInstance.setSelected(children[i], isSelected);
                        setSelectedChildren(children[i], isSelected);
                    }
                }
            }
        }
    };
}