import { LiveAnnouncer } from '@angular/cdk/a11y';
import { ElementRef, OnDestroy, OnInit } from '@angular/core';
import { ActionDirection, DashboardService } from '../dashboard.service';
import { DashboardWidgetComponent } from '../widget/dashboard-widget.component';
import { DashboardGrabHandleService } from './grab-handle.service';
export declare class DashboardGrabHandleDirective implements OnInit, OnDestroy {
    widget: DashboardWidgetComponent;
    private _dashboard;
    private _handle;
    private _elementRef;
    private _announcer;
    /** Specify whether or not this handle can be used to perform moving */
    uxGrabAllowMove: boolean;
    /** Specify whether or not this handle can be used to perform resizing */
    uxGrabAllowResize: boolean;
    /** The aria label for the grab handle */
    uxGrabAriaLabel: (widget: DashboardWidgetComponent) => string | string;
    /** Customize the announcement that is made whenever an item has successfully been moved or resized */
    uxGrabChangeSuccessAnnouncement: (widget: DashboardWidgetComponent, differences: DashboardLayoutDiff[]) => string | string;
    /** Customize the announcement that is made whenever an item enters 'grab' mode */
    uxGrabStartAnnouncement: (widget: DashboardWidgetComponent) => string | string;
    /** Customize the announcement thqt is made whenever an item cannot be moved */
    uxGrabMoveFailAnnouncement: (widget: DashboardWidgetComponent, direction: ActionDirection) => string | string;
    /** Customize the announcement thqt is made whenever an item cannot be resized */
    uxGrabResizeFailAnnouncement: (widget: DashboardWidgetComponent, direction: ActionDirection) => string | string;
    /** Customize the announcement made whenever the moving/resizing is commited */
    uxGrabConfirmAnnouncement: (widget: DashboardWidgetComponent) => string | string;
    /** Customize the announcement made whenever the moving/resizing is cancelled */
    uxGrabCancelAnnouncement: (widget: DashboardWidgetComponent) => string | string;
    /** Binding for the grab handle aria label */
    ariaLabel: string;
    /** We must programmatically control the focus of the drag handles */
    tabIndex: number;
    /** Store the current dragging state */
    isGrabbing: boolean;
    /** Store the current layout when we enter 'grab' mode */
    private _cache;
    /** Store the layout after the most recent successful move or resize */
    private _lastMovement;
    /** Emit when the directive is destroyed to unsubscribe from all observables */
    private _onDestroy;
    constructor(widget: DashboardWidgetComponent, _dashboard: DashboardService, _handle: DashboardGrabHandleService, _elementRef: ElementRef, _announcer: LiveAnnouncer);
    /** Set the initial aria label and subscribe to layout changes */
    ngOnInit(): void;
    /** Unsubscribe from all observables */
    ngOnDestroy(): void;
    /** Begin drag mode and cache initial state */
    enableDragMode(): void;
    /** Finish drag mode and commit the current state */
    disableDragMode(): void;
    /** Finish the drag mode and restore the original state */
    cancelDragMode(): void;
    /** Toggle the drag mode state */
    toggleDragMode(): void;
    /** Set the tab index and optionally focus the DOM element */
    focus(focusElement?: boolean): void;
    /** Make this item non-tabbable */
    blur(): void;
    /** When the grab handle loses focus then exit 'grab' mode */
    onBlur(): void;
    /** Handle key events */
    onKeydown(event: KeyboardEvent, key: number, ctrlKey: boolean): void;
    /** Get an announcement from the inputs - they may be a string or a function so handle both */
    getAnnouncement(announcement: Function | string, ...args: any[]): string;
    /** Move the widget in a given direction based on arrow keys */
    private moveWidget(event, key);
    /** Resize the widgets accordingly based on the arrow keys */
    private resizeWidget(event, key);
    /** Shift focus between the variour grab handles */
    private moveFocus(event, key);
    /** Convert an arrow key code into an ActionDirection enum */
    private getDirectionFromKey(key);
    /** Supply the default grab handle aria label based on the provided constraints */
    private getDefaultAriaLabel(widget);
    /** Get the default announcement whenever a movement or resize was successful */
    private getChangeSuccessAnnouncement();
    private getDiffAnnouncements();
    /** Get the default announcement whenever a movement is not possible due to dashboard boundaries */
    private getMoveFailAnnouncement(widget, direction);
    /** Get the default announcement whenever a resize is not possible due to either widget constraints of dashboard bounds */
    private getResizeFailAnnouncement(widget, direction);
    /** Get the default announcement whenever we enter 'grab' mode */
    private getStartAnnouncement(widget);
    /** Get the default announcement whenever grab mode is exited after a movement or resize */
    private getConfirmAnnouncement(widget);
    /** Get the default announcement whenever grab mode is exited after being cancelled */
    private getCancellationAnnouncement(widget);
    /** Get a description of all dashboard widgets, their positions and sizes */
    private getDashboardAriaLabel();
    /** Get a description of a given widget */
    private getWidgetAriaLabel(widget);
    /** Get an object describing all the changes that have been made to all widgets since the last change */
    private getLayoutDiff();
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
