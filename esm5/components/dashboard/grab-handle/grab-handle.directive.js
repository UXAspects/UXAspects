/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { DOWN_ARROW, ENTER, ESCAPE, LEFT_ARROW, RIGHT_ARROW, SPACE, UP_ARROW } from '@angular/cdk/keycodes';
import { Directive, ElementRef, HostBinding, HostListener, Input } from '@angular/core';
import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { ActionDirection, DashboardService } from '../dashboard.service';
import { DashboardWidgetComponent } from '../widget/dashboard-widget.component';
import { DashboardGrabHandleService } from './grab-handle.service';
var DashboardGrabHandleDirective = /** @class */ (function () {
    function DashboardGrabHandleDirective(widget, _dashboard, _handle, _elementRef, _announcer) {
        var _this = this;
        this.widget = widget;
        this._dashboard = _dashboard;
        this._handle = _handle;
        this._elementRef = _elementRef;
        this._announcer = _announcer;
        /**
         * Specify whether or not this handle can be used to perform moving
         */
        this.uxGrabAllowMove = true;
        /**
         * Specify whether or not this handle can be used to perform resizing
         */
        this.uxGrabAllowResize = true;
        /**
         * The aria label for the grab handle
         */
        this.uxGrabAriaLabel = this.getDefaultAriaLabel.bind(this);
        /**
         * Customize the announcement that is made whenever an item has successfully been moved or resized
         */
        this.uxGrabChangeSuccessAnnouncement = this.getChangeSuccessAnnouncement.bind(this);
        /**
         * Customize the announcement that is made whenever an item enters 'grab' mode
         */
        this.uxGrabStartAnnouncement = this.getStartAnnouncement.bind(this);
        /**
         * Customize the announcement thqt is made whenever an item cannot be moved
         */
        this.uxGrabMoveFailAnnouncement = this.getMoveFailAnnouncement.bind(this);
        /**
         * Customize the announcement thqt is made whenever an item cannot be resized
         */
        this.uxGrabResizeFailAnnouncement = this.getResizeFailAnnouncement.bind(this);
        /**
         * Customize the announcement made whenever the moving/resizing is commited
         */
        this.uxGrabConfirmAnnouncement = this.getConfirmAnnouncement.bind(this);
        /**
         * Customize the announcement made whenever the moving/resizing is cancelled
         */
        this.uxGrabCancelAnnouncement = this.getCancellationAnnouncement.bind(this);
        /**
         * We must programmatically control the focus of the drag handles
         */
        this.tabIndex = -1;
        /**
         * Store the current dragging state
         */
        this.isGrabbing = false;
        /**
         * Emit when the directive is destroyed to unsubscribe from all observables
         */
        this._onDestroy = new Subject();
        if (!widget) {
            throw new Error('uxDashboardGrabHandle must be used within a dashboard widget');
        }
        // subscribe to changes to the current grab state
        _dashboard.isGrabbing$.pipe(takeUntil(this._onDestroy), map(function (_widget) { return _widget === widget; }))
            .subscribe(function (isGrabbing) { return _this.isGrabbing = isGrabbing; });
    }
    /** Set the initial aria label and subscribe to layout changes */
    /**
     * Set the initial aria label and subscribe to layout changes
     * @return {?}
     */
    DashboardGrabHandleDirective.prototype.ngOnInit = /**
     * Set the initial aria label and subscribe to layout changes
     * @return {?}
     */
    function () {
        var _this = this;
        if (!this.widget.name) {
            console.warn("Dashboard widget " + this.widget.id + " must have a valid 'name' to use uxDashboardGrabHandle");
        }
        // set the initial aria label
        this.ariaLabel = this.getAnnouncement(this.uxGrabAriaLabel);
        // update the aria label when layout changes occur
        this._dashboard.layout$.pipe(takeUntil(this._onDestroy))
            .subscribe(function () { return _this.ariaLabel = _this.getAnnouncement(_this.uxGrabAriaLabel); });
    };
    /** Unsubscribe from all observables */
    /**
     * Unsubscribe from all observables
     * @return {?}
     */
    DashboardGrabHandleDirective.prototype.ngOnDestroy = /**
     * Unsubscribe from all observables
     * @return {?}
     */
    function () {
        this._onDestroy.next();
        this._onDestroy.complete();
    };
    /** Begin drag mode and cache initial state */
    /**
     * Begin drag mode and cache initial state
     * @return {?}
     */
    DashboardGrabHandleDirective.prototype.enableDragMode = /**
     * Begin drag mode and cache initial state
     * @return {?}
     */
    function () {
        if (!this.isGrabbing) {
            // cache the widgets so we can restore when escape is pressed
            this._cache = this._lastMovement = this._dashboard.cacheWidgets();
            // store the current widget being grabbed
            this._dashboard.isGrabbing$.next(this.widget);
            this._dashboard.onShiftStart(this.widget);
            // announce the grab start
            this._announcer.announce(this.getAnnouncement(this.uxGrabStartAnnouncement));
        }
    };
    /** Finish drag mode and commit the current state */
    /**
     * Finish drag mode and commit the current state
     * @return {?}
     */
    DashboardGrabHandleDirective.prototype.disableDragMode = /**
     * Finish drag mode and commit the current state
     * @return {?}
     */
    function () {
        if (this.isGrabbing) {
            this._dashboard.isGrabbing$.next(null);
            this._lastMovement = null;
            this._dashboard.onShiftEnd();
            // announce the confirmation
            this._announcer.announce(this.getAnnouncement(this.uxGrabConfirmAnnouncement));
        }
    };
    /** Finish the drag mode and restore the original state */
    /**
     * Finish the drag mode and restore the original state
     * @return {?}
     */
    DashboardGrabHandleDirective.prototype.cancelDragMode = /**
     * Finish the drag mode and restore the original state
     * @return {?}
     */
    function () {
        if (this.isGrabbing) {
            this._dashboard.onShiftEnd();
            this._dashboard.restoreWidgets(false, this._cache, true);
            this._dashboard.setDashboardHeight();
            this._dashboard.layout$.next(this._dashboard.getLayoutData());
            this._dashboard.isGrabbing$.next(null);
            // announce the cancellation
            this._announcer.announce(this.getAnnouncement(this.uxGrabCancelAnnouncement));
        }
    };
    /** Toggle the drag mode state */
    /**
     * Toggle the drag mode state
     * @return {?}
     */
    DashboardGrabHandleDirective.prototype.toggleDragMode = /**
     * Toggle the drag mode state
     * @return {?}
     */
    function () {
        this.isGrabbing ? this.disableDragMode() : this.enableDragMode();
    };
    /** Set the tab index and optionally focus the DOM element */
    /**
     * Set the tab index and optionally focus the DOM element
     * @param {?=} focusElement
     * @return {?}
     */
    DashboardGrabHandleDirective.prototype.focus = /**
     * Set the tab index and optionally focus the DOM element
     * @param {?=} focusElement
     * @return {?}
     */
    function (focusElement) {
        if (focusElement === void 0) { focusElement = true; }
        this.tabIndex = 0;
        if (focusElement) {
            this._elementRef.nativeElement.focus();
        }
    };
    /** Make this item non-tabbable */
    /**
     * Make this item non-tabbable
     * @return {?}
     */
    DashboardGrabHandleDirective.prototype.blur = /**
     * Make this item non-tabbable
     * @return {?}
     */
    function () {
        this.tabIndex = -1;
    };
    /** When the grab handle loses focus then exit 'grab' mode */
    /**
     * When the grab handle loses focus then exit 'grab' mode
     * @return {?}
     */
    DashboardGrabHandleDirective.prototype.onBlur = /**
     * When the grab handle loses focus then exit 'grab' mode
     * @return {?}
     */
    function () {
        this.disableDragMode();
    };
    /** Handle key events */
    /**
     * Handle key events
     * @param {?} event
     * @param {?} key
     * @param {?} ctrlKey
     * @return {?}
     */
    DashboardGrabHandleDirective.prototype.onKeydown = /**
     * Handle key events
     * @param {?} event
     * @param {?} key
     * @param {?} ctrlKey
     * @return {?}
     */
    function (event, key, ctrlKey) {
        switch (key) {
            case ESCAPE:
                this.cancelDragMode();
                break;
            case SPACE:
            case ENTER:
                this.toggleDragMode();
                event.preventDefault();
                event.stopPropagation();
                break;
            case UP_ARROW:
            case RIGHT_ARROW:
            case DOWN_ARROW:
            case LEFT_ARROW:
                if (this.isGrabbing) {
                    ctrlKey ? this.resizeWidget(event, key) : this.moveWidget(event, key);
                }
                else {
                    this.moveFocus(event, key);
                }
        }
    };
    /** Get an announcement from the inputs - they may be a string or a function so handle both */
    /**
     * Get an announcement from the inputs - they may be a string or a function so handle both
     * @param {?} announcement
     * @param {...?} args
     * @return {?}
     */
    DashboardGrabHandleDirective.prototype.getAnnouncement = /**
     * Get an announcement from the inputs - they may be a string or a function so handle both
     * @param {?} announcement
     * @param {...?} args
     * @return {?}
     */
    function (announcement) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return typeof announcement === 'function' ? announcement.apply(void 0, tslib_1.__spread([this.widget], args)) : announcement;
    };
    /**
     * Move the widget in a given direction based on arrow keys
     * @param {?} event
     * @param {?} key
     * @return {?}
     */
    DashboardGrabHandleDirective.prototype.moveWidget = /**
     * Move the widget in a given direction based on arrow keys
     * @param {?} event
     * @param {?} key
     * @return {?}
     */
    function (event, key) {
        // check if moving is allowed
        if (!this.widget.isDraggable || !this.uxGrabAllowMove) {
            return;
        }
        // attempt to perform the move
        this._dashboard.onShift(this.widget, this.getDirectionFromKey(key));
        // get the announcable diff
        var /** @type {?} */ changes = this.getLayoutDiff();
        // if there were changes then announce them
        if (changes.length > 0) {
            this._announcer.announce(this.getAnnouncement(this.uxGrabChangeSuccessAnnouncement, changes));
        }
        else {
            this._announcer.announce(this.getAnnouncement(this.uxGrabMoveFailAnnouncement, this.getDirectionFromKey(key)));
        }
        this._lastMovement = this._dashboard.cacheWidgets();
        event.preventDefault();
        event.stopPropagation();
    };
    /**
     * Resize the widgets accordingly based on the arrow keys
     * @param {?} event
     * @param {?} key
     * @return {?}
     */
    DashboardGrabHandleDirective.prototype.resizeWidget = /**
     * Resize the widgets accordingly based on the arrow keys
     * @param {?} event
     * @param {?} key
     * @return {?}
     */
    function (event, key) {
        // check if resizing is allowed
        if (!this.widget.resizable || !this.uxGrabAllowResize) {
            return;
        }
        this._dashboard.onResize(this.widget, this.getDirectionFromKey(key));
        // get the announcable diff
        var /** @type {?} */ changes = this.getLayoutDiff();
        // if there were changes then announce them
        if (changes.length > 0) {
            this._announcer.announce(this.getAnnouncement(this.uxGrabChangeSuccessAnnouncement, changes));
        }
        else {
            this._announcer.announce(this.getAnnouncement(this.uxGrabResizeFailAnnouncement, this.getDirectionFromKey(key)));
        }
        this._lastMovement = this._dashboard.cacheWidgets();
        event.preventDefault();
        event.stopPropagation();
    };
    /**
     * Shift focus between the variour grab handles
     * @param {?} event
     * @param {?} key
     * @return {?}
     */
    DashboardGrabHandleDirective.prototype.moveFocus = /**
     * Shift focus between the variour grab handles
     * @param {?} event
     * @param {?} key
     * @return {?}
     */
    function (event, key) {
        switch (key) {
            case UP_ARROW:
                this._handle.setSiblingItemFocus(this.widget, ActionDirection.Top);
                break;
            case RIGHT_ARROW:
                this._handle.setNextItemFocus(this);
                break;
            case DOWN_ARROW:
                this._handle.setSiblingItemFocus(this.widget, ActionDirection.Bottom);
                break;
            case LEFT_ARROW:
                this._handle.setPreviousItemFocus(this);
                break;
        }
        event.preventDefault();
        event.stopPropagation();
    };
    /**
     * Convert an arrow key code into an ActionDirection enum
     * @param {?} key
     * @return {?}
     */
    DashboardGrabHandleDirective.prototype.getDirectionFromKey = /**
     * Convert an arrow key code into an ActionDirection enum
     * @param {?} key
     * @return {?}
     */
    function (key) {
        switch (key) {
            case UP_ARROW:
                return ActionDirection.Top;
            case RIGHT_ARROW:
                return ActionDirection.Right;
            case DOWN_ARROW:
                return ActionDirection.Bottom;
            case LEFT_ARROW:
                return ActionDirection.Left;
        }
    };
    /**
     * Supply the default grab handle aria label based on the provided constraints
     * @param {?} widget
     * @return {?}
     */
    DashboardGrabHandleDirective.prototype.getDefaultAriaLabel = /**
     * Supply the default grab handle aria label based on the provided constraints
     * @param {?} widget
     * @return {?}
     */
    function (widget) {
        if (widget.resizable && this.uxGrabAllowResize && widget.isDraggable && this.uxGrabAllowMove) {
            return "Press space to move and resize the " + widget.name + " panel.";
        }
        else if (widget.resizable && this.uxGrabAllowResize) {
            return "Press space to resize the " + widget.name + " panel.";
        }
        else if (widget.isDraggable && this.uxGrabAllowMove) {
            return "Press space to move the " + widget.name + " panel.";
        }
    };
    /**
     * Get the default announcement whenever a movement or resize was successful
     * @return {?}
     */
    DashboardGrabHandleDirective.prototype.getChangeSuccessAnnouncement = /**
     * Get the default announcement whenever a movement or resize was successful
     * @return {?}
     */
    function () {
        return this.getDiffAnnouncements().join(' ') + " Use the cursor keys to continue moving and resizing, enter to commit, or escape to cancel.";
    };
    /**
     * @return {?}
     */
    DashboardGrabHandleDirective.prototype.getDiffAnnouncements = /**
     * @return {?}
     */
    function () {
        // map the differences to strings
        return this.getLayoutDiff().map(function (diff) {
            var /** @type {?} */ changes = [];
            // Handle movement strings
            if (diff.isMovedHorizontally && diff.isMovedVertically) {
                changes.push("moved to row " + diff.currentRow + ", column " + diff.currentColumn);
            }
            else if (diff.isMovedDown) {
                changes.push("moved down to row " + diff.currentRow + ", column " + diff.currentColumn);
            }
            else if (diff.isMovedUp) {
                changes.push("moved up to row " + diff.currentRow + ", column " + diff.currentColumn);
            }
            else if (diff.isMovedLeft) {
                changes.push("moved left to row " + diff.currentRow + ", column " + diff.currentColumn);
            }
            else if (diff.isMovedRight) {
                changes.push("moved right to row " + diff.currentRow + ", column " + diff.currentColumn);
            }
            // handle resize strings
            if (diff.isResized) {
                changes.push("resized to " + diff.currentColumnSpan + " columns wide and " + diff.currentRowSpan + " rows high");
            }
            return diff.widget.name + " panel is " + changes.join(' and ') + ".";
        });
    };
    /**
     * Get the default announcement whenever a movement is not possible due to dashboard boundaries
     * @param {?} widget
     * @param {?} direction
     * @return {?}
     */
    DashboardGrabHandleDirective.prototype.getMoveFailAnnouncement = /**
     * Get the default announcement whenever a movement is not possible due to dashboard boundaries
     * @param {?} widget
     * @param {?} direction
     * @return {?}
     */
    function (widget, direction) {
        switch (direction) {
            case ActionDirection.Top:
                return "Cannot move the " + widget.name + " panel up, because it is at the top edge of the dashboard";
            case ActionDirection.Bottom:
                return "Cannot move the " + widget.name + " panel down, because it is at the bottom edge of the dashboard";
            case ActionDirection.Right:
                return "Cannot move the " + widget.name + " panel right, because it is at the right edge of the dashboard";
            case ActionDirection.Left:
                return "Cannot move the " + widget.name + " panel left, because it is at the left edge of the dashboard";
        }
    };
    /**
     * Get the default announcement whenever a resize is not possible due to either widget constraints of dashboard bounds
     * @param {?} widget
     * @param {?} direction
     * @return {?}
     */
    DashboardGrabHandleDirective.prototype.getResizeFailAnnouncement = /**
     * Get the default announcement whenever a resize is not possible due to either widget constraints of dashboard bounds
     * @param {?} widget
     * @param {?} direction
     * @return {?}
     */
    function (widget, direction) {
        switch (direction) {
            case ActionDirection.Top:
                return "Cannot make the " + widget.name + " panel shorter, because it is currently at its minimum height.";
            case ActionDirection.Bottom:
                return "Cannot make the " + widget.name + " panel taller, because it is currently at its maximum height.";
            case ActionDirection.Right:
                return "Cannot make the " + widget.name + " panel wider, because it is at the right edge of the dashboard.";
            case ActionDirection.Left:
                return "Cannot make the " + widget.name + " panel narrower, because it is currently at its minimum width.";
        }
    };
    /**
     * Get the default announcement whenever we enter 'grab' mode
     * @param {?} widget
     * @return {?}
     */
    DashboardGrabHandleDirective.prototype.getStartAnnouncement = /**
     * Get the default announcement whenever we enter 'grab' mode
     * @param {?} widget
     * @return {?}
     */
    function (widget) {
        if (widget.isDraggable && widget.resizable && this.uxGrabAllowMove && this.uxGrabAllowResize) {
            return widget.name + " panel is currently on row " + widget.getRow() + ", column " + widget.getColumn() + " and is " + widget.getColumnSpan() + " columns wide and " + widget.getRowSpan() + " rows high. Use the cursor keys to move the widget and the cursor keys with the control modifier to resize the widget. Press enter to commit changes and press escape to cancel changes.";
        }
        else if (widget.isDraggable && this.uxGrabAllowMove) {
            return widget.name + " panel is currently on row " + widget.getRow() + ", column " + widget.getColumn() + ". Use the cursor keys to move the widget. Press enter to commit changes and press escape to cancel changes.";
        }
        else if (widget.resizable && this.uxGrabAllowResize) {
            return widget.name + " panel is currently on row " + widget.getRow() + ", column " + widget.getColumn() + " and is " + widget.getColumnSpan() + " columns wide and " + widget.getRowSpan() + " rows high. Use the cursor keys with the control modifier to resize the widget. Press enter to commit changes and press escape to cancel changes.";
        }
    };
    /**
     * Get the default announcement whenever grab mode is exited after a movement or resize
     * @param {?} widget
     * @return {?}
     */
    DashboardGrabHandleDirective.prototype.getConfirmAnnouncement = /**
     * Get the default announcement whenever grab mode is exited after a movement or resize
     * @param {?} widget
     * @return {?}
     */
    function (widget) {
        if (widget.isDraggable && widget.resizable && this.uxGrabAllowMove && this.uxGrabAllowResize) {
            return "Moving and resizing complete. " + this.getDiffAnnouncements().join(' ') + " " + this.getAnnouncement(this.uxGrabAriaLabel);
        }
        else if (widget.isDraggable && this.uxGrabAllowMove) {
            return "Moving complete. " + this.getDiffAnnouncements().join(' ') + " " + this.getAnnouncement(this.uxGrabAriaLabel);
        }
        else if (widget.resizable && this.uxGrabAllowResize) {
            return "Resizing complete. " + this.getDiffAnnouncements().join(' ') + " " + this.getAnnouncement(this.uxGrabAriaLabel);
        }
    };
    /**
     * Get the default announcement whenever grab mode is exited after being cancelled
     * @param {?} widget
     * @return {?}
     */
    DashboardGrabHandleDirective.prototype.getCancellationAnnouncement = /**
     * Get the default announcement whenever grab mode is exited after being cancelled
     * @param {?} widget
     * @return {?}
     */
    function (widget) {
        if (widget.isDraggable && widget.resizable && this.uxGrabAllowMove && this.uxGrabAllowResize) {
            return "Moving and resizing cancelled. " + this.getDashboardAriaLabel() + " " + this.getAnnouncement(this.uxGrabAriaLabel);
        }
        else if (widget.isDraggable && this.uxGrabAllowMove) {
            return "Moving cancelled. " + this.getDashboardAriaLabel() + " " + this.getAnnouncement(this.uxGrabAriaLabel);
        }
        else if (widget.resizable && this.uxGrabAllowResize) {
            return "Resizing cancelled. " + this.getDashboardAriaLabel() + " " + this.getAnnouncement(this.uxGrabAriaLabel);
        }
    };
    /**
     * Get a description of all dashboard widgets, their positions and sizes
     * @return {?}
     */
    DashboardGrabHandleDirective.prototype.getDashboardAriaLabel = /**
     * Get a description of all dashboard widgets, their positions and sizes
     * @return {?}
     */
    function () {
        return "Dashboard with " + this._dashboard.options.columns + " columns, containing " + this._dashboard.widgets.length + " panels. " + this._dashboard.widgets.map(this.getWidgetAriaLabel).join(' ');
    };
    /**
     * Get a description of a given widget
     * @param {?} widget
     * @return {?}
     */
    DashboardGrabHandleDirective.prototype.getWidgetAriaLabel = /**
     * Get a description of a given widget
     * @param {?} widget
     * @return {?}
     */
    function (widget) {
        return widget.name + " panel in row " + widget.getRow() + ", column " + widget.getColumn() + ", is " + widget.getColumnSpan() + " columns wide and " + widget.getRowSpan() + " rows high.";
    };
    /**
     * Get an object describing all the changes that have been made to all widgets since the last change
     * @return {?}
     */
    DashboardGrabHandleDirective.prototype.getLayoutDiff = /**
     * Get an object describing all the changes that have been made to all widgets since the last change
     * @return {?}
     */
    function () {
        var _this = this;
        // find all changes
        var /** @type {?} */ diffs = this._dashboard.getLayoutData().map(function (layout) {
            // get the most recent cache
            var /** @type {?} */ cache = _this._lastMovement || _this._cache;
            // get the actual widget
            var /** @type {?} */ widget = _this._dashboard.widgets.find(function (_widget) { return _widget.id === layout.id; });
            // get previous position
            var /** @type {?} */ previousLayout = cache.find(function (_widget) { return _widget.id === layout.id; });
            // ensure they are all numbers
            layout.row = Number(layout.row);
            layout.rowSpan = Number(layout.rowSpan);
            layout.col = Number(layout.col);
            layout.colSpan = Number(layout.colSpan);
            previousLayout.row = Number(previousLayout.row);
            previousLayout.rowSpan = Number(previousLayout.rowSpan);
            previousLayout.column = Number(previousLayout.column);
            previousLayout.columnSpan = Number(previousLayout.columnSpan);
            return /** @type {?} */ ({
                widget: widget,
                currentRow: layout.row,
                currentColumn: layout.col,
                currentRowSpan: layout.rowSpan,
                currentColumnSpan: layout.colSpan,
                previousColumn: previousLayout.column,
                previousRow: previousLayout.row,
                previousColumnSpan: previousLayout.columnSpan,
                previousRowSpan: previousLayout.rowSpan,
                isMovedLeft: layout.col < previousLayout.column,
                isMovedRight: layout.col > previousLayout.column,
                isMovedUp: layout.row < previousLayout.row,
                isMovedDown: layout.row > previousLayout.row,
                isMovedHorizontally: layout.col !== previousLayout.column,
                isMovedVertically: layout.row !== previousLayout.row,
                isMoved: layout.col !== previousLayout.column || layout.row !== previousLayout.row,
                isResized: previousLayout.columnSpan !== layout.colSpan || previousLayout.rowSpan !== layout.rowSpan
            });
        });
        // get the order the widgets appear visually
        var /** @type {?} */ order = this._handle.getHandlesInOrder().map(function (handle) { return handle.widget; });
        // only return items that have been repositioned or resized
        return diffs.filter(function (diff) { return diff.isMoved || diff.isResized; }).sort(function (diffOne, diffTwo) {
            // sort this so that the item that the user moved is first in the list, and the remainder are in their new order as seen in the dashboard
            if (diffOne.widget === _this.widget) {
                return -1;
            }
            if (diffTwo.widget === _this.widget) {
                return 1;
            }
            // otherwise sort based on their visual order
            return order.indexOf(diffOne.widget) < order.indexOf(diffTwo.widget) ? -1 : 1;
        });
    };
    DashboardGrabHandleDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[uxDashboardGrabHandle]',
                    exportAs: 'ux-dashboard-grab-handle'
                },] }
    ];
    /** @nocollapse */
    DashboardGrabHandleDirective.ctorParameters = function () { return [
        { type: DashboardWidgetComponent },
        { type: DashboardService },
        { type: DashboardGrabHandleService },
        { type: ElementRef },
        { type: LiveAnnouncer }
    ]; };
    DashboardGrabHandleDirective.propDecorators = {
        uxGrabAllowMove: [{ type: Input }],
        uxGrabAllowResize: [{ type: Input }],
        uxGrabAriaLabel: [{ type: Input }],
        uxGrabChangeSuccessAnnouncement: [{ type: Input }],
        uxGrabStartAnnouncement: [{ type: Input }],
        uxGrabMoveFailAnnouncement: [{ type: Input }],
        uxGrabResizeFailAnnouncement: [{ type: Input }],
        uxGrabConfirmAnnouncement: [{ type: Input }],
        uxGrabCancelAnnouncement: [{ type: Input }],
        ariaLabel: [{ type: HostBinding, args: ['attr.aria-label',] }],
        tabIndex: [{ type: HostBinding, args: ['tabIndex',] }],
        onBlur: [{ type: HostListener, args: ['blur',] }],
        onKeydown: [{ type: HostListener, args: ['keydown', ['$event', '$event.which', '$event.ctrlKey'],] }]
    };
    return DashboardGrabHandleDirective;
}());
export { DashboardGrabHandleDirective };
function DashboardGrabHandleDirective_tsickle_Closure_declarations() {
    /**
     * Specify whether or not this handle can be used to perform moving
     * @type {?}
     */
    DashboardGrabHandleDirective.prototype.uxGrabAllowMove;
    /**
     * Specify whether or not this handle can be used to perform resizing
     * @type {?}
     */
    DashboardGrabHandleDirective.prototype.uxGrabAllowResize;
    /**
     * The aria label for the grab handle
     * @type {?}
     */
    DashboardGrabHandleDirective.prototype.uxGrabAriaLabel;
    /**
     * Customize the announcement that is made whenever an item has successfully been moved or resized
     * @type {?}
     */
    DashboardGrabHandleDirective.prototype.uxGrabChangeSuccessAnnouncement;
    /**
     * Customize the announcement that is made whenever an item enters 'grab' mode
     * @type {?}
     */
    DashboardGrabHandleDirective.prototype.uxGrabStartAnnouncement;
    /**
     * Customize the announcement thqt is made whenever an item cannot be moved
     * @type {?}
     */
    DashboardGrabHandleDirective.prototype.uxGrabMoveFailAnnouncement;
    /**
     * Customize the announcement thqt is made whenever an item cannot be resized
     * @type {?}
     */
    DashboardGrabHandleDirective.prototype.uxGrabResizeFailAnnouncement;
    /**
     * Customize the announcement made whenever the moving/resizing is commited
     * @type {?}
     */
    DashboardGrabHandleDirective.prototype.uxGrabConfirmAnnouncement;
    /**
     * Customize the announcement made whenever the moving/resizing is cancelled
     * @type {?}
     */
    DashboardGrabHandleDirective.prototype.uxGrabCancelAnnouncement;
    /**
     * Binding for the grab handle aria label
     * @type {?}
     */
    DashboardGrabHandleDirective.prototype.ariaLabel;
    /**
     * We must programmatically control the focus of the drag handles
     * @type {?}
     */
    DashboardGrabHandleDirective.prototype.tabIndex;
    /**
     * Store the current dragging state
     * @type {?}
     */
    DashboardGrabHandleDirective.prototype.isGrabbing;
    /**
     * Store the current layout when we enter 'grab' mode
     * @type {?}
     */
    DashboardGrabHandleDirective.prototype._cache;
    /**
     * Store the layout after the most recent successful move or resize
     * @type {?}
     */
    DashboardGrabHandleDirective.prototype._lastMovement;
    /**
     * Emit when the directive is destroyed to unsubscribe from all observables
     * @type {?}
     */
    DashboardGrabHandleDirective.prototype._onDestroy;
    /** @type {?} */
    DashboardGrabHandleDirective.prototype.widget;
    /** @type {?} */
    DashboardGrabHandleDirective.prototype._dashboard;
    /** @type {?} */
    DashboardGrabHandleDirective.prototype._handle;
    /** @type {?} */
    DashboardGrabHandleDirective.prototype._elementRef;
    /** @type {?} */
    DashboardGrabHandleDirective.prototype._announcer;
}
/**
 * @record
 */
export function DashboardLayoutDiff() { }
function DashboardLayoutDiff_tsickle_Closure_declarations() {
    /** @type {?} */
    DashboardLayoutDiff.prototype.widget;
    /** @type {?} */
    DashboardLayoutDiff.prototype.previousColumn;
    /** @type {?} */
    DashboardLayoutDiff.prototype.currentColumn;
    /** @type {?} */
    DashboardLayoutDiff.prototype.previousRow;
    /** @type {?} */
    DashboardLayoutDiff.prototype.currentRow;
    /** @type {?} */
    DashboardLayoutDiff.prototype.previousColumnSpan;
    /** @type {?} */
    DashboardLayoutDiff.prototype.currentColumnSpan;
    /** @type {?} */
    DashboardLayoutDiff.prototype.previousRowSpan;
    /** @type {?} */
    DashboardLayoutDiff.prototype.currentRowSpan;
    /** @type {?} */
    DashboardLayoutDiff.prototype.isMovedLeft;
    /** @type {?} */
    DashboardLayoutDiff.prototype.isMovedRight;
    /** @type {?} */
    DashboardLayoutDiff.prototype.isMovedUp;
    /** @type {?} */
    DashboardLayoutDiff.prototype.isMovedDown;
    /** @type {?} */
    DashboardLayoutDiff.prototype.isMovedHorizontally;
    /** @type {?} */
    DashboardLayoutDiff.prototype.isMovedVertically;
    /** @type {?} */
    DashboardLayoutDiff.prototype.isResized;
    /** @type {?} */
    DashboardLayoutDiff.prototype.isMoved;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JhYi1oYW5kbGUuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvZGFzaGJvYXJkL2dyYWItaGFuZGxlL2dyYWItaGFuZGxlLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNsRCxPQUFPLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDNUcsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsV0FBVyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQXFCLE1BQU0sZUFBZSxDQUFDO0FBQzNHLE9BQU8sRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDaEQsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUN2QyxPQUFPLEVBQUUsZUFBZSxFQUFrQixnQkFBZ0IsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3pGLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBQ2hGLE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLHVCQUF1QixDQUFDOztJQXFEL0Qsc0NBQ1csUUFDQyxZQUNBLFNBQ0EsYUFDQTtRQUxaLGlCQWNDO1FBYlUsV0FBTSxHQUFOLE1BQU07UUFDTCxlQUFVLEdBQVYsVUFBVTtRQUNWLFlBQU8sR0FBUCxPQUFPO1FBQ1AsZ0JBQVcsR0FBWCxXQUFXO1FBQ1gsZUFBVSxHQUFWLFVBQVU7Ozs7K0JBakRjLElBQUk7Ozs7aUNBR0YsSUFBSTs7OzsrQkFHd0MsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7K0NBR2lCLElBQUksQ0FBQyw0QkFBNEIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDOzs7O3VDQUd4RixJQUFJLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQzs7OzswQ0FHTCxJQUFJLENBQUMsdUJBQXVCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs0Q0FHckMsSUFBSSxDQUFDLHlCQUF5QixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7eUNBR3hFLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDOzs7O3dDQUd2QyxJQUFJLENBQUMsMkJBQTJCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozt3QkFNMUYsQ0FBQyxDQUFDOzs7OzBCQUd4QixLQUFLOzs7OzBCQVNOLElBQUksT0FBTyxFQUFRO1FBU3BDLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNWLE1BQU0sSUFBSSxLQUFLLENBQUMsOERBQThELENBQUMsQ0FBQztTQUNuRjs7UUFHRCxVQUFVLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxVQUFBLE9BQU8sSUFBSSxPQUFBLE9BQU8sS0FBSyxNQUFNLEVBQWxCLENBQWtCLENBQUMsQ0FBQzthQUN0RixTQUFTLENBQUMsVUFBQSxVQUFVLElBQUksT0FBQSxLQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsRUFBNUIsQ0FBNEIsQ0FBQyxDQUFDO0tBQzlEO0lBRUQsaUVBQWlFOzs7OztJQUNqRSwrQ0FBUTs7OztJQUFSO1FBQUEsaUJBWUM7UUFWRyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNwQixPQUFPLENBQUMsSUFBSSxDQUFDLHNCQUFvQixJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsMkRBQXdELENBQUMsQ0FBQztTQUM1Rzs7UUFHRCxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDOztRQUc1RCxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQzthQUNuRCxTQUFTLENBQUMsY0FBTSxPQUFBLEtBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSSxDQUFDLGVBQWUsQ0FBQyxLQUFJLENBQUMsZUFBZSxDQUFDLEVBQTNELENBQTJELENBQUMsQ0FBQztLQUNyRjtJQUVELHVDQUF1Qzs7Ozs7SUFDdkMsa0RBQVc7Ozs7SUFBWDtRQUNJLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDdkIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUUsQ0FBQztLQUM5QjtJQUVELDhDQUE4Qzs7Ozs7SUFDOUMscURBQWM7Ozs7SUFBZDtRQUNJLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7O1lBR25CLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksRUFBRSxDQUFDOztZQUdsRSxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBRTlDLElBQUksQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQzs7WUFHMUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsdUJBQXVCLENBQUMsQ0FBQyxDQUFDO1NBQ2hGO0tBQ0o7SUFFRCxvREFBb0Q7Ozs7O0lBQ3BELHNEQUFlOzs7O0lBQWY7UUFDSSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztZQUNsQixJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDdkMsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUM7WUFDMUIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLEVBQUUsQ0FBQzs7WUFHN0IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMseUJBQXlCLENBQUMsQ0FBQyxDQUFDO1NBQ2xGO0tBQ0o7SUFFRCwwREFBMEQ7Ozs7O0lBQzFELHFEQUFjOzs7O0lBQWQ7UUFDSSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztZQUNsQixJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsRUFBRSxDQUFDO1lBQzdCLElBQUksQ0FBQyxVQUFVLENBQUMsY0FBYyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ3pELElBQUksQ0FBQyxVQUFVLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztZQUNyQyxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLEVBQUUsQ0FBQyxDQUFDO1lBQzlELElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzs7WUFHdkMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsd0JBQXdCLENBQUMsQ0FBQyxDQUFDO1NBQ2pGO0tBQ0o7SUFFRCxpQ0FBaUM7Ozs7O0lBQ2pDLHFEQUFjOzs7O0lBQWQ7UUFDSSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztLQUNwRTtJQUVELDZEQUE2RDs7Ozs7O0lBQzdELDRDQUFLOzs7OztJQUFMLFVBQU0sWUFBNEI7UUFBNUIsNkJBQUEsRUFBQSxtQkFBNEI7UUFDOUIsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUM7UUFFbEIsRUFBRSxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztZQUNmLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxDQUFDO1NBQzFDO0tBQ0o7SUFFRCxrQ0FBa0M7Ozs7O0lBQ2xDLDJDQUFJOzs7O0lBQUo7UUFDSSxJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQyxDQUFDO0tBQ3RCO0lBRUQsNkRBQTZEOzs7OztJQUU3RCw2Q0FBTTs7OztJQUROO1FBRUksSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO0tBQzFCO0lBRUQsd0JBQXdCOzs7Ozs7OztJQUV4QixnREFBUzs7Ozs7OztJQURULFVBQ1UsS0FBb0IsRUFBRSxHQUFXLEVBQUUsT0FBZ0I7UUFFekQsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUNWLEtBQUssTUFBTTtnQkFDUCxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7Z0JBQ3RCLEtBQUssQ0FBQztZQUVWLEtBQUssS0FBSyxDQUFDO1lBQ1gsS0FBSyxLQUFLO2dCQUNOLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztnQkFDdEIsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO2dCQUN2QixLQUFLLENBQUMsZUFBZSxFQUFFLENBQUM7Z0JBQ3hCLEtBQUssQ0FBQztZQUVWLEtBQUssUUFBUSxDQUFDO1lBQ2QsS0FBSyxXQUFXLENBQUM7WUFDakIsS0FBSyxVQUFVLENBQUM7WUFDaEIsS0FBSyxVQUFVO2dCQUNYLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO29CQUNsQixPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQztpQkFDekU7Z0JBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ0osSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUM7aUJBQzlCO1NBQ1I7S0FDSjtJQUVELDhGQUE4Rjs7Ozs7OztJQUM5RixzREFBZTs7Ozs7O0lBQWYsVUFBZ0IsWUFBK0I7UUFBRSxjQUFjO2FBQWQsVUFBYyxFQUFkLHFCQUFjLEVBQWQsSUFBYztZQUFkLDZCQUFjOztRQUMzRCxNQUFNLENBQUMsT0FBTyxZQUFZLEtBQUssVUFBVSxDQUFDLENBQUMsQ0FBQyxZQUFZLGlDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUssSUFBSSxHQUFFLENBQUMsQ0FBQyxZQUFZLENBQUM7S0FDakc7Ozs7Ozs7SUFHTyxpREFBVTs7Ozs7O2NBQUMsS0FBb0IsRUFBRSxHQUFXOztRQUdoRCxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUM7WUFDcEQsTUFBTSxDQUFDO1NBQ1Y7O1FBR0QsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsbUJBQW1CLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQzs7UUFJcEUscUJBQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQzs7UUFHckMsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3JCLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLCtCQUErQixFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUM7U0FDakc7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNKLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLDBCQUEwQixFQUFFLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDbEg7UUFFRCxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsWUFBWSxFQUFFLENBQUM7UUFFcEQsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3ZCLEtBQUssQ0FBQyxlQUFlLEVBQUUsQ0FBQzs7Ozs7Ozs7SUFJcEIsbURBQVk7Ozs7OztjQUFDLEtBQW9CLEVBQUUsR0FBVzs7UUFHbEQsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsSUFBSSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7WUFDcEQsTUFBTSxDQUFDO1NBQ1Y7UUFFRCxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDOztRQUdyRSxxQkFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDOztRQUdyQyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDckIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsK0JBQStCLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQztTQUNqRztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0osSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsNEJBQTRCLEVBQUUsSUFBSSxDQUFDLG1CQUFtQixDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNwSDtRQUVELElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUVwRCxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDdkIsS0FBSyxDQUFDLGVBQWUsRUFBRSxDQUFDOzs7Ozs7OztJQUlwQixnREFBUzs7Ozs7O2NBQUMsS0FBb0IsRUFBRSxHQUFXO1FBRS9DLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFFVixLQUFLLFFBQVE7Z0JBQ1QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLGVBQWUsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDbkUsS0FBSyxDQUFDO1lBRVYsS0FBSyxXQUFXO2dCQUNaLElBQUksQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ3BDLEtBQUssQ0FBQztZQUVWLEtBQUssVUFBVTtnQkFDWCxJQUFJLENBQUMsT0FBTyxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsZUFBZSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUN0RSxLQUFLLENBQUM7WUFFVixLQUFLLFVBQVU7Z0JBQ1gsSUFBSSxDQUFDLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDeEMsS0FBSyxDQUFDO1NBQ2I7UUFFRCxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDdkIsS0FBSyxDQUFDLGVBQWUsRUFBRSxDQUFDOzs7Ozs7O0lBSXBCLDBEQUFtQjs7Ozs7Y0FBQyxHQUFXO1FBQ25DLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFFVixLQUFLLFFBQVE7Z0JBQ1QsTUFBTSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUM7WUFFL0IsS0FBSyxXQUFXO2dCQUNaLE1BQU0sQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDO1lBRWpDLEtBQUssVUFBVTtnQkFDWCxNQUFNLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQztZQUVsQyxLQUFLLFVBQVU7Z0JBQ1gsTUFBTSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUM7U0FDbkM7Ozs7Ozs7SUFJRywwREFBbUI7Ozs7O2NBQUMsTUFBZ0M7UUFDeEQsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsaUJBQWlCLElBQUksTUFBTSxDQUFDLFdBQVcsSUFBSSxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQztZQUMzRixNQUFNLENBQUMsd0NBQXNDLE1BQU0sQ0FBQyxJQUFJLFlBQVMsQ0FBQztTQUNyRTtRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7WUFDcEQsTUFBTSxDQUFDLCtCQUE2QixNQUFNLENBQUMsSUFBSSxZQUFTLENBQUM7U0FDNUQ7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLFdBQVcsSUFBSSxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQztZQUNwRCxNQUFNLENBQUMsNkJBQTJCLE1BQU0sQ0FBQyxJQUFJLFlBQVMsQ0FBQztTQUMxRDs7Ozs7O0lBSUcsbUVBQTRCOzs7OztRQUNoQyxNQUFNLENBQUksSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxnR0FBNkYsQ0FBQzs7Ozs7SUFHekksMkRBQW9COzs7OztRQUV4QixNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDLEdBQUcsQ0FBQyxVQUFBLElBQUk7WUFFaEMscUJBQU0sT0FBTyxHQUFhLEVBQUUsQ0FBQzs7WUFHN0IsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLG1CQUFtQixJQUFJLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7Z0JBQ3JELE9BQU8sQ0FBQyxJQUFJLENBQUMsa0JBQWdCLElBQUksQ0FBQyxVQUFVLGlCQUFZLElBQUksQ0FBQyxhQUFlLENBQUMsQ0FBQzthQUNqRjtZQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztnQkFDMUIsT0FBTyxDQUFDLElBQUksQ0FBQyx1QkFBcUIsSUFBSSxDQUFDLFVBQVUsaUJBQVksSUFBSSxDQUFDLGFBQWUsQ0FBQyxDQUFDO2FBQ3RGO1lBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO2dCQUN4QixPQUFPLENBQUMsSUFBSSxDQUFDLHFCQUFtQixJQUFJLENBQUMsVUFBVSxpQkFBWSxJQUFJLENBQUMsYUFBZSxDQUFDLENBQUM7YUFDcEY7WUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7Z0JBQzFCLE9BQU8sQ0FBQyxJQUFJLENBQUMsdUJBQXFCLElBQUksQ0FBQyxVQUFVLGlCQUFZLElBQUksQ0FBQyxhQUFlLENBQUMsQ0FBQzthQUN0RjtZQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztnQkFDM0IsT0FBTyxDQUFDLElBQUksQ0FBQyx3QkFBc0IsSUFBSSxDQUFDLFVBQVUsaUJBQVksSUFBSSxDQUFDLGFBQWUsQ0FBQyxDQUFDO2FBQ3ZGOztZQUdELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO2dCQUNqQixPQUFPLENBQUMsSUFBSSxDQUFDLGdCQUFjLElBQUksQ0FBQyxpQkFBaUIsMEJBQXFCLElBQUksQ0FBQyxjQUFjLGVBQVksQ0FBQyxDQUFDO2FBQzFHO1lBRUQsTUFBTSxDQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxrQkFBYSxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFHLENBQUM7U0FDbkUsQ0FBQyxDQUFDOzs7Ozs7OztJQUlDLDhEQUF1Qjs7Ozs7O2NBQUMsTUFBZ0MsRUFBRSxTQUEwQjtRQUV4RixNQUFNLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBRWhCLEtBQUssZUFBZSxDQUFDLEdBQUc7Z0JBQ3BCLE1BQU0sQ0FBQyxxQkFBbUIsTUFBTSxDQUFDLElBQUksOERBQTJELENBQUM7WUFFckcsS0FBSyxlQUFlLENBQUMsTUFBTTtnQkFDdkIsTUFBTSxDQUFDLHFCQUFtQixNQUFNLENBQUMsSUFBSSxtRUFBZ0UsQ0FBQztZQUUxRyxLQUFLLGVBQWUsQ0FBQyxLQUFLO2dCQUN0QixNQUFNLENBQUMscUJBQW1CLE1BQU0sQ0FBQyxJQUFJLG1FQUFnRSxDQUFDO1lBRTFHLEtBQUssZUFBZSxDQUFDLElBQUk7Z0JBQ3JCLE1BQU0sQ0FBQyxxQkFBbUIsTUFBTSxDQUFDLElBQUksaUVBQThELENBQUM7U0FDM0c7Ozs7Ozs7O0lBSUcsZ0VBQXlCOzs7Ozs7Y0FBQyxNQUFnQyxFQUFFLFNBQTBCO1FBQzFGLE1BQU0sQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFFaEIsS0FBSyxlQUFlLENBQUMsR0FBRztnQkFDcEIsTUFBTSxDQUFDLHFCQUFtQixNQUFNLENBQUMsSUFBSSxtRUFBZ0UsQ0FBQztZQUUxRyxLQUFLLGVBQWUsQ0FBQyxNQUFNO2dCQUN2QixNQUFNLENBQUMscUJBQW1CLE1BQU0sQ0FBQyxJQUFJLGtFQUErRCxDQUFDO1lBRXpHLEtBQUssZUFBZSxDQUFDLEtBQUs7Z0JBQ3RCLE1BQU0sQ0FBQyxxQkFBbUIsTUFBTSxDQUFDLElBQUksb0VBQWlFLENBQUM7WUFFM0csS0FBSyxlQUFlLENBQUMsSUFBSTtnQkFDckIsTUFBTSxDQUFDLHFCQUFtQixNQUFNLENBQUMsSUFBSSxtRUFBZ0UsQ0FBQztTQUM3Rzs7Ozs7OztJQUlHLDJEQUFvQjs7Ozs7Y0FBQyxNQUFnQztRQUN6RCxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsV0FBVyxJQUFJLE1BQU0sQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLGVBQWUsSUFBSSxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDO1lBQzNGLE1BQU0sQ0FBSSxNQUFNLENBQUMsSUFBSSxtQ0FBOEIsTUFBTSxDQUFDLE1BQU0sRUFBRSxpQkFBWSxNQUFNLENBQUMsU0FBUyxFQUFFLGdCQUFXLE1BQU0sQ0FBQyxhQUFhLEVBQUUsMEJBQXFCLE1BQU0sQ0FBQyxVQUFVLEVBQUUsNkxBQTBMLENBQUM7U0FDdlc7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLFdBQVcsSUFBSSxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQztZQUNwRCxNQUFNLENBQUksTUFBTSxDQUFDLElBQUksbUNBQThCLE1BQU0sQ0FBQyxNQUFNLEVBQUUsaUJBQVksTUFBTSxDQUFDLFNBQVMsRUFBRSxnSEFBNkcsQ0FBQztTQUNqTjtRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7WUFDcEQsTUFBTSxDQUFJLE1BQU0sQ0FBQyxJQUFJLG1DQUE4QixNQUFNLENBQUMsTUFBTSxFQUFFLGlCQUFZLE1BQU0sQ0FBQyxTQUFTLEVBQUUsZ0JBQVcsTUFBTSxDQUFDLGFBQWEsRUFBRSwwQkFBcUIsTUFBTSxDQUFDLFVBQVUsRUFBRSxzSkFBbUosQ0FBQztTQUNoVTs7Ozs7OztJQUlHLDZEQUFzQjs7Ozs7Y0FBQyxNQUFnQztRQUMzRCxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsV0FBVyxJQUFJLE1BQU0sQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLGVBQWUsSUFBSSxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDO1lBQzNGLE1BQU0sQ0FBQyxtQ0FBaUMsSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFJLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBRyxDQUFDO1NBQ2pJO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxXQUFXLElBQUksSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUM7WUFDcEQsTUFBTSxDQUFDLHNCQUFvQixJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQUksSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFHLENBQUM7U0FDcEg7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDO1lBQ3BELE1BQU0sQ0FBQyx3QkFBc0IsSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFJLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBRyxDQUFDO1NBQ3RIOzs7Ozs7O0lBSUcsa0VBQTJCOzs7OztjQUFDLE1BQWdDO1FBQ2hFLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxXQUFXLElBQUksTUFBTSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsZUFBZSxJQUFJLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7WUFDM0YsTUFBTSxDQUFDLG9DQUFrQyxJQUFJLENBQUMscUJBQXFCLEVBQUUsU0FBSSxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUcsQ0FBQztTQUN6SDtRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsV0FBVyxJQUFJLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDO1lBQ3BELE1BQU0sQ0FBQyx1QkFBcUIsSUFBSSxDQUFDLHFCQUFxQixFQUFFLFNBQUksSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFHLENBQUM7U0FDNUc7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDO1lBQ3BELE1BQU0sQ0FBQyx5QkFBdUIsSUFBSSxDQUFDLHFCQUFxQixFQUFFLFNBQUksSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFHLENBQUM7U0FDOUc7Ozs7OztJQUlHLDREQUFxQjs7Ozs7UUFDekIsTUFBTSxDQUFDLG9CQUFrQixJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxPQUFPLDZCQUF3QixJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxNQUFNLGlCQUFZLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFHLENBQUM7Ozs7Ozs7SUFJdkwseURBQWtCOzs7OztjQUFDLE1BQWdDO1FBQ3ZELE1BQU0sQ0FBSSxNQUFNLENBQUMsSUFBSSxzQkFBaUIsTUFBTSxDQUFDLE1BQU0sRUFBRSxpQkFBWSxNQUFNLENBQUMsU0FBUyxFQUFFLGFBQVEsTUFBTSxDQUFDLGFBQWEsRUFBRSwwQkFBcUIsTUFBTSxDQUFDLFVBQVUsRUFBRSxnQkFBYSxDQUFDOzs7Ozs7SUFJbkssb0RBQWE7Ozs7Ozs7UUFHakIscUJBQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxFQUFFLENBQUMsR0FBRyxDQUFDLFVBQUEsTUFBTTs7WUFHcEQscUJBQU0sS0FBSyxHQUFHLEtBQUksQ0FBQyxhQUFhLElBQUksS0FBSSxDQUFDLE1BQU0sQ0FBQzs7WUFHaEQscUJBQU0sTUFBTSxHQUFHLEtBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxVQUFBLE9BQU8sSUFBSSxPQUFBLE9BQU8sQ0FBQyxFQUFFLEtBQUssTUFBTSxDQUFDLEVBQUUsRUFBeEIsQ0FBd0IsQ0FBQyxDQUFDOztZQUdqRixxQkFBTSxjQUFjLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxVQUFBLE9BQU8sSUFBSSxPQUFBLE9BQU8sQ0FBQyxFQUFFLEtBQUssTUFBTSxDQUFDLEVBQUUsRUFBeEIsQ0FBd0IsQ0FBQyxDQUFDOztZQUd2RSxNQUFNLENBQUMsR0FBRyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDaEMsTUFBTSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ3hDLE1BQU0sQ0FBQyxHQUFHLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNoQyxNQUFNLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7WUFFeEMsY0FBYyxDQUFDLEdBQUcsR0FBRyxNQUFNLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ2hELGNBQWMsQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUN4RCxjQUFjLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDdEQsY0FBYyxDQUFDLFVBQVUsR0FBRyxNQUFNLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBRTlELE1BQU0sbUJBQUM7Z0JBQ0gsTUFBTSxRQUFBO2dCQUNOLFVBQVUsRUFBRSxNQUFNLENBQUMsR0FBRztnQkFDdEIsYUFBYSxFQUFFLE1BQU0sQ0FBQyxHQUFHO2dCQUN6QixjQUFjLEVBQUUsTUFBTSxDQUFDLE9BQU87Z0JBQzlCLGlCQUFpQixFQUFFLE1BQU0sQ0FBQyxPQUFPO2dCQUNqQyxjQUFjLEVBQUUsY0FBYyxDQUFDLE1BQU07Z0JBQ3JDLFdBQVcsRUFBRSxjQUFjLENBQUMsR0FBRztnQkFDL0Isa0JBQWtCLEVBQUUsY0FBYyxDQUFDLFVBQVU7Z0JBQzdDLGVBQWUsRUFBRSxjQUFjLENBQUMsT0FBTztnQkFDdkMsV0FBVyxFQUFFLE1BQU0sQ0FBQyxHQUFHLEdBQUcsY0FBYyxDQUFDLE1BQU07Z0JBQy9DLFlBQVksRUFBRSxNQUFNLENBQUMsR0FBRyxHQUFHLGNBQWMsQ0FBQyxNQUFNO2dCQUNoRCxTQUFTLEVBQUUsTUFBTSxDQUFDLEdBQUcsR0FBRyxjQUFjLENBQUMsR0FBRztnQkFDMUMsV0FBVyxFQUFFLE1BQU0sQ0FBQyxHQUFHLEdBQUcsY0FBYyxDQUFDLEdBQUc7Z0JBQzVDLG1CQUFtQixFQUFFLE1BQU0sQ0FBQyxHQUFHLEtBQUssY0FBYyxDQUFDLE1BQU07Z0JBQ3pELGlCQUFpQixFQUFFLE1BQU0sQ0FBQyxHQUFHLEtBQUssY0FBYyxDQUFDLEdBQUc7Z0JBQ3BELE9BQU8sRUFBRSxNQUFNLENBQUMsR0FBRyxLQUFLLGNBQWMsQ0FBQyxNQUFNLElBQUksTUFBTSxDQUFDLEdBQUcsS0FBSyxjQUFjLENBQUMsR0FBRztnQkFDbEYsU0FBUyxFQUFFLGNBQWMsQ0FBQyxVQUFVLEtBQUssTUFBTSxDQUFDLE9BQU8sSUFBSSxjQUFjLENBQUMsT0FBTyxLQUFLLE1BQU0sQ0FBQyxPQUFPO2FBQ2hGLEVBQUM7U0FDNUIsQ0FBQyxDQUFDOztRQUdILHFCQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLGlCQUFpQixFQUFFLENBQUMsR0FBRyxDQUFDLFVBQUEsTUFBTSxJQUFJLE9BQUEsTUFBTSxDQUFDLE1BQU0sRUFBYixDQUFhLENBQUMsQ0FBQzs7UUFHNUUsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsVUFBQSxJQUFJLElBQUksT0FBQSxJQUFJLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxTQUFTLEVBQTlCLENBQThCLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQyxPQUFPLEVBQUUsT0FBTzs7WUFHOUUsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sS0FBSyxLQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztnQkFDakMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ2I7WUFFRCxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxLQUFLLEtBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO2dCQUNqQyxNQUFNLENBQUMsQ0FBQyxDQUFDO2FBQ1o7O1lBR0QsTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ2pGLENBQUMsQ0FBQzs7O2dCQTNkVixTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLHlCQUF5QjtvQkFDbkMsUUFBUSxFQUFFLDBCQUEwQjtpQkFDdkM7Ozs7Z0JBTlEsd0JBQXdCO2dCQURTLGdCQUFnQjtnQkFFakQsMEJBQTBCO2dCQUxmLFVBQVU7Z0JBRnJCLGFBQWE7OztrQ0FnQmpCLEtBQUs7b0NBR0wsS0FBSztrQ0FHTCxLQUFLO2tEQUdMLEtBQUs7MENBR0wsS0FBSzs2Q0FHTCxLQUFLOytDQUdMLEtBQUs7NENBR0wsS0FBSzsyQ0FHTCxLQUFLOzRCQUdMLFdBQVcsU0FBQyxpQkFBaUI7MkJBRzdCLFdBQVcsU0FBQyxVQUFVO3lCQWtIdEIsWUFBWSxTQUFDLE1BQU07NEJBTW5CLFlBQVksU0FBQyxTQUFTLEVBQUUsQ0FBQyxRQUFRLEVBQUUsY0FBYyxFQUFFLGdCQUFnQixDQUFDOzt1Q0F0S3pFOztTQWFhLDRCQUE0QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IExpdmVBbm5vdW5jZXIgfSBmcm9tICdAYW5ndWxhci9jZGsvYTExeSc7XG5pbXBvcnQgeyBET1dOX0FSUk9XLCBFTlRFUiwgRVNDQVBFLCBMRUZUX0FSUk9XLCBSSUdIVF9BUlJPVywgU1BBQ0UsIFVQX0FSUk9XIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2tleWNvZGVzJztcbmltcG9ydCB7IERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgSG9zdEJpbmRpbmcsIEhvc3RMaXN0ZW5lciwgSW5wdXQsIE9uRGVzdHJveSwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBtYXAsIHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzL1N1YmplY3QnO1xuaW1wb3J0IHsgQWN0aW9uRGlyZWN0aW9uLCBEYXNoYm9hcmRDYWNoZSwgRGFzaGJvYXJkU2VydmljZSB9IGZyb20gJy4uL2Rhc2hib2FyZC5zZXJ2aWNlJztcbmltcG9ydCB7IERhc2hib2FyZFdpZGdldENvbXBvbmVudCB9IGZyb20gJy4uL3dpZGdldC9kYXNoYm9hcmQtd2lkZ2V0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBEYXNoYm9hcmRHcmFiSGFuZGxlU2VydmljZSB9IGZyb20gJy4vZ3JhYi1oYW5kbGUuc2VydmljZSc7XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW3V4RGFzaGJvYXJkR3JhYkhhbmRsZV0nLFxuICAgIGV4cG9ydEFzOiAndXgtZGFzaGJvYXJkLWdyYWItaGFuZGxlJ1xufSlcbmV4cG9ydCBjbGFzcyBEYXNoYm9hcmRHcmFiSGFuZGxlRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuXG4gICAgLyoqIFNwZWNpZnkgd2hldGhlciBvciBub3QgdGhpcyBoYW5kbGUgY2FuIGJlIHVzZWQgdG8gcGVyZm9ybSBtb3ZpbmcgKi9cbiAgICBASW5wdXQoKSB1eEdyYWJBbGxvd01vdmU6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgLyoqIFNwZWNpZnkgd2hldGhlciBvciBub3QgdGhpcyBoYW5kbGUgY2FuIGJlIHVzZWQgdG8gcGVyZm9ybSByZXNpemluZyAqL1xuICAgIEBJbnB1dCgpIHV4R3JhYkFsbG93UmVzaXplOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIC8qKiBUaGUgYXJpYSBsYWJlbCBmb3IgdGhlIGdyYWIgaGFuZGxlICovXG4gICAgQElucHV0KCkgdXhHcmFiQXJpYUxhYmVsOiAod2lkZ2V0OiBEYXNoYm9hcmRXaWRnZXRDb21wb25lbnQpID0+IHN0cmluZyB8IHN0cmluZyA9IHRoaXMuZ2V0RGVmYXVsdEFyaWFMYWJlbC5iaW5kKHRoaXMpO1xuXG4gICAgLyoqIEN1c3RvbWl6ZSB0aGUgYW5ub3VuY2VtZW50IHRoYXQgaXMgbWFkZSB3aGVuZXZlciBhbiBpdGVtIGhhcyBzdWNjZXNzZnVsbHkgYmVlbiBtb3ZlZCBvciByZXNpemVkICovXG4gICAgQElucHV0KCkgdXhHcmFiQ2hhbmdlU3VjY2Vzc0Fubm91bmNlbWVudDogKHdpZGdldDogRGFzaGJvYXJkV2lkZ2V0Q29tcG9uZW50LCBkaWZmZXJlbmNlczogRGFzaGJvYXJkTGF5b3V0RGlmZltdKSA9PiBzdHJpbmcgfCBzdHJpbmcgPSB0aGlzLmdldENoYW5nZVN1Y2Nlc3NBbm5vdW5jZW1lbnQuYmluZCh0aGlzKTtcblxuICAgIC8qKiBDdXN0b21pemUgdGhlIGFubm91bmNlbWVudCB0aGF0IGlzIG1hZGUgd2hlbmV2ZXIgYW4gaXRlbSBlbnRlcnMgJ2dyYWInIG1vZGUgKi9cbiAgICBASW5wdXQoKSB1eEdyYWJTdGFydEFubm91bmNlbWVudDogKHdpZGdldDogRGFzaGJvYXJkV2lkZ2V0Q29tcG9uZW50KSA9PiBzdHJpbmcgfCBzdHJpbmcgPSB0aGlzLmdldFN0YXJ0QW5ub3VuY2VtZW50LmJpbmQodGhpcyk7XG5cbiAgICAvKiogQ3VzdG9taXplIHRoZSBhbm5vdW5jZW1lbnQgdGhxdCBpcyBtYWRlIHdoZW5ldmVyIGFuIGl0ZW0gY2Fubm90IGJlIG1vdmVkICovXG4gICAgQElucHV0KCkgdXhHcmFiTW92ZUZhaWxBbm5vdW5jZW1lbnQ6ICh3aWRnZXQ6IERhc2hib2FyZFdpZGdldENvbXBvbmVudCwgZGlyZWN0aW9uOiBBY3Rpb25EaXJlY3Rpb24pID0+IHN0cmluZyB8IHN0cmluZyA9IHRoaXMuZ2V0TW92ZUZhaWxBbm5vdW5jZW1lbnQuYmluZCh0aGlzKTtcblxuICAgIC8qKiBDdXN0b21pemUgdGhlIGFubm91bmNlbWVudCB0aHF0IGlzIG1hZGUgd2hlbmV2ZXIgYW4gaXRlbSBjYW5ub3QgYmUgcmVzaXplZCAqL1xuICAgIEBJbnB1dCgpIHV4R3JhYlJlc2l6ZUZhaWxBbm5vdW5jZW1lbnQ6ICh3aWRnZXQ6IERhc2hib2FyZFdpZGdldENvbXBvbmVudCwgZGlyZWN0aW9uOiBBY3Rpb25EaXJlY3Rpb24pID0+IHN0cmluZyB8IHN0cmluZyA9IHRoaXMuZ2V0UmVzaXplRmFpbEFubm91bmNlbWVudC5iaW5kKHRoaXMpO1xuXG4gICAgLyoqIEN1c3RvbWl6ZSB0aGUgYW5ub3VuY2VtZW50IG1hZGUgd2hlbmV2ZXIgdGhlIG1vdmluZy9yZXNpemluZyBpcyBjb21taXRlZCAqL1xuICAgIEBJbnB1dCgpIHV4R3JhYkNvbmZpcm1Bbm5vdW5jZW1lbnQ6ICh3aWRnZXQ6IERhc2hib2FyZFdpZGdldENvbXBvbmVudCkgPT4gc3RyaW5nIHwgc3RyaW5nID0gdGhpcy5nZXRDb25maXJtQW5ub3VuY2VtZW50LmJpbmQodGhpcyk7XG5cbiAgICAvKiogQ3VzdG9taXplIHRoZSBhbm5vdW5jZW1lbnQgbWFkZSB3aGVuZXZlciB0aGUgbW92aW5nL3Jlc2l6aW5nIGlzIGNhbmNlbGxlZCAqL1xuICAgIEBJbnB1dCgpIHV4R3JhYkNhbmNlbEFubm91bmNlbWVudDogKHdpZGdldDogRGFzaGJvYXJkV2lkZ2V0Q29tcG9uZW50KSA9PiBzdHJpbmcgfCBzdHJpbmcgPSB0aGlzLmdldENhbmNlbGxhdGlvbkFubm91bmNlbWVudC5iaW5kKHRoaXMpO1xuXG4gICAgLyoqIEJpbmRpbmcgZm9yIHRoZSBncmFiIGhhbmRsZSBhcmlhIGxhYmVsICovXG4gICAgQEhvc3RCaW5kaW5nKCdhdHRyLmFyaWEtbGFiZWwnKSBhcmlhTGFiZWw6IHN0cmluZztcblxuICAgIC8qKiBXZSBtdXN0IHByb2dyYW1tYXRpY2FsbHkgY29udHJvbCB0aGUgZm9jdXMgb2YgdGhlIGRyYWcgaGFuZGxlcyAqL1xuICAgIEBIb3N0QmluZGluZygndGFiSW5kZXgnKSB0YWJJbmRleDogbnVtYmVyID0gLTE7XG5cbiAgICAvKiogU3RvcmUgdGhlIGN1cnJlbnQgZHJhZ2dpbmcgc3RhdGUgKi9cbiAgICBpc0dyYWJiaW5nOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICAvKiogU3RvcmUgdGhlIGN1cnJlbnQgbGF5b3V0IHdoZW4gd2UgZW50ZXIgJ2dyYWInIG1vZGUgKi9cbiAgICBwcml2YXRlIF9jYWNoZTogRGFzaGJvYXJkQ2FjaGVbXTtcblxuICAgIC8qKiBTdG9yZSB0aGUgbGF5b3V0IGFmdGVyIHRoZSBtb3N0IHJlY2VudCBzdWNjZXNzZnVsIG1vdmUgb3IgcmVzaXplICovXG4gICAgcHJpdmF0ZSBfbGFzdE1vdmVtZW50OiBEYXNoYm9hcmRDYWNoZVtdO1xuXG4gICAgLyoqIEVtaXQgd2hlbiB0aGUgZGlyZWN0aXZlIGlzIGRlc3Ryb3llZCB0byB1bnN1YnNjcmliZSBmcm9tIGFsbCBvYnNlcnZhYmxlcyAqL1xuICAgIHByaXZhdGUgX29uRGVzdHJveSA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHVibGljIHdpZGdldDogRGFzaGJvYXJkV2lkZ2V0Q29tcG9uZW50LFxuICAgICAgICBwcml2YXRlIF9kYXNoYm9hcmQ6IERhc2hib2FyZFNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgX2hhbmRsZTogRGFzaGJvYXJkR3JhYkhhbmRsZVNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgICAgIHByaXZhdGUgX2Fubm91bmNlcjogTGl2ZUFubm91bmNlcikge1xuXG4gICAgICAgIGlmICghd2lkZ2V0KSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3V4RGFzaGJvYXJkR3JhYkhhbmRsZSBtdXN0IGJlIHVzZWQgd2l0aGluIGEgZGFzaGJvYXJkIHdpZGdldCcpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gc3Vic2NyaWJlIHRvIGNoYW5nZXMgdG8gdGhlIGN1cnJlbnQgZ3JhYiBzdGF0ZVxuICAgICAgICBfZGFzaGJvYXJkLmlzR3JhYmJpbmckLnBpcGUodGFrZVVudGlsKHRoaXMuX29uRGVzdHJveSksIG1hcChfd2lkZ2V0ID0+IF93aWRnZXQgPT09IHdpZGdldCkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKGlzR3JhYmJpbmcgPT4gdGhpcy5pc0dyYWJiaW5nID0gaXNHcmFiYmluZyk7XG4gICAgfVxuXG4gICAgLyoqIFNldCB0aGUgaW5pdGlhbCBhcmlhIGxhYmVsIGFuZCBzdWJzY3JpYmUgdG8gbGF5b3V0IGNoYW5nZXMgKi9cbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcblxuICAgICAgICBpZiAoIXRoaXMud2lkZ2V0Lm5hbWUpIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihgRGFzaGJvYXJkIHdpZGdldCAke3RoaXMud2lkZ2V0LmlkfSBtdXN0IGhhdmUgYSB2YWxpZCAnbmFtZScgdG8gdXNlIHV4RGFzaGJvYXJkR3JhYkhhbmRsZWApO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gc2V0IHRoZSBpbml0aWFsIGFyaWEgbGFiZWxcbiAgICAgICAgdGhpcy5hcmlhTGFiZWwgPSB0aGlzLmdldEFubm91bmNlbWVudCh0aGlzLnV4R3JhYkFyaWFMYWJlbCk7XG5cbiAgICAgICAgLy8gdXBkYXRlIHRoZSBhcmlhIGxhYmVsIHdoZW4gbGF5b3V0IGNoYW5nZXMgb2NjdXJcbiAgICAgICAgdGhpcy5fZGFzaGJvYXJkLmxheW91dCQucGlwZSh0YWtlVW50aWwodGhpcy5fb25EZXN0cm95KSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5hcmlhTGFiZWwgPSB0aGlzLmdldEFubm91bmNlbWVudCh0aGlzLnV4R3JhYkFyaWFMYWJlbCkpO1xuICAgIH1cblxuICAgIC8qKiBVbnN1YnNjcmliZSBmcm9tIGFsbCBvYnNlcnZhYmxlcyAqL1xuICAgIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9vbkRlc3Ryb3kubmV4dCgpO1xuICAgICAgICB0aGlzLl9vbkRlc3Ryb3kuY29tcGxldGUoKTtcbiAgICB9XG5cbiAgICAvKiogQmVnaW4gZHJhZyBtb2RlIGFuZCBjYWNoZSBpbml0aWFsIHN0YXRlICovXG4gICAgZW5hYmxlRHJhZ01vZGUoKTogdm9pZCB7XG4gICAgICAgIGlmICghdGhpcy5pc0dyYWJiaW5nKSB7XG5cbiAgICAgICAgICAgIC8vIGNhY2hlIHRoZSB3aWRnZXRzIHNvIHdlIGNhbiByZXN0b3JlIHdoZW4gZXNjYXBlIGlzIHByZXNzZWRcbiAgICAgICAgICAgIHRoaXMuX2NhY2hlID0gdGhpcy5fbGFzdE1vdmVtZW50ID0gdGhpcy5fZGFzaGJvYXJkLmNhY2hlV2lkZ2V0cygpO1xuXG4gICAgICAgICAgICAvLyBzdG9yZSB0aGUgY3VycmVudCB3aWRnZXQgYmVpbmcgZ3JhYmJlZFxuICAgICAgICAgICAgdGhpcy5fZGFzaGJvYXJkLmlzR3JhYmJpbmckLm5leHQodGhpcy53aWRnZXQpO1xuXG4gICAgICAgICAgICB0aGlzLl9kYXNoYm9hcmQub25TaGlmdFN0YXJ0KHRoaXMud2lkZ2V0KTtcblxuICAgICAgICAgICAgLy8gYW5ub3VuY2UgdGhlIGdyYWIgc3RhcnRcbiAgICAgICAgICAgIHRoaXMuX2Fubm91bmNlci5hbm5vdW5jZSh0aGlzLmdldEFubm91bmNlbWVudCh0aGlzLnV4R3JhYlN0YXJ0QW5ub3VuY2VtZW50KSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiogRmluaXNoIGRyYWcgbW9kZSBhbmQgY29tbWl0IHRoZSBjdXJyZW50IHN0YXRlICovXG4gICAgZGlzYWJsZURyYWdNb2RlKCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5pc0dyYWJiaW5nKSB7XG4gICAgICAgICAgICB0aGlzLl9kYXNoYm9hcmQuaXNHcmFiYmluZyQubmV4dChudWxsKTtcbiAgICAgICAgICAgIHRoaXMuX2xhc3RNb3ZlbWVudCA9IG51bGw7XG4gICAgICAgICAgICB0aGlzLl9kYXNoYm9hcmQub25TaGlmdEVuZCgpO1xuXG4gICAgICAgICAgICAvLyBhbm5vdW5jZSB0aGUgY29uZmlybWF0aW9uXG4gICAgICAgICAgICB0aGlzLl9hbm5vdW5jZXIuYW5ub3VuY2UodGhpcy5nZXRBbm5vdW5jZW1lbnQodGhpcy51eEdyYWJDb25maXJtQW5ub3VuY2VtZW50KSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiogRmluaXNoIHRoZSBkcmFnIG1vZGUgYW5kIHJlc3RvcmUgdGhlIG9yaWdpbmFsIHN0YXRlICovXG4gICAgY2FuY2VsRHJhZ01vZGUoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmlzR3JhYmJpbmcpIHtcbiAgICAgICAgICAgIHRoaXMuX2Rhc2hib2FyZC5vblNoaWZ0RW5kKCk7XG4gICAgICAgICAgICB0aGlzLl9kYXNoYm9hcmQucmVzdG9yZVdpZGdldHMoZmFsc2UsIHRoaXMuX2NhY2hlLCB0cnVlKTtcbiAgICAgICAgICAgIHRoaXMuX2Rhc2hib2FyZC5zZXREYXNoYm9hcmRIZWlnaHQoKTtcbiAgICAgICAgICAgIHRoaXMuX2Rhc2hib2FyZC5sYXlvdXQkLm5leHQodGhpcy5fZGFzaGJvYXJkLmdldExheW91dERhdGEoKSk7XG4gICAgICAgICAgICB0aGlzLl9kYXNoYm9hcmQuaXNHcmFiYmluZyQubmV4dChudWxsKTtcblxuICAgICAgICAgICAgLy8gYW5ub3VuY2UgdGhlIGNhbmNlbGxhdGlvblxuICAgICAgICAgICAgdGhpcy5fYW5ub3VuY2VyLmFubm91bmNlKHRoaXMuZ2V0QW5ub3VuY2VtZW50KHRoaXMudXhHcmFiQ2FuY2VsQW5ub3VuY2VtZW50KSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiogVG9nZ2xlIHRoZSBkcmFnIG1vZGUgc3RhdGUgKi9cbiAgICB0b2dnbGVEcmFnTW9kZSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5pc0dyYWJiaW5nID8gdGhpcy5kaXNhYmxlRHJhZ01vZGUoKSA6IHRoaXMuZW5hYmxlRHJhZ01vZGUoKTtcbiAgICB9XG5cbiAgICAvKiogU2V0IHRoZSB0YWIgaW5kZXggYW5kIG9wdGlvbmFsbHkgZm9jdXMgdGhlIERPTSBlbGVtZW50ICovXG4gICAgZm9jdXMoZm9jdXNFbGVtZW50OiBib29sZWFuID0gdHJ1ZSk6IHZvaWQge1xuICAgICAgICB0aGlzLnRhYkluZGV4ID0gMDtcblxuICAgICAgICBpZiAoZm9jdXNFbGVtZW50KSB7XG4gICAgICAgICAgICB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKiBNYWtlIHRoaXMgaXRlbSBub24tdGFiYmFibGUgKi9cbiAgICBibHVyKCk6IHZvaWQge1xuICAgICAgICB0aGlzLnRhYkluZGV4ID0gLTE7XG4gICAgfVxuXG4gICAgLyoqIFdoZW4gdGhlIGdyYWIgaGFuZGxlIGxvc2VzIGZvY3VzIHRoZW4gZXhpdCAnZ3JhYicgbW9kZSAqL1xuICAgIEBIb3N0TGlzdGVuZXIoJ2JsdXInKVxuICAgIG9uQmx1cigpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5kaXNhYmxlRHJhZ01vZGUoKTtcbiAgICB9XG5cbiAgICAvKiogSGFuZGxlIGtleSBldmVudHMgKi9cbiAgICBASG9zdExpc3RlbmVyKCdrZXlkb3duJywgWyckZXZlbnQnLCAnJGV2ZW50LndoaWNoJywgJyRldmVudC5jdHJsS2V5J10pXG4gICAgb25LZXlkb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50LCBrZXk6IG51bWJlciwgY3RybEtleTogYm9vbGVhbik6IHZvaWQge1xuXG4gICAgICAgIHN3aXRjaCAoa2V5KSB7XG4gICAgICAgICAgICBjYXNlIEVTQ0FQRTpcbiAgICAgICAgICAgICAgICB0aGlzLmNhbmNlbERyYWdNb2RlKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgU1BBQ0U6XG4gICAgICAgICAgICBjYXNlIEVOVEVSOlxuICAgICAgICAgICAgICAgIHRoaXMudG9nZ2xlRHJhZ01vZGUoKTtcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIFVQX0FSUk9XOlxuICAgICAgICAgICAgY2FzZSBSSUdIVF9BUlJPVzpcbiAgICAgICAgICAgIGNhc2UgRE9XTl9BUlJPVzpcbiAgICAgICAgICAgIGNhc2UgTEVGVF9BUlJPVzpcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pc0dyYWJiaW5nKSB7XG4gICAgICAgICAgICAgICAgICAgIGN0cmxLZXkgPyB0aGlzLnJlc2l6ZVdpZGdldChldmVudCwga2V5KSA6IHRoaXMubW92ZVdpZGdldChldmVudCwga2V5KTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1vdmVGb2N1cyhldmVudCwga2V5KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiogR2V0IGFuIGFubm91bmNlbWVudCBmcm9tIHRoZSBpbnB1dHMgLSB0aGV5IG1heSBiZSBhIHN0cmluZyBvciBhIGZ1bmN0aW9uIHNvIGhhbmRsZSBib3RoICovXG4gICAgZ2V0QW5ub3VuY2VtZW50KGFubm91bmNlbWVudDogRnVuY3Rpb24gfCBzdHJpbmcsIC4uLmFyZ3M6IGFueVtdKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHR5cGVvZiBhbm5vdW5jZW1lbnQgPT09ICdmdW5jdGlvbicgPyBhbm5vdW5jZW1lbnQodGhpcy53aWRnZXQsIC4uLmFyZ3MpIDogYW5ub3VuY2VtZW50O1xuICAgIH1cblxuICAgIC8qKiBNb3ZlIHRoZSB3aWRnZXQgaW4gYSBnaXZlbiBkaXJlY3Rpb24gYmFzZWQgb24gYXJyb3cga2V5cyAqL1xuICAgIHByaXZhdGUgbW92ZVdpZGdldChldmVudDogS2V5Ym9hcmRFdmVudCwga2V5OiBudW1iZXIpOiB2b2lkIHtcblxuICAgICAgICAvLyBjaGVjayBpZiBtb3ZpbmcgaXMgYWxsb3dlZFxuICAgICAgICBpZiAoIXRoaXMud2lkZ2V0LmlzRHJhZ2dhYmxlIHx8ICF0aGlzLnV4R3JhYkFsbG93TW92ZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gYXR0ZW1wdCB0byBwZXJmb3JtIHRoZSBtb3ZlXG4gICAgICAgIHRoaXMuX2Rhc2hib2FyZC5vblNoaWZ0KHRoaXMud2lkZ2V0LCB0aGlzLmdldERpcmVjdGlvbkZyb21LZXkoa2V5KSk7XG5cblxuICAgICAgICAvLyBnZXQgdGhlIGFubm91bmNhYmxlIGRpZmZcbiAgICAgICAgY29uc3QgY2hhbmdlcyA9IHRoaXMuZ2V0TGF5b3V0RGlmZigpO1xuXG4gICAgICAgIC8vIGlmIHRoZXJlIHdlcmUgY2hhbmdlcyB0aGVuIGFubm91bmNlIHRoZW1cbiAgICAgICAgaWYgKGNoYW5nZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgdGhpcy5fYW5ub3VuY2VyLmFubm91bmNlKHRoaXMuZ2V0QW5ub3VuY2VtZW50KHRoaXMudXhHcmFiQ2hhbmdlU3VjY2Vzc0Fubm91bmNlbWVudCwgY2hhbmdlcykpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fYW5ub3VuY2VyLmFubm91bmNlKHRoaXMuZ2V0QW5ub3VuY2VtZW50KHRoaXMudXhHcmFiTW92ZUZhaWxBbm5vdW5jZW1lbnQsIHRoaXMuZ2V0RGlyZWN0aW9uRnJvbUtleShrZXkpKSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9sYXN0TW92ZW1lbnQgPSB0aGlzLl9kYXNoYm9hcmQuY2FjaGVXaWRnZXRzKCk7XG5cbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgfVxuXG4gICAgLyoqIFJlc2l6ZSB0aGUgd2lkZ2V0cyBhY2NvcmRpbmdseSBiYXNlZCBvbiB0aGUgYXJyb3cga2V5cyAqL1xuICAgIHByaXZhdGUgcmVzaXplV2lkZ2V0KGV2ZW50OiBLZXlib2FyZEV2ZW50LCBrZXk6IG51bWJlcik6IHZvaWQge1xuXG4gICAgICAgIC8vIGNoZWNrIGlmIHJlc2l6aW5nIGlzIGFsbG93ZWRcbiAgICAgICAgaWYgKCF0aGlzLndpZGdldC5yZXNpemFibGUgfHwgIXRoaXMudXhHcmFiQWxsb3dSZXNpemUpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2Rhc2hib2FyZC5vblJlc2l6ZSh0aGlzLndpZGdldCwgdGhpcy5nZXREaXJlY3Rpb25Gcm9tS2V5KGtleSkpO1xuXG4gICAgICAgIC8vIGdldCB0aGUgYW5ub3VuY2FibGUgZGlmZlxuICAgICAgICBjb25zdCBjaGFuZ2VzID0gdGhpcy5nZXRMYXlvdXREaWZmKCk7XG5cbiAgICAgICAgLy8gaWYgdGhlcmUgd2VyZSBjaGFuZ2VzIHRoZW4gYW5ub3VuY2UgdGhlbVxuICAgICAgICBpZiAoY2hhbmdlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICB0aGlzLl9hbm5vdW5jZXIuYW5ub3VuY2UodGhpcy5nZXRBbm5vdW5jZW1lbnQodGhpcy51eEdyYWJDaGFuZ2VTdWNjZXNzQW5ub3VuY2VtZW50LCBjaGFuZ2VzKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9hbm5vdW5jZXIuYW5ub3VuY2UodGhpcy5nZXRBbm5vdW5jZW1lbnQodGhpcy51eEdyYWJSZXNpemVGYWlsQW5ub3VuY2VtZW50LCB0aGlzLmdldERpcmVjdGlvbkZyb21LZXkoa2V5KSkpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fbGFzdE1vdmVtZW50ID0gdGhpcy5fZGFzaGJvYXJkLmNhY2hlV2lkZ2V0cygpO1xuXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIH1cblxuICAgIC8qKiBTaGlmdCBmb2N1cyBiZXR3ZWVuIHRoZSB2YXJpb3VyIGdyYWIgaGFuZGxlcyAqL1xuICAgIHByaXZhdGUgbW92ZUZvY3VzKGV2ZW50OiBLZXlib2FyZEV2ZW50LCBrZXk6IG51bWJlcik6IHZvaWQge1xuXG4gICAgICAgIHN3aXRjaCAoa2V5KSB7XG5cbiAgICAgICAgICAgIGNhc2UgVVBfQVJST1c6XG4gICAgICAgICAgICAgICAgdGhpcy5faGFuZGxlLnNldFNpYmxpbmdJdGVtRm9jdXModGhpcy53aWRnZXQsIEFjdGlvbkRpcmVjdGlvbi5Ub3ApO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIFJJR0hUX0FSUk9XOlxuICAgICAgICAgICAgICAgIHRoaXMuX2hhbmRsZS5zZXROZXh0SXRlbUZvY3VzKHRoaXMpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIERPV05fQVJST1c6XG4gICAgICAgICAgICAgICAgdGhpcy5faGFuZGxlLnNldFNpYmxpbmdJdGVtRm9jdXModGhpcy53aWRnZXQsIEFjdGlvbkRpcmVjdGlvbi5Cb3R0b20pO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIExFRlRfQVJST1c6XG4gICAgICAgICAgICAgICAgdGhpcy5faGFuZGxlLnNldFByZXZpb3VzSXRlbUZvY3VzKHRoaXMpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgfVxuXG4gICAgLyoqIENvbnZlcnQgYW4gYXJyb3cga2V5IGNvZGUgaW50byBhbiBBY3Rpb25EaXJlY3Rpb24gZW51bSAqL1xuICAgIHByaXZhdGUgZ2V0RGlyZWN0aW9uRnJvbUtleShrZXk6IG51bWJlcik6IEFjdGlvbkRpcmVjdGlvbiB7XG4gICAgICAgIHN3aXRjaCAoa2V5KSB7XG5cbiAgICAgICAgICAgIGNhc2UgVVBfQVJST1c6XG4gICAgICAgICAgICAgICAgcmV0dXJuIEFjdGlvbkRpcmVjdGlvbi5Ub3A7XG5cbiAgICAgICAgICAgIGNhc2UgUklHSFRfQVJST1c6XG4gICAgICAgICAgICAgICAgcmV0dXJuIEFjdGlvbkRpcmVjdGlvbi5SaWdodDtcblxuICAgICAgICAgICAgY2FzZSBET1dOX0FSUk9XOlxuICAgICAgICAgICAgICAgIHJldHVybiBBY3Rpb25EaXJlY3Rpb24uQm90dG9tO1xuXG4gICAgICAgICAgICBjYXNlIExFRlRfQVJST1c6XG4gICAgICAgICAgICAgICAgcmV0dXJuIEFjdGlvbkRpcmVjdGlvbi5MZWZ0O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIFN1cHBseSB0aGUgZGVmYXVsdCBncmFiIGhhbmRsZSBhcmlhIGxhYmVsIGJhc2VkIG9uIHRoZSBwcm92aWRlZCBjb25zdHJhaW50cyAqL1xuICAgIHByaXZhdGUgZ2V0RGVmYXVsdEFyaWFMYWJlbCh3aWRnZXQ6IERhc2hib2FyZFdpZGdldENvbXBvbmVudCk6IHN0cmluZyB7XG4gICAgICAgIGlmICh3aWRnZXQucmVzaXphYmxlICYmIHRoaXMudXhHcmFiQWxsb3dSZXNpemUgJiYgd2lkZ2V0LmlzRHJhZ2dhYmxlICYmIHRoaXMudXhHcmFiQWxsb3dNb3ZlKSB7XG4gICAgICAgICAgICByZXR1cm4gYFByZXNzIHNwYWNlIHRvIG1vdmUgYW5kIHJlc2l6ZSB0aGUgJHt3aWRnZXQubmFtZX0gcGFuZWwuYDtcbiAgICAgICAgfSBlbHNlIGlmICh3aWRnZXQucmVzaXphYmxlICYmIHRoaXMudXhHcmFiQWxsb3dSZXNpemUpIHtcbiAgICAgICAgICAgIHJldHVybiBgUHJlc3Mgc3BhY2UgdG8gcmVzaXplIHRoZSAke3dpZGdldC5uYW1lfSBwYW5lbC5gO1xuICAgICAgICB9IGVsc2UgaWYgKHdpZGdldC5pc0RyYWdnYWJsZSAmJiB0aGlzLnV4R3JhYkFsbG93TW92ZSkge1xuICAgICAgICAgICAgcmV0dXJuIGBQcmVzcyBzcGFjZSB0byBtb3ZlIHRoZSAke3dpZGdldC5uYW1lfSBwYW5lbC5gO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIEdldCB0aGUgZGVmYXVsdCBhbm5vdW5jZW1lbnQgd2hlbmV2ZXIgYSBtb3ZlbWVudCBvciByZXNpemUgd2FzIHN1Y2Nlc3NmdWwgKi9cbiAgICBwcml2YXRlIGdldENoYW5nZVN1Y2Nlc3NBbm5vdW5jZW1lbnQoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIGAke3RoaXMuZ2V0RGlmZkFubm91bmNlbWVudHMoKS5qb2luKCcgJyl9IFVzZSB0aGUgY3Vyc29yIGtleXMgdG8gY29udGludWUgbW92aW5nIGFuZCByZXNpemluZywgZW50ZXIgdG8gY29tbWl0LCBvciBlc2NhcGUgdG8gY2FuY2VsLmA7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXREaWZmQW5ub3VuY2VtZW50cygpOiBzdHJpbmdbXSB7XG4gICAgICAgIC8vIG1hcCB0aGUgZGlmZmVyZW5jZXMgdG8gc3RyaW5nc1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRMYXlvdXREaWZmKCkubWFwKGRpZmYgPT4ge1xuXG4gICAgICAgICAgICBjb25zdCBjaGFuZ2VzOiBzdHJpbmdbXSA9IFtdO1xuXG4gICAgICAgICAgICAvLyBIYW5kbGUgbW92ZW1lbnQgc3RyaW5nc1xuICAgICAgICAgICAgaWYgKGRpZmYuaXNNb3ZlZEhvcml6b250YWxseSAmJiBkaWZmLmlzTW92ZWRWZXJ0aWNhbGx5KSB7XG4gICAgICAgICAgICAgICAgY2hhbmdlcy5wdXNoKGBtb3ZlZCB0byByb3cgJHtkaWZmLmN1cnJlbnRSb3d9LCBjb2x1bW4gJHtkaWZmLmN1cnJlbnRDb2x1bW59YCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGRpZmYuaXNNb3ZlZERvd24pIHtcbiAgICAgICAgICAgICAgICBjaGFuZ2VzLnB1c2goYG1vdmVkIGRvd24gdG8gcm93ICR7ZGlmZi5jdXJyZW50Um93fSwgY29sdW1uICR7ZGlmZi5jdXJyZW50Q29sdW1ufWApO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChkaWZmLmlzTW92ZWRVcCkge1xuICAgICAgICAgICAgICAgIGNoYW5nZXMucHVzaChgbW92ZWQgdXAgdG8gcm93ICR7ZGlmZi5jdXJyZW50Um93fSwgY29sdW1uICR7ZGlmZi5jdXJyZW50Q29sdW1ufWApO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChkaWZmLmlzTW92ZWRMZWZ0KSB7XG4gICAgICAgICAgICAgICAgY2hhbmdlcy5wdXNoKGBtb3ZlZCBsZWZ0IHRvIHJvdyAke2RpZmYuY3VycmVudFJvd30sIGNvbHVtbiAke2RpZmYuY3VycmVudENvbHVtbn1gKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZGlmZi5pc01vdmVkUmlnaHQpIHtcbiAgICAgICAgICAgICAgICBjaGFuZ2VzLnB1c2goYG1vdmVkIHJpZ2h0IHRvIHJvdyAke2RpZmYuY3VycmVudFJvd30sIGNvbHVtbiAke2RpZmYuY3VycmVudENvbHVtbn1gKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gaGFuZGxlIHJlc2l6ZSBzdHJpbmdzXG4gICAgICAgICAgICBpZiAoZGlmZi5pc1Jlc2l6ZWQpIHtcbiAgICAgICAgICAgICAgICBjaGFuZ2VzLnB1c2goYHJlc2l6ZWQgdG8gJHtkaWZmLmN1cnJlbnRDb2x1bW5TcGFufSBjb2x1bW5zIHdpZGUgYW5kICR7ZGlmZi5jdXJyZW50Um93U3Bhbn0gcm93cyBoaWdoYCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBgJHtkaWZmLndpZGdldC5uYW1lfSBwYW5lbCBpcyAke2NoYW5nZXMuam9pbignIGFuZCAnKX0uYDtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqIEdldCB0aGUgZGVmYXVsdCBhbm5vdW5jZW1lbnQgd2hlbmV2ZXIgYSBtb3ZlbWVudCBpcyBub3QgcG9zc2libGUgZHVlIHRvIGRhc2hib2FyZCBib3VuZGFyaWVzICovXG4gICAgcHJpdmF0ZSBnZXRNb3ZlRmFpbEFubm91bmNlbWVudCh3aWRnZXQ6IERhc2hib2FyZFdpZGdldENvbXBvbmVudCwgZGlyZWN0aW9uOiBBY3Rpb25EaXJlY3Rpb24pOiBzdHJpbmcge1xuXG4gICAgICAgIHN3aXRjaCAoZGlyZWN0aW9uKSB7XG5cbiAgICAgICAgICAgIGNhc2UgQWN0aW9uRGlyZWN0aW9uLlRvcDpcbiAgICAgICAgICAgICAgICByZXR1cm4gYENhbm5vdCBtb3ZlIHRoZSAke3dpZGdldC5uYW1lfSBwYW5lbCB1cCwgYmVjYXVzZSBpdCBpcyBhdCB0aGUgdG9wIGVkZ2Ugb2YgdGhlIGRhc2hib2FyZGA7XG5cbiAgICAgICAgICAgIGNhc2UgQWN0aW9uRGlyZWN0aW9uLkJvdHRvbTpcbiAgICAgICAgICAgICAgICByZXR1cm4gYENhbm5vdCBtb3ZlIHRoZSAke3dpZGdldC5uYW1lfSBwYW5lbCBkb3duLCBiZWNhdXNlIGl0IGlzIGF0IHRoZSBib3R0b20gZWRnZSBvZiB0aGUgZGFzaGJvYXJkYDtcblxuICAgICAgICAgICAgY2FzZSBBY3Rpb25EaXJlY3Rpb24uUmlnaHQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuIGBDYW5ub3QgbW92ZSB0aGUgJHt3aWRnZXQubmFtZX0gcGFuZWwgcmlnaHQsIGJlY2F1c2UgaXQgaXMgYXQgdGhlIHJpZ2h0IGVkZ2Ugb2YgdGhlIGRhc2hib2FyZGA7XG5cbiAgICAgICAgICAgIGNhc2UgQWN0aW9uRGlyZWN0aW9uLkxlZnQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuIGBDYW5ub3QgbW92ZSB0aGUgJHt3aWRnZXQubmFtZX0gcGFuZWwgbGVmdCwgYmVjYXVzZSBpdCBpcyBhdCB0aGUgbGVmdCBlZGdlIG9mIHRoZSBkYXNoYm9hcmRgO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIEdldCB0aGUgZGVmYXVsdCBhbm5vdW5jZW1lbnQgd2hlbmV2ZXIgYSByZXNpemUgaXMgbm90IHBvc3NpYmxlIGR1ZSB0byBlaXRoZXIgd2lkZ2V0IGNvbnN0cmFpbnRzIG9mIGRhc2hib2FyZCBib3VuZHMgKi9cbiAgICBwcml2YXRlIGdldFJlc2l6ZUZhaWxBbm5vdW5jZW1lbnQod2lkZ2V0OiBEYXNoYm9hcmRXaWRnZXRDb21wb25lbnQsIGRpcmVjdGlvbjogQWN0aW9uRGlyZWN0aW9uKTogc3RyaW5nIHtcbiAgICAgICAgc3dpdGNoIChkaXJlY3Rpb24pIHtcblxuICAgICAgICAgICAgY2FzZSBBY3Rpb25EaXJlY3Rpb24uVG9wOlxuICAgICAgICAgICAgICAgIHJldHVybiBgQ2Fubm90IG1ha2UgdGhlICR7d2lkZ2V0Lm5hbWV9IHBhbmVsIHNob3J0ZXIsIGJlY2F1c2UgaXQgaXMgY3VycmVudGx5IGF0IGl0cyBtaW5pbXVtIGhlaWdodC5gO1xuXG4gICAgICAgICAgICBjYXNlIEFjdGlvbkRpcmVjdGlvbi5Cb3R0b206XG4gICAgICAgICAgICAgICAgcmV0dXJuIGBDYW5ub3QgbWFrZSB0aGUgJHt3aWRnZXQubmFtZX0gcGFuZWwgdGFsbGVyLCBiZWNhdXNlIGl0IGlzIGN1cnJlbnRseSBhdCBpdHMgbWF4aW11bSBoZWlnaHQuYDtcblxuICAgICAgICAgICAgY2FzZSBBY3Rpb25EaXJlY3Rpb24uUmlnaHQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuIGBDYW5ub3QgbWFrZSB0aGUgJHt3aWRnZXQubmFtZX0gcGFuZWwgd2lkZXIsIGJlY2F1c2UgaXQgaXMgYXQgdGhlIHJpZ2h0IGVkZ2Ugb2YgdGhlIGRhc2hib2FyZC5gO1xuXG4gICAgICAgICAgICBjYXNlIEFjdGlvbkRpcmVjdGlvbi5MZWZ0OlxuICAgICAgICAgICAgICAgIHJldHVybiBgQ2Fubm90IG1ha2UgdGhlICR7d2lkZ2V0Lm5hbWV9IHBhbmVsIG5hcnJvd2VyLCBiZWNhdXNlIGl0IGlzIGN1cnJlbnRseSBhdCBpdHMgbWluaW11bSB3aWR0aC5gO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIEdldCB0aGUgZGVmYXVsdCBhbm5vdW5jZW1lbnQgd2hlbmV2ZXIgd2UgZW50ZXIgJ2dyYWInIG1vZGUgKi9cbiAgICBwcml2YXRlIGdldFN0YXJ0QW5ub3VuY2VtZW50KHdpZGdldDogRGFzaGJvYXJkV2lkZ2V0Q29tcG9uZW50KTogc3RyaW5nIHtcbiAgICAgICAgaWYgKHdpZGdldC5pc0RyYWdnYWJsZSAmJiB3aWRnZXQucmVzaXphYmxlICYmIHRoaXMudXhHcmFiQWxsb3dNb3ZlICYmIHRoaXMudXhHcmFiQWxsb3dSZXNpemUpIHtcbiAgICAgICAgICAgIHJldHVybiBgJHt3aWRnZXQubmFtZX0gcGFuZWwgaXMgY3VycmVudGx5IG9uIHJvdyAke3dpZGdldC5nZXRSb3coKX0sIGNvbHVtbiAke3dpZGdldC5nZXRDb2x1bW4oKX0gYW5kIGlzICR7d2lkZ2V0LmdldENvbHVtblNwYW4oKX0gY29sdW1ucyB3aWRlIGFuZCAke3dpZGdldC5nZXRSb3dTcGFuKCl9IHJvd3MgaGlnaC4gVXNlIHRoZSBjdXJzb3Iga2V5cyB0byBtb3ZlIHRoZSB3aWRnZXQgYW5kIHRoZSBjdXJzb3Iga2V5cyB3aXRoIHRoZSBjb250cm9sIG1vZGlmaWVyIHRvIHJlc2l6ZSB0aGUgd2lkZ2V0LiBQcmVzcyBlbnRlciB0byBjb21taXQgY2hhbmdlcyBhbmQgcHJlc3MgZXNjYXBlIHRvIGNhbmNlbCBjaGFuZ2VzLmA7XG4gICAgICAgIH0gZWxzZSBpZiAod2lkZ2V0LmlzRHJhZ2dhYmxlICYmIHRoaXMudXhHcmFiQWxsb3dNb3ZlKSB7XG4gICAgICAgICAgICByZXR1cm4gYCR7d2lkZ2V0Lm5hbWV9IHBhbmVsIGlzIGN1cnJlbnRseSBvbiByb3cgJHt3aWRnZXQuZ2V0Um93KCl9LCBjb2x1bW4gJHt3aWRnZXQuZ2V0Q29sdW1uKCl9LiBVc2UgdGhlIGN1cnNvciBrZXlzIHRvIG1vdmUgdGhlIHdpZGdldC4gUHJlc3MgZW50ZXIgdG8gY29tbWl0IGNoYW5nZXMgYW5kIHByZXNzIGVzY2FwZSB0byBjYW5jZWwgY2hhbmdlcy5gO1xuICAgICAgICB9IGVsc2UgaWYgKHdpZGdldC5yZXNpemFibGUgJiYgdGhpcy51eEdyYWJBbGxvd1Jlc2l6ZSkge1xuICAgICAgICAgICAgcmV0dXJuIGAke3dpZGdldC5uYW1lfSBwYW5lbCBpcyBjdXJyZW50bHkgb24gcm93ICR7d2lkZ2V0LmdldFJvdygpfSwgY29sdW1uICR7d2lkZ2V0LmdldENvbHVtbigpfSBhbmQgaXMgJHt3aWRnZXQuZ2V0Q29sdW1uU3BhbigpfSBjb2x1bW5zIHdpZGUgYW5kICR7d2lkZ2V0LmdldFJvd1NwYW4oKX0gcm93cyBoaWdoLiBVc2UgdGhlIGN1cnNvciBrZXlzIHdpdGggdGhlIGNvbnRyb2wgbW9kaWZpZXIgdG8gcmVzaXplIHRoZSB3aWRnZXQuIFByZXNzIGVudGVyIHRvIGNvbW1pdCBjaGFuZ2VzIGFuZCBwcmVzcyBlc2NhcGUgdG8gY2FuY2VsIGNoYW5nZXMuYDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKiBHZXQgdGhlIGRlZmF1bHQgYW5ub3VuY2VtZW50IHdoZW5ldmVyIGdyYWIgbW9kZSBpcyBleGl0ZWQgYWZ0ZXIgYSBtb3ZlbWVudCBvciByZXNpemUgKi9cbiAgICBwcml2YXRlIGdldENvbmZpcm1Bbm5vdW5jZW1lbnQod2lkZ2V0OiBEYXNoYm9hcmRXaWRnZXRDb21wb25lbnQpOiBzdHJpbmcge1xuICAgICAgICBpZiAod2lkZ2V0LmlzRHJhZ2dhYmxlICYmIHdpZGdldC5yZXNpemFibGUgJiYgdGhpcy51eEdyYWJBbGxvd01vdmUgJiYgdGhpcy51eEdyYWJBbGxvd1Jlc2l6ZSkge1xuICAgICAgICAgICAgcmV0dXJuIGBNb3ZpbmcgYW5kIHJlc2l6aW5nIGNvbXBsZXRlLiAke3RoaXMuZ2V0RGlmZkFubm91bmNlbWVudHMoKS5qb2luKCcgJyl9ICR7dGhpcy5nZXRBbm5vdW5jZW1lbnQodGhpcy51eEdyYWJBcmlhTGFiZWwpfWA7XG4gICAgICAgIH0gZWxzZSBpZiAod2lkZ2V0LmlzRHJhZ2dhYmxlICYmIHRoaXMudXhHcmFiQWxsb3dNb3ZlKSB7XG4gICAgICAgICAgICByZXR1cm4gYE1vdmluZyBjb21wbGV0ZS4gJHt0aGlzLmdldERpZmZBbm5vdW5jZW1lbnRzKCkuam9pbignICcpfSAke3RoaXMuZ2V0QW5ub3VuY2VtZW50KHRoaXMudXhHcmFiQXJpYUxhYmVsKX1gO1xuICAgICAgICB9IGVsc2UgaWYgKHdpZGdldC5yZXNpemFibGUgJiYgdGhpcy51eEdyYWJBbGxvd1Jlc2l6ZSkge1xuICAgICAgICAgICAgcmV0dXJuIGBSZXNpemluZyBjb21wbGV0ZS4gJHt0aGlzLmdldERpZmZBbm5vdW5jZW1lbnRzKCkuam9pbignICcpfSAke3RoaXMuZ2V0QW5ub3VuY2VtZW50KHRoaXMudXhHcmFiQXJpYUxhYmVsKX1gO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIEdldCB0aGUgZGVmYXVsdCBhbm5vdW5jZW1lbnQgd2hlbmV2ZXIgZ3JhYiBtb2RlIGlzIGV4aXRlZCBhZnRlciBiZWluZyBjYW5jZWxsZWQgKi9cbiAgICBwcml2YXRlIGdldENhbmNlbGxhdGlvbkFubm91bmNlbWVudCh3aWRnZXQ6IERhc2hib2FyZFdpZGdldENvbXBvbmVudCk6IHN0cmluZyB7XG4gICAgICAgIGlmICh3aWRnZXQuaXNEcmFnZ2FibGUgJiYgd2lkZ2V0LnJlc2l6YWJsZSAmJiB0aGlzLnV4R3JhYkFsbG93TW92ZSAmJiB0aGlzLnV4R3JhYkFsbG93UmVzaXplKSB7XG4gICAgICAgICAgICByZXR1cm4gYE1vdmluZyBhbmQgcmVzaXppbmcgY2FuY2VsbGVkLiAke3RoaXMuZ2V0RGFzaGJvYXJkQXJpYUxhYmVsKCl9ICR7dGhpcy5nZXRBbm5vdW5jZW1lbnQodGhpcy51eEdyYWJBcmlhTGFiZWwpfWA7XG4gICAgICAgIH0gZWxzZSBpZiAod2lkZ2V0LmlzRHJhZ2dhYmxlICYmIHRoaXMudXhHcmFiQWxsb3dNb3ZlKSB7XG4gICAgICAgICAgICByZXR1cm4gYE1vdmluZyBjYW5jZWxsZWQuICR7dGhpcy5nZXREYXNoYm9hcmRBcmlhTGFiZWwoKX0gJHt0aGlzLmdldEFubm91bmNlbWVudCh0aGlzLnV4R3JhYkFyaWFMYWJlbCl9YDtcbiAgICAgICAgfSBlbHNlIGlmICh3aWRnZXQucmVzaXphYmxlICYmIHRoaXMudXhHcmFiQWxsb3dSZXNpemUpIHtcbiAgICAgICAgICAgIHJldHVybiBgUmVzaXppbmcgY2FuY2VsbGVkLiAke3RoaXMuZ2V0RGFzaGJvYXJkQXJpYUxhYmVsKCl9ICR7dGhpcy5nZXRBbm5vdW5jZW1lbnQodGhpcy51eEdyYWJBcmlhTGFiZWwpfWA7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiogR2V0IGEgZGVzY3JpcHRpb24gb2YgYWxsIGRhc2hib2FyZCB3aWRnZXRzLCB0aGVpciBwb3NpdGlvbnMgYW5kIHNpemVzICovXG4gICAgcHJpdmF0ZSBnZXREYXNoYm9hcmRBcmlhTGFiZWwoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIGBEYXNoYm9hcmQgd2l0aCAke3RoaXMuX2Rhc2hib2FyZC5vcHRpb25zLmNvbHVtbnN9IGNvbHVtbnMsIGNvbnRhaW5pbmcgJHt0aGlzLl9kYXNoYm9hcmQud2lkZ2V0cy5sZW5ndGh9IHBhbmVscy4gJHt0aGlzLl9kYXNoYm9hcmQud2lkZ2V0cy5tYXAodGhpcy5nZXRXaWRnZXRBcmlhTGFiZWwpLmpvaW4oJyAnKX1gO1xuICAgIH1cblxuICAgIC8qKiBHZXQgYSBkZXNjcmlwdGlvbiBvZiBhIGdpdmVuIHdpZGdldCAqL1xuICAgIHByaXZhdGUgZ2V0V2lkZ2V0QXJpYUxhYmVsKHdpZGdldDogRGFzaGJvYXJkV2lkZ2V0Q29tcG9uZW50KTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIGAke3dpZGdldC5uYW1lfSBwYW5lbCBpbiByb3cgJHt3aWRnZXQuZ2V0Um93KCl9LCBjb2x1bW4gJHt3aWRnZXQuZ2V0Q29sdW1uKCl9LCBpcyAke3dpZGdldC5nZXRDb2x1bW5TcGFuKCl9IGNvbHVtbnMgd2lkZSBhbmQgJHt3aWRnZXQuZ2V0Um93U3BhbigpfSByb3dzIGhpZ2guYDtcbiAgICB9XG5cbiAgICAvKiogR2V0IGFuIG9iamVjdCBkZXNjcmliaW5nIGFsbCB0aGUgY2hhbmdlcyB0aGF0IGhhdmUgYmVlbiBtYWRlIHRvIGFsbCB3aWRnZXRzIHNpbmNlIHRoZSBsYXN0IGNoYW5nZSAqL1xuICAgIHByaXZhdGUgZ2V0TGF5b3V0RGlmZigpOiBEYXNoYm9hcmRMYXlvdXREaWZmW10ge1xuXG4gICAgICAgIC8vIGZpbmQgYWxsIGNoYW5nZXNcbiAgICAgICAgY29uc3QgZGlmZnMgPSB0aGlzLl9kYXNoYm9hcmQuZ2V0TGF5b3V0RGF0YSgpLm1hcChsYXlvdXQgPT4ge1xuXG4gICAgICAgICAgICAvLyBnZXQgdGhlIG1vc3QgcmVjZW50IGNhY2hlXG4gICAgICAgICAgICBjb25zdCBjYWNoZSA9IHRoaXMuX2xhc3RNb3ZlbWVudCB8fCB0aGlzLl9jYWNoZTtcblxuICAgICAgICAgICAgLy8gZ2V0IHRoZSBhY3R1YWwgd2lkZ2V0XG4gICAgICAgICAgICBjb25zdCB3aWRnZXQgPSB0aGlzLl9kYXNoYm9hcmQud2lkZ2V0cy5maW5kKF93aWRnZXQgPT4gX3dpZGdldC5pZCA9PT0gbGF5b3V0LmlkKTtcblxuICAgICAgICAgICAgLy8gZ2V0IHByZXZpb3VzIHBvc2l0aW9uXG4gICAgICAgICAgICBjb25zdCBwcmV2aW91c0xheW91dCA9IGNhY2hlLmZpbmQoX3dpZGdldCA9PiBfd2lkZ2V0LmlkID09PSBsYXlvdXQuaWQpO1xuXG4gICAgICAgICAgICAvLyBlbnN1cmUgdGhleSBhcmUgYWxsIG51bWJlcnNcbiAgICAgICAgICAgIGxheW91dC5yb3cgPSBOdW1iZXIobGF5b3V0LnJvdyk7XG4gICAgICAgICAgICBsYXlvdXQucm93U3BhbiA9IE51bWJlcihsYXlvdXQucm93U3Bhbik7XG4gICAgICAgICAgICBsYXlvdXQuY29sID0gTnVtYmVyKGxheW91dC5jb2wpO1xuICAgICAgICAgICAgbGF5b3V0LmNvbFNwYW4gPSBOdW1iZXIobGF5b3V0LmNvbFNwYW4pO1xuXG4gICAgICAgICAgICBwcmV2aW91c0xheW91dC5yb3cgPSBOdW1iZXIocHJldmlvdXNMYXlvdXQucm93KTtcbiAgICAgICAgICAgIHByZXZpb3VzTGF5b3V0LnJvd1NwYW4gPSBOdW1iZXIocHJldmlvdXNMYXlvdXQucm93U3Bhbik7XG4gICAgICAgICAgICBwcmV2aW91c0xheW91dC5jb2x1bW4gPSBOdW1iZXIocHJldmlvdXNMYXlvdXQuY29sdW1uKTtcbiAgICAgICAgICAgIHByZXZpb3VzTGF5b3V0LmNvbHVtblNwYW4gPSBOdW1iZXIocHJldmlvdXNMYXlvdXQuY29sdW1uU3Bhbik7XG5cbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgd2lkZ2V0LFxuICAgICAgICAgICAgICAgIGN1cnJlbnRSb3c6IGxheW91dC5yb3csXG4gICAgICAgICAgICAgICAgY3VycmVudENvbHVtbjogbGF5b3V0LmNvbCxcbiAgICAgICAgICAgICAgICBjdXJyZW50Um93U3BhbjogbGF5b3V0LnJvd1NwYW4sXG4gICAgICAgICAgICAgICAgY3VycmVudENvbHVtblNwYW46IGxheW91dC5jb2xTcGFuLFxuICAgICAgICAgICAgICAgIHByZXZpb3VzQ29sdW1uOiBwcmV2aW91c0xheW91dC5jb2x1bW4sXG4gICAgICAgICAgICAgICAgcHJldmlvdXNSb3c6IHByZXZpb3VzTGF5b3V0LnJvdyxcbiAgICAgICAgICAgICAgICBwcmV2aW91c0NvbHVtblNwYW46IHByZXZpb3VzTGF5b3V0LmNvbHVtblNwYW4sXG4gICAgICAgICAgICAgICAgcHJldmlvdXNSb3dTcGFuOiBwcmV2aW91c0xheW91dC5yb3dTcGFuLFxuICAgICAgICAgICAgICAgIGlzTW92ZWRMZWZ0OiBsYXlvdXQuY29sIDwgcHJldmlvdXNMYXlvdXQuY29sdW1uLFxuICAgICAgICAgICAgICAgIGlzTW92ZWRSaWdodDogbGF5b3V0LmNvbCA+IHByZXZpb3VzTGF5b3V0LmNvbHVtbixcbiAgICAgICAgICAgICAgICBpc01vdmVkVXA6IGxheW91dC5yb3cgPCBwcmV2aW91c0xheW91dC5yb3csXG4gICAgICAgICAgICAgICAgaXNNb3ZlZERvd246IGxheW91dC5yb3cgPiBwcmV2aW91c0xheW91dC5yb3csXG4gICAgICAgICAgICAgICAgaXNNb3ZlZEhvcml6b250YWxseTogbGF5b3V0LmNvbCAhPT0gcHJldmlvdXNMYXlvdXQuY29sdW1uLFxuICAgICAgICAgICAgICAgIGlzTW92ZWRWZXJ0aWNhbGx5OiBsYXlvdXQucm93ICE9PSBwcmV2aW91c0xheW91dC5yb3csXG4gICAgICAgICAgICAgICAgaXNNb3ZlZDogbGF5b3V0LmNvbCAhPT0gcHJldmlvdXNMYXlvdXQuY29sdW1uIHx8IGxheW91dC5yb3cgIT09IHByZXZpb3VzTGF5b3V0LnJvdyxcbiAgICAgICAgICAgICAgICBpc1Jlc2l6ZWQ6IHByZXZpb3VzTGF5b3V0LmNvbHVtblNwYW4gIT09IGxheW91dC5jb2xTcGFuIHx8IHByZXZpb3VzTGF5b3V0LnJvd1NwYW4gIT09IGxheW91dC5yb3dTcGFuXG4gICAgICAgICAgICB9IGFzIERhc2hib2FyZExheW91dERpZmY7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIGdldCB0aGUgb3JkZXIgdGhlIHdpZGdldHMgYXBwZWFyIHZpc3VhbGx5XG4gICAgICAgIGNvbnN0IG9yZGVyID0gdGhpcy5faGFuZGxlLmdldEhhbmRsZXNJbk9yZGVyKCkubWFwKGhhbmRsZSA9PiBoYW5kbGUud2lkZ2V0KTtcblxuICAgICAgICAvLyBvbmx5IHJldHVybiBpdGVtcyB0aGF0IGhhdmUgYmVlbiByZXBvc2l0aW9uZWQgb3IgcmVzaXplZFxuICAgICAgICByZXR1cm4gZGlmZnMuZmlsdGVyKGRpZmYgPT4gZGlmZi5pc01vdmVkIHx8IGRpZmYuaXNSZXNpemVkKS5zb3J0KChkaWZmT25lLCBkaWZmVHdvKSA9PiB7XG5cbiAgICAgICAgICAgIC8vIHNvcnQgdGhpcyBzbyB0aGF0IHRoZSBpdGVtIHRoYXQgdGhlIHVzZXIgbW92ZWQgaXMgZmlyc3QgaW4gdGhlIGxpc3QsIGFuZCB0aGUgcmVtYWluZGVyIGFyZSBpbiB0aGVpciBuZXcgb3JkZXIgYXMgc2VlbiBpbiB0aGUgZGFzaGJvYXJkXG4gICAgICAgICAgICBpZiAoZGlmZk9uZS53aWRnZXQgPT09IHRoaXMud2lkZ2V0KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIC0xO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoZGlmZlR3by53aWRnZXQgPT09IHRoaXMud2lkZ2V0KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIDE7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIG90aGVyd2lzZSBzb3J0IGJhc2VkIG9uIHRoZWlyIHZpc3VhbCBvcmRlclxuICAgICAgICAgICAgcmV0dXJuIG9yZGVyLmluZGV4T2YoZGlmZk9uZS53aWRnZXQpIDwgb3JkZXIuaW5kZXhPZihkaWZmVHdvLndpZGdldCkgPyAtMSA6IDE7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuZXhwb3J0IGludGVyZmFjZSBEYXNoYm9hcmRMYXlvdXREaWZmIHtcbiAgICB3aWRnZXQ6IERhc2hib2FyZFdpZGdldENvbXBvbmVudDtcbiAgICBwcmV2aW91c0NvbHVtbjogbnVtYmVyO1xuICAgIGN1cnJlbnRDb2x1bW46IG51bWJlcjtcbiAgICBwcmV2aW91c1JvdzogbnVtYmVyO1xuICAgIGN1cnJlbnRSb3c6IG51bWJlcjtcbiAgICBwcmV2aW91c0NvbHVtblNwYW46IG51bWJlcjtcbiAgICBjdXJyZW50Q29sdW1uU3BhbjogbnVtYmVyO1xuICAgIHByZXZpb3VzUm93U3BhbjogbnVtYmVyO1xuICAgIGN1cnJlbnRSb3dTcGFuOiBudW1iZXI7XG4gICAgaXNNb3ZlZExlZnQ6IGJvb2xlYW47XG4gICAgaXNNb3ZlZFJpZ2h0OiBib29sZWFuO1xuICAgIGlzTW92ZWRVcDogYm9vbGVhbjtcbiAgICBpc01vdmVkRG93bjogYm9vbGVhbjtcbiAgICBpc01vdmVkSG9yaXpvbnRhbGx5OiBib29sZWFuO1xuICAgIGlzTW92ZWRWZXJ0aWNhbGx5OiBib29sZWFuO1xuICAgIGlzUmVzaXplZDogYm9vbGVhbjtcbiAgICBpc01vdmVkOiBib29sZWFuO1xufSJdfQ==