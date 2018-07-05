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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGllcmFyY2h5LWJhci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9oaWVyYXJjaHktYmFyL2hpZXJhcmNoeS1iYXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFhLE1BQU0sRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDeEssT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNqRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDOUMsT0FBTyxFQUFvQixtQkFBbUIsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBOEhoRixNQUFNOzs7O0lBcUJGLFlBQW1CLFlBQWlDO1FBQWpDLGlCQUFZLEdBQVosWUFBWSxDQUFxQjs4QkFUekIsSUFBSSxZQUFZLEVBQW9CO3lCQUluRCxJQUFJLGVBQWUsQ0FBVSxLQUFLLENBQUM7OEJBQzlCLElBQUksZUFBZSxDQUFxQixFQUFFLENBQUM7NkJBRXBDLElBQUksWUFBWSxFQUFFOztRQUt0Qyx1QkFBTSxRQUFRLEdBQUcsWUFBWSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEtBQUssQ0FBQyxHQUFHLElBQUksR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdkksdUJBQU0sT0FBTyxHQUFHLFlBQVksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxNQUFNLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQyxDQUFDOztRQUdqRyxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNqQyxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztLQUNuQzs7Ozs7UUE1QlksSUFBSSxDQUFDLElBQXNCO1FBQ3BDLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDOzs7Ozs7UUFHM0IsUUFBUSxDQUFDLElBQXNCO1FBQ3hDLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDOzs7OztJQXlCdkMsV0FBVztRQUNQLElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxFQUFFLENBQUM7S0FDcEM7Ozs7Ozs7O0lBUUQsY0FBYztRQUVWLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDakIsTUFBTSxDQUFDO1NBQ1Y7O1FBR0QsTUFBTSxFQUFFLGFBQWEsRUFBRSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7O1FBR3hDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLEdBQUcsYUFBYSxDQUFDLFdBQVcsQ0FBQyxDQUFDOztRQUczRSxFQUFFLENBQUMsQ0FBQyxhQUFhLENBQUMsV0FBVyxHQUFHLGFBQWEsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDOztZQUd4RCx1QkFBTSxjQUFjLEdBQUcsYUFBYSxDQUFDLFdBQVcsR0FBRyxhQUFhLENBQUMsV0FBVyxDQUFDOztZQUc3RSxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FDcEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsVUFBVSxHQUFHLGNBQWMsQ0FBQztpQkFDcEUsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLEtBQUssS0FBSyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FDbkUsQ0FBQzs7WUFHRixJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxVQUFVLEdBQUcsY0FBYyxDQUFDO1NBQzNEO0tBQ0o7OztZQWpNSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLGtCQUFrQjtnQkFDNUIsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2VBc0hDO2dCQUNYLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2dCQUMvQyxhQUFhLEVBQUUsQ0FBQyxtQkFBbUIsQ0FBQzthQUN2Qzs7OztZQTdIMEIsbUJBQW1COzs7cUJBZ0l6QyxLQUFLO3lCQUlMLEtBQUs7aUNBSUwsS0FBSzsrQkFFTCxNQUFNO3lCQUNOLFNBQVMsU0FBQyxVQUFVO3NCQUNwQixZQUFZLFNBQUMsYUFBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uRGVzdHJveSwgT3V0cHV0LCBRdWVyeUxpc3QsIFRlbXBsYXRlUmVmLCBWaWV3Q2hpbGQsIFZpZXdDaGlsZHJlbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcy9CZWhhdmlvclN1YmplY3QnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcy9TdWJzY3JpcHRpb24nO1xuaW1wb3J0IHsgZGVib3VuY2VUaW1lIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgSGllcmFyY2h5QmFyTm9kZSwgSGllcmFyY2h5QmFyU2VydmljZSB9IGZyb20gJy4vaGllcmFyY2h5LWJhci5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd1eC1oaWVyYXJjaHktYmFyJyxcbiAgICB0ZW1wbGF0ZTogYDwhLS0gQWxsb3cgY29udGVudCB0byBiZSBwbGFjZWQgb24gdGhlIGxlZnQgb2YgdGhlIGl0ZW1zIC0tPlxuPGFzaWRlIGNsYXNzPVwiaGllcmFyY2h5LWJhci1hZGRvbnNcIj5cbiAgICA8bmctY29udGVudCBzZWxlY3Q9XCJbdXhIaWVyYXJjaHlCYXJMZWZ0QWRkb25dXCI+PC9uZy1jb250ZW50PlxuPC9hc2lkZT5cblxuPG1haW4gI25vZGVsaXN0IGNsYXNzPVwiaGllcmFyY2h5LWJhci1ub2Rlc1wiICh1eFJlc2l6ZSk9XCJzY3JvbGxJbnRvVmlldygpXCI+XG5cbiAgICA8ZGl2ICpuZ0lmPVwib3ZlcmZsb3ckIHwgYXN5bmNcIlxuICAgICAgICAgI3BvcG92ZXI9XCJ1eC1wb3BvdmVyXCJcbiAgICAgICAgIGNsYXNzPVwiaGllcmFyY2h5LWJhci1vdmVyZmxvdy1pbmRpY2F0b3JcIlxuICAgICAgICAgW3N0eWxlLmxlZnQucHhdPVwibm9kZWxpc3Quc2Nyb2xsTGVmdFwiXG4gICAgICAgICBbdXhQb3BvdmVyXT1cIm92ZXJmbG93XCJcbiAgICAgICAgIFtwb3BvdmVyQ29udGV4dF09XCJ7IHBvcG92ZXI6IHBvcG92ZXIgfVwiXG4gICAgICAgICBwbGFjZW1lbnQ9XCJib3R0b21cIlxuICAgICAgICAgcG9wb3ZlckNsYXNzPVwiaGllcmFyY2h5LWJhci1wb3BvdmVyXCI+XG4gICAgICAgIC4gLiAuXG4gICAgPC9kaXY+XG5cbiAgICA8ZGl2ICNub2RlRWxlbWVudCBjbGFzcz1cImhpZXJhcmNoeS1iYXItbm9kZVwiXG4gICAgICAgICAqbmdGb3I9XCJsZXQgbm9kZSBvZiBoaWVyYXJjaHlCYXIubm9kZXMkIHwgYXN5bmNcIj5cblxuICAgICAgICA8YnV0dG9uIGNsYXNzPVwiaGllcmFyY2h5LWJhci1ub2RlLWNvbnRlbnRcIlxuICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtbGFiZWxdPVwibm9kZS50aXRsZVwiXG4gICAgICAgICAgICAgICAgKGNsaWNrKT1cImhpZXJhcmNoeUJhci5zZWxlY3ROb2RlKG5vZGUpXCI+XG5cbiAgICAgICAgICAgIDwhLS0gU2hvdyBhbiBpY29uIGlmIHNwZWNpZmVkIC0tPlxuICAgICAgICAgICAgPGltZyBjbGFzcz1cImhpZXJhcmNoeS1iYXItbm9kZS1pY29uXCIgKm5nSWY9XCJub2RlLmljb25cIiBbc3JjXT1cIm5vZGUuaWNvblwiIGFsdD1cIkhpZXJhcmNoeSBCYXIgSWNvblwiPlxuXG4gICAgICAgICAgICA8IS0tIFNob3cgdGhlIG5hbWUgb2YgdGhlIGN1cnJlbnQgbm9kZSAtLT5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiaGllcmFyY2h5LWJhci1ub2RlLXRpdGxlXCI+e3sgbm9kZS50aXRsZSB9fTwvc3Bhbj5cblxuICAgICAgICA8L2J1dHRvbj5cblxuICAgICAgICA8IS0tIFNob3cgYSBkcm9wZG93biBhcnJvdyBpZiB0aGVyZSBhcmUgY2hpbGRyZW4gLS0+XG4gICAgICAgIDxidXR0b24gKm5nSWY9XCJub2RlLmNoaWxkcmVuXCJcbiAgICAgICAgICAgICAgI3BvcG92ZXI9XCJ1eC1wb3BvdmVyXCJcbiAgICAgICAgICAgICAgYXJpYS1sYWJlbD1cIlNob3cgY2hpbGRyZW5cIlxuICAgICAgICAgICAgICByb2xlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgY2xhc3M9XCJoaWVyYXJjaHktYmFyLW5vZGUtYXJyb3cgaHBlLWljb24gaHBlLW5leHRcIlxuICAgICAgICAgICAgICBbdXhQb3BvdmVyXT1cImNvbnRlbnRcIlxuICAgICAgICAgICAgICBbcG9wb3ZlckNvbnRleHRdPVwieyBub2RlOiBub2RlLCBwb3BvdmVyOiBwb3BvdmVyIH1cIlxuICAgICAgICAgICAgICBwbGFjZW1lbnQ9XCJib3R0b21cIlxuICAgICAgICAgICAgICBwb3BvdmVyQ2xhc3M9XCJoaWVyYXJjaHktYmFyLXBvcG92ZXJcIlxuICAgICAgICAgICAgICB0YWJpbmRleD1cIjBcIj5cbiAgICAgICAgPC9idXR0b24+XG5cbiAgICA8L2Rpdj5cblxuPC9tYWluPlxuXG48IS0tIEFsbG93IGNvbnRlbnQgdG8gYmUgcGxhY2VkIG9uIHRoZSByaWdodCBvZiB0aGUgaXRlbXMgLS0+XG48YXNpZGUgY2xhc3M9XCJoaWVyYXJjaHktYmFyLWFkZG9uc1wiPlxuICAgIDxuZy1jb250ZW50IHNlbGVjdD1cIlt1eEhpZXJhcmNoeUJhclJpZ2h0QWRkb25dXCI+PC9uZy1jb250ZW50PlxuPC9hc2lkZT5cblxuPCEtLSBUZW1wbGF0ZSBmb3IgdGhlIHBvcG92ZXIgbGlzdCAtLT5cbjxuZy10ZW1wbGF0ZSAjY29udGVudCBsZXQtbm9kZT1cIm5vZGVcIiBsZXQtcG9wb3Zlcj1cInBvcG92ZXJcIj5cblxuICAgIDwhLS0gTG9hZGluZyBJbmRpY2F0b3IgLS0+XG4gICAgPHVsIGNsYXNzPVwiaGllcmFyY2h5LWJhci1ub2RlLWxpc3RcIiAqbmdJZj1cIihoaWVyYXJjaHlCYXIuZ2V0Q2hpbGRyZW4obm9kZSkgfCBhc3luYykubG9hZGluZ1wiPlxuXG4gICAgICAgIDxsaSBjbGFzcz1cImhpZXJhcmNoeS1iYXItbm9kZS1saXN0LWl0ZW1cIj5cbiAgICAgICAgICAgIDxuZy1jb250YWluZXIgW25nVGVtcGxhdGVPdXRsZXRdPVwibG9hZGluZ0luZGljYXRvciB8fCBkZWZhdWx0TG9hZGluZ0luZGljYXRvclwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICA8L2xpPlxuICAgIDwvdWw+XG5cbiAgICA8IS0tIExpc3Qgb2YgY2hpbGRyZW4gLS0+XG4gICAgPHVsIGNsYXNzPVwiaGllcmFyY2h5LWJhci1ub2RlLWxpc3RcIiAqbmdJZj1cIiEoaGllcmFyY2h5QmFyLmdldENoaWxkcmVuKG5vZGUpIHwgYXN5bmMpLmxvYWRpbmdcIj5cblxuICAgICAgICA8bGkgKm5nRm9yPVwibGV0IGNoaWxkIG9mIChoaWVyYXJjaHlCYXIuZ2V0Q2hpbGRyZW4obm9kZSkgfCBhc3luYykuY2hpbGRyZW47IGxldCBmaXJzdCA9IGZpcnN0XCJcbiAgICAgICAgICAgIGNsYXNzPVwiaGllcmFyY2h5LWJhci1ub2RlLWxpc3QtaXRlbVwiXG4gICAgICAgICAgICBbZm9jdXNJZl09XCJmaXJzdFwiXG4gICAgICAgICAgICB0YWJpbmRleD1cIjBcIlxuICAgICAgICAgICAgKGtleWRvd24uZW50ZXIpPVwiaGllcmFyY2h5QmFyLnNlbGVjdE5vZGUoY2hpbGQpOyBwb3BvdmVyLmhpZGUoKVwiXG4gICAgICAgICAgICAoY2xpY2spPVwiaGllcmFyY2h5QmFyLnNlbGVjdE5vZGUoY2hpbGQpOyBwb3BvdmVyLmhpZGUoKVwiPlxuXG4gICAgICAgICAgICA8IS0tIFNob3cgYW4gaWNvbiBpZiBzcGVjaWZlZCAtLT5cbiAgICAgICAgICAgIDxpbWcgY2xhc3M9XCJoaWVyYXJjaHktYmFyLW5vZGUtaWNvblwiICpuZ0lmPVwiY2hpbGQuaWNvblwiIFtzcmNdPVwiY2hpbGQuaWNvblwiIGFsdD1cIkhpZXJhcmNoeSBCYXIgSWNvblwiPlxuXG4gICAgICAgICAgICA8IS0tIFNob3cgdGhlIG5hbWUgb2YgdGhlIGN1cnJlbnQgbm9kZSAtLT5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiaGllcmFyY2h5LWJhci1ub2RlLXRpdGxlXCI+e3sgY2hpbGQudGl0bGUgfX08L3NwYW4+XG5cbiAgICAgICAgPC9saT5cblxuICAgIDwvdWw+XG48L25nLXRlbXBsYXRlPlxuXG48IS0tIFRlbXBsYXRlIGZvciB0aGUgb3ZlcmZsb3cgcG9wb3ZlciBsaXN0IC0tPlxuPG5nLXRlbXBsYXRlICNvdmVyZmxvdyBsZXQtcG9wb3Zlcj1cInBvcG92ZXJcIj5cblxuICAgIDx1bCBjbGFzcz1cImhpZXJhcmNoeS1iYXItbm9kZS1saXN0XCI+XG5cbiAgICAgICAgPGxpICpuZ0Zvcj1cImxldCBjaGlsZCBvZiBvdmVyZmxvd05vZGVzJCB8IGFzeW5jOyBsZXQgZmlyc3QgPSBmaXJzdFwiXG4gICAgICAgICAgICBjbGFzcz1cImhpZXJhcmNoeS1iYXItbm9kZS1saXN0LWl0ZW1cIlxuICAgICAgICAgICAgdGFiaW5kZXg9XCIwXCJcbiAgICAgICAgICAgIFtmb2N1c0lmXT1cImZpcnN0XCJcbiAgICAgICAgICAgIChjbGljayk9XCJoaWVyYXJjaHlCYXIuc2VsZWN0Tm9kZShjaGlsZCk7IHBvcG92ZXIuaGlkZSgpXCJcbiAgICAgICAgICAgIChrZXlkb3duLmVudGVyKT1cImhpZXJhcmNoeUJhci5zZWxlY3ROb2RlKGNoaWxkKTsgcG9wb3Zlci5oaWRlKClcIj5cblxuICAgICAgICAgICAgPCEtLSBTaG93IGFuIGljb24gaWYgc3BlY2lmZWQgLS0+XG4gICAgICAgICAgICA8aW1nIGNsYXNzPVwiaGllcmFyY2h5LWJhci1ub2RlLWljb25cIiAqbmdJZj1cImNoaWxkLmljb25cIiBbc3JjXT1cImNoaWxkLmljb25cIiBhbHQ9XCJIaWVyYXJjaHkgQmFyIEljb25cIj5cblxuICAgICAgICAgICAgPCEtLSBTaG93IHRoZSBuYW1lIG9mIHRoZSBjdXJyZW50IG5vZGUgLS0+XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cImhpZXJhcmNoeS1iYXItbm9kZS10aXRsZVwiPnt7IGNoaWxkLnRpdGxlIH19PC9zcGFuPlxuXG4gICAgICAgIDwvbGk+XG5cbiAgICA8L3VsPlxuPC9uZy10ZW1wbGF0ZT5cblxuPCEtLSBMb2FkaW5nIEluZGljYXRvciBUZW1wbGF0ZSAtLT5cbjxuZy10ZW1wbGF0ZSAjZGVmYXVsdExvYWRpbmdJbmRpY2F0b3I+XG4gICAgPGRpdiBjbGFzcz1cImhpZXJhcmNoeS1iYXItbm9kZS1pY29uXCIgYWx0PVwiSGllcmFyY2h5IEJhciBMb2FkaW5nIEluZGljYXRvclwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwic3Bpbm5lciBzcGlubmVyLWFjY2VudCBzcGlubmVyLWJvdW5jZS1taWRkbGVcIj48L2Rpdj5cbiAgICA8L2Rpdj5cblxuICAgIDwhLS0gU2hvdyB0aGUgbmFtZSBvZiB0aGUgY3VycmVudCBub2RlIC0tPlxuICAgIDxzcGFuIGNsYXNzPVwiaGllcmFyY2h5LWJhci1ub2RlLXRpdGxlXCI+TG9hZGluZy4uLjwvc3Bhbj5cbjwvbmctdGVtcGxhdGU+YCxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgICB2aWV3UHJvdmlkZXJzOiBbSGllcmFyY2h5QmFyU2VydmljZV1cbn0pXG5leHBvcnQgY2xhc3MgSGllcmFyY2h5QmFyQ29tcG9uZW50IGltcGxlbWVudHMgT25EZXN0cm95IHtcblxuICAgIEBJbnB1dCgpIHNldCByb290KG5vZGU6IEhpZXJhcmNoeUJhck5vZGUpIHtcbiAgICAgICAgdGhpcy5oaWVyYXJjaHlCYXIuc2V0Um9vdE5vZGUobm9kZSk7XG4gICAgfVxuXG4gICAgQElucHV0KCkgc2V0IHNlbGVjdGVkKG5vZGU6IEhpZXJhcmNoeUJhck5vZGUpIHtcbiAgICAgICAgdGhpcy5oaWVyYXJjaHlCYXIuc2VsZWN0Tm9kZShub2RlKTtcbiAgICB9XG5cbiAgICBASW5wdXQoKSBsb2FkaW5nSW5kaWNhdG9yOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gICAgQE91dHB1dCgpIHNlbGVjdGVkQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxIaWVyYXJjaHlCYXJOb2RlPigpO1xuICAgIEBWaWV3Q2hpbGQoJ25vZGVsaXN0Jykgbm9kZWxpc3Q6IEVsZW1lbnRSZWY7XG4gICAgQFZpZXdDaGlsZHJlbignbm9kZUVsZW1lbnQnKSBub2RlczogUXVlcnlMaXN0PEVsZW1lbnRSZWY+O1xuXG4gICAgb3ZlcmZsb3ckID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gICAgb3ZlcmZsb3dOb2RlcyQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PEhpZXJhcmNoeUJhck5vZGVbXT4oW10pO1xuXG4gICAgcHJpdmF0ZSBfc3Vic2NyaXB0aW9uID0gbmV3IFN1YnNjcmlwdGlvbigpO1xuXG4gICAgY29uc3RydWN0b3IocHVibGljIGhpZXJhcmNoeUJhcjogSGllcmFyY2h5QmFyU2VydmljZSkge1xuXG4gICAgICAgIC8vIHN1YnNjcmliZSB0byBjaGFuZ2VzIGluIHRoZSBzZWxlY3RlZCBub2RlXG4gICAgICAgIGNvbnN0IHNlbGVjdGVkID0gaGllcmFyY2h5QmFyLm5vZGVzJC5zdWJzY3JpYmUobm9kZXMgPT4gdGhpcy5zZWxlY3RlZENoYW5nZS5lbWl0KG5vZGVzLmxlbmd0aCA9PT0gMCA/IG51bGwgOiBub2Rlc1tub2Rlcy5sZW5ndGggLSAxXSkpO1xuICAgICAgICBjb25zdCBjaGFuZ2VkID0gaGllcmFyY2h5QmFyLm5vZGVzJC5waXBlKGRlYm91bmNlVGltZSgwKSkuc3Vic2NyaWJlKCgpID0+IHRoaXMuc2Nyb2xsSW50b1ZpZXcoKSk7XG5cbiAgICAgICAgLy8gc3RvcmUgc3Vic2NyaXB0aW9uc1xuICAgICAgICB0aGlzLl9zdWJzY3JpcHRpb24uYWRkKHNlbGVjdGVkKTtcbiAgICAgICAgdGhpcy5fc3Vic2NyaXB0aW9uLmFkZChjaGFuZ2VkKTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogV2hlbiB0aGVyZSBpcyBvdmVyZmxvdyBlbnN1cmUgdGhhdCB0aGUgcmlnaHRtb3N0XG4gICAgICogbm9kZSByZW1haW5zIGluIHZpZXcgYXQgYWxsIHRpbWVzLiBUaGUgbm9kZXMgbm8gbG9uZ2VyXG4gICAgICogdmlzaWJsZSBiZSBiZSBkaXNwbGF5ZWQgaW4gYSBwb3BvdmVyIGF2YWlsYWJsZSBvbiB0aGVcbiAgICAgKiBvdmVyZmxvdyBpbmRpY2F0b3JcbiAgICAgKi9cbiAgICBzY3JvbGxJbnRvVmlldygpOiB2b2lkIHtcblxuICAgICAgICBpZiAoIXRoaXMubm9kZWxpc3QpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGdldCB0aGUgbmF0aXZlIGVsZW1lbnRcbiAgICAgICAgY29uc3QgeyBuYXRpdmVFbGVtZW50IH0gPSB0aGlzLm5vZGVsaXN0O1xuXG4gICAgICAgIC8vIGVtaXQgd2hldGhlciBvciBub3QgdGhlcmUgaXMgb3ZlcmZsb3dcbiAgICAgICAgdGhpcy5vdmVyZmxvdyQubmV4dChuYXRpdmVFbGVtZW50LnNjcm9sbFdpZHRoID4gbmF0aXZlRWxlbWVudC5vZmZzZXRXaWR0aCk7XG5cbiAgICAgICAgLy8gaWYgdGhlIGhpZXJhcmNoeSBiYXIgY29udGVudHMgZG8gbm90IG92ZXJmbG93IHRoZW4gZG8gbm90aGluZ1xuICAgICAgICBpZiAobmF0aXZlRWxlbWVudC5zY3JvbGxXaWR0aCA+IG5hdGl2ZUVsZW1lbnQub2Zmc2V0V2lkdGgpIHtcblxuICAgICAgICAgICAgLy8gZGV0ZXJtaW5lIHRoZSBhbW91bnQgb2Ygb3ZlcmZsb3dcbiAgICAgICAgICAgIGNvbnN0IG92ZXJmbG93QW1vdW50ID0gbmF0aXZlRWxlbWVudC5zY3JvbGxXaWR0aCAtIG5hdGl2ZUVsZW1lbnQub2Zmc2V0V2lkdGg7XG5cbiAgICAgICAgICAgIC8vIGRldGVybWluZSB3aGljaCBub2RlcyBhcmUgbm90IGZ1bGx5IHZpc2libGVcbiAgICAgICAgICAgIHRoaXMub3ZlcmZsb3dOb2RlcyQubmV4dChcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGVzLmZpbHRlcihub2RlID0+IG5vZGUubmF0aXZlRWxlbWVudC5vZmZzZXRMZWZ0IDwgb3ZlcmZsb3dBbW91bnQpXG4gICAgICAgICAgICAgICAgICAgIC5tYXAoKG5vZGUsIGluZGV4KSA9PiB0aGlzLmhpZXJhcmNoeUJhci5ub2RlcyQudmFsdWVbaW5kZXhdKVxuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgLy8gbW92ZSB0aGUgc2Nyb2xsIHBvc2l0aW9uIHRvIGFsd2F5cyBzaG93IHRoZSBsYXN0IGl0bWVcbiAgICAgICAgICAgIHRoaXMubm9kZWxpc3QubmF0aXZlRWxlbWVudC5zY3JvbGxMZWZ0ID0gb3ZlcmZsb3dBbW91bnQ7XG4gICAgICAgIH1cbiAgICB9XG59Il19