import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, OnDestroy, Output, QueryList, TemplateRef, ViewChild, ViewChildren } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs/Subscription';
import { debounceTime } from 'rxjs/operators';
import { HierarchyBarNode, HierarchyBarService } from './hierarchy-bar.service';

@Component({
    selector: 'ux-hierarchy-bar',
    templateUrl: './hierarchy-bar.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    viewProviders: [HierarchyBarService]
})
export class HierarchyBarComponent implements OnDestroy {

    @Input() set root(node: HierarchyBarNode) {
        this.hierarchyBar.setRootNode(node);
    }

    @Input() set selected(node: HierarchyBarNode) {
        this.hierarchyBar.selectNode(node);
    }

    @Input() loadingIndicator: TemplateRef<any>;

    @Output() selectedChange = new EventEmitter<HierarchyBarNode>();
    @ViewChild('nodelist') nodelist: ElementRef;
    @ViewChildren('nodeElement') nodes: QueryList<ElementRef>;

    overflow$ = new BehaviorSubject<boolean>(false);
    overflowNodes$ = new BehaviorSubject<HierarchyBarNode[]>([]);

    private _subscription = new Subscription();

    constructor(public hierarchyBar: HierarchyBarService) {

        // subscribe to changes in the selected node
        const selected = hierarchyBar.nodes$.subscribe(nodes => this.selectedChange.emit(nodes.length === 0 ? null : nodes[nodes.length - 1]));
        const changed = hierarchyBar.nodes$.pipe(debounceTime(0)).subscribe(() => this.scrollIntoView());

        // store subscriptions
        this._subscription.add(selected);
        this._subscription.add(changed);
    }

    ngOnDestroy(): void {
        this._subscription.unsubscribe();
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

        // emit whether or not there is overflow
        this.overflow$.next(nativeElement.scrollWidth > nativeElement.offsetWidth);

        // if the hierarchy bar contents do not overflow then do nothing
        if (nativeElement.scrollWidth > nativeElement.offsetWidth) {

            // determine the amount of overflow
            const overflowAmount = nativeElement.scrollWidth - nativeElement.offsetWidth;

            // determine which nodes are not fully visible
            this.overflowNodes$.next(
                this.nodes.filter(node => node.nativeElement.offsetLeft < overflowAmount)
                    .map((node, index) => this.hierarchyBar.nodes$.value[index])
            );

            // move the scroll position to always show the last itme
            this.nodelist.nativeElement.scrollLeft = overflowAmount;
        }
    }
}