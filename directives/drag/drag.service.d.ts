import { OnDestroy } from '@angular/core';
import { Subject } from 'rxjs/Subject';
export declare class DragService implements OnDestroy {
    /** Emit when dragging begins */
    onDragStart: Subject<UxDragEvent>;
    /** Emit when dragging moves */
    onDrag: Subject<UxDragEvent>;
    /** Emit when dragging ends */
    onDragEnd: Subject<UxDragEvent>;
    /** Emit when the user is dragging over the drop area */
    onDropEnter: Subject<void>;
    /** Emit when the user is dragging out of the drop area */
    onDropLeave: Subject<void>;
    /** Emit when a drop occurs */
    onDrop: Subject<any>;
    /** Destroy all observables */
    ngOnDestroy(): void;
}
export declare type UxDragEvent = {
    group?: string;
    event?: MouseEvent;
    data?: any;
};
