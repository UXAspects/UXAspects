import { LiveAnnouncer } from '@angular/cdk/a11y';
import { DOWN_ARROW, ENTER, ESCAPE, LEFT_ARROW, RIGHT_ARROW, SPACE, UP_ARROW } from '@angular/cdk/keycodes';
import { Directive, ElementRef, HostBinding, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { ActionDirection, DashboardCache, DashboardService } from '../dashboard.service';
import { DashboardWidgetComponent } from '../widget/dashboard-widget.component';
import { DashboardGrabHandleService } from './grab-handle.service';

@Directive({
    selector: '[uxDashboardGrabHandle]',
    exportAs: 'ux-dashboard-grab-handle'
})
export class DashboardGrabHandleDirective implements OnInit, OnDestroy {

    /** Specify whether or not this handle can be used to perform moving */
    @Input() uxGrabAllowMove: boolean = true;

    /** Specify whether or not this handle can be used to perform resizing */
    @Input() uxGrabAllowResize: boolean = true;

    /** The aria label for the grab handle */
    @Input() uxGrabAriaLabel: (widget: DashboardWidgetComponent) => string | string = this.getDefaultAriaLabel.bind(this);

    /** Customize the announcement that is made whenever an item has successfully been moved or resized */
    @Input() uxGrabChangeSuccessAnnouncement: (widget: DashboardWidgetComponent, differences: DashboardLayoutDiff[]) => string | string = this.getChangeSuccessAnnouncement.bind(this);

    /** Customize the announcement that is made whenever an item enters 'grab' mode */
    @Input() uxGrabStartAnnouncement: (widget: DashboardWidgetComponent) => string | string = this.getStartAnnouncement.bind(this);

    /** Customize the announcement thqt is made whenever an item cannot be moved */
    @Input() uxGrabMoveFailAnnouncement: (widget: DashboardWidgetComponent, direction: ActionDirection) => string | string = this.getMoveFailAnnouncement.bind(this);

    /** Customize the announcement thqt is made whenever an item cannot be resized */
    @Input() uxGrabResizeFailAnnouncement: (widget: DashboardWidgetComponent, direction: ActionDirection) => string | string = this.getResizeFailAnnouncement.bind(this);

    /** Customize the announcement made whenever the moving/resizing is commited */
    @Input() uxGrabConfirmAnnouncement: (widget: DashboardWidgetComponent) => string | string = this.getConfirmAnnouncement.bind(this);

    /** Customize the announcement made whenever the moving/resizing is cancelled */
    @Input() uxGrabCancelAnnouncement: (widget: DashboardWidgetComponent) => string | string = this.getCancellationAnnouncement.bind(this);

    /** Binding for the grab handle aria label */
    @HostBinding('attr.aria-label') ariaLabel: string;

    /** We must programmatically control the focus of the drag handles */
    @HostBinding('tabIndex') tabIndex: number = -1;

    /** Store the current dragging state */
    isGrabbing: boolean = false;

    /** Store the current layout when we enter 'grab' mode */
    private _cache: DashboardCache[];

    /** Store the layout after the most recent successful move or resize */
    private _lastMovement: DashboardCache[];

    /** Emit when the directive is destroyed to unsubscribe from all observables */
    private _onDestroy = new Subject<void>();

    constructor(
        public widget: DashboardWidgetComponent,
        private _dashboard: DashboardService,
        private _handle: DashboardGrabHandleService,
        private _elementRef: ElementRef,
        private _announcer: LiveAnnouncer) {

        if (!widget) {
            throw new Error('uxDashboardGrabHandle must be used within a dashboard widget');
        }

        // subscribe to changes to the current grab state
        _dashboard.isGrabbing$.pipe(takeUntil(this._onDestroy), map(_widget => _widget === widget))
            .subscribe(isGrabbing => this.isGrabbing = isGrabbing);
    }

    /** Set the initial aria label and subscribe to layout changes */
    ngOnInit(): void {

        if (!this.widget.name) {
            console.warn(`Dashboard widget ${this.widget.id} must have a valid 'name' to use uxDashboardGrabHandle`);
        }

        // set the initial aria label
        this.ariaLabel = this.getAnnouncement(this.uxGrabAriaLabel);

        // update the aria label when layout changes occur
        this._dashboard.layout$.pipe(takeUntil(this._onDestroy))
            .subscribe(() => this.ariaLabel = this.getAnnouncement(this.uxGrabAriaLabel));
    }

    /** Unsubscribe from all observables */
    ngOnDestroy(): void {
        this._onDestroy.next();
        this._onDestroy.complete();
    }

    /** Begin drag mode and cache initial state */
    enableDragMode(): void {
        if (!this.isGrabbing) {

            // cache the widgets so we can restore when escape is pressed
            this._cache = this._lastMovement = this._dashboard.cacheWidgets();

            // store the current widget being grabbed
            this._dashboard.isGrabbing$.next(this.widget);

            // announce the grab start
            this._announcer.announce(this.getAnnouncement(this.uxGrabStartAnnouncement));
        }
    }

    /** Finish drag mode and commit the current state */
    disableDragMode(): void {
        if (this.isGrabbing) {
            this._dashboard.isGrabbing$.next(null);

            // announce the confirmation
            this._announcer.announce(this.getAnnouncement(this.uxGrabConfirmAnnouncement));
        }
    }

    /** Finish the drag mode and restore the original state */
    cancelDragMode(): void {
        if (this.isGrabbing) {
            this._dashboard.restoreWidgets(false, this._cache, true);
            this._dashboard.setDashboardHeight();
            this._dashboard.layout$.next(this._dashboard.getLayoutData());
            this._dashboard.isGrabbing$.next(null);

            // announce the cancellation
            this._announcer.announce(this.getAnnouncement(this.uxGrabCancelAnnouncement));
        }
    }

    /** Toggle the drag mode state */
    toggleDragMode(): void {
        this.isGrabbing ? this.disableDragMode() : this.enableDragMode();
    }

    /** Set the tab index and optionally focus the DOM element */
    focus(focusElement: boolean = true): void {
        this.tabIndex = 0;

        if (focusElement) {
            this._elementRef.nativeElement.focus();
        }
    }

    /** Make this item non-tabbable */
    blur(): void {
        this.tabIndex = -1;
    }

    /** When the grab handle loses focus then exit 'grab' mode */
    @HostListener('blur')
    onBlur(): void {
        this.disableDragMode();
    }

    /** Handle key events */
    @HostListener('keydown', ['$event', '$event.which', '$event.ctrlKey'])
    onKeydown(event: KeyboardEvent, key: number, ctrlKey: boolean): void {

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
                } else {
                    this.moveFocus(event, key);
                }
        }
    }

    /** Get an announcement from the inputs - they may be a string or a function so handle both */
    getAnnouncement(announcement: Function | string, ...args: any[]): string {
        return typeof announcement === 'function' ? announcement(this.widget, ...args) : announcement;
    }

    /** Move the widget in a given direction based on arrow keys */
    private moveWidget(event: KeyboardEvent, key: number): void {

        // check if moving is allowed
        if (!this.widget.isDraggable || !this.uxGrabAllowMove) {
            return;
        }

        // attempt to perform the move
        this._dashboard.onShift(this.widget, this.getDirectionFromKey(key));

        // get the announcable diff
        const changes = this.getLayoutDiff();

        // if there were changes then announce them
        if (changes.length > 0) {
            this._announcer.announce(this.getAnnouncement(this.uxGrabChangeSuccessAnnouncement, changes));
        } else {
            this._announcer.announce(this.getAnnouncement(this.uxGrabMoveFailAnnouncement, this.getDirectionFromKey(key)));
        }

        // store the current layout
        this._lastMovement = this._dashboard.cacheWidgets();

        event.preventDefault();
        event.stopPropagation();
    }

    /** Resize the widgets accordingly based on the arrow keys */
    private resizeWidget(event: KeyboardEvent, key: number): void {

        // check if resizing is allowed
        if (!this.widget.resizable || !this.uxGrabAllowResize) {
            return;
        }

        this._dashboard.onResize(this.widget, this.getDirectionFromKey(key));

        // get the announcable diff
        const changes = this.getLayoutDiff();

        // if there were changes then announce them
        if (changes.length > 0) {
            this._announcer.announce(this.getAnnouncement(this.uxGrabChangeSuccessAnnouncement, changes));
        } else {
            this._announcer.announce(this.getAnnouncement(this.uxGrabResizeFailAnnouncement, this.getDirectionFromKey(key)));
        }

        // store the current layout
        this._lastMovement = this._dashboard.cacheWidgets();

        event.preventDefault();
        event.stopPropagation();
    }

    /** Shift focus between the variour grab handles */
    private moveFocus(event: KeyboardEvent, key: number): void {

        switch (key) {

            case UP_ARROW:
                this._handle.setSiblingItemFocus(this.widget, ActionDirection.Top);
                break;

            case RIGHT_ARROW:
                this._handle.setNextItemFocus();
                break;

            case DOWN_ARROW:
                this._handle.setSiblingItemFocus(this.widget, ActionDirection.Bottom);
                break;

            case LEFT_ARROW:
                this._handle.setPreviousItemFocus();
                break;
        }

        event.preventDefault();
        event.stopPropagation();
    }

    /** Convert an arrow key code into an ActionDirection enum */
    private getDirectionFromKey(key: number): ActionDirection {
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

    /** Supply the default grab handle aria label based on the provided constraints */
    private getDefaultAriaLabel(widget: DashboardWidgetComponent): string {
        if (widget.resizable && this.uxGrabAllowResize && widget.isDraggable && this.uxGrabAllowMove) {
            return `Press space to move and resize the ${widget.name} panel.`;
        } else if (widget.resizable && this.uxGrabAllowResize) {
            return `Press space to resize the ${widget.name} panel.`;
        } else if (widget.isDraggable && this.uxGrabAllowMove) {
            return `Press space to move the ${widget.name} panel.`;
        }
    }

    /** Get the default announcement whenever a movement or resize was successful */
    private getChangeSuccessAnnouncement(widget: DashboardWidgetComponent, differences: DashboardLayoutDiff[]): string {

        // map the differences to strings
        const announcements = differences.map(diff => {

            const changes: string[] = [];

            // Handle movement strings
            if (diff.isMovedHorizontally && diff.isMovedVertically) {
                changes.push(`moved to row ${diff.currentRow}, column ${diff.currentColumn}`);
            } else if (diff.isMovedDown) {
                changes.push(`moved down to row ${diff.currentRow}, column ${diff.currentColumn}`);
            } else if (diff.isMovedUp) {
                changes.push(`moved up to row ${diff.currentRow}, column ${diff.currentColumn}`);
            } else if (diff.isMovedLeft) {
                changes.push(`moved left to row ${diff.currentRow}, column ${diff.currentColumn}`);
            } else if (diff.isMovedRight) {
                changes.push(`moved right to row ${diff.currentRow}, column ${diff.currentColumn}`);
            }

            // handle resize strings
            if (diff.isResized) {
                changes.push(`resized to ${diff.currentColumnSpan} columns wide and ${diff.currentRowSpan} rows high`);
            }

            return `${diff.widget.name} panel is ${changes.join(' and ')}.`;
        });

        return `${announcements.join(' ')} Use the cursor keys to continue moving and resizing, enter to commit, or escape to cancel.`;
    }

    /** Get the default announcement whenever a movement is not possible due to dashboard boundaries */
    private getMoveFailAnnouncement(widget: DashboardWidgetComponent, direction: ActionDirection): string {

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

    /** Get the default announcement whenever a resize is not possible due to either widget constraints of dashboard bounds */
    private getResizeFailAnnouncement(widget: DashboardWidgetComponent, direction: ActionDirection): string {
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

    /** Get the default announcement whenever we enter 'grab' mode */
    private getStartAnnouncement(widget: DashboardWidgetComponent): string {
        if (widget.isDraggable && widget.resizable && this.uxGrabAllowMove && this.uxGrabAllowResize) {
            return `${widget.name} panel is currently on row ${widget.getRow()}, column ${widget.getColumn()} and is ${widget.getColumnSpan()} columns wide and ${widget.getRowSpan()} rows high. Use the cursor keys to move the widget and the cursor keys with the control modifier to resize the widget. Press enter to commit changes and press escape to cancel changes.`;
        } else if (widget.isDraggable && this.uxGrabAllowMove) {
            return `${widget.name} panel is currently on row ${widget.getRow()}, column ${widget.getColumn()}. Use the cursor keys to move the widget. Press enter to commit changes and press escape to cancel changes.`;
        } else if (widget.resizable && this.uxGrabAllowResize) {
            return `${widget.name} panel is currently on row ${widget.getRow()}, column ${widget.getColumn()} and is ${widget.getColumnSpan()} columns wide and ${widget.getRowSpan()} rows high. Use the cursor keys with the control modifier to resize the widget. Press enter to commit changes and press escape to cancel changes.`;
        }
    }

    /** Get the default announcement whenever grab mode is exited after a movement or resize */
    private getConfirmAnnouncement(widget: DashboardWidgetComponent): string {
        if (widget.isDraggable && widget.resizable && this.uxGrabAllowMove && this.uxGrabAllowResize) {
            return `Moving and resizing complete. ${this.getDashboardAriaLabel()}. ${this.getAnnouncement(this.uxGrabAriaLabel)}`;
        } else if (widget.isDraggable && this.uxGrabAllowMove) {
            return `Moving complete. ${this.getDashboardAriaLabel()} ${this.getAnnouncement(this.uxGrabAriaLabel)}`;
        } else if (widget.resizable && this.uxGrabAllowResize) {
            return `Resizing complete. ${this.getDashboardAriaLabel()} ${this.getAnnouncement(this.uxGrabAriaLabel)}`;
        }
    }

    /** Get the default announcement whenever grab mode is exited after being cancelled */
    private getCancellationAnnouncement(widget: DashboardWidgetComponent): string {
        if (widget.isDraggable && widget.resizable && this.uxGrabAllowMove && this.uxGrabAllowResize) {
            return `Moving and resizing cancelled. ${this.getDashboardAriaLabel()}. ${this.getAnnouncement(this.uxGrabAriaLabel)}`;
        } else if (widget.isDraggable && this.uxGrabAllowMove) {
            return `Moving cancelled. ${this.getDashboardAriaLabel()} ${this.getAnnouncement(this.uxGrabAriaLabel)}`;
        } else if (widget.resizable && this.uxGrabAllowResize) {
            return `Resizing cancelled. ${this.getDashboardAriaLabel()} ${this.getAnnouncement(this.uxGrabAriaLabel)}`;
        }
    }

    /** Get a description of all dashboard widgets, their positions and sizes */
    private getDashboardAriaLabel(): string {
        return `Dashboard with ${this._dashboard.options.columns} columns, containing ${this._dashboard.widgets.length} panels. ${this._dashboard.widgets.map(this.getWidgetAriaLabel).join(' ')}`;
    }

    /** Get a description of a given widget */
    private getWidgetAriaLabel(widget: DashboardWidgetComponent): string {
        return `${widget.name} panel in row ${widget.getRow()}, column ${widget.getColumn()}, is ${widget.getColumnSpan()} columns wide and ${widget.getRowSpan()} rows high.`;
    }

    /** Get an object describing all the changes that have been made to all widgets since the last change */
    private getLayoutDiff(): DashboardLayoutDiff[] {

        // find all changes
        const diffs = this._dashboard.getLayoutData().map(layout => {

            // get the most recent cache
            const cache = this._lastMovement || this._cache;

            // get the actual widget
            const widget = this._dashboard.widgets.find(_widget => _widget.id === layout.id);

            // get previous position
            const previousLayout = cache.find(_widget => _widget.id === layout.id);

            return {
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
            } as DashboardLayoutDiff;
        });

        // get the order the widgets appear visually
        const order = this._handle.getHandlesInOrder().map(handle => handle.widget);

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

export interface DashboardLayoutDiff {
    widget: DashboardWidgetComponent;
    previousColumn: number;
    currentColumn: number;
    previousRow: number;
    currentRow: number;
    previousColumnSpan: number;
    currentColumnSpan: number;
    previousRowSpan: number;
    currentRowSpan: number;
    isMovedLeft: boolean;
    isMovedRight: boolean;
    isMovedUp: boolean;
    isMovedDown: boolean;
    isMovedHorizontally: boolean;
    isMovedVertically: boolean;
    isResized: boolean;
    isMoved: boolean;
}