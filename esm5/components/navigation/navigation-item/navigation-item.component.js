/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, ContentChildren, ElementRef, Input, Optional, QueryList, Renderer2, SkipSelf } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators/filter';
var NavigationItemComponent = /** @class */ (function () {
    function NavigationItemComponent(_elementRef, _renderer, _parent, _router) {
        var _this = this;
        this._elementRef = _elementRef;
        this._renderer = _renderer;
        this._parent = _parent;
        this._router = _router;
        this.expanded = false;
        this.level = 1;
        this.indentWithoutArrow = true;
        this.level = _parent ? _parent.level + 1 : 1;
        this._navigationEnd = _router.events.pipe(filter(function (event) { return event instanceof NavigationEnd; })).subscribe(function (event) {
            // Expand this component if it or a descendant is active.
            // Expand this component if it or a descendant is active.
            _this.expanded = _this.hasActiveLink(_this.link);
        });
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
        // If this component has a link, check if it is active.
        if (link && this._router.isActive(link, true)) {
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
                    host: {
                        '[class.active]': 'active',
                        '[class.selected]': 'expanded',
                    }
                }] }
    ];
    /** @nocollapse */
    NavigationItemComponent.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer2 },
        { type: NavigationItemComponent, decorators: [{ type: Optional }, { type: SkipSelf }] },
        { type: Router }
    ]; };
    NavigationItemComponent.propDecorators = {
        header: [{ type: Input }],
        icon: [{ type: Input }],
        expanded: [{ type: Input }],
        link: [{ type: Input }],
        _children: [{ type: ContentChildren, args: [NavigationItemComponent, { descendants: true },] }]
    };
    return NavigationItemComponent;
}());
export { NavigationItemComponent };
function NavigationItemComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    NavigationItemComponent.prototype.header;
    /** @type {?} */
    NavigationItemComponent.prototype.icon;
    /** @type {?} */
    NavigationItemComponent.prototype.expanded;
    /** @type {?} */
    NavigationItemComponent.prototype.link;
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
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF2aWdhdGlvbi1pdGVtLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJjb21wb25lbnRzL25hdmlnYXRpb24vbmF2aWdhdGlvbi1pdGVtL25hdmlnYXRpb24taXRlbS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBbUMsU0FBUyxFQUFFLGVBQWUsRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFhLFFBQVEsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNwSyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sRUFBVyxNQUFNLGlCQUFpQixDQUFDO0FBQ2pFLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQzs7SUFvQzNDLGlDQUNZLGFBQ0EsV0FHQSxPQUFnQyxFQUNoQztRQU5aLGlCQWNDO1FBYlcsZ0JBQVcsR0FBWCxXQUFXO1FBQ1gsY0FBUyxHQUFULFNBQVM7UUFHVCxZQUFPLEdBQVAsT0FBTyxDQUF5QjtRQUNoQyxZQUFPLEdBQVAsT0FBTzt3QkE1QlUsS0FBSztxQkFTbEIsQ0FBQztrQ0FDYSxJQUFJO1FBb0I5QixJQUFJLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUU3QyxJQUFJLENBQUMsY0FBYyxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFBLEtBQUssSUFBSSxPQUFBLEtBQUssWUFBWSxhQUFhLEVBQTlCLENBQThCLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxVQUFBLEtBQUs7O1lBRXRHLEFBREEseURBQXlEO1lBQ3pELEtBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSSxDQUFDLGFBQWEsQ0FBQyxLQUFJLENBQUMs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QUFDOztZQUV0QixJQUFJLENBQUMsa0JBQWtCLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsVUFBQyxJQUFJLElBQUssT0FBQSxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQTFCLENBQTBCLENBQUMsQ0FBQztTQUNoRztRQUFDLElBQUksQ0FBQyxDQUFDOztZQUVKLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUM7U0FDbEM7OztnQkE3R1IsU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSxzQkFBc0I7b0JBQ2hDLGlYQUErQztvQkFDL0MsSUFBSSxFQUFFO3dCQUNGLGdCQUFnQixFQUFFLFFBQVE7d0JBQzFCLGtCQUFrQixFQUFFLFVBQVU7cUJBQ2pDO2lCQUNKOzs7O2dCQVpxRSxVQUFVO2dCQUF5QyxTQUFTO2dCQTJDekcsdUJBQXVCLHVCQUZ2QyxRQUFRLFlBQ1IsUUFBUTtnQkF6Q08sTUFBTTs7O3lCQWF6QixLQUFLO3VCQUNMLEtBQUs7MkJBQ0wsS0FBSzt1QkFDTCxLQUFLOzRCQWNMLGVBQWUsU0FBQyx1QkFBdUIsRUFBRSxFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUU7O2tDQS9CbkU7O1NBYWEsdUJBQXVCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWZ0ZXJDb250ZW50SW5pdCwgQWZ0ZXJWaWV3SW5pdCwgQ29tcG9uZW50LCBDb250ZW50Q2hpbGRyZW4sIEVsZW1lbnRSZWYsIElucHV0LCBPbkRlc3Ryb3ksIE9wdGlvbmFsLCBRdWVyeUxpc3QsIFJlbmRlcmVyMiwgU2tpcFNlbGYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5hdmlnYXRpb25FbmQsIFJvdXRlciwgVXJsVHJlZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBmaWx0ZXIgfSBmcm9tICdyeGpzL29wZXJhdG9ycy9maWx0ZXInO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcy9TdWJzY3JpcHRpb24nO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ1t1eC1uYXZpZ2F0aW9uLWl0ZW1dJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vbmF2aWdhdGlvbi1pdGVtLmNvbXBvbmVudC5odG1sJyxcbiAgICBob3N0OiB7XG4gICAgICAgICdbY2xhc3MuYWN0aXZlXSc6ICdhY3RpdmUnLFxuICAgICAgICAnW2NsYXNzLnNlbGVjdGVkXSc6ICdleHBhbmRlZCcsXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBOYXZpZ2F0aW9uSXRlbUNvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIEFmdGVyQ29udGVudEluaXQsIE9uRGVzdHJveSB7XG4gICAgQElucHV0KCkgaGVhZGVyOiBzdHJpbmc7XG4gICAgQElucHV0KCkgaWNvbjogc3RyaW5nO1xuICAgIEBJbnB1dCgpIGV4cGFuZGVkOiBib29sZWFuID0gZmFsc2U7XG4gICAgQElucHV0KCkgbGluazogc3RyaW5nO1xuXG4gICAgZ2V0IGFjdGl2ZSgpOiBib29sZWFuIHtcbiAgICAgICAgaWYgKHRoaXMubGluaykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3JvdXRlci5pc0FjdGl2ZSh0aGlzLmxpbmssIHRydWUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbGV2ZWw6IG51bWJlciA9IDE7XG4gICAgaW5kZW50V2l0aG91dEFycm93OiBib29sZWFuID0gdHJ1ZTtcblxuICAgIHByaXZhdGUgX25hdmlnYXRpb25FbmQ6IFN1YnNjcmlwdGlvbjtcbiAgICBwcml2YXRlIF9jaGlsZHJlbkNoYW5nZXM6IFN1YnNjcmlwdGlvbjtcblxuICAgIEBDb250ZW50Q2hpbGRyZW4oTmF2aWdhdGlvbkl0ZW1Db21wb25lbnQsIHsgZGVzY2VuZGFudHM6IHRydWUgfSlcbiAgICBwcml2YXRlIF9jaGlsZHJlbjogUXVlcnlMaXN0PE5hdmlnYXRpb25JdGVtQ29tcG9uZW50PjtcblxuICAgIGdldCBjaGlsZHJlbigpOiBOYXZpZ2F0aW9uSXRlbUNvbXBvbmVudFtdIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NoaWxkcmVuLmZpbHRlcihpdGVtID0+IGl0ZW0gIT09IHRoaXMpO1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgICAgICBwcml2YXRlIF9yZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgICAgICBAT3B0aW9uYWwoKVxuICAgICAgICBAU2tpcFNlbGYoKVxuICAgICAgICBwcml2YXRlIF9wYXJlbnQ6IE5hdmlnYXRpb25JdGVtQ29tcG9uZW50LFxuICAgICAgICBwcml2YXRlIF9yb3V0ZXI6IFJvdXRlclxuICAgICkge1xuICAgICAgICB0aGlzLmxldmVsID0gX3BhcmVudCA/IF9wYXJlbnQubGV2ZWwgKyAxIDogMTtcblxuICAgICAgICB0aGlzLl9uYXZpZ2F0aW9uRW5kID0gX3JvdXRlci5ldmVudHMucGlwZShmaWx0ZXIoZXZlbnQgPT4gZXZlbnQgaW5zdGFuY2VvZiBOYXZpZ2F0aW9uRW5kKSkuc3Vic2NyaWJlKGV2ZW50ID0+IHtcbiAgICAgICAgICAgIC8vIEV4cGFuZCB0aGlzIGNvbXBvbmVudCBpZiBpdCBvciBhIGRlc2NlbmRhbnQgaXMgYWN0aXZlLlxuICAgICAgICAgICAgdGhpcy5leHBhbmRlZCA9IHRoaXMuaGFzQWN0aXZlTGluayh0aGlzLmxpbmspO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgICAgIC8vIEFkZCBjbGFzc2VzIHRvIHBhcmVudCBmb3Igc3R5bGluZ1xuICAgICAgICBjb25zdCBwYXJlbnRMaXN0RWxlbWVudCA9IHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5wYXJlbnRFbGVtZW50O1xuICAgICAgICBpZiAocGFyZW50TGlzdEVsZW1lbnQpIHtcbiAgICAgICAgICAgIGxldCBsZXZlbENsYXNzOiBzdHJpbmcgPSB0aGlzLmdldExldmVsQ2xhc3MoKTtcbiAgICAgICAgICAgIGlmIChsZXZlbENsYXNzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9yZW5kZXJlci5hZGRDbGFzcyhwYXJlbnRMaXN0RWxlbWVudCwgJ25hdicpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3JlbmRlcmVyLmFkZENsYXNzKHBhcmVudExpc3RFbGVtZW50LCBsZXZlbENsYXNzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nQWZ0ZXJDb250ZW50SW5pdCgpOiB2b2lkIHtcbiAgICAgICAgLy8gU2V0ICdpbmRlbnRXaXRob3V0QXJyb3cnXG4gICAgICAgIHRoaXMuc2V0SW5kZW50V2l0aG91dEFycm93KCk7XG5cbiAgICAgICAgLy8gVXBkYXRlICdpbmRlbnRXaXRob3V0QXJyb3cnIGluIHJlc3BvbnNlIHRvIGNoYW5nZXMgdG8gY2hpbGRyZW5cbiAgICAgICAgdGhpcy5fY2hpbGRyZW5DaGFuZ2VzID0gdGhpcy5fY2hpbGRyZW4uY2hhbmdlcy5zdWJzY3JpYmUoKCkgPT4gdGhpcy5zZXRJbmRlbnRXaXRob3V0QXJyb3coKSk7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3kgKCkge1xuICAgICAgICB0aGlzLl9uYXZpZ2F0aW9uRW5kLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIHRoaXMuX2NoaWxkcmVuQ2hhbmdlcy51bnN1YnNjcmliZSgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgaGFzQWN0aXZlTGluayhsaW5rOiBzdHJpbmcgfCBVcmxUcmVlKTogYm9vbGVhbiB7XG4gICAgICAgIC8vIElmIHRoaXMgY29tcG9uZW50IGhhcyBhIGxpbmssIGNoZWNrIGlmIGl0IGlzIGFjdGl2ZS5cbiAgICAgICAgaWYgKGxpbmsgJiYgdGhpcy5fcm91dGVyLmlzQWN0aXZlKGxpbmssIHRydWUpKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIElmIHRoaXMgY29tcG9uZW50IGhhcyBjaGlsZHJlbiwgY2hlY2sgaWYgYW55IG9mIHRoZW0sIG9yIHRoZWlyIGRlc2NlbmRhbnRzLCBhcmUgYWN0aXZlLlxuICAgICAgICByZXR1cm4gdGhpcy5jaGlsZHJlbi5zb21lKChpdGVtKSA9PiBpdGVtLmhhc0FjdGl2ZUxpbmsoaXRlbS5saW5rKSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRMZXZlbENsYXNzKCk6IHN0cmluZyB7XG4gICAgICAgIHN3aXRjaCAodGhpcy5sZXZlbCkge1xuICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgIHJldHVybiAnbmF2LXNlY29uZC1sZXZlbCc7XG4gICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgcmV0dXJuICduYXYtdGhpcmQtbGV2ZWwnO1xuICAgICAgICAgICAgY2FzZSA0OlxuICAgICAgICAgICAgICAgIHJldHVybiAnbmF2LWZvdXJ0aC1sZXZlbCc7XG4gICAgICAgICAgICBjYXNlIDU6XG4gICAgICAgICAgICAgICAgcmV0dXJuICduYXYtZmlmdGgtbGV2ZWwnO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuICcnO1xuICAgIH1cblxuICAgIHByaXZhdGUgc2V0SW5kZW50V2l0aG91dEFycm93KCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5jaGlsZHJlbi5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAvLyBJZiB0aGlzIGVsZW1lbnQgaGFzIGNoaWxkcmVuIGl0IHdpbGwgYmUgaW5kZW50ZWQgYW5kIHdpbGwgaGF2ZSBhbiBhcnJvd1xuICAgICAgICAgICAgdGhpcy5pbmRlbnRXaXRob3V0QXJyb3cgPSBmYWxzZTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9wYXJlbnQpIHtcbiAgICAgICAgICAgIC8vIElmIHRoaXMgZWxlbWVudCBoYXMgYSBwYXJlbnQsIGluZGVudCBpdCBpZiBhbnkgb2YgaXRzIHNpYmxpbmdzIGhhdmUgY2hpbGRyZW5cbiAgICAgICAgICAgIHRoaXMuaW5kZW50V2l0aG91dEFycm93ID0gIXRoaXMuX3BhcmVudC5jaGlsZHJlbi5ldmVyeSgoaXRlbSkgPT4gaXRlbS5jaGlsZHJlbi5sZW5ndGggPT09IDApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gVG9wLWxldmVsIGVsZW1lbnRzIHNob3VsZCBiZSBpbmRlbnRlZFxuICAgICAgICAgICAgdGhpcy5pbmRlbnRXaXRob3V0QXJyb3cgPSB0cnVlO1xuICAgICAgICB9XG4gICAgfVxufVxuIl19