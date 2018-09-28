/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, ContentChild, Input, TemplateRef } from '@angular/core';
import { NavigationService } from './navigation.service';
export class NavigationComponent {
    /**
     * @param {?} _navigationService
     */
    constructor(_navigationService) {
        this._navigationService = _navigationService;
        /**
         * Whether to present the menu as a hierarchical tree.
         */
        this.tree = true;
        this.hierarchyClasses = [
            '',
            'nav-second-level',
            'nav-third-level',
            'nav-fourth-level',
            'nav-fifth-level',
        ];
    }
    /**
     * The navigation items to populate the menu with.
     * @param {?} items
     * @return {?}
     */
    set items(items) {
        this._navigationService.items = items;
    }
    /**
     * @return {?}
     */
    get items() {
        return this._navigationService.items;
    }
    /**
     * Whether to collapse other menu items when expanding a menu item.
     * @param {?} autoCollapse
     * @return {?}
     */
    set autoCollapse(autoCollapse) {
        this._navigationService.autoCollapse = autoCollapse;
    }
    /**
     * @return {?}
     */
    get depthLimit() {
        return this.tree ? this.hierarchyClasses.length : 2;
    }
    /**
     * @param {?} item
     * @param {?} event
     * @return {?}
     */
    itemClick(item, event) {
        // Toggle expanded state (relevant only if it has children)
        item.expanded = !item.expanded;
        // Invoke the custom click handler if specified
        if (item.click) {
            item.click(event, item);
        }
    }
    /**
     * Returns true if the sets of items needs to be indented to make room for one or more expander.
     * @param {?} items
     * @return {?}
     */
    needsIndent(items) {
        return items && items.some(item => item.children && item.children.length > 0);
    }
}
NavigationComponent.decorators = [
    { type: Component, args: [{
                selector: 'ux-navigation',
                template: "<nav class=\"ux-side-nav\" [class.tree]=\"tree\" role=\"navigation\">\n\n    <ol *ngIf=\"items\" role=\"tree\" class=\"nav\" uxTabbableList [hierarchy]=\"true\">\n\n        <ng-container *ngFor=\"let item of items; let rank = index\"\n            [ngTemplateOutlet]=\"navigationNode\"\n            [ngTemplateOutletContext]=\"{item: item, level: 1, rank: rank, indent: needsIndent(items)}\">\n        </ng-container>\n\n        <ng-template #navigationNode let-item=\"item\" let-parent=\"parent\" let-level=\"level\" let-rank=\"rank\" let-indent=\"indent\">\n\n            <li [attr.role]=\"(item.children && item.children.length > 0) ? 'treeitem' : 'none'\"\n                [attr.aria-expanded]=\"item.expanded\"\n                [class.selected]=\"item.expanded\"\n                [class.active]=\"navigationLink.isActive\">\n\n                <a uxNavigationLink\n                    #navigationLink=\"uxNavigationLink\"\n                    [navigationItem]=\"item\"\n                    [expanded]=\"item.expanded\"\n                    [canExpand]=\"level < depthLimit\"\n                    [indent]=\"indent\"\n                    uxTabbableListItem\n                    #tli=\"ux-tabbable-list-item\"\n                    [parent]=\"parent\"\n                    [rank]=\"rank\"\n                    [(expanded)]=\"item.expanded\">\n\n                    <span *ngIf=\"!navigationItemTemplate && item.children && item.children.length > 0 && level < depthLimit\"\n                        aria-hidden=\"true\"\n                        class=\"nav-expander\"\n                        (click)=\"item.expanded = !item.expanded; $event.stopPropagation(); $event.preventDefault()\">\n                    </span>\n                    <span *ngIf=\"!navigationItemTemplate && item.icon && !tree\" class=\"nav-icon hpe-icon\" [ngClass]=\"item.icon\"></span>\n                    <img *ngIf=\"!navigationItemTemplate && item.iconUrl && !tree\" class=\"nav-icon\" [src]=\"item.iconUrl\" alt=\"item.iconLabel\">\n                    <span *ngIf=\"!navigationItemTemplate\" class=\"nav-title\">{{item.title}}</span>\n\n                    <ng-container [ngTemplateOutlet]=\"navigationItemTemplate\"\n                        [ngTemplateOutletContext]=\"{item: item, level: level}\">\n                    </ng-container>\n\n                </a>\n\n                <ol *ngIf=\"item.children && item.expanded && level < depthLimit\"\n                    role=\"group\" class=\"nav\" [ngClass]=\"hierarchyClasses[level]\">\n\n                    <ng-container *ngFor=\"let child of item.children; let rank = index\"\n                        [ngTemplateOutlet]=\"navigationNode\"\n                        [ngTemplateOutletContext]=\"{item: child, parent: tli, level: level + 1, rank: rank, indent: navigationLink.indentChildren}\">\n                    </ng-container>\n\n                </ol>\n\n            </li>\n\n        </ng-template>\n\n    </ol>\n\n    <!-- Backward compatibility with the original ux-navigation -->\n    <ol *ngIf=\"!items\" role=\"tree\" class=\"nav\">\n        <ng-content></ng-content>\n    </ol>\n\n</nav>\n",
                providers: [NavigationService]
            }] }
];
/** @nocollapse */
NavigationComponent.ctorParameters = () => [
    { type: NavigationService }
];
NavigationComponent.propDecorators = {
    items: [{ type: Input }],
    tree: [{ type: Input }],
    autoCollapse: [{ type: Input }],
    navigationItemTemplate: [{ type: ContentChild, args: ['uxNavigationItem',] }]
};
function NavigationComponent_tsickle_Closure_declarations() {
    /**
     * Whether to present the menu as a hierarchical tree.
     * @type {?}
     */
    NavigationComponent.prototype.tree;
    /** @type {?} */
    NavigationComponent.prototype.navigationItemTemplate;
    /** @type {?} */
    NavigationComponent.prototype.hierarchyClasses;
    /** @type {?} */
    NavigationComponent.prototype._navigationService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF2aWdhdGlvbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9uYXZpZ2F0aW9uL25hdmlnYXRpb24uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsV0FBVyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTVFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBT3pELE1BQU07Ozs7SUFvQ0YsWUFBb0Isa0JBQXFDO1FBQXJDLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBbUI7Ozs7b0JBdkJ6QyxJQUFJO2dDQVdEO1lBQ2YsRUFBRTtZQUNGLGtCQUFrQjtZQUNsQixpQkFBaUI7WUFDakIsa0JBQWtCO1lBQ2xCLGlCQUFpQjtTQUNwQjtLQU02RDs7Ozs7O0lBakM5RCxJQUNJLEtBQUssQ0FBQyxLQUF1QjtRQUM3QixJQUFJLENBQUMsa0JBQWtCLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztLQUN6Qzs7OztJQUNELElBQUksS0FBSztRQUNMLE1BQU0sQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsS0FBSyxDQUFDO0tBQ3hDOzs7Ozs7SUFPRCxJQUNJLFlBQVksQ0FBQyxZQUFxQjtRQUNsQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsWUFBWSxHQUFHLFlBQVksQ0FBQztLQUN2RDs7OztJQWFELElBQUksVUFBVTtRQUNWLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDdkQ7Ozs7OztJQUlELFNBQVMsQ0FBQyxJQUFvQixFQUFFLEtBQVk7O1FBR3hDLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDOztRQUcvQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUNiLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO1NBQzNCO0tBQ0o7Ozs7OztJQUtELFdBQVcsQ0FBQyxLQUF1QjtRQUMvQixNQUFNLENBQUMsS0FBSyxJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO0tBQ2pGOzs7WUEzREosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxlQUFlO2dCQUN6Qixta0dBQTBDO2dCQUMxQyxTQUFTLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQzthQUNqQzs7OztZQU5RLGlCQUFpQjs7O29CQVVyQixLQUFLO21CQVNMLEtBQUs7MkJBSUwsS0FBSztxQ0FLTCxZQUFZLFNBQUMsa0JBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBDb250ZW50Q2hpbGQsIElucHV0LCBUZW1wbGF0ZVJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTmF2aWdhdGlvbkl0ZW0gfSBmcm9tICcuL25hdmlnYXRpb24taXRlbS5pbmZlcmZhY2UnO1xuaW1wb3J0IHsgTmF2aWdhdGlvblNlcnZpY2UgfSBmcm9tICcuL25hdmlnYXRpb24uc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAndXgtbmF2aWdhdGlvbicsXG4gICAgdGVtcGxhdGVVcmw6ICcuL25hdmlnYXRpb24uY29tcG9uZW50Lmh0bWwnLFxuICAgIHByb3ZpZGVyczogW05hdmlnYXRpb25TZXJ2aWNlXVxufSlcbmV4cG9ydCBjbGFzcyBOYXZpZ2F0aW9uQ29tcG9uZW50IHtcblxuICAgIC8qKiBUaGUgbmF2aWdhdGlvbiBpdGVtcyB0byBwb3B1bGF0ZSB0aGUgbWVudSB3aXRoLiAqL1xuICAgIEBJbnB1dCgpXG4gICAgc2V0IGl0ZW1zKGl0ZW1zOiBOYXZpZ2F0aW9uSXRlbVtdKSB7XG4gICAgICAgIHRoaXMuX25hdmlnYXRpb25TZXJ2aWNlLml0ZW1zID0gaXRlbXM7XG4gICAgfVxuICAgIGdldCBpdGVtcygpOiBOYXZpZ2F0aW9uSXRlbVtdIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX25hdmlnYXRpb25TZXJ2aWNlLml0ZW1zO1xuICAgIH1cblxuICAgIC8qKiBXaGV0aGVyIHRvIHByZXNlbnQgdGhlIG1lbnUgYXMgYSBoaWVyYXJjaGljYWwgdHJlZS4gKi9cbiAgICBASW5wdXQoKVxuICAgIHRyZWU6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgLyoqIFdoZXRoZXIgdG8gY29sbGFwc2Ugb3RoZXIgbWVudSBpdGVtcyB3aGVuIGV4cGFuZGluZyBhIG1lbnUgaXRlbS4gKi9cbiAgICBASW5wdXQoKVxuICAgIHNldCBhdXRvQ29sbGFwc2UoYXV0b0NvbGxhcHNlOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuX25hdmlnYXRpb25TZXJ2aWNlLmF1dG9Db2xsYXBzZSA9IGF1dG9Db2xsYXBzZTtcbiAgICB9XG5cbiAgICBAQ29udGVudENoaWxkKCd1eE5hdmlnYXRpb25JdGVtJylcbiAgICBuYXZpZ2F0aW9uSXRlbVRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gICAgaGllcmFyY2h5Q2xhc3NlcyA9IFtcbiAgICAgICAgJycsXG4gICAgICAgICduYXYtc2Vjb25kLWxldmVsJyxcbiAgICAgICAgJ25hdi10aGlyZC1sZXZlbCcsXG4gICAgICAgICduYXYtZm91cnRoLWxldmVsJyxcbiAgICAgICAgJ25hdi1maWZ0aC1sZXZlbCcsXG4gICAgXTtcblxuICAgIGdldCBkZXB0aExpbWl0KCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLnRyZWUgPyB0aGlzLmhpZXJhcmNoeUNsYXNzZXMubGVuZ3RoIDogMjtcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9uYXZpZ2F0aW9uU2VydmljZTogTmF2aWdhdGlvblNlcnZpY2UpIHsgfVxuXG4gICAgaXRlbUNsaWNrKGl0ZW06IE5hdmlnYXRpb25JdGVtLCBldmVudDogRXZlbnQpOiB2b2lkIHtcblxuICAgICAgICAvLyBUb2dnbGUgZXhwYW5kZWQgc3RhdGUgKHJlbGV2YW50IG9ubHkgaWYgaXQgaGFzIGNoaWxkcmVuKVxuICAgICAgICBpdGVtLmV4cGFuZGVkID0gIWl0ZW0uZXhwYW5kZWQ7XG5cbiAgICAgICAgLy8gSW52b2tlIHRoZSBjdXN0b20gY2xpY2sgaGFuZGxlciBpZiBzcGVjaWZpZWRcbiAgICAgICAgaWYgKGl0ZW0uY2xpY2spIHtcbiAgICAgICAgICAgIGl0ZW0uY2xpY2soZXZlbnQsIGl0ZW0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0cnVlIGlmIHRoZSBzZXRzIG9mIGl0ZW1zIG5lZWRzIHRvIGJlIGluZGVudGVkIHRvIG1ha2Ugcm9vbSBmb3Igb25lIG9yIG1vcmUgZXhwYW5kZXIuXG4gICAgICovXG4gICAgbmVlZHNJbmRlbnQoaXRlbXM6IE5hdmlnYXRpb25JdGVtW10pOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIGl0ZW1zICYmIGl0ZW1zLnNvbWUoaXRlbSA9PiBpdGVtLmNoaWxkcmVuICYmIGl0ZW0uY2hpbGRyZW4ubGVuZ3RoID4gMCk7XG4gICAgfVxufVxuIl19