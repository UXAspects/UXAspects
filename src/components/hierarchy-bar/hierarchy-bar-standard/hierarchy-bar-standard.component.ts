import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, OnDestroy, Output, QueryList, TemplateRef, ViewChild, ViewChildren } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { OverlayTrigger } from '../../tooltip/index';
import { HierarchyBarNodeComponent } from '../hierarchy-bar-node/hierarchy-bar-node.component';
import { HierarchyBarService } from '../hierarchy-bar.service';
import { HierarchyBarNode } from '../interfaces/hierarchy-bar-node.interface';

@Component({
    selector: 'ux-hierarchy-bar-standard',
    templateUrl: './hierarchy-bar-standard.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HierarchyBarStandardComponent implements OnDestroy {

    /** Provide a custom loading indicator */
    @Input() loadingIndicator: TemplateRef<any>;

    /** Emit when the selected node changes */
    @Output() selectedChange = new EventEmitter<HierarchyBarNode>();

    /** Define the events that show the popover when interacting with the arrows */
    @Input() popoverShowTriggers: OverlayTrigger[] = ['click'];

    /** Define the events that hide the popover when interacting with the arrows */
    @Input() popoverHideTriggers: OverlayTrigger[] = ['click', 'clickoutside', 'escape'];

    /** Get the elementRef of the node list */
    @ViewChild('nodelist') nodelist: ElementRef;

    /** Get elementRefs for all the nodes */
    @ViewChildren(HierarchyBarNodeComponent, { read: ElementRef }) nodes: QueryList<ElementRef>;

    /** Identify which nodes are overflowing */
    overflow$ = new BehaviorSubject<HierarchyBarNode[]>([]);

    /** Determine if there is any overflow */
    isOverflowing$ = new BehaviorSubject<boolean>(false);

    /** Unsubscribe from all subscriptions when component is destroyed */
    private _onDestroy = new Subject<void>();

    constructor(public readonly hierarchyBar: HierarchyBarService) {

        // subscribe to changes in the selected node
        hierarchyBar.nodes$.pipe(takeUntil(this._onDestroy)).subscribe(nodes => {
            // Emit the newly selected node
            this.selectedChange.emit(nodes.length === 0 ? null : nodes[nodes.length - 1]);

            // update the UI after the render
            requestAnimationFrame(this.scrollIntoView.bind(this));
        });
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

        // emit whether we are overflowing or not
        this.isOverflowing$.next(nativeElement.scrollWidth > nativeElement.offsetWidth);

        // if the hierarchy bar contents do not overflow then do nothing
        if (nativeElement.scrollWidth > nativeElement.offsetWidth) {

            // determine the amount of overflow
            const overflowAmount = nativeElement.scrollWidth - nativeElement.offsetWidth;

            // determine which nodes are not fully visible
            this.overflow$.next(
                this.nodes.filter(node => node.nativeElement.offsetLeft < overflowAmount)
                    .map((_node, index) => this.hierarchyBar.nodes$.value[index])
            );

            // move the scroll position to always show the last item
            this.nodelist.nativeElement.scrollLeft = overflowAmount;
        }
    }
}
