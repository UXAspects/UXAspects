import { ElementRef, EventEmitter, OnDestroy, QueryList, TemplateRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HierarchyBarNode, HierarchyBarService } from './hierarchy-bar.service';
export declare class HierarchyBarComponent implements OnDestroy {
    hierarchyBar: HierarchyBarService;
    root: HierarchyBarNode;
    selected: HierarchyBarNode;
    loadingIndicator: TemplateRef<any>;
    selectedChange: EventEmitter<HierarchyBarNode>;
    nodelist: ElementRef;
    nodes: QueryList<ElementRef>;
    overflow$: BehaviorSubject<boolean>;
    overflowNodes$: BehaviorSubject<HierarchyBarNode[]>;
    private _subscription;
    constructor(hierarchyBar: HierarchyBarService);
    ngOnDestroy(): void;
    /**
     * When there is overflow ensure that the rightmost
     * node remains in view at all times. The nodes no longer
     * visible be be displayed in a popover available on the
     * overflow indicator
     */
    scrollIntoView(): void;
}
