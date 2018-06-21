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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF2aWdhdGlvbi1pdGVtLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJjb21wb25lbnRzL25hdmlnYXRpb24vbmF2aWdhdGlvbi1pdGVtL25hdmlnYXRpb24taXRlbS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBbUMsU0FBUyxFQUFFLGVBQWUsRUFBRSxVQUFVLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBYSxRQUFRLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDakwsT0FBTyxFQUFFLGNBQWMsRUFBRSxhQUFhLEVBQUUsTUFBTSxFQUFXLE1BQU0saUJBQWlCLENBQUM7QUFDakYsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBY3hDLE1BQU07Ozs7Ozs7O0lBMkJGLFlBQ1ksYUFDQSxXQUN3QixTQUN4QixTQUNBO1FBSkEsZ0JBQVcsR0FBWCxXQUFXO1FBQ1gsY0FBUyxHQUFULFNBQVM7UUFDZSxZQUFPLEdBQVAsT0FBTztRQUMvQixZQUFPLEdBQVAsT0FBTztRQUNQLG9CQUFlLEdBQWYsZUFBZTt3QkEzQmlDLEtBQUs7cUJBU2pELENBQUM7a0NBQ2EsSUFBSTtRQW1COUIsSUFBSSxDQUFDLEtBQUssR0FBRyxPQUFPLEdBQUcsT0FBTyxDQUFDLEtBQUssR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRTdDLElBQUksQ0FBQyxjQUFjLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssSUFBSSxLQUFLLFlBQVksYUFBYSxDQUFDLENBQUM7YUFDckYsU0FBUyxDQUFDLE1BQU0sSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0tBQ3ZFOzs7O1FB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QyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQzs7WUFFdEIsSUFBSSxDQUFDLGtCQUFrQixHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQyxDQUFDO1NBQ2hHO1FBQUMsSUFBSSxDQUFDLENBQUM7O1lBRUosSUFBSSxDQUFDLGtCQUFrQixHQUFHLElBQUksQ0FBQztTQUNsQzs7OztZQXJIUixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLHNCQUFzQjtnQkFDaEMsUUFBUSxFQUFFOzs7Ozs7O0NBT2I7YUFDQTs7OztZQWZxRSxVQUFVO1lBQXNELFNBQVM7WUFnQmxJLHVCQUF1Qix1QkE4QjNCLFFBQVEsWUFBSSxRQUFRO1lBN0NXLE1BQU07WUFBckMsY0FBYzs7O3VCQWlCbEIsS0FBSztxQkFDTCxLQUFLO3FCQUNMLEtBQUs7eUJBQ0wsS0FBSyxZQUFJLFdBQVcsU0FBQyxnQkFBZ0I7dUJBRXJDLFdBQVcsU0FBQyxjQUFjOzBCQWExQixlQUFlLFNBQUMsdUJBQXVCLEVBQUUsRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWZ0ZXJDb250ZW50SW5pdCwgQWZ0ZXJWaWV3SW5pdCwgQ29tcG9uZW50LCBDb250ZW50Q2hpbGRyZW4sIEVsZW1lbnRSZWYsIEhvc3RCaW5kaW5nLCBJbnB1dCwgT25EZXN0cm95LCBPcHRpb25hbCwgUXVlcnlMaXN0LCBSZW5kZXJlcjIsIFNraXBTZWxmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSwgTmF2aWdhdGlvbkVuZCwgUm91dGVyLCBVcmxUcmVlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IGZpbHRlciB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMvU3Vic2NyaXB0aW9uJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdbdXgtbmF2aWdhdGlvbi1pdGVtXScsXG4gICAgdGVtcGxhdGU6IGA8YSAqbmdJZj1cImxpbmtcIiBbY2xhc3MuaGFzLWFycm93XT1cImNoaWxkcmVuLmxlbmd0aCA+IDBcIiBbY2xhc3Mubm8tYXJyb3ddPVwiaW5kZW50V2l0aG91dEFycm93XCIgW3JvdXRlckxpbmtdPVwibGlua1wiPlxuICAgIDxzcGFuPnt7aGVhZGVyfX08L3NwYW4+XG48L2E+XG48YSAqbmdJZj1cIiFsaW5rXCIgKGNsaWNrKT1cImV4cGFuZGVkID0gIWV4cGFuZGVkXCIgW2NsYXNzLmhhcy1hcnJvd109XCJjaGlsZHJlbi5sZW5ndGggPiAwXCIgW2NsYXNzLm5vLWFycm93XT1cImluZGVudFdpdGhvdXRBcnJvd1wiPlxuICAgIDxzcGFuPnt7aGVhZGVyfX08L3NwYW4+XG48L2E+XG48bmctY29udGVudD48L25nLWNvbnRlbnQ+XG5gLFxufSlcbmV4cG9ydCBjbGFzcyBOYXZpZ2F0aW9uSXRlbUNvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIEFmdGVyQ29udGVudEluaXQsIE9uRGVzdHJveSB7XG5cbiAgICBASW5wdXQoKSBoZWFkZXI6IHN0cmluZztcbiAgICBASW5wdXQoKSBpY29uOiBzdHJpbmc7XG4gICAgQElucHV0KCkgbGluazogc3RyaW5nO1xuICAgIEBJbnB1dCgpIEBIb3N0QmluZGluZygnY2xhc3Muc2VsZWN0ZWQnKSBleHBhbmRlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgQEhvc3RCaW5kaW5nKCdjbGFzcy5hY3RpdmUnKVxuICAgIGdldCBhY3RpdmUoKTogYm9vbGVhbiB7XG4gICAgICAgIGlmICh0aGlzLmxpbmspIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9yb3V0ZXIuaXNBY3RpdmUodGhpcy5saW5rLCB0cnVlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGxldmVsOiBudW1iZXIgPSAxO1xuICAgIGluZGVudFdpdGhvdXRBcnJvdzogYm9vbGVhbiA9IHRydWU7XG5cbiAgICBwcml2YXRlIF9uYXZpZ2F0aW9uRW5kOiBTdWJzY3JpcHRpb247XG4gICAgcHJpdmF0ZSBfY2hpbGRyZW5DaGFuZ2VzOiBTdWJzY3JpcHRpb247XG5cbiAgICBAQ29udGVudENoaWxkcmVuKE5hdmlnYXRpb25JdGVtQ29tcG9uZW50LCB7IGRlc2NlbmRhbnRzOiB0cnVlIH0pXG4gICAgcHJpdmF0ZSBfY2hpbGRyZW46IFF1ZXJ5TGlzdDxOYXZpZ2F0aW9uSXRlbUNvbXBvbmVudD47XG5cbiAgICBnZXQgY2hpbGRyZW4oKTogTmF2aWdhdGlvbkl0ZW1Db21wb25lbnRbXSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jaGlsZHJlbi5maWx0ZXIoaXRlbSA9PiBpdGVtICE9PSB0aGlzKTtcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBfZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICAgICAgcHJpdmF0ZSBfcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICAgICAgQE9wdGlvbmFsKCkgQFNraXBTZWxmKCkgcHJpdmF0ZSBfcGFyZW50OiBOYXZpZ2F0aW9uSXRlbUNvbXBvbmVudCxcbiAgICAgICAgcHJpdmF0ZSBfcm91dGVyOiBSb3V0ZXIsXG4gICAgICAgIHByaXZhdGUgX2FjdGl2YXRlZFJvdXRlOiBBY3RpdmF0ZWRSb3V0ZVxuICAgICkge1xuICAgICAgICB0aGlzLmxldmVsID0gX3BhcmVudCA/IF9wYXJlbnQubGV2ZWwgKyAxIDogMTtcblxuICAgICAgICB0aGlzLl9uYXZpZ2F0aW9uRW5kID0gX3JvdXRlci5ldmVudHMucGlwZShmaWx0ZXIoZXZlbnQgPT4gZXZlbnQgaW5zdGFuY2VvZiBOYXZpZ2F0aW9uRW5kKSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5leHBhbmRlZCA9IHRoaXMuaGFzQWN0aXZlTGluayh0aGlzLmxpbmspKTtcbiAgICB9XG5cbiAgICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgICAgIC8vIEFkZCBjbGFzc2VzIHRvIHBhcmVudCBmb3Igc3R5bGluZ1xuICAgICAgICBjb25zdCBwYXJlbnRMaXN0RWxlbWVudCA9IHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5wYXJlbnRFbGVtZW50O1xuICAgICAgICBpZiAocGFyZW50TGlzdEVsZW1lbnQpIHtcbiAgICAgICAgICAgIGNvbnN0IGxldmVsQ2xhc3M6IHN0cmluZyA9IHRoaXMuZ2V0TGV2ZWxDbGFzcygpO1xuICAgICAgICAgICAgaWYgKGxldmVsQ2xhc3MubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3JlbmRlcmVyLmFkZENsYXNzKHBhcmVudExpc3RFbGVtZW50LCAnbmF2Jyk7XG4gICAgICAgICAgICAgICAgdGhpcy5fcmVuZGVyZXIuYWRkQ2xhc3MocGFyZW50TGlzdEVsZW1lbnQsIGxldmVsQ2xhc3MpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdBZnRlckNvbnRlbnRJbml0KCk6IHZvaWQge1xuICAgICAgICAvLyBTZXQgJ2luZGVudFdpdGhvdXRBcnJvdydcbiAgICAgICAgdGhpcy5zZXRJbmRlbnRXaXRob3V0QXJyb3coKTtcblxuICAgICAgICAvLyBVcGRhdGUgJ2luZGVudFdpdGhvdXRBcnJvdycgaW4gcmVzcG9uc2UgdG8gY2hhbmdlcyB0byBjaGlsZHJlblxuICAgICAgICB0aGlzLl9jaGlsZHJlbkNoYW5nZXMgPSB0aGlzLl9jaGlsZHJlbi5jaGFuZ2VzLnN1YnNjcmliZSgoKSA9PiB0aGlzLnNldEluZGVudFdpdGhvdXRBcnJvdygpKTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fbmF2aWdhdGlvbkVuZC51bnN1YnNjcmliZSgpO1xuICAgICAgICB0aGlzLl9jaGlsZHJlbkNoYW5nZXMudW5zdWJzY3JpYmUoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGhhc0FjdGl2ZUxpbmsobGluazogc3RyaW5nIHwgVXJsVHJlZSk6IGJvb2xlYW4ge1xuXG4gICAgICAgIGNvbnN0IHRyZWUgPSB0aGlzLl9yb3V0ZXIuY3JlYXRlVXJsVHJlZShbbGlua10sIHtcbiAgICAgICAgICAgIHJlbGF0aXZlVG86IHRoaXMuX2FjdGl2YXRlZFJvdXRlLFxuICAgICAgICAgICAgcXVlcnlQYXJhbXM6IHRoaXMuX2FjdGl2YXRlZFJvdXRlLnNuYXBzaG90LnF1ZXJ5UGFyYW1zLFxuICAgICAgICAgICAgZnJhZ21lbnQ6IHRoaXMuX2FjdGl2YXRlZFJvdXRlLnNuYXBzaG90LmZyYWdtZW50XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChsaW5rICYmIHRoaXMuX3JvdXRlci5pc0FjdGl2ZSh0cmVlLCB0cnVlKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBJZiB0aGlzIGNvbXBvbmVudCBoYXMgY2hpbGRyZW4sIGNoZWNrIGlmIGFueSBvZiB0aGVtLCBvciB0aGVpciBkZXNjZW5kYW50cywgYXJlIGFjdGl2ZS5cbiAgICAgICAgcmV0dXJuIHRoaXMuY2hpbGRyZW4uc29tZSgoaXRlbSkgPT4gaXRlbS5oYXNBY3RpdmVMaW5rKGl0ZW0ubGluaykpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0TGV2ZWxDbGFzcygpOiBzdHJpbmcge1xuICAgICAgICBzd2l0Y2ggKHRoaXMubGV2ZWwpIHtcbiAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICByZXR1cm4gJ25hdi1zZWNvbmQtbGV2ZWwnO1xuICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgIHJldHVybiAnbmF2LXRoaXJkLWxldmVsJztcbiAgICAgICAgICAgIGNhc2UgNDpcbiAgICAgICAgICAgICAgICByZXR1cm4gJ25hdi1mb3VydGgtbGV2ZWwnO1xuICAgICAgICAgICAgY2FzZSA1OlxuICAgICAgICAgICAgICAgIHJldHVybiAnbmF2LWZpZnRoLWxldmVsJztcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAnJztcbiAgICB9XG5cbiAgICBwcml2YXRlIHNldEluZGVudFdpdGhvdXRBcnJvdygpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuY2hpbGRyZW4ubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgLy8gSWYgdGhpcyBlbGVtZW50IGhhcyBjaGlsZHJlbiBpdCB3aWxsIGJlIGluZGVudGVkIGFuZCB3aWxsIGhhdmUgYW4gYXJyb3dcbiAgICAgICAgICAgIHRoaXMuaW5kZW50V2l0aG91dEFycm93ID0gZmFsc2U7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5fcGFyZW50KSB7XG4gICAgICAgICAgIC8vIElmIHRoaXMgZWxlbWVudCBoYXMgYSBwYXJlbnQsIGluZGVudCBpdCBpZiBhbnkgb2YgaXRzIHNpYmxpbmdzIGhhdmUgY2hpbGRyZW5cbiAgICAgICAgICAgIHRoaXMuaW5kZW50V2l0aG91dEFycm93ID0gIXRoaXMuX3BhcmVudC5jaGlsZHJlbi5ldmVyeSgoaXRlbSkgPT4gaXRlbS5jaGlsZHJlbi5sZW5ndGggPT09IDApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gVG9wLWxldmVsIGVsZW1lbnRzIHNob3VsZCBiZSBpbmRlbnRlZFxuICAgICAgICAgICAgdGhpcy5pbmRlbnRXaXRob3V0QXJyb3cgPSB0cnVlO1xuICAgICAgICB9XG4gICAgfVxufVxuIl19