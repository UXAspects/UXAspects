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
export class NavigationLinkDirective {
    /**
     * @param {?} _router
     * @param {?} _locationStrategy
     * @param {?} _navigationService
     */
    constructor(_router, _locationStrategy, _navigationService) {
        this._router = _router;
        this._locationStrategy = _locationStrategy;
        this._navigationService = _navigationService;
        this.ariaExpanded = 'undefined';
        this._expanded$ = new Subject();
        this._onDestroy = new Subject();
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set expanded(value) {
        this._expanded$.next(value);
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this._expanded$.pipe(takeUntil(this._onDestroy), tick()).subscribe(expanded => {
            if (this.navigationItem.children && this.navigationItem.children.length > 0) {
                this.ariaExpanded = `${expanded}`;
                this._navigationService.setExpanded(this.navigationItem, expanded);
            }
        });
        this._router.events
            .pipe(filter(event => event instanceof NavigationEnd), takeUntil(this._onDestroy))
            .subscribe(this.updateNavigationState.bind(this));
        this.updateNavigationState();
        this.updateAttributes();
    }
    /**
     * @return {?}
     */
    ngOnChanges() {
        this.updateAttributes();
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._onDestroy.next();
        this._onDestroy.complete();
    }
    /**
     * @param {?} event
     * @return {?}
     */
    activated(event) {
        if (this.navigationItem.routerLink) {
            const /** @type {?} */ commands = Array.isArray(this.navigationItem.routerLink) ? this.navigationItem.routerLink : [this.navigationItem.routerLink];
            this._router.navigate(commands, this.navigationItem.routerExtras);
        }
        // Toggle expanded state (relevant only if it has children)
        this.navigationItem.expanded = !this.navigationItem.expanded;
        // Invoke the custom click handler if specified
        if (this.navigationItem.click) {
            this.navigationItem.click(event, this.navigationItem);
        }
        return false;
    }
    /**
     * @return {?}
     */
    updateNavigationState() {
        this.isActive = this.isActiveItem(this.navigationItem);
        if (this.navigationItem.children) {
            const /** @type {?} */ activeChild = this.navigationItem.children.find(child => this.isActiveItem(child));
            if (activeChild) {
                this.navigationItem.expanded = true;
            }
        }
    }
    /**
     * @return {?}
     */
    updateAttributes() {
        this.href = this.getHref();
        this.role = (this.navigationItem.children && this.navigationItem.children.length > 0) ? 'button' : 'treeitem';
        this.indentChildren = this.navigationItem.children && this.navigationItem.children.some(item => item.children && item.children.length > 0);
    }
    /**
     * @return {?}
     */
    getHref() {
        if (this.navigationItem.routerLink) {
            const /** @type {?} */ commands = Array.isArray(this.navigationItem.routerLink) ? this.navigationItem.routerLink : [this.navigationItem.routerLink];
            const /** @type {?} */ urlTree = this._router.createUrlTree(commands, this.navigationItem.routerExtras);
            return this._locationStrategy.prepareExternalUrl(this._router.serializeUrl(urlTree));
        }
        return null;
    }
    /**
     * @param {?} item
     * @return {?}
     */
    isActiveItem(item) {
        if (item.routerLink) {
            const /** @type {?} */ commands = Array.isArray(item.routerLink) ? item.routerLink : [item.routerLink];
            const /** @type {?} */ urlTree = this._router.createUrlTree(commands, item.routerExtras);
            return this._router.isActive(urlTree, true);
        }
        return false;
    }
}
NavigationLinkDirective.decorators = [
    { type: Directive, args: [{
                selector: '[uxNavigationLink]',
                exportAs: 'uxNavigationLink'
            },] }
];
/** @nocollapse */
NavigationLinkDirective.ctorParameters = () => [
    { type: Router },
    { type: LocationStrategy },
    { type: NavigationService }
];
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF2aWdhdGlvbi1saW5rLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJjb21wb25lbnRzL25hdmlnYXRpb24vbmF2aWdhdGlvbi1saW5rL25hdmlnYXRpb24tbGluay5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQWdDLE1BQU0sZUFBZSxDQUFDO0FBQzFHLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDeEQsT0FBTyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNuRCxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQ3ZDLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUU3QyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQU0xRCxNQUFNOzs7Ozs7SUFpQ0YsWUFDWSxTQUNBLG1CQUNBO1FBRkEsWUFBTyxHQUFQLE9BQU87UUFDUCxzQkFBaUIsR0FBakIsaUJBQWlCO1FBQ2pCLHVCQUFrQixHQUFsQixrQkFBa0I7NEJBWlAsV0FBVzswQkFNYixJQUFJLE9BQU8sRUFBVzswQkFDdEIsSUFBSSxPQUFPLEVBQVE7S0FNbkM7Ozs7O0lBaENMLElBQ0ksUUFBUSxDQUFDLEtBQWM7UUFDdkIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDL0I7Ozs7SUErQkQsUUFBUTtRQUVKLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsSUFBSSxF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QUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUN0Rix1QkFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUN4RSxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO1NBQy9DO1FBRUQsTUFBTSxDQUFDLEtBQUssQ0FBQzs7OztZQWhJcEIsU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxvQkFBb0I7Z0JBQzlCLFFBQVEsRUFBRSxrQkFBa0I7YUFDL0I7Ozs7WUFWdUIsTUFBTTtZQUZyQixnQkFBZ0I7WUFPaEIsaUJBQWlCOzs7NkJBUXJCLEtBQUs7dUJBR0wsS0FBSzt3QkFLTCxLQUFLO3FCQUdMLEtBQUssWUFDTCxXQUFXLFNBQUMsY0FBYzttQkFHMUIsV0FBVyxTQUFDLFdBQVc7bUJBR3ZCLFdBQVcsU0FBQyxXQUFXOzJCQUd2QixXQUFXLFNBQUMsb0JBQW9CO3dCQTJDaEMsWUFBWSxTQUFDLE9BQU8sRUFBRSxDQUFDLFFBQVEsQ0FBQyxjQUNoQyxZQUFZLFNBQUMsZUFBZSxFQUFFLENBQUMsUUFBUSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTG9jYXRpb25TdHJhdGVneSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBEaXJlY3RpdmUsIEhvc3RCaW5kaW5nLCBIb3N0TGlzdGVuZXIsIElucHV0LCBPbkNoYW5nZXMsIE9uRGVzdHJveSwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOYXZpZ2F0aW9uRW5kLCBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgZmlsdGVyLCB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcy9TdWJqZWN0JztcbmltcG9ydCB7IHRpY2sgfSBmcm9tICcuLi8uLi8uLi9jb21tb24vaW5kZXgnO1xuaW1wb3J0IHsgTmF2aWdhdGlvbkl0ZW0gfSBmcm9tICcuLi9uYXZpZ2F0aW9uLWl0ZW0uaW5mZXJmYWNlJztcbmltcG9ydCB7IE5hdmlnYXRpb25TZXJ2aWNlIH0gZnJvbSAnLi4vbmF2aWdhdGlvbi5zZXJ2aWNlJztcblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdbdXhOYXZpZ2F0aW9uTGlua10nLFxuICAgIGV4cG9ydEFzOiAndXhOYXZpZ2F0aW9uTGluaydcbn0pXG5leHBvcnQgY2xhc3MgTmF2aWdhdGlvbkxpbmtEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcywgT25EZXN0cm95IHtcblxuICAgIEBJbnB1dCgpXG4gICAgbmF2aWdhdGlvbkl0ZW06IE5hdmlnYXRpb25JdGVtO1xuXG4gICAgQElucHV0KClcbiAgICBzZXQgZXhwYW5kZWQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5fZXhwYW5kZWQkLm5leHQodmFsdWUpO1xuICAgIH1cblxuICAgIEBJbnB1dCgpXG4gICAgY2FuRXhwYW5kOiBib29sZWFuO1xuXG4gICAgQElucHV0KClcbiAgICBASG9zdEJpbmRpbmcoJ2NsYXNzLmluZGVudCcpXG4gICAgaW5kZW50OiBib29sZWFuO1xuXG4gICAgQEhvc3RCaW5kaW5nKCdhdHRyLmhyZWYnKVxuICAgIGhyZWY6IHN0cmluZztcblxuICAgIEBIb3N0QmluZGluZygnYXR0ci5yb2xlJylcbiAgICByb2xlOiBzdHJpbmc7XG5cbiAgICBASG9zdEJpbmRpbmcoJ2F0dHIuYXJpYS1leHBhbmRlZCcpXG4gICAgYXJpYUV4cGFuZGVkOiBzdHJpbmcgPSAndW5kZWZpbmVkJztcblxuICAgIGlzQWN0aXZlOiBib29sZWFuO1xuXG4gICAgaW5kZW50Q2hpbGRyZW46IGJvb2xlYW47XG5cbiAgICBwcml2YXRlIF9leHBhbmRlZCQgPSBuZXcgU3ViamVjdDxib29sZWFuPigpO1xuICAgIHByaXZhdGUgX29uRGVzdHJveSA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBfcm91dGVyOiBSb3V0ZXIsXG4gICAgICAgIHByaXZhdGUgX2xvY2F0aW9uU3RyYXRlZ3k6IExvY2F0aW9uU3RyYXRlZ3ksXG4gICAgICAgIHByaXZhdGUgX25hdmlnYXRpb25TZXJ2aWNlOiBOYXZpZ2F0aW9uU2VydmljZVxuICAgICkgeyB9XG5cbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcblxuICAgICAgICB0aGlzLl9leHBhbmRlZCQucGlwZSh0YWtlVW50aWwodGhpcy5fb25EZXN0cm95KSwgdGljaygpKS5zdWJzY3JpYmUoZXhwYW5kZWQgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMubmF2aWdhdGlvbkl0ZW0uY2hpbGRyZW4gJiYgdGhpcy5uYXZpZ2F0aW9uSXRlbS5jaGlsZHJlbi5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hcmlhRXhwYW5kZWQgPSBgJHtleHBhbmRlZH1gO1xuICAgICAgICAgICAgICAgIHRoaXMuX25hdmlnYXRpb25TZXJ2aWNlLnNldEV4cGFuZGVkKHRoaXMubmF2aWdhdGlvbkl0ZW0sIGV4cGFuZGVkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5fcm91dGVyLmV2ZW50c1xuICAgICAgICAgICAgLnBpcGUoZmlsdGVyKGV2ZW50ID0+IGV2ZW50IGluc3RhbmNlb2YgTmF2aWdhdGlvbkVuZCksIHRha2VVbnRpbCh0aGlzLl9vbkRlc3Ryb3kpKVxuICAgICAgICAgICAgLnN1YnNjcmliZSh0aGlzLnVwZGF0ZU5hdmlnYXRpb25TdGF0ZS5iaW5kKHRoaXMpKTtcblxuICAgICAgICB0aGlzLnVwZGF0ZU5hdmlnYXRpb25TdGF0ZSgpO1xuXG4gICAgICAgIHRoaXMudXBkYXRlQXR0cmlidXRlcygpO1xuICAgIH1cblxuICAgIG5nT25DaGFuZ2VzKCk6IHZvaWQge1xuICAgICAgICB0aGlzLnVwZGF0ZUF0dHJpYnV0ZXMoKTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fb25EZXN0cm95Lm5leHQoKTtcbiAgICAgICAgdGhpcy5fb25EZXN0cm95LmNvbXBsZXRlKCk7XG4gICAgfVxuXG4gICAgQEhvc3RMaXN0ZW5lcignY2xpY2snLCBbJyRldmVudCddKVxuICAgIEBIb3N0TGlzdGVuZXIoJ2tleWRvd24uZW50ZXInLCBbJyRldmVudCddKVxuICAgIGFjdGl2YXRlZChldmVudDogRXZlbnQpOiBib29sZWFuIHtcblxuICAgICAgICBpZiAodGhpcy5uYXZpZ2F0aW9uSXRlbS5yb3V0ZXJMaW5rKSB7XG4gICAgICAgICAgICBjb25zdCBjb21tYW5kcyA9IEFycmF5LmlzQXJyYXkodGhpcy5uYXZpZ2F0aW9uSXRlbS5yb3V0ZXJMaW5rKSA/IHRoaXMubmF2aWdhdGlvbkl0ZW0ucm91dGVyTGluayA6IFt0aGlzLm5hdmlnYXRpb25JdGVtLnJvdXRlckxpbmtdO1xuICAgICAgICAgICAgdGhpcy5fcm91dGVyLm5hdmlnYXRlKGNvbW1hbmRzLCB0aGlzLm5hdmlnYXRpb25JdGVtLnJvdXRlckV4dHJhcyk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBUb2dnbGUgZXhwYW5kZWQgc3RhdGUgKHJlbGV2YW50IG9ubHkgaWYgaXQgaGFzIGNoaWxkcmVuKVxuICAgICAgICB0aGlzLm5hdmlnYXRpb25JdGVtLmV4cGFuZGVkID0gIXRoaXMubmF2aWdhdGlvbkl0ZW0uZXhwYW5kZWQ7XG5cbiAgICAgICAgLy8gSW52b2tlIHRoZSBjdXN0b20gY2xpY2sgaGFuZGxlciBpZiBzcGVjaWZpZWRcbiAgICAgICAgaWYgKHRoaXMubmF2aWdhdGlvbkl0ZW0uY2xpY2spIHtcbiAgICAgICAgICAgIHRoaXMubmF2aWdhdGlvbkl0ZW0uY2xpY2soZXZlbnQsIHRoaXMubmF2aWdhdGlvbkl0ZW0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHByaXZhdGUgdXBkYXRlTmF2aWdhdGlvblN0YXRlKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmlzQWN0aXZlID0gdGhpcy5pc0FjdGl2ZUl0ZW0odGhpcy5uYXZpZ2F0aW9uSXRlbSk7XG5cbiAgICAgICAgaWYgKHRoaXMubmF2aWdhdGlvbkl0ZW0uY2hpbGRyZW4pIHtcbiAgICAgICAgICAgIGNvbnN0IGFjdGl2ZUNoaWxkID0gdGhpcy5uYXZpZ2F0aW9uSXRlbS5jaGlsZHJlbi5maW5kKGNoaWxkID0+IHRoaXMuaXNBY3RpdmVJdGVtKGNoaWxkKSk7XG4gICAgICAgICAgICBpZiAoYWN0aXZlQ2hpbGQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm5hdmlnYXRpb25JdGVtLmV4cGFuZGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgdXBkYXRlQXR0cmlidXRlcygpOiB2b2lkIHtcblxuICAgICAgICB0aGlzLmhyZWYgPSB0aGlzLmdldEhyZWYoKTtcbiAgICAgICAgdGhpcy5yb2xlID0gKHRoaXMubmF2aWdhdGlvbkl0ZW0uY2hpbGRyZW4gJiYgdGhpcy5uYXZpZ2F0aW9uSXRlbS5jaGlsZHJlbi5sZW5ndGggPiAwKSA/ICdidXR0b24nIDogJ3RyZWVpdGVtJztcblxuICAgICAgICB0aGlzLmluZGVudENoaWxkcmVuID0gdGhpcy5uYXZpZ2F0aW9uSXRlbS5jaGlsZHJlbiAmJiB0aGlzLm5hdmlnYXRpb25JdGVtLmNoaWxkcmVuLnNvbWUoaXRlbSA9PiBpdGVtLmNoaWxkcmVuICYmIGl0ZW0uY2hpbGRyZW4ubGVuZ3RoID4gMCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRIcmVmKCk6IHN0cmluZyB7XG5cbiAgICAgICAgaWYgKHRoaXMubmF2aWdhdGlvbkl0ZW0ucm91dGVyTGluaykge1xuICAgICAgICAgICAgY29uc3QgY29tbWFuZHMgPSBBcnJheS5pc0FycmF5KHRoaXMubmF2aWdhdGlvbkl0ZW0ucm91dGVyTGluaykgPyB0aGlzLm5hdmlnYXRpb25JdGVtLnJvdXRlckxpbmsgOiBbdGhpcy5uYXZpZ2F0aW9uSXRlbS5yb3V0ZXJMaW5rXTtcbiAgICAgICAgICAgIGNvbnN0IHVybFRyZWUgPSB0aGlzLl9yb3V0ZXIuY3JlYXRlVXJsVHJlZShjb21tYW5kcywgdGhpcy5uYXZpZ2F0aW9uSXRlbS5yb3V0ZXJFeHRyYXMpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2xvY2F0aW9uU3RyYXRlZ3kucHJlcGFyZUV4dGVybmFsVXJsKHRoaXMuX3JvdXRlci5zZXJpYWxpemVVcmwodXJsVHJlZSkpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpc0FjdGl2ZUl0ZW0oaXRlbTogTmF2aWdhdGlvbkl0ZW0pOiBib29sZWFuIHtcblxuICAgICAgICBpZiAoaXRlbS5yb3V0ZXJMaW5rKSB7XG4gICAgICAgICAgICBjb25zdCBjb21tYW5kcyA9IEFycmF5LmlzQXJyYXkoaXRlbS5yb3V0ZXJMaW5rKSA/IGl0ZW0ucm91dGVyTGluayA6IFtpdGVtLnJvdXRlckxpbmtdO1xuICAgICAgICAgICAgY29uc3QgdXJsVHJlZSA9IHRoaXMuX3JvdXRlci5jcmVhdGVVcmxUcmVlKGNvbW1hbmRzLCBpdGVtLnJvdXRlckV4dHJhcyk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fcm91dGVyLmlzQWN0aXZlKHVybFRyZWUsIHRydWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbn0iXX0=