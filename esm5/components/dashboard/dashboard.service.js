/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { distinctUntilChanged, filter, map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { tick } from '../../common/index';
var DashboardService = /** @class */ (function () {
    function DashboardService() {
        var _this = this;
        this._rowHeight = 0;
        this.widgets$ = new BehaviorSubject([]);
        this.options$ = new BehaviorSubject(defaultOptions);
        this.dimensions$ = new BehaviorSubject({});
        this.height$ = this.dimensions$.pipe(tick(), map(function (dimensions) { return dimensions.height; }), distinctUntilChanged());
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
        this.stacked$.pipe(takeUntil(this._onDestroy), filter(function (stacked) { return stacked === true; })).subscribe(this.updateWhenStacked.bind(this));
        this.widgets$.pipe(takeUntil(this._onDestroy), tick()).subscribe(function () { return _this.renderDashboard(); });
        this.dimensions$.pipe(takeUntil(this._onDestroy), tick()).subscribe(function () { return _this.renderDashboard(); });
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
     * @return {?}
     */
    DashboardService.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._onDestroy.next();
        this._onDestroy.complete();
    };
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
        var _this = this;
        return this.widgets.sort(function (w1, w2) {
            var /** @type {?} */ w1Position = w1.getColumn() + (w1.getRow() * _this.options.columns);
            var /** @type {?} */ w2Position = w2.getColumn() + (w2.getRow() * _this.options.columns);
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
        this._event = action.event;
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
        var /** @type {?} */ mousePosX = this._event.pageX - pageXOffset;
        var /** @type {?} */ mousePosY = this._event.pageY - pageYOffset;
        // if there was no movement then do nothing
        if (action.event.x === mousePosX && action.event.y === mousePosY) {
            return;
        }
        // update the stored mouse event
        this._event = action.event;
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
        this._event = null;
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
        // emit the widget we are dragging
        this.isDragging$.next(action.widget);
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
        this.isDragging$.next(null);
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
        if (action.event.pageX === this._event.pageX && action.event.pageY === this._event.pageY) {
            return;
        }
        // get the current mouse position
        var /** @type {?} */ mouseX = action.event.pageX - this._event.pageX;
        var /** @type {?} */ mouseY = action.event.pageY - this._event.pageY;
        // store the latest event
        this._event = action.event;
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
        this._cache = this.widgets.map(function (widget) { return ({
            id: widget.id,
            column: widget.getColumn(),
            row: widget.getRow(),
            columnSpan: widget.getColumnSpan(),
            rowSpan: widget.getRowSpan(),
        }); });
        // return a new array of the cache for custom caching
        return tslib_1.__spread(this._cache);
    };
    /**
     * @param {?=} ignoreActionWidget
     * @param {?=} cache
     * @param {?=} restoreSize
     * @return {?}
     */
    DashboardService.prototype.restoreWidgets = /**
     * @param {?=} ignoreActionWidget
     * @param {?=} cache
     * @param {?=} restoreSize
     * @return {?}
     */
    function (ignoreActionWidget, cache, restoreSize) {
        var _this = this;
        if (ignoreActionWidget === void 0) { ignoreActionWidget = false; }
        if (cache === void 0) { cache = this._cache; }
        if (restoreSize === void 0) { restoreSize = false; }
        cache.filter(function (widget) { return !ignoreActionWidget || widget.id !== _this._actionWidget.widget.id; }).forEach(function (widget) {
            var /** @type {?} */ match = _this.widgets.find(function (wgt) { return wgt.id === widget.id; });
            if (match) {
                match.setColumn(widget.column);
                match.setRow(widget.row);
                if (restoreSize) {
                    match.setColumnSpan(widget.columnSpan);
                    match.setRowSpan(widget.rowSpan);
                }
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
        // check if any of the target spaces are out of bounds
        if (targetSpaces.find(function (space) { return space.column < 0; })) {
            return false;
        }
        // check if there are widget in the required positions and if so, can they move right?
        var /** @type {?} */ moveable = targetSpaces.every(function (space) { return _this.getWidgetsAtPosition(space.column, space.row).filter(function (wgt) { return wgt !== space.widget; }).every(function (wgt) { return _this.canWidgetMoveLeft(wgt); }); });
        if (performMove && moveable) {
            // move all widgets to the left
            targetSpaces.forEach(function (space) { return _this.getWidgetsAtPosition(space.column, space.row).filter(function (wgt) { return wgt !== space.widget; }).forEach(function (wgt) { return _this.canWidgetMoveLeft(wgt, true); }); });
            // find the target column
            var /** @type {?} */ column = targetSpaces.reduce(function (target, space) { return Math.min(target, space.column); }, Infinity);
            // move current widget to the left
            if (column !== Infinity) {
                widget.setColumn(column);
            }
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
        // check if any of the target spaces are out of bounds
        if (targetSpaces.find(function (space) { return space.column >= _this.getColumnCount(); })) {
            return false;
        }
        // check if there are widget in the required positions and if so, can they move right?
        var /** @type {?} */ moveable = targetSpaces.every(function (space) { return _this.getWidgetsAtPosition(space.column, space.row)
            .filter(function (wgt) { return wgt !== space.widget; })
            .every(function (wgt) { return _this.canWidgetMoveRight(wgt); }); });
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
            .filter(function (space) { return _this._actionWidget && space.widget !== _this._actionWidget.widget || !ignoreResizing; })
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
     * @param {?} widget
     * @return {?}
     */
    DashboardService.prototype.getWidgetBelow = /**
     * @param {?} widget
     * @return {?}
     */
    function (widget) {
        var /** @type {?} */ target = this.getWidgetsAtPosition(widget.getColumn(), widget.getRow() + widget.getRowSpan(), true);
        return target.length > 0 ? target[0] : null;
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
    /**
     * @param {?} widget
     * @return {?}
     */
    DashboardService.prototype.onShiftStart = /**
     * @param {?} widget
     * @return {?}
     */
    function (widget) {
        this.onDragStart({ direction: ActionDirection.Move, widget: widget });
    };
    /** Programmatically move a widget in a given direction */
    /**
     * Programmatically move a widget in a given direction
     * @param {?} widget
     * @param {?} direction
     * @return {?}
     */
    DashboardService.prototype.onShift = /**
     * Programmatically move a widget in a given direction
     * @param {?} widget
     * @param {?} direction
     * @return {?}
     */
    function (widget, direction) {
        // get the current mouse position
        var /** @type {?} */ deltaX = 0, /** @type {?} */ deltaY = 0;
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
        var /** @type {?} */ dimensions = {
            x: widget.x + deltaX,
            y: widget.y + deltaY,
            width: widget.width,
            height: widget.height
        };
        // update placeholder position and value
        this.setPlaceholderBounds(false, dimensions.x, dimensions.y, dimensions.width, dimensions.height);
        // update widget position
        var _a = this.placeholder$.value, x = _a.x, y = _a.y;
        // move the widget to the placeholder position
        widget.setBounds(x - this.options.padding, y - this.options.padding, dimensions.width, dimensions.height);
        // update the height of the dashboard
        this.setDashboardHeight();
    };
    /**
     * @return {?}
     */
    DashboardService.prototype.onShiftEnd = /**
     * @return {?}
     */
    function () {
        // show the widget positions if the current positions and sizes were to persist
        this.shiftWidgets();
        // the height of the dashboard may have changed after moving widgets
        this.setDashboardHeight();
        // reset all properties
        this.onDragEnd();
    };
    /** Programmatically resize a widget in a given direction */
    /**
     * Programmatically resize a widget in a given direction
     * @param {?} widget
     * @param {?} direction
     * @return {?}
     */
    DashboardService.prototype.onResize = /**
     * Programmatically resize a widget in a given direction
     * @param {?} widget
     * @param {?} direction
     * @return {?}
     */
    function (widget, direction) {
        // do not perform resizing if we are in stacked mode
        if (this.stacked) {
            return;
        }
        // perform the resizing
        var /** @type {?} */ deltaX = 0, /** @type {?} */ deltaY = 0;
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
        var /** @type {?} */ dimensions = {
            x: widget.x,
            y: widget.y,
            width: widget.width + deltaX,
            height: widget.height + deltaY
        };
        var /** @type {?} */ currentWidth = widget.x + widget.width;
        var /** @type {?} */ currentHeight = widget.y + widget.height;
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
    };
    /**
     * @param {?} widget
     * @param {?} direction
     * @return {?}
     */
    DashboardService.prototype.getSurroundingWidgets = /**
     * @param {?} widget
     * @param {?} direction
     * @return {?}
     */
    function (widget, direction) {
        var /** @type {?} */ widgets = [];
        for (var /** @type {?} */ column = widget.getColumn(); column < widget.getColumn() + widget.getColumnSpan(); column++) {
            switch (direction) {
                case ActionDirection.Top:
                    widgets = tslib_1.__spread(widgets, this.getWidgetsAtPosition(column, widget.getRow() - 1));
                    break;
                case ActionDirection.Bottom:
                    widgets = tslib_1.__spread(widgets, this.getWidgetsAtPosition(column, widget.getRow() + widget.getRowSpan()));
                    break;
            }
        }
        return widgets;
    };
    DashboardService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    DashboardService.ctorParameters = function () { return []; };
    return DashboardService;
}());
export { DashboardService };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGFzaGJvYXJkLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9kYXNoYm9hcmQvZGFzaGJvYXJkLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFhLE1BQU0sZUFBZSxDQUFDO0FBQ3RELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUV2RCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM5RSxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQ3ZDLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQzs7SUE4Q3RDO1FBQUEsaUJBS0M7MEJBMUM0QixDQUFDO3dCQUluQixJQUFJLGVBQWUsQ0FBNkIsRUFBRSxDQUFDO3dCQUNuRCxJQUFJLGVBQWUsQ0FBbUIsY0FBYyxDQUFDOzJCQUNsRCxJQUFJLGVBQWUsQ0FBc0IsRUFBRSxDQUFDO3VCQUM1QixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsRUFBRSxHQUFHLENBQUMsVUFBQSxVQUFVLElBQUksT0FBQSxVQUFVLENBQUMsTUFBTSxFQUFqQixDQUFpQixDQUFDLEVBQUUsb0JBQW9CLEVBQUUsQ0FBQzs0QkFDMUcsSUFBSSxlQUFlLENBQXVCLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLENBQUM7dUJBQ25HLElBQUksT0FBTyxFQUF5Qjt3QkFDbkMsSUFBSSxlQUFlLENBQVUsS0FBSyxDQUFDOzJCQUNoQyxJQUFJLGVBQWUsQ0FBMkIsSUFBSSxDQUFD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R0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQztRQUMzRCxxQkFBTSxhQUFhLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUM7O1FBRzdELEVBQUUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNuQixVQUFVLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNqQixVQUFVLENBQUMsS0FBSyxHQUFHLFlBQVksQ0FBQztTQUNuQztRQUVELEVBQUUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNuQixVQUFVLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNqQixVQUFVLENBQUMsTUFBTSxHQUFHLGFBQWEsQ0FBQztTQUNyQztRQUVELEVBQUUsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsR0FBRyxVQUFVLENBQUMsS0FBSyxDQUFDLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQzVELFVBQVUsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEdBQUcsVUFBVSxDQUFDLENBQUMsQ0FBQztTQUMzRDs7UUFHRCxFQUFFLENBQUMsQ0FBQyxVQUFVLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUMzQyxVQUFVLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQy9CLFVBQVUsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUM7U0FDNUM7O1FBR0QsRUFBRSxDQUFDLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFD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QUFNLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNsRixLQUFLLENBQUM7Z0JBRVYsS0FBSyxlQUFlLENBQUMsTUFBTTtvQkFDdkIsT0FBTyxvQkFBTyxPQUFPLEVBQUssSUFBSSxDQUFDLG9CQUFvQixDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsTUFBTSxFQUFFLEdBQUcsTUFBTSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsQ0FBQztvQkFDcEcsS0FBSyxDQUFDO2FBQ2I7U0FDSjtRQUVELE1BQU0sQ0FBQyxPQUFPLENBQUM7S0FDbEI7O2dCQXJ1Q0osVUFBVTs7OzsyQkFUWDs7U0FVYSxnQkFBZ0I7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXV1QzdCLE1BQU0sQ0FBQyxxQkFBTSxjQUFjLEdBQXFCLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMvQmVoYXZpb3JTdWJqZWN0JztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xuaW1wb3J0IHsgZGlzdGluY3RVbnRpbENoYW5nZWQsIGZpbHRlciwgbWFwLCB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcy9TdWJqZWN0JztcbmltcG9ydCB7IHRpY2sgfSBmcm9tICcuLi8uLi9jb21tb24vaW5kZXgnO1xuaW1wb3J0IHsgRGFzaGJvYXJkT3B0aW9ucyB9IGZyb20gJy4vZGFzaGJvYXJkLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBEYXNoYm9hcmRXaWRnZXRDb21wb25lbnQgfSBmcm9tICcuL3dpZGdldC9kYXNoYm9hcmQtd2lkZ2V0LmNvbXBvbmVudCc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBEYXNoYm9hcmRTZXJ2aWNlIGltcGxlbWVudHMgT25EZXN0cm95IHtcblxuICAgIHByaXZhdGUgX3dpZGdldE9yaWdpbjogeyBjb2x1bW4/OiBudW1iZXIsIHJvdz86IG51bWJlciwgY29sdW1uU3Bhbj86IG51bWJlciwgcm93U3Bhbj86IG51bWJlciB9O1xuICAgIHByaXZhdGUgX2FjdGlvbldpZGdldDogRGFzaGJvYXJkQWN0aW9uO1xuICAgIHByaXZhdGUgX3Jvd0hlaWdodDogbnVtYmVyID0gMDtcbiAgICBwcml2YXRlIF9jYWNoZTogRGFzaGJvYXJkQ2FjaGVbXTtcbiAgICBwcml2YXRlIF9ldmVudDogTW91c2VFdmVudDtcblxuICAgIHdpZGdldHMkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxEYXNoYm9hcmRXaWRnZXRDb21wb25lbnRbXT4oW10pO1xuICAgIG9wdGlvbnMkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxEYXNoYm9hcmRPcHRpb25zPihkZWZhdWx0T3B0aW9ucyk7XG4gICAgZGltZW5zaW9ucyQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PERhc2hib2FyZERpbWVuc2lvbnM+KHt9KTtcbiAgICBoZWlnaHQkOiBPYnNlcnZhYmxlPG51bWJlcj4gPSB0aGlzLmRpbWVuc2lvbnMkLnBpcGUodGljaygpLCBtYXAoZGltZW5zaW9ucyA9PiBkaW1lbnNpb25zLmhlaWdodCksIGRpc3RpbmN0VW50aWxDaGFuZ2VkKCkpO1xuICAgIHBsYWNlaG9sZGVyJCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8RGFzaGJvYXJkUGxhY2Vob2xkZXI+KHsgdmlzaWJsZTogZmFsc2UsIHg6IDAsIHk6IDAsIHdpZHRoOiAwLCBoZWlnaHQ6IDAgfSk7XG4gICAgbGF5b3V0JCA9IG5ldyBTdWJqZWN0PERhc2hib2FyZExheW91dERhdGFbXT4oKTtcbiAgICBzdGFja2VkJCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICAgIGlzRHJhZ2dpbmckID0gbmV3IEJlaGF2aW9yU3ViamVjdDxEYXNoYm9hcmRXaWRnZXRDb21wb25lbnQ+KG51bGwpO1xuICAgIGlzR3JhYmJpbmckID0gbmV3IEJlaGF2aW9yU3ViamVjdDxEYXNoYm9hcmRXaWRnZXRDb21wb25lbnQ+KG51bGwpO1xuXG4gICAgZ2V0IG9wdGlvbnMoKTogRGFzaGJvYXJkT3B0aW9ucyB7XG4gICAgICAgIHJldHVybiB0aGlzLm9wdGlvbnMkLmdldFZhbHVlKCk7XG4gICAgfVxuXG4gICAgZ2V0IHdpZGdldHMoKTogRGFzaGJvYXJkV2lkZ2V0Q29tcG9uZW50W10ge1xuICAgICAgICByZXR1cm4gdGhpcy53aWRnZXRzJC5nZXRWYWx1ZSgpO1xuICAgIH1cblxuICAgIGdldCBzdGFja2VkKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5zdGFja2VkJC5nZXRWYWx1ZSgpO1xuICAgIH1cblxuICAgIGdldCBkaW1lbnNpb25zKCk6IERhc2hib2FyZERpbWVuc2lvbnMge1xuICAgICAgICByZXR1cm4gdGhpcy5kaW1lbnNpb25zJC5nZXRWYWx1ZSgpO1xuICAgIH1cblxuICAgIGdldCBjb2x1bW5XaWR0aCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5kaW1lbnNpb25zLndpZHRoIC8gdGhpcy5vcHRpb25zLmNvbHVtbnM7XG4gICAgfVxuXG4gICAgLyoqIFVuc3Vic2NyaWJlIGZyb20gYWxsIG9ic2VydmFibGVzIG9uIGRlc3Ryb3kgKi9cbiAgICBwcml2YXRlIF9vbkRlc3Ryb3kgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMubGF5b3V0JC5waXBlKHRha2VVbnRpbCh0aGlzLl9vbkRlc3Ryb3kpKS5zdWJzY3JpYmUodGhpcy5zZXRMYXlvdXREYXRhLmJpbmQodGhpcykpO1xuICAgICAgICB0aGlzLnN0YWNrZWQkLnBpcGUodGFrZVVudGlsKHRoaXMuX29uRGVzdHJveSksIGZpbHRlcihzdGFja2VkID0+IHN0YWNrZWQgPT09IHRydWUpKS5zdWJzY3JpYmUodGhpcy51cGRhdGVXaGVuU3RhY2tlZC5iaW5kKHRoaXMpKTtcbiAgICAgICAgdGhpcy53aWRnZXRzJC5waXBlKHRha2VVbnRpbCh0aGlzLl9vbkRlc3Ryb3kpLCB0aWNrKCkpLnN1YnNjcmliZSgoKSA9PiB0aGlzLnJlbmRlckRhc2hib2FyZCgpKTtcbiAgICAgICAgdGhpcy5kaW1lbnNpb25zJC5waXBlKHRha2VVbnRpbCh0aGlzLl9vbkRlc3Ryb3kpLCB0aWNrKCkpLnN1YnNjcmliZSgoKSA9PiB0aGlzLnJlbmRlckRhc2hib2FyZCgpKTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fb25EZXN0cm95Lm5leHQoKTtcbiAgICAgICAgdGhpcy5fb25EZXN0cm95LmNvbXBsZXRlKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWRkIGEgd2lkZ2V0IHRvIHRoZSBkYXNoYm9hcmRcbiAgICAgKiBAcGFyYW0gd2lkZ2V0IFRoZSB3aWRnZXQgY29tcG9uZW50IHRvIGFkZCB0byB0aGUgZGFzaGJvYXJkXG4gICAgICovXG4gICAgYWRkV2lkZ2V0KHdpZGdldDogRGFzaGJvYXJkV2lkZ2V0Q29tcG9uZW50KTogdm9pZCB7XG4gICAgICAgIHRoaXMud2lkZ2V0cyQubmV4dChbLi4udGhpcy53aWRnZXRzJC5nZXRWYWx1ZSgpLCB3aWRnZXRdKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmUgYSB3aWRnZXQgZnJvbSB0aGUgZGFzaGJvYXJkXG4gICAgICogQHBhcmFtIHdpZGdldCBUaGUgd2lkZ2V0IHRvIHJlbW92ZVxuICAgICAqL1xuICAgIHJlbW92ZVdpZGdldCh3aWRnZXQ6IERhc2hib2FyZFdpZGdldENvbXBvbmVudCk6IHZvaWQge1xuICAgICAgICB0aGlzLndpZGdldHMkLm5leHQodGhpcy53aWRnZXRzJC5nZXRWYWx1ZSgpLmZpbHRlcihfd2lkZ2V0ID0+IF93aWRnZXQgIT09IHdpZGdldCkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEluZGljYXRlIHRoYXQgdGhlIGRhc2hib2FyZCBlbGVtZW50IGhhcyBiZWVuIHJlc2l6ZWRcbiAgICAgKiBAcGFyYW0gd2lkdGggVGhlIHdpZHRoIG9mIHRoZSBkYXNoYm9hcmQgZWxlbWVudCBpbiBweFxuICAgICAqIEBwYXJhbSBoZWlnaHQgVGhlIGhlaWdodCBvZiB0aGUgZGFzaGJvYXJkIGVsZW1lbnQgaW4gcHhcbiAgICAgKi9cbiAgICBzZXREaW1lbnNpb25zKHdpZHRoOiBudW1iZXIgPSB0aGlzLmRpbWVuc2lvbnMud2lkdGgsIGhlaWdodDogbnVtYmVyID0gdGhpcy5kaW1lbnNpb25zLmhlaWdodCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5kaW1lbnNpb25zLndpZHRoICE9PSB3aWR0aCB8fCB0aGlzLmRpbWVuc2lvbnMuaGVpZ2h0ICE9PSBoZWlnaHQpIHtcbiAgICAgICAgICAgIHRoaXMuZGltZW5zaW9ucyQubmV4dCh7IHdpZHRoOiB3aWR0aCwgaGVpZ2h0OiBoZWlnaHQgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQcm9kdWNlIGFuIG9iamVjdCBjb250YWluaW5nIGFsbCB0aGUgcmVxdWlyZWQgbGF5b3V0IGRhdGEuXG4gICAgICogVGhpcyBjYW4gYmUgdXNlZnVsIGZvciBleHBvcnRpbmcvc2F2aW5nIGEgbGF5b3V0XG4gICAgICovXG4gICAgZ2V0TGF5b3V0RGF0YSgpOiBEYXNoYm9hcmRMYXlvdXREYXRhW10ge1xuICAgICAgICByZXR1cm4gdGhpcy53aWRnZXRzLm1hcCh3aWRnZXQgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHsgaWQ6IHdpZGdldC5pZCwgY29sOiB3aWRnZXQuZ2V0Q29sdW1uKCksIHJvdzogd2lkZ2V0LmdldFJvdygpLCBjb2xTcGFuOiB3aWRnZXQuZ2V0Q29sdW1uU3BhbigpLCByb3dTcGFuOiB3aWRnZXQuZ2V0Um93U3BhbigpIH07XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFBvc2l0aW9uIHdpZGdldHMgcHJvZ3JhbWF0aWNhbGx5XG4gICAgICovXG4gICAgc2V0TGF5b3V0RGF0YSh3aWRnZXRzOiBEYXNoYm9hcmRMYXlvdXREYXRhW10pOiB2b2lkIHtcblxuICAgICAgICAvLyBpdGVyYXRlIHRocm91Z2ggZWFjaCB3aWRnZXQgZGF0YSBhbmQgZmluZCBhIG1hdGNoXG4gICAgICAgIHdpZGdldHMuZm9yRWFjaCh3aWRnZXQgPT4ge1xuXG4gICAgICAgICAgICAvLyBmaW5kIHRoZSBtYXRjaGluZyB3aWRnZXRcbiAgICAgICAgICAgIGNvbnN0IHRhcmdldCA9IHRoaXMud2lkZ2V0cy5maW5kKF93aWRnZXQgPT4gX3dpZGdldC5pZCA9PT0gd2lkZ2V0LmlkKTtcblxuICAgICAgICAgICAgaWYgKHRhcmdldCkge1xuICAgICAgICAgICAgICAgIHRhcmdldC5zZXRDb2x1bW4od2lkZ2V0LmNvbCk7XG4gICAgICAgICAgICAgICAgdGFyZ2V0LnNldFJvdyh3aWRnZXQucm93KTtcbiAgICAgICAgICAgICAgICB0YXJnZXQuc2V0Q29sdW1uU3Bhbih3aWRnZXQuY29sU3Bhbik7XG4gICAgICAgICAgICAgICAgdGFyZ2V0LnNldFJvd1NwYW4od2lkZ2V0LnJvd1NwYW4pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBVcGRhdGUgdGhlIHBvc2l0aW9ucyBhbmQgc2l6ZXMgb2YgdGhlIHdpZGdldHNcbiAgICAgKi9cbiAgICByZW5kZXJEYXNoYm9hcmQoKTogdm9pZCB7XG5cbiAgICAgICAgLy8gZ2V0IHRoZSBkaW1lbnNpb25zIG9mIHRoZSBkYXNoYm9hcmRcbiAgICAgICAgdGhpcy5fcm93SGVpZ2h0ID0gdGhpcy5vcHRpb25zLnJvd0hlaWdodCB8fCB0aGlzLmNvbHVtbldpZHRoO1xuXG4gICAgICAgIC8vIGVuc3VyZSB0aGUgY29sdW1uIHdpZHRoIGlzIG5vdCBiZWxvdyB0aGUgbWluIHdpZHRoc1xuICAgICAgICB0aGlzLnN0YWNrZWQkLm5leHQodGhpcy5jb2x1bW5XaWR0aCA8IHRoaXMub3B0aW9ucy5taW5XaWR0aCk7XG5cbiAgICAgICAgLy8gZW5zdXJlIHRoZSByb3cgaGVpZ2h0IGlzIG5vdCBiZWxvdyB0aGUgbWluIHdpZHRoc1xuICAgICAgICBpZiAodGhpcy5fcm93SGVpZ2h0IDwgdGhpcy5vcHRpb25zLm1pbldpZHRoKSB7XG4gICAgICAgICAgICB0aGlzLl9yb3dIZWlnaHQgPSB0aGlzLm9wdGlvbnMubWluV2lkdGg7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNldERhc2hib2FyZExheW91dCgpO1xuXG4gICAgICAgIC8vIGl0ZXJhdGUgdGhyb3VnaCBlYWNoIHdpZGdldCBhbmQgc2V0IHRoZSBzaXplIC0gZXhjZXB0IHRoZSBvbmUgYmVpbmcgcmVzaXplZFxuICAgICAgICB0aGlzLndpZGdldHMuZmlsdGVyKHdpZGdldCA9PiAhdGhpcy5fYWN0aW9uV2lkZ2V0IHx8IHdpZGdldCAhPT0gdGhpcy5fYWN0aW9uV2lkZ2V0LndpZGdldClcbiAgICAgICAgICAgIC5mb3JFYWNoKHdpZGdldCA9PiB3aWRnZXQucmVuZGVyKCkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERldGVybWluZSB3aGVyZSB3aWRnZXRzIHNob3VsZCBiZSBwb3NpdGlvbmVkIGJhc2VkIG9uIHRoZWlyIHBvc2l0aW9ucywgd2lkdGggYW5kIHRoZSBzaXplIG9mIHRoZSBjb250YWluZXJcbiAgICAgKi9cbiAgICBzZXREYXNoYm9hcmRMYXlvdXQoKTogdm9pZCB7XG5cbiAgICAgICAgLy8gZmluZCBhbnkgd2lkZ2V0cyB0aGF0IGRvIG5vdCBjdXJyZW50bHkgaGF2ZSBhIHBvc2l0aW9uIHNldFxuICAgICAgICB0aGlzLndpZGdldHMuZmlsdGVyKHdpZGdldCA9PiB3aWRnZXQuZ2V0Q29sdW1uKCkgPT09IHVuZGVmaW5lZCB8fCB3aWRnZXQuZ2V0Um93KCkgPT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgIC5mb3JFYWNoKHdpZGdldCA9PiB0aGlzLnNldFdpZGdldFBvc2l0aW9uKHdpZGdldCkpO1xuXG4gICAgICAgIHRoaXMuc2V0RGFzaGJvYXJkSGVpZ2h0KCk7XG4gICAgfVxuXG4gICAgdXBkYXRlV2hlblN0YWNrZWQoKTogdm9pZCB7XG5cbiAgICAgICAgLy8gaXRlcmF0ZSB0aHJvdWdoIGVhY2ggd2lkZ2V0IHNldCBpdCdzIHN0YWNrZWQgc3RhdGUgYW5kXG4gICAgICAgIHRoaXMuZ2V0V2lkZ2V0c0J5T3JkZXIoKS5mb3JFYWNoKCh3aWRnZXQsIGlkeCkgPT4ge1xuICAgICAgICAgICAgd2lkZ2V0LnNldENvbHVtbigwKTtcbiAgICAgICAgICAgIHdpZGdldC5zZXRSb3coaWR4KTtcbiAgICAgICAgfSk7XG5cbiAgICB9XG5cbiAgICBnZXRXaWRnZXRzQnlPcmRlcigpOiBEYXNoYm9hcmRXaWRnZXRDb21wb25lbnRbXSB7XG4gICAgICAgIHJldHVybiB0aGlzLndpZGdldHMuc29ydCgodzEsIHcyKSA9PiB7XG5cbiAgICAgICAgICAgIGNvbnN0IHcxUG9zaXRpb24gPSB3MS5nZXRDb2x1bW4oKSArICh3MS5nZXRSb3coKSAqIHRoaXMub3B0aW9ucy5jb2x1bW5zKTtcbiAgICAgICAgICAgIGNvbnN0IHcyUG9zaXRpb24gPSB3Mi5nZXRDb2x1bW4oKSArICh3Mi5nZXRSb3coKSAqIHRoaXMub3B0aW9ucy5jb2x1bW5zKTtcblxuICAgICAgICAgICAgaWYgKHcxUG9zaXRpb24gPCB3MlBvc2l0aW9uKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIC0xO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodzFQb3NpdGlvbiA+IHcyUG9zaXRpb24pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gMTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEZpbmQgYSBwb3NpdGlvbiB0aGF0IGEgd2lkZ2V0IGNhbiBmaXQgaW4gdGhlIGRhc2hib2FyZFxuICAgICAqIEBwYXJhbSB3aWRnZXQgVGhlIHdpZGdldCB0byB0cnkgYW5kIHBvc2l0aW9uXG4gICAgICovXG4gICAgc2V0V2lkZ2V0UG9zaXRpb24od2lkZ2V0OiBEYXNoYm9hcmRXaWRnZXRDb21wb25lbnQpOiB2b2lkIHtcblxuICAgICAgICAvLyBmaW5kIGEgcG9zaXRpb24gZm9yIHRoZSB3aWRnZXRcbiAgICAgICAgbGV0IHBvc2l0aW9uID0gMDtcbiAgICAgICAgbGV0IHN1Y2Nlc3MgPSBmYWxzZTtcblxuICAgICAgICAvLyByZXBlYXQgdW50aWwgYSBzcGFjZSBpcyBmb3VuZFxuICAgICAgICB3aGlsZSAoIXN1Y2Nlc3MpIHtcblxuICAgICAgICAgICAgLy8gZ2V0IGEgcG9zaXRpb24gdG8gdHJ5XG4gICAgICAgICAgICBjb25zdCBjb2x1bW4gPSBwb3NpdGlvbiAlIHRoaXMub3B0aW9ucy5jb2x1bW5zO1xuICAgICAgICAgICAgY29uc3Qgcm93ID0gTWF0aC5mbG9vcihwb3NpdGlvbiAvIHRoaXMub3B0aW9ucy5jb2x1bW5zKTtcblxuICAgICAgICAgICAgLy8gY2hlY2sgdGhlIGN1cnJlbnQgcG9zaXRpb25cbiAgICAgICAgICAgIGlmICh0aGlzLmdldFBvc2l0aW9uQXZhaWxhYmxlKGNvbHVtbiwgcm93LCB3aWRnZXQuZ2V0Q29sdW1uU3BhbigpLCB3aWRnZXQuZ2V0Um93U3BhbigpKSkge1xuICAgICAgICAgICAgICAgIHN1Y2Nlc3MgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHdpZGdldC5zZXRDb2x1bW4oY29sdW1uKTtcbiAgICAgICAgICAgICAgICB3aWRnZXQuc2V0Um93KHJvdyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoY29sdW1uID09PSAwICYmIHdpZGdldC5jb2xTcGFuID4gdGhpcy5vcHRpb25zLmNvbHVtbnMpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Rhc2hib2FyZCB3aWRnZXRzIGhhdmUgYSBjb2xTcGFuIGdyZWF0ZXIgdGhhbiB0aGUgbWF4IG51bWJlciBvZiBkYXNoYm9hcmQgY29sdW1ucyEnKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcG9zaXRpb24rKztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENoZWNrIGlmIGEgcG9zaXRpb24gaW4gdGhlIGRhc2hib2FyZCBpcyB2YWNhbnQgb3Igbm90XG4gICAgICovXG4gICAgZ2V0UG9zaXRpb25BdmFpbGFibGUoY29sdW1uOiBudW1iZXIsIHJvdzogbnVtYmVyLCBjb2x1bW5TcGFuOiBudW1iZXIsIHJvd1NwYW46IG51bWJlciwgaWdub3JlV2lkZ2V0PzogRGFzaGJvYXJkV2lkZ2V0Q29tcG9uZW50KTogYm9vbGVhbiB7XG5cbiAgICAgICAgLy8gZ2V0IGEgbGlzdCBvZiBncmlkIHNwYWNlcyB0aGF0IGFyZSBwb3B1bGF0ZWRcbiAgICAgICAgY29uc3Qgc3BhY2VzID0gdGhpcy5nZXRPY2N1cGllZFNwYWNlcygpO1xuXG4gICAgICAgIC8vIGNoZWNrIGlmIHRoZSBibG9jayB3b3VsZCBzdGlsbCBiZSBpbiBib3VuZHNcbiAgICAgICAgaWYgKGNvbHVtbiArIGNvbHVtblNwYW4gPiB0aGlzLm9wdGlvbnMuY29sdW1ucykge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gY2hlY2sgZWFjaCByZXF1aXJlZCBwb3NpdGlvblxuICAgICAgICBmb3IgKGxldCB4ID0gY29sdW1uOyB4IDwgY29sdW1uICsgY29sdW1uU3BhbjsgeCsrKSB7XG4gICAgICAgICAgICBmb3IgKGxldCB5ID0gcm93OyB5IDwgcm93ICsgcm93U3BhbjsgeSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKHNwYWNlcy5maW5kKGJsb2NrID0+IGJsb2NrLmNvbHVtbiA9PT0geCAmJiBibG9jay5yb3cgPT09IHkgJiYgYmxvY2sud2lkZ2V0ICE9PSBpZ25vcmVXaWRnZXQpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBnZXRPY2N1cGllZFNwYWNlcygpOiBEYXNoYm9hcmRTcGFjZVtdIHtcblxuICAgICAgICAvLyBmaW5kIGFsbCBzcGFjZXMgdGhhdCBhcmUgY3VycmVudGx5IG9jY3VwaWVkXG4gICAgICAgIHJldHVybiB0aGlzLndpZGdldHMuZmlsdGVyKHdpZGdldCA9PiB3aWRnZXQuZ2V0Q29sdW1uKCkgIT09IHVuZGVmaW5lZCAmJiB3aWRnZXQuZ2V0Um93KCkgIT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgIC5yZWR1Y2UoKHZhbHVlLCB3aWRnZXQpID0+IHtcblxuICAgICAgICAgICAgICAgIHRoaXMuZm9yRWFjaEJsb2NrKHdpZGdldCwgKGNvbHVtbiwgcm93KSA9PiB2YWx1ZS5wdXNoKHsgd2lkZ2V0OiB3aWRnZXQsIGNvbHVtbjogY29sdW1uLCByb3c6IHJvdyB9KSk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgICAgICB9LCBbXSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQmVnaW4gcmVzaXppbmcgYSB3aWRnZXRcbiAgICAgKiBAcGFyYW0gYWN0aW9uIFRoZSB0aGUgd2lkZ2V0IHRvIHJlc2l6ZVxuICAgICAqL1xuICAgIG9uUmVzaXplU3RhcnQoYWN0aW9uOiBEYXNoYm9hcmRBY3Rpb24pOiB2b2lkIHtcblxuICAgICAgICAvLyBzdG9yZSB0aGUgbW91c2UgZXZlbnRcbiAgICAgICAgdGhpcy5fZXZlbnQgPSBhY3Rpb24uZXZlbnQ7XG4gICAgICAgIHRoaXMuX2FjdGlvbldpZGdldCA9IGFjdGlvbjtcblxuICAgICAgICAvLyBicmluZyB0aGUgd2lkZ2V0IHRvIHRoZSBmb250XG4gICAgICAgIHRoaXMuYnJpbmdUb0Zyb250KGFjdGlvbi53aWRnZXQpO1xuICAgIH1cblxuICAgIG9uUmVzaXplRHJhZyhhY3Rpb246IERhc2hib2FyZEFjdGlvbik6IHZvaWQge1xuXG4gICAgICAgIGNvbnN0IG1vdXNlUG9zWCA9IHRoaXMuX2V2ZW50LnBhZ2VYIC0gcGFnZVhPZmZzZXQ7XG4gICAgICAgIGNvbnN0IG1vdXNlUG9zWSA9IHRoaXMuX2V2ZW50LnBhZ2VZIC0gcGFnZVlPZmZzZXQ7XG5cbiAgICAgICAgLy8gaWYgdGhlcmUgd2FzIG5vIG1vdmVtZW50IHRoZW4gZG8gbm90aGluZ1xuICAgICAgICBpZiAoYWN0aW9uLmV2ZW50LnggPT09IG1vdXNlUG9zWCAmJiBhY3Rpb24uZXZlbnQueSA9PT0gbW91c2VQb3NZKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyB1cGRhdGUgdGhlIHN0b3JlZCBtb3VzZSBldmVudFxuICAgICAgICB0aGlzLl9ldmVudCA9IGFjdGlvbi5ldmVudDtcblxuICAgICAgICAvLyBnZXQgaGFuZGxlIGZvciBkaXJlY3Rpb25cbiAgICAgICAgY29uc3QgeyBoYW5kbGUgfSA9IGFjdGlvbjtcblxuICAgICAgICAvLyBnZXQgdGhlIGJvdW5kcyBvZiB0aGUgaGFuZGxlXG4gICAgICAgIGNvbnN0IGJvdW5kcyA9IGhhbmRsZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuICAgICAgICAvLyBnZXQgdGhlIGNlbnRlciBvZiB0aGUgaGFuZGxlXG4gICAgICAgIGNvbnN0IGNlbnRlclggPSBib3VuZHMubGVmdCArIChib3VuZHMud2lkdGggLyAyKTtcbiAgICAgICAgY29uc3QgY2VudGVyWSA9IGJvdW5kcy50b3AgKyAoYm91bmRzLmhlaWdodCAvIDIpO1xuXG4gICAgICAgIC8vIGdldCB0aGUgY3VycmVudCBtb3VzZSBwb3NpdGlvblxuICAgICAgICBjb25zdCBtb3VzZVggPSBtb3VzZVBvc1ggLSBjZW50ZXJYO1xuICAgICAgICBjb25zdCBtb3VzZVkgPSBtb3VzZVBvc1kgLSBjZW50ZXJZO1xuXG4gICAgICAgIC8vIHN0b3JlIHRoZSBuZXcgcHJvcG9zZWQgZGltZW5zaW9ucyBmb3IgdGhlIHdpZGdldFxuICAgICAgICBjb25zdCBkaW1lbnNpb25zOiBEYXNoYm9hcmRXaWRnZXREaW1lbnNpb25zID0ge1xuICAgICAgICAgICAgeDogYWN0aW9uLndpZGdldC54LFxuICAgICAgICAgICAgeTogYWN0aW9uLndpZGdldC55LFxuICAgICAgICAgICAgd2lkdGg6IGFjdGlvbi53aWRnZXQud2lkdGgsXG4gICAgICAgICAgICBoZWlnaHQ6IGFjdGlvbi53aWRnZXQuaGVpZ2h0XG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gdXBkYXRlIHdpZGdldCBiYXNlZCBvbiB0aGUgaGFuZGxlIGJlaW5nIGRyYWdnZWRcbiAgICAgICAgc3dpdGNoIChhY3Rpb24uZGlyZWN0aW9uKSB7XG5cbiAgICAgICAgICAgIGNhc2UgQWN0aW9uRGlyZWN0aW9uLlJpZ2h0OlxuICAgICAgICAgICAgICAgIGRpbWVuc2lvbnMud2lkdGggKz0gbW91c2VYO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIEFjdGlvbkRpcmVjdGlvbi5MZWZ0OlxuICAgICAgICAgICAgICAgIGRpbWVuc2lvbnMueCArPSBtb3VzZVg7XG4gICAgICAgICAgICAgICAgZGltZW5zaW9ucy53aWR0aCAtPSBtb3VzZVg7XG5cbiAgICAgICAgICAgICAgICBpZiAoZGltZW5zaW9ucy53aWR0aCA8IHRoaXMub3B0aW9ucy5taW5XaWR0aCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBkaWZmZXJlbmNlID0gdGhpcy5vcHRpb25zLm1pbldpZHRoIC0gZGltZW5zaW9ucy53aWR0aDtcbiAgICAgICAgICAgICAgICAgICAgZGltZW5zaW9ucy54IC09IGRpZmZlcmVuY2U7XG4gICAgICAgICAgICAgICAgICAgIGRpbWVuc2lvbnMud2lkdGggKz0gZGlmZmVyZW5jZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSBBY3Rpb25EaXJlY3Rpb24uQm90dG9tOlxuICAgICAgICAgICAgICAgIGRpbWVuc2lvbnMuaGVpZ2h0ICs9IG1vdXNlWTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSBBY3Rpb25EaXJlY3Rpb24uVG9wOlxuICAgICAgICAgICAgICAgIGRpbWVuc2lvbnMueSArPSBtb3VzZVk7XG4gICAgICAgICAgICAgICAgZGltZW5zaW9ucy5oZWlnaHQgLT0gbW91c2VZO1xuXG4gICAgICAgICAgICAgICAgaWYgKGRpbWVuc2lvbnMuaGVpZ2h0IDwgdGhpcy5vcHRpb25zLm1pbkhlaWdodCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBkaWZmZXJlbmNlID0gdGhpcy5vcHRpb25zLm1pbkhlaWdodCAtIGRpbWVuc2lvbnMuaGVpZ2h0O1xuICAgICAgICAgICAgICAgICAgICBkaW1lbnNpb25zLnkgLT0gZGlmZmVyZW5jZTtcbiAgICAgICAgICAgICAgICAgICAgZGltZW5zaW9ucy5oZWlnaHQgKz0gZGlmZmVyZW5jZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIC8vIFN1cHBvcnQgcmVzaXppbmcgb24gbXVsdGlwbGUgYXhpcyBzaW11bHRhbmVvdXNseVxuICAgICAgICAgICAgY2FzZSBBY3Rpb25EaXJlY3Rpb24uVG9wTGVmdDpcblxuICAgICAgICAgICAgICAgIGRpbWVuc2lvbnMueCArPSBtb3VzZVg7XG4gICAgICAgICAgICAgICAgZGltZW5zaW9ucy53aWR0aCAtPSBtb3VzZVg7XG5cbiAgICAgICAgICAgICAgICBpZiAoZGltZW5zaW9ucy53aWR0aCA8IHRoaXMub3B0aW9ucy5taW5XaWR0aCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBkaWZmZXJlbmNlID0gdGhpcy5vcHRpb25zLm1pbldpZHRoIC0gZGltZW5zaW9ucy53aWR0aDtcbiAgICAgICAgICAgICAgICAgICAgZGltZW5zaW9ucy54IC09IGRpZmZlcmVuY2U7XG4gICAgICAgICAgICAgICAgICAgIGRpbWVuc2lvbnMud2lkdGggKz0gZGlmZmVyZW5jZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBkaW1lbnNpb25zLnkgKz0gbW91c2VZO1xuICAgICAgICAgICAgICAgIGRpbWVuc2lvbnMuaGVpZ2h0IC09IG1vdXNlWTtcblxuICAgICAgICAgICAgICAgIGlmIChkaW1lbnNpb25zLmhlaWdodCA8IHRoaXMub3B0aW9ucy5taW5IZWlnaHQpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZGlmZmVyZW5jZSA9IHRoaXMub3B0aW9ucy5taW5IZWlnaHQgLSBkaW1lbnNpb25zLmhlaWdodDtcbiAgICAgICAgICAgICAgICAgICAgZGltZW5zaW9ucy55IC09IGRpZmZlcmVuY2U7XG4gICAgICAgICAgICAgICAgICAgIGRpbWVuc2lvbnMuaGVpZ2h0ICs9IGRpZmZlcmVuY2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIEFjdGlvbkRpcmVjdGlvbi5Ub3BSaWdodDpcbiAgICAgICAgICAgICAgICBkaW1lbnNpb25zLndpZHRoICs9IG1vdXNlWDtcbiAgICAgICAgICAgICAgICBkaW1lbnNpb25zLnkgKz0gbW91c2VZO1xuICAgICAgICAgICAgICAgIGRpbWVuc2lvbnMuaGVpZ2h0IC09IG1vdXNlWTtcblxuICAgICAgICAgICAgICAgIGlmIChkaW1lbnNpb25zLmhlaWdodCA8IHRoaXMub3B0aW9ucy5taW5IZWlnaHQpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZGlmZmVyZW5jZSA9IHRoaXMub3B0aW9ucy5taW5IZWlnaHQgLSBkaW1lbnNpb25zLmhlaWdodDtcbiAgICAgICAgICAgICAgICAgICAgZGltZW5zaW9ucy55IC09IGRpZmZlcmVuY2U7XG4gICAgICAgICAgICAgICAgICAgIGRpbWVuc2lvbnMuaGVpZ2h0ICs9IGRpZmZlcmVuY2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIEFjdGlvbkRpcmVjdGlvbi5Cb3R0b21MZWZ0OlxuICAgICAgICAgICAgICAgIGRpbWVuc2lvbnMuaGVpZ2h0ICs9IG1vdXNlWTtcbiAgICAgICAgICAgICAgICBkaW1lbnNpb25zLnggKz0gbW91c2VYO1xuICAgICAgICAgICAgICAgIGRpbWVuc2lvbnMud2lkdGggLT0gbW91c2VYO1xuXG4gICAgICAgICAgICAgICAgaWYgKGRpbWVuc2lvbnMud2lkdGggPCB0aGlzLm9wdGlvbnMubWluV2lkdGgpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZGlmZmVyZW5jZSA9IHRoaXMub3B0aW9ucy5taW5XaWR0aCAtIGRpbWVuc2lvbnMud2lkdGg7XG4gICAgICAgICAgICAgICAgICAgIGRpbWVuc2lvbnMueCAtPSBkaWZmZXJlbmNlO1xuICAgICAgICAgICAgICAgICAgICBkaW1lbnNpb25zLndpZHRoICs9IGRpZmZlcmVuY2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIEFjdGlvbkRpcmVjdGlvbi5Cb3R0b21SaWdodDpcbiAgICAgICAgICAgICAgICBkaW1lbnNpb25zLmhlaWdodCArPSBtb3VzZVk7XG4gICAgICAgICAgICAgICAgZGltZW5zaW9ucy53aWR0aCArPSBtb3VzZVg7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBjdXJyZW50V2lkdGggPSBhY3Rpb24ud2lkZ2V0LnggKyBhY3Rpb24ud2lkZ2V0LndpZHRoO1xuICAgICAgICBjb25zdCBjdXJyZW50SGVpZ2h0ID0gYWN0aW9uLndpZGdldC55ICsgYWN0aW9uLndpZGdldC5oZWlnaHQ7XG5cbiAgICAgICAgLy8gZW5zdXJlIHZhbHVlcyBhcmUgd2l0aGluIHRoZSBkYXNoYm9hcmQgYm91bmRzXG4gICAgICAgIGlmIChkaW1lbnNpb25zLnggPCAwKSB7XG4gICAgICAgICAgICBkaW1lbnNpb25zLnggPSAwO1xuICAgICAgICAgICAgZGltZW5zaW9ucy53aWR0aCA9IGN1cnJlbnRXaWR0aDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChkaW1lbnNpb25zLnkgPCAwKSB7XG4gICAgICAgICAgICBkaW1lbnNpb25zLnkgPSAwO1xuICAgICAgICAgICAgZGltZW5zaW9ucy5oZWlnaHQgPSBjdXJyZW50SGVpZ2h0O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKChkaW1lbnNpb25zLnggKyBkaW1lbnNpb25zLndpZHRoKSA+IHRoaXMuZGltZW5zaW9ucy53aWR0aCkge1xuICAgICAgICAgICAgZGltZW5zaW9ucy53aWR0aCA9IHRoaXMuZGltZW5zaW9ucy53aWR0aCAtIGRpbWVuc2lvbnMueDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGlmIHRoZSBwcm9wb3NlZCB3aWR0aCBpcyBzbWFsbGVyIHRoYW4gYWxsb3dlZCB0aGVuIHJlc2V0IHdpZHRoIHRvIG1pbmltdW0gYW5kIGlnbm9yZSB4IGNoYW5nZXNcbiAgICAgICAgaWYgKGRpbWVuc2lvbnMud2lkdGggPCB0aGlzLm9wdGlvbnMubWluV2lkdGgpIHtcbiAgICAgICAgICAgIGRpbWVuc2lvbnMueCA9IGFjdGlvbi53aWRnZXQueDtcbiAgICAgICAgICAgIGRpbWVuc2lvbnMud2lkdGggPSB0aGlzLm9wdGlvbnMubWluV2lkdGg7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBpZiB0aGUgcHJvcG9zZWQgaGVpZ2h0IGlzIHNtYWxsZXIgdGhhbiBhbGxvd2VkIHRoZW4gcmVzZXQgaGVpZ2h0IHRvIG1pbmltdW0gYW5kIGlnbm9yZSB5IGNoYW5nZXNcbiAgICAgICAgaWYgKGRpbWVuc2lvbnMuaGVpZ2h0IDwgdGhpcy5vcHRpb25zLm1pbkhlaWdodCkge1xuICAgICAgICAgICAgZGltZW5zaW9ucy55ID0gYWN0aW9uLndpZGdldC55O1xuICAgICAgICAgICAgZGltZW5zaW9ucy5oZWlnaHQgPSB0aGlzLm9wdGlvbnMubWluSGVpZ2h0O1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gdXBkYXRlIHRoZSB3aWRnZXQgYWN0dWFsIHZhbHVlc1xuICAgICAgICBhY3Rpb24ud2lkZ2V0LnNldEJvdW5kcyhkaW1lbnNpb25zLngsIGRpbWVuc2lvbnMueSwgZGltZW5zaW9ucy53aWR0aCwgZGltZW5zaW9ucy5oZWlnaHQpO1xuXG4gICAgICAgIC8vIHVwZGF0ZSBwbGFjZWhvbGRlciBwb3NpdGlvbiBhbmQgdmFsdWVcbiAgICAgICAgdGhpcy5zZXRQbGFjZWhvbGRlckJvdW5kcyh0cnVlLCBkaW1lbnNpb25zLngsIGRpbWVuc2lvbnMueSwgZGltZW5zaW9ucy53aWR0aCwgZGltZW5zaW9ucy5oZWlnaHQpO1xuXG4gICAgICAgIC8vIHNob3cgdGhlIHdpZGdldCBwb3NpdGlvbnMgaWYgdGhlIGN1cnJlbnQgcG9zaXRpb25zIGFuZCBzaXplcyB3ZXJlIHRvIHBlcnNpc3RcbiAgICAgICAgdGhpcy51cGRhdGVXaWRnZXRQb3NpdGlvbnMoYWN0aW9uLndpZGdldCk7XG4gICAgfVxuXG4gICAgb25SZXNpemVFbmQoKTogdm9pZCB7XG5cbiAgICAgICAgY29uc3QgcGxhY2Vob2xkZXIgPSB0aGlzLnBsYWNlaG9sZGVyJC5nZXRWYWx1ZSgpO1xuXG4gICAgICAgIC8vIGNvbW1pdCByZXNpemUgY2hhbmdlc1xuICAgICAgICB0aGlzLmNvbW1pdFdpZGdldENoYW5nZXMoKTtcblxuICAgICAgICAvLyBoaWRlIHBsYWNlaG9sZGVyXG4gICAgICAgIHBsYWNlaG9sZGVyLnZpc2libGUgPSBmYWxzZTtcblxuICAgICAgICAvLyB1cGRhdGUgdGhlIHBsYWNlaG9sZGVyXG4gICAgICAgIHRoaXMucGxhY2Vob2xkZXIkLm5leHQocGxhY2Vob2xkZXIpO1xuXG4gICAgICAgIHRoaXMuX2FjdGlvbldpZGdldCA9IG51bGw7XG4gICAgICAgIHRoaXMuX2V2ZW50ID0gbnVsbDtcblxuICAgICAgICAvLyBlbnN1cmUgYW55IHZhY2FudCB1cHBlciBzcGFjZXMgYXJlIGZpbGxlZCB3aGVyZSByZXF1aXJlZFxuICAgICAgICB0aGlzLnNoaWZ0V2lkZ2V0c1VwKCk7XG5cbiAgICAgICAgLy8gdXBkYXRlIGRhc2hib2FyZCBoZWlnaHRcbiAgICAgICAgdGhpcy5zZXREYXNoYm9hcmRIZWlnaHQoKTtcblxuICAgICAgICAvLyBlbWl0IGluZm9ybWF0aW9uIGFib3V0IHRoZSBsYXlvdXRcbiAgICAgICAgdGhpcy5sYXlvdXQkLm5leHQodGhpcy5nZXRMYXlvdXREYXRhKCkpO1xuICAgIH1cblxuICAgIG9uRHJhZ1N0YXJ0KGFjdGlvbjogRGFzaGJvYXJkQWN0aW9uKTogdm9pZCB7XG4gICAgICAgIHRoaXMub25SZXNpemVTdGFydChhY3Rpb24pO1xuXG4gICAgICAgIC8vIHN0b3JlIHRoZSBzdGFydGluZyBwbGFjZWhvbGRlciBwb3NpdGlvblxuICAgICAgICB0aGlzLnNldFdpZGdldE9yaWdpbigpO1xuXG4gICAgICAgIHRoaXMuY2FjaGVXaWRnZXRzKCk7XG5cbiAgICAgICAgLy8gZW1pdCB0aGUgd2lkZ2V0IHdlIGFyZSBkcmFnZ2luZ1xuICAgICAgICB0aGlzLmlzRHJhZ2dpbmckLm5leHQoYWN0aW9uLndpZGdldCk7XG4gICAgfVxuXG4gICAgb25EcmFnRW5kKCk6IHZvaWQge1xuICAgICAgICB0aGlzLm9uUmVzaXplRW5kKCk7XG5cbiAgICAgICAgdGhpcy5fd2lkZ2V0T3JpZ2luID0ge307XG5cbiAgICAgICAgdGhpcy5pc0RyYWdnaW5nJC5uZXh0KG51bGwpO1xuICAgIH1cblxuICAgIG9uRHJhZyhhY3Rpb246IERhc2hib2FyZEFjdGlvbik6IHZvaWQge1xuXG4gICAgICAgIC8vIGlmIHRoZXJlIHdhcyBubyBtb3ZlbWVudCB0aGVuIGRvIG5vdGhpbmdcbiAgICAgICAgaWYgKGFjdGlvbi5ldmVudC5wYWdlWCA9PT0gdGhpcy5fZXZlbnQucGFnZVggJiYgYWN0aW9uLmV2ZW50LnBhZ2VZID09PSB0aGlzLl9ldmVudC5wYWdlWSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gZ2V0IHRoZSBjdXJyZW50IG1vdXNlIHBvc2l0aW9uXG4gICAgICAgIGNvbnN0IG1vdXNlWCA9IGFjdGlvbi5ldmVudC5wYWdlWCAtIHRoaXMuX2V2ZW50LnBhZ2VYO1xuICAgICAgICBjb25zdCBtb3VzZVkgPSBhY3Rpb24uZXZlbnQucGFnZVkgLSB0aGlzLl9ldmVudC5wYWdlWTtcblxuICAgICAgICAvLyBzdG9yZSB0aGUgbGF0ZXN0IGV2ZW50XG4gICAgICAgIHRoaXMuX2V2ZW50ID0gYWN0aW9uLmV2ZW50O1xuXG4gICAgICAgIGNvbnN0IGRpbWVuc2lvbnM6IERhc2hib2FyZFdpZGdldERpbWVuc2lvbnMgPSB7XG4gICAgICAgICAgICB4OiBhY3Rpb24ud2lkZ2V0LnggKyBtb3VzZVgsXG4gICAgICAgICAgICB5OiBhY3Rpb24ud2lkZ2V0LnkgKyBtb3VzZVksXG4gICAgICAgICAgICB3aWR0aDogYWN0aW9uLndpZGdldC53aWR0aCxcbiAgICAgICAgICAgIGhlaWdodDogYWN0aW9uLndpZGdldC5oZWlnaHRcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLnJlc3RvcmVXaWRnZXRzKHRydWUpO1xuXG4gICAgICAgIC8vIHVwZGF0ZSB3aWRnZXQgcG9zaXRpb25cbiAgICAgICAgYWN0aW9uLndpZGdldC5zZXRCb3VuZHMoZGltZW5zaW9ucy54LCBkaW1lbnNpb25zLnksIGRpbWVuc2lvbnMud2lkdGgsIGRpbWVuc2lvbnMuaGVpZ2h0KTtcblxuICAgICAgICAvLyB1cGRhdGUgcGxhY2Vob2xkZXIgcG9zaXRpb24gYW5kIHZhbHVlXG4gICAgICAgIHRoaXMuc2V0UGxhY2Vob2xkZXJCb3VuZHModHJ1ZSwgZGltZW5zaW9ucy54LCBkaW1lbnNpb25zLnksIGRpbWVuc2lvbnMud2lkdGgsIGRpbWVuc2lvbnMuaGVpZ2h0KTtcblxuICAgICAgICAvLyBzaG93IHRoZSB3aWRnZXQgcG9zaXRpb25zIGlmIHRoZSBjdXJyZW50IHBvc2l0aW9ucyBhbmQgc2l6ZXMgd2VyZSB0byBwZXJzaXN0XG4gICAgICAgIHRoaXMuc2hpZnRXaWRnZXRzKCk7XG5cbiAgICAgICAgdGhpcy5zZXREYXNoYm9hcmRIZWlnaHQoKTtcbiAgICB9XG5cbiAgICBnZXRSb3dIZWlnaHQoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Jvd0hlaWdodDtcbiAgICB9XG5cbiAgICBjYWNoZVdpZGdldHMoKTogRGFzaGJvYXJkQ2FjaGVbXSB7XG4gICAgICAgIHRoaXMuX2NhY2hlID0gdGhpcy53aWRnZXRzLm1hcCh3aWRnZXQgPT4gKHtcbiAgICAgICAgICAgIGlkOiB3aWRnZXQuaWQsXG4gICAgICAgICAgICBjb2x1bW46IHdpZGdldC5nZXRDb2x1bW4oKSxcbiAgICAgICAgICAgIHJvdzogd2lkZ2V0LmdldFJvdygpLFxuICAgICAgICAgICAgY29sdW1uU3Bhbjogd2lkZ2V0LmdldENvbHVtblNwYW4oKSxcbiAgICAgICAgICAgIHJvd1NwYW46IHdpZGdldC5nZXRSb3dTcGFuKCksXG4gICAgICAgIH0pKTtcblxuICAgICAgICAvLyByZXR1cm4gYSBuZXcgYXJyYXkgb2YgdGhlIGNhY2hlIGZvciBjdXN0b20gY2FjaGluZ1xuICAgICAgICByZXR1cm4gWy4uLnRoaXMuX2NhY2hlXTtcbiAgICB9XG5cbiAgICByZXN0b3JlV2lkZ2V0cyhpZ25vcmVBY3Rpb25XaWRnZXQ6IGJvb2xlYW4gPSBmYWxzZSwgY2FjaGU6IERhc2hib2FyZENhY2hlW10gPSB0aGlzLl9jYWNoZSwgcmVzdG9yZVNpemU6IGJvb2xlYW4gPSBmYWxzZSk6IHZvaWQge1xuICAgICAgICBjYWNoZS5maWx0ZXIod2lkZ2V0ID0+ICFpZ25vcmVBY3Rpb25XaWRnZXQgfHwgd2lkZ2V0LmlkICE9PSB0aGlzLl9hY3Rpb25XaWRnZXQud2lkZ2V0LmlkKS5mb3JFYWNoKHdpZGdldCA9PiB7XG5cbiAgICAgICAgICAgIGNvbnN0IG1hdGNoID0gdGhpcy53aWRnZXRzLmZpbmQod2d0ID0+IHdndC5pZCA9PT0gd2lkZ2V0LmlkKTtcblxuICAgICAgICAgICAgaWYgKG1hdGNoKSB7XG4gICAgICAgICAgICAgICAgbWF0Y2guc2V0Q29sdW1uKHdpZGdldC5jb2x1bW4pO1xuICAgICAgICAgICAgICAgIG1hdGNoLnNldFJvdyh3aWRnZXQucm93KTtcblxuICAgICAgICAgICAgICAgIGlmIChyZXN0b3JlU2l6ZSkge1xuICAgICAgICAgICAgICAgICAgICBtYXRjaC5zZXRDb2x1bW5TcGFuKHdpZGdldC5jb2x1bW5TcGFuKTtcbiAgICAgICAgICAgICAgICAgICAgbWF0Y2guc2V0Um93U3Bhbih3aWRnZXQucm93U3Bhbik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBXaGVuIGRyYWdnaW5nIGFueSB3aWRnZXRzIHRoYXQgbmVlZCB0byBiZSBtb3ZlZCBzaG91bGQgYmUgbW92ZWQgdG8gYW4gYXBwcm9wcmlhdGUgcG9zaXRpb25cbiAgICAgKi9cbiAgICBzaGlmdFdpZGdldHMoKTogdm9pZCB7XG5cbiAgICAgICAgbGV0IHdpZGdldHNUb01vdmU6IERhc2hib2FyZFdpZGdldENvbXBvbmVudFtdID0gW107XG5cbiAgICAgICAgY29uc3QgcGxhY2Vob2xkZXIgPSB0aGlzLnBsYWNlaG9sZGVyJC5nZXRWYWx1ZSgpO1xuXG4gICAgICAgIC8vIGNoZWNrIGlmIHRoZXJlIGFyZSBhbnkgd2lkZ2V0cyB1bmRlciB0aGUgcGxhY2Vob2xkZXJcbiAgICAgICAgZm9yIChsZXQgcm93ID0gcGxhY2Vob2xkZXIucm93OyByb3cgPCBwbGFjZWhvbGRlci5yb3cgKyBwbGFjZWhvbGRlci5yb3dTcGFuOyByb3crKykge1xuICAgICAgICAgICAgZm9yIChsZXQgY29sdW1uID0gcGxhY2Vob2xkZXIuY29sdW1uOyBjb2x1bW4gPCBwbGFjZWhvbGRlci5jb2x1bW4gKyBwbGFjZWhvbGRlci5jb2x1bW5TcGFuOyBjb2x1bW4rKykge1xuXG4gICAgICAgICAgICAgICAgLy8gc3RvcmUgcmVmZXJlbmNlIHRvIGFueSB3aWRnZXRzIHRoYXQgbmVlZCBtb3ZlZFxuICAgICAgICAgICAgICAgIHRoaXMuZ2V0T2NjdXBpZWRTcGFjZXMoKVxuICAgICAgICAgICAgICAgICAgICAuZmlsdGVyKHNwYWNlID0+IHNwYWNlLmNvbHVtbiA9PT0gY29sdW1uICYmIHNwYWNlLnJvdyA9PT0gcm93ICYmIHNwYWNlLndpZGdldCAhPT0gdGhpcy5fYWN0aW9uV2lkZ2V0LndpZGdldClcbiAgICAgICAgICAgICAgICAgICAgLmZvckVhY2goc3BhY2UgPT4gd2lkZ2V0c1RvTW92ZS5wdXNoKHNwYWNlLndpZGdldCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gcmVtb3ZlIGFueSBkdXBsaWNhdGVzXG4gICAgICAgIHdpZGdldHNUb01vdmUgPSB3aWRnZXRzVG9Nb3ZlLmZpbHRlcigod2lkZ2V0LCBpZHgsIGFycmF5KSA9PiBhcnJheS5pbmRleE9mKHdpZGdldCkgPT09IGlkeCk7XG5cbiAgICAgICAgLy8gaWYgbm8gd2lkZ2V0cyBuZWVkIG1vdmVkIHRoZW4gd2UgY2FuIHN0b3AgaGVyZVxuICAgICAgICBpZiAod2lkZ2V0c1RvTW92ZS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGNyZWF0ZSBhIGR1cGxpY2F0ZSB3ZSBjYW4gdXNlIHRvIGtlZXAgdHJhY2sgb2Ygd2hpY2ggaGF2ZSBiZWVuIG1vdmVkXG4gICAgICAgIGNvbnN0IHVubW92ZWRXaWRnZXRzID0gd2lkZ2V0c1RvTW92ZS5zbGljZSgpO1xuXG4gICAgICAgIC8vIGF0dGVtcHQgdG8gbW92ZSBhbnkgd2lkZ2V0cyB0byB0aGUgcHJldmlvdXMgd2lkZ2V0IHBvc2l0aW9uXG4gICAgICAgIHdpZGdldHNUb01vdmUuZm9yRWFjaCh3aWRnZXQgPT4ge1xuXG4gICAgICAgICAgICAvLyBnZXQgYSBncmlkIG9mZiBhbGwgb2NjdXBpZWQgc3BhY2VzIC0gdGFraW5nIGludG8gYWNjb3VudCB0aGUgcGxhY2Vob2xkZXIgYW5kIGlnbm9yaW5nIHdpZGdldHMgdGhhdCBuZWVkIG1vdmVkXG4gICAgICAgICAgICBjb25zdCBncmlkID0gdGhpcy5nZXRPY2N1cGllZFNwYWNlcygpLmZpbHRlcihzcGFjZSA9PiAhdW5tb3ZlZFdpZGdldHMuZmluZCh3Z3QgPT4gd2d0ID09PSBzcGFjZS53aWRnZXQpKTtcblxuICAgICAgICAgICAgLy8gaXRlcmF0ZSBlYWNoIGZyZWUgYmxvY2tcbiAgICAgICAgICAgIGZvciAobGV0IHJvdyA9IHRoaXMuX3dpZGdldE9yaWdpbi5yb3c7IHJvdyA8IHRoaXMuX3dpZGdldE9yaWdpbi5yb3cgKyB0aGlzLl93aWRnZXRPcmlnaW4ucm93U3Bhbjsgcm93KyspIHtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBjb2x1bW4gPSB0aGlzLl93aWRnZXRPcmlnaW4uY29sdW1uOyBjb2x1bW4gPCB0aGlzLl93aWRnZXRPcmlnaW4uY29sdW1uICsgdGhpcy5fd2lkZ2V0T3JpZ2luLmNvbHVtblNwYW47IGNvbHVtbisrKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gZGV0ZXJtaW5lIGlmIHRoZSBibG9jayBjYW4gZml0IGluIHRoaXMgc3BhY2VcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVxdWlyZWRTcGFjZXMgPSB0aGlzLmdldFJlcXVpcmVkU3BhY2VzRnJvbVBvaW50KHdpZGdldCwgY29sdW1uLCByb3cpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIGNoZWNrIGlmIHdpZGdldCB3b3VsZCBmaXQgaW4gc3BhY2VcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYXZhaWxhYmxlID0gcmVxdWlyZWRTcGFjZXMuZXZlcnkoc3BhY2UgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICFncmlkLmZpbmQoZ3JpZFNwYWNlID0+IGdyaWRTcGFjZS5jb2x1bW4gPT09IHNwYWNlLmNvbHVtbiAmJiBncmlkU3BhY2Uucm93ID09PSBzcGFjZS5yb3cpICYmIHNwYWNlLmNvbHVtbiA8IHRoaXMuZ2V0Q29sdW1uQ291bnQoKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGF2YWlsYWJsZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgd2lkZ2V0LnNldENvbHVtbihjb2x1bW4pO1xuICAgICAgICAgICAgICAgICAgICAgICAgd2lkZ2V0LnNldFJvdyhyb3cpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdW5tb3ZlZFdpZGdldHMuc3BsaWNlKHVubW92ZWRXaWRnZXRzLmZpbmRJbmRleCh3Z3QgPT4gd2d0ID09PSB3aWRnZXQpLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gaWYgd2UgZ2V0IHRvIGhlcmUgdGhlbiB3ZSBjYW4ndCBzaW1wbHkgc3dhcCB0aGUgcG9zaXRpb25zIC0gbmV4dCB0cnkgbW92aW5nIHJpZ2h0XG4gICAgICAgICAgICBpZiAodGhpcy5jYW5XaWRnZXRNb3ZlUmlnaHQod2lkZ2V0LCB0cnVlKSkge1xuXG4gICAgICAgICAgICAgICAgLy8gYWZ0ZXIgdGhlIHNoaWZ0IGNoZWNrIGlmIHBsYWNlaG9sZGVyIHBvc2l0aW9uIGlzIHN0aWxsIHZhbGlkXG4gICAgICAgICAgICAgICAgdGhpcy52YWxpZGF0ZVBsYWNlaG9sZGVyUG9zaXRpb24oQWN0aW9uRGlyZWN0aW9uLlJpZ2h0KTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIG5leHQgdHJ5IG1vdmluZyBsZWZ0XG4gICAgICAgICAgICBpZiAodGhpcy5jYW5XaWRnZXRNb3ZlTGVmdCh3aWRnZXQsIHRydWUpKSB7XG5cbiAgICAgICAgICAgICAgICAvLyBhZnRlciB0aGUgc2hpZnQgY2hlY2sgaWYgcGxhY2Vob2xkZXIgcG9zaXRpb24gaXMgc3RpbGwgdmFsaWRcbiAgICAgICAgICAgICAgICB0aGlzLnZhbGlkYXRlUGxhY2Vob2xkZXJQb3NpdGlvbihBY3Rpb25EaXJlY3Rpb24uTGVmdCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBkZXRlcm1pbmUgdGhlIGRpc3RhbmNlIHRoYXQgdGhlIHdpZGdldCBuZWVkcyB0byBiZSBtb3ZlZCBkb3duXG4gICAgICAgICAgICBjb25zdCBkaXN0YW5jZSA9ICh0aGlzLl9hY3Rpb25XaWRnZXQud2lkZ2V0LmdldFJvdygpIC0gd2lkZ2V0LmdldFJvdygpKSArIHRoaXMuX2FjdGlvbldpZGdldC53aWRnZXQuZ2V0Um93U3BhbigpO1xuXG4gICAgICAgICAgICAvLyBhcyBhIGxhc3QgcmVzb3J0IG1vdmUgdGhlIHdpZGdldCBkb3dud2FyZHNcbiAgICAgICAgICAgIHRoaXMubW92ZVdpZGdldERvd24od2lkZ2V0LCBkaXN0YW5jZSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFmdGVyIHNoaWZ0cyBoYXZlIHRha2VuIHBsYWNlIHdlIHNob3VsZCB2ZXJpZnkgdGhlIHBsYWNlIGhvbGRlciBwb3NpdGlvbiBpcyBzdGlsbCB2YWxpZFxuICAgICAqIEBwYXJhbSBzaGlmdERpcmVjdGlvbiAtIHRoZSBwb3NpdGlvbiB3aWRnZXRzIHdlcmUgc2hpZnRlZFxuICAgICAqL1xuICAgIHZhbGlkYXRlUGxhY2Vob2xkZXJQb3NpdGlvbihzaGlmdERpcmVjdGlvbjogQWN0aW9uRGlyZWN0aW9uKSB7XG5cbiAgICAgICAgY29uc3QgcGxhY2Vob2xkZXIgPSB0aGlzLnBsYWNlaG9sZGVyJC5nZXRWYWx1ZSgpO1xuXG4gICAgICAgIC8vIGNoZWNrIGlmIHRoZSBwbGFjZWhvbGRlciBpcyBvdmVyIGEgd2lkZ2V0XG4gICAgICAgIGlmICh0aGlzLmdldFdpZGdldHNBdFBvc2l0aW9uKHBsYWNlaG9sZGVyLmNvbHVtbiwgcGxhY2Vob2xkZXIucm93LCB0cnVlKS5sZW5ndGggPiAwKSB7XG5cbiAgICAgICAgICAgIC8vIG1vdmUgdGhlIHBsYWNlaG9sZGVyIHRoZSBvcHBvc2l0ZSBkaXJlY3Rpb25cbiAgICAgICAgICAgIHN3aXRjaCAoc2hpZnREaXJlY3Rpb24pIHtcblxuICAgICAgICAgICAgICAgIGNhc2UgQWN0aW9uRGlyZWN0aW9uLkxlZnQ6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0UGxhY2Vob2xkZXJCb3VuZHMocGxhY2Vob2xkZXIudmlzaWJsZSwgcGxhY2Vob2xkZXIueCArIHRoaXMuZ2V0Q29sdW1uV2lkdGgoKSwgcGxhY2Vob2xkZXIueSwgcGxhY2Vob2xkZXIud2lkdGgsIHBsYWNlaG9sZGVyLmhlaWdodCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSBBY3Rpb25EaXJlY3Rpb24uUmlnaHQ6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0UGxhY2Vob2xkZXJCb3VuZHMocGxhY2Vob2xkZXIudmlzaWJsZSwgcGxhY2Vob2xkZXIueCAtIHRoaXMuZ2V0Q29sdW1uV2lkdGgoKSwgcGxhY2Vob2xkZXIueSwgcGxhY2Vob2xkZXIud2lkdGgsIHBsYWNlaG9sZGVyLmhlaWdodCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyB2YWxpZGF0ZSB0aGlzIG5ldyBwb3NpdGlvbiBhZ2FpblxuICAgICAgICAgICAgdGhpcy52YWxpZGF0ZVBsYWNlaG9sZGVyUG9zaXRpb24oc2hpZnREaXJlY3Rpb24pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRGV0ZXJtaW5lIGlmIGEgd2lkZ2V0IGNhbiBiZSBtb3ZlZCBsZWZ0IC0gb3IgaWYgaXQgY2FuIG1vdmUgdGhlIHdpZGdldHMgdG8gdGhlIHJpZ2h0IHRvIG1ha2Ugc3BhY2UgZm9yIHRoZSB3aWRnZXRcbiAgICAgKi9cbiAgICBjYW5XaWRnZXRNb3ZlTGVmdCh3aWRnZXQ6IERhc2hib2FyZFdpZGdldENvbXBvbmVudCwgcGVyZm9ybU1vdmU6IGJvb2xlYW4gPSBmYWxzZSk6IGJvb2xlYW4ge1xuXG4gICAgICAgIC8vIGNoZWNrIGlmIHRoZSB3aWRnZXQgaXMgdGhlIGFjdGlvbiB3aWRnZXQgb3Igb2NjdXBpZXMgdGhlIGZpcnN0IGNvbHVtblxuICAgICAgICBpZiAod2lkZ2V0ID09PSB0aGlzLl9hY3Rpb25XaWRnZXQud2lkZ2V0IHx8IHdpZGdldC5nZXRDb2x1bW4oKSA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gZmluZCB0aGUgcG9zaXRpb25zIHJlcXVpcmVkXG4gICAgICAgIGNvbnN0IHRhcmdldFNwYWNlcyA9IHRoaXMuZ2V0T2NjdXBpZWRTcGFjZXMoKS5maWx0ZXIoc3BhY2UgPT4gc3BhY2Uud2lkZ2V0ID09PSB3aWRnZXQpLm1hcChzcGFjZSA9PiB7XG4gICAgICAgICAgICByZXR1cm4geyBjb2x1bW46IHNwYWNlLmNvbHVtbiAtIHdpZGdldC5nZXRDb2x1bW5TcGFuKCksIHJvdzogc3BhY2Uucm93LCB3aWRnZXQ6IHNwYWNlLndpZGdldCB9O1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyBjaGVjayBpZiBhbnkgb2YgdGhlIHRhcmdldCBzcGFjZXMgYXJlIG91dCBvZiBib3VuZHNcbiAgICAgICAgaWYgKHRhcmdldFNwYWNlcy5maW5kKHNwYWNlID0+IHNwYWNlLmNvbHVtbiA8IDApKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBjaGVjayBpZiB0aGVyZSBhcmUgd2lkZ2V0IGluIHRoZSByZXF1aXJlZCBwb3NpdGlvbnMgYW5kIGlmIHNvLCBjYW4gdGhleSBtb3ZlIHJpZ2h0P1xuICAgICAgICBjb25zdCBtb3ZlYWJsZSA9IHRhcmdldFNwYWNlcy5ldmVyeShzcGFjZSA9PiB0aGlzLmdldFdpZGdldHNBdFBvc2l0aW9uKHNwYWNlLmNvbHVtbiwgc3BhY2Uucm93KS5maWx0ZXIod2d0ID0+IHdndCAhPT0gc3BhY2Uud2lkZ2V0KS5ldmVyeSh3Z3QgPT4gdGhpcy5jYW5XaWRnZXRNb3ZlTGVmdCh3Z3QpKSk7XG5cbiAgICAgICAgaWYgKHBlcmZvcm1Nb3ZlICYmIG1vdmVhYmxlKSB7XG5cbiAgICAgICAgICAgIC8vIG1vdmUgYWxsIHdpZGdldHMgdG8gdGhlIGxlZnRcbiAgICAgICAgICAgIHRhcmdldFNwYWNlcy5mb3JFYWNoKHNwYWNlID0+IHRoaXMuZ2V0V2lkZ2V0c0F0UG9zaXRpb24oc3BhY2UuY29sdW1uLCBzcGFjZS5yb3cpLmZpbHRlcih3Z3QgPT4gd2d0ICE9PSBzcGFjZS53aWRnZXQpLmZvckVhY2god2d0ID0+IHRoaXMuY2FuV2lkZ2V0TW92ZUxlZnQod2d0LCB0cnVlKSkpO1xuXG4gICAgICAgICAgICAvLyBmaW5kIHRoZSB0YXJnZXQgY29sdW1uXG4gICAgICAgICAgICBjb25zdCBjb2x1bW4gPSB0YXJnZXRTcGFjZXMucmVkdWNlKCh0YXJnZXQsIHNwYWNlKSA9PiBNYXRoLm1pbih0YXJnZXQsIHNwYWNlLmNvbHVtbiksIEluZmluaXR5KTtcblxuICAgICAgICAgICAgLy8gbW92ZSBjdXJyZW50IHdpZGdldCB0byB0aGUgbGVmdFxuICAgICAgICAgICAgaWYgKGNvbHVtbiAhPT0gSW5maW5pdHkpIHtcbiAgICAgICAgICAgICAgICB3aWRnZXQuc2V0Q29sdW1uKGNvbHVtbik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbW92ZWFibGU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRGV0ZXJtaW5lIGlmIGEgd2lkZ2V0IGNhbiBiZSBtb3ZlZCByaWdodCAtIG9yIGlmIGl0IGNhbiBtb3ZlIHRoZSB3aWRnZXRzIHRvIHRoZSByaWdodCB0byBtYWtlIHNwYWNlIGZvciB0aGUgd2lkZ2V0XG4gICAgICovXG4gICAgY2FuV2lkZ2V0TW92ZVJpZ2h0KHdpZGdldDogRGFzaGJvYXJkV2lkZ2V0Q29tcG9uZW50LCBwZXJmb3JtTW92ZTogYm9vbGVhbiA9IGZhbHNlKTogYm9vbGVhbiB7XG5cbiAgICAgICAgLy8gY2hlY2sgaWYgdGhlIHdpZGdldCBpcyB0aGUgZHJhZ2dpbmcgd2lkZ2V0IG9yIHRoZSB3aWRnZXQgb2NjdXBpZXMgdGhlIGZpbmFsIGNvbHVtblxuICAgICAgICBpZiAod2lkZ2V0ID09PSB0aGlzLl9hY3Rpb25XaWRnZXQud2lkZ2V0IHx8IHdpZGdldC5nZXRDb2x1bW4oKSArIHdpZGdldC5nZXRDb2x1bW5TcGFuKCkgPT09IHRoaXMub3B0aW9ucy5jb2x1bW5zKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBmaW5kIHRoZSBwb3NpdGlvbnMgcmVxdWlyZWRcbiAgICAgICAgY29uc3QgdGFyZ2V0U3BhY2VzID0gdGhpcy5nZXRPY2N1cGllZFNwYWNlcygpLmZpbHRlcihzcGFjZSA9PiBzcGFjZS53aWRnZXQgPT09IHdpZGdldCkubWFwKHNwYWNlID0+IHtcbiAgICAgICAgICAgIHJldHVybiB7IGNvbHVtbjogc3BhY2UuY29sdW1uICsgd2lkZ2V0LmdldENvbHVtblNwYW4oKSwgcm93OiBzcGFjZS5yb3csIHdpZGdldDogc3BhY2Uud2lkZ2V0IH07XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIGNoZWNrIGlmIGFueSBvZiB0aGUgdGFyZ2V0IHNwYWNlcyBhcmUgb3V0IG9mIGJvdW5kc1xuICAgICAgICBpZiAodGFyZ2V0U3BhY2VzLmZpbmQoc3BhY2UgPT4gc3BhY2UuY29sdW1uID49IHRoaXMuZ2V0Q29sdW1uQ291bnQoKSkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGNoZWNrIGlmIHRoZXJlIGFyZSB3aWRnZXQgaW4gdGhlIHJlcXVpcmVkIHBvc2l0aW9ucyBhbmQgaWYgc28sIGNhbiB0aGV5IG1vdmUgcmlnaHQ/XG4gICAgICAgIGNvbnN0IG1vdmVhYmxlID0gdGFyZ2V0U3BhY2VzLmV2ZXJ5KHNwYWNlID0+IHRoaXMuZ2V0V2lkZ2V0c0F0UG9zaXRpb24oc3BhY2UuY29sdW1uLCBzcGFjZS5yb3cpXG4gICAgICAgICAgICAuZmlsdGVyKHdndCA9PiB3Z3QgIT09IHNwYWNlLndpZGdldClcbiAgICAgICAgICAgIC5ldmVyeSh3Z3QgPT4gdGhpcy5jYW5XaWRnZXRNb3ZlUmlnaHQod2d0KSlcbiAgICAgICAgKTtcblxuICAgICAgICBpZiAocGVyZm9ybU1vdmUgJiYgbW92ZWFibGUpIHtcbiAgICAgICAgICAgIC8vIG1vdmUgYWxsIHdpZGdldHMgdG8gdGhlIHJpZ2h0XG4gICAgICAgICAgICB0YXJnZXRTcGFjZXMuZm9yRWFjaChzcGFjZSA9PiB0aGlzLmdldFdpZGdldHNBdFBvc2l0aW9uKHNwYWNlLmNvbHVtbiwgc3BhY2Uucm93KS5maWx0ZXIod2d0ID0+IHdndCAhPT0gc3BhY2Uud2lkZ2V0KS5mb3JFYWNoKHdndCA9PiB0aGlzLmNhbldpZGdldE1vdmVSaWdodCh3Z3QsIHRydWUpKSk7XG5cbiAgICAgICAgICAgIC8vIG1vdmUgY3VycmVudCB3aWRnZXQgdG8gdGhlIHJpZ2h0XG4gICAgICAgICAgICB3aWRnZXQuc2V0Q29sdW1uKHdpZGdldC5nZXRDb2x1bW4oKSArIDEpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG1vdmVhYmxlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFN0b3JlIHRoZSBpbml0aWFsIHBvc2l0aW9uIG9mIHRoZSB3aWRnZXQgYmVpbmcgZHJhZ2dlZFxuICAgICAqL1xuICAgIHNldFdpZGdldE9yaWdpbigpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fd2lkZ2V0T3JpZ2luID0ge1xuICAgICAgICAgICAgY29sdW1uOiB0aGlzLl9hY3Rpb25XaWRnZXQud2lkZ2V0LmdldENvbHVtbigpLFxuICAgICAgICAgICAgcm93OiB0aGlzLl9hY3Rpb25XaWRnZXQud2lkZ2V0LmdldFJvdygpLFxuICAgICAgICAgICAgY29sdW1uU3BhbjogdGhpcy5fYWN0aW9uV2lkZ2V0LndpZGdldC5nZXRDb2x1bW5TcGFuKCksXG4gICAgICAgICAgICByb3dTcGFuOiB0aGlzLl9hY3Rpb25XaWRnZXQud2lkZ2V0LmdldFJvd1NwYW4oKVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENhbGN1bGF0ZSBhbGwgdGhlIHJlcXVpcmVkIHBvc2l0aW9ucyBpcyBhIHdpZGdldCB3YXMgdG8gYmUgcG9zaXRpb25lZCBhdCBhIHBhcnRpY3VsYXIgcG9pbnRcbiAgICAgKi9cbiAgICBnZXRSZXF1aXJlZFNwYWNlc0Zyb21Qb2ludCh3aWRnZXQ6IERhc2hib2FyZFdpZGdldENvbXBvbmVudCwgY29sdW1uOiBudW1iZXIsIHJvdzogbnVtYmVyKTogRGFzaGJvYXJkU3BhY2VbXSB7XG4gICAgICAgIGNvbnN0IHNwYWNlczogRGFzaGJvYXJkU3BhY2VbXSA9IFtdO1xuXG4gICAgICAgIGZvciAobGV0IHkgPSByb3c7IHkgPCByb3cgKyB3aWRnZXQuZ2V0Um93U3BhbigpOyB5KyspIHtcbiAgICAgICAgICAgIGZvciAobGV0IHggPSBjb2x1bW47IHggPCBjb2x1bW4gKyB3aWRnZXQuZ2V0Q29sdW1uU3BhbigpOyB4KyspIHtcbiAgICAgICAgICAgICAgICBzcGFjZXMucHVzaCh7IGNvbHVtbjogeCwgcm93OiB5LCB3aWRnZXQ6IHdpZGdldCB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBzcGFjZXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUG9zaXRpb24gd2lkZ2V0cyBiYXNlZCBvbiB0aGUgcG9zaXRpb24gb2YgdGhlIHBsYWNlaG9sZGVyIC0gdGhpcyBpcyB0ZW1wb3JhcnkgdW50aWwgY29uZmlybWVkXG4gICAgICovXG4gICAgdXBkYXRlV2lkZ2V0UG9zaXRpb25zKHdpZGdldDogRGFzaGJvYXJkV2lkZ2V0Q29tcG9uZW50KSB7XG5cbiAgICAgICAgY29uc3QgcGxhY2Vob2xkZXIgPSB0aGlzLnBsYWNlaG9sZGVyJC5nZXRWYWx1ZSgpO1xuXG4gICAgICAgIC8vIGNoZWNrIGFsbCBzcGFjZXMgdGhlIHBsYWNlaG9sZGVyIHdpbGwgb2NjdXB5IGFuZCBtb3ZlIGFueSB3aWRnZXQgY3VycmVudGx5IGluIHRoZW0gZG93blxuICAgICAgICBmb3IgKGxldCBjb2x1bW4gPSBwbGFjZWhvbGRlci5jb2x1bW47IGNvbHVtbiA8IHBsYWNlaG9sZGVyLmNvbHVtbiArIHBsYWNlaG9sZGVyLmNvbHVtblNwYW47IGNvbHVtbisrKSB7XG4gICAgICAgICAgICBmb3IgKGxldCByb3cgPSBwbGFjZWhvbGRlci5yb3c7IHJvdyA8IHBsYWNlaG9sZGVyLnJvdyArIHBsYWNlaG9sZGVyLnJvd1NwYW47IHJvdysrKSB7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmdldFdpZGdldHNBdFBvc2l0aW9uKGNvbHVtbiwgcm93LCB0cnVlKVxuICAgICAgICAgICAgICAgICAgICAuZmlsdGVyKHdndCA9PiB3Z3QgIT09IHdpZGdldClcbiAgICAgICAgICAgICAgICAgICAgLmZvckVhY2god2d0ID0+IHRoaXMubW92ZVdpZGdldERvd24od2d0KSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyB1cGRhdGUgdGhlIGhlaWdodCBvZiB0aGUgZGFzaGJvYXJkXG4gICAgICAgIHRoaXMuc2V0RGFzaGJvYXJkSGVpZ2h0KCk7XG5cbiAgICAgICAgLy8gaWYgd2UgYXJlbnQgZHJhZ2dpbmcgdGhlIHRvcCBoYW5kbGUgdGhlbiBmaWxsIHNwYWNlc1xuICAgICAgICBpZiAodGhpcy5fYWN0aW9uV2lkZ2V0LmRpcmVjdGlvbiAhPT0gQWN0aW9uRGlyZWN0aW9uLlRvcCAmJlxuICAgICAgICAgICAgdGhpcy5fYWN0aW9uV2lkZ2V0LmRpcmVjdGlvbiAhPT0gQWN0aW9uRGlyZWN0aW9uLlRvcExlZnQgJiZcbiAgICAgICAgICAgIHRoaXMuX2FjdGlvbldpZGdldC5kaXJlY3Rpb24gIT09IEFjdGlvbkRpcmVjdGlvbi5Ub3BSaWdodCkge1xuICAgICAgICAgICAgdGhpcy5zaGlmdFdpZGdldHNVcCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRGV0ZXJtaW5lIGlmIGEgd2lkZ2V0IGlzIG9jY3VweWluZyBhIHNwZWNpZmljIHJvdyBhbmQgY29sdW1uXG4gICAgICogQHBhcmFtIGNvbHVtbiBUaGUgY29sdW1ucyB0byBjaGVjayBpZiBvY2N1cGllZFxuICAgICAqIEBwYXJhbSByb3cgVGhlIHJvdyB0byBjaGVjayBpZiBvY2N1cGllZFxuICAgICAqIEBwYXJhbSBpZ25vcmVSZXNpemluZyBXaGV0aGVyIG9yIG5vdCB0byBpZ25vcmUgdGhlIHdpZGdldCBjdXJyZW50bHkgYmVpbmcgcmVzaXplZFxuICAgICAqL1xuICAgIGdldFdpZGdldHNBdFBvc2l0aW9uKGNvbHVtbjogbnVtYmVyLCByb3c6IG51bWJlciwgaWdub3JlUmVzaXppbmc6IGJvb2xlYW4gPSBmYWxzZSk6IERhc2hib2FyZFdpZGdldENvbXBvbmVudFtdIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0T2NjdXBpZWRTcGFjZXMoKVxuICAgICAgICAgICAgLmZpbHRlcihzcGFjZSA9PiBzcGFjZS5jb2x1bW4gPT09IGNvbHVtbiAmJiBzcGFjZS5yb3cgPT09IHJvdylcbiAgICAgICAgICAgIC5maWx0ZXIoc3BhY2UgPT4gdGhpcy5fYWN0aW9uV2lkZ2V0ICYmIHNwYWNlLndpZGdldCAhPT0gdGhpcy5fYWN0aW9uV2lkZ2V0LndpZGdldCB8fCAhaWdub3JlUmVzaXppbmcpXG4gICAgICAgICAgICAubWFwKHNwYWNlID0+IHNwYWNlLndpZGdldCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVXBkYXRlIHRoZSBwbGFjZWhvbGRlciB2aXNpYmlsaXR5LCBwb3NpdGlvbiBhbmQgc2l6ZVxuICAgICAqL1xuICAgIHNldFBsYWNlaG9sZGVyQm91bmRzKHZpc2libGU6IGJvb2xlYW4sIHg6IG51bWJlciwgeTogbnVtYmVyLCB3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlcik6IHZvaWQge1xuXG4gICAgICAgIGNvbnN0IHBsYWNlaG9sZGVyID0gdGhpcy5wbGFjZWhvbGRlciQuZ2V0VmFsdWUoKTtcblxuICAgICAgICBwbGFjZWhvbGRlci52aXNpYmxlID0gdmlzaWJsZTtcblxuICAgICAgICBwbGFjZWhvbGRlci5jb2x1bW4gPSB0aGlzLmdldFBsYWNlaG9sZGVyQ29sdW1uKHgsIHdpZHRoKTtcbiAgICAgICAgcGxhY2Vob2xkZXIucm93ID0gdGhpcy5nZXRQbGFjZWhvbGRlclJvdyh5LCBoZWlnaHQpO1xuICAgICAgICBwbGFjZWhvbGRlci5jb2x1bW5TcGFuID0gdGhpcy5nZXRQbGFjZWhvbGRlckNvbHVtblNwYW4od2lkdGgpO1xuICAgICAgICBwbGFjZWhvbGRlci5yb3dTcGFuID0gdGhpcy5nZXRQbGFjZWhvbGRlclJvd1NwYW4oaGVpZ2h0KTtcblxuICAgICAgICAvLyBjYWxjdWxhdGUgdGhlIG1heGltdW0gbnVtYmVyIG9mIHJvd3NcbiAgICAgICAgY29uc3Qgcm93Q291bnQgPSB0aGlzLndpZGdldHMuZmlsdGVyKHdpZGdldCA9PiB3aWRnZXQgIT09IHRoaXMuX2FjdGlvbldpZGdldC53aWRnZXQpXG4gICAgICAgICAgICAucmVkdWNlKChwcmV2aW91cywgd2lkZ2V0KSA9PiBNYXRoLm1heCh3aWRnZXQuZ2V0Um93KCkgKyB3aWRnZXQuZ2V0Um93U3BhbigpLCBwcmV2aW91cyksIDApO1xuXG4gICAgICAgIC8vIGNvbnN0cmFpbiBtYXhpbXVtIHBsYWNlaG9sZGVyIHJvd1xuICAgICAgICBwbGFjZWhvbGRlci5yb3cgPSBNYXRoLm1pbihwbGFjZWhvbGRlci5yb3csIHJvd0NvdW50KTtcblxuICAgICAgICBwbGFjZWhvbGRlci54ID0gKHBsYWNlaG9sZGVyLmNvbHVtbiAqIHRoaXMuZ2V0Q29sdW1uV2lkdGgoKSkgKyB0aGlzLm9wdGlvbnMucGFkZGluZztcbiAgICAgICAgcGxhY2Vob2xkZXIueSA9IChwbGFjZWhvbGRlci5yb3cgKiB0aGlzLl9yb3dIZWlnaHQpICsgdGhpcy5vcHRpb25zLnBhZGRpbmc7XG4gICAgICAgIHBsYWNlaG9sZGVyLndpZHRoID0gKHBsYWNlaG9sZGVyLmNvbHVtblNwYW4gKiB0aGlzLmdldENvbHVtbldpZHRoKCkpIC0gKHRoaXMub3B0aW9ucy5wYWRkaW5nICogMik7XG4gICAgICAgIHBsYWNlaG9sZGVyLmhlaWdodCA9IChwbGFjZWhvbGRlci5yb3dTcGFuICogdGhpcy5fcm93SGVpZ2h0KSAtICh0aGlzLm9wdGlvbnMucGFkZGluZyAqIDIpO1xuXG4gICAgICAgIC8vIHNldCB0aGUgdmFsdWVzIG9mIHRoZSB3aWRnZXQgdG8gbWF0Y2ggdGhlIHZhbHVlcyBvZiB0aGUgcGxhY2Vob2xkZXIgLSBob3dldmVyIGRvIG5vdCByZW5kZXIgdGhlIGNoYW5nZXNcbiAgICAgICAgdGhpcy5fYWN0aW9uV2lkZ2V0LndpZGdldC5zZXRDb2x1bW4ocGxhY2Vob2xkZXIuY29sdW1uLCBmYWxzZSk7XG4gICAgICAgIHRoaXMuX2FjdGlvbldpZGdldC53aWRnZXQuc2V0Um93KHBsYWNlaG9sZGVyLnJvdywgZmFsc2UpO1xuICAgICAgICB0aGlzLl9hY3Rpb25XaWRnZXQud2lkZ2V0LnNldENvbHVtblNwYW4ocGxhY2Vob2xkZXIuY29sdW1uU3BhbiwgZmFsc2UpO1xuICAgICAgICB0aGlzLl9hY3Rpb25XaWRnZXQud2lkZ2V0LnNldFJvd1NwYW4ocGxhY2Vob2xkZXIucm93U3BhbiwgZmFsc2UpO1xuXG4gICAgICAgIC8vIHVwZGF0ZSB0aGUgcGxhY2Vob2xkZXJcbiAgICAgICAgdGhpcy5wbGFjZWhvbGRlciQubmV4dChwbGFjZWhvbGRlcik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IHRoZSBwbGFjZWhvbGRlciBjb2x1bW4gcG9zaXRpb25cbiAgICAgKi9cbiAgICBnZXRQbGFjZWhvbGRlckNvbHVtbih4OiBudW1iZXIsIHdpZHRoOiBudW1iZXIpOiBudW1iZXIge1xuXG4gICAgICAgIGNvbnN0IGNvbHVtbiA9IHRoaXMuZ2V0Q29sdW1uRnJvbVB4KHgsIHRoaXMuX2FjdGlvbldpZGdldC5kaXJlY3Rpb24gPT09IEFjdGlvbkRpcmVjdGlvbi5Nb3ZlID8gUm91bmRpbmcuUm91bmRVcE92ZXJIYWxmIDogUm91bmRpbmcuUm91bmREb3duKTtcbiAgICAgICAgY29uc3QgY29sdW1uU3BhbiA9IE1hdGguZmxvb3Iod2lkdGggLyB0aGlzLmdldENvbHVtbldpZHRoKCkpO1xuICAgICAgICBjb25zdCB1cHBlckxpbWl0ID0gdGhpcy5nZXRDb2x1bW5Db3VudCgpIC0gY29sdW1uU3BhbjtcblxuICAgICAgICAvLyBpZiB3ZSBhcmVudCBkcmFnZ2luZyBsZWZ0IHRoZW4ganVzdCByZXR1cm4gdGhlIGNvbHVtblxuICAgICAgICBpZiAodGhpcy5fYWN0aW9uV2lkZ2V0LmRpcmVjdGlvbiAhPT0gQWN0aW9uRGlyZWN0aW9uLkxlZnQgJiZcbiAgICAgICAgICAgIHRoaXMuX2FjdGlvbldpZGdldC5kaXJlY3Rpb24gIT09IEFjdGlvbkRpcmVjdGlvbi5Ub3BMZWZ0ICYmXG4gICAgICAgICAgICB0aGlzLl9hY3Rpb25XaWRnZXQuZGlyZWN0aW9uICE9PSBBY3Rpb25EaXJlY3Rpb24uQm90dG9tTGVmdCkge1xuICAgICAgICAgICAgcmV0dXJuIE1hdGgubWF4KE1hdGgubWluKGNvbHVtbiwgdXBwZXJMaW1pdCksIDApO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gZ2V0IGFueSBvdmVyZmxvd1xuICAgICAgICBjb25zdCBvdmVyZmxvdyA9IHdpZHRoICUgdGhpcy5nZXRDb2x1bW5XaWR0aCgpO1xuXG4gICAgICAgIHJldHVybiAoeCA8PSAwIHx8IG92ZXJmbG93ID09PSAwIHx8IGNvbHVtblNwYW4gPT09IDAgfHwgb3ZlcmZsb3cgPiAodGhpcy5nZXRDb2x1bW5XaWR0aCgpIC8gMikpID9cbiAgICAgICAgICAgIE1hdGgubWF4KE1hdGgubWluKGNvbHVtbiwgdXBwZXJMaW1pdCksIDApIDpcbiAgICAgICAgICAgIE1hdGgubWF4KE1hdGgubWluKGNvbHVtbiArIDEsIHVwcGVyTGltaXQpLCAwKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIGNvbHVtbiBzcGFuIG9mIHRoZSBwbGFjZWhvbGRlclxuICAgICAqL1xuICAgIGdldFBsYWNlaG9sZGVyQ29sdW1uU3Bhbih3aWR0aDogbnVtYmVyKTogbnVtYmVyIHtcblxuICAgICAgICBjb25zdCBjb2x1bW5TcGFuID0gdGhpcy5nZXRDb2x1bW5Gcm9tUHgod2lkdGgpO1xuXG4gICAgICAgIC8vIGlmIHdlIGFyZW50IGRyYWdnaW5nIHJpZ2h0IG9yIGxlZnQgdGhlbiBqdXN0IHJldHVybiB0aGUgY29sdW1uIHNwYW5cbiAgICAgICAgaWYgKHRoaXMuX2FjdGlvbldpZGdldC5kaXJlY3Rpb24gIT09IEFjdGlvbkRpcmVjdGlvbi5SaWdodCAmJlxuICAgICAgICAgICAgdGhpcy5fYWN0aW9uV2lkZ2V0LmRpcmVjdGlvbiAhPT0gQWN0aW9uRGlyZWN0aW9uLlRvcFJpZ2h0ICYmXG4gICAgICAgICAgICB0aGlzLl9hY3Rpb25XaWRnZXQuZGlyZWN0aW9uICE9PSBBY3Rpb25EaXJlY3Rpb24uQm90dG9tUmlnaHQgJiZcbiAgICAgICAgICAgIHRoaXMuX2FjdGlvbldpZGdldC5kaXJlY3Rpb24gIT09IEFjdGlvbkRpcmVjdGlvbi5MZWZ0ICYmXG4gICAgICAgICAgICB0aGlzLl9hY3Rpb25XaWRnZXQuZGlyZWN0aW9uICE9PSBBY3Rpb25EaXJlY3Rpb24uVG9wTGVmdCAmJlxuICAgICAgICAgICAgdGhpcy5fYWN0aW9uV2lkZ2V0LmRpcmVjdGlvbiAhPT0gQWN0aW9uRGlyZWN0aW9uLkJvdHRvbUxlZnQpIHtcbiAgICAgICAgICAgIHJldHVybiBNYXRoLm1heChjb2x1bW5TcGFuLCAxKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGdldCB0aGUgY3VycmVudCBjb2x1bW4gc3BhbiBhbmQgYW55IG92ZXJmbG93XG4gICAgICAgIGNvbnN0IG92ZXJmbG93ID0gd2lkdGggJSB0aGlzLmdldENvbHVtbldpZHRoKCk7XG5cbiAgICAgICAgcmV0dXJuIChjb2x1bW5TcGFuID4gMCAmJiBvdmVyZmxvdyA+ICh0aGlzLmdldENvbHVtbldpZHRoKCkgLyAyKSkgPyBNYXRoLm1heChjb2x1bW5TcGFuICsgMSwgMSkgOiBNYXRoLm1heChjb2x1bW5TcGFuLCAxKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIHJvdyBwb3NpdGlvbiBvZiB0aGUgcGxhY2Vob2xkZXJcbiAgICAgKi9cbiAgICBnZXRQbGFjZWhvbGRlclJvdyh5OiBudW1iZXIsIGhlaWdodDogbnVtYmVyKTogbnVtYmVyIHtcblxuICAgICAgICBjb25zdCByb3cgPSB0aGlzLmdldFJvd0Zyb21QeCh5LCB0aGlzLl9hY3Rpb25XaWRnZXQuZGlyZWN0aW9uID09PSBBY3Rpb25EaXJlY3Rpb24uTW92ZSA/IFJvdW5kaW5nLlJvdW5kVXBPdmVySGFsZiA6IFJvdW5kaW5nLlJvdW5kRG93bik7XG4gICAgICAgIGNvbnN0IHJvd1NwYW4gPSBNYXRoLmNlaWwoaGVpZ2h0IC8gdGhpcy5fcm93SGVpZ2h0KTtcblxuICAgICAgICAvLyBpZiB3ZSBhcmVudCBkcmFnZ2luZyB1cCB0aGVuIGp1c3QgcmV0dXJuIHRoZSByb3dcbiAgICAgICAgaWYgKHRoaXMuX2FjdGlvbldpZGdldC5kaXJlY3Rpb24gIT09IEFjdGlvbkRpcmVjdGlvbi5Ub3AgJiZcbiAgICAgICAgICAgIHRoaXMuX2FjdGlvbldpZGdldC5kaXJlY3Rpb24gIT09IEFjdGlvbkRpcmVjdGlvbi5Ub3BMZWZ0ICYmXG4gICAgICAgICAgICB0aGlzLl9hY3Rpb25XaWRnZXQuZGlyZWN0aW9uICE9PSBBY3Rpb25EaXJlY3Rpb24uVG9wUmlnaHQpIHtcbiAgICAgICAgICAgIHJldHVybiBNYXRoLm1heChyb3csIDApO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gZ2V0IGFueSBvdmVyZmxvd1xuICAgICAgICBsZXQgb3ZlcmZsb3cgPSBoZWlnaHQgPCB0aGlzLl9yb3dIZWlnaHQgPyAwIDogaGVpZ2h0ICUgdGhpcy5fcm93SGVpZ2h0O1xuXG4gICAgICAgIHJldHVybiAoeSA8PSAwIHx8IHJvd1NwYW4gPT09IDAgfHwgb3ZlcmZsb3cgPT09IDAgfHwgb3ZlcmZsb3cgPiAodGhpcy5fcm93SGVpZ2h0IC8gMikpID8gTWF0aC5tYXgocm93LCAwKSA6IE1hdGgubWF4KHJvdyArIDEsIDApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgcm93IHNwYW4gb2YgdGhlIHBsYWNlaG9sZGVyXG4gICAgICovXG4gICAgZ2V0UGxhY2Vob2xkZXJSb3dTcGFuKGhlaWdodDogbnVtYmVyKTogbnVtYmVyIHtcblxuICAgICAgICBjb25zdCByb3dTcGFuID0gdGhpcy5nZXRSb3dGcm9tUHgoaGVpZ2h0KTtcblxuICAgICAgICAvLyBpZiB3ZSBhcmVudCBkcmFnZ2luZyB1cCBvciBkb3duIHRoZW4ganVzdCByZXR1cm4gdGhlIGNvbHVtbiBzcGFuXG4gICAgICAgIGlmICh0aGlzLl9hY3Rpb25XaWRnZXQuZGlyZWN0aW9uICE9PSBBY3Rpb25EaXJlY3Rpb24uVG9wICYmXG4gICAgICAgICAgICB0aGlzLl9hY3Rpb25XaWRnZXQuZGlyZWN0aW9uICE9PSBBY3Rpb25EaXJlY3Rpb24uVG9wTGVmdCAmJlxuICAgICAgICAgICAgdGhpcy5fYWN0aW9uV2lkZ2V0LmRpcmVjdGlvbiAhPT0gQWN0aW9uRGlyZWN0aW9uLlRvcFJpZ2h0ICYmXG4gICAgICAgICAgICB0aGlzLl9hY3Rpb25XaWRnZXQuZGlyZWN0aW9uICE9PSBBY3Rpb25EaXJlY3Rpb24uQm90dG9tICYmXG4gICAgICAgICAgICB0aGlzLl9hY3Rpb25XaWRnZXQuZGlyZWN0aW9uICE9PSBBY3Rpb25EaXJlY3Rpb24uQm90dG9tTGVmdCAmJlxuICAgICAgICAgICAgdGhpcy5fYWN0aW9uV2lkZ2V0LmRpcmVjdGlvbiAhPT0gQWN0aW9uRGlyZWN0aW9uLkJvdHRvbVJpZ2h0KSB7XG4gICAgICAgICAgICByZXR1cm4gTWF0aC5tYXgocm93U3BhbiwgMSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBnZXQgdGhlIGN1cnJlbnQgY29sdW1uIHNwYW4gYW5kIGFueSBvdmVyZmxvd1xuICAgICAgICBjb25zdCBvdmVyZmxvdyA9IGhlaWdodCAlIHRoaXMuX3Jvd0hlaWdodDtcblxuICAgICAgICByZXR1cm4gKG92ZXJmbG93ID4gKHRoaXMuX3Jvd0hlaWdodCAvIDIpKSA/IE1hdGgubWF4KHJvd1NwYW4gKyAxLCAxKSA6IE1hdGgubWF4KHJvd1NwYW4sIDEpO1xuICAgIH1cblxuICAgIGdldENvbHVtbkZyb21QeCh4OiBudW1iZXIsIHJvdW5kaW5nOiBSb3VuZGluZyA9IFJvdW5kaW5nLlJvdW5kRG93bik6IG51bWJlciB7XG5cbiAgICAgICAgY29uc3QgY29sdW1uID0gTWF0aC5mbG9vcih4IC8gTWF0aC5mbG9vcih0aGlzLmdldENvbHVtbldpZHRoKCkpKTtcbiAgICAgICAgY29uc3Qgb3ZlcmZsb3cgPSAoeCAlIE1hdGguZmxvb3IodGhpcy5nZXRDb2x1bW5XaWR0aCgpKSk7XG4gICAgICAgIGNvbnN0IGhhbGYgPSB0aGlzLmdldENvbHVtbldpZHRoKCkgLyAyO1xuXG4gICAgICAgIHN3aXRjaCAocm91bmRpbmcpIHtcblxuICAgICAgICAgICAgY2FzZSBSb3VuZGluZy5Sb3VuZERvd246XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbHVtbjtcblxuICAgICAgICAgICAgY2FzZSBSb3VuZGluZy5Sb3VuZERvd25CZWxvd0hhbGY6XG4gICAgICAgICAgICAgICAgcmV0dXJuIG92ZXJmbG93IDwgaGFsZiA/IGNvbHVtbiA6IGNvbHVtbiArIDE7XG5cbiAgICAgICAgICAgIGNhc2UgUm91bmRpbmcuUm91bmRVcE92ZXJIYWxmOlxuICAgICAgICAgICAgICAgIHJldHVybiBvdmVyZmxvdyA+IGhhbGYgPyBjb2x1bW4gKyAxIDogY29sdW1uO1xuXG4gICAgICAgICAgICBjYXNlIFJvdW5kaW5nLlJvdW5kVXA6XG4gICAgICAgICAgICAgICAgcmV0dXJuIG92ZXJmbG93ID4gMCA/IGNvbHVtbiArIDEgOiBjb2x1bW47XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIGdldFJvd0Zyb21QeCh5OiBudW1iZXIsIHJvdW5kaW5nOiBSb3VuZGluZyA9IFJvdW5kaW5nLlJvdW5kRG93bik6IG51bWJlciB7XG5cbiAgICAgICAgY29uc3Qgcm93ID0gTWF0aC5mbG9vcih5IC8gTWF0aC5mbG9vcih0aGlzLl9yb3dIZWlnaHQpKTtcbiAgICAgICAgY29uc3Qgb3ZlcmZsb3cgPSAoeSAlIE1hdGguZmxvb3IodGhpcy5fcm93SGVpZ2h0KSk7XG4gICAgICAgIGNvbnN0IGhhbGYgPSB0aGlzLl9yb3dIZWlnaHQgLyAyO1xuXG4gICAgICAgIHN3aXRjaCAocm91bmRpbmcpIHtcblxuICAgICAgICAgICAgY2FzZSBSb3VuZGluZy5Sb3VuZERvd246XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJvdztcblxuICAgICAgICAgICAgY2FzZSBSb3VuZGluZy5Sb3VuZERvd25CZWxvd0hhbGY6XG4gICAgICAgICAgICAgICAgcmV0dXJuIG92ZXJmbG93IDwgaGFsZiA/IHJvdyA6IHJvdyArIDE7XG5cbiAgICAgICAgICAgIGNhc2UgUm91bmRpbmcuUm91bmRVcE92ZXJIYWxmOlxuICAgICAgICAgICAgICAgIHJldHVybiBvdmVyZmxvdyA+IGhhbGYgPyByb3cgKyAxIDogcm93O1xuXG4gICAgICAgICAgICBjYXNlIFJvdW5kaW5nLlJvdW5kVXA6XG4gICAgICAgICAgICAgICAgcmV0dXJuIG92ZXJmbG93ID4gMCA/IHJvdyArIDEgOiByb3c7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb21taXRXaWRnZXRDaGFuZ2VzKCk6IHZvaWQge1xuXG4gICAgICAgIGNvbnN0IHBsYWNlaG9sZGVyID0gdGhpcy5wbGFjZWhvbGRlciQuZ2V0VmFsdWUoKTtcblxuICAgICAgICAvLyBjaGVjayB0aGF0IHdlIGhhdmUgYWxsIHRoZSB2YWx1ZXMgd2UgbmVlZFxuICAgICAgICBpZiAocGxhY2Vob2xkZXIuY29sdW1uID09PSB1bmRlZmluZWQgfHwgcGxhY2Vob2xkZXIucm93ID09PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyLmNvbHVtblNwYW4gPT09IHVuZGVmaW5lZCB8fCBwbGFjZWhvbGRlci5yb3dTcGFuID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLl9hY3Rpb25XaWRnZXQpIHtcbiAgICAgICAgICAgIHRoaXMuX2FjdGlvbldpZGdldC53aWRnZXQuc2V0Q29sdW1uKHBsYWNlaG9sZGVyLmNvbHVtbik7XG4gICAgICAgICAgICB0aGlzLl9hY3Rpb25XaWRnZXQud2lkZ2V0LnNldFJvdyhwbGFjZWhvbGRlci5yb3cpO1xuICAgICAgICAgICAgdGhpcy5fYWN0aW9uV2lkZ2V0LndpZGdldC5zZXRDb2x1bW5TcGFuKHBsYWNlaG9sZGVyLmNvbHVtblNwYW4pO1xuICAgICAgICAgICAgdGhpcy5fYWN0aW9uV2lkZ2V0LndpZGdldC5zZXRSb3dTcGFuKHBsYWNlaG9sZGVyLnJvd1NwYW4pO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gcmVzZXQgYWxsIHBsYWNlaG9sZGVyIHZhbHVlc1xuICAgICAgICBwbGFjZWhvbGRlci5jb2x1bW4gPSB1bmRlZmluZWQ7XG4gICAgICAgIHBsYWNlaG9sZGVyLnJvdyA9IHVuZGVmaW5lZDtcbiAgICAgICAgcGxhY2Vob2xkZXIuY29sdW1uU3BhbiA9IHVuZGVmaW5lZDtcbiAgICAgICAgcGxhY2Vob2xkZXIucm93U3BhbiA9IHVuZGVmaW5lZDtcblxuICAgICAgICAvLyBlbWl0IHRoZSBuZXcgcGxhY2Vob2xkZXIgdmFsdWVzXG4gICAgICAgIHRoaXMucGxhY2Vob2xkZXIkLm5leHQocGxhY2Vob2xkZXIpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgY3VycmVudCBjb2x1bW4gd2lkdGhcbiAgICAgKi9cbiAgICBnZXRDb2x1bW5XaWR0aCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gTWF0aC5mbG9vcih0aGlzLmNvbHVtbldpZHRoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDYWxjdWxhdGUgdGhlIG51bWJlciBvZiByb3dzIHBvcHVsYXRlZCB3aXRoIHdpZGdldHNcbiAgICAgKi9cbiAgICBnZXRSb3dDb3VudCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy53aWRnZXRzLnJlZHVjZSgocHJldmlvdXMsIHdpZGdldCkgPT4gTWF0aC5tYXgod2lkZ2V0LmdldFJvdygpICsgd2lkZ2V0LmdldFJvd1NwYW4oKSwgcHJldmlvdXMpLCAwKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXQgdGhlIGhlaWdodCBvZiB0aGUgZGFzaGJvYXJkIGNvbnRhaW5lciBlbGVtZW50XG4gICAgICovXG4gICAgc2V0RGFzaGJvYXJkSGVpZ2h0KCk6IHZvaWQge1xuXG4gICAgICAgIC8vIHNpemUgdGhlIGRhc2hib2FyZCBjb250YWluZXIgdG8gZW5zdXJlIGFsbCByb3dzIGZpdFxuICAgICAgICBsZXQgcm93Q291bnQgPSB0aGlzLmdldFJvd0NvdW50KCk7XG5cbiAgICAgICAgLy8gaWYgd2Ugc2hvdWxkIHNob3cgYW4gZW1wdHkgcm93IGluY3JlbWVudCB0aGUgcm93IGNvdW50IGJ5IDFcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5lbXB0eVJvdykge1xuICAgICAgICAgICAgcm93Q291bnQrKztcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2V0RGltZW5zaW9ucyh1bmRlZmluZWQsIHJvd0NvdW50ICogdGhpcy5fcm93SGVpZ2h0KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBPcmRlcnMgdGhlIHotaW5kZXggb2YgYWxsIHdpZGdldHMgdG8gbW92ZSB0aGUgYWN0aXZlIG9uZSB0byB0aGUgZnJvbnRcbiAgICAgKiBAcGFyYW0gd2lkZ2V0IFRoZSB3aWRnZXQgdGhhdCBzaG91bGQgYmUgYnJvdWdodCB0byB0aGUgZnJvbnRcbiAgICAgKi9cbiAgICBicmluZ1RvRnJvbnQod2lkZ2V0OiBEYXNoYm9hcmRXaWRnZXRDb21wb25lbnQpOiB2b2lkIHtcbiAgICAgICAgdGhpcy53aWRnZXRzLmZvckVhY2goX3dpZGdldCA9PiBfd2lkZ2V0ID09PSB3aWRnZXQgPyBfd2lkZ2V0LmJyaW5nVG9Gcm9udCgpIDogX3dpZGdldC5zZW5kVG9CYWNrKCkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE1vdmUgYSB3aWRnZXQgZG93biAtIGlmIHdpZGdldHMgYXJlIGluIHRoZSBwb3NpdGlvbiBiZWxvdywgdGhlbiBtb3ZlIHRoZW0gZG93biBmdXJ0aGVyXG4gICAgICogQHBhcmFtIHdpZGdldCBUaGUgd2lkZ2V0IHRvIG1vdmUgZG93bndhcmRzXG4gICAgICovXG4gICAgbW92ZVdpZGdldERvd24od2lkZ2V0OiBEYXNoYm9hcmRXaWRnZXRDb21wb25lbnQsIGRpc3RhbmNlOiBudW1iZXIgPSAxKTogdm9pZCB7XG5cbiAgICAgICAgLy8gbW92ZSB0aGUgd2lkZ2V0IGRvd24gb25lIHBvc2l0aW9uXG4gICAgICAgIHdpZGdldC5zZXRSb3cod2lkZ2V0LmdldFJvdygpICsgZGlzdGFuY2UpO1xuXG4gICAgICAgIC8vIGNoZWNrIGV2ZXJ5IHNwYWNlIHRoZSB3aWRnZXQgb2NjdXBpZXMgZm9yIGNvbGxpc2lvbnNcbiAgICAgICAgdGhpcy5mb3JFYWNoQmxvY2sod2lkZ2V0LCAoY29sdW1uLCByb3cpID0+XG4gICAgICAgICAgICB0aGlzLmdldFdpZGdldHNBdFBvc2l0aW9uKGNvbHVtbiwgcm93LCB0cnVlKVxuICAgICAgICAgICAgICAgIC5maWx0ZXIod2d0ID0+IHdndCAhPT0gd2lkZ2V0KVxuICAgICAgICAgICAgICAgIC5mb3JFYWNoKHdndCA9PiB0aGlzLm1vdmVXaWRnZXREb3duKHdndCwgZGlzdGFuY2UpKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogV2lkZ2V0cyBzaG91bGQgbm90IGJlIGFsbG93ZWQgdG8gaGF2ZSBhIHZhY2FudCBzcGFjZSBhYm92ZSB0aGVtIC0gaWYgdGhlcmUgaXMgb25lIHRoZXkgc2hvdWxkIG1vdmUgdXB3YXJkcyB0byBmaWxsIGl0XG4gICAgICovXG4gICAgc2hpZnRXaWRnZXRzVXAoKTogdm9pZCB7XG5cbiAgICAgICAgLy8gY2hlY2sgd2hldGhlciBvciBub3QgY2hhbmdlcyBoYXZlIGJlZW4gbWFkZSAtIGlmIHNvIHdlIG5lZWQgdG8gcmVwZWF0IHVudGlsIHN0YWJsZVxuICAgICAgICBsZXQgc3RhYmxlID0gdHJ1ZTtcblxuICAgICAgICAvLyBpdGVyYXRlIGVhY2ggd2lkZ2V0IGFuZFxuICAgICAgICB0aGlzLndpZGdldHMuZm9yRWFjaCh3aWRnZXQgPT4ge1xuXG4gICAgICAgICAgICAvLyBpZiB3aWRnZXQgaXMgYWxyZWFkeSBvbiB0aGUgdG9wIHJvdyB0aGVuIGRvIG5vdGhpbmdcbiAgICAgICAgICAgIGlmICh3aWRnZXQuZ2V0Um93KCkgPT09IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGlmIHdlIGFyZSBjdXJyZW50bHkgZHJhZ2dpbmcgYW5kIHRoaXMgaXMgdGhlIGRyYWdnaW5nIHdpZGdldCB0aGVuIHNraXBcbiAgICAgICAgICAgIGlmICh0aGlzLl9hY3Rpb25XaWRnZXQgJiYgdGhpcy5fYWN0aW9uV2lkZ2V0LndpZGdldCA9PT0gd2lkZ2V0KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodGhpcy5nZXRQb3NpdGlvbkF2YWlsYWJsZSh3aWRnZXQuZ2V0Q29sdW1uKCksIHdpZGdldC5nZXRSb3coKSAtIDEsIHdpZGdldC5nZXRDb2x1bW5TcGFuKCksIDEpKSB7XG4gICAgICAgICAgICAgICAgd2lkZ2V0LnNldFJvdyh3aWRnZXQuZ2V0Um93KCkgLSAxKTtcbiAgICAgICAgICAgICAgICBzdGFibGUgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gaWYgY2hhbmdlcyBvY2N1cnJlZCB0aGVuIHdlIHNob3VsZCByZXBlYXQgdGhlIHByb2Nlc3NcbiAgICAgICAgaWYgKCFzdGFibGUpIHtcbiAgICAgICAgICAgIHRoaXMuc2hpZnRXaWRnZXRzVXAoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEl0ZXJhdGUgb3ZlciBlYWNoIHNwYWNlIGEgd2lkZ2V0IG9jY3VwaWVkXG4gICAgICogQHBhcmFtIHdpZGdldCBUaGUgd2lkZ2V0IHRvIGRldGVybWluZSBzcGFjZXNcbiAgICAgKiBAcGFyYW0gY2FsbGJhY2sgVGhlIGZ1bmN0aW9uIHRvIGJlIGNhbGxlZCBmb3IgZWFjaCBzcGFjZSwgc2hvdWxkIGV4cGVjdCBhIGNvbHVtbiBhbmQgcm93IGFyZ3VtZW50IHdpdGh0IGhlIGNvbnRleHQgYmVpbmcgdGhlIHdpZGdldFxuICAgICAqL1xuICAgIGZvckVhY2hCbG9jayh3aWRnZXQ6IERhc2hib2FyZFdpZGdldENvbXBvbmVudCwgY2FsbGJhY2s6IChjb2x1bW46IG51bWJlciwgcm93OiBudW1iZXIpID0+IHZvaWQpOiB2b2lkIHtcbiAgICAgICAgZm9yIChsZXQgcm93ID0gd2lkZ2V0LmdldFJvdygpOyByb3cgPCB3aWRnZXQuZ2V0Um93KCkgKyB3aWRnZXQuZ2V0Um93U3BhbigpOyByb3crKykge1xuICAgICAgICAgICAgZm9yIChsZXQgY29sdW1uID0gd2lkZ2V0LmdldENvbHVtbigpOyBjb2x1bW4gPCB3aWRnZXQuZ2V0Q29sdW1uKCkgKyB3aWRnZXQuZ2V0Q29sdW1uU3BhbigpOyBjb2x1bW4rKykge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrLmNhbGwod2lkZ2V0LCBjb2x1bW4sIHJvdyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRXaWRnZXRCZWxvdyh3aWRnZXQ6IERhc2hib2FyZFdpZGdldENvbXBvbmVudCk6IERhc2hib2FyZFdpZGdldENvbXBvbmVudCB8IG51bGwge1xuICAgICAgICBjb25zdCB0YXJnZXQgPSB0aGlzLmdldFdpZGdldHNBdFBvc2l0aW9uKHdpZGdldC5nZXRDb2x1bW4oKSwgd2lkZ2V0LmdldFJvdygpICsgd2lkZ2V0LmdldFJvd1NwYW4oKSwgdHJ1ZSk7XG5cbiAgICAgICAgcmV0dXJuIHRhcmdldC5sZW5ndGggPiAwID8gdGFyZ2V0WzBdIDogbnVsbDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBudW1iZXIgb2YgY29sdW1ucyBhdmFpbGFibGVcbiAgICAgKi9cbiAgICBnZXRDb2x1bW5Db3VudCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5zdGFja2VkID8gMSA6IHRoaXMub3B0aW9ucy5jb2x1bW5zO1xuICAgIH1cblxuICAgIG9uU2hpZnRTdGFydCh3aWRnZXQ6IERhc2hib2FyZFdpZGdldENvbXBvbmVudCk6IHZvaWQge1xuICAgICAgICB0aGlzLm9uRHJhZ1N0YXJ0KHsgZGlyZWN0aW9uOiBBY3Rpb25EaXJlY3Rpb24uTW92ZSwgd2lkZ2V0IH0pO1xuICAgIH1cblxuICAgIC8qKiBQcm9ncmFtbWF0aWNhbGx5IG1vdmUgYSB3aWRnZXQgaW4gYSBnaXZlbiBkaXJlY3Rpb24gKi9cbiAgICBvblNoaWZ0KHdpZGdldDogRGFzaGJvYXJkV2lkZ2V0Q29tcG9uZW50LCBkaXJlY3Rpb246IEFjdGlvbkRpcmVjdGlvbik6IHZvaWQge1xuXG4gICAgICAgIC8vIGdldCB0aGUgY3VycmVudCBtb3VzZSBwb3NpdGlvblxuICAgICAgICBsZXQgZGVsdGFYID0gMCwgZGVsdGFZID0gMDtcblxuICAgICAgICAvLyBtb3ZlIGJhc2VkIG9uIHRoZSBkaXJlY3Rpb25cbiAgICAgICAgc3dpdGNoIChkaXJlY3Rpb24pIHtcbiAgICAgICAgICAgIGNhc2UgQWN0aW9uRGlyZWN0aW9uLlRvcDpcbiAgICAgICAgICAgICAgICBkZWx0YVkgPSAtdGhpcy5nZXRSb3dIZWlnaHQoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgQWN0aW9uRGlyZWN0aW9uLlJpZ2h0OlxuICAgICAgICAgICAgICAgIGRlbHRhWCA9IHRoaXMuZ2V0Q29sdW1uV2lkdGgoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgQWN0aW9uRGlyZWN0aW9uLkJvdHRvbToge1xuICAgICAgICAgICAgICAgIGRlbHRhWSA9IHRoaXMuZ2V0Um93SGVpZ2h0KCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXNlIEFjdGlvbkRpcmVjdGlvbi5MZWZ0OlxuICAgICAgICAgICAgICAgIGRlbHRhWCA9IC10aGlzLmdldENvbHVtbldpZHRoKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBkaW1lbnNpb25zOiBEYXNoYm9hcmRXaWRnZXREaW1lbnNpb25zID0ge1xuICAgICAgICAgICAgeDogd2lkZ2V0LnggKyBkZWx0YVgsXG4gICAgICAgICAgICB5OiB3aWRnZXQueSArIGRlbHRhWSxcbiAgICAgICAgICAgIHdpZHRoOiB3aWRnZXQud2lkdGgsXG4gICAgICAgICAgICBoZWlnaHQ6IHdpZGdldC5oZWlnaHRcbiAgICAgICAgfTtcblxuXG4gICAgICAgIC8vIHVwZGF0ZSBwbGFjZWhvbGRlciBwb3NpdGlvbiBhbmQgdmFsdWVcbiAgICAgICAgdGhpcy5zZXRQbGFjZWhvbGRlckJvdW5kcyhmYWxzZSwgZGltZW5zaW9ucy54LCBkaW1lbnNpb25zLnksIGRpbWVuc2lvbnMud2lkdGgsIGRpbWVuc2lvbnMuaGVpZ2h0KTtcblxuICAgICAgICAvLyB1cGRhdGUgd2lkZ2V0IHBvc2l0aW9uXG4gICAgICAgIGNvbnN0IHsgeCwgeSB9ID0gdGhpcy5wbGFjZWhvbGRlciQudmFsdWU7XG5cbiAgICAgICAgLy8gbW92ZSB0aGUgd2lkZ2V0IHRvIHRoZSBwbGFjZWhvbGRlciBwb3NpdGlvblxuICAgICAgICB3aWRnZXQuc2V0Qm91bmRzKHggLSB0aGlzLm9wdGlvbnMucGFkZGluZywgeSAtIHRoaXMub3B0aW9ucy5wYWRkaW5nLCBkaW1lbnNpb25zLndpZHRoLCBkaW1lbnNpb25zLmhlaWdodCk7XG5cbiAgICAgICAgLy8gdXBkYXRlIHRoZSBoZWlnaHQgb2YgdGhlIGRhc2hib2FyZFxuICAgICAgICB0aGlzLnNldERhc2hib2FyZEhlaWdodCgpO1xuXG4gICAgfVxuXG4gICAgb25TaGlmdEVuZCgpOiB2b2lkIHtcbiAgICAgICAgLy8gc2hvdyB0aGUgd2lkZ2V0IHBvc2l0aW9ucyBpZiB0aGUgY3VycmVudCBwb3NpdGlvbnMgYW5kIHNpemVzIHdlcmUgdG8gcGVyc2lzdFxuICAgICAgICB0aGlzLnNoaWZ0V2lkZ2V0cygpO1xuXG4gICAgICAgIC8vIHRoZSBoZWlnaHQgb2YgdGhlIGRhc2hib2FyZCBtYXkgaGF2ZSBjaGFuZ2VkIGFmdGVyIG1vdmluZyB3aWRnZXRzXG4gICAgICAgIHRoaXMuc2V0RGFzaGJvYXJkSGVpZ2h0KCk7XG5cbiAgICAgICAgLy8gcmVzZXQgYWxsIHByb3BlcnRpZXNcbiAgICAgICAgdGhpcy5vbkRyYWdFbmQoKTtcbiAgICB9XG5cbiAgICAvKiogUHJvZ3JhbW1hdGljYWxseSByZXNpemUgYSB3aWRnZXQgaW4gYSBnaXZlbiBkaXJlY3Rpb24gKi9cbiAgICBvblJlc2l6ZSh3aWRnZXQ6IERhc2hib2FyZFdpZGdldENvbXBvbmVudCwgZGlyZWN0aW9uOiBBY3Rpb25EaXJlY3Rpb24pOiB2b2lkIHtcblxuICAgICAgICAvLyBkbyBub3QgcGVyZm9ybSByZXNpemluZyBpZiB3ZSBhcmUgaW4gc3RhY2tlZCBtb2RlXG4gICAgICAgIGlmICh0aGlzLnN0YWNrZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHBlcmZvcm0gdGhlIHJlc2l6aW5nXG4gICAgICAgIGxldCBkZWx0YVggPSAwLCBkZWx0YVkgPSAwO1xuXG4gICAgICAgIC8vIG1vdmUgYmFzZWQgb24gdGhlIGRpcmVjdGlvblxuICAgICAgICBzd2l0Y2ggKGRpcmVjdGlvbikge1xuICAgICAgICAgICAgY2FzZSBBY3Rpb25EaXJlY3Rpb24uVG9wOlxuICAgICAgICAgICAgICAgIGRlbHRhWSA9IC10aGlzLmdldFJvd0hlaWdodCgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBBY3Rpb25EaXJlY3Rpb24uUmlnaHQ6XG4gICAgICAgICAgICAgICAgZGVsdGFYID0gdGhpcy5nZXRDb2x1bW5XaWR0aCgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBBY3Rpb25EaXJlY3Rpb24uQm90dG9tOlxuICAgICAgICAgICAgICAgIGRlbHRhWSA9IHRoaXMuZ2V0Um93SGVpZ2h0KCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIEFjdGlvbkRpcmVjdGlvbi5MZWZ0OlxuICAgICAgICAgICAgICAgIGRlbHRhWCA9IC10aGlzLmdldENvbHVtbldpZHRoKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBkaW1lbnNpb25zOiBEYXNoYm9hcmRXaWRnZXREaW1lbnNpb25zID0ge1xuICAgICAgICAgICAgeDogd2lkZ2V0LngsXG4gICAgICAgICAgICB5OiB3aWRnZXQueSxcbiAgICAgICAgICAgIHdpZHRoOiB3aWRnZXQud2lkdGggKyBkZWx0YVgsXG4gICAgICAgICAgICBoZWlnaHQ6IHdpZGdldC5oZWlnaHQgKyBkZWx0YVlcbiAgICAgICAgfTtcblxuICAgICAgICBjb25zdCBjdXJyZW50V2lkdGggPSB3aWRnZXQueCArIHdpZGdldC53aWR0aDtcbiAgICAgICAgY29uc3QgY3VycmVudEhlaWdodCA9IHdpZGdldC55ICsgd2lkZ2V0LmhlaWdodDtcblxuICAgICAgICAvLyBlbnN1cmUgdmFsdWVzIGFyZSB3aXRoaW4gdGhlIGRhc2hib2FyZCBib3VuZHNcbiAgICAgICAgaWYgKGRpbWVuc2lvbnMueCA8IDApIHtcbiAgICAgICAgICAgIGRpbWVuc2lvbnMueCA9IDA7XG4gICAgICAgICAgICBkaW1lbnNpb25zLndpZHRoID0gY3VycmVudFdpZHRoO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGRpbWVuc2lvbnMueSA8IDApIHtcbiAgICAgICAgICAgIGRpbWVuc2lvbnMueSA9IDA7XG4gICAgICAgICAgICBkaW1lbnNpb25zLmhlaWdodCA9IGN1cnJlbnRIZWlnaHQ7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoKGRpbWVuc2lvbnMueCArIGRpbWVuc2lvbnMud2lkdGgpID4gdGhpcy5nZXRDb2x1bW5XaWR0aCgpICogdGhpcy5nZXRDb2x1bW5Db3VudCgpKSB7XG4gICAgICAgICAgICBkaW1lbnNpb25zLndpZHRoID0gd2lkZ2V0LndpZHRoO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gaWYgdGhlIHByb3Bvc2VkIHdpZHRoIGlzIHNtYWxsZXIgdGhhbiBhbGxvd2VkIHRoZW4gcmVzZXQgd2lkdGggdG8gbWluaW11bSBhbmQgaWdub3JlIHggY2hhbmdlc1xuICAgICAgICBpZiAoZGltZW5zaW9ucy53aWR0aCA8IHRoaXMuZ2V0Q29sdW1uV2lkdGgoKSkge1xuICAgICAgICAgICAgZGltZW5zaW9ucy54ID0gd2lkZ2V0Lng7XG4gICAgICAgICAgICBkaW1lbnNpb25zLndpZHRoID0gdGhpcy5nZXRDb2x1bW5XaWR0aCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gaWYgdGhlIHByb3Bvc2VkIGhlaWdodCBpcyBzbWFsbGVyIHRoYW4gYWxsb3dlZCB0aGVuIHJlc2V0IGhlaWdodCB0byBtaW5pbXVtIGFuZCBpZ25vcmUgeSBjaGFuZ2VzXG4gICAgICAgIGlmIChkaW1lbnNpb25zLmhlaWdodCA8IHRoaXMuZ2V0Um93SGVpZ2h0KCkpIHtcbiAgICAgICAgICAgIGRpbWVuc2lvbnMueSA9IHdpZGdldC55O1xuICAgICAgICAgICAgZGltZW5zaW9ucy5oZWlnaHQgPSB0aGlzLmdldFJvd0hlaWdodCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gbW92ZSB0aGUgd2lkZ2V0IHRvIHRoZSBwbGFjZWhvbGRlciBwb3NpdGlvblxuICAgICAgICB3aWRnZXQuc2V0Qm91bmRzKGRpbWVuc2lvbnMueCwgZGltZW5zaW9ucy55LCBkaW1lbnNpb25zLndpZHRoLCBkaW1lbnNpb25zLmhlaWdodCk7XG5cbiAgICAgICAgLy8gdXBkYXRlIHBsYWNlaG9sZGVyIHBvc2l0aW9uIGFuZCB2YWx1ZVxuICAgICAgICB0aGlzLnNldFBsYWNlaG9sZGVyQm91bmRzKGZhbHNlLCBkaW1lbnNpb25zLngsIGRpbWVuc2lvbnMueSwgZGltZW5zaW9ucy53aWR0aCwgZGltZW5zaW9ucy5oZWlnaHQpO1xuXG4gICAgICAgIC8vIHRoZSBoZWlnaHQgb2YgdGhlIGRhc2hib2FyZCBtYXkgaGF2ZSBjaGFuZ2VkIGFmdGVyIG1vdmluZyB3aWRnZXRzXG4gICAgICAgIHRoaXMuc2V0RGFzaGJvYXJkSGVpZ2h0KCk7XG4gICAgfVxuXG4gICAgZ2V0U3Vycm91bmRpbmdXaWRnZXRzKHdpZGdldDogRGFzaGJvYXJkV2lkZ2V0Q29tcG9uZW50LCBkaXJlY3Rpb246IEFjdGlvbkRpcmVjdGlvbik6IERhc2hib2FyZFdpZGdldENvbXBvbmVudFtdIHtcbiAgICAgICAgbGV0IHdpZGdldHM6IERhc2hib2FyZFdpZGdldENvbXBvbmVudFtdID0gW107XG5cbiAgICAgICAgZm9yIChsZXQgY29sdW1uID0gd2lkZ2V0LmdldENvbHVtbigpOyBjb2x1bW4gPCB3aWRnZXQuZ2V0Q29sdW1uKCkgKyB3aWRnZXQuZ2V0Q29sdW1uU3BhbigpOyBjb2x1bW4rKykge1xuXG4gICAgICAgICAgICBzd2l0Y2ggKGRpcmVjdGlvbikge1xuXG4gICAgICAgICAgICAgICAgY2FzZSBBY3Rpb25EaXJlY3Rpb24uVG9wOlxuICAgICAgICAgICAgICAgICAgICB3aWRnZXRzID0gWy4uLndpZGdldHMsIC4uLnRoaXMuZ2V0V2lkZ2V0c0F0UG9zaXRpb24oY29sdW1uLCB3aWRnZXQuZ2V0Um93KCkgLSAxKV07XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSBBY3Rpb25EaXJlY3Rpb24uQm90dG9tOlxuICAgICAgICAgICAgICAgICAgICB3aWRnZXRzID0gWy4uLndpZGdldHMsIC4uLnRoaXMuZ2V0V2lkZ2V0c0F0UG9zaXRpb24oY29sdW1uLCB3aWRnZXQuZ2V0Um93KCkgKyB3aWRnZXQuZ2V0Um93U3BhbigpKV07XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHdpZGdldHM7XG4gICAgfVxufVxuXG5leHBvcnQgY29uc3QgZGVmYXVsdE9wdGlvbnM6IERhc2hib2FyZE9wdGlvbnMgPSB7IGNvbHVtbnM6IDUsIHBhZGRpbmc6IDUsIG1pbldpZHRoOiAxMDAsIG1pbkhlaWdodDogMTAwLCBlbXB0eVJvdzogdHJ1ZSB9O1xuXG5leHBvcnQgaW50ZXJmYWNlIERhc2hib2FyZERpbWVuc2lvbnMge1xuICAgIHdpZHRoPzogbnVtYmVyO1xuICAgIGhlaWdodD86IG51bWJlcjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBEYXNoYm9hcmRXaWRnZXREaW1lbnNpb25zIHtcbiAgICB4OiBudW1iZXI7XG4gICAgeTogbnVtYmVyO1xuICAgIHdpZHRoOiBudW1iZXI7XG4gICAgaGVpZ2h0OiBudW1iZXI7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRGFzaGJvYXJkQWN0aW9uIHtcbiAgICB3aWRnZXQ6IERhc2hib2FyZFdpZGdldENvbXBvbmVudDtcbiAgICBkaXJlY3Rpb246IEFjdGlvbkRpcmVjdGlvbjtcbiAgICBldmVudD86IE1vdXNlRXZlbnQ7XG4gICAgaGFuZGxlPzogSFRNTEVsZW1lbnQ7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRGFzaGJvYXJkU3BhY2Uge1xuICAgIHdpZGdldDogRGFzaGJvYXJkV2lkZ2V0Q29tcG9uZW50O1xuICAgIGNvbHVtbjogbnVtYmVyO1xuICAgIHJvdzogbnVtYmVyO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIERhc2hib2FyZFBsYWNlaG9sZGVyIHtcbiAgICB2aXNpYmxlOiBib29sZWFuO1xuICAgIHg6IG51bWJlcjtcbiAgICB5OiBudW1iZXI7XG4gICAgd2lkdGg6IG51bWJlcjtcbiAgICBoZWlnaHQ6IG51bWJlcjtcbiAgICBjb2x1bW4/OiBudW1iZXI7XG4gICAgcm93PzogbnVtYmVyO1xuICAgIGNvbHVtblNwYW4/OiBudW1iZXI7XG4gICAgcm93U3Bhbj86IG51bWJlcjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBEYXNoYm9hcmRDYWNoZSB7XG4gICAgaWQ6IHN0cmluZztcbiAgICBjb2x1bW46IG51bWJlcjtcbiAgICByb3c6IG51bWJlcjtcbiAgICBjb2x1bW5TcGFuOiBudW1iZXI7XG4gICAgcm93U3BhbjogbnVtYmVyO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIERhc2hib2FyZExheW91dERhdGEge1xuICAgIGlkOiBzdHJpbmc7XG4gICAgY29sOiBudW1iZXI7XG4gICAgcm93OiBudW1iZXI7XG4gICAgY29sU3BhbjogbnVtYmVyO1xuICAgIHJvd1NwYW46IG51bWJlcjtcbn1cblxuZXhwb3J0IGVudW0gQWN0aW9uRGlyZWN0aW9uIHtcbiAgICBUb3AgPSAwLFxuICAgIFRvcFJpZ2h0ID0gMSxcbiAgICBSaWdodCA9IDIsXG4gICAgQm90dG9tUmlnaHQgPSAzLFxuICAgIEJvdHRvbSA9IDQsXG4gICAgQm90dG9tTGVmdCA9IDUsXG4gICAgTGVmdCA9IDYsXG4gICAgVG9wTGVmdCA9IDcsXG4gICAgTW92ZSA9IDhcbn1cblxuZXhwb3J0IGVudW0gUm91bmRpbmcge1xuICAgIFJvdW5kRG93bixcbiAgICBSb3VuZERvd25CZWxvd0hhbGYsXG4gICAgUm91bmRVcCxcbiAgICBSb3VuZFVwT3ZlckhhbGZcbn0iXX0=