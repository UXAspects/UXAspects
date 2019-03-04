import { Injectable, OnDestroy } from '@angular/core';
import { filter, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { ActionDirection, DashboardService } from '../dashboard.service';
import { DashboardWidgetComponent } from '../widget/dashboard-widget.component';
import { DashboardGrabHandleDirective } from './grab-handle.directive';

@Injectable()
export class DashboardGrabHandleService implements OnDestroy {

    /** Self-registered drag handles in the dashboard. */
    private _handles: DashboardGrabHandleDirective[] = [];

    /** Automatically unsubscribe from all observables when destroyed */
    private _onDestroy = new Subject<void>();

    constructor(private _dashboard: DashboardService) {

        // if a drag is performed by the mouse we should update the focusable item to be the first again
        _dashboard.layout$.pipe(takeUntil(this._onDestroy), filter(() => !this._dashboard.isGrabbing$.value))
            .subscribe(() => this.setFirstItemFocusable());
    }

    /** Perform unsubscriptions */
    ngOnDestroy(): void {
        this._onDestroy.next();
        this._onDestroy.complete();
    }

    /** Register a new grab handle. */
    addHandle(handle: DashboardGrabHandleDirective): void {
        this._handles = this.getHandlesInOrder([...this._handles, handle]);

        // we want to make the first item focusable (raf to avoid expression changed error)
        requestAnimationFrame(() => this.ensureFocusable());
    }

    /** Unregister a removed grab handle. */
    removeHandle(handle: DashboardGrabHandleDirective): void {
        this._handles = this._handles.filter(h => h !== handle);

        // Make sure there is still a focusable handle
        this.ensureFocusable();
    }

    /** Make the first visual item in the list focusable */
    setFirstItemFocusable(): void {
        this.setItemFocus(0, false);
    }

    /** Set an item at a given index focused */
    setItemFocus(index: number, focusElement: boolean = true): void {

        // if the list is empty then do nothing
        if (!this._handles || this._handles.length === 0) {
            return;
        }

        // check if the index is out of bounds
        if (index < 0) {
            return this.setItemFocus(0);
        }

        if (index > this._handles.length - 1) {
            return this.setItemFocus(this._handles.length - 1);
        }

        // try focusing a specific index
        this.getHandlesInOrder().forEach((handle, idx) => idx === index ? handle.focus(focusElement) : handle.blur());

        // for safety we want to ensure one of the items is definitely still focusabled
        this.ensureFocusable();
    }

    /** Focus the previous grab handle */
    setPreviousItemFocus(handle: DashboardGrabHandleDirective): void {
        this.setItemFocus(this.getHandleIndex(handle) - 1);
    }

    /** Focus the next grab handle */
    setNextItemFocus(handle: DashboardGrabHandleDirective): void {
        this.setItemFocus(this.getHandleIndex(handle) + 1);
    }

    /** Focus the grab handle on the widget above */
    setSiblingItemFocus(widget: DashboardWidgetComponent, direction: ActionDirection): void {

        // find all widgets that are directly above and have grab handles
        const target = this._dashboard.getSurroundingWidgets(widget, direction)
            .map(_widget => this._handles.find(handle => handle.widget === _widget))
            .filter(handle => !!handle)
            .reduce((handle, current) => !handle || current.widget.getColumn() > handle.widget.getColumn() ? current : handle, null);

        // ensure we have a target before focusing
        if (!target) {
            return;
        }

        // get the index of the target handle
        const index = this.getHandleIndex(target);

        // focus the item
        this.setItemFocus(index);
    }

    /** Get handles in the order they appear rather than the order they are in the DOM */
    getHandlesInOrder(handles = this._handles): DashboardGrabHandleDirective[] {
        const widgets = this._dashboard.getWidgetsByOrder();

        // sort the handles according to the position of the widget it belongs to
        return handles.sort((handleOne, handleTwo) => widgets.indexOf(handleOne.widget) - widgets.indexOf(handleTwo.widget));
    }

    private getHandleIndex(handle: DashboardGrabHandleDirective): number {
        return this.getHandlesInOrder().findIndex(_handle => _handle === handle);
    }

    /** If the current focusable handle is removed we need to make another one focusable */
    private ensureFocusable(): void {
        if (!this._handles.find(handle => handle.tabIndex === 0)) {
            this.setFirstItemFocusable();
        }
    }

}