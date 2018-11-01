import { LiveAnnouncer } from '@angular/cdk/a11y';
import { DOWN_ARROW, ENTER, ESCAPE, LEFT_ARROW, RIGHT_ARROW, SPACE, UP_ARROW } from '@angular/cdk/keycodes';
import { Directive, ElementRef, EventEmitter, HostBinding, HostListener, Input, OnDestroy, OnInit, Output } from '@angular/core';
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

    @Input() uxGrabAllowMove: boolean = true;
    @Input() uxGrabAllowResize: boolean = true;

    @Input('aria-label') uxGrabAriaLabel: (widget: DashboardWidgetComponent) => string | string = this.getDefaultAriaLabel.bind(this);

    @Input() uxGrabChangeSuccessAnnouncement: (widget: DashboardWidgetComponent, differences: DashboardLayoutDiff[]) => string | string = this.getChangeSuccessAnnouncement.bind(this);
    @Input() uxGrabStartAnnouncement: (widget: DashboardWidgetComponent) => string | string = this.getStartAnnouncement.bind(this);
    @Input() uxGrabMoveFailAnnouncement: (widget: DashboardWidgetComponent, direction: ActionDirection) => string | string = this.getMoveFailAnnouncement.bind(this);
    @Input() uxGrabResizeFailAnnouncement: (widget: DashboardWidgetComponent, direction: ActionDirection) => string | string = this.getResizeFailAnnouncement.bind(this);
    @Input() uxGrabConfirmAnnouncement: (widget: DashboardWidgetComponent) => string | string = this.getConfirmAnnouncement.bind(this);
    @Input() uxGrabCancelAnnouncement: (widget: DashboardWidgetComponent) => string | string = this.getCancellationAnnouncement.bind(this);

    @Output() uxGrabStart = new EventEmitter<void>();
    @Output() uxGrabEnd = new EventEmitter<void>();
    @Output() uxGrabCancel = new EventEmitter<void>();

    @HostBinding('attr.aria-label') ariaLabel: string;
    @HostBinding('tabIndex') tabIndex: number = -1;

    isGrabbing: boolean = false;

    private _cache: DashboardCache[];
    private _lastMovement: DashboardCache[];
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

            // emit the grab start event
            this.uxGrabStart.emit();

            // announce the grab start
            this._announcer.announce(this.getAnnouncement(this.uxGrabStartAnnouncement));
        }
    }

    /** Finish drag mode and commit the current state */
    disableDragMode(): void {
        if (this.isGrabbing) {
            this._dashboard.isGrabbing$.next(null);
            this.uxGrabEnd.emit();

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
            this.uxGrabCancel.emit();

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

    @HostListener('blur')
    onBlur(): void {
        this.disableDragMode();
    }

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

    private moveWidget(event: KeyboardEvent, key: number): void {

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

    private resizeWidget(event: KeyboardEvent, key: number): void {
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

    private moveFocus(event: KeyboardEvent, key: number): void {
        if (key === UP_ARROW || key === LEFT_ARROW) {
            this._handle.setPreviousItemFocus();
        }

        if (key === DOWN_ARROW || key === RIGHT_ARROW) {
            this._handle.setNextItemFocus();
        }

        event.preventDefault();
        event.stopPropagation();
    }

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

    getAnnouncement(announcement: Function | string, ...args: any[]): string {
        return typeof announcement === 'function' ? announcement(this.widget, ...args) : announcement;
    }

    private getDefaultAriaLabel(widget: DashboardWidgetComponent): string {
        if (widget.resizable && this.uxGrabAllowResize && widget.isDraggable && this.uxGrabAllowMove) {
            return `Press space to move and resize the ${widget.name} panel.`;
        } else if (widget.resizable && this.uxGrabAllowResize) {
            return `Press space to resize the ${widget.name} panel.`;
        } else if (widget.isDraggable && this.uxGrabAllowMove) {
            return `Press space to move the ${widget.name} panel.`;
        }
    }

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

            return `${widget.name} panel is ${changes.join(' and ')}.`;
        });

        return `${announcements.join(' ')} Use the cursor keys to continue moving and resizing, enter to commit, or escape to cancel.`;
    }

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

    private getStartAnnouncement(widget: DashboardWidgetComponent): string {
        if (widget.isDraggable && widget.resizable && this.uxGrabAllowMove && this.uxGrabAllowResize) {
            return `${widget.name} panel is currently on row ${widget.getRow()}, column ${widget.getColumn()} and is ${widget.getColumnSpan()} columns wide and ${widget.getRowSpan()} rows high. Use the cursor keys to move the widget and the cursor keys with the control modifier to resize the widget. Press enter to commit changes and press escape to cancel changes.`;
        } else if (widget.isDraggable && this.uxGrabAllowMove) {
            return `${widget.name} panel is currently on row ${widget.getRow()}, column ${widget.getColumn()}. Use the cursor keys to move the widget. Press enter to commit changes and press escape to cancel changes.`;
        } else if (widget.resizable && this.uxGrabAllowResize) {
            return `${widget.name} panel is currently on row ${widget.getRow()}, column ${widget.getColumn()} and is ${widget.getColumnSpan()} columns wide and ${widget.getRowSpan()} rows high. Use the cursor keys with the control modifier to resize the widget. Press enter to commit changes and press escape to cancel changes.`;
        }
    }

    private getConfirmAnnouncement(widget: DashboardWidgetComponent): string {
        if (widget.isDraggable && widget.resizable && this.uxGrabAllowMove && this.uxGrabAllowResize) {
            return `Moving and resizing complete. ${this.getDashboardAriaLabel()}. ${this.getAnnouncement(this.uxGrabAriaLabel)}`;
        } else if (widget.isDraggable && this.uxGrabAllowMove) {
            return `Moving complete. ${this.getDashboardAriaLabel()} ${this.getAnnouncement(this.uxGrabAriaLabel)}`;
        } else if (widget.resizable && this.uxGrabAllowResize) {
            return `Resizing complete. ${this.getDashboardAriaLabel()} ${this.getAnnouncement(this.uxGrabAriaLabel)}`;
        }
    }

    private getCancellationAnnouncement(widget: DashboardWidgetComponent): string {
        if (widget.isDraggable && widget.resizable && this.uxGrabAllowMove && this.uxGrabAllowResize) {
            return `Moving and resizing cancelled. ${this.getDashboardAriaLabel()}. ${this.getAnnouncement(this.uxGrabAriaLabel)}`;
        } else if (widget.isDraggable && this.uxGrabAllowMove) {
            return `Moving cancelled. ${this.getDashboardAriaLabel()} ${this.getAnnouncement(this.uxGrabAriaLabel)}`;
        } else if (widget.resizable && this.uxGrabAllowResize) {
            return `Resizing cancelled. ${this.getDashboardAriaLabel()} ${this.getAnnouncement(this.uxGrabAriaLabel)}`;
        }
    }

    private getDashboardAriaLabel(): string {
        return `Dashboard with ${this._dashboard.options.columns} columns, containing ${this._dashboard.widgets.length} panels. ${this._dashboard.widgets.map(this.getWidgetAriaLabel).join(' ')}`;
    }

    private getWidgetAriaLabel(widget: DashboardWidgetComponent): string {
        return `${widget.name} panel in row ${widget.getRow()}, column ${widget.getColumn()}, is ${widget.getColumnSpan()} columns wide and ${widget.getRowSpan()} rows high.`;
    }

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

        // only return items that have been repositioned or resized
        return diffs.filter(diff => diff.isMoved || diff.isResized);
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