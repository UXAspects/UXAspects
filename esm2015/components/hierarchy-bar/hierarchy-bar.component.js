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
                template: "<!-- Allow content to be placed on the left of the items -->\n<aside class=\"hierarchy-bar-addons\">\n    <ng-content select=\"[uxHierarchyBarLeftAddon]\"></ng-content>\n</aside>\n\n<main #nodelist class=\"hierarchy-bar-nodes\" (uxResize)=\"scrollIntoView()\">\n\n    <div *ngIf=\"overflow$ | async\"\n         #popover=\"ux-popover\"\n         class=\"hierarchy-bar-overflow-indicator\"\n         [style.left.px]=\"nodelist.scrollLeft\"\n         [uxPopover]=\"overflow\"\n         [popoverContext]=\"{ popover: popover }\"\n         placement=\"bottom\"\n         popoverClass=\"hierarchy-bar-popover\">\n        . . .\n    </div>\n\n    <div #nodeElement class=\"hierarchy-bar-node\"\n         *ngFor=\"let node of hierarchyBar.nodes$ | async\">\n\n        <button class=\"hierarchy-bar-node-content\"\n                [attr.aria-label]=\"node.title\"\n                (click)=\"hierarchyBar.selectNode(node)\">\n\n            <!-- Show an icon if specifed -->\n            <img class=\"hierarchy-bar-node-icon\" *ngIf=\"node.icon\" [src]=\"node.icon\" alt=\"Hierarchy Bar Icon\">\n\n            <!-- Show the name of the current node -->\n            <span class=\"hierarchy-bar-node-title\">{{ node.title }}</span>\n\n        </button>\n\n        <!-- Show a dropdown arrow if there are children -->\n        <button *ngIf=\"node.children\"\n              #popover=\"ux-popover\"\n              aria-label=\"Show children\"\n              role=\"button\"\n              class=\"hierarchy-bar-node-arrow hpe-icon hpe-next\"\n              [uxPopover]=\"content\"\n              [popoverContext]=\"{ node: node, popover: popover }\"\n              placement=\"bottom\"\n              popoverClass=\"hierarchy-bar-popover\"\n              tabindex=\"0\">\n        </button>\n\n    </div>\n\n</main>\n\n<!-- Allow content to be placed on the right of the items -->\n<aside class=\"hierarchy-bar-addons\">\n    <ng-content select=\"[uxHierarchyBarRightAddon]\"></ng-content>\n</aside>\n\n<!-- Template for the popover list -->\n<ng-template #content let-node=\"node\" let-popover=\"popover\">\n\n    <!-- Loading Indicator -->\n    <ul class=\"hierarchy-bar-node-list\" *ngIf=\"(hierarchyBar.getChildren(node) | async).loading\">\n\n        <li class=\"hierarchy-bar-node-list-item\">\n            <ng-container [ngTemplateOutlet]=\"loadingIndicator || defaultLoadingIndicator\"></ng-container>\n        </li>\n    </ul>\n\n    <!-- List of children -->\n    <ul class=\"hierarchy-bar-node-list\" *ngIf=\"!(hierarchyBar.getChildren(node) | async).loading\">\n\n        <li *ngFor=\"let child of (hierarchyBar.getChildren(node) | async).children; let first = first\"\n            class=\"hierarchy-bar-node-list-item\"\n            [focusIf]=\"first\"\n            tabindex=\"0\"\n            (keydown.enter)=\"hierarchyBar.selectNode(child); popover.hide()\"\n            (click)=\"hierarchyBar.selectNode(child); popover.hide()\">\n\n            <!-- Show an icon if specifed -->\n            <img class=\"hierarchy-bar-node-icon\" *ngIf=\"child.icon\" [src]=\"child.icon\" alt=\"Hierarchy Bar Icon\">\n\n            <!-- Show the name of the current node -->\n            <span class=\"hierarchy-bar-node-title\">{{ child.title }}</span>\n\n        </li>\n\n    </ul>\n</ng-template>\n\n<!-- Template for the overflow popover list -->\n<ng-template #overflow let-popover=\"popover\">\n\n    <ul class=\"hierarchy-bar-node-list\">\n\n        <li *ngFor=\"let child of overflowNodes$ | async; let first = first\"\n            class=\"hierarchy-bar-node-list-item\"\n            tabindex=\"0\"\n            [focusIf]=\"first\"\n            (click)=\"hierarchyBar.selectNode(child); popover.hide()\"\n            (keydown.enter)=\"hierarchyBar.selectNode(child); popover.hide()\">\n\n            <!-- Show an icon if specifed -->\n            <img class=\"hierarchy-bar-node-icon\" *ngIf=\"child.icon\" [src]=\"child.icon\" alt=\"Hierarchy Bar Icon\">\n\n            <!-- Show the name of the current node -->\n            <span class=\"hierarchy-bar-node-title\">{{ child.title }}</span>\n\n        </li>\n\n    </ul>\n</ng-template>\n\n<!-- Loading Indicator Template -->\n<ng-template #defaultLoadingIndicator>\n    <div class=\"hierarchy-bar-node-icon\" alt=\"Hierarchy Bar Loading Indicator\">\n        <div class=\"spinner spinner-accent spinner-bounce-middle\"></div>\n    </div>\n\n    <!-- Show the name of the current node -->\n    <span class=\"hierarchy-bar-node-title\">Loading...</span>\n</ng-template>",
                changeDetection: ChangeDetectionStrategy.OnPush,
                viewProviders: [HierarchyBarService]
            }] }
];
/** @nocollapse */
HierarchyBarComponent.ctorParameters = () => [
    { type: HierarchyBarService }
];
HierarchyBarComponent.propDecorators = {
    root: [{ type: Input }],
    selected: [{ type: Input }],
    loadingIndicator: [{ type: Input }],
    selectedChange: [{ type: Output }],
    nodelist: [{ type: ViewChild, args: ['nodelist',] }],
    nodes: [{ type: ViewChildren, args: ['nodeElement',] }]
};
function HierarchyBarComponent_tsickle_Closure_declarations() {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGllcmFyY2h5LWJhci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9oaWVyYXJjaHktYmFyL2hpZXJhcmNoeS1iYXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFhLE1BQU0sRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDeEssT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNqRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDOUMsT0FBTyxFQUFvQixtQkFBbUIsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBUWhGLE1BQU07Ozs7SUFxQkYsWUFBbUIsWUFBaUM7UUFBakMsaUJBQVksR0FBWixZQUFZLENBQXFCOzhCQVR6QixJQUFJLFlBQVksRUFBb0I7eUJBSW5ELElBQUksZUFBZSxDQUFVLEtBQUssQ0FBQzs4QkFDOUIsSUFBSSxlQUFlLENBQXFCLEVBQUUsQ0FBQzs2QkFFcEMsSUFBSSxZQUFZLEVBQUU7O1FBS3RDLHVCQUFNLFFBQVEsR0FBRyxZQUFZLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN2SSx1QkFBTSxPQUFPLEdBQUcsWUFBWSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQyxDQUFDOztRQUdqRyxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNqQyxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztLQUNuQzs7Ozs7SUE1QkQsSUFBYSxJQUFJLENBQUMsSUFBc0I7UUFDcEMsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDdkM7Ozs7O0lBRUQsSUFBYSxRQUFRLENBQUMsSUFBc0I7UUFDeEMsSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDdEM7Ozs7SUF3QkQsV0FBVztRQUNQLElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxFQUFFLENBQUM7S0FDcEM7Ozs7Ozs7O0lBUUQsY0FBYztRQUVWLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDakIsTUFBTSxDQUFDO1NBQ1Y7O1FBR0QsTUFBTSxFQUFFLGFBQWEsRUFBRSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7O1FBR3hDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLEdBQUcsYUFBYSxDQUFDLFdBQVcsQ0FBQyxDQUFDOztRQUczRSxFQUFFLENBQUMsQ0FBQyxhQUFhLENBQUMsV0FBVyxHQUFHLGFBQWEsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDOztZQUd4RCx1QkFBTSxjQUFjLEdBQUcsYUFBYSxDQUFDLFdBQVcsR0FBRyxhQUFhLENBQUMsV0FBVyxDQUFDOztZQUc3RSxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FDcEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFVBQVUsR0FBRyxjQUFjLENBQUM7aUJBQ3BFLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUNuRSxDQUFDOztZQUdGLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLFVBQVUsR0FBRyxjQUFjLENBQUM7U0FDM0Q7S0FDSjs7O1lBM0VKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsa0JBQWtCO2dCQUM1Qiw4NklBQTZDO2dCQUM3QyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtnQkFDL0MsYUFBYSxFQUFFLENBQUMsbUJBQW1CLENBQUM7YUFDdkM7Ozs7WUFQMEIsbUJBQW1COzs7bUJBVXpDLEtBQUs7dUJBSUwsS0FBSzsrQkFJTCxLQUFLOzZCQUVMLE1BQU07dUJBQ04sU0FBUyxTQUFDLFVBQVU7b0JBQ3BCLFlBQVksU0FBQyxhQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25EZXN0cm95LCBPdXRwdXQsIFF1ZXJ5TGlzdCwgVGVtcGxhdGVSZWYsIFZpZXdDaGlsZCwgVmlld0NoaWxkcmVuIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMvQmVoYXZpb3JTdWJqZWN0JztcclxuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcy9TdWJzY3JpcHRpb24nO1xyXG5pbXBvcnQgeyBkZWJvdW5jZVRpbWUgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcbmltcG9ydCB7IEhpZXJhcmNoeUJhck5vZGUsIEhpZXJhcmNoeUJhclNlcnZpY2UgfSBmcm9tICcuL2hpZXJhcmNoeS1iYXIuc2VydmljZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAndXgtaGllcmFyY2h5LWJhcicsXHJcbiAgICB0ZW1wbGF0ZVVybDogJy4vaGllcmFyY2h5LWJhci5jb21wb25lbnQuaHRtbCcsXHJcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcclxuICAgIHZpZXdQcm92aWRlcnM6IFtIaWVyYXJjaHlCYXJTZXJ2aWNlXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgSGllcmFyY2h5QmFyQ29tcG9uZW50IGltcGxlbWVudHMgT25EZXN0cm95IHtcclxuXHJcbiAgICBASW5wdXQoKSBzZXQgcm9vdChub2RlOiBIaWVyYXJjaHlCYXJOb2RlKSB7XHJcbiAgICAgICAgdGhpcy5oaWVyYXJjaHlCYXIuc2V0Um9vdE5vZGUobm9kZSk7XHJcbiAgICB9XHJcblxyXG4gICAgQElucHV0KCkgc2V0IHNlbGVjdGVkKG5vZGU6IEhpZXJhcmNoeUJhck5vZGUpIHtcclxuICAgICAgICB0aGlzLmhpZXJhcmNoeUJhci5zZWxlY3ROb2RlKG5vZGUpO1xyXG4gICAgfVxyXG5cclxuICAgIEBJbnB1dCgpIGxvYWRpbmdJbmRpY2F0b3I6IFRlbXBsYXRlUmVmPGFueT47XHJcblxyXG4gICAgQE91dHB1dCgpIHNlbGVjdGVkQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxIaWVyYXJjaHlCYXJOb2RlPigpO1xyXG4gICAgQFZpZXdDaGlsZCgnbm9kZWxpc3QnKSBub2RlbGlzdDogRWxlbWVudFJlZjtcclxuICAgIEBWaWV3Q2hpbGRyZW4oJ25vZGVFbGVtZW50Jykgbm9kZXM6IFF1ZXJ5TGlzdDxFbGVtZW50UmVmPjtcclxuXHJcbiAgICBvdmVyZmxvdyQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcclxuICAgIG92ZXJmbG93Tm9kZXMkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxIaWVyYXJjaHlCYXJOb2RlW10+KFtdKTtcclxuXHJcbiAgICBwcml2YXRlIF9zdWJzY3JpcHRpb24gPSBuZXcgU3Vic2NyaXB0aW9uKCk7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHVibGljIGhpZXJhcmNoeUJhcjogSGllcmFyY2h5QmFyU2VydmljZSkge1xyXG5cclxuICAgICAgICAvLyBzdWJzY3JpYmUgdG8gY2hhbmdlcyBpbiB0aGUgc2VsZWN0ZWQgbm9kZVxyXG4gICAgICAgIGNvbnN0IHNlbGVjdGVkID0gaGllcmFyY2h5QmFyLm5vZGVzJC5zdWJzY3JpYmUobm9kZXMgPT4gdGhpcy5zZWxlY3RlZENoYW5nZS5lbWl0KG5vZGVzLmxlbmd0aCA9PT0gMCA/IG51bGwgOiBub2Rlc1tub2Rlcy5sZW5ndGggLSAxXSkpO1xyXG4gICAgICAgIGNvbnN0IGNoYW5nZWQgPSBoaWVyYXJjaHlCYXIubm9kZXMkLnBpcGUoZGVib3VuY2VUaW1lKDApKS5zdWJzY3JpYmUoKCkgPT4gdGhpcy5zY3JvbGxJbnRvVmlldygpKTtcclxuXHJcbiAgICAgICAgLy8gc3RvcmUgc3Vic2NyaXB0aW9uc1xyXG4gICAgICAgIHRoaXMuX3N1YnNjcmlwdGlvbi5hZGQoc2VsZWN0ZWQpO1xyXG4gICAgICAgIHRoaXMuX3N1YnNjcmlwdGlvbi5hZGQoY2hhbmdlZCk7XHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBXaGVuIHRoZXJlIGlzIG92ZXJmbG93IGVuc3VyZSB0aGF0IHRoZSByaWdodG1vc3RcclxuICAgICAqIG5vZGUgcmVtYWlucyBpbiB2aWV3IGF0IGFsbCB0aW1lcy4gVGhlIG5vZGVzIG5vIGxvbmdlclxyXG4gICAgICogdmlzaWJsZSBiZSBiZSBkaXNwbGF5ZWQgaW4gYSBwb3BvdmVyIGF2YWlsYWJsZSBvbiB0aGVcclxuICAgICAqIG92ZXJmbG93IGluZGljYXRvclxyXG4gICAgICovXHJcbiAgICBzY3JvbGxJbnRvVmlldygpOiB2b2lkIHtcclxuXHJcbiAgICAgICAgaWYgKCF0aGlzLm5vZGVsaXN0KSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIGdldCB0aGUgbmF0aXZlIGVsZW1lbnRcclxuICAgICAgICBjb25zdCB7IG5hdGl2ZUVsZW1lbnQgfSA9IHRoaXMubm9kZWxpc3Q7XHJcblxyXG4gICAgICAgIC8vIGVtaXQgd2hldGhlciBvciBub3QgdGhlcmUgaXMgb3ZlcmZsb3dcclxuICAgICAgICB0aGlzLm92ZXJmbG93JC5uZXh0KG5hdGl2ZUVsZW1lbnQuc2Nyb2xsV2lkdGggPiBuYXRpdmVFbGVtZW50Lm9mZnNldFdpZHRoKTtcclxuXHJcbiAgICAgICAgLy8gaWYgdGhlIGhpZXJhcmNoeSBiYXIgY29udGVudHMgZG8gbm90IG92ZXJmbG93IHRoZW4gZG8gbm90aGluZ1xyXG4gICAgICAgIGlmIChuYXRpdmVFbGVtZW50LnNjcm9sbFdpZHRoID4gbmF0aXZlRWxlbWVudC5vZmZzZXRXaWR0aCkge1xyXG5cclxuICAgICAgICAgICAgLy8gZGV0ZXJtaW5lIHRoZSBhbW91bnQgb2Ygb3ZlcmZsb3dcclxuICAgICAgICAgICAgY29uc3Qgb3ZlcmZsb3dBbW91bnQgPSBuYXRpdmVFbGVtZW50LnNjcm9sbFdpZHRoIC0gbmF0aXZlRWxlbWVudC5vZmZzZXRXaWR0aDtcclxuXHJcbiAgICAgICAgICAgIC8vIGRldGVybWluZSB3aGljaCBub2RlcyBhcmUgbm90IGZ1bGx5IHZpc2libGVcclxuICAgICAgICAgICAgdGhpcy5vdmVyZmxvd05vZGVzJC5uZXh0KFxyXG4gICAgICAgICAgICAgICAgdGhpcy5ub2Rlcy5maWx0ZXIobm9kZSA9PiBub2RlLm5hdGl2ZUVsZW1lbnQub2Zmc2V0TGVmdCA8IG92ZXJmbG93QW1vdW50KVxyXG4gICAgICAgICAgICAgICAgICAgIC5tYXAoKG5vZGUsIGluZGV4KSA9PiB0aGlzLmhpZXJhcmNoeUJhci5ub2RlcyQudmFsdWVbaW5kZXhdKVxyXG4gICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgLy8gbW92ZSB0aGUgc2Nyb2xsIHBvc2l0aW9uIHRvIGFsd2F5cyBzaG93IHRoZSBsYXN0IGl0bWVcclxuICAgICAgICAgICAgdGhpcy5ub2RlbGlzdC5uYXRpdmVFbGVtZW50LnNjcm9sbExlZnQgPSBvdmVyZmxvd0Ftb3VudDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iXX0=