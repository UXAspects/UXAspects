/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output, QueryList, TemplateRef, ViewChild, ViewChildren } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs/Subscription';
import { debounceTime } from 'rxjs/operators';
import { HierarchyBarService } from './hierarchy-bar.service';
export class HierarchyBarComponent {
    /**
     * @param {?} hierarchyBar
     */
    constructor(hierarchyBar) {
        this.hierarchyBar = hierarchyBar;
        this.selectedChange = new EventEmitter();
        this.overflow$ = new BehaviorSubject(false);
        this.overflowNodes$ = new BehaviorSubject([]);
        this._subscription = new Subscription();
        // subscribe to changes in the selected node
        const /** @type {?} */ selected = hierarchyBar.nodes$.subscribe(nodes => this.selectedChange.emit(nodes.length === 0 ? null : nodes[nodes.length - 1]));
        const /** @type {?} */ changed = hierarchyBar.nodes$.pipe(debounceTime(0)).subscribe(() => this.scrollIntoView());
        // store subscriptions
        this._subscription.add(selected);
        this._subscription.add(changed);
    }
    /**
     * @param {?} node
     * @return {?}
     */
    set root(node) {
        this.hierarchyBar.setRootNode(node);
    }
    /**
     * @param {?} node
     * @return {?}
     */
    set selected(node) {
        this.hierarchyBar.selectNode(node);
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._subscription.unsubscribe();
    }
    /**
     * When there is overflow ensure that the rightmost
     * node remains in view at all times. The nodes no longer
     * visible be be displayed in a popover available on the
     * overflow indicator
     * @return {?}
     */
    scrollIntoView() {
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
            const /** @type {?} */ overflowAmount = nativeElement.scrollWidth - nativeElement.offsetWidth;
            // determine which nodes are not fully visible
            this.overflowNodes$.next(this.nodes.filter(node => node.nativeElement.offsetLeft < overflowAmount)
                .map((node, index) => this.hierarchyBar.nodes$.value[index]));
            // move the scroll position to always show the last itme
            this.nodelist.nativeElement.scrollLeft = overflowAmount;
        }
    }
}
HierarchyBarComponent.decorators = [
    { type: Component, args: [{
                selector: 'ux-hierarchy-bar',
                template: `<!-- Allow content to be placed on the left of the items -->
<aside class="hierarchy-bar-addons">
    <ng-content select="[uxHierarchyBarLeftAddon]"></ng-content>
</aside>

<main #nodelist class="hierarchy-bar-nodes" (uxResize)="scrollIntoView()">

    <div *ngIf="overflow$ | async"
         #popover="ux-popover"
         class="hierarchy-bar-overflow-indicator"
         [style.left.px]="nodelist.scrollLeft"
         [uxPopover]="overflow"
         [popoverContext]="{ popover: popover }"
         placement="bottom"
         popoverClass="hierarchy-bar-popover">
        . . .
    </div>

    <div #nodeElement class="hierarchy-bar-node"
         *ngFor="let node of hierarchyBar.nodes$ | async">

        <button class="hierarchy-bar-node-content"
                [attr.aria-label]="node.title"
                (click)="hierarchyBar.selectNode(node)">

            <!-- Show an icon if specifed -->
            <img class="hierarchy-bar-node-icon" *ngIf="node.icon" [src]="node.icon" alt="Hierarchy Bar Icon">

            <!-- Show the name of the current node -->
            <span class="hierarchy-bar-node-title">{{ node.title }}</span>

        </button>

        <!-- Show a dropdown arrow if there are children -->
        <button *ngIf="node.children"
              #popover="ux-popover"
              aria-label="Show children"
              role="button"
              class="hierarchy-bar-node-arrow hpe-icon hpe-next"
              [uxPopover]="content"
              [popoverContext]="{ node: node, popover: popover }"
              placement="bottom"
              popoverClass="hierarchy-bar-popover"
              tabindex="0">
        </button>

    </div>

</main>

<!-- Allow content to be placed on the right of the items -->
<aside class="hierarchy-bar-addons">
    <ng-content select="[uxHierarchyBarRightAddon]"></ng-content>
</aside>

<!-- Template for the popover list -->
<ng-template #content let-node="node" let-popover="popover">

    <!-- Loading Indicator -->
    <ul class="hierarchy-bar-node-list" *ngIf="(hierarchyBar.getChildren(node) | async).loading">

        <li class="hierarchy-bar-node-list-item">
            <ng-container [ngTemplateOutlet]="loadingIndicator || defaultLoadingIndicator"></ng-container>
        </li>
    </ul>

    <!-- List of children -->
    <ul class="hierarchy-bar-node-list" *ngIf="!(hierarchyBar.getChildren(node) | async).loading">

        <li *ngFor="let child of (hierarchyBar.getChildren(node) | async).children; let first = first"
            class="hierarchy-bar-node-list-item"
            [focusIf]="first"
            tabindex="0"
            (keydown.enter)="hierarchyBar.selectNode(child); popover.hide()"
            (click)="hierarchyBar.selectNode(child); popover.hide()">

            <!-- Show an icon if specifed -->
            <img class="hierarchy-bar-node-icon" *ngIf="child.icon" [src]="child.icon" alt="Hierarchy Bar Icon">

            <!-- Show the name of the current node -->
            <span class="hierarchy-bar-node-title">{{ child.title }}</span>

        </li>

    </ul>
</ng-template>

<!-- Template for the overflow popover list -->
<ng-template #overflow let-popover="popover">

    <ul class="hierarchy-bar-node-list">

        <li *ngFor="let child of overflowNodes$ | async; let first = first"
            class="hierarchy-bar-node-list-item"
            tabindex="0"
            [focusIf]="first"
            (click)="hierarchyBar.selectNode(child); popover.hide()"
            (keydown.enter)="hierarchyBar.selectNode(child); popover.hide()">

            <!-- Show an icon if specifed -->
            <img class="hierarchy-bar-node-icon" *ngIf="child.icon" [src]="child.icon" alt="Hierarchy Bar Icon">

            <!-- Show the name of the current node -->
            <span class="hierarchy-bar-node-title">{{ child.title }}</span>

        </li>

    </ul>
</ng-template>

<!-- Loading Indicator Template -->
<ng-template #defaultLoadingIndicator>
    <div class="hierarchy-bar-node-icon" alt="Hierarchy Bar Loading Indicator">
        <div class="spinner spinner-accent spinner-bounce-middle"></div>
    </div>

    <!-- Show the name of the current node -->
    <span class="hierarchy-bar-node-title">Loading...</span>
</ng-template>`,
                changeDetection: ChangeDetectionStrategy.OnPush,
                viewProviders: [HierarchyBarService]
            },] },
];
/** @nocollapse */
HierarchyBarComponent.ctorParameters = () => [
    { type: HierarchyBarService, },
];
HierarchyBarComponent.propDecorators = {
    "root": [{ type: Input },],
    "selected": [{ type: Input },],
    "loadingIndicator": [{ type: Input },],
    "selectedChange": [{ type: Output },],
    "nodelist": [{ type: ViewChild, args: ['nodelist',] },],
    "nodes": [{ type: ViewChildren, args: ['nodeElement',] },],
};
function HierarchyBarComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    HierarchyBarComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    HierarchyBarComponent.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    HierarchyBarComponent.propDecorators;
    /** @type {?} */
    HierarchyBarComponent.prototype.loadingIndicator;
    /** @type {?} */
    HierarchyBarComponent.prototype.selectedChange;
    /** @type {?} */
    HierarchyBarComponent.prototype.nodelist;
    /** @type {?} */
    HierarchyBarComponent.prototype.nodes;
    /** @type {?} */
    HierarchyBarComponent.prototype.overflow$;
    /** @type {?} */
    HierarchyBarComponent.prototype.overflowNodes$;
    /** @type {?} */
    HierarchyBarComponent.prototype._subscription;
    /** @type {?} */
    HierarchyBarComponent.prototype.hierarchyBar;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGllcmFyY2h5LWJhci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9oaWVyYXJjaHktYmFyL2hpZXJhcmNoeS1iYXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFhLE1BQU0sRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDeEssT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNqRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDOUMsT0FBTyxFQUFvQixtQkFBbUIsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBOEhoRixNQUFNOzs7O0lBcUJGLFlBQW1CLFlBQWlDO1FBQWpDLGlCQUFZLEdBQVosWUFBWSxDQUFxQjs4QkFUekIsSUFBSSxZQUFZLEVBQW9CO3lCQUluRCxJQUFJLGVBQWUsQ0FBVSxLQUFLLENBQUM7OEJBQzlCLElBQUksZUFBZSxDQUFxQixFQUFFLENBQUM7NkJBRXBDLElBQUksWUFBWSxFQUFFOztRQUt0Qyx1QkFBTSxRQUFRLEdBQUcsWUFBWSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEtBQUssQ0FBQyxHQUFHLElBQUksR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdkksdUJBQU0sT0FBTyxHQUFHLFlBQVksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxNQUFNLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQyxDQUFDOztRQUdqRyxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNqQyxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztLQUNuQzs7Ozs7UUE1QlksSUFBSSxDQUFDLElBQXNCO1FBQ3BDLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDOzs7Ozs7UUFHM0IsUUFBUSxDQUFDLElBQXNCO1FBQ3hDLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDOzs7OztJQXlCdkMsV0FBVztRQUNQLElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxFQUFFLENBQUM7S0FDcEM7Ozs7Ozs7O0lBUUQsY0FBYztRQUVWLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDakIsTUFBTSxDQUFDO1NBQ1Y7O1FBR0QsTUFBTSxFQUFFLGFBQWEsRUFBRSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7O1FBR3hDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLEdBQUcsYUFBYSxDQUFDLFdBQVcsQ0FBQyxDQUFDOztRQUczRSxFQUFFLENBQUMsQ0FBQyxhQUFhLENBQUMsV0FBVyxHQUFHLGFBQWEsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDOztZQUd4RCx1QkFBTSxjQUFjLEdBQUcsYUFBYSxDQUFDLFdBQVcsR0FBRyxhQUFhLENBQUMsV0FBVyxDQUFDOztZQUc3RSxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FDcEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsVUFBVSxHQUFHLGNBQWMsQ0FBQztpQkFDcEUsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLEtBQUssS0FBSyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FDbkUsQ0FBQzs7WUFHRixJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxVQUFVLEdBQUcsY0FBYyxDQUFDO1NBQzNEO0tBQ0o7OztZQWpNSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLGtCQUFrQjtnQkFDNUIsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2VBc0hDO2dCQUNYLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2dCQUMvQyxhQUFhLEVBQUUsQ0FBQyxtQkFBbUIsQ0FBQzthQUN2Qzs7OztZQTdIMEIsbUJBQW1COzs7cUJBZ0l6QyxLQUFLO3lCQUlMLEtBQUs7aUNBSUwsS0FBSzsrQkFFTCxNQUFNO3lCQUNOLFNBQVMsU0FBQyxVQUFVO3NCQUNwQixZQUFZLFNBQUMsYUFBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uRGVzdHJveSwgT3V0cHV0LCBRdWVyeUxpc3QsIFRlbXBsYXRlUmVmLCBWaWV3Q2hpbGQsIFZpZXdDaGlsZHJlbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzL0JlaGF2aW9yU3ViamVjdCc7XHJcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMvU3Vic2NyaXB0aW9uJztcclxuaW1wb3J0IHsgZGVib3VuY2VUaW1lIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5pbXBvcnQgeyBIaWVyYXJjaHlCYXJOb2RlLCBIaWVyYXJjaHlCYXJTZXJ2aWNlIH0gZnJvbSAnLi9oaWVyYXJjaHktYmFyLnNlcnZpY2UnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ3V4LWhpZXJhcmNoeS1iYXInLFxyXG4gICAgdGVtcGxhdGU6IGA8IS0tIEFsbG93IGNvbnRlbnQgdG8gYmUgcGxhY2VkIG9uIHRoZSBsZWZ0IG9mIHRoZSBpdGVtcyAtLT5cbjxhc2lkZSBjbGFzcz1cImhpZXJhcmNoeS1iYXItYWRkb25zXCI+XG4gICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiW3V4SGllcmFyY2h5QmFyTGVmdEFkZG9uXVwiPjwvbmctY29udGVudD5cbjwvYXNpZGU+XG5cbjxtYWluICNub2RlbGlzdCBjbGFzcz1cImhpZXJhcmNoeS1iYXItbm9kZXNcIiAodXhSZXNpemUpPVwic2Nyb2xsSW50b1ZpZXcoKVwiPlxuXG4gICAgPGRpdiAqbmdJZj1cIm92ZXJmbG93JCB8IGFzeW5jXCJcbiAgICAgICAgICNwb3BvdmVyPVwidXgtcG9wb3ZlclwiXG4gICAgICAgICBjbGFzcz1cImhpZXJhcmNoeS1iYXItb3ZlcmZsb3ctaW5kaWNhdG9yXCJcbiAgICAgICAgIFtzdHlsZS5sZWZ0LnB4XT1cIm5vZGVsaXN0LnNjcm9sbExlZnRcIlxuICAgICAgICAgW3V4UG9wb3Zlcl09XCJvdmVyZmxvd1wiXG4gICAgICAgICBbcG9wb3ZlckNvbnRleHRdPVwieyBwb3BvdmVyOiBwb3BvdmVyIH1cIlxuICAgICAgICAgcGxhY2VtZW50PVwiYm90dG9tXCJcbiAgICAgICAgIHBvcG92ZXJDbGFzcz1cImhpZXJhcmNoeS1iYXItcG9wb3ZlclwiPlxuICAgICAgICAuIC4gLlxuICAgIDwvZGl2PlxuXG4gICAgPGRpdiAjbm9kZUVsZW1lbnQgY2xhc3M9XCJoaWVyYXJjaHktYmFyLW5vZGVcIlxuICAgICAgICAgKm5nRm9yPVwibGV0IG5vZGUgb2YgaGllcmFyY2h5QmFyLm5vZGVzJCB8IGFzeW5jXCI+XG5cbiAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImhpZXJhcmNoeS1iYXItbm9kZS1jb250ZW50XCJcbiAgICAgICAgICAgICAgICBbYXR0ci5hcmlhLWxhYmVsXT1cIm5vZGUudGl0bGVcIlxuICAgICAgICAgICAgICAgIChjbGljayk9XCJoaWVyYXJjaHlCYXIuc2VsZWN0Tm9kZShub2RlKVwiPlxuXG4gICAgICAgICAgICA8IS0tIFNob3cgYW4gaWNvbiBpZiBzcGVjaWZlZCAtLT5cbiAgICAgICAgICAgIDxpbWcgY2xhc3M9XCJoaWVyYXJjaHktYmFyLW5vZGUtaWNvblwiICpuZ0lmPVwibm9kZS5pY29uXCIgW3NyY109XCJub2RlLmljb25cIiBhbHQ9XCJIaWVyYXJjaHkgQmFyIEljb25cIj5cblxuICAgICAgICAgICAgPCEtLSBTaG93IHRoZSBuYW1lIG9mIHRoZSBjdXJyZW50IG5vZGUgLS0+XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cImhpZXJhcmNoeS1iYXItbm9kZS10aXRsZVwiPnt7IG5vZGUudGl0bGUgfX08L3NwYW4+XG5cbiAgICAgICAgPC9idXR0b24+XG5cbiAgICAgICAgPCEtLSBTaG93IGEgZHJvcGRvd24gYXJyb3cgaWYgdGhlcmUgYXJlIGNoaWxkcmVuIC0tPlxuICAgICAgICA8YnV0dG9uICpuZ0lmPVwibm9kZS5jaGlsZHJlblwiXG4gICAgICAgICAgICAgICNwb3BvdmVyPVwidXgtcG9wb3ZlclwiXG4gICAgICAgICAgICAgIGFyaWEtbGFiZWw9XCJTaG93IGNoaWxkcmVuXCJcbiAgICAgICAgICAgICAgcm9sZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgIGNsYXNzPVwiaGllcmFyY2h5LWJhci1ub2RlLWFycm93IGhwZS1pY29uIGhwZS1uZXh0XCJcbiAgICAgICAgICAgICAgW3V4UG9wb3Zlcl09XCJjb250ZW50XCJcbiAgICAgICAgICAgICAgW3BvcG92ZXJDb250ZXh0XT1cInsgbm9kZTogbm9kZSwgcG9wb3ZlcjogcG9wb3ZlciB9XCJcbiAgICAgICAgICAgICAgcGxhY2VtZW50PVwiYm90dG9tXCJcbiAgICAgICAgICAgICAgcG9wb3ZlckNsYXNzPVwiaGllcmFyY2h5LWJhci1wb3BvdmVyXCJcbiAgICAgICAgICAgICAgdGFiaW5kZXg9XCIwXCI+XG4gICAgICAgIDwvYnV0dG9uPlxuXG4gICAgPC9kaXY+XG5cbjwvbWFpbj5cblxuPCEtLSBBbGxvdyBjb250ZW50IHRvIGJlIHBsYWNlZCBvbiB0aGUgcmlnaHQgb2YgdGhlIGl0ZW1zIC0tPlxuPGFzaWRlIGNsYXNzPVwiaGllcmFyY2h5LWJhci1hZGRvbnNcIj5cbiAgICA8bmctY29udGVudCBzZWxlY3Q9XCJbdXhIaWVyYXJjaHlCYXJSaWdodEFkZG9uXVwiPjwvbmctY29udGVudD5cbjwvYXNpZGU+XG5cbjwhLS0gVGVtcGxhdGUgZm9yIHRoZSBwb3BvdmVyIGxpc3QgLS0+XG48bmctdGVtcGxhdGUgI2NvbnRlbnQgbGV0LW5vZGU9XCJub2RlXCIgbGV0LXBvcG92ZXI9XCJwb3BvdmVyXCI+XG5cbiAgICA8IS0tIExvYWRpbmcgSW5kaWNhdG9yIC0tPlxuICAgIDx1bCBjbGFzcz1cImhpZXJhcmNoeS1iYXItbm9kZS1saXN0XCIgKm5nSWY9XCIoaGllcmFyY2h5QmFyLmdldENoaWxkcmVuKG5vZGUpIHwgYXN5bmMpLmxvYWRpbmdcIj5cblxuICAgICAgICA8bGkgY2xhc3M9XCJoaWVyYXJjaHktYmFyLW5vZGUtbGlzdC1pdGVtXCI+XG4gICAgICAgICAgICA8bmctY29udGFpbmVyIFtuZ1RlbXBsYXRlT3V0bGV0XT1cImxvYWRpbmdJbmRpY2F0b3IgfHwgZGVmYXVsdExvYWRpbmdJbmRpY2F0b3JcIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgPC9saT5cbiAgICA8L3VsPlxuXG4gICAgPCEtLSBMaXN0IG9mIGNoaWxkcmVuIC0tPlxuICAgIDx1bCBjbGFzcz1cImhpZXJhcmNoeS1iYXItbm9kZS1saXN0XCIgKm5nSWY9XCIhKGhpZXJhcmNoeUJhci5nZXRDaGlsZHJlbihub2RlKSB8IGFzeW5jKS5sb2FkaW5nXCI+XG5cbiAgICAgICAgPGxpICpuZ0Zvcj1cImxldCBjaGlsZCBvZiAoaGllcmFyY2h5QmFyLmdldENoaWxkcmVuKG5vZGUpIHwgYXN5bmMpLmNoaWxkcmVuOyBsZXQgZmlyc3QgPSBmaXJzdFwiXG4gICAgICAgICAgICBjbGFzcz1cImhpZXJhcmNoeS1iYXItbm9kZS1saXN0LWl0ZW1cIlxuICAgICAgICAgICAgW2ZvY3VzSWZdPVwiZmlyc3RcIlxuICAgICAgICAgICAgdGFiaW5kZXg9XCIwXCJcbiAgICAgICAgICAgIChrZXlkb3duLmVudGVyKT1cImhpZXJhcmNoeUJhci5zZWxlY3ROb2RlKGNoaWxkKTsgcG9wb3Zlci5oaWRlKClcIlxuICAgICAgICAgICAgKGNsaWNrKT1cImhpZXJhcmNoeUJhci5zZWxlY3ROb2RlKGNoaWxkKTsgcG9wb3Zlci5oaWRlKClcIj5cblxuICAgICAgICAgICAgPCEtLSBTaG93IGFuIGljb24gaWYgc3BlY2lmZWQgLS0+XG4gICAgICAgICAgICA8aW1nIGNsYXNzPVwiaGllcmFyY2h5LWJhci1ub2RlLWljb25cIiAqbmdJZj1cImNoaWxkLmljb25cIiBbc3JjXT1cImNoaWxkLmljb25cIiBhbHQ9XCJIaWVyYXJjaHkgQmFyIEljb25cIj5cblxuICAgICAgICAgICAgPCEtLSBTaG93IHRoZSBuYW1lIG9mIHRoZSBjdXJyZW50IG5vZGUgLS0+XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cImhpZXJhcmNoeS1iYXItbm9kZS10aXRsZVwiPnt7IGNoaWxkLnRpdGxlIH19PC9zcGFuPlxuXG4gICAgICAgIDwvbGk+XG5cbiAgICA8L3VsPlxuPC9uZy10ZW1wbGF0ZT5cblxuPCEtLSBUZW1wbGF0ZSBmb3IgdGhlIG92ZXJmbG93IHBvcG92ZXIgbGlzdCAtLT5cbjxuZy10ZW1wbGF0ZSAjb3ZlcmZsb3cgbGV0LXBvcG92ZXI9XCJwb3BvdmVyXCI+XG5cbiAgICA8dWwgY2xhc3M9XCJoaWVyYXJjaHktYmFyLW5vZGUtbGlzdFwiPlxuXG4gICAgICAgIDxsaSAqbmdGb3I9XCJsZXQgY2hpbGQgb2Ygb3ZlcmZsb3dOb2RlcyQgfCBhc3luYzsgbGV0IGZpcnN0ID0gZmlyc3RcIlxuICAgICAgICAgICAgY2xhc3M9XCJoaWVyYXJjaHktYmFyLW5vZGUtbGlzdC1pdGVtXCJcbiAgICAgICAgICAgIHRhYmluZGV4PVwiMFwiXG4gICAgICAgICAgICBbZm9jdXNJZl09XCJmaXJzdFwiXG4gICAgICAgICAgICAoY2xpY2spPVwiaGllcmFyY2h5QmFyLnNlbGVjdE5vZGUoY2hpbGQpOyBwb3BvdmVyLmhpZGUoKVwiXG4gICAgICAgICAgICAoa2V5ZG93bi5lbnRlcik9XCJoaWVyYXJjaHlCYXIuc2VsZWN0Tm9kZShjaGlsZCk7IHBvcG92ZXIuaGlkZSgpXCI+XG5cbiAgICAgICAgICAgIDwhLS0gU2hvdyBhbiBpY29uIGlmIHNwZWNpZmVkIC0tPlxuICAgICAgICAgICAgPGltZyBjbGFzcz1cImhpZXJhcmNoeS1iYXItbm9kZS1pY29uXCIgKm5nSWY9XCJjaGlsZC5pY29uXCIgW3NyY109XCJjaGlsZC5pY29uXCIgYWx0PVwiSGllcmFyY2h5IEJhciBJY29uXCI+XG5cbiAgICAgICAgICAgIDwhLS0gU2hvdyB0aGUgbmFtZSBvZiB0aGUgY3VycmVudCBub2RlIC0tPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJoaWVyYXJjaHktYmFyLW5vZGUtdGl0bGVcIj57eyBjaGlsZC50aXRsZSB9fTwvc3Bhbj5cblxuICAgICAgICA8L2xpPlxuXG4gICAgPC91bD5cbjwvbmctdGVtcGxhdGU+XG5cbjwhLS0gTG9hZGluZyBJbmRpY2F0b3IgVGVtcGxhdGUgLS0+XG48bmctdGVtcGxhdGUgI2RlZmF1bHRMb2FkaW5nSW5kaWNhdG9yPlxuICAgIDxkaXYgY2xhc3M9XCJoaWVyYXJjaHktYmFyLW5vZGUtaWNvblwiIGFsdD1cIkhpZXJhcmNoeSBCYXIgTG9hZGluZyBJbmRpY2F0b3JcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInNwaW5uZXIgc3Bpbm5lci1hY2NlbnQgc3Bpbm5lci1ib3VuY2UtbWlkZGxlXCI+PC9kaXY+XG4gICAgPC9kaXY+XG5cbiAgICA8IS0tIFNob3cgdGhlIG5hbWUgb2YgdGhlIGN1cnJlbnQgbm9kZSAtLT5cbiAgICA8c3BhbiBjbGFzcz1cImhpZXJhcmNoeS1iYXItbm9kZS10aXRsZVwiPkxvYWRpbmcuLi48L3NwYW4+XG48L25nLXRlbXBsYXRlPmAsXHJcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcclxuICAgIHZpZXdQcm92aWRlcnM6IFtIaWVyYXJjaHlCYXJTZXJ2aWNlXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgSGllcmFyY2h5QmFyQ29tcG9uZW50IGltcGxlbWVudHMgT25EZXN0cm95IHtcclxuXHJcbiAgICBASW5wdXQoKSBzZXQgcm9vdChub2RlOiBIaWVyYXJjaHlCYXJOb2RlKSB7XHJcbiAgICAgICAgdGhpcy5oaWVyYXJjaHlCYXIuc2V0Um9vdE5vZGUobm9kZSk7XHJcbiAgICB9XHJcblxyXG4gICAgQElucHV0KCkgc2V0IHNlbGVjdGVkKG5vZGU6IEhpZXJhcmNoeUJhck5vZGUpIHtcclxuICAgICAgICB0aGlzLmhpZXJhcmNoeUJhci5zZWxlY3ROb2RlKG5vZGUpO1xyXG4gICAgfVxyXG5cclxuICAgIEBJbnB1dCgpIGxvYWRpbmdJbmRpY2F0b3I6IFRlbXBsYXRlUmVmPGFueT47XHJcblxyXG4gICAgQE91dHB1dCgpIHNlbGVjdGVkQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxIaWVyYXJjaHlCYXJOb2RlPigpO1xyXG4gICAgQFZpZXdDaGlsZCgnbm9kZWxpc3QnKSBub2RlbGlzdDogRWxlbWVudFJlZjtcclxuICAgIEBWaWV3Q2hpbGRyZW4oJ25vZGVFbGVtZW50Jykgbm9kZXM6IFF1ZXJ5TGlzdDxFbGVtZW50UmVmPjtcclxuXHJcbiAgICBvdmVyZmxvdyQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcclxuICAgIG92ZXJmbG93Tm9kZXMkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxIaWVyYXJjaHlCYXJOb2RlW10+KFtdKTtcclxuXHJcbiAgICBwcml2YXRlIF9zdWJzY3JpcHRpb24gPSBuZXcgU3Vic2NyaXB0aW9uKCk7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHVibGljIGhpZXJhcmNoeUJhcjogSGllcmFyY2h5QmFyU2VydmljZSkge1xyXG5cclxuICAgICAgICAvLyBzdWJzY3JpYmUgdG8gY2hhbmdlcyBpbiB0aGUgc2VsZWN0ZWQgbm9kZVxyXG4gICAgICAgIGNvbnN0IHNlbGVjdGVkID0gaGllcmFyY2h5QmFyLm5vZGVzJC5zdWJzY3JpYmUobm9kZXMgPT4gdGhpcy5zZWxlY3RlZENoYW5nZS5lbWl0KG5vZGVzLmxlbmd0aCA9PT0gMCA/IG51bGwgOiBub2Rlc1tub2Rlcy5sZW5ndGggLSAxXSkpO1xyXG4gICAgICAgIGNvbnN0IGNoYW5nZWQgPSBoaWVyYXJjaHlCYXIubm9kZXMkLnBpcGUoZGVib3VuY2VUaW1lKDApKS5zdWJzY3JpYmUoKCkgPT4gdGhpcy5zY3JvbGxJbnRvVmlldygpKTtcclxuXHJcbiAgICAgICAgLy8gc3RvcmUgc3Vic2NyaXB0aW9uc1xyXG4gICAgICAgIHRoaXMuX3N1YnNjcmlwdGlvbi5hZGQoc2VsZWN0ZWQpO1xyXG4gICAgICAgIHRoaXMuX3N1YnNjcmlwdGlvbi5hZGQoY2hhbmdlZCk7XHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBXaGVuIHRoZXJlIGlzIG92ZXJmbG93IGVuc3VyZSB0aGF0IHRoZSByaWdodG1vc3RcclxuICAgICAqIG5vZGUgcmVtYWlucyBpbiB2aWV3IGF0IGFsbCB0aW1lcy4gVGhlIG5vZGVzIG5vIGxvbmdlclxyXG4gICAgICogdmlzaWJsZSBiZSBiZSBkaXNwbGF5ZWQgaW4gYSBwb3BvdmVyIGF2YWlsYWJsZSBvbiB0aGVcclxuICAgICAqIG92ZXJmbG93IGluZGljYXRvclxyXG4gICAgICovXHJcbiAgICBzY3JvbGxJbnRvVmlldygpOiB2b2lkIHtcclxuXHJcbiAgICAgICAgaWYgKCF0aGlzLm5vZGVsaXN0KSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIGdldCB0aGUgbmF0aXZlIGVsZW1lbnRcclxuICAgICAgICBjb25zdCB7IG5hdGl2ZUVsZW1lbnQgfSA9IHRoaXMubm9kZWxpc3Q7XHJcblxyXG4gICAgICAgIC8vIGVtaXQgd2hldGhlciBvciBub3QgdGhlcmUgaXMgb3ZlcmZsb3dcclxuICAgICAgICB0aGlzLm92ZXJmbG93JC5uZXh0KG5hdGl2ZUVsZW1lbnQuc2Nyb2xsV2lkdGggPiBuYXRpdmVFbGVtZW50Lm9mZnNldFdpZHRoKTtcclxuXHJcbiAgICAgICAgLy8gaWYgdGhlIGhpZXJhcmNoeSBiYXIgY29udGVudHMgZG8gbm90IG92ZXJmbG93IHRoZW4gZG8gbm90aGluZ1xyXG4gICAgICAgIGlmIChuYXRpdmVFbGVtZW50LnNjcm9sbFdpZHRoID4gbmF0aXZlRWxlbWVudC5vZmZzZXRXaWR0aCkge1xyXG5cclxuICAgICAgICAgICAgLy8gZGV0ZXJtaW5lIHRoZSBhbW91bnQgb2Ygb3ZlcmZsb3dcclxuICAgICAgICAgICAgY29uc3Qgb3ZlcmZsb3dBbW91bnQgPSBuYXRpdmVFbGVtZW50LnNjcm9sbFdpZHRoIC0gbmF0aXZlRWxlbWVudC5vZmZzZXRXaWR0aDtcclxuXHJcbiAgICAgICAgICAgIC8vIGRldGVybWluZSB3aGljaCBub2RlcyBhcmUgbm90IGZ1bGx5IHZpc2libGVcclxuICAgICAgICAgICAgdGhpcy5vdmVyZmxvd05vZGVzJC5uZXh0KFxyXG4gICAgICAgICAgICAgICAgdGhpcy5ub2Rlcy5maWx0ZXIobm9kZSA9PiBub2RlLm5hdGl2ZUVsZW1lbnQub2Zmc2V0TGVmdCA8IG92ZXJmbG93QW1vdW50KVxyXG4gICAgICAgICAgICAgICAgICAgIC5tYXAoKG5vZGUsIGluZGV4KSA9PiB0aGlzLmhpZXJhcmNoeUJhci5ub2RlcyQudmFsdWVbaW5kZXhdKVxyXG4gICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgLy8gbW92ZSB0aGUgc2Nyb2xsIHBvc2l0aW9uIHRvIGFsd2F5cyBzaG93IHRoZSBsYXN0IGl0bWVcclxuICAgICAgICAgICAgdGhpcy5ub2RlbGlzdC5uYXRpdmVFbGVtZW50LnNjcm9sbExlZnQgPSBvdmVyZmxvd0Ftb3VudDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iXX0=