import { SPACE } from '@angular/cdk/keycodes';
import { distinctUntilChanged, filter, map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';

/**
 * This directive handles the `row.selected` state and updates the `multipleSelectProvider`.
 */
export function treegridMultipleSelectItem() {

    return {
        restrict: 'A',
        link: function (scope, element, attrs) {

            if (attrs.treegridMultipleSelectItem) {

                var selectionModel = scope.$eval(attrs.treegridMultipleSelectModel);
                var treeGridRow = scope.$eval(attrs.treegridMultipleSelectItem);
                var options = scope.$eval(attrs.treegridMultipleSelectOptions) || {};
                var selectOptions = options.select || {};
                const isDisabled = scope.$eval(attrs.treegridMultipleSelectItemDisabled) || false;
                const unsubscribe = new Subject();

                if (treeGridRow) {

                    // Prevent text selection on shift-click
                    angular.element(element).children('*').css({
                        'user-select': 'none',
                        '-ms-user-select': 'none',
                        '-moz-user-select': 'none',
                        '-webkit-user-select': 'none'
                    });

                    // defer adding any event listeners until after the rendering
                    scope.$evalAsync(() => {

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
                                    selectionModel.toggle(treeGridRow.dataItem);
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
                                    selectionModel.deselectAll();
                                    selectionModel.origin = scope.$index;
                                }
                            }
                            scope.$apply();
                        });

                        // Prevent selection of text on shift click for IE
                        element.on('selectstart', event => {
                            event.preventDefault();
                            return false;
                        });

                        scope.$on('destroy', () => {
                            element.off('click.multiSelect');
                            element.off('keydown.multiSelect');
                            element.off('treegrid-navigation-focused');
                            element.off('selectstart');
                            unsubscribe.next();
                            unsubscribe.complete();
                        });
                    });

                    // Handler for row click, or external change to selection via multipleSelectProvider
                    selectionModel.onSelect.pipe(takeUntil(unsubscribe), filter(item => compare(item, treeGridRow.dataItem))).subscribe(() =>
                        setSelected(treeGridRow, true)
                    );

                    selectionModel.onDeselect.pipe(takeUntil(unsubscribe), filter(item => compare(item, treeGridRow.dataItem))).subscribe(() =>
                        setSelected(treeGridRow, false)
                    );

                    // check if the indeterminate state changes
                    selectionModel.onSelectionChange.pipe(takeUntil(unsubscribe), map(() => getIndeterminateState(treeGridRow.dataItem)), distinctUntilChanged()).subscribe(() => {
                        setIndeterminateState();
                    });

                    // check if the item should initially be selected
                    if (selectionModel.isSelected(treeGridRow.dataItem)) {
                        setSelected(treeGridRow, true);
                    }
                }
            }

            // Clear selection and select this row
            function startSelection() {
                selectionModel.isSelecting = true;
                selectionModel.deselectAll();
                selectionModel.toggle(treeGridRow.dataItem);

                if (selectionModel.isSelected(treeGridRow.dataItem)) {
                    selectionModel.origin = scope.$index;
                    setSelected(treeGridRow, true);
                }
            }

            // Add this row to the current selection
            function addToOrStartSelection() {

                if (!selectionModel.isSelecting) {
                    startSelection();
                } else {
                    selectionModel.toggle(treeGridRow.dataItem);

                    if (selectionModel.isSelected(treeGridRow.dataItem)) {
                        selectionModel.origin = scope.$index;
                        setSelected(treeGridRow, true);
                    } else {
                        setSelected(treeGridRow, false);
                    }
                }
            }

            // Add this row and all intermediate rows to the current selection
            function extendOrStartSelection() {
                if (!selectionModel.isSelecting) {
                    startSelection();
                } else {
                    extendSelection();
                }
            }

            // Select previous row, this row, and all intermediate rows
            function extendSelectionFromPrevious() {
                selectionModel.isSelecting = true;
                extendSelection();
            }

            function isRowDisabled(row) {
                const data = row.dataItem || row;
                const disabledProperty = options.disabled;

                if (angular.isString(disabledProperty)) {
                    return data.hasOwnProperty(disabledProperty) ? data[disabledProperty] : false;
                }

                if (angular.isFunction(disabledProperty)) {
                    return disabledProperty(data);
                }

                return false;
            }

            function extendSelection() {

                // get all the rows between the start point and current focused row
                const rows = getRowDataItemsToSelect(selectionModel.origin, scope.$index);

                // map to the item data, filtering out any disabled ones
                const dataItems = rows.map(row => row.dataItem).filter(data => !isRowDisabled(data));

                // determine the selected state
                selectionModel.setSelection(...dataItems);

                // iterate each enabled row and update the selected state
                rows.filter(row => !row.dataItem || isRowDisabled(row) !== true).forEach(row => setSelected(row, true));
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
                const isIndeterminate = getIndeterminateState(treeGridRow.dataItem) === -1;

                // Set status for checkbox and the API
                if (isIndeterminate && isSelected === true) {
                    // Allow transition from indeterminate -> true
                    row.selected = true;
                } else {
                    // Determine state based on child selection
                    row.selected = isIndeterminate ? -1 : isSelected;
                }

                // If selectChildren is set, set the selection state for the children
                if (selectOptions.selectChildren && shouldUpdateChildren && row.selected !== -1) {
                    setSelectedChildren(row.dataItem, isSelected);
                }
            }

            function setIndeterminateState() {

                // check if we need to update indeterminate state
                if (selectOptions.selectChildren !== true || selectOptions.indeterminate !== true) {
                    return;
                }

                const isSelected = getIndeterminateState(treeGridRow.dataItem);

                if (isSelected === undefined) {
                    return;
                }

                // set the selected state of this row accordingly
                setSelected(treeGridRow, isSelected, false);

                // if the row was selected but is now indeterminate or deselected then deselect it
                if (selectionModel.isSelected(treeGridRow.dataItem) && isSelected !== true) {
                    selectionModel.deselect(treeGridRow.dataItem);
                }
                // if the row was indeterminate or deselected then select it
                else if (!selectionModel.isSelected(treeGridRow.dataItem) && isSelected === true) {
                    selectionModel.select(treeGridRow.dataItem);
                }
            }

            function getIndeterminateState(dataItem) {

                // check if we need to update indeterminate state
                if (selectOptions.selectChildren !== true || selectOptions.indeterminate !== true || getChildrenFromDataItem(treeGridRow.dataItem).length === 0) {
                    return;
                }

                // get al nested children
                const children = getAllChildren(dataItem);

                // if there are children, update the state depending on the selection state of its children
                const isSelected = children.some(row => selectionModel.isSelected(row));
                const isDeselected = children.some(row => !selectionModel.isSelected(row));

                // determine the new selection state
                return isSelected && isDeselected ? -1 : isSelected;
            }

            function setSelectedChildren(dataItem, isSelected) {

                // get all the child nodes
                const children = getChildrenFromDataItem(dataItem);

                // iterate through each enabled child and selt the selection
                children.filter(child => !isRowDisabled(child)).forEach(child => {

                    // update the selected state of the child node
                    if (isSelected) {
                        selectionModel.select(child);
                    } else {
                        selectionModel.deselect(child);
                    }

                    // check if there are any additional children that also need selected
                    setSelectedChildren(child, isSelected);
                });
            }

            function getChildrenFromDataItem(item) {
                return item[options.childrenProperty] || [];
            }

            function getAllChildren(item) {
                const children = getChildrenFromDataItem(item);

                if (children.length === 0) {
                    return children;
                }

                const nested = children.reduce((list, child) => {
                    return [...list, ...getAllChildren(child)];
                }, []);

                return [...children, ...nested];
            }

            function compare(previous, current) {
                if (typeof selectOptions.comparator === 'function') {
                    return selectOptions.comparator(previous, current);
                }

                return previous === current;
            }
        }
    };
}