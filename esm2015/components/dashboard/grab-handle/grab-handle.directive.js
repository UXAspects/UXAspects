/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { DOWN_ARROW, ENTER, ESCAPE, LEFT_ARROW, RIGHT_ARROW, SPACE, UP_ARROW } from '@angular/cdk/keycodes';
import { Directive, ElementRef, HostBinding, HostListener, Input } from '@angular/core';
import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { ActionDirection, DashboardService } from '../dashboard.service';
import { DashboardWidgetComponent } from '../widget/dashboard-widget.component';
import { DashboardGrabHandleService } from './grab-handle.service';
export class DashboardGrabHandleDirective {
    /**
     * @param {?} widget
     * @param {?} _dashboard
     * @param {?} _handle
     * @param {?} _elementRef
     * @param {?} _announcer
     */
    constructor(widget, _dashboard, _handle, _elementRef, _announcer) {
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
        _dashboard.isGrabbing$.pipe(takeUntil(this._onDestroy), map(_widget => _widget === widget))
            .subscribe(isGrabbing => this.isGrabbing = isGrabbing);
    }
    /**
     * Set the initial aria label and subscribe to layout changes
     * @return {?}
     */
    ngOnInit() {
        if (!this.widget.name) {
            console.warn(`Dashboard widget ${this.widget.id} must have a valid 'name' to use uxDashboardGrabHandle`);
        }
        // set the initial aria label
        this.ariaLabel = this.getAnnouncement(this.uxGrabAriaLabel);
        // update the aria label when layout changes occur
        this._dashboard.layout$.pipe(takeUntil(this._onDestroy))
            .subscribe(() => this.ariaLabel = this.getAnnouncement(this.uxGrabAriaLabel));
    }
    /**
     * Unsubscribe from all observables
     * @return {?}
     */
    ngOnDestroy() {
        this._onDestroy.next();
        this._onDestroy.complete();
    }
    /**
     * Begin drag mode and cache initial state
     * @return {?}
     */
    enableDragMode() {
        if (!this.isGrabbing) {
            // cache the widgets so we can restore when escape is pressed
            this._cache = this._lastMovement = this._dashboard.cacheWidgets();
            // store the current widget being grabbed
            this._dashboard.isGrabbing$.next(this.widget);
            this._dashboard.onShiftStart(this.widget);
            // announce the grab start
            this._announcer.announce(this.getAnnouncement(this.uxGrabStartAnnouncement));
        }
    }
    /**
     * Finish drag mode and commit the current state
     * @return {?}
     */
    disableDragMode() {
        if (this.isGrabbing) {
            this._dashboard.isGrabbing$.next(null);
            this._lastMovement = null;
            this._dashboard.onShiftEnd();
            // announce the confirmation
            this._announcer.announce(this.getAnnouncement(this.uxGrabConfirmAnnouncement));
        }
    }
    /**
     * Finish the drag mode and restore the original state
     * @return {?}
     */
    cancelDragMode() {
        if (this.isGrabbing) {
            this._dashboard.onShiftEnd();
            this._dashboard.restoreWidgets(false, this._cache, true);
            this._dashboard.setDashboardHeight();
            this._dashboard.layout$.next(this._dashboard.getLayoutData());
            this._dashboard.isGrabbing$.next(null);
            // announce the cancellation
            this._announcer.announce(this.getAnnouncement(this.uxGrabCancelAnnouncement));
        }
    }
    /**
     * Toggle the drag mode state
     * @return {?}
     */
    toggleDragMode() {
        this.isGrabbing ? this.disableDragMode() : this.enableDragMode();
    }
    /**
     * Set the tab index and optionally focus the DOM element
     * @param {?=} focusElement
     * @return {?}
     */
    focus(focusElement = true) {
        this.tabIndex = 0;
        if (focusElement) {
            this._elementRef.nativeElement.focus();
        }
    }
    /**
     * Make this item non-tabbable
     * @return {?}
     */
    blur() {
        this.tabIndex = -1;
    }
    /**
     * When the grab handle loses focus then exit 'grab' mode
     * @return {?}
     */
    onBlur() {
        this.disableDragMode();
    }
    /**
     * Handle key events
     * @param {?} event
     * @param {?} key
     * @param {?} ctrlKey
     * @return {?}
     */
    onKeydown(event, key, ctrlKey) {
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
    }
    /**
     * Get an announcement from the inputs - they may be a string or a function so handle both
     * @param {?} announcement
     * @param {...?} args
     * @return {?}
     */
    getAnnouncement(announcement, ...args) {
        return typeof announcement === 'function' ? announcement(this.widget, ...args) : announcement;
    }
    /**
     * Move the widget in a given direction based on arrow keys
     * @param {?} event
     * @param {?} key
     * @return {?}
     */
    moveWidget(event, key) {
        // check if moving is allowed
        if (!this.widget.isDraggable || !this.uxGrabAllowMove) {
            return;
        }
        // attempt to perform the move
        this._dashboard.onShift(this.widget, this.getDirectionFromKey(key));
        // get the announcable diff
        const /** @type {?} */ changes = this.getLayoutDiff();
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
    }
    /**
     * Resize the widgets accordingly based on the arrow keys
     * @param {?} event
     * @param {?} key
     * @return {?}
     */
    resizeWidget(event, key) {
        // check if resizing is allowed
        if (!this.widget.resizable || !this.uxGrabAllowResize) {
            return;
        }
        this._dashboard.onResize(this.widget, this.getDirectionFromKey(key));
        // get the announcable diff
        const /** @type {?} */ changes = this.getLayoutDiff();
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
    }
    /**
     * Shift focus between the variour grab handles
     * @param {?} event
     * @param {?} key
     * @return {?}
     */
    moveFocus(event, key) {
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
    }
    /**
     * Convert an arrow key code into an ActionDirection enum
     * @param {?} key
     * @return {?}
     */
    getDirectionFromKey(key) {
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
    }
    /**
     * Supply the default grab handle aria label based on the provided constraints
     * @param {?} widget
     * @return {?}
     */
    getDefaultAriaLabel(widget) {
        if (widget.resizable && this.uxGrabAllowResize && widget.isDraggable && this.uxGrabAllowMove) {
            return `Press space to move and resize the ${widget.name} panel.`;
        }
        else if (widget.resizable && this.uxGrabAllowResize) {
            return `Press space to resize the ${widget.name} panel.`;
        }
        else if (widget.isDraggable && this.uxGrabAllowMove) {
            return `Press space to move the ${widget.name} panel.`;
        }
    }
    /**
     * Get the default announcement whenever a movement or resize was successful
     * @return {?}
     */
    getChangeSuccessAnnouncement() {
        return `${this.getDiffAnnouncements().join(' ')} Use the cursor keys to continue moving and resizing, enter to commit, or escape to cancel.`;
    }
    /**
     * @return {?}
     */
    getDiffAnnouncements() {
        // map the differences to strings
        return this.getLayoutDiff().map(diff => {
            const /** @type {?} */ changes = [];
            // Handle movement strings
            if (diff.isMovedHorizontally && diff.isMovedVertically) {
                changes.push(`moved to row ${diff.currentRow}, column ${diff.currentColumn}`);
            }
            else if (diff.isMovedDown) {
                changes.push(`moved down to row ${diff.currentRow}, column ${diff.currentColumn}`);
            }
            else if (diff.isMovedUp) {
                changes.push(`moved up to row ${diff.currentRow}, column ${diff.currentColumn}`);
            }
            else if (diff.isMovedLeft) {
                changes.push(`moved left to row ${diff.currentRow}, column ${diff.currentColumn}`);
            }
            else if (diff.isMovedRight) {
                changes.push(`moved right to row ${diff.currentRow}, column ${diff.currentColumn}`);
            }
            // handle resize strings
            if (diff.isResized) {
                changes.push(`resized to ${diff.currentColumnSpan} columns wide and ${diff.currentRowSpan} rows high`);
            }
            return `${diff.widget.name} panel is ${changes.join(' and ')}.`;
        });
    }
    /**
     * Get the default announcement whenever a movement is not possible due to dashboard boundaries
     * @param {?} widget
     * @param {?} direction
     * @return {?}
     */
    getMoveFailAnnouncement(widget, direction) {
        switch (direction) {
            case ActionDirection.Top:
                return `Cannot move the ${widget.name} panel up, because it is at the top edge of the dashboard`;
            case ActionDirection.Bottom:
                return `Cannot move the ${widget.name} panel down, because it is at the bottom edge of the dashboard`;
            case ActionDirection.Right:
                return `Cannot move the ${widget.name} panel right, because it is at the right edge of the dashboard`;
            case ActionDirection.Left:
                return `Cannot move the ${widget.name} panel left, because it is at the left edge of the dashboard`;
        }
    }
    /**
     * Get the default announcement whenever a resize is not possible due to either widget constraints of dashboard bounds
     * @param {?} widget
     * @param {?} direction
     * @return {?}
     */
    getResizeFailAnnouncement(widget, direction) {
        switch (direction) {
            case ActionDirection.Top:
                return `Cannot make the ${widget.name} panel shorter, because it is currently at its minimum height.`;
            case ActionDirection.Bottom:
                return `Cannot make the ${widget.name} panel taller, because it is currently at its maximum height.`;
            case ActionDirection.Right:
                return `Cannot make the ${widget.name} panel wider, because it is at the right edge of the dashboard.`;
            case ActionDirection.Left:
                return `Cannot make the ${widget.name} panel narrower, because it is currently at its minimum width.`;
        }
    }
    /**
     * Get the default announcement whenever we enter 'grab' mode
     * @param {?} widget
     * @return {?}
     */
    getStartAnnouncement(widget) {
        if (widget.isDraggable && widget.resizable && this.uxGrabAllowMove && this.uxGrabAllowResize) {
            return `${widget.name} panel is currently on row ${widget.getRow()}, column ${widget.getColumn()} and is ${widget.getColumnSpan()} columns wide and ${widget.getRowSpan()} rows high. Use the cursor keys to move the widget and the cursor keys with the control modifier to resize the widget. Press enter to commit changes and press escape to cancel changes.`;
        }
        else if (widget.isDraggable && this.uxGrabAllowMove) {
            return `${widget.name} panel is currently on row ${widget.getRow()}, column ${widget.getColumn()}. Use the cursor keys to move the widget. Press enter to commit changes and press escape to cancel changes.`;
        }
        else if (widget.resizable && this.uxGrabAllowResize) {
            return `${widget.name} panel is currently on row ${widget.getRow()}, column ${widget.getColumn()} and is ${widget.getColumnSpan()} columns wide and ${widget.getRowSpan()} rows high. Use the cursor keys with the control modifier to resize the widget. Press enter to commit changes and press escape to cancel changes.`;
        }
    }
    /**
     * Get the default announcement whenever grab mode is exited after a movement or resize
     * @param {?} widget
     * @return {?}
     */
    getConfirmAnnouncement(widget) {
        if (widget.isDraggable && widget.resizable && this.uxGrabAllowMove && this.uxGrabAllowResize) {
            return `Moving and resizing complete. ${this.getDiffAnnouncements().join(' ')} ${this.getAnnouncement(this.uxGrabAriaLabel)}`;
        }
        else if (widget.isDraggable && this.uxGrabAllowMove) {
            return `Moving complete. ${this.getDiffAnnouncements().join(' ')} ${this.getAnnouncement(this.uxGrabAriaLabel)}`;
        }
        else if (widget.resizable && this.uxGrabAllowResize) {
            return `Resizing complete. ${this.getDiffAnnouncements().join(' ')} ${this.getAnnouncement(this.uxGrabAriaLabel)}`;
        }
    }
    /**
     * Get the default announcement whenever grab mode is exited after being cancelled
     * @param {?} widget
     * @return {?}
     */
    getCancellationAnnouncement(widget) {
        if (widget.isDraggable && widget.resizable && this.uxGrabAllowMove && this.uxGrabAllowResize) {
            return `Moving and resizing cancelled. ${this.getDashboardAriaLabel()} ${this.getAnnouncement(this.uxGrabAriaLabel)}`;
        }
        else if (widget.isDraggable && this.uxGrabAllowMove) {
            return `Moving cancelled. ${this.getDashboardAriaLabel()} ${this.getAnnouncement(this.uxGrabAriaLabel)}`;
        }
        else if (widget.resizable && this.uxGrabAllowResize) {
            return `Resizing cancelled. ${this.getDashboardAriaLabel()} ${this.getAnnouncement(this.uxGrabAriaLabel)}`;
        }
    }
    /**
     * Get a description of all dashboard widgets, their positions and sizes
     * @return {?}
     */
    getDashboardAriaLabel() {
        return `Dashboard with ${this._dashboard.options.columns} columns, containing ${this._dashboard.widgets.length} panels. ${this._dashboard.widgets.map(this.getWidgetAriaLabel).join(' ')}`;
    }
    /**
     * Get a description of a given widget
     * @param {?} widget
     * @return {?}
     */
    getWidgetAriaLabel(widget) {
        return `${widget.name} panel in row ${widget.getRow()}, column ${widget.getColumn()}, is ${widget.getColumnSpan()} columns wide and ${widget.getRowSpan()} rows high.`;
    }
    /**
     * Get an object describing all the changes that have been made to all widgets since the last change
     * @return {?}
     */
    getLayoutDiff() {
        // find all changes
        const /** @type {?} */ diffs = this._dashboard.getLayoutData().map(layout => {
            // get the most recent cache
            const /** @type {?} */ cache = this._lastMovement || this._cache;
            // get the actual widget
            const /** @type {?} */ widget = this._dashboard.widgets.find(_widget => _widget.id === layout.id);
            // get previous position
            const /** @type {?} */ previousLayout = cache.find(_widget => _widget.id === layout.id);
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
                widget,
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
        const /** @type {?} */ order = this._handle.getHandlesInOrder().map(handle => handle.widget);
        // only return items that have been repositioned or resized
        return diffs.filter(diff => diff.isMoved || diff.isResized).sort((diffOne, diffTwo) => {
            // sort this so that the item that the user moved is first in the list, and the remainder are in their new order as seen in the dashboard
            if (diffOne.widget === this.widget) {
                return -1;
            }
            if (diffTwo.widget === this.widget) {
                return 1;
            }
            // otherwise sort based on their visual order
            return order.indexOf(diffOne.widget) < order.indexOf(diffTwo.widget) ? -1 : 1;
        });
    }
}
DashboardGrabHandleDirective.decorators = [
    { type: Directive, args: [{
                selector: '[uxDashboardGrabHandle]',
                exportAs: 'ux-dashboard-grab-handle'
            },] }
];
/** @nocollapse */
DashboardGrabHandleDirective.ctorParameters = () => [
    { type: DashboardWidgetComponent },
    { type: DashboardService },
    { type: DashboardGrabHandleService },
    { type: ElementRef },
    { type: LiveAnnouncer }
];
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JhYi1oYW5kbGUuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvZGFzaGJvYXJkL2dyYWItaGFuZGxlL2dyYWItaGFuZGxlLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUM1RyxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBcUIsTUFBTSxlQUFlLENBQUM7QUFDM0csT0FBTyxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNoRCxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQ3ZDLE9BQU8sRUFBRSxlQUFlLEVBQWtCLGdCQUFnQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDekYsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFDaEYsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFNbkUsTUFBTTs7Ozs7Ozs7SUErQ0YsWUFDVyxRQUNDLFlBQ0EsU0FDQSxhQUNBO1FBSkQsV0FBTSxHQUFOLE1BQU07UUFDTCxlQUFVLEdBQVYsVUFBVTtRQUNWLFlBQU8sR0FBUCxPQUFPO1FBQ1AsZ0JBQVcsR0FBWCxXQUFXO1FBQ1gsZUFBVSxHQUFWLFVBQVU7Ozs7K0JBakRjLElBQUk7Ozs7aUNBR0YsSUFBSTs7OzsrQkFHd0MsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7K0NBR2lCLElBQUksQ0FBQyw0QkFBNEIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDOzs7O3VDQUd4RixJQUFJLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQzs7OzswQ0FHTCxJQUFJLENBQUMsdUJBQXVCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs0Q0FHckMsSUFBSSxDQUFDLHlCQUF5QixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7eUNBR3hFLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDOzs7O3dDQUd2QyxJQUFJLENBQUMsMkJBQTJCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozt3QkFNMUYsQ0FBQyxDQUFDOzs7OzBCQUd4QixLQUFLOzs7OzBCQVNOLElBQUksT0FBTyxFQUFRO1FBU3BDLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNWLE1BQU0sSUFBSSxLQUFLLENBQUMsOERBQThELENBQUMsQ0FBQztTQUNuRjs7UUFHRCxVQUFVLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLE9BQU8sS0FBSyxNQUFNLENBQUMsQ0FBQzthQUN0RixTQUFTLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQyxDQUFDO0tBQzlEOzs7OztJQUdELFFBQVE7UUFFSixFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNwQixPQUFPLENBQUMsSUFBSSxDQUFDLG9CQUFvQixJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsd0RBQXdELENBQUMsQ0FBQztTQUM1Rzs7UUFHRCxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDOztRQUc1RCxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQzthQUNuRCxTQUFTLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDO0tBQ3JGOzs7OztJQUdELFdBQVc7UUFDUCxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFLENBQUM7S0FDOUI7Ozs7O0lBR0QsY0FBYztRQUNWLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7O1lBR25CLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksRUFBRSxDQUFDOztZQUdsRSxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBRTlDLElBQUksQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQzs7WUFHMUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsdUJBQXVCLENBQUMsQ0FBQyxDQUFDO1NBQ2hGO0tBQ0o7Ozs7O0lBR0QsZUFBZTtRQUNYLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1lBQ2xCLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN2QyxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztZQUMxQixJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsRUFBRSxDQUFDOztZQUc3QixJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDLENBQUM7U0FDbEY7S0FDSjs7Ozs7SUFHRCxjQUFjO1FBQ1YsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7WUFDbEIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLEVBQUUsQ0FBQztZQUM3QixJQUFJLENBQUMsVUFBVSxDQUFDLGNBQWMsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztZQUN6RCxJQUFJLENBQUMsVUFBVSxDQUFDLGtCQUFrQixFQUFFLENBQUM7WUFDckMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxFQUFFLENBQUMsQ0FBQztZQUM5RCxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7O1lBR3ZDLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLHdCQUF3QixDQUFDLENBQUMsQ0FBQztTQUNqRjtLQUNKOzs7OztJQUdELGNBQWM7UUFDVixJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztLQUNwRTs7Ozs7O0lBR0QsS0FBSyxDQUFDLGVBQXdCLElBQUk7UUFDOUIsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUM7UUFFbEIsRUFBRSxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztZQUNmLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxDQUFDO1NBQzFDO0tBQ0o7Ozs7O0lBR0QsSUFBSTtRQUNBLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDLENBQUM7S0FDdEI7Ozs7O0lBSUQsTUFBTTtRQUNGLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztLQUMxQjs7Ozs7Ozs7SUFJRCxTQUFTLENBQUMsS0FBb0IsRUFBRSxHQUFXLEVBQUUsT0FBZ0I7UUFFekQsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUNWLEtBQUssTUFBTTtnQkFDUCxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7Z0JBQ3RCLEtBQUssQ0FBQztZQUVWLEtBQUssS0FBSyxDQUFDO1lBQ1gsS0FBSyxLQUFLO2dCQUNOLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztnQkFDdEIsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO2dCQUN2QixLQUFLLENBQUMsZUFBZSxFQUFFLENBQUM7Z0JBQ3hCLEtBQUssQ0FBQztZQUVWLEtBQUssUUFBUSxDQUFDO1lBQ2QsS0FBSyxXQUFXLENBQUM7WUFDakIsS0FBSyxVQUFVLENBQUM7WUFDaEIsS0FBSyxVQUFVO2dCQUNYLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO29CQUNsQixPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQztpQkFDekU7Z0JBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ0osSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUM7aUJBQzlCO1NBQ1I7S0FDSjs7Ozs7OztJQUdELGVBQWUsQ0FBQyxZQUErQixFQUFFLEdBQUcsSUFBVztRQUMzRCxNQUFNLENBQUMsT0FBTyxZQUFZLEtBQUssVUFBVSxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUM7S0FDakc7Ozs7Ozs7SUFHTyxVQUFVLENBQUMsS0FBb0IsRUFBRSxHQUFXOztRQUdoRCxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUM7WUFDcEQsTUFBTSxDQUFDO1NBQ1Y7O1FBR0QsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsbUJBQW1CLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQzs7UUFJcEUsdUJBQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQzs7UUFHckMsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3JCLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLCtCQUErQixFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUM7U0FDakc7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNKLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLDBCQUEwQixFQUFFLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDbEg7UUFFRCxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsWUFBWSxFQUFFLENBQUM7UUFFcEQsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3ZCLEtBQUssQ0FBQyxlQUFlLEVBQUUsQ0FBQzs7Ozs7Ozs7SUFJcEIsWUFBWSxDQUFDLEtBQW9CLEVBQUUsR0FBVzs7UUFHbEQsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsSUFBSSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7WUFDcEQsTUFBTSxDQUFDO1NBQ1Y7UUFFRCxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDOztRQUdyRSx1QkFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDOztRQUdyQyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDckIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsK0JBQStCLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQztTQUNqRztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0osSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsNEJBQTRCLEVBQUUsSUFBSSxDQUFDLG1CQUFtQixDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNwSDtRQUVELElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUVwRCxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDdkIsS0FBSyxDQUFDLGVBQWUsRUFBRSxDQUFDOzs7Ozs7OztJQUlwQixTQUFTLENBQUMsS0FBb0IsRUFBRSxHQUFXO1FBRS9DLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFFVixLQUFLLFFBQVE7Z0JBQ1QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLGVBQWUsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDbkUsS0FBSyxDQUFDO1lBRVYsS0FBSyxXQUFXO2dCQUNaLElBQUksQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ3BDLEtBQUssQ0FBQztZQUVWLEtBQUssVUFBVTtnQkFDWCxJQUFJLENBQUMsT0FBTyxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsZUFBZSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUN0RSxLQUFLLENBQUM7WUFFVixLQUFLLFVBQVU7Z0JBQ1gsSUFBSSxDQUFDLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDeEMsS0FBSyxDQUFDO1NBQ2I7UUFFRCxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDdkIsS0FBSyxDQUFDLGVBQWUsRUFBRSxDQUFDOzs7Ozs7O0lBSXBCLG1CQUFtQixDQUFDLEdBQVc7UUFDbkMsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUVWLEtBQUssUUFBUTtnQkFDVCxNQUFNLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQztZQUUvQixLQUFLLFdBQVc7Z0JBQ1osTUFBTSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUM7WUFFakMsS0FBSyxVQUFVO2dCQUNYLE1BQU0sQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDO1lBRWxDLEtBQUssVUFBVTtnQkFDWCxNQUFNLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQztTQUNuQzs7Ozs7OztJQUlHLG1CQUFtQixDQUFDLE1BQWdDO1FBQ3hELEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLGlCQUFpQixJQUFJLE1BQU0sQ0FBQyxXQUFXLElBQUksSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUM7WUFDM0YsTUFBTSxDQUFDLHNDQUFzQyxNQUFNLENBQUMsSUFBSSxTQUFTLENBQUM7U0FDckU7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDO1lBQ3BELE1BQU0sQ0FBQyw2QkFBNkIsTUFBTSxDQUFDLElBQUksU0FBUyxDQUFDO1NBQzVEO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxXQUFXLElBQUksSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUM7WUFDcEQsTUFBTSxDQUFDLDJCQUEyQixNQUFNLENBQUMsSUFBSSxTQUFTLENBQUM7U0FDMUQ7Ozs7OztJQUlHLDRCQUE0QjtRQUNoQyxNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLDZGQUE2RixDQUFDOzs7OztJQUd6SSxvQkFBb0I7O1FBRXhCLE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFO1lBRW5DLHVCQUFNLE9BQU8sR0FBYSxFQUFFLENBQUM7O1lBRzdCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxtQkFBbUIsSUFBSSxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDO2dCQUNyRCxPQUFPLENBQUMsSUFBSSxDQUFDLGdCQUFnQixJQUFJLENBQUMsVUFBVSxZQUFZLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQyxDQUFDO2FBQ2pGO1lBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO2dCQUMxQixPQUFPLENBQUMsSUFBSSxDQUFDLHFCQUFxQixJQUFJLENBQUMsVUFBVSxZQUFZLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQyxDQUFDO2FBQ3RGO1lBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO2dCQUN4QixPQUFPLENBQUMsSUFBSSxDQUFDLG1CQUFtQixJQUFJLENBQUMsVUFBVSxZQUFZLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQyxDQUFDO2FBQ3BGO1lBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO2dCQUMxQixPQUFPLENBQUMsSUFBSSxDQUFDLHFCQUFxQixJQUFJLENBQUMsVUFBVSxZQUFZLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQyxDQUFDO2FBQ3RGO1lBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO2dCQUMzQixPQUFPLENBQUMsSUFBSSxDQUFDLHNCQUFzQixJQUFJLENBQUMsVUFBVSxZQUFZLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQyxDQUFDO2FBQ3ZGOztZQUdELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO2dCQUNqQixPQUFPLENBQUMsSUFBSSxDQUFDLGNBQWMsSUFBSSxDQUFDLGlCQUFpQixxQkFBcUIsSUFBSSxDQUFDLGNBQWMsWUFBWSxDQUFDLENBQUM7YUFDMUc7WUFFRCxNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksYUFBYSxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUM7U0FDbkUsQ0FBQyxDQUFDOzs7Ozs7OztJQUlDLHVCQUF1QixDQUFDLE1BQWdDLEVBQUUsU0FBMEI7UUFFeEYsTUFBTSxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztZQUVoQixLQUFLLGVBQWUsQ0FBQyxHQUFHO2dCQUNwQixNQUFNLENBQUMsbUJBQW1CLE1BQU0sQ0FBQyxJQUFJLDJEQUEyRCxDQUFDO1lBRXJHLEtBQUssZUFBZSxDQUFDLE1BQU07Z0JBQ3ZCLE1BQU0sQ0FBQyxtQkFBbUIsTUFBTSxDQUFDLElBQUksZ0VBQWdFLENBQUM7WUFFMUcsS0FBSyxlQUFlLENBQUMsS0FBSztnQkFDdEIsTUFBTSxDQUFDLG1CQUFtQixNQUFNLENBQUMsSUFBSSxnRUFBZ0UsQ0FBQztZQUUxRyxLQUFLLGVBQWUsQ0FBQyxJQUFJO2dCQUNyQixNQUFNLENBQUMsbUJBQW1CLE1BQU0sQ0FBQyxJQUFJLDhEQUE4RCxDQUFDO1NBQzNHOzs7Ozs7OztJQUlHLHlCQUF5QixDQUFDLE1BQWdDLEVBQUUsU0FBMEI7UUFDMUYsTUFBTSxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztZQUVoQixLQUFLLGVBQWUsQ0FBQyxHQUFHO2dCQUNwQixNQUFNLENBQUMsbUJBQW1CLE1BQU0sQ0FBQyxJQUFJLGdFQUFnRSxDQUFDO1lBRTFHLEtBQUssZUFBZSxDQUFDLE1BQU07Z0JBQ3ZCLE1BQU0sQ0FBQyxtQkFBbUIsTUFBTSxDQUFDLElBQUksK0RBQStELENBQUM7WUFFekcsS0FBSyxlQUFlLENBQUMsS0FBSztnQkFDdEIsTUFBTSxDQUFDLG1CQUFtQixNQUFNLENBQUMsSUFBSSxpRUFBaUUsQ0FBQztZQUUzRyxLQUFLLGVBQWUsQ0FBQyxJQUFJO2dCQUNyQixNQUFNLENBQUMsbUJBQW1CLE1BQU0sQ0FBQyxJQUFJLGdFQUFnRSxDQUFDO1NBQzdHOzs7Ozs7O0lBSUcsb0JBQW9CLENBQUMsTUFBZ0M7UUFDekQsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLFdBQVcsSUFBSSxNQUFNLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxlQUFlLElBQUksSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQztZQUMzRixNQUFNLENBQUMsR0FBRyxNQUFNLENBQUMsSUFBSSw4QkFBOEIsTUFBTSxDQUFDLE1BQU0sRUFBRSxZQUFZLE1BQU0sQ0FBQyxTQUFTLEVBQUUsV0FBVyxNQUFNLENBQUMsYUFBYSxFQUFFLHFCQUFxQixNQUFNLENBQUMsVUFBVSxFQUFFLDBMQUEwTCxDQUFDO1NBQ3ZXO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxXQUFXLElBQUksSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUM7WUFDcEQsTUFBTSxDQUFDLEdBQUcsTUFBTSxDQUFDLElBQUksOEJBQThCLE1BQU0sQ0FBQyxNQUFNLEVBQUUsWUFBWSxNQUFNLENBQUMsU0FBUyxFQUFFLDZHQUE2RyxDQUFDO1NBQ2pOO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQztZQUNwRCxNQUFNLENBQUMsR0FBRyxNQUFNLENBQUMsSUFBSSw4QkFBOEIsTUFBTSxDQUFDLE1BQU0sRUFBRSxZQUFZLE1BQU0sQ0FBQyxTQUFTLEVBQUUsV0FBVyxNQUFNLENBQUMsYUFBYSxFQUFFLHFCQUFxQixNQUFNLENBQUMsVUFBVSxFQUFFLG1KQUFtSixDQUFDO1NBQ2hVOzs7Ozs7O0lBSUcsc0JBQXNCLENBQUMsTUFBZ0M7UUFDM0QsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLFdBQVcsSUFBSSxNQUFNLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxlQUFlLElBQUksSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQztZQUMzRixNQUFNLENBQUMsaUNBQWlDLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsRUFBRSxDQUFDO1NBQ2pJO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxXQUFXLElBQUksSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUM7WUFDcEQsTUFBTSxDQUFDLG9CQUFvQixJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLEVBQUUsQ0FBQztTQUNwSDtRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7WUFDcEQsTUFBTSxDQUFDLHNCQUFzQixJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLEVBQUUsQ0FBQztTQUN0SDs7Ozs7OztJQUlHLDJCQUEyQixDQUFDLE1BQWdDO1FBQ2hFLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxXQUFXLElBQUksTUFBTSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsZUFBZSxJQUFJLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7WUFDM0YsTUFBTSxDQUFDLGtDQUFrQyxJQUFJLENBQUMscUJBQXFCLEVBQUUsSUFBSSxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsRUFBRSxDQUFDO1NBQ3pIO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxXQUFXLElBQUksSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUM7WUFDcEQsTUFBTSxDQUFDLHFCQUFxQixJQUFJLENBQUMscUJBQXFCLEVBQUUsSUFBSSxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsRUFBRSxDQUFDO1NBQzVHO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQztZQUNwRCxNQUFNLENBQUMsdUJBQXVCLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxJQUFJLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxFQUFFLENBQUM7U0FDOUc7Ozs7OztJQUlHLHFCQUFxQjtRQUN6QixNQUFNLENBQUMsa0JBQWtCLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLE9BQU8sd0JBQXdCLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLE1BQU0sWUFBWSxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUM7Ozs7Ozs7SUFJdkwsa0JBQWtCLENBQUMsTUFBZ0M7UUFDdkQsTUFBTSxDQUFDLEdBQUcsTUFBTSxDQUFDLElBQUksaUJBQWlCLE1BQU0sQ0FBQyxNQUFNLEVBQUUsWUFBWSxNQUFNLENBQUMsU0FBUyxFQUFFLFFBQVEsTUFBTSxDQUFDLGFBQWEsRUFBRSxxQkFBcUIsTUFBTSxDQUFDLFVBQVUsRUFBRSxhQUFhLENBQUM7Ozs7OztJQUluSyxhQUFhOztRQUdqQix1QkFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLEVBQUUsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUU7O1lBR3ZELHVCQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsYUFBYSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUM7O1lBR2hELHVCQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsRUFBRSxLQUFLLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQzs7WUFHakYsdUJBQU0sY0FBYyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsRUFBRSxLQUFLLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQzs7WUFHdkUsTUFBTSxDQUFDLEdBQUcsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ2hDLE1BQU0sQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUN4QyxNQUFNLENBQUMsR0FBRyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDaEMsTUFBTSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBRXhDLGNBQWMsQ0FBQyxHQUFHLEdBQUcsTUFBTSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNoRCxjQUFjLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDeEQsY0FBYyxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3RELGNBQWMsQ0FBQyxVQUFVLEdBQUcsTUFBTSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUU5RCxNQUFNLG1CQUFDO2dCQUNILE1BQU07Z0JBQ04sVUFBVSxFQUFFLE1BQU0sQ0FBQyxHQUFHO2dCQUN0QixhQUFhLEVBQUUsTUFBTSxDQUFDLEdBQUc7Z0JBQ3pCLGNBQWMsRUFBRSxNQUFNLENBQUMsT0FBTztnQkFDOUIsaUJBQWlCLEVBQUUsTUFBTSxDQUFDLE9BQU87Z0JBQ2pDLGNBQWMsRUFBRSxjQUFjLENBQUMsTUFBTTtnQkFDckMsV0FBVyxFQUFFLGNBQWMsQ0FBQyxHQUFHO2dCQUMvQixrQkFBa0IsRUFBRSxjQUFjLENBQUMsVUFBVTtnQkFDN0MsZUFBZSxFQUFFLGNBQWMsQ0FBQyxPQUFPO2dCQUN2QyxXQUFXLEVBQUUsTUFBTSxDQUFDLEdBQUcsR0FBRyxjQUFjLENBQUMsTUFBTTtnQkFDL0MsWUFBWSxFQUFFLE1BQU0sQ0FBQyxHQUFHLEdBQUcsY0FBYyxDQUFDLE1BQU07Z0JBQ2hELFNBQVMsRUFBRSxNQUFNLENBQUMsR0FBRyxHQUFHLGNBQWMsQ0FBQyxHQUFHO2dCQUMxQyxXQUFXLEVBQUUsTUFBTSxDQUFDLEdBQUcsR0FBRyxjQUFjLENBQUMsR0FBRztnQkFDNUMsbUJBQW1CLEVBQUUsTUFBTSxDQUFDLEdBQUcsS0FBSyxjQUFjLENBQUMsTUFBTTtnQkFDekQsaUJBQWlCLEVBQUUsTUFBTSxDQUFDLEdBQUcsS0FBSyxjQUFjLENBQUMsR0FBRztnQkFDcEQsT0FBTyxFQUFFLE1BQU0sQ0FBQyxHQUFHLEtBQUssY0FBYyxDQUFDLE1BQU0sSUFBSSxNQUFNLENBQUMsR0FBRyxLQUFLLGNBQWMsQ0FBQyxHQUFHO2dCQUNsRixTQUFTLEVBQUUsY0FBYyxDQUFDLFVBQVUsS0FBSyxNQUFNLENBQUMsT0FBTyxJQUFJLGNBQWMsQ0FBQyxPQUFPLEtBQUssTUFBTSxDQUFDLE9BQU87YUFDaEYsRUFBQztTQUM1QixDQUFDLENBQUM7O1FBR0gsdUJBQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7O1FBRzVFLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxFQUFFOztZQUdsRixFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxLQUFLLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO2dCQUNqQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDYjtZQUVELEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEtBQUssSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7Z0JBQ2pDLE1BQU0sQ0FBQyxDQUFDLENBQUM7YUFDWjs7WUFHRCxNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDakYsQ0FBQyxDQUFDOzs7O1lBM2RWLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUseUJBQXlCO2dCQUNuQyxRQUFRLEVBQUUsMEJBQTBCO2FBQ3ZDOzs7O1lBTlEsd0JBQXdCO1lBRFMsZ0JBQWdCO1lBRWpELDBCQUEwQjtZQUxmLFVBQVU7WUFGckIsYUFBYTs7OzhCQWdCakIsS0FBSztnQ0FHTCxLQUFLOzhCQUdMLEtBQUs7OENBR0wsS0FBSztzQ0FHTCxLQUFLO3lDQUdMLEtBQUs7MkNBR0wsS0FBSzt3Q0FHTCxLQUFLO3VDQUdMLEtBQUs7d0JBR0wsV0FBVyxTQUFDLGlCQUFpQjt1QkFHN0IsV0FBVyxTQUFDLFVBQVU7cUJBa0h0QixZQUFZLFNBQUMsTUFBTTt3QkFNbkIsWUFBWSxTQUFDLFNBQVMsRUFBRSxDQUFDLFFBQVEsRUFBRSxjQUFjLEVBQUUsZ0JBQWdCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBMaXZlQW5ub3VuY2VyIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2ExMXknO1xuaW1wb3J0IHsgRE9XTl9BUlJPVywgRU5URVIsIEVTQ0FQRSwgTEVGVF9BUlJPVywgUklHSFRfQVJST1csIFNQQUNFLCBVUF9BUlJPVyB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9rZXljb2Rlcyc7XG5pbXBvcnQgeyBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIEhvc3RCaW5kaW5nLCBIb3N0TGlzdGVuZXIsIElucHV0LCBPbkRlc3Ryb3ksIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgbWFwLCB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcy9TdWJqZWN0JztcbmltcG9ydCB7IEFjdGlvbkRpcmVjdGlvbiwgRGFzaGJvYXJkQ2FjaGUsIERhc2hib2FyZFNlcnZpY2UgfSBmcm9tICcuLi9kYXNoYm9hcmQuc2VydmljZSc7XG5pbXBvcnQgeyBEYXNoYm9hcmRXaWRnZXRDb21wb25lbnQgfSBmcm9tICcuLi93aWRnZXQvZGFzaGJvYXJkLXdpZGdldC5jb21wb25lbnQnO1xuaW1wb3J0IHsgRGFzaGJvYXJkR3JhYkhhbmRsZVNlcnZpY2UgfSBmcm9tICcuL2dyYWItaGFuZGxlLnNlcnZpY2UnO1xuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ1t1eERhc2hib2FyZEdyYWJIYW5kbGVdJyxcbiAgICBleHBvcnRBczogJ3V4LWRhc2hib2FyZC1ncmFiLWhhbmRsZSdcbn0pXG5leHBvcnQgY2xhc3MgRGFzaGJvYXJkR3JhYkhhbmRsZURpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcblxuICAgIC8qKiBTcGVjaWZ5IHdoZXRoZXIgb3Igbm90IHRoaXMgaGFuZGxlIGNhbiBiZSB1c2VkIHRvIHBlcmZvcm0gbW92aW5nICovXG4gICAgQElucHV0KCkgdXhHcmFiQWxsb3dNb3ZlOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIC8qKiBTcGVjaWZ5IHdoZXRoZXIgb3Igbm90IHRoaXMgaGFuZGxlIGNhbiBiZSB1c2VkIHRvIHBlcmZvcm0gcmVzaXppbmcgKi9cbiAgICBASW5wdXQoKSB1eEdyYWJBbGxvd1Jlc2l6ZTogYm9vbGVhbiA9IHRydWU7XG5cbiAgICAvKiogVGhlIGFyaWEgbGFiZWwgZm9yIHRoZSBncmFiIGhhbmRsZSAqL1xuICAgIEBJbnB1dCgpIHV4R3JhYkFyaWFMYWJlbDogKHdpZGdldDogRGFzaGJvYXJkV2lkZ2V0Q29tcG9uZW50KSA9PiBzdHJpbmcgfCBzdHJpbmcgPSB0aGlzLmdldERlZmF1bHRBcmlhTGFiZWwuYmluZCh0aGlzKTtcblxuICAgIC8qKiBDdXN0b21pemUgdGhlIGFubm91bmNlbWVudCB0aGF0IGlzIG1hZGUgd2hlbmV2ZXIgYW4gaXRlbSBoYXMgc3VjY2Vzc2Z1bGx5IGJlZW4gbW92ZWQgb3IgcmVzaXplZCAqL1xuICAgIEBJbnB1dCgpIHV4R3JhYkNoYW5nZVN1Y2Nlc3NBbm5vdW5jZW1lbnQ6ICh3aWRnZXQ6IERhc2hib2FyZFdpZGdldENvbXBvbmVudCwgZGlmZmVyZW5jZXM6IERhc2hib2FyZExheW91dERpZmZbXSkgPT4gc3RyaW5nIHwgc3RyaW5nID0gdGhpcy5nZXRDaGFuZ2VTdWNjZXNzQW5ub3VuY2VtZW50LmJpbmQodGhpcyk7XG5cbiAgICAvKiogQ3VzdG9taXplIHRoZSBhbm5vdW5jZW1lbnQgdGhhdCBpcyBtYWRlIHdoZW5ldmVyIGFuIGl0ZW0gZW50ZXJzICdncmFiJyBtb2RlICovXG4gICAgQElucHV0KCkgdXhHcmFiU3RhcnRBbm5vdW5jZW1lbnQ6ICh3aWRnZXQ6IERhc2hib2FyZFdpZGdldENvbXBvbmVudCkgPT4gc3RyaW5nIHwgc3RyaW5nID0gdGhpcy5nZXRTdGFydEFubm91bmNlbWVudC5iaW5kKHRoaXMpO1xuXG4gICAgLyoqIEN1c3RvbWl6ZSB0aGUgYW5ub3VuY2VtZW50IHRocXQgaXMgbWFkZSB3aGVuZXZlciBhbiBpdGVtIGNhbm5vdCBiZSBtb3ZlZCAqL1xuICAgIEBJbnB1dCgpIHV4R3JhYk1vdmVGYWlsQW5ub3VuY2VtZW50OiAod2lkZ2V0OiBEYXNoYm9hcmRXaWRnZXRDb21wb25lbnQsIGRpcmVjdGlvbjogQWN0aW9uRGlyZWN0aW9uKSA9PiBzdHJpbmcgfCBzdHJpbmcgPSB0aGlzLmdldE1vdmVGYWlsQW5ub3VuY2VtZW50LmJpbmQodGhpcyk7XG5cbiAgICAvKiogQ3VzdG9taXplIHRoZSBhbm5vdW5jZW1lbnQgdGhxdCBpcyBtYWRlIHdoZW5ldmVyIGFuIGl0ZW0gY2Fubm90IGJlIHJlc2l6ZWQgKi9cbiAgICBASW5wdXQoKSB1eEdyYWJSZXNpemVGYWlsQW5ub3VuY2VtZW50OiAod2lkZ2V0OiBEYXNoYm9hcmRXaWRnZXRDb21wb25lbnQsIGRpcmVjdGlvbjogQWN0aW9uRGlyZWN0aW9uKSA9PiBzdHJpbmcgfCBzdHJpbmcgPSB0aGlzLmdldFJlc2l6ZUZhaWxBbm5vdW5jZW1lbnQuYmluZCh0aGlzKTtcblxuICAgIC8qKiBDdXN0b21pemUgdGhlIGFubm91bmNlbWVudCBtYWRlIHdoZW5ldmVyIHRoZSBtb3ZpbmcvcmVzaXppbmcgaXMgY29tbWl0ZWQgKi9cbiAgICBASW5wdXQoKSB1eEdyYWJDb25maXJtQW5ub3VuY2VtZW50OiAod2lkZ2V0OiBEYXNoYm9hcmRXaWRnZXRDb21wb25lbnQpID0+IHN0cmluZyB8IHN0cmluZyA9IHRoaXMuZ2V0Q29uZmlybUFubm91bmNlbWVudC5iaW5kKHRoaXMpO1xuXG4gICAgLyoqIEN1c3RvbWl6ZSB0aGUgYW5ub3VuY2VtZW50IG1hZGUgd2hlbmV2ZXIgdGhlIG1vdmluZy9yZXNpemluZyBpcyBjYW5jZWxsZWQgKi9cbiAgICBASW5wdXQoKSB1eEdyYWJDYW5jZWxBbm5vdW5jZW1lbnQ6ICh3aWRnZXQ6IERhc2hib2FyZFdpZGdldENvbXBvbmVudCkgPT4gc3RyaW5nIHwgc3RyaW5nID0gdGhpcy5nZXRDYW5jZWxsYXRpb25Bbm5vdW5jZW1lbnQuYmluZCh0aGlzKTtcblxuICAgIC8qKiBCaW5kaW5nIGZvciB0aGUgZ3JhYiBoYW5kbGUgYXJpYSBsYWJlbCAqL1xuICAgIEBIb3N0QmluZGluZygnYXR0ci5hcmlhLWxhYmVsJykgYXJpYUxhYmVsOiBzdHJpbmc7XG5cbiAgICAvKiogV2UgbXVzdCBwcm9ncmFtbWF0aWNhbGx5IGNvbnRyb2wgdGhlIGZvY3VzIG9mIHRoZSBkcmFnIGhhbmRsZXMgKi9cbiAgICBASG9zdEJpbmRpbmcoJ3RhYkluZGV4JykgdGFiSW5kZXg6IG51bWJlciA9IC0xO1xuXG4gICAgLyoqIFN0b3JlIHRoZSBjdXJyZW50IGRyYWdnaW5nIHN0YXRlICovXG4gICAgaXNHcmFiYmluZzogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgLyoqIFN0b3JlIHRoZSBjdXJyZW50IGxheW91dCB3aGVuIHdlIGVudGVyICdncmFiJyBtb2RlICovXG4gICAgcHJpdmF0ZSBfY2FjaGU6IERhc2hib2FyZENhY2hlW107XG5cbiAgICAvKiogU3RvcmUgdGhlIGxheW91dCBhZnRlciB0aGUgbW9zdCByZWNlbnQgc3VjY2Vzc2Z1bCBtb3ZlIG9yIHJlc2l6ZSAqL1xuICAgIHByaXZhdGUgX2xhc3RNb3ZlbWVudDogRGFzaGJvYXJkQ2FjaGVbXTtcblxuICAgIC8qKiBFbWl0IHdoZW4gdGhlIGRpcmVjdGl2ZSBpcyBkZXN0cm95ZWQgdG8gdW5zdWJzY3JpYmUgZnJvbSBhbGwgb2JzZXJ2YWJsZXMgKi9cbiAgICBwcml2YXRlIF9vbkRlc3Ryb3kgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHB1YmxpYyB3aWRnZXQ6IERhc2hib2FyZFdpZGdldENvbXBvbmVudCxcbiAgICAgICAgcHJpdmF0ZSBfZGFzaGJvYXJkOiBEYXNoYm9hcmRTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIF9oYW5kbGU6IERhc2hib2FyZEdyYWJIYW5kbGVTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgICAgICBwcml2YXRlIF9hbm5vdW5jZXI6IExpdmVBbm5vdW5jZXIpIHtcblxuICAgICAgICBpZiAoIXdpZGdldCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCd1eERhc2hib2FyZEdyYWJIYW5kbGUgbXVzdCBiZSB1c2VkIHdpdGhpbiBhIGRhc2hib2FyZCB3aWRnZXQnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHN1YnNjcmliZSB0byBjaGFuZ2VzIHRvIHRoZSBjdXJyZW50IGdyYWIgc3RhdGVcbiAgICAgICAgX2Rhc2hib2FyZC5pc0dyYWJiaW5nJC5waXBlKHRha2VVbnRpbCh0aGlzLl9vbkRlc3Ryb3kpLCBtYXAoX3dpZGdldCA9PiBfd2lkZ2V0ID09PSB3aWRnZXQpKVxuICAgICAgICAgICAgLnN1YnNjcmliZShpc0dyYWJiaW5nID0+IHRoaXMuaXNHcmFiYmluZyA9IGlzR3JhYmJpbmcpO1xuICAgIH1cblxuICAgIC8qKiBTZXQgdGhlIGluaXRpYWwgYXJpYSBsYWJlbCBhbmQgc3Vic2NyaWJlIHRvIGxheW91dCBjaGFuZ2VzICovXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XG5cbiAgICAgICAgaWYgKCF0aGlzLndpZGdldC5uYW1lKSB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oYERhc2hib2FyZCB3aWRnZXQgJHt0aGlzLndpZGdldC5pZH0gbXVzdCBoYXZlIGEgdmFsaWQgJ25hbWUnIHRvIHVzZSB1eERhc2hib2FyZEdyYWJIYW5kbGVgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHNldCB0aGUgaW5pdGlhbCBhcmlhIGxhYmVsXG4gICAgICAgIHRoaXMuYXJpYUxhYmVsID0gdGhpcy5nZXRBbm5vdW5jZW1lbnQodGhpcy51eEdyYWJBcmlhTGFiZWwpO1xuXG4gICAgICAgIC8vIHVwZGF0ZSB0aGUgYXJpYSBsYWJlbCB3aGVuIGxheW91dCBjaGFuZ2VzIG9jY3VyXG4gICAgICAgIHRoaXMuX2Rhc2hib2FyZC5sYXlvdXQkLnBpcGUodGFrZVVudGlsKHRoaXMuX29uRGVzdHJveSkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHRoaXMuYXJpYUxhYmVsID0gdGhpcy5nZXRBbm5vdW5jZW1lbnQodGhpcy51eEdyYWJBcmlhTGFiZWwpKTtcbiAgICB9XG5cbiAgICAvKiogVW5zdWJzY3JpYmUgZnJvbSBhbGwgb2JzZXJ2YWJsZXMgKi9cbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fb25EZXN0cm95Lm5leHQoKTtcbiAgICAgICAgdGhpcy5fb25EZXN0cm95LmNvbXBsZXRlKCk7XG4gICAgfVxuXG4gICAgLyoqIEJlZ2luIGRyYWcgbW9kZSBhbmQgY2FjaGUgaW5pdGlhbCBzdGF0ZSAqL1xuICAgIGVuYWJsZURyYWdNb2RlKCk6IHZvaWQge1xuICAgICAgICBpZiAoIXRoaXMuaXNHcmFiYmluZykge1xuXG4gICAgICAgICAgICAvLyBjYWNoZSB0aGUgd2lkZ2V0cyBzbyB3ZSBjYW4gcmVzdG9yZSB3aGVuIGVzY2FwZSBpcyBwcmVzc2VkXG4gICAgICAgICAgICB0aGlzLl9jYWNoZSA9IHRoaXMuX2xhc3RNb3ZlbWVudCA9IHRoaXMuX2Rhc2hib2FyZC5jYWNoZVdpZGdldHMoKTtcblxuICAgICAgICAgICAgLy8gc3RvcmUgdGhlIGN1cnJlbnQgd2lkZ2V0IGJlaW5nIGdyYWJiZWRcbiAgICAgICAgICAgIHRoaXMuX2Rhc2hib2FyZC5pc0dyYWJiaW5nJC5uZXh0KHRoaXMud2lkZ2V0KTtcblxuICAgICAgICAgICAgdGhpcy5fZGFzaGJvYXJkLm9uU2hpZnRTdGFydCh0aGlzLndpZGdldCk7XG5cbiAgICAgICAgICAgIC8vIGFubm91bmNlIHRoZSBncmFiIHN0YXJ0XG4gICAgICAgICAgICB0aGlzLl9hbm5vdW5jZXIuYW5ub3VuY2UodGhpcy5nZXRBbm5vdW5jZW1lbnQodGhpcy51eEdyYWJTdGFydEFubm91bmNlbWVudCkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIEZpbmlzaCBkcmFnIG1vZGUgYW5kIGNvbW1pdCB0aGUgY3VycmVudCBzdGF0ZSAqL1xuICAgIGRpc2FibGVEcmFnTW9kZSgpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuaXNHcmFiYmluZykge1xuICAgICAgICAgICAgdGhpcy5fZGFzaGJvYXJkLmlzR3JhYmJpbmckLm5leHQobnVsbCk7XG4gICAgICAgICAgICB0aGlzLl9sYXN0TW92ZW1lbnQgPSBudWxsO1xuICAgICAgICAgICAgdGhpcy5fZGFzaGJvYXJkLm9uU2hpZnRFbmQoKTtcblxuICAgICAgICAgICAgLy8gYW5ub3VuY2UgdGhlIGNvbmZpcm1hdGlvblxuICAgICAgICAgICAgdGhpcy5fYW5ub3VuY2VyLmFubm91bmNlKHRoaXMuZ2V0QW5ub3VuY2VtZW50KHRoaXMudXhHcmFiQ29uZmlybUFubm91bmNlbWVudCkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIEZpbmlzaCB0aGUgZHJhZyBtb2RlIGFuZCByZXN0b3JlIHRoZSBvcmlnaW5hbCBzdGF0ZSAqL1xuICAgIGNhbmNlbERyYWdNb2RlKCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5pc0dyYWJiaW5nKSB7XG4gICAgICAgICAgICB0aGlzLl9kYXNoYm9hcmQub25TaGlmdEVuZCgpO1xuICAgICAgICAgICAgdGhpcy5fZGFzaGJvYXJkLnJlc3RvcmVXaWRnZXRzKGZhbHNlLCB0aGlzLl9jYWNoZSwgdHJ1ZSk7XG4gICAgICAgICAgICB0aGlzLl9kYXNoYm9hcmQuc2V0RGFzaGJvYXJkSGVpZ2h0KCk7XG4gICAgICAgICAgICB0aGlzLl9kYXNoYm9hcmQubGF5b3V0JC5uZXh0KHRoaXMuX2Rhc2hib2FyZC5nZXRMYXlvdXREYXRhKCkpO1xuICAgICAgICAgICAgdGhpcy5fZGFzaGJvYXJkLmlzR3JhYmJpbmckLm5leHQobnVsbCk7XG5cbiAgICAgICAgICAgIC8vIGFubm91bmNlIHRoZSBjYW5jZWxsYXRpb25cbiAgICAgICAgICAgIHRoaXMuX2Fubm91bmNlci5hbm5vdW5jZSh0aGlzLmdldEFubm91bmNlbWVudCh0aGlzLnV4R3JhYkNhbmNlbEFubm91bmNlbWVudCkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIFRvZ2dsZSB0aGUgZHJhZyBtb2RlIHN0YXRlICovXG4gICAgdG9nZ2xlRHJhZ01vZGUoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuaXNHcmFiYmluZyA/IHRoaXMuZGlzYWJsZURyYWdNb2RlKCkgOiB0aGlzLmVuYWJsZURyYWdNb2RlKCk7XG4gICAgfVxuXG4gICAgLyoqIFNldCB0aGUgdGFiIGluZGV4IGFuZCBvcHRpb25hbGx5IGZvY3VzIHRoZSBET00gZWxlbWVudCAqL1xuICAgIGZvY3VzKGZvY3VzRWxlbWVudDogYm9vbGVhbiA9IHRydWUpOiB2b2lkIHtcbiAgICAgICAgdGhpcy50YWJJbmRleCA9IDA7XG5cbiAgICAgICAgaWYgKGZvY3VzRWxlbWVudCkge1xuICAgICAgICAgICAgdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiogTWFrZSB0aGlzIGl0ZW0gbm9uLXRhYmJhYmxlICovXG4gICAgYmx1cigpOiB2b2lkIHtcbiAgICAgICAgdGhpcy50YWJJbmRleCA9IC0xO1xuICAgIH1cblxuICAgIC8qKiBXaGVuIHRoZSBncmFiIGhhbmRsZSBsb3NlcyBmb2N1cyB0aGVuIGV4aXQgJ2dyYWInIG1vZGUgKi9cbiAgICBASG9zdExpc3RlbmVyKCdibHVyJylcbiAgICBvbkJsdXIoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZGlzYWJsZURyYWdNb2RlKCk7XG4gICAgfVxuXG4gICAgLyoqIEhhbmRsZSBrZXkgZXZlbnRzICovXG4gICAgQEhvc3RMaXN0ZW5lcigna2V5ZG93bicsIFsnJGV2ZW50JywgJyRldmVudC53aGljaCcsICckZXZlbnQuY3RybEtleSddKVxuICAgIG9uS2V5ZG93bihldmVudDogS2V5Ym9hcmRFdmVudCwga2V5OiBudW1iZXIsIGN0cmxLZXk6IGJvb2xlYW4pOiB2b2lkIHtcblxuICAgICAgICBzd2l0Y2ggKGtleSkge1xuICAgICAgICAgICAgY2FzZSBFU0NBUEU6XG4gICAgICAgICAgICAgICAgdGhpcy5jYW5jZWxEcmFnTW9kZSgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIFNQQUNFOlxuICAgICAgICAgICAgY2FzZSBFTlRFUjpcbiAgICAgICAgICAgICAgICB0aGlzLnRvZ2dsZURyYWdNb2RlKCk7XG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSBVUF9BUlJPVzpcbiAgICAgICAgICAgIGNhc2UgUklHSFRfQVJST1c6XG4gICAgICAgICAgICBjYXNlIERPV05fQVJST1c6XG4gICAgICAgICAgICBjYXNlIExFRlRfQVJST1c6XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNHcmFiYmluZykge1xuICAgICAgICAgICAgICAgICAgICBjdHJsS2V5ID8gdGhpcy5yZXNpemVXaWRnZXQoZXZlbnQsIGtleSkgOiB0aGlzLm1vdmVXaWRnZXQoZXZlbnQsIGtleSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tb3ZlRm9jdXMoZXZlbnQsIGtleSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIEdldCBhbiBhbm5vdW5jZW1lbnQgZnJvbSB0aGUgaW5wdXRzIC0gdGhleSBtYXkgYmUgYSBzdHJpbmcgb3IgYSBmdW5jdGlvbiBzbyBoYW5kbGUgYm90aCAqL1xuICAgIGdldEFubm91bmNlbWVudChhbm5vdW5jZW1lbnQ6IEZ1bmN0aW9uIHwgc3RyaW5nLCAuLi5hcmdzOiBhbnlbXSk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0eXBlb2YgYW5ub3VuY2VtZW50ID09PSAnZnVuY3Rpb24nID8gYW5ub3VuY2VtZW50KHRoaXMud2lkZ2V0LCAuLi5hcmdzKSA6IGFubm91bmNlbWVudDtcbiAgICB9XG5cbiAgICAvKiogTW92ZSB0aGUgd2lkZ2V0IGluIGEgZ2l2ZW4gZGlyZWN0aW9uIGJhc2VkIG9uIGFycm93IGtleXMgKi9cbiAgICBwcml2YXRlIG1vdmVXaWRnZXQoZXZlbnQ6IEtleWJvYXJkRXZlbnQsIGtleTogbnVtYmVyKTogdm9pZCB7XG5cbiAgICAgICAgLy8gY2hlY2sgaWYgbW92aW5nIGlzIGFsbG93ZWRcbiAgICAgICAgaWYgKCF0aGlzLndpZGdldC5pc0RyYWdnYWJsZSB8fCAhdGhpcy51eEdyYWJBbGxvd01vdmUpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGF0dGVtcHQgdG8gcGVyZm9ybSB0aGUgbW92ZVxuICAgICAgICB0aGlzLl9kYXNoYm9hcmQub25TaGlmdCh0aGlzLndpZGdldCwgdGhpcy5nZXREaXJlY3Rpb25Gcm9tS2V5KGtleSkpO1xuXG5cbiAgICAgICAgLy8gZ2V0IHRoZSBhbm5vdW5jYWJsZSBkaWZmXG4gICAgICAgIGNvbnN0IGNoYW5nZXMgPSB0aGlzLmdldExheW91dERpZmYoKTtcblxuICAgICAgICAvLyBpZiB0aGVyZSB3ZXJlIGNoYW5nZXMgdGhlbiBhbm5vdW5jZSB0aGVtXG4gICAgICAgIGlmIChjaGFuZ2VzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHRoaXMuX2Fubm91bmNlci5hbm5vdW5jZSh0aGlzLmdldEFubm91bmNlbWVudCh0aGlzLnV4R3JhYkNoYW5nZVN1Y2Nlc3NBbm5vdW5jZW1lbnQsIGNoYW5nZXMpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX2Fubm91bmNlci5hbm5vdW5jZSh0aGlzLmdldEFubm91bmNlbWVudCh0aGlzLnV4R3JhYk1vdmVGYWlsQW5ub3VuY2VtZW50LCB0aGlzLmdldERpcmVjdGlvbkZyb21LZXkoa2V5KSkpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fbGFzdE1vdmVtZW50ID0gdGhpcy5fZGFzaGJvYXJkLmNhY2hlV2lkZ2V0cygpO1xuXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIH1cblxuICAgIC8qKiBSZXNpemUgdGhlIHdpZGdldHMgYWNjb3JkaW5nbHkgYmFzZWQgb24gdGhlIGFycm93IGtleXMgKi9cbiAgICBwcml2YXRlIHJlc2l6ZVdpZGdldChldmVudDogS2V5Ym9hcmRFdmVudCwga2V5OiBudW1iZXIpOiB2b2lkIHtcblxuICAgICAgICAvLyBjaGVjayBpZiByZXNpemluZyBpcyBhbGxvd2VkXG4gICAgICAgIGlmICghdGhpcy53aWRnZXQucmVzaXphYmxlIHx8ICF0aGlzLnV4R3JhYkFsbG93UmVzaXplKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9kYXNoYm9hcmQub25SZXNpemUodGhpcy53aWRnZXQsIHRoaXMuZ2V0RGlyZWN0aW9uRnJvbUtleShrZXkpKTtcblxuICAgICAgICAvLyBnZXQgdGhlIGFubm91bmNhYmxlIGRpZmZcbiAgICAgICAgY29uc3QgY2hhbmdlcyA9IHRoaXMuZ2V0TGF5b3V0RGlmZigpO1xuXG4gICAgICAgIC8vIGlmIHRoZXJlIHdlcmUgY2hhbmdlcyB0aGVuIGFubm91bmNlIHRoZW1cbiAgICAgICAgaWYgKGNoYW5nZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgdGhpcy5fYW5ub3VuY2VyLmFubm91bmNlKHRoaXMuZ2V0QW5ub3VuY2VtZW50KHRoaXMudXhHcmFiQ2hhbmdlU3VjY2Vzc0Fubm91bmNlbWVudCwgY2hhbmdlcykpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fYW5ub3VuY2VyLmFubm91bmNlKHRoaXMuZ2V0QW5ub3VuY2VtZW50KHRoaXMudXhHcmFiUmVzaXplRmFpbEFubm91bmNlbWVudCwgdGhpcy5nZXREaXJlY3Rpb25Gcm9tS2V5KGtleSkpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2xhc3RNb3ZlbWVudCA9IHRoaXMuX2Rhc2hib2FyZC5jYWNoZVdpZGdldHMoKTtcblxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB9XG5cbiAgICAvKiogU2hpZnQgZm9jdXMgYmV0d2VlbiB0aGUgdmFyaW91ciBncmFiIGhhbmRsZXMgKi9cbiAgICBwcml2YXRlIG1vdmVGb2N1cyhldmVudDogS2V5Ym9hcmRFdmVudCwga2V5OiBudW1iZXIpOiB2b2lkIHtcblxuICAgICAgICBzd2l0Y2ggKGtleSkge1xuXG4gICAgICAgICAgICBjYXNlIFVQX0FSUk9XOlxuICAgICAgICAgICAgICAgIHRoaXMuX2hhbmRsZS5zZXRTaWJsaW5nSXRlbUZvY3VzKHRoaXMud2lkZ2V0LCBBY3Rpb25EaXJlY3Rpb24uVG9wKTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSBSSUdIVF9BUlJPVzpcbiAgICAgICAgICAgICAgICB0aGlzLl9oYW5kbGUuc2V0TmV4dEl0ZW1Gb2N1cyh0aGlzKTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSBET1dOX0FSUk9XOlxuICAgICAgICAgICAgICAgIHRoaXMuX2hhbmRsZS5zZXRTaWJsaW5nSXRlbUZvY3VzKHRoaXMud2lkZ2V0LCBBY3Rpb25EaXJlY3Rpb24uQm90dG9tKTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSBMRUZUX0FSUk9XOlxuICAgICAgICAgICAgICAgIHRoaXMuX2hhbmRsZS5zZXRQcmV2aW91c0l0ZW1Gb2N1cyh0aGlzKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIH1cblxuICAgIC8qKiBDb252ZXJ0IGFuIGFycm93IGtleSBjb2RlIGludG8gYW4gQWN0aW9uRGlyZWN0aW9uIGVudW0gKi9cbiAgICBwcml2YXRlIGdldERpcmVjdGlvbkZyb21LZXkoa2V5OiBudW1iZXIpOiBBY3Rpb25EaXJlY3Rpb24ge1xuICAgICAgICBzd2l0Y2ggKGtleSkge1xuXG4gICAgICAgICAgICBjYXNlIFVQX0FSUk9XOlxuICAgICAgICAgICAgICAgIHJldHVybiBBY3Rpb25EaXJlY3Rpb24uVG9wO1xuXG4gICAgICAgICAgICBjYXNlIFJJR0hUX0FSUk9XOlxuICAgICAgICAgICAgICAgIHJldHVybiBBY3Rpb25EaXJlY3Rpb24uUmlnaHQ7XG5cbiAgICAgICAgICAgIGNhc2UgRE9XTl9BUlJPVzpcbiAgICAgICAgICAgICAgICByZXR1cm4gQWN0aW9uRGlyZWN0aW9uLkJvdHRvbTtcblxuICAgICAgICAgICAgY2FzZSBMRUZUX0FSUk9XOlxuICAgICAgICAgICAgICAgIHJldHVybiBBY3Rpb25EaXJlY3Rpb24uTGVmdDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKiBTdXBwbHkgdGhlIGRlZmF1bHQgZ3JhYiBoYW5kbGUgYXJpYSBsYWJlbCBiYXNlZCBvbiB0aGUgcHJvdmlkZWQgY29uc3RyYWludHMgKi9cbiAgICBwcml2YXRlIGdldERlZmF1bHRBcmlhTGFiZWwod2lkZ2V0OiBEYXNoYm9hcmRXaWRnZXRDb21wb25lbnQpOiBzdHJpbmcge1xuICAgICAgICBpZiAod2lkZ2V0LnJlc2l6YWJsZSAmJiB0aGlzLnV4R3JhYkFsbG93UmVzaXplICYmIHdpZGdldC5pc0RyYWdnYWJsZSAmJiB0aGlzLnV4R3JhYkFsbG93TW92ZSkge1xuICAgICAgICAgICAgcmV0dXJuIGBQcmVzcyBzcGFjZSB0byBtb3ZlIGFuZCByZXNpemUgdGhlICR7d2lkZ2V0Lm5hbWV9IHBhbmVsLmA7XG4gICAgICAgIH0gZWxzZSBpZiAod2lkZ2V0LnJlc2l6YWJsZSAmJiB0aGlzLnV4R3JhYkFsbG93UmVzaXplKSB7XG4gICAgICAgICAgICByZXR1cm4gYFByZXNzIHNwYWNlIHRvIHJlc2l6ZSB0aGUgJHt3aWRnZXQubmFtZX0gcGFuZWwuYDtcbiAgICAgICAgfSBlbHNlIGlmICh3aWRnZXQuaXNEcmFnZ2FibGUgJiYgdGhpcy51eEdyYWJBbGxvd01vdmUpIHtcbiAgICAgICAgICAgIHJldHVybiBgUHJlc3Mgc3BhY2UgdG8gbW92ZSB0aGUgJHt3aWRnZXQubmFtZX0gcGFuZWwuYDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKiBHZXQgdGhlIGRlZmF1bHQgYW5ub3VuY2VtZW50IHdoZW5ldmVyIGEgbW92ZW1lbnQgb3IgcmVzaXplIHdhcyBzdWNjZXNzZnVsICovXG4gICAgcHJpdmF0ZSBnZXRDaGFuZ2VTdWNjZXNzQW5ub3VuY2VtZW50KCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBgJHt0aGlzLmdldERpZmZBbm5vdW5jZW1lbnRzKCkuam9pbignICcpfSBVc2UgdGhlIGN1cnNvciBrZXlzIHRvIGNvbnRpbnVlIG1vdmluZyBhbmQgcmVzaXppbmcsIGVudGVyIHRvIGNvbW1pdCwgb3IgZXNjYXBlIHRvIGNhbmNlbC5gO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0RGlmZkFubm91bmNlbWVudHMoKTogc3RyaW5nW10ge1xuICAgICAgICAvLyBtYXAgdGhlIGRpZmZlcmVuY2VzIHRvIHN0cmluZ3NcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0TGF5b3V0RGlmZigpLm1hcChkaWZmID0+IHtcblxuICAgICAgICAgICAgY29uc3QgY2hhbmdlczogc3RyaW5nW10gPSBbXTtcblxuICAgICAgICAgICAgLy8gSGFuZGxlIG1vdmVtZW50IHN0cmluZ3NcbiAgICAgICAgICAgIGlmIChkaWZmLmlzTW92ZWRIb3Jpem9udGFsbHkgJiYgZGlmZi5pc01vdmVkVmVydGljYWxseSkge1xuICAgICAgICAgICAgICAgIGNoYW5nZXMucHVzaChgbW92ZWQgdG8gcm93ICR7ZGlmZi5jdXJyZW50Um93fSwgY29sdW1uICR7ZGlmZi5jdXJyZW50Q29sdW1ufWApO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChkaWZmLmlzTW92ZWREb3duKSB7XG4gICAgICAgICAgICAgICAgY2hhbmdlcy5wdXNoKGBtb3ZlZCBkb3duIHRvIHJvdyAke2RpZmYuY3VycmVudFJvd30sIGNvbHVtbiAke2RpZmYuY3VycmVudENvbHVtbn1gKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZGlmZi5pc01vdmVkVXApIHtcbiAgICAgICAgICAgICAgICBjaGFuZ2VzLnB1c2goYG1vdmVkIHVwIHRvIHJvdyAke2RpZmYuY3VycmVudFJvd30sIGNvbHVtbiAke2RpZmYuY3VycmVudENvbHVtbn1gKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZGlmZi5pc01vdmVkTGVmdCkge1xuICAgICAgICAgICAgICAgIGNoYW5nZXMucHVzaChgbW92ZWQgbGVmdCB0byByb3cgJHtkaWZmLmN1cnJlbnRSb3d9LCBjb2x1bW4gJHtkaWZmLmN1cnJlbnRDb2x1bW59YCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGRpZmYuaXNNb3ZlZFJpZ2h0KSB7XG4gICAgICAgICAgICAgICAgY2hhbmdlcy5wdXNoKGBtb3ZlZCByaWdodCB0byByb3cgJHtkaWZmLmN1cnJlbnRSb3d9LCBjb2x1bW4gJHtkaWZmLmN1cnJlbnRDb2x1bW59YCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGhhbmRsZSByZXNpemUgc3RyaW5nc1xuICAgICAgICAgICAgaWYgKGRpZmYuaXNSZXNpemVkKSB7XG4gICAgICAgICAgICAgICAgY2hhbmdlcy5wdXNoKGByZXNpemVkIHRvICR7ZGlmZi5jdXJyZW50Q29sdW1uU3Bhbn0gY29sdW1ucyB3aWRlIGFuZCAke2RpZmYuY3VycmVudFJvd1NwYW59IHJvd3MgaGlnaGApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gYCR7ZGlmZi53aWRnZXQubmFtZX0gcGFuZWwgaXMgJHtjaGFuZ2VzLmpvaW4oJyBhbmQgJyl9LmA7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKiBHZXQgdGhlIGRlZmF1bHQgYW5ub3VuY2VtZW50IHdoZW5ldmVyIGEgbW92ZW1lbnQgaXMgbm90IHBvc3NpYmxlIGR1ZSB0byBkYXNoYm9hcmQgYm91bmRhcmllcyAqL1xuICAgIHByaXZhdGUgZ2V0TW92ZUZhaWxBbm5vdW5jZW1lbnQod2lkZ2V0OiBEYXNoYm9hcmRXaWRnZXRDb21wb25lbnQsIGRpcmVjdGlvbjogQWN0aW9uRGlyZWN0aW9uKTogc3RyaW5nIHtcblxuICAgICAgICBzd2l0Y2ggKGRpcmVjdGlvbikge1xuXG4gICAgICAgICAgICBjYXNlIEFjdGlvbkRpcmVjdGlvbi5Ub3A6XG4gICAgICAgICAgICAgICAgcmV0dXJuIGBDYW5ub3QgbW92ZSB0aGUgJHt3aWRnZXQubmFtZX0gcGFuZWwgdXAsIGJlY2F1c2UgaXQgaXMgYXQgdGhlIHRvcCBlZGdlIG9mIHRoZSBkYXNoYm9hcmRgO1xuXG4gICAgICAgICAgICBjYXNlIEFjdGlvbkRpcmVjdGlvbi5Cb3R0b206XG4gICAgICAgICAgICAgICAgcmV0dXJuIGBDYW5ub3QgbW92ZSB0aGUgJHt3aWRnZXQubmFtZX0gcGFuZWwgZG93biwgYmVjYXVzZSBpdCBpcyBhdCB0aGUgYm90dG9tIGVkZ2Ugb2YgdGhlIGRhc2hib2FyZGA7XG5cbiAgICAgICAgICAgIGNhc2UgQWN0aW9uRGlyZWN0aW9uLlJpZ2h0OlxuICAgICAgICAgICAgICAgIHJldHVybiBgQ2Fubm90IG1vdmUgdGhlICR7d2lkZ2V0Lm5hbWV9IHBhbmVsIHJpZ2h0LCBiZWNhdXNlIGl0IGlzIGF0IHRoZSByaWdodCBlZGdlIG9mIHRoZSBkYXNoYm9hcmRgO1xuXG4gICAgICAgICAgICBjYXNlIEFjdGlvbkRpcmVjdGlvbi5MZWZ0OlxuICAgICAgICAgICAgICAgIHJldHVybiBgQ2Fubm90IG1vdmUgdGhlICR7d2lkZ2V0Lm5hbWV9IHBhbmVsIGxlZnQsIGJlY2F1c2UgaXQgaXMgYXQgdGhlIGxlZnQgZWRnZSBvZiB0aGUgZGFzaGJvYXJkYDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKiBHZXQgdGhlIGRlZmF1bHQgYW5ub3VuY2VtZW50IHdoZW5ldmVyIGEgcmVzaXplIGlzIG5vdCBwb3NzaWJsZSBkdWUgdG8gZWl0aGVyIHdpZGdldCBjb25zdHJhaW50cyBvZiBkYXNoYm9hcmQgYm91bmRzICovXG4gICAgcHJpdmF0ZSBnZXRSZXNpemVGYWlsQW5ub3VuY2VtZW50KHdpZGdldDogRGFzaGJvYXJkV2lkZ2V0Q29tcG9uZW50LCBkaXJlY3Rpb246IEFjdGlvbkRpcmVjdGlvbik6IHN0cmluZyB7XG4gICAgICAgIHN3aXRjaCAoZGlyZWN0aW9uKSB7XG5cbiAgICAgICAgICAgIGNhc2UgQWN0aW9uRGlyZWN0aW9uLlRvcDpcbiAgICAgICAgICAgICAgICByZXR1cm4gYENhbm5vdCBtYWtlIHRoZSAke3dpZGdldC5uYW1lfSBwYW5lbCBzaG9ydGVyLCBiZWNhdXNlIGl0IGlzIGN1cnJlbnRseSBhdCBpdHMgbWluaW11bSBoZWlnaHQuYDtcblxuICAgICAgICAgICAgY2FzZSBBY3Rpb25EaXJlY3Rpb24uQm90dG9tOlxuICAgICAgICAgICAgICAgIHJldHVybiBgQ2Fubm90IG1ha2UgdGhlICR7d2lkZ2V0Lm5hbWV9IHBhbmVsIHRhbGxlciwgYmVjYXVzZSBpdCBpcyBjdXJyZW50bHkgYXQgaXRzIG1heGltdW0gaGVpZ2h0LmA7XG5cbiAgICAgICAgICAgIGNhc2UgQWN0aW9uRGlyZWN0aW9uLlJpZ2h0OlxuICAgICAgICAgICAgICAgIHJldHVybiBgQ2Fubm90IG1ha2UgdGhlICR7d2lkZ2V0Lm5hbWV9IHBhbmVsIHdpZGVyLCBiZWNhdXNlIGl0IGlzIGF0IHRoZSByaWdodCBlZGdlIG9mIHRoZSBkYXNoYm9hcmQuYDtcblxuICAgICAgICAgICAgY2FzZSBBY3Rpb25EaXJlY3Rpb24uTGVmdDpcbiAgICAgICAgICAgICAgICByZXR1cm4gYENhbm5vdCBtYWtlIHRoZSAke3dpZGdldC5uYW1lfSBwYW5lbCBuYXJyb3dlciwgYmVjYXVzZSBpdCBpcyBjdXJyZW50bHkgYXQgaXRzIG1pbmltdW0gd2lkdGguYDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKiBHZXQgdGhlIGRlZmF1bHQgYW5ub3VuY2VtZW50IHdoZW5ldmVyIHdlIGVudGVyICdncmFiJyBtb2RlICovXG4gICAgcHJpdmF0ZSBnZXRTdGFydEFubm91bmNlbWVudCh3aWRnZXQ6IERhc2hib2FyZFdpZGdldENvbXBvbmVudCk6IHN0cmluZyB7XG4gICAgICAgIGlmICh3aWRnZXQuaXNEcmFnZ2FibGUgJiYgd2lkZ2V0LnJlc2l6YWJsZSAmJiB0aGlzLnV4R3JhYkFsbG93TW92ZSAmJiB0aGlzLnV4R3JhYkFsbG93UmVzaXplKSB7XG4gICAgICAgICAgICByZXR1cm4gYCR7d2lkZ2V0Lm5hbWV9IHBhbmVsIGlzIGN1cnJlbnRseSBvbiByb3cgJHt3aWRnZXQuZ2V0Um93KCl9LCBjb2x1bW4gJHt3aWRnZXQuZ2V0Q29sdW1uKCl9IGFuZCBpcyAke3dpZGdldC5nZXRDb2x1bW5TcGFuKCl9IGNvbHVtbnMgd2lkZSBhbmQgJHt3aWRnZXQuZ2V0Um93U3BhbigpfSByb3dzIGhpZ2guIFVzZSB0aGUgY3Vyc29yIGtleXMgdG8gbW92ZSB0aGUgd2lkZ2V0IGFuZCB0aGUgY3Vyc29yIGtleXMgd2l0aCB0aGUgY29udHJvbCBtb2RpZmllciB0byByZXNpemUgdGhlIHdpZGdldC4gUHJlc3MgZW50ZXIgdG8gY29tbWl0IGNoYW5nZXMgYW5kIHByZXNzIGVzY2FwZSB0byBjYW5jZWwgY2hhbmdlcy5gO1xuICAgICAgICB9IGVsc2UgaWYgKHdpZGdldC5pc0RyYWdnYWJsZSAmJiB0aGlzLnV4R3JhYkFsbG93TW92ZSkge1xuICAgICAgICAgICAgcmV0dXJuIGAke3dpZGdldC5uYW1lfSBwYW5lbCBpcyBjdXJyZW50bHkgb24gcm93ICR7d2lkZ2V0LmdldFJvdygpfSwgY29sdW1uICR7d2lkZ2V0LmdldENvbHVtbigpfS4gVXNlIHRoZSBjdXJzb3Iga2V5cyB0byBtb3ZlIHRoZSB3aWRnZXQuIFByZXNzIGVudGVyIHRvIGNvbW1pdCBjaGFuZ2VzIGFuZCBwcmVzcyBlc2NhcGUgdG8gY2FuY2VsIGNoYW5nZXMuYDtcbiAgICAgICAgfSBlbHNlIGlmICh3aWRnZXQucmVzaXphYmxlICYmIHRoaXMudXhHcmFiQWxsb3dSZXNpemUpIHtcbiAgICAgICAgICAgIHJldHVybiBgJHt3aWRnZXQubmFtZX0gcGFuZWwgaXMgY3VycmVudGx5IG9uIHJvdyAke3dpZGdldC5nZXRSb3coKX0sIGNvbHVtbiAke3dpZGdldC5nZXRDb2x1bW4oKX0gYW5kIGlzICR7d2lkZ2V0LmdldENvbHVtblNwYW4oKX0gY29sdW1ucyB3aWRlIGFuZCAke3dpZGdldC5nZXRSb3dTcGFuKCl9IHJvd3MgaGlnaC4gVXNlIHRoZSBjdXJzb3Iga2V5cyB3aXRoIHRoZSBjb250cm9sIG1vZGlmaWVyIHRvIHJlc2l6ZSB0aGUgd2lkZ2V0LiBQcmVzcyBlbnRlciB0byBjb21taXQgY2hhbmdlcyBhbmQgcHJlc3MgZXNjYXBlIHRvIGNhbmNlbCBjaGFuZ2VzLmA7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiogR2V0IHRoZSBkZWZhdWx0IGFubm91bmNlbWVudCB3aGVuZXZlciBncmFiIG1vZGUgaXMgZXhpdGVkIGFmdGVyIGEgbW92ZW1lbnQgb3IgcmVzaXplICovXG4gICAgcHJpdmF0ZSBnZXRDb25maXJtQW5ub3VuY2VtZW50KHdpZGdldDogRGFzaGJvYXJkV2lkZ2V0Q29tcG9uZW50KTogc3RyaW5nIHtcbiAgICAgICAgaWYgKHdpZGdldC5pc0RyYWdnYWJsZSAmJiB3aWRnZXQucmVzaXphYmxlICYmIHRoaXMudXhHcmFiQWxsb3dNb3ZlICYmIHRoaXMudXhHcmFiQWxsb3dSZXNpemUpIHtcbiAgICAgICAgICAgIHJldHVybiBgTW92aW5nIGFuZCByZXNpemluZyBjb21wbGV0ZS4gJHt0aGlzLmdldERpZmZBbm5vdW5jZW1lbnRzKCkuam9pbignICcpfSAke3RoaXMuZ2V0QW5ub3VuY2VtZW50KHRoaXMudXhHcmFiQXJpYUxhYmVsKX1gO1xuICAgICAgICB9IGVsc2UgaWYgKHdpZGdldC5pc0RyYWdnYWJsZSAmJiB0aGlzLnV4R3JhYkFsbG93TW92ZSkge1xuICAgICAgICAgICAgcmV0dXJuIGBNb3ZpbmcgY29tcGxldGUuICR7dGhpcy5nZXREaWZmQW5ub3VuY2VtZW50cygpLmpvaW4oJyAnKX0gJHt0aGlzLmdldEFubm91bmNlbWVudCh0aGlzLnV4R3JhYkFyaWFMYWJlbCl9YDtcbiAgICAgICAgfSBlbHNlIGlmICh3aWRnZXQucmVzaXphYmxlICYmIHRoaXMudXhHcmFiQWxsb3dSZXNpemUpIHtcbiAgICAgICAgICAgIHJldHVybiBgUmVzaXppbmcgY29tcGxldGUuICR7dGhpcy5nZXREaWZmQW5ub3VuY2VtZW50cygpLmpvaW4oJyAnKX0gJHt0aGlzLmdldEFubm91bmNlbWVudCh0aGlzLnV4R3JhYkFyaWFMYWJlbCl9YDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKiBHZXQgdGhlIGRlZmF1bHQgYW5ub3VuY2VtZW50IHdoZW5ldmVyIGdyYWIgbW9kZSBpcyBleGl0ZWQgYWZ0ZXIgYmVpbmcgY2FuY2VsbGVkICovXG4gICAgcHJpdmF0ZSBnZXRDYW5jZWxsYXRpb25Bbm5vdW5jZW1lbnQod2lkZ2V0OiBEYXNoYm9hcmRXaWRnZXRDb21wb25lbnQpOiBzdHJpbmcge1xuICAgICAgICBpZiAod2lkZ2V0LmlzRHJhZ2dhYmxlICYmIHdpZGdldC5yZXNpemFibGUgJiYgdGhpcy51eEdyYWJBbGxvd01vdmUgJiYgdGhpcy51eEdyYWJBbGxvd1Jlc2l6ZSkge1xuICAgICAgICAgICAgcmV0dXJuIGBNb3ZpbmcgYW5kIHJlc2l6aW5nIGNhbmNlbGxlZC4gJHt0aGlzLmdldERhc2hib2FyZEFyaWFMYWJlbCgpfSAke3RoaXMuZ2V0QW5ub3VuY2VtZW50KHRoaXMudXhHcmFiQXJpYUxhYmVsKX1gO1xuICAgICAgICB9IGVsc2UgaWYgKHdpZGdldC5pc0RyYWdnYWJsZSAmJiB0aGlzLnV4R3JhYkFsbG93TW92ZSkge1xuICAgICAgICAgICAgcmV0dXJuIGBNb3ZpbmcgY2FuY2VsbGVkLiAke3RoaXMuZ2V0RGFzaGJvYXJkQXJpYUxhYmVsKCl9ICR7dGhpcy5nZXRBbm5vdW5jZW1lbnQodGhpcy51eEdyYWJBcmlhTGFiZWwpfWA7XG4gICAgICAgIH0gZWxzZSBpZiAod2lkZ2V0LnJlc2l6YWJsZSAmJiB0aGlzLnV4R3JhYkFsbG93UmVzaXplKSB7XG4gICAgICAgICAgICByZXR1cm4gYFJlc2l6aW5nIGNhbmNlbGxlZC4gJHt0aGlzLmdldERhc2hib2FyZEFyaWFMYWJlbCgpfSAke3RoaXMuZ2V0QW5ub3VuY2VtZW50KHRoaXMudXhHcmFiQXJpYUxhYmVsKX1gO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIEdldCBhIGRlc2NyaXB0aW9uIG9mIGFsbCBkYXNoYm9hcmQgd2lkZ2V0cywgdGhlaXIgcG9zaXRpb25zIGFuZCBzaXplcyAqL1xuICAgIHByaXZhdGUgZ2V0RGFzaGJvYXJkQXJpYUxhYmVsKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBgRGFzaGJvYXJkIHdpdGggJHt0aGlzLl9kYXNoYm9hcmQub3B0aW9ucy5jb2x1bW5zfSBjb2x1bW5zLCBjb250YWluaW5nICR7dGhpcy5fZGFzaGJvYXJkLndpZGdldHMubGVuZ3RofSBwYW5lbHMuICR7dGhpcy5fZGFzaGJvYXJkLndpZGdldHMubWFwKHRoaXMuZ2V0V2lkZ2V0QXJpYUxhYmVsKS5qb2luKCcgJyl9YDtcbiAgICB9XG5cbiAgICAvKiogR2V0IGEgZGVzY3JpcHRpb24gb2YgYSBnaXZlbiB3aWRnZXQgKi9cbiAgICBwcml2YXRlIGdldFdpZGdldEFyaWFMYWJlbCh3aWRnZXQ6IERhc2hib2FyZFdpZGdldENvbXBvbmVudCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBgJHt3aWRnZXQubmFtZX0gcGFuZWwgaW4gcm93ICR7d2lkZ2V0LmdldFJvdygpfSwgY29sdW1uICR7d2lkZ2V0LmdldENvbHVtbigpfSwgaXMgJHt3aWRnZXQuZ2V0Q29sdW1uU3BhbigpfSBjb2x1bW5zIHdpZGUgYW5kICR7d2lkZ2V0LmdldFJvd1NwYW4oKX0gcm93cyBoaWdoLmA7XG4gICAgfVxuXG4gICAgLyoqIEdldCBhbiBvYmplY3QgZGVzY3JpYmluZyBhbGwgdGhlIGNoYW5nZXMgdGhhdCBoYXZlIGJlZW4gbWFkZSB0byBhbGwgd2lkZ2V0cyBzaW5jZSB0aGUgbGFzdCBjaGFuZ2UgKi9cbiAgICBwcml2YXRlIGdldExheW91dERpZmYoKTogRGFzaGJvYXJkTGF5b3V0RGlmZltdIHtcblxuICAgICAgICAvLyBmaW5kIGFsbCBjaGFuZ2VzXG4gICAgICAgIGNvbnN0IGRpZmZzID0gdGhpcy5fZGFzaGJvYXJkLmdldExheW91dERhdGEoKS5tYXAobGF5b3V0ID0+IHtcblxuICAgICAgICAgICAgLy8gZ2V0IHRoZSBtb3N0IHJlY2VudCBjYWNoZVxuICAgICAgICAgICAgY29uc3QgY2FjaGUgPSB0aGlzLl9sYXN0TW92ZW1lbnQgfHwgdGhpcy5fY2FjaGU7XG5cbiAgICAgICAgICAgIC8vIGdldCB0aGUgYWN0dWFsIHdpZGdldFxuICAgICAgICAgICAgY29uc3Qgd2lkZ2V0ID0gdGhpcy5fZGFzaGJvYXJkLndpZGdldHMuZmluZChfd2lkZ2V0ID0+IF93aWRnZXQuaWQgPT09IGxheW91dC5pZCk7XG5cbiAgICAgICAgICAgIC8vIGdldCBwcmV2aW91cyBwb3NpdGlvblxuICAgICAgICAgICAgY29uc3QgcHJldmlvdXNMYXlvdXQgPSBjYWNoZS5maW5kKF93aWRnZXQgPT4gX3dpZGdldC5pZCA9PT0gbGF5b3V0LmlkKTtcblxuICAgICAgICAgICAgLy8gZW5zdXJlIHRoZXkgYXJlIGFsbCBudW1iZXJzXG4gICAgICAgICAgICBsYXlvdXQucm93ID0gTnVtYmVyKGxheW91dC5yb3cpO1xuICAgICAgICAgICAgbGF5b3V0LnJvd1NwYW4gPSBOdW1iZXIobGF5b3V0LnJvd1NwYW4pO1xuICAgICAgICAgICAgbGF5b3V0LmNvbCA9IE51bWJlcihsYXlvdXQuY29sKTtcbiAgICAgICAgICAgIGxheW91dC5jb2xTcGFuID0gTnVtYmVyKGxheW91dC5jb2xTcGFuKTtcblxuICAgICAgICAgICAgcHJldmlvdXNMYXlvdXQucm93ID0gTnVtYmVyKHByZXZpb3VzTGF5b3V0LnJvdyk7XG4gICAgICAgICAgICBwcmV2aW91c0xheW91dC5yb3dTcGFuID0gTnVtYmVyKHByZXZpb3VzTGF5b3V0LnJvd1NwYW4pO1xuICAgICAgICAgICAgcHJldmlvdXNMYXlvdXQuY29sdW1uID0gTnVtYmVyKHByZXZpb3VzTGF5b3V0LmNvbHVtbik7XG4gICAgICAgICAgICBwcmV2aW91c0xheW91dC5jb2x1bW5TcGFuID0gTnVtYmVyKHByZXZpb3VzTGF5b3V0LmNvbHVtblNwYW4pO1xuXG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHdpZGdldCxcbiAgICAgICAgICAgICAgICBjdXJyZW50Um93OiBsYXlvdXQucm93LFxuICAgICAgICAgICAgICAgIGN1cnJlbnRDb2x1bW46IGxheW91dC5jb2wsXG4gICAgICAgICAgICAgICAgY3VycmVudFJvd1NwYW46IGxheW91dC5yb3dTcGFuLFxuICAgICAgICAgICAgICAgIGN1cnJlbnRDb2x1bW5TcGFuOiBsYXlvdXQuY29sU3BhbixcbiAgICAgICAgICAgICAgICBwcmV2aW91c0NvbHVtbjogcHJldmlvdXNMYXlvdXQuY29sdW1uLFxuICAgICAgICAgICAgICAgIHByZXZpb3VzUm93OiBwcmV2aW91c0xheW91dC5yb3csXG4gICAgICAgICAgICAgICAgcHJldmlvdXNDb2x1bW5TcGFuOiBwcmV2aW91c0xheW91dC5jb2x1bW5TcGFuLFxuICAgICAgICAgICAgICAgIHByZXZpb3VzUm93U3BhbjogcHJldmlvdXNMYXlvdXQucm93U3BhbixcbiAgICAgICAgICAgICAgICBpc01vdmVkTGVmdDogbGF5b3V0LmNvbCA8IHByZXZpb3VzTGF5b3V0LmNvbHVtbixcbiAgICAgICAgICAgICAgICBpc01vdmVkUmlnaHQ6IGxheW91dC5jb2wgPiBwcmV2aW91c0xheW91dC5jb2x1bW4sXG4gICAgICAgICAgICAgICAgaXNNb3ZlZFVwOiBsYXlvdXQucm93IDwgcHJldmlvdXNMYXlvdXQucm93LFxuICAgICAgICAgICAgICAgIGlzTW92ZWREb3duOiBsYXlvdXQucm93ID4gcHJldmlvdXNMYXlvdXQucm93LFxuICAgICAgICAgICAgICAgIGlzTW92ZWRIb3Jpem9udGFsbHk6IGxheW91dC5jb2wgIT09IHByZXZpb3VzTGF5b3V0LmNvbHVtbixcbiAgICAgICAgICAgICAgICBpc01vdmVkVmVydGljYWxseTogbGF5b3V0LnJvdyAhPT0gcHJldmlvdXNMYXlvdXQucm93LFxuICAgICAgICAgICAgICAgIGlzTW92ZWQ6IGxheW91dC5jb2wgIT09IHByZXZpb3VzTGF5b3V0LmNvbHVtbiB8fCBsYXlvdXQucm93ICE9PSBwcmV2aW91c0xheW91dC5yb3csXG4gICAgICAgICAgICAgICAgaXNSZXNpemVkOiBwcmV2aW91c0xheW91dC5jb2x1bW5TcGFuICE9PSBsYXlvdXQuY29sU3BhbiB8fCBwcmV2aW91c0xheW91dC5yb3dTcGFuICE9PSBsYXlvdXQucm93U3BhblxuICAgICAgICAgICAgfSBhcyBEYXNoYm9hcmRMYXlvdXREaWZmO1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyBnZXQgdGhlIG9yZGVyIHRoZSB3aWRnZXRzIGFwcGVhciB2aXN1YWxseVxuICAgICAgICBjb25zdCBvcmRlciA9IHRoaXMuX2hhbmRsZS5nZXRIYW5kbGVzSW5PcmRlcigpLm1hcChoYW5kbGUgPT4gaGFuZGxlLndpZGdldCk7XG5cbiAgICAgICAgLy8gb25seSByZXR1cm4gaXRlbXMgdGhhdCBoYXZlIGJlZW4gcmVwb3NpdGlvbmVkIG9yIHJlc2l6ZWRcbiAgICAgICAgcmV0dXJuIGRpZmZzLmZpbHRlcihkaWZmID0+IGRpZmYuaXNNb3ZlZCB8fCBkaWZmLmlzUmVzaXplZCkuc29ydCgoZGlmZk9uZSwgZGlmZlR3bykgPT4ge1xuXG4gICAgICAgICAgICAvLyBzb3J0IHRoaXMgc28gdGhhdCB0aGUgaXRlbSB0aGF0IHRoZSB1c2VyIG1vdmVkIGlzIGZpcnN0IGluIHRoZSBsaXN0LCBhbmQgdGhlIHJlbWFpbmRlciBhcmUgaW4gdGhlaXIgbmV3IG9yZGVyIGFzIHNlZW4gaW4gdGhlIGRhc2hib2FyZFxuICAgICAgICAgICAgaWYgKGRpZmZPbmUud2lkZ2V0ID09PSB0aGlzLndpZGdldCkge1xuICAgICAgICAgICAgICAgIHJldHVybiAtMTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGRpZmZUd28ud2lkZ2V0ID09PSB0aGlzLndpZGdldCkge1xuICAgICAgICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBvdGhlcndpc2Ugc29ydCBiYXNlZCBvbiB0aGVpciB2aXN1YWwgb3JkZXJcbiAgICAgICAgICAgIHJldHVybiBvcmRlci5pbmRleE9mKGRpZmZPbmUud2lkZ2V0KSA8IG9yZGVyLmluZGV4T2YoZGlmZlR3by53aWRnZXQpID8gLTEgOiAxO1xuICAgICAgICB9KTtcbiAgICB9XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRGFzaGJvYXJkTGF5b3V0RGlmZiB7XG4gICAgd2lkZ2V0OiBEYXNoYm9hcmRXaWRnZXRDb21wb25lbnQ7XG4gICAgcHJldmlvdXNDb2x1bW46IG51bWJlcjtcbiAgICBjdXJyZW50Q29sdW1uOiBudW1iZXI7XG4gICAgcHJldmlvdXNSb3c6IG51bWJlcjtcbiAgICBjdXJyZW50Um93OiBudW1iZXI7XG4gICAgcHJldmlvdXNDb2x1bW5TcGFuOiBudW1iZXI7XG4gICAgY3VycmVudENvbHVtblNwYW46IG51bWJlcjtcbiAgICBwcmV2aW91c1Jvd1NwYW46IG51bWJlcjtcbiAgICBjdXJyZW50Um93U3BhbjogbnVtYmVyO1xuICAgIGlzTW92ZWRMZWZ0OiBib29sZWFuO1xuICAgIGlzTW92ZWRSaWdodDogYm9vbGVhbjtcbiAgICBpc01vdmVkVXA6IGJvb2xlYW47XG4gICAgaXNNb3ZlZERvd246IGJvb2xlYW47XG4gICAgaXNNb3ZlZEhvcml6b250YWxseTogYm9vbGVhbjtcbiAgICBpc01vdmVkVmVydGljYWxseTogYm9vbGVhbjtcbiAgICBpc1Jlc2l6ZWQ6IGJvb2xlYW47XG4gICAgaXNNb3ZlZDogYm9vbGVhbjtcbn0iXX0=