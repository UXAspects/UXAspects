/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, ContentChildren, ElementRef, HostBinding, Input, Optional, QueryList, Renderer2, SkipSelf } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
export class NavigationItemComponent {
    /**
     * @param {?} _elementRef
     * @param {?} _renderer
     * @param {?} _parent
     * @param {?} _router
     * @param {?} _activatedRoute
     */
    constructor(_elementRef, _renderer, _parent, _router, _activatedRoute) {
        this._elementRef = _elementRef;
        this._renderer = _renderer;
        this._parent = _parent;
        this._router = _router;
        this._activatedRoute = _activatedRoute;
        this.expanded = false;
        this.level = 1;
        this.indentWithoutArrow = true;
        this.level = _parent ? _parent.level + 1 : 1;
        this._navigationEnd = _router.events.pipe(filter(event => event instanceof NavigationEnd))
            .subscribe(() => this.expanded = this.hasActiveLink(this.link));
    }
    /**
     * @return {?}
     */
    get active() {
        if (this.link) {
            return this._router.isActive(this.link, true);
        }
    }
    /**
     * @return {?}
     */
    get children() {
        return this._children.filter(item => item !== this);
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        // Add classes to parent for styling
        const /** @type {?} */ parentListElement = this._elementRef.nativeElement.parentElement;
        if (parentListElement) {
            const /** @type {?} */ levelClass = this.getLevelClass();
            if (levelClass.length > 0) {
                this._renderer.addClass(parentListElement, 'nav');
                this._renderer.addClass(parentListElement, levelClass);
            }
        }
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        // Set 'indentWithoutArrow'
        this.setIndentWithoutArrow();
        // Update 'indentWithoutArrow' in response to changes to children
        this._childrenChanges = this._children.changes.subscribe(() => this.setIndentWithoutArrow());
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._navigationEnd.unsubscribe();
        this._childrenChanges.unsubscribe();
    }
    /**
     * @param {?} link
     * @return {?}
     */
    hasActiveLink(link) {
        const /** @type {?} */ tree = this._router.createUrlTree([link], {
            relativeTo: this._activatedRoute,
            queryParams: this._activatedRoute.snapshot.queryParams,
            fragment: this._activatedRoute.snapshot.fragment
        });
        if (link && this._router.isActive(tree, true)) {
            return true;
        }
        // If this component has children, check if any of them, or their descendants, are active.
        return this.children.some((item) => item.hasActiveLink(item.link));
    }
    /**
     * @return {?}
     */
    getLevelClass() {
        switch (this.level) {
            case 2:
                return 'nav-second-level';
            case 3:
                return 'nav-third-level';
            case 4:
                return 'nav-fourth-level';
            case 5:
                return 'nav-fifth-level';
        }
        return '';
    }
    /**
     * @return {?}
     */
    setIndentWithoutArrow() {
        if (this.children.length > 0) {
            // If this element has children it will be indented and will have an arrow
            this.indentWithoutArrow = false;
        }
        else if (this._parent) {
            // If this element has a parent, indent it if any of its siblings have children
            this.indentWithoutArrow = !this._parent.children.every((item) => item.children.length === 0);
        }
        else {
            // Top-level elements should be indented
            this.indentWithoutArrow = true;
        }
    }
}
NavigationItemComponent.decorators = [
    { type: Component, args: [{
                selector: '[ux-navigation-item]',
                template: `<a *ngIf="link" [class.has-arrow]="children.length > 0" [class.no-arrow]="indentWithoutArrow" [routerLink]="link">
    <span>{{header}}</span>
</a>
<a *ngIf="!link" (click)="expanded = !expanded" [class.has-arrow]="children.length > 0" [class.no-arrow]="indentWithoutArrow">
    <span>{{header}}</span>
</a>
<ng-content></ng-content>
`,
            },] },
];
/** @nocollapse */
NavigationItemComponent.ctorParameters = () => [
    { type: ElementRef, },
    { type: Renderer2, },
    { type: NavigationItemComponent, decorators: [{ type: Optional }, { type: SkipSelf },] },
    { type: Router, },
    { type: ActivatedRoute, },
];
NavigationItemComponent.propDecorators = {
    "header": [{ type: Input },],
    "icon": [{ type: Input },],
    "link": [{ type: Input },],
    "expanded": [{ type: Input }, { type: HostBinding, args: ['class.selected',] },],
    "active": [{ type: HostBinding, args: ['class.active',] },],
    "_children": [{ type: ContentChildren, args: [NavigationItemComponent, { descendants: true },] },],
};
function NavigationItemComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    NavigationItemComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    NavigationItemComponent.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    NavigationItemComponent.propDecorators;
    /** @type {?} */
    NavigationItemComponent.prototype.header;
    /** @type {?} */
    NavigationItemComponent.prototype.icon;
    /** @type {?} */
    NavigationItemComponent.prototype.link;
    /** @type {?} */
    NavigationItemComponent.prototype.expanded;
    /** @type {?} */
    NavigationItemComponent.prototype.level;
    /** @type {?} */
    NavigationItemComponent.prototype.indentWithoutArrow;
    /** @type {?} */
    NavigationItemComponent.prototype._navigationEnd;
    /** @type {?} */
    NavigationItemComponent.prototype._childrenChanges;
    /** @type {?} */
    NavigationItemComponent.prototype._children;
    /** @type {?} */
    NavigationItemComponent.prototype._elementRef;
    /** @type {?} */
    NavigationItemComponent.prototype._renderer;
    /** @type {?} */
    NavigationItemComponent.prototype._parent;
    /** @type {?} */
    NavigationItemComponent.prototype._router;
    /** @type {?} */
    NavigationItemComponent.prototype._activatedRoute;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF2aWdhdGlvbi1pdGVtLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJjb21wb25lbnRzL25hdmlnYXRpb24vbmF2aWdhdGlvbi1pdGVtL25hdmlnYXRpb24taXRlbS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBbUMsU0FBUyxFQUFFLGVBQWUsRUFBRSxVQUFVLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBYSxRQUFRLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDakwsT0FBTyxFQUFFLGNBQWMsRUFBRSxhQUFhLEVBQUUsTUFBTSxFQUFXLE1BQU0saUJBQWlCLENBQUM7QUFDakYsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBY3hDLE1BQU07Ozs7Ozs7O0lBMkJGLFlBQ1ksYUFDQSxXQUN3QixTQUN4QixTQUNBO1FBSkEsZ0JBQVcsR0FBWCxXQUFXO1FBQ1gsY0FBUyxHQUFULFNBQVM7UUFDZSxZQUFPLEdBQVAsT0FBTztRQUMvQixZQUFPLEdBQVAsT0FBTztRQUNQLG9CQUFlLEdBQWYsZUFBZTt3QkEzQmlDLEtBQUs7cUJBU2pELENBQUM7a0NBQ2EsSUFBSTtRQW1COUIsSUFBSSxDQUFDLEtBQUssR0FBRyxPQUFPLEdBQUcsT0FBTyxDQUFDLEtBQUssR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRTdDLElBQUksQ0FBQyxjQUFjLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssSUFBSSxLQUFLLFlBQVksYUFBYSxDQUFDLENBQUM7YUFDckYsU0FBUyxDQUFDLE1BQU0sSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0tBQ3ZFOzs7O1FB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QyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQzs7WUFFdEIsSUFBSSxDQUFDLGtCQUFrQixHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQyxDQUFDO1NBQ2hHO1FBQUMsSUFBSSxDQUFDLENBQUM7O1lBRUosSUFBSSxDQUFDLGtCQUFrQixHQUFHLElBQUksQ0FBQztTQUNsQzs7OztZQXJIUixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLHNCQUFzQjtnQkFDaEMsUUFBUSxFQUFFOzs7Ozs7O0NBT2I7YUFDQTs7OztZQWZxRSxVQUFVO1lBQXNELFNBQVM7WUFnQmxJLHVCQUF1Qix1QkE4QjNCLFFBQVEsWUFBSSxRQUFRO1lBN0NXLE1BQU07WUFBckMsY0FBYzs7O3VCQWlCbEIsS0FBSztxQkFDTCxLQUFLO3FCQUNMLEtBQUs7eUJBQ0wsS0FBSyxZQUFJLFdBQVcsU0FBQyxnQkFBZ0I7dUJBRXJDLFdBQVcsU0FBQyxjQUFjOzBCQWExQixlQUFlLFNBQUMsdUJBQXVCLEVBQUUsRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWZ0ZXJDb250ZW50SW5pdCwgQWZ0ZXJWaWV3SW5pdCwgQ29tcG9uZW50LCBDb250ZW50Q2hpbGRyZW4sIEVsZW1lbnRSZWYsIEhvc3RCaW5kaW5nLCBJbnB1dCwgT25EZXN0cm95LCBPcHRpb25hbCwgUXVlcnlMaXN0LCBSZW5kZXJlcjIsIFNraXBTZWxmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSwgTmF2aWdhdGlvbkVuZCwgUm91dGVyLCBVcmxUcmVlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IGZpbHRlciB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMvU3Vic2NyaXB0aW9uJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdbdXgtbmF2aWdhdGlvbi1pdGVtXScsXG4gICAgdGVtcGxhdGU6IGA8YSAqbmdJZj1cImxpbmtcIiBbY2xhc3MuaGFzLWFycm93XT1cImNoaWxkcmVuLmxlbmd0aCA+IDBcIiBbY2xhc3Mubm8tYXJyb3ddPVwiaW5kZW50V2l0aG91dEFycm93XCIgW3JvdXRlckxpbmtdPVwibGlua1wiPlxyXG4gICAgPHNwYW4+e3toZWFkZXJ9fTwvc3Bhbj5cclxuPC9hPlxyXG48YSAqbmdJZj1cIiFsaW5rXCIgKGNsaWNrKT1cImV4cGFuZGVkID0gIWV4cGFuZGVkXCIgW2NsYXNzLmhhcy1hcnJvd109XCJjaGlsZHJlbi5sZW5ndGggPiAwXCIgW2NsYXNzLm5vLWFycm93XT1cImluZGVudFdpdGhvdXRBcnJvd1wiPlxyXG4gICAgPHNwYW4+e3toZWFkZXJ9fTwvc3Bhbj5cclxuPC9hPlxyXG48bmctY29udGVudD48L25nLWNvbnRlbnQ+XHJcbmAsXG59KVxuZXhwb3J0IGNsYXNzIE5hdmlnYXRpb25JdGVtQ29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgQWZ0ZXJDb250ZW50SW5pdCwgT25EZXN0cm95IHtcblxuICAgIEBJbnB1dCgpIGhlYWRlcjogc3RyaW5nO1xuICAgIEBJbnB1dCgpIGljb246IHN0cmluZztcbiAgICBASW5wdXQoKSBsaW5rOiBzdHJpbmc7XG4gICAgQElucHV0KCkgQEhvc3RCaW5kaW5nKCdjbGFzcy5zZWxlY3RlZCcpIGV4cGFuZGVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBASG9zdEJpbmRpbmcoJ2NsYXNzLmFjdGl2ZScpXG4gICAgZ2V0IGFjdGl2ZSgpOiBib29sZWFuIHtcbiAgICAgICAgaWYgKHRoaXMubGluaykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3JvdXRlci5pc0FjdGl2ZSh0aGlzLmxpbmssIHRydWUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbGV2ZWw6IG51bWJlciA9IDE7XG4gICAgaW5kZW50V2l0aG91dEFycm93OiBib29sZWFuID0gdHJ1ZTtcblxuICAgIHByaXZhdGUgX25hdmlnYXRpb25FbmQ6IFN1YnNjcmlwdGlvbjtcbiAgICBwcml2YXRlIF9jaGlsZHJlbkNoYW5nZXM6IFN1YnNjcmlwdGlvbjtcblxuICAgIEBDb250ZW50Q2hpbGRyZW4oTmF2aWdhdGlvbkl0ZW1Db21wb25lbnQsIHsgZGVzY2VuZGFudHM6IHRydWUgfSlcbiAgICBwcml2YXRlIF9jaGlsZHJlbjogUXVlcnlMaXN0PE5hdmlnYXRpb25JdGVtQ29tcG9uZW50PjtcblxuICAgIGdldCBjaGlsZHJlbigpOiBOYXZpZ2F0aW9uSXRlbUNvbXBvbmVudFtdIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NoaWxkcmVuLmZpbHRlcihpdGVtID0+IGl0ZW0gIT09IHRoaXMpO1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgICAgICBwcml2YXRlIF9yZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgICAgICBAT3B0aW9uYWwoKSBAU2tpcFNlbGYoKSBwcml2YXRlIF9wYXJlbnQ6IE5hdmlnYXRpb25JdGVtQ29tcG9uZW50LFxuICAgICAgICBwcml2YXRlIF9yb3V0ZXI6IFJvdXRlcixcbiAgICAgICAgcHJpdmF0ZSBfYWN0aXZhdGVkUm91dGU6IEFjdGl2YXRlZFJvdXRlXG4gICAgKSB7XG4gICAgICAgIHRoaXMubGV2ZWwgPSBfcGFyZW50ID8gX3BhcmVudC5sZXZlbCArIDEgOiAxO1xuXG4gICAgICAgIHRoaXMuX25hdmlnYXRpb25FbmQgPSBfcm91dGVyLmV2ZW50cy5waXBlKGZpbHRlcihldmVudCA9PiBldmVudCBpbnN0YW5jZW9mIE5hdmlnYXRpb25FbmQpKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB0aGlzLmV4cGFuZGVkID0gdGhpcy5oYXNBY3RpdmVMaW5rKHRoaXMubGluaykpO1xuICAgIH1cblxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICAgICAgLy8gQWRkIGNsYXNzZXMgdG8gcGFyZW50IGZvciBzdHlsaW5nXG4gICAgICAgIGNvbnN0IHBhcmVudExpc3RFbGVtZW50ID0gdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnBhcmVudEVsZW1lbnQ7XG4gICAgICAgIGlmIChwYXJlbnRMaXN0RWxlbWVudCkge1xuICAgICAgICAgICAgY29uc3QgbGV2ZWxDbGFzczogc3RyaW5nID0gdGhpcy5nZXRMZXZlbENsYXNzKCk7XG4gICAgICAgICAgICBpZiAobGV2ZWxDbGFzcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fcmVuZGVyZXIuYWRkQ2xhc3MocGFyZW50TGlzdEVsZW1lbnQsICduYXYnKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9yZW5kZXJlci5hZGRDbGFzcyhwYXJlbnRMaXN0RWxlbWVudCwgbGV2ZWxDbGFzcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ0FmdGVyQ29udGVudEluaXQoKTogdm9pZCB7XG4gICAgICAgIC8vIFNldCAnaW5kZW50V2l0aG91dEFycm93J1xuICAgICAgICB0aGlzLnNldEluZGVudFdpdGhvdXRBcnJvdygpO1xuXG4gICAgICAgIC8vIFVwZGF0ZSAnaW5kZW50V2l0aG91dEFycm93JyBpbiByZXNwb25zZSB0byBjaGFuZ2VzIHRvIGNoaWxkcmVuXG4gICAgICAgIHRoaXMuX2NoaWxkcmVuQ2hhbmdlcyA9IHRoaXMuX2NoaWxkcmVuLmNoYW5nZXMuc3Vic2NyaWJlKCgpID0+IHRoaXMuc2V0SW5kZW50V2l0aG91dEFycm93KCkpO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9uYXZpZ2F0aW9uRW5kLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIHRoaXMuX2NoaWxkcmVuQ2hhbmdlcy51bnN1YnNjcmliZSgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgaGFzQWN0aXZlTGluayhsaW5rOiBzdHJpbmcgfCBVcmxUcmVlKTogYm9vbGVhbiB7XG5cbiAgICAgICAgY29uc3QgdHJlZSA9IHRoaXMuX3JvdXRlci5jcmVhdGVVcmxUcmVlKFtsaW5rXSwge1xuICAgICAgICAgICAgcmVsYXRpdmVUbzogdGhpcy5fYWN0aXZhdGVkUm91dGUsXG4gICAgICAgICAgICBxdWVyeVBhcmFtczogdGhpcy5fYWN0aXZhdGVkUm91dGUuc25hcHNob3QucXVlcnlQYXJhbXMsXG4gICAgICAgICAgICBmcmFnbWVudDogdGhpcy5fYWN0aXZhdGVkUm91dGUuc25hcHNob3QuZnJhZ21lbnRcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKGxpbmsgJiYgdGhpcy5fcm91dGVyLmlzQWN0aXZlKHRyZWUsIHRydWUpKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIElmIHRoaXMgY29tcG9uZW50IGhhcyBjaGlsZHJlbiwgY2hlY2sgaWYgYW55IG9mIHRoZW0sIG9yIHRoZWlyIGRlc2NlbmRhbnRzLCBhcmUgYWN0aXZlLlxuICAgICAgICByZXR1cm4gdGhpcy5jaGlsZHJlbi5zb21lKChpdGVtKSA9PiBpdGVtLmhhc0FjdGl2ZUxpbmsoaXRlbS5saW5rKSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRMZXZlbENsYXNzKCk6IHN0cmluZyB7XG4gICAgICAgIHN3aXRjaCAodGhpcy5sZXZlbCkge1xuICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgIHJldHVybiAnbmF2LXNlY29uZC1sZXZlbCc7XG4gICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgcmV0dXJuICduYXYtdGhpcmQtbGV2ZWwnO1xuICAgICAgICAgICAgY2FzZSA0OlxuICAgICAgICAgICAgICAgIHJldHVybiAnbmF2LWZvdXJ0aC1sZXZlbCc7XG4gICAgICAgICAgICBjYXNlIDU6XG4gICAgICAgICAgICAgICAgcmV0dXJuICduYXYtZmlmdGgtbGV2ZWwnO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuICcnO1xuICAgIH1cblxuICAgIHByaXZhdGUgc2V0SW5kZW50V2l0aG91dEFycm93KCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5jaGlsZHJlbi5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAvLyBJZiB0aGlzIGVsZW1lbnQgaGFzIGNoaWxkcmVuIGl0IHdpbGwgYmUgaW5kZW50ZWQgYW5kIHdpbGwgaGF2ZSBhbiBhcnJvd1xuICAgICAgICAgICAgdGhpcy5pbmRlbnRXaXRob3V0QXJyb3cgPSBmYWxzZTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9wYXJlbnQpIHtcbiAgICAgICAgICAgLy8gSWYgdGhpcyBlbGVtZW50IGhhcyBhIHBhcmVudCwgaW5kZW50IGl0IGlmIGFueSBvZiBpdHMgc2libGluZ3MgaGF2ZSBjaGlsZHJlblxuICAgICAgICAgICAgdGhpcy5pbmRlbnRXaXRob3V0QXJyb3cgPSAhdGhpcy5fcGFyZW50LmNoaWxkcmVuLmV2ZXJ5KChpdGVtKSA9PiBpdGVtLmNoaWxkcmVuLmxlbmd0aCA9PT0gMCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBUb3AtbGV2ZWwgZWxlbWVudHMgc2hvdWxkIGJlIGluZGVudGVkXG4gICAgICAgICAgICB0aGlzLmluZGVudFdpdGhvdXRBcnJvdyA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=