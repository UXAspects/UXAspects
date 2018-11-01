import { Injectable, OnDestroy, QueryList } from '@angular/core';
import { filter, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { DashboardService } from '../dashboard.service';
import { DashboardGrabHandleDirective } from './grab-handle.directive';

@Injectable()
export class DashboardGrabHandleService implements OnDestroy {

    private _handles: QueryList<DashboardGrabHandleDirective>;
    private _onDestroy = new Subject<void>();

    constructor(private _dashboard: DashboardService) { }

    ngOnDestroy(): void {
        this._onDestroy.next();
        this._onDestroy.complete();
    }

    setHandles(handles: QueryList<DashboardGrabHandleDirective>): void {

        // store the grab handles
        this._handles = handles;

        // we want to make the first item focusable (raf to avoid expression changed error)
        requestAnimationFrame(() => this.setFirstItemFocusable());

        // watch for any future changes to the list of handles
        this._handles.changes.pipe(takeUntil(this._onDestroy)).subscribe(() => this.ensureFocusable());

        // if a drag is performed by the mouse we should update the focusable item to be the first again
        this._dashboard.layout$.pipe(takeUntil(this._onDestroy), filter(() => !this._dashboard.isGrabbing$.value))
            .subscribe(() => this.setFirstItemFocusable());
    }

    setFirstItemFocusable(): void {
        this.setItemFocus(0, false);
    }

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

    setPreviousItemFocus(): void {
        this.setItemFocus(this.getFocusableIndex() - 1);
    }

    setNextItemFocus(): void {
        this.setItemFocus(this.getFocusableIndex() + 1);
    }

    private getFocusableIndex(): number {
        return this.getHandlesInOrder().findIndex(handle => handle.tabIndex === 0);
    }

    /** If the current focusable handle is removed we need to make another one focusable */
    private ensureFocusable(): void {
        if (!this._handles.find(handle => handle.tabIndex === 0)) {
            this.setFirstItemFocusable();
        }
    }

    private getHandlesInOrder(): DashboardGrabHandleDirective[] {
        const widgets = this._dashboard.getWidgetsByOrder();
        const handles = this._handles.toArray();

        // sort the handles according to the position of the widget it belongs to
        return handles.sort((handleOne, handleTwo) => widgets.indexOf(handleOne.widget) - widgets.indexOf(handleTwo.widget));
    }

}