import { ChangeDetectionStrategy, Component, ElementRef, Input, OnDestroy, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { HierarchyBarNodeComponent } from '../hierarchy-bar-node/hierarchy-bar-node.component';
import { HierarchyBarService } from '../hierarchy-bar.service';
import { HierarchyBarNode } from '../interfaces/hierarchy-bar-node.interface';

@Component({
    selector: 'ux-hierarchy-bar-standard',
    templateUrl: './hierarchy-bar-standard.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HierarchyBarStandardComponent implements OnDestroy {
    /** Determine the mode of the hierarchy bar */
    @Input() mode: string;

    /** Determine read only state */
    @Input() readonly: boolean;

    /** Get the elementRef of the node list */
    @ViewChild('nodelist', { static: true }) nodelist: ElementRef<HTMLDivElement>;

    /** Get elementRefs for all the nodes */
    @ViewChildren(HierarchyBarNodeComponent, { read: ElementRef }) nodes: QueryList<ElementRef>;

    /** Get instances for all the nodes */
    @ViewChildren(HierarchyBarNodeComponent) nodeInstances: QueryList<HierarchyBarNodeComponent>;

    @ViewChildren('barNodes', { read: ElementRef }) barNodes: QueryList<ElementRef>;

    /** Value in pixels to translate the visible nodes by to fill the empty space occupied by hidden nodes */
    overflowTranslateOffset = 0;

    /** Identify which nodes are overflowing */
    overflow$ = new BehaviorSubject<HierarchyBarNode[]>([]);

    /** Determine if there is any overflow */
    isOverflowing$ = new BehaviorSubject<boolean>(false);

    /** Unsubscribe from all subscriptions when component is destroyed */
    private _onDestroy = new Subject<void>();

    constructor(public readonly hierarchyBar: HierarchyBarService) {
        // subscribe to changes in the selected node - update the UI after the render
        hierarchyBar.nodes$
            .pipe(takeUntil(this._onDestroy))
            .subscribe(() => requestAnimationFrame(this.scrollIntoView.bind(this)));
    }

    ngOnDestroy(): void {
        this._onDestroy.next();
        this._onDestroy.complete();
    }

    /**
     * When there is overflow ensure that the rightmost
     * node remains in view at all times. The nodes no longer
     * visible should be displayed in a popover available on the
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

        // we don't need to do anything else if there is no overflow
        if (!isOverflowing) {
            this.nodeInstances.forEach((node) => (node.visible = true));
            this.overflowTranslateOffset = 0;
            return;
        }

        let isFull: boolean = false;

        // find the nodes that should be visible (we start at the rightmost node)
        const nodes = this.nodeInstances.toArray().reduceRight<HierarchyBarNodeComponent[]>((visibleNodes, node) => {
            // there must always be one visible node
            if (visibleNodes.length === 0) {
                return [node];
            }

            // if the hierarchy bar is already occupying the available space then we can skip calculations
            if (isFull) {
                // hide the node
                node.visible = false;
                return visibleNodes;
            }

            // get the cumulative width of all the visible nodes
            const consumedWidth = visibleNodes.reduce((totalWidth, visibleNode) => totalWidth + visibleNode.width, 0);

            // get the width that would be consumed if this node was included
            const width = node.width + consumedWidth;
            isFull = width > nativeElement.offsetWidth;
            node.visible = !isFull;

            if (isFull) {
                this.overflowTranslateOffset = this.nodelist.nativeElement.clientWidth - consumedWidth;
            }

            return isFull ? visibleNodes : [...visibleNodes, node];
        }, []);

        if (nodes.length === 1 && this.nodelist.nativeElement.offsetWidth < nodes[0].width) {
            this.overflowTranslateOffset = 0;
        }

        // move the scroll position to always show the last item
        this.nodelist.nativeElement.scrollLeft = nativeElement.scrollWidth - nativeElement.offsetWidth;

        // determine which nodes should be hidden
        const nodesHidden = this.nodeInstances.filter(node => {
            return !node.visible;
        });
        this.overflow$.next(nodesHidden.map(node => node.node));
    }
}
