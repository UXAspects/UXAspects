import { SPACE } from '@angular/cdk/keycodes';

treegridMultipleSelectItem.$inject = ['multipleSelectProvider'];

/**
 * This directive handles the `row.selected` state and updates the `multipleSelectProvider`.
 */
export function treegridMultipleSelectItem(multipleSelectProvider) {

    return {
        restrict: 'A',
        link: function (scope, element, attrs) {

            if (attrs.treegridMultipleSelectItem) {

                var treeGridRow = scope.$eval(attrs.treegridMultipleSelectItem);
                var options = scope.$eval(attrs.treegridMultipleSelectOptions) || {};
                var selectOptions = options.select || {};
                const isDisabled = scope.$eval(attrs.treegridMultipleSelectItemDisabled) || false;

                if (treeGridRow) {

                    var multipleSelectInstance = multipleSelectProvider.getComponentInstance(treeGridRow.treegridId);

                    // Prevent text selection on shift-click
                    angular.element(element).children('*').css({
                        'user-select': 'none',
                        '-ms-user-select': 'none',
                        '-moz-user-select': 'none',
                        '-webkit-user-select': 'none'
                    });

                    //set up click
                    element.on('click.multiSelect', event => {

                        // do nothing if row selection is not enabled or the row itself is disabled
                        if (!selectOptions.row || isDisabled) {
                            return;
                        }

                        if (event.shiftKey) {
                            extendOrStartSelection();
                        } else if (event.ctrlKey) {
                            addToOrStartSelection();
                        } else {
                            startSelection();
                        }

                        element.focus(); // Workaround for IE, make sure parent element gets focus
                        event.preventDefault();
                        event.stopImmediatePropagation();
                        scope.$apply();
                    });

                    // for keyboard controls
                    element.on('keydown.multiSelect', event => {
                        if (isDisabled) {
                            return;
                        }

                        if (event.keyCode === SPACE) {

                            if (selectOptions.row) {
                                addToOrStartSelection();
                            } else {
                                setSelected(treeGridRow, !treeGridRow.selected);
                            }

                            event.preventDefault();
                            event.stopImmediatePropagation();
                        }
                        scope.$apply();
                    });

                    // Custom event triggered by navigation directive to handle shift key extension
                    element.on('treegrid-navigation-focused', event => {
                        if (!selectOptions.row) {
                            return;
                        }

                        if (!event.ctrlKey) {
                            if (event.shiftKey) {
                                extendSelectionFromPrevious();
                            } else {
                                // if shift key not held then dont select any
                                multipleSelectInstance.selectNone();
                                multipleSelectInstance.multipleRowSelectOriginIndex = scope.$index;
                            }
                        }
                        scope.$apply();
                    });

                    // Prevent selection of text on shift click for IE
                    element.on('selectstart', event => {
                        event.preventDefault();
                        return false;
                    });

                    // Handler for row click, or external change to selection via multipleSelectProvider
                    scope.$watch(() => multipleSelectInstance.isSelected(treeGridRow.dataItem), isSelected => setSelected(treeGridRow, isSelected));

                    // check if the indeterminate state changes
                    scope.$watch(() => getIndeterminateState(), (oldValue, newValue) => {
                        if (oldValue !== newValue) {
                            setIndeterminateState();
                        }
                    });

                    // watch for changes to the select all state
                    const subscription = multipleSelectInstance.onSelectAll.subscribe(() => setSelected(treeGridRow));

                    scope.$on('destroy', () => {
                        element.off('click.multiSelect');
                        element.off('keydown.multiSelect');
                        element.off('treegrid-navigation-focused');
                        element.off('selectstart');
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
                } else {
                    multipleSelectInstance.multipleRowSelectItemPreviousSelectionDirection = undefined;
                    if (multipleSelectInstance.itemClicked(treeGridRow.dataItem)) {
                        multipleSelectInstance.multipleRowSelectOriginIndex = scope.$index;
                        setSelected(treeGridRow, true);
                    } else {
                        setSelected(treeGridRow, false);
                    }
                }
            }

            // Add this row and all intermediate rows to the current selection
            function extendOrStartSelection() {
                if (!multipleSelectInstance.state.selecting) {
                    startSelection();
                } else {
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

                // get all the rows between the start point and current focused row
                const rows = getRowDataItemsToSelect(multipleSelectInstance.multipleRowSelectOriginIndex, scope.$index);

                // map to the item data, filtering out any disabled ones
                const dataItems = rows.map(row => row.dataItem).filter(data => !data.disabled);

                // determine the selected state
                const isSelected = multipleSelectInstance.rangeClicked(dataItems);

                // iterate each enabled row and update the selected state
                rows.filter(row => !row.dataItem || row.dataItem.disabled !== true).forEach(row => setSelected(row, isSelected));
            }

            function getRowDataItemsToSelect(lastIndex, currentIndex) {
                const result = [];
                //Ensure we have an index for the clicked item (expected)
                if (currentIndex !== null && currentIndex !== undefined) {

                    //If this is the first item clicked there's no previous index to look at
                    if (lastIndex === null || lastIndex === undefined) {
                        result.push(getRowDataFromTableRow(currentIndex));
                    } else {
                        const from = Math.min(lastIndex, currentIndex);
                        const to = Math.max(lastIndex, currentIndex);

                        for (let i = from; i <= to; i++) {
                            result.push(getRowDataFromTableRow(i));
                        }
                    }
                }

                return result;
            }

            function getRowDataFromTableRow(index) {
                const rowElement = element.parent().children('tr').eq(index);
                return rowElement.scope().$eval(rowElement.attr('treegrid-multiple-select-item'));
            }

            function setSelected(row, isSelected, shouldUpdateChildren = true) {

                // if the item is not selected but indeterinate
                const isIndeterminate = getIndeterminateState() === -1;

                // Set status for checkbox and the API
                row.selected = isIndeterminate ? -1 : isSelected;

                // If selectChildren is set, set the selection state for the children
                if (selectOptions.selectChildren && shouldUpdateChildren && !isIndeterminate) {
                    setSelectedChildren(row.dataItem, isSelected);
                }
            }

            function setIndeterminateState() {

                // check if we need to update indeterminate state
                if (treeGridRow.dataItem.disabled === true || selectOptions.selectChildren !== true || selectOptions.indeterminate !== true) {
                    return;
                }

                const isSelected = getIndeterminateState();

                // set the selected state of this row accordingly
                setSelected(treeGridRow, isSelected, false);

                // if the row was selected but is now indeterminate or deselected then deselect it
                if (multipleSelectInstance.isSelected(treeGridRow.dataItem) && isSelected !== true) {
                    multipleSelectInstance.setSelected(treeGridRow.dataItem, false);
                }
                // if the row was indeterminate or deselected then select it
                else if (!multipleSelectInstance.isSelected(treeGridRow.dataItem) && isSelected === true) {
                    multipleSelectInstance.setSelected(treeGridRow.dataItem, true);
                }
            }

            function getIndeterminateState() {

                // check if we need to update indeterminate state
                if (selectOptions.selectChildren !== true || selectOptions.indeterminate !== true || !treeGridRow.canExpand || treeGridRow.children.length === 0) {
                    return;
                }

                // if there are children, update the state depending on the selection state of its children
                const isSelected = treeGridRow.children.some(row => row.selected === true);
                const isDeselected = treeGridRow.children.some(row => row.selected === false);
                const isIndeterminate = treeGridRow.children.some(row => row.selected === -1);

                // determine the new selection state
                return isIndeterminate || (isSelected && isDeselected) ? -1 : isSelected;
            }

            function setSelectedChildren(dataItem, isSelected) {

                // get all the child nodes
                const children = dataItem[options.childrenProperty] || [];

                // iterate through each enabled child and selt the selection
                children.filter(child => !child.disabled).forEach(child => {

                    // update the selected state of the child node
                    multipleSelectInstance.setSelected(child, isSelected);

                    // check if there are any additional children that also need selected
                    setSelectedChildren(child, isSelected);
                });
            }
        }
    };
}