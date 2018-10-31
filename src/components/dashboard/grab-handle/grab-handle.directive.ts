import { Directive, ElementRef, EventEmitter, HostBinding, HostListener, Input, OnDestroy, Output } from '@angular/core';
import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { DashboardCache, DashboardService } from '../dashboard.service';
import { DashboardWidgetComponent } from '../widget/dashboard-widget.component';
import { DashboardGrabHandleService } from './grab-handle.service';

@Directive({
    selector: '[uxDashboardGrabHandle]',
    exportAs: 'ux-dashboard-grab-handle'
})
export class DashboardGrabHandleDirective implements OnDestroy {

    @Input() uxGrabAllowMove: boolean = true;
    @Input() uxGrabAllowResize: boolean = true;

    @Output() uxGrabStart = new EventEmitter<void>();
    @Output() uxGrabEnd = new EventEmitter<void>();
    @Output() uxGrabCancel = new EventEmitter<void>();

    @HostBinding('tabIndex') tabIndex: number = 0;

    isGrabbing: boolean = false;

    private _cache: DashboardCache[];
    private _onDestroy = new Subject<void>();

    constructor(
        public widget: DashboardWidgetComponent,
        private _dashboard: DashboardService,
        private _handle: DashboardGrabHandleService,
        private _elementRef: ElementRef) {

        if (!widget) {
            throw new Error('uxDashboardGrabHandle must be used within a dashboard widget');
        }

        // subscribe to changes to the current grab state
        _dashboard.isGrabbing$.pipe(takeUntil(this._onDestroy), map(_widget => _widget === widget))
            .subscribe(isGrabbing => this.isGrabbing = isGrabbing);
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
            this._cache = this._dashboard.cacheWidgets();

            // store the current widget being grabbed
            this._dashboard.isGrabbing$.next(this.widget);

            // emit the grab start event
            this.uxGrabStart.emit();
        }
    }

    /** Finish drag mode and commit the current state */
    disableDragMode(): void {
        if (this.isGrabbing) {
            this._dashboard.isGrabbing$.next(null);
            this.uxGrabEnd.emit();
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

    @HostListener('keydown.escape')
    onEscape(): void {
        this.cancelDragMode();
    }

    @HostListener('keydown.enter', ['$event'])
    @HostListener('keydown.space', ['$event'])
    @HostListener('keydown.spacebar', ['$event']) // IE
    onToggleDragMode(event: KeyboardEvent): void {
        this.toggleDragMode();
        event.preventDefault();
    }

    @HostListener('keydown.arrowup', ['$event'])
    onMoveUp(event: KeyboardEvent): void {
        this.isGrabbing && this.uxGrabAllowMove && this.widget.isDraggable ?
            this.widget.dashboardService.shiftWidgetUp(this.widget) :
            this._handle.setPreviousItemFocus();

        event.preventDefault();
    }

    @HostListener('keydown.arrowright', ['$event'])
    onMoveRight(event: KeyboardEvent): void {
        this.isGrabbing && this.uxGrabAllowMove && this.widget.isDraggable ?
            this.widget.dashboardService.shiftWidgetRight(this.widget) :
            this._handle.setNextItemFocus();

        event.preventDefault();
    }

    @HostListener('keydown.arrowdown', ['$event'])
    onMoveDown(event: KeyboardEvent): void {
        this.isGrabbing && this.uxGrabAllowMove && this.widget.isDraggable ?
            this.widget.dashboardService.shiftWidgetDown(this.widget) :
            this._handle.setNextItemFocus();

        event.preventDefault();
    }

    @HostListener('keydown.arrowleft', ['$event'])
    onMoveLeft(event: KeyboardEvent): void {
        this.isGrabbing && this.uxGrabAllowMove && this.widget.isDraggable ?
            this.widget.dashboardService.shiftWidgetLeft(this.widget) :
            this._handle.setPreviousItemFocus();

        event.preventDefault();
    }

    @HostListener('keydown.control.arrowup', ['$event'])
    onResizeUp(event: KeyboardEvent): void {
        if (this.isGrabbing && this.uxGrabAllowResize && this.widget.resizable) {
            this.widget.dashboardService.resizeWidgetUp(this.widget);
            event.preventDefault();
        }
    }

    @HostListener('keydown.control.arrowright', ['$event'])
    onResizeRight(event: KeyboardEvent): void {
        if (this.isGrabbing && this.uxGrabAllowResize && this.widget.resizable) {
            this.widget.dashboardService.resizeWidgetRight(this.widget);
            event.preventDefault();
        }
    }

    @HostListener('keydown.control.arrowdown', ['$event'])
    onResizeDown(event: KeyboardEvent): void {
        if (this.isGrabbing && this.uxGrabAllowResize && this.widget.resizable) {
            this.widget.dashboardService.resizeWidgetDown(this.widget);
            event.preventDefault();
        }
    }

    @HostListener('keydown.control.arrowleft', ['$event'])
    onResizeLeft(event: KeyboardEvent): void {
        if (this.isGrabbing && this.widget.resizable) {
            this.widget.dashboardService.resizeWidgetLeft(this.widget);
            event.preventDefault();
        }
    }
}