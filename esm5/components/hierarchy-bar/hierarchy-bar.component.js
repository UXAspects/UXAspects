/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output, QueryList, TemplateRef, ViewChild, ViewChildren } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs/Subscription';
import { debounceTime } from 'rxjs/operators';
import { HierarchyBarService } from './hierarchy-bar.service';
var HierarchyBarComponent = (function () {
    function HierarchyBarComponent(hierarchyBar) {
        var _this = this;
        this.hierarchyBar = hierarchyBar;
        this.selectedChange = new EventEmitter();
        this.overflow$ = new BehaviorSubject(false);
        this.overflowNodes$ = new BehaviorSubject([]);
        this._subscription = new Subscription();
        // subscribe to changes in the selected node
        var /** @type {?} */ selected = hierarchyBar.nodes$.subscribe(function (nodes) { return _this.selectedChange.emit(nodes.length === 0 ? null : nodes[nodes.length - 1]); });
        var /** @type {?} */ changed = hierarchyBar.nodes$.pipe(debounceTime(0)).subscribe(function () { return _this.scrollIntoView(); });
        // store subscriptions
        this._subscription.add(selected);
        this._subscription.add(changed);
    }
    Object.defineProperty(HierarchyBarComponent.prototype, "root", {
        set: /**
         * @param {?} node
         * @return {?}
         */
        function (node) {
            this.hierarchyBar.setRootNode(node);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HierarchyBarComponent.prototype, "selected", {
        set: /**
         * @param {?} node
         * @return {?}
         */
        function (node) {
            this.hierarchyBar.selectNode(node);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    HierarchyBarComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._subscription.unsubscribe();
    };
    /**
     * When there is overflow ensure that the rightmost
     * node remains in view at all times. The nodes no longer
     * visible be be displayed in a popover available on the
     * overflow indicator
     */
    /**
     * When there is overflow ensure that the rightmost
     * node remains in view at all times. The nodes no longer
     * visible be be displayed in a popover available on the
     * overflow indicator
     * @return {?}
     */
    HierarchyBarComponent.prototype.scrollIntoView = /**
     * When there is overflow ensure that the rightmost
     * node remains in view at all times. The nodes no longer
     * visible be be displayed in a popover available on the
     * overflow indicator
     * @return {?}
     */
    function () {
        var _this = this;
        if (!this.nodelist) {
            return;
        }
        // get the native element
        var nativeElement = this.nodelist.nativeElement;
        // emit whether or not there is overflow
        this.overflow$.next(nativeElement.scrollWidth > nativeElement.offsetWidth);
        // if the hierarchy bar contents do not overflow then do nothing
        if (nativeElement.scrollWidth > nativeElement.offsetWidth) {
            // determine the amount of overflow
            var /** @type {?} */ overflowAmount_1 = nativeElement.scrollWidth - nativeElement.offsetWidth;
            // determine which nodes are not fully visible
            this.overflowNodes$.next(this.nodes.filter(function (node) { return node.nativeElement.offsetLeft < overflowAmount_1; })
                .map(function (node, index) { return _this.hierarchyBar.nodes$.value[index]; }));
            // move the scroll position to always show the last itme
            this.nodelist.nativeElement.scrollLeft = overflowAmount_1;
        }
    };
    HierarchyBarComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ux-hierarchy-bar',
                    template: "<!-- Allow content to be placed on the left of the items -->\n<aside class=\"hierarchy-bar-addons\">\n    <ng-content select=\"[uxHierarchyBarLeftAddon]\"></ng-content>\n</aside>\n\n<main #nodelist class=\"hierarchy-bar-nodes\" (uxResize)=\"scrollIntoView()\">\n\n    <div *ngIf=\"overflow$ | async\"\n         #popover=\"ux-popover\"\n         class=\"hierarchy-bar-overflow-indicator\"\n         [style.left.px]=\"nodelist.scrollLeft\"\n         [uxPopover]=\"overflow\"\n         [popoverContext]=\"{ popover: popover }\"\n         placement=\"bottom\"\n         popoverClass=\"hierarchy-bar-popover\">\n        . . .\n    </div>\n\n    <div #nodeElement class=\"hierarchy-bar-node\"\n         *ngFor=\"let node of hierarchyBar.nodes$ | async\">\n\n        <button class=\"hierarchy-bar-node-content\"\n                [attr.aria-label]=\"node.title\"\n                (click)=\"hierarchyBar.selectNode(node)\">\n\n            <!-- Show an icon if specifed -->\n            <img class=\"hierarchy-bar-node-icon\" *ngIf=\"node.icon\" [src]=\"node.icon\" alt=\"Hierarchy Bar Icon\">\n\n            <!-- Show the name of the current node -->\n            <span class=\"hierarchy-bar-node-title\">{{ node.title }}</span>\n\n        </button>\n\n        <!-- Show a dropdown arrow if there are children -->\n        <button *ngIf=\"node.children\"\n              #popover=\"ux-popover\"\n              aria-label=\"Show children\"\n              role=\"button\"\n              class=\"hierarchy-bar-node-arrow hpe-icon hpe-next\"\n              [uxPopover]=\"content\"\n              [popoverContext]=\"{ node: node, popover: popover }\"\n              placement=\"bottom\"\n              popoverClass=\"hierarchy-bar-popover\"\n              tabindex=\"0\">\n        </button>\n\n    </div>\n\n</main>\n\n<!-- Allow content to be placed on the right of the items -->\n<aside class=\"hierarchy-bar-addons\">\n    <ng-content select=\"[uxHierarchyBarRightAddon]\"></ng-content>\n</aside>\n\n<!-- Template for the popover list -->\n<ng-template #content let-node=\"node\" let-popover=\"popover\">\n\n    <!-- Loading Indicator -->\n    <ul class=\"hierarchy-bar-node-list\" *ngIf=\"(hierarchyBar.getChildren(node) | async).loading\">\n\n        <li class=\"hierarchy-bar-node-list-item\">\n            <ng-container [ngTemplateOutlet]=\"loadingIndicator || defaultLoadingIndicator\"></ng-container>\n        </li>\n    </ul>\n\n    <!-- List of children -->\n    <ul class=\"hierarchy-bar-node-list\" *ngIf=\"!(hierarchyBar.getChildren(node) | async).loading\">\n\n        <li *ngFor=\"let child of (hierarchyBar.getChildren(node) | async).children; let first = first\"\n            class=\"hierarchy-bar-node-list-item\"\n            [focusIf]=\"first\"\n            tabindex=\"0\"\n            (keydown.enter)=\"hierarchyBar.selectNode(child); popover.hide()\"\n            (click)=\"hierarchyBar.selectNode(child); popover.hide()\">\n\n            <!-- Show an icon if specifed -->\n            <img class=\"hierarchy-bar-node-icon\" *ngIf=\"child.icon\" [src]=\"child.icon\" alt=\"Hierarchy Bar Icon\">\n\n            <!-- Show the name of the current node -->\n            <span class=\"hierarchy-bar-node-title\">{{ child.title }}</span>\n\n        </li>\n\n    </ul>\n</ng-template>\n\n<!-- Template for the overflow popover list -->\n<ng-template #overflow let-popover=\"popover\">\n\n    <ul class=\"hierarchy-bar-node-list\">\n\n        <li *ngFor=\"let child of overflowNodes$ | async; let first = first\"\n            class=\"hierarchy-bar-node-list-item\"\n            tabindex=\"0\"\n            [focusIf]=\"first\"\n            (click)=\"hierarchyBar.selectNode(child); popover.hide()\"\n            (keydown.enter)=\"hierarchyBar.selectNode(child); popover.hide()\">\n\n            <!-- Show an icon if specifed -->\n            <img class=\"hierarchy-bar-node-icon\" *ngIf=\"child.icon\" [src]=\"child.icon\" alt=\"Hierarchy Bar Icon\">\n\n            <!-- Show the name of the current node -->\n            <span class=\"hierarchy-bar-node-title\">{{ child.title }}</span>\n\n        </li>\n\n    </ul>\n</ng-template>\n\n<!-- Loading Indicator Template -->\n<ng-template #defaultLoadingIndicator>\n    <div class=\"hierarchy-bar-node-icon\" alt=\"Hierarchy Bar Loading Indicator\">\n        <div class=\"spinner spinner-accent spinner-bounce-middle\"></div>\n    </div>\n\n    <!-- Show the name of the current node -->\n    <span class=\"hierarchy-bar-node-title\">Loading...</span>\n</ng-template>",
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    viewProviders: [HierarchyBarService]
                },] },
    ];
    /** @nocollapse */
    HierarchyBarComponent.ctorParameters = function () { return [
        { type: HierarchyBarService, },
    ]; };
    HierarchyBarComponent.propDecorators = {
        "root": [{ type: Input },],
        "selected": [{ type: Input },],
        "loadingIndicator": [{ type: Input },],
        "selectedChange": [{ type: Output },],
        "nodelist": [{ type: ViewChild, args: ['nodelist',] },],
        "nodes": [{ type: ViewChildren, args: ['nodeElement',] },],
    };
    return HierarchyBarComponent;
}());
export { HierarchyBarComponent };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGllcmFyY2h5LWJhci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9oaWVyYXJjaHktYmFyL2hpZXJhcmNoeS1iYXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFhLE1BQU0sRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDeEssT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNqRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDOUMsT0FBTyxFQUFvQixtQkFBbUIsRUFBRSxNQUFNLHlCQUF5QixDQUFDOztJQW1KNUUsK0JBQW1CLFlBQWlDO1FBQXBELGlCQVNDO1FBVGtCLGlCQUFZLEdBQVosWUFBWSxDQUFxQjs4QkFUekIsSUFBSSxZQUFZLEVBQW9CO3lCQUluRCxJQUFJLGVBQWUsQ0FBVSxLQUFLLENBQUM7OEJBQzlCLElBQUksZUFBZSxDQUFxQixFQUFFLENBQUM7NkJBRXBDLElBQUksWUFBWSxFQUFFOztRQUt0QyxxQkFBTSxRQUFRLEdBQUcsWUFBWSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsVUFBQSxLQUFLLElBQUksT0FBQSxLQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxLQUFLLENBQUMsR0FBRyxJQUFJLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBN0UsQ0FBNkUsQ0FBQyxDQUFDO1FBQ3ZJLHFCQUFNLE9BQU8sR0FBRyxZQUFZLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsY0FBTSxPQUFBLEtBQUksQ0FBQyxjQUFjLEVBQUUsRUFBckIsQ0FBcUIsQ0FBQyxDQUFDOztRQUdqRyxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNqQyxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztLQUNuQzswQkE1QlksdUNBQUk7Ozs7O2tCQUFDLElBQXNCO1lBQ3BDLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDOzs7OzswQkFHM0IsMkNBQVE7Ozs7O2tCQUFDLElBQXNCO1lBQ3hDLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDOzs7Ozs7OztJQXlCdkMsMkNBQVc7OztJQUFYO1FBQ0ksSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLEVBQUUsQ0FBQztLQUNwQztJQUVEOzs7OztPQUtHOzs7Ozs7OztJQUNILDhDQUFjOzs7Ozs7O0lBQWQ7UUFBQSxpQkEyQkM7UUF6QkcsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUNqQixNQUFNLENBQUM7U0FDVjs7UUFHTyxJQUFBLDJDQUFhLENBQW1COztRQUd4QyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxHQUFHLGFBQWEsQ0FBQyxXQUFXLENBQUMsQ0FBQzs7UUFHM0UsRUFBRSxDQUFDLENBQUMsYUFBYSxDQUFDLFdBQVcsR0FBRyxhQUFhLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQzs7WUFHeEQscUJBQU0sZ0JBQWMsR0FBRyxhQUFhLENBQUMsV0FBVyxHQUFHLGFBQWEsQ0FBQyxXQUFXLENBQUM7O1lBRzdFLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUNwQixJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxVQUFBLElBQUksSUFBSSxPQUFBLElBQUksQ0FBQyxhQUFhLENBQUMsVUFBVSxHQUFHLGdCQUFjLEVBQTlDLENBQThDLENBQUM7aUJBQ3BFLEdBQUcsQ0FBQyxVQUFDLElBQUksRUFBRSxLQUFLLElBQUssT0FBQSxLQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQXJDLENBQXFDLENBQUMsQ0FDbkUsQ0FBQzs7WUFHRixJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxVQUFVLEdBQUcsZ0JBQWMsQ0FBQztTQUMzRDtLQUNKOztnQkFqTUosU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSxrQkFBa0I7b0JBQzVCLFFBQVEsRUFBRSxvNklBc0hDO29CQUNYLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO29CQUMvQyxhQUFhLEVBQUUsQ0FBQyxtQkFBbUIsQ0FBQztpQkFDdkM7Ozs7Z0JBN0gwQixtQkFBbUI7Ozt5QkFnSXpDLEtBQUs7NkJBSUwsS0FBSztxQ0FJTCxLQUFLO21DQUVMLE1BQU07NkJBQ04sU0FBUyxTQUFDLFVBQVU7MEJBQ3BCLFlBQVksU0FBQyxhQUFhOztnQ0FoSi9COztTQWtJYSxxQkFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkRlc3Ryb3ksIE91dHB1dCwgUXVlcnlMaXN0LCBUZW1wbGF0ZVJlZiwgVmlld0NoaWxkLCBWaWV3Q2hpbGRyZW4gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMvQmVoYXZpb3JTdWJqZWN0JztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMvU3Vic2NyaXB0aW9uJztcbmltcG9ydCB7IGRlYm91bmNlVGltZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IEhpZXJhcmNoeUJhck5vZGUsIEhpZXJhcmNoeUJhclNlcnZpY2UgfSBmcm9tICcuL2hpZXJhcmNoeS1iYXIuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAndXgtaGllcmFyY2h5LWJhcicsXG4gICAgdGVtcGxhdGU6IGA8IS0tIEFsbG93IGNvbnRlbnQgdG8gYmUgcGxhY2VkIG9uIHRoZSBsZWZ0IG9mIHRoZSBpdGVtcyAtLT5cbjxhc2lkZSBjbGFzcz1cImhpZXJhcmNoeS1iYXItYWRkb25zXCI+XG4gICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiW3V4SGllcmFyY2h5QmFyTGVmdEFkZG9uXVwiPjwvbmctY29udGVudD5cbjwvYXNpZGU+XG5cbjxtYWluICNub2RlbGlzdCBjbGFzcz1cImhpZXJhcmNoeS1iYXItbm9kZXNcIiAodXhSZXNpemUpPVwic2Nyb2xsSW50b1ZpZXcoKVwiPlxuXG4gICAgPGRpdiAqbmdJZj1cIm92ZXJmbG93JCB8IGFzeW5jXCJcbiAgICAgICAgICNwb3BvdmVyPVwidXgtcG9wb3ZlclwiXG4gICAgICAgICBjbGFzcz1cImhpZXJhcmNoeS1iYXItb3ZlcmZsb3ctaW5kaWNhdG9yXCJcbiAgICAgICAgIFtzdHlsZS5sZWZ0LnB4XT1cIm5vZGVsaXN0LnNjcm9sbExlZnRcIlxuICAgICAgICAgW3V4UG9wb3Zlcl09XCJvdmVyZmxvd1wiXG4gICAgICAgICBbcG9wb3ZlckNvbnRleHRdPVwieyBwb3BvdmVyOiBwb3BvdmVyIH1cIlxuICAgICAgICAgcGxhY2VtZW50PVwiYm90dG9tXCJcbiAgICAgICAgIHBvcG92ZXJDbGFzcz1cImhpZXJhcmNoeS1iYXItcG9wb3ZlclwiPlxuICAgICAgICAuIC4gLlxuICAgIDwvZGl2PlxuXG4gICAgPGRpdiAjbm9kZUVsZW1lbnQgY2xhc3M9XCJoaWVyYXJjaHktYmFyLW5vZGVcIlxuICAgICAgICAgKm5nRm9yPVwibGV0IG5vZGUgb2YgaGllcmFyY2h5QmFyLm5vZGVzJCB8IGFzeW5jXCI+XG5cbiAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImhpZXJhcmNoeS1iYXItbm9kZS1jb250ZW50XCJcbiAgICAgICAgICAgICAgICBbYXR0ci5hcmlhLWxhYmVsXT1cIm5vZGUudGl0bGVcIlxuICAgICAgICAgICAgICAgIChjbGljayk9XCJoaWVyYXJjaHlCYXIuc2VsZWN0Tm9kZShub2RlKVwiPlxuXG4gICAgICAgICAgICA8IS0tIFNob3cgYW4gaWNvbiBpZiBzcGVjaWZlZCAtLT5cbiAgICAgICAgICAgIDxpbWcgY2xhc3M9XCJoaWVyYXJjaHktYmFyLW5vZGUtaWNvblwiICpuZ0lmPVwibm9kZS5pY29uXCIgW3NyY109XCJub2RlLmljb25cIiBhbHQ9XCJIaWVyYXJjaHkgQmFyIEljb25cIj5cblxuICAgICAgICAgICAgPCEtLSBTaG93IHRoZSBuYW1lIG9mIHRoZSBjdXJyZW50IG5vZGUgLS0+XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cImhpZXJhcmNoeS1iYXItbm9kZS10aXRsZVwiPnt7IG5vZGUudGl0bGUgfX08L3NwYW4+XG5cbiAgICAgICAgPC9idXR0b24+XG5cbiAgICAgICAgPCEtLSBTaG93IGEgZHJvcGRvd24gYXJyb3cgaWYgdGhlcmUgYXJlIGNoaWxkcmVuIC0tPlxuICAgICAgICA8YnV0dG9uICpuZ0lmPVwibm9kZS5jaGlsZHJlblwiXG4gICAgICAgICAgICAgICNwb3BvdmVyPVwidXgtcG9wb3ZlclwiXG4gICAgICAgICAgICAgIGFyaWEtbGFiZWw9XCJTaG93IGNoaWxkcmVuXCJcbiAgICAgICAgICAgICAgcm9sZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgIGNsYXNzPVwiaGllcmFyY2h5LWJhci1ub2RlLWFycm93IGhwZS1pY29uIGhwZS1uZXh0XCJcbiAgICAgICAgICAgICAgW3V4UG9wb3Zlcl09XCJjb250ZW50XCJcbiAgICAgICAgICAgICAgW3BvcG92ZXJDb250ZXh0XT1cInsgbm9kZTogbm9kZSwgcG9wb3ZlcjogcG9wb3ZlciB9XCJcbiAgICAgICAgICAgICAgcGxhY2VtZW50PVwiYm90dG9tXCJcbiAgICAgICAgICAgICAgcG9wb3ZlckNsYXNzPVwiaGllcmFyY2h5LWJhci1wb3BvdmVyXCJcbiAgICAgICAgICAgICAgdGFiaW5kZXg9XCIwXCI+XG4gICAgICAgIDwvYnV0dG9uPlxuXG4gICAgPC9kaXY+XG5cbjwvbWFpbj5cblxuPCEtLSBBbGxvdyBjb250ZW50IHRvIGJlIHBsYWNlZCBvbiB0aGUgcmlnaHQgb2YgdGhlIGl0ZW1zIC0tPlxuPGFzaWRlIGNsYXNzPVwiaGllcmFyY2h5LWJhci1hZGRvbnNcIj5cbiAgICA8bmctY29udGVudCBzZWxlY3Q9XCJbdXhIaWVyYXJjaHlCYXJSaWdodEFkZG9uXVwiPjwvbmctY29udGVudD5cbjwvYXNpZGU+XG5cbjwhLS0gVGVtcGxhdGUgZm9yIHRoZSBwb3BvdmVyIGxpc3QgLS0+XG48bmctdGVtcGxhdGUgI2NvbnRlbnQgbGV0LW5vZGU9XCJub2RlXCIgbGV0LXBvcG92ZXI9XCJwb3BvdmVyXCI+XG5cbiAgICA8IS0tIExvYWRpbmcgSW5kaWNhdG9yIC0tPlxuICAgIDx1bCBjbGFzcz1cImhpZXJhcmNoeS1iYXItbm9kZS1saXN0XCIgKm5nSWY9XCIoaGllcmFyY2h5QmFyLmdldENoaWxkcmVuKG5vZGUpIHwgYXN5bmMpLmxvYWRpbmdcIj5cblxuICAgICAgICA8bGkgY2xhc3M9XCJoaWVyYXJjaHktYmFyLW5vZGUtbGlzdC1pdGVtXCI+XG4gICAgICAgICAgICA8bmctY29udGFpbmVyIFtuZ1RlbXBsYXRlT3V0bGV0XT1cImxvYWRpbmdJbmRpY2F0b3IgfHwgZGVmYXVsdExvYWRpbmdJbmRpY2F0b3JcIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgPC9saT5cbiAgICA8L3VsPlxuXG4gICAgPCEtLSBMaXN0IG9mIGNoaWxkcmVuIC0tPlxuICAgIDx1bCBjbGFzcz1cImhpZXJhcmNoeS1iYXItbm9kZS1saXN0XCIgKm5nSWY9XCIhKGhpZXJhcmNoeUJhci5nZXRDaGlsZHJlbihub2RlKSB8IGFzeW5jKS5sb2FkaW5nXCI+XG5cbiAgICAgICAgPGxpICpuZ0Zvcj1cImxldCBjaGlsZCBvZiAoaGllcmFyY2h5QmFyLmdldENoaWxkcmVuKG5vZGUpIHwgYXN5bmMpLmNoaWxkcmVuOyBsZXQgZmlyc3QgPSBmaXJzdFwiXG4gICAgICAgICAgICBjbGFzcz1cImhpZXJhcmNoeS1iYXItbm9kZS1saXN0LWl0ZW1cIlxuICAgICAgICAgICAgW2ZvY3VzSWZdPVwiZmlyc3RcIlxuICAgICAgICAgICAgdGFiaW5kZXg9XCIwXCJcbiAgICAgICAgICAgIChrZXlkb3duLmVudGVyKT1cImhpZXJhcmNoeUJhci5zZWxlY3ROb2RlKGNoaWxkKTsgcG9wb3Zlci5oaWRlKClcIlxuICAgICAgICAgICAgKGNsaWNrKT1cImhpZXJhcmNoeUJhci5zZWxlY3ROb2RlKGNoaWxkKTsgcG9wb3Zlci5oaWRlKClcIj5cblxuICAgICAgICAgICAgPCEtLSBTaG93IGFuIGljb24gaWYgc3BlY2lmZWQgLS0+XG4gICAgICAgICAgICA8aW1nIGNsYXNzPVwiaGllcmFyY2h5LWJhci1ub2RlLWljb25cIiAqbmdJZj1cImNoaWxkLmljb25cIiBbc3JjXT1cImNoaWxkLmljb25cIiBhbHQ9XCJIaWVyYXJjaHkgQmFyIEljb25cIj5cblxuICAgICAgICAgICAgPCEtLSBTaG93IHRoZSBuYW1lIG9mIHRoZSBjdXJyZW50IG5vZGUgLS0+XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cImhpZXJhcmNoeS1iYXItbm9kZS10aXRsZVwiPnt7IGNoaWxkLnRpdGxlIH19PC9zcGFuPlxuXG4gICAgICAgIDwvbGk+XG5cbiAgICA8L3VsPlxuPC9uZy10ZW1wbGF0ZT5cblxuPCEtLSBUZW1wbGF0ZSBmb3IgdGhlIG92ZXJmbG93IHBvcG92ZXIgbGlzdCAtLT5cbjxuZy10ZW1wbGF0ZSAjb3ZlcmZsb3cgbGV0LXBvcG92ZXI9XCJwb3BvdmVyXCI+XG5cbiAgICA8dWwgY2xhc3M9XCJoaWVyYXJjaHktYmFyLW5vZGUtbGlzdFwiPlxuXG4gICAgICAgIDxsaSAqbmdGb3I9XCJsZXQgY2hpbGQgb2Ygb3ZlcmZsb3dOb2RlcyQgfCBhc3luYzsgbGV0IGZpcnN0ID0gZmlyc3RcIlxuICAgICAgICAgICAgY2xhc3M9XCJoaWVyYXJjaHktYmFyLW5vZGUtbGlzdC1pdGVtXCJcbiAgICAgICAgICAgIHRhYmluZGV4PVwiMFwiXG4gICAgICAgICAgICBbZm9jdXNJZl09XCJmaXJzdFwiXG4gICAgICAgICAgICAoY2xpY2spPVwiaGllcmFyY2h5QmFyLnNlbGVjdE5vZGUoY2hpbGQpOyBwb3BvdmVyLmhpZGUoKVwiXG4gICAgICAgICAgICAoa2V5ZG93bi5lbnRlcik9XCJoaWVyYXJjaHlCYXIuc2VsZWN0Tm9kZShjaGlsZCk7IHBvcG92ZXIuaGlkZSgpXCI+XG5cbiAgICAgICAgICAgIDwhLS0gU2hvdyBhbiBpY29uIGlmIHNwZWNpZmVkIC0tPlxuICAgICAgICAgICAgPGltZyBjbGFzcz1cImhpZXJhcmNoeS1iYXItbm9kZS1pY29uXCIgKm5nSWY9XCJjaGlsZC5pY29uXCIgW3NyY109XCJjaGlsZC5pY29uXCIgYWx0PVwiSGllcmFyY2h5IEJhciBJY29uXCI+XG5cbiAgICAgICAgICAgIDwhLS0gU2hvdyB0aGUgbmFtZSBvZiB0aGUgY3VycmVudCBub2RlIC0tPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJoaWVyYXJjaHktYmFyLW5vZGUtdGl0bGVcIj57eyBjaGlsZC50aXRsZSB9fTwvc3Bhbj5cblxuICAgICAgICA8L2xpPlxuXG4gICAgPC91bD5cbjwvbmctdGVtcGxhdGU+XG5cbjwhLS0gTG9hZGluZyBJbmRpY2F0b3IgVGVtcGxhdGUgLS0+XG48bmctdGVtcGxhdGUgI2RlZmF1bHRMb2FkaW5nSW5kaWNhdG9yPlxuICAgIDxkaXYgY2xhc3M9XCJoaWVyYXJjaHktYmFyLW5vZGUtaWNvblwiIGFsdD1cIkhpZXJhcmNoeSBCYXIgTG9hZGluZyBJbmRpY2F0b3JcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInNwaW5uZXIgc3Bpbm5lci1hY2NlbnQgc3Bpbm5lci1ib3VuY2UtbWlkZGxlXCI+PC9kaXY+XG4gICAgPC9kaXY+XG5cbiAgICA8IS0tIFNob3cgdGhlIG5hbWUgb2YgdGhlIGN1cnJlbnQgbm9kZSAtLT5cbiAgICA8c3BhbiBjbGFzcz1cImhpZXJhcmNoeS1iYXItbm9kZS10aXRsZVwiPkxvYWRpbmcuLi48L3NwYW4+XG48L25nLXRlbXBsYXRlPmAsXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gICAgdmlld1Byb3ZpZGVyczogW0hpZXJhcmNoeUJhclNlcnZpY2VdXG59KVxuZXhwb3J0IGNsYXNzIEhpZXJhcmNoeUJhckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG5cbiAgICBASW5wdXQoKSBzZXQgcm9vdChub2RlOiBIaWVyYXJjaHlCYXJOb2RlKSB7XG4gICAgICAgIHRoaXMuaGllcmFyY2h5QmFyLnNldFJvb3ROb2RlKG5vZGUpO1xuICAgIH1cblxuICAgIEBJbnB1dCgpIHNldCBzZWxlY3RlZChub2RlOiBIaWVyYXJjaHlCYXJOb2RlKSB7XG4gICAgICAgIHRoaXMuaGllcmFyY2h5QmFyLnNlbGVjdE5vZGUobm9kZSk7XG4gICAgfVxuXG4gICAgQElucHV0KCkgbG9hZGluZ0luZGljYXRvcjogVGVtcGxhdGVSZWY8YW55PjtcblxuICAgIEBPdXRwdXQoKSBzZWxlY3RlZENoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8SGllcmFyY2h5QmFyTm9kZT4oKTtcbiAgICBAVmlld0NoaWxkKCdub2RlbGlzdCcpIG5vZGVsaXN0OiBFbGVtZW50UmVmO1xuICAgIEBWaWV3Q2hpbGRyZW4oJ25vZGVFbGVtZW50Jykgbm9kZXM6IFF1ZXJ5TGlzdDxFbGVtZW50UmVmPjtcblxuICAgIG92ZXJmbG93JCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICAgIG92ZXJmbG93Tm9kZXMkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxIaWVyYXJjaHlCYXJOb2RlW10+KFtdKTtcblxuICAgIHByaXZhdGUgX3N1YnNjcmlwdGlvbiA9IG5ldyBTdWJzY3JpcHRpb24oKTtcblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBoaWVyYXJjaHlCYXI6IEhpZXJhcmNoeUJhclNlcnZpY2UpIHtcblxuICAgICAgICAvLyBzdWJzY3JpYmUgdG8gY2hhbmdlcyBpbiB0aGUgc2VsZWN0ZWQgbm9kZVxuICAgICAgICBjb25zdCBzZWxlY3RlZCA9IGhpZXJhcmNoeUJhci5ub2RlcyQuc3Vic2NyaWJlKG5vZGVzID0+IHRoaXMuc2VsZWN0ZWRDaGFuZ2UuZW1pdChub2Rlcy5sZW5ndGggPT09IDAgPyBudWxsIDogbm9kZXNbbm9kZXMubGVuZ3RoIC0gMV0pKTtcbiAgICAgICAgY29uc3QgY2hhbmdlZCA9IGhpZXJhcmNoeUJhci5ub2RlcyQucGlwZShkZWJvdW5jZVRpbWUoMCkpLnN1YnNjcmliZSgoKSA9PiB0aGlzLnNjcm9sbEludG9WaWV3KCkpO1xuXG4gICAgICAgIC8vIHN0b3JlIHN1YnNjcmlwdGlvbnNcbiAgICAgICAgdGhpcy5fc3Vic2NyaXB0aW9uLmFkZChzZWxlY3RlZCk7XG4gICAgICAgIHRoaXMuX3N1YnNjcmlwdGlvbi5hZGQoY2hhbmdlZCk7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX3N1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFdoZW4gdGhlcmUgaXMgb3ZlcmZsb3cgZW5zdXJlIHRoYXQgdGhlIHJpZ2h0bW9zdFxuICAgICAqIG5vZGUgcmVtYWlucyBpbiB2aWV3IGF0IGFsbCB0aW1lcy4gVGhlIG5vZGVzIG5vIGxvbmdlclxuICAgICAqIHZpc2libGUgYmUgYmUgZGlzcGxheWVkIGluIGEgcG9wb3ZlciBhdmFpbGFibGUgb24gdGhlXG4gICAgICogb3ZlcmZsb3cgaW5kaWNhdG9yXG4gICAgICovXG4gICAgc2Nyb2xsSW50b1ZpZXcoKTogdm9pZCB7XG5cbiAgICAgICAgaWYgKCF0aGlzLm5vZGVsaXN0KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyBnZXQgdGhlIG5hdGl2ZSBlbGVtZW50XG4gICAgICAgIGNvbnN0IHsgbmF0aXZlRWxlbWVudCB9ID0gdGhpcy5ub2RlbGlzdDtcblxuICAgICAgICAvLyBlbWl0IHdoZXRoZXIgb3Igbm90IHRoZXJlIGlzIG92ZXJmbG93XG4gICAgICAgIHRoaXMub3ZlcmZsb3ckLm5leHQobmF0aXZlRWxlbWVudC5zY3JvbGxXaWR0aCA+IG5hdGl2ZUVsZW1lbnQub2Zmc2V0V2lkdGgpO1xuXG4gICAgICAgIC8vIGlmIHRoZSBoaWVyYXJjaHkgYmFyIGNvbnRlbnRzIGRvIG5vdCBvdmVyZmxvdyB0aGVuIGRvIG5vdGhpbmdcbiAgICAgICAgaWYgKG5hdGl2ZUVsZW1lbnQuc2Nyb2xsV2lkdGggPiBuYXRpdmVFbGVtZW50Lm9mZnNldFdpZHRoKSB7XG5cbiAgICAgICAgICAgIC8vIGRldGVybWluZSB0aGUgYW1vdW50IG9mIG92ZXJmbG93XG4gICAgICAgICAgICBjb25zdCBvdmVyZmxvd0Ftb3VudCA9IG5hdGl2ZUVsZW1lbnQuc2Nyb2xsV2lkdGggLSBuYXRpdmVFbGVtZW50Lm9mZnNldFdpZHRoO1xuXG4gICAgICAgICAgICAvLyBkZXRlcm1pbmUgd2hpY2ggbm9kZXMgYXJlIG5vdCBmdWxseSB2aXNpYmxlXG4gICAgICAgICAgICB0aGlzLm92ZXJmbG93Tm9kZXMkLm5leHQoXG4gICAgICAgICAgICAgICAgdGhpcy5ub2Rlcy5maWx0ZXIobm9kZSA9PiBub2RlLm5hdGl2ZUVsZW1lbnQub2Zmc2V0TGVmdCA8IG92ZXJmbG93QW1vdW50KVxuICAgICAgICAgICAgICAgICAgICAubWFwKChub2RlLCBpbmRleCkgPT4gdGhpcy5oaWVyYXJjaHlCYXIubm9kZXMkLnZhbHVlW2luZGV4XSlcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIC8vIG1vdmUgdGhlIHNjcm9sbCBwb3NpdGlvbiB0byBhbHdheXMgc2hvdyB0aGUgbGFzdCBpdG1lXG4gICAgICAgICAgICB0aGlzLm5vZGVsaXN0Lm5hdGl2ZUVsZW1lbnQuc2Nyb2xsTGVmdCA9IG92ZXJmbG93QW1vdW50O1xuICAgICAgICB9XG4gICAgfVxufSJdfQ==