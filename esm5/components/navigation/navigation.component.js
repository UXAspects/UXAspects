/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, ContentChild, Input, TemplateRef } from '@angular/core';
import { NavigationService } from './navigation.service';
var NavigationComponent = /** @class */ (function () {
    function NavigationComponent(_navigationService) {
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
    Object.defineProperty(NavigationComponent.prototype, "items", {
        get: /**
         * @return {?}
         */
        function () {
            return this._navigationService.items;
        },
        /** The navigation items to populate the menu with. */
        set: /**
         * The navigation items to populate the menu with.
         * @param {?} items
         * @return {?}
         */
        function (items) {
            this._navigationService.items = items;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NavigationComponent.prototype, "autoCollapse", {
        /** Whether to collapse other menu items when expanding a menu item. */
        set: /**
         * Whether to collapse other menu items when expanding a menu item.
         * @param {?} autoCollapse
         * @return {?}
         */
        function (autoCollapse) {
            this._navigationService.autoCollapse = autoCollapse;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NavigationComponent.prototype, "depthLimit", {
        get: /**
         * @return {?}
         */
        function () {
            return this.tree ? this.hierarchyClasses.length : 2;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} item
     * @param {?} event
     * @return {?}
     */
    NavigationComponent.prototype.itemClick = /**
     * @param {?} item
     * @param {?} event
     * @return {?}
     */
    function (item, event) {
        // Toggle expanded state (relevant only if it has children)
        item.expanded = !item.expanded;
        // Invoke the custom click handler if specified
        if (item.click) {
            item.click(event, item);
        }
    };
    /**
     * Returns true if the sets of items needs to be indented to make room for one or more expander.
     */
    /**
     * Returns true if the sets of items needs to be indented to make room for one or more expander.
     * @param {?} items
     * @return {?}
     */
    NavigationComponent.prototype.needsIndent = /**
     * Returns true if the sets of items needs to be indented to make room for one or more expander.
     * @param {?} items
     * @return {?}
     */
    function (items) {
        return items && items.some(function (item) { return item.children && item.children.length > 0; });
    };
    NavigationComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ux-navigation',
                    template: "<nav class=\"ux-side-nav\" [class.tree]=\"tree\" role=\"navigation\">\n\n    <ol *ngIf=\"items\" role=\"tree\" class=\"nav\" uxTabbableList [hierarchy]=\"true\">\n\n        <ng-container *ngFor=\"let item of items; let rank = index\"\n            [ngTemplateOutlet]=\"navigationNode\"\n            [ngTemplateOutletContext]=\"{item: item, level: 1, rank: rank, indent: needsIndent(items)}\">\n        </ng-container>\n\n        <ng-template #navigationNode let-item=\"item\" let-parent=\"parent\" let-level=\"level\" let-rank=\"rank\" let-indent=\"indent\">\n\n            <li [attr.role]=\"(item.children && item.children.length > 0) ? 'treeitem' : 'none'\"\n                [attr.aria-expanded]=\"item.expanded\"\n                [class.selected]=\"item.expanded\"\n                [class.active]=\"navigationLink.isActive\">\n\n                <a uxNavigationLink\n                    #navigationLink=\"uxNavigationLink\"\n                    [navigationItem]=\"item\"\n                    [expanded]=\"item.expanded\"\n                    [canExpand]=\"level < depthLimit\"\n                    [indent]=\"indent\"\n                    uxTabbableListItem\n                    #tli=\"ux-tabbable-list-item\"\n                    [parent]=\"parent\"\n                    [rank]=\"rank\"\n                    [(expanded)]=\"item.expanded\">\n\n                    <span *ngIf=\"!navigationItemTemplate && item.children && item.children.length > 0 && level < depthLimit\"\n                        aria-hidden=\"true\"\n                        class=\"nav-expander\"\n                        (click)=\"item.expanded = !item.expanded; $event.stopPropagation(); $event.preventDefault()\">\n                    </span>\n                    <span *ngIf=\"!navigationItemTemplate && item.icon && !tree\" class=\"nav-icon hpe-icon\" [ngClass]=\"item.icon\"></span>\n                    <img *ngIf=\"!navigationItemTemplate && item.iconUrl && !tree\" class=\"nav-icon\" [src]=\"item.iconUrl\" alt=\"item.iconLabel\">\n                    <span *ngIf=\"!navigationItemTemplate\" class=\"nav-title\">{{item.title}}</span>\n\n                    <ng-container [ngTemplateOutlet]=\"navigationItemTemplate\"\n                        [ngTemplateOutletContext]=\"{item: item, level: level}\">\n                    </ng-container>\n\n                </a>\n\n                <ol *ngIf=\"item.children && item.expanded && level < depthLimit\"\n                    role=\"group\" class=\"nav\" [ngClass]=\"hierarchyClasses[level]\">\n\n                    <ng-container *ngFor=\"let child of item.children; let rank = index\"\n                        [ngTemplateOutlet]=\"navigationNode\"\n                        [ngTemplateOutletContext]=\"{item: child, parent: tli, level: level + 1, rank: rank, indent: navigationLink.indentChildren}\">\n                    </ng-container>\n\n                </ol>\n\n            </li>\n\n        </ng-template>\n\n    </ol>\n\n    <!-- Backward compatibility with the original ux-navigation -->\n    <ol *ngIf=\"!items\" role=\"tree\" class=\"nav\">\n        <ng-content></ng-content>\n    </ol>\n\n</nav>\n",
                    providers: [NavigationService]
                }] }
    ];
    /** @nocollapse */
    NavigationComponent.ctorParameters = function () { return [
        { type: NavigationService }
    ]; };
    NavigationComponent.propDecorators = {
        items: [{ type: Input }],
        tree: [{ type: Input }],
        autoCollapse: [{ type: Input }],
        navigationItemTemplate: [{ type: ContentChild, args: ['uxNavigationItem',] }]
    };
    return NavigationComponent;
}());
export { NavigationComponent };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF2aWdhdGlvbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9uYXZpZ2F0aW9uL25hdmlnYXRpb24uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsV0FBVyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTVFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHNCQUFzQixDQUFDOztJQTJDckQsNkJBQW9CLGtCQUFxQztRQUFyQyx1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW1COzs7O29CQXZCekMsSUFBSTtnQ0FXRDtZQUNmLEVBQUU7WUFDRixrQkFBa0I7WUFDbEIsaUJBQWlCO1lBQ2pCLGtCQUFrQjtZQUNsQixpQkFBaUI7U0FDcEI7S0FNNkQ7SUFqQzlELHNCQUNJLHNDQUFLOzs7O1FBR1Q7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEtBQUssQ0FBQztTQUN4QztRQVBELHNEQUFzRDs7Ozs7O1FBQ3RELFVBQ1UsS0FBdUI7WUFDN0IsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7U0FDekM7OztPQUFBO0lBVUQsc0JBQ0ksNkNBQVk7UUFGaEIsdUVBQXVFOzs7Ozs7UUFDdkUsVUFDaUIsWUFBcUI7WUFDbEMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFlBQVksR0FBRyxZQUFZLENBQUM7U0FDdkQ7OztPQUFBO0lBYUQsc0JBQUksMkNBQVU7Ozs7UUFBZDtZQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDdkQ7OztPQUFBOzs7Ozs7SUFJRCx1Q0FBUzs7Ozs7SUFBVCxVQUFVLElBQW9CLEVBQUUsS0FBWTs7UUFHeEMsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7O1FBRy9CLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ2IsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7U0FDM0I7S0FDSjtJQUVEOztPQUVHOzs7Ozs7SUFDSCx5Q0FBVzs7Ozs7SUFBWCxVQUFZLEtBQXVCO1FBQy9CLE1BQU0sQ0FBQyxLQUFLLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxVQUFBLElBQUksSUFBSSxPQUFBLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUF6QyxDQUF5QyxDQUFDLENBQUM7S0FDakY7O2dCQTNESixTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLGVBQWU7b0JBQ3pCLG1rR0FBMEM7b0JBQzFDLFNBQVMsRUFBRSxDQUFDLGlCQUFpQixDQUFDO2lCQUNqQzs7OztnQkFOUSxpQkFBaUI7Ozt3QkFVckIsS0FBSzt1QkFTTCxLQUFLOytCQUlMLEtBQUs7eUNBS0wsWUFBWSxTQUFDLGtCQUFrQjs7OEJBOUJwQzs7U0FTYSxtQkFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIENvbnRlbnRDaGlsZCwgSW5wdXQsIFRlbXBsYXRlUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOYXZpZ2F0aW9uSXRlbSB9IGZyb20gJy4vbmF2aWdhdGlvbi1pdGVtLmluZmVyZmFjZSc7XG5pbXBvcnQgeyBOYXZpZ2F0aW9uU2VydmljZSB9IGZyb20gJy4vbmF2aWdhdGlvbi5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd1eC1uYXZpZ2F0aW9uJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vbmF2aWdhdGlvbi5jb21wb25lbnQuaHRtbCcsXG4gICAgcHJvdmlkZXJzOiBbTmF2aWdhdGlvblNlcnZpY2VdXG59KVxuZXhwb3J0IGNsYXNzIE5hdmlnYXRpb25Db21wb25lbnQge1xuXG4gICAgLyoqIFRoZSBuYXZpZ2F0aW9uIGl0ZW1zIHRvIHBvcHVsYXRlIHRoZSBtZW51IHdpdGguICovXG4gICAgQElucHV0KClcbiAgICBzZXQgaXRlbXMoaXRlbXM6IE5hdmlnYXRpb25JdGVtW10pIHtcbiAgICAgICAgdGhpcy5fbmF2aWdhdGlvblNlcnZpY2UuaXRlbXMgPSBpdGVtcztcbiAgICB9XG4gICAgZ2V0IGl0ZW1zKCk6IE5hdmlnYXRpb25JdGVtW10ge1xuICAgICAgICByZXR1cm4gdGhpcy5fbmF2aWdhdGlvblNlcnZpY2UuaXRlbXM7XG4gICAgfVxuXG4gICAgLyoqIFdoZXRoZXIgdG8gcHJlc2VudCB0aGUgbWVudSBhcyBhIGhpZXJhcmNoaWNhbCB0cmVlLiAqL1xuICAgIEBJbnB1dCgpXG4gICAgdHJlZTogYm9vbGVhbiA9IHRydWU7XG5cbiAgICAvKiogV2hldGhlciB0byBjb2xsYXBzZSBvdGhlciBtZW51IGl0ZW1zIHdoZW4gZXhwYW5kaW5nIGEgbWVudSBpdGVtLiAqL1xuICAgIEBJbnB1dCgpXG4gICAgc2V0IGF1dG9Db2xsYXBzZShhdXRvQ29sbGFwc2U6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5fbmF2aWdhdGlvblNlcnZpY2UuYXV0b0NvbGxhcHNlID0gYXV0b0NvbGxhcHNlO1xuICAgIH1cblxuICAgIEBDb250ZW50Q2hpbGQoJ3V4TmF2aWdhdGlvbkl0ZW0nKVxuICAgIG5hdmlnYXRpb25JdGVtVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgICBoaWVyYXJjaHlDbGFzc2VzID0gW1xuICAgICAgICAnJyxcbiAgICAgICAgJ25hdi1zZWNvbmQtbGV2ZWwnLFxuICAgICAgICAnbmF2LXRoaXJkLWxldmVsJyxcbiAgICAgICAgJ25hdi1mb3VydGgtbGV2ZWwnLFxuICAgICAgICAnbmF2LWZpZnRoLWxldmVsJyxcbiAgICBdO1xuXG4gICAgZ2V0IGRlcHRoTGltaXQoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudHJlZSA/IHRoaXMuaGllcmFyY2h5Q2xhc3Nlcy5sZW5ndGggOiAyO1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX25hdmlnYXRpb25TZXJ2aWNlOiBOYXZpZ2F0aW9uU2VydmljZSkgeyB9XG5cbiAgICBpdGVtQ2xpY2soaXRlbTogTmF2aWdhdGlvbkl0ZW0sIGV2ZW50OiBFdmVudCk6IHZvaWQge1xuXG4gICAgICAgIC8vIFRvZ2dsZSBleHBhbmRlZCBzdGF0ZSAocmVsZXZhbnQgb25seSBpZiBpdCBoYXMgY2hpbGRyZW4pXG4gICAgICAgIGl0ZW0uZXhwYW5kZWQgPSAhaXRlbS5leHBhbmRlZDtcblxuICAgICAgICAvLyBJbnZva2UgdGhlIGN1c3RvbSBjbGljayBoYW5kbGVyIGlmIHNwZWNpZmllZFxuICAgICAgICBpZiAoaXRlbS5jbGljaykge1xuICAgICAgICAgICAgaXRlbS5jbGljayhldmVudCwgaXRlbSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRydWUgaWYgdGhlIHNldHMgb2YgaXRlbXMgbmVlZHMgdG8gYmUgaW5kZW50ZWQgdG8gbWFrZSByb29tIGZvciBvbmUgb3IgbW9yZSBleHBhbmRlci5cbiAgICAgKi9cbiAgICBuZWVkc0luZGVudChpdGVtczogTmF2aWdhdGlvbkl0ZW1bXSk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gaXRlbXMgJiYgaXRlbXMuc29tZShpdGVtID0+IGl0ZW0uY2hpbGRyZW4gJiYgaXRlbS5jaGlsZHJlbi5sZW5ndGggPiAwKTtcbiAgICB9XG59XG4iXX0=