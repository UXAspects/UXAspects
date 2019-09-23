import { ChangeDetectionStrategy, Component, ElementRef, OnDestroy, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { HierarchyBarNodeComponent } from '../hierarchy-bar-node/hierarchy-bar-node.component';
import { HierarchyBarService } from '../hierarchy-bar.service';
import { HierarchyBarNode } from '../interfaces/hierarchy-bar-node.interface';

@Component({
    selector: 'ux-hierarchy-bar-standard',
    templateUrl: './hierarchy-bar-standard.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HierarchyBarStandardComponent implements OnDestroy {

    /** Get the elementRef of the node list */
    @ViewChild('nodelist', { static: true }) nodelist: ElementRef;

    /** Get elementRefs for all the nodes */
    @ViewChildren(HierarchyBarNodeComponent, { read: ElementRef }) nodes: QueryList<ElementRef>;

    /** Identify which nodes are overflowing */
    overflow$ = new BehaviorSubject<HierarchyBarNode[]>([]);

    /** Determine if there is any overflow */
    isOverflowing$ = new BehaviorSubject<boolean>(false);

    /** Unsubscribe from all subscriptions when component is destroyed */
    private _onDestroy = new Subject<void>();

    constructor(public readonly hierarchyBar: HierarchyBarService) {

        // subscribe to changes in the selected node - update the UI after the render
        hierarchyBar.nodes$.pipe(takeUntil(this._onDestroy))
            .subscribe(() => requestAnimationFrame(this.scrollIntoView.bind(this)));
    }

    ngOnDestroy(): void {
        this._onDestroy.next();
        this._onDestroy.complete();
    }

    /**
     * When there is overflow ensure that the rightmost
     * node remains in view at all times. The nodes no longer
     * visible be be displayed in a popover available on the
     * overflow indicator
     */
    scrollIntoView(): void {

        if (!this.nodelist) {
            return;
        }

        // get the native element
        const { nativeElement } = this.nodelist;
        const isOverflowing = nativeElement.scrollWidth > nativeElement.offsetWidth;

        // emit whether we are overflowing or not
        this.isOverflowing$.next(isOverflowing);

        // if the hierarchy bar contents do not overflow then do nothing
        if (isOverflowing) {

            // determine the amount of overflow
            const amount = nativeElement.scrollWidth - nativeElement.offsetWidth;

            // determine which nodes are not fully visible
            this.overflow$.next(
                this.nodes.filter(node => node.nativeElement.offsetLeft < amount)
                    .map((_node, index) => this.hierarchyBar.nodes$.value[index])
            );

            // move the scroll position to always show the last item
            this.nodelist.nativeElement.scrollLeft = amount;
        }
    }
}
