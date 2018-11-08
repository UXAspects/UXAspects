import { OnDestroy, QueryList } from '@angular/core';
import { ActionDirection, DashboardService } from '../dashboard.service';
import { DashboardWidgetComponent } from '../widget/dashboard-widget.component';
import { DashboardGrabHandleDirective } from './grab-handle.directive';
export declare class DashboardGrabHandleService implements OnDestroy {
    private _dashboard;
    /** Store the querylist of all the grab handles */
    private _handles;
    /** Automatically unsubscribe from all observables when destroyed */
    private _onDestroy;
    constructor(_dashboard: DashboardService);
    /** Perform unsubscriptions */
    ngOnDestroy(): void;
    /** Provide the service with the list of grab handles */
    setHandles(handles: QueryList<DashboardGrabHandleDirective>): void;
    /** Make the first visual item in the list focusable */
    setFirstItemFocusable(): void;
    /** Set an item at a given index focused */
    setItemFocus(index: number, focusElement?: boolean): void;
    /** Focus the previous grab handle */
    setPreviousItemFocus(handle: DashboardGrabHandleDirective): void;
    /** Focus the next grab handle */
    setNextItemFocus(handle: DashboardGrabHandleDirective): void;
    /** Focus the grab handle on the widget above */
    setSiblingItemFocus(widget: DashboardWidgetComponent, direction: ActionDirection): void;
    /** Get handles in the order they appear rather than the order they are in the DOM */
    getHandlesInOrder(): DashboardGrabHandleDirective[];
    private getHandleIndex(handle);
    /** If the current focusable handle is removed we need to make another one focusable */
    private ensureFocusable();
}
