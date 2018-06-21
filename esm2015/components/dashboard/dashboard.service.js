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
    { type: Injectable },
];
/** @nocollapse */
DashboardService.ctorParameters = () => [];
function DashboardService_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    DashboardService.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    DashboardService.ctorParameters;
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGFzaGJvYXJkLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9kYXNoYm9hcmQvZGFzaGJvYXJkLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBRXZELE9BQU8sRUFBRSxLQUFLLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFLdkMsTUFBTTtJQW9DRjswQkFoQzZCLENBQUM7d0JBSW5CLElBQUksZUFBZSxDQUE2QixFQUFFLENBQUM7d0JBQ25ELElBQUksZUFBZSxDQUFtQixjQUFjLENBQUM7MkJBQ2xELElBQUksZUFBZSxDQUFzQixFQUFFLENBQUM7dUJBQzVCLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxVQUErQixLQUFLLFVBQVUsQ0FBQyxNQUFNLENBQUMsRUFBRSxvQkFBb0IsRUFBRSxDQUFDOzRCQUNuSSxJQUFJLGVBQWUsQ0FBdUIsRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUUsQ0FBQzt1QkFDbkcsSUFBSSxPQUFPLEVBQXlCO3dCQUNuQyxJQUFJLGVBQWUsQ0FBVSxLQUFLLENBQUM7UUF1QjFDLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENB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QUFHLENBQUMsQ0FBQztZQUNqQixVQUFVLENBQUMsS0FBSyxHQUFHLFlBQVksQ0FBQztTQUNuQztRQUVELEVBQUUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNuQixVQUFVLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNqQixVQUFVLENBQUMsTUFBTSxHQUFHLGFBQWEsQ0FBQztTQUNyQztRQUVELEVBQUUsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsR0FBRyxVQUFVLENBQUMsS0FBSyxDQUFDLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQzVELFVBQVUsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEdBQUcsVUFBVSxDQUFDLENBQUMsQ0FBQztTQUMzRDs7UUFHRCxFQUFFLENBQUMsQ0FBQyxVQUFVLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUMzQyxVQUFVLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQy9CLFVBQVUsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUM7U0FDNUM7O1FBR0QsRUFBRSxDQUFDLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDN0MsVUFBVSxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUMvQixVQUFVLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDO1NBQzlDOztRQUdELE1BQU0sQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDLEVBQUUsVUFBVSxDQUFDLENBQUMsRUFBRSxVQUFVLENBQUMsS0FBSyxFQUFFLFVBQVUsQ0FBQyxNQUFNLENBQUMs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LGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQzs7UUFHL0MsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLEtBQUssZUFBZSxDQUFDLEtBQUs7WUFDdEQsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLEtBQUssZUFBZSxDQUFDLFFBQVE7WUFDekQsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLEtBQUssZUFBZSxDQUFDLFdBQVc7WUFDNUQsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLEtBQUssZUFBZSxDQUFDLElBQUk7WUFDckQsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLEtBQUssZUFBZSxDQUFDLE9BQU87WUFDeEQsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLEtBQUssZUFBZSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7WUFDOUQsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQyxDQUFDO1NBQ2xDOztRQUdELHVCQUFNLFFBQVEsR0FBRyxLQUFLLEdBQUcsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBRS9DLE1BQU0sQ0FBQyxDQUFDLFVBQVUsR0FBRyxDQUFDLElBQUksUUFBUSxHQUFHLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFVLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQyxDQUFDO0tBQzdIOzs7Ozs7O0lBS0QsaUJBQWlCLENBQUMsQ0FBUyxFQUFFLE1BQWM7UUFFdkMsdUJBQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxLQUFLLGVBQWUsQ0FBQyxJQUFJLEdBQUcsUUFBUSxDQUFDLGVBQWUsR0FBRyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDeEksdUJBQU0sT0FBTyxHQUFH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UyxFQUFFLEVBQUUsTUFBTSxHQUFHLE1BQU0sQ0FBQyxTQUFTLEVBQUUsR0FBRyxNQUFNLENBQUMsYUFBYSxFQUFFLEVBQUUsTUFBTSxFQUFFLEVBQUUsQ0FBQztnQkFDbkcsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDO2FBQ3RDO1NBQ0o7S0FDSjs7Ozs7SUFLRCxjQUFjO1FBQ1YsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDO0tBQ2xEOzs7WUExaENKLFVBQVU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUE2aENYLE1BQU0sQ0FBQyx1QkFBTSxjQUFjLEdBQXFCLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzL0JlaGF2aW9yU3ViamVjdCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcbmltcG9ydCB7IGRlbGF5LCBkaXN0aW5jdFVudGlsQ2hhbmdlZCwgZmlsdGVyLCBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcy9TdWJqZWN0JztcbmltcG9ydCB7IERhc2hib2FyZE9wdGlvbnMgfSBmcm9tICcuL2Rhc2hib2FyZC5jb21wb25lbnQnO1xuaW1wb3J0IHsgRGFzaGJvYXJkV2lkZ2V0Q29tcG9uZW50IH0gZnJvbSAnLi93aWRnZXQvZGFzaGJvYXJkLXdpZGdldC5jb21wb25lbnQnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRGFzaGJvYXJkU2VydmljZSB7XG5cbiAgICBwcml2YXRlIF93aWRnZXRPcmlnaW46IHsgY29sdW1uPzogbnVtYmVyLCByb3c/OiBudW1iZXIsIGNvbHVtblNwYW4/OiBudW1iZXIsIHJvd1NwYW4/OiBudW1iZXIgfTtcbiAgICBwcml2YXRlIF9hY3Rpb25XaWRnZXQ6IERhc2hib2FyZEFjdGlvbjtcbiAgICBwcml2YXRlIF9yb3dIZWlnaHQ6IG51bWJlciA9IDA7XG4gICAgcHJpdmF0ZSBfY2FjaGU6IERhc2hib2FyZENhY2hlW107XG4gICAgcHJpdmF0ZSBfbW91c2VFdmVudDogTW91c2VFdmVudDtcblxuICAgIHdpZGdldHMkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxEYXNoYm9hcmRXaWRnZXRDb21wb25lbnRbXT4oW10pO1xuICAgIG9wdGlvbnMkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxEYXNoYm9hcmRPcHRpb25zPihkZWZhdWx0T3B0aW9ucyk7XG4gICAgZGltZW5zaW9ucyQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PERhc2hib2FyZERpbWVuc2lvbnM+KHt9KTtcbiAgICBoZWlnaHQkOiBPYnNlcnZhYmxlPG51bWJlcj4gPSB0aGlzLmRpbWVuc2lvbnMkLnBpcGUoZGVsYXkoMCksIG1hcCgoZGltZW5zaW9uczogRGFzaGJvYXJkRGltZW5zaW9ucykgPT4gZGltZW5zaW9ucy5oZWlnaHQpLCBkaXN0aW5jdFVudGlsQ2hhbmdlZCgpKTtcbiAgICBwbGFjZWhvbGRlciQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PERhc2hib2FyZFBsYWNlaG9sZGVyPih7IHZpc2libGU6IGZhbHNlLCB4OiAwLCB5OiAwLCB3aWR0aDogMCwgaGVpZ2h0OiAwIH0pO1xuICAgIGxheW91dCQgPSBuZXcgU3ViamVjdDxEYXNoYm9hcmRMYXlvdXREYXRhW10+KCk7XG4gICAgc3RhY2tlZCQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcblxuICAgIGdldCBvcHRpb25zKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5vcHRpb25zJC5nZXRWYWx1ZSgpO1xuICAgIH1cblxuICAgIGdldCB3aWRnZXRzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy53aWRnZXRzJC5nZXRWYWx1ZSgpO1xuICAgIH1cblxuICAgIGdldCBzdGFja2VkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zdGFja2VkJC5nZXRWYWx1ZSgpO1xuICAgIH1cblxuICAgIGdldCBkaW1lbnNpb25zKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5kaW1lbnNpb25zJC5nZXRWYWx1ZSgpO1xuICAgIH1cblxuICAgIGdldCBjb2x1bW5XaWR0aCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGltZW5zaW9ucy53aWR0aCAvIHRoaXMub3B0aW9ucy5jb2x1bW5zO1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmxheW91dCQuc3Vic2NyaWJlKHRoaXMuc2V0TGF5b3V0RGF0YS5iaW5kKHRoaXMpKTtcbiAgICAgICAgdGhpcy5zdGFja2VkJC5waXBlKGZpbHRlcihzdGFja2VkID0+IHN0YWNrZWQgPT09IHRydWUpKS5zdWJzY3JpYmUodGhpcy51cGRhdGVXaGVuU3RhY2tlZC5iaW5kKHRoaXMpKTtcbiAgICAgICAgdGhpcy53aWRnZXRzJC5waXBlKGRlbGF5KDApKS5zdWJzY3JpYmUoKCkgPT4gdGhpcy5yZW5kZXJEYXNoYm9hcmQoKSk7XG4gICAgICAgIHRoaXMuZGltZW5zaW9ucyQucGlwZShkZWxheSgwKSkuc3Vic2NyaWJlKCgpID0+IHRoaXMucmVuZGVyRGFzaGJvYXJkKCkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFkZCBhIHdpZGdldCB0byB0aGUgZGFzaGJvYXJkXG4gICAgICogQHBhcmFtIHdpZGdldCBUaGUgd2lkZ2V0IGNvbXBvbmVudCB0byBhZGQgdG8gdGhlIGRhc2hib2FyZFxuICAgICAqL1xuICAgIGFkZFdpZGdldCh3aWRnZXQ6IERhc2hib2FyZFdpZGdldENvbXBvbmVudCk6IHZvaWQge1xuICAgICAgICB0aGlzLndpZGdldHMkLm5leHQoWy4uLnRoaXMud2lkZ2V0cyQuZ2V0VmFsdWUoKSwgd2lkZ2V0XSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlIGEgd2lkZ2V0IGZyb20gdGhlIGRhc2hib2FyZFxuICAgICAqIEBwYXJhbSB3aWRnZXQgVGhlIHdpZGdldCB0byByZW1vdmVcbiAgICAgKi9cbiAgICByZW1vdmVXaWRnZXQod2lkZ2V0OiBEYXNoYm9hcmRXaWRnZXRDb21wb25lbnQpOiB2b2lkIHtcbiAgICAgICAgdGhpcy53aWRnZXRzJC5uZXh0KHRoaXMud2lkZ2V0cyQuZ2V0VmFsdWUoKS5maWx0ZXIoX3dpZGdldCA9PiBfd2lkZ2V0ICE9PSB3aWRnZXQpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBJbmRpY2F0ZSB0aGF0IHRoZSBkYXNoYm9hcmQgZWxlbWVudCBoYXMgYmVlbiByZXNpemVkXG4gICAgICogQHBhcmFtIHdpZHRoIFRoZSB3aWR0aCBvZiB0aGUgZGFzaGJvYXJkIGVsZW1lbnQgaW4gcHhcbiAgICAgKiBAcGFyYW0gaGVpZ2h0IFRoZSBoZWlnaHQgb2YgdGhlIGRhc2hib2FyZCBlbGVtZW50IGluIHB4XG4gICAgICovXG4gICAgc2V0RGltZW5zaW9ucyh3aWR0aDogbnVtYmVyID0gdGhpcy5kaW1lbnNpb25zLndpZHRoLCBoZWlnaHQ6IG51bWJlciA9IHRoaXMuZGltZW5zaW9ucy5oZWlnaHQpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuZGltZW5zaW9ucy53aWR0aCAhPT0gd2lkdGggfHwgdGhpcy5kaW1lbnNpb25zLmhlaWdodCAhPT0gaGVpZ2h0KSB7XG4gICAgICAgICAgICB0aGlzLmRpbWVuc2lvbnMkLm5leHQoeyB3aWR0aDogd2lkdGgsIGhlaWdodDogaGVpZ2h0IH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUHJvZHVjZSBhbiBvYmplY3QgY29udGFpbmluZyBhbGwgdGhlIHJlcXVpcmVkIGxheW91dCBkYXRhLlxuICAgICAqIFRoaXMgY2FuIGJlIHVzZWZ1bCBmb3IgZXhwb3J0aW5nL3NhdmluZyBhIGxheW91dFxuICAgICAqL1xuICAgIGdldExheW91dERhdGEoKTogRGFzaGJvYXJkTGF5b3V0RGF0YVtdIHtcbiAgICAgICAgcmV0dXJuIHRoaXMud2lkZ2V0cy5tYXAod2lkZ2V0ID0+IHtcbiAgICAgICAgICAgIHJldHVybiB7IGlkOiB3aWRnZXQuaWQsIGNvbDogd2lkZ2V0LmdldENvbHVtbigpLCByb3c6IHdpZGdldC5nZXRSb3coKSwgY29sU3Bhbjogd2lkZ2V0LmdldENvbHVtblNwYW4oKSwgcm93U3Bhbjogd2lkZ2V0LmdldFJvd1NwYW4oKSB9O1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQb3NpdGlvbiB3aWRnZXRzIHByb2dyYW1hdGljYWxseVxuICAgICAqL1xuICAgIHNldExheW91dERhdGEod2lkZ2V0czogRGFzaGJvYXJkTGF5b3V0RGF0YVtdKTogdm9pZCB7XG5cbiAgICAgICAgLy8gaXRlcmF0ZSB0aHJvdWdoIGVhY2ggd2lkZ2V0IGRhdGEgYW5kIGZpbmQgYSBtYXRjaFxuICAgICAgICB3aWRnZXRzLmZvckVhY2god2lkZ2V0ID0+IHtcblxuICAgICAgICAgICAgLy8gZmluZCB0aGUgbWF0Y2hpbmcgd2lkZ2V0XG4gICAgICAgICAgICBjb25zdCB0YXJnZXQgPSB0aGlzLndpZGdldHMuZmluZChfd2lkZ2V0ID0+IF93aWRnZXQuaWQgPT09IHdpZGdldC5pZCk7XG5cbiAgICAgICAgICAgIGlmICh0YXJnZXQpIHtcbiAgICAgICAgICAgICAgICB0YXJnZXQuc2V0Q29sdW1uKHdpZGdldC5jb2wpO1xuICAgICAgICAgICAgICAgIHRhcmdldC5zZXRSb3cod2lkZ2V0LnJvdyk7XG4gICAgICAgICAgICAgICAgdGFyZ2V0LnNldENvbHVtblNwYW4od2lkZ2V0LmNvbFNwYW4pO1xuICAgICAgICAgICAgICAgIHRhcmdldC5zZXRSb3dTcGFuKHdpZGdldC5yb3dTcGFuKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVXBkYXRlIHRoZSBwb3NpdGlvbnMgYW5kIHNpemVzIG9mIHRoZSB3aWRnZXRzXG4gICAgICovXG4gICAgcmVuZGVyRGFzaGJvYXJkKCk6IHZvaWQge1xuXG4gICAgICAgIC8vIGdldCB0aGUgZGltZW5zaW9ucyBvZiB0aGUgZGFzaGJvYXJkXG4gICAgICAgIHRoaXMuX3Jvd0hlaWdodCA9IHRoaXMub3B0aW9ucy5yb3dIZWlnaHQgfHwgdGhpcy5jb2x1bW5XaWR0aDtcblxuICAgICAgICAvLyBlbnN1cmUgdGhlIGNvbHVtbiB3aWR0aCBpcyBub3QgYmVsb3cgdGhlIG1pbiB3aWR0aHNcbiAgICAgICAgdGhpcy5zdGFja2VkJC5uZXh0KHRoaXMuY29sdW1uV2lkdGggPCB0aGlzLm9wdGlvbnMubWluV2lkdGgpO1xuXG4gICAgICAgIC8vIGVuc3VyZSB0aGUgcm93IGhlaWdodCBpcyBub3QgYmVsb3cgdGhlIG1pbiB3aWR0aHNcbiAgICAgICAgaWYgKHRoaXMuX3Jvd0hlaWdodCA8IHRoaXMub3B0aW9ucy5taW5XaWR0aCkge1xuICAgICAgICAgICAgdGhpcy5fcm93SGVpZ2h0ID0gdGhpcy5vcHRpb25zLm1pbldpZHRoO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zZXREYXNoYm9hcmRMYXlvdXQoKTtcblxuICAgICAgICAvLyBpdGVyYXRlIHRocm91Z2ggZWFjaCB3aWRnZXQgYW5kIHNldCB0aGUgc2l6ZSAtIGV4Y2VwdCB0aGUgb25lIGJlaW5nIHJlc2l6ZWRcbiAgICAgICAgdGhpcy53aWRnZXRzLmZpbHRlcih3aWRnZXQgPT4gIXRoaXMuX2FjdGlvbldpZGdldCB8fCB3aWRnZXQgIT09IHRoaXMuX2FjdGlvbldpZGdldC53aWRnZXQpXG4gICAgICAgICAgICAuZm9yRWFjaCh3aWRnZXQgPT4gd2lkZ2V0LnJlbmRlcigpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEZXRlcm1pbmUgd2hlcmUgd2lkZ2V0cyBzaG91bGQgYmUgcG9zaXRpb25lZCBiYXNlZCBvbiB0aGVpciBwb3NpdGlvbnMsIHdpZHRoIGFuZCB0aGUgc2l6ZSBvZiB0aGUgY29udGFpbmVyXG4gICAgICovXG4gICAgc2V0RGFzaGJvYXJkTGF5b3V0KCk6IHZvaWQge1xuXG4gICAgICAgIC8vIGZpbmQgYW55IHdpZGdldHMgdGhhdCBkbyBub3QgY3VycmVudGx5IGhhdmUgYSBwb3NpdGlvbiBzZXRcbiAgICAgICAgdGhpcy53aWRnZXRzLmZpbHRlcih3aWRnZXQgPT4gd2lkZ2V0LmdldENvbHVtbigpID09PSB1bmRlZmluZWQgfHwgd2lkZ2V0LmdldFJvdygpID09PSB1bmRlZmluZWQpXG4gICAgICAgICAgICAuZm9yRWFjaCh3aWRnZXQgPT4gdGhpcy5zZXRXaWRnZXRQb3NpdGlvbih3aWRnZXQpKTtcblxuICAgICAgICB0aGlzLnNldERhc2hib2FyZEhlaWdodCgpO1xuICAgIH1cblxuICAgIHVwZGF0ZVdoZW5TdGFja2VkKCk6IHZvaWQge1xuXG4gICAgICAgIC8vIGl0ZXJhdGUgdGhyb3VnaCBlYWNoIHdpZGdldCBzZXQgaXQncyBzdGFja2VkIHN0YXRlIGFuZFxuICAgICAgICB0aGlzLmdldFdpZGdldHNCeU9yZGVyKCkuZm9yRWFjaCgod2lkZ2V0LCBpZHgpID0+IHtcbiAgICAgICAgICAgIHdpZGdldC5zZXRDb2x1bW4oMCk7XG4gICAgICAgICAgICB3aWRnZXQuc2V0Um93KGlkeCk7XG4gICAgICAgIH0pO1xuXG4gICAgfVxuXG4gICAgZ2V0V2lkZ2V0c0J5T3JkZXIoKTogRGFzaGJvYXJkV2lkZ2V0Q29tcG9uZW50W10ge1xuICAgICAgICByZXR1cm4gdGhpcy53aWRnZXRzLnNvcnQoKHcxLCB3MikgPT4ge1xuXG4gICAgICAgICAgICBjb25zdCB3MVBvc2l0aW9uID0gdzEuZ2V0Q29sdW1uKCkgKiB3MS5nZXRSb3coKTtcbiAgICAgICAgICAgIGNvbnN0IHcyUG9zaXRpb24gPSB3Mi5nZXRDb2x1bW4oKSAqIHcyLmdldFJvdygpO1xuXG4gICAgICAgICAgICBpZiAodzFQb3NpdGlvbiA8IHcyUG9zaXRpb24pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gLTE7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh3MVBvc2l0aW9uID4gdzJQb3NpdGlvbikge1xuICAgICAgICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRmluZCBhIHBvc2l0aW9uIHRoYXQgYSB3aWRnZXQgY2FuIGZpdCBpbiB0aGUgZGFzaGJvYXJkXG4gICAgICogQHBhcmFtIHdpZGdldCBUaGUgd2lkZ2V0IHRvIHRyeSBhbmQgcG9zaXRpb25cbiAgICAgKi9cbiAgICBzZXRXaWRnZXRQb3NpdGlvbih3aWRnZXQ6IERhc2hib2FyZFdpZGdldENvbXBvbmVudCk6IHZvaWQge1xuXG4gICAgICAgIC8vIGZpbmQgYSBwb3NpdGlvbiBmb3IgdGhlIHdpZGdldFxuICAgICAgICBsZXQgcG9zaXRpb24gPSAwO1xuICAgICAgICBsZXQgc3VjY2VzcyA9IGZhbHNlO1xuXG4gICAgICAgIC8vIHJlcGVhdCB1bnRpbCBhIHNwYWNlIGlzIGZvdW5kXG4gICAgICAgIHdoaWxlICghc3VjY2Vzcykge1xuXG4gICAgICAgICAgICAvLyBnZXQgYSBwb3NpdGlvbiB0byB0cnlcbiAgICAgICAgICAgIGNvbnN0IGNvbHVtbiA9IHBvc2l0aW9uICUgdGhpcy5vcHRpb25zLmNvbHVtbnM7XG4gICAgICAgICAgICBjb25zdCByb3cgPSBNYXRoLmZsb29yKHBvc2l0aW9uIC8gdGhpcy5vcHRpb25zLmNvbHVtbnMpO1xuXG4gICAgICAgICAgICAvLyBjaGVjayB0aGUgY3VycmVudCBwb3NpdGlvblxuICAgICAgICAgICAgaWYgKHRoaXMuZ2V0UG9zaXRpb25BdmFpbGFibGUoY29sdW1uLCByb3csIHdpZGdldC5nZXRDb2x1bW5TcGFuKCksIHdpZGdldC5nZXRSb3dTcGFuKCkpKSB7XG4gICAgICAgICAgICAgICAgc3VjY2VzcyA9IHRydWU7XG4gICAgICAgICAgICAgICAgd2lkZ2V0LnNldENvbHVtbihjb2x1bW4pO1xuICAgICAgICAgICAgICAgIHdpZGdldC5zZXRSb3cocm93KTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChjb2x1bW4gPT09IDAgJiYgd2lkZ2V0LmNvbFNwYW4gPiB0aGlzLm9wdGlvbnMuY29sdW1ucykge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignRGFzaGJvYXJkIHdpZGdldHMgaGF2ZSBhIGNvbFNwYW4gZ3JlYXRlciB0aGFuIHRoZSBtYXggbnVtYmVyIG9mIGRhc2hib2FyZCBjb2x1bW5zIScpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBwb3NpdGlvbisrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2hlY2sgaWYgYSBwb3NpdGlvbiBpbiB0aGUgZGFzaGJvYXJkIGlzIHZhY2FudCBvciBub3RcbiAgICAgKi9cbiAgICBnZXRQb3NpdGlvbkF2YWlsYWJsZShjb2x1bW46IG51bWJlciwgcm93OiBudW1iZXIsIGNvbHVtblNwYW46IG51bWJlciwgcm93U3BhbjogbnVtYmVyLCBpZ25vcmVXaWRnZXQ/OiBEYXNoYm9hcmRXaWRnZXRDb21wb25lbnQpOiBib29sZWFuIHtcblxuICAgICAgICAvLyBnZXQgYSBsaXN0IG9mIGdyaWQgc3BhY2VzIHRoYXQgYXJlIHBvcHVsYXRlZFxuICAgICAgICBjb25zdCBzcGFjZXMgPSB0aGlzLmdldE9jY3VwaWVkU3BhY2VzKCk7XG5cbiAgICAgICAgLy8gY2hlY2sgaWYgdGhlIGJsb2NrIHdvdWxkIHN0aWxsIGJlIGluIGJvdW5kc1xuICAgICAgICBpZiAoY29sdW1uICsgY29sdW1uU3BhbiA+IHRoaXMub3B0aW9ucy5jb2x1bW5zKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBjaGVjayBlYWNoIHJlcXVpcmVkIHBvc2l0aW9uXG4gICAgICAgIGZvciAobGV0IHggPSBjb2x1bW47IHggPCBjb2x1bW4gKyBjb2x1bW5TcGFuOyB4KyspIHtcbiAgICAgICAgICAgIGZvciAobGV0IHkgPSByb3c7IHkgPCByb3cgKyByb3dTcGFuOyB5KyspIHtcbiAgICAgICAgICAgICAgICBpZiAoc3BhY2VzLmZpbmQoYmxvY2sgPT4gYmxvY2suY29sdW1uID09PSB4ICYmIGJsb2NrLnJvdyA9PT0geSAmJiBibG9jay53aWRnZXQgIT09IGlnbm9yZVdpZGdldCkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIGdldE9jY3VwaWVkU3BhY2VzKCk6IERhc2hib2FyZFNwYWNlW10ge1xuXG4gICAgICAgIC8vIGZpbmQgYWxsIHNwYWNlcyB0aGF0IGFyZSBjdXJyZW50bHkgb2NjdXBpZWRcbiAgICAgICAgcmV0dXJuIHRoaXMud2lkZ2V0cy5maWx0ZXIod2lkZ2V0ID0+IHdpZGdldC5nZXRDb2x1bW4oKSAhPT0gdW5kZWZpbmVkICYmIHdpZGdldC5nZXRSb3coKSAhPT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgLnJlZHVjZSgodmFsdWUsIHdpZGdldCkgPT4ge1xuXG4gICAgICAgICAgICAgICAgdGhpcy5mb3JFYWNoQmxvY2sod2lkZ2V0LCAoY29sdW1uLCByb3cpID0+IHZhbHVlLnB1c2goeyB3aWRnZXQ6IHdpZGdldCwgY29sdW1uOiBjb2x1bW4sIHJvdzogcm93IH0pKTtcblxuICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgICAgIH0sIFtdKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBCZWdpbiByZXNpemluZyBhIHdpZGdldFxuICAgICAqIEBwYXJhbSBhY3Rpb24gVGhlIHRoZSB3aWRnZXQgdG8gcmVzaXplXG4gICAgICovXG4gICAgb25SZXNpemVTdGFydChhY3Rpb246IERhc2hib2FyZEFjdGlvbik6IHZvaWQge1xuXG4gICAgICAgIC8vIHN0b3JlIHRoZSBtb3VzZSBldmVudFxuICAgICAgICB0aGlzLl9tb3VzZUV2ZW50ID0gYWN0aW9uLmV2ZW50O1xuICAgICAgICB0aGlzLl9hY3Rpb25XaWRnZXQgPSBhY3Rpb247XG5cbiAgICAgICAgLy8gYnJpbmcgdGhlIHdpZGdldCB0byB0aGUgZm9udFxuICAgICAgICB0aGlzLmJyaW5nVG9Gcm9udChhY3Rpb24ud2lkZ2V0KTtcbiAgICB9XG5cbiAgICBvblJlc2l6ZURyYWcoYWN0aW9uOiBEYXNoYm9hcmRBY3Rpb24pOiB2b2lkIHtcblxuICAgICAgICBjb25zdCBtb3VzZVBvc1ggPSB0aGlzLl9tb3VzZUV2ZW50LnBhZ2VYIC0gcGFnZVhPZmZzZXQ7XG4gICAgICAgIGNvbnN0IG1vdXNlUG9zWSA9IHRoaXMuX21vdXNlRXZlbnQucGFnZVkgLSBwYWdlWU9mZnNldDtcblxuICAgICAgICAvLyBpZiB0aGVyZSB3YXMgbm8gbW92ZW1lbnQgdGhlbiBkbyBub3RoaW5nXG4gICAgICAgIGlmIChhY3Rpb24uZXZlbnQueCA9PT0gbW91c2VQb3NYICYmIGFjdGlvbi5ldmVudC55ID09PSBtb3VzZVBvc1kpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHVwZGF0ZSB0aGUgc3RvcmVkIG1vdXNlIGV2ZW50XG4gICAgICAgIHRoaXMuX21vdXNlRXZlbnQgPSBhY3Rpb24uZXZlbnQ7XG5cbiAgICAgICAgLy8gZ2V0IGhhbmRsZSBmb3IgZGlyZWN0aW9uXG4gICAgICAgIGNvbnN0IHsgaGFuZGxlIH0gPSBhY3Rpb247XG5cbiAgICAgICAgLy8gZ2V0IHRoZSBib3VuZHMgb2YgdGhlIGhhbmRsZVxuICAgICAgICBjb25zdCBib3VuZHMgPSBoYW5kbGUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cbiAgICAgICAgLy8gZ2V0IHRoZSBjZW50ZXIgb2YgdGhlIGhhbmRsZVxuICAgICAgICBjb25zdCBjZW50ZXJYID0gYm91bmRzLmxlZnQgKyAoYm91bmRzLndpZHRoIC8gMik7XG4gICAgICAgIGNvbnN0IGNlbnRlclkgPSBib3VuZHMudG9wICsgKGJvdW5kcy5oZWlnaHQgLyAyKTtcblxuICAgICAgICAvLyBnZXQgdGhlIGN1cnJlbnQgbW91c2UgcG9zaXRpb25cbiAgICAgICAgY29uc3QgbW91c2VYID0gbW91c2VQb3NYIC0gY2VudGVyWDtcbiAgICAgICAgY29uc3QgbW91c2VZID0gbW91c2VQb3NZIC0gY2VudGVyWTtcblxuICAgICAgICAvLyBzdG9yZSB0aGUgbmV3IHByb3Bvc2VkIGRpbWVuc2lvbnMgZm9yIHRoZSB3aWRnZXRcbiAgICAgICAgY29uc3QgZGltZW5zaW9uczogRGFzaGJvYXJkV2lkZ2V0RGltZW5zaW9ucyA9IHtcbiAgICAgICAgICAgIHg6IGFjdGlvbi53aWRnZXQueCxcbiAgICAgICAgICAgIHk6IGFjdGlvbi53aWRnZXQueSxcbiAgICAgICAgICAgIHdpZHRoOiBhY3Rpb24ud2lkZ2V0LndpZHRoLFxuICAgICAgICAgICAgaGVpZ2h0OiBhY3Rpb24ud2lkZ2V0LmhlaWdodFxuICAgICAgICB9O1xuXG4gICAgICAgIC8vIHVwZGF0ZSB3aWRnZXQgYmFzZWQgb24gdGhlIGhhbmRsZSBiZWluZyBkcmFnZ2VkXG4gICAgICAgIHN3aXRjaCAoYWN0aW9uLmRpcmVjdGlvbikge1xuXG4gICAgICAgICAgICBjYXNlIEFjdGlvbkRpcmVjdGlvbi5SaWdodDpcbiAgICAgICAgICAgICAgICBkaW1lbnNpb25zLndpZHRoICs9IG1vdXNlWDtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSBBY3Rpb25EaXJlY3Rpb24uTGVmdDpcbiAgICAgICAgICAgICAgICBkaW1lbnNpb25zLnggKz0gbW91c2VYO1xuICAgICAgICAgICAgICAgIGRpbWVuc2lvbnMud2lkdGggLT0gbW91c2VYO1xuXG4gICAgICAgICAgICAgICAgaWYgKGRpbWVuc2lvbnMud2lkdGggPCB0aGlzLm9wdGlvbnMubWluV2lkdGgpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZGlmZmVyZW5jZSA9IHRoaXMub3B0aW9ucy5taW5XaWR0aCAtIGRpbWVuc2lvbnMud2lkdGg7XG4gICAgICAgICAgICAgICAgICAgIGRpbWVuc2lvbnMueCAtPSBkaWZmZXJlbmNlO1xuICAgICAgICAgICAgICAgICAgICBkaW1lbnNpb25zLndpZHRoICs9IGRpZmZlcmVuY2U7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgQWN0aW9uRGlyZWN0aW9uLkJvdHRvbTpcbiAgICAgICAgICAgICAgICBkaW1lbnNpb25zLmhlaWdodCArPSBtb3VzZVk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgQWN0aW9uRGlyZWN0aW9uLlRvcDpcbiAgICAgICAgICAgICAgICBkaW1lbnNpb25zLnkgKz0gbW91c2VZO1xuICAgICAgICAgICAgICAgIGRpbWVuc2lvbnMuaGVpZ2h0IC09IG1vdXNlWTtcblxuICAgICAgICAgICAgICAgIGlmIChkaW1lbnNpb25zLmhlaWdodCA8IHRoaXMub3B0aW9ucy5taW5IZWlnaHQpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZGlmZmVyZW5jZSA9IHRoaXMub3B0aW9ucy5taW5IZWlnaHQgLSBkaW1lbnNpb25zLmhlaWdodDtcbiAgICAgICAgICAgICAgICAgICAgZGltZW5zaW9ucy55IC09IGRpZmZlcmVuY2U7XG4gICAgICAgICAgICAgICAgICAgIGRpbWVuc2lvbnMuaGVpZ2h0ICs9IGRpZmZlcmVuY2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAvLyBTdXBwb3J0IHJlc2l6aW5nIG9uIG11bHRpcGxlIGF4aXMgc2ltdWx0YW5lb3VzbHlcbiAgICAgICAgICAgIGNhc2UgQWN0aW9uRGlyZWN0aW9uLlRvcExlZnQ6XG5cbiAgICAgICAgICAgICAgICBkaW1lbnNpb25zLnggKz0gbW91c2VYO1xuICAgICAgICAgICAgICAgIGRpbWVuc2lvbnMud2lkdGggLT0gbW91c2VYO1xuXG4gICAgICAgICAgICAgICAgaWYgKGRpbWVuc2lvbnMud2lkdGggPCB0aGlzLm9wdGlvbnMubWluV2lkdGgpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZGlmZmVyZW5jZSA9IHRoaXMub3B0aW9ucy5taW5XaWR0aCAtIGRpbWVuc2lvbnMud2lkdGg7XG4gICAgICAgICAgICAgICAgICAgIGRpbWVuc2lvbnMueCAtPSBkaWZmZXJlbmNlO1xuICAgICAgICAgICAgICAgICAgICBkaW1lbnNpb25zLndpZHRoICs9IGRpZmZlcmVuY2U7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgZGltZW5zaW9ucy55ICs9IG1vdXNlWTtcbiAgICAgICAgICAgICAgICBkaW1lbnNpb25zLmhlaWdodCAtPSBtb3VzZVk7XG5cbiAgICAgICAgICAgICAgICBpZiAoZGltZW5zaW9ucy5oZWlnaHQgPCB0aGlzLm9wdGlvbnMubWluSGVpZ2h0KSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGRpZmZlcmVuY2UgPSB0aGlzLm9wdGlvbnMubWluSGVpZ2h0IC0gZGltZW5zaW9ucy5oZWlnaHQ7XG4gICAgICAgICAgICAgICAgICAgIGRpbWVuc2lvbnMueSAtPSBkaWZmZXJlbmNlO1xuICAgICAgICAgICAgICAgICAgICBkaW1lbnNpb25zLmhlaWdodCArPSBkaWZmZXJlbmNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSBBY3Rpb25EaXJlY3Rpb24uVG9wUmlnaHQ6XG4gICAgICAgICAgICAgICAgZGltZW5zaW9ucy53aWR0aCArPSBtb3VzZVg7XG4gICAgICAgICAgICAgICAgZGltZW5zaW9ucy55ICs9IG1vdXNlWTtcbiAgICAgICAgICAgICAgICBkaW1lbnNpb25zLmhlaWdodCAtPSBtb3VzZVk7XG5cbiAgICAgICAgICAgICAgICBpZiAoZGltZW5zaW9ucy5oZWlnaHQgPCB0aGlzLm9wdGlvbnMubWluSGVpZ2h0KSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGRpZmZlcmVuY2UgPSB0aGlzLm9wdGlvbnMubWluSGVpZ2h0IC0gZGltZW5zaW9ucy5oZWlnaHQ7XG4gICAgICAgICAgICAgICAgICAgIGRpbWVuc2lvbnMueSAtPSBkaWZmZXJlbmNlO1xuICAgICAgICAgICAgICAgICAgICBkaW1lbnNpb25zLmhlaWdodCArPSBkaWZmZXJlbmNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSBBY3Rpb25EaXJlY3Rpb24uQm90dG9tTGVmdDpcbiAgICAgICAgICAgICAgICBkaW1lbnNpb25zLmhlaWdodCArPSBtb3VzZVk7XG4gICAgICAgICAgICAgICAgZGltZW5zaW9ucy54ICs9IG1vdXNlWDtcbiAgICAgICAgICAgICAgICBkaW1lbnNpb25zLndpZHRoIC09IG1vdXNlWDtcblxuICAgICAgICAgICAgICAgIGlmIChkaW1lbnNpb25zLndpZHRoIDwgdGhpcy5vcHRpb25zLm1pbldpZHRoKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGRpZmZlcmVuY2UgPSB0aGlzLm9wdGlvbnMubWluV2lkdGggLSBkaW1lbnNpb25zLndpZHRoO1xuICAgICAgICAgICAgICAgICAgICBkaW1lbnNpb25zLnggLT0gZGlmZmVyZW5jZTtcbiAgICAgICAgICAgICAgICAgICAgZGltZW5zaW9ucy53aWR0aCArPSBkaWZmZXJlbmNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSBBY3Rpb25EaXJlY3Rpb24uQm90dG9tUmlnaHQ6XG4gICAgICAgICAgICAgICAgZGltZW5zaW9ucy5oZWlnaHQgKz0gbW91c2VZO1xuICAgICAgICAgICAgICAgIGRpbWVuc2lvbnMud2lkdGggKz0gbW91c2VYO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgY3VycmVudFdpZHRoID0gYWN0aW9uLndpZGdldC54ICsgYWN0aW9uLndpZGdldC53aWR0aDtcbiAgICAgICAgY29uc3QgY3VycmVudEhlaWdodCA9IGFjdGlvbi53aWRnZXQueSArIGFjdGlvbi53aWRnZXQuaGVpZ2h0O1xuXG4gICAgICAgIC8vIGVuc3VyZSB2YWx1ZXMgYXJlIHdpdGhpbiB0aGUgZGFzaGJvYXJkIGJvdW5kc1xuICAgICAgICBpZiAoZGltZW5zaW9ucy54IDwgMCkge1xuICAgICAgICAgICAgZGltZW5zaW9ucy54ID0gMDtcbiAgICAgICAgICAgIGRpbWVuc2lvbnMud2lkdGggPSBjdXJyZW50V2lkdGg7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZGltZW5zaW9ucy55IDwgMCkge1xuICAgICAgICAgICAgZGltZW5zaW9ucy55ID0gMDtcbiAgICAgICAgICAgIGRpbWVuc2lvbnMuaGVpZ2h0ID0gY3VycmVudEhlaWdodDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICgoZGltZW5zaW9ucy54ICsgZGltZW5zaW9ucy53aWR0aCkgPiB0aGlzLmRpbWVuc2lvbnMud2lkdGgpIHtcbiAgICAgICAgICAgIGRpbWVuc2lvbnMud2lkdGggPSB0aGlzLmRpbWVuc2lvbnMud2lkdGggLSBkaW1lbnNpb25zLng7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBpZiB0aGUgcHJvcG9zZWQgd2lkdGggaXMgc21hbGxlciB0aGFuIGFsbG93ZWQgdGhlbiByZXNldCB3aWR0aCB0byBtaW5pbXVtIGFuZCBpZ25vcmUgeCBjaGFuZ2VzXG4gICAgICAgIGlmIChkaW1lbnNpb25zLndpZHRoIDwgdGhpcy5vcHRpb25zLm1pbldpZHRoKSB7XG4gICAgICAgICAgICBkaW1lbnNpb25zLnggPSBhY3Rpb24ud2lkZ2V0Lng7XG4gICAgICAgICAgICBkaW1lbnNpb25zLndpZHRoID0gdGhpcy5vcHRpb25zLm1pbldpZHRoO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gaWYgdGhlIHByb3Bvc2VkIGhlaWdodCBpcyBzbWFsbGVyIHRoYW4gYWxsb3dlZCB0aGVuIHJlc2V0IGhlaWdodCB0byBtaW5pbXVtIGFuZCBpZ25vcmUgeSBjaGFuZ2VzXG4gICAgICAgIGlmIChkaW1lbnNpb25zLmhlaWdodCA8IHRoaXMub3B0aW9ucy5taW5IZWlnaHQpIHtcbiAgICAgICAgICAgIGRpbWVuc2lvbnMueSA9IGFjdGlvbi53aWRnZXQueTtcbiAgICAgICAgICAgIGRpbWVuc2lvbnMuaGVpZ2h0ID0gdGhpcy5vcHRpb25zLm1pbkhlaWdodDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHVwZGF0ZSB0aGUgd2lkZ2V0IGFjdHVhbCB2YWx1ZXNcbiAgICAgICAgYWN0aW9uLndpZGdldC5zZXRCb3VuZHMoZGltZW5zaW9ucy54LCBkaW1lbnNpb25zLnksIGRpbWVuc2lvbnMud2lkdGgsIGRpbWVuc2lvbnMuaGVpZ2h0KTtcblxuICAgICAgICAvLyB1cGRhdGUgcGxhY2Vob2xkZXIgcG9zaXRpb24gYW5kIHZhbHVlXG4gICAgICAgIHRoaXMuc2V0UGxhY2Vob2xkZXJCb3VuZHModHJ1ZSwgZGltZW5zaW9ucy54LCBkaW1lbnNpb25zLnksIGRpbWVuc2lvbnMud2lkdGgsIGRpbWVuc2lvbnMuaGVpZ2h0KTtcblxuICAgICAgICAvLyBzaG93IHRoZSB3aWRnZXQgcG9zaXRpb25zIGlmIHRoZSBjdXJyZW50IHBvc2l0aW9ucyBhbmQgc2l6ZXMgd2VyZSB0byBwZXJzaXN0XG4gICAgICAgIHRoaXMudXBkYXRlV2lkZ2V0UG9zaXRpb25zKGFjdGlvbi53aWRnZXQpO1xuICAgIH1cblxuICAgIG9uUmVzaXplRW5kKCk6IHZvaWQge1xuXG4gICAgICAgIGNvbnN0IHBsYWNlaG9sZGVyID0gdGhpcy5wbGFjZWhvbGRlciQuZ2V0VmFsdWUoKTtcblxuICAgICAgICAvLyBjb21taXQgcmVzaXplIGNoYW5nZXNcbiAgICAgICAgdGhpcy5jb21taXRXaWRnZXRDaGFuZ2VzKCk7XG5cbiAgICAgICAgLy8gaGlkZSBwbGFjZWhvbGRlclxuICAgICAgICBwbGFjZWhvbGRlci52aXNpYmxlID0gZmFsc2U7XG5cbiAgICAgICAgLy8gdXBkYXRlIHRoZSBwbGFjZWhvbGRlclxuICAgICAgICB0aGlzLnBsYWNlaG9sZGVyJC5uZXh0KHBsYWNlaG9sZGVyKTtcblxuICAgICAgICB0aGlzLl9hY3Rpb25XaWRnZXQgPSBudWxsO1xuICAgICAgICB0aGlzLl9tb3VzZUV2ZW50ID0gbnVsbDtcblxuICAgICAgICAvLyBlbnN1cmUgYW55IHZhY2FudCB1cHBlciBzcGFjZXMgYXJlIGZpbGxlZCB3aGVyZSByZXF1aXJlZFxuICAgICAgICB0aGlzLnNoaWZ0V2lkZ2V0c1VwKCk7XG5cbiAgICAgICAgLy8gdXBkYXRlIGRhc2hib2FyZCBoZWlnaHRcbiAgICAgICAgdGhpcy5zZXREYXNoYm9hcmRIZWlnaHQoKTtcblxuICAgICAgICAvLyBlbWl0IGluZm9ybWF0aW9uIGFib3V0IHRoZSBsYXlvdXRcbiAgICAgICAgdGhpcy5sYXlvdXQkLm5leHQodGhpcy5nZXRMYXlvdXREYXRhKCkpO1xuICAgIH1cblxuICAgIG9uRHJhZ1N0YXJ0KGFjdGlvbjogRGFzaGJvYXJkQWN0aW9uKTogdm9pZCB7XG4gICAgICAgIHRoaXMub25SZXNpemVTdGFydChhY3Rpb24pO1xuXG4gICAgICAgIC8vIHN0b3JlIHRoZSBzdGFydGluZyBwbGFjZWhvbGRlciBwb3NpdGlvblxuICAgICAgICB0aGlzLnNldFdpZGdldE9yaWdpbigpO1xuXG4gICAgICAgIHRoaXMuY2FjaGVXaWRnZXRzKCk7XG4gICAgfVxuXG4gICAgb25EcmFnRW5kKCk6IHZvaWQge1xuICAgICAgICB0aGlzLm9uUmVzaXplRW5kKCk7XG5cbiAgICAgICAgdGhpcy5fd2lkZ2V0T3JpZ2luID0ge307XG4gICAgfVxuXG4gICAgb25EcmFnKGFjdGlvbjogRGFzaGJvYXJkQWN0aW9uKTogdm9pZCB7XG5cbiAgICAgICAgLy8gaWYgdGhlcmUgd2FzIG5vIG1vdmVtZW50IHRoZW4gZG8gbm90aGluZ1xuICAgICAgICBpZiAoYWN0aW9uLmV2ZW50LnBhZ2VYID09PSB0aGlzLl9tb3VzZUV2ZW50LnBhZ2VYICYmIGFjdGlvbi5ldmVudC5wYWdlWSA9PT0gdGhpcy5fbW91c2VFdmVudC5wYWdlWSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gZ2V0IHRoZSBjdXJyZW50IG1vdXNlIHBvc2l0aW9uXG4gICAgICAgIGNvbnN0IG1vdXNlWCA9IGFjdGlvbi5ldmVudC5wYWdlWCAtIHRoaXMuX21vdXNlRXZlbnQucGFnZVg7XG4gICAgICAgIGNvbnN0IG1vdXNlWSA9IGFjdGlvbi5ldmVudC5wYWdlWSAtIHRoaXMuX21vdXNlRXZlbnQucGFnZVk7XG5cbiAgICAgICAgLy8gc3RvcmUgdGhlIGxhdGVzdCBldmVudFxuICAgICAgICB0aGlzLl9tb3VzZUV2ZW50ID0gYWN0aW9uLmV2ZW50O1xuXG4gICAgICAgIGNvbnN0IGRpbWVuc2lvbnM6IERhc2hib2FyZFdpZGdldERpbWVuc2lvbnMgPSB7XG4gICAgICAgICAgICB4OiBhY3Rpb24ud2lkZ2V0LnggKyBtb3VzZVgsXG4gICAgICAgICAgICB5OiBhY3Rpb24ud2lkZ2V0LnkgKyBtb3VzZVksXG4gICAgICAgICAgICB3aWR0aDogYWN0aW9uLndpZGdldC53aWR0aCxcbiAgICAgICAgICAgIGhlaWdodDogYWN0aW9uLndpZGdldC5oZWlnaHRcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLnJlc3RvcmVXaWRnZXRzKHRydWUpO1xuXG4gICAgICAgIC8vIHVwZGF0ZSB3aWRnZXQgcG9zaXRpb25cbiAgICAgICAgYWN0aW9uLndpZGdldC5zZXRCb3VuZHMoZGltZW5zaW9ucy54LCBkaW1lbnNpb25zLnksIGRpbWVuc2lvbnMud2lkdGgsIGRpbWVuc2lvbnMuaGVpZ2h0KTtcblxuICAgICAgICAvLyB1cGRhdGUgcGxhY2Vob2xkZXIgcG9zaXRpb24gYW5kIHZhbHVlXG4gICAgICAgIHRoaXMuc2V0UGxhY2Vob2xkZXJCb3VuZHModHJ1ZSwgZGltZW5zaW9ucy54LCBkaW1lbnNpb25zLnksIGRpbWVuc2lvbnMud2lkdGgsIGRpbWVuc2lvbnMuaGVpZ2h0KTtcblxuICAgICAgICAvLyBzaG93IHRoZSB3aWRnZXQgcG9zaXRpb25zIGlmIHRoZSBjdXJyZW50IHBvc2l0aW9ucyBhbmQgc2l6ZXMgd2VyZSB0byBwZXJzaXN0XG4gICAgICAgIHRoaXMuc2hpZnRXaWRnZXRzKCk7XG5cbiAgICAgICAgdGhpcy5zZXREYXNoYm9hcmRIZWlnaHQoKTtcbiAgICB9XG5cbiAgICBnZXRSb3dIZWlnaHQoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Jvd0hlaWdodDtcbiAgICB9XG5cbiAgICBjYWNoZVdpZGdldHMoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX2NhY2hlID0gdGhpcy53aWRnZXRzLm1hcCh3aWRnZXQgPT4gKHsgaWQ6IHdpZGdldC5pZCwgY29sdW1uOiB3aWRnZXQuZ2V0Q29sdW1uKCksIHJvdzogd2lkZ2V0LmdldFJvdygpIH0pKTtcbiAgICB9XG5cbiAgICByZXN0b3JlV2lkZ2V0cyhpZ25vcmVBY3Rpb25XaWRnZXQ6IGJvb2xlYW4gPSBmYWxzZSk6IHZvaWQge1xuICAgICAgICB0aGlzLl9jYWNoZS5maWx0ZXIod2lkZ2V0ID0+ICFpZ25vcmVBY3Rpb25XaWRnZXQgfHwgd2lkZ2V0LmlkICE9PSB0aGlzLl9hY3Rpb25XaWRnZXQud2lkZ2V0LmlkKS5mb3JFYWNoKHdpZGdldCA9PiB7XG5cbiAgICAgICAgICAgIGNvbnN0IG1hdGNoID0gdGhpcy53aWRnZXRzLmZpbmQod2d0ID0+IHdndC5pZCA9PT0gd2lkZ2V0LmlkKTtcblxuICAgICAgICAgICAgaWYgKG1hdGNoKSB7XG4gICAgICAgICAgICAgICAgbWF0Y2guc2V0Q29sdW1uKHdpZGdldC5jb2x1bW4pO1xuICAgICAgICAgICAgICAgIG1hdGNoLnNldFJvdyh3aWRnZXQucm93KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogV2hlbiBkcmFnZ2luZyBhbnkgd2lkZ2V0cyB0aGF0IG5lZWQgdG8gYmUgbW92ZWQgc2hvdWxkIGJlIG1vdmVkIHRvIGFuIGFwcHJvcHJpYXRlIHBvc2l0aW9uXG4gICAgICovXG4gICAgc2hpZnRXaWRnZXRzKCk6IHZvaWQge1xuXG4gICAgICAgIGxldCB3aWRnZXRzVG9Nb3ZlOiBEYXNoYm9hcmRXaWRnZXRDb21wb25lbnRbXSA9IFtdO1xuXG4gICAgICAgIGNvbnN0IHBsYWNlaG9sZGVyID0gdGhpcy5wbGFjZWhvbGRlciQuZ2V0VmFsdWUoKTtcblxuICAgICAgICAvLyBjaGVjayBpZiB0aGVyZSBhcmUgYW55IHdpZGdldHMgdW5kZXIgdGhlIHBsYWNlaG9sZGVyXG4gICAgICAgIGZvciAobGV0IHJvdyA9IHBsYWNlaG9sZGVyLnJvdzsgcm93IDwgcGxhY2Vob2xkZXIucm93ICsgcGxhY2Vob2xkZXIucm93U3Bhbjsgcm93KyspIHtcbiAgICAgICAgICAgIGZvciAobGV0IGNvbHVtbiA9IHBsYWNlaG9sZGVyLmNvbHVtbjsgY29sdW1uIDwgcGxhY2Vob2xkZXIuY29sdW1uICsgcGxhY2Vob2xkZXIuY29sdW1uU3BhbjsgY29sdW1uKyspIHtcblxuICAgICAgICAgICAgICAgIC8vIHN0b3JlIHJlZmVyZW5jZSB0byBhbnkgd2lkZ2V0cyB0aGF0IG5lZWQgbW92ZWRcbiAgICAgICAgICAgICAgICB0aGlzLmdldE9jY3VwaWVkU3BhY2VzKClcbiAgICAgICAgICAgICAgICAgICAgLmZpbHRlcihzcGFjZSA9PiBzcGFjZS5jb2x1bW4gPT09IGNvbHVtbiAmJiBzcGFjZS5yb3cgPT09IHJvdyAmJiBzcGFjZS53aWRnZXQgIT09IHRoaXMuX2FjdGlvbldpZGdldC53aWRnZXQpXG4gICAgICAgICAgICAgICAgICAgIC5mb3JFYWNoKHNwYWNlID0+IHdpZGdldHNUb01vdmUucHVzaChzcGFjZS53aWRnZXQpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHJlbW92ZSBhbnkgZHVwbGljYXRlc1xuICAgICAgICB3aWRnZXRzVG9Nb3ZlID0gd2lkZ2V0c1RvTW92ZS5maWx0ZXIoKHdpZGdldCwgaWR4LCBhcnJheSkgPT4gYXJyYXkuaW5kZXhPZih3aWRnZXQpID09PSBpZHgpO1xuXG4gICAgICAgIC8vIGlmIG5vIHdpZGdldHMgbmVlZCBtb3ZlZCB0aGVuIHdlIGNhbiBzdG9wIGhlcmVcbiAgICAgICAgaWYgKHdpZGdldHNUb01vdmUubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyBjcmVhdGUgYSBkdXBsaWNhdGUgd2UgY2FuIHVzZSB0byBrZWVwIHRyYWNrIG9mIHdoaWNoIGhhdmUgYmVlbiBtb3ZlZFxuICAgICAgICBjb25zdCB1bm1vdmVkV2lkZ2V0cyA9IHdpZGdldHNUb01vdmUuc2xpY2UoKTtcblxuICAgICAgICAvLyBhdHRlbXB0IHRvIG1vdmUgYW55IHdpZGdldHMgdG8gdGhlIHByZXZpb3VzIHdpZGdldCBwb3NpdGlvblxuICAgICAgICB3aWRnZXRzVG9Nb3ZlLmZvckVhY2god2lkZ2V0ID0+IHtcblxuICAgICAgICAgICAgLy8gZ2V0IGEgZ3JpZCBvZmYgYWxsIG9jY3VwaWVkIHNwYWNlcyAtIHRha2luZyBpbnRvIGFjY291bnQgdGhlIHBsYWNlaG9sZGVyIGFuZCBpZ25vcmluZyB3aWRnZXRzIHRoYXQgbmVlZCBtb3ZlZFxuICAgICAgICAgICAgY29uc3QgZ3JpZCA9IHRoaXMuZ2V0T2NjdXBpZWRTcGFjZXMoKS5maWx0ZXIoc3BhY2UgPT4gIXVubW92ZWRXaWRnZXRzLmZpbmQod2d0ID0+IHdndCA9PT0gc3BhY2Uud2lkZ2V0KSk7XG5cbiAgICAgICAgICAgIC8vIGl0ZXJhdGUgZWFjaCBmcmVlIGJsb2NrXG4gICAgICAgICAgICBmb3IgKGxldCByb3cgPSB0aGlzLl93aWRnZXRPcmlnaW4ucm93OyByb3cgPCB0aGlzLl93aWRnZXRPcmlnaW4ucm93ICsgdGhpcy5fd2lkZ2V0T3JpZ2luLnJvd1NwYW47IHJvdysrKSB7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgY29sdW1uID0gdGhpcy5fd2lkZ2V0T3JpZ2luLmNvbHVtbjsgY29sdW1uIDwgdGhpcy5fd2lkZ2V0T3JpZ2luLmNvbHVtbiArIHRoaXMuX3dpZGdldE9yaWdpbi5jb2x1bW5TcGFuOyBjb2x1bW4rKykge1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIGRldGVybWluZSBpZiB0aGUgYmxvY2sgY2FuIGZpdCBpbiB0aGlzIHNwYWNlXG4gICAgICAgICAgICAgICAgICAgIGxldCByZXF1aXJlZFNwYWNlcyA9IHRoaXMuZ2V0UmVxdWlyZWRTcGFjZXNGcm9tUG9pbnQod2lkZ2V0LCBjb2x1bW4sIHJvdyk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gY2hlY2sgaWYgd2lkZ2V0IHdvdWxkIGZpdCBpbiBzcGFjZVxuICAgICAgICAgICAgICAgICAgICBsZXQgYXZhaWxhYmxlID0gcmVxdWlyZWRTcGFjZXMuZXZlcnkoc3BhY2UgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICFncmlkLmZpbmQoZ3JpZFNwYWNlID0+IGdyaWRTcGFjZS5jb2x1bW4gPT09IHNwYWNlLmNvbHVtbiAmJiBncmlkU3BhY2Uucm93ID09PSBzcGFjZS5yb3cpICYmIHNwYWNlLmNvbHVtbiA8IHRoaXMuZ2V0Q29sdW1uQ291bnQoKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGF2YWlsYWJsZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgd2lkZ2V0LnNldENvbHVtbihjb2x1bW4pO1xuICAgICAgICAgICAgICAgICAgICAgICAgd2lkZ2V0LnNldFJvdyhyb3cpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdW5tb3ZlZFdpZGdldHMuc3BsaWNlKHVubW92ZWRXaWRnZXRzLmZpbmRJbmRleCh3Z3QgPT4gd2d0ID09PSB3aWRnZXQpLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gaWYgd2UgZ2V0IHRvIGhlcmUgdGhlbiB3ZSBjYW4ndCBzaW1wbHkgc3dhcCB0aGUgcG9zaXRpb25zIC0gbmV4dCB0cnkgbW92aW5nIHJpZ2h0XG4gICAgICAgICAgICBpZiAodGhpcy5jYW5XaWRnZXRNb3ZlUmlnaHQod2lkZ2V0LCB0cnVlKSkge1xuXG4gICAgICAgICAgICAgICAgLy8gYWZ0ZXIgdGhlIHNoaWZ0IGNoZWNrIGlmIHBsYWNlaG9sZGVyIHBvc2l0aW9uIGlzIHN0aWxsIHZhbGlkXG4gICAgICAgICAgICAgICAgdGhpcy52YWxpZGF0ZVBsYWNlaG9sZGVyUG9zaXRpb24oQWN0aW9uRGlyZWN0aW9uLlJpZ2h0KTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIG5leHQgdHJ5IG1vdmluZyBsZWZ0XG4gICAgICAgICAgICBpZiAodGhpcy5jYW5XaWRnZXRNb3ZlTGVmdCh3aWRnZXQsIHRydWUpKSB7XG5cbiAgICAgICAgICAgICAgICAvLyBhZnRlciB0aGUgc2hpZnQgY2hlY2sgaWYgcGxhY2Vob2xkZXIgcG9zaXRpb24gaXMgc3RpbGwgdmFsaWRcbiAgICAgICAgICAgICAgICB0aGlzLnZhbGlkYXRlUGxhY2Vob2xkZXJQb3NpdGlvbihBY3Rpb25EaXJlY3Rpb24uTGVmdCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBkZXRlcm1pbmUgdGhlIGRpc3RhbmNlIHRoYXQgdGhlIHdpZGdldCBuZWVkcyB0byBiZSBtb3ZlZCBkb3duXG4gICAgICAgICAgICBsZXQgZGlzdGFuY2UgPSAodGhpcy5fYWN0aW9uV2lkZ2V0LndpZGdldC5nZXRSb3coKSAtIHdpZGdldC5nZXRSb3coKSkgKyB0aGlzLl9hY3Rpb25XaWRnZXQud2lkZ2V0LmdldFJvd1NwYW4oKTtcblxuICAgICAgICAgICAgLy8gYXMgYSBsYXN0IHJlc29ydCBtb3ZlIHRoZSB3aWRnZXQgZG93bndhcmRzXG4gICAgICAgICAgICB0aGlzLm1vdmVXaWRnZXREb3duKHdpZGdldCwgZGlzdGFuY2UpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBZnRlciBzaGlmdHMgaGF2ZSB0YWtlbiBwbGFjZSB3ZSBzaG91bGQgdmVyaWZ5IHRoZSBwbGFjZSBob2xkZXIgcG9zaXRpb24gaXMgc3RpbGwgdmFsaWRcbiAgICAgKiBAcGFyYW0gc2hpZnREaXJlY3Rpb24gLSB0aGUgcG9zaXRpb24gd2lkZ2V0cyB3ZXJlIHNoaWZ0ZWRcbiAgICAgKi9cbiAgICB2YWxpZGF0ZVBsYWNlaG9sZGVyUG9zaXRpb24oc2hpZnREaXJlY3Rpb246IEFjdGlvbkRpcmVjdGlvbikge1xuXG4gICAgICAgIGNvbnN0IHBsYWNlaG9sZGVyID0gdGhpcy5wbGFjZWhvbGRlciQuZ2V0VmFsdWUoKTtcblxuICAgICAgICAvLyBjaGVjayBpZiB0aGUgcGxhY2Vob2xkZXIgaXMgb3ZlciBhIHdpZGdldFxuICAgICAgICBpZiAodGhpcy5nZXRXaWRnZXRzQXRQb3NpdGlvbihwbGFjZWhvbGRlci5jb2x1bW4sIHBsYWNlaG9sZGVyLnJvdywgdHJ1ZSkubGVuZ3RoID4gMCkge1xuXG4gICAgICAgICAgICAvLyBtb3ZlIHRoZSBwbGFjZWhvbGRlciB0aGUgb3Bwb3NpdGUgZGlyZWN0aW9uXG4gICAgICAgICAgICBzd2l0Y2ggKHNoaWZ0RGlyZWN0aW9uKSB7XG5cbiAgICAgICAgICAgICAgICBjYXNlIEFjdGlvbkRpcmVjdGlvbi5MZWZ0OlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFBsYWNlaG9sZGVyQm91bmRzKHBsYWNlaG9sZGVyLnZpc2libGUsIHBsYWNlaG9sZGVyLnggKyB0aGlzLmdldENvbHVtbldpZHRoKCksIHBsYWNlaG9sZGVyLnksIHBsYWNlaG9sZGVyLndpZHRoLCBwbGFjZWhvbGRlci5oZWlnaHQpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgQWN0aW9uRGlyZWN0aW9uLlJpZ2h0OlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFBsYWNlaG9sZGVyQm91bmRzKHBsYWNlaG9sZGVyLnZpc2libGUsIHBsYWNlaG9sZGVyLnggLSB0aGlzLmdldENvbHVtbldpZHRoKCksIHBsYWNlaG9sZGVyLnksIHBsYWNlaG9sZGVyLndpZHRoLCBwbGFjZWhvbGRlci5oZWlnaHQpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gdmFsaWRhdGUgdGhpcyBuZXcgcG9zaXRpb24gYWdhaW5cbiAgICAgICAgICAgIHRoaXMudmFsaWRhdGVQbGFjZWhvbGRlclBvc2l0aW9uKHNoaWZ0RGlyZWN0aW9uKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERldGVybWluZSBpZiBhIHdpZGdldCBjYW4gYmUgbW92ZWQgbGVmdCAtIG9yIGlmIGl0IGNhbiBtb3ZlIHRoZSB3aWRnZXRzIHRvIHRoZSByaWdodCB0byBtYWtlIHNwYWNlIGZvciB0aGUgd2lkZ2V0XG4gICAgICovXG4gICAgY2FuV2lkZ2V0TW92ZUxlZnQod2lkZ2V0OiBEYXNoYm9hcmRXaWRnZXRDb21wb25lbnQsIHBlcmZvcm1Nb3ZlOiBib29sZWFuID0gZmFsc2UpOiBib29sZWFuIHtcblxuICAgICAgICAvLyBjaGVjayBpZiB0aGUgd2lkZ2V0IGlzIHRoZSBhY3Rpb24gd2lkZ2V0IG9yIG9jY3VwaWVzIHRoZSBmaXJzdCBjb2x1bW5cbiAgICAgICAgaWYgKHdpZGdldCA9PT0gdGhpcy5fYWN0aW9uV2lkZ2V0LndpZGdldCB8fCB3aWRnZXQuZ2V0Q29sdW1uKCkgPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGZpbmQgdGhlIHBvc2l0aW9ucyByZXF1aXJlZFxuICAgICAgICBjb25zdCB0YXJnZXRTcGFjZXMgPSB0aGlzLmdldE9jY3VwaWVkU3BhY2VzKCkuZmlsdGVyKHNwYWNlID0+IHNwYWNlLndpZGdldCA9PT0gd2lkZ2V0KS5tYXAoc3BhY2UgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHsgY29sdW1uOiBzcGFjZS5jb2x1bW4gLSB3aWRnZXQuZ2V0Q29sdW1uU3BhbigpLCByb3c6IHNwYWNlLnJvdywgd2lkZ2V0OiBzcGFjZS53aWRnZXQgfTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gY2hlY2sgaWYgdGhlcmUgYXJlIHdpZGdldCBpbiB0aGUgcmVxdWlyZWQgcG9zaXRpb25zIGFuZCBpZiBzbywgY2FuIHRoZXkgbW92ZSByaWdodD9cbiAgICAgICAgY29uc3QgbW92ZWFibGUgPSB0YXJnZXRTcGFjZXMuZXZlcnkoc3BhY2UgPT4gdGhpcy5nZXRXaWRnZXRzQXRQb3NpdGlvbihzcGFjZS5jb2x1bW4sIHNwYWNlLnJvdykuZmlsdGVyKHdndCA9PiB3Z3QgIT09IHNwYWNlLndpZGdldCkuZXZlcnkod2d0ID0+IHRoaXMuY2FuV2lkZ2V0TW92ZUxlZnQod2d0KSkpO1xuXG4gICAgICAgIGlmIChwZXJmb3JtTW92ZSAmJiBtb3ZlYWJsZSkge1xuXG4gICAgICAgICAgICAvLyBtb3ZlIGFsbCB3aWRnZXRzIHRvIHRoZSByaWdodFxuICAgICAgICAgICAgdGFyZ2V0U3BhY2VzLmZvckVhY2goc3BhY2UgPT4gdGhpcy5nZXRXaWRnZXRzQXRQb3NpdGlvbihzcGFjZS5jb2x1bW4sIHNwYWNlLnJvdykuZmlsdGVyKHdndCA9PiB3Z3QgIT09IHNwYWNlLndpZGdldCkuZm9yRWFjaCh3Z3QgPT4gdGhpcy5jYW5XaWRnZXRNb3ZlTGVmdCh3Z3QsIHRydWUpKSk7XG5cbiAgICAgICAgICAgIC8vIG1vdmUgY3VycmVudCB3aWRnZXQgdG8gdGhlIHJpZ2h0XG4gICAgICAgICAgICB3aWRnZXQuc2V0Q29sdW1uKHdpZGdldC5nZXRDb2x1bW4oKSAtIDEpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG1vdmVhYmxlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERldGVybWluZSBpZiBhIHdpZGdldCBjYW4gYmUgbW92ZWQgcmlnaHQgLSBvciBpZiBpdCBjYW4gbW92ZSB0aGUgd2lkZ2V0cyB0byB0aGUgcmlnaHQgdG8gbWFrZSBzcGFjZSBmb3IgdGhlIHdpZGdldFxuICAgICAqL1xuICAgIGNhbldpZGdldE1vdmVSaWdodCh3aWRnZXQ6IERhc2hib2FyZFdpZGdldENvbXBvbmVudCwgcGVyZm9ybU1vdmU6IGJvb2xlYW4gPSBmYWxzZSk6IGJvb2xlYW4ge1xuXG4gICAgICAgIC8vIGNoZWNrIGlmIHRoZSB3aWRnZXQgaXMgdGhlIGRyYWdnaW5nIHdpZGdldCBvciB0aGUgd2lkZ2V0IG9jY3VwaWVzIHRoZSBmaW5hbCBjb2x1bW5cbiAgICAgICAgaWYgKHdpZGdldCA9PT0gdGhpcy5fYWN0aW9uV2lkZ2V0LndpZGdldCB8fCB3aWRnZXQuZ2V0Q29sdW1uKCkgKyB3aWRnZXQuZ2V0Q29sdW1uU3BhbigpID09PSB0aGlzLm9wdGlvbnMuY29sdW1ucykge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gZmluZCB0aGUgcG9zaXRpb25zIHJlcXVpcmVkXG4gICAgICAgIGNvbnN0IHRhcmdldFNwYWNlcyA9IHRoaXMuZ2V0T2NjdXBpZWRTcGFjZXMoKS5maWx0ZXIoc3BhY2UgPT4gc3BhY2Uud2lkZ2V0ID09PSB3aWRnZXQpLm1hcChzcGFjZSA9PiB7XG4gICAgICAgICAgICByZXR1cm4geyBjb2x1bW46IHNwYWNlLmNvbHVtbiArIHdpZGdldC5nZXRDb2x1bW5TcGFuKCksIHJvdzogc3BhY2Uucm93LCB3aWRnZXQ6IHNwYWNlLndpZGdldCB9O1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyBjaGVjayBpZiB0aGVyZSBhcmUgd2lkZ2V0IGluIHRoZSByZXF1aXJlZCBwb3NpdGlvbnMgYW5kIGlmIHNvLCBjYW4gdGhleSBtb3ZlIHJpZ2h0P1xuICAgICAgICBjb25zdCBtb3ZlYWJsZSA9IHRhcmdldFNwYWNlcy5ldmVyeShzcGFjZSA9PiB0aGlzLmdldFdpZGdldHNBdFBvc2l0aW9uKHNwYWNlLmNvbHVtbiwgc3BhY2Uucm93KS5maWx0ZXIod2d0ID0+IHdndCAhPT0gc3BhY2Uud2lkZ2V0KS5ldmVyeSh3Z3QgPT4gdGhpcy5jYW5XaWRnZXRNb3ZlUmlnaHQod2d0KSkpO1xuXG4gICAgICAgIGlmIChwZXJmb3JtTW92ZSAmJiBtb3ZlYWJsZSkge1xuXG4gICAgICAgICAgICAvLyBtb3ZlIGFsbCB3aWRnZXRzIHRvIHRoZSByaWdodFxuICAgICAgICAgICAgdGFyZ2V0U3BhY2VzLmZvckVhY2goc3BhY2UgPT4gdGhpcy5nZXRXaWRnZXRzQXRQb3NpdGlvbihzcGFjZS5jb2x1bW4sIHNwYWNlLnJvdykuZmlsdGVyKHdndCA9PiB3Z3QgIT09IHNwYWNlLndpZGdldCkuZm9yRWFjaCh3Z3QgPT4gdGhpcy5jYW5XaWRnZXRNb3ZlUmlnaHQod2d0LCB0cnVlKSkpO1xuXG4gICAgICAgICAgICAvLyBtb3ZlIGN1cnJlbnQgd2lkZ2V0IHRvIHRoZSByaWdodFxuICAgICAgICAgICAgd2lkZ2V0LnNldENvbHVtbih3aWRnZXQuZ2V0Q29sdW1uKCkgKyAxKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBtb3ZlYWJsZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTdG9yZSB0aGUgaW5pdGlhbCBwb3NpdGlvbiBvZiB0aGUgd2lkZ2V0IGJlaW5nIGRyYWdnZWRcbiAgICAgKi9cbiAgICBzZXRXaWRnZXRPcmlnaW4oKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX3dpZGdldE9yaWdpbiA9IHtcbiAgICAgICAgICAgIGNvbHVtbjogdGhpcy5fYWN0aW9uV2lkZ2V0LndpZGdldC5nZXRDb2x1bW4oKSxcbiAgICAgICAgICAgIHJvdzogdGhpcy5fYWN0aW9uV2lkZ2V0LndpZGdldC5nZXRSb3coKSxcbiAgICAgICAgICAgIGNvbHVtblNwYW46IHRoaXMuX2FjdGlvbldpZGdldC53aWRnZXQuZ2V0Q29sdW1uU3BhbigpLFxuICAgICAgICAgICAgcm93U3BhbjogdGhpcy5fYWN0aW9uV2lkZ2V0LndpZGdldC5nZXRSb3dTcGFuKClcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDYWxjdWxhdGUgYWxsIHRoZSByZXF1aXJlZCBwb3NpdGlvbnMgaXMgYSB3aWRnZXQgd2FzIHRvIGJlIHBvc2l0aW9uZWQgYXQgYSBwYXJ0aWN1bGFyIHBvaW50XG4gICAgICovXG4gICAgZ2V0UmVxdWlyZWRTcGFjZXNGcm9tUG9pbnQod2lkZ2V0OiBEYXNoYm9hcmRXaWRnZXRDb21wb25lbnQsIGNvbHVtbjogbnVtYmVyLCByb3c6IG51bWJlcik6IERhc2hib2FyZFNwYWNlW10ge1xuICAgICAgICBjb25zdCBzcGFjZXM6IERhc2hib2FyZFNwYWNlW10gPSBbXTtcblxuICAgICAgICBmb3IgKGxldCB5ID0gcm93OyB5IDwgcm93ICsgd2lkZ2V0LmdldFJvd1NwYW4oKTsgeSsrKSB7XG4gICAgICAgICAgICBmb3IgKGxldCB4ID0gY29sdW1uOyB4IDwgY29sdW1uICsgd2lkZ2V0LmdldENvbHVtblNwYW4oKTsgeCsrKSB7XG4gICAgICAgICAgICAgICAgc3BhY2VzLnB1c2goeyBjb2x1bW46IHgsIHJvdzogeSwgd2lkZ2V0OiB3aWRnZXQgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gc3BhY2VzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFBvc2l0aW9uIHdpZGdldHMgYmFzZWQgb24gdGhlIHBvc2l0aW9uIG9mIHRoZSBwbGFjZWhvbGRlciAtIHRoaXMgaXMgdGVtcG9yYXJ5IHVudGlsIGNvbmZpcm1lZFxuICAgICAqL1xuICAgIHVwZGF0ZVdpZGdldFBvc2l0aW9ucyh3aWRnZXQ6IERhc2hib2FyZFdpZGdldENvbXBvbmVudCkge1xuXG4gICAgICAgIGNvbnN0IHBsYWNlaG9sZGVyID0gdGhpcy5wbGFjZWhvbGRlciQuZ2V0VmFsdWUoKTtcblxuICAgICAgICAvLyBjaGVjayBhbGwgc3BhY2VzIHRoZSBwbGFjZWhvbGRlciB3aWxsIG9jY3VweSBhbmQgbW92ZSBhbnkgd2lkZ2V0IGN1cnJlbnRseSBpbiB0aGVtIGRvd25cbiAgICAgICAgZm9yIChsZXQgY29sdW1uID0gcGxhY2Vob2xkZXIuY29sdW1uOyBjb2x1bW4gPCBwbGFjZWhvbGRlci5jb2x1bW4gKyBwbGFjZWhvbGRlci5jb2x1bW5TcGFuOyBjb2x1bW4rKykge1xuICAgICAgICAgICAgZm9yIChsZXQgcm93ID0gcGxhY2Vob2xkZXIucm93OyByb3cgPCBwbGFjZWhvbGRlci5yb3cgKyBwbGFjZWhvbGRlci5yb3dTcGFuOyByb3crKykge1xuXG4gICAgICAgICAgICAgICAgdGhpcy5nZXRXaWRnZXRzQXRQb3NpdGlvbihjb2x1bW4sIHJvdywgdHJ1ZSlcbiAgICAgICAgICAgICAgICAgICAgLmZpbHRlcih3Z3QgPT4gd2d0ICE9PSB3aWRnZXQpXG4gICAgICAgICAgICAgICAgICAgIC5mb3JFYWNoKHdndCA9PiB0aGlzLm1vdmVXaWRnZXREb3duKHdndCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gdXBkYXRlIHRoZSBoZWlnaHQgb2YgdGhlIGRhc2hib2FyZFxuICAgICAgICB0aGlzLnNldERhc2hib2FyZEhlaWdodCgpO1xuXG4gICAgICAgIC8vIGlmIHdlIGFyZW50IGRyYWdnaW5nIHRoZSB0b3AgaGFuZGxlIHRoZW4gZmlsbCBzcGFjZXNcbiAgICAgICAgaWYgKHRoaXMuX2FjdGlvbldpZGdldC5kaXJlY3Rpb24gIT09IEFjdGlvbkRpcmVjdGlvbi5Ub3AgJiZcbiAgICAgICAgICAgIHRoaXMuX2FjdGlvbldpZGdldC5kaXJlY3Rpb24gIT09IEFjdGlvbkRpcmVjdGlvbi5Ub3BMZWZ0ICYmXG4gICAgICAgICAgICB0aGlzLl9hY3Rpb25XaWRnZXQuZGlyZWN0aW9uICE9PSBBY3Rpb25EaXJlY3Rpb24uVG9wUmlnaHQpIHtcbiAgICAgICAgICAgIHRoaXMuc2hpZnRXaWRnZXRzVXAoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERldGVybWluZSBpZiBhIHdpZGdldCBpcyBvY2N1cHlpbmcgYSBzcGVjaWZpYyByb3cgYW5kIGNvbHVtblxuICAgICAqIEBwYXJhbSBjb2x1bW4gVGhlIGNvbHVtbnMgdG8gY2hlY2sgaWYgb2NjdXBpZWRcbiAgICAgKiBAcGFyYW0gcm93IFRoZSByb3cgdG8gY2hlY2sgaWYgb2NjdXBpZWRcbiAgICAgKiBAcGFyYW0gaWdub3JlUmVzaXppbmcgV2hldGhlciBvciBub3QgdG8gaWdub3JlIHRoZSB3aWRnZXQgY3VycmVudGx5IGJlaW5nIHJlc2l6ZWRcbiAgICAgKi9cbiAgICBnZXRXaWRnZXRzQXRQb3NpdGlvbihjb2x1bW46IG51bWJlciwgcm93OiBudW1iZXIsIGlnbm9yZVJlc2l6aW5nOiBib29sZWFuID0gZmFsc2UpOiBEYXNoYm9hcmRXaWRnZXRDb21wb25lbnRbXSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldE9jY3VwaWVkU3BhY2VzKClcbiAgICAgICAgICAgIC5maWx0ZXIoc3BhY2UgPT4gc3BhY2UuY29sdW1uID09PSBjb2x1bW4gJiYgc3BhY2Uucm93ID09PSByb3cpXG4gICAgICAgICAgICAuZmlsdGVyKHNwYWNlID0+IHNwYWNlLndpZGdldCAhPT0gdGhpcy5fYWN0aW9uV2lkZ2V0LndpZGdldCB8fCAhaWdub3JlUmVzaXppbmcpXG4gICAgICAgICAgICAubWFwKHNwYWNlID0+IHNwYWNlLndpZGdldCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVXBkYXRlIHRoZSBwbGFjZWhvbGRlciB2aXNpYmlsaXR5LCBwb3NpdGlvbiBhbmQgc2l6ZVxuICAgICAqL1xuICAgIHNldFBsYWNlaG9sZGVyQm91bmRzKHZpc2libGU6IGJvb2xlYW4sIHg6IG51bWJlciwgeTogbnVtYmVyLCB3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlcik6IHZvaWQge1xuXG4gICAgICAgIGNvbnN0IHBsYWNlaG9sZGVyID0gdGhpcy5wbGFjZWhvbGRlciQuZ2V0VmFsdWUoKTtcblxuICAgICAgICBjb25zdCByb3VuZGluZyA9IHRoaXMuX2FjdGlvbldpZGdldC5kaXJlY3Rpb24gPT09IEFjdGlvbkRpcmVjdGlvbi5MZWZ0IHx8XG4gICAgICAgICAgICB0aGlzLl9hY3Rpb25XaWRnZXQuZGlyZWN0aW9uID09PSBBY3Rpb25EaXJlY3Rpb24uVG9wID8gUm91bmRpbmcuUm91bmREb3duQmVsb3dIYWxmIDogUm91bmRpbmcuUm91bmRVcE92ZXJIYWxmO1xuXG4gICAgICAgIHBsYWNlaG9sZGVyLnZpc2libGUgPSB2aXNpYmxlO1xuXG4gICAgICAgIHBsYWNlaG9sZGVyLmNvbHVtbiA9IHRoaXMuZ2V0UGxhY2Vob2xkZXJDb2x1bW4oeCwgd2lkdGgpO1xuICAgICAgICBwbGFjZWhvbGRlci5yb3cgPSB0aGlzLmdldFBsYWNlaG9sZGVyUm93KHksIGhlaWdodCk7XG4gICAgICAgIHBsYWNlaG9sZGVyLmNvbHVtblNwYW4gPSB0aGlzLmdldFBsYWNlaG9sZGVyQ29sdW1uU3Bhbih3aWR0aCk7XG4gICAgICAgIHBsYWNlaG9sZGVyLnJvd1NwYW4gPSB0aGlzLmdldFBsYWNlaG9sZGVyUm93U3BhbihoZWlnaHQpO1xuXG4gICAgICAgIC8vIGNhbGN1bGF0ZSB0aGUgbWF4aW11bSBudW1iZXIgb2Ygcm93c1xuICAgICAgICBjb25zdCByb3dDb3VudCA9IHRoaXMud2lkZ2V0cy5maWx0ZXIod2lkZ2V0ID0+IHdpZGdldCAhPT0gdGhpcy5fYWN0aW9uV2lkZ2V0LndpZGdldClcbiAgICAgICAgICAgIC5yZWR1Y2UoKHByZXZpb3VzLCB3aWRnZXQpID0+IE1hdGgubWF4KHdpZGdldC5nZXRSb3coKSArIHdpZGdldC5nZXRSb3dTcGFuKCksIHByZXZpb3VzKSwgMCk7XG5cbiAgICAgICAgLy8gY29uc3RyYWluIG1heGltdW0gcGxhY2Vob2xkZXIgcm93XG4gICAgICAgIHBsYWNlaG9sZGVyLnJvdyA9IE1hdGgubWluKHBsYWNlaG9sZGVyLnJvdywgcm93Q291bnQpO1xuXG4gICAgICAgIHBsYWNlaG9sZGVyLnggPSAocGxhY2Vob2xkZXIuY29sdW1uICogdGhpcy5nZXRDb2x1bW5XaWR0aCgpKSArIHRoaXMub3B0aW9ucy5wYWRkaW5nO1xuICAgICAgICBwbGFjZWhvbGRlci55ID0gKHBsYWNlaG9sZGVyLnJvdyAqIHRoaXMuX3Jvd0hlaWdodCkgKyB0aGlzLm9wdGlvbnMucGFkZGluZztcbiAgICAgICAgcGxhY2Vob2xkZXIud2lkdGggPSAocGxhY2Vob2xkZXIuY29sdW1uU3BhbiAqIHRoaXMuZ2V0Q29sdW1uV2lkdGgoKSkgLSAodGhpcy5vcHRpb25zLnBhZGRpbmcgKiAyKTtcbiAgICAgICAgcGxhY2Vob2xkZXIuaGVpZ2h0ID0gKHBsYWNlaG9sZGVyLnJvd1NwYW4gKiB0aGlzLl9yb3dIZWlnaHQpIC0gKHRoaXMub3B0aW9ucy5wYWRkaW5nICogMik7XG5cbiAgICAgICAgLy8gc2V0IHRoZSB2YWx1ZXMgb2YgdGhlIHdpZGdldCB0byBtYXRjaCB0aGUgdmFsdWVzIG9mIHRoZSBwbGFjZWhvbGRlciAtIGhvd2V2ZXIgZG8gbm90IHJlbmRlciB0aGUgY2hhbmdlc1xuICAgICAgICB0aGlzLl9hY3Rpb25XaWRnZXQud2lkZ2V0LnNldENvbHVtbihwbGFjZWhvbGRlci5jb2x1bW4sIGZhbHNlKTtcbiAgICAgICAgdGhpcy5fYWN0aW9uV2lkZ2V0LndpZGdldC5zZXRSb3cocGxhY2Vob2xkZXIucm93LCBmYWxzZSk7XG4gICAgICAgIHRoaXMuX2FjdGlvbldpZGdldC53aWRnZXQuc2V0Q29sdW1uU3BhbihwbGFjZWhvbGRlci5jb2x1bW5TcGFuLCBmYWxzZSk7XG4gICAgICAgIHRoaXMuX2FjdGlvbldpZGdldC53aWRnZXQuc2V0Um93U3BhbihwbGFjZWhvbGRlci5yb3dTcGFuLCBmYWxzZSk7XG5cbiAgICAgICAgLy8gdXBkYXRlIHRoZSBwbGFjZWhvbGRlclxuICAgICAgICB0aGlzLnBsYWNlaG9sZGVyJC5uZXh0KHBsYWNlaG9sZGVyKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIHBsYWNlaG9sZGVyIGNvbHVtbiBwb3NpdGlvblxuICAgICAqL1xuICAgIGdldFBsYWNlaG9sZGVyQ29sdW1uKHg6IG51bWJlciwgd2lkdGg6IG51bWJlcik6IG51bWJlciB7XG5cbiAgICAgICAgY29uc3QgY29sdW1uID0gdGhpcy5nZXRDb2x1bW5Gcm9tUHgoeCwgdGhpcy5fYWN0aW9uV2lkZ2V0LmRpcmVjdGlvbiA9PT0gQWN0aW9uRGlyZWN0aW9uLk1vdmUgPyBSb3VuZGluZy5Sb3VuZFVwT3ZlckhhbGYgOiBSb3VuZGluZy5Sb3VuZERvd24pO1xuICAgICAgICBjb25zdCBjb2x1bW5TcGFuID0gTWF0aC5mbG9vcih3aWR0aCAvIHRoaXMuZ2V0Q29sdW1uV2lkdGgoKSk7XG4gICAgICAgIGNvbnN0IHVwcGVyTGltaXQgPSB0aGlzLmdldENvbHVtbkNvdW50KCkgLSBjb2x1bW5TcGFuO1xuXG4gICAgICAgIC8vIGlmIHdlIGFyZW50IGRyYWdnaW5nIGxlZnQgdGhlbiBqdXN0IHJldHVybiB0aGUgY29sdW1uXG4gICAgICAgIGlmICh0aGlzLl9hY3Rpb25XaWRnZXQuZGlyZWN0aW9uICE9PSBBY3Rpb25EaXJlY3Rpb24uTGVmdCAmJlxuICAgICAgICAgICAgdGhpcy5fYWN0aW9uV2lkZ2V0LmRpcmVjdGlvbiAhPT0gQWN0aW9uRGlyZWN0aW9uLlRvcExlZnQgJiZcbiAgICAgICAgICAgIHRoaXMuX2FjdGlvbldpZGdldC5kaXJlY3Rpb24gIT09IEFjdGlvbkRpcmVjdGlvbi5Cb3R0b21MZWZ0KSB7XG4gICAgICAgICAgICByZXR1cm4gTWF0aC5tYXgoTWF0aC5taW4oY29sdW1uLCB1cHBlckxpbWl0KSwgMCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBnZXQgYW55IG92ZXJmbG93XG4gICAgICAgIGNvbnN0IG92ZXJmbG93ID0gd2lkdGggJSB0aGlzLmdldENvbHVtbldpZHRoKCk7XG5cbiAgICAgICAgcmV0dXJuICh4IDw9IDAgfHwgb3ZlcmZsb3cgPT09IDAgfHwgY29sdW1uU3BhbiA9PT0gMCB8fCBvdmVyZmxvdyA+ICh0aGlzLmdldENvbHVtbldpZHRoKCkgLyAyKSkgP1xuICAgICAgICAgICAgTWF0aC5tYXgoTWF0aC5taW4oY29sdW1uLCB1cHBlckxpbWl0KSwgMCkgOlxuICAgICAgICAgICAgTWF0aC5tYXgoTWF0aC5taW4oY29sdW1uICsgMSwgdXBwZXJMaW1pdCksIDApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgY29sdW1uIHNwYW4gb2YgdGhlIHBsYWNlaG9sZGVyXG4gICAgICovXG4gICAgZ2V0UGxhY2Vob2xkZXJDb2x1bW5TcGFuKHdpZHRoOiBudW1iZXIpOiBudW1iZXIge1xuXG4gICAgICAgIGNvbnN0IGNvbHVtblNwYW4gPSB0aGlzLmdldENvbHVtbkZyb21QeCh3aWR0aCk7XG5cbiAgICAgICAgLy8gaWYgd2UgYXJlbnQgZHJhZ2dpbmcgcmlnaHQgb3IgbGVmdCB0aGVuIGp1c3QgcmV0dXJuIHRoZSBjb2x1bW4gc3BhblxuICAgICAgICBpZiAodGhpcy5fYWN0aW9uV2lkZ2V0LmRpcmVjdGlvbiAhPT0gQWN0aW9uRGlyZWN0aW9uLlJpZ2h0ICYmXG4gICAgICAgICAgICB0aGlzLl9hY3Rpb25XaWRnZXQuZGlyZWN0aW9uICE9PSBBY3Rpb25EaXJlY3Rpb24uVG9wUmlnaHQgJiZcbiAgICAgICAgICAgIHRoaXMuX2FjdGlvbldpZGdldC5kaXJlY3Rpb24gIT09IEFjdGlvbkRpcmVjdGlvbi5Cb3R0b21SaWdodCAmJlxuICAgICAgICAgICAgdGhpcy5fYWN0aW9uV2lkZ2V0LmRpcmVjdGlvbiAhPT0gQWN0aW9uRGlyZWN0aW9uLkxlZnQgJiZcbiAgICAgICAgICAgIHRoaXMuX2FjdGlvbldpZGdldC5kaXJlY3Rpb24gIT09IEFjdGlvbkRpcmVjdGlvbi5Ub3BMZWZ0ICYmXG4gICAgICAgICAgICB0aGlzLl9hY3Rpb25XaWRnZXQuZGlyZWN0aW9uICE9PSBBY3Rpb25EaXJlY3Rpb24uQm90dG9tTGVmdCkge1xuICAgICAgICAgICAgcmV0dXJuIE1hdGgubWF4KGNvbHVtblNwYW4sIDEpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gZ2V0IHRoZSBjdXJyZW50IGNvbHVtbiBzcGFuIGFuZCBhbnkgb3ZlcmZsb3dcbiAgICAgICAgY29uc3Qgb3ZlcmZsb3cgPSB3aWR0aCAlIHRoaXMuZ2V0Q29sdW1uV2lkdGgoKTtcblxuICAgICAgICByZXR1cm4gKGNvbHVtblNwYW4gPiAwICYmIG92ZXJmbG93ID4gKHRoaXMuZ2V0Q29sdW1uV2lkdGgoKSAvIDIpKSA/IE1hdGgubWF4KGNvbHVtblNwYW4gKyAxLCAxKSA6IE1hdGgubWF4KGNvbHVtblNwYW4sIDEpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgcm93IHBvc2l0aW9uIG9mIHRoZSBwbGFjZWhvbGRlclxuICAgICAqL1xuICAgIGdldFBsYWNlaG9sZGVyUm93KHk6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIpOiBudW1iZXIge1xuXG4gICAgICAgIGNvbnN0IHJvdyA9IHRoaXMuZ2V0Um93RnJvbVB4KHksIHRoaXMuX2FjdGlvbldpZGdldC5kaXJlY3Rpb24gPT09IEFjdGlvbkRpcmVjdGlvbi5Nb3ZlID8gUm91bmRpbmcuUm91bmRVcE92ZXJIYWxmIDogUm91bmRpbmcuUm91bmREb3duKTtcbiAgICAgICAgY29uc3Qgcm93U3BhbiA9IE1hdGguY2VpbChoZWlnaHQgLyB0aGlzLl9yb3dIZWlnaHQpO1xuXG4gICAgICAgIC8vIGlmIHdlIGFyZW50IGRyYWdnaW5nIHVwIHRoZW4ganVzdCByZXR1cm4gdGhlIHJvd1xuICAgICAgICBpZiAodGhpcy5fYWN0aW9uV2lkZ2V0LmRpcmVjdGlvbiAhPT0gQWN0aW9uRGlyZWN0aW9uLlRvcCAmJlxuICAgICAgICAgICAgdGhpcy5fYWN0aW9uV2lkZ2V0LmRpcmVjdGlvbiAhPT0gQWN0aW9uRGlyZWN0aW9uLlRvcExlZnQgJiZcbiAgICAgICAgICAgIHRoaXMuX2FjdGlvbldpZGdldC5kaXJlY3Rpb24gIT09IEFjdGlvbkRpcmVjdGlvbi5Ub3BSaWdodCkge1xuICAgICAgICAgICAgcmV0dXJuIE1hdGgubWF4KHJvdywgMCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBnZXQgYW55IG92ZXJmbG93XG4gICAgICAgIGxldCBvdmVyZmxvdyA9IGhlaWdodCA8IHRoaXMuX3Jvd0hlaWdodCA/IDAgOiBoZWlnaHQgJSB0aGlzLl9yb3dIZWlnaHQ7XG5cbiAgICAgICAgcmV0dXJuICh5IDw9IDAgfHwgcm93U3BhbiA9PT0gMCB8fCBvdmVyZmxvdyA9PT0gMCB8fCBvdmVyZmxvdyA+ICh0aGlzLl9yb3dIZWlnaHQgLyAyKSkgPyBNYXRoLm1heChyb3csIDApIDogTWF0aC5tYXgocm93ICsgMSwgMCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IHRoZSByb3cgc3BhbiBvZiB0aGUgcGxhY2Vob2xkZXJcbiAgICAgKi9cbiAgICBnZXRQbGFjZWhvbGRlclJvd1NwYW4oaGVpZ2h0OiBudW1iZXIpOiBudW1iZXIge1xuXG4gICAgICAgIGNvbnN0IHJvd1NwYW4gPSB0aGlzLmdldFJvd0Zyb21QeChoZWlnaHQpO1xuXG4gICAgICAgIC8vIGlmIHdlIGFyZW50IGRyYWdnaW5nIHVwIG9yIGRvd24gdGhlbiBqdXN0IHJldHVybiB0aGUgY29sdW1uIHNwYW5cbiAgICAgICAgaWYgKHRoaXMuX2FjdGlvbldpZGdldC5kaXJlY3Rpb24gIT09IEFjdGlvbkRpcmVjdGlvbi5Ub3AgJiZcbiAgICAgICAgICAgIHRoaXMuX2FjdGlvbldpZGdldC5kaXJlY3Rpb24gIT09IEFjdGlvbkRpcmVjdGlvbi5Ub3BMZWZ0ICYmXG4gICAgICAgICAgICB0aGlzLl9hY3Rpb25XaWRnZXQuZGlyZWN0aW9uICE9PSBBY3Rpb25EaXJlY3Rpb24uVG9wUmlnaHQgJiZcbiAgICAgICAgICAgIHRoaXMuX2FjdGlvbldpZGdldC5kaXJlY3Rpb24gIT09IEFjdGlvbkRpcmVjdGlvbi5Cb3R0b20gJiZcbiAgICAgICAgICAgIHRoaXMuX2FjdGlvbldpZGdldC5kaXJlY3Rpb24gIT09IEFjdGlvbkRpcmVjdGlvbi5Cb3R0b21MZWZ0ICYmXG4gICAgICAgICAgICB0aGlzLl9hY3Rpb25XaWRnZXQuZGlyZWN0aW9uICE9PSBBY3Rpb25EaXJlY3Rpb24uQm90dG9tUmlnaHQpIHtcbiAgICAgICAgICAgIHJldHVybiBNYXRoLm1heChyb3dTcGFuLCAxKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGdldCB0aGUgY3VycmVudCBjb2x1bW4gc3BhbiBhbmQgYW55IG92ZXJmbG93XG4gICAgICAgIGNvbnN0IG92ZXJmbG93ID0gaGVpZ2h0ICUgdGhpcy5fcm93SGVpZ2h0O1xuXG4gICAgICAgIHJldHVybiAob3ZlcmZsb3cgPiAodGhpcy5fcm93SGVpZ2h0IC8gMikpID8gTWF0aC5tYXgocm93U3BhbiArIDEsIDEpIDogTWF0aC5tYXgocm93U3BhbiwgMSk7XG4gICAgfVxuXG4gICAgZ2V0Q29sdW1uRnJvbVB4KHg6IG51bWJlciwgcm91bmRpbmc6IFJvdW5kaW5nID0gUm91bmRpbmcuUm91bmREb3duKTogbnVtYmVyIHtcblxuICAgICAgICBjb25zdCBjb2x1bW4gPSBNYXRoLmZsb29yKHggLyBNYXRoLmZsb29yKHRoaXMuZ2V0Q29sdW1uV2lkdGgoKSkpO1xuICAgICAgICBjb25zdCBvdmVyZmxvdyA9ICh4ICUgTWF0aC5mbG9vcih0aGlzLmdldENvbHVtbldpZHRoKCkpKTtcbiAgICAgICAgY29uc3QgaGFsZiA9IHRoaXMuZ2V0Q29sdW1uV2lkdGgoKSAvIDI7XG5cbiAgICAgICAgc3dpdGNoIChyb3VuZGluZykge1xuXG4gICAgICAgICAgICBjYXNlIFJvdW5kaW5nLlJvdW5kRG93bjpcbiAgICAgICAgICAgICAgICByZXR1cm4gY29sdW1uO1xuXG4gICAgICAgICAgICBjYXNlIFJvdW5kaW5nLlJvdW5kRG93bkJlbG93SGFsZjpcbiAgICAgICAgICAgICAgICByZXR1cm4gb3ZlcmZsb3cgPCBoYWxmID8gY29sdW1uIDogY29sdW1uICsgMTtcblxuICAgICAgICAgICAgY2FzZSBSb3VuZGluZy5Sb3VuZFVwT3ZlckhhbGY6XG4gICAgICAgICAgICAgICAgcmV0dXJuIG92ZXJmbG93ID4gaGFsZiA/IGNvbHVtbiArIDEgOiBjb2x1bW47XG5cbiAgICAgICAgICAgIGNhc2UgUm91bmRpbmcuUm91bmRVcDpcbiAgICAgICAgICAgICAgICByZXR1cm4gb3ZlcmZsb3cgPiAwID8gY29sdW1uICsgMSA6IGNvbHVtbjtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgZ2V0Um93RnJvbVB4KHk6IG51bWJlciwgcm91bmRpbmc6IFJvdW5kaW5nID0gUm91bmRpbmcuUm91bmREb3duKTogbnVtYmVyIHtcblxuICAgICAgICBjb25zdCByb3cgPSBNYXRoLmZsb29yKHkgLyBNYXRoLmZsb29yKHRoaXMuX3Jvd0hlaWdodCkpO1xuICAgICAgICBjb25zdCBvdmVyZmxvdyA9ICh5ICUgTWF0aC5mbG9vcih0aGlzLl9yb3dIZWlnaHQpKTtcbiAgICAgICAgY29uc3QgaGFsZiA9IHRoaXMuX3Jvd0hlaWdodCAvIDI7XG5cbiAgICAgICAgc3dpdGNoIChyb3VuZGluZykge1xuXG4gICAgICAgICAgICBjYXNlIFJvdW5kaW5nLlJvdW5kRG93bjpcbiAgICAgICAgICAgICAgICByZXR1cm4gcm93O1xuXG4gICAgICAgICAgICBjYXNlIFJvdW5kaW5nLlJvdW5kRG93bkJlbG93SGFsZjpcbiAgICAgICAgICAgICAgICByZXR1cm4gb3ZlcmZsb3cgPCBoYWxmID8gcm93IDogcm93ICsgMTtcblxuICAgICAgICAgICAgY2FzZSBSb3VuZGluZy5Sb3VuZFVwT3ZlckhhbGY6XG4gICAgICAgICAgICAgICAgcmV0dXJuIG92ZXJmbG93ID4gaGFsZiA/IHJvdyArIDEgOiByb3c7XG5cbiAgICAgICAgICAgIGNhc2UgUm91bmRpbmcuUm91bmRVcDpcbiAgICAgICAgICAgICAgICByZXR1cm4gb3ZlcmZsb3cgPiAwID8gcm93ICsgMSA6IHJvdztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbW1pdFdpZGdldENoYW5nZXMoKTogdm9pZCB7XG5cbiAgICAgICAgY29uc3QgcGxhY2Vob2xkZXIgPSB0aGlzLnBsYWNlaG9sZGVyJC5nZXRWYWx1ZSgpO1xuXG4gICAgICAgIC8vIGNoZWNrIHRoYXQgd2UgaGF2ZSBhbGwgdGhlIHZhbHVlcyB3ZSBuZWVkXG4gICAgICAgIGlmIChwbGFjZWhvbGRlci5jb2x1bW4gPT09IHVuZGVmaW5lZCB8fCBwbGFjZWhvbGRlci5yb3cgPT09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgICAgcGxhY2Vob2xkZXIuY29sdW1uU3BhbiA9PT0gdW5kZWZpbmVkIHx8IHBsYWNlaG9sZGVyLnJvd1NwYW4gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuX2FjdGlvbldpZGdldCkge1xuICAgICAgICAgICAgdGhpcy5fYWN0aW9uV2lkZ2V0LndpZGdldC5zZXRDb2x1bW4ocGxhY2Vob2xkZXIuY29sdW1uKTtcbiAgICAgICAgICAgIHRoaXMuX2FjdGlvbldpZGdldC53aWRnZXQuc2V0Um93KHBsYWNlaG9sZGVyLnJvdyk7XG4gICAgICAgICAgICB0aGlzLl9hY3Rpb25XaWRnZXQud2lkZ2V0LnNldENvbHVtblNwYW4ocGxhY2Vob2xkZXIuY29sdW1uU3Bhbik7XG4gICAgICAgICAgICB0aGlzLl9hY3Rpb25XaWRnZXQud2lkZ2V0LnNldFJvd1NwYW4ocGxhY2Vob2xkZXIucm93U3Bhbik7XG4gICAgICAgIH1cblxuICAgICAgICAvLyByZXNldCBhbGwgcGxhY2Vob2xkZXIgdmFsdWVzXG4gICAgICAgIHBsYWNlaG9sZGVyLmNvbHVtbiA9IHVuZGVmaW5lZDtcbiAgICAgICAgcGxhY2Vob2xkZXIucm93ID0gdW5kZWZpbmVkO1xuICAgICAgICBwbGFjZWhvbGRlci5jb2x1bW5TcGFuID0gdW5kZWZpbmVkO1xuICAgICAgICBwbGFjZWhvbGRlci5yb3dTcGFuID0gdW5kZWZpbmVkO1xuXG4gICAgICAgIC8vIGVtaXQgdGhlIG5ldyBwbGFjZWhvbGRlciB2YWx1ZXNcbiAgICAgICAgdGhpcy5wbGFjZWhvbGRlciQubmV4dChwbGFjZWhvbGRlcik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IHRoZSBjdXJyZW50IGNvbHVtbiB3aWR0aFxuICAgICAqL1xuICAgIGdldENvbHVtbldpZHRoKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiBNYXRoLmZsb29yKHRoaXMuY29sdW1uV2lkdGgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENhbGN1bGF0ZSB0aGUgbnVtYmVyIG9mIHJvd3MgcG9wdWxhdGVkIHdpdGggd2lkZ2V0c1xuICAgICAqL1xuICAgIGdldFJvd0NvdW50KCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLndpZGdldHMucmVkdWNlKChwcmV2aW91cywgd2lkZ2V0KSA9PiBNYXRoLm1heCh3aWRnZXQuZ2V0Um93KCkgKyB3aWRnZXQuZ2V0Um93U3BhbigpLCBwcmV2aW91cyksIDApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldCB0aGUgaGVpZ2h0IG9mIHRoZSBkYXNoYm9hcmQgY29udGFpbmVyIGVsZW1lbnRcbiAgICAgKi9cbiAgICBzZXREYXNoYm9hcmRIZWlnaHQoKTogdm9pZCB7XG5cbiAgICAgICAgLy8gc2l6ZSB0aGUgZGFzaGJvYXJkIGNvbnRhaW5lciB0byBlbnN1cmUgYWxsIHJvd3MgZml0XG4gICAgICAgIGxldCByb3dDb3VudCA9IHRoaXMuZ2V0Um93Q291bnQoKTtcblxuICAgICAgICAvLyBpZiB3ZSBzaG91bGQgc2hvdyBhbiBlbXB0eSByb3cgaW5jcmVtZW50IHRoZSByb3cgY291bnQgYnkgMVxuICAgICAgICBpZiAodGhpcy5vcHRpb25zLmVtcHR5Um93KSB7XG4gICAgICAgICAgICByb3dDb3VudCsrO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zZXREaW1lbnNpb25zKHVuZGVmaW5lZCwgcm93Q291bnQgKiB0aGlzLl9yb3dIZWlnaHQpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE9yZGVycyB0aGUgei1pbmRleCBvZiBhbGwgd2lkZ2V0cyB0byBtb3ZlIHRoZSBhY3RpdmUgb25lIHRvIHRoZSBmcm9udFxuICAgICAqIEBwYXJhbSB3aWRnZXQgVGhlIHdpZGdldCB0aGF0IHNob3VsZCBiZSBicm91Z2h0IHRvIHRoZSBmcm9udFxuICAgICAqL1xuICAgIGJyaW5nVG9Gcm9udCh3aWRnZXQ6IERhc2hib2FyZFdpZGdldENvbXBvbmVudCk6IHZvaWQge1xuICAgICAgICB0aGlzLndpZGdldHMuZm9yRWFjaChfd2lkZ2V0ID0+IF93aWRnZXQgPT09IHdpZGdldCA/IF93aWRnZXQuYnJpbmdUb0Zyb250KCkgOiBfd2lkZ2V0LnNlbmRUb0JhY2soKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTW92ZSBhIHdpZGdldCBkb3duIC0gaWYgd2lkZ2V0cyBhcmUgaW4gdGhlIHBvc2l0aW9uIGJlbG93LCB0aGVuIG1vdmUgdGhlbSBkb3duIGZ1cnRoZXJcbiAgICAgKiBAcGFyYW0gd2lkZ2V0IFRoZSB3aWRnZXQgdG8gbW92ZSBkb3dud2FyZHNcbiAgICAgKi9cbiAgICBtb3ZlV2lkZ2V0RG93bih3aWRnZXQ6IERhc2hib2FyZFdpZGdldENvbXBvbmVudCwgZGlzdGFuY2U6IG51bWJlciA9IDEpOiB2b2lkIHtcblxuICAgICAgICAvLyBtb3ZlIHRoZSB3aWRnZXQgZG93biBvbmUgcG9zaXRpb25cbiAgICAgICAgd2lkZ2V0LnNldFJvdyh3aWRnZXQuZ2V0Um93KCkgKyBkaXN0YW5jZSk7XG5cbiAgICAgICAgLy8gY2hlY2sgZXZlcnkgc3BhY2UgdGhlIHdpZGdldCBvY2N1cGllcyBmb3IgY29sbGlzaW9uc1xuICAgICAgICB0aGlzLmZvckVhY2hCbG9jayh3aWRnZXQsIChjb2x1bW4sIHJvdykgPT5cbiAgICAgICAgICAgIHRoaXMuZ2V0V2lkZ2V0c0F0UG9zaXRpb24oY29sdW1uLCByb3csIHRydWUpXG4gICAgICAgICAgICAgICAgLmZpbHRlcih3Z3QgPT4gd2d0ICE9PSB3aWRnZXQpXG4gICAgICAgICAgICAgICAgLmZvckVhY2god2d0ID0+IHRoaXMubW92ZVdpZGdldERvd24od2d0LCBkaXN0YW5jZSkpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBXaWRnZXRzIHNob3VsZCBub3QgYmUgYWxsb3dlZCB0byBoYXZlIGEgdmFjYW50IHNwYWNlIGFib3ZlIHRoZW0gLSBpZiB0aGVyZSBpcyBvbmUgdGhleSBzaG91bGQgbW92ZSB1cHdhcmRzIHRvIGZpbGwgaXRcbiAgICAgKi9cbiAgICBzaGlmdFdpZGdldHNVcCgpOiB2b2lkIHtcblxuICAgICAgICAvLyBjaGVjayB3aGV0aGVyIG9yIG5vdCBjaGFuZ2VzIGhhdmUgYmVlbiBtYWRlIC0gaWYgc28gd2UgbmVlZCB0byByZXBlYXQgdW50aWwgc3RhYmxlXG4gICAgICAgIGxldCBzdGFibGUgPSB0cnVlO1xuXG4gICAgICAgIC8vIGl0ZXJhdGUgZWFjaCB3aWRnZXQgYW5kXG4gICAgICAgIHRoaXMud2lkZ2V0cy5mb3JFYWNoKHdpZGdldCA9PiB7XG5cbiAgICAgICAgICAgIC8vIGlmIHdpZGdldCBpcyBhbHJlYWR5IG9uIHRoZSB0b3Agcm93IHRoZW4gZG8gbm90aGluZ1xuICAgICAgICAgICAgaWYgKHdpZGdldC5nZXRSb3coKSA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gaWYgd2UgYXJlIGN1cnJlbnRseSBkcmFnZ2luZyBhbmQgdGhpcyBpcyB0aGUgZHJhZ2dpbmcgd2lkZ2V0IHRoZW4gc2tpcFxuICAgICAgICAgICAgaWYgKHRoaXMuX2FjdGlvbldpZGdldCAmJiB0aGlzLl9hY3Rpb25XaWRnZXQud2lkZ2V0ID09PSB3aWRnZXQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmdldFBvc2l0aW9uQXZhaWxhYmxlKHdpZGdldC5nZXRDb2x1bW4oKSwgd2lkZ2V0LmdldFJvdygpIC0gMSwgd2lkZ2V0LmdldENvbHVtblNwYW4oKSwgMSkpIHtcbiAgICAgICAgICAgICAgICB3aWRnZXQuc2V0Um93KHdpZGdldC5nZXRSb3coKSAtIDEpO1xuICAgICAgICAgICAgICAgIHN0YWJsZSA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAvLyBpZiBjaGFuZ2VzIG9jY3VycmVkIHRoZW4gd2Ugc2hvdWxkIHJlcGVhdCB0aGUgcHJvY2Vzc1xuICAgICAgICBpZiAoIXN0YWJsZSkge1xuICAgICAgICAgICAgdGhpcy5zaGlmdFdpZGdldHNVcCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSXRlcmF0ZSBvdmVyIGVhY2ggc3BhY2UgYSB3aWRnZXQgb2NjdXBpZWRcbiAgICAgKiBAcGFyYW0gd2lkZ2V0IFRoZSB3aWRnZXQgdG8gZGV0ZXJtaW5lIHNwYWNlc1xuICAgICAqIEBwYXJhbSBjYWxsYmFjayBUaGUgZnVuY3Rpb24gdG8gYmUgY2FsbGVkIGZvciBlYWNoIHNwYWNlLCBzaG91bGQgZXhwZWN0IGEgY29sdW1uIGFuZCByb3cgYXJndW1lbnQgd2l0aHQgaGUgY29udGV4dCBiZWluZyB0aGUgd2lkZ2V0XG4gICAgICovXG4gICAgZm9yRWFjaEJsb2NrKHdpZGdldDogRGFzaGJvYXJkV2lkZ2V0Q29tcG9uZW50LCBjYWxsYmFjazogKGNvbHVtbjogbnVtYmVyLCByb3c6IG51bWJlcikgPT4gdm9pZCk6IHZvaWQge1xuICAgICAgICBmb3IgKGxldCByb3cgPSB3aWRnZXQuZ2V0Um93KCk7IHJvdyA8IHdpZGdldC5nZXRSb3coKSArIHdpZGdldC5nZXRSb3dTcGFuKCk7IHJvdysrKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBjb2x1bW4gPSB3aWRnZXQuZ2V0Q29sdW1uKCk7IGNvbHVtbiA8IHdpZGdldC5nZXRDb2x1bW4oKSArIHdpZGdldC5nZXRDb2x1bW5TcGFuKCk7IGNvbHVtbisrKSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2suY2FsbCh3aWRnZXQsIGNvbHVtbiwgcm93KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIG51bWJlciBvZiBjb2x1bW5zIGF2YWlsYWJsZVxuICAgICAqL1xuICAgIGdldENvbHVtbkNvdW50KCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLnN0YWNrZWQgPyAxIDogdGhpcy5vcHRpb25zLmNvbHVtbnM7XG4gICAgfVxufVxuXG5leHBvcnQgY29uc3QgZGVmYXVsdE9wdGlvbnM6IERhc2hib2FyZE9wdGlvbnMgPSB7IGNvbHVtbnM6IDUsIHBhZGRpbmc6IDUsIG1pbldpZHRoOiAxMDAsIG1pbkhlaWdodDogMTAwLCBlbXB0eVJvdzogdHJ1ZSB9O1xuXG5leHBvcnQgaW50ZXJmYWNlIERhc2hib2FyZERpbWVuc2lvbnMge1xuICAgIHdpZHRoPzogbnVtYmVyO1xuICAgIGhlaWdodD86IG51bWJlcjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBEYXNoYm9hcmRXaWRnZXREaW1lbnNpb25zIHtcbiAgICB4OiBudW1iZXI7XG4gICAgeTogbnVtYmVyO1xuICAgIHdpZHRoOiBudW1iZXI7XG4gICAgaGVpZ2h0OiBudW1iZXI7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRGFzaGJvYXJkQWN0aW9uIHtcbiAgICB3aWRnZXQ6IERhc2hib2FyZFdpZGdldENvbXBvbmVudDtcbiAgICBkaXJlY3Rpb246IEFjdGlvbkRpcmVjdGlvbjtcbiAgICBldmVudDogTW91c2VFdmVudDtcbiAgICBoYW5kbGU/OiBIVE1MRWxlbWVudDtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBEYXNoYm9hcmRTcGFjZSB7XG4gICAgd2lkZ2V0OiBEYXNoYm9hcmRXaWRnZXRDb21wb25lbnQ7XG4gICAgY29sdW1uOiBudW1iZXI7XG4gICAgcm93OiBudW1iZXI7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRGFzaGJvYXJkUGxhY2Vob2xkZXIge1xuICAgIHZpc2libGU6IGJvb2xlYW47XG4gICAgeDogbnVtYmVyO1xuICAgIHk6IG51bWJlcjtcbiAgICB3aWR0aDogbnVtYmVyO1xuICAgIGhlaWdodDogbnVtYmVyO1xuICAgIGNvbHVtbj86IG51bWJlcjtcbiAgICByb3c/OiBudW1iZXI7XG4gICAgY29sdW1uU3Bhbj86IG51bWJlcjtcbiAgICByb3dTcGFuPzogbnVtYmVyO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIERhc2hib2FyZENhY2hlIHtcbiAgICBpZDogc3RyaW5nO1xuICAgIGNvbHVtbjogbnVtYmVyO1xuICAgIHJvdzogbnVtYmVyO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIERhc2hib2FyZExheW91dERhdGEge1xuICAgIGlkOiBzdHJpbmc7XG4gICAgY29sOiBudW1iZXI7XG4gICAgcm93OiBudW1iZXI7XG4gICAgY29sU3BhbjogbnVtYmVyO1xuICAgIHJvd1NwYW46IG51bWJlcjtcbn1cblxuZXhwb3J0IGVudW0gQWN0aW9uRGlyZWN0aW9uIHtcbiAgICBUb3AgPSAwLFxuICAgIFRvcFJpZ2h0ID0gMSxcbiAgICBSaWdodCA9IDIsXG4gICAgQm90dG9tUmlnaHQgPSAzLFxuICAgIEJvdHRvbSA9IDQsXG4gICAgQm90dG9tTGVmdCA9IDUsXG4gICAgTGVmdCA9IDYsXG4gICAgVG9wTGVmdCA9IDcsXG4gICAgTW92ZSA9IDhcbn1cblxuZXhwb3J0IGVudW0gUm91bmRpbmcge1xuICAgIFJvdW5kRG93bixcbiAgICBSb3VuZERvd25CZWxvd0hhbGYsXG4gICAgUm91bmRVcCxcbiAgICBSb3VuZFVwT3ZlckhhbGZcbn0iXX0=