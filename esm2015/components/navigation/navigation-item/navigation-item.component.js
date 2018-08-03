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
                template: "<a *ngIf=\"link\" [class.has-arrow]=\"children.length > 0\" [class.no-arrow]=\"indentWithoutArrow\" [routerLink]=\"link\">\r\n    <span>{{header}}</span>\r\n</a>\r\n<a *ngIf=\"!link\" (click)=\"expanded = !expanded\" [class.has-arrow]=\"children.length > 0\" [class.no-arrow]=\"indentWithoutArrow\">\r\n    <span>{{header}}</span>\r\n</a>\r\n<ng-content></ng-content>\r\n"
            }] }
];
/** @nocollapse */
NavigationItemComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 },
    { type: NavigationItemComponent, decorators: [{ type: Optional }, { type: SkipSelf }] },
    { type: Router },
    { type: ActivatedRoute }
];
NavigationItemComponent.propDecorators = {
    header: [{ type: Input }],
    icon: [{ type: Input }],
    link: [{ type: Input }],
    expanded: [{ type: Input }, { type: HostBinding, args: ['class.selected',] }],
    active: [{ type: HostBinding, args: ['class.active',] }],
    _children: [{ type: ContentChildren, args: [NavigationItemComponent, { descendants: true },] }]
};
function NavigationItemComponent_tsickle_Closure_declarations() {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF2aWdhdGlvbi1pdGVtLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJjb21wb25lbnRzL25hdmlnYXRpb24vbmF2aWdhdGlvbi1pdGVtL25hdmlnYXRpb24taXRlbS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBbUMsU0FBUyxFQUFFLGVBQWUsRUFBRSxVQUFVLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBYSxRQUFRLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDakwsT0FBTyxFQUFFLGNBQWMsRUFBRSxhQUFhLEVBQUUsTUFBTSxFQUFXLE1BQU0saUJBQWlCLENBQUM7QUFDakYsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBT3hDLE1BQU07Ozs7Ozs7O0lBMkJGLFlBQ1ksYUFDQSxXQUN3QixPQUFnQyxFQUN4RCxTQUNBO1FBSkEsZ0JBQVcsR0FBWCxXQUFXO1FBQ1gsY0FBUyxHQUFULFNBQVM7UUFDZSxZQUFPLEdBQVAsT0FBTyxDQUF5QjtRQUN4RCxZQUFPLEdBQVAsT0FBTztRQUNQLG9CQUFlLEdBQWYsZUFBZTt3QkEzQmlDLEtBQUs7cUJBU2pELENBQUM7a0NBQ2EsSUFBSTtRQW1COUIsSUFBSSxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFN0MsSUFBSSxDQUFDLGNBQWMsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxLQUFLLFlBQVksYUFBYSxDQUFDLENBQUM7YUFDckYsU0FBUyxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFD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QUMsQ0FBQyxDQUFDLENBQUM7O1lBRTNCLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxLQUFLLENBQUM7U0FDbkM7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7O1lBRXRCLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDLENBQUM7U0FDaEc7UUFBQyxJQUFJLENBQUMsQ0FBQzs7WUFFSixJQUFJLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDO1NBQ2xDOzs7O1lBOUdSLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsc0JBQXNCO2dCQUNoQywrWEFBK0M7YUFDbEQ7Ozs7WUFScUUsVUFBVTtZQUFzRCxTQUFTO1lBdUM5Rix1QkFBdUIsdUJBQS9ELFFBQVEsWUFBSSxRQUFRO1lBdENXLE1BQU07WUFBckMsY0FBYzs7O3FCQVVsQixLQUFLO21CQUNMLEtBQUs7bUJBQ0wsS0FBSzt1QkFDTCxLQUFLLFlBQUksV0FBVyxTQUFDLGdCQUFnQjtxQkFFckMsV0FBVyxTQUFDLGNBQWM7d0JBYTFCLGVBQWUsU0FBQyx1QkFBdUIsRUFBRSxFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBZnRlckNvbnRlbnRJbml0LCBBZnRlclZpZXdJbml0LCBDb21wb25lbnQsIENvbnRlbnRDaGlsZHJlbiwgRWxlbWVudFJlZiwgSG9zdEJpbmRpbmcsIElucHV0LCBPbkRlc3Ryb3ksIE9wdGlvbmFsLCBRdWVyeUxpc3QsIFJlbmRlcmVyMiwgU2tpcFNlbGYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlLCBOYXZpZ2F0aW9uRW5kLCBSb3V0ZXIsIFVybFRyZWUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgZmlsdGVyIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcy9TdWJzY3JpcHRpb24nO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ1t1eC1uYXZpZ2F0aW9uLWl0ZW1dJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vbmF2aWdhdGlvbi1pdGVtLmNvbXBvbmVudC5odG1sJyxcbn0pXG5leHBvcnQgY2xhc3MgTmF2aWdhdGlvbkl0ZW1Db21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBBZnRlckNvbnRlbnRJbml0LCBPbkRlc3Ryb3kge1xuXG4gICAgQElucHV0KCkgaGVhZGVyOiBzdHJpbmc7XG4gICAgQElucHV0KCkgaWNvbjogc3RyaW5nO1xuICAgIEBJbnB1dCgpIGxpbms6IHN0cmluZztcbiAgICBASW5wdXQoKSBASG9zdEJpbmRpbmcoJ2NsYXNzLnNlbGVjdGVkJykgZXhwYW5kZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIEBIb3N0QmluZGluZygnY2xhc3MuYWN0aXZlJylcbiAgICBnZXQgYWN0aXZlKCk6IGJvb2xlYW4ge1xuICAgICAgICBpZiAodGhpcy5saW5rKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fcm91dGVyLmlzQWN0aXZlKHRoaXMubGluaywgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBsZXZlbDogbnVtYmVyID0gMTtcbiAgICBpbmRlbnRXaXRob3V0QXJyb3c6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgcHJpdmF0ZSBfbmF2aWdhdGlvbkVuZDogU3Vic2NyaXB0aW9uO1xuICAgIHByaXZhdGUgX2NoaWxkcmVuQ2hhbmdlczogU3Vic2NyaXB0aW9uO1xuXG4gICAgQENvbnRlbnRDaGlsZHJlbihOYXZpZ2F0aW9uSXRlbUNvbXBvbmVudCwgeyBkZXNjZW5kYW50czogdHJ1ZSB9KVxuICAgIHByaXZhdGUgX2NoaWxkcmVuOiBRdWVyeUxpc3Q8TmF2aWdhdGlvbkl0ZW1Db21wb25lbnQ+O1xuXG4gICAgZ2V0IGNoaWxkcmVuKCk6IE5hdmlnYXRpb25JdGVtQ29tcG9uZW50W10ge1xuICAgICAgICByZXR1cm4gdGhpcy5fY2hpbGRyZW4uZmlsdGVyKGl0ZW0gPT4gaXRlbSAhPT0gdGhpcyk7XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgICAgIHByaXZhdGUgX3JlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICAgICAgIEBPcHRpb25hbCgpIEBTa2lwU2VsZigpIHByaXZhdGUgX3BhcmVudDogTmF2aWdhdGlvbkl0ZW1Db21wb25lbnQsXG4gICAgICAgIHByaXZhdGUgX3JvdXRlcjogUm91dGVyLFxuICAgICAgICBwcml2YXRlIF9hY3RpdmF0ZWRSb3V0ZTogQWN0aXZhdGVkUm91dGVcbiAgICApIHtcbiAgICAgICAgdGhpcy5sZXZlbCA9IF9wYXJlbnQgPyBfcGFyZW50LmxldmVsICsgMSA6IDE7XG5cbiAgICAgICAgdGhpcy5fbmF2aWdhdGlvbkVuZCA9IF9yb3V0ZXIuZXZlbnRzLnBpcGUoZmlsdGVyKGV2ZW50ID0+IGV2ZW50IGluc3RhbmNlb2YgTmF2aWdhdGlvbkVuZCkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHRoaXMuZXhwYW5kZWQgPSB0aGlzLmhhc0FjdGl2ZUxpbmsodGhpcy5saW5rKSk7XG4gICAgfVxuXG4gICAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgICAgICAvLyBBZGQgY2xhc3NlcyB0byBwYXJlbnQgZm9yIHN0eWxpbmdcbiAgICAgICAgY29uc3QgcGFyZW50TGlzdEVsZW1lbnQgPSB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQucGFyZW50RWxlbWVudDtcbiAgICAgICAgaWYgKHBhcmVudExpc3RFbGVtZW50KSB7XG4gICAgICAgICAgICBjb25zdCBsZXZlbENsYXNzOiBzdHJpbmcgPSB0aGlzLmdldExldmVsQ2xhc3MoKTtcbiAgICAgICAgICAgIGlmIChsZXZlbENsYXNzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9yZW5kZXJlci5hZGRDbGFzcyhwYXJlbnRMaXN0RWxlbWVudCwgJ25hdicpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3JlbmRlcmVyLmFkZENsYXNzKHBhcmVudExpc3RFbGVtZW50LCBsZXZlbENsYXNzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nQWZ0ZXJDb250ZW50SW5pdCgpOiB2b2lkIHtcbiAgICAgICAgLy8gU2V0ICdpbmRlbnRXaXRob3V0QXJyb3cnXG4gICAgICAgIHRoaXMuc2V0SW5kZW50V2l0aG91dEFycm93KCk7XG5cbiAgICAgICAgLy8gVXBkYXRlICdpbmRlbnRXaXRob3V0QXJyb3cnIGluIHJlc3BvbnNlIHRvIGNoYW5nZXMgdG8gY2hpbGRyZW5cbiAgICAgICAgdGhpcy5fY2hpbGRyZW5DaGFuZ2VzID0gdGhpcy5fY2hpbGRyZW4uY2hhbmdlcy5zdWJzY3JpYmUoKCkgPT4gdGhpcy5zZXRJbmRlbnRXaXRob3V0QXJyb3coKSk7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX25hdmlnYXRpb25FbmQudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgdGhpcy5fY2hpbGRyZW5DaGFuZ2VzLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBoYXNBY3RpdmVMaW5rKGxpbms6IHN0cmluZyB8IFVybFRyZWUpOiBib29sZWFuIHtcblxuICAgICAgICBjb25zdCB0cmVlID0gdGhpcy5fcm91dGVyLmNyZWF0ZVVybFRyZWUoW2xpbmtdLCB7XG4gICAgICAgICAgICByZWxhdGl2ZVRvOiB0aGlzLl9hY3RpdmF0ZWRSb3V0ZSxcbiAgICAgICAgICAgIHF1ZXJ5UGFyYW1zOiB0aGlzLl9hY3RpdmF0ZWRSb3V0ZS5zbmFwc2hvdC5xdWVyeVBhcmFtcyxcbiAgICAgICAgICAgIGZyYWdtZW50OiB0aGlzLl9hY3RpdmF0ZWRSb3V0ZS5zbmFwc2hvdC5mcmFnbWVudFxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAobGluayAmJiB0aGlzLl9yb3V0ZXIuaXNBY3RpdmUodHJlZSwgdHJ1ZSkpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gSWYgdGhpcyBjb21wb25lbnQgaGFzIGNoaWxkcmVuLCBjaGVjayBpZiBhbnkgb2YgdGhlbSwgb3IgdGhlaXIgZGVzY2VuZGFudHMsIGFyZSBhY3RpdmUuXG4gICAgICAgIHJldHVybiB0aGlzLmNoaWxkcmVuLnNvbWUoKGl0ZW0pID0+IGl0ZW0uaGFzQWN0aXZlTGluayhpdGVtLmxpbmspKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldExldmVsQ2xhc3MoKTogc3RyaW5nIHtcbiAgICAgICAgc3dpdGNoICh0aGlzLmxldmVsKSB7XG4gICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgcmV0dXJuICduYXYtc2Vjb25kLWxldmVsJztcbiAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICByZXR1cm4gJ25hdi10aGlyZC1sZXZlbCc7XG4gICAgICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuICduYXYtZm91cnRoLWxldmVsJztcbiAgICAgICAgICAgIGNhc2UgNTpcbiAgICAgICAgICAgICAgICByZXR1cm4gJ25hdi1maWZ0aC1sZXZlbCc7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gJyc7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzZXRJbmRlbnRXaXRob3V0QXJyb3coKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmNoaWxkcmVuLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIC8vIElmIHRoaXMgZWxlbWVudCBoYXMgY2hpbGRyZW4gaXQgd2lsbCBiZSBpbmRlbnRlZCBhbmQgd2lsbCBoYXZlIGFuIGFycm93XG4gICAgICAgICAgICB0aGlzLmluZGVudFdpdGhvdXRBcnJvdyA9IGZhbHNlO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX3BhcmVudCkge1xuICAgICAgICAgICAvLyBJZiB0aGlzIGVsZW1lbnQgaGFzIGEgcGFyZW50LCBpbmRlbnQgaXQgaWYgYW55IG9mIGl0cyBzaWJsaW5ncyBoYXZlIGNoaWxkcmVuXG4gICAgICAgICAgICB0aGlzLmluZGVudFdpdGhvdXRBcnJvdyA9ICF0aGlzLl9wYXJlbnQuY2hpbGRyZW4uZXZlcnkoKGl0ZW0pID0+IGl0ZW0uY2hpbGRyZW4ubGVuZ3RoID09PSAwKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIFRvcC1sZXZlbCBlbGVtZW50cyBzaG91bGQgYmUgaW5kZW50ZWRcbiAgICAgICAgICAgIHRoaXMuaW5kZW50V2l0aG91dEFycm93ID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==