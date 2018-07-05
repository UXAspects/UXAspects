/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, ContentChildren, ElementRef, HostBinding, Input, Optional, QueryList, Renderer2, SkipSelf } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
var NavigationItemComponent = (function () {
    function NavigationItemComponent(_elementRef, _renderer, _parent, _router, _activatedRoute) {
        var _this = this;
        this._elementRef = _elementRef;
        this._renderer = _renderer;
        this._parent = _parent;
        this._router = _router;
        this._activatedRoute = _activatedRoute;
        this.expanded = false;
        this.level = 1;
        this.indentWithoutArrow = true;
        this.level = _parent ? _parent.level + 1 : 1;
        this._navigationEnd = _router.events.pipe(filter(function (event) { return event instanceof NavigationEnd; }))
            .subscribe(function () { return _this.expanded = _this.hasActiveLink(_this.link); });
    }
    Object.defineProperty(NavigationItemComponent.prototype, "active", {
        get: /**
         * @return {?}
         */
        function () {
            if (this.link) {
                return this._router.isActive(this.link, true);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NavigationItemComponent.prototype, "children", {
        get: /**
         * @return {?}
         */
        function () {
            var _this = this;
            return this._children.filter(function (item) { return item !== _this; });
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    NavigationItemComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        // Add classes to parent for styling
        var /** @type {?} */ parentListElement = this._elementRef.nativeElement.parentElement;
        if (parentListElement) {
            var /** @type {?} */ levelClass = this.getLevelClass();
            if (levelClass.length > 0) {
                this._renderer.addClass(parentListElement, 'nav');
                this._renderer.addClass(parentListElement, levelClass);
            }
        }
    };
    /**
     * @return {?}
     */
    NavigationItemComponent.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        // Set 'indentWithoutArrow'
        this.setIndentWithoutArrow();
        // Update 'indentWithoutArrow' in response to changes to children
        this._childrenChanges = this._children.changes.subscribe(function () { return _this.setIndentWithoutArrow(); });
    };
    /**
     * @return {?}
     */
    NavigationItemComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._navigationEnd.unsubscribe();
        this._childrenChanges.unsubscribe();
    };
    /**
     * @param {?} link
     * @return {?}
     */
    NavigationItemComponent.prototype.hasActiveLink = /**
     * @param {?} link
     * @return {?}
     */
    function (link) {
        var /** @type {?} */ tree = this._router.createUrlTree([link], {
            relativeTo: this._activatedRoute,
            queryParams: this._activatedRoute.snapshot.queryParams,
            fragment: this._activatedRoute.snapshot.fragment
        });
        if (link && this._router.isActive(tree, true)) {
            return true;
        }
        // If this component has children, check if any of them, or their descendants, are active.
        return this.children.some(function (item) { return item.hasActiveLink(item.link); });
    };
    /**
     * @return {?}
     */
    NavigationItemComponent.prototype.getLevelClass = /**
     * @return {?}
     */
    function () {
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
    };
    /**
     * @return {?}
     */
    NavigationItemComponent.prototype.setIndentWithoutArrow = /**
     * @return {?}
     */
    function () {
        if (this.children.length > 0) {
            // If this element has children it will be indented and will have an arrow
            this.indentWithoutArrow = false;
        }
        else if (this._parent) {
            // If this element has a parent, indent it if any of its siblings have children
            this.indentWithoutArrow = !this._parent.children.every(function (item) { return item.children.length === 0; });
        }
        else {
            // Top-level elements should be indented
            this.indentWithoutArrow = true;
        }
    };
    NavigationItemComponent.decorators = [
        { type: Component, args: [{
                    selector: '[ux-navigation-item]',
                    template: "<a *ngIf=\"link\" [class.has-arrow]=\"children.length > 0\" [class.no-arrow]=\"indentWithoutArrow\" [routerLink]=\"link\">\n    <span>{{header}}</span>\n</a>\n<a *ngIf=\"!link\" (click)=\"expanded = !expanded\" [class.has-arrow]=\"children.length > 0\" [class.no-arrow]=\"indentWithoutArrow\">\n    <span>{{header}}</span>\n</a>\n<ng-content></ng-content>\n",
                },] },
    ];
    /** @nocollapse */
    NavigationItemComponent.ctorParameters = function () { return [
        { type: ElementRef, },
        { type: Renderer2, },
        { type: NavigationItemComponent, decorators: [{ type: Optional }, { type: SkipSelf },] },
        { type: Router, },
        { type: ActivatedRoute, },
    ]; };
    NavigationItemComponent.propDecorators = {
        "header": [{ type: Input },],
        "icon": [{ type: Input },],
        "link": [{ type: Input },],
        "expanded": [{ type: Input }, { type: HostBinding, args: ['class.selected',] },],
        "active": [{ type: HostBinding, args: ['class.active',] },],
        "_children": [{ type: ContentChildren, args: [NavigationItemComponent, { descendants: true },] },],
    };
    return NavigationItemComponent;
}());
export { NavigationItemComponent };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF2aWdhdGlvbi1pdGVtLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJjb21wb25lbnRzL25hdmlnYXRpb24vbmF2aWdhdGlvbi1pdGVtL25hdmlnYXRpb24taXRlbS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBbUMsU0FBUyxFQUFFLGVBQWUsRUFBRSxVQUFVLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBYSxRQUFRLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDakwsT0FBTyxFQUFFLGNBQWMsRUFBRSxhQUFhLEVBQUUsTUFBTSxFQUFXLE1BQU0saUJBQWlCLENBQUM7QUFDakYsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGdCQUFnQixDQUFDOztJQXlDcEMsaUNBQ1ksYUFDQSxXQUN3QixTQUN4QixTQUNBO1FBTFosaUJBV0M7UUFWVyxnQkFBVyxHQUFYLFdBQVc7UUFDWCxjQUFTLEdBQVQsU0FBUztRQUNlLFlBQU8sR0FBUCxPQUFPO1FBQy9CLFlBQU8sR0FBUCxPQUFPO1FBQ1Asb0JBQWUsR0FBZixlQUFlO3dCQTNCaUMsS0FBSztxQkFTakQsQ0FBQztrQ0FDYSxJQUFJO1FBbUI5QixJQUFJLENBQUMsS0FBSyxHQUFHLE9BQU8sR0FBRyxPQUFPLENBQUMsS0FBSyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFN0MsSUFBSSxDQUFDLGNBQWMsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBQSxLQUFLLElBQUksT0FBQSxLQUFLLFlBQVksYUFBYSxFQUE5QixDQUE4QixDQUFDLENBQUM7YUFDckYsU0FBUyxDQUFDLGNBQU0sT0FBQSxLQUFJLENBQUMsUUFBUSxHQUFHLEtBQUksQ0FBQyxhQUFhLENBQUMsS0FBSSxDQUFDLElBQUksQ0FB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QUFDOzs7OztJQUdOLHVEQUFxQjs7OztRQUN6QixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDOztZQUUzQixJQUFJLENBQUMsa0JBQWtCLEdBQUcsS0FBSyxDQUFDO1NBQ25DO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDOztZQUV0QixJQUFJLENBQUMsa0JBQWtCLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsVUFBQyxJQUFJLElBQUssT0FBQSxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQTFCLENBQTBCLENBQUMsQ0FBQztTQUNoRztRQUFDLElBQUksQ0FBQyxDQUFDOztZQUVKLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUM7U0FDbEM7OztnQkFySFIsU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSxzQkFBc0I7b0JBQ2hDLFFBQVEsRUFBRSx1V0FPYjtpQkFDQTs7OztnQkFmcUUsVUFBVTtnQkFBc0QsU0FBUztnQkFnQmxJLHVCQUF1Qix1QkE4QjNCLFFBQVEsWUFBSSxRQUFRO2dCQTdDVyxNQUFNO2dCQUFyQyxjQUFjOzs7MkJBaUJsQixLQUFLO3lCQUNMLEtBQUs7eUJBQ0wsS0FBSzs2QkFDTCxLQUFLLFlBQUksV0FBVyxTQUFDLGdCQUFnQjsyQkFFckMsV0FBVyxTQUFDLGNBQWM7OEJBYTFCLGVBQWUsU0FBQyx1QkFBdUIsRUFBRSxFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUU7O2tDQXBDbkU7O1NBZ0JhLHVCQUF1QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFmdGVyQ29udGVudEluaXQsIEFmdGVyVmlld0luaXQsIENvbXBvbmVudCwgQ29udGVudENoaWxkcmVuLCBFbGVtZW50UmVmLCBIb3N0QmluZGluZywgSW5wdXQsIE9uRGVzdHJveSwgT3B0aW9uYWwsIFF1ZXJ5TGlzdCwgUmVuZGVyZXIyLCBTa2lwU2VsZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUsIE5hdmlnYXRpb25FbmQsIFJvdXRlciwgVXJsVHJlZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBmaWx0ZXIgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzL1N1YnNjcmlwdGlvbic7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnW3V4LW5hdmlnYXRpb24taXRlbV0nLFxuICAgIHRlbXBsYXRlOiBgPGEgKm5nSWY9XCJsaW5rXCIgW2NsYXNzLmhhcy1hcnJvd109XCJjaGlsZHJlbi5sZW5ndGggPiAwXCIgW2NsYXNzLm5vLWFycm93XT1cImluZGVudFdpdGhvdXRBcnJvd1wiIFtyb3V0ZXJMaW5rXT1cImxpbmtcIj5cbiAgICA8c3Bhbj57e2hlYWRlcn19PC9zcGFuPlxuPC9hPlxuPGEgKm5nSWY9XCIhbGlua1wiIChjbGljayk9XCJleHBhbmRlZCA9ICFleHBhbmRlZFwiIFtjbGFzcy5oYXMtYXJyb3ddPVwiY2hpbGRyZW4ubGVuZ3RoID4gMFwiIFtjbGFzcy5uby1hcnJvd109XCJpbmRlbnRXaXRob3V0QXJyb3dcIj5cbiAgICA8c3Bhbj57e2hlYWRlcn19PC9zcGFuPlxuPC9hPlxuPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuYCxcbn0pXG5leHBvcnQgY2xhc3MgTmF2aWdhdGlvbkl0ZW1Db21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBBZnRlckNvbnRlbnRJbml0LCBPbkRlc3Ryb3kge1xuXG4gICAgQElucHV0KCkgaGVhZGVyOiBzdHJpbmc7XG4gICAgQElucHV0KCkgaWNvbjogc3RyaW5nO1xuICAgIEBJbnB1dCgpIGxpbms6IHN0cmluZztcbiAgICBASW5wdXQoKSBASG9zdEJpbmRpbmcoJ2NsYXNzLnNlbGVjdGVkJykgZXhwYW5kZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIEBIb3N0QmluZGluZygnY2xhc3MuYWN0aXZlJylcbiAgICBnZXQgYWN0aXZlKCk6IGJvb2xlYW4ge1xuICAgICAgICBpZiAodGhpcy5saW5rKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fcm91dGVyLmlzQWN0aXZlKHRoaXMubGluaywgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBsZXZlbDogbnVtYmVyID0gMTtcbiAgICBpbmRlbnRXaXRob3V0QXJyb3c6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgcHJpdmF0ZSBfbmF2aWdhdGlvbkVuZDogU3Vic2NyaXB0aW9uO1xuICAgIHByaXZhdGUgX2NoaWxkcmVuQ2hhbmdlczogU3Vic2NyaXB0aW9uO1xuXG4gICAgQENvbnRlbnRDaGlsZHJlbihOYXZpZ2F0aW9uSXRlbUNvbXBvbmVudCwgeyBkZXNjZW5kYW50czogdHJ1ZSB9KVxuICAgIHByaXZhdGUgX2NoaWxkcmVuOiBRdWVyeUxpc3Q8TmF2aWdhdGlvbkl0ZW1Db21wb25lbnQ+O1xuXG4gICAgZ2V0IGNoaWxkcmVuKCk6IE5hdmlnYXRpb25JdGVtQ29tcG9uZW50W10ge1xuICAgICAgICByZXR1cm4gdGhpcy5fY2hpbGRyZW4uZmlsdGVyKGl0ZW0gPT4gaXRlbSAhPT0gdGhpcyk7XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgICAgIHByaXZhdGUgX3JlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICAgICAgIEBPcHRpb25hbCgpIEBTa2lwU2VsZigpIHByaXZhdGUgX3BhcmVudDogTmF2aWdhdGlvbkl0ZW1Db21wb25lbnQsXG4gICAgICAgIHByaXZhdGUgX3JvdXRlcjogUm91dGVyLFxuICAgICAgICBwcml2YXRlIF9hY3RpdmF0ZWRSb3V0ZTogQWN0aXZhdGVkUm91dGVcbiAgICApIHtcbiAgICAgICAgdGhpcy5sZXZlbCA9IF9wYXJlbnQgPyBfcGFyZW50LmxldmVsICsgMSA6IDE7XG5cbiAgICAgICAgdGhpcy5fbmF2aWdhdGlvbkVuZCA9IF9yb3V0ZXIuZXZlbnRzLnBpcGUoZmlsdGVyKGV2ZW50ID0+IGV2ZW50IGluc3RhbmNlb2YgTmF2aWdhdGlvbkVuZCkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHRoaXMuZXhwYW5kZWQgPSB0aGlzLmhhc0FjdGl2ZUxpbmsodGhpcy5saW5rKSk7XG4gICAgfVxuXG4gICAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgICAgICAvLyBBZGQgY2xhc3NlcyB0byBwYXJlbnQgZm9yIHN0eWxpbmdcbiAgICAgICAgY29uc3QgcGFyZW50TGlzdEVsZW1lbnQgPSB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQucGFyZW50RWxlbWVudDtcbiAgICAgICAgaWYgKHBhcmVudExpc3RFbGVtZW50KSB7XG4gICAgICAgICAgICBjb25zdCBsZXZlbENsYXNzOiBzdHJpbmcgPSB0aGlzLmdldExldmVsQ2xhc3MoKTtcbiAgICAgICAgICAgIGlmIChsZXZlbENsYXNzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9yZW5kZXJlci5hZGRDbGFzcyhwYXJlbnRMaXN0RWxlbWVudCwgJ25hdicpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3JlbmRlcmVyLmFkZENsYXNzKHBhcmVudExpc3RFbGVtZW50LCBsZXZlbENsYXNzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nQWZ0ZXJDb250ZW50SW5pdCgpOiB2b2lkIHtcbiAgICAgICAgLy8gU2V0ICdpbmRlbnRXaXRob3V0QXJyb3cnXG4gICAgICAgIHRoaXMuc2V0SW5kZW50V2l0aG91dEFycm93KCk7XG5cbiAgICAgICAgLy8gVXBkYXRlICdpbmRlbnRXaXRob3V0QXJyb3cnIGluIHJlc3BvbnNlIHRvIGNoYW5nZXMgdG8gY2hpbGRyZW5cbiAgICAgICAgdGhpcy5fY2hpbGRyZW5DaGFuZ2VzID0gdGhpcy5fY2hpbGRyZW4uY2hhbmdlcy5zdWJzY3JpYmUoKCkgPT4gdGhpcy5zZXRJbmRlbnRXaXRob3V0QXJyb3coKSk7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX25hdmlnYXRpb25FbmQudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgdGhpcy5fY2hpbGRyZW5DaGFuZ2VzLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBoYXNBY3RpdmVMaW5rKGxpbms6IHN0cmluZyB8IFVybFRyZWUpOiBib29sZWFuIHtcblxuICAgICAgICBjb25zdCB0cmVlID0gdGhpcy5fcm91dGVyLmNyZWF0ZVVybFRyZWUoW2xpbmtdLCB7XG4gICAgICAgICAgICByZWxhdGl2ZVRvOiB0aGlzLl9hY3RpdmF0ZWRSb3V0ZSxcbiAgICAgICAgICAgIHF1ZXJ5UGFyYW1zOiB0aGlzLl9hY3RpdmF0ZWRSb3V0ZS5zbmFwc2hvdC5xdWVyeVBhcmFtcyxcbiAgICAgICAgICAgIGZyYWdtZW50OiB0aGlzLl9hY3RpdmF0ZWRSb3V0ZS5zbmFwc2hvdC5mcmFnbWVudFxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAobGluayAmJiB0aGlzLl9yb3V0ZXIuaXNBY3RpdmUodHJlZSwgdHJ1ZSkpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gSWYgdGhpcyBjb21wb25lbnQgaGFzIGNoaWxkcmVuLCBjaGVjayBpZiBhbnkgb2YgdGhlbSwgb3IgdGhlaXIgZGVzY2VuZGFudHMsIGFyZSBhY3RpdmUuXG4gICAgICAgIHJldHVybiB0aGlzLmNoaWxkcmVuLnNvbWUoKGl0ZW0pID0+IGl0ZW0uaGFzQWN0aXZlTGluayhpdGVtLmxpbmspKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldExldmVsQ2xhc3MoKTogc3RyaW5nIHtcbiAgICAgICAgc3dpdGNoICh0aGlzLmxldmVsKSB7XG4gICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgcmV0dXJuICduYXYtc2Vjb25kLWxldmVsJztcbiAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICByZXR1cm4gJ25hdi10aGlyZC1sZXZlbCc7XG4gICAgICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuICduYXYtZm91cnRoLWxldmVsJztcbiAgICAgICAgICAgIGNhc2UgNTpcbiAgICAgICAgICAgICAgICByZXR1cm4gJ25hdi1maWZ0aC1sZXZlbCc7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gJyc7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzZXRJbmRlbnRXaXRob3V0QXJyb3coKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmNoaWxkcmVuLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIC8vIElmIHRoaXMgZWxlbWVudCBoYXMgY2hpbGRyZW4gaXQgd2lsbCBiZSBpbmRlbnRlZCBhbmQgd2lsbCBoYXZlIGFuIGFycm93XG4gICAgICAgICAgICB0aGlzLmluZGVudFdpdGhvdXRBcnJvdyA9IGZhbHNlO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX3BhcmVudCkge1xuICAgICAgICAgICAvLyBJZiB0aGlzIGVsZW1lbnQgaGFzIGEgcGFyZW50LCBpbmRlbnQgaXQgaWYgYW55IG9mIGl0cyBzaWJsaW5ncyBoYXZlIGNoaWxkcmVuXG4gICAgICAgICAgICB0aGlzLmluZGVudFdpdGhvdXRBcnJvdyA9ICF0aGlzLl9wYXJlbnQuY2hpbGRyZW4uZXZlcnkoKGl0ZW0pID0+IGl0ZW0uY2hpbGRyZW4ubGVuZ3RoID09PSAwKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIFRvcC1sZXZlbCBlbGVtZW50cyBzaG91bGQgYmUgaW5kZW50ZWRcbiAgICAgICAgICAgIHRoaXMuaW5kZW50V2l0aG91dEFycm93ID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==