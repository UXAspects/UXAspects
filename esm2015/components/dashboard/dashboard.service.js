/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { delay, distinctUntilChanged, filter, map } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
export class DashboardService {
    constructor() {
        this._rowHeight = 0;
        this.widgets$ = new BehaviorSubject([]);
        this.options$ = new BehaviorSubject(defaultOptions);
        this.dimensions$ = new BehaviorSubject({});
        this.height$ = this.dimensions$.pipe(delay(0), map((dimensions) => dimensions.height), distinctUntilChanged());
        this.placeholder$ = new BehaviorSubject({ visible: false, x: 0, y: 0, width: 0, height: 0 });
        this.layout$ = new Subject();
        this.stacked$ = new BehaviorSubject(false);
        this.layout$.subscribe(this.setLayoutData.bind(this));
        this.stacked$.pipe(filter(stacked => stacked === true)).subscribe(this.updateWhenStacked.bind(this));
        this.widgets$.pipe(delay(0)).subscribe(() => this.renderDashboard());
        this.dimensions$.pipe(delay(0)).subscribe(() => this.renderDashboard());
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
            const /** @type {?} */ w1Position = w1.getColumn() * w1.getRow();
            const /** @type {?} */ w2Position = w2.getColumn() * w2.getRow();
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
        this._mouseEvent = action.event;
        this._actionWidget = action;
        // bring the widget to the font
        this.bringToFront(action.widget);
    }
    /**
     * @param {?} action
     * @return {?}
     */
    onResizeDrag(action) {
        const /** @type {?} */ mousePosX = this._mouseEvent.pageX - pageXOffset;
        const /** @type {?} */ mousePosY = this._mouseEvent.pageY - pageYOffset;
        // if there was no movement then do nothing
        if (action.event.x === mousePosX && action.event.y === mousePosY) {
            return;
        }
        // update the stored mouse event
        this._mouseEvent = action.event;
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
        this._mouseEvent = null;
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
    }
    /**
     * @return {?}
     */
    onDragEnd() {
        this.onResizeEnd();
        this._widgetOrigin = {};
    }
    /**
     * @param {?} action
     * @return {?}
     */
    onDrag(action) {
        // if there was no movement then do nothing
        if (action.event.pageX === this._mouseEvent.pageX && action.event.pageY === this._mouseEvent.pageY) {
            return;
        }
        // get the current mouse position
        const /** @type {?} */ mouseX = action.event.pageX - this._mouseEvent.pageX;
        const /** @type {?} */ mouseY = action.event.pageY - this._mouseEvent.pageY;
        // store the latest event
        this._mouseEvent = action.event;
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
        this._cache = this.widgets.map(widget => ({ id: widget.id, column: widget.getColumn(), row: widget.getRow() }));
    }
    /**
     * @param {?=} ignoreActionWidget
     * @return {?}
     */
    restoreWidgets(ignoreActionWidget = false) {
        this._cache.filter(widget => !ignoreActionWidget || widget.id !== this._actionWidget.widget.id).forEach(widget => {
            const /** @type {?} */ match = this.widgets.find(wgt => wgt.id === widget.id);
            if (match) {
                match.setColumn(widget.column);
                match.setRow(widget.row);
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
                    let /** @type {?} */ requiredSpaces = this.getRequiredSpacesFromPoint(widget, column, row);
                    // check if widget would fit in space
                    let /** @type {?} */ available = requiredSpaces.every(space => {
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
            let /** @type {?} */ distance = (this._actionWidget.widget.getRow() - widget.getRow()) + this._actionWidget.widget.getRowSpan();
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
        // check if there are widget in the required positions and if so, can they move right?
        const /** @type {?} */ moveable = targetSpaces.every(space => this.getWidgetsAtPosition(space.column, space.row).filter(wgt => wgt !== space.widget).every(wgt => this.canWidgetMoveLeft(wgt)));
        if (performMove && moveable) {
            // move all widgets to the right
            targetSpaces.forEach(space => this.getWidgetsAtPosition(space.column, space.row).filter(wgt => wgt !== space.widget).forEach(wgt => this.canWidgetMoveLeft(wgt, true)));
            // move current widget to the right
            widget.setColumn(widget.getColumn() - 1);
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
        // check if there are widget in the required positions and if so, can they move right?
        const /** @type {?} */ moveable = targetSpaces.every(space => this.getWidgetsAtPosition(space.column, space.row).filter(wgt => wgt !== space.widget).every(wgt => this.canWidgetMoveRight(wgt)));
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
            .filter(space => space.widget !== this._actionWidget.widget || !ignoreResizing)
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
        const /** @type {?} */ rounding = this._actionWidget.direction === ActionDirection.Left ||
            this._actionWidget.direction === ActionDirection.Top ? Rounding.RoundDownBelowHalf : Rounding.RoundUpOverHalf;
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
     * Returns the number of columns available
     * @return {?}
     */
    getColumnCount() {
        return this.stacked ? 1 : this.options.columns;
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
    DashboardService.prototype._mouseEvent;
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
    /** @type {?} */
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGFzaGJvYXJkLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9kYXNoYm9hcmQvZGFzaGJvYXJkLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBRXZELE9BQU8sRUFBRSxLQUFLLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFLdkMsTUFBTTtJQW9DRjswQkFoQzZCLENBQUM7d0JBSW5CLElBQUksZUFBZSxDQUE2QixFQUFFLENBQUM7d0JBQ25ELElBQUksZUFBZSxDQUFtQixjQUFjLENBQUM7MkJBQ2xELElBQUksZUFBZSxDQUFzQixFQUFFLENBQUM7dUJBQzVCLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxVQUErQixFQUFFLEVBQUUsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLEVBQUUsb0JBQW9CLEVBQUUsQ0FBQzs0QkFDbkksSUFBSSxlQUFlLENBQXVCLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLENBQUM7dUJBQ25HLElBQUksT0FBTyxFQUF5Qjt3QkFDbkMsSUFBSSxlQUFlLENBQVUsS0FBSyxDQUFDO1FBdUIxQyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENB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QUFDLEtBQUssQ0FBQztRQUMzRCx1QkFBTSxhQUFhLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUM7O1FBRzdELEVBQUUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNuQixVQUFVLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNqQixVQUFVLENBQUMsS0FBSyxHQUFHLFlBQVksQ0FBQztTQUNuQztRQUVELEVBQUUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNuQixVQUFVLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNqQixVQUFVLENBQUMsTUFBTSxHQUFHLGFBQWEsQ0FBQztTQUNyQztRQUVELEVBQUUsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsR0FBRyxVQUFVLENBQUMsS0FBSyxDQUFDLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQzVELFVBQVUsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEdBQUcsVUFBVSxDQUFDLENBQUMsQ0FBQztTQUMzRDs7UUFHRCxFQUFFLENBQUMsQ0FBQyxVQUFVLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUMzQyxVQUFVLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQy9CLFVBQVUsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUM7U0FDNUM7O1FBR0QsRUFBRSxDQUFDLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDN0MsVUFBVSxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FB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UyxFQUFFLEVBQUUsTUFBTSxHQUFHLE1BQU0sQ0FBQyxTQUFTLEVBQUUsR0FBRyxNQUFNLENBQUMsYUFBYSxFQUFFLEVBQUUsTUFBTSxFQUFFLEVBQUUsQ0FBQztnQkFDbkcsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDO2FBQ3RDO1NBQ0o7S0FDSjs7Ozs7SUFLRCxjQUFjO1FBQ1YsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUM7S0FDbEQ7OztZQTFoQ0osVUFBVTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBNmhDWCxNQUFNLENBQUMsdUJBQU0sY0FBYyxHQUFxQixFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcy9CZWhhdmlvclN1YmplY3QnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBkZWxheSwgZGlzdGluY3RVbnRpbENoYW5nZWQsIGZpbHRlciwgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMvU3ViamVjdCc7XG5pbXBvcnQgeyBEYXNoYm9hcmRPcHRpb25zIH0gZnJvbSAnLi9kYXNoYm9hcmQuY29tcG9uZW50JztcbmltcG9ydCB7IERhc2hib2FyZFdpZGdldENvbXBvbmVudCB9IGZyb20gJy4vd2lkZ2V0L2Rhc2hib2FyZC13aWRnZXQuY29tcG9uZW50JztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIERhc2hib2FyZFNlcnZpY2Uge1xuXG4gICAgcHJpdmF0ZSBfd2lkZ2V0T3JpZ2luOiB7IGNvbHVtbj86IG51bWJlciwgcm93PzogbnVtYmVyLCBjb2x1bW5TcGFuPzogbnVtYmVyLCByb3dTcGFuPzogbnVtYmVyIH07XG4gICAgcHJpdmF0ZSBfYWN0aW9uV2lkZ2V0OiBEYXNoYm9hcmRBY3Rpb247XG4gICAgcHJpdmF0ZSBfcm93SGVpZ2h0OiBudW1iZXIgPSAwO1xuICAgIHByaXZhdGUgX2NhY2hlOiBEYXNoYm9hcmRDYWNoZVtdO1xuICAgIHByaXZhdGUgX21vdXNlRXZlbnQ6IE1vdXNlRXZlbnQ7XG5cbiAgICB3aWRnZXRzJCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8RGFzaGJvYXJkV2lkZ2V0Q29tcG9uZW50W10+KFtdKTtcbiAgICBvcHRpb25zJCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8RGFzaGJvYXJkT3B0aW9ucz4oZGVmYXVsdE9wdGlvbnMpO1xuICAgIGRpbWVuc2lvbnMkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxEYXNoYm9hcmREaW1lbnNpb25zPih7fSk7XG4gICAgaGVpZ2h0JDogT2JzZXJ2YWJsZTxudW1iZXI+ID0gdGhpcy5kaW1lbnNpb25zJC5waXBlKGRlbGF5KDApLCBtYXAoKGRpbWVuc2lvbnM6IERhc2hib2FyZERpbWVuc2lvbnMpID0+IGRpbWVuc2lvbnMuaGVpZ2h0KSwgZGlzdGluY3RVbnRpbENoYW5nZWQoKSk7XG4gICAgcGxhY2Vob2xkZXIkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxEYXNoYm9hcmRQbGFjZWhvbGRlcj4oeyB2aXNpYmxlOiBmYWxzZSwgeDogMCwgeTogMCwgd2lkdGg6IDAsIGhlaWdodDogMCB9KTtcbiAgICBsYXlvdXQkID0gbmV3IFN1YmplY3Q8RGFzaGJvYXJkTGF5b3V0RGF0YVtdPigpO1xuICAgIHN0YWNrZWQkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG5cbiAgICBnZXQgb3B0aW9ucygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMub3B0aW9ucyQuZ2V0VmFsdWUoKTtcbiAgICB9XG5cbiAgICBnZXQgd2lkZ2V0cygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMud2lkZ2V0cyQuZ2V0VmFsdWUoKTtcbiAgICB9XG5cbiAgICBnZXQgc3RhY2tlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RhY2tlZCQuZ2V0VmFsdWUoKTtcbiAgICB9XG5cbiAgICBnZXQgZGltZW5zaW9ucygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGltZW5zaW9ucyQuZ2V0VmFsdWUoKTtcbiAgICB9XG5cbiAgICBnZXQgY29sdW1uV2lkdGgoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmRpbWVuc2lvbnMud2lkdGggLyB0aGlzLm9wdGlvbnMuY29sdW1ucztcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5sYXlvdXQkLnN1YnNjcmliZSh0aGlzLnNldExheW91dERhdGEuYmluZCh0aGlzKSk7XG4gICAgICAgIHRoaXMuc3RhY2tlZCQucGlwZShmaWx0ZXIoc3RhY2tlZCA9PiBzdGFja2VkID09PSB0cnVlKSkuc3Vic2NyaWJlKHRoaXMudXBkYXRlV2hlblN0YWNrZWQuYmluZCh0aGlzKSk7XG4gICAgICAgIHRoaXMud2lkZ2V0cyQucGlwZShkZWxheSgwKSkuc3Vic2NyaWJlKCgpID0+IHRoaXMucmVuZGVyRGFzaGJvYXJkKCkpO1xuICAgICAgICB0aGlzLmRpbWVuc2lvbnMkLnBpcGUoZGVsYXkoMCkpLnN1YnNjcmliZSgoKSA9PiB0aGlzLnJlbmRlckRhc2hib2FyZCgpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBZGQgYSB3aWRnZXQgdG8gdGhlIGRhc2hib2FyZFxuICAgICAqIEBwYXJhbSB3aWRnZXQgVGhlIHdpZGdldCBjb21wb25lbnQgdG8gYWRkIHRvIHRoZSBkYXNoYm9hcmRcbiAgICAgKi9cbiAgICBhZGRXaWRnZXQod2lkZ2V0OiBEYXNoYm9hcmRXaWRnZXRDb21wb25lbnQpOiB2b2lkIHtcbiAgICAgICAgdGhpcy53aWRnZXRzJC5uZXh0KFsuLi50aGlzLndpZGdldHMkLmdldFZhbHVlKCksIHdpZGdldF0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlbW92ZSBhIHdpZGdldCBmcm9tIHRoZSBkYXNoYm9hcmRcbiAgICAgKiBAcGFyYW0gd2lkZ2V0IFRoZSB3aWRnZXQgdG8gcmVtb3ZlXG4gICAgICovXG4gICAgcmVtb3ZlV2lkZ2V0KHdpZGdldDogRGFzaGJvYXJkV2lkZ2V0Q29tcG9uZW50KTogdm9pZCB7XG4gICAgICAgIHRoaXMud2lkZ2V0cyQubmV4dCh0aGlzLndpZGdldHMkLmdldFZhbHVlKCkuZmlsdGVyKF93aWRnZXQgPT4gX3dpZGdldCAhPT0gd2lkZ2V0KSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSW5kaWNhdGUgdGhhdCB0aGUgZGFzaGJvYXJkIGVsZW1lbnQgaGFzIGJlZW4gcmVzaXplZFxuICAgICAqIEBwYXJhbSB3aWR0aCBUaGUgd2lkdGggb2YgdGhlIGRhc2hib2FyZCBlbGVtZW50IGluIHB4XG4gICAgICogQHBhcmFtIGhlaWdodCBUaGUgaGVpZ2h0IG9mIHRoZSBkYXNoYm9hcmQgZWxlbWVudCBpbiBweFxuICAgICAqL1xuICAgIHNldERpbWVuc2lvbnMod2lkdGg6IG51bWJlciA9IHRoaXMuZGltZW5zaW9ucy53aWR0aCwgaGVpZ2h0OiBudW1iZXIgPSB0aGlzLmRpbWVuc2lvbnMuaGVpZ2h0KTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmRpbWVuc2lvbnMud2lkdGggIT09IHdpZHRoIHx8IHRoaXMuZGltZW5zaW9ucy5oZWlnaHQgIT09IGhlaWdodCkge1xuICAgICAgICAgICAgdGhpcy5kaW1lbnNpb25zJC5uZXh0KHsgd2lkdGg6IHdpZHRoLCBoZWlnaHQ6IGhlaWdodCB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFByb2R1Y2UgYW4gb2JqZWN0IGNvbnRhaW5pbmcgYWxsIHRoZSByZXF1aXJlZCBsYXlvdXQgZGF0YS5cbiAgICAgKiBUaGlzIGNhbiBiZSB1c2VmdWwgZm9yIGV4cG9ydGluZy9zYXZpbmcgYSBsYXlvdXRcbiAgICAgKi9cbiAgICBnZXRMYXlvdXREYXRhKCk6IERhc2hib2FyZExheW91dERhdGFbXSB7XG4gICAgICAgIHJldHVybiB0aGlzLndpZGdldHMubWFwKHdpZGdldCA9PiB7XG4gICAgICAgICAgICByZXR1cm4geyBpZDogd2lkZ2V0LmlkLCBjb2w6IHdpZGdldC5nZXRDb2x1bW4oKSwgcm93OiB3aWRnZXQuZ2V0Um93KCksIGNvbFNwYW46IHdpZGdldC5nZXRDb2x1bW5TcGFuKCksIHJvd1NwYW46IHdpZGdldC5nZXRSb3dTcGFuKCkgfTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUG9zaXRpb24gd2lkZ2V0cyBwcm9ncmFtYXRpY2FsbHlcbiAgICAgKi9cbiAgICBzZXRMYXlvdXREYXRhKHdpZGdldHM6IERhc2hib2FyZExheW91dERhdGFbXSk6IHZvaWQge1xuXG4gICAgICAgIC8vIGl0ZXJhdGUgdGhyb3VnaCBlYWNoIHdpZGdldCBkYXRhIGFuZCBmaW5kIGEgbWF0Y2hcbiAgICAgICAgd2lkZ2V0cy5mb3JFYWNoKHdpZGdldCA9PiB7XG5cbiAgICAgICAgICAgIC8vIGZpbmQgdGhlIG1hdGNoaW5nIHdpZGdldFxuICAgICAgICAgICAgY29uc3QgdGFyZ2V0ID0gdGhpcy53aWRnZXRzLmZpbmQoX3dpZGdldCA9PiBfd2lkZ2V0LmlkID09PSB3aWRnZXQuaWQpO1xuXG4gICAgICAgICAgICBpZiAodGFyZ2V0KSB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0LnNldENvbHVtbih3aWRnZXQuY29sKTtcbiAgICAgICAgICAgICAgICB0YXJnZXQuc2V0Um93KHdpZGdldC5yb3cpO1xuICAgICAgICAgICAgICAgIHRhcmdldC5zZXRDb2x1bW5TcGFuKHdpZGdldC5jb2xTcGFuKTtcbiAgICAgICAgICAgICAgICB0YXJnZXQuc2V0Um93U3Bhbih3aWRnZXQucm93U3Bhbik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFVwZGF0ZSB0aGUgcG9zaXRpb25zIGFuZCBzaXplcyBvZiB0aGUgd2lkZ2V0c1xuICAgICAqL1xuICAgIHJlbmRlckRhc2hib2FyZCgpOiB2b2lkIHtcblxuICAgICAgICAvLyBnZXQgdGhlIGRpbWVuc2lvbnMgb2YgdGhlIGRhc2hib2FyZFxuICAgICAgICB0aGlzLl9yb3dIZWlnaHQgPSB0aGlzLm9wdGlvbnMucm93SGVpZ2h0IHx8IHRoaXMuY29sdW1uV2lkdGg7XG5cbiAgICAgICAgLy8gZW5zdXJlIHRoZSBjb2x1bW4gd2lkdGggaXMgbm90IGJlbG93IHRoZSBtaW4gd2lkdGhzXG4gICAgICAgIHRoaXMuc3RhY2tlZCQubmV4dCh0aGlzLmNvbHVtbldpZHRoIDwgdGhpcy5vcHRpb25zLm1pbldpZHRoKTtcblxuICAgICAgICAvLyBlbnN1cmUgdGhlIHJvdyBoZWlnaHQgaXMgbm90IGJlbG93IHRoZSBtaW4gd2lkdGhzXG4gICAgICAgIGlmICh0aGlzLl9yb3dIZWlnaHQgPCB0aGlzLm9wdGlvbnMubWluV2lkdGgpIHtcbiAgICAgICAgICAgIHRoaXMuX3Jvd0hlaWdodCA9IHRoaXMub3B0aW9ucy5taW5XaWR0aDtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2V0RGFzaGJvYXJkTGF5b3V0KCk7XG5cbiAgICAgICAgLy8gaXRlcmF0ZSB0aHJvdWdoIGVhY2ggd2lkZ2V0IGFuZCBzZXQgdGhlIHNpemUgLSBleGNlcHQgdGhlIG9uZSBiZWluZyByZXNpemVkXG4gICAgICAgIHRoaXMud2lkZ2V0cy5maWx0ZXIod2lkZ2V0ID0+ICF0aGlzLl9hY3Rpb25XaWRnZXQgfHwgd2lkZ2V0ICE9PSB0aGlzLl9hY3Rpb25XaWRnZXQud2lkZ2V0KVxuICAgICAgICAgICAgLmZvckVhY2god2lkZ2V0ID0+IHdpZGdldC5yZW5kZXIoKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRGV0ZXJtaW5lIHdoZXJlIHdpZGdldHMgc2hvdWxkIGJlIHBvc2l0aW9uZWQgYmFzZWQgb24gdGhlaXIgcG9zaXRpb25zLCB3aWR0aCBhbmQgdGhlIHNpemUgb2YgdGhlIGNvbnRhaW5lclxuICAgICAqL1xuICAgIHNldERhc2hib2FyZExheW91dCgpOiB2b2lkIHtcblxuICAgICAgICAvLyBmaW5kIGFueSB3aWRnZXRzIHRoYXQgZG8gbm90IGN1cnJlbnRseSBoYXZlIGEgcG9zaXRpb24gc2V0XG4gICAgICAgIHRoaXMud2lkZ2V0cy5maWx0ZXIod2lkZ2V0ID0+IHdpZGdldC5nZXRDb2x1bW4oKSA9PT0gdW5kZWZpbmVkIHx8IHdpZGdldC5nZXRSb3coKSA9PT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgLmZvckVhY2god2lkZ2V0ID0+IHRoaXMuc2V0V2lkZ2V0UG9zaXRpb24od2lkZ2V0KSk7XG5cbiAgICAgICAgdGhpcy5zZXREYXNoYm9hcmRIZWlnaHQoKTtcbiAgICB9XG5cbiAgICB1cGRhdGVXaGVuU3RhY2tlZCgpOiB2b2lkIHtcblxuICAgICAgICAvLyBpdGVyYXRlIHRocm91Z2ggZWFjaCB3aWRnZXQgc2V0IGl0J3Mgc3RhY2tlZCBzdGF0ZSBhbmRcbiAgICAgICAgdGhpcy5nZXRXaWRnZXRzQnlPcmRlcigpLmZvckVhY2goKHdpZGdldCwgaWR4KSA9PiB7XG4gICAgICAgICAgICB3aWRnZXQuc2V0Q29sdW1uKDApO1xuICAgICAgICAgICAgd2lkZ2V0LnNldFJvdyhpZHgpO1xuICAgICAgICB9KTtcblxuICAgIH1cblxuICAgIGdldFdpZGdldHNCeU9yZGVyKCk6IERhc2hib2FyZFdpZGdldENvbXBvbmVudFtdIHtcbiAgICAgICAgcmV0dXJuIHRoaXMud2lkZ2V0cy5zb3J0KCh3MSwgdzIpID0+IHtcblxuICAgICAgICAgICAgY29uc3QgdzFQb3NpdGlvbiA9IHcxLmdldENvbHVtbigpICogdzEuZ2V0Um93KCk7XG4gICAgICAgICAgICBjb25zdCB3MlBvc2l0aW9uID0gdzIuZ2V0Q29sdW1uKCkgKiB3Mi5nZXRSb3coKTtcblxuICAgICAgICAgICAgaWYgKHcxUG9zaXRpb24gPCB3MlBvc2l0aW9uKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIC0xO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodzFQb3NpdGlvbiA+IHcyUG9zaXRpb24pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gMTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEZpbmQgYSBwb3NpdGlvbiB0aGF0IGEgd2lkZ2V0IGNhbiBmaXQgaW4gdGhlIGRhc2hib2FyZFxuICAgICAqIEBwYXJhbSB3aWRnZXQgVGhlIHdpZGdldCB0byB0cnkgYW5kIHBvc2l0aW9uXG4gICAgICovXG4gICAgc2V0V2lkZ2V0UG9zaXRpb24od2lkZ2V0OiBEYXNoYm9hcmRXaWRnZXRDb21wb25lbnQpOiB2b2lkIHtcblxuICAgICAgICAvLyBmaW5kIGEgcG9zaXRpb24gZm9yIHRoZSB3aWRnZXRcbiAgICAgICAgbGV0IHBvc2l0aW9uID0gMDtcbiAgICAgICAgbGV0IHN1Y2Nlc3MgPSBmYWxzZTtcblxuICAgICAgICAvLyByZXBlYXQgdW50aWwgYSBzcGFjZSBpcyBmb3VuZFxuICAgICAgICB3aGlsZSAoIXN1Y2Nlc3MpIHtcblxuICAgICAgICAgICAgLy8gZ2V0IGEgcG9zaXRpb24gdG8gdHJ5XG4gICAgICAgICAgICBjb25zdCBjb2x1bW4gPSBwb3NpdGlvbiAlIHRoaXMub3B0aW9ucy5jb2x1bW5zO1xuICAgICAgICAgICAgY29uc3Qgcm93ID0gTWF0aC5mbG9vcihwb3NpdGlvbiAvIHRoaXMub3B0aW9ucy5jb2x1bW5zKTtcblxuICAgICAgICAgICAgLy8gY2hlY2sgdGhlIGN1cnJlbnQgcG9zaXRpb25cbiAgICAgICAgICAgIGlmICh0aGlzLmdldFBvc2l0aW9uQXZhaWxhYmxlKGNvbHVtbiwgcm93LCB3aWRnZXQuZ2V0Q29sdW1uU3BhbigpLCB3aWRnZXQuZ2V0Um93U3BhbigpKSkge1xuICAgICAgICAgICAgICAgIHN1Y2Nlc3MgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHdpZGdldC5zZXRDb2x1bW4oY29sdW1uKTtcbiAgICAgICAgICAgICAgICB3aWRnZXQuc2V0Um93KHJvdyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoY29sdW1uID09PSAwICYmIHdpZGdldC5jb2xTcGFuID4gdGhpcy5vcHRpb25zLmNvbHVtbnMpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Rhc2hib2FyZCB3aWRnZXRzIGhhdmUgYSBjb2xTcGFuIGdyZWF0ZXIgdGhhbiB0aGUgbWF4IG51bWJlciBvZiBkYXNoYm9hcmQgY29sdW1ucyEnKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcG9zaXRpb24rKztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENoZWNrIGlmIGEgcG9zaXRpb24gaW4gdGhlIGRhc2hib2FyZCBpcyB2YWNhbnQgb3Igbm90XG4gICAgICovXG4gICAgZ2V0UG9zaXRpb25BdmFpbGFibGUoY29sdW1uOiBudW1iZXIsIHJvdzogbnVtYmVyLCBjb2x1bW5TcGFuOiBudW1iZXIsIHJvd1NwYW46IG51bWJlciwgaWdub3JlV2lkZ2V0PzogRGFzaGJvYXJkV2lkZ2V0Q29tcG9uZW50KTogYm9vbGVhbiB7XG5cbiAgICAgICAgLy8gZ2V0IGEgbGlzdCBvZiBncmlkIHNwYWNlcyB0aGF0IGFyZSBwb3B1bGF0ZWRcbiAgICAgICAgY29uc3Qgc3BhY2VzID0gdGhpcy5nZXRPY2N1cGllZFNwYWNlcygpO1xuXG4gICAgICAgIC8vIGNoZWNrIGlmIHRoZSBibG9jayB3b3VsZCBzdGlsbCBiZSBpbiBib3VuZHNcbiAgICAgICAgaWYgKGNvbHVtbiArIGNvbHVtblNwYW4gPiB0aGlzLm9wdGlvbnMuY29sdW1ucykge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gY2hlY2sgZWFjaCByZXF1aXJlZCBwb3NpdGlvblxuICAgICAgICBmb3IgKGxldCB4ID0gY29sdW1uOyB4IDwgY29sdW1uICsgY29sdW1uU3BhbjsgeCsrKSB7XG4gICAgICAgICAgICBmb3IgKGxldCB5ID0gcm93OyB5IDwgcm93ICsgcm93U3BhbjsgeSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKHNwYWNlcy5maW5kKGJsb2NrID0+IGJsb2NrLmNvbHVtbiA9PT0geCAmJiBibG9jay5yb3cgPT09IHkgJiYgYmxvY2sud2lkZ2V0ICE9PSBpZ25vcmVXaWRnZXQpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBnZXRPY2N1cGllZFNwYWNlcygpOiBEYXNoYm9hcmRTcGFjZVtdIHtcblxuICAgICAgICAvLyBmaW5kIGFsbCBzcGFjZXMgdGhhdCBhcmUgY3VycmVudGx5IG9jY3VwaWVkXG4gICAgICAgIHJldHVybiB0aGlzLndpZGdldHMuZmlsdGVyKHdpZGdldCA9PiB3aWRnZXQuZ2V0Q29sdW1uKCkgIT09IHVuZGVmaW5lZCAmJiB3aWRnZXQuZ2V0Um93KCkgIT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgIC5yZWR1Y2UoKHZhbHVlLCB3aWRnZXQpID0+IHtcblxuICAgICAgICAgICAgICAgIHRoaXMuZm9yRWFjaEJsb2NrKHdpZGdldCwgKGNvbHVtbiwgcm93KSA9PiB2YWx1ZS5wdXNoKHsgd2lkZ2V0OiB3aWRnZXQsIGNvbHVtbjogY29sdW1uLCByb3c6IHJvdyB9KSk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgICAgICB9LCBbXSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQmVnaW4gcmVzaXppbmcgYSB3aWRnZXRcbiAgICAgKiBAcGFyYW0gYWN0aW9uIFRoZSB0aGUgd2lkZ2V0IHRvIHJlc2l6ZVxuICAgICAqL1xuICAgIG9uUmVzaXplU3RhcnQoYWN0aW9uOiBEYXNoYm9hcmRBY3Rpb24pOiB2b2lkIHtcblxuICAgICAgICAvLyBzdG9yZSB0aGUgbW91c2UgZXZlbnRcbiAgICAgICAgdGhpcy5fbW91c2VFdmVudCA9IGFjdGlvbi5ldmVudDtcbiAgICAgICAgdGhpcy5fYWN0aW9uV2lkZ2V0ID0gYWN0aW9uO1xuXG4gICAgICAgIC8vIGJyaW5nIHRoZSB3aWRnZXQgdG8gdGhlIGZvbnRcbiAgICAgICAgdGhpcy5icmluZ1RvRnJvbnQoYWN0aW9uLndpZGdldCk7XG4gICAgfVxuXG4gICAgb25SZXNpemVEcmFnKGFjdGlvbjogRGFzaGJvYXJkQWN0aW9uKTogdm9pZCB7XG5cbiAgICAgICAgY29uc3QgbW91c2VQb3NYID0gdGhpcy5fbW91c2VFdmVudC5wYWdlWCAtIHBhZ2VYT2Zmc2V0O1xuICAgICAgICBjb25zdCBtb3VzZVBvc1kgPSB0aGlzLl9tb3VzZUV2ZW50LnBhZ2VZIC0gcGFnZVlPZmZzZXQ7XG5cbiAgICAgICAgLy8gaWYgdGhlcmUgd2FzIG5vIG1vdmVtZW50IHRoZW4gZG8gbm90aGluZ1xuICAgICAgICBpZiAoYWN0aW9uLmV2ZW50LnggPT09IG1vdXNlUG9zWCAmJiBhY3Rpb24uZXZlbnQueSA9PT0gbW91c2VQb3NZKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyB1cGRhdGUgdGhlIHN0b3JlZCBtb3VzZSBldmVudFxuICAgICAgICB0aGlzLl9tb3VzZUV2ZW50ID0gYWN0aW9uLmV2ZW50O1xuXG4gICAgICAgIC8vIGdldCBoYW5kbGUgZm9yIGRpcmVjdGlvblxuICAgICAgICBjb25zdCB7IGhhbmRsZSB9ID0gYWN0aW9uO1xuXG4gICAgICAgIC8vIGdldCB0aGUgYm91bmRzIG9mIHRoZSBoYW5kbGVcbiAgICAgICAgY29uc3QgYm91bmRzID0gaGFuZGxlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXG4gICAgICAgIC8vIGdldCB0aGUgY2VudGVyIG9mIHRoZSBoYW5kbGVcbiAgICAgICAgY29uc3QgY2VudGVyWCA9IGJvdW5kcy5sZWZ0ICsgKGJvdW5kcy53aWR0aCAvIDIpO1xuICAgICAgICBjb25zdCBjZW50ZXJZID0gYm91bmRzLnRvcCArIChib3VuZHMuaGVpZ2h0IC8gMik7XG5cbiAgICAgICAgLy8gZ2V0IHRoZSBjdXJyZW50IG1vdXNlIHBvc2l0aW9uXG4gICAgICAgIGNvbnN0IG1vdXNlWCA9IG1vdXNlUG9zWCAtIGNlbnRlclg7XG4gICAgICAgIGNvbnN0IG1vdXNlWSA9IG1vdXNlUG9zWSAtIGNlbnRlclk7XG5cbiAgICAgICAgLy8gc3RvcmUgdGhlIG5ldyBwcm9wb3NlZCBkaW1lbnNpb25zIGZvciB0aGUgd2lkZ2V0XG4gICAgICAgIGNvbnN0IGRpbWVuc2lvbnM6IERhc2hib2FyZFdpZGdldERpbWVuc2lvbnMgPSB7XG4gICAgICAgICAgICB4OiBhY3Rpb24ud2lkZ2V0LngsXG4gICAgICAgICAgICB5OiBhY3Rpb24ud2lkZ2V0LnksXG4gICAgICAgICAgICB3aWR0aDogYWN0aW9uLndpZGdldC53aWR0aCxcbiAgICAgICAgICAgIGhlaWdodDogYWN0aW9uLndpZGdldC5oZWlnaHRcbiAgICAgICAgfTtcblxuICAgICAgICAvLyB1cGRhdGUgd2lkZ2V0IGJhc2VkIG9uIHRoZSBoYW5kbGUgYmVpbmcgZHJhZ2dlZFxuICAgICAgICBzd2l0Y2ggKGFjdGlvbi5kaXJlY3Rpb24pIHtcblxuICAgICAgICAgICAgY2FzZSBBY3Rpb25EaXJlY3Rpb24uUmlnaHQ6XG4gICAgICAgICAgICAgICAgZGltZW5zaW9ucy53aWR0aCArPSBtb3VzZVg7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgQWN0aW9uRGlyZWN0aW9uLkxlZnQ6XG4gICAgICAgICAgICAgICAgZGltZW5zaW9ucy54ICs9IG1vdXNlWDtcbiAgICAgICAgICAgICAgICBkaW1lbnNpb25zLndpZHRoIC09IG1vdXNlWDtcblxuICAgICAgICAgICAgICAgIGlmIChkaW1lbnNpb25zLndpZHRoIDwgdGhpcy5vcHRpb25zLm1pbldpZHRoKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGRpZmZlcmVuY2UgPSB0aGlzLm9wdGlvbnMubWluV2lkdGggLSBkaW1lbnNpb25zLndpZHRoO1xuICAgICAgICAgICAgICAgICAgICBkaW1lbnNpb25zLnggLT0gZGlmZmVyZW5jZTtcbiAgICAgICAgICAgICAgICAgICAgZGltZW5zaW9ucy53aWR0aCArPSBkaWZmZXJlbmNlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIEFjdGlvbkRpcmVjdGlvbi5Cb3R0b206XG4gICAgICAgICAgICAgICAgZGltZW5zaW9ucy5oZWlnaHQgKz0gbW91c2VZO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIEFjdGlvbkRpcmVjdGlvbi5Ub3A6XG4gICAgICAgICAgICAgICAgZGltZW5zaW9ucy55ICs9IG1vdXNlWTtcbiAgICAgICAgICAgICAgICBkaW1lbnNpb25zLmhlaWdodCAtPSBtb3VzZVk7XG5cbiAgICAgICAgICAgICAgICBpZiAoZGltZW5zaW9ucy5oZWlnaHQgPCB0aGlzLm9wdGlvbnMubWluSGVpZ2h0KSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGRpZmZlcmVuY2UgPSB0aGlzLm9wdGlvbnMubWluSGVpZ2h0IC0gZGltZW5zaW9ucy5oZWlnaHQ7XG4gICAgICAgICAgICAgICAgICAgIGRpbWVuc2lvbnMueSAtPSBkaWZmZXJlbmNlO1xuICAgICAgICAgICAgICAgICAgICBkaW1lbnNpb25zLmhlaWdodCArPSBkaWZmZXJlbmNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgLy8gU3VwcG9ydCByZXNpemluZyBvbiBtdWx0aXBsZSBheGlzIHNpbXVsdGFuZW91c2x5XG4gICAgICAgICAgICBjYXNlIEFjdGlvbkRpcmVjdGlvbi5Ub3BMZWZ0OlxuXG4gICAgICAgICAgICAgICAgZGltZW5zaW9ucy54ICs9IG1vdXNlWDtcbiAgICAgICAgICAgICAgICBkaW1lbnNpb25zLndpZHRoIC09IG1vdXNlWDtcblxuICAgICAgICAgICAgICAgIGlmIChkaW1lbnNpb25zLndpZHRoIDwgdGhpcy5vcHRpb25zLm1pbldpZHRoKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGRpZmZlcmVuY2UgPSB0aGlzLm9wdGlvbnMubWluV2lkdGggLSBkaW1lbnNpb25zLndpZHRoO1xuICAgICAgICAgICAgICAgICAgICBkaW1lbnNpb25zLnggLT0gZGlmZmVyZW5jZTtcbiAgICAgICAgICAgICAgICAgICAgZGltZW5zaW9ucy53aWR0aCArPSBkaWZmZXJlbmNlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGRpbWVuc2lvbnMueSArPSBtb3VzZVk7XG4gICAgICAgICAgICAgICAgZGltZW5zaW9ucy5oZWlnaHQgLT0gbW91c2VZO1xuXG4gICAgICAgICAgICAgICAgaWYgKGRpbWVuc2lvbnMuaGVpZ2h0IDwgdGhpcy5vcHRpb25zLm1pbkhlaWdodCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBkaWZmZXJlbmNlID0gdGhpcy5vcHRpb25zLm1pbkhlaWdodCAtIGRpbWVuc2lvbnMuaGVpZ2h0O1xuICAgICAgICAgICAgICAgICAgICBkaW1lbnNpb25zLnkgLT0gZGlmZmVyZW5jZTtcbiAgICAgICAgICAgICAgICAgICAgZGltZW5zaW9ucy5oZWlnaHQgKz0gZGlmZmVyZW5jZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgQWN0aW9uRGlyZWN0aW9uLlRvcFJpZ2h0OlxuICAgICAgICAgICAgICAgIGRpbWVuc2lvbnMud2lkdGggKz0gbW91c2VYO1xuICAgICAgICAgICAgICAgIGRpbWVuc2lvbnMueSArPSBtb3VzZVk7XG4gICAgICAgICAgICAgICAgZGltZW5zaW9ucy5oZWlnaHQgLT0gbW91c2VZO1xuXG4gICAgICAgICAgICAgICAgaWYgKGRpbWVuc2lvbnMuaGVpZ2h0IDwgdGhpcy5vcHRpb25zLm1pbkhlaWdodCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBkaWZmZXJlbmNlID0gdGhpcy5vcHRpb25zLm1pbkhlaWdodCAtIGRpbWVuc2lvbnMuaGVpZ2h0O1xuICAgICAgICAgICAgICAgICAgICBkaW1lbnNpb25zLnkgLT0gZGlmZmVyZW5jZTtcbiAgICAgICAgICAgICAgICAgICAgZGltZW5zaW9ucy5oZWlnaHQgKz0gZGlmZmVyZW5jZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgQWN0aW9uRGlyZWN0aW9uLkJvdHRvbUxlZnQ6XG4gICAgICAgICAgICAgICAgZGltZW5zaW9ucy5oZWlnaHQgKz0gbW91c2VZO1xuICAgICAgICAgICAgICAgIGRpbWVuc2lvbnMueCArPSBtb3VzZVg7XG4gICAgICAgICAgICAgICAgZGltZW5zaW9ucy53aWR0aCAtPSBtb3VzZVg7XG5cbiAgICAgICAgICAgICAgICBpZiAoZGltZW5zaW9ucy53aWR0aCA8IHRoaXMub3B0aW9ucy5taW5XaWR0aCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBkaWZmZXJlbmNlID0gdGhpcy5vcHRpb25zLm1pbldpZHRoIC0gZGltZW5zaW9ucy53aWR0aDtcbiAgICAgICAgICAgICAgICAgICAgZGltZW5zaW9ucy54IC09IGRpZmZlcmVuY2U7XG4gICAgICAgICAgICAgICAgICAgIGRpbWVuc2lvbnMud2lkdGggKz0gZGlmZmVyZW5jZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgQWN0aW9uRGlyZWN0aW9uLkJvdHRvbVJpZ2h0OlxuICAgICAgICAgICAgICAgIGRpbWVuc2lvbnMuaGVpZ2h0ICs9IG1vdXNlWTtcbiAgICAgICAgICAgICAgICBkaW1lbnNpb25zLndpZHRoICs9IG1vdXNlWDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGN1cnJlbnRXaWR0aCA9IGFjdGlvbi53aWRnZXQueCArIGFjdGlvbi53aWRnZXQud2lkdGg7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRIZWlnaHQgPSBhY3Rpb24ud2lkZ2V0LnkgKyBhY3Rpb24ud2lkZ2V0LmhlaWdodDtcblxuICAgICAgICAvLyBlbnN1cmUgdmFsdWVzIGFyZSB3aXRoaW4gdGhlIGRhc2hib2FyZCBib3VuZHNcbiAgICAgICAgaWYgKGRpbWVuc2lvbnMueCA8IDApIHtcbiAgICAgICAgICAgIGRpbWVuc2lvbnMueCA9IDA7XG4gICAgICAgICAgICBkaW1lbnNpb25zLndpZHRoID0gY3VycmVudFdpZHRoO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGRpbWVuc2lvbnMueSA8IDApIHtcbiAgICAgICAgICAgIGRpbWVuc2lvbnMueSA9IDA7XG4gICAgICAgICAgICBkaW1lbnNpb25zLmhlaWdodCA9IGN1cnJlbnRIZWlnaHQ7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoKGRpbWVuc2lvbnMueCArIGRpbWVuc2lvbnMud2lkdGgpID4gdGhpcy5kaW1lbnNpb25zLndpZHRoKSB7XG4gICAgICAgICAgICBkaW1lbnNpb25zLndpZHRoID0gdGhpcy5kaW1lbnNpb25zLndpZHRoIC0gZGltZW5zaW9ucy54O1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gaWYgdGhlIHByb3Bvc2VkIHdpZHRoIGlzIHNtYWxsZXIgdGhhbiBhbGxvd2VkIHRoZW4gcmVzZXQgd2lkdGggdG8gbWluaW11bSBhbmQgaWdub3JlIHggY2hhbmdlc1xuICAgICAgICBpZiAoZGltZW5zaW9ucy53aWR0aCA8IHRoaXMub3B0aW9ucy5taW5XaWR0aCkge1xuICAgICAgICAgICAgZGltZW5zaW9ucy54ID0gYWN0aW9uLndpZGdldC54O1xuICAgICAgICAgICAgZGltZW5zaW9ucy53aWR0aCA9IHRoaXMub3B0aW9ucy5taW5XaWR0aDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGlmIHRoZSBwcm9wb3NlZCBoZWlnaHQgaXMgc21hbGxlciB0aGFuIGFsbG93ZWQgdGhlbiByZXNldCBoZWlnaHQgdG8gbWluaW11bSBhbmQgaWdub3JlIHkgY2hhbmdlc1xuICAgICAgICBpZiAoZGltZW5zaW9ucy5oZWlnaHQgPCB0aGlzLm9wdGlvbnMubWluSGVpZ2h0KSB7XG4gICAgICAgICAgICBkaW1lbnNpb25zLnkgPSBhY3Rpb24ud2lkZ2V0Lnk7XG4gICAgICAgICAgICBkaW1lbnNpb25zLmhlaWdodCA9IHRoaXMub3B0aW9ucy5taW5IZWlnaHQ7XG4gICAgICAgIH1cblxuICAgICAgICAvLyB1cGRhdGUgdGhlIHdpZGdldCBhY3R1YWwgdmFsdWVzXG4gICAgICAgIGFjdGlvbi53aWRnZXQuc2V0Qm91bmRzKGRpbWVuc2lvbnMueCwgZGltZW5zaW9ucy55LCBkaW1lbnNpb25zLndpZHRoLCBkaW1lbnNpb25zLmhlaWdodCk7XG5cbiAgICAgICAgLy8gdXBkYXRlIHBsYWNlaG9sZGVyIHBvc2l0aW9uIGFuZCB2YWx1ZVxuICAgICAgICB0aGlzLnNldFBsYWNlaG9sZGVyQm91bmRzKHRydWUsIGRpbWVuc2lvbnMueCwgZGltZW5zaW9ucy55LCBkaW1lbnNpb25zLndpZHRoLCBkaW1lbnNpb25zLmhlaWdodCk7XG5cbiAgICAgICAgLy8gc2hvdyB0aGUgd2lkZ2V0IHBvc2l0aW9ucyBpZiB0aGUgY3VycmVudCBwb3NpdGlvbnMgYW5kIHNpemVzIHdlcmUgdG8gcGVyc2lzdFxuICAgICAgICB0aGlzLnVwZGF0ZVdpZGdldFBvc2l0aW9ucyhhY3Rpb24ud2lkZ2V0KTtcbiAgICB9XG5cbiAgICBvblJlc2l6ZUVuZCgpOiB2b2lkIHtcblxuICAgICAgICBjb25zdCBwbGFjZWhvbGRlciA9IHRoaXMucGxhY2Vob2xkZXIkLmdldFZhbHVlKCk7XG5cbiAgICAgICAgLy8gY29tbWl0IHJlc2l6ZSBjaGFuZ2VzXG4gICAgICAgIHRoaXMuY29tbWl0V2lkZ2V0Q2hhbmdlcygpO1xuXG4gICAgICAgIC8vIGhpZGUgcGxhY2Vob2xkZXJcbiAgICAgICAgcGxhY2Vob2xkZXIudmlzaWJsZSA9IGZhbHNlO1xuXG4gICAgICAgIC8vIHVwZGF0ZSB0aGUgcGxhY2Vob2xkZXJcbiAgICAgICAgdGhpcy5wbGFjZWhvbGRlciQubmV4dChwbGFjZWhvbGRlcik7XG5cbiAgICAgICAgdGhpcy5fYWN0aW9uV2lkZ2V0ID0gbnVsbDtcbiAgICAgICAgdGhpcy5fbW91c2VFdmVudCA9IG51bGw7XG5cbiAgICAgICAgLy8gZW5zdXJlIGFueSB2YWNhbnQgdXBwZXIgc3BhY2VzIGFyZSBmaWxsZWQgd2hlcmUgcmVxdWlyZWRcbiAgICAgICAgdGhpcy5zaGlmdFdpZGdldHNVcCgpO1xuXG4gICAgICAgIC8vIHVwZGF0ZSBkYXNoYm9hcmQgaGVpZ2h0XG4gICAgICAgIHRoaXMuc2V0RGFzaGJvYXJkSGVpZ2h0KCk7XG5cbiAgICAgICAgLy8gZW1pdCBpbmZvcm1hdGlvbiBhYm91dCB0aGUgbGF5b3V0XG4gICAgICAgIHRoaXMubGF5b3V0JC5uZXh0KHRoaXMuZ2V0TGF5b3V0RGF0YSgpKTtcbiAgICB9XG5cbiAgICBvbkRyYWdTdGFydChhY3Rpb246IERhc2hib2FyZEFjdGlvbik6IHZvaWQge1xuICAgICAgICB0aGlzLm9uUmVzaXplU3RhcnQoYWN0aW9uKTtcblxuICAgICAgICAvLyBzdG9yZSB0aGUgc3RhcnRpbmcgcGxhY2Vob2xkZXIgcG9zaXRpb25cbiAgICAgICAgdGhpcy5zZXRXaWRnZXRPcmlnaW4oKTtcblxuICAgICAgICB0aGlzLmNhY2hlV2lkZ2V0cygpO1xuICAgIH1cblxuICAgIG9uRHJhZ0VuZCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5vblJlc2l6ZUVuZCgpO1xuXG4gICAgICAgIHRoaXMuX3dpZGdldE9yaWdpbiA9IHt9O1xuICAgIH1cblxuICAgIG9uRHJhZyhhY3Rpb246IERhc2hib2FyZEFjdGlvbik6IHZvaWQge1xuXG4gICAgICAgIC8vIGlmIHRoZXJlIHdhcyBubyBtb3ZlbWVudCB0aGVuIGRvIG5vdGhpbmdcbiAgICAgICAgaWYgKGFjdGlvbi5ldmVudC5wYWdlWCA9PT0gdGhpcy5fbW91c2VFdmVudC5wYWdlWCAmJiBhY3Rpb24uZXZlbnQucGFnZVkgPT09IHRoaXMuX21vdXNlRXZlbnQucGFnZVkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGdldCB0aGUgY3VycmVudCBtb3VzZSBwb3NpdGlvblxuICAgICAgICBjb25zdCBtb3VzZVggPSBhY3Rpb24uZXZlbnQucGFnZVggLSB0aGlzLl9tb3VzZUV2ZW50LnBhZ2VYO1xuICAgICAgICBjb25zdCBtb3VzZVkgPSBhY3Rpb24uZXZlbnQucGFnZVkgLSB0aGlzLl9tb3VzZUV2ZW50LnBhZ2VZO1xuXG4gICAgICAgIC8vIHN0b3JlIHRoZSBsYXRlc3QgZXZlbnRcbiAgICAgICAgdGhpcy5fbW91c2VFdmVudCA9IGFjdGlvbi5ldmVudDtcblxuICAgICAgICBjb25zdCBkaW1lbnNpb25zOiBEYXNoYm9hcmRXaWRnZXREaW1lbnNpb25zID0ge1xuICAgICAgICAgICAgeDogYWN0aW9uLndpZGdldC54ICsgbW91c2VYLFxuICAgICAgICAgICAgeTogYWN0aW9uLndpZGdldC55ICsgbW91c2VZLFxuICAgICAgICAgICAgd2lkdGg6IGFjdGlvbi53aWRnZXQud2lkdGgsXG4gICAgICAgICAgICBoZWlnaHQ6IGFjdGlvbi53aWRnZXQuaGVpZ2h0XG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5yZXN0b3JlV2lkZ2V0cyh0cnVlKTtcblxuICAgICAgICAvLyB1cGRhdGUgd2lkZ2V0IHBvc2l0aW9uXG4gICAgICAgIGFjdGlvbi53aWRnZXQuc2V0Qm91bmRzKGRpbWVuc2lvbnMueCwgZGltZW5zaW9ucy55LCBkaW1lbnNpb25zLndpZHRoLCBkaW1lbnNpb25zLmhlaWdodCk7XG5cbiAgICAgICAgLy8gdXBkYXRlIHBsYWNlaG9sZGVyIHBvc2l0aW9uIGFuZCB2YWx1ZVxuICAgICAgICB0aGlzLnNldFBsYWNlaG9sZGVyQm91bmRzKHRydWUsIGRpbWVuc2lvbnMueCwgZGltZW5zaW9ucy55LCBkaW1lbnNpb25zLndpZHRoLCBkaW1lbnNpb25zLmhlaWdodCk7XG5cbiAgICAgICAgLy8gc2hvdyB0aGUgd2lkZ2V0IHBvc2l0aW9ucyBpZiB0aGUgY3VycmVudCBwb3NpdGlvbnMgYW5kIHNpemVzIHdlcmUgdG8gcGVyc2lzdFxuICAgICAgICB0aGlzLnNoaWZ0V2lkZ2V0cygpO1xuXG4gICAgICAgIHRoaXMuc2V0RGFzaGJvYXJkSGVpZ2h0KCk7XG4gICAgfVxuXG4gICAgZ2V0Um93SGVpZ2h0KCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9yb3dIZWlnaHQ7XG4gICAgfVxuXG4gICAgY2FjaGVXaWRnZXRzKCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9jYWNoZSA9IHRoaXMud2lkZ2V0cy5tYXAod2lkZ2V0ID0+ICh7IGlkOiB3aWRnZXQuaWQsIGNvbHVtbjogd2lkZ2V0LmdldENvbHVtbigpLCByb3c6IHdpZGdldC5nZXRSb3coKSB9KSk7XG4gICAgfVxuXG4gICAgcmVzdG9yZVdpZGdldHMoaWdub3JlQWN0aW9uV2lkZ2V0OiBib29sZWFuID0gZmFsc2UpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fY2FjaGUuZmlsdGVyKHdpZGdldCA9PiAhaWdub3JlQWN0aW9uV2lkZ2V0IHx8IHdpZGdldC5pZCAhPT0gdGhpcy5fYWN0aW9uV2lkZ2V0LndpZGdldC5pZCkuZm9yRWFjaCh3aWRnZXQgPT4ge1xuXG4gICAgICAgICAgICBjb25zdCBtYXRjaCA9IHRoaXMud2lkZ2V0cy5maW5kKHdndCA9PiB3Z3QuaWQgPT09IHdpZGdldC5pZCk7XG5cbiAgICAgICAgICAgIGlmIChtYXRjaCkge1xuICAgICAgICAgICAgICAgIG1hdGNoLnNldENvbHVtbih3aWRnZXQuY29sdW1uKTtcbiAgICAgICAgICAgICAgICBtYXRjaC5zZXRSb3cod2lkZ2V0LnJvdyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFdoZW4gZHJhZ2dpbmcgYW55IHdpZGdldHMgdGhhdCBuZWVkIHRvIGJlIG1vdmVkIHNob3VsZCBiZSBtb3ZlZCB0byBhbiBhcHByb3ByaWF0ZSBwb3NpdGlvblxuICAgICAqL1xuICAgIHNoaWZ0V2lkZ2V0cygpOiB2b2lkIHtcblxuICAgICAgICBsZXQgd2lkZ2V0c1RvTW92ZTogRGFzaGJvYXJkV2lkZ2V0Q29tcG9uZW50W10gPSBbXTtcblxuICAgICAgICBjb25zdCBwbGFjZWhvbGRlciA9IHRoaXMucGxhY2Vob2xkZXIkLmdldFZhbHVlKCk7XG5cbiAgICAgICAgLy8gY2hlY2sgaWYgdGhlcmUgYXJlIGFueSB3aWRnZXRzIHVuZGVyIHRoZSBwbGFjZWhvbGRlclxuICAgICAgICBmb3IgKGxldCByb3cgPSBwbGFjZWhvbGRlci5yb3c7IHJvdyA8IHBsYWNlaG9sZGVyLnJvdyArIHBsYWNlaG9sZGVyLnJvd1NwYW47IHJvdysrKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBjb2x1bW4gPSBwbGFjZWhvbGRlci5jb2x1bW47IGNvbHVtbiA8IHBsYWNlaG9sZGVyLmNvbHVtbiArIHBsYWNlaG9sZGVyLmNvbHVtblNwYW47IGNvbHVtbisrKSB7XG5cbiAgICAgICAgICAgICAgICAvLyBzdG9yZSByZWZlcmVuY2UgdG8gYW55IHdpZGdldHMgdGhhdCBuZWVkIG1vdmVkXG4gICAgICAgICAgICAgICAgdGhpcy5nZXRPY2N1cGllZFNwYWNlcygpXG4gICAgICAgICAgICAgICAgICAgIC5maWx0ZXIoc3BhY2UgPT4gc3BhY2UuY29sdW1uID09PSBjb2x1bW4gJiYgc3BhY2Uucm93ID09PSByb3cgJiYgc3BhY2Uud2lkZ2V0ICE9PSB0aGlzLl9hY3Rpb25XaWRnZXQud2lkZ2V0KVxuICAgICAgICAgICAgICAgICAgICAuZm9yRWFjaChzcGFjZSA9PiB3aWRnZXRzVG9Nb3ZlLnB1c2goc3BhY2Uud2lkZ2V0KSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyByZW1vdmUgYW55IGR1cGxpY2F0ZXNcbiAgICAgICAgd2lkZ2V0c1RvTW92ZSA9IHdpZGdldHNUb01vdmUuZmlsdGVyKCh3aWRnZXQsIGlkeCwgYXJyYXkpID0+IGFycmF5LmluZGV4T2Yod2lkZ2V0KSA9PT0gaWR4KTtcblxuICAgICAgICAvLyBpZiBubyB3aWRnZXRzIG5lZWQgbW92ZWQgdGhlbiB3ZSBjYW4gc3RvcCBoZXJlXG4gICAgICAgIGlmICh3aWRnZXRzVG9Nb3ZlLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gY3JlYXRlIGEgZHVwbGljYXRlIHdlIGNhbiB1c2UgdG8ga2VlcCB0cmFjayBvZiB3aGljaCBoYXZlIGJlZW4gbW92ZWRcbiAgICAgICAgY29uc3QgdW5tb3ZlZFdpZGdldHMgPSB3aWRnZXRzVG9Nb3ZlLnNsaWNlKCk7XG5cbiAgICAgICAgLy8gYXR0ZW1wdCB0byBtb3ZlIGFueSB3aWRnZXRzIHRvIHRoZSBwcmV2aW91cyB3aWRnZXQgcG9zaXRpb25cbiAgICAgICAgd2lkZ2V0c1RvTW92ZS5mb3JFYWNoKHdpZGdldCA9PiB7XG5cbiAgICAgICAgICAgIC8vIGdldCBhIGdyaWQgb2ZmIGFsbCBvY2N1cGllZCBzcGFjZXMgLSB0YWtpbmcgaW50byBhY2NvdW50IHRoZSBwbGFjZWhvbGRlciBhbmQgaWdub3Jpbmcgd2lkZ2V0cyB0aGF0IG5lZWQgbW92ZWRcbiAgICAgICAgICAgIGNvbnN0IGdyaWQgPSB0aGlzLmdldE9jY3VwaWVkU3BhY2VzKCkuZmlsdGVyKHNwYWNlID0+ICF1bm1vdmVkV2lkZ2V0cy5maW5kKHdndCA9PiB3Z3QgPT09IHNwYWNlLndpZGdldCkpO1xuXG4gICAgICAgICAgICAvLyBpdGVyYXRlIGVhY2ggZnJlZSBibG9ja1xuICAgICAgICAgICAgZm9yIChsZXQgcm93ID0gdGhpcy5fd2lkZ2V0T3JpZ2luLnJvdzsgcm93IDwgdGhpcy5fd2lkZ2V0T3JpZ2luLnJvdyArIHRoaXMuX3dpZGdldE9yaWdpbi5yb3dTcGFuOyByb3crKykge1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGNvbHVtbiA9IHRoaXMuX3dpZGdldE9yaWdpbi5jb2x1bW47IGNvbHVtbiA8IHRoaXMuX3dpZGdldE9yaWdpbi5jb2x1bW4gKyB0aGlzLl93aWRnZXRPcmlnaW4uY29sdW1uU3BhbjsgY29sdW1uKyspIHtcblxuICAgICAgICAgICAgICAgICAgICAvLyBkZXRlcm1pbmUgaWYgdGhlIGJsb2NrIGNhbiBmaXQgaW4gdGhpcyBzcGFjZVxuICAgICAgICAgICAgICAgICAgICBsZXQgcmVxdWlyZWRTcGFjZXMgPSB0aGlzLmdldFJlcXVpcmVkU3BhY2VzRnJvbVBvaW50KHdpZGdldCwgY29sdW1uLCByb3cpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIGNoZWNrIGlmIHdpZGdldCB3b3VsZCBmaXQgaW4gc3BhY2VcbiAgICAgICAgICAgICAgICAgICAgbGV0IGF2YWlsYWJsZSA9IHJlcXVpcmVkU3BhY2VzLmV2ZXJ5KHNwYWNlID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAhZ3JpZC5maW5kKGdyaWRTcGFjZSA9PiBncmlkU3BhY2UuY29sdW1uID09PSBzcGFjZS5jb2x1bW4gJiYgZ3JpZFNwYWNlLnJvdyA9PT0gc3BhY2Uucm93KSAmJiBzcGFjZS5jb2x1bW4gPCB0aGlzLmdldENvbHVtbkNvdW50KCk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChhdmFpbGFibGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZGdldC5zZXRDb2x1bW4oY29sdW1uKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZGdldC5zZXRSb3cocm93KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHVubW92ZWRXaWRnZXRzLnNwbGljZSh1bm1vdmVkV2lkZ2V0cy5maW5kSW5kZXgod2d0ID0+IHdndCA9PT0gd2lkZ2V0KSwgMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGlmIHdlIGdldCB0byBoZXJlIHRoZW4gd2UgY2FuJ3Qgc2ltcGx5IHN3YXAgdGhlIHBvc2l0aW9ucyAtIG5leHQgdHJ5IG1vdmluZyByaWdodFxuICAgICAgICAgICAgaWYgKHRoaXMuY2FuV2lkZ2V0TW92ZVJpZ2h0KHdpZGdldCwgdHJ1ZSkpIHtcblxuICAgICAgICAgICAgICAgIC8vIGFmdGVyIHRoZSBzaGlmdCBjaGVjayBpZiBwbGFjZWhvbGRlciBwb3NpdGlvbiBpcyBzdGlsbCB2YWxpZFxuICAgICAgICAgICAgICAgIHRoaXMudmFsaWRhdGVQbGFjZWhvbGRlclBvc2l0aW9uKEFjdGlvbkRpcmVjdGlvbi5SaWdodCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBuZXh0IHRyeSBtb3ZpbmcgbGVmdFxuICAgICAgICAgICAgaWYgKHRoaXMuY2FuV2lkZ2V0TW92ZUxlZnQod2lkZ2V0LCB0cnVlKSkge1xuXG4gICAgICAgICAgICAgICAgLy8gYWZ0ZXIgdGhlIHNoaWZ0IGNoZWNrIGlmIHBsYWNlaG9sZGVyIHBvc2l0aW9uIGlzIHN0aWxsIHZhbGlkXG4gICAgICAgICAgICAgICAgdGhpcy52YWxpZGF0ZVBsYWNlaG9sZGVyUG9zaXRpb24oQWN0aW9uRGlyZWN0aW9uLkxlZnQpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gZGV0ZXJtaW5lIHRoZSBkaXN0YW5jZSB0aGF0IHRoZSB3aWRnZXQgbmVlZHMgdG8gYmUgbW92ZWQgZG93blxuICAgICAgICAgICAgbGV0IGRpc3RhbmNlID0gKHRoaXMuX2FjdGlvbldpZGdldC53aWRnZXQuZ2V0Um93KCkgLSB3aWRnZXQuZ2V0Um93KCkpICsgdGhpcy5fYWN0aW9uV2lkZ2V0LndpZGdldC5nZXRSb3dTcGFuKCk7XG5cbiAgICAgICAgICAgIC8vIGFzIGEgbGFzdCByZXNvcnQgbW92ZSB0aGUgd2lkZ2V0IGRvd253YXJkc1xuICAgICAgICAgICAgdGhpcy5tb3ZlV2lkZ2V0RG93bih3aWRnZXQsIGRpc3RhbmNlKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWZ0ZXIgc2hpZnRzIGhhdmUgdGFrZW4gcGxhY2Ugd2Ugc2hvdWxkIHZlcmlmeSB0aGUgcGxhY2UgaG9sZGVyIHBvc2l0aW9uIGlzIHN0aWxsIHZhbGlkXG4gICAgICogQHBhcmFtIHNoaWZ0RGlyZWN0aW9uIC0gdGhlIHBvc2l0aW9uIHdpZGdldHMgd2VyZSBzaGlmdGVkXG4gICAgICovXG4gICAgdmFsaWRhdGVQbGFjZWhvbGRlclBvc2l0aW9uKHNoaWZ0RGlyZWN0aW9uOiBBY3Rpb25EaXJlY3Rpb24pIHtcblxuICAgICAgICBjb25zdCBwbGFjZWhvbGRlciA9IHRoaXMucGxhY2Vob2xkZXIkLmdldFZhbHVlKCk7XG5cbiAgICAgICAgLy8gY2hlY2sgaWYgdGhlIHBsYWNlaG9sZGVyIGlzIG92ZXIgYSB3aWRnZXRcbiAgICAgICAgaWYgKHRoaXMuZ2V0V2lkZ2V0c0F0UG9zaXRpb24ocGxhY2Vob2xkZXIuY29sdW1uLCBwbGFjZWhvbGRlci5yb3csIHRydWUpLmxlbmd0aCA+IDApIHtcblxuICAgICAgICAgICAgLy8gbW92ZSB0aGUgcGxhY2Vob2xkZXIgdGhlIG9wcG9zaXRlIGRpcmVjdGlvblxuICAgICAgICAgICAgc3dpdGNoIChzaGlmdERpcmVjdGlvbikge1xuXG4gICAgICAgICAgICAgICAgY2FzZSBBY3Rpb25EaXJlY3Rpb24uTGVmdDpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRQbGFjZWhvbGRlckJvdW5kcyhwbGFjZWhvbGRlci52aXNpYmxlLCBwbGFjZWhvbGRlci54ICsgdGhpcy5nZXRDb2x1bW5XaWR0aCgpLCBwbGFjZWhvbGRlci55LCBwbGFjZWhvbGRlci53aWR0aCwgcGxhY2Vob2xkZXIuaGVpZ2h0KTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlIEFjdGlvbkRpcmVjdGlvbi5SaWdodDpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRQbGFjZWhvbGRlckJvdW5kcyhwbGFjZWhvbGRlci52aXNpYmxlLCBwbGFjZWhvbGRlci54IC0gdGhpcy5nZXRDb2x1bW5XaWR0aCgpLCBwbGFjZWhvbGRlci55LCBwbGFjZWhvbGRlci53aWR0aCwgcGxhY2Vob2xkZXIuaGVpZ2h0KTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIHZhbGlkYXRlIHRoaXMgbmV3IHBvc2l0aW9uIGFnYWluXG4gICAgICAgICAgICB0aGlzLnZhbGlkYXRlUGxhY2Vob2xkZXJQb3NpdGlvbihzaGlmdERpcmVjdGlvbik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEZXRlcm1pbmUgaWYgYSB3aWRnZXQgY2FuIGJlIG1vdmVkIGxlZnQgLSBvciBpZiBpdCBjYW4gbW92ZSB0aGUgd2lkZ2V0cyB0byB0aGUgcmlnaHQgdG8gbWFrZSBzcGFjZSBmb3IgdGhlIHdpZGdldFxuICAgICAqL1xuICAgIGNhbldpZGdldE1vdmVMZWZ0KHdpZGdldDogRGFzaGJvYXJkV2lkZ2V0Q29tcG9uZW50LCBwZXJmb3JtTW92ZTogYm9vbGVhbiA9IGZhbHNlKTogYm9vbGVhbiB7XG5cbiAgICAgICAgLy8gY2hlY2sgaWYgdGhlIHdpZGdldCBpcyB0aGUgYWN0aW9uIHdpZGdldCBvciBvY2N1cGllcyB0aGUgZmlyc3QgY29sdW1uXG4gICAgICAgIGlmICh3aWRnZXQgPT09IHRoaXMuX2FjdGlvbldpZGdldC53aWRnZXQgfHwgd2lkZ2V0LmdldENvbHVtbigpID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBmaW5kIHRoZSBwb3NpdGlvbnMgcmVxdWlyZWRcbiAgICAgICAgY29uc3QgdGFyZ2V0U3BhY2VzID0gdGhpcy5nZXRPY2N1cGllZFNwYWNlcygpLmZpbHRlcihzcGFjZSA9PiBzcGFjZS53aWRnZXQgPT09IHdpZGdldCkubWFwKHNwYWNlID0+IHtcbiAgICAgICAgICAgIHJldHVybiB7IGNvbHVtbjogc3BhY2UuY29sdW1uIC0gd2lkZ2V0LmdldENvbHVtblNwYW4oKSwgcm93OiBzcGFjZS5yb3csIHdpZGdldDogc3BhY2Uud2lkZ2V0IH07XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIGNoZWNrIGlmIHRoZXJlIGFyZSB3aWRnZXQgaW4gdGhlIHJlcXVpcmVkIHBvc2l0aW9ucyBhbmQgaWYgc28sIGNhbiB0aGV5IG1vdmUgcmlnaHQ/XG4gICAgICAgIGNvbnN0IG1vdmVhYmxlID0gdGFyZ2V0U3BhY2VzLmV2ZXJ5KHNwYWNlID0+IHRoaXMuZ2V0V2lkZ2V0c0F0UG9zaXRpb24oc3BhY2UuY29sdW1uLCBzcGFjZS5yb3cpLmZpbHRlcih3Z3QgPT4gd2d0ICE9PSBzcGFjZS53aWRnZXQpLmV2ZXJ5KHdndCA9PiB0aGlzLmNhbldpZGdldE1vdmVMZWZ0KHdndCkpKTtcblxuICAgICAgICBpZiAocGVyZm9ybU1vdmUgJiYgbW92ZWFibGUpIHtcblxuICAgICAgICAgICAgLy8gbW92ZSBhbGwgd2lkZ2V0cyB0byB0aGUgcmlnaHRcbiAgICAgICAgICAgIHRhcmdldFNwYWNlcy5mb3JFYWNoKHNwYWNlID0+IHRoaXMuZ2V0V2lkZ2V0c0F0UG9zaXRpb24oc3BhY2UuY29sdW1uLCBzcGFjZS5yb3cpLmZpbHRlcih3Z3QgPT4gd2d0ICE9PSBzcGFjZS53aWRnZXQpLmZvckVhY2god2d0ID0+IHRoaXMuY2FuV2lkZ2V0TW92ZUxlZnQod2d0LCB0cnVlKSkpO1xuXG4gICAgICAgICAgICAvLyBtb3ZlIGN1cnJlbnQgd2lkZ2V0IHRvIHRoZSByaWdodFxuICAgICAgICAgICAgd2lkZ2V0LnNldENvbHVtbih3aWRnZXQuZ2V0Q29sdW1uKCkgLSAxKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBtb3ZlYWJsZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEZXRlcm1pbmUgaWYgYSB3aWRnZXQgY2FuIGJlIG1vdmVkIHJpZ2h0IC0gb3IgaWYgaXQgY2FuIG1vdmUgdGhlIHdpZGdldHMgdG8gdGhlIHJpZ2h0IHRvIG1ha2Ugc3BhY2UgZm9yIHRoZSB3aWRnZXRcbiAgICAgKi9cbiAgICBjYW5XaWRnZXRNb3ZlUmlnaHQod2lkZ2V0OiBEYXNoYm9hcmRXaWRnZXRDb21wb25lbnQsIHBlcmZvcm1Nb3ZlOiBib29sZWFuID0gZmFsc2UpOiBib29sZWFuIHtcblxuICAgICAgICAvLyBjaGVjayBpZiB0aGUgd2lkZ2V0IGlzIHRoZSBkcmFnZ2luZyB3aWRnZXQgb3IgdGhlIHdpZGdldCBvY2N1cGllcyB0aGUgZmluYWwgY29sdW1uXG4gICAgICAgIGlmICh3aWRnZXQgPT09IHRoaXMuX2FjdGlvbldpZGdldC53aWRnZXQgfHwgd2lkZ2V0LmdldENvbHVtbigpICsgd2lkZ2V0LmdldENvbHVtblNwYW4oKSA9PT0gdGhpcy5vcHRpb25zLmNvbHVtbnMpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGZpbmQgdGhlIHBvc2l0aW9ucyByZXF1aXJlZFxuICAgICAgICBjb25zdCB0YXJnZXRTcGFjZXMgPSB0aGlzLmdldE9jY3VwaWVkU3BhY2VzKCkuZmlsdGVyKHNwYWNlID0+IHNwYWNlLndpZGdldCA9PT0gd2lkZ2V0KS5tYXAoc3BhY2UgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHsgY29sdW1uOiBzcGFjZS5jb2x1bW4gKyB3aWRnZXQuZ2V0Q29sdW1uU3BhbigpLCByb3c6IHNwYWNlLnJvdywgd2lkZ2V0OiBzcGFjZS53aWRnZXQgfTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gY2hlY2sgaWYgdGhlcmUgYXJlIHdpZGdldCBpbiB0aGUgcmVxdWlyZWQgcG9zaXRpb25zIGFuZCBpZiBzbywgY2FuIHRoZXkgbW92ZSByaWdodD9cbiAgICAgICAgY29uc3QgbW92ZWFibGUgPSB0YXJnZXRTcGFjZXMuZXZlcnkoc3BhY2UgPT4gdGhpcy5nZXRXaWRnZXRzQXRQb3NpdGlvbihzcGFjZS5jb2x1bW4sIHNwYWNlLnJvdykuZmlsdGVyKHdndCA9PiB3Z3QgIT09IHNwYWNlLndpZGdldCkuZXZlcnkod2d0ID0+IHRoaXMuY2FuV2lkZ2V0TW92ZVJpZ2h0KHdndCkpKTtcblxuICAgICAgICBpZiAocGVyZm9ybU1vdmUgJiYgbW92ZWFibGUpIHtcblxuICAgICAgICAgICAgLy8gbW92ZSBhbGwgd2lkZ2V0cyB0byB0aGUgcmlnaHRcbiAgICAgICAgICAgIHRhcmdldFNwYWNlcy5mb3JFYWNoKHNwYWNlID0+IHRoaXMuZ2V0V2lkZ2V0c0F0UG9zaXRpb24oc3BhY2UuY29sdW1uLCBzcGFjZS5yb3cpLmZpbHRlcih3Z3QgPT4gd2d0ICE9PSBzcGFjZS53aWRnZXQpLmZvckVhY2god2d0ID0+IHRoaXMuY2FuV2lkZ2V0TW92ZVJpZ2h0KHdndCwgdHJ1ZSkpKTtcblxuICAgICAgICAgICAgLy8gbW92ZSBjdXJyZW50IHdpZGdldCB0byB0aGUgcmlnaHRcbiAgICAgICAgICAgIHdpZGdldC5zZXRDb2x1bW4od2lkZ2V0LmdldENvbHVtbigpICsgMSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbW92ZWFibGU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU3RvcmUgdGhlIGluaXRpYWwgcG9zaXRpb24gb2YgdGhlIHdpZGdldCBiZWluZyBkcmFnZ2VkXG4gICAgICovXG4gICAgc2V0V2lkZ2V0T3JpZ2luKCk6IHZvaWQge1xuICAgICAgICB0aGlzLl93aWRnZXRPcmlnaW4gPSB7XG4gICAgICAgICAgICBjb2x1bW46IHRoaXMuX2FjdGlvbldpZGdldC53aWRnZXQuZ2V0Q29sdW1uKCksXG4gICAgICAgICAgICByb3c6IHRoaXMuX2FjdGlvbldpZGdldC53aWRnZXQuZ2V0Um93KCksXG4gICAgICAgICAgICBjb2x1bW5TcGFuOiB0aGlzLl9hY3Rpb25XaWRnZXQud2lkZ2V0LmdldENvbHVtblNwYW4oKSxcbiAgICAgICAgICAgIHJvd1NwYW46IHRoaXMuX2FjdGlvbldpZGdldC53aWRnZXQuZ2V0Um93U3BhbigpXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2FsY3VsYXRlIGFsbCB0aGUgcmVxdWlyZWQgcG9zaXRpb25zIGlzIGEgd2lkZ2V0IHdhcyB0byBiZSBwb3NpdGlvbmVkIGF0IGEgcGFydGljdWxhciBwb2ludFxuICAgICAqL1xuICAgIGdldFJlcXVpcmVkU3BhY2VzRnJvbVBvaW50KHdpZGdldDogRGFzaGJvYXJkV2lkZ2V0Q29tcG9uZW50LCBjb2x1bW46IG51bWJlciwgcm93OiBudW1iZXIpOiBEYXNoYm9hcmRTcGFjZVtdIHtcbiAgICAgICAgY29uc3Qgc3BhY2VzOiBEYXNoYm9hcmRTcGFjZVtdID0gW107XG5cbiAgICAgICAgZm9yIChsZXQgeSA9IHJvdzsgeSA8IHJvdyArIHdpZGdldC5nZXRSb3dTcGFuKCk7IHkrKykge1xuICAgICAgICAgICAgZm9yIChsZXQgeCA9IGNvbHVtbjsgeCA8IGNvbHVtbiArIHdpZGdldC5nZXRDb2x1bW5TcGFuKCk7IHgrKykge1xuICAgICAgICAgICAgICAgIHNwYWNlcy5wdXNoKHsgY29sdW1uOiB4LCByb3c6IHksIHdpZGdldDogd2lkZ2V0IH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHNwYWNlcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQb3NpdGlvbiB3aWRnZXRzIGJhc2VkIG9uIHRoZSBwb3NpdGlvbiBvZiB0aGUgcGxhY2Vob2xkZXIgLSB0aGlzIGlzIHRlbXBvcmFyeSB1bnRpbCBjb25maXJtZWRcbiAgICAgKi9cbiAgICB1cGRhdGVXaWRnZXRQb3NpdGlvbnMod2lkZ2V0OiBEYXNoYm9hcmRXaWRnZXRDb21wb25lbnQpIHtcblxuICAgICAgICBjb25zdCBwbGFjZWhvbGRlciA9IHRoaXMucGxhY2Vob2xkZXIkLmdldFZhbHVlKCk7XG5cbiAgICAgICAgLy8gY2hlY2sgYWxsIHNwYWNlcyB0aGUgcGxhY2Vob2xkZXIgd2lsbCBvY2N1cHkgYW5kIG1vdmUgYW55IHdpZGdldCBjdXJyZW50bHkgaW4gdGhlbSBkb3duXG4gICAgICAgIGZvciAobGV0IGNvbHVtbiA9IHBsYWNlaG9sZGVyLmNvbHVtbjsgY29sdW1uIDwgcGxhY2Vob2xkZXIuY29sdW1uICsgcGxhY2Vob2xkZXIuY29sdW1uU3BhbjsgY29sdW1uKyspIHtcbiAgICAgICAgICAgIGZvciAobGV0IHJvdyA9IHBsYWNlaG9sZGVyLnJvdzsgcm93IDwgcGxhY2Vob2xkZXIucm93ICsgcGxhY2Vob2xkZXIucm93U3Bhbjsgcm93KyspIHtcblxuICAgICAgICAgICAgICAgIHRoaXMuZ2V0V2lkZ2V0c0F0UG9zaXRpb24oY29sdW1uLCByb3csIHRydWUpXG4gICAgICAgICAgICAgICAgICAgIC5maWx0ZXIod2d0ID0+IHdndCAhPT0gd2lkZ2V0KVxuICAgICAgICAgICAgICAgICAgICAuZm9yRWFjaCh3Z3QgPT4gdGhpcy5tb3ZlV2lkZ2V0RG93bih3Z3QpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHVwZGF0ZSB0aGUgaGVpZ2h0IG9mIHRoZSBkYXNoYm9hcmRcbiAgICAgICAgdGhpcy5zZXREYXNoYm9hcmRIZWlnaHQoKTtcblxuICAgICAgICAvLyBpZiB3ZSBhcmVudCBkcmFnZ2luZyB0aGUgdG9wIGhhbmRsZSB0aGVuIGZpbGwgc3BhY2VzXG4gICAgICAgIGlmICh0aGlzLl9hY3Rpb25XaWRnZXQuZGlyZWN0aW9uICE9PSBBY3Rpb25EaXJlY3Rpb24uVG9wICYmXG4gICAgICAgICAgICB0aGlzLl9hY3Rpb25XaWRnZXQuZGlyZWN0aW9uICE9PSBBY3Rpb25EaXJlY3Rpb24uVG9wTGVmdCAmJlxuICAgICAgICAgICAgdGhpcy5fYWN0aW9uV2lkZ2V0LmRpcmVjdGlvbiAhPT0gQWN0aW9uRGlyZWN0aW9uLlRvcFJpZ2h0KSB7XG4gICAgICAgICAgICB0aGlzLnNoaWZ0V2lkZ2V0c1VwKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEZXRlcm1pbmUgaWYgYSB3aWRnZXQgaXMgb2NjdXB5aW5nIGEgc3BlY2lmaWMgcm93IGFuZCBjb2x1bW5cbiAgICAgKiBAcGFyYW0gY29sdW1uIFRoZSBjb2x1bW5zIHRvIGNoZWNrIGlmIG9jY3VwaWVkXG4gICAgICogQHBhcmFtIHJvdyBUaGUgcm93IHRvIGNoZWNrIGlmIG9jY3VwaWVkXG4gICAgICogQHBhcmFtIGlnbm9yZVJlc2l6aW5nIFdoZXRoZXIgb3Igbm90IHRvIGlnbm9yZSB0aGUgd2lkZ2V0IGN1cnJlbnRseSBiZWluZyByZXNpemVkXG4gICAgICovXG4gICAgZ2V0V2lkZ2V0c0F0UG9zaXRpb24oY29sdW1uOiBudW1iZXIsIHJvdzogbnVtYmVyLCBpZ25vcmVSZXNpemluZzogYm9vbGVhbiA9IGZhbHNlKTogRGFzaGJvYXJkV2lkZ2V0Q29tcG9uZW50W10ge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRPY2N1cGllZFNwYWNlcygpXG4gICAgICAgICAgICAuZmlsdGVyKHNwYWNlID0+IHNwYWNlLmNvbHVtbiA9PT0gY29sdW1uICYmIHNwYWNlLnJvdyA9PT0gcm93KVxuICAgICAgICAgICAgLmZpbHRlcihzcGFjZSA9PiBzcGFjZS53aWRnZXQgIT09IHRoaXMuX2FjdGlvbldpZGdldC53aWRnZXQgfHwgIWlnbm9yZVJlc2l6aW5nKVxuICAgICAgICAgICAgLm1hcChzcGFjZSA9PiBzcGFjZS53aWRnZXQpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFVwZGF0ZSB0aGUgcGxhY2Vob2xkZXIgdmlzaWJpbGl0eSwgcG9zaXRpb24gYW5kIHNpemVcbiAgICAgKi9cbiAgICBzZXRQbGFjZWhvbGRlckJvdW5kcyh2aXNpYmxlOiBib29sZWFuLCB4OiBudW1iZXIsIHk6IG51bWJlciwgd2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIpOiB2b2lkIHtcblxuICAgICAgICBjb25zdCBwbGFjZWhvbGRlciA9IHRoaXMucGxhY2Vob2xkZXIkLmdldFZhbHVlKCk7XG5cbiAgICAgICAgY29uc3Qgcm91bmRpbmcgPSB0aGlzLl9hY3Rpb25XaWRnZXQuZGlyZWN0aW9uID09PSBBY3Rpb25EaXJlY3Rpb24uTGVmdCB8fFxuICAgICAgICAgICAgdGhpcy5fYWN0aW9uV2lkZ2V0LmRpcmVjdGlvbiA9PT0gQWN0aW9uRGlyZWN0aW9uLlRvcCA/IFJvdW5kaW5nLlJvdW5kRG93bkJlbG93SGFsZiA6IFJvdW5kaW5nLlJvdW5kVXBPdmVySGFsZjtcblxuICAgICAgICBwbGFjZWhvbGRlci52aXNpYmxlID0gdmlzaWJsZTtcblxuICAgICAgICBwbGFjZWhvbGRlci5jb2x1bW4gPSB0aGlzLmdldFBsYWNlaG9sZGVyQ29sdW1uKHgsIHdpZHRoKTtcbiAgICAgICAgcGxhY2Vob2xkZXIucm93ID0gdGhpcy5nZXRQbGFjZWhvbGRlclJvdyh5LCBoZWlnaHQpO1xuICAgICAgICBwbGFjZWhvbGRlci5jb2x1bW5TcGFuID0gdGhpcy5nZXRQbGFjZWhvbGRlckNvbHVtblNwYW4od2lkdGgpO1xuICAgICAgICBwbGFjZWhvbGRlci5yb3dTcGFuID0gdGhpcy5nZXRQbGFjZWhvbGRlclJvd1NwYW4oaGVpZ2h0KTtcblxuICAgICAgICAvLyBjYWxjdWxhdGUgdGhlIG1heGltdW0gbnVtYmVyIG9mIHJvd3NcbiAgICAgICAgY29uc3Qgcm93Q291bnQgPSB0aGlzLndpZGdldHMuZmlsdGVyKHdpZGdldCA9PiB3aWRnZXQgIT09IHRoaXMuX2FjdGlvbldpZGdldC53aWRnZXQpXG4gICAgICAgICAgICAucmVkdWNlKChwcmV2aW91cywgd2lkZ2V0KSA9PiBNYXRoLm1heCh3aWRnZXQuZ2V0Um93KCkgKyB3aWRnZXQuZ2V0Um93U3BhbigpLCBwcmV2aW91cyksIDApO1xuXG4gICAgICAgIC8vIGNvbnN0cmFpbiBtYXhpbXVtIHBsYWNlaG9sZGVyIHJvd1xuICAgICAgICBwbGFjZWhvbGRlci5yb3cgPSBNYXRoLm1pbihwbGFjZWhvbGRlci5yb3csIHJvd0NvdW50KTtcblxuICAgICAgICBwbGFjZWhvbGRlci54ID0gKHBsYWNlaG9sZGVyLmNvbHVtbiAqIHRoaXMuZ2V0Q29sdW1uV2lkdGgoKSkgKyB0aGlzLm9wdGlvbnMucGFkZGluZztcbiAgICAgICAgcGxhY2Vob2xkZXIueSA9IChwbGFjZWhvbGRlci5yb3cgKiB0aGlzLl9yb3dIZWlnaHQpICsgdGhpcy5vcHRpb25zLnBhZGRpbmc7XG4gICAgICAgIHBsYWNlaG9sZGVyLndpZHRoID0gKHBsYWNlaG9sZGVyLmNvbHVtblNwYW4gKiB0aGlzLmdldENvbHVtbldpZHRoKCkpIC0gKHRoaXMub3B0aW9ucy5wYWRkaW5nICogMik7XG4gICAgICAgIHBsYWNlaG9sZGVyLmhlaWdodCA9IChwbGFjZWhvbGRlci5yb3dTcGFuICogdGhpcy5fcm93SGVpZ2h0KSAtICh0aGlzLm9wdGlvbnMucGFkZGluZyAqIDIpO1xuXG4gICAgICAgIC8vIHNldCB0aGUgdmFsdWVzIG9mIHRoZSB3aWRnZXQgdG8gbWF0Y2ggdGhlIHZhbHVlcyBvZiB0aGUgcGxhY2Vob2xkZXIgLSBob3dldmVyIGRvIG5vdCByZW5kZXIgdGhlIGNoYW5nZXNcbiAgICAgICAgdGhpcy5fYWN0aW9uV2lkZ2V0LndpZGdldC5zZXRDb2x1bW4ocGxhY2Vob2xkZXIuY29sdW1uLCBmYWxzZSk7XG4gICAgICAgIHRoaXMuX2FjdGlvbldpZGdldC53aWRnZXQuc2V0Um93KHBsYWNlaG9sZGVyLnJvdywgZmFsc2UpO1xuICAgICAgICB0aGlzLl9hY3Rpb25XaWRnZXQud2lkZ2V0LnNldENvbHVtblNwYW4ocGxhY2Vob2xkZXIuY29sdW1uU3BhbiwgZmFsc2UpO1xuICAgICAgICB0aGlzLl9hY3Rpb25XaWRnZXQud2lkZ2V0LnNldFJvd1NwYW4ocGxhY2Vob2xkZXIucm93U3BhbiwgZmFsc2UpO1xuXG4gICAgICAgIC8vIHVwZGF0ZSB0aGUgcGxhY2Vob2xkZXJcbiAgICAgICAgdGhpcy5wbGFjZWhvbGRlciQubmV4dChwbGFjZWhvbGRlcik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IHRoZSBwbGFjZWhvbGRlciBjb2x1bW4gcG9zaXRpb25cbiAgICAgKi9cbiAgICBnZXRQbGFjZWhvbGRlckNvbHVtbih4OiBudW1iZXIsIHdpZHRoOiBudW1iZXIpOiBudW1iZXIge1xuXG4gICAgICAgIGNvbnN0IGNvbHVtbiA9IHRoaXMuZ2V0Q29sdW1uRnJvbVB4KHgsIHRoaXMuX2FjdGlvbldpZGdldC5kaXJlY3Rpb24gPT09IEFjdGlvbkRpcmVjdGlvbi5Nb3ZlID8gUm91bmRpbmcuUm91bmRVcE92ZXJIYWxmIDogUm91bmRpbmcuUm91bmREb3duKTtcbiAgICAgICAgY29uc3QgY29sdW1uU3BhbiA9IE1hdGguZmxvb3Iod2lkdGggLyB0aGlzLmdldENvbHVtbldpZHRoKCkpO1xuICAgICAgICBjb25zdCB1cHBlckxpbWl0ID0gdGhpcy5nZXRDb2x1bW5Db3VudCgpIC0gY29sdW1uU3BhbjtcblxuICAgICAgICAvLyBpZiB3ZSBhcmVudCBkcmFnZ2luZyBsZWZ0IHRoZW4ganVzdCByZXR1cm4gdGhlIGNvbHVtblxuICAgICAgICBpZiAodGhpcy5fYWN0aW9uV2lkZ2V0LmRpcmVjdGlvbiAhPT0gQWN0aW9uRGlyZWN0aW9uLkxlZnQgJiZcbiAgICAgICAgICAgIHRoaXMuX2FjdGlvbldpZGdldC5kaXJlY3Rpb24gIT09IEFjdGlvbkRpcmVjdGlvbi5Ub3BMZWZ0ICYmXG4gICAgICAgICAgICB0aGlzLl9hY3Rpb25XaWRnZXQuZGlyZWN0aW9uICE9PSBBY3Rpb25EaXJlY3Rpb24uQm90dG9tTGVmdCkge1xuICAgICAgICAgICAgcmV0dXJuIE1hdGgubWF4KE1hdGgubWluKGNvbHVtbiwgdXBwZXJMaW1pdCksIDApO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gZ2V0IGFueSBvdmVyZmxvd1xuICAgICAgICBjb25zdCBvdmVyZmxvdyA9IHdpZHRoICUgdGhpcy5nZXRDb2x1bW5XaWR0aCgpO1xuXG4gICAgICAgIHJldHVybiAoeCA8PSAwIHx8IG92ZXJmbG93ID09PSAwIHx8IGNvbHVtblNwYW4gPT09IDAgfHwgb3ZlcmZsb3cgPiAodGhpcy5nZXRDb2x1bW5XaWR0aCgpIC8gMikpID9cbiAgICAgICAgICAgIE1hdGgubWF4KE1hdGgubWluKGNvbHVtbiwgdXBwZXJMaW1pdCksIDApIDpcbiAgICAgICAgICAgIE1hdGgubWF4KE1hdGgubWluKGNvbHVtbiArIDEsIHVwcGVyTGltaXQpLCAwKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIGNvbHVtbiBzcGFuIG9mIHRoZSBwbGFjZWhvbGRlclxuICAgICAqL1xuICAgIGdldFBsYWNlaG9sZGVyQ29sdW1uU3Bhbih3aWR0aDogbnVtYmVyKTogbnVtYmVyIHtcblxuICAgICAgICBjb25zdCBjb2x1bW5TcGFuID0gdGhpcy5nZXRDb2x1bW5Gcm9tUHgod2lkdGgpO1xuXG4gICAgICAgIC8vIGlmIHdlIGFyZW50IGRyYWdnaW5nIHJpZ2h0IG9yIGxlZnQgdGhlbiBqdXN0IHJldHVybiB0aGUgY29sdW1uIHNwYW5cbiAgICAgICAgaWYgKHRoaXMuX2FjdGlvbldpZGdldC5kaXJlY3Rpb24gIT09IEFjdGlvbkRpcmVjdGlvbi5SaWdodCAmJlxuICAgICAgICAgICAgdGhpcy5fYWN0aW9uV2lkZ2V0LmRpcmVjdGlvbiAhPT0gQWN0aW9uRGlyZWN0aW9uLlRvcFJpZ2h0ICYmXG4gICAgICAgICAgICB0aGlzLl9hY3Rpb25XaWRnZXQuZGlyZWN0aW9uICE9PSBBY3Rpb25EaXJlY3Rpb24uQm90dG9tUmlnaHQgJiZcbiAgICAgICAgICAgIHRoaXMuX2FjdGlvbldpZGdldC5kaXJlY3Rpb24gIT09IEFjdGlvbkRpcmVjdGlvbi5MZWZ0ICYmXG4gICAgICAgICAgICB0aGlzLl9hY3Rpb25XaWRnZXQuZGlyZWN0aW9uICE9PSBBY3Rpb25EaXJlY3Rpb24uVG9wTGVmdCAmJlxuICAgICAgICAgICAgdGhpcy5fYWN0aW9uV2lkZ2V0LmRpcmVjdGlvbiAhPT0gQWN0aW9uRGlyZWN0aW9uLkJvdHRvbUxlZnQpIHtcbiAgICAgICAgICAgIHJldHVybiBNYXRoLm1heChjb2x1bW5TcGFuLCAxKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGdldCB0aGUgY3VycmVudCBjb2x1bW4gc3BhbiBhbmQgYW55IG92ZXJmbG93XG4gICAgICAgIGNvbnN0IG92ZXJmbG93ID0gd2lkdGggJSB0aGlzLmdldENvbHVtbldpZHRoKCk7XG5cbiAgICAgICAgcmV0dXJuIChjb2x1bW5TcGFuID4gMCAmJiBvdmVyZmxvdyA+ICh0aGlzLmdldENvbHVtbldpZHRoKCkgLyAyKSkgPyBNYXRoLm1heChjb2x1bW5TcGFuICsgMSwgMSkgOiBNYXRoLm1heChjb2x1bW5TcGFuLCAxKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIHJvdyBwb3NpdGlvbiBvZiB0aGUgcGxhY2Vob2xkZXJcbiAgICAgKi9cbiAgICBnZXRQbGFjZWhvbGRlclJvdyh5OiBudW1iZXIsIGhlaWdodDogbnVtYmVyKTogbnVtYmVyIHtcblxuICAgICAgICBjb25zdCByb3cgPSB0aGlzLmdldFJvd0Zyb21QeCh5LCB0aGlzLl9hY3Rpb25XaWRnZXQuZGlyZWN0aW9uID09PSBBY3Rpb25EaXJlY3Rpb24uTW92ZSA/IFJvdW5kaW5nLlJvdW5kVXBPdmVySGFsZiA6IFJvdW5kaW5nLlJvdW5kRG93bik7XG4gICAgICAgIGNvbnN0IHJvd1NwYW4gPSBNYXRoLmNlaWwoaGVpZ2h0IC8gdGhpcy5fcm93SGVpZ2h0KTtcblxuICAgICAgICAvLyBpZiB3ZSBhcmVudCBkcmFnZ2luZyB1cCB0aGVuIGp1c3QgcmV0dXJuIHRoZSByb3dcbiAgICAgICAgaWYgKHRoaXMuX2FjdGlvbldpZGdldC5kaXJlY3Rpb24gIT09IEFjdGlvbkRpcmVjdGlvbi5Ub3AgJiZcbiAgICAgICAgICAgIHRoaXMuX2FjdGlvbldpZGdldC5kaXJlY3Rpb24gIT09IEFjdGlvbkRpcmVjdGlvbi5Ub3BMZWZ0ICYmXG4gICAgICAgICAgICB0aGlzLl9hY3Rpb25XaWRnZXQuZGlyZWN0aW9uICE9PSBBY3Rpb25EaXJlY3Rpb24uVG9wUmlnaHQpIHtcbiAgICAgICAgICAgIHJldHVybiBNYXRoLm1heChyb3csIDApO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gZ2V0IGFueSBvdmVyZmxvd1xuICAgICAgICBsZXQgb3ZlcmZsb3cgPSBoZWlnaHQgPCB0aGlzLl9yb3dIZWlnaHQgPyAwIDogaGVpZ2h0ICUgdGhpcy5fcm93SGVpZ2h0O1xuXG4gICAgICAgIHJldHVybiAoeSA8PSAwIHx8IHJvd1NwYW4gPT09IDAgfHwgb3ZlcmZsb3cgPT09IDAgfHwgb3ZlcmZsb3cgPiAodGhpcy5fcm93SGVpZ2h0IC8gMikpID8gTWF0aC5tYXgocm93LCAwKSA6IE1hdGgubWF4KHJvdyArIDEsIDApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgcm93IHNwYW4gb2YgdGhlIHBsYWNlaG9sZGVyXG4gICAgICovXG4gICAgZ2V0UGxhY2Vob2xkZXJSb3dTcGFuKGhlaWdodDogbnVtYmVyKTogbnVtYmVyIHtcblxuICAgICAgICBjb25zdCByb3dTcGFuID0gdGhpcy5nZXRSb3dGcm9tUHgoaGVpZ2h0KTtcblxuICAgICAgICAvLyBpZiB3ZSBhcmVudCBkcmFnZ2luZyB1cCBvciBkb3duIHRoZW4ganVzdCByZXR1cm4gdGhlIGNvbHVtbiBzcGFuXG4gICAgICAgIGlmICh0aGlzLl9hY3Rpb25XaWRnZXQuZGlyZWN0aW9uICE9PSBBY3Rpb25EaXJlY3Rpb24uVG9wICYmXG4gICAgICAgICAgICB0aGlzLl9hY3Rpb25XaWRnZXQuZGlyZWN0aW9uICE9PSBBY3Rpb25EaXJlY3Rpb24uVG9wTGVmdCAmJlxuICAgICAgICAgICAgdGhpcy5fYWN0aW9uV2lkZ2V0LmRpcmVjdGlvbiAhPT0gQWN0aW9uRGlyZWN0aW9uLlRvcFJpZ2h0ICYmXG4gICAgICAgICAgICB0aGlzLl9hY3Rpb25XaWRnZXQuZGlyZWN0aW9uICE9PSBBY3Rpb25EaXJlY3Rpb24uQm90dG9tICYmXG4gICAgICAgICAgICB0aGlzLl9hY3Rpb25XaWRnZXQuZGlyZWN0aW9uICE9PSBBY3Rpb25EaXJlY3Rpb24uQm90dG9tTGVmdCAmJlxuICAgICAgICAgICAgdGhpcy5fYWN0aW9uV2lkZ2V0LmRpcmVjdGlvbiAhPT0gQWN0aW9uRGlyZWN0aW9uLkJvdHRvbVJpZ2h0KSB7XG4gICAgICAgICAgICByZXR1cm4gTWF0aC5tYXgocm93U3BhbiwgMSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBnZXQgdGhlIGN1cnJlbnQgY29sdW1uIHNwYW4gYW5kIGFueSBvdmVyZmxvd1xuICAgICAgICBjb25zdCBvdmVyZmxvdyA9IGhlaWdodCAlIHRoaXMuX3Jvd0hlaWdodDtcblxuICAgICAgICByZXR1cm4gKG92ZXJmbG93ID4gKHRoaXMuX3Jvd0hlaWdodCAvIDIpKSA/IE1hdGgubWF4KHJvd1NwYW4gKyAxLCAxKSA6IE1hdGgubWF4KHJvd1NwYW4sIDEpO1xuICAgIH1cblxuICAgIGdldENvbHVtbkZyb21QeCh4OiBudW1iZXIsIHJvdW5kaW5nOiBSb3VuZGluZyA9IFJvdW5kaW5nLlJvdW5kRG93bik6IG51bWJlciB7XG5cbiAgICAgICAgY29uc3QgY29sdW1uID0gTWF0aC5mbG9vcih4IC8gTWF0aC5mbG9vcih0aGlzLmdldENvbHVtbldpZHRoKCkpKTtcbiAgICAgICAgY29uc3Qgb3ZlcmZsb3cgPSAoeCAlIE1hdGguZmxvb3IodGhpcy5nZXRDb2x1bW5XaWR0aCgpKSk7XG4gICAgICAgIGNvbnN0IGhhbGYgPSB0aGlzLmdldENvbHVtbldpZHRoKCkgLyAyO1xuXG4gICAgICAgIHN3aXRjaCAocm91bmRpbmcpIHtcblxuICAgICAgICAgICAgY2FzZSBSb3VuZGluZy5Sb3VuZERvd246XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbHVtbjtcblxuICAgICAgICAgICAgY2FzZSBSb3VuZGluZy5Sb3VuZERvd25CZWxvd0hhbGY6XG4gICAgICAgICAgICAgICAgcmV0dXJuIG92ZXJmbG93IDwgaGFsZiA/IGNvbHVtbiA6IGNvbHVtbiArIDE7XG5cbiAgICAgICAgICAgIGNhc2UgUm91bmRpbmcuUm91bmRVcE92ZXJIYWxmOlxuICAgICAgICAgICAgICAgIHJldHVybiBvdmVyZmxvdyA+IGhhbGYgPyBjb2x1bW4gKyAxIDogY29sdW1uO1xuXG4gICAgICAgICAgICBjYXNlIFJvdW5kaW5nLlJvdW5kVXA6XG4gICAgICAgICAgICAgICAgcmV0dXJuIG92ZXJmbG93ID4gMCA/IGNvbHVtbiArIDEgOiBjb2x1bW47XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIGdldFJvd0Zyb21QeCh5OiBudW1iZXIsIHJvdW5kaW5nOiBSb3VuZGluZyA9IFJvdW5kaW5nLlJvdW5kRG93bik6IG51bWJlciB7XG5cbiAgICAgICAgY29uc3Qgcm93ID0gTWF0aC5mbG9vcih5IC8gTWF0aC5mbG9vcih0aGlzLl9yb3dIZWlnaHQpKTtcbiAgICAgICAgY29uc3Qgb3ZlcmZsb3cgPSAoeSAlIE1hdGguZmxvb3IodGhpcy5fcm93SGVpZ2h0KSk7XG4gICAgICAgIGNvbnN0IGhhbGYgPSB0aGlzLl9yb3dIZWlnaHQgLyAyO1xuXG4gICAgICAgIHN3aXRjaCAocm91bmRpbmcpIHtcblxuICAgICAgICAgICAgY2FzZSBSb3VuZGluZy5Sb3VuZERvd246XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJvdztcblxuICAgICAgICAgICAgY2FzZSBSb3VuZGluZy5Sb3VuZERvd25CZWxvd0hhbGY6XG4gICAgICAgICAgICAgICAgcmV0dXJuIG92ZXJmbG93IDwgaGFsZiA/IHJvdyA6IHJvdyArIDE7XG5cbiAgICAgICAgICAgIGNhc2UgUm91bmRpbmcuUm91bmRVcE92ZXJIYWxmOlxuICAgICAgICAgICAgICAgIHJldHVybiBvdmVyZmxvdyA+IGhhbGYgPyByb3cgKyAxIDogcm93O1xuXG4gICAgICAgICAgICBjYXNlIFJvdW5kaW5nLlJvdW5kVXA6XG4gICAgICAgICAgICAgICAgcmV0dXJuIG92ZXJmbG93ID4gMCA/IHJvdyArIDEgOiByb3c7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb21taXRXaWRnZXRDaGFuZ2VzKCk6IHZvaWQge1xuXG4gICAgICAgIGNvbnN0IHBsYWNlaG9sZGVyID0gdGhpcy5wbGFjZWhvbGRlciQuZ2V0VmFsdWUoKTtcblxuICAgICAgICAvLyBjaGVjayB0aGF0IHdlIGhhdmUgYWxsIHRoZSB2YWx1ZXMgd2UgbmVlZFxuICAgICAgICBpZiAocGxhY2Vob2xkZXIuY29sdW1uID09PSB1bmRlZmluZWQgfHwgcGxhY2Vob2xkZXIucm93ID09PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyLmNvbHVtblNwYW4gPT09IHVuZGVmaW5lZCB8fCBwbGFjZWhvbGRlci5yb3dTcGFuID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLl9hY3Rpb25XaWRnZXQpIHtcbiAgICAgICAgICAgIHRoaXMuX2FjdGlvbldpZGdldC53aWRnZXQuc2V0Q29sdW1uKHBsYWNlaG9sZGVyLmNvbHVtbik7XG4gICAgICAgICAgICB0aGlzLl9hY3Rpb25XaWRnZXQud2lkZ2V0LnNldFJvdyhwbGFjZWhvbGRlci5yb3cpO1xuICAgICAgICAgICAgdGhpcy5fYWN0aW9uV2lkZ2V0LndpZGdldC5zZXRDb2x1bW5TcGFuKHBsYWNlaG9sZGVyLmNvbHVtblNwYW4pO1xuICAgICAgICAgICAgdGhpcy5fYWN0aW9uV2lkZ2V0LndpZGdldC5zZXRSb3dTcGFuKHBsYWNlaG9sZGVyLnJvd1NwYW4pO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gcmVzZXQgYWxsIHBsYWNlaG9sZGVyIHZhbHVlc1xuICAgICAgICBwbGFjZWhvbGRlci5jb2x1bW4gPSB1bmRlZmluZWQ7XG4gICAgICAgIHBsYWNlaG9sZGVyLnJvdyA9IHVuZGVmaW5lZDtcbiAgICAgICAgcGxhY2Vob2xkZXIuY29sdW1uU3BhbiA9IHVuZGVmaW5lZDtcbiAgICAgICAgcGxhY2Vob2xkZXIucm93U3BhbiA9IHVuZGVmaW5lZDtcblxuICAgICAgICAvLyBlbWl0IHRoZSBuZXcgcGxhY2Vob2xkZXIgdmFsdWVzXG4gICAgICAgIHRoaXMucGxhY2Vob2xkZXIkLm5leHQocGxhY2Vob2xkZXIpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgY3VycmVudCBjb2x1bW4gd2lkdGhcbiAgICAgKi9cbiAgICBnZXRDb2x1bW5XaWR0aCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gTWF0aC5mbG9vcih0aGlzLmNvbHVtbldpZHRoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDYWxjdWxhdGUgdGhlIG51bWJlciBvZiByb3dzIHBvcHVsYXRlZCB3aXRoIHdpZGdldHNcbiAgICAgKi9cbiAgICBnZXRSb3dDb3VudCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy53aWRnZXRzLnJlZHVjZSgocHJldmlvdXMsIHdpZGdldCkgPT4gTWF0aC5tYXgod2lkZ2V0LmdldFJvdygpICsgd2lkZ2V0LmdldFJvd1NwYW4oKSwgcHJldmlvdXMpLCAwKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXQgdGhlIGhlaWdodCBvZiB0aGUgZGFzaGJvYXJkIGNvbnRhaW5lciBlbGVtZW50XG4gICAgICovXG4gICAgc2V0RGFzaGJvYXJkSGVpZ2h0KCk6IHZvaWQge1xuXG4gICAgICAgIC8vIHNpemUgdGhlIGRhc2hib2FyZCBjb250YWluZXIgdG8gZW5zdXJlIGFsbCByb3dzIGZpdFxuICAgICAgICBsZXQgcm93Q291bnQgPSB0aGlzLmdldFJvd0NvdW50KCk7XG5cbiAgICAgICAgLy8gaWYgd2Ugc2hvdWxkIHNob3cgYW4gZW1wdHkgcm93IGluY3JlbWVudCB0aGUgcm93IGNvdW50IGJ5IDFcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5lbXB0eVJvdykge1xuICAgICAgICAgICAgcm93Q291bnQrKztcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2V0RGltZW5zaW9ucyh1bmRlZmluZWQsIHJvd0NvdW50ICogdGhpcy5fcm93SGVpZ2h0KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBPcmRlcnMgdGhlIHotaW5kZXggb2YgYWxsIHdpZGdldHMgdG8gbW92ZSB0aGUgYWN0aXZlIG9uZSB0byB0aGUgZnJvbnRcbiAgICAgKiBAcGFyYW0gd2lkZ2V0IFRoZSB3aWRnZXQgdGhhdCBzaG91bGQgYmUgYnJvdWdodCB0byB0aGUgZnJvbnRcbiAgICAgKi9cbiAgICBicmluZ1RvRnJvbnQod2lkZ2V0OiBEYXNoYm9hcmRXaWRnZXRDb21wb25lbnQpOiB2b2lkIHtcbiAgICAgICAgdGhpcy53aWRnZXRzLmZvckVhY2goX3dpZGdldCA9PiBfd2lkZ2V0ID09PSB3aWRnZXQgPyBfd2lkZ2V0LmJyaW5nVG9Gcm9udCgpIDogX3dpZGdldC5zZW5kVG9CYWNrKCkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE1vdmUgYSB3aWRnZXQgZG93biAtIGlmIHdpZGdldHMgYXJlIGluIHRoZSBwb3NpdGlvbiBiZWxvdywgdGhlbiBtb3ZlIHRoZW0gZG93biBmdXJ0aGVyXG4gICAgICogQHBhcmFtIHdpZGdldCBUaGUgd2lkZ2V0IHRvIG1vdmUgZG93bndhcmRzXG4gICAgICovXG4gICAgbW92ZVdpZGdldERvd24od2lkZ2V0OiBEYXNoYm9hcmRXaWRnZXRDb21wb25lbnQsIGRpc3RhbmNlOiBudW1iZXIgPSAxKTogdm9pZCB7XG5cbiAgICAgICAgLy8gbW92ZSB0aGUgd2lkZ2V0IGRvd24gb25lIHBvc2l0aW9uXG4gICAgICAgIHdpZGdldC5zZXRSb3cod2lkZ2V0LmdldFJvdygpICsgZGlzdGFuY2UpO1xuXG4gICAgICAgIC8vIGNoZWNrIGV2ZXJ5IHNwYWNlIHRoZSB3aWRnZXQgb2NjdXBpZXMgZm9yIGNvbGxpc2lvbnNcbiAgICAgICAgdGhpcy5mb3JFYWNoQmxvY2sod2lkZ2V0LCAoY29sdW1uLCByb3cpID0+XG4gICAgICAgICAgICB0aGlzLmdldFdpZGdldHNBdFBvc2l0aW9uKGNvbHVtbiwgcm93LCB0cnVlKVxuICAgICAgICAgICAgICAgIC5maWx0ZXIod2d0ID0+IHdndCAhPT0gd2lkZ2V0KVxuICAgICAgICAgICAgICAgIC5mb3JFYWNoKHdndCA9PiB0aGlzLm1vdmVXaWRnZXREb3duKHdndCwgZGlzdGFuY2UpKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogV2lkZ2V0cyBzaG91bGQgbm90IGJlIGFsbG93ZWQgdG8gaGF2ZSBhIHZhY2FudCBzcGFjZSBhYm92ZSB0aGVtIC0gaWYgdGhlcmUgaXMgb25lIHRoZXkgc2hvdWxkIG1vdmUgdXB3YXJkcyB0byBmaWxsIGl0XG4gICAgICovXG4gICAgc2hpZnRXaWRnZXRzVXAoKTogdm9pZCB7XG5cbiAgICAgICAgLy8gY2hlY2sgd2hldGhlciBvciBub3QgY2hhbmdlcyBoYXZlIGJlZW4gbWFkZSAtIGlmIHNvIHdlIG5lZWQgdG8gcmVwZWF0IHVudGlsIHN0YWJsZVxuICAgICAgICBsZXQgc3RhYmxlID0gdHJ1ZTtcblxuICAgICAgICAvLyBpdGVyYXRlIGVhY2ggd2lkZ2V0IGFuZFxuICAgICAgICB0aGlzLndpZGdldHMuZm9yRWFjaCh3aWRnZXQgPT4ge1xuXG4gICAgICAgICAgICAvLyBpZiB3aWRnZXQgaXMgYWxyZWFkeSBvbiB0aGUgdG9wIHJvdyB0aGVuIGRvIG5vdGhpbmdcbiAgICAgICAgICAgIGlmICh3aWRnZXQuZ2V0Um93KCkgPT09IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGlmIHdlIGFyZSBjdXJyZW50bHkgZHJhZ2dpbmcgYW5kIHRoaXMgaXMgdGhlIGRyYWdnaW5nIHdpZGdldCB0aGVuIHNraXBcbiAgICAgICAgICAgIGlmICh0aGlzLl9hY3Rpb25XaWRnZXQgJiYgdGhpcy5fYWN0aW9uV2lkZ2V0LndpZGdldCA9PT0gd2lkZ2V0KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodGhpcy5nZXRQb3NpdGlvbkF2YWlsYWJsZSh3aWRnZXQuZ2V0Q29sdW1uKCksIHdpZGdldC5nZXRSb3coKSAtIDEsIHdpZGdldC5nZXRDb2x1bW5TcGFuKCksIDEpKSB7XG4gICAgICAgICAgICAgICAgd2lkZ2V0LnNldFJvdyh3aWRnZXQuZ2V0Um93KCkgLSAxKTtcbiAgICAgICAgICAgICAgICBzdGFibGUgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gaWYgY2hhbmdlcyBvY2N1cnJlZCB0aGVuIHdlIHNob3VsZCByZXBlYXQgdGhlIHByb2Nlc3NcbiAgICAgICAgaWYgKCFzdGFibGUpIHtcbiAgICAgICAgICAgIHRoaXMuc2hpZnRXaWRnZXRzVXAoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEl0ZXJhdGUgb3ZlciBlYWNoIHNwYWNlIGEgd2lkZ2V0IG9jY3VwaWVkXG4gICAgICogQHBhcmFtIHdpZGdldCBUaGUgd2lkZ2V0IHRvIGRldGVybWluZSBzcGFjZXNcbiAgICAgKiBAcGFyYW0gY2FsbGJhY2sgVGhlIGZ1bmN0aW9uIHRvIGJlIGNhbGxlZCBmb3IgZWFjaCBzcGFjZSwgc2hvdWxkIGV4cGVjdCBhIGNvbHVtbiBhbmQgcm93IGFyZ3VtZW50IHdpdGh0IGhlIGNvbnRleHQgYmVpbmcgdGhlIHdpZGdldFxuICAgICAqL1xuICAgIGZvckVhY2hCbG9jayh3aWRnZXQ6IERhc2hib2FyZFdpZGdldENvbXBvbmVudCwgY2FsbGJhY2s6IChjb2x1bW46IG51bWJlciwgcm93OiBudW1iZXIpID0+IHZvaWQpOiB2b2lkIHtcbiAgICAgICAgZm9yIChsZXQgcm93ID0gd2lkZ2V0LmdldFJvdygpOyByb3cgPCB3aWRnZXQuZ2V0Um93KCkgKyB3aWRnZXQuZ2V0Um93U3BhbigpOyByb3crKykge1xuICAgICAgICAgICAgZm9yIChsZXQgY29sdW1uID0gd2lkZ2V0LmdldENvbHVtbigpOyBjb2x1bW4gPCB3aWRnZXQuZ2V0Q29sdW1uKCkgKyB3aWRnZXQuZ2V0Q29sdW1uU3BhbigpOyBjb2x1bW4rKykge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrLmNhbGwod2lkZ2V0LCBjb2x1bW4sIHJvdyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBudW1iZXIgb2YgY29sdW1ucyBhdmFpbGFibGVcbiAgICAgKi9cbiAgICBnZXRDb2x1bW5Db3VudCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5zdGFja2VkID8gMSA6IHRoaXMub3B0aW9ucy5jb2x1bW5zO1xuICAgIH1cbn1cblxuZXhwb3J0IGNvbnN0IGRlZmF1bHRPcHRpb25zOiBEYXNoYm9hcmRPcHRpb25zID0geyBjb2x1bW5zOiA1LCBwYWRkaW5nOiA1LCBtaW5XaWR0aDogMTAwLCBtaW5IZWlnaHQ6IDEwMCwgZW1wdHlSb3c6IHRydWUgfTtcblxuZXhwb3J0IGludGVyZmFjZSBEYXNoYm9hcmREaW1lbnNpb25zIHtcbiAgICB3aWR0aD86IG51bWJlcjtcbiAgICBoZWlnaHQ/OiBudW1iZXI7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRGFzaGJvYXJkV2lkZ2V0RGltZW5zaW9ucyB7XG4gICAgeDogbnVtYmVyO1xuICAgIHk6IG51bWJlcjtcbiAgICB3aWR0aDogbnVtYmVyO1xuICAgIGhlaWdodDogbnVtYmVyO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIERhc2hib2FyZEFjdGlvbiB7XG4gICAgd2lkZ2V0OiBEYXNoYm9hcmRXaWRnZXRDb21wb25lbnQ7XG4gICAgZGlyZWN0aW9uOiBBY3Rpb25EaXJlY3Rpb247XG4gICAgZXZlbnQ6IE1vdXNlRXZlbnQ7XG4gICAgaGFuZGxlPzogSFRNTEVsZW1lbnQ7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRGFzaGJvYXJkU3BhY2Uge1xuICAgIHdpZGdldDogRGFzaGJvYXJkV2lkZ2V0Q29tcG9uZW50O1xuICAgIGNvbHVtbjogbnVtYmVyO1xuICAgIHJvdzogbnVtYmVyO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIERhc2hib2FyZFBsYWNlaG9sZGVyIHtcbiAgICB2aXNpYmxlOiBib29sZWFuO1xuICAgIHg6IG51bWJlcjtcbiAgICB5OiBudW1iZXI7XG4gICAgd2lkdGg6IG51bWJlcjtcbiAgICBoZWlnaHQ6IG51bWJlcjtcbiAgICBjb2x1bW4/OiBudW1iZXI7XG4gICAgcm93PzogbnVtYmVyO1xuICAgIGNvbHVtblNwYW4/OiBudW1iZXI7XG4gICAgcm93U3Bhbj86IG51bWJlcjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBEYXNoYm9hcmRDYWNoZSB7XG4gICAgaWQ6IHN0cmluZztcbiAgICBjb2x1bW46IG51bWJlcjtcbiAgICByb3c6IG51bWJlcjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBEYXNoYm9hcmRMYXlvdXREYXRhIHtcbiAgICBpZDogc3RyaW5nO1xuICAgIGNvbDogbnVtYmVyO1xuICAgIHJvdzogbnVtYmVyO1xuICAgIGNvbFNwYW46IG51bWJlcjtcbiAgICByb3dTcGFuOiBudW1iZXI7XG59XG5cbmV4cG9ydCBlbnVtIEFjdGlvbkRpcmVjdGlvbiB7XG4gICAgVG9wID0gMCxcbiAgICBUb3BSaWdodCA9IDEsXG4gICAgUmlnaHQgPSAyLFxuICAgIEJvdHRvbVJpZ2h0ID0gMyxcbiAgICBCb3R0b20gPSA0LFxuICAgIEJvdHRvbUxlZnQgPSA1LFxuICAgIExlZnQgPSA2LFxuICAgIFRvcExlZnQgPSA3LFxuICAgIE1vdmUgPSA4XG59XG5cbmV4cG9ydCBlbnVtIFJvdW5kaW5nIHtcbiAgICBSb3VuZERvd24sXG4gICAgUm91bmREb3duQmVsb3dIYWxmLFxuICAgIFJvdW5kVXAsXG4gICAgUm91bmRVcE92ZXJIYWxmXG59Il19