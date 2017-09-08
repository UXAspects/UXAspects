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

                if (treeGridRow) {

                    // Prevent text selection on shift-click
                    angular.element(element).children("*").css({
                        "user-select": "none",
                        "-ms-user-select": "none",
                        "-moz-user-select": "none",
                        "-webkit-user-select": "none"
                    });

                    //set up click
                    element.on("click.multiSelect", function (e) {
                        if (!options.row) return;

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
                        if (!options.row) return;

                        if (e.keyCode === 32) {
                            addToOrStartSelection();
                            e.preventDefault();
                            e.stopImmediatePropagation();
                        }
                        scope.$apply();
                    });

                    // Custom event triggered by keyboardNavigableTable to handle shift key extension
                    element.on("receivedSelection.keyboardNavigableTable", function (e) {
                        if (!options.row) return;

                        if (!e.ctrlKey) {
                            if (e.shiftKey) {
                                extendSelectionFromPrevious();
                            }
                            else {
                                // if shift key not held then dont select any
                                multipleSelectProvider.selectNone();
                                multipleSelectProvider.multipleRowSelectOriginIndex = scope.$index;
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
                    scope.$watch(function () {
                        return multipleSelectProvider.isSelected(treeGridRow.dataItem);
                    }, function (nv) {
                        setSelected(treeGridRow, nv);
                    });

                    // Handler for checkbox click, which uses ng-model="row.selected"
                    scope.$watch(attrs.treegridMultipleSelectItem + ".selected", function (nv) {
                        var currentState = multipleSelectProvider.isSelected(treeGridRow.dataItem);
                        if (nv !== undefined && nv !== currentState) {
                            currentState = multipleSelectProvider.itemClicked(treeGridRow.dataItem);
                        }
                    }, true);

                    scope.$on("destroy", function () {
                        element.off("click.multiSelect");
                        element.off("keydown.multiSelect");
                        element.off("receivedSelection.keyboardNavigableTable");
                        element.off("selectstart");
                    });
                }
            }

            // Clear selection and select this row
            function startSelection() {
                multipleSelectProvider.state.selecting = true;
                if (multipleSelectProvider.state.selectedFromButton === false) {
                    multipleSelectProvider.state.selectedFromCheckBox = true;
                }

                multipleSelectProvider.selectNone();

                multipleSelectProvider.multipleRowSelectItemPreviousSelectionDirection = undefined;
                if (multipleSelectProvider.itemClicked(treeGridRow.dataItem)) {
                    multipleSelectProvider.multipleRowSelectOriginIndex = scope.$index;
                    setSelected(treeGridRow, true);
                }
            }

            // Add this row to the current selection
            function addToOrStartSelection() {
                if (!multipleSelectProvider.state.selecting) {
                    startSelection();
                }
                else {
                    multipleSelectProvider.multipleRowSelectItemPreviousSelectionDirection = undefined;
                    if (multipleSelectProvider.itemClicked(treeGridRow.dataItem)) {
                        multipleSelectProvider.multipleRowSelectOriginIndex = scope.$index;
                        setSelected(treeGridRow, true);
                    }
                    else {
                        setSelected(treeGridRow, false);
                    }
                }
            }

            // Add this row and all intermediate rows to the current selection
            function extendOrStartSelection() {
                if (!multipleSelectProvider.state.selecting) {
                    startSelection();
                }
                else {
                    extendSelection();
                }
            }

            // Select previous row, this row, and all intermediate rows
            function extendSelectionFromPrevious() {
                multipleSelectProvider.state.selecting = true;
                if (multipleSelectProvider.state.selectedFromButton === false) {
                    multipleSelectProvider.state.selectedFromCheckBox = true;
                }
                multipleSelectProvider.multipleRowSelectItemPreviousSelectionDirection = undefined;
                extendSelection();
            }

            function extendSelection() {
                var rows = getRowDataItemsToSelect(multipleSelectProvider.multipleRowSelectOriginIndex, scope.$index);
                var dataItems = rows.map(function(row) { return row.dataItem; });
                var isSelected = multipleSelectProvider.rangeClicked(dataItems);
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
                row.selected = isSelected;
                if (options.selectChildren && row.children) {
                    for (var childRow of row.children) {
                        setSelected(childRow, isSelected);
                    }
                }
            }
        }
    };
}