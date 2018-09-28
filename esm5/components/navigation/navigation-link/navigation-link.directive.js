/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { LocationStrategy } from '@angular/common';
import { Directive, HostBinding, HostListener, Input } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { tick } from '../../../common/index';
import { NavigationService } from '../navigation.service';
var NavigationLinkDirective = /** @class */ (function () {
    function NavigationLinkDirective(_router, _locationStrategy, _navigationService) {
        this._router = _router;
        this._locationStrategy = _locationStrategy;
        this._navigationService = _navigationService;
        this.ariaExpanded = 'undefined';
        this._expanded$ = new Subject();
        this._onDestroy = new Subject();
    }
    Object.defineProperty(NavigationLinkDirective.prototype, "expanded", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._expanded$.next(value);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    NavigationLinkDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this._expanded$.pipe(takeUntil(this._onDestroy), tick()).subscribe(function (expanded) {
            if (_this.navigationItem.children && _this.navigationItem.children.length > 0) {
                _this.ariaExpanded = "" + expanded;
                _this._navigationService.setExpanded(_this.navigationItem, expanded);
            }
        });
        this._router.events
            .pipe(filter(function (event) { return event instanceof NavigationEnd; }), takeUntil(this._onDestroy))
            .subscribe(this.updateNavigationState.bind(this));
        this.updateNavigationState();
        this.updateAttributes();
    };
    /**
     * @return {?}
     */
    NavigationLinkDirective.prototype.ngOnChanges = /**
     * @return {?}
     */
    function () {
        this.updateAttributes();
    };
    /**
     * @return {?}
     */
    NavigationLinkDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._onDestroy.next();
        this._onDestroy.complete();
    };
    /**
     * @param {?} event
     * @return {?}
     */
    NavigationLinkDirective.prototype.activated = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (this.navigationItem.routerLink) {
            var /** @type {?} */ commands = Array.isArray(this.navigationItem.routerLink) ? this.navigationItem.routerLink : [this.navigationItem.routerLink];
            this._router.navigate(commands, this.navigationItem.routerExtras);
        }
        // Toggle expanded state (relevant only if it has children)
        this.navigationItem.expanded = !this.navigationItem.expanded;
        // Invoke the custom click handler if specified
        if (this.navigationItem.click) {
            this.navigationItem.click(event, this.navigationItem);
        }
        return false;
    };
    /**
     * @return {?}
     */
    NavigationLinkDirective.prototype.updateNavigationState = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.isActive = this.isActiveItem(this.navigationItem);
        if (this.navigationItem.children) {
            var /** @type {?} */ activeChild = this.navigationItem.children.find(function (child) { return _this.isActiveItem(child); });
            if (activeChild) {
                this.navigationItem.expanded = true;
            }
        }
    };
    /**
     * @return {?}
     */
    NavigationLinkDirective.prototype.updateAttributes = /**
     * @return {?}
     */
    function () {
        this.href = this.getHref();
        this.role = (this.navigationItem.children && this.navigationItem.children.length > 0) ? 'button' : 'treeitem';
        this.indentChildren = this.navigationItem.children && this.navigationItem.children.some(function (item) { return item.children && item.children.length > 0; });
    };
    /**
     * @return {?}
     */
    NavigationLinkDirective.prototype.getHref = /**
     * @return {?}
     */
    function () {
        if (this.navigationItem.routerLink) {
            var /** @type {?} */ commands = Array.isArray(this.navigationItem.routerLink) ? this.navigationItem.routerLink : [this.navigationItem.routerLink];
            var /** @type {?} */ urlTree = this._router.createUrlTree(commands, this.navigationItem.routerExtras);
            return this._locationStrategy.prepareExternalUrl(this._router.serializeUrl(urlTree));
        }
        return null;
    };
    /**
     * @param {?} item
     * @return {?}
     */
    NavigationLinkDirective.prototype.isActiveItem = /**
     * @param {?} item
     * @return {?}
     */
    function (item) {
        if (item.routerLink) {
            var /** @type {?} */ commands = Array.isArray(item.routerLink) ? item.routerLink : [item.routerLink];
            var /** @type {?} */ urlTree = this._router.createUrlTree(commands, item.routerExtras);
            return this._router.isActive(urlTree, true);
        }
        return false;
    };
    NavigationLinkDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[uxNavigationLink]',
                    exportAs: 'uxNavigationLink'
                },] }
    ];
    /** @nocollapse */
    NavigationLinkDirective.ctorParameters = function () { return [
        { type: Router },
        { type: LocationStrategy },
        { type: NavigationService }
    ]; };
    NavigationLinkDirective.propDecorators = {
        navigationItem: [{ type: Input }],
        expanded: [{ type: Input }],
        canExpand: [{ type: Input }],
        indent: [{ type: Input }, { type: HostBinding, args: ['class.indent',] }],
        href: [{ type: HostBinding, args: ['attr.href',] }],
        role: [{ type: HostBinding, args: ['attr.role',] }],
        ariaExpanded: [{ type: HostBinding, args: ['attr.aria-expanded',] }],
        activated: [{ type: HostListener, args: ['click', ['$event'],] }, { type: HostListener, args: ['keydown.enter', ['$event'],] }]
    };
    return NavigationLinkDirective;
}());
export { NavigationLinkDirective };
function NavigationLinkDirective_tsickle_Closure_declarations() {
    /** @type {?} */
    NavigationLinkDirective.prototype.navigationItem;
    /** @type {?} */
    NavigationLinkDirective.prototype.canExpand;
    /** @type {?} */
    NavigationLinkDirective.prototype.indent;
    /** @type {?} */
    NavigationLinkDirective.prototype.href;
    /** @type {?} */
    NavigationLinkDirective.prototype.role;
    /** @type {?} */
    NavigationLinkDirective.prototype.ariaExpanded;
    /** @type {?} */
    NavigationLinkDirective.prototype.isActive;
    /** @type {?} */
    NavigationLinkDirective.prototype.indentChildren;
    /** @type {?} */
    NavigationLinkDirective.prototype._expanded$;
    /** @type {?} */
    NavigationLinkDirective.prototype._onDestroy;
    /** @type {?} */
    NavigationLinkDirective.prototype._router;
    /** @type {?} */
    NavigationLinkDirective.prototype._locationStrategy;
    /** @type {?} */
    NavigationLinkDirective.prototype._navigationService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF2aWdhdGlvbi1saW5rLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJjb21wb25lbnRzL25hdmlnYXRpb24vbmF2aWdhdGlvbi1saW5rL25hdmlnYXRpb24tbGluay5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQWdDLE1BQU0sZUFBZSxDQUFDO0FBQzFHLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDeEQsT0FBTyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNuRCxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQ3ZDLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUU3QyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQzs7SUF1Q3RELGlDQUNZLFNBQ0EsbUJBQ0E7UUFGQSxZQUFPLEdBQVAsT0FBTztRQUNQLHNCQUFpQixHQUFqQixpQkFBaUI7UUFDakIsdUJBQWtCLEdBQWxCLGtCQUFrQjs0QkFaUCxXQUFXOzBCQU1iLElBQUksT0FBTyxFQUFXOzBCQUN0QixJQUFJLE9BQU8sRUFBUTtLQU1uQztJQWhDTCxzQkFDSSw2Q0FBUTs7Ozs7UUFEWixVQUNhLEtBQWM7WUFDdkIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDL0I7OztPQUFBOzs7O0lBK0JELDBDQUFROzs7SUFBUjtRQUFBLGlCQWdCQztRQWRHLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMs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QUM7WUFDbEIscUJBQU0sUUFBUSxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUN0RixxQkFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUN4RSxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO1NBQy9DO1FBRUQsTUFBTSxDQUFDLEtBQUssQ0FBQzs7O2dCQWhJcEIsU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSxvQkFBb0I7b0JBQzlCLFFBQVEsRUFBRSxrQkFBa0I7aUJBQy9COzs7O2dCQVZ1QixNQUFNO2dCQUZyQixnQkFBZ0I7Z0JBT2hCLGlCQUFpQjs7O2lDQVFyQixLQUFLOzJCQUdMLEtBQUs7NEJBS0wsS0FBSzt5QkFHTCxLQUFLLFlBQ0wsV0FBVyxTQUFDLGNBQWM7dUJBRzFCLFdBQVcsU0FBQyxXQUFXO3VCQUd2QixXQUFXLFNBQUMsV0FBVzsrQkFHdkIsV0FBVyxTQUFDLG9CQUFvQjs0QkEyQ2hDLFlBQVksU0FBQyxPQUFPLEVBQUUsQ0FBQyxRQUFRLENBQUMsY0FDaEMsWUFBWSxTQUFDLGVBQWUsRUFBRSxDQUFDLFFBQVEsQ0FBQzs7a0NBaEY3Qzs7U0FhYSx1QkFBdUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBMb2NhdGlvblN0cmF0ZWd5IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IERpcmVjdGl2ZSwgSG9zdEJpbmRpbmcsIEhvc3RMaXN0ZW5lciwgSW5wdXQsIE9uQ2hhbmdlcywgT25EZXN0cm95LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5hdmlnYXRpb25FbmQsIFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBmaWx0ZXIsIHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzL1N1YmplY3QnO1xuaW1wb3J0IHsgdGljayB9IGZyb20gJy4uLy4uLy4uL2NvbW1vbi9pbmRleCc7XG5pbXBvcnQgeyBOYXZpZ2F0aW9uSXRlbSB9IGZyb20gJy4uL25hdmlnYXRpb24taXRlbS5pbmZlcmZhY2UnO1xuaW1wb3J0IHsgTmF2aWdhdGlvblNlcnZpY2UgfSBmcm9tICcuLi9uYXZpZ2F0aW9uLnNlcnZpY2UnO1xuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ1t1eE5hdmlnYXRpb25MaW5rXScsXG4gICAgZXhwb3J0QXM6ICd1eE5hdmlnYXRpb25MaW5rJ1xufSlcbmV4cG9ydCBjbGFzcyBOYXZpZ2F0aW9uTGlua0RpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3kge1xuXG4gICAgQElucHV0KClcbiAgICBuYXZpZ2F0aW9uSXRlbTogTmF2aWdhdGlvbkl0ZW07XG5cbiAgICBASW5wdXQoKVxuICAgIHNldCBleHBhbmRlZCh2YWx1ZTogYm9vbGVhbikge1xuICAgICAgICB0aGlzLl9leHBhbmRlZCQubmV4dCh2YWx1ZSk7XG4gICAgfVxuXG4gICAgQElucHV0KClcbiAgICBjYW5FeHBhbmQ6IGJvb2xlYW47XG5cbiAgICBASW5wdXQoKVxuICAgIEBIb3N0QmluZGluZygnY2xhc3MuaW5kZW50JylcbiAgICBpbmRlbnQ6IGJvb2xlYW47XG5cbiAgICBASG9zdEJpbmRpbmcoJ2F0dHIuaHJlZicpXG4gICAgaHJlZjogc3RyaW5nO1xuXG4gICAgQEhvc3RCaW5kaW5nKCdhdHRyLnJvbGUnKVxuICAgIHJvbGU6IHN0cmluZztcblxuICAgIEBIb3N0QmluZGluZygnYXR0ci5hcmlhLWV4cGFuZGVkJylcbiAgICBhcmlhRXhwYW5kZWQ6IHN0cmluZyA9ICd1bmRlZmluZWQnO1xuXG4gICAgaXNBY3RpdmU6IGJvb2xlYW47XG5cbiAgICBpbmRlbnRDaGlsZHJlbjogYm9vbGVhbjtcblxuICAgIHByaXZhdGUgX2V4cGFuZGVkJCA9IG5ldyBTdWJqZWN0PGJvb2xlYW4+KCk7XG4gICAgcHJpdmF0ZSBfb25EZXN0cm95ID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIF9yb3V0ZXI6IFJvdXRlcixcbiAgICAgICAgcHJpdmF0ZSBfbG9jYXRpb25TdHJhdGVneTogTG9jYXRpb25TdHJhdGVneSxcbiAgICAgICAgcHJpdmF0ZSBfbmF2aWdhdGlvblNlcnZpY2U6IE5hdmlnYXRpb25TZXJ2aWNlXG4gICAgKSB7IH1cblxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xuXG4gICAgICAgIHRoaXMuX2V4cGFuZGVkJC5waXBlKHRha2VVbnRpbCh0aGlzLl9vbkRlc3Ryb3kpLCB0aWNrKCkpLnN1YnNjcmliZShleHBhbmRlZCA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5uYXZpZ2F0aW9uSXRlbS5jaGlsZHJlbiAmJiB0aGlzLm5hdmlnYXRpb25JdGVtLmNoaWxkcmVuLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLmFyaWFFeHBhbmRlZCA9IGAke2V4cGFuZGVkfWA7XG4gICAgICAgICAgICAgICAgdGhpcy5fbmF2aWdhdGlvblNlcnZpY2Uuc2V0RXhwYW5kZWQodGhpcy5uYXZpZ2F0aW9uSXRlbSwgZXhwYW5kZWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLl9yb3V0ZXIuZXZlbnRzXG4gICAgICAgICAgICAucGlwZShmaWx0ZXIoZXZlbnQgPT4gZXZlbnQgaW5zdGFuY2VvZiBOYXZpZ2F0aW9uRW5kKSwgdGFrZVVudGlsKHRoaXMuX29uRGVzdHJveSkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKHRoaXMudXBkYXRlTmF2aWdhdGlvblN0YXRlLmJpbmQodGhpcykpO1xuXG4gICAgICAgIHRoaXMudXBkYXRlTmF2aWdhdGlvblN0YXRlKCk7XG5cbiAgICAgICAgdGhpcy51cGRhdGVBdHRyaWJ1dGVzKCk7XG4gICAgfVxuXG4gICAgbmdPbkNoYW5nZXMoKTogdm9pZCB7XG4gICAgICAgIHRoaXMudXBkYXRlQXR0cmlidXRlcygpO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9vbkRlc3Ryb3kubmV4dCgpO1xuICAgICAgICB0aGlzLl9vbkRlc3Ryb3kuY29tcGxldGUoKTtcbiAgICB9XG5cbiAgICBASG9zdExpc3RlbmVyKCdjbGljaycsIFsnJGV2ZW50J10pXG4gICAgQEhvc3RMaXN0ZW5lcigna2V5ZG93bi5lbnRlcicsIFsnJGV2ZW50J10pXG4gICAgYWN0aXZhdGVkKGV2ZW50OiBFdmVudCk6IGJvb2xlYW4ge1xuXG4gICAgICAgIGlmICh0aGlzLm5hdmlnYXRpb25JdGVtLnJvdXRlckxpbmspIHtcbiAgICAgICAgICAgIGNvbnN0IGNvbW1hbmRzID0gQXJyYXkuaXNBcnJheSh0aGlzLm5hdmlnYXRpb25JdGVtLnJvdXRlckxpbmspID8gdGhpcy5uYXZpZ2F0aW9uSXRlbS5yb3V0ZXJMaW5rIDogW3RoaXMubmF2aWdhdGlvbkl0ZW0ucm91dGVyTGlua107XG4gICAgICAgICAgICB0aGlzLl9yb3V0ZXIubmF2aWdhdGUoY29tbWFuZHMsIHRoaXMubmF2aWdhdGlvbkl0ZW0ucm91dGVyRXh0cmFzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFRvZ2dsZSBleHBhbmRlZCBzdGF0ZSAocmVsZXZhbnQgb25seSBpZiBpdCBoYXMgY2hpbGRyZW4pXG4gICAgICAgIHRoaXMubmF2aWdhdGlvbkl0ZW0uZXhwYW5kZWQgPSAhdGhpcy5uYXZpZ2F0aW9uSXRlbS5leHBhbmRlZDtcblxuICAgICAgICAvLyBJbnZva2UgdGhlIGN1c3RvbSBjbGljayBoYW5kbGVyIGlmIHNwZWNpZmllZFxuICAgICAgICBpZiAodGhpcy5uYXZpZ2F0aW9uSXRlbS5jbGljaykge1xuICAgICAgICAgICAgdGhpcy5uYXZpZ2F0aW9uSXRlbS5jbGljayhldmVudCwgdGhpcy5uYXZpZ2F0aW9uSXRlbSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB1cGRhdGVOYXZpZ2F0aW9uU3RhdGUoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuaXNBY3RpdmUgPSB0aGlzLmlzQWN0aXZlSXRlbSh0aGlzLm5hdmlnYXRpb25JdGVtKTtcblxuICAgICAgICBpZiAodGhpcy5uYXZpZ2F0aW9uSXRlbS5jaGlsZHJlbikge1xuICAgICAgICAgICAgY29uc3QgYWN0aXZlQ2hpbGQgPSB0aGlzLm5hdmlnYXRpb25JdGVtLmNoaWxkcmVuLmZpbmQoY2hpbGQgPT4gdGhpcy5pc0FjdGl2ZUl0ZW0oY2hpbGQpKTtcbiAgICAgICAgICAgIGlmIChhY3RpdmVDaGlsZCkge1xuICAgICAgICAgICAgICAgIHRoaXMubmF2aWdhdGlvbkl0ZW0uZXhwYW5kZWQgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB1cGRhdGVBdHRyaWJ1dGVzKCk6IHZvaWQge1xuXG4gICAgICAgIHRoaXMuaHJlZiA9IHRoaXMuZ2V0SHJlZigpO1xuICAgICAgICB0aGlzLnJvbGUgPSAodGhpcy5uYXZpZ2F0aW9uSXRlbS5jaGlsZHJlbiAmJiB0aGlzLm5hdmlnYXRpb25JdGVtLmNoaWxkcmVuLmxlbmd0aCA+IDApID8gJ2J1dHRvbicgOiAndHJlZWl0ZW0nO1xuXG4gICAgICAgIHRoaXMuaW5kZW50Q2hpbGRyZW4gPSB0aGlzLm5hdmlnYXRpb25JdGVtLmNoaWxkcmVuICYmIHRoaXMubmF2aWdhdGlvbkl0ZW0uY2hpbGRyZW4uc29tZShpdGVtID0+IGl0ZW0uY2hpbGRyZW4gJiYgaXRlbS5jaGlsZHJlbi5sZW5ndGggPiAwKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldEhyZWYoKTogc3RyaW5nIHtcblxuICAgICAgICBpZiAodGhpcy5uYXZpZ2F0aW9uSXRlbS5yb3V0ZXJMaW5rKSB7XG4gICAgICAgICAgICBjb25zdCBjb21tYW5kcyA9IEFycmF5LmlzQXJyYXkodGhpcy5uYXZpZ2F0aW9uSXRlbS5yb3V0ZXJMaW5rKSA/IHRoaXMubmF2aWdhdGlvbkl0ZW0ucm91dGVyTGluayA6IFt0aGlzLm5hdmlnYXRpb25JdGVtLnJvdXRlckxpbmtdO1xuICAgICAgICAgICAgY29uc3QgdXJsVHJlZSA9IHRoaXMuX3JvdXRlci5jcmVhdGVVcmxUcmVlKGNvbW1hbmRzLCB0aGlzLm5hdmlnYXRpb25JdGVtLnJvdXRlckV4dHJhcyk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fbG9jYXRpb25TdHJhdGVneS5wcmVwYXJlRXh0ZXJuYWxVcmwodGhpcy5fcm91dGVyLnNlcmlhbGl6ZVVybCh1cmxUcmVlKSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBwcml2YXRlIGlzQWN0aXZlSXRlbShpdGVtOiBOYXZpZ2F0aW9uSXRlbSk6IGJvb2xlYW4ge1xuXG4gICAgICAgIGlmIChpdGVtLnJvdXRlckxpbmspIHtcbiAgICAgICAgICAgIGNvbnN0IGNvbW1hbmRzID0gQXJyYXkuaXNBcnJheShpdGVtLnJvdXRlckxpbmspID8gaXRlbS5yb3V0ZXJMaW5rIDogW2l0ZW0ucm91dGVyTGlua107XG4gICAgICAgICAgICBjb25zdCB1cmxUcmVlID0gdGhpcy5fcm91dGVyLmNyZWF0ZVVybFRyZWUoY29tbWFuZHMsIGl0ZW0ucm91dGVyRXh0cmFzKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9yb3V0ZXIuaXNBY3RpdmUodXJsVHJlZSwgdHJ1ZSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxufSJdfQ==