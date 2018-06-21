/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { delay, distinctUntilChanged, filter, map } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
var DashboardService = (function () {
    function DashboardService() {
        var _this = this;
        this._rowHeight = 0;
        this.widgets$ = new BehaviorSubject([]);
        this.options$ = new BehaviorSubject(defaultOptions);
        this.dimensions$ = new BehaviorSubject({});
        this.height$ = this.dimensions$.pipe(delay(0), map(function (dimensions) { return dimensions.height; }), distinctUntilChanged());
        this.placeholder$ = new BehaviorSubject({ visible: false, x: 0, y: 0, width: 0, height: 0 });
        this.layout$ = new Subject();
        this.stacked$ = new BehaviorSubject(false);
        this.layout$.subscribe(this.setLayoutData.bind(this));
        this.stacked$.pipe(filter(function (stacked) { return stacked === true; })).subscribe(this.updateWhenStacked.bind(this));
        this.widgets$.pipe(delay(0)).subscribe(function () { return _this.renderDashboard(); });
        this.dimensions$.pipe(delay(0)).subscribe(function () { return _this.renderDashboard(); });
    }
    Object.defineProperty(DashboardService.prototype, "options", {
        get: /**
         * @return {?}
         */
        function () {
            return this.options$.getValue();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DashboardService.prototype, "widgets", {
        get: /**
         * @return {?}
         */
        function () {
            return this.widgets$.getValue();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DashboardService.prototype, "stacked", {
        get: /**
         * @return {?}
         */
        function () {
            return this.stacked$.getValue();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DashboardService.prototype, "dimensions", {
        get: /**
         * @return {?}
         */
        function () {
            return this.dimensions$.getValue();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DashboardService.prototype, "columnWidth", {
        get: /**
         * @return {?}
         */
        function () {
            return this.dimensions.width / this.options.columns;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Add a widget to the dashboard
     * @param widget The widget component to add to the dashboard
     */
    /**
     * Add a widget to the dashboard
     * @param {?} widget The widget component to add to the dashboard
     * @return {?}
     */
    DashboardService.prototype.addWidget = /**
     * Add a widget to the dashboard
     * @param {?} widget The widget component to add to the dashboard
     * @return {?}
     */
    function (widget) {
        this.widgets$.next(tslib_1.__spread(this.widgets$.getValue(), [widget]));
    };
    /**
     * Remove a widget from the dashboard
     * @param widget The widget to remove
     */
    /**
     * Remove a widget from the dashboard
     * @param {?} widget The widget to remove
     * @return {?}
     */
    DashboardService.prototype.removeWidget = /**
     * Remove a widget from the dashboard
     * @param {?} widget The widget to remove
     * @return {?}
     */
    function (widget) {
        this.widgets$.next(this.widgets$.getValue().filter(function (_widget) { return _widget !== widget; }));
    };
    /**
     * Indicate that the dashboard element has been resized
     * @param width The width of the dashboard element in px
     * @param height The height of the dashboard element in px
     */
    /**
     * Indicate that the dashboard element has been resized
     * @param {?=} width The width of the dashboard element in px
     * @param {?=} height The height of the dashboard element in px
     * @return {?}
     */
    DashboardService.prototype.setDimensions = /**
     * Indicate that the dashboard element has been resized
     * @param {?=} width The width of the dashboard element in px
     * @param {?=} height The height of the dashboard element in px
     * @return {?}
     */
    function (width, height) {
        if (width === void 0) { width = this.dimensions.width; }
        if (height === void 0) { height = this.dimensions.height; }
        if (this.dimensions.width !== width || this.dimensions.height !== height) {
            this.dimensions$.next({ width: width, height: height });
        }
    };
    /**
     * Produce an object containing all the required layout data.
     * This can be useful for exporting/saving a layout
     */
    /**
     * Produce an object containing all the required layout data.
     * This can be useful for exporting/saving a layout
     * @return {?}
     */
    DashboardService.prototype.getLayoutData = /**
     * Produce an object containing all the required layout data.
     * This can be useful for exporting/saving a layout
     * @return {?}
     */
    function () {
        return this.widgets.map(function (widget) {
            return { id: widget.id, col: widget.getColumn(), row: widget.getRow(), colSpan: widget.getColumnSpan(), rowSpan: widget.getRowSpan() };
        });
    };
    /**
     * Position widgets programatically
     */
    /**
     * Position widgets programatically
     * @param {?} widgets
     * @return {?}
     */
    DashboardService.prototype.setLayoutData = /**
     * Position widgets programatically
     * @param {?} widgets
     * @return {?}
     */
    function (widgets) {
        var _this = this;
        // iterate through each widget data and find a match
        widgets.forEach(function (widget) {
            // find the matching widget
            var /** @type {?} */ target = _this.widgets.find(function (_widget) { return _widget.id === widget.id; });
            if (target) {
                target.setColumn(widget.col);
                target.setRow(widget.row);
                target.setColumnSpan(widget.colSpan);
                target.setRowSpan(widget.rowSpan);
            }
        });
    };
    /**
     * Update the positions and sizes of the widgets
     */
    /**
     * Update the positions and sizes of the widgets
     * @return {?}
     */
    DashboardService.prototype.renderDashboard = /**
     * Update the positions and sizes of the widgets
     * @return {?}
     */
    function () {
        var _this = this;
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
        this.widgets.filter(function (widget) { return !_this._actionWidget || widget !== _this._actionWidget.widget; })
            .forEach(function (widget) { return widget.render(); });
    };
    /**
     * Determine where widgets should be positioned based on their positions, width and the size of the container
     */
    /**
     * Determine where widgets should be positioned based on their positions, width and the size of the container
     * @return {?}
     */
    DashboardService.prototype.setDashboardLayout = /**
     * Determine where widgets should be positioned based on their positions, width and the size of the container
     * @return {?}
     */
    function () {
        var _this = this;
        // find any widgets that do not currently have a position set
        this.widgets.filter(function (widget) { return widget.getColumn() === undefined || widget.getRow() === undefined; })
            .forEach(function (widget) { return _this.setWidgetPosition(widget); });
        this.setDashboardHeight();
    };
    /**
     * @return {?}
     */
    DashboardService.prototype.updateWhenStacked = /**
     * @return {?}
     */
    function () {
        // iterate through each widget set it's stacked state and
        this.getWidgetsByOrder().forEach(function (widget, idx) {
            widget.setColumn(0);
            widget.setRow(idx);
        });
    };
    /**
     * @return {?}
     */
    DashboardService.prototype.getWidgetsByOrder = /**
     * @return {?}
     */
    function () {
        return this.widgets.sort(function (w1, w2) {
            var /** @type {?} */ w1Position = w1.getColumn() * w1.getRow();
            var /** @type {?} */ w2Position = w2.getColumn() * w2.getRow();
            if (w1Position < w2Position) {
                return -1;
            }
            if (w1Position > w2Position) {
                return 1;
            }
            return 0;
        });
    };
    /**
     * Find a position that a widget can fit in the dashboard
     * @param widget The widget to try and position
     */
    /**
     * Find a position that a widget can fit in the dashboard
     * @param {?} widget The widget to try and position
     * @return {?}
     */
    DashboardService.prototype.setWidgetPosition = /**
     * Find a position that a widget can fit in the dashboard
     * @param {?} widget The widget to try and position
     * @return {?}
     */
    function (widget) {
        // find a position for the widget
        var /** @type {?} */ position = 0;
        var /** @type {?} */ success = false;
        // repeat until a space is found
        while (!success) {
            // get a position to try
            var /** @type {?} */ column = position % this.options.columns;
            var /** @type {?} */ row = Math.floor(position / this.options.columns);
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
    };
    /**
     * Check if a position in the dashboard is vacant or not
     */
    /**
     * Check if a position in the dashboard is vacant or not
     * @param {?} column
     * @param {?} row
     * @param {?} columnSpan
     * @param {?} rowSpan
     * @param {?=} ignoreWidget
     * @return {?}
     */
    DashboardService.prototype.getPositionAvailable = /**
     * Check if a position in the dashboard is vacant or not
     * @param {?} column
     * @param {?} row
     * @param {?} columnSpan
     * @param {?} rowSpan
     * @param {?=} ignoreWidget
     * @return {?}
     */
    function (column, row, columnSpan, rowSpan, ignoreWidget) {
        // get a list of grid spaces that are populated
        var /** @type {?} */ spaces = this.getOccupiedSpaces();
        // check if the block would still be in bounds
        if (column + columnSpan > this.options.columns) {
            return false;
        }
        var _loop_1 = function (x) {
            var _loop_2 = function (y) {
                if (spaces.find(function (block) { return block.column === x && block.row === y && block.widget !== ignoreWidget; })) {
                    return { value: false };
                }
            };
            for (var /** @type {?} */ y = row; y < row + rowSpan; y++) {
                var state_1 = _loop_2(y);
                if (typeof state_1 === "object")
                    return state_1;
            }
        };
        // check each required position
        for (var /** @type {?} */ x = column; x < column + columnSpan; x++) {
            var state_2 = _loop_1(x);
            if (typeof state_2 === "object")
                return state_2.value;
        }
        return true;
    };
    /**
     * @return {?}
     */
    DashboardService.prototype.getOccupiedSpaces = /**
     * @return {?}
     */
    function () {
        var _this = this;
        // find all spaces that are currently occupied
        return this.widgets.filter(function (widget) { return widget.getColumn() !== undefined && widget.getRow() !== undefined; })
            .reduce(function (value, widget) {
            _this.forEachBlock(widget, function (column, row) { return value.push({ widget: widget, column: column, row: row }); });
            return value;
        }, []);
    };
    /**
     * Begin resizing a widget
     * @param action The the widget to resize
     */
    /**
     * Begin resizing a widget
     * @param {?} action The the widget to resize
     * @return {?}
     */
    DashboardService.prototype.onResizeStart = /**
     * Begin resizing a widget
     * @param {?} action The the widget to resize
     * @return {?}
     */
    function (action) {
        // store the mouse event
        this._mouseEvent = action.event;
        this._actionWidget = action;
        // bring the widget to the font
        this.bringToFront(action.widget);
    };
    /**
     * @param {?} action
     * @return {?}
     */
    DashboardService.prototype.onResizeDrag = /**
     * @param {?} action
     * @return {?}
     */
    function (action) {
        var /** @type {?} */ mousePosX = this._mouseEvent.pageX - pageXOffset;
        var /** @type {?} */ mousePosY = this._mouseEvent.pageY - pageYOffset;
        // if there was no movement then do nothing
        if (action.event.x === mousePosX && action.event.y === mousePosY) {
            return;
        }
        // update the stored mouse event
        this._mouseEvent = action.event;
        // get handle for direction
        var handle = action.handle;
        // get the bounds of the handle
        var /** @type {?} */ bounds = handle.getBoundingClientRect();
        // get the center of the handle
        var /** @type {?} */ centerX = bounds.left + (bounds.width / 2);
        var /** @type {?} */ centerY = bounds.top + (bounds.height / 2);
        // get the current mouse position
        var /** @type {?} */ mouseX = mousePosX - centerX;
        var /** @type {?} */ mouseY = mousePosY - centerY;
        // store the new proposed dimensions for the widget
        var /** @type {?} */ dimensions = {
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
                    var /** @type {?} */ difference = this.options.minWidth - dimensions.width;
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
                    var /** @type {?} */ difference = this.options.minHeight - dimensions.height;
                    dimensions.y -= difference;
                    dimensions.height += difference;
                }
                break;
            // Support resizing on multiple axis simultaneously
            case ActionDirection.TopLeft:
                dimensions.x += mouseX;
                dimensions.width -= mouseX;
                if (dimensions.width < this.options.minWidth) {
                    var /** @type {?} */ difference = this.options.minWidth - dimensions.width;
                    dimensions.x -= difference;
                    dimensions.width += difference;
                }
                dimensions.y += mouseY;
                dimensions.height -= mouseY;
                if (dimensions.height < this.options.minHeight) {
                    var /** @type {?} */ difference = this.options.minHeight - dimensions.height;
                    dimensions.y -= difference;
                    dimensions.height += difference;
                }
                break;
            case ActionDirection.TopRight:
                dimensions.width += mouseX;
                dimensions.y += mouseY;
                dimensions.height -= mouseY;
                if (dimensions.height < this.options.minHeight) {
                    var /** @type {?} */ difference = this.options.minHeight - dimensions.height;
                    dimensions.y -= difference;
                    dimensions.height += difference;
                }
                break;
            case ActionDirection.BottomLeft:
                dimensions.height += mouseY;
                dimensions.x += mouseX;
                dimensions.width -= mouseX;
                if (dimensions.width < this.options.minWidth) {
                    var /** @type {?} */ difference = this.options.minWidth - dimensions.width;
                    dimensions.x -= difference;
                    dimensions.width += difference;
                }
                break;
            case ActionDirection.BottomRight:
                dimensions.height += mouseY;
                dimensions.width += mouseX;
                break;
        }
        var /** @type {?} */ currentWidth = action.widget.x + action.widget.width;
        var /** @type {?} */ currentHeight = action.widget.y + action.widget.height;
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
    };
    /**
     * @return {?}
     */
    DashboardService.prototype.onResizeEnd = /**
     * @return {?}
     */
    function () {
        var /** @type {?} */ placeholder = this.placeholder$.getValue();
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
    };
    /**
     * @param {?} action
     * @return {?}
     */
    DashboardService.prototype.onDragStart = /**
     * @param {?} action
     * @return {?}
     */
    function (action) {
        this.onResizeStart(action);
        // store the starting placeholder position
        this.setWidgetOrigin();
        this.cacheWidgets();
    };
    /**
     * @return {?}
     */
    DashboardService.prototype.onDragEnd = /**
     * @return {?}
     */
    function () {
        this.onResizeEnd();
        this._widgetOrigin = {};
    };
    /**
     * @param {?} action
     * @return {?}
     */
    DashboardService.prototype.onDrag = /**
     * @param {?} action
     * @return {?}
     */
    function (action) {
        // if there was no movement then do nothing
        if (action.event.pageX === this._mouseEvent.pageX && action.event.pageY === this._mouseEvent.pageY) {
            return;
        }
        // get the current mouse position
        var /** @type {?} */ mouseX = action.event.pageX - this._mouseEvent.pageX;
        var /** @type {?} */ mouseY = action.event.pageY - this._mouseEvent.pageY;
        // store the latest event
        this._mouseEvent = action.event;
        var /** @type {?} */ dimensions = {
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
    };
    /**
     * @return {?}
     */
    DashboardService.prototype.getRowHeight = /**
     * @return {?}
     */
    function () {
        return this._rowHeight;
    };
    /**
     * @return {?}
     */
    DashboardService.prototype.cacheWidgets = /**
     * @return {?}
     */
    function () {
        this._cache = this.widgets.map(function (widget) { return ({ id: widget.id, column: widget.getColumn(), row: widget.getRow() }); });
    };
    /**
     * @param {?=} ignoreActionWidget
     * @return {?}
     */
    DashboardService.prototype.restoreWidgets = /**
     * @param {?=} ignoreActionWidget
     * @return {?}
     */
    function (ignoreActionWidget) {
        var _this = this;
        if (ignoreActionWidget === void 0) { ignoreActionWidget = false; }
        this._cache.filter(function (widget) { return !ignoreActionWidget || widget.id !== _this._actionWidget.widget.id; }).forEach(function (widget) {
            var /** @type {?} */ match = _this.widgets.find(function (wgt) { return wgt.id === widget.id; });
            if (match) {
                match.setColumn(widget.column);
                match.setRow(widget.row);
            }
        });
    };
    /**
     * When dragging any widgets that need to be moved should be moved to an appropriate position
     */
    /**
     * When dragging any widgets that need to be moved should be moved to an appropriate position
     * @return {?}
     */
    DashboardService.prototype.shiftWidgets = /**
     * When dragging any widgets that need to be moved should be moved to an appropriate position
     * @return {?}
     */
    function () {
        var _this = this;
        var /** @type {?} */ widgetsToMove = [];
        var /** @type {?} */ placeholder = this.placeholder$.getValue();
        var _loop_3 = function (row) {
            var _loop_4 = function (column) {
                // store reference to any widgets that need moved
                this_1.getOccupiedSpaces()
                    .filter(function (space) { return space.column === column && space.row === row && space.widget !== _this._actionWidget.widget; })
                    .forEach(function (space) { return widgetsToMove.push(space.widget); });
            };
            for (var /** @type {?} */ column = placeholder.column; column < placeholder.column + placeholder.columnSpan; column++) {
                _loop_4(column);
            }
        };
        var this_1 = this;
        // check if there are any widgets under the placeholder
        for (var /** @type {?} */ row = placeholder.row; row < placeholder.row + placeholder.rowSpan; row++) {
            _loop_3(row);
        }
        // remove any duplicates
        widgetsToMove = widgetsToMove.filter(function (widget, idx, array) { return array.indexOf(widget) === idx; });
        // if no widgets need moved then we can stop here
        if (widgetsToMove.length === 0) {
            return;
        }
        // create a duplicate we can use to keep track of which have been moved
        var /** @type {?} */ unmovedWidgets = widgetsToMove.slice();
        // attempt to move any widgets to the previous widget position
        widgetsToMove.forEach(function (widget) {
            // get a grid off all occupied spaces - taking into account the placeholder and ignoring widgets that need moved
            var /** @type {?} */ grid = _this.getOccupiedSpaces().filter(function (space) { return !unmovedWidgets.find(function (wgt) { return wgt === space.widget; }); });
            // iterate each free block
            for (var /** @type {?} */ row = _this._widgetOrigin.row; row < _this._widgetOrigin.row + _this._widgetOrigin.rowSpan; row++) {
                for (var /** @type {?} */ column = _this._widgetOrigin.column; column < _this._widgetOrigin.column + _this._widgetOrigin.columnSpan; column++) {
                    // determine if the block can fit in this space
                    var /** @type {?} */ requiredSpaces = _this.getRequiredSpacesFromPoint(widget, column, row);
                    // check if widget would fit in space
                    var /** @type {?} */ available = requiredSpaces.every(function (space) {
                        return !grid.find(function (gridSpace) { return gridSpace.column === space.column && gridSpace.row === space.row; }) && space.column < _this.getColumnCount();
                    });
                    if (available) {
                        widget.setColumn(column);
                        widget.setRow(row);
                        unmovedWidgets.splice(unmovedWidgets.findIndex(function (wgt) { return wgt === widget; }), 1);
                        return;
                    }
                }
            }
            // if we get to here then we can't simply swap the positions - next try moving right
            if (_this.canWidgetMoveRight(widget, true)) {
                // after the shift check if placeholder position is still valid
                // after the shift check if placeholder position is still valid
                _this.validatePlaceholderPosition(ActionDirection.Right);
                return;
            }
            // next try moving left
            if (_this.canWidgetMoveLeft(widget, true)) {
                // after the shift check if placeholder position is still valid
                // after the shift check if placeholder position is still valid
                _this.validatePlaceholderPosition(ActionDirection.Left);
                return;
            }
            // determine the distance that the widget needs to be moved down
            var /** @type {?} */ distance = (_this._actionWidget.widget.getRow() - widget.getRow()) + _this._actionWidget.widget.getRowSpan();
            // as a last resort move the widget downwards
            // as a last resort move the widget downwards
            _this.moveWidgetDown(widget, distance);
        });
    };
    /**
     * After shifts have taken place we should verify the place holder position is still valid
     * @param shiftDirection - the position widgets were shifted
     */
    /**
     * After shifts have taken place we should verify the place holder position is still valid
     * @param {?} shiftDirection - the position widgets were shifted
     * @return {?}
     */
    DashboardService.prototype.validatePlaceholderPosition = /**
     * After shifts have taken place we should verify the place holder position is still valid
     * @param {?} shiftDirection - the position widgets were shifted
     * @return {?}
     */
    function (shiftDirection) {
        var /** @type {?} */ placeholder = this.placeholder$.getValue();
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
    };
    /**
     * Determine if a widget can be moved left - or if it can move the widgets to the right to make space for the widget
     */
    /**
     * Determine if a widget can be moved left - or if it can move the widgets to the right to make space for the widget
     * @param {?} widget
     * @param {?=} performMove
     * @return {?}
     */
    DashboardService.prototype.canWidgetMoveLeft = /**
     * Determine if a widget can be moved left - or if it can move the widgets to the right to make space for the widget
     * @param {?} widget
     * @param {?=} performMove
     * @return {?}
     */
    function (widget, performMove) {
        var _this = this;
        if (performMove === void 0) { performMove = false; }
        // check if the widget is the action widget or occupies the first column
        if (widget === this._actionWidget.widget || widget.getColumn() === 0) {
            return false;
        }
        // find the positions required
        var /** @type {?} */ targetSpaces = this.getOccupiedSpaces().filter(function (space) { return space.widget === widget; }).map(function (space) {
            return { column: space.column - widget.getColumnSpan(), row: space.row, widget: space.widget };
        });
        // check if there are widget in the required positions and if so, can they move right?
        var /** @type {?} */ moveable = targetSpaces.every(function (space) { return _this.getWidgetsAtPosition(space.column, space.row).filter(function (wgt) { return wgt !== space.widget; }).every(function (wgt) { return _this.canWidgetMoveLeft(wgt); }); });
        if (performMove && moveable) {
            // move all widgets to the right
            targetSpaces.forEach(function (space) { return _this.getWidgetsAtPosition(space.column, space.row).filter(function (wgt) { return wgt !== space.widget; }).forEach(function (wgt) { return _this.canWidgetMoveLeft(wgt, true); }); });
            // move current widget to the right
            widget.setColumn(widget.getColumn() - 1);
        }
        return moveable;
    };
    /**
     * Determine if a widget can be moved right - or if it can move the widgets to the right to make space for the widget
     */
    /**
     * Determine if a widget can be moved right - or if it can move the widgets to the right to make space for the widget
     * @param {?} widget
     * @param {?=} performMove
     * @return {?}
     */
    DashboardService.prototype.canWidgetMoveRight = /**
     * Determine if a widget can be moved right - or if it can move the widgets to the right to make space for the widget
     * @param {?} widget
     * @param {?=} performMove
     * @return {?}
     */
    function (widget, performMove) {
        var _this = this;
        if (performMove === void 0) { performMove = false; }
        // check if the widget is the dragging widget or the widget occupies the final column
        if (widget === this._actionWidget.widget || widget.getColumn() + widget.getColumnSpan() === this.options.columns) {
            return false;
        }
        // find the positions required
        var /** @type {?} */ targetSpaces = this.getOccupiedSpaces().filter(function (space) { return space.widget === widget; }).map(function (space) {
            return { column: space.column + widget.getColumnSpan(), row: space.row, widget: space.widget };
        });
        // check if there are widget in the required positions and if so, can they move right?
        var /** @type {?} */ moveable = targetSpaces.every(function (space) { return _this.getWidgetsAtPosition(space.column, space.row).filter(function (wgt) { return wgt !== space.widget; }).every(function (wgt) { return _this.canWidgetMoveRight(wgt); }); });
        if (performMove && moveable) {
            // move all widgets to the right
            targetSpaces.forEach(function (space) { return _this.getWidgetsAtPosition(space.column, space.row).filter(function (wgt) { return wgt !== space.widget; }).forEach(function (wgt) { return _this.canWidgetMoveRight(wgt, true); }); });
            // move current widget to the right
            widget.setColumn(widget.getColumn() + 1);
        }
        return moveable;
    };
    /**
     * Store the initial position of the widget being dragged
     */
    /**
     * Store the initial position of the widget being dragged
     * @return {?}
     */
    DashboardService.prototype.setWidgetOrigin = /**
     * Store the initial position of the widget being dragged
     * @return {?}
     */
    function () {
        this._widgetOrigin = {
            column: this._actionWidget.widget.getColumn(),
            row: this._actionWidget.widget.getRow(),
            columnSpan: this._actionWidget.widget.getColumnSpan(),
            rowSpan: this._actionWidget.widget.getRowSpan()
        };
    };
    /**
     * Calculate all the required positions is a widget was to be positioned at a particular point
     */
    /**
     * Calculate all the required positions is a widget was to be positioned at a particular point
     * @param {?} widget
     * @param {?} column
     * @param {?} row
     * @return {?}
     */
    DashboardService.prototype.getRequiredSpacesFromPoint = /**
     * Calculate all the required positions is a widget was to be positioned at a particular point
     * @param {?} widget
     * @param {?} column
     * @param {?} row
     * @return {?}
     */
    function (widget, column, row) {
        var /** @type {?} */ spaces = [];
        for (var /** @type {?} */ y = row; y < row + widget.getRowSpan(); y++) {
            for (var /** @type {?} */ x = column; x < column + widget.getColumnSpan(); x++) {
                spaces.push({ column: x, row: y, widget: widget });
            }
        }
        return spaces;
    };
    /**
     * Position widgets based on the position of the placeholder - this is temporary until confirmed
     */
    /**
     * Position widgets based on the position of the placeholder - this is temporary until confirmed
     * @param {?} widget
     * @return {?}
     */
    DashboardService.prototype.updateWidgetPositions = /**
     * Position widgets based on the position of the placeholder - this is temporary until confirmed
     * @param {?} widget
     * @return {?}
     */
    function (widget) {
        var _this = this;
        var /** @type {?} */ placeholder = this.placeholder$.getValue();
        // check all spaces the placeholder will occupy and move any widget currently in them down
        for (var /** @type {?} */ column = placeholder.column; column < placeholder.column + placeholder.columnSpan; column++) {
            for (var /** @type {?} */ row = placeholder.row; row < placeholder.row + placeholder.rowSpan; row++) {
                this.getWidgetsAtPosition(column, row, true)
                    .filter(function (wgt) { return wgt !== widget; })
                    .forEach(function (wgt) { return _this.moveWidgetDown(wgt); });
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
    };
    /**
     * Determine if a widget is occupying a specific row and column
     * @param column The columns to check if occupied
     * @param row The row to check if occupied
     * @param ignoreResizing Whether or not to ignore the widget currently being resized
     */
    /**
     * Determine if a widget is occupying a specific row and column
     * @param {?} column The columns to check if occupied
     * @param {?} row The row to check if occupied
     * @param {?=} ignoreResizing Whether or not to ignore the widget currently being resized
     * @return {?}
     */
    DashboardService.prototype.getWidgetsAtPosition = /**
     * Determine if a widget is occupying a specific row and column
     * @param {?} column The columns to check if occupied
     * @param {?} row The row to check if occupied
     * @param {?=} ignoreResizing Whether or not to ignore the widget currently being resized
     * @return {?}
     */
    function (column, row, ignoreResizing) {
        var _this = this;
        if (ignoreResizing === void 0) { ignoreResizing = false; }
        return this.getOccupiedSpaces()
            .filter(function (space) { return space.column === column && space.row === row; })
            .filter(function (space) { return space.widget !== _this._actionWidget.widget || !ignoreResizing; })
            .map(function (space) { return space.widget; });
    };
    /**
     * Update the placeholder visibility, position and size
     */
    /**
     * Update the placeholder visibility, position and size
     * @param {?} visible
     * @param {?} x
     * @param {?} y
     * @param {?} width
     * @param {?} height
     * @return {?}
     */
    DashboardService.prototype.setPlaceholderBounds = /**
     * Update the placeholder visibility, position and size
     * @param {?} visible
     * @param {?} x
     * @param {?} y
     * @param {?} width
     * @param {?} height
     * @return {?}
     */
    function (visible, x, y, width, height) {
        var _this = this;
        var /** @type {?} */ placeholder = this.placeholder$.getValue();
        var /** @type {?} */ rounding = this._actionWidget.direction === ActionDirection.Left ||
            this._actionWidget.direction === ActionDirection.Top ? Rounding.RoundDownBelowHalf : Rounding.RoundUpOverHalf;
        placeholder.visible = visible;
        placeholder.column = this.getPlaceholderColumn(x, width);
        placeholder.row = this.getPlaceholderRow(y, height);
        placeholder.columnSpan = this.getPlaceholderColumnSpan(width);
        placeholder.rowSpan = this.getPlaceholderRowSpan(height);
        // calculate the maximum number of rows
        var /** @type {?} */ rowCount = this.widgets.filter(function (widget) { return widget !== _this._actionWidget.widget; })
            .reduce(function (previous, widget) { return Math.max(widget.getRow() + widget.getRowSpan(), previous); }, 0);
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
    };
    /**
     * Get the placeholder column position
     */
    /**
     * Get the placeholder column position
     * @param {?} x
     * @param {?} width
     * @return {?}
     */
    DashboardService.prototype.getPlaceholderColumn = /**
     * Get the placeholder column position
     * @param {?} x
     * @param {?} width
     * @return {?}
     */
    function (x, width) {
        var /** @type {?} */ column = this.getColumnFromPx(x, this._actionWidget.direction === ActionDirection.Move ? Rounding.RoundUpOverHalf : Rounding.RoundDown);
        var /** @type {?} */ columnSpan = Math.floor(width / this.getColumnWidth());
        var /** @type {?} */ upperLimit = this.getColumnCount() - columnSpan;
        // if we arent dragging left then just return the column
        if (this._actionWidget.direction !== ActionDirection.Left &&
            this._actionWidget.direction !== ActionDirection.TopLeft &&
            this._actionWidget.direction !== ActionDirection.BottomLeft) {
            return Math.max(Math.min(column, upperLimit), 0);
        }
        // get any overflow
        var /** @type {?} */ overflow = width % this.getColumnWidth();
        return (x <= 0 || overflow === 0 || columnSpan === 0 || overflow > (this.getColumnWidth() / 2)) ?
            Math.max(Math.min(column, upperLimit), 0) :
            Math.max(Math.min(column + 1, upperLimit), 0);
    };
    /**
     * Get the column span of the placeholder
     */
    /**
     * Get the column span of the placeholder
     * @param {?} width
     * @return {?}
     */
    DashboardService.prototype.getPlaceholderColumnSpan = /**
     * Get the column span of the placeholder
     * @param {?} width
     * @return {?}
     */
    function (width) {
        var /** @type {?} */ columnSpan = this.getColumnFromPx(width);
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
        var /** @type {?} */ overflow = width % this.getColumnWidth();
        return (columnSpan > 0 && overflow > (this.getColumnWidth() / 2)) ? Math.max(columnSpan + 1, 1) : Math.max(columnSpan, 1);
    };
    /**
     * Get the row position of the placeholder
     */
    /**
     * Get the row position of the placeholder
     * @param {?} y
     * @param {?} height
     * @return {?}
     */
    DashboardService.prototype.getPlaceholderRow = /**
     * Get the row position of the placeholder
     * @param {?} y
     * @param {?} height
     * @return {?}
     */
    function (y, height) {
        var /** @type {?} */ row = this.getRowFromPx(y, this._actionWidget.direction === ActionDirection.Move ? Rounding.RoundUpOverHalf : Rounding.RoundDown);
        var /** @type {?} */ rowSpan = Math.ceil(height / this._rowHeight);
        // if we arent dragging up then just return the row
        if (this._actionWidget.direction !== ActionDirection.Top &&
            this._actionWidget.direction !== ActionDirection.TopLeft &&
            this._actionWidget.direction !== ActionDirection.TopRight) {
            return Math.max(row, 0);
        }
        // get any overflow
        var /** @type {?} */ overflow = height < this._rowHeight ? 0 : height % this._rowHeight;
        return (y <= 0 || rowSpan === 0 || overflow === 0 || overflow > (this._rowHeight / 2)) ? Math.max(row, 0) : Math.max(row + 1, 0);
    };
    /**
     * Get the row span of the placeholder
     */
    /**
     * Get the row span of the placeholder
     * @param {?} height
     * @return {?}
     */
    DashboardService.prototype.getPlaceholderRowSpan = /**
     * Get the row span of the placeholder
     * @param {?} height
     * @return {?}
     */
    function (height) {
        var /** @type {?} */ rowSpan = this.getRowFromPx(height);
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
        var /** @type {?} */ overflow = height % this._rowHeight;
        return (overflow > (this._rowHeight / 2)) ? Math.max(rowSpan + 1, 1) : Math.max(rowSpan, 1);
    };
    /**
     * @param {?} x
     * @param {?=} rounding
     * @return {?}
     */
    DashboardService.prototype.getColumnFromPx = /**
     * @param {?} x
     * @param {?=} rounding
     * @return {?}
     */
    function (x, rounding) {
        if (rounding === void 0) { rounding = Rounding.RoundDown; }
        var /** @type {?} */ column = Math.floor(x / Math.floor(this.getColumnWidth()));
        var /** @type {?} */ overflow = (x % Math.floor(this.getColumnWidth()));
        var /** @type {?} */ half = this.getColumnWidth() / 2;
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
    };
    /**
     * @param {?} y
     * @param {?=} rounding
     * @return {?}
     */
    DashboardService.prototype.getRowFromPx = /**
     * @param {?} y
     * @param {?=} rounding
     * @return {?}
     */
    function (y, rounding) {
        if (rounding === void 0) { rounding = Rounding.RoundDown; }
        var /** @type {?} */ row = Math.floor(y / Math.floor(this._rowHeight));
        var /** @type {?} */ overflow = (y % Math.floor(this._rowHeight));
        var /** @type {?} */ half = this._rowHeight / 2;
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
    };
    /**
     * @return {?}
     */
    DashboardService.prototype.commitWidgetChanges = /**
     * @return {?}
     */
    function () {
        var /** @type {?} */ placeholder = this.placeholder$.getValue();
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
    };
    /**
     * Get the current column width
     */
    /**
     * Get the current column width
     * @return {?}
     */
    DashboardService.prototype.getColumnWidth = /**
     * Get the current column width
     * @return {?}
     */
    function () {
        return Math.floor(this.columnWidth);
    };
    /**
     * Calculate the number of rows populated with widgets
     */
    /**
     * Calculate the number of rows populated with widgets
     * @return {?}
     */
    DashboardService.prototype.getRowCount = /**
     * Calculate the number of rows populated with widgets
     * @return {?}
     */
    function () {
        return this.widgets.reduce(function (previous, widget) { return Math.max(widget.getRow() + widget.getRowSpan(), previous); }, 0);
    };
    /**
     * Set the height of the dashboard container element
     */
    /**
     * Set the height of the dashboard container element
     * @return {?}
     */
    DashboardService.prototype.setDashboardHeight = /**
     * Set the height of the dashboard container element
     * @return {?}
     */
    function () {
        // size the dashboard container to ensure all rows fit
        var /** @type {?} */ rowCount = this.getRowCount();
        // if we should show an empty row increment the row count by 1
        if (this.options.emptyRow) {
            rowCount++;
        }
        this.setDimensions(undefined, rowCount * this._rowHeight);
    };
    /**
     * Orders the z-index of all widgets to move the active one to the front
     * @param widget The widget that should be brought to the front
     */
    /**
     * Orders the z-index of all widgets to move the active one to the front
     * @param {?} widget The widget that should be brought to the front
     * @return {?}
     */
    DashboardService.prototype.bringToFront = /**
     * Orders the z-index of all widgets to move the active one to the front
     * @param {?} widget The widget that should be brought to the front
     * @return {?}
     */
    function (widget) {
        this.widgets.forEach(function (_widget) { return _widget === widget ? _widget.bringToFront() : _widget.sendToBack(); });
    };
    /**
     * Move a widget down - if widgets are in the position below, then move them down further
     * @param widget The widget to move downwards
     */
    /**
     * Move a widget down - if widgets are in the position below, then move them down further
     * @param {?} widget The widget to move downwards
     * @param {?=} distance
     * @return {?}
     */
    DashboardService.prototype.moveWidgetDown = /**
     * Move a widget down - if widgets are in the position below, then move them down further
     * @param {?} widget The widget to move downwards
     * @param {?=} distance
     * @return {?}
     */
    function (widget, distance) {
        var _this = this;
        if (distance === void 0) { distance = 1; }
        // move the widget down one position
        widget.setRow(widget.getRow() + distance);
        // check every space the widget occupies for collisions
        this.forEachBlock(widget, function (column, row) {
            return _this.getWidgetsAtPosition(column, row, true)
                .filter(function (wgt) { return wgt !== widget; })
                .forEach(function (wgt) { return _this.moveWidgetDown(wgt, distance); });
        });
    };
    /**
     * Widgets should not be allowed to have a vacant space above them - if there is one they should move upwards to fill it
     */
    /**
     * Widgets should not be allowed to have a vacant space above them - if there is one they should move upwards to fill it
     * @return {?}
     */
    DashboardService.prototype.shiftWidgetsUp = /**
     * Widgets should not be allowed to have a vacant space above them - if there is one they should move upwards to fill it
     * @return {?}
     */
    function () {
        var _this = this;
        // check whether or not changes have been made - if so we need to repeat until stable
        var /** @type {?} */ stable = true;
        // iterate each widget and
        this.widgets.forEach(function (widget) {
            // if widget is already on the top row then do nothing
            if (widget.getRow() === 0) {
                return;
            }
            // if we are currently dragging and this is the dragging widget then skip
            if (_this._actionWidget && _this._actionWidget.widget === widget) {
                return;
            }
            if (_this.getPositionAvailable(widget.getColumn(), widget.getRow() - 1, widget.getColumnSpan(), 1)) {
                widget.setRow(widget.getRow() - 1);
                stable = false;
            }
        });
        // if changes occurred then we should repeat the process
        if (!stable) {
            this.shiftWidgetsUp();
        }
    };
    /**
     * Iterate over each space a widget occupied
     * @param widget The widget to determine spaces
     * @param callback The function to be called for each space, should expect a column and row argument witht he context being the widget
     */
    /**
     * Iterate over each space a widget occupied
     * @param {?} widget The widget to determine spaces
     * @param {?} callback The function to be called for each space, should expect a column and row argument witht he context being the widget
     * @return {?}
     */
    DashboardService.prototype.forEachBlock = /**
     * Iterate over each space a widget occupied
     * @param {?} widget The widget to determine spaces
     * @param {?} callback The function to be called for each space, should expect a column and row argument witht he context being the widget
     * @return {?}
     */
    function (widget, callback) {
        for (var /** @type {?} */ row = widget.getRow(); row < widget.getRow() + widget.getRowSpan(); row++) {
            for (var /** @type {?} */ column = widget.getColumn(); column < widget.getColumn() + widget.getColumnSpan(); column++) {
                callback.call(widget, column, row);
            }
        }
    };
    /**
     * Returns the number of columns available
     */
    /**
     * Returns the number of columns available
     * @return {?}
     */
    DashboardService.prototype.getColumnCount = /**
     * Returns the number of columns available
     * @return {?}
     */
    function () {
        return this.stacked ? 1 : this.options.columns;
    };
    DashboardService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    DashboardService.ctorParameters = function () { return []; };
    return DashboardService;
}());
export { DashboardService };
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
export var /** @type {?} */ defaultOptions = { columns: 5, padding: 5, minWidth: 100, minHeight: 100, emptyRow: true };
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
var ActionDirection = {
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
var Rounding = {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGFzaGJvYXJkLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9kYXNoYm9hcmQvZGFzaGJvYXJkLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUV2RCxPQUFPLEVBQUUsS0FBSyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUMxRSxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sY0FBYyxDQUFDOztJQXlDbkM7UUFBQSxpQkFLQzswQkFyQzRCLENBQUM7d0JBSW5CLElBQUksZUFBZSxDQUE2QixFQUFFLENBQUM7d0JBQ25ELElBQUksZUFBZSxDQUFtQixjQUFjLENBQUM7MkJBQ2xELElBQUksZUFBZSxDQUFzQixFQUFFLENBQUM7dUJBQzVCLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsVUFBQyxVQUErQixJQUFLLE9BQUEsVUFBVSxDQUFDLE1BQU0sRUFBakIsQ0FBaUIsQ0FBQyxFQUFFLG9CQUFvQixFQUFFLENBQUM7NEJBQ25JLElBQUksZUFBZSxDQUF1QixFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRSxDQUFDO3VCQUNuRyxJQUFJLE9BQU8sRUFBeUI7d0JBQ25DLElBQUksZUFBZSxDQUFVLEtBQUssQ0FBQztRQXVCMUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENB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QU0sQ0FBQyxxQkFBTSxjQUFjLEdBQXFCLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzL0JlaGF2aW9yU3ViamVjdCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcbmltcG9ydCB7IGRlbGF5LCBkaXN0aW5jdFVudGlsQ2hhbmdlZCwgZmlsdGVyLCBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcy9TdWJqZWN0JztcbmltcG9ydCB7IERhc2hib2FyZE9wdGlvbnMgfSBmcm9tICcuL2Rhc2hib2FyZC5jb21wb25lbnQnO1xuaW1wb3J0IHsgRGFzaGJvYXJkV2lkZ2V0Q29tcG9uZW50IH0gZnJvbSAnLi93aWRnZXQvZGFzaGJvYXJkLXdpZGdldC5jb21wb25lbnQnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRGFzaGJvYXJkU2VydmljZSB7XG5cbiAgICBwcml2YXRlIF93aWRnZXRPcmlnaW46IHsgY29sdW1uPzogbnVtYmVyLCByb3c/OiBudW1iZXIsIGNvbHVtblNwYW4/OiBudW1iZXIsIHJvd1NwYW4/OiBudW1iZXIgfTtcbiAgICBwcml2YXRlIF9hY3Rpb25XaWRnZXQ6IERhc2hib2FyZEFjdGlvbjtcbiAgICBwcml2YXRlIF9yb3dIZWlnaHQ6IG51bWJlciA9IDA7XG4gICAgcHJpdmF0ZSBfY2FjaGU6IERhc2hib2FyZENhY2hlW107XG4gICAgcHJpdmF0ZSBfbW91c2VFdmVudDogTW91c2VFdmVudDtcblxuICAgIHdpZGdldHMkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxEYXNoYm9hcmRXaWRnZXRDb21wb25lbnRbXT4oW10pO1xuICAgIG9wdGlvbnMkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxEYXNoYm9hcmRPcHRpb25zPihkZWZhdWx0T3B0aW9ucyk7XG4gICAgZGltZW5zaW9ucyQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PERhc2hib2FyZERpbWVuc2lvbnM+KHt9KTtcbiAgICBoZWlnaHQkOiBPYnNlcnZhYmxlPG51bWJlcj4gPSB0aGlzLmRpbWVuc2lvbnMkLnBpcGUoZGVsYXkoMCksIG1hcCgoZGltZW5zaW9uczogRGFzaGJvYXJkRGltZW5zaW9ucykgPT4gZGltZW5zaW9ucy5oZWlnaHQpLCBkaXN0aW5jdFVudGlsQ2hhbmdlZCgpKTtcbiAgICBwbGFjZWhvbGRlciQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PERhc2hib2FyZFBsYWNlaG9sZGVyPih7IHZpc2libGU6IGZhbHNlLCB4OiAwLCB5OiAwLCB3aWR0aDogMCwgaGVpZ2h0OiAwIH0pO1xuICAgIGxheW91dCQgPSBuZXcgU3ViamVjdDxEYXNoYm9hcmRMYXlvdXREYXRhW10+KCk7XG4gICAgc3RhY2tlZCQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcblxuICAgIGdldCBvcHRpb25zKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5vcHRpb25zJC5nZXRWYWx1ZSgpO1xuICAgIH1cblxuICAgIGdldCB3aWRnZXRzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy53aWRnZXRzJC5nZXRWYWx1ZSgpO1xuICAgIH1cblxuICAgIGdldCBzdGFja2VkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zdGFja2VkJC5nZXRWYWx1ZSgpO1xuICAgIH1cblxuICAgIGdldCBkaW1lbnNpb25zKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5kaW1lbnNpb25zJC5nZXRWYWx1ZSgpO1xuICAgIH1cblxuICAgIGdldCBjb2x1bW5XaWR0aCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGltZW5zaW9ucy53aWR0aCAvIHRoaXMub3B0aW9ucy5jb2x1bW5zO1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmxheW91dCQuc3Vic2NyaWJlKHRoaXMuc2V0TGF5b3V0RGF0YS5iaW5kKHRoaXMpKTtcbiAgICAgICAgdGhpcy5zdGFja2VkJC5waXBlKGZpbHRlcihzdGFja2VkID0+IHN0YWNrZWQgPT09IHRydWUpKS5zdWJzY3JpYmUodGhpcy51cGRhdGVXaGVuU3RhY2tlZC5iaW5kKHRoaXMpKTtcbiAgICAgICAgdGhpcy53aWRnZXRzJC5waXBlKGRlbGF5KDApKS5zdWJzY3JpYmUoKCkgPT4gdGhpcy5yZW5kZXJEYXNoYm9hcmQoKSk7XG4gICAgICAgIHRoaXMuZGltZW5zaW9ucyQucGlwZShkZWxheSgwKSkuc3Vic2NyaWJlKCgpID0+IHRoaXMucmVuZGVyRGFzaGJvYXJkKCkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFkZCBhIHdpZGdldCB0byB0aGUgZGFzaGJvYXJkXG4gICAgICogQHBhcmFtIHdpZGdldCBUaGUgd2lkZ2V0IGNvbXBvbmVudCB0byBhZGQgdG8gdGhlIGRhc2hib2FyZFxuICAgICAqL1xuICAgIGFkZFdpZGdldCh3aWRnZXQ6IERhc2hib2FyZFdpZGdldENvbXBvbmVudCk6IHZvaWQge1xuICAgICAgICB0aGlzLndpZGdldHMkLm5leHQoWy4uLnRoaXMud2lkZ2V0cyQuZ2V0VmFsdWUoKSwgd2lkZ2V0XSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlIGEgd2lkZ2V0IGZyb20gdGhlIGRhc2hib2FyZFxuICAgICAqIEBwYXJhbSB3aWRnZXQgVGhlIHdpZGdldCB0byByZW1vdmVcbiAgICAgKi9cbiAgICByZW1vdmVXaWRnZXQod2lkZ2V0OiBEYXNoYm9hcmRXaWRnZXRDb21wb25lbnQpOiB2b2lkIHtcbiAgICAgICAgdGhpcy53aWRnZXRzJC5uZXh0KHRoaXMud2lkZ2V0cyQuZ2V0VmFsdWUoKS5maWx0ZXIoX3dpZGdldCA9PiBfd2lkZ2V0ICE9PSB3aWRnZXQpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBJbmRpY2F0ZSB0aGF0IHRoZSBkYXNoYm9hcmQgZWxlbWVudCBoYXMgYmVlbiByZXNpemVkXG4gICAgICogQHBhcmFtIHdpZHRoIFRoZSB3aWR0aCBvZiB0aGUgZGFzaGJvYXJkIGVsZW1lbnQgaW4gcHhcbiAgICAgKiBAcGFyYW0gaGVpZ2h0IFRoZSBoZWlnaHQgb2YgdGhlIGRhc2hib2FyZCBlbGVtZW50IGluIHB4XG4gICAgICovXG4gICAgc2V0RGltZW5zaW9ucyh3aWR0aDogbnVtYmVyID0gdGhpcy5kaW1lbnNpb25zLndpZHRoLCBoZWlnaHQ6IG51bWJlciA9IHRoaXMuZGltZW5zaW9ucy5oZWlnaHQpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuZGltZW5zaW9ucy53aWR0aCAhPT0gd2lkdGggfHwgdGhpcy5kaW1lbnNpb25zLmhlaWdodCAhPT0gaGVpZ2h0KSB7XG4gICAgICAgICAgICB0aGlzLmRpbWVuc2lvbnMkLm5leHQoeyB3aWR0aDogd2lkdGgsIGhlaWdodDogaGVpZ2h0IH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUHJvZHVjZSBhbiBvYmplY3QgY29udGFpbmluZyBhbGwgdGhlIHJlcXVpcmVkIGxheW91dCBkYXRhLlxuICAgICAqIFRoaXMgY2FuIGJlIHVzZWZ1bCBmb3IgZXhwb3J0aW5nL3NhdmluZyBhIGxheW91dFxuICAgICAqL1xuICAgIGdldExheW91dERhdGEoKTogRGFzaGJvYXJkTGF5b3V0RGF0YVtdIHtcbiAgICAgICAgcmV0dXJuIHRoaXMud2lkZ2V0cy5tYXAod2lkZ2V0ID0+IHtcbiAgICAgICAgICAgIHJldHVybiB7IGlkOiB3aWRnZXQuaWQsIGNvbDogd2lkZ2V0LmdldENvbHVtbigpLCByb3c6IHdpZGdldC5nZXRSb3coKSwgY29sU3Bhbjogd2lkZ2V0LmdldENvbHVtblNwYW4oKSwgcm93U3Bhbjogd2lkZ2V0LmdldFJvd1NwYW4oKSB9O1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQb3NpdGlvbiB3aWRnZXRzIHByb2dyYW1hdGljYWxseVxuICAgICAqL1xuICAgIHNldExheW91dERhdGEod2lkZ2V0czogRGFzaGJvYXJkTGF5b3V0RGF0YVtdKTogdm9pZCB7XG5cbiAgICAgICAgLy8gaXRlcmF0ZSB0aHJvdWdoIGVhY2ggd2lkZ2V0IGRhdGEgYW5kIGZpbmQgYSBtYXRjaFxuICAgICAgICB3aWRnZXRzLmZvckVhY2god2lkZ2V0ID0+IHtcblxuICAgICAgICAgICAgLy8gZmluZCB0aGUgbWF0Y2hpbmcgd2lkZ2V0XG4gICAgICAgICAgICBjb25zdCB0YXJnZXQgPSB0aGlzLndpZGdldHMuZmluZChfd2lkZ2V0ID0+IF93aWRnZXQuaWQgPT09IHdpZGdldC5pZCk7XG5cbiAgICAgICAgICAgIGlmICh0YXJnZXQpIHtcbiAgICAgICAgICAgICAgICB0YXJnZXQuc2V0Q29sdW1uKHdpZGdldC5jb2wpO1xuICAgICAgICAgICAgICAgIHRhcmdldC5zZXRSb3cod2lkZ2V0LnJvdyk7XG4gICAgICAgICAgICAgICAgdGFyZ2V0LnNldENvbHVtblNwYW4od2lkZ2V0LmNvbFNwYW4pO1xuICAgICAgICAgICAgICAgIHRhcmdldC5zZXRSb3dTcGFuKHdpZGdldC5yb3dTcGFuKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVXBkYXRlIHRoZSBwb3NpdGlvbnMgYW5kIHNpemVzIG9mIHRoZSB3aWRnZXRzXG4gICAgICovXG4gICAgcmVuZGVyRGFzaGJvYXJkKCk6IHZvaWQge1xuXG4gICAgICAgIC8vIGdldCB0aGUgZGltZW5zaW9ucyBvZiB0aGUgZGFzaGJvYXJkXG4gICAgICAgIHRoaXMuX3Jvd0hlaWdodCA9IHRoaXMub3B0aW9ucy5yb3dIZWlnaHQgfHwgdGhpcy5jb2x1bW5XaWR0aDtcblxuICAgICAgICAvLyBlbnN1cmUgdGhlIGNvbHVtbiB3aWR0aCBpcyBub3QgYmVsb3cgdGhlIG1pbiB3aWR0aHNcbiAgICAgICAgdGhpcy5zdGFja2VkJC5uZXh0KHRoaXMuY29sdW1uV2lkdGggPCB0aGlzLm9wdGlvbnMubWluV2lkdGgpO1xuXG4gICAgICAgIC8vIGVuc3VyZSB0aGUgcm93IGhlaWdodCBpcyBub3QgYmVsb3cgdGhlIG1pbiB3aWR0aHNcbiAgICAgICAgaWYgKHRoaXMuX3Jvd0hlaWdodCA8IHRoaXMub3B0aW9ucy5taW5XaWR0aCkge1xuICAgICAgICAgICAgdGhpcy5fcm93SGVpZ2h0ID0gdGhpcy5vcHRpb25zLm1pbldpZHRoO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zZXREYXNoYm9hcmRMYXlvdXQoKTtcblxuICAgICAgICAvLyBpdGVyYXRlIHRocm91Z2ggZWFjaCB3aWRnZXQgYW5kIHNldCB0aGUgc2l6ZSAtIGV4Y2VwdCB0aGUgb25lIGJlaW5nIHJlc2l6ZWRcbiAgICAgICAgdGhpcy53aWRnZXRzLmZpbHRlcih3aWRnZXQgPT4gIXRoaXMuX2FjdGlvbldpZGdldCB8fCB3aWRnZXQgIT09IHRoaXMuX2FjdGlvbldpZGdldC53aWRnZXQpXG4gICAgICAgICAgICAuZm9yRWFjaCh3aWRnZXQgPT4gd2lkZ2V0LnJlbmRlcigpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEZXRlcm1pbmUgd2hlcmUgd2lkZ2V0cyBzaG91bGQgYmUgcG9zaXRpb25lZCBiYXNlZCBvbiB0aGVpciBwb3NpdGlvbnMsIHdpZHRoIGFuZCB0aGUgc2l6ZSBvZiB0aGUgY29udGFpbmVyXG4gICAgICovXG4gICAgc2V0RGFzaGJvYXJkTGF5b3V0KCk6IHZvaWQge1xuXG4gICAgICAgIC8vIGZpbmQgYW55IHdpZGdldHMgdGhhdCBkbyBub3QgY3VycmVudGx5IGhhdmUgYSBwb3NpdGlvbiBzZXRcbiAgICAgICAgdGhpcy53aWRnZXRzLmZpbHRlcih3aWRnZXQgPT4gd2lkZ2V0LmdldENvbHVtbigpID09PSB1bmRlZmluZWQgfHwgd2lkZ2V0LmdldFJvdygpID09PSB1bmRlZmluZWQpXG4gICAgICAgICAgICAuZm9yRWFjaCh3aWRnZXQgPT4gdGhpcy5zZXRXaWRnZXRQb3NpdGlvbih3aWRnZXQpKTtcblxuICAgICAgICB0aGlzLnNldERhc2hib2FyZEhlaWdodCgpO1xuICAgIH1cblxuICAgIHVwZGF0ZVdoZW5TdGFja2VkKCk6IHZvaWQge1xuXG4gICAgICAgIC8vIGl0ZXJhdGUgdGhyb3VnaCBlYWNoIHdpZGdldCBzZXQgaXQncyBzdGFja2VkIHN0YXRlIGFuZFxuICAgICAgICB0aGlzLmdldFdpZGdldHNCeU9yZGVyKCkuZm9yRWFjaCgod2lkZ2V0LCBpZHgpID0+IHtcbiAgICAgICAgICAgIHdpZGdldC5zZXRDb2x1bW4oMCk7XG4gICAgICAgICAgICB3aWRnZXQuc2V0Um93KGlkeCk7XG4gICAgICAgIH0pO1xuXG4gICAgfVxuXG4gICAgZ2V0V2lkZ2V0c0J5T3JkZXIoKTogRGFzaGJvYXJkV2lkZ2V0Q29tcG9uZW50W10ge1xuICAgICAgICByZXR1cm4gdGhpcy53aWRnZXRzLnNvcnQoKHcxLCB3MikgPT4ge1xuXG4gICAgICAgICAgICBjb25zdCB3MVBvc2l0aW9uID0gdzEuZ2V0Q29sdW1uKCkgKiB3MS5nZXRSb3coKTtcbiAgICAgICAgICAgIGNvbnN0IHcyUG9zaXRpb24gPSB3Mi5nZXRDb2x1bW4oKSAqIHcyLmdldFJvdygpO1xuXG4gICAgICAgICAgICBpZiAodzFQb3NpdGlvbiA8IHcyUG9zaXRpb24pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gLTE7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh3MVBvc2l0aW9uID4gdzJQb3NpdGlvbikge1xuICAgICAgICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRmluZCBhIHBvc2l0aW9uIHRoYXQgYSB3aWRnZXQgY2FuIGZpdCBpbiB0aGUgZGFzaGJvYXJkXG4gICAgICogQHBhcmFtIHdpZGdldCBUaGUgd2lkZ2V0IHRvIHRyeSBhbmQgcG9zaXRpb25cbiAgICAgKi9cbiAgICBzZXRXaWRnZXRQb3NpdGlvbih3aWRnZXQ6IERhc2hib2FyZFdpZGdldENvbXBvbmVudCk6IHZvaWQge1xuXG4gICAgICAgIC8vIGZpbmQgYSBwb3NpdGlvbiBmb3IgdGhlIHdpZGdldFxuICAgICAgICBsZXQgcG9zaXRpb24gPSAwO1xuICAgICAgICBsZXQgc3VjY2VzcyA9IGZhbHNlO1xuXG4gICAgICAgIC8vIHJlcGVhdCB1bnRpbCBhIHNwYWNlIGlzIGZvdW5kXG4gICAgICAgIHdoaWxlICghc3VjY2Vzcykge1xuXG4gICAgICAgICAgICAvLyBnZXQgYSBwb3NpdGlvbiB0byB0cnlcbiAgICAgICAgICAgIGNvbnN0IGNvbHVtbiA9IHBvc2l0aW9uICUgdGhpcy5vcHRpb25zLmNvbHVtbnM7XG4gICAgICAgICAgICBjb25zdCByb3cgPSBNYXRoLmZsb29yKHBvc2l0aW9uIC8gdGhpcy5vcHRpb25zLmNvbHVtbnMpO1xuXG4gICAgICAgICAgICAvLyBjaGVjayB0aGUgY3VycmVudCBwb3NpdGlvblxuICAgICAgICAgICAgaWYgKHRoaXMuZ2V0UG9zaXRpb25BdmFpbGFibGUoY29sdW1uLCByb3csIHdpZGdldC5nZXRDb2x1bW5TcGFuKCksIHdpZGdldC5nZXRSb3dTcGFuKCkpKSB7XG4gICAgICAgICAgICAgICAgc3VjY2VzcyA9IHRydWU7XG4gICAgICAgICAgICAgICAgd2lkZ2V0LnNldENvbHVtbihjb2x1bW4pO1xuICAgICAgICAgICAgICAgIHdpZGdldC5zZXRSb3cocm93KTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChjb2x1bW4gPT09IDAgJiYgd2lkZ2V0LmNvbFNwYW4gPiB0aGlzLm9wdGlvbnMuY29sdW1ucykge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignRGFzaGJvYXJkIHdpZGdldHMgaGF2ZSBhIGNvbFNwYW4gZ3JlYXRlciB0aGFuIHRoZSBtYXggbnVtYmVyIG9mIGRhc2hib2FyZCBjb2x1bW5zIScpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBwb3NpdGlvbisrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2hlY2sgaWYgYSBwb3NpdGlvbiBpbiB0aGUgZGFzaGJvYXJkIGlzIHZhY2FudCBvciBub3RcbiAgICAgKi9cbiAgICBnZXRQb3NpdGlvbkF2YWlsYWJsZShjb2x1bW46IG51bWJlciwgcm93OiBudW1iZXIsIGNvbHVtblNwYW46IG51bWJlciwgcm93U3BhbjogbnVtYmVyLCBpZ25vcmVXaWRnZXQ/OiBEYXNoYm9hcmRXaWRnZXRDb21wb25lbnQpOiBib29sZWFuIHtcblxuICAgICAgICAvLyBnZXQgYSBsaXN0IG9mIGdyaWQgc3BhY2VzIHRoYXQgYXJlIHBvcHVsYXRlZFxuICAgICAgICBjb25zdCBzcGFjZXMgPSB0aGlzLmdldE9jY3VwaWVkU3BhY2VzKCk7XG5cbiAgICAgICAgLy8gY2hlY2sgaWYgdGhlIGJsb2NrIHdvdWxkIHN0aWxsIGJlIGluIGJvdW5kc1xuICAgICAgICBpZiAoY29sdW1uICsgY29sdW1uU3BhbiA+IHRoaXMub3B0aW9ucy5jb2x1bW5zKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBjaGVjayBlYWNoIHJlcXVpcmVkIHBvc2l0aW9uXG4gICAgICAgIGZvciAobGV0IHggPSBjb2x1bW47IHggPCBjb2x1bW4gKyBjb2x1bW5TcGFuOyB4KyspIHtcbiAgICAgICAgICAgIGZvciAobGV0IHkgPSByb3c7IHkgPCByb3cgKyByb3dTcGFuOyB5KyspIHtcbiAgICAgICAgICAgICAgICBpZiAoc3BhY2VzLmZpbmQoYmxvY2sgPT4gYmxvY2suY29sdW1uID09PSB4ICYmIGJsb2NrLnJvdyA9PT0geSAmJiBibG9jay53aWRnZXQgIT09IGlnbm9yZVdpZGdldCkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIGdldE9jY3VwaWVkU3BhY2VzKCk6IERhc2hib2FyZFNwYWNlW10ge1xuXG4gICAgICAgIC8vIGZpbmQgYWxsIHNwYWNlcyB0aGF0IGFyZSBjdXJyZW50bHkgb2NjdXBpZWRcbiAgICAgICAgcmV0dXJuIHRoaXMud2lkZ2V0cy5maWx0ZXIod2lkZ2V0ID0+IHdpZGdldC5nZXRDb2x1bW4oKSAhPT0gdW5kZWZpbmVkICYmIHdpZGdldC5nZXRSb3coKSAhPT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgLnJlZHVjZSgodmFsdWUsIHdpZGdldCkgPT4ge1xuXG4gICAgICAgICAgICAgICAgdGhpcy5mb3JFYWNoQmxvY2sod2lkZ2V0LCAoY29sdW1uLCByb3cpID0+IHZhbHVlLnB1c2goeyB3aWRnZXQ6IHdpZGdldCwgY29sdW1uOiBjb2x1bW4sIHJvdzogcm93IH0pKTtcblxuICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgICAgIH0sIFtdKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBCZWdpbiByZXNpemluZyBhIHdpZGdldFxuICAgICAqIEBwYXJhbSBhY3Rpb24gVGhlIHRoZSB3aWRnZXQgdG8gcmVzaXplXG4gICAgICovXG4gICAgb25SZXNpemVTdGFydChhY3Rpb246IERhc2hib2FyZEFjdGlvbik6IHZvaWQge1xuXG4gICAgICAgIC8vIHN0b3JlIHRoZSBtb3VzZSBldmVudFxuICAgICAgICB0aGlzLl9tb3VzZUV2ZW50ID0gYWN0aW9uLmV2ZW50O1xuICAgICAgICB0aGlzLl9hY3Rpb25XaWRnZXQgPSBhY3Rpb247XG5cbiAgICAgICAgLy8gYnJpbmcgdGhlIHdpZGdldCB0byB0aGUgZm9udFxuICAgICAgICB0aGlzLmJyaW5nVG9Gcm9udChhY3Rpb24ud2lkZ2V0KTtcbiAgICB9XG5cbiAgICBvblJlc2l6ZURyYWcoYWN0aW9uOiBEYXNoYm9hcmRBY3Rpb24pOiB2b2lkIHtcblxuICAgICAgICBjb25zdCBtb3VzZVBvc1ggPSB0aGlzLl9tb3VzZUV2ZW50LnBhZ2VYIC0gcGFnZVhPZmZzZXQ7XG4gICAgICAgIGNvbnN0IG1vdXNlUG9zWSA9IHRoaXMuX21vdXNlRXZlbnQucGFnZVkgLSBwYWdlWU9mZnNldDtcblxuICAgICAgICAvLyBpZiB0aGVyZSB3YXMgbm8gbW92ZW1lbnQgdGhlbiBkbyBub3RoaW5nXG4gICAgICAgIGlmIChhY3Rpb24uZXZlbnQueCA9PT0gbW91c2VQb3NYICYmIGFjdGlvbi5ldmVudC55ID09PSBtb3VzZVBvc1kpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHVwZGF0ZSB0aGUgc3RvcmVkIG1vdXNlIGV2ZW50XG4gICAgICAgIHRoaXMuX21vdXNlRXZlbnQgPSBhY3Rpb24uZXZlbnQ7XG5cbiAgICAgICAgLy8gZ2V0IGhhbmRsZSBmb3IgZGlyZWN0aW9uXG4gICAgICAgIGNvbnN0IHsgaGFuZGxlIH0gPSBhY3Rpb247XG5cbiAgICAgICAgLy8gZ2V0IHRoZSBib3VuZHMgb2YgdGhlIGhhbmRsZVxuICAgICAgICBjb25zdCBib3VuZHMgPSBoYW5kbGUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cbiAgICAgICAgLy8gZ2V0IHRoZSBjZW50ZXIgb2YgdGhlIGhhbmRsZVxuICAgICAgICBjb25zdCBjZW50ZXJYID0gYm91bmRzLmxlZnQgKyAoYm91bmRzLndpZHRoIC8gMik7XG4gICAgICAgIGNvbnN0IGNlbnRlclkgPSBib3VuZHMudG9wICsgKGJvdW5kcy5oZWlnaHQgLyAyKTtcblxuICAgICAgICAvLyBnZXQgdGhlIGN1cnJlbnQgbW91c2UgcG9zaXRpb25cbiAgICAgICAgY29uc3QgbW91c2VYID0gbW91c2VQb3NYIC0gY2VudGVyWDtcbiAgICAgICAgY29uc3QgbW91c2VZID0gbW91c2VQb3NZIC0gY2VudGVyWTtcblxuICAgICAgICAvLyBzdG9yZSB0aGUgbmV3IHByb3Bvc2VkIGRpbWVuc2lvbnMgZm9yIHRoZSB3aWRnZXRcbiAgICAgICAgY29uc3QgZGltZW5zaW9uczogRGFzaGJvYXJkV2lkZ2V0RGltZW5zaW9ucyA9IHtcbiAgICAgICAgICAgIHg6IGFjdGlvbi53aWRnZXQueCxcbiAgICAgICAgICAgIHk6IGFjdGlvbi53aWRnZXQueSxcbiAgICAgICAgICAgIHdpZHRoOiBhY3Rpb24ud2lkZ2V0LndpZHRoLFxuICAgICAgICAgICAgaGVpZ2h0OiBhY3Rpb24ud2lkZ2V0LmhlaWdodFxuICAgICAgICB9O1xuXG4gICAgICAgIC8vIHVwZGF0ZSB3aWRnZXQgYmFzZWQgb24gdGhlIGhhbmRsZSBiZWluZyBkcmFnZ2VkXG4gICAgICAgIHN3aXRjaCAoYWN0aW9uLmRpcmVjdGlvbikge1xuXG4gICAgICAgICAgICBjYXNlIEFjdGlvbkRpcmVjdGlvbi5SaWdodDpcbiAgICAgICAgICAgICAgICBkaW1lbnNpb25zLndpZHRoICs9IG1vdXNlWDtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSBBY3Rpb25EaXJlY3Rpb24uTGVmdDpcbiAgICAgICAgICAgICAgICBkaW1lbnNpb25zLnggKz0gbW91c2VYO1xuICAgICAgICAgICAgICAgIGRpbWVuc2lvbnMud2lkdGggLT0gbW91c2VYO1xuXG4gICAgICAgICAgICAgICAgaWYgKGRpbWVuc2lvbnMud2lkdGggPCB0aGlzLm9wdGlvbnMubWluV2lkdGgpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZGlmZmVyZW5jZSA9IHRoaXMub3B0aW9ucy5taW5XaWR0aCAtIGRpbWVuc2lvbnMud2lkdGg7XG4gICAgICAgICAgICAgICAgICAgIGRpbWVuc2lvbnMueCAtPSBkaWZmZXJlbmNlO1xuICAgICAgICAgICAgICAgICAgICBkaW1lbnNpb25zLndpZHRoICs9IGRpZmZlcmVuY2U7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgQWN0aW9uRGlyZWN0aW9uLkJvdHRvbTpcbiAgICAgICAgICAgICAgICBkaW1lbnNpb25zLmhlaWdodCArPSBtb3VzZVk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgQWN0aW9uRGlyZWN0aW9uLlRvcDpcbiAgICAgICAgICAgICAgICBkaW1lbnNpb25zLnkgKz0gbW91c2VZO1xuICAgICAgICAgICAgICAgIGRpbWVuc2lvbnMuaGVpZ2h0IC09IG1vdXNlWTtcblxuICAgICAgICAgICAgICAgIGlmIChkaW1lbnNpb25zLmhlaWdodCA8IHRoaXMub3B0aW9ucy5taW5IZWlnaHQpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZGlmZmVyZW5jZSA9IHRoaXMub3B0aW9ucy5taW5IZWlnaHQgLSBkaW1lbnNpb25zLmhlaWdodDtcbiAgICAgICAgICAgICAgICAgICAgZGltZW5zaW9ucy55IC09IGRpZmZlcmVuY2U7XG4gICAgICAgICAgICAgICAgICAgIGRpbWVuc2lvbnMuaGVpZ2h0ICs9IGRpZmZlcmVuY2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAvLyBTdXBwb3J0IHJlc2l6aW5nIG9uIG11bHRpcGxlIGF4aXMgc2ltdWx0YW5lb3VzbHlcbiAgICAgICAgICAgIGNhc2UgQWN0aW9uRGlyZWN0aW9uLlRvcExlZnQ6XG5cbiAgICAgICAgICAgICAgICBkaW1lbnNpb25zLnggKz0gbW91c2VYO1xuICAgICAgICAgICAgICAgIGRpbWVuc2lvbnMud2lkdGggLT0gbW91c2VYO1xuXG4gICAgICAgICAgICAgICAgaWYgKGRpbWVuc2lvbnMud2lkdGggPCB0aGlzLm9wdGlvbnMubWluV2lkdGgpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZGlmZmVyZW5jZSA9IHRoaXMub3B0aW9ucy5taW5XaWR0aCAtIGRpbWVuc2lvbnMud2lkdGg7XG4gICAgICAgICAgICAgICAgICAgIGRpbWVuc2lvbnMueCAtPSBkaWZmZXJlbmNlO1xuICAgICAgICAgICAgICAgICAgICBkaW1lbnNpb25zLndpZHRoICs9IGRpZmZlcmVuY2U7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgZGltZW5zaW9ucy55ICs9IG1vdXNlWTtcbiAgICAgICAgICAgICAgICBkaW1lbnNpb25zLmhlaWdodCAtPSBtb3VzZVk7XG5cbiAgICAgICAgICAgICAgICBpZiAoZGltZW5zaW9ucy5oZWlnaHQgPCB0aGlzLm9wdGlvbnMubWluSGVpZ2h0KSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGRpZmZlcmVuY2UgPSB0aGlzLm9wdGlvbnMubWluSGVpZ2h0IC0gZGltZW5zaW9ucy5oZWlnaHQ7XG4gICAgICAgICAgICAgICAgICAgIGRpbWVuc2lvbnMueSAtPSBkaWZmZXJlbmNlO1xuICAgICAgICAgICAgICAgICAgICBkaW1lbnNpb25zLmhlaWdodCArPSBkaWZmZXJlbmNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSBBY3Rpb25EaXJlY3Rpb24uVG9wUmlnaHQ6XG4gICAgICAgICAgICAgICAgZGltZW5zaW9ucy53aWR0aCArPSBtb3VzZVg7XG4gICAgICAgICAgICAgICAgZGltZW5zaW9ucy55ICs9IG1vdXNlWTtcbiAgICAgICAgICAgICAgICBkaW1lbnNpb25zLmhlaWdodCAtPSBtb3VzZVk7XG5cbiAgICAgICAgICAgICAgICBpZiAoZGltZW5zaW9ucy5oZWlnaHQgPCB0aGlzLm9wdGlvbnMubWluSGVpZ2h0KSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGRpZmZlcmVuY2UgPSB0aGlzLm9wdGlvbnMubWluSGVpZ2h0IC0gZGltZW5zaW9ucy5oZWlnaHQ7XG4gICAgICAgICAgICAgICAgICAgIGRpbWVuc2lvbnMueSAtPSBkaWZmZXJlbmNlO1xuICAgICAgICAgICAgICAgICAgICBkaW1lbnNpb25zLmhlaWdodCArPSBkaWZmZXJlbmNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSBBY3Rpb25EaXJlY3Rpb24uQm90dG9tTGVmdDpcbiAgICAgICAgICAgICAgICBkaW1lbnNpb25zLmhlaWdodCArPSBtb3VzZVk7XG4gICAgICAgICAgICAgICAgZGltZW5zaW9ucy54ICs9IG1vdXNlWDtcbiAgICAgICAgICAgICAgICBkaW1lbnNpb25zLndpZHRoIC09IG1vdXNlWDtcblxuICAgICAgICAgICAgICAgIGlmIChkaW1lbnNpb25zLndpZHRoIDwgdGhpcy5vcHRpb25zLm1pbldpZHRoKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGRpZmZlcmVuY2UgPSB0aGlzLm9wdGlvbnMubWluV2lkdGggLSBkaW1lbnNpb25zLndpZHRoO1xuICAgICAgICAgICAgICAgICAgICBkaW1lbnNpb25zLnggLT0gZGlmZmVyZW5jZTtcbiAgICAgICAgICAgICAgICAgICAgZGltZW5zaW9ucy53aWR0aCArPSBkaWZmZXJlbmNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSBBY3Rpb25EaXJlY3Rpb24uQm90dG9tUmlnaHQ6XG4gICAgICAgICAgICAgICAgZGltZW5zaW9ucy5oZWlnaHQgKz0gbW91c2VZO1xuICAgICAgICAgICAgICAgIGRpbWVuc2lvbnMud2lkdGggKz0gbW91c2VYO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgY3VycmVudFdpZHRoID0gYWN0aW9uLndpZGdldC54ICsgYWN0aW9uLndpZGdldC53aWR0aDtcbiAgICAgICAgY29uc3QgY3VycmVudEhlaWdodCA9IGFjdGlvbi53aWRnZXQueSArIGFjdGlvbi53aWRnZXQuaGVpZ2h0O1xuXG4gICAgICAgIC8vIGVuc3VyZSB2YWx1ZXMgYXJlIHdpdGhpbiB0aGUgZGFzaGJvYXJkIGJvdW5kc1xuICAgICAgICBpZiAoZGltZW5zaW9ucy54IDwgMCkge1xuICAgICAgICAgICAgZGltZW5zaW9ucy54ID0gMDtcbiAgICAgICAgICAgIGRpbWVuc2lvbnMud2lkdGggPSBjdXJyZW50V2lkdGg7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZGltZW5zaW9ucy55IDwgMCkge1xuICAgICAgICAgICAgZGltZW5zaW9ucy55ID0gMDtcbiAgICAgICAgICAgIGRpbWVuc2lvbnMuaGVpZ2h0ID0gY3VycmVudEhlaWdodDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICgoZGltZW5zaW9ucy54ICsgZGltZW5zaW9ucy53aWR0aCkgPiB0aGlzLmRpbWVuc2lvbnMud2lkdGgpIHtcbiAgICAgICAgICAgIGRpbWVuc2lvbnMud2lkdGggPSB0aGlzLmRpbWVuc2lvbnMud2lkdGggLSBkaW1lbnNpb25zLng7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBpZiB0aGUgcHJvcG9zZWQgd2lkdGggaXMgc21hbGxlciB0aGFuIGFsbG93ZWQgdGhlbiByZXNldCB3aWR0aCB0byBtaW5pbXVtIGFuZCBpZ25vcmUgeCBjaGFuZ2VzXG4gICAgICAgIGlmIChkaW1lbnNpb25zLndpZHRoIDwgdGhpcy5vcHRpb25zLm1pbldpZHRoKSB7XG4gICAgICAgICAgICBkaW1lbnNpb25zLnggPSBhY3Rpb24ud2lkZ2V0Lng7XG4gICAgICAgICAgICBkaW1lbnNpb25zLndpZHRoID0gdGhpcy5vcHRpb25zLm1pbldpZHRoO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gaWYgdGhlIHByb3Bvc2VkIGhlaWdodCBpcyBzbWFsbGVyIHRoYW4gYWxsb3dlZCB0aGVuIHJlc2V0IGhlaWdodCB0byBtaW5pbXVtIGFuZCBpZ25vcmUgeSBjaGFuZ2VzXG4gICAgICAgIGlmIChkaW1lbnNpb25zLmhlaWdodCA8IHRoaXMub3B0aW9ucy5taW5IZWlnaHQpIHtcbiAgICAgICAgICAgIGRpbWVuc2lvbnMueSA9IGFjdGlvbi53aWRnZXQueTtcbiAgICAgICAgICAgIGRpbWVuc2lvbnMuaGVpZ2h0ID0gdGhpcy5vcHRpb25zLm1pbkhlaWdodDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHVwZGF0ZSB0aGUgd2lkZ2V0IGFjdHVhbCB2YWx1ZXNcbiAgICAgICAgYWN0aW9uLndpZGdldC5zZXRCb3VuZHMoZGltZW5zaW9ucy54LCBkaW1lbnNpb25zLnksIGRpbWVuc2lvbnMud2lkdGgsIGRpbWVuc2lvbnMuaGVpZ2h0KTtcblxuICAgICAgICAvLyB1cGRhdGUgcGxhY2Vob2xkZXIgcG9zaXRpb24gYW5kIHZhbHVlXG4gICAgICAgIHRoaXMuc2V0UGxhY2Vob2xkZXJCb3VuZHModHJ1ZSwgZGltZW5zaW9ucy54LCBkaW1lbnNpb25zLnksIGRpbWVuc2lvbnMud2lkdGgsIGRpbWVuc2lvbnMuaGVpZ2h0KTtcblxuICAgICAgICAvLyBzaG93IHRoZSB3aWRnZXQgcG9zaXRpb25zIGlmIHRoZSBjdXJyZW50IHBvc2l0aW9ucyBhbmQgc2l6ZXMgd2VyZSB0byBwZXJzaXN0XG4gICAgICAgIHRoaXMudXBkYXRlV2lkZ2V0UG9zaXRpb25zKGFjdGlvbi53aWRnZXQpO1xuICAgIH1cblxuICAgIG9uUmVzaXplRW5kKCk6IHZvaWQge1xuXG4gICAgICAgIGNvbnN0IHBsYWNlaG9sZGVyID0gdGhpcy5wbGFjZWhvbGRlciQuZ2V0VmFsdWUoKTtcblxuICAgICAgICAvLyBjb21taXQgcmVzaXplIGNoYW5nZXNcbiAgICAgICAgdGhpcy5jb21taXRXaWRnZXRDaGFuZ2VzKCk7XG5cbiAgICAgICAgLy8gaGlkZSBwbGFjZWhvbGRlclxuICAgICAgICBwbGFjZWhvbGRlci52aXNpYmxlID0gZmFsc2U7XG5cbiAgICAgICAgLy8gdXBkYXRlIHRoZSBwbGFjZWhvbGRlclxuICAgICAgICB0aGlzLnBsYWNlaG9sZGVyJC5uZXh0KHBsYWNlaG9sZGVyKTtcblxuICAgICAgICB0aGlzLl9hY3Rpb25XaWRnZXQgPSBudWxsO1xuICAgICAgICB0aGlzLl9tb3VzZUV2ZW50ID0gbnVsbDtcblxuICAgICAgICAvLyBlbnN1cmUgYW55IHZhY2FudCB1cHBlciBzcGFjZXMgYXJlIGZpbGxlZCB3aGVyZSByZXF1aXJlZFxuICAgICAgICB0aGlzLnNoaWZ0V2lkZ2V0c1VwKCk7XG5cbiAgICAgICAgLy8gdXBkYXRlIGRhc2hib2FyZCBoZWlnaHRcbiAgICAgICAgdGhpcy5zZXREYXNoYm9hcmRIZWlnaHQoKTtcblxuICAgICAgICAvLyBlbWl0IGluZm9ybWF0aW9uIGFib3V0IHRoZSBsYXlvdXRcbiAgICAgICAgdGhpcy5sYXlvdXQkLm5leHQodGhpcy5nZXRMYXlvdXREYXRhKCkpO1xuICAgIH1cblxuICAgIG9uRHJhZ1N0YXJ0KGFjdGlvbjogRGFzaGJvYXJkQWN0aW9uKTogdm9pZCB7XG4gICAgICAgIHRoaXMub25SZXNpemVTdGFydChhY3Rpb24pO1xuXG4gICAgICAgIC8vIHN0b3JlIHRoZSBzdGFydGluZyBwbGFjZWhvbGRlciBwb3NpdGlvblxuICAgICAgICB0aGlzLnNldFdpZGdldE9yaWdpbigpO1xuXG4gICAgICAgIHRoaXMuY2FjaGVXaWRnZXRzKCk7XG4gICAgfVxuXG4gICAgb25EcmFnRW5kKCk6IHZvaWQge1xuICAgICAgICB0aGlzLm9uUmVzaXplRW5kKCk7XG5cbiAgICAgICAgdGhpcy5fd2lkZ2V0T3JpZ2luID0ge307XG4gICAgfVxuXG4gICAgb25EcmFnKGFjdGlvbjogRGFzaGJvYXJkQWN0aW9uKTogdm9pZCB7XG5cbiAgICAgICAgLy8gaWYgdGhlcmUgd2FzIG5vIG1vdmVtZW50IHRoZW4gZG8gbm90aGluZ1xuICAgICAgICBpZiAoYWN0aW9uLmV2ZW50LnBhZ2VYID09PSB0aGlzLl9tb3VzZUV2ZW50LnBhZ2VYICYmIGFjdGlvbi5ldmVudC5wYWdlWSA9PT0gdGhpcy5fbW91c2VFdmVudC5wYWdlWSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gZ2V0IHRoZSBjdXJyZW50IG1vdXNlIHBvc2l0aW9uXG4gICAgICAgIGNvbnN0IG1vdXNlWCA9IGFjdGlvbi5ldmVudC5wYWdlWCAtIHRoaXMuX21vdXNlRXZlbnQucGFnZVg7XG4gICAgICAgIGNvbnN0IG1vdXNlWSA9IGFjdGlvbi5ldmVudC5wYWdlWSAtIHRoaXMuX21vdXNlRXZlbnQucGFnZVk7XG5cbiAgICAgICAgLy8gc3RvcmUgdGhlIGxhdGVzdCBldmVudFxuICAgICAgICB0aGlzLl9tb3VzZUV2ZW50ID0gYWN0aW9uLmV2ZW50O1xuXG4gICAgICAgIGNvbnN0IGRpbWVuc2lvbnM6IERhc2hib2FyZFdpZGdldERpbWVuc2lvbnMgPSB7XG4gICAgICAgICAgICB4OiBhY3Rpb24ud2lkZ2V0LnggKyBtb3VzZVgsXG4gICAgICAgICAgICB5OiBhY3Rpb24ud2lkZ2V0LnkgKyBtb3VzZVksXG4gICAgICAgICAgICB3aWR0aDogYWN0aW9uLndpZGdldC53aWR0aCxcbiAgICAgICAgICAgIGhlaWdodDogYWN0aW9uLndpZGdldC5oZWlnaHRcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLnJlc3RvcmVXaWRnZXRzKHRydWUpO1xuXG4gICAgICAgIC8vIHVwZGF0ZSB3aWRnZXQgcG9zaXRpb25cbiAgICAgICAgYWN0aW9uLndpZGdldC5zZXRCb3VuZHMoZGltZW5zaW9ucy54LCBkaW1lbnNpb25zLnksIGRpbWVuc2lvbnMud2lkdGgsIGRpbWVuc2lvbnMuaGVpZ2h0KTtcblxuICAgICAgICAvLyB1cGRhdGUgcGxhY2Vob2xkZXIgcG9zaXRpb24gYW5kIHZhbHVlXG4gICAgICAgIHRoaXMuc2V0UGxhY2Vob2xkZXJCb3VuZHModHJ1ZSwgZGltZW5zaW9ucy54LCBkaW1lbnNpb25zLnksIGRpbWVuc2lvbnMud2lkdGgsIGRpbWVuc2lvbnMuaGVpZ2h0KTtcblxuICAgICAgICAvLyBzaG93IHRoZSB3aWRnZXQgcG9zaXRpb25zIGlmIHRoZSBjdXJyZW50IHBvc2l0aW9ucyBhbmQgc2l6ZXMgd2VyZSB0byBwZXJzaXN0XG4gICAgICAgIHRoaXMuc2hpZnRXaWRnZXRzKCk7XG5cbiAgICAgICAgdGhpcy5zZXREYXNoYm9hcmRIZWlnaHQoKTtcbiAgICB9XG5cbiAgICBnZXRSb3dIZWlnaHQoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Jvd0hlaWdodDtcbiAgICB9XG5cbiAgICBjYWNoZVdpZGdldHMoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX2NhY2hlID0gdGhpcy53aWRnZXRzLm1hcCh3aWRnZXQgPT4gKHsgaWQ6IHdpZGdldC5pZCwgY29sdW1uOiB3aWRnZXQuZ2V0Q29sdW1uKCksIHJvdzogd2lkZ2V0LmdldFJvdygpIH0pKTtcbiAgICB9XG5cbiAgICByZXN0b3JlV2lkZ2V0cyhpZ25vcmVBY3Rpb25XaWRnZXQ6IGJvb2xlYW4gPSBmYWxzZSk6IHZvaWQge1xuICAgICAgICB0aGlzLl9jYWNoZS5maWx0ZXIod2lkZ2V0ID0+ICFpZ25vcmVBY3Rpb25XaWRnZXQgfHwgd2lkZ2V0LmlkICE9PSB0aGlzLl9hY3Rpb25XaWRnZXQud2lkZ2V0LmlkKS5mb3JFYWNoKHdpZGdldCA9PiB7XG5cbiAgICAgICAgICAgIGNvbnN0IG1hdGNoID0gdGhpcy53aWRnZXRzLmZpbmQod2d0ID0+IHdndC5pZCA9PT0gd2lkZ2V0LmlkKTtcblxuICAgICAgICAgICAgaWYgKG1hdGNoKSB7XG4gICAgICAgICAgICAgICAgbWF0Y2guc2V0Q29sdW1uKHdpZGdldC5jb2x1bW4pO1xuICAgICAgICAgICAgICAgIG1hdGNoLnNldFJvdyh3aWRnZXQucm93KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogV2hlbiBkcmFnZ2luZyBhbnkgd2lkZ2V0cyB0aGF0IG5lZWQgdG8gYmUgbW92ZWQgc2hvdWxkIGJlIG1vdmVkIHRvIGFuIGFwcHJvcHJpYXRlIHBvc2l0aW9uXG4gICAgICovXG4gICAgc2hpZnRXaWRnZXRzKCk6IHZvaWQge1xuXG4gICAgICAgIGxldCB3aWRnZXRzVG9Nb3ZlOiBEYXNoYm9hcmRXaWRnZXRDb21wb25lbnRbXSA9IFtdO1xuXG4gICAgICAgIGNvbnN0IHBsYWNlaG9sZGVyID0gdGhpcy5wbGFjZWhvbGRlciQuZ2V0VmFsdWUoKTtcblxuICAgICAgICAvLyBjaGVjayBpZiB0aGVyZSBhcmUgYW55IHdpZGdldHMgdW5kZXIgdGhlIHBsYWNlaG9sZGVyXG4gICAgICAgIGZvciAobGV0IHJvdyA9IHBsYWNlaG9sZGVyLnJvdzsgcm93IDwgcGxhY2Vob2xkZXIucm93ICsgcGxhY2Vob2xkZXIucm93U3Bhbjsgcm93KyspIHtcbiAgICAgICAgICAgIGZvciAobGV0IGNvbHVtbiA9IHBsYWNlaG9sZGVyLmNvbHVtbjsgY29sdW1uIDwgcGxhY2Vob2xkZXIuY29sdW1uICsgcGxhY2Vob2xkZXIuY29sdW1uU3BhbjsgY29sdW1uKyspIHtcblxuICAgICAgICAgICAgICAgIC8vIHN0b3JlIHJlZmVyZW5jZSB0byBhbnkgd2lkZ2V0cyB0aGF0IG5lZWQgbW92ZWRcbiAgICAgICAgICAgICAgICB0aGlzLmdldE9jY3VwaWVkU3BhY2VzKClcbiAgICAgICAgICAgICAgICAgICAgLmZpbHRlcihzcGFjZSA9PiBzcGFjZS5jb2x1bW4gPT09IGNvbHVtbiAmJiBzcGFjZS5yb3cgPT09IHJvdyAmJiBzcGFjZS53aWRnZXQgIT09IHRoaXMuX2FjdGlvbldpZGdldC53aWRnZXQpXG4gICAgICAgICAgICAgICAgICAgIC5mb3JFYWNoKHNwYWNlID0+IHdpZGdldHNUb01vdmUucHVzaChzcGFjZS53aWRnZXQpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHJlbW92ZSBhbnkgZHVwbGljYXRlc1xuICAgICAgICB3aWRnZXRzVG9Nb3ZlID0gd2lkZ2V0c1RvTW92ZS5maWx0ZXIoKHdpZGdldCwgaWR4LCBhcnJheSkgPT4gYXJyYXkuaW5kZXhPZih3aWRnZXQpID09PSBpZHgpO1xuXG4gICAgICAgIC8vIGlmIG5vIHdpZGdldHMgbmVlZCBtb3ZlZCB0aGVuIHdlIGNhbiBzdG9wIGhlcmVcbiAgICAgICAgaWYgKHdpZGdldHNUb01vdmUubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyBjcmVhdGUgYSBkdXBsaWNhdGUgd2UgY2FuIHVzZSB0byBrZWVwIHRyYWNrIG9mIHdoaWNoIGhhdmUgYmVlbiBtb3ZlZFxuICAgICAgICBjb25zdCB1bm1vdmVkV2lkZ2V0cyA9IHdpZGdldHNUb01vdmUuc2xpY2UoKTtcblxuICAgICAgICAvLyBhdHRlbXB0IHRvIG1vdmUgYW55IHdpZGdldHMgdG8gdGhlIHByZXZpb3VzIHdpZGdldCBwb3NpdGlvblxuICAgICAgICB3aWRnZXRzVG9Nb3ZlLmZvckVhY2god2lkZ2V0ID0+IHtcblxuICAgICAgICAgICAgLy8gZ2V0IGEgZ3JpZCBvZmYgYWxsIG9jY3VwaWVkIHNwYWNlcyAtIHRha2luZyBpbnRvIGFjY291bnQgdGhlIHBsYWNlaG9sZGVyIGFuZCBpZ25vcmluZyB3aWRnZXRzIHRoYXQgbmVlZCBtb3ZlZFxuICAgICAgICAgICAgY29uc3QgZ3JpZCA9IHRoaXMuZ2V0T2NjdXBpZWRTcGFjZXMoKS5maWx0ZXIoc3BhY2UgPT4gIXVubW92ZWRXaWRnZXRzLmZpbmQod2d0ID0+IHdndCA9PT0gc3BhY2Uud2lkZ2V0KSk7XG5cbiAgICAgICAgICAgIC8vIGl0ZXJhdGUgZWFjaCBmcmVlIGJsb2NrXG4gICAgICAgICAgICBmb3IgKGxldCByb3cgPSB0aGlzLl93aWRnZXRPcmlnaW4ucm93OyByb3cgPCB0aGlzLl93aWRnZXRPcmlnaW4ucm93ICsgdGhpcy5fd2lkZ2V0T3JpZ2luLnJvd1NwYW47IHJvdysrKSB7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgY29sdW1uID0gdGhpcy5fd2lkZ2V0T3JpZ2luLmNvbHVtbjsgY29sdW1uIDwgdGhpcy5fd2lkZ2V0T3JpZ2luLmNvbHVtbiArIHRoaXMuX3dpZGdldE9yaWdpbi5jb2x1bW5TcGFuOyBjb2x1bW4rKykge1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIGRldGVybWluZSBpZiB0aGUgYmxvY2sgY2FuIGZpdCBpbiB0aGlzIHNwYWNlXG4gICAgICAgICAgICAgICAgICAgIGxldCByZXF1aXJlZFNwYWNlcyA9IHRoaXMuZ2V0UmVxdWlyZWRTcGFjZXNGcm9tUG9pbnQod2lkZ2V0LCBjb2x1bW4sIHJvdyk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gY2hlY2sgaWYgd2lkZ2V0IHdvdWxkIGZpdCBpbiBzcGFjZVxuICAgICAgICAgICAgICAgICAgICBsZXQgYXZhaWxhYmxlID0gcmVxdWlyZWRTcGFjZXMuZXZlcnkoc3BhY2UgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICFncmlkLmZpbmQoZ3JpZFNwYWNlID0+IGdyaWRTcGFjZS5jb2x1bW4gPT09IHNwYWNlLmNvbHVtbiAmJiBncmlkU3BhY2Uucm93ID09PSBzcGFjZS5yb3cpICYmIHNwYWNlLmNvbHVtbiA8IHRoaXMuZ2V0Q29sdW1uQ291bnQoKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGF2YWlsYWJsZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgd2lkZ2V0LnNldENvbHVtbihjb2x1bW4pO1xuICAgICAgICAgICAgICAgICAgICAgICAgd2lkZ2V0LnNldFJvdyhyb3cpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdW5tb3ZlZFdpZGdldHMuc3BsaWNlKHVubW92ZWRXaWRnZXRzLmZpbmRJbmRleCh3Z3QgPT4gd2d0ID09PSB3aWRnZXQpLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gaWYgd2UgZ2V0IHRvIGhlcmUgdGhlbiB3ZSBjYW4ndCBzaW1wbHkgc3dhcCB0aGUgcG9zaXRpb25zIC0gbmV4dCB0cnkgbW92aW5nIHJpZ2h0XG4gICAgICAgICAgICBpZiAodGhpcy5jYW5XaWRnZXRNb3ZlUmlnaHQod2lkZ2V0LCB0cnVlKSkge1xuXG4gICAgICAgICAgICAgICAgLy8gYWZ0ZXIgdGhlIHNoaWZ0IGNoZWNrIGlmIHBsYWNlaG9sZGVyIHBvc2l0aW9uIGlzIHN0aWxsIHZhbGlkXG4gICAgICAgICAgICAgICAgdGhpcy52YWxpZGF0ZVBsYWNlaG9sZGVyUG9zaXRpb24oQWN0aW9uRGlyZWN0aW9uLlJpZ2h0KTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIG5leHQgdHJ5IG1vdmluZyBsZWZ0XG4gICAgICAgICAgICBpZiAodGhpcy5jYW5XaWRnZXRNb3ZlTGVmdCh3aWRnZXQsIHRydWUpKSB7XG5cbiAgICAgICAgICAgICAgICAvLyBhZnRlciB0aGUgc2hpZnQgY2hlY2sgaWYgcGxhY2Vob2xkZXIgcG9zaXRpb24gaXMgc3RpbGwgdmFsaWRcbiAgICAgICAgICAgICAgICB0aGlzLnZhbGlkYXRlUGxhY2Vob2xkZXJQb3NpdGlvbihBY3Rpb25EaXJlY3Rpb24uTGVmdCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBkZXRlcm1pbmUgdGhlIGRpc3RhbmNlIHRoYXQgdGhlIHdpZGdldCBuZWVkcyB0byBiZSBtb3ZlZCBkb3duXG4gICAgICAgICAgICBsZXQgZGlzdGFuY2UgPSAodGhpcy5fYWN0aW9uV2lkZ2V0LndpZGdldC5nZXRSb3coKSAtIHdpZGdldC5nZXRSb3coKSkgKyB0aGlzLl9hY3Rpb25XaWRnZXQud2lkZ2V0LmdldFJvd1NwYW4oKTtcblxuICAgICAgICAgICAgLy8gYXMgYSBsYXN0IHJlc29ydCBtb3ZlIHRoZSB3aWRnZXQgZG93bndhcmRzXG4gICAgICAgICAgICB0aGlzLm1vdmVXaWRnZXREb3duKHdpZGdldCwgZGlzdGFuY2UpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBZnRlciBzaGlmdHMgaGF2ZSB0YWtlbiBwbGFjZSB3ZSBzaG91bGQgdmVyaWZ5IHRoZSBwbGFjZSBob2xkZXIgcG9zaXRpb24gaXMgc3RpbGwgdmFsaWRcbiAgICAgKiBAcGFyYW0gc2hpZnREaXJlY3Rpb24gLSB0aGUgcG9zaXRpb24gd2lkZ2V0cyB3ZXJlIHNoaWZ0ZWRcbiAgICAgKi9cbiAgICB2YWxpZGF0ZVBsYWNlaG9sZGVyUG9zaXRpb24oc2hpZnREaXJlY3Rpb246IEFjdGlvbkRpcmVjdGlvbikge1xuXG4gICAgICAgIGNvbnN0IHBsYWNlaG9sZGVyID0gdGhpcy5wbGFjZWhvbGRlciQuZ2V0VmFsdWUoKTtcblxuICAgICAgICAvLyBjaGVjayBpZiB0aGUgcGxhY2Vob2xkZXIgaXMgb3ZlciBhIHdpZGdldFxuICAgICAgICBpZiAodGhpcy5nZXRXaWRnZXRzQXRQb3NpdGlvbihwbGFjZWhvbGRlci5jb2x1bW4sIHBsYWNlaG9sZGVyLnJvdywgdHJ1ZSkubGVuZ3RoID4gMCkge1xuXG4gICAgICAgICAgICAvLyBtb3ZlIHRoZSBwbGFjZWhvbGRlciB0aGUgb3Bwb3NpdGUgZGlyZWN0aW9uXG4gICAgICAgICAgICBzd2l0Y2ggKHNoaWZ0RGlyZWN0aW9uKSB7XG5cbiAgICAgICAgICAgICAgICBjYXNlIEFjdGlvbkRpcmVjdGlvbi5MZWZ0OlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFBsYWNlaG9sZGVyQm91bmRzKHBsYWNlaG9sZGVyLnZpc2libGUsIHBsYWNlaG9sZGVyLnggKyB0aGlzLmdldENvbHVtbldpZHRoKCksIHBsYWNlaG9sZGVyLnksIHBsYWNlaG9sZGVyLndpZHRoLCBwbGFjZWhvbGRlci5oZWlnaHQpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgQWN0aW9uRGlyZWN0aW9uLlJpZ2h0OlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFBsYWNlaG9sZGVyQm91bmRzKHBsYWNlaG9sZGVyLnZpc2libGUsIHBsYWNlaG9sZGVyLnggLSB0aGlzLmdldENvbHVtbldpZHRoKCksIHBsYWNlaG9sZGVyLnksIHBsYWNlaG9sZGVyLndpZHRoLCBwbGFjZWhvbGRlci5oZWlnaHQpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gdmFsaWRhdGUgdGhpcyBuZXcgcG9zaXRpb24gYWdhaW5cbiAgICAgICAgICAgIHRoaXMudmFsaWRhdGVQbGFjZWhvbGRlclBvc2l0aW9uKHNoaWZ0RGlyZWN0aW9uKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERldGVybWluZSBpZiBhIHdpZGdldCBjYW4gYmUgbW92ZWQgbGVmdCAtIG9yIGlmIGl0IGNhbiBtb3ZlIHRoZSB3aWRnZXRzIHRvIHRoZSByaWdodCB0byBtYWtlIHNwYWNlIGZvciB0aGUgd2lkZ2V0XG4gICAgICovXG4gICAgY2FuV2lkZ2V0TW92ZUxlZnQod2lkZ2V0OiBEYXNoYm9hcmRXaWRnZXRDb21wb25lbnQsIHBlcmZvcm1Nb3ZlOiBib29sZWFuID0gZmFsc2UpOiBib29sZWFuIHtcblxuICAgICAgICAvLyBjaGVjayBpZiB0aGUgd2lkZ2V0IGlzIHRoZSBhY3Rpb24gd2lkZ2V0IG9yIG9jY3VwaWVzIHRoZSBmaXJzdCBjb2x1bW5cbiAgICAgICAgaWYgKHdpZGdldCA9PT0gdGhpcy5fYWN0aW9uV2lkZ2V0LndpZGdldCB8fCB3aWRnZXQuZ2V0Q29sdW1uKCkgPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGZpbmQgdGhlIHBvc2l0aW9ucyByZXF1aXJlZFxuICAgICAgICBjb25zdCB0YXJnZXRTcGFjZXMgPSB0aGlzLmdldE9jY3VwaWVkU3BhY2VzKCkuZmlsdGVyKHNwYWNlID0+IHNwYWNlLndpZGdldCA9PT0gd2lkZ2V0KS5tYXAoc3BhY2UgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHsgY29sdW1uOiBzcGFjZS5jb2x1bW4gLSB3aWRnZXQuZ2V0Q29sdW1uU3BhbigpLCByb3c6IHNwYWNlLnJvdywgd2lkZ2V0OiBzcGFjZS53aWRnZXQgfTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gY2hlY2sgaWYgdGhlcmUgYXJlIHdpZGdldCBpbiB0aGUgcmVxdWlyZWQgcG9zaXRpb25zIGFuZCBpZiBzbywgY2FuIHRoZXkgbW92ZSByaWdodD9cbiAgICAgICAgY29uc3QgbW92ZWFibGUgPSB0YXJnZXRTcGFjZXMuZXZlcnkoc3BhY2UgPT4gdGhpcy5nZXRXaWRnZXRzQXRQb3NpdGlvbihzcGFjZS5jb2x1bW4sIHNwYWNlLnJvdykuZmlsdGVyKHdndCA9PiB3Z3QgIT09IHNwYWNlLndpZGdldCkuZXZlcnkod2d0ID0+IHRoaXMuY2FuV2lkZ2V0TW92ZUxlZnQod2d0KSkpO1xuXG4gICAgICAgIGlmIChwZXJmb3JtTW92ZSAmJiBtb3ZlYWJsZSkge1xuXG4gICAgICAgICAgICAvLyBtb3ZlIGFsbCB3aWRnZXRzIHRvIHRoZSByaWdodFxuICAgICAgICAgICAgdGFyZ2V0U3BhY2VzLmZvckVhY2goc3BhY2UgPT4gdGhpcy5nZXRXaWRnZXRzQXRQb3NpdGlvbihzcGFjZS5jb2x1bW4sIHNwYWNlLnJvdykuZmlsdGVyKHdndCA9PiB3Z3QgIT09IHNwYWNlLndpZGdldCkuZm9yRWFjaCh3Z3QgPT4gdGhpcy5jYW5XaWRnZXRNb3ZlTGVmdCh3Z3QsIHRydWUpKSk7XG5cbiAgICAgICAgICAgIC8vIG1vdmUgY3VycmVudCB3aWRnZXQgdG8gdGhlIHJpZ2h0XG4gICAgICAgICAgICB3aWRnZXQuc2V0Q29sdW1uKHdpZGdldC5nZXRDb2x1bW4oKSAtIDEpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG1vdmVhYmxlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERldGVybWluZSBpZiBhIHdpZGdldCBjYW4gYmUgbW92ZWQgcmlnaHQgLSBvciBpZiBpdCBjYW4gbW92ZSB0aGUgd2lkZ2V0cyB0byB0aGUgcmlnaHQgdG8gbWFrZSBzcGFjZSBmb3IgdGhlIHdpZGdldFxuICAgICAqL1xuICAgIGNhbldpZGdldE1vdmVSaWdodCh3aWRnZXQ6IERhc2hib2FyZFdpZGdldENvbXBvbmVudCwgcGVyZm9ybU1vdmU6IGJvb2xlYW4gPSBmYWxzZSk6IGJvb2xlYW4ge1xuXG4gICAgICAgIC8vIGNoZWNrIGlmIHRoZSB3aWRnZXQgaXMgdGhlIGRyYWdnaW5nIHdpZGdldCBvciB0aGUgd2lkZ2V0IG9jY3VwaWVzIHRoZSBmaW5hbCBjb2x1bW5cbiAgICAgICAgaWYgKHdpZGdldCA9PT0gdGhpcy5fYWN0aW9uV2lkZ2V0LndpZGdldCB8fCB3aWRnZXQuZ2V0Q29sdW1uKCkgKyB3aWRnZXQuZ2V0Q29sdW1uU3BhbigpID09PSB0aGlzLm9wdGlvbnMuY29sdW1ucykge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gZmluZCB0aGUgcG9zaXRpb25zIHJlcXVpcmVkXG4gICAgICAgIGNvbnN0IHRhcmdldFNwYWNlcyA9IHRoaXMuZ2V0T2NjdXBpZWRTcGFjZXMoKS5maWx0ZXIoc3BhY2UgPT4gc3BhY2Uud2lkZ2V0ID09PSB3aWRnZXQpLm1hcChzcGFjZSA9PiB7XG4gICAgICAgICAgICByZXR1cm4geyBjb2x1bW46IHNwYWNlLmNvbHVtbiArIHdpZGdldC5nZXRDb2x1bW5TcGFuKCksIHJvdzogc3BhY2Uucm93LCB3aWRnZXQ6IHNwYWNlLndpZGdldCB9O1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyBjaGVjayBpZiB0aGVyZSBhcmUgd2lkZ2V0IGluIHRoZSByZXF1aXJlZCBwb3NpdGlvbnMgYW5kIGlmIHNvLCBjYW4gdGhleSBtb3ZlIHJpZ2h0P1xuICAgICAgICBjb25zdCBtb3ZlYWJsZSA9IHRhcmdldFNwYWNlcy5ldmVyeShzcGFjZSA9PiB0aGlzLmdldFdpZGdldHNBdFBvc2l0aW9uKHNwYWNlLmNvbHVtbiwgc3BhY2Uucm93KS5maWx0ZXIod2d0ID0+IHdndCAhPT0gc3BhY2Uud2lkZ2V0KS5ldmVyeSh3Z3QgPT4gdGhpcy5jYW5XaWRnZXRNb3ZlUmlnaHQod2d0KSkpO1xuXG4gICAgICAgIGlmIChwZXJmb3JtTW92ZSAmJiBtb3ZlYWJsZSkge1xuXG4gICAgICAgICAgICAvLyBtb3ZlIGFsbCB3aWRnZXRzIHRvIHRoZSByaWdodFxuICAgICAgICAgICAgdGFyZ2V0U3BhY2VzLmZvckVhY2goc3BhY2UgPT4gdGhpcy5nZXRXaWRnZXRzQXRQb3NpdGlvbihzcGFjZS5jb2x1bW4sIHNwYWNlLnJvdykuZmlsdGVyKHdndCA9PiB3Z3QgIT09IHNwYWNlLndpZGdldCkuZm9yRWFjaCh3Z3QgPT4gdGhpcy5jYW5XaWRnZXRNb3ZlUmlnaHQod2d0LCB0cnVlKSkpO1xuXG4gICAgICAgICAgICAvLyBtb3ZlIGN1cnJlbnQgd2lkZ2V0IHRvIHRoZSByaWdodFxuICAgICAgICAgICAgd2lkZ2V0LnNldENvbHVtbih3aWRnZXQuZ2V0Q29sdW1uKCkgKyAxKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBtb3ZlYWJsZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTdG9yZSB0aGUgaW5pdGlhbCBwb3NpdGlvbiBvZiB0aGUgd2lkZ2V0IGJlaW5nIGRyYWdnZWRcbiAgICAgKi9cbiAgICBzZXRXaWRnZXRPcmlnaW4oKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX3dpZGdldE9yaWdpbiA9IHtcbiAgICAgICAgICAgIGNvbHVtbjogdGhpcy5fYWN0aW9uV2lkZ2V0LndpZGdldC5nZXRDb2x1bW4oKSxcbiAgICAgICAgICAgIHJvdzogdGhpcy5fYWN0aW9uV2lkZ2V0LndpZGdldC5nZXRSb3coKSxcbiAgICAgICAgICAgIGNvbHVtblNwYW46IHRoaXMuX2FjdGlvbldpZGdldC53aWRnZXQuZ2V0Q29sdW1uU3BhbigpLFxuICAgICAgICAgICAgcm93U3BhbjogdGhpcy5fYWN0aW9uV2lkZ2V0LndpZGdldC5nZXRSb3dTcGFuKClcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDYWxjdWxhdGUgYWxsIHRoZSByZXF1aXJlZCBwb3NpdGlvbnMgaXMgYSB3aWRnZXQgd2FzIHRvIGJlIHBvc2l0aW9uZWQgYXQgYSBwYXJ0aWN1bGFyIHBvaW50XG4gICAgICovXG4gICAgZ2V0UmVxdWlyZWRTcGFjZXNGcm9tUG9pbnQod2lkZ2V0OiBEYXNoYm9hcmRXaWRnZXRDb21wb25lbnQsIGNvbHVtbjogbnVtYmVyLCByb3c6IG51bWJlcik6IERhc2hib2FyZFNwYWNlW10ge1xuICAgICAgICBjb25zdCBzcGFjZXM6IERhc2hib2FyZFNwYWNlW10gPSBbXTtcblxuICAgICAgICBmb3IgKGxldCB5ID0gcm93OyB5IDwgcm93ICsgd2lkZ2V0LmdldFJvd1NwYW4oKTsgeSsrKSB7XG4gICAgICAgICAgICBmb3IgKGxldCB4ID0gY29sdW1uOyB4IDwgY29sdW1uICsgd2lkZ2V0LmdldENvbHVtblNwYW4oKTsgeCsrKSB7XG4gICAgICAgICAgICAgICAgc3BhY2VzLnB1c2goeyBjb2x1bW46IHgsIHJvdzogeSwgd2lkZ2V0OiB3aWRnZXQgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gc3BhY2VzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFBvc2l0aW9uIHdpZGdldHMgYmFzZWQgb24gdGhlIHBvc2l0aW9uIG9mIHRoZSBwbGFjZWhvbGRlciAtIHRoaXMgaXMgdGVtcG9yYXJ5IHVudGlsIGNvbmZpcm1lZFxuICAgICAqL1xuICAgIHVwZGF0ZVdpZGdldFBvc2l0aW9ucyh3aWRnZXQ6IERhc2hib2FyZFdpZGdldENvbXBvbmVudCkge1xuXG4gICAgICAgIGNvbnN0IHBsYWNlaG9sZGVyID0gdGhpcy5wbGFjZWhvbGRlciQuZ2V0VmFsdWUoKTtcblxuICAgICAgICAvLyBjaGVjayBhbGwgc3BhY2VzIHRoZSBwbGFjZWhvbGRlciB3aWxsIG9jY3VweSBhbmQgbW92ZSBhbnkgd2lkZ2V0IGN1cnJlbnRseSBpbiB0aGVtIGRvd25cbiAgICAgICAgZm9yIChsZXQgY29sdW1uID0gcGxhY2Vob2xkZXIuY29sdW1uOyBjb2x1bW4gPCBwbGFjZWhvbGRlci5jb2x1bW4gKyBwbGFjZWhvbGRlci5jb2x1bW5TcGFuOyBjb2x1bW4rKykge1xuICAgICAgICAgICAgZm9yIChsZXQgcm93ID0gcGxhY2Vob2xkZXIucm93OyByb3cgPCBwbGFjZWhvbGRlci5yb3cgKyBwbGFjZWhvbGRlci5yb3dTcGFuOyByb3crKykge1xuXG4gICAgICAgICAgICAgICAgdGhpcy5nZXRXaWRnZXRzQXRQb3NpdGlvbihjb2x1bW4sIHJvdywgdHJ1ZSlcbiAgICAgICAgICAgICAgICAgICAgLmZpbHRlcih3Z3QgPT4gd2d0ICE9PSB3aWRnZXQpXG4gICAgICAgICAgICAgICAgICAgIC5mb3JFYWNoKHdndCA9PiB0aGlzLm1vdmVXaWRnZXREb3duKHdndCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gdXBkYXRlIHRoZSBoZWlnaHQgb2YgdGhlIGRhc2hib2FyZFxuICAgICAgICB0aGlzLnNldERhc2hib2FyZEhlaWdodCgpO1xuXG4gICAgICAgIC8vIGlmIHdlIGFyZW50IGRyYWdnaW5nIHRoZSB0b3AgaGFuZGxlIHRoZW4gZmlsbCBzcGFjZXNcbiAgICAgICAgaWYgKHRoaXMuX2FjdGlvbldpZGdldC5kaXJlY3Rpb24gIT09IEFjdGlvbkRpcmVjdGlvbi5Ub3AgJiZcbiAgICAgICAgICAgIHRoaXMuX2FjdGlvbldpZGdldC5kaXJlY3Rpb24gIT09IEFjdGlvbkRpcmVjdGlvbi5Ub3BMZWZ0ICYmXG4gICAgICAgICAgICB0aGlzLl9hY3Rpb25XaWRnZXQuZGlyZWN0aW9uICE9PSBBY3Rpb25EaXJlY3Rpb24uVG9wUmlnaHQpIHtcbiAgICAgICAgICAgIHRoaXMuc2hpZnRXaWRnZXRzVXAoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERldGVybWluZSBpZiBhIHdpZGdldCBpcyBvY2N1cHlpbmcgYSBzcGVjaWZpYyByb3cgYW5kIGNvbHVtblxuICAgICAqIEBwYXJhbSBjb2x1bW4gVGhlIGNvbHVtbnMgdG8gY2hlY2sgaWYgb2NjdXBpZWRcbiAgICAgKiBAcGFyYW0gcm93IFRoZSByb3cgdG8gY2hlY2sgaWYgb2NjdXBpZWRcbiAgICAgKiBAcGFyYW0gaWdub3JlUmVzaXppbmcgV2hldGhlciBvciBub3QgdG8gaWdub3JlIHRoZSB3aWRnZXQgY3VycmVudGx5IGJlaW5nIHJlc2l6ZWRcbiAgICAgKi9cbiAgICBnZXRXaWRnZXRzQXRQb3NpdGlvbihjb2x1bW46IG51bWJlciwgcm93OiBudW1iZXIsIGlnbm9yZVJlc2l6aW5nOiBib29sZWFuID0gZmFsc2UpOiBEYXNoYm9hcmRXaWRnZXRDb21wb25lbnRbXSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldE9jY3VwaWVkU3BhY2VzKClcbiAgICAgICAgICAgIC5maWx0ZXIoc3BhY2UgPT4gc3BhY2UuY29sdW1uID09PSBjb2x1bW4gJiYgc3BhY2Uucm93ID09PSByb3cpXG4gICAgICAgICAgICAuZmlsdGVyKHNwYWNlID0+IHNwYWNlLndpZGdldCAhPT0gdGhpcy5fYWN0aW9uV2lkZ2V0LndpZGdldCB8fCAhaWdub3JlUmVzaXppbmcpXG4gICAgICAgICAgICAubWFwKHNwYWNlID0+IHNwYWNlLndpZGdldCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVXBkYXRlIHRoZSBwbGFjZWhvbGRlciB2aXNpYmlsaXR5LCBwb3NpdGlvbiBhbmQgc2l6ZVxuICAgICAqL1xuICAgIHNldFBsYWNlaG9sZGVyQm91bmRzKHZpc2libGU6IGJvb2xlYW4sIHg6IG51bWJlciwgeTogbnVtYmVyLCB3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlcik6IHZvaWQge1xuXG4gICAgICAgIGNvbnN0IHBsYWNlaG9sZGVyID0gdGhpcy5wbGFjZWhvbGRlciQuZ2V0VmFsdWUoKTtcblxuICAgICAgICBjb25zdCByb3VuZGluZyA9IHRoaXMuX2FjdGlvbldpZGdldC5kaXJlY3Rpb24gPT09IEFjdGlvbkRpcmVjdGlvbi5MZWZ0IHx8XG4gICAgICAgICAgICB0aGlzLl9hY3Rpb25XaWRnZXQuZGlyZWN0aW9uID09PSBBY3Rpb25EaXJlY3Rpb24uVG9wID8gUm91bmRpbmcuUm91bmREb3duQmVsb3dIYWxmIDogUm91bmRpbmcuUm91bmRVcE92ZXJIYWxmO1xuXG4gICAgICAgIHBsYWNlaG9sZGVyLnZpc2libGUgPSB2aXNpYmxlO1xuXG4gICAgICAgIHBsYWNlaG9sZGVyLmNvbHVtbiA9IHRoaXMuZ2V0UGxhY2Vob2xkZXJDb2x1bW4oeCwgd2lkdGgpO1xuICAgICAgICBwbGFjZWhvbGRlci5yb3cgPSB0aGlzLmdldFBsYWNlaG9sZGVyUm93KHksIGhlaWdodCk7XG4gICAgICAgIHBsYWNlaG9sZGVyLmNvbHVtblNwYW4gPSB0aGlzLmdldFBsYWNlaG9sZGVyQ29sdW1uU3Bhbih3aWR0aCk7XG4gICAgICAgIHBsYWNlaG9sZGVyLnJvd1NwYW4gPSB0aGlzLmdldFBsYWNlaG9sZGVyUm93U3BhbihoZWlnaHQpO1xuXG4gICAgICAgIC8vIGNhbGN1bGF0ZSB0aGUgbWF4aW11bSBudW1iZXIgb2Ygcm93c1xuICAgICAgICBjb25zdCByb3dDb3VudCA9IHRoaXMud2lkZ2V0cy5maWx0ZXIod2lkZ2V0ID0+IHdpZGdldCAhPT0gdGhpcy5fYWN0aW9uV2lkZ2V0LndpZGdldClcbiAgICAgICAgICAgIC5yZWR1Y2UoKHByZXZpb3VzLCB3aWRnZXQpID0+IE1hdGgubWF4KHdpZGdldC5nZXRSb3coKSArIHdpZGdldC5nZXRSb3dTcGFuKCksIHByZXZpb3VzKSwgMCk7XG5cbiAgICAgICAgLy8gY29uc3RyYWluIG1heGltdW0gcGxhY2Vob2xkZXIgcm93XG4gICAgICAgIHBsYWNlaG9sZGVyLnJvdyA9IE1hdGgubWluKHBsYWNlaG9sZGVyLnJvdywgcm93Q291bnQpO1xuXG4gICAgICAgIHBsYWNlaG9sZGVyLnggPSAocGxhY2Vob2xkZXIuY29sdW1uICogdGhpcy5nZXRDb2x1bW5XaWR0aCgpKSArIHRoaXMub3B0aW9ucy5wYWRkaW5nO1xuICAgICAgICBwbGFjZWhvbGRlci55ID0gKHBsYWNlaG9sZGVyLnJvdyAqIHRoaXMuX3Jvd0hlaWdodCkgKyB0aGlzLm9wdGlvbnMucGFkZGluZztcbiAgICAgICAgcGxhY2Vob2xkZXIud2lkdGggPSAocGxhY2Vob2xkZXIuY29sdW1uU3BhbiAqIHRoaXMuZ2V0Q29sdW1uV2lkdGgoKSkgLSAodGhpcy5vcHRpb25zLnBhZGRpbmcgKiAyKTtcbiAgICAgICAgcGxhY2Vob2xkZXIuaGVpZ2h0ID0gKHBsYWNlaG9sZGVyLnJvd1NwYW4gKiB0aGlzLl9yb3dIZWlnaHQpIC0gKHRoaXMub3B0aW9ucy5wYWRkaW5nICogMik7XG5cbiAgICAgICAgLy8gc2V0IHRoZSB2YWx1ZXMgb2YgdGhlIHdpZGdldCB0byBtYXRjaCB0aGUgdmFsdWVzIG9mIHRoZSBwbGFjZWhvbGRlciAtIGhvd2V2ZXIgZG8gbm90IHJlbmRlciB0aGUgY2hhbmdlc1xuICAgICAgICB0aGlzLl9hY3Rpb25XaWRnZXQud2lkZ2V0LnNldENvbHVtbihwbGFjZWhvbGRlci5jb2x1bW4sIGZhbHNlKTtcbiAgICAgICAgdGhpcy5fYWN0aW9uV2lkZ2V0LndpZGdldC5zZXRSb3cocGxhY2Vob2xkZXIucm93LCBmYWxzZSk7XG4gICAgICAgIHRoaXMuX2FjdGlvbldpZGdldC53aWRnZXQuc2V0Q29sdW1uU3BhbihwbGFjZWhvbGRlci5jb2x1bW5TcGFuLCBmYWxzZSk7XG4gICAgICAgIHRoaXMuX2FjdGlvbldpZGdldC53aWRnZXQuc2V0Um93U3BhbihwbGFjZWhvbGRlci5yb3dTcGFuLCBmYWxzZSk7XG5cbiAgICAgICAgLy8gdXBkYXRlIHRoZSBwbGFjZWhvbGRlclxuICAgICAgICB0aGlzLnBsYWNlaG9sZGVyJC5uZXh0KHBsYWNlaG9sZGVyKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIHBsYWNlaG9sZGVyIGNvbHVtbiBwb3NpdGlvblxuICAgICAqL1xuICAgIGdldFBsYWNlaG9sZGVyQ29sdW1uKHg6IG51bWJlciwgd2lkdGg6IG51bWJlcik6IG51bWJlciB7XG5cbiAgICAgICAgY29uc3QgY29sdW1uID0gdGhpcy5nZXRDb2x1bW5Gcm9tUHgoeCwgdGhpcy5fYWN0aW9uV2lkZ2V0LmRpcmVjdGlvbiA9PT0gQWN0aW9uRGlyZWN0aW9uLk1vdmUgPyBSb3VuZGluZy5Sb3VuZFVwT3ZlckhhbGYgOiBSb3VuZGluZy5Sb3VuZERvd24pO1xuICAgICAgICBjb25zdCBjb2x1bW5TcGFuID0gTWF0aC5mbG9vcih3aWR0aCAvIHRoaXMuZ2V0Q29sdW1uV2lkdGgoKSk7XG4gICAgICAgIGNvbnN0IHVwcGVyTGltaXQgPSB0aGlzLmdldENvbHVtbkNvdW50KCkgLSBjb2x1bW5TcGFuO1xuXG4gICAgICAgIC8vIGlmIHdlIGFyZW50IGRyYWdnaW5nIGxlZnQgdGhlbiBqdXN0IHJldHVybiB0aGUgY29sdW1uXG4gICAgICAgIGlmICh0aGlzLl9hY3Rpb25XaWRnZXQuZGlyZWN0aW9uICE9PSBBY3Rpb25EaXJlY3Rpb24uTGVmdCAmJlxuICAgICAgICAgICAgdGhpcy5fYWN0aW9uV2lkZ2V0LmRpcmVjdGlvbiAhPT0gQWN0aW9uRGlyZWN0aW9uLlRvcExlZnQgJiZcbiAgICAgICAgICAgIHRoaXMuX2FjdGlvbldpZGdldC5kaXJlY3Rpb24gIT09IEFjdGlvbkRpcmVjdGlvbi5Cb3R0b21MZWZ0KSB7XG4gICAgICAgICAgICByZXR1cm4gTWF0aC5tYXgoTWF0aC5taW4oY29sdW1uLCB1cHBlckxpbWl0KSwgMCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBnZXQgYW55IG92ZXJmbG93XG4gICAgICAgIGNvbnN0IG92ZXJmbG93ID0gd2lkdGggJSB0aGlzLmdldENvbHVtbldpZHRoKCk7XG5cbiAgICAgICAgcmV0dXJuICh4IDw9IDAgfHwgb3ZlcmZsb3cgPT09IDAgfHwgY29sdW1uU3BhbiA9PT0gMCB8fCBvdmVyZmxvdyA+ICh0aGlzLmdldENvbHVtbldpZHRoKCkgLyAyKSkgP1xuICAgICAgICAgICAgTWF0aC5tYXgoTWF0aC5taW4oY29sdW1uLCB1cHBlckxpbWl0KSwgMCkgOlxuICAgICAgICAgICAgTWF0aC5tYXgoTWF0aC5taW4oY29sdW1uICsgMSwgdXBwZXJMaW1pdCksIDApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgY29sdW1uIHNwYW4gb2YgdGhlIHBsYWNlaG9sZGVyXG4gICAgICovXG4gICAgZ2V0UGxhY2Vob2xkZXJDb2x1bW5TcGFuKHdpZHRoOiBudW1iZXIpOiBudW1iZXIge1xuXG4gICAgICAgIGNvbnN0IGNvbHVtblNwYW4gPSB0aGlzLmdldENvbHVtbkZyb21QeCh3aWR0aCk7XG5cbiAgICAgICAgLy8gaWYgd2UgYXJlbnQgZHJhZ2dpbmcgcmlnaHQgb3IgbGVmdCB0aGVuIGp1c3QgcmV0dXJuIHRoZSBjb2x1bW4gc3BhblxuICAgICAgICBpZiAodGhpcy5fYWN0aW9uV2lkZ2V0LmRpcmVjdGlvbiAhPT0gQWN0aW9uRGlyZWN0aW9uLlJpZ2h0ICYmXG4gICAgICAgICAgICB0aGlzLl9hY3Rpb25XaWRnZXQuZGlyZWN0aW9uICE9PSBBY3Rpb25EaXJlY3Rpb24uVG9wUmlnaHQgJiZcbiAgICAgICAgICAgIHRoaXMuX2FjdGlvbldpZGdldC5kaXJlY3Rpb24gIT09IEFjdGlvbkRpcmVjdGlvbi5Cb3R0b21SaWdodCAmJlxuICAgICAgICAgICAgdGhpcy5fYWN0aW9uV2lkZ2V0LmRpcmVjdGlvbiAhPT0gQWN0aW9uRGlyZWN0aW9uLkxlZnQgJiZcbiAgICAgICAgICAgIHRoaXMuX2FjdGlvbldpZGdldC5kaXJlY3Rpb24gIT09IEFjdGlvbkRpcmVjdGlvbi5Ub3BMZWZ0ICYmXG4gICAgICAgICAgICB0aGlzLl9hY3Rpb25XaWRnZXQuZGlyZWN0aW9uICE9PSBBY3Rpb25EaXJlY3Rpb24uQm90dG9tTGVmdCkge1xuICAgICAgICAgICAgcmV0dXJuIE1hdGgubWF4KGNvbHVtblNwYW4sIDEpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gZ2V0IHRoZSBjdXJyZW50IGNvbHVtbiBzcGFuIGFuZCBhbnkgb3ZlcmZsb3dcbiAgICAgICAgY29uc3Qgb3ZlcmZsb3cgPSB3aWR0aCAlIHRoaXMuZ2V0Q29sdW1uV2lkdGgoKTtcblxuICAgICAgICByZXR1cm4gKGNvbHVtblNwYW4gPiAwICYmIG92ZXJmbG93ID4gKHRoaXMuZ2V0Q29sdW1uV2lkdGgoKSAvIDIpKSA/IE1hdGgubWF4KGNvbHVtblNwYW4gKyAxLCAxKSA6IE1hdGgubWF4KGNvbHVtblNwYW4sIDEpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgcm93IHBvc2l0aW9uIG9mIHRoZSBwbGFjZWhvbGRlclxuICAgICAqL1xuICAgIGdldFBsYWNlaG9sZGVyUm93KHk6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIpOiBudW1iZXIge1xuXG4gICAgICAgIGNvbnN0IHJvdyA9IHRoaXMuZ2V0Um93RnJvbVB4KHksIHRoaXMuX2FjdGlvbldpZGdldC5kaXJlY3Rpb24gPT09IEFjdGlvbkRpcmVjdGlvbi5Nb3ZlID8gUm91bmRpbmcuUm91bmRVcE92ZXJIYWxmIDogUm91bmRpbmcuUm91bmREb3duKTtcbiAgICAgICAgY29uc3Qgcm93U3BhbiA9IE1hdGguY2VpbChoZWlnaHQgLyB0aGlzLl9yb3dIZWlnaHQpO1xuXG4gICAgICAgIC8vIGlmIHdlIGFyZW50IGRyYWdnaW5nIHVwIHRoZW4ganVzdCByZXR1cm4gdGhlIHJvd1xuICAgICAgICBpZiAodGhpcy5fYWN0aW9uV2lkZ2V0LmRpcmVjdGlvbiAhPT0gQWN0aW9uRGlyZWN0aW9uLlRvcCAmJlxuICAgICAgICAgICAgdGhpcy5fYWN0aW9uV2lkZ2V0LmRpcmVjdGlvbiAhPT0gQWN0aW9uRGlyZWN0aW9uLlRvcExlZnQgJiZcbiAgICAgICAgICAgIHRoaXMuX2FjdGlvbldpZGdldC5kaXJlY3Rpb24gIT09IEFjdGlvbkRpcmVjdGlvbi5Ub3BSaWdodCkge1xuICAgICAgICAgICAgcmV0dXJuIE1hdGgubWF4KHJvdywgMCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBnZXQgYW55IG92ZXJmbG93XG4gICAgICAgIGxldCBvdmVyZmxvdyA9IGhlaWdodCA8IHRoaXMuX3Jvd0hlaWdodCA/IDAgOiBoZWlnaHQgJSB0aGlzLl9yb3dIZWlnaHQ7XG5cbiAgICAgICAgcmV0dXJuICh5IDw9IDAgfHwgcm93U3BhbiA9PT0gMCB8fCBvdmVyZmxvdyA9PT0gMCB8fCBvdmVyZmxvdyA+ICh0aGlzLl9yb3dIZWlnaHQgLyAyKSkgPyBNYXRoLm1heChyb3csIDApIDogTWF0aC5tYXgocm93ICsgMSwgMCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IHRoZSByb3cgc3BhbiBvZiB0aGUgcGxhY2Vob2xkZXJcbiAgICAgKi9cbiAgICBnZXRQbGFjZWhvbGRlclJvd1NwYW4oaGVpZ2h0OiBudW1iZXIpOiBudW1iZXIge1xuXG4gICAgICAgIGNvbnN0IHJvd1NwYW4gPSB0aGlzLmdldFJvd0Zyb21QeChoZWlnaHQpO1xuXG4gICAgICAgIC8vIGlmIHdlIGFyZW50IGRyYWdnaW5nIHVwIG9yIGRvd24gdGhlbiBqdXN0IHJldHVybiB0aGUgY29sdW1uIHNwYW5cbiAgICAgICAgaWYgKHRoaXMuX2FjdGlvbldpZGdldC5kaXJlY3Rpb24gIT09IEFjdGlvbkRpcmVjdGlvbi5Ub3AgJiZcbiAgICAgICAgICAgIHRoaXMuX2FjdGlvbldpZGdldC5kaXJlY3Rpb24gIT09IEFjdGlvbkRpcmVjdGlvbi5Ub3BMZWZ0ICYmXG4gICAgICAgICAgICB0aGlzLl9hY3Rpb25XaWRnZXQuZGlyZWN0aW9uICE9PSBBY3Rpb25EaXJlY3Rpb24uVG9wUmlnaHQgJiZcbiAgICAgICAgICAgIHRoaXMuX2FjdGlvbldpZGdldC5kaXJlY3Rpb24gIT09IEFjdGlvbkRpcmVjdGlvbi5Cb3R0b20gJiZcbiAgICAgICAgICAgIHRoaXMuX2FjdGlvbldpZGdldC5kaXJlY3Rpb24gIT09IEFjdGlvbkRpcmVjdGlvbi5Cb3R0b21MZWZ0ICYmXG4gICAgICAgICAgICB0aGlzLl9hY3Rpb25XaWRnZXQuZGlyZWN0aW9uICE9PSBBY3Rpb25EaXJlY3Rpb24uQm90dG9tUmlnaHQpIHtcbiAgICAgICAgICAgIHJldHVybiBNYXRoLm1heChyb3dTcGFuLCAxKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGdldCB0aGUgY3VycmVudCBjb2x1bW4gc3BhbiBhbmQgYW55IG92ZXJmbG93XG4gICAgICAgIGNvbnN0IG92ZXJmbG93ID0gaGVpZ2h0ICUgdGhpcy5fcm93SGVpZ2h0O1xuXG4gICAgICAgIHJldHVybiAob3ZlcmZsb3cgPiAodGhpcy5fcm93SGVpZ2h0IC8gMikpID8gTWF0aC5tYXgocm93U3BhbiArIDEsIDEpIDogTWF0aC5tYXgocm93U3BhbiwgMSk7XG4gICAgfVxuXG4gICAgZ2V0Q29sdW1uRnJvbVB4KHg6IG51bWJlciwgcm91bmRpbmc6IFJvdW5kaW5nID0gUm91bmRpbmcuUm91bmREb3duKTogbnVtYmVyIHtcblxuICAgICAgICBjb25zdCBjb2x1bW4gPSBNYXRoLmZsb29yKHggLyBNYXRoLmZsb29yKHRoaXMuZ2V0Q29sdW1uV2lkdGgoKSkpO1xuICAgICAgICBjb25zdCBvdmVyZmxvdyA9ICh4ICUgTWF0aC5mbG9vcih0aGlzLmdldENvbHVtbldpZHRoKCkpKTtcbiAgICAgICAgY29uc3QgaGFsZiA9IHRoaXMuZ2V0Q29sdW1uV2lkdGgoKSAvIDI7XG5cbiAgICAgICAgc3dpdGNoIChyb3VuZGluZykge1xuXG4gICAgICAgICAgICBjYXNlIFJvdW5kaW5nLlJvdW5kRG93bjpcbiAgICAgICAgICAgICAgICByZXR1cm4gY29sdW1uO1xuXG4gICAgICAgICAgICBjYXNlIFJvdW5kaW5nLlJvdW5kRG93bkJlbG93SGFsZjpcbiAgICAgICAgICAgICAgICByZXR1cm4gb3ZlcmZsb3cgPCBoYWxmID8gY29sdW1uIDogY29sdW1uICsgMTtcblxuICAgICAgICAgICAgY2FzZSBSb3VuZGluZy5Sb3VuZFVwT3ZlckhhbGY6XG4gICAgICAgICAgICAgICAgcmV0dXJuIG92ZXJmbG93ID4gaGFsZiA/IGNvbHVtbiArIDEgOiBjb2x1bW47XG5cbiAgICAgICAgICAgIGNhc2UgUm91bmRpbmcuUm91bmRVcDpcbiAgICAgICAgICAgICAgICByZXR1cm4gb3ZlcmZsb3cgPiAwID8gY29sdW1uICsgMSA6IGNvbHVtbjtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgZ2V0Um93RnJvbVB4KHk6IG51bWJlciwgcm91bmRpbmc6IFJvdW5kaW5nID0gUm91bmRpbmcuUm91bmREb3duKTogbnVtYmVyIHtcblxuICAgICAgICBjb25zdCByb3cgPSBNYXRoLmZsb29yKHkgLyBNYXRoLmZsb29yKHRoaXMuX3Jvd0hlaWdodCkpO1xuICAgICAgICBjb25zdCBvdmVyZmxvdyA9ICh5ICUgTWF0aC5mbG9vcih0aGlzLl9yb3dIZWlnaHQpKTtcbiAgICAgICAgY29uc3QgaGFsZiA9IHRoaXMuX3Jvd0hlaWdodCAvIDI7XG5cbiAgICAgICAgc3dpdGNoIChyb3VuZGluZykge1xuXG4gICAgICAgICAgICBjYXNlIFJvdW5kaW5nLlJvdW5kRG93bjpcbiAgICAgICAgICAgICAgICByZXR1cm4gcm93O1xuXG4gICAgICAgICAgICBjYXNlIFJvdW5kaW5nLlJvdW5kRG93bkJlbG93SGFsZjpcbiAgICAgICAgICAgICAgICByZXR1cm4gb3ZlcmZsb3cgPCBoYWxmID8gcm93IDogcm93ICsgMTtcblxuICAgICAgICAgICAgY2FzZSBSb3VuZGluZy5Sb3VuZFVwT3ZlckhhbGY6XG4gICAgICAgICAgICAgICAgcmV0dXJuIG92ZXJmbG93ID4gaGFsZiA/IHJvdyArIDEgOiByb3c7XG5cbiAgICAgICAgICAgIGNhc2UgUm91bmRpbmcuUm91bmRVcDpcbiAgICAgICAgICAgICAgICByZXR1cm4gb3ZlcmZsb3cgPiAwID8gcm93ICsgMSA6IHJvdztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbW1pdFdpZGdldENoYW5nZXMoKTogdm9pZCB7XG5cbiAgICAgICAgY29uc3QgcGxhY2Vob2xkZXIgPSB0aGlzLnBsYWNlaG9sZGVyJC5nZXRWYWx1ZSgpO1xuXG4gICAgICAgIC8vIGNoZWNrIHRoYXQgd2UgaGF2ZSBhbGwgdGhlIHZhbHVlcyB3ZSBuZWVkXG4gICAgICAgIGlmIChwbGFjZWhvbGRlci5jb2x1bW4gPT09IHVuZGVmaW5lZCB8fCBwbGFjZWhvbGRlci5yb3cgPT09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgICAgcGxhY2Vob2xkZXIuY29sdW1uU3BhbiA9PT0gdW5kZWZpbmVkIHx8IHBsYWNlaG9sZGVyLnJvd1NwYW4gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuX2FjdGlvbldpZGdldCkge1xuICAgICAgICAgICAgdGhpcy5fYWN0aW9uV2lkZ2V0LndpZGdldC5zZXRDb2x1bW4ocGxhY2Vob2xkZXIuY29sdW1uKTtcbiAgICAgICAgICAgIHRoaXMuX2FjdGlvbldpZGdldC53aWRnZXQuc2V0Um93KHBsYWNlaG9sZGVyLnJvdyk7XG4gICAgICAgICAgICB0aGlzLl9hY3Rpb25XaWRnZXQud2lkZ2V0LnNldENvbHVtblNwYW4ocGxhY2Vob2xkZXIuY29sdW1uU3Bhbik7XG4gICAgICAgICAgICB0aGlzLl9hY3Rpb25XaWRnZXQud2lkZ2V0LnNldFJvd1NwYW4ocGxhY2Vob2xkZXIucm93U3Bhbik7XG4gICAgICAgIH1cblxuICAgICAgICAvLyByZXNldCBhbGwgcGxhY2Vob2xkZXIgdmFsdWVzXG4gICAgICAgIHBsYWNlaG9sZGVyLmNvbHVtbiA9IHVuZGVmaW5lZDtcbiAgICAgICAgcGxhY2Vob2xkZXIucm93ID0gdW5kZWZpbmVkO1xuICAgICAgICBwbGFjZWhvbGRlci5jb2x1bW5TcGFuID0gdW5kZWZpbmVkO1xuICAgICAgICBwbGFjZWhvbGRlci5yb3dTcGFuID0gdW5kZWZpbmVkO1xuXG4gICAgICAgIC8vIGVtaXQgdGhlIG5ldyBwbGFjZWhvbGRlciB2YWx1ZXNcbiAgICAgICAgdGhpcy5wbGFjZWhvbGRlciQubmV4dChwbGFjZWhvbGRlcik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IHRoZSBjdXJyZW50IGNvbHVtbiB3aWR0aFxuICAgICAqL1xuICAgIGdldENvbHVtbldpZHRoKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiBNYXRoLmZsb29yKHRoaXMuY29sdW1uV2lkdGgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENhbGN1bGF0ZSB0aGUgbnVtYmVyIG9mIHJvd3MgcG9wdWxhdGVkIHdpdGggd2lkZ2V0c1xuICAgICAqL1xuICAgIGdldFJvd0NvdW50KCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLndpZGdldHMucmVkdWNlKChwcmV2aW91cywgd2lkZ2V0KSA9PiBNYXRoLm1heCh3aWRnZXQuZ2V0Um93KCkgKyB3aWRnZXQuZ2V0Um93U3BhbigpLCBwcmV2aW91cyksIDApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldCB0aGUgaGVpZ2h0IG9mIHRoZSBkYXNoYm9hcmQgY29udGFpbmVyIGVsZW1lbnRcbiAgICAgKi9cbiAgICBzZXREYXNoYm9hcmRIZWlnaHQoKTogdm9pZCB7XG5cbiAgICAgICAgLy8gc2l6ZSB0aGUgZGFzaGJvYXJkIGNvbnRhaW5lciB0byBlbnN1cmUgYWxsIHJvd3MgZml0XG4gICAgICAgIGxldCByb3dDb3VudCA9IHRoaXMuZ2V0Um93Q291bnQoKTtcblxuICAgICAgICAvLyBpZiB3ZSBzaG91bGQgc2hvdyBhbiBlbXB0eSByb3cgaW5jcmVtZW50IHRoZSByb3cgY291bnQgYnkgMVxuICAgICAgICBpZiAodGhpcy5vcHRpb25zLmVtcHR5Um93KSB7XG4gICAgICAgICAgICByb3dDb3VudCsrO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zZXREaW1lbnNpb25zKHVuZGVmaW5lZCwgcm93Q291bnQgKiB0aGlzLl9yb3dIZWlnaHQpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE9yZGVycyB0aGUgei1pbmRleCBvZiBhbGwgd2lkZ2V0cyB0byBtb3ZlIHRoZSBhY3RpdmUgb25lIHRvIHRoZSBmcm9udFxuICAgICAqIEBwYXJhbSB3aWRnZXQgVGhlIHdpZGdldCB0aGF0IHNob3VsZCBiZSBicm91Z2h0IHRvIHRoZSBmcm9udFxuICAgICAqL1xuICAgIGJyaW5nVG9Gcm9udCh3aWRnZXQ6IERhc2hib2FyZFdpZGdldENvbXBvbmVudCk6IHZvaWQge1xuICAgICAgICB0aGlzLndpZGdldHMuZm9yRWFjaChfd2lkZ2V0ID0+IF93aWRnZXQgPT09IHdpZGdldCA/IF93aWRnZXQuYnJpbmdUb0Zyb250KCkgOiBfd2lkZ2V0LnNlbmRUb0JhY2soKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTW92ZSBhIHdpZGdldCBkb3duIC0gaWYgd2lkZ2V0cyBhcmUgaW4gdGhlIHBvc2l0aW9uIGJlbG93LCB0aGVuIG1vdmUgdGhlbSBkb3duIGZ1cnRoZXJcbiAgICAgKiBAcGFyYW0gd2lkZ2V0IFRoZSB3aWRnZXQgdG8gbW92ZSBkb3dud2FyZHNcbiAgICAgKi9cbiAgICBtb3ZlV2lkZ2V0RG93bih3aWRnZXQ6IERhc2hib2FyZFdpZGdldENvbXBvbmVudCwgZGlzdGFuY2U6IG51bWJlciA9IDEpOiB2b2lkIHtcblxuICAgICAgICAvLyBtb3ZlIHRoZSB3aWRnZXQgZG93biBvbmUgcG9zaXRpb25cbiAgICAgICAgd2lkZ2V0LnNldFJvdyh3aWRnZXQuZ2V0Um93KCkgKyBkaXN0YW5jZSk7XG5cbiAgICAgICAgLy8gY2hlY2sgZXZlcnkgc3BhY2UgdGhlIHdpZGdldCBvY2N1cGllcyBmb3IgY29sbGlzaW9uc1xuICAgICAgICB0aGlzLmZvckVhY2hCbG9jayh3aWRnZXQsIChjb2x1bW4sIHJvdykgPT5cbiAgICAgICAgICAgIHRoaXMuZ2V0V2lkZ2V0c0F0UG9zaXRpb24oY29sdW1uLCByb3csIHRydWUpXG4gICAgICAgICAgICAgICAgLmZpbHRlcih3Z3QgPT4gd2d0ICE9PSB3aWRnZXQpXG4gICAgICAgICAgICAgICAgLmZvckVhY2god2d0ID0+IHRoaXMubW92ZVdpZGdldERvd24od2d0LCBkaXN0YW5jZSkpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBXaWRnZXRzIHNob3VsZCBub3QgYmUgYWxsb3dlZCB0byBoYXZlIGEgdmFjYW50IHNwYWNlIGFib3ZlIHRoZW0gLSBpZiB0aGVyZSBpcyBvbmUgdGhleSBzaG91bGQgbW92ZSB1cHdhcmRzIHRvIGZpbGwgaXRcbiAgICAgKi9cbiAgICBzaGlmdFdpZGdldHNVcCgpOiB2b2lkIHtcblxuICAgICAgICAvLyBjaGVjayB3aGV0aGVyIG9yIG5vdCBjaGFuZ2VzIGhhdmUgYmVlbiBtYWRlIC0gaWYgc28gd2UgbmVlZCB0byByZXBlYXQgdW50aWwgc3RhYmxlXG4gICAgICAgIGxldCBzdGFibGUgPSB0cnVlO1xuXG4gICAgICAgIC8vIGl0ZXJhdGUgZWFjaCB3aWRnZXQgYW5kXG4gICAgICAgIHRoaXMud2lkZ2V0cy5mb3JFYWNoKHdpZGdldCA9PiB7XG5cbiAgICAgICAgICAgIC8vIGlmIHdpZGdldCBpcyBhbHJlYWR5IG9uIHRoZSB0b3Agcm93IHRoZW4gZG8gbm90aGluZ1xuICAgICAgICAgICAgaWYgKHdpZGdldC5nZXRSb3coKSA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gaWYgd2UgYXJlIGN1cnJlbnRseSBkcmFnZ2luZyBhbmQgdGhpcyBpcyB0aGUgZHJhZ2dpbmcgd2lkZ2V0IHRoZW4gc2tpcFxuICAgICAgICAgICAgaWYgKHRoaXMuX2FjdGlvbldpZGdldCAmJiB0aGlzLl9hY3Rpb25XaWRnZXQud2lkZ2V0ID09PSB3aWRnZXQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmdldFBvc2l0aW9uQXZhaWxhYmxlKHdpZGdldC5nZXRDb2x1bW4oKSwgd2lkZ2V0LmdldFJvdygpIC0gMSwgd2lkZ2V0LmdldENvbHVtblNwYW4oKSwgMSkpIHtcbiAgICAgICAgICAgICAgICB3aWRnZXQuc2V0Um93KHdpZGdldC5nZXRSb3coKSAtIDEpO1xuICAgICAgICAgICAgICAgIHN0YWJsZSA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAvLyBpZiBjaGFuZ2VzIG9jY3VycmVkIHRoZW4gd2Ugc2hvdWxkIHJlcGVhdCB0aGUgcHJvY2Vzc1xuICAgICAgICBpZiAoIXN0YWJsZSkge1xuICAgICAgICAgICAgdGhpcy5zaGlmdFdpZGdldHNVcCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSXRlcmF0ZSBvdmVyIGVhY2ggc3BhY2UgYSB3aWRnZXQgb2NjdXBpZWRcbiAgICAgKiBAcGFyYW0gd2lkZ2V0IFRoZSB3aWRnZXQgdG8gZGV0ZXJtaW5lIHNwYWNlc1xuICAgICAqIEBwYXJhbSBjYWxsYmFjayBUaGUgZnVuY3Rpb24gdG8gYmUgY2FsbGVkIGZvciBlYWNoIHNwYWNlLCBzaG91bGQgZXhwZWN0IGEgY29sdW1uIGFuZCByb3cgYXJndW1lbnQgd2l0aHQgaGUgY29udGV4dCBiZWluZyB0aGUgd2lkZ2V0XG4gICAgICovXG4gICAgZm9yRWFjaEJsb2NrKHdpZGdldDogRGFzaGJvYXJkV2lkZ2V0Q29tcG9uZW50LCBjYWxsYmFjazogKGNvbHVtbjogbnVtYmVyLCByb3c6IG51bWJlcikgPT4gdm9pZCk6IHZvaWQge1xuICAgICAgICBmb3IgKGxldCByb3cgPSB3aWRnZXQuZ2V0Um93KCk7IHJvdyA8IHdpZGdldC5nZXRSb3coKSArIHdpZGdldC5nZXRSb3dTcGFuKCk7IHJvdysrKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBjb2x1bW4gPSB3aWRnZXQuZ2V0Q29sdW1uKCk7IGNvbHVtbiA8IHdpZGdldC5nZXRDb2x1bW4oKSArIHdpZGdldC5nZXRDb2x1bW5TcGFuKCk7IGNvbHVtbisrKSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2suY2FsbCh3aWRnZXQsIGNvbHVtbiwgcm93KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIG51bWJlciBvZiBjb2x1bW5zIGF2YWlsYWJsZVxuICAgICAqL1xuICAgIGdldENvbHVtbkNvdW50KCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLnN0YWNrZWQgPyAxIDogdGhpcy5vcHRpb25zLmNvbHVtbnM7XG4gICAgfVxufVxuXG5leHBvcnQgY29uc3QgZGVmYXVsdE9wdGlvbnM6IERhc2hib2FyZE9wdGlvbnMgPSB7IGNvbHVtbnM6IDUsIHBhZGRpbmc6IDUsIG1pbldpZHRoOiAxMDAsIG1pbkhlaWdodDogMTAwLCBlbXB0eVJvdzogdHJ1ZSB9O1xuXG5leHBvcnQgaW50ZXJmYWNlIERhc2hib2FyZERpbWVuc2lvbnMge1xuICAgIHdpZHRoPzogbnVtYmVyO1xuICAgIGhlaWdodD86IG51bWJlcjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBEYXNoYm9hcmRXaWRnZXREaW1lbnNpb25zIHtcbiAgICB4OiBudW1iZXI7XG4gICAgeTogbnVtYmVyO1xuICAgIHdpZHRoOiBudW1iZXI7XG4gICAgaGVpZ2h0OiBudW1iZXI7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRGFzaGJvYXJkQWN0aW9uIHtcbiAgICB3aWRnZXQ6IERhc2hib2FyZFdpZGdldENvbXBvbmVudDtcbiAgICBkaXJlY3Rpb246IEFjdGlvbkRpcmVjdGlvbjtcbiAgICBldmVudDogTW91c2VFdmVudDtcbiAgICBoYW5kbGU/OiBIVE1MRWxlbWVudDtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBEYXNoYm9hcmRTcGFjZSB7XG4gICAgd2lkZ2V0OiBEYXNoYm9hcmRXaWRnZXRDb21wb25lbnQ7XG4gICAgY29sdW1uOiBudW1iZXI7XG4gICAgcm93OiBudW1iZXI7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRGFzaGJvYXJkUGxhY2Vob2xkZXIge1xuICAgIHZpc2libGU6IGJvb2xlYW47XG4gICAgeDogbnVtYmVyO1xuICAgIHk6IG51bWJlcjtcbiAgICB3aWR0aDogbnVtYmVyO1xuICAgIGhlaWdodDogbnVtYmVyO1xuICAgIGNvbHVtbj86IG51bWJlcjtcbiAgICByb3c/OiBudW1iZXI7XG4gICAgY29sdW1uU3Bhbj86IG51bWJlcjtcbiAgICByb3dTcGFuPzogbnVtYmVyO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIERhc2hib2FyZENhY2hlIHtcbiAgICBpZDogc3RyaW5nO1xuICAgIGNvbHVtbjogbnVtYmVyO1xuICAgIHJvdzogbnVtYmVyO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIERhc2hib2FyZExheW91dERhdGEge1xuICAgIGlkOiBzdHJpbmc7XG4gICAgY29sOiBudW1iZXI7XG4gICAgcm93OiBudW1iZXI7XG4gICAgY29sU3BhbjogbnVtYmVyO1xuICAgIHJvd1NwYW46IG51bWJlcjtcbn1cblxuZXhwb3J0IGVudW0gQWN0aW9uRGlyZWN0aW9uIHtcbiAgICBUb3AgPSAwLFxuICAgIFRvcFJpZ2h0ID0gMSxcbiAgICBSaWdodCA9IDIsXG4gICAgQm90dG9tUmlnaHQgPSAzLFxuICAgIEJvdHRvbSA9IDQsXG4gICAgQm90dG9tTGVmdCA9IDUsXG4gICAgTGVmdCA9IDYsXG4gICAgVG9wTGVmdCA9IDcsXG4gICAgTW92ZSA9IDhcbn1cblxuZXhwb3J0IGVudW0gUm91bmRpbmcge1xuICAgIFJvdW5kRG93bixcbiAgICBSb3VuZERvd25CZWxvd0hhbGYsXG4gICAgUm91bmRVcCxcbiAgICBSb3VuZFVwT3ZlckhhbGZcbn0iXX0=