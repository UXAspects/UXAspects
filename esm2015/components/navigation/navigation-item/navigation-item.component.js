/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, ContentChildren, ElementRef, Input, Optional, QueryList, Renderer2, SkipSelf } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators/filter';
export class NavigationItemComponent {
    /**
     * @param {?} _elementRef
     * @param {?} _renderer
     * @param {?} _parent
     * @param {?} _router
     */
    constructor(_elementRef, _renderer, _parent, _router) {
        this._elementRef = _elementRef;
        this._renderer = _renderer;
        this._parent = _parent;
        this._router = _router;
        this.expanded = false;
        this.level = 1;
        this.indentWithoutArrow = true;
        this.level = _parent ? _parent.level + 1 : 1;
        this._navigationEnd = _router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(event => {
            // Expand this component if it or a descendant is active.
            this.expanded = this.hasActiveLink(this.link);
        });
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
            let /** @type {?} */ levelClass = this.getLevelClass();
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
        // If this component has a link, check if it is active.
        if (link && this._router.isActive(link, true)) {
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
                template: "<a *ngIf=\"link\" [class.has-arrow]=\"children.length > 0\" [class.no-arrow]=\"indentWithoutArrow\" [routerLink]=\"link\">\n    <span>{{header}}</span>\n</a>\n<a *ngIf=\"!link\" (click)=\"expanded = !expanded\" [class.has-arrow]=\"children.length > 0\" [class.no-arrow]=\"indentWithoutArrow\">\n    <span>{{header}}</span>\n</a>\n<ng-content></ng-content>\n",
                host: {
                    '[class.active]': 'active',
                    '[class.selected]': 'expanded',
                }
            }] }
];
/** @nocollapse */
NavigationItemComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 },
    { type: NavigationItemComponent, decorators: [{ type: Optional }, { type: SkipSelf }] },
    { type: Router }
];
NavigationItemComponent.propDecorators = {
    header: [{ type: Input }],
    icon: [{ type: Input }],
    expanded: [{ type: Input }],
    link: [{ type: Input }],
    _children: [{ type: ContentChildren, args: [NavigationItemComponent, { descendants: true },] }]
};
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF2aWdhdGlvbi1pdGVtLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJjb21wb25lbnRzL25hdmlnYXRpb24vbmF2aWdhdGlvbi1pdGVtL25hdmlnYXRpb24taXRlbS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBbUMsU0FBUyxFQUFFLGVBQWUsRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFhLFFBQVEsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNwSyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sRUFBVyxNQUFNLGlCQUFpQixDQUFDO0FBQ2pFLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQVcvQyxNQUFNOzs7Ozs7O0lBeUJGLFlBQ1ksYUFDQSxXQUdBLE9BQWdDLEVBQ2hDO1FBTEEsZ0JBQVcsR0FBWCxXQUFXO1FBQ1gsY0FBUyxHQUFULFNBQVM7UUFHVCxZQUFPLEdBQVAsT0FBTyxDQUF5QjtRQUNoQyxZQUFPLEdBQVAsT0FBTzt3QkE1QlUsS0FBSztxQkFTbEIsQ0FBQztrQ0FDYSxJQUFJO1FBb0I5QixJQUFJLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUU3QyxJQUFJLENBQUMsY0FBYyxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEtBQUssWUFBWSxhQUFhLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsRUFBRTs7WUFFekcsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNqRCxD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LENBQUMsQ0FBQyxDQUFDO1NBQ2hHO1FBQUMsSUFBSSxDQUFDLENBQUM7O1lBRUosSUFBSSxDQUFDLGtCQUFrQixHQUFHLElBQUksQ0FBQztTQUNsQzs7OztZQTdHUixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLHNCQUFzQjtnQkFDaEMsaVhBQStDO2dCQUMvQyxJQUFJLEVBQUU7b0JBQ0YsZ0JBQWdCLEVBQUUsUUFBUTtvQkFDMUIsa0JBQWtCLEVBQUUsVUFBVTtpQkFDakM7YUFDSjs7OztZQVpxRSxVQUFVO1lBQXlDLFNBQVM7WUEyQ3pHLHVCQUF1Qix1QkFGdkMsUUFBUSxZQUNSLFFBQVE7WUF6Q08sTUFBTTs7O3FCQWF6QixLQUFLO21CQUNMLEtBQUs7dUJBQ0wsS0FBSzttQkFDTCxLQUFLO3dCQWNMLGVBQWUsU0FBQyx1QkFBdUIsRUFBRSxFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBZnRlckNvbnRlbnRJbml0LCBBZnRlclZpZXdJbml0LCBDb21wb25lbnQsIENvbnRlbnRDaGlsZHJlbiwgRWxlbWVudFJlZiwgSW5wdXQsIE9uRGVzdHJveSwgT3B0aW9uYWwsIFF1ZXJ5TGlzdCwgUmVuZGVyZXIyLCBTa2lwU2VsZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTmF2aWdhdGlvbkVuZCwgUm91dGVyLCBVcmxUcmVlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IGZpbHRlciB9IGZyb20gJ3J4anMvb3BlcmF0b3JzL2ZpbHRlcic7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzL1N1YnNjcmlwdGlvbic7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnW3V4LW5hdmlnYXRpb24taXRlbV0nLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9uYXZpZ2F0aW9uLWl0ZW0uY29tcG9uZW50Lmh0bWwnLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgJ1tjbGFzcy5hY3RpdmVdJzogJ2FjdGl2ZScsXG4gICAgICAgICdbY2xhc3Muc2VsZWN0ZWRdJzogJ2V4cGFuZGVkJyxcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIE5hdmlnYXRpb25JdGVtQ29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgQWZ0ZXJDb250ZW50SW5pdCwgT25EZXN0cm95IHtcbiAgICBASW5wdXQoKSBoZWFkZXI6IHN0cmluZztcbiAgICBASW5wdXQoKSBpY29uOiBzdHJpbmc7XG4gICAgQElucHV0KCkgZXhwYW5kZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBASW5wdXQoKSBsaW5rOiBzdHJpbmc7XG5cbiAgICBnZXQgYWN0aXZlKCk6IGJvb2xlYW4ge1xuICAgICAgICBpZiAodGhpcy5saW5rKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fcm91dGVyLmlzQWN0aXZlKHRoaXMubGluaywgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBsZXZlbDogbnVtYmVyID0gMTtcbiAgICBpbmRlbnRXaXRob3V0QXJyb3c6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgcHJpdmF0ZSBfbmF2aWdhdGlvbkVuZDogU3Vic2NyaXB0aW9uO1xuICAgIHByaXZhdGUgX2NoaWxkcmVuQ2hhbmdlczogU3Vic2NyaXB0aW9uO1xuXG4gICAgQENvbnRlbnRDaGlsZHJlbihOYXZpZ2F0aW9uSXRlbUNvbXBvbmVudCwgeyBkZXNjZW5kYW50czogdHJ1ZSB9KVxuICAgIHByaXZhdGUgX2NoaWxkcmVuOiBRdWVyeUxpc3Q8TmF2aWdhdGlvbkl0ZW1Db21wb25lbnQ+O1xuXG4gICAgZ2V0IGNoaWxkcmVuKCk6IE5hdmlnYXRpb25JdGVtQ29tcG9uZW50W10ge1xuICAgICAgICByZXR1cm4gdGhpcy5fY2hpbGRyZW4uZmlsdGVyKGl0ZW0gPT4gaXRlbSAhPT0gdGhpcyk7XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgICAgIHByaXZhdGUgX3JlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICAgICAgIEBPcHRpb25hbCgpXG4gICAgICAgIEBTa2lwU2VsZigpXG4gICAgICAgIHByaXZhdGUgX3BhcmVudDogTmF2aWdhdGlvbkl0ZW1Db21wb25lbnQsXG4gICAgICAgIHByaXZhdGUgX3JvdXRlcjogUm91dGVyXG4gICAgKSB7XG4gICAgICAgIHRoaXMubGV2ZWwgPSBfcGFyZW50ID8gX3BhcmVudC5sZXZlbCArIDEgOiAxO1xuXG4gICAgICAgIHRoaXMuX25hdmlnYXRpb25FbmQgPSBfcm91dGVyLmV2ZW50cy5waXBlKGZpbHRlcihldmVudCA9PiBldmVudCBpbnN0YW5jZW9mIE5hdmlnYXRpb25FbmQpKS5zdWJzY3JpYmUoZXZlbnQgPT4ge1xuICAgICAgICAgICAgLy8gRXhwYW5kIHRoaXMgY29tcG9uZW50IGlmIGl0IG9yIGEgZGVzY2VuZGFudCBpcyBhY3RpdmUuXG4gICAgICAgICAgICB0aGlzLmV4cGFuZGVkID0gdGhpcy5oYXNBY3RpdmVMaW5rKHRoaXMubGluayk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICAgICAgLy8gQWRkIGNsYXNzZXMgdG8gcGFyZW50IGZvciBzdHlsaW5nXG4gICAgICAgIGNvbnN0IHBhcmVudExpc3RFbGVtZW50ID0gdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnBhcmVudEVsZW1lbnQ7XG4gICAgICAgIGlmIChwYXJlbnRMaXN0RWxlbWVudCkge1xuICAgICAgICAgICAgbGV0IGxldmVsQ2xhc3M6IHN0cmluZyA9IHRoaXMuZ2V0TGV2ZWxDbGFzcygpO1xuICAgICAgICAgICAgaWYgKGxldmVsQ2xhc3MubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3JlbmRlcmVyLmFkZENsYXNzKHBhcmVudExpc3RFbGVtZW50LCAnbmF2Jyk7XG4gICAgICAgICAgICAgICAgdGhpcy5fcmVuZGVyZXIuYWRkQ2xhc3MocGFyZW50TGlzdEVsZW1lbnQsIGxldmVsQ2xhc3MpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdBZnRlckNvbnRlbnRJbml0KCk6IHZvaWQge1xuICAgICAgICAvLyBTZXQgJ2luZGVudFdpdGhvdXRBcnJvdydcbiAgICAgICAgdGhpcy5zZXRJbmRlbnRXaXRob3V0QXJyb3coKTtcblxuICAgICAgICAvLyBVcGRhdGUgJ2luZGVudFdpdGhvdXRBcnJvdycgaW4gcmVzcG9uc2UgdG8gY2hhbmdlcyB0byBjaGlsZHJlblxuICAgICAgICB0aGlzLl9jaGlsZHJlbkNoYW5nZXMgPSB0aGlzLl9jaGlsZHJlbi5jaGFuZ2VzLnN1YnNjcmliZSgoKSA9PiB0aGlzLnNldEluZGVudFdpdGhvdXRBcnJvdygpKTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSAoKSB7XG4gICAgICAgIHRoaXMuX25hdmlnYXRpb25FbmQudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgdGhpcy5fY2hpbGRyZW5DaGFuZ2VzLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBoYXNBY3RpdmVMaW5rKGxpbms6IHN0cmluZyB8IFVybFRyZWUpOiBib29sZWFuIHtcbiAgICAgICAgLy8gSWYgdGhpcyBjb21wb25lbnQgaGFzIGEgbGluaywgY2hlY2sgaWYgaXQgaXMgYWN0aXZlLlxuICAgICAgICBpZiAobGluayAmJiB0aGlzLl9yb3V0ZXIuaXNBY3RpdmUobGluaywgdHJ1ZSkpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gSWYgdGhpcyBjb21wb25lbnQgaGFzIGNoaWxkcmVuLCBjaGVjayBpZiBhbnkgb2YgdGhlbSwgb3IgdGhlaXIgZGVzY2VuZGFudHMsIGFyZSBhY3RpdmUuXG4gICAgICAgIHJldHVybiB0aGlzLmNoaWxkcmVuLnNvbWUoKGl0ZW0pID0+IGl0ZW0uaGFzQWN0aXZlTGluayhpdGVtLmxpbmspKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldExldmVsQ2xhc3MoKTogc3RyaW5nIHtcbiAgICAgICAgc3dpdGNoICh0aGlzLmxldmVsKSB7XG4gICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgcmV0dXJuICduYXYtc2Vjb25kLWxldmVsJztcbiAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICByZXR1cm4gJ25hdi10aGlyZC1sZXZlbCc7XG4gICAgICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuICduYXYtZm91cnRoLWxldmVsJztcbiAgICAgICAgICAgIGNhc2UgNTpcbiAgICAgICAgICAgICAgICByZXR1cm4gJ25hdi1maWZ0aC1sZXZlbCc7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gJyc7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzZXRJbmRlbnRXaXRob3V0QXJyb3coKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmNoaWxkcmVuLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIC8vIElmIHRoaXMgZWxlbWVudCBoYXMgY2hpbGRyZW4gaXQgd2lsbCBiZSBpbmRlbnRlZCBhbmQgd2lsbCBoYXZlIGFuIGFycm93XG4gICAgICAgICAgICB0aGlzLmluZGVudFdpdGhvdXRBcnJvdyA9IGZhbHNlO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX3BhcmVudCkge1xuICAgICAgICAgICAgLy8gSWYgdGhpcyBlbGVtZW50IGhhcyBhIHBhcmVudCwgaW5kZW50IGl0IGlmIGFueSBvZiBpdHMgc2libGluZ3MgaGF2ZSBjaGlsZHJlblxuICAgICAgICAgICAgdGhpcy5pbmRlbnRXaXRob3V0QXJyb3cgPSAhdGhpcy5fcGFyZW50LmNoaWxkcmVuLmV2ZXJ5KChpdGVtKSA9PiBpdGVtLmNoaWxkcmVuLmxlbmd0aCA9PT0gMCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBUb3AtbGV2ZWwgZWxlbWVudHMgc2hvdWxkIGJlIGluZGVudGVkXG4gICAgICAgICAgICB0aGlzLmluZGVudFdpdGhvdXRBcnJvdyA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=