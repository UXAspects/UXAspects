import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class DragService implements OnDestroy {

    /** Emit when dragging begins */
    onDragStart = new Subject<UxDragEvent>();

    /** Emit when dragging moves */
    onDrag = new Subject<UxDragEvent>();

    /** Emit when dragging ends */
    onDragEnd = new Subject<UxDragEvent>();

    /** Emit when the user is dragging over the drop area */
    onDropEnter = new Subject<void>();

    /** Emit when the user is dragging out of the drop area */
    onDropLeave = new Subject<void>();

    /** Emit when a drop occurs */
    onDrop = new Subject<any>();

    /** Destroy all observables */
    ngOnDestroy(): void {
        this.onDragStart.complete();
        this.onDrag.complete();
        this.onDragEnd.complete();
        this.onDrop.complete();
        this.onDropEnter.complete();
        this.onDropLeave.complete();
    }

}

export type UxDragEvent = { group?: string, event?: MouseEvent, data?: any };