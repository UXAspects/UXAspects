/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { distinctUntilChanged, filter, map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { tick } from '../../common/index';
export class DashboardService {
    constructor() {
        this._rowHeight = 0;
        this.widgets$ = new BehaviorSubject([]);
        this.options$ = new BehaviorSubject(defaultOptions);
        this.dimensions$ = new BehaviorSubject({});
        this.height$ = this.dimensions$.pipe(tick(), map(dimensions => dimensions.height), distinctUntilChanged());
        this.placeholder$ = new BehaviorSubject({ visible: false, x: 0, y: 0, width: 0, height: 0 });
        this.layout$ = new Subject();
        this.stacked$ = new BehaviorSubject(false);
        this.isDragging$ = new BehaviorSubject(null);
        this.isGrabbing$ = new BehaviorSubject(null);
        /**
         * Unsubscribe from all observables on destroy
         */
        this._onDestroy = new Subject();
        this.layout$.pipe(takeUntil(this._onDestroy)).subscribe(this.setLayoutData.bind(this));
        this.stacked$.pipe(takeUntil(this._onDestroy), filter(stacked => stacked === true)).subscribe(this.updateWhenStacked.bind(this));
        this.widgets$.pipe(takeUntil(this._onDestroy), tick()).subscribe(() => this.renderDashboard());
        this.dimensions$.pipe(takeUntil(this._onDestroy), tick()).subscribe(() => this.renderDashboard());
    }
    /**
     * @return {?}
     */
    get options() {
        return this.options$.getValue();
    }
    /**
     * @return {?}
     */
    get widgets() {
        return this.widgets$.getValue();
    }
    /**
     * @return {?}
     */
    get stacked() {
        return this.stacked$.getValue();
    }
    /**
     * @return {?}
     */
    get dimensions() {
        return this.dimensions$.getValue();
    }
    /**
     * @return {?}
     */
    get columnWidth() {
        return this.dimensions.width / this.options.columns;
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._onDestroy.next();
        this._onDestroy.complete();
    }
    /**
     * Add a widget to the dashboard
     * @param {?} widget The widget component to add to the dashboard
     * @return {?}
     */
    addWidget(widget) {
        this.widgets$.next([...this.widgets$.getValue(), widget]);
    }
    /**
     * Remove a widget from the dashboard
     * @param {?} widget The widget to remove
     * @return {?}
     */
    removeWidget(widget) {
        this.widgets$.next(this.widgets$.getValue().filter(_widget => _widget !== widget));
    }
    /**
     * Indicate that the dashboard element has been resized
     * @param {?=} width The width of the dashboard element in px
     * @param {?=} height The height of the dashboard element in px
     * @return {?}
     */
    setDimensions(width = this.dimensions.width, height = this.dimensions.height) {
        if (this.dimensions.width !== width || this.dimensions.height !== height) {
            this.dimensions$.next({ width: width, height: height });
        }
    }
    /**
     * Produce an object containing all the required layout data.
     * This can be useful for exporting/saving a layout
     * @return {?}
     */
    getLayoutData() {
        return this.widgets.map(widget => {
            return { id: widget.id, col: widget.getColumn(), row: widget.getRow(), colSpan: widget.getColumnSpan(), rowSpan: widget.getRowSpan() };
        });
    }
    /**
     * Position widgets programatically
     * @param {?} widgets
     * @return {?}
     */
    setLayoutData(widgets) {
        // iterate through each widget data and find a match
        widgets.forEach(widget => {
            // find the matching widget
            const /** @type {?} */ target = this.widgets.find(_widget => _widget.id === widget.id);
            if (target) {
                target.setColumn(widget.col);
                target.setRow(widget.row);
                target.setColumnSpan(widget.colSpan);
                target.setRowSpan(widget.rowSpan);
            }
        });
    }
    /**
     * Update the positions and sizes of the widgets
     * @return {?}
     */
    renderDashboard() {
        // get the dimensions of the dashboard
        this._rowHeight = this.options.rowHeight || this.columnWidth;
        // ensure the column width is not below the min widths
        this.stacked$.next(this.columnWidth < this.options.minWidth);
        // ensure the row height is not below the min widths
        if (this._rowHeight < this.options.minWidth) {
            this._rowHeight = this.options.minWidth;
        }
        this.setDashboardLayout();
        // iterate through each widget and set the size - except the one being resized
        this.widgets.filter(widget => !this._actionWidget || widget !== this._actionWidget.widget)
            .forEach(widget => widget.render());
    }
    /**
     * Determine where widgets should be positioned based on their positions, width and the size of the container
     * @return {?}
     */
    setDashboardLayout() {
        // find any widgets that do not currently have a position set
        this.widgets.filter(widget => widget.getColumn() === undefined || widget.getRow() === undefined)
            .forEach(widget => this.setWidgetPosition(widget));
        this.setDashboardHeight();
    }
    /**
     * @return {?}
     */
    updateWhenStacked() {
        // iterate through each widget set it's stacked state and
        this.getWidgetsByOrder().forEach((widget, idx) => {
            widget.setColumn(0);
            widget.setRow(idx);
        });
    }
    /**
     * @return {?}
     */
    getWidgetsByOrder() {
        return this.widgets.sort((w1, w2) => {
            const /** @type {?} */ w1Position = w1.getColumn() + (w1.getRow() * this.options.columns);
            const /** @type {?} */ w2Position = w2.getColumn() + (w2.getRow() * this.options.columns);
            if (w1Position < w2Position) {
                return -1;
            }
            if (w1Position > w2Position) {
                return 1;
            }
            return 0;
        });
    }
    /**
     * Find a position that a widget can fit in the dashboard
     * @param {?} widget The widget to try and position
     * @return {?}
     */
    setWidgetPosition(widget) {
        // find a position for the widget
        let /** @type {?} */ position = 0;
        let /** @type {?} */ success = false;
        // repeat until a space is found
        while (!success) {
            // get a position to try
            const /** @type {?} */ column = position % this.options.columns;
            const /** @type {?} */ row = Math.floor(position / this.options.columns);
            // check the current position
            if (this.getPositionAvailable(column, row, widget.getColumnSpan(), widget.getRowSpan())) {
                success = true;
                widget.setColumn(column);
                widget.setRow(row);
                return;
            }
            if (column === 0 && widget.colSpan > this.options.columns) {
                throw new Error('Dashboard widgets have a colSpan greater than the max number of dashboard columns!');
            }
            position++;
        }
    }
    /**
     * Check if a position in the dashboard is vacant or not
     * @param {?} column
     * @param {?} row
     * @param {?} columnSpan
     * @param {?} rowSpan
     * @param {?=} ignoreWidget
     * @return {?}
     */
    getPositionAvailable(column, row, columnSpan, rowSpan, ignoreWidget) {
        // get a list of grid spaces that are populated
        const /** @type {?} */ spaces = this.getOccupiedSpaces();
        // check if the block would still be in bounds
        if (column + columnSpan > this.options.columns) {
            return false;
        }
        // check each required position
        for (let /** @type {?} */ x = column; x < column + columnSpan; x++) {
            for (let /** @type {?} */ y = row; y < row + rowSpan; y++) {
                if (spaces.find(block => block.column === x && block.row === y && block.widget !== ignoreWidget)) {
                    return false;
                }
            }
        }
        return true;
    }
    /**
     * @return {?}
     */
    getOccupiedSpaces() {
        // find all spaces that are currently occupied
        return this.widgets.filter(widget => widget.getColumn() !== undefined && widget.getRow() !== undefined)
            .reduce((value, widget) => {
            this.forEachBlock(widget, (column, row) => value.push({ widget: widget, column: column, row: row }));
            return value;
        }, []);
    }
    /**
     * Begin resizing a widget
     * @param {?} action The the widget to resize
     * @return {?}
     */
    onResizeStart(action) {
        // store the mouse event
        this._event = action.event;
        this._actionWidget = action;
        // bring the widget to the font
        this.bringToFront(action.widget);
    }
    /**
     * @param {?} action
     * @return {?}
     */
    onResizeDrag(action) {
        const /** @type {?} */ mousePosX = this._event.pageX - pageXOffset;
        const /** @type {?} */ mousePosY = this._event.pageY - pageYOffset;
        // if there was no movement then do nothing
        if (action.event.x === mousePosX && action.event.y === mousePosY) {
            return;
        }
        // update the stored mouse event
        this._event = action.event;
        // get handle for direction
        const { handle } = action;
        // get the bounds of the handle
        const /** @type {?} */ bounds = handle.getBoundingClientRect();
        // get the center of the handle
        const /** @type {?} */ centerX = bounds.left + (bounds.width / 2);
        const /** @type {?} */ centerY = bounds.top + (bounds.height / 2);
        // get the current mouse position
        const /** @type {?} */ mouseX = mousePosX - centerX;
        const /** @type {?} */ mouseY = mousePosY - centerY;
        // store the new proposed dimensions for the widget
        const /** @type {?} */ dimensions = {
            x: action.widget.x,
            y: action.widget.y,
            width: action.widget.width,
            height: action.widget.height
        };
        // update widget based on the handle being dragged
        switch (action.direction) {
            case ActionDirection.Right:
                dimensions.width += mouseX;
                break;
            case ActionDirection.Left:
                dimensions.x += mouseX;
                dimensions.width -= mouseX;
                if (dimensions.width < this.options.minWidth) {
                    const /** @type {?} */ difference = this.options.minWidth - dimensions.width;
                    dimensions.x -= difference;
                    dimensions.width += difference;
                }
                break;
            case ActionDirection.Bottom:
                dimensions.height += mouseY;
                break;
            case ActionDirection.Top:
                dimensions.y += mouseY;
                dimensions.height -= mouseY;
                if (dimensions.height < this.options.minHeight) {
                    const /** @type {?} */ difference = this.options.minHeight - dimensions.height;
                    dimensions.y -= difference;
                    dimensions.height += difference;
                }
                break;
            // Support resizing on multiple axis simultaneously
            case ActionDirection.TopLeft:
                dimensions.x += mouseX;
                dimensions.width -= mouseX;
                if (dimensions.width < this.options.minWidth) {
                    const /** @type {?} */ difference = this.options.minWidth - dimensions.width;
                    dimensions.x -= difference;
                    dimensions.width += difference;
                }
                dimensions.y += mouseY;
                dimensions.height -= mouseY;
                if (dimensions.height < this.options.minHeight) {
                    const /** @type {?} */ difference = this.options.minHeight - dimensions.height;
                    dimensions.y -= difference;
                    dimensions.height += difference;
                }
                break;
            case ActionDirection.TopRight:
                dimensions.width += mouseX;
                dimensions.y += mouseY;
                dimensions.height -= mouseY;
                if (dimensions.height < this.options.minHeight) {
                    const /** @type {?} */ difference = this.options.minHeight - dimensions.height;
                    dimensions.y -= difference;
                    dimensions.height += difference;
                }
                break;
            case ActionDirection.BottomLeft:
                dimensions.height += mouseY;
                dimensions.x += mouseX;
                dimensions.width -= mouseX;
                if (dimensions.width < this.options.minWidth) {
                    const /** @type {?} */ difference = this.options.minWidth - dimensions.width;
                    dimensions.x -= difference;
                    dimensions.width += difference;
                }
                break;
            case ActionDirection.BottomRight:
                dimensions.height += mouseY;
                dimensions.width += mouseX;
                break;
        }
        const /** @type {?} */ currentWidth = action.widget.x + action.widget.width;
        const /** @type {?} */ currentHeight = action.widget.y + action.widget.height;
        // ensure values are within the dashboard bounds
        if (dimensions.x < 0) {
            dimensions.x = 0;
            dimensions.width = currentWidth;
        }
        if (dimensions.y < 0) {
            dimensions.y = 0;
            dimensions.height = currentHeight;
        }
        if ((dimensions.x + dimensions.width) > this.dimensions.width) {
            dimensions.width = this.dimensions.width - dimensions.x;
        }
        // if the proposed width is smaller than allowed then reset width to minimum and ignore x changes
        if (dimensions.width < this.options.minWidth) {
            dimensions.x = action.widget.x;
            dimensions.width = this.options.minWidth;
        }
        // if the proposed height is smaller than allowed then reset height to minimum and ignore y changes
        if (dimensions.height < this.options.minHeight) {
            dimensions.y = action.widget.y;
            dimensions.height = this.options.minHeight;
        }
        // update the widget actual values
        action.widget.setBounds(dimensions.x, dimensions.y, dimensions.width, dimensions.height);
        // update placeholder position and value
        this.setPlaceholderBounds(true, dimensions.x, dimensions.y, dimensions.width, dimensions.height);
        // show the widget positions if the current positions and sizes were to persist
        this.updateWidgetPositions(action.widget);
    }
    /**
     * @return {?}
     */
    onResizeEnd() {
        const /** @type {?} */ placeholder = this.placeholder$.getValue();
        // commit resize changes
        this.commitWidgetChanges();
        // hide placeholder
        placeholder.visible = false;
        // update the placeholder
        this.placeholder$.next(placeholder);
        this._actionWidget = null;
        this._event = null;
        // ensure any vacant upper spaces are filled where required
        this.shiftWidgetsUp();
        // update dashboard height
        this.setDashboardHeight();
        // emit information about the layout
        this.layout$.next(this.getLayoutData());
    }
    /**
     * @param {?} action
     * @return {?}
     */
    onDragStart(action) {
        this.onResizeStart(action);
        // store the starting placeholder position
        this.setWidgetOrigin();
        this.cacheWidgets();
        // emit the widget we are dragging
        this.isDragging$.next(action.widget);
    }
    /**
     * @return {?}
     */
    onDragEnd() {
        this.onResizeEnd();
        this._widgetOrigin = {};
        this.isDragging$.next(null);
    }
    /**
     * @param {?} action
     * @return {?}
     */
    onDrag(action) {
        // if there was no movement then do nothing
        if (action.event.pageX === this._event.pageX && action.event.pageY === this._event.pageY) {
            return;
        }
        // get the current mouse position
        const /** @type {?} */ mouseX = action.event.pageX - this._event.pageX;
        const /** @type {?} */ mouseY = action.event.pageY - this._event.pageY;
        // store the latest event
        this._event = action.event;
        const /** @type {?} */ dimensions = {
            x: action.widget.x + mouseX,
            y: action.widget.y + mouseY,
            width: action.widget.width,
            height: action.widget.height
        };
        this.restoreWidgets(true);
        // update widget position
        action.widget.setBounds(dimensions.x, dimensions.y, dimensions.width, dimensions.height);
        // update placeholder position and value
        this.setPlaceholderBounds(true, dimensions.x, dimensions.y, dimensions.width, dimensions.height);
        // show the widget positions if the current positions and sizes were to persist
        this.shiftWidgets();
        this.setDashboardHeight();
    }
    /**
     * @return {?}
     */
    getRowHeight() {
        return this._rowHeight;
    }
    /**
     * @return {?}
     */
    cacheWidgets() {
        this._cache = this.widgets.map(widget => ({
            id: widget.id,
            column: widget.getColumn(),
            row: widget.getRow(),
            columnSpan: widget.getColumnSpan(),
            rowSpan: widget.getRowSpan(),
        }));
        // return a new array of the cache for custom caching
        return [...this._cache];
    }
    /**
     * @param {?=} ignoreActionWidget
     * @param {?=} cache
     * @param {?=} restoreSize
     * @return {?}
     */
    restoreWidgets(ignoreActionWidget = false, cache = this._cache, restoreSize = false) {
        cache.filter(widget => !ignoreActionWidget || widget.id !== this._actionWidget.widget.id).forEach(widget => {
            const /** @type {?} */ match = this.widgets.find(wgt => wgt.id === widget.id);
            if (match) {
                match.setColumn(widget.column);
                match.setRow(widget.row);
                if (restoreSize) {
                    match.setColumnSpan(widget.columnSpan);
                    match.setRowSpan(widget.rowSpan);
                }
            }
        });
    }
    /**
     * When dragging any widgets that need to be moved should be moved to an appropriate position
     * @return {?}
     */
    shiftWidgets() {
        let /** @type {?} */ widgetsToMove = [];
        const /** @type {?} */ placeholder = this.placeholder$.getValue();
        // check if there are any widgets under the placeholder
        for (let /** @type {?} */ row = placeholder.row; row < placeholder.row + placeholder.rowSpan; row++) {
            for (let /** @type {?} */ column = placeholder.column; column < placeholder.column + placeholder.columnSpan; column++) {
                // store reference to any widgets that need moved
                this.getOccupiedSpaces()
                    .filter(space => space.column === column && space.row === row && space.widget !== this._actionWidget.widget)
                    .forEach(space => widgetsToMove.push(space.widget));
            }
        }
        // remove any duplicates
        widgetsToMove = widgetsToMove.filter((widget, idx, array) => array.indexOf(widget) === idx);
        // if no widgets need moved then we can stop here
        if (widgetsToMove.length === 0) {
            return;
        }
        // create a duplicate we can use to keep track of which have been moved
        const /** @type {?} */ unmovedWidgets = widgetsToMove.slice();
        // attempt to move any widgets to the previous widget position
        widgetsToMove.forEach(widget => {
            // get a grid off all occupied spaces - taking into account the placeholder and ignoring widgets that need moved
            const /** @type {?} */ grid = this.getOccupiedSpaces().filter(space => !unmovedWidgets.find(wgt => wgt === space.widget));
            // iterate each free block
            for (let /** @type {?} */ row = this._widgetOrigin.row; row < this._widgetOrigin.row + this._widgetOrigin.rowSpan; row++) {
                for (let /** @type {?} */ column = this._widgetOrigin.column; column < this._widgetOrigin.column + this._widgetOrigin.columnSpan; column++) {
                    // determine if the block can fit in this space
                    const /** @type {?} */ requiredSpaces = this.getRequiredSpacesFromPoint(widget, column, row);
                    // check if widget would fit in space
                    const /** @type {?} */ available = requiredSpaces.every(space => {
                        return !grid.find(gridSpace => gridSpace.column === space.column && gridSpace.row === space.row) && space.column < this.getColumnCount();
                    });
                    if (available) {
                        widget.setColumn(column);
                        widget.setRow(row);
                        unmovedWidgets.splice(unmovedWidgets.findIndex(wgt => wgt === widget), 1);
                        return;
                    }
                }
            }
            // if we get to here then we can't simply swap the positions - next try moving right
            if (this.canWidgetMoveRight(widget, true)) {
                // after the shift check if placeholder position is still valid
                this.validatePlaceholderPosition(ActionDirection.Right);
                return;
            }
            // next try moving left
            if (this.canWidgetMoveLeft(widget, true)) {
                // after the shift check if placeholder position is still valid
                this.validatePlaceholderPosition(ActionDirection.Left);
                return;
            }
            // determine the distance that the widget needs to be moved down
            const /** @type {?} */ distance = (this._actionWidget.widget.getRow() - widget.getRow()) + this._actionWidget.widget.getRowSpan();
            // as a last resort move the widget downwards
            this.moveWidgetDown(widget, distance);
        });
    }
    /**
     * After shifts have taken place we should verify the place holder position is still valid
     * @param {?} shiftDirection - the position widgets were shifted
     * @return {?}
     */
    validatePlaceholderPosition(shiftDirection) {
        const /** @type {?} */ placeholder = this.placeholder$.getValue();
        // check if the placeholder is over a widget
        if (this.getWidgetsAtPosition(placeholder.column, placeholder.row, true).length > 0) {
            // move the placeholder the opposite direction
            switch (shiftDirection) {
                case ActionDirection.Left:
                    this.setPlaceholderBounds(placeholder.visible, placeholder.x + this.getColumnWidth(), placeholder.y, placeholder.width, placeholder.height);
                    break;
                case ActionDirection.Right:
                    this.setPlaceholderBounds(placeholder.visible, placeholder.x - this.getColumnWidth(), placeholder.y, placeholder.width, placeholder.height);
                    break;
            }
            // validate this new position again
            this.validatePlaceholderPosition(shiftDirection);
        }
    }
    /**
     * Determine if a widget can be moved left - or if it can move the widgets to the right to make space for the widget
     * @param {?} widget
     * @param {?=} performMove
     * @return {?}
     */
    canWidgetMoveLeft(widget, performMove = false) {
        // check if the widget is the action widget or occupies the first column
        if (widget === this._actionWidget.widget || widget.getColumn() === 0) {
            return false;
        }
        // find the positions required
        const /** @type {?} */ targetSpaces = this.getOccupiedSpaces().filter(space => space.widget === widget).map(space => {
            return { column: space.column - widget.getColumnSpan(), row: space.row, widget: space.widget };
        });
        // check if any of the target spaces are out of bounds
        if (targetSpaces.find(space => space.column < 0)) {
            return false;
        }
        // check if there are widget in the required positions and if so, can they move right?
        const /** @type {?} */ moveable = targetSpaces.every(space => this.getWidgetsAtPosition(space.column, space.row).filter(wgt => wgt !== space.widget).every(wgt => this.canWidgetMoveLeft(wgt)));
        if (performMove && moveable) {
            // move all widgets to the left
            targetSpaces.forEach(space => this.getWidgetsAtPosition(space.column, space.row).filter(wgt => wgt !== space.widget).forEach(wgt => this.canWidgetMoveLeft(wgt, true)));
            // find the target column
            const /** @type {?} */ column = targetSpaces.reduce((target, space) => Math.min(target, space.column), Infinity);
            // move current widget to the left
            if (column !== Infinity) {
                widget.setColumn(column);
            }
        }
        return moveable;
    }
    /**
     * Determine if a widget can be moved right - or if it can move the widgets to the right to make space for the widget
     * @param {?} widget
     * @param {?=} performMove
     * @return {?}
     */
    canWidgetMoveRight(widget, performMove = false) {
        // check if the widget is the dragging widget or the widget occupies the final column
        if (widget === this._actionWidget.widget || widget.getColumn() + widget.getColumnSpan() === this.options.columns) {
            return false;
        }
        // find the positions required
        const /** @type {?} */ targetSpaces = this.getOccupiedSpaces().filter(space => space.widget === widget).map(space => {
            return { column: space.column + widget.getColumnSpan(), row: space.row, widget: space.widget };
        });
        // check if any of the target spaces are out of bounds
        if (targetSpaces.find(space => space.column >= this.getColumnCount())) {
            return false;
        }
        // check if there are widget in the required positions and if so, can they move right?
        const /** @type {?} */ moveable = targetSpaces.every(space => this.getWidgetsAtPosition(space.column, space.row)
            .filter(wgt => wgt !== space.widget)
            .every(wgt => this.canWidgetMoveRight(wgt)));
        if (performMove && moveable) {
            // move all widgets to the right
            targetSpaces.forEach(space => this.getWidgetsAtPosition(space.column, space.row).filter(wgt => wgt !== space.widget).forEach(wgt => this.canWidgetMoveRight(wgt, true)));
            // move current widget to the right
            widget.setColumn(widget.getColumn() + 1);
        }
        return moveable;
    }
    /**
     * Store the initial position of the widget being dragged
     * @return {?}
     */
    setWidgetOrigin() {
        this._widgetOrigin = {
            column: this._actionWidget.widget.getColumn(),
            row: this._actionWidget.widget.getRow(),
            columnSpan: this._actionWidget.widget.getColumnSpan(),
            rowSpan: this._actionWidget.widget.getRowSpan()
        };
    }
    /**
     * Calculate all the required positions is a widget was to be positioned at a particular point
     * @param {?} widget
     * @param {?} column
     * @param {?} row
     * @return {?}
     */
    getRequiredSpacesFromPoint(widget, column, row) {
        const /** @type {?} */ spaces = [];
        for (let /** @type {?} */ y = row; y < row + widget.getRowSpan(); y++) {
            for (let /** @type {?} */ x = column; x < column + widget.getColumnSpan(); x++) {
                spaces.push({ column: x, row: y, widget: widget });
            }
        }
        return spaces;
    }
    /**
     * Position widgets based on the position of the placeholder - this is temporary until confirmed
     * @param {?} widget
     * @return {?}
     */
    updateWidgetPositions(widget) {
        const /** @type {?} */ placeholder = this.placeholder$.getValue();
        // check all spaces the placeholder will occupy and move any widget currently in them down
        for (let /** @type {?} */ column = placeholder.column; column < placeholder.column + placeholder.columnSpan; column++) {
            for (let /** @type {?} */ row = placeholder.row; row < placeholder.row + placeholder.rowSpan; row++) {
                this.getWidgetsAtPosition(column, row, true)
                    .filter(wgt => wgt !== widget)
                    .forEach(wgt => this.moveWidgetDown(wgt));
            }
        }
        // update the height of the dashboard
        this.setDashboardHeight();
        // if we arent dragging the top handle then fill spaces
        if (this._actionWidget.direction !== ActionDirection.Top &&
            this._actionWidget.direction !== ActionDirection.TopLeft &&
            this._actionWidget.direction !== ActionDirection.TopRight) {
            this.shiftWidgetsUp();
        }
    }
    /**
     * Determine if a widget is occupying a specific row and column
     * @param {?} column The columns to check if occupied
     * @param {?} row The row to check if occupied
     * @param {?=} ignoreResizing Whether or not to ignore the widget currently being resized
     * @return {?}
     */
    getWidgetsAtPosition(column, row, ignoreResizing = false) {
        return this.getOccupiedSpaces()
            .filter(space => space.column === column && space.row === row)
            .filter(space => this._actionWidget && space.widget !== this._actionWidget.widget || !ignoreResizing)
            .map(space => space.widget);
    }
    /**
     * Update the placeholder visibility, position and size
     * @param {?} visible
     * @param {?} x
     * @param {?} y
     * @param {?} width
     * @param {?} height
     * @return {?}
     */
    setPlaceholderBounds(visible, x, y, width, height) {
        const /** @type {?} */ placeholder = this.placeholder$.getValue();
        placeholder.visible = visible;
        placeholder.column = this.getPlaceholderColumn(x, width);
        placeholder.row = this.getPlaceholderRow(y, height);
        placeholder.columnSpan = this.getPlaceholderColumnSpan(width);
        placeholder.rowSpan = this.getPlaceholderRowSpan(height);
        // calculate the maximum number of rows
        const /** @type {?} */ rowCount = this.widgets.filter(widget => widget !== this._actionWidget.widget)
            .reduce((previous, widget) => Math.max(widget.getRow() + widget.getRowSpan(), previous), 0);
        // constrain maximum placeholder row
        placeholder.row = Math.min(placeholder.row, rowCount);
        placeholder.x = (placeholder.column * this.getColumnWidth()) + this.options.padding;
        placeholder.y = (placeholder.row * this._rowHeight) + this.options.padding;
        placeholder.width = (placeholder.columnSpan * this.getColumnWidth()) - (this.options.padding * 2);
        placeholder.height = (placeholder.rowSpan * this._rowHeight) - (this.options.padding * 2);
        // set the values of the widget to match the values of the placeholder - however do not render the changes
        this._actionWidget.widget.setColumn(placeholder.column, false);
        this._actionWidget.widget.setRow(placeholder.row, false);
        this._actionWidget.widget.setColumnSpan(placeholder.columnSpan, false);
        this._actionWidget.widget.setRowSpan(placeholder.rowSpan, false);
        // update the placeholder
        this.placeholder$.next(placeholder);
    }
    /**
     * Get the placeholder column position
     * @param {?} x
     * @param {?} width
     * @return {?}
     */
    getPlaceholderColumn(x, width) {
        const /** @type {?} */ column = this.getColumnFromPx(x, this._actionWidget.direction === ActionDirection.Move ? Rounding.RoundUpOverHalf : Rounding.RoundDown);
        const /** @type {?} */ columnSpan = Math.floor(width / this.getColumnWidth());
        const /** @type {?} */ upperLimit = this.getColumnCount() - columnSpan;
        // if we arent dragging left then just return the column
        if (this._actionWidget.direction !== ActionDirection.Left &&
            this._actionWidget.direction !== ActionDirection.TopLeft &&
            this._actionWidget.direction !== ActionDirection.BottomLeft) {
            return Math.max(Math.min(column, upperLimit), 0);
        }
        // get any overflow
        const /** @type {?} */ overflow = width % this.getColumnWidth();
        return (x <= 0 || overflow === 0 || columnSpan === 0 || overflow > (this.getColumnWidth() / 2)) ?
            Math.max(Math.min(column, upperLimit), 0) :
            Math.max(Math.min(column + 1, upperLimit), 0);
    }
    /**
     * Get the column span of the placeholder
     * @param {?} width
     * @return {?}
     */
    getPlaceholderColumnSpan(width) {
        const /** @type {?} */ columnSpan = this.getColumnFromPx(width);
        // if we arent dragging right or left then just return the column span
        if (this._actionWidget.direction !== ActionDirection.Right &&
            this._actionWidget.direction !== ActionDirection.TopRight &&
            this._actionWidget.direction !== ActionDirection.BottomRight &&
            this._actionWidget.direction !== ActionDirection.Left &&
            this._actionWidget.direction !== ActionDirection.TopLeft &&
            this._actionWidget.direction !== ActionDirection.BottomLeft) {
            return Math.max(columnSpan, 1);
        }
        // get the current column span and any overflow
        const /** @type {?} */ overflow = width % this.getColumnWidth();
        return (columnSpan > 0 && overflow > (this.getColumnWidth() / 2)) ? Math.max(columnSpan + 1, 1) : Math.max(columnSpan, 1);
    }
    /**
     * Get the row position of the placeholder
     * @param {?} y
     * @param {?} height
     * @return {?}
     */
    getPlaceholderRow(y, height) {
        const /** @type {?} */ row = this.getRowFromPx(y, this._actionWidget.direction === ActionDirection.Move ? Rounding.RoundUpOverHalf : Rounding.RoundDown);
        const /** @type {?} */ rowSpan = Math.ceil(height / this._rowHeight);
        // if we arent dragging up then just return the row
        if (this._actionWidget.direction !== ActionDirection.Top &&
            this._actionWidget.direction !== ActionDirection.TopLeft &&
            this._actionWidget.direction !== ActionDirection.TopRight) {
            return Math.max(row, 0);
        }
        // get any overflow
        let /** @type {?} */ overflow = height < this._rowHeight ? 0 : height % this._rowHeight;
        return (y <= 0 || rowSpan === 0 || overflow === 0 || overflow > (this._rowHeight / 2)) ? Math.max(row, 0) : Math.max(row + 1, 0);
    }
    /**
     * Get the row span of the placeholder
     * @param {?} height
     * @return {?}
     */
    getPlaceholderRowSpan(height) {
        const /** @type {?} */ rowSpan = this.getRowFromPx(height);
        // if we arent dragging up or down then just return the column span
        if (this._actionWidget.direction !== ActionDirection.Top &&
            this._actionWidget.direction !== ActionDirection.TopLeft &&
            this._actionWidget.direction !== ActionDirection.TopRight &&
            this._actionWidget.direction !== ActionDirection.Bottom &&
            this._actionWidget.direction !== ActionDirection.BottomLeft &&
            this._actionWidget.direction !== ActionDirection.BottomRight) {
            return Math.max(rowSpan, 1);
        }
        // get the current column span and any overflow
        const /** @type {?} */ overflow = height % this._rowHeight;
        return (overflow > (this._rowHeight / 2)) ? Math.max(rowSpan + 1, 1) : Math.max(rowSpan, 1);
    }
    /**
     * @param {?} x
     * @param {?=} rounding
     * @return {?}
     */
    getColumnFromPx(x, rounding = Rounding.RoundDown) {
        const /** @type {?} */ column = Math.floor(x / Math.floor(this.getColumnWidth()));
        const /** @type {?} */ overflow = (x % Math.floor(this.getColumnWidth()));
        const /** @type {?} */ half = this.getColumnWidth() / 2;
        switch (rounding) {
            case Rounding.RoundDown:
                return column;
            case Rounding.RoundDownBelowHalf:
                return overflow < half ? column : column + 1;
            case Rounding.RoundUpOverHalf:
                return overflow > half ? column + 1 : column;
            case Rounding.RoundUp:
                return overflow > 0 ? column + 1 : column;
        }
    }
    /**
     * @param {?} y
     * @param {?=} rounding
     * @return {?}
     */
    getRowFromPx(y, rounding = Rounding.RoundDown) {
        const /** @type {?} */ row = Math.floor(y / Math.floor(this._rowHeight));
        const /** @type {?} */ overflow = (y % Math.floor(this._rowHeight));
        const /** @type {?} */ half = this._rowHeight / 2;
        switch (rounding) {
            case Rounding.RoundDown:
                return row;
            case Rounding.RoundDownBelowHalf:
                return overflow < half ? row : row + 1;
            case Rounding.RoundUpOverHalf:
                return overflow > half ? row + 1 : row;
            case Rounding.RoundUp:
                return overflow > 0 ? row + 1 : row;
        }
    }
    /**
     * @return {?}
     */
    commitWidgetChanges() {
        const /** @type {?} */ placeholder = this.placeholder$.getValue();
        // check that we have all the values we need
        if (placeholder.column === undefined || placeholder.row === undefined ||
            placeholder.columnSpan === undefined || placeholder.rowSpan === undefined) {
            return;
        }
        if (this._actionWidget) {
            this._actionWidget.widget.setColumn(placeholder.column);
            this._actionWidget.widget.setRow(placeholder.row);
            this._actionWidget.widget.setColumnSpan(placeholder.columnSpan);
            this._actionWidget.widget.setRowSpan(placeholder.rowSpan);
        }
        // reset all placeholder values
        placeholder.column = undefined;
        placeholder.row = undefined;
        placeholder.columnSpan = undefined;
        placeholder.rowSpan = undefined;
        // emit the new placeholder values
        this.placeholder$.next(placeholder);
    }
    /**
     * Get the current column width
     * @return {?}
     */
    getColumnWidth() {
        return Math.floor(this.columnWidth);
    }
    /**
     * Calculate the number of rows populated with widgets
     * @return {?}
     */
    getRowCount() {
        return this.widgets.reduce((previous, widget) => Math.max(widget.getRow() + widget.getRowSpan(), previous), 0);
    }
    /**
     * Set the height of the dashboard container element
     * @return {?}
     */
    setDashboardHeight() {
        // size the dashboard container to ensure all rows fit
        let /** @type {?} */ rowCount = this.getRowCount();
        // if we should show an empty row increment the row count by 1
        if (this.options.emptyRow) {
            rowCount++;
        }
        this.setDimensions(undefined, rowCount * this._rowHeight);
    }
    /**
     * Orders the z-index of all widgets to move the active one to the front
     * @param {?} widget The widget that should be brought to the front
     * @return {?}
     */
    bringToFront(widget) {
        this.widgets.forEach(_widget => _widget === widget ? _widget.bringToFront() : _widget.sendToBack());
    }
    /**
     * Move a widget down - if widgets are in the position below, then move them down further
     * @param {?} widget The widget to move downwards
     * @param {?=} distance
     * @return {?}
     */
    moveWidgetDown(widget, distance = 1) {
        // move the widget down one position
        widget.setRow(widget.getRow() + distance);
        // check every space the widget occupies for collisions
        this.forEachBlock(widget, (column, row) => this.getWidgetsAtPosition(column, row, true)
            .filter(wgt => wgt !== widget)
            .forEach(wgt => this.moveWidgetDown(wgt, distance)));
    }
    /**
     * Widgets should not be allowed to have a vacant space above them - if there is one they should move upwards to fill it
     * @return {?}
     */
    shiftWidgetsUp() {
        // check whether or not changes have been made - if so we need to repeat until stable
        let /** @type {?} */ stable = true;
        // iterate each widget and
        this.widgets.forEach(widget => {
            // if widget is already on the top row then do nothing
            if (widget.getRow() === 0) {
                return;
            }
            // if we are currently dragging and this is the dragging widget then skip
            if (this._actionWidget && this._actionWidget.widget === widget) {
                return;
            }
            if (this.getPositionAvailable(widget.getColumn(), widget.getRow() - 1, widget.getColumnSpan(), 1)) {
                widget.setRow(widget.getRow() - 1);
                stable = false;
            }
        });
        // if changes occurred then we should repeat the process
        if (!stable) {
            this.shiftWidgetsUp();
        }
    }
    /**
     * Iterate over each space a widget occupied
     * @param {?} widget The widget to determine spaces
     * @param {?} callback The function to be called for each space, should expect a column and row argument witht he context being the widget
     * @return {?}
     */
    forEachBlock(widget, callback) {
        for (let /** @type {?} */ row = widget.getRow(); row < widget.getRow() + widget.getRowSpan(); row++) {
            for (let /** @type {?} */ column = widget.getColumn(); column < widget.getColumn() + widget.getColumnSpan(); column++) {
                callback.call(widget, column, row);
            }
        }
    }
    /**
     * @param {?} widget
     * @return {?}
     */
    getWidgetBelow(widget) {
        const /** @type {?} */ target = this.getWidgetsAtPosition(widget.getColumn(), widget.getRow() + widget.getRowSpan(), true);
        return target.length > 0 ? target[0] : null;
    }
    /**
     * Returns the number of columns available
     * @return {?}
     */
    getColumnCount() {
        return this.stacked ? 1 : this.options.columns;
    }
    /**
     * @param {?} widget
     * @return {?}
     */
    onShiftStart(widget) {
        this.onDragStart({ direction: ActionDirection.Move, widget });
    }
    /**
     * Programmatically move a widget in a given direction
     * @param {?} widget
     * @param {?} direction
     * @return {?}
     */
    onShift(widget, direction) {
        // get the current mouse position
        let /** @type {?} */ deltaX = 0, /** @type {?} */ deltaY = 0;
        // move based on the direction
        switch (direction) {
            case ActionDirection.Top:
                deltaY = -this.getRowHeight();
                break;
            case ActionDirection.Right:
                deltaX = this.getColumnWidth();
                break;
            case ActionDirection.Bottom: {
                deltaY = this.getRowHeight();
                break;
            }
            case ActionDirection.Left:
                deltaX = -this.getColumnWidth();
                break;
        }
        const /** @type {?} */ dimensions = {
            x: widget.x + deltaX,
            y: widget.y + deltaY,
            width: widget.width,
            height: widget.height
        };
        // update placeholder position and value
        this.setPlaceholderBounds(false, dimensions.x, dimensions.y, dimensions.width, dimensions.height);
        // update widget position
        const { x, y } = this.placeholder$.value;
        // move the widget to the placeholder position
        widget.setBounds(x - this.options.padding, y - this.options.padding, dimensions.width, dimensions.height);
        // update the height of the dashboard
        this.setDashboardHeight();
    }
    /**
     * @return {?}
     */
    onShiftEnd() {
        // show the widget positions if the current positions and sizes were to persist
        this.shiftWidgets();
        // the height of the dashboard may have changed after moving widgets
        this.setDashboardHeight();
        // reset all properties
        this.onDragEnd();
    }
    /**
     * Programmatically resize a widget in a given direction
     * @param {?} widget
     * @param {?} direction
     * @return {?}
     */
    onResize(widget, direction) {
        // do not perform resizing if we are in stacked mode
        if (this.stacked) {
            return;
        }
        // perform the resizing
        let /** @type {?} */ deltaX = 0, /** @type {?} */ deltaY = 0;
        // move based on the direction
        switch (direction) {
            case ActionDirection.Top:
                deltaY = -this.getRowHeight();
                break;
            case ActionDirection.Right:
                deltaX = this.getColumnWidth();
                break;
            case ActionDirection.Bottom:
                deltaY = this.getRowHeight();
                break;
            case ActionDirection.Left:
                deltaX = -this.getColumnWidth();
                break;
        }
        const /** @type {?} */ dimensions = {
            x: widget.x,
            y: widget.y,
            width: widget.width + deltaX,
            height: widget.height + deltaY
        };
        const /** @type {?} */ currentWidth = widget.x + widget.width;
        const /** @type {?} */ currentHeight = widget.y + widget.height;
        // ensure values are within the dashboard bounds
        if (dimensions.x < 0) {
            dimensions.x = 0;
            dimensions.width = currentWidth;
        }
        if (dimensions.y < 0) {
            dimensions.y = 0;
            dimensions.height = currentHeight;
        }
        if ((dimensions.x + dimensions.width) > this.getColumnWidth() * this.getColumnCount()) {
            dimensions.width = widget.width;
        }
        // if the proposed width is smaller than allowed then reset width to minimum and ignore x changes
        if (dimensions.width < this.getColumnWidth()) {
            dimensions.x = widget.x;
            dimensions.width = this.getColumnWidth();
        }
        // if the proposed height is smaller than allowed then reset height to minimum and ignore y changes
        if (dimensions.height < this.getRowHeight()) {
            dimensions.y = widget.y;
            dimensions.height = this.getRowHeight();
        }
        // move the widget to the placeholder position
        widget.setBounds(dimensions.x, dimensions.y, dimensions.width, dimensions.height);
        // update placeholder position and value
        this.setPlaceholderBounds(false, dimensions.x, dimensions.y, dimensions.width, dimensions.height);
        // the height of the dashboard may have changed after moving widgets
        this.setDashboardHeight();
    }
    /**
     * @param {?} widget
     * @param {?} direction
     * @return {?}
     */
    getSurroundingWidgets(widget, direction) {
        let /** @type {?} */ widgets = [];
        for (let /** @type {?} */ column = widget.getColumn(); column < widget.getColumn() + widget.getColumnSpan(); column++) {
            switch (direction) {
                case ActionDirection.Top:
                    widgets = [...widgets, ...this.getWidgetsAtPosition(column, widget.getRow() - 1)];
                    break;
                case ActionDirection.Bottom:
                    widgets = [...widgets, ...this.getWidgetsAtPosition(column, widget.getRow() + widget.getRowSpan())];
                    break;
            }
        }
        return widgets;
    }
}
DashboardService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
DashboardService.ctorParameters = () => [];
function DashboardService_tsickle_Closure_declarations() {
    /** @type {?} */
    DashboardService.prototype._widgetOrigin;
    /** @type {?} */
    DashboardService.prototype._actionWidget;
    /** @type {?} */
    DashboardService.prototype._rowHeight;
    /** @type {?} */
    DashboardService.prototype._cache;
    /** @type {?} */
    DashboardService.prototype._event;
    /** @type {?} */
    DashboardService.prototype.widgets$;
    /** @type {?} */
    DashboardService.prototype.options$;
    /** @type {?} */
    DashboardService.prototype.dimensions$;
    /** @type {?} */
    DashboardService.prototype.height$;
    /** @type {?} */
    DashboardService.prototype.placeholder$;
    /** @type {?} */
    DashboardService.prototype.layout$;
    /** @type {?} */
    DashboardService.prototype.stacked$;
    /** @type {?} */
    DashboardService.prototype.isDragging$;
    /** @type {?} */
    DashboardService.prototype.isGrabbing$;
    /**
     * Unsubscribe from all observables on destroy
     * @type {?}
     */
    DashboardService.prototype._onDestroy;
}
export const /** @type {?} */ defaultOptions = { columns: 5, padding: 5, minWidth: 100, minHeight: 100, emptyRow: true };
/**
 * @record
 */
export function DashboardDimensions() { }
function DashboardDimensions_tsickle_Closure_declarations() {
    /** @type {?|undefined} */
    DashboardDimensions.prototype.width;
    /** @type {?|undefined} */
    DashboardDimensions.prototype.height;
}
/**
 * @record
 */
export function DashboardWidgetDimensions() { }
function DashboardWidgetDimensions_tsickle_Closure_declarations() {
    /** @type {?} */
    DashboardWidgetDimensions.prototype.x;
    /** @type {?} */
    DashboardWidgetDimensions.prototype.y;
    /** @type {?} */
    DashboardWidgetDimensions.prototype.width;
    /** @type {?} */
    DashboardWidgetDimensions.prototype.height;
}
/**
 * @record
 */
export function DashboardAction() { }
function DashboardAction_tsickle_Closure_declarations() {
    /** @type {?} */
    DashboardAction.prototype.widget;
    /** @type {?} */
    DashboardAction.prototype.direction;
    /** @type {?|undefined} */
    DashboardAction.prototype.event;
    /** @type {?|undefined} */
    DashboardAction.prototype.handle;
}
/**
 * @record
 */
export function DashboardSpace() { }
function DashboardSpace_tsickle_Closure_declarations() {
    /** @type {?} */
    DashboardSpace.prototype.widget;
    /** @type {?} */
    DashboardSpace.prototype.column;
    /** @type {?} */
    DashboardSpace.prototype.row;
}
/**
 * @record
 */
export function DashboardPlaceholder() { }
function DashboardPlaceholder_tsickle_Closure_declarations() {
    /** @type {?} */
    DashboardPlaceholder.prototype.visible;
    /** @type {?} */
    DashboardPlaceholder.prototype.x;
    /** @type {?} */
    DashboardPlaceholder.prototype.y;
    /** @type {?} */
    DashboardPlaceholder.prototype.width;
    /** @type {?} */
    DashboardPlaceholder.prototype.height;
    /** @type {?|undefined} */
    DashboardPlaceholder.prototype.column;
    /** @type {?|undefined} */
    DashboardPlaceholder.prototype.row;
    /** @type {?|undefined} */
    DashboardPlaceholder.prototype.columnSpan;
    /** @type {?|undefined} */
    DashboardPlaceholder.prototype.rowSpan;
}
/**
 * @record
 */
export function DashboardCache() { }
function DashboardCache_tsickle_Closure_declarations() {
    /** @type {?} */
    DashboardCache.prototype.id;
    /** @type {?} */
    DashboardCache.prototype.column;
    /** @type {?} */
    DashboardCache.prototype.row;
    /** @type {?} */
    DashboardCache.prototype.columnSpan;
    /** @type {?} */
    DashboardCache.prototype.rowSpan;
}
/**
 * @record
 */
export function DashboardLayoutData() { }
function DashboardLayoutData_tsickle_Closure_declarations() {
    /** @type {?} */
    DashboardLayoutData.prototype.id;
    /** @type {?} */
    DashboardLayoutData.prototype.col;
    /** @type {?} */
    DashboardLayoutData.prototype.row;
    /** @type {?} */
    DashboardLayoutData.prototype.colSpan;
    /** @type {?} */
    DashboardLayoutData.prototype.rowSpan;
}
/** @enum {number} */
const ActionDirection = {
    Top: 0,
    TopRight: 1,
    Right: 2,
    BottomRight: 3,
    Bottom: 4,
    BottomLeft: 5,
    Left: 6,
    TopLeft: 7,
    Move: 8,
};
export { ActionDirection };
ActionDirection[ActionDirection.Top] = "Top";
ActionDirection[ActionDirection.TopRight] = "TopRight";
ActionDirection[ActionDirection.Right] = "Right";
ActionDirection[ActionDirection.BottomRight] = "BottomRight";
ActionDirection[ActionDirection.Bottom] = "Bottom";
ActionDirection[ActionDirection.BottomLeft] = "BottomLeft";
ActionDirection[ActionDirection.Left] = "Left";
ActionDirection[ActionDirection.TopLeft] = "TopLeft";
ActionDirection[ActionDirection.Move] = "Move";
/** @enum {number} */
const Rounding = {
    RoundDown: 0,
    RoundDownBelowHalf: 1,
    RoundUp: 2,
    RoundUpOverHalf: 3,
};
export { Rounding };
Rounding[Rounding.RoundDown] = "RoundDown";
Rounding[Rounding.RoundDownBelowHalf] = "RoundDownBelowHalf";
Rounding[Rounding.RoundUp] = "RoundUp";
Rounding[Rounding.RoundUpOverHalf] = "RoundUpOverHalf";

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGFzaGJvYXJkLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9kYXNoYm9hcmQvZGFzaGJvYXJkLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQWEsTUFBTSxlQUFlLENBQUM7QUFDdEQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBRXZELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzlFLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDdkMsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBSzFDLE1BQU07SUF5Q0Y7MEJBckM2QixDQUFDO3dCQUluQixJQUFJLGVBQWUsQ0FBNkIsRUFBRSxDQUFDO3dCQUNuRCxJQUFJLGVBQWUsQ0FBbUIsY0FBYyxDQUFDOzJCQUNsRCxJQUFJLGVBQWUsQ0FBc0IsRUFBRSxDQUFDO3VCQUM1QixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsRUFBRSxHQUFHLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLEVBQUUsb0JBQW9CLEVBQUUsQ0FBQzs0QkFDMUcsSUFBSSxlQUFlLENBQXVCLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLENBQUM7dUJBQ25HLElBQUksT0FBTyxFQUF5Qjt3QkFDbkMsSUFBSSxlQUFlLENBQVUsS0FBSyxDQUFDOzJCQUNoQyxJQUFJLGVBQWUsQ0FBMkIsSUFBSSxDQUFDOzJCQUNuRCxJQUFJLGVB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QVUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQztRQUM3RCx1QkFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLGNBQWMsRUFBRSxHQUFHLFVBQVUsQ0FBQzs7UUFHdEQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLEtBQUssZUFBZSxDQUFDLElBQUk7WUFDckQsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLEtBQUssZUFBZSxDQUFDLE9BQU87WUFDeEQsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLEtBQUssZUFBZSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7WUFDOUQsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsVUFBVSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7U0FDcEQ7O1FBR0QsdUJBQU0sUUFBUSxHQUFHLEtBQUssR0FBRyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7UUFFL0MsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxRQUFRLEtBQUssQ0FBQyxJQUFJLFVBQVUsS0FBSyxDQUFDLElBQUksUUFBUSxHQUFHLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM3RixJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLFVBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDM0MsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsVUFBVSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7S0FDckQ7Ozs7OztJQUtELHdCQUF3QixDQUFDLEtBQWE7UUFFbEMsdUJBQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUM7O1FBRy9DLEVB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O29CQUN2QixPQUFPLEdBQUcsQ0FBQyxHQUFHLE9BQU8sRUFBRSxHQUFHLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLE1BQU0sRUFBRSxHQUFHLE1BQU0sQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUM7b0JBQ3BHLEtBQUssQ0FBQzthQUNiO1NBQ0o7UUFFRCxNQUFNLENBQUMsT0FBTyxDQUFDO0tBQ2xCOzs7WUFydUNKLFVBQVU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXd1Q1gsTUFBTSxDQUFDLHVCQUFNLGNBQWMsR0FBcUIsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcy9CZWhhdmlvclN1YmplY3QnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBkaXN0aW5jdFVudGlsQ2hhbmdlZCwgZmlsdGVyLCBtYXAsIHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzL1N1YmplY3QnO1xuaW1wb3J0IHsgdGljayB9IGZyb20gJy4uLy4uL2NvbW1vbi9pbmRleCc7XG5pbXBvcnQgeyBEYXNoYm9hcmRPcHRpb25zIH0gZnJvbSAnLi9kYXNoYm9hcmQuY29tcG9uZW50JztcbmltcG9ydCB7IERhc2hib2FyZFdpZGdldENvbXBvbmVudCB9IGZyb20gJy4vd2lkZ2V0L2Rhc2hib2FyZC13aWRnZXQuY29tcG9uZW50JztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIERhc2hib2FyZFNlcnZpY2UgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuXG4gICAgcHJpdmF0ZSBfd2lkZ2V0T3JpZ2luOiB7IGNvbHVtbj86IG51bWJlciwgcm93PzogbnVtYmVyLCBjb2x1bW5TcGFuPzogbnVtYmVyLCByb3dTcGFuPzogbnVtYmVyIH07XG4gICAgcHJpdmF0ZSBfYWN0aW9uV2lkZ2V0OiBEYXNoYm9hcmRBY3Rpb247XG4gICAgcHJpdmF0ZSBfcm93SGVpZ2h0OiBudW1iZXIgPSAwO1xuICAgIHByaXZhdGUgX2NhY2hlOiBEYXNoYm9hcmRDYWNoZVtdO1xuICAgIHByaXZhdGUgX2V2ZW50OiBNb3VzZUV2ZW50O1xuXG4gICAgd2lkZ2V0cyQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PERhc2hib2FyZFdpZGdldENvbXBvbmVudFtdPihbXSk7XG4gICAgb3B0aW9ucyQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PERhc2hib2FyZE9wdGlvbnM+KGRlZmF1bHRPcHRpb25zKTtcbiAgICBkaW1lbnNpb25zJCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8RGFzaGJvYXJkRGltZW5zaW9ucz4oe30pO1xuICAgIGhlaWdodCQ6IE9ic2VydmFibGU8bnVtYmVyPiA9IHRoaXMuZGltZW5zaW9ucyQucGlwZSh0aWNrKCksIG1hcChkaW1lbnNpb25zID0+IGRpbWVuc2lvbnMuaGVpZ2h0KSwgZGlzdGluY3RVbnRpbENoYW5nZWQoKSk7XG4gICAgcGxhY2Vob2xkZXIkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxEYXNoYm9hcmRQbGFjZWhvbGRlcj4oeyB2aXNpYmxlOiBmYWxzZSwgeDogMCwgeTogMCwgd2lkdGg6IDAsIGhlaWdodDogMCB9KTtcbiAgICBsYXlvdXQkID0gbmV3IFN1YmplY3Q8RGFzaGJvYXJkTGF5b3V0RGF0YVtdPigpO1xuICAgIHN0YWNrZWQkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gICAgaXNEcmFnZ2luZyQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PERhc2hib2FyZFdpZGdldENvbXBvbmVudD4obnVsbCk7XG4gICAgaXNHcmFiYmluZyQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PERhc2hib2FyZFdpZGdldENvbXBvbmVudD4obnVsbCk7XG5cbiAgICBnZXQgb3B0aW9ucygpOiBEYXNoYm9hcmRPcHRpb25zIHtcbiAgICAgICAgcmV0dXJuIHRoaXMub3B0aW9ucyQuZ2V0VmFsdWUoKTtcbiAgICB9XG5cbiAgICBnZXQgd2lkZ2V0cygpOiBEYXNoYm9hcmRXaWRnZXRDb21wb25lbnRbXSB7XG4gICAgICAgIHJldHVybiB0aGlzLndpZGdldHMkLmdldFZhbHVlKCk7XG4gICAgfVxuXG4gICAgZ2V0IHN0YWNrZWQoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLnN0YWNrZWQkLmdldFZhbHVlKCk7XG4gICAgfVxuXG4gICAgZ2V0IGRpbWVuc2lvbnMoKTogRGFzaGJvYXJkRGltZW5zaW9ucyB7XG4gICAgICAgIHJldHVybiB0aGlzLmRpbWVuc2lvbnMkLmdldFZhbHVlKCk7XG4gICAgfVxuXG4gICAgZ2V0IGNvbHVtbldpZHRoKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLmRpbWVuc2lvbnMud2lkdGggLyB0aGlzLm9wdGlvbnMuY29sdW1ucztcbiAgICB9XG5cbiAgICAvKiogVW5zdWJzY3JpYmUgZnJvbSBhbGwgb2JzZXJ2YWJsZXMgb24gZGVzdHJveSAqL1xuICAgIHByaXZhdGUgX29uRGVzdHJveSA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5sYXlvdXQkLnBpcGUodGFrZVVudGlsKHRoaXMuX29uRGVzdHJveSkpLnN1YnNjcmliZSh0aGlzLnNldExheW91dERhdGEuYmluZCh0aGlzKSk7XG4gICAgICAgIHRoaXMuc3RhY2tlZCQucGlwZSh0YWtlVW50aWwodGhpcy5fb25EZXN0cm95KSwgZmlsdGVyKHN0YWNrZWQgPT4gc3RhY2tlZCA9PT0gdHJ1ZSkpLnN1YnNjcmliZSh0aGlzLnVwZGF0ZVdoZW5TdGFja2VkLmJpbmQodGhpcykpO1xuICAgICAgICB0aGlzLndpZGdldHMkLnBpcGUodGFrZVVudGlsKHRoaXMuX29uRGVzdHJveSksIHRpY2soKSkuc3Vic2NyaWJlKCgpID0+IHRoaXMucmVuZGVyRGFzaGJvYXJkKCkpO1xuICAgICAgICB0aGlzLmRpbWVuc2lvbnMkLnBpcGUodGFrZVVudGlsKHRoaXMuX29uRGVzdHJveSksIHRpY2soKSkuc3Vic2NyaWJlKCgpID0+IHRoaXMucmVuZGVyRGFzaGJvYXJkKCkpO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9vbkRlc3Ryb3kubmV4dCgpO1xuICAgICAgICB0aGlzLl9vbkRlc3Ryb3kuY29tcGxldGUoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBZGQgYSB3aWRnZXQgdG8gdGhlIGRhc2hib2FyZFxuICAgICAqIEBwYXJhbSB3aWRnZXQgVGhlIHdpZGdldCBjb21wb25lbnQgdG8gYWRkIHRvIHRoZSBkYXNoYm9hcmRcbiAgICAgKi9cbiAgICBhZGRXaWRnZXQod2lkZ2V0OiBEYXNoYm9hcmRXaWRnZXRDb21wb25lbnQpOiB2b2lkIHtcbiAgICAgICAgdGhpcy53aWRnZXRzJC5uZXh0KFsuLi50aGlzLndpZGdldHMkLmdldFZhbHVlKCksIHdpZGdldF0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlbW92ZSBhIHdpZGdldCBmcm9tIHRoZSBkYXNoYm9hcmRcbiAgICAgKiBAcGFyYW0gd2lkZ2V0IFRoZSB3aWRnZXQgdG8gcmVtb3ZlXG4gICAgICovXG4gICAgcmVtb3ZlV2lkZ2V0KHdpZGdldDogRGFzaGJvYXJkV2lkZ2V0Q29tcG9uZW50KTogdm9pZCB7XG4gICAgICAgIHRoaXMud2lkZ2V0cyQubmV4dCh0aGlzLndpZGdldHMkLmdldFZhbHVlKCkuZmlsdGVyKF93aWRnZXQgPT4gX3dpZGdldCAhPT0gd2lkZ2V0KSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSW5kaWNhdGUgdGhhdCB0aGUgZGFzaGJvYXJkIGVsZW1lbnQgaGFzIGJlZW4gcmVzaXplZFxuICAgICAqIEBwYXJhbSB3aWR0aCBUaGUgd2lkdGggb2YgdGhlIGRhc2hib2FyZCBlbGVtZW50IGluIHB4XG4gICAgICogQHBhcmFtIGhlaWdodCBUaGUgaGVpZ2h0IG9mIHRoZSBkYXNoYm9hcmQgZWxlbWVudCBpbiBweFxuICAgICAqL1xuICAgIHNldERpbWVuc2lvbnMod2lkdGg6IG51bWJlciA9IHRoaXMuZGltZW5zaW9ucy53aWR0aCwgaGVpZ2h0OiBudW1iZXIgPSB0aGlzLmRpbWVuc2lvbnMuaGVpZ2h0KTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmRpbWVuc2lvbnMud2lkdGggIT09IHdpZHRoIHx8IHRoaXMuZGltZW5zaW9ucy5oZWlnaHQgIT09IGhlaWdodCkge1xuICAgICAgICAgICAgdGhpcy5kaW1lbnNpb25zJC5uZXh0KHsgd2lkdGg6IHdpZHRoLCBoZWlnaHQ6IGhlaWdodCB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFByb2R1Y2UgYW4gb2JqZWN0IGNvbnRhaW5pbmcgYWxsIHRoZSByZXF1aXJlZCBsYXlvdXQgZGF0YS5cbiAgICAgKiBUaGlzIGNhbiBiZSB1c2VmdWwgZm9yIGV4cG9ydGluZy9zYXZpbmcgYSBsYXlvdXRcbiAgICAgKi9cbiAgICBnZXRMYXlvdXREYXRhKCk6IERhc2hib2FyZExheW91dERhdGFbXSB7XG4gICAgICAgIHJldHVybiB0aGlzLndpZGdldHMubWFwKHdpZGdldCA9PiB7XG4gICAgICAgICAgICByZXR1cm4geyBpZDogd2lkZ2V0LmlkLCBjb2w6IHdpZGdldC5nZXRDb2x1bW4oKSwgcm93OiB3aWRnZXQuZ2V0Um93KCksIGNvbFNwYW46IHdpZGdldC5nZXRDb2x1bW5TcGFuKCksIHJvd1NwYW46IHdpZGdldC5nZXRSb3dTcGFuKCkgfTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUG9zaXRpb24gd2lkZ2V0cyBwcm9ncmFtYXRpY2FsbHlcbiAgICAgKi9cbiAgICBzZXRMYXlvdXREYXRhKHdpZGdldHM6IERhc2hib2FyZExheW91dERhdGFbXSk6IHZvaWQge1xuXG4gICAgICAgIC8vIGl0ZXJhdGUgdGhyb3VnaCBlYWNoIHdpZGdldCBkYXRhIGFuZCBmaW5kIGEgbWF0Y2hcbiAgICAgICAgd2lkZ2V0cy5mb3JFYWNoKHdpZGdldCA9PiB7XG5cbiAgICAgICAgICAgIC8vIGZpbmQgdGhlIG1hdGNoaW5nIHdpZGdldFxuICAgICAgICAgICAgY29uc3QgdGFyZ2V0ID0gdGhpcy53aWRnZXRzLmZpbmQoX3dpZGdldCA9PiBfd2lkZ2V0LmlkID09PSB3aWRnZXQuaWQpO1xuXG4gICAgICAgICAgICBpZiAodGFyZ2V0KSB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0LnNldENvbHVtbih3aWRnZXQuY29sKTtcbiAgICAgICAgICAgICAgICB0YXJnZXQuc2V0Um93KHdpZGdldC5yb3cpO1xuICAgICAgICAgICAgICAgIHRhcmdldC5zZXRDb2x1bW5TcGFuKHdpZGdldC5jb2xTcGFuKTtcbiAgICAgICAgICAgICAgICB0YXJnZXQuc2V0Um93U3Bhbih3aWRnZXQucm93U3Bhbik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFVwZGF0ZSB0aGUgcG9zaXRpb25zIGFuZCBzaXplcyBvZiB0aGUgd2lkZ2V0c1xuICAgICAqL1xuICAgIHJlbmRlckRhc2hib2FyZCgpOiB2b2lkIHtcblxuICAgICAgICAvLyBnZXQgdGhlIGRpbWVuc2lvbnMgb2YgdGhlIGRhc2hib2FyZFxuICAgICAgICB0aGlzLl9yb3dIZWlnaHQgPSB0aGlzLm9wdGlvbnMucm93SGVpZ2h0IHx8IHRoaXMuY29sdW1uV2lkdGg7XG5cbiAgICAgICAgLy8gZW5zdXJlIHRoZSBjb2x1bW4gd2lkdGggaXMgbm90IGJlbG93IHRoZSBtaW4gd2lkdGhzXG4gICAgICAgIHRoaXMuc3RhY2tlZCQubmV4dCh0aGlzLmNvbHVtbldpZHRoIDwgdGhpcy5vcHRpb25zLm1pbldpZHRoKTtcblxuICAgICAgICAvLyBlbnN1cmUgdGhlIHJvdyBoZWlnaHQgaXMgbm90IGJlbG93IHRoZSBtaW4gd2lkdGhzXG4gICAgICAgIGlmICh0aGlzLl9yb3dIZWlnaHQgPCB0aGlzLm9wdGlvbnMubWluV2lkdGgpIHtcbiAgICAgICAgICAgIHRoaXMuX3Jvd0hlaWdodCA9IHRoaXMub3B0aW9ucy5taW5XaWR0aDtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2V0RGFzaGJvYXJkTGF5b3V0KCk7XG5cbiAgICAgICAgLy8gaXRlcmF0ZSB0aHJvdWdoIGVhY2ggd2lkZ2V0IGFuZCBzZXQgdGhlIHNpemUgLSBleGNlcHQgdGhlIG9uZSBiZWluZyByZXNpemVkXG4gICAgICAgIHRoaXMud2lkZ2V0cy5maWx0ZXIod2lkZ2V0ID0+ICF0aGlzLl9hY3Rpb25XaWRnZXQgfHwgd2lkZ2V0ICE9PSB0aGlzLl9hY3Rpb25XaWRnZXQud2lkZ2V0KVxuICAgICAgICAgICAgLmZvckVhY2god2lkZ2V0ID0+IHdpZGdldC5yZW5kZXIoKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRGV0ZXJtaW5lIHdoZXJlIHdpZGdldHMgc2hvdWxkIGJlIHBvc2l0aW9uZWQgYmFzZWQgb24gdGhlaXIgcG9zaXRpb25zLCB3aWR0aCBhbmQgdGhlIHNpemUgb2YgdGhlIGNvbnRhaW5lclxuICAgICAqL1xuICAgIHNldERhc2hib2FyZExheW91dCgpOiB2b2lkIHtcblxuICAgICAgICAvLyBmaW5kIGFueSB3aWRnZXRzIHRoYXQgZG8gbm90IGN1cnJlbnRseSBoYXZlIGEgcG9zaXRpb24gc2V0XG4gICAgICAgIHRoaXMud2lkZ2V0cy5maWx0ZXIod2lkZ2V0ID0+IHdpZGdldC5nZXRDb2x1bW4oKSA9PT0gdW5kZWZpbmVkIHx8IHdpZGdldC5nZXRSb3coKSA9PT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgLmZvckVhY2god2lkZ2V0ID0+IHRoaXMuc2V0V2lkZ2V0UG9zaXRpb24od2lkZ2V0KSk7XG5cbiAgICAgICAgdGhpcy5zZXREYXNoYm9hcmRIZWlnaHQoKTtcbiAgICB9XG5cbiAgICB1cGRhdGVXaGVuU3RhY2tlZCgpOiB2b2lkIHtcblxuICAgICAgICAvLyBpdGVyYXRlIHRocm91Z2ggZWFjaCB3aWRnZXQgc2V0IGl0J3Mgc3RhY2tlZCBzdGF0ZSBhbmRcbiAgICAgICAgdGhpcy5nZXRXaWRnZXRzQnlPcmRlcigpLmZvckVhY2goKHdpZGdldCwgaWR4KSA9PiB7XG4gICAgICAgICAgICB3aWRnZXQuc2V0Q29sdW1uKDApO1xuICAgICAgICAgICAgd2lkZ2V0LnNldFJvdyhpZHgpO1xuICAgICAgICB9KTtcblxuICAgIH1cblxuICAgIGdldFdpZGdldHNCeU9yZGVyKCk6IERhc2hib2FyZFdpZGdldENvbXBvbmVudFtdIHtcbiAgICAgICAgcmV0dXJuIHRoaXMud2lkZ2V0cy5zb3J0KCh3MSwgdzIpID0+IHtcblxuICAgICAgICAgICAgY29uc3QgdzFQb3NpdGlvbiA9IHcxLmdldENvbHVtbigpICsgKHcxLmdldFJvdygpICogdGhpcy5vcHRpb25zLmNvbHVtbnMpO1xuICAgICAgICAgICAgY29uc3QgdzJQb3NpdGlvbiA9IHcyLmdldENvbHVtbigpICsgKHcyLmdldFJvdygpICogdGhpcy5vcHRpb25zLmNvbHVtbnMpO1xuXG4gICAgICAgICAgICBpZiAodzFQb3NpdGlvbiA8IHcyUG9zaXRpb24pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gLTE7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh3MVBvc2l0aW9uID4gdzJQb3NpdGlvbikge1xuICAgICAgICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRmluZCBhIHBvc2l0aW9uIHRoYXQgYSB3aWRnZXQgY2FuIGZpdCBpbiB0aGUgZGFzaGJvYXJkXG4gICAgICogQHBhcmFtIHdpZGdldCBUaGUgd2lkZ2V0IHRvIHRyeSBhbmQgcG9zaXRpb25cbiAgICAgKi9cbiAgICBzZXRXaWRnZXRQb3NpdGlvbih3aWRnZXQ6IERhc2hib2FyZFdpZGdldENvbXBvbmVudCk6IHZvaWQge1xuXG4gICAgICAgIC8vIGZpbmQgYSBwb3NpdGlvbiBmb3IgdGhlIHdpZGdldFxuICAgICAgICBsZXQgcG9zaXRpb24gPSAwO1xuICAgICAgICBsZXQgc3VjY2VzcyA9IGZhbHNlO1xuXG4gICAgICAgIC8vIHJlcGVhdCB1bnRpbCBhIHNwYWNlIGlzIGZvdW5kXG4gICAgICAgIHdoaWxlICghc3VjY2Vzcykge1xuXG4gICAgICAgICAgICAvLyBnZXQgYSBwb3NpdGlvbiB0byB0cnlcbiAgICAgICAgICAgIGNvbnN0IGNvbHVtbiA9IHBvc2l0aW9uICUgdGhpcy5vcHRpb25zLmNvbHVtbnM7XG4gICAgICAgICAgICBjb25zdCByb3cgPSBNYXRoLmZsb29yKHBvc2l0aW9uIC8gdGhpcy5vcHRpb25zLmNvbHVtbnMpO1xuXG4gICAgICAgICAgICAvLyBjaGVjayB0aGUgY3VycmVudCBwb3NpdGlvblxuICAgICAgICAgICAgaWYgKHRoaXMuZ2V0UG9zaXRpb25BdmFpbGFibGUoY29sdW1uLCByb3csIHdpZGdldC5nZXRDb2x1bW5TcGFuKCksIHdpZGdldC5nZXRSb3dTcGFuKCkpKSB7XG4gICAgICAgICAgICAgICAgc3VjY2VzcyA9IHRydWU7XG4gICAgICAgICAgICAgICAgd2lkZ2V0LnNldENvbHVtbihjb2x1bW4pO1xuICAgICAgICAgICAgICAgIHdpZGdldC5zZXRSb3cocm93KTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChjb2x1bW4gPT09IDAgJiYgd2lkZ2V0LmNvbFNwYW4gPiB0aGlzLm9wdGlvbnMuY29sdW1ucykge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignRGFzaGJvYXJkIHdpZGdldHMgaGF2ZSBhIGNvbFNwYW4gZ3JlYXRlciB0aGFuIHRoZSBtYXggbnVtYmVyIG9mIGRhc2hib2FyZCBjb2x1bW5zIScpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBwb3NpdGlvbisrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2hlY2sgaWYgYSBwb3NpdGlvbiBpbiB0aGUgZGFzaGJvYXJkIGlzIHZhY2FudCBvciBub3RcbiAgICAgKi9cbiAgICBnZXRQb3NpdGlvbkF2YWlsYWJsZShjb2x1bW46IG51bWJlciwgcm93OiBudW1iZXIsIGNvbHVtblNwYW46IG51bWJlciwgcm93U3BhbjogbnVtYmVyLCBpZ25vcmVXaWRnZXQ/OiBEYXNoYm9hcmRXaWRnZXRDb21wb25lbnQpOiBib29sZWFuIHtcblxuICAgICAgICAvLyBnZXQgYSBsaXN0IG9mIGdyaWQgc3BhY2VzIHRoYXQgYXJlIHBvcHVsYXRlZFxuICAgICAgICBjb25zdCBzcGFjZXMgPSB0aGlzLmdldE9jY3VwaWVkU3BhY2VzKCk7XG5cbiAgICAgICAgLy8gY2hlY2sgaWYgdGhlIGJsb2NrIHdvdWxkIHN0aWxsIGJlIGluIGJvdW5kc1xuICAgICAgICBpZiAoY29sdW1uICsgY29sdW1uU3BhbiA+IHRoaXMub3B0aW9ucy5jb2x1bW5zKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBjaGVjayBlYWNoIHJlcXVpcmVkIHBvc2l0aW9uXG4gICAgICAgIGZvciAobGV0IHggPSBjb2x1bW47IHggPCBjb2x1bW4gKyBjb2x1bW5TcGFuOyB4KyspIHtcbiAgICAgICAgICAgIGZvciAobGV0IHkgPSByb3c7IHkgPCByb3cgKyByb3dTcGFuOyB5KyspIHtcbiAgICAgICAgICAgICAgICBpZiAoc3BhY2VzLmZpbmQoYmxvY2sgPT4gYmxvY2suY29sdW1uID09PSB4ICYmIGJsb2NrLnJvdyA9PT0geSAmJiBibG9jay53aWRnZXQgIT09IGlnbm9yZVdpZGdldCkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIGdldE9jY3VwaWVkU3BhY2VzKCk6IERhc2hib2FyZFNwYWNlW10ge1xuXG4gICAgICAgIC8vIGZpbmQgYWxsIHNwYWNlcyB0aGF0IGFyZSBjdXJyZW50bHkgb2NjdXBpZWRcbiAgICAgICAgcmV0dXJuIHRoaXMud2lkZ2V0cy5maWx0ZXIod2lkZ2V0ID0+IHdpZGdldC5nZXRDb2x1bW4oKSAhPT0gdW5kZWZpbmVkICYmIHdpZGdldC5nZXRSb3coKSAhPT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgLnJlZHVjZSgodmFsdWUsIHdpZGdldCkgPT4ge1xuXG4gICAgICAgICAgICAgICAgdGhpcy5mb3JFYWNoQmxvY2sod2lkZ2V0LCAoY29sdW1uLCByb3cpID0+IHZhbHVlLnB1c2goeyB3aWRnZXQ6IHdpZGdldCwgY29sdW1uOiBjb2x1bW4sIHJvdzogcm93IH0pKTtcblxuICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgICAgIH0sIFtdKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBCZWdpbiByZXNpemluZyBhIHdpZGdldFxuICAgICAqIEBwYXJhbSBhY3Rpb24gVGhlIHRoZSB3aWRnZXQgdG8gcmVzaXplXG4gICAgICovXG4gICAgb25SZXNpemVTdGFydChhY3Rpb246IERhc2hib2FyZEFjdGlvbik6IHZvaWQge1xuXG4gICAgICAgIC8vIHN0b3JlIHRoZSBtb3VzZSBldmVudFxuICAgICAgICB0aGlzLl9ldmVudCA9IGFjdGlvbi5ldmVudDtcbiAgICAgICAgdGhpcy5fYWN0aW9uV2lkZ2V0ID0gYWN0aW9uO1xuXG4gICAgICAgIC8vIGJyaW5nIHRoZSB3aWRnZXQgdG8gdGhlIGZvbnRcbiAgICAgICAgdGhpcy5icmluZ1RvRnJvbnQoYWN0aW9uLndpZGdldCk7XG4gICAgfVxuXG4gICAgb25SZXNpemVEcmFnKGFjdGlvbjogRGFzaGJvYXJkQWN0aW9uKTogdm9pZCB7XG5cbiAgICAgICAgY29uc3QgbW91c2VQb3NYID0gdGhpcy5fZXZlbnQucGFnZVggLSBwYWdlWE9mZnNldDtcbiAgICAgICAgY29uc3QgbW91c2VQb3NZID0gdGhpcy5fZXZlbnQucGFnZVkgLSBwYWdlWU9mZnNldDtcblxuICAgICAgICAvLyBpZiB0aGVyZSB3YXMgbm8gbW92ZW1lbnQgdGhlbiBkbyBub3RoaW5nXG4gICAgICAgIGlmIChhY3Rpb24uZXZlbnQueCA9PT0gbW91c2VQb3NYICYmIGFjdGlvbi5ldmVudC55ID09PSBtb3VzZVBvc1kpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHVwZGF0ZSB0aGUgc3RvcmVkIG1vdXNlIGV2ZW50XG4gICAgICAgIHRoaXMuX2V2ZW50ID0gYWN0aW9uLmV2ZW50O1xuXG4gICAgICAgIC8vIGdldCBoYW5kbGUgZm9yIGRpcmVjdGlvblxuICAgICAgICBjb25zdCB7IGhhbmRsZSB9ID0gYWN0aW9uO1xuXG4gICAgICAgIC8vIGdldCB0aGUgYm91bmRzIG9mIHRoZSBoYW5kbGVcbiAgICAgICAgY29uc3QgYm91bmRzID0gaGFuZGxlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXG4gICAgICAgIC8vIGdldCB0aGUgY2VudGVyIG9mIHRoZSBoYW5kbGVcbiAgICAgICAgY29uc3QgY2VudGVyWCA9IGJvdW5kcy5sZWZ0ICsgKGJvdW5kcy53aWR0aCAvIDIpO1xuICAgICAgICBjb25zdCBjZW50ZXJZID0gYm91bmRzLnRvcCArIChib3VuZHMuaGVpZ2h0IC8gMik7XG5cbiAgICAgICAgLy8gZ2V0IHRoZSBjdXJyZW50IG1vdXNlIHBvc2l0aW9uXG4gICAgICAgIGNvbnN0IG1vdXNlWCA9IG1vdXNlUG9zWCAtIGNlbnRlclg7XG4gICAgICAgIGNvbnN0IG1vdXNlWSA9IG1vdXNlUG9zWSAtIGNlbnRlclk7XG5cbiAgICAgICAgLy8gc3RvcmUgdGhlIG5ldyBwcm9wb3NlZCBkaW1lbnNpb25zIGZvciB0aGUgd2lkZ2V0XG4gICAgICAgIGNvbnN0IGRpbWVuc2lvbnM6IERhc2hib2FyZFdpZGdldERpbWVuc2lvbnMgPSB7XG4gICAgICAgICAgICB4OiBhY3Rpb24ud2lkZ2V0LngsXG4gICAgICAgICAgICB5OiBhY3Rpb24ud2lkZ2V0LnksXG4gICAgICAgICAgICB3aWR0aDogYWN0aW9uLndpZGdldC53aWR0aCxcbiAgICAgICAgICAgIGhlaWdodDogYWN0aW9uLndpZGdldC5oZWlnaHRcbiAgICAgICAgfTtcblxuICAgICAgICAvLyB1cGRhdGUgd2lkZ2V0IGJhc2VkIG9uIHRoZSBoYW5kbGUgYmVpbmcgZHJhZ2dlZFxuICAgICAgICBzd2l0Y2ggKGFjdGlvbi5kaXJlY3Rpb24pIHtcblxuICAgICAgICAgICAgY2FzZSBBY3Rpb25EaXJlY3Rpb24uUmlnaHQ6XG4gICAgICAgICAgICAgICAgZGltZW5zaW9ucy53aWR0aCArPSBtb3VzZVg7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgQWN0aW9uRGlyZWN0aW9uLkxlZnQ6XG4gICAgICAgICAgICAgICAgZGltZW5zaW9ucy54ICs9IG1vdXNlWDtcbiAgICAgICAgICAgICAgICBkaW1lbnNpb25zLndpZHRoIC09IG1vdXNlWDtcblxuICAgICAgICAgICAgICAgIGlmIChkaW1lbnNpb25zLndpZHRoIDwgdGhpcy5vcHRpb25zLm1pbldpZHRoKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGRpZmZlcmVuY2UgPSB0aGlzLm9wdGlvbnMubWluV2lkdGggLSBkaW1lbnNpb25zLndpZHRoO1xuICAgICAgICAgICAgICAgICAgICBkaW1lbnNpb25zLnggLT0gZGlmZmVyZW5jZTtcbiAgICAgICAgICAgICAgICAgICAgZGltZW5zaW9ucy53aWR0aCArPSBkaWZmZXJlbmNlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIEFjdGlvbkRpcmVjdGlvbi5Cb3R0b206XG4gICAgICAgICAgICAgICAgZGltZW5zaW9ucy5oZWlnaHQgKz0gbW91c2VZO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIEFjdGlvbkRpcmVjdGlvbi5Ub3A6XG4gICAgICAgICAgICAgICAgZGltZW5zaW9ucy55ICs9IG1vdXNlWTtcbiAgICAgICAgICAgICAgICBkaW1lbnNpb25zLmhlaWdodCAtPSBtb3VzZVk7XG5cbiAgICAgICAgICAgICAgICBpZiAoZGltZW5zaW9ucy5oZWlnaHQgPCB0aGlzLm9wdGlvbnMubWluSGVpZ2h0KSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGRpZmZlcmVuY2UgPSB0aGlzLm9wdGlvbnMubWluSGVpZ2h0IC0gZGltZW5zaW9ucy5oZWlnaHQ7XG4gICAgICAgICAgICAgICAgICAgIGRpbWVuc2lvbnMueSAtPSBkaWZmZXJlbmNlO1xuICAgICAgICAgICAgICAgICAgICBkaW1lbnNpb25zLmhlaWdodCArPSBkaWZmZXJlbmNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgLy8gU3VwcG9ydCByZXNpemluZyBvbiBtdWx0aXBsZSBheGlzIHNpbXVsdGFuZW91c2x5XG4gICAgICAgICAgICBjYXNlIEFjdGlvbkRpcmVjdGlvbi5Ub3BMZWZ0OlxuXG4gICAgICAgICAgICAgICAgZGltZW5zaW9ucy54ICs9IG1vdXNlWDtcbiAgICAgICAgICAgICAgICBkaW1lbnNpb25zLndpZHRoIC09IG1vdXNlWDtcblxuICAgICAgICAgICAgICAgIGlmIChkaW1lbnNpb25zLndpZHRoIDwgdGhpcy5vcHRpb25zLm1pbldpZHRoKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGRpZmZlcmVuY2UgPSB0aGlzLm9wdGlvbnMubWluV2lkdGggLSBkaW1lbnNpb25zLndpZHRoO1xuICAgICAgICAgICAgICAgICAgICBkaW1lbnNpb25zLnggLT0gZGlmZmVyZW5jZTtcbiAgICAgICAgICAgICAgICAgICAgZGltZW5zaW9ucy53aWR0aCArPSBkaWZmZXJlbmNlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGRpbWVuc2lvbnMueSArPSBtb3VzZVk7XG4gICAgICAgICAgICAgICAgZGltZW5zaW9ucy5oZWlnaHQgLT0gbW91c2VZO1xuXG4gICAgICAgICAgICAgICAgaWYgKGRpbWVuc2lvbnMuaGVpZ2h0IDwgdGhpcy5vcHRpb25zLm1pbkhlaWdodCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBkaWZmZXJlbmNlID0gdGhpcy5vcHRpb25zLm1pbkhlaWdodCAtIGRpbWVuc2lvbnMuaGVpZ2h0O1xuICAgICAgICAgICAgICAgICAgICBkaW1lbnNpb25zLnkgLT0gZGlmZmVyZW5jZTtcbiAgICAgICAgICAgICAgICAgICAgZGltZW5zaW9ucy5oZWlnaHQgKz0gZGlmZmVyZW5jZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgQWN0aW9uRGlyZWN0aW9uLlRvcFJpZ2h0OlxuICAgICAgICAgICAgICAgIGRpbWVuc2lvbnMud2lkdGggKz0gbW91c2VYO1xuICAgICAgICAgICAgICAgIGRpbWVuc2lvbnMueSArPSBtb3VzZVk7XG4gICAgICAgICAgICAgICAgZGltZW5zaW9ucy5oZWlnaHQgLT0gbW91c2VZO1xuXG4gICAgICAgICAgICAgICAgaWYgKGRpbWVuc2lvbnMuaGVpZ2h0IDwgdGhpcy5vcHRpb25zLm1pbkhlaWdodCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBkaWZmZXJlbmNlID0gdGhpcy5vcHRpb25zLm1pbkhlaWdodCAtIGRpbWVuc2lvbnMuaGVpZ2h0O1xuICAgICAgICAgICAgICAgICAgICBkaW1lbnNpb25zLnkgLT0gZGlmZmVyZW5jZTtcbiAgICAgICAgICAgICAgICAgICAgZGltZW5zaW9ucy5oZWlnaHQgKz0gZGlmZmVyZW5jZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgQWN0aW9uRGlyZWN0aW9uLkJvdHRvbUxlZnQ6XG4gICAgICAgICAgICAgICAgZGltZW5zaW9ucy5oZWlnaHQgKz0gbW91c2VZO1xuICAgICAgICAgICAgICAgIGRpbWVuc2lvbnMueCArPSBtb3VzZVg7XG4gICAgICAgICAgICAgICAgZGltZW5zaW9ucy53aWR0aCAtPSBtb3VzZVg7XG5cbiAgICAgICAgICAgICAgICBpZiAoZGltZW5zaW9ucy53aWR0aCA8IHRoaXMub3B0aW9ucy5taW5XaWR0aCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBkaWZmZXJlbmNlID0gdGhpcy5vcHRpb25zLm1pbldpZHRoIC0gZGltZW5zaW9ucy53aWR0aDtcbiAgICAgICAgICAgICAgICAgICAgZGltZW5zaW9ucy54IC09IGRpZmZlcmVuY2U7XG4gICAgICAgICAgICAgICAgICAgIGRpbWVuc2lvbnMud2lkdGggKz0gZGlmZmVyZW5jZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgQWN0aW9uRGlyZWN0aW9uLkJvdHRvbVJpZ2h0OlxuICAgICAgICAgICAgICAgIGRpbWVuc2lvbnMuaGVpZ2h0ICs9IG1vdXNlWTtcbiAgICAgICAgICAgICAgICBkaW1lbnNpb25zLndpZHRoICs9IG1vdXNlWDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGN1cnJlbnRXaWR0aCA9IGFjdGlvbi53aWRnZXQueCArIGFjdGlvbi53aWRnZXQud2lkdGg7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRIZWlnaHQgPSBhY3Rpb24ud2lkZ2V0LnkgKyBhY3Rpb24ud2lkZ2V0LmhlaWdodDtcblxuICAgICAgICAvLyBlbnN1cmUgdmFsdWVzIGFyZSB3aXRoaW4gdGhlIGRhc2hib2FyZCBib3VuZHNcbiAgICAgICAgaWYgKGRpbWVuc2lvbnMueCA8IDApIHtcbiAgICAgICAgICAgIGRpbWVuc2lvbnMueCA9IDA7XG4gICAgICAgICAgICBkaW1lbnNpb25zLndpZHRoID0gY3VycmVudFdpZHRoO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGRpbWVuc2lvbnMueSA8IDApIHtcbiAgICAgICAgICAgIGRpbWVuc2lvbnMueSA9IDA7XG4gICAgICAgICAgICBkaW1lbnNpb25zLmhlaWdodCA9IGN1cnJlbnRIZWlnaHQ7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoKGRpbWVuc2lvbnMueCArIGRpbWVuc2lvbnMud2lkdGgpID4gdGhpcy5kaW1lbnNpb25zLndpZHRoKSB7XG4gICAgICAgICAgICBkaW1lbnNpb25zLndpZHRoID0gdGhpcy5kaW1lbnNpb25zLndpZHRoIC0gZGltZW5zaW9ucy54O1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gaWYgdGhlIHByb3Bvc2VkIHdpZHRoIGlzIHNtYWxsZXIgdGhhbiBhbGxvd2VkIHRoZW4gcmVzZXQgd2lkdGggdG8gbWluaW11bSBhbmQgaWdub3JlIHggY2hhbmdlc1xuICAgICAgICBpZiAoZGltZW5zaW9ucy53aWR0aCA8IHRoaXMub3B0aW9ucy5taW5XaWR0aCkge1xuICAgICAgICAgICAgZGltZW5zaW9ucy54ID0gYWN0aW9uLndpZGdldC54O1xuICAgICAgICAgICAgZGltZW5zaW9ucy53aWR0aCA9IHRoaXMub3B0aW9ucy5taW5XaWR0aDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGlmIHRoZSBwcm9wb3NlZCBoZWlnaHQgaXMgc21hbGxlciB0aGFuIGFsbG93ZWQgdGhlbiByZXNldCBoZWlnaHQgdG8gbWluaW11bSBhbmQgaWdub3JlIHkgY2hhbmdlc1xuICAgICAgICBpZiAoZGltZW5zaW9ucy5oZWlnaHQgPCB0aGlzLm9wdGlvbnMubWluSGVpZ2h0KSB7XG4gICAgICAgICAgICBkaW1lbnNpb25zLnkgPSBhY3Rpb24ud2lkZ2V0Lnk7XG4gICAgICAgICAgICBkaW1lbnNpb25zLmhlaWdodCA9IHRoaXMub3B0aW9ucy5taW5IZWlnaHQ7XG4gICAgICAgIH1cblxuICAgICAgICAvLyB1cGRhdGUgdGhlIHdpZGdldCBhY3R1YWwgdmFsdWVzXG4gICAgICAgIGFjdGlvbi53aWRnZXQuc2V0Qm91bmRzKGRpbWVuc2lvbnMueCwgZGltZW5zaW9ucy55LCBkaW1lbnNpb25zLndpZHRoLCBkaW1lbnNpb25zLmhlaWdodCk7XG5cbiAgICAgICAgLy8gdXBkYXRlIHBsYWNlaG9sZGVyIHBvc2l0aW9uIGFuZCB2YWx1ZVxuICAgICAgICB0aGlzLnNldFBsYWNlaG9sZGVyQm91bmRzKHRydWUsIGRpbWVuc2lvbnMueCwgZGltZW5zaW9ucy55LCBkaW1lbnNpb25zLndpZHRoLCBkaW1lbnNpb25zLmhlaWdodCk7XG5cbiAgICAgICAgLy8gc2hvdyB0aGUgd2lkZ2V0IHBvc2l0aW9ucyBpZiB0aGUgY3VycmVudCBwb3NpdGlvbnMgYW5kIHNpemVzIHdlcmUgdG8gcGVyc2lzdFxuICAgICAgICB0aGlzLnVwZGF0ZVdpZGdldFBvc2l0aW9ucyhhY3Rpb24ud2lkZ2V0KTtcbiAgICB9XG5cbiAgICBvblJlc2l6ZUVuZCgpOiB2b2lkIHtcblxuICAgICAgICBjb25zdCBwbGFjZWhvbGRlciA9IHRoaXMucGxhY2Vob2xkZXIkLmdldFZhbHVlKCk7XG5cbiAgICAgICAgLy8gY29tbWl0IHJlc2l6ZSBjaGFuZ2VzXG4gICAgICAgIHRoaXMuY29tbWl0V2lkZ2V0Q2hhbmdlcygpO1xuXG4gICAgICAgIC8vIGhpZGUgcGxhY2Vob2xkZXJcbiAgICAgICAgcGxhY2Vob2xkZXIudmlzaWJsZSA9IGZhbHNlO1xuXG4gICAgICAgIC8vIHVwZGF0ZSB0aGUgcGxhY2Vob2xkZXJcbiAgICAgICAgdGhpcy5wbGFjZWhvbGRlciQubmV4dChwbGFjZWhvbGRlcik7XG5cbiAgICAgICAgdGhpcy5fYWN0aW9uV2lkZ2V0ID0gbnVsbDtcbiAgICAgICAgdGhpcy5fZXZlbnQgPSBudWxsO1xuXG4gICAgICAgIC8vIGVuc3VyZSBhbnkgdmFjYW50IHVwcGVyIHNwYWNlcyBhcmUgZmlsbGVkIHdoZXJlIHJlcXVpcmVkXG4gICAgICAgIHRoaXMuc2hpZnRXaWRnZXRzVXAoKTtcblxuICAgICAgICAvLyB1cGRhdGUgZGFzaGJvYXJkIGhlaWdodFxuICAgICAgICB0aGlzLnNldERhc2hib2FyZEhlaWdodCgpO1xuXG4gICAgICAgIC8vIGVtaXQgaW5mb3JtYXRpb24gYWJvdXQgdGhlIGxheW91dFxuICAgICAgICB0aGlzLmxheW91dCQubmV4dCh0aGlzLmdldExheW91dERhdGEoKSk7XG4gICAgfVxuXG4gICAgb25EcmFnU3RhcnQoYWN0aW9uOiBEYXNoYm9hcmRBY3Rpb24pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5vblJlc2l6ZVN0YXJ0KGFjdGlvbik7XG5cbiAgICAgICAgLy8gc3RvcmUgdGhlIHN0YXJ0aW5nIHBsYWNlaG9sZGVyIHBvc2l0aW9uXG4gICAgICAgIHRoaXMuc2V0V2lkZ2V0T3JpZ2luKCk7XG5cbiAgICAgICAgdGhpcy5jYWNoZVdpZGdldHMoKTtcblxuICAgICAgICAvLyBlbWl0IHRoZSB3aWRnZXQgd2UgYXJlIGRyYWdnaW5nXG4gICAgICAgIHRoaXMuaXNEcmFnZ2luZyQubmV4dChhY3Rpb24ud2lkZ2V0KTtcbiAgICB9XG5cbiAgICBvbkRyYWdFbmQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMub25SZXNpemVFbmQoKTtcblxuICAgICAgICB0aGlzLl93aWRnZXRPcmlnaW4gPSB7fTtcblxuICAgICAgICB0aGlzLmlzRHJhZ2dpbmckLm5leHQobnVsbCk7XG4gICAgfVxuXG4gICAgb25EcmFnKGFjdGlvbjogRGFzaGJvYXJkQWN0aW9uKTogdm9pZCB7XG5cbiAgICAgICAgLy8gaWYgdGhlcmUgd2FzIG5vIG1vdmVtZW50IHRoZW4gZG8gbm90aGluZ1xuICAgICAgICBpZiAoYWN0aW9uLmV2ZW50LnBhZ2VYID09PSB0aGlzLl9ldmVudC5wYWdlWCAmJiBhY3Rpb24uZXZlbnQucGFnZVkgPT09IHRoaXMuX2V2ZW50LnBhZ2VZKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyBnZXQgdGhlIGN1cnJlbnQgbW91c2UgcG9zaXRpb25cbiAgICAgICAgY29uc3QgbW91c2VYID0gYWN0aW9uLmV2ZW50LnBhZ2VYIC0gdGhpcy5fZXZlbnQucGFnZVg7XG4gICAgICAgIGNvbnN0IG1vdXNlWSA9IGFjdGlvbi5ldmVudC5wYWdlWSAtIHRoaXMuX2V2ZW50LnBhZ2VZO1xuXG4gICAgICAgIC8vIHN0b3JlIHRoZSBsYXRlc3QgZXZlbnRcbiAgICAgICAgdGhpcy5fZXZlbnQgPSBhY3Rpb24uZXZlbnQ7XG5cbiAgICAgICAgY29uc3QgZGltZW5zaW9uczogRGFzaGJvYXJkV2lkZ2V0RGltZW5zaW9ucyA9IHtcbiAgICAgICAgICAgIHg6IGFjdGlvbi53aWRnZXQueCArIG1vdXNlWCxcbiAgICAgICAgICAgIHk6IGFjdGlvbi53aWRnZXQueSArIG1vdXNlWSxcbiAgICAgICAgICAgIHdpZHRoOiBhY3Rpb24ud2lkZ2V0LndpZHRoLFxuICAgICAgICAgICAgaGVpZ2h0OiBhY3Rpb24ud2lkZ2V0LmhlaWdodFxuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMucmVzdG9yZVdpZGdldHModHJ1ZSk7XG5cbiAgICAgICAgLy8gdXBkYXRlIHdpZGdldCBwb3NpdGlvblxuICAgICAgICBhY3Rpb24ud2lkZ2V0LnNldEJvdW5kcyhkaW1lbnNpb25zLngsIGRpbWVuc2lvbnMueSwgZGltZW5zaW9ucy53aWR0aCwgZGltZW5zaW9ucy5oZWlnaHQpO1xuXG4gICAgICAgIC8vIHVwZGF0ZSBwbGFjZWhvbGRlciBwb3NpdGlvbiBhbmQgdmFsdWVcbiAgICAgICAgdGhpcy5zZXRQbGFjZWhvbGRlckJvdW5kcyh0cnVlLCBkaW1lbnNpb25zLngsIGRpbWVuc2lvbnMueSwgZGltZW5zaW9ucy53aWR0aCwgZGltZW5zaW9ucy5oZWlnaHQpO1xuXG4gICAgICAgIC8vIHNob3cgdGhlIHdpZGdldCBwb3NpdGlvbnMgaWYgdGhlIGN1cnJlbnQgcG9zaXRpb25zIGFuZCBzaXplcyB3ZXJlIHRvIHBlcnNpc3RcbiAgICAgICAgdGhpcy5zaGlmdFdpZGdldHMoKTtcblxuICAgICAgICB0aGlzLnNldERhc2hib2FyZEhlaWdodCgpO1xuICAgIH1cblxuICAgIGdldFJvd0hlaWdodCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5fcm93SGVpZ2h0O1xuICAgIH1cblxuICAgIGNhY2hlV2lkZ2V0cygpOiBEYXNoYm9hcmRDYWNoZVtdIHtcbiAgICAgICAgdGhpcy5fY2FjaGUgPSB0aGlzLndpZGdldHMubWFwKHdpZGdldCA9PiAoe1xuICAgICAgICAgICAgaWQ6IHdpZGdldC5pZCxcbiAgICAgICAgICAgIGNvbHVtbjogd2lkZ2V0LmdldENvbHVtbigpLFxuICAgICAgICAgICAgcm93OiB3aWRnZXQuZ2V0Um93KCksXG4gICAgICAgICAgICBjb2x1bW5TcGFuOiB3aWRnZXQuZ2V0Q29sdW1uU3BhbigpLFxuICAgICAgICAgICAgcm93U3Bhbjogd2lkZ2V0LmdldFJvd1NwYW4oKSxcbiAgICAgICAgfSkpO1xuXG4gICAgICAgIC8vIHJldHVybiBhIG5ldyBhcnJheSBvZiB0aGUgY2FjaGUgZm9yIGN1c3RvbSBjYWNoaW5nXG4gICAgICAgIHJldHVybiBbLi4udGhpcy5fY2FjaGVdO1xuICAgIH1cblxuICAgIHJlc3RvcmVXaWRnZXRzKGlnbm9yZUFjdGlvbldpZGdldDogYm9vbGVhbiA9IGZhbHNlLCBjYWNoZTogRGFzaGJvYXJkQ2FjaGVbXSA9IHRoaXMuX2NhY2hlLCByZXN0b3JlU2l6ZTogYm9vbGVhbiA9IGZhbHNlKTogdm9pZCB7XG4gICAgICAgIGNhY2hlLmZpbHRlcih3aWRnZXQgPT4gIWlnbm9yZUFjdGlvbldpZGdldCB8fCB3aWRnZXQuaWQgIT09IHRoaXMuX2FjdGlvbldpZGdldC53aWRnZXQuaWQpLmZvckVhY2god2lkZ2V0ID0+IHtcblxuICAgICAgICAgICAgY29uc3QgbWF0Y2ggPSB0aGlzLndpZGdldHMuZmluZCh3Z3QgPT4gd2d0LmlkID09PSB3aWRnZXQuaWQpO1xuXG4gICAgICAgICAgICBpZiAobWF0Y2gpIHtcbiAgICAgICAgICAgICAgICBtYXRjaC5zZXRDb2x1bW4od2lkZ2V0LmNvbHVtbik7XG4gICAgICAgICAgICAgICAgbWF0Y2guc2V0Um93KHdpZGdldC5yb3cpO1xuXG4gICAgICAgICAgICAgICAgaWYgKHJlc3RvcmVTaXplKSB7XG4gICAgICAgICAgICAgICAgICAgIG1hdGNoLnNldENvbHVtblNwYW4od2lkZ2V0LmNvbHVtblNwYW4pO1xuICAgICAgICAgICAgICAgICAgICBtYXRjaC5zZXRSb3dTcGFuKHdpZGdldC5yb3dTcGFuKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFdoZW4gZHJhZ2dpbmcgYW55IHdpZGdldHMgdGhhdCBuZWVkIHRvIGJlIG1vdmVkIHNob3VsZCBiZSBtb3ZlZCB0byBhbiBhcHByb3ByaWF0ZSBwb3NpdGlvblxuICAgICAqL1xuICAgIHNoaWZ0V2lkZ2V0cygpOiB2b2lkIHtcblxuICAgICAgICBsZXQgd2lkZ2V0c1RvTW92ZTogRGFzaGJvYXJkV2lkZ2V0Q29tcG9uZW50W10gPSBbXTtcblxuICAgICAgICBjb25zdCBwbGFjZWhvbGRlciA9IHRoaXMucGxhY2Vob2xkZXIkLmdldFZhbHVlKCk7XG5cbiAgICAgICAgLy8gY2hlY2sgaWYgdGhlcmUgYXJlIGFueSB3aWRnZXRzIHVuZGVyIHRoZSBwbGFjZWhvbGRlclxuICAgICAgICBmb3IgKGxldCByb3cgPSBwbGFjZWhvbGRlci5yb3c7IHJvdyA8IHBsYWNlaG9sZGVyLnJvdyArIHBsYWNlaG9sZGVyLnJvd1NwYW47IHJvdysrKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBjb2x1bW4gPSBwbGFjZWhvbGRlci5jb2x1bW47IGNvbHVtbiA8IHBsYWNlaG9sZGVyLmNvbHVtbiArIHBsYWNlaG9sZGVyLmNvbHVtblNwYW47IGNvbHVtbisrKSB7XG5cbiAgICAgICAgICAgICAgICAvLyBzdG9yZSByZWZlcmVuY2UgdG8gYW55IHdpZGdldHMgdGhhdCBuZWVkIG1vdmVkXG4gICAgICAgICAgICAgICAgdGhpcy5nZXRPY2N1cGllZFNwYWNlcygpXG4gICAgICAgICAgICAgICAgICAgIC5maWx0ZXIoc3BhY2UgPT4gc3BhY2UuY29sdW1uID09PSBjb2x1bW4gJiYgc3BhY2Uucm93ID09PSByb3cgJiYgc3BhY2Uud2lkZ2V0ICE9PSB0aGlzLl9hY3Rpb25XaWRnZXQud2lkZ2V0KVxuICAgICAgICAgICAgICAgICAgICAuZm9yRWFjaChzcGFjZSA9PiB3aWRnZXRzVG9Nb3ZlLnB1c2goc3BhY2Uud2lkZ2V0KSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyByZW1vdmUgYW55IGR1cGxpY2F0ZXNcbiAgICAgICAgd2lkZ2V0c1RvTW92ZSA9IHdpZGdldHNUb01vdmUuZmlsdGVyKCh3aWRnZXQsIGlkeCwgYXJyYXkpID0+IGFycmF5LmluZGV4T2Yod2lkZ2V0KSA9PT0gaWR4KTtcblxuICAgICAgICAvLyBpZiBubyB3aWRnZXRzIG5lZWQgbW92ZWQgdGhlbiB3ZSBjYW4gc3RvcCBoZXJlXG4gICAgICAgIGlmICh3aWRnZXRzVG9Nb3ZlLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gY3JlYXRlIGEgZHVwbGljYXRlIHdlIGNhbiB1c2UgdG8ga2VlcCB0cmFjayBvZiB3aGljaCBoYXZlIGJlZW4gbW92ZWRcbiAgICAgICAgY29uc3QgdW5tb3ZlZFdpZGdldHMgPSB3aWRnZXRzVG9Nb3ZlLnNsaWNlKCk7XG5cbiAgICAgICAgLy8gYXR0ZW1wdCB0byBtb3ZlIGFueSB3aWRnZXRzIHRvIHRoZSBwcmV2aW91cyB3aWRnZXQgcG9zaXRpb25cbiAgICAgICAgd2lkZ2V0c1RvTW92ZS5mb3JFYWNoKHdpZGdldCA9PiB7XG5cbiAgICAgICAgICAgIC8vIGdldCBhIGdyaWQgb2ZmIGFsbCBvY2N1cGllZCBzcGFjZXMgLSB0YWtpbmcgaW50byBhY2NvdW50IHRoZSBwbGFjZWhvbGRlciBhbmQgaWdub3Jpbmcgd2lkZ2V0cyB0aGF0IG5lZWQgbW92ZWRcbiAgICAgICAgICAgIGNvbnN0IGdyaWQgPSB0aGlzLmdldE9jY3VwaWVkU3BhY2VzKCkuZmlsdGVyKHNwYWNlID0+ICF1bm1vdmVkV2lkZ2V0cy5maW5kKHdndCA9PiB3Z3QgPT09IHNwYWNlLndpZGdldCkpO1xuXG4gICAgICAgICAgICAvLyBpdGVyYXRlIGVhY2ggZnJlZSBibG9ja1xuICAgICAgICAgICAgZm9yIChsZXQgcm93ID0gdGhpcy5fd2lkZ2V0T3JpZ2luLnJvdzsgcm93IDwgdGhpcy5fd2lkZ2V0T3JpZ2luLnJvdyArIHRoaXMuX3dpZGdldE9yaWdpbi5yb3dTcGFuOyByb3crKykge1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGNvbHVtbiA9IHRoaXMuX3dpZGdldE9yaWdpbi5jb2x1bW47IGNvbHVtbiA8IHRoaXMuX3dpZGdldE9yaWdpbi5jb2x1bW4gKyB0aGlzLl93aWRnZXRPcmlnaW4uY29sdW1uU3BhbjsgY29sdW1uKyspIHtcblxuICAgICAgICAgICAgICAgICAgICAvLyBkZXRlcm1pbmUgaWYgdGhlIGJsb2NrIGNhbiBmaXQgaW4gdGhpcyBzcGFjZVxuICAgICAgICAgICAgICAgICAgICBjb25zdCByZXF1aXJlZFNwYWNlcyA9IHRoaXMuZ2V0UmVxdWlyZWRTcGFjZXNGcm9tUG9pbnQod2lkZ2V0LCBjb2x1bW4sIHJvdyk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gY2hlY2sgaWYgd2lkZ2V0IHdvdWxkIGZpdCBpbiBzcGFjZVxuICAgICAgICAgICAgICAgICAgICBjb25zdCBhdmFpbGFibGUgPSByZXF1aXJlZFNwYWNlcy5ldmVyeShzcGFjZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gIWdyaWQuZmluZChncmlkU3BhY2UgPT4gZ3JpZFNwYWNlLmNvbHVtbiA9PT0gc3BhY2UuY29sdW1uICYmIGdyaWRTcGFjZS5yb3cgPT09IHNwYWNlLnJvdykgJiYgc3BhY2UuY29sdW1uIDwgdGhpcy5nZXRDb2x1bW5Db3VudCgpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoYXZhaWxhYmxlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB3aWRnZXQuc2V0Q29sdW1uKGNvbHVtbik7XG4gICAgICAgICAgICAgICAgICAgICAgICB3aWRnZXQuc2V0Um93KHJvdyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB1bm1vdmVkV2lkZ2V0cy5zcGxpY2UodW5tb3ZlZFdpZGdldHMuZmluZEluZGV4KHdndCA9PiB3Z3QgPT09IHdpZGdldCksIDEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBpZiB3ZSBnZXQgdG8gaGVyZSB0aGVuIHdlIGNhbid0IHNpbXBseSBzd2FwIHRoZSBwb3NpdGlvbnMgLSBuZXh0IHRyeSBtb3ZpbmcgcmlnaHRcbiAgICAgICAgICAgIGlmICh0aGlzLmNhbldpZGdldE1vdmVSaWdodCh3aWRnZXQsIHRydWUpKSB7XG5cbiAgICAgICAgICAgICAgICAvLyBhZnRlciB0aGUgc2hpZnQgY2hlY2sgaWYgcGxhY2Vob2xkZXIgcG9zaXRpb24gaXMgc3RpbGwgdmFsaWRcbiAgICAgICAgICAgICAgICB0aGlzLnZhbGlkYXRlUGxhY2Vob2xkZXJQb3NpdGlvbihBY3Rpb25EaXJlY3Rpb24uUmlnaHQpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gbmV4dCB0cnkgbW92aW5nIGxlZnRcbiAgICAgICAgICAgIGlmICh0aGlzLmNhbldpZGdldE1vdmVMZWZ0KHdpZGdldCwgdHJ1ZSkpIHtcblxuICAgICAgICAgICAgICAgIC8vIGFmdGVyIHRoZSBzaGlmdCBjaGVjayBpZiBwbGFjZWhvbGRlciBwb3NpdGlvbiBpcyBzdGlsbCB2YWxpZFxuICAgICAgICAgICAgICAgIHRoaXMudmFsaWRhdGVQbGFjZWhvbGRlclBvc2l0aW9uKEFjdGlvbkRpcmVjdGlvbi5MZWZ0KTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGRldGVybWluZSB0aGUgZGlzdGFuY2UgdGhhdCB0aGUgd2lkZ2V0IG5lZWRzIHRvIGJlIG1vdmVkIGRvd25cbiAgICAgICAgICAgIGNvbnN0IGRpc3RhbmNlID0gKHRoaXMuX2FjdGlvbldpZGdldC53aWRnZXQuZ2V0Um93KCkgLSB3aWRnZXQuZ2V0Um93KCkpICsgdGhpcy5fYWN0aW9uV2lkZ2V0LndpZGdldC5nZXRSb3dTcGFuKCk7XG5cbiAgICAgICAgICAgIC8vIGFzIGEgbGFzdCByZXNvcnQgbW92ZSB0aGUgd2lkZ2V0IGRvd253YXJkc1xuICAgICAgICAgICAgdGhpcy5tb3ZlV2lkZ2V0RG93bih3aWRnZXQsIGRpc3RhbmNlKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWZ0ZXIgc2hpZnRzIGhhdmUgdGFrZW4gcGxhY2Ugd2Ugc2hvdWxkIHZlcmlmeSB0aGUgcGxhY2UgaG9sZGVyIHBvc2l0aW9uIGlzIHN0aWxsIHZhbGlkXG4gICAgICogQHBhcmFtIHNoaWZ0RGlyZWN0aW9uIC0gdGhlIHBvc2l0aW9uIHdpZGdldHMgd2VyZSBzaGlmdGVkXG4gICAgICovXG4gICAgdmFsaWRhdGVQbGFjZWhvbGRlclBvc2l0aW9uKHNoaWZ0RGlyZWN0aW9uOiBBY3Rpb25EaXJlY3Rpb24pIHtcblxuICAgICAgICBjb25zdCBwbGFjZWhvbGRlciA9IHRoaXMucGxhY2Vob2xkZXIkLmdldFZhbHVlKCk7XG5cbiAgICAgICAgLy8gY2hlY2sgaWYgdGhlIHBsYWNlaG9sZGVyIGlzIG92ZXIgYSB3aWRnZXRcbiAgICAgICAgaWYgKHRoaXMuZ2V0V2lkZ2V0c0F0UG9zaXRpb24ocGxhY2Vob2xkZXIuY29sdW1uLCBwbGFjZWhvbGRlci5yb3csIHRydWUpLmxlbmd0aCA+IDApIHtcblxuICAgICAgICAgICAgLy8gbW92ZSB0aGUgcGxhY2Vob2xkZXIgdGhlIG9wcG9zaXRlIGRpcmVjdGlvblxuICAgICAgICAgICAgc3dpdGNoIChzaGlmdERpcmVjdGlvbikge1xuXG4gICAgICAgICAgICAgICAgY2FzZSBBY3Rpb25EaXJlY3Rpb24uTGVmdDpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRQbGFjZWhvbGRlckJvdW5kcyhwbGFjZWhvbGRlci52aXNpYmxlLCBwbGFjZWhvbGRlci54ICsgdGhpcy5nZXRDb2x1bW5XaWR0aCgpLCBwbGFjZWhvbGRlci55LCBwbGFjZWhvbGRlci53aWR0aCwgcGxhY2Vob2xkZXIuaGVpZ2h0KTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlIEFjdGlvbkRpcmVjdGlvbi5SaWdodDpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRQbGFjZWhvbGRlckJvdW5kcyhwbGFjZWhvbGRlci52aXNpYmxlLCBwbGFjZWhvbGRlci54IC0gdGhpcy5nZXRDb2x1bW5XaWR0aCgpLCBwbGFjZWhvbGRlci55LCBwbGFjZWhvbGRlci53aWR0aCwgcGxhY2Vob2xkZXIuaGVpZ2h0KTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIHZhbGlkYXRlIHRoaXMgbmV3IHBvc2l0aW9uIGFnYWluXG4gICAgICAgICAgICB0aGlzLnZhbGlkYXRlUGxhY2Vob2xkZXJQb3NpdGlvbihzaGlmdERpcmVjdGlvbik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEZXRlcm1pbmUgaWYgYSB3aWRnZXQgY2FuIGJlIG1vdmVkIGxlZnQgLSBvciBpZiBpdCBjYW4gbW92ZSB0aGUgd2lkZ2V0cyB0byB0aGUgcmlnaHQgdG8gbWFrZSBzcGFjZSBmb3IgdGhlIHdpZGdldFxuICAgICAqL1xuICAgIGNhbldpZGdldE1vdmVMZWZ0KHdpZGdldDogRGFzaGJvYXJkV2lkZ2V0Q29tcG9uZW50LCBwZXJmb3JtTW92ZTogYm9vbGVhbiA9IGZhbHNlKTogYm9vbGVhbiB7XG5cbiAgICAgICAgLy8gY2hlY2sgaWYgdGhlIHdpZGdldCBpcyB0aGUgYWN0aW9uIHdpZGdldCBvciBvY2N1cGllcyB0aGUgZmlyc3QgY29sdW1uXG4gICAgICAgIGlmICh3aWRnZXQgPT09IHRoaXMuX2FjdGlvbldpZGdldC53aWRnZXQgfHwgd2lkZ2V0LmdldENvbHVtbigpID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBmaW5kIHRoZSBwb3NpdGlvbnMgcmVxdWlyZWRcbiAgICAgICAgY29uc3QgdGFyZ2V0U3BhY2VzID0gdGhpcy5nZXRPY2N1cGllZFNwYWNlcygpLmZpbHRlcihzcGFjZSA9PiBzcGFjZS53aWRnZXQgPT09IHdpZGdldCkubWFwKHNwYWNlID0+IHtcbiAgICAgICAgICAgIHJldHVybiB7IGNvbHVtbjogc3BhY2UuY29sdW1uIC0gd2lkZ2V0LmdldENvbHVtblNwYW4oKSwgcm93OiBzcGFjZS5yb3csIHdpZGdldDogc3BhY2Uud2lkZ2V0IH07XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIGNoZWNrIGlmIGFueSBvZiB0aGUgdGFyZ2V0IHNwYWNlcyBhcmUgb3V0IG9mIGJvdW5kc1xuICAgICAgICBpZiAodGFyZ2V0U3BhY2VzLmZpbmQoc3BhY2UgPT4gc3BhY2UuY29sdW1uIDwgMCkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGNoZWNrIGlmIHRoZXJlIGFyZSB3aWRnZXQgaW4gdGhlIHJlcXVpcmVkIHBvc2l0aW9ucyBhbmQgaWYgc28sIGNhbiB0aGV5IG1vdmUgcmlnaHQ/XG4gICAgICAgIGNvbnN0IG1vdmVhYmxlID0gdGFyZ2V0U3BhY2VzLmV2ZXJ5KHNwYWNlID0+IHRoaXMuZ2V0V2lkZ2V0c0F0UG9zaXRpb24oc3BhY2UuY29sdW1uLCBzcGFjZS5yb3cpLmZpbHRlcih3Z3QgPT4gd2d0ICE9PSBzcGFjZS53aWRnZXQpLmV2ZXJ5KHdndCA9PiB0aGlzLmNhbldpZGdldE1vdmVMZWZ0KHdndCkpKTtcblxuICAgICAgICBpZiAocGVyZm9ybU1vdmUgJiYgbW92ZWFibGUpIHtcblxuICAgICAgICAgICAgLy8gbW92ZSBhbGwgd2lkZ2V0cyB0byB0aGUgbGVmdFxuICAgICAgICAgICAgdGFyZ2V0U3BhY2VzLmZvckVhY2goc3BhY2UgPT4gdGhpcy5nZXRXaWRnZXRzQXRQb3NpdGlvbihzcGFjZS5jb2x1bW4sIHNwYWNlLnJvdykuZmlsdGVyKHdndCA9PiB3Z3QgIT09IHNwYWNlLndpZGdldCkuZm9yRWFjaCh3Z3QgPT4gdGhpcy5jYW5XaWRnZXRNb3ZlTGVmdCh3Z3QsIHRydWUpKSk7XG5cbiAgICAgICAgICAgIC8vIGZpbmQgdGhlIHRhcmdldCBjb2x1bW5cbiAgICAgICAgICAgIGNvbnN0IGNvbHVtbiA9IHRhcmdldFNwYWNlcy5yZWR1Y2UoKHRhcmdldCwgc3BhY2UpID0+IE1hdGgubWluKHRhcmdldCwgc3BhY2UuY29sdW1uKSwgSW5maW5pdHkpO1xuXG4gICAgICAgICAgICAvLyBtb3ZlIGN1cnJlbnQgd2lkZ2V0IHRvIHRoZSBsZWZ0XG4gICAgICAgICAgICBpZiAoY29sdW1uICE9PSBJbmZpbml0eSkge1xuICAgICAgICAgICAgICAgIHdpZGdldC5zZXRDb2x1bW4oY29sdW1uKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBtb3ZlYWJsZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEZXRlcm1pbmUgaWYgYSB3aWRnZXQgY2FuIGJlIG1vdmVkIHJpZ2h0IC0gb3IgaWYgaXQgY2FuIG1vdmUgdGhlIHdpZGdldHMgdG8gdGhlIHJpZ2h0IHRvIG1ha2Ugc3BhY2UgZm9yIHRoZSB3aWRnZXRcbiAgICAgKi9cbiAgICBjYW5XaWRnZXRNb3ZlUmlnaHQod2lkZ2V0OiBEYXNoYm9hcmRXaWRnZXRDb21wb25lbnQsIHBlcmZvcm1Nb3ZlOiBib29sZWFuID0gZmFsc2UpOiBib29sZWFuIHtcblxuICAgICAgICAvLyBjaGVjayBpZiB0aGUgd2lkZ2V0IGlzIHRoZSBkcmFnZ2luZyB3aWRnZXQgb3IgdGhlIHdpZGdldCBvY2N1cGllcyB0aGUgZmluYWwgY29sdW1uXG4gICAgICAgIGlmICh3aWRnZXQgPT09IHRoaXMuX2FjdGlvbldpZGdldC53aWRnZXQgfHwgd2lkZ2V0LmdldENvbHVtbigpICsgd2lkZ2V0LmdldENvbHVtblNwYW4oKSA9PT0gdGhpcy5vcHRpb25zLmNvbHVtbnMpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGZpbmQgdGhlIHBvc2l0aW9ucyByZXF1aXJlZFxuICAgICAgICBjb25zdCB0YXJnZXRTcGFjZXMgPSB0aGlzLmdldE9jY3VwaWVkU3BhY2VzKCkuZmlsdGVyKHNwYWNlID0+IHNwYWNlLndpZGdldCA9PT0gd2lkZ2V0KS5tYXAoc3BhY2UgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHsgY29sdW1uOiBzcGFjZS5jb2x1bW4gKyB3aWRnZXQuZ2V0Q29sdW1uU3BhbigpLCByb3c6IHNwYWNlLnJvdywgd2lkZ2V0OiBzcGFjZS53aWRnZXQgfTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gY2hlY2sgaWYgYW55IG9mIHRoZSB0YXJnZXQgc3BhY2VzIGFyZSBvdXQgb2YgYm91bmRzXG4gICAgICAgIGlmICh0YXJnZXRTcGFjZXMuZmluZChzcGFjZSA9PiBzcGFjZS5jb2x1bW4gPj0gdGhpcy5nZXRDb2x1bW5Db3VudCgpKSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gY2hlY2sgaWYgdGhlcmUgYXJlIHdpZGdldCBpbiB0aGUgcmVxdWlyZWQgcG9zaXRpb25zIGFuZCBpZiBzbywgY2FuIHRoZXkgbW92ZSByaWdodD9cbiAgICAgICAgY29uc3QgbW92ZWFibGUgPSB0YXJnZXRTcGFjZXMuZXZlcnkoc3BhY2UgPT4gdGhpcy5nZXRXaWRnZXRzQXRQb3NpdGlvbihzcGFjZS5jb2x1bW4sIHNwYWNlLnJvdylcbiAgICAgICAgICAgIC5maWx0ZXIod2d0ID0+IHdndCAhPT0gc3BhY2Uud2lkZ2V0KVxuICAgICAgICAgICAgLmV2ZXJ5KHdndCA9PiB0aGlzLmNhbldpZGdldE1vdmVSaWdodCh3Z3QpKVxuICAgICAgICApO1xuXG4gICAgICAgIGlmIChwZXJmb3JtTW92ZSAmJiBtb3ZlYWJsZSkge1xuICAgICAgICAgICAgLy8gbW92ZSBhbGwgd2lkZ2V0cyB0byB0aGUgcmlnaHRcbiAgICAgICAgICAgIHRhcmdldFNwYWNlcy5mb3JFYWNoKHNwYWNlID0+IHRoaXMuZ2V0V2lkZ2V0c0F0UG9zaXRpb24oc3BhY2UuY29sdW1uLCBzcGFjZS5yb3cpLmZpbHRlcih3Z3QgPT4gd2d0ICE9PSBzcGFjZS53aWRnZXQpLmZvckVhY2god2d0ID0+IHRoaXMuY2FuV2lkZ2V0TW92ZVJpZ2h0KHdndCwgdHJ1ZSkpKTtcblxuICAgICAgICAgICAgLy8gbW92ZSBjdXJyZW50IHdpZGdldCB0byB0aGUgcmlnaHRcbiAgICAgICAgICAgIHdpZGdldC5zZXRDb2x1bW4od2lkZ2V0LmdldENvbHVtbigpICsgMSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbW92ZWFibGU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU3RvcmUgdGhlIGluaXRpYWwgcG9zaXRpb24gb2YgdGhlIHdpZGdldCBiZWluZyBkcmFnZ2VkXG4gICAgICovXG4gICAgc2V0V2lkZ2V0T3JpZ2luKCk6IHZvaWQge1xuICAgICAgICB0aGlzLl93aWRnZXRPcmlnaW4gPSB7XG4gICAgICAgICAgICBjb2x1bW46IHRoaXMuX2FjdGlvbldpZGdldC53aWRnZXQuZ2V0Q29sdW1uKCksXG4gICAgICAgICAgICByb3c6IHRoaXMuX2FjdGlvbldpZGdldC53aWRnZXQuZ2V0Um93KCksXG4gICAgICAgICAgICBjb2x1bW5TcGFuOiB0aGlzLl9hY3Rpb25XaWRnZXQud2lkZ2V0LmdldENvbHVtblNwYW4oKSxcbiAgICAgICAgICAgIHJvd1NwYW46IHRoaXMuX2FjdGlvbldpZGdldC53aWRnZXQuZ2V0Um93U3BhbigpXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2FsY3VsYXRlIGFsbCB0aGUgcmVxdWlyZWQgcG9zaXRpb25zIGlzIGEgd2lkZ2V0IHdhcyB0byBiZSBwb3NpdGlvbmVkIGF0IGEgcGFydGljdWxhciBwb2ludFxuICAgICAqL1xuICAgIGdldFJlcXVpcmVkU3BhY2VzRnJvbVBvaW50KHdpZGdldDogRGFzaGJvYXJkV2lkZ2V0Q29tcG9uZW50LCBjb2x1bW46IG51bWJlciwgcm93OiBudW1iZXIpOiBEYXNoYm9hcmRTcGFjZVtdIHtcbiAgICAgICAgY29uc3Qgc3BhY2VzOiBEYXNoYm9hcmRTcGFjZVtdID0gW107XG5cbiAgICAgICAgZm9yIChsZXQgeSA9IHJvdzsgeSA8IHJvdyArIHdpZGdldC5nZXRSb3dTcGFuKCk7IHkrKykge1xuICAgICAgICAgICAgZm9yIChsZXQgeCA9IGNvbHVtbjsgeCA8IGNvbHVtbiArIHdpZGdldC5nZXRDb2x1bW5TcGFuKCk7IHgrKykge1xuICAgICAgICAgICAgICAgIHNwYWNlcy5wdXNoKHsgY29sdW1uOiB4LCByb3c6IHksIHdpZGdldDogd2lkZ2V0IH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHNwYWNlcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQb3NpdGlvbiB3aWRnZXRzIGJhc2VkIG9uIHRoZSBwb3NpdGlvbiBvZiB0aGUgcGxhY2Vob2xkZXIgLSB0aGlzIGlzIHRlbXBvcmFyeSB1bnRpbCBjb25maXJtZWRcbiAgICAgKi9cbiAgICB1cGRhdGVXaWRnZXRQb3NpdGlvbnMod2lkZ2V0OiBEYXNoYm9hcmRXaWRnZXRDb21wb25lbnQpIHtcblxuICAgICAgICBjb25zdCBwbGFjZWhvbGRlciA9IHRoaXMucGxhY2Vob2xkZXIkLmdldFZhbHVlKCk7XG5cbiAgICAgICAgLy8gY2hlY2sgYWxsIHNwYWNlcyB0aGUgcGxhY2Vob2xkZXIgd2lsbCBvY2N1cHkgYW5kIG1vdmUgYW55IHdpZGdldCBjdXJyZW50bHkgaW4gdGhlbSBkb3duXG4gICAgICAgIGZvciAobGV0IGNvbHVtbiA9IHBsYWNlaG9sZGVyLmNvbHVtbjsgY29sdW1uIDwgcGxhY2Vob2xkZXIuY29sdW1uICsgcGxhY2Vob2xkZXIuY29sdW1uU3BhbjsgY29sdW1uKyspIHtcbiAgICAgICAgICAgIGZvciAobGV0IHJvdyA9IHBsYWNlaG9sZGVyLnJvdzsgcm93IDwgcGxhY2Vob2xkZXIucm93ICsgcGxhY2Vob2xkZXIucm93U3Bhbjsgcm93KyspIHtcblxuICAgICAgICAgICAgICAgIHRoaXMuZ2V0V2lkZ2V0c0F0UG9zaXRpb24oY29sdW1uLCByb3csIHRydWUpXG4gICAgICAgICAgICAgICAgICAgIC5maWx0ZXIod2d0ID0+IHdndCAhPT0gd2lkZ2V0KVxuICAgICAgICAgICAgICAgICAgICAuZm9yRWFjaCh3Z3QgPT4gdGhpcy5tb3ZlV2lkZ2V0RG93bih3Z3QpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHVwZGF0ZSB0aGUgaGVpZ2h0IG9mIHRoZSBkYXNoYm9hcmRcbiAgICAgICAgdGhpcy5zZXREYXNoYm9hcmRIZWlnaHQoKTtcblxuICAgICAgICAvLyBpZiB3ZSBhcmVudCBkcmFnZ2luZyB0aGUgdG9wIGhhbmRsZSB0aGVuIGZpbGwgc3BhY2VzXG4gICAgICAgIGlmICh0aGlzLl9hY3Rpb25XaWRnZXQuZGlyZWN0aW9uICE9PSBBY3Rpb25EaXJlY3Rpb24uVG9wICYmXG4gICAgICAgICAgICB0aGlzLl9hY3Rpb25XaWRnZXQuZGlyZWN0aW9uICE9PSBBY3Rpb25EaXJlY3Rpb24uVG9wTGVmdCAmJlxuICAgICAgICAgICAgdGhpcy5fYWN0aW9uV2lkZ2V0LmRpcmVjdGlvbiAhPT0gQWN0aW9uRGlyZWN0aW9uLlRvcFJpZ2h0KSB7XG4gICAgICAgICAgICB0aGlzLnNoaWZ0V2lkZ2V0c1VwKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEZXRlcm1pbmUgaWYgYSB3aWRnZXQgaXMgb2NjdXB5aW5nIGEgc3BlY2lmaWMgcm93IGFuZCBjb2x1bW5cbiAgICAgKiBAcGFyYW0gY29sdW1uIFRoZSBjb2x1bW5zIHRvIGNoZWNrIGlmIG9jY3VwaWVkXG4gICAgICogQHBhcmFtIHJvdyBUaGUgcm93IHRvIGNoZWNrIGlmIG9jY3VwaWVkXG4gICAgICogQHBhcmFtIGlnbm9yZVJlc2l6aW5nIFdoZXRoZXIgb3Igbm90IHRvIGlnbm9yZSB0aGUgd2lkZ2V0IGN1cnJlbnRseSBiZWluZyByZXNpemVkXG4gICAgICovXG4gICAgZ2V0V2lkZ2V0c0F0UG9zaXRpb24oY29sdW1uOiBudW1iZXIsIHJvdzogbnVtYmVyLCBpZ25vcmVSZXNpemluZzogYm9vbGVhbiA9IGZhbHNlKTogRGFzaGJvYXJkV2lkZ2V0Q29tcG9uZW50W10ge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRPY2N1cGllZFNwYWNlcygpXG4gICAgICAgICAgICAuZmlsdGVyKHNwYWNlID0+IHNwYWNlLmNvbHVtbiA9PT0gY29sdW1uICYmIHNwYWNlLnJvdyA9PT0gcm93KVxuICAgICAgICAgICAgLmZpbHRlcihzcGFjZSA9PiB0aGlzLl9hY3Rpb25XaWRnZXQgJiYgc3BhY2Uud2lkZ2V0ICE9PSB0aGlzLl9hY3Rpb25XaWRnZXQud2lkZ2V0IHx8ICFpZ25vcmVSZXNpemluZylcbiAgICAgICAgICAgIC5tYXAoc3BhY2UgPT4gc3BhY2Uud2lkZ2V0KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBVcGRhdGUgdGhlIHBsYWNlaG9sZGVyIHZpc2liaWxpdHksIHBvc2l0aW9uIGFuZCBzaXplXG4gICAgICovXG4gICAgc2V0UGxhY2Vob2xkZXJCb3VuZHModmlzaWJsZTogYm9vbGVhbiwgeDogbnVtYmVyLCB5OiBudW1iZXIsIHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyKTogdm9pZCB7XG5cbiAgICAgICAgY29uc3QgcGxhY2Vob2xkZXIgPSB0aGlzLnBsYWNlaG9sZGVyJC5nZXRWYWx1ZSgpO1xuXG4gICAgICAgIHBsYWNlaG9sZGVyLnZpc2libGUgPSB2aXNpYmxlO1xuXG4gICAgICAgIHBsYWNlaG9sZGVyLmNvbHVtbiA9IHRoaXMuZ2V0UGxhY2Vob2xkZXJDb2x1bW4oeCwgd2lkdGgpO1xuICAgICAgICBwbGFjZWhvbGRlci5yb3cgPSB0aGlzLmdldFBsYWNlaG9sZGVyUm93KHksIGhlaWdodCk7XG4gICAgICAgIHBsYWNlaG9sZGVyLmNvbHVtblNwYW4gPSB0aGlzLmdldFBsYWNlaG9sZGVyQ29sdW1uU3Bhbih3aWR0aCk7XG4gICAgICAgIHBsYWNlaG9sZGVyLnJvd1NwYW4gPSB0aGlzLmdldFBsYWNlaG9sZGVyUm93U3BhbihoZWlnaHQpO1xuXG4gICAgICAgIC8vIGNhbGN1bGF0ZSB0aGUgbWF4aW11bSBudW1iZXIgb2Ygcm93c1xuICAgICAgICBjb25zdCByb3dDb3VudCA9IHRoaXMud2lkZ2V0cy5maWx0ZXIod2lkZ2V0ID0+IHdpZGdldCAhPT0gdGhpcy5fYWN0aW9uV2lkZ2V0LndpZGdldClcbiAgICAgICAgICAgIC5yZWR1Y2UoKHByZXZpb3VzLCB3aWRnZXQpID0+IE1hdGgubWF4KHdpZGdldC5nZXRSb3coKSArIHdpZGdldC5nZXRSb3dTcGFuKCksIHByZXZpb3VzKSwgMCk7XG5cbiAgICAgICAgLy8gY29uc3RyYWluIG1heGltdW0gcGxhY2Vob2xkZXIgcm93XG4gICAgICAgIHBsYWNlaG9sZGVyLnJvdyA9IE1hdGgubWluKHBsYWNlaG9sZGVyLnJvdywgcm93Q291bnQpO1xuXG4gICAgICAgIHBsYWNlaG9sZGVyLnggPSAocGxhY2Vob2xkZXIuY29sdW1uICogdGhpcy5nZXRDb2x1bW5XaWR0aCgpKSArIHRoaXMub3B0aW9ucy5wYWRkaW5nO1xuICAgICAgICBwbGFjZWhvbGRlci55ID0gKHBsYWNlaG9sZGVyLnJvdyAqIHRoaXMuX3Jvd0hlaWdodCkgKyB0aGlzLm9wdGlvbnMucGFkZGluZztcbiAgICAgICAgcGxhY2Vob2xkZXIud2lkdGggPSAocGxhY2Vob2xkZXIuY29sdW1uU3BhbiAqIHRoaXMuZ2V0Q29sdW1uV2lkdGgoKSkgLSAodGhpcy5vcHRpb25zLnBhZGRpbmcgKiAyKTtcbiAgICAgICAgcGxhY2Vob2xkZXIuaGVpZ2h0ID0gKHBsYWNlaG9sZGVyLnJvd1NwYW4gKiB0aGlzLl9yb3dIZWlnaHQpIC0gKHRoaXMub3B0aW9ucy5wYWRkaW5nICogMik7XG5cbiAgICAgICAgLy8gc2V0IHRoZSB2YWx1ZXMgb2YgdGhlIHdpZGdldCB0byBtYXRjaCB0aGUgdmFsdWVzIG9mIHRoZSBwbGFjZWhvbGRlciAtIGhvd2V2ZXIgZG8gbm90IHJlbmRlciB0aGUgY2hhbmdlc1xuICAgICAgICB0aGlzLl9hY3Rpb25XaWRnZXQud2lkZ2V0LnNldENvbHVtbihwbGFjZWhvbGRlci5jb2x1bW4sIGZhbHNlKTtcbiAgICAgICAgdGhpcy5fYWN0aW9uV2lkZ2V0LndpZGdldC5zZXRSb3cocGxhY2Vob2xkZXIucm93LCBmYWxzZSk7XG4gICAgICAgIHRoaXMuX2FjdGlvbldpZGdldC53aWRnZXQuc2V0Q29sdW1uU3BhbihwbGFjZWhvbGRlci5jb2x1bW5TcGFuLCBmYWxzZSk7XG4gICAgICAgIHRoaXMuX2FjdGlvbldpZGdldC53aWRnZXQuc2V0Um93U3BhbihwbGFjZWhvbGRlci5yb3dTcGFuLCBmYWxzZSk7XG5cbiAgICAgICAgLy8gdXBkYXRlIHRoZSBwbGFjZWhvbGRlclxuICAgICAgICB0aGlzLnBsYWNlaG9sZGVyJC5uZXh0KHBsYWNlaG9sZGVyKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIHBsYWNlaG9sZGVyIGNvbHVtbiBwb3NpdGlvblxuICAgICAqL1xuICAgIGdldFBsYWNlaG9sZGVyQ29sdW1uKHg6IG51bWJlciwgd2lkdGg6IG51bWJlcik6IG51bWJlciB7XG5cbiAgICAgICAgY29uc3QgY29sdW1uID0gdGhpcy5nZXRDb2x1bW5Gcm9tUHgoeCwgdGhpcy5fYWN0aW9uV2lkZ2V0LmRpcmVjdGlvbiA9PT0gQWN0aW9uRGlyZWN0aW9uLk1vdmUgPyBSb3VuZGluZy5Sb3VuZFVwT3ZlckhhbGYgOiBSb3VuZGluZy5Sb3VuZERvd24pO1xuICAgICAgICBjb25zdCBjb2x1bW5TcGFuID0gTWF0aC5mbG9vcih3aWR0aCAvIHRoaXMuZ2V0Q29sdW1uV2lkdGgoKSk7XG4gICAgICAgIGNvbnN0IHVwcGVyTGltaXQgPSB0aGlzLmdldENvbHVtbkNvdW50KCkgLSBjb2x1bW5TcGFuO1xuXG4gICAgICAgIC8vIGlmIHdlIGFyZW50IGRyYWdnaW5nIGxlZnQgdGhlbiBqdXN0IHJldHVybiB0aGUgY29sdW1uXG4gICAgICAgIGlmICh0aGlzLl9hY3Rpb25XaWRnZXQuZGlyZWN0aW9uICE9PSBBY3Rpb25EaXJlY3Rpb24uTGVmdCAmJlxuICAgICAgICAgICAgdGhpcy5fYWN0aW9uV2lkZ2V0LmRpcmVjdGlvbiAhPT0gQWN0aW9uRGlyZWN0aW9uLlRvcExlZnQgJiZcbiAgICAgICAgICAgIHRoaXMuX2FjdGlvbldpZGdldC5kaXJlY3Rpb24gIT09IEFjdGlvbkRpcmVjdGlvbi5Cb3R0b21MZWZ0KSB7XG4gICAgICAgICAgICByZXR1cm4gTWF0aC5tYXgoTWF0aC5taW4oY29sdW1uLCB1cHBlckxpbWl0KSwgMCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBnZXQgYW55IG92ZXJmbG93XG4gICAgICAgIGNvbnN0IG92ZXJmbG93ID0gd2lkdGggJSB0aGlzLmdldENvbHVtbldpZHRoKCk7XG5cbiAgICAgICAgcmV0dXJuICh4IDw9IDAgfHwgb3ZlcmZsb3cgPT09IDAgfHwgY29sdW1uU3BhbiA9PT0gMCB8fCBvdmVyZmxvdyA+ICh0aGlzLmdldENvbHVtbldpZHRoKCkgLyAyKSkgP1xuICAgICAgICAgICAgTWF0aC5tYXgoTWF0aC5taW4oY29sdW1uLCB1cHBlckxpbWl0KSwgMCkgOlxuICAgICAgICAgICAgTWF0aC5tYXgoTWF0aC5taW4oY29sdW1uICsgMSwgdXBwZXJMaW1pdCksIDApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgY29sdW1uIHNwYW4gb2YgdGhlIHBsYWNlaG9sZGVyXG4gICAgICovXG4gICAgZ2V0UGxhY2Vob2xkZXJDb2x1bW5TcGFuKHdpZHRoOiBudW1iZXIpOiBudW1iZXIge1xuXG4gICAgICAgIGNvbnN0IGNvbHVtblNwYW4gPSB0aGlzLmdldENvbHVtbkZyb21QeCh3aWR0aCk7XG5cbiAgICAgICAgLy8gaWYgd2UgYXJlbnQgZHJhZ2dpbmcgcmlnaHQgb3IgbGVmdCB0aGVuIGp1c3QgcmV0dXJuIHRoZSBjb2x1bW4gc3BhblxuICAgICAgICBpZiAodGhpcy5fYWN0aW9uV2lkZ2V0LmRpcmVjdGlvbiAhPT0gQWN0aW9uRGlyZWN0aW9uLlJpZ2h0ICYmXG4gICAgICAgICAgICB0aGlzLl9hY3Rpb25XaWRnZXQuZGlyZWN0aW9uICE9PSBBY3Rpb25EaXJlY3Rpb24uVG9wUmlnaHQgJiZcbiAgICAgICAgICAgIHRoaXMuX2FjdGlvbldpZGdldC5kaXJlY3Rpb24gIT09IEFjdGlvbkRpcmVjdGlvbi5Cb3R0b21SaWdodCAmJlxuICAgICAgICAgICAgdGhpcy5fYWN0aW9uV2lkZ2V0LmRpcmVjdGlvbiAhPT0gQWN0aW9uRGlyZWN0aW9uLkxlZnQgJiZcbiAgICAgICAgICAgIHRoaXMuX2FjdGlvbldpZGdldC5kaXJlY3Rpb24gIT09IEFjdGlvbkRpcmVjdGlvbi5Ub3BMZWZ0ICYmXG4gICAgICAgICAgICB0aGlzLl9hY3Rpb25XaWRnZXQuZGlyZWN0aW9uICE9PSBBY3Rpb25EaXJlY3Rpb24uQm90dG9tTGVmdCkge1xuICAgICAgICAgICAgcmV0dXJuIE1hdGgubWF4KGNvbHVtblNwYW4sIDEpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gZ2V0IHRoZSBjdXJyZW50IGNvbHVtbiBzcGFuIGFuZCBhbnkgb3ZlcmZsb3dcbiAgICAgICAgY29uc3Qgb3ZlcmZsb3cgPSB3aWR0aCAlIHRoaXMuZ2V0Q29sdW1uV2lkdGgoKTtcblxuICAgICAgICByZXR1cm4gKGNvbHVtblNwYW4gPiAwICYmIG92ZXJmbG93ID4gKHRoaXMuZ2V0Q29sdW1uV2lkdGgoKSAvIDIpKSA/IE1hdGgubWF4KGNvbHVtblNwYW4gKyAxLCAxKSA6IE1hdGgubWF4KGNvbHVtblNwYW4sIDEpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgcm93IHBvc2l0aW9uIG9mIHRoZSBwbGFjZWhvbGRlclxuICAgICAqL1xuICAgIGdldFBsYWNlaG9sZGVyUm93KHk6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIpOiBudW1iZXIge1xuXG4gICAgICAgIGNvbnN0IHJvdyA9IHRoaXMuZ2V0Um93RnJvbVB4KHksIHRoaXMuX2FjdGlvbldpZGdldC5kaXJlY3Rpb24gPT09IEFjdGlvbkRpcmVjdGlvbi5Nb3ZlID8gUm91bmRpbmcuUm91bmRVcE92ZXJIYWxmIDogUm91bmRpbmcuUm91bmREb3duKTtcbiAgICAgICAgY29uc3Qgcm93U3BhbiA9IE1hdGguY2VpbChoZWlnaHQgLyB0aGlzLl9yb3dIZWlnaHQpO1xuXG4gICAgICAgIC8vIGlmIHdlIGFyZW50IGRyYWdnaW5nIHVwIHRoZW4ganVzdCByZXR1cm4gdGhlIHJvd1xuICAgICAgICBpZiAodGhpcy5fYWN0aW9uV2lkZ2V0LmRpcmVjdGlvbiAhPT0gQWN0aW9uRGlyZWN0aW9uLlRvcCAmJlxuICAgICAgICAgICAgdGhpcy5fYWN0aW9uV2lkZ2V0LmRpcmVjdGlvbiAhPT0gQWN0aW9uRGlyZWN0aW9uLlRvcExlZnQgJiZcbiAgICAgICAgICAgIHRoaXMuX2FjdGlvbldpZGdldC5kaXJlY3Rpb24gIT09IEFjdGlvbkRpcmVjdGlvbi5Ub3BSaWdodCkge1xuICAgICAgICAgICAgcmV0dXJuIE1hdGgubWF4KHJvdywgMCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBnZXQgYW55IG92ZXJmbG93XG4gICAgICAgIGxldCBvdmVyZmxvdyA9IGhlaWdodCA8IHRoaXMuX3Jvd0hlaWdodCA/IDAgOiBoZWlnaHQgJSB0aGlzLl9yb3dIZWlnaHQ7XG5cbiAgICAgICAgcmV0dXJuICh5IDw9IDAgfHwgcm93U3BhbiA9PT0gMCB8fCBvdmVyZmxvdyA9PT0gMCB8fCBvdmVyZmxvdyA+ICh0aGlzLl9yb3dIZWlnaHQgLyAyKSkgPyBNYXRoLm1heChyb3csIDApIDogTWF0aC5tYXgocm93ICsgMSwgMCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IHRoZSByb3cgc3BhbiBvZiB0aGUgcGxhY2Vob2xkZXJcbiAgICAgKi9cbiAgICBnZXRQbGFjZWhvbGRlclJvd1NwYW4oaGVpZ2h0OiBudW1iZXIpOiBudW1iZXIge1xuXG4gICAgICAgIGNvbnN0IHJvd1NwYW4gPSB0aGlzLmdldFJvd0Zyb21QeChoZWlnaHQpO1xuXG4gICAgICAgIC8vIGlmIHdlIGFyZW50IGRyYWdnaW5nIHVwIG9yIGRvd24gdGhlbiBqdXN0IHJldHVybiB0aGUgY29sdW1uIHNwYW5cbiAgICAgICAgaWYgKHRoaXMuX2FjdGlvbldpZGdldC5kaXJlY3Rpb24gIT09IEFjdGlvbkRpcmVjdGlvbi5Ub3AgJiZcbiAgICAgICAgICAgIHRoaXMuX2FjdGlvbldpZGdldC5kaXJlY3Rpb24gIT09IEFjdGlvbkRpcmVjdGlvbi5Ub3BMZWZ0ICYmXG4gICAgICAgICAgICB0aGlzLl9hY3Rpb25XaWRnZXQuZGlyZWN0aW9uICE9PSBBY3Rpb25EaXJlY3Rpb24uVG9wUmlnaHQgJiZcbiAgICAgICAgICAgIHRoaXMuX2FjdGlvbldpZGdldC5kaXJlY3Rpb24gIT09IEFjdGlvbkRpcmVjdGlvbi5Cb3R0b20gJiZcbiAgICAgICAgICAgIHRoaXMuX2FjdGlvbldpZGdldC5kaXJlY3Rpb24gIT09IEFjdGlvbkRpcmVjdGlvbi5Cb3R0b21MZWZ0ICYmXG4gICAgICAgICAgICB0aGlzLl9hY3Rpb25XaWRnZXQuZGlyZWN0aW9uICE9PSBBY3Rpb25EaXJlY3Rpb24uQm90dG9tUmlnaHQpIHtcbiAgICAgICAgICAgIHJldHVybiBNYXRoLm1heChyb3dTcGFuLCAxKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGdldCB0aGUgY3VycmVudCBjb2x1bW4gc3BhbiBhbmQgYW55IG92ZXJmbG93XG4gICAgICAgIGNvbnN0IG92ZXJmbG93ID0gaGVpZ2h0ICUgdGhpcy5fcm93SGVpZ2h0O1xuXG4gICAgICAgIHJldHVybiAob3ZlcmZsb3cgPiAodGhpcy5fcm93SGVpZ2h0IC8gMikpID8gTWF0aC5tYXgocm93U3BhbiArIDEsIDEpIDogTWF0aC5tYXgocm93U3BhbiwgMSk7XG4gICAgfVxuXG4gICAgZ2V0Q29sdW1uRnJvbVB4KHg6IG51bWJlciwgcm91bmRpbmc6IFJvdW5kaW5nID0gUm91bmRpbmcuUm91bmREb3duKTogbnVtYmVyIHtcblxuICAgICAgICBjb25zdCBjb2x1bW4gPSBNYXRoLmZsb29yKHggLyBNYXRoLmZsb29yKHRoaXMuZ2V0Q29sdW1uV2lkdGgoKSkpO1xuICAgICAgICBjb25zdCBvdmVyZmxvdyA9ICh4ICUgTWF0aC5mbG9vcih0aGlzLmdldENvbHVtbldpZHRoKCkpKTtcbiAgICAgICAgY29uc3QgaGFsZiA9IHRoaXMuZ2V0Q29sdW1uV2lkdGgoKSAvIDI7XG5cbiAgICAgICAgc3dpdGNoIChyb3VuZGluZykge1xuXG4gICAgICAgICAgICBjYXNlIFJvdW5kaW5nLlJvdW5kRG93bjpcbiAgICAgICAgICAgICAgICByZXR1cm4gY29sdW1uO1xuXG4gICAgICAgICAgICBjYXNlIFJvdW5kaW5nLlJvdW5kRG93bkJlbG93SGFsZjpcbiAgICAgICAgICAgICAgICByZXR1cm4gb3ZlcmZsb3cgPCBoYWxmID8gY29sdW1uIDogY29sdW1uICsgMTtcblxuICAgICAgICAgICAgY2FzZSBSb3VuZGluZy5Sb3VuZFVwT3ZlckhhbGY6XG4gICAgICAgICAgICAgICAgcmV0dXJuIG92ZXJmbG93ID4gaGFsZiA/IGNvbHVtbiArIDEgOiBjb2x1bW47XG5cbiAgICAgICAgICAgIGNhc2UgUm91bmRpbmcuUm91bmRVcDpcbiAgICAgICAgICAgICAgICByZXR1cm4gb3ZlcmZsb3cgPiAwID8gY29sdW1uICsgMSA6IGNvbHVtbjtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgZ2V0Um93RnJvbVB4KHk6IG51bWJlciwgcm91bmRpbmc6IFJvdW5kaW5nID0gUm91bmRpbmcuUm91bmREb3duKTogbnVtYmVyIHtcblxuICAgICAgICBjb25zdCByb3cgPSBNYXRoLmZsb29yKHkgLyBNYXRoLmZsb29yKHRoaXMuX3Jvd0hlaWdodCkpO1xuICAgICAgICBjb25zdCBvdmVyZmxvdyA9ICh5ICUgTWF0aC5mbG9vcih0aGlzLl9yb3dIZWlnaHQpKTtcbiAgICAgICAgY29uc3QgaGFsZiA9IHRoaXMuX3Jvd0hlaWdodCAvIDI7XG5cbiAgICAgICAgc3dpdGNoIChyb3VuZGluZykge1xuXG4gICAgICAgICAgICBjYXNlIFJvdW5kaW5nLlJvdW5kRG93bjpcbiAgICAgICAgICAgICAgICByZXR1cm4gcm93O1xuXG4gICAgICAgICAgICBjYXNlIFJvdW5kaW5nLlJvdW5kRG93bkJlbG93SGFsZjpcbiAgICAgICAgICAgICAgICByZXR1cm4gb3ZlcmZsb3cgPCBoYWxmID8gcm93IDogcm93ICsgMTtcblxuICAgICAgICAgICAgY2FzZSBSb3VuZGluZy5Sb3VuZFVwT3ZlckhhbGY6XG4gICAgICAgICAgICAgICAgcmV0dXJuIG92ZXJmbG93ID4gaGFsZiA/IHJvdyArIDEgOiByb3c7XG5cbiAgICAgICAgICAgIGNhc2UgUm91bmRpbmcuUm91bmRVcDpcbiAgICAgICAgICAgICAgICByZXR1cm4gb3ZlcmZsb3cgPiAwID8gcm93ICsgMSA6IHJvdztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbW1pdFdpZGdldENoYW5nZXMoKTogdm9pZCB7XG5cbiAgICAgICAgY29uc3QgcGxhY2Vob2xkZXIgPSB0aGlzLnBsYWNlaG9sZGVyJC5nZXRWYWx1ZSgpO1xuXG4gICAgICAgIC8vIGNoZWNrIHRoYXQgd2UgaGF2ZSBhbGwgdGhlIHZhbHVlcyB3ZSBuZWVkXG4gICAgICAgIGlmIChwbGFjZWhvbGRlci5jb2x1bW4gPT09IHVuZGVmaW5lZCB8fCBwbGFjZWhvbGRlci5yb3cgPT09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgICAgcGxhY2Vob2xkZXIuY29sdW1uU3BhbiA9PT0gdW5kZWZpbmVkIHx8IHBsYWNlaG9sZGVyLnJvd1NwYW4gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuX2FjdGlvbldpZGdldCkge1xuICAgICAgICAgICAgdGhpcy5fYWN0aW9uV2lkZ2V0LndpZGdldC5zZXRDb2x1bW4ocGxhY2Vob2xkZXIuY29sdW1uKTtcbiAgICAgICAgICAgIHRoaXMuX2FjdGlvbldpZGdldC53aWRnZXQuc2V0Um93KHBsYWNlaG9sZGVyLnJvdyk7XG4gICAgICAgICAgICB0aGlzLl9hY3Rpb25XaWRnZXQud2lkZ2V0LnNldENvbHVtblNwYW4ocGxhY2Vob2xkZXIuY29sdW1uU3Bhbik7XG4gICAgICAgICAgICB0aGlzLl9hY3Rpb25XaWRnZXQud2lkZ2V0LnNldFJvd1NwYW4ocGxhY2Vob2xkZXIucm93U3Bhbik7XG4gICAgICAgIH1cblxuICAgICAgICAvLyByZXNldCBhbGwgcGxhY2Vob2xkZXIgdmFsdWVzXG4gICAgICAgIHBsYWNlaG9sZGVyLmNvbHVtbiA9IHVuZGVmaW5lZDtcbiAgICAgICAgcGxhY2Vob2xkZXIucm93ID0gdW5kZWZpbmVkO1xuICAgICAgICBwbGFjZWhvbGRlci5jb2x1bW5TcGFuID0gdW5kZWZpbmVkO1xuICAgICAgICBwbGFjZWhvbGRlci5yb3dTcGFuID0gdW5kZWZpbmVkO1xuXG4gICAgICAgIC8vIGVtaXQgdGhlIG5ldyBwbGFjZWhvbGRlciB2YWx1ZXNcbiAgICAgICAgdGhpcy5wbGFjZWhvbGRlciQubmV4dChwbGFjZWhvbGRlcik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IHRoZSBjdXJyZW50IGNvbHVtbiB3aWR0aFxuICAgICAqL1xuICAgIGdldENvbHVtbldpZHRoKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiBNYXRoLmZsb29yKHRoaXMuY29sdW1uV2lkdGgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENhbGN1bGF0ZSB0aGUgbnVtYmVyIG9mIHJvd3MgcG9wdWxhdGVkIHdpdGggd2lkZ2V0c1xuICAgICAqL1xuICAgIGdldFJvd0NvdW50KCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLndpZGdldHMucmVkdWNlKChwcmV2aW91cywgd2lkZ2V0KSA9PiBNYXRoLm1heCh3aWRnZXQuZ2V0Um93KCkgKyB3aWRnZXQuZ2V0Um93U3BhbigpLCBwcmV2aW91cyksIDApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldCB0aGUgaGVpZ2h0IG9mIHRoZSBkYXNoYm9hcmQgY29udGFpbmVyIGVsZW1lbnRcbiAgICAgKi9cbiAgICBzZXREYXNoYm9hcmRIZWlnaHQoKTogdm9pZCB7XG5cbiAgICAgICAgLy8gc2l6ZSB0aGUgZGFzaGJvYXJkIGNvbnRhaW5lciB0byBlbnN1cmUgYWxsIHJvd3MgZml0XG4gICAgICAgIGxldCByb3dDb3VudCA9IHRoaXMuZ2V0Um93Q291bnQoKTtcblxuICAgICAgICAvLyBpZiB3ZSBzaG91bGQgc2hvdyBhbiBlbXB0eSByb3cgaW5jcmVtZW50IHRoZSByb3cgY291bnQgYnkgMVxuICAgICAgICBpZiAodGhpcy5vcHRpb25zLmVtcHR5Um93KSB7XG4gICAgICAgICAgICByb3dDb3VudCsrO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zZXREaW1lbnNpb25zKHVuZGVmaW5lZCwgcm93Q291bnQgKiB0aGlzLl9yb3dIZWlnaHQpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE9yZGVycyB0aGUgei1pbmRleCBvZiBhbGwgd2lkZ2V0cyB0byBtb3ZlIHRoZSBhY3RpdmUgb25lIHRvIHRoZSBmcm9udFxuICAgICAqIEBwYXJhbSB3aWRnZXQgVGhlIHdpZGdldCB0aGF0IHNob3VsZCBiZSBicm91Z2h0IHRvIHRoZSBmcm9udFxuICAgICAqL1xuICAgIGJyaW5nVG9Gcm9udCh3aWRnZXQ6IERhc2hib2FyZFdpZGdldENvbXBvbmVudCk6IHZvaWQge1xuICAgICAgICB0aGlzLndpZGdldHMuZm9yRWFjaChfd2lkZ2V0ID0+IF93aWRnZXQgPT09IHdpZGdldCA/IF93aWRnZXQuYnJpbmdUb0Zyb250KCkgOiBfd2lkZ2V0LnNlbmRUb0JhY2soKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTW92ZSBhIHdpZGdldCBkb3duIC0gaWYgd2lkZ2V0cyBhcmUgaW4gdGhlIHBvc2l0aW9uIGJlbG93LCB0aGVuIG1vdmUgdGhlbSBkb3duIGZ1cnRoZXJcbiAgICAgKiBAcGFyYW0gd2lkZ2V0IFRoZSB3aWRnZXQgdG8gbW92ZSBkb3dud2FyZHNcbiAgICAgKi9cbiAgICBtb3ZlV2lkZ2V0RG93bih3aWRnZXQ6IERhc2hib2FyZFdpZGdldENvbXBvbmVudCwgZGlzdGFuY2U6IG51bWJlciA9IDEpOiB2b2lkIHtcblxuICAgICAgICAvLyBtb3ZlIHRoZSB3aWRnZXQgZG93biBvbmUgcG9zaXRpb25cbiAgICAgICAgd2lkZ2V0LnNldFJvdyh3aWRnZXQuZ2V0Um93KCkgKyBkaXN0YW5jZSk7XG5cbiAgICAgICAgLy8gY2hlY2sgZXZlcnkgc3BhY2UgdGhlIHdpZGdldCBvY2N1cGllcyBmb3IgY29sbGlzaW9uc1xuICAgICAgICB0aGlzLmZvckVhY2hCbG9jayh3aWRnZXQsIChjb2x1bW4sIHJvdykgPT5cbiAgICAgICAgICAgIHRoaXMuZ2V0V2lkZ2V0c0F0UG9zaXRpb24oY29sdW1uLCByb3csIHRydWUpXG4gICAgICAgICAgICAgICAgLmZpbHRlcih3Z3QgPT4gd2d0ICE9PSB3aWRnZXQpXG4gICAgICAgICAgICAgICAgLmZvckVhY2god2d0ID0+IHRoaXMubW92ZVdpZGdldERvd24od2d0LCBkaXN0YW5jZSkpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBXaWRnZXRzIHNob3VsZCBub3QgYmUgYWxsb3dlZCB0byBoYXZlIGEgdmFjYW50IHNwYWNlIGFib3ZlIHRoZW0gLSBpZiB0aGVyZSBpcyBvbmUgdGhleSBzaG91bGQgbW92ZSB1cHdhcmRzIHRvIGZpbGwgaXRcbiAgICAgKi9cbiAgICBzaGlmdFdpZGdldHNVcCgpOiB2b2lkIHtcblxuICAgICAgICAvLyBjaGVjayB3aGV0aGVyIG9yIG5vdCBjaGFuZ2VzIGhhdmUgYmVlbiBtYWRlIC0gaWYgc28gd2UgbmVlZCB0byByZXBlYXQgdW50aWwgc3RhYmxlXG4gICAgICAgIGxldCBzdGFibGUgPSB0cnVlO1xuXG4gICAgICAgIC8vIGl0ZXJhdGUgZWFjaCB3aWRnZXQgYW5kXG4gICAgICAgIHRoaXMud2lkZ2V0cy5mb3JFYWNoKHdpZGdldCA9PiB7XG5cbiAgICAgICAgICAgIC8vIGlmIHdpZGdldCBpcyBhbHJlYWR5IG9uIHRoZSB0b3Agcm93IHRoZW4gZG8gbm90aGluZ1xuICAgICAgICAgICAgaWYgKHdpZGdldC5nZXRSb3coKSA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gaWYgd2UgYXJlIGN1cnJlbnRseSBkcmFnZ2luZyBhbmQgdGhpcyBpcyB0aGUgZHJhZ2dpbmcgd2lkZ2V0IHRoZW4gc2tpcFxuICAgICAgICAgICAgaWYgKHRoaXMuX2FjdGlvbldpZGdldCAmJiB0aGlzLl9hY3Rpb25XaWRnZXQud2lkZ2V0ID09PSB3aWRnZXQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmdldFBvc2l0aW9uQXZhaWxhYmxlKHdpZGdldC5nZXRDb2x1bW4oKSwgd2lkZ2V0LmdldFJvdygpIC0gMSwgd2lkZ2V0LmdldENvbHVtblNwYW4oKSwgMSkpIHtcbiAgICAgICAgICAgICAgICB3aWRnZXQuc2V0Um93KHdpZGdldC5nZXRSb3coKSAtIDEpO1xuICAgICAgICAgICAgICAgIHN0YWJsZSA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAvLyBpZiBjaGFuZ2VzIG9jY3VycmVkIHRoZW4gd2Ugc2hvdWxkIHJlcGVhdCB0aGUgcHJvY2Vzc1xuICAgICAgICBpZiAoIXN0YWJsZSkge1xuICAgICAgICAgICAgdGhpcy5zaGlmdFdpZGdldHNVcCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSXRlcmF0ZSBvdmVyIGVhY2ggc3BhY2UgYSB3aWRnZXQgb2NjdXBpZWRcbiAgICAgKiBAcGFyYW0gd2lkZ2V0IFRoZSB3aWRnZXQgdG8gZGV0ZXJtaW5lIHNwYWNlc1xuICAgICAqIEBwYXJhbSBjYWxsYmFjayBUaGUgZnVuY3Rpb24gdG8gYmUgY2FsbGVkIGZvciBlYWNoIHNwYWNlLCBzaG91bGQgZXhwZWN0IGEgY29sdW1uIGFuZCByb3cgYXJndW1lbnQgd2l0aHQgaGUgY29udGV4dCBiZWluZyB0aGUgd2lkZ2V0XG4gICAgICovXG4gICAgZm9yRWFjaEJsb2NrKHdpZGdldDogRGFzaGJvYXJkV2lkZ2V0Q29tcG9uZW50LCBjYWxsYmFjazogKGNvbHVtbjogbnVtYmVyLCByb3c6IG51bWJlcikgPT4gdm9pZCk6IHZvaWQge1xuICAgICAgICBmb3IgKGxldCByb3cgPSB3aWRnZXQuZ2V0Um93KCk7IHJvdyA8IHdpZGdldC5nZXRSb3coKSArIHdpZGdldC5nZXRSb3dTcGFuKCk7IHJvdysrKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBjb2x1bW4gPSB3aWRnZXQuZ2V0Q29sdW1uKCk7IGNvbHVtbiA8IHdpZGdldC5nZXRDb2x1bW4oKSArIHdpZGdldC5nZXRDb2x1bW5TcGFuKCk7IGNvbHVtbisrKSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2suY2FsbCh3aWRnZXQsIGNvbHVtbiwgcm93KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldFdpZGdldEJlbG93KHdpZGdldDogRGFzaGJvYXJkV2lkZ2V0Q29tcG9uZW50KTogRGFzaGJvYXJkV2lkZ2V0Q29tcG9uZW50IHwgbnVsbCB7XG4gICAgICAgIGNvbnN0IHRhcmdldCA9IHRoaXMuZ2V0V2lkZ2V0c0F0UG9zaXRpb24od2lkZ2V0LmdldENvbHVtbigpLCB3aWRnZXQuZ2V0Um93KCkgKyB3aWRnZXQuZ2V0Um93U3BhbigpLCB0cnVlKTtcblxuICAgICAgICByZXR1cm4gdGFyZ2V0Lmxlbmd0aCA+IDAgPyB0YXJnZXRbMF0gOiBudWxsO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIG51bWJlciBvZiBjb2x1bW5zIGF2YWlsYWJsZVxuICAgICAqL1xuICAgIGdldENvbHVtbkNvdW50KCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLnN0YWNrZWQgPyAxIDogdGhpcy5vcHRpb25zLmNvbHVtbnM7XG4gICAgfVxuXG4gICAgb25TaGlmdFN0YXJ0KHdpZGdldDogRGFzaGJvYXJkV2lkZ2V0Q29tcG9uZW50KTogdm9pZCB7XG4gICAgICAgIHRoaXMub25EcmFnU3RhcnQoeyBkaXJlY3Rpb246IEFjdGlvbkRpcmVjdGlvbi5Nb3ZlLCB3aWRnZXQgfSk7XG4gICAgfVxuXG4gICAgLyoqIFByb2dyYW1tYXRpY2FsbHkgbW92ZSBhIHdpZGdldCBpbiBhIGdpdmVuIGRpcmVjdGlvbiAqL1xuICAgIG9uU2hpZnQod2lkZ2V0OiBEYXNoYm9hcmRXaWRnZXRDb21wb25lbnQsIGRpcmVjdGlvbjogQWN0aW9uRGlyZWN0aW9uKTogdm9pZCB7XG5cbiAgICAgICAgLy8gZ2V0IHRoZSBjdXJyZW50IG1vdXNlIHBvc2l0aW9uXG4gICAgICAgIGxldCBkZWx0YVggPSAwLCBkZWx0YVkgPSAwO1xuXG4gICAgICAgIC8vIG1vdmUgYmFzZWQgb24gdGhlIGRpcmVjdGlvblxuICAgICAgICBzd2l0Y2ggKGRpcmVjdGlvbikge1xuICAgICAgICAgICAgY2FzZSBBY3Rpb25EaXJlY3Rpb24uVG9wOlxuICAgICAgICAgICAgICAgIGRlbHRhWSA9IC10aGlzLmdldFJvd0hlaWdodCgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBBY3Rpb25EaXJlY3Rpb24uUmlnaHQ6XG4gICAgICAgICAgICAgICAgZGVsdGFYID0gdGhpcy5nZXRDb2x1bW5XaWR0aCgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBBY3Rpb25EaXJlY3Rpb24uQm90dG9tOiB7XG4gICAgICAgICAgICAgICAgZGVsdGFZID0gdGhpcy5nZXRSb3dIZWlnaHQoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhc2UgQWN0aW9uRGlyZWN0aW9uLkxlZnQ6XG4gICAgICAgICAgICAgICAgZGVsdGFYID0gLXRoaXMuZ2V0Q29sdW1uV2lkdGgoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGRpbWVuc2lvbnM6IERhc2hib2FyZFdpZGdldERpbWVuc2lvbnMgPSB7XG4gICAgICAgICAgICB4OiB3aWRnZXQueCArIGRlbHRhWCxcbiAgICAgICAgICAgIHk6IHdpZGdldC55ICsgZGVsdGFZLFxuICAgICAgICAgICAgd2lkdGg6IHdpZGdldC53aWR0aCxcbiAgICAgICAgICAgIGhlaWdodDogd2lkZ2V0LmhlaWdodFxuICAgICAgICB9O1xuXG5cbiAgICAgICAgLy8gdXBkYXRlIHBsYWNlaG9sZGVyIHBvc2l0aW9uIGFuZCB2YWx1ZVxuICAgICAgICB0aGlzLnNldFBsYWNlaG9sZGVyQm91bmRzKGZhbHNlLCBkaW1lbnNpb25zLngsIGRpbWVuc2lvbnMueSwgZGltZW5zaW9ucy53aWR0aCwgZGltZW5zaW9ucy5oZWlnaHQpO1xuXG4gICAgICAgIC8vIHVwZGF0ZSB3aWRnZXQgcG9zaXRpb25cbiAgICAgICAgY29uc3QgeyB4LCB5IH0gPSB0aGlzLnBsYWNlaG9sZGVyJC52YWx1ZTtcblxuICAgICAgICAvLyBtb3ZlIHRoZSB3aWRnZXQgdG8gdGhlIHBsYWNlaG9sZGVyIHBvc2l0aW9uXG4gICAgICAgIHdpZGdldC5zZXRCb3VuZHMoeCAtIHRoaXMub3B0aW9ucy5wYWRkaW5nLCB5IC0gdGhpcy5vcHRpb25zLnBhZGRpbmcsIGRpbWVuc2lvbnMud2lkdGgsIGRpbWVuc2lvbnMuaGVpZ2h0KTtcblxuICAgICAgICAvLyB1cGRhdGUgdGhlIGhlaWdodCBvZiB0aGUgZGFzaGJvYXJkXG4gICAgICAgIHRoaXMuc2V0RGFzaGJvYXJkSGVpZ2h0KCk7XG5cbiAgICB9XG5cbiAgICBvblNoaWZ0RW5kKCk6IHZvaWQge1xuICAgICAgICAvLyBzaG93IHRoZSB3aWRnZXQgcG9zaXRpb25zIGlmIHRoZSBjdXJyZW50IHBvc2l0aW9ucyBhbmQgc2l6ZXMgd2VyZSB0byBwZXJzaXN0XG4gICAgICAgIHRoaXMuc2hpZnRXaWRnZXRzKCk7XG5cbiAgICAgICAgLy8gdGhlIGhlaWdodCBvZiB0aGUgZGFzaGJvYXJkIG1heSBoYXZlIGNoYW5nZWQgYWZ0ZXIgbW92aW5nIHdpZGdldHNcbiAgICAgICAgdGhpcy5zZXREYXNoYm9hcmRIZWlnaHQoKTtcblxuICAgICAgICAvLyByZXNldCBhbGwgcHJvcGVydGllc1xuICAgICAgICB0aGlzLm9uRHJhZ0VuZCgpO1xuICAgIH1cblxuICAgIC8qKiBQcm9ncmFtbWF0aWNhbGx5IHJlc2l6ZSBhIHdpZGdldCBpbiBhIGdpdmVuIGRpcmVjdGlvbiAqL1xuICAgIG9uUmVzaXplKHdpZGdldDogRGFzaGJvYXJkV2lkZ2V0Q29tcG9uZW50LCBkaXJlY3Rpb246IEFjdGlvbkRpcmVjdGlvbik6IHZvaWQge1xuXG4gICAgICAgIC8vIGRvIG5vdCBwZXJmb3JtIHJlc2l6aW5nIGlmIHdlIGFyZSBpbiBzdGFja2VkIG1vZGVcbiAgICAgICAgaWYgKHRoaXMuc3RhY2tlZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gcGVyZm9ybSB0aGUgcmVzaXppbmdcbiAgICAgICAgbGV0IGRlbHRhWCA9IDAsIGRlbHRhWSA9IDA7XG5cbiAgICAgICAgLy8gbW92ZSBiYXNlZCBvbiB0aGUgZGlyZWN0aW9uXG4gICAgICAgIHN3aXRjaCAoZGlyZWN0aW9uKSB7XG4gICAgICAgICAgICBjYXNlIEFjdGlvbkRpcmVjdGlvbi5Ub3A6XG4gICAgICAgICAgICAgICAgZGVsdGFZID0gLXRoaXMuZ2V0Um93SGVpZ2h0KCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIEFjdGlvbkRpcmVjdGlvbi5SaWdodDpcbiAgICAgICAgICAgICAgICBkZWx0YVggPSB0aGlzLmdldENvbHVtbldpZHRoKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIEFjdGlvbkRpcmVjdGlvbi5Cb3R0b206XG4gICAgICAgICAgICAgICAgZGVsdGFZID0gdGhpcy5nZXRSb3dIZWlnaHQoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgQWN0aW9uRGlyZWN0aW9uLkxlZnQ6XG4gICAgICAgICAgICAgICAgZGVsdGFYID0gLXRoaXMuZ2V0Q29sdW1uV2lkdGgoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGRpbWVuc2lvbnM6IERhc2hib2FyZFdpZGdldERpbWVuc2lvbnMgPSB7XG4gICAgICAgICAgICB4OiB3aWRnZXQueCxcbiAgICAgICAgICAgIHk6IHdpZGdldC55LFxuICAgICAgICAgICAgd2lkdGg6IHdpZGdldC53aWR0aCArIGRlbHRhWCxcbiAgICAgICAgICAgIGhlaWdodDogd2lkZ2V0LmhlaWdodCArIGRlbHRhWVxuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnN0IGN1cnJlbnRXaWR0aCA9IHdpZGdldC54ICsgd2lkZ2V0LndpZHRoO1xuICAgICAgICBjb25zdCBjdXJyZW50SGVpZ2h0ID0gd2lkZ2V0LnkgKyB3aWRnZXQuaGVpZ2h0O1xuXG4gICAgICAgIC8vIGVuc3VyZSB2YWx1ZXMgYXJlIHdpdGhpbiB0aGUgZGFzaGJvYXJkIGJvdW5kc1xuICAgICAgICBpZiAoZGltZW5zaW9ucy54IDwgMCkge1xuICAgICAgICAgICAgZGltZW5zaW9ucy54ID0gMDtcbiAgICAgICAgICAgIGRpbWVuc2lvbnMud2lkdGggPSBjdXJyZW50V2lkdGg7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZGltZW5zaW9ucy55IDwgMCkge1xuICAgICAgICAgICAgZGltZW5zaW9ucy55ID0gMDtcbiAgICAgICAgICAgIGRpbWVuc2lvbnMuaGVpZ2h0ID0gY3VycmVudEhlaWdodDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICgoZGltZW5zaW9ucy54ICsgZGltZW5zaW9ucy53aWR0aCkgPiB0aGlzLmdldENvbHVtbldpZHRoKCkgKiB0aGlzLmdldENvbHVtbkNvdW50KCkpIHtcbiAgICAgICAgICAgIGRpbWVuc2lvbnMud2lkdGggPSB3aWRnZXQud2lkdGg7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBpZiB0aGUgcHJvcG9zZWQgd2lkdGggaXMgc21hbGxlciB0aGFuIGFsbG93ZWQgdGhlbiByZXNldCB3aWR0aCB0byBtaW5pbXVtIGFuZCBpZ25vcmUgeCBjaGFuZ2VzXG4gICAgICAgIGlmIChkaW1lbnNpb25zLndpZHRoIDwgdGhpcy5nZXRDb2x1bW5XaWR0aCgpKSB7XG4gICAgICAgICAgICBkaW1lbnNpb25zLnggPSB3aWRnZXQueDtcbiAgICAgICAgICAgIGRpbWVuc2lvbnMud2lkdGggPSB0aGlzLmdldENvbHVtbldpZHRoKCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBpZiB0aGUgcHJvcG9zZWQgaGVpZ2h0IGlzIHNtYWxsZXIgdGhhbiBhbGxvd2VkIHRoZW4gcmVzZXQgaGVpZ2h0IHRvIG1pbmltdW0gYW5kIGlnbm9yZSB5IGNoYW5nZXNcbiAgICAgICAgaWYgKGRpbWVuc2lvbnMuaGVpZ2h0IDwgdGhpcy5nZXRSb3dIZWlnaHQoKSkge1xuICAgICAgICAgICAgZGltZW5zaW9ucy55ID0gd2lkZ2V0Lnk7XG4gICAgICAgICAgICBkaW1lbnNpb25zLmhlaWdodCA9IHRoaXMuZ2V0Um93SGVpZ2h0KCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBtb3ZlIHRoZSB3aWRnZXQgdG8gdGhlIHBsYWNlaG9sZGVyIHBvc2l0aW9uXG4gICAgICAgIHdpZGdldC5zZXRCb3VuZHMoZGltZW5zaW9ucy54LCBkaW1lbnNpb25zLnksIGRpbWVuc2lvbnMud2lkdGgsIGRpbWVuc2lvbnMuaGVpZ2h0KTtcblxuICAgICAgICAvLyB1cGRhdGUgcGxhY2Vob2xkZXIgcG9zaXRpb24gYW5kIHZhbHVlXG4gICAgICAgIHRoaXMuc2V0UGxhY2Vob2xkZXJCb3VuZHMoZmFsc2UsIGRpbWVuc2lvbnMueCwgZGltZW5zaW9ucy55LCBkaW1lbnNpb25zLndpZHRoLCBkaW1lbnNpb25zLmhlaWdodCk7XG5cbiAgICAgICAgLy8gdGhlIGhlaWdodCBvZiB0aGUgZGFzaGJvYXJkIG1heSBoYXZlIGNoYW5nZWQgYWZ0ZXIgbW92aW5nIHdpZGdldHNcbiAgICAgICAgdGhpcy5zZXREYXNoYm9hcmRIZWlnaHQoKTtcbiAgICB9XG5cbiAgICBnZXRTdXJyb3VuZGluZ1dpZGdldHMod2lkZ2V0OiBEYXNoYm9hcmRXaWRnZXRDb21wb25lbnQsIGRpcmVjdGlvbjogQWN0aW9uRGlyZWN0aW9uKTogRGFzaGJvYXJkV2lkZ2V0Q29tcG9uZW50W10ge1xuICAgICAgICBsZXQgd2lkZ2V0czogRGFzaGJvYXJkV2lkZ2V0Q29tcG9uZW50W10gPSBbXTtcblxuICAgICAgICBmb3IgKGxldCBjb2x1bW4gPSB3aWRnZXQuZ2V0Q29sdW1uKCk7IGNvbHVtbiA8IHdpZGdldC5nZXRDb2x1bW4oKSArIHdpZGdldC5nZXRDb2x1bW5TcGFuKCk7IGNvbHVtbisrKSB7XG5cbiAgICAgICAgICAgIHN3aXRjaCAoZGlyZWN0aW9uKSB7XG5cbiAgICAgICAgICAgICAgICBjYXNlIEFjdGlvbkRpcmVjdGlvbi5Ub3A6XG4gICAgICAgICAgICAgICAgICAgIHdpZGdldHMgPSBbLi4ud2lkZ2V0cywgLi4udGhpcy5nZXRXaWRnZXRzQXRQb3NpdGlvbihjb2x1bW4sIHdpZGdldC5nZXRSb3coKSAtIDEpXTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlIEFjdGlvbkRpcmVjdGlvbi5Cb3R0b206XG4gICAgICAgICAgICAgICAgICAgIHdpZGdldHMgPSBbLi4ud2lkZ2V0cywgLi4udGhpcy5nZXRXaWRnZXRzQXRQb3NpdGlvbihjb2x1bW4sIHdpZGdldC5nZXRSb3coKSArIHdpZGdldC5nZXRSb3dTcGFuKCkpXTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gd2lkZ2V0cztcbiAgICB9XG59XG5cbmV4cG9ydCBjb25zdCBkZWZhdWx0T3B0aW9uczogRGFzaGJvYXJkT3B0aW9ucyA9IHsgY29sdW1uczogNSwgcGFkZGluZzogNSwgbWluV2lkdGg6IDEwMCwgbWluSGVpZ2h0OiAxMDAsIGVtcHR5Um93OiB0cnVlIH07XG5cbmV4cG9ydCBpbnRlcmZhY2UgRGFzaGJvYXJkRGltZW5zaW9ucyB7XG4gICAgd2lkdGg/OiBudW1iZXI7XG4gICAgaGVpZ2h0PzogbnVtYmVyO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIERhc2hib2FyZFdpZGdldERpbWVuc2lvbnMge1xuICAgIHg6IG51bWJlcjtcbiAgICB5OiBudW1iZXI7XG4gICAgd2lkdGg6IG51bWJlcjtcbiAgICBoZWlnaHQ6IG51bWJlcjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBEYXNoYm9hcmRBY3Rpb24ge1xuICAgIHdpZGdldDogRGFzaGJvYXJkV2lkZ2V0Q29tcG9uZW50O1xuICAgIGRpcmVjdGlvbjogQWN0aW9uRGlyZWN0aW9uO1xuICAgIGV2ZW50PzogTW91c2VFdmVudDtcbiAgICBoYW5kbGU/OiBIVE1MRWxlbWVudDtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBEYXNoYm9hcmRTcGFjZSB7XG4gICAgd2lkZ2V0OiBEYXNoYm9hcmRXaWRnZXRDb21wb25lbnQ7XG4gICAgY29sdW1uOiBudW1iZXI7XG4gICAgcm93OiBudW1iZXI7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRGFzaGJvYXJkUGxhY2Vob2xkZXIge1xuICAgIHZpc2libGU6IGJvb2xlYW47XG4gICAgeDogbnVtYmVyO1xuICAgIHk6IG51bWJlcjtcbiAgICB3aWR0aDogbnVtYmVyO1xuICAgIGhlaWdodDogbnVtYmVyO1xuICAgIGNvbHVtbj86IG51bWJlcjtcbiAgICByb3c/OiBudW1iZXI7XG4gICAgY29sdW1uU3Bhbj86IG51bWJlcjtcbiAgICByb3dTcGFuPzogbnVtYmVyO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIERhc2hib2FyZENhY2hlIHtcbiAgICBpZDogc3RyaW5nO1xuICAgIGNvbHVtbjogbnVtYmVyO1xuICAgIHJvdzogbnVtYmVyO1xuICAgIGNvbHVtblNwYW46IG51bWJlcjtcbiAgICByb3dTcGFuOiBudW1iZXI7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRGFzaGJvYXJkTGF5b3V0RGF0YSB7XG4gICAgaWQ6IHN0cmluZztcbiAgICBjb2w6IG51bWJlcjtcbiAgICByb3c6IG51bWJlcjtcbiAgICBjb2xTcGFuOiBudW1iZXI7XG4gICAgcm93U3BhbjogbnVtYmVyO1xufVxuXG5leHBvcnQgZW51bSBBY3Rpb25EaXJlY3Rpb24ge1xuICAgIFRvcCA9IDAsXG4gICAgVG9wUmlnaHQgPSAxLFxuICAgIFJpZ2h0ID0gMixcbiAgICBCb3R0b21SaWdodCA9IDMsXG4gICAgQm90dG9tID0gNCxcbiAgICBCb3R0b21MZWZ0ID0gNSxcbiAgICBMZWZ0ID0gNixcbiAgICBUb3BMZWZ0ID0gNyxcbiAgICBNb3ZlID0gOFxufVxuXG5leHBvcnQgZW51bSBSb3VuZGluZyB7XG4gICAgUm91bmREb3duLFxuICAgIFJvdW5kRG93bkJlbG93SGFsZixcbiAgICBSb3VuZFVwLFxuICAgIFJvdW5kVXBPdmVySGFsZlxufSJdfQ==