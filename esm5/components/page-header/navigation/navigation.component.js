/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { distinctUntilChanged } from 'rxjs/operators';
import { Subscription } from 'rxjs/Subscription';
import { ResizeService } from '../../../directives/resize/index';
import { PageHeaderService } from '../page-header.service';
import { PageHeaderNavigationItemComponent } from './navigation-item/navigation-item.component';
var PageHeaderNavigationComponent = /** @class */ (function () {
    function PageHeaderNavigationComponent(elementRef, resizeService, _pageHeaderService) {
        this._pageHeaderService = _pageHeaderService;
        this.items$ = this._pageHeaderService.items$;
        this.indicatorVisible = false;
        this.indicatorX = 0;
        this.indicatorWidth = 0;
        this._subscription = new Subscription();
        this._subscription.add(resizeService.addResizeListener(elementRef.nativeElement).subscribe(this.updateSelectedIndicator.bind(this)));
        this._subscription.add(_pageHeaderService.selected$.pipe(distinctUntilChanged()).subscribe(this.updateSelectedIndicator.bind(this)));
        this._subscription.add(_pageHeaderService.secondary$.pipe(distinctUntilChanged()).subscribe(this.updateSelectedIndicator.bind(this)));
    }
    /**
     * @return {?}
     */
    PageHeaderNavigationComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        this.updateSelectedIndicator();
    };
    /**
     * @return {?}
     */
    PageHeaderNavigationComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._subscription.unsubscribe();
    };
    /**
     * @return {?}
     */
    PageHeaderNavigationComponent.prototype.updateSelectedIndicator = /**
     * @return {?}
     */
    function () {
        var _this = this;
        setTimeout(function () {
            // find the selected item
            var /** @type {?} */ selected = _this.menuItems.find(function (item) { return item.item.selected; });
            // determine whether or not to show the indicator
            // determine whether or not to show the indicator
            _this.indicatorVisible = !!selected;
            // set the width of the indicator to match the width of the navigation item
            if (selected) {
                var /** @type {?} */ styles = getComputedStyle(selected.elementRef.nativeElement);
                _this.indicatorX = selected.elementRef.nativeElement.offsetLeft;
                _this.indicatorWidth = parseInt(styles.getPropertyValue('width'));
            }
        });
    };
    PageHeaderNavigationComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ux-page-header-horizontal-navigation',
                    template: "<ux-page-header-horizontal-navigation-item\r\n    *ngFor=\"let item of items$ | async\"\r\n    [item]=\"item\">\r\n</ux-page-header-horizontal-navigation-item>\r\n\r\n<div class=\"selected-indicator\"\r\n    [style.opacity]=\"indicatorVisible ? 1 : 0\"\r\n    [style.margin-left.px]=\"indicatorX\"\r\n    [style.width.px]=\"indicatorWidth\">\r\n</div>",
                    host: {
                        'role': 'menubar'
                    }
                }] }
    ];
    /** @nocollapse */
    PageHeaderNavigationComponent.ctorParameters = function () { return [
        { type: ElementRef },
        { type: ResizeService },
        { type: PageHeaderService }
    ]; };
    PageHeaderNavigationComponent.propDecorators = {
        menuItems: [{ type: ViewChildren, args: [PageHeaderNavigationItemComponent,] }]
    };
    return PageHeaderNavigationComponent;
}());
export { PageHeaderNavigationComponent };
function PageHeaderNavigationComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    PageHeaderNavigationComponent.prototype.menuItems;
    /** @type {?} */
    PageHeaderNavigationComponent.prototype.items$;
    /** @type {?} */
    PageHeaderNavigationComponent.prototype.indicatorVisible;
    /** @type {?} */
    PageHeaderNavigationComponent.prototype.indicatorX;
    /** @type {?} */
    PageHeaderNavigationComponent.prototype.indicatorWidth;
    /** @type {?} */
    PageHeaderNavigationComponent.prototype._subscription;
    /** @type {?} */
    PageHeaderNavigationComponent.prototype._pageHeaderService;
}
/**
 * @record
 */
export function PageHeaderNavigationItem() { }
function PageHeaderNavigationItem_tsickle_Closure_declarations() {
    /** @type {?|undefined} */
    PageHeaderNavigationItem.prototype.icon;
    /** @type {?} */
    PageHeaderNavigationItem.prototype.title;
    /** @type {?|undefined} */
    PageHeaderNavigationItem.prototype.selected;
    /** @type {?|undefined} */
    PageHeaderNavigationItem.prototype.routerLink;
    /** @type {?|undefined} */
    PageHeaderNavigationItem.prototype.routerExtras;
    /** @type {?|undefined} */
    PageHeaderNavigationItem.prototype.select;
    /** @type {?|undefined} */
    PageHeaderNavigationItem.prototype.children;
    /** @type {?|undefined} */
    PageHeaderNavigationItem.prototype.parent;
}
/**
 * @record
 */
export function PageHeaderNavigationDropdownItem() { }
function PageHeaderNavigationDropdownItem_tsickle_Closure_declarations() {
    /** @type {?} */
    PageHeaderNavigationDropdownItem.prototype.title;
    /** @type {?|undefined} */
    PageHeaderNavigationDropdownItem.prototype.selected;
    /** @type {?|undefined} */
    PageHeaderNavigationDropdownItem.prototype.routerLink;
    /** @type {?|undefined} */
    PageHeaderNavigationDropdownItem.prototype.routerExtras;
    /** @type {?|undefined} */
    PageHeaderNavigationDropdownItem.prototype.select;
    /** @type {?|undefined} */
    PageHeaderNavigationDropdownItem.prototype.children;
    /** @type {?|undefined} */
    PageHeaderNavigationDropdownItem.prototype.parent;
}
/**
 * @record
 */
export function PageHeaderSecondaryNavigationItem() { }
function PageHeaderSecondaryNavigationItem_tsickle_Closure_declarations() {
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF2aWdhdGlvbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9wYWdlLWhlYWRlci9uYXZpZ2F0aW9uL25hdmlnYXRpb24uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQWlCLFNBQVMsRUFBRSxVQUFVLEVBQWEsU0FBUyxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUd6RyxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN0RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDakQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQ2pFLE9BQU8sRUFBd0IsaUJBQWlCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUNqRixPQUFPLEVBQUUsaUNBQWlDLEVBQUUsTUFBTSw2Q0FBNkMsQ0FBQzs7SUFvQjVGLHVDQUFZLFVBQXNCLEVBQUUsYUFBNEIsRUFBVSxrQkFBcUM7UUFBckMsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFtQjtzQkFQekQsSUFBSSxDQUFDLGtCQUFrQixDQUFDLE1BQU07Z0NBQ3hELEtBQUs7MEJBQ1osQ0FBQzs4QkFDRyxDQUFDOzZCQUVGLElBQUksWUFBWSxFQUFFO1FBR3RDLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxpQkFBaUIsQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3JJLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLGtCQUFrQixDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsdUJBQXVCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNySSxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLHVCQUF1QixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDekk7Ozs7SUFFRCx1REFBZTs7O0lBQWY7UUFDSSxJQUFJLENBQUMsdUJBQXVCLEVBQUUsQ0FBQztLQUNsQzs7OztJQUVELG1EQUFXOzs7SUFBWDtRQUNJLElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxFQUFFLENBQUM7S0FDcEM7Ozs7SUFFRCwrREFBdUI7OztJQUF2QjtRQUFBLGlCQWdCQztRQWZHLFVBQVUsQ0FBQzs7WUFFUCxxQkFBTSxRQUFRLEdBQUcsS0FBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBQSxJQUFJLElBQUksT0FBQSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBbEIsQ0FBa0IsQ0FBQyxDQUFDOztZQUdqRSxBQURBLGlEQUFpRDtZQUNqRCxLQUFJLENBQUMsZ0JBQWdCLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQzs7WUFHbkMsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztnQkFDWCxxQkFBTSxNQUFNLEdBQUcsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsQ0FBQztnQkFFbkUsS0FBSSxDQUFDLFVBQVUsR0FBRyxRQUFRLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUM7Z0JBQy9ELEtBQUksQ0FBQyxjQUFjLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO2FBQ3BFO1NBQ0osQ0FBQyxDQUFDO0tBQ047O2dCQWhESixTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLHNDQUFzQztvQkFDaEQsMldBQTBDO29CQUMxQyxJQUFJLEVBQUU7d0JBQ0YsTUFBTSxFQUFFLFNBQVM7cUJBQ3BCO2lCQUNKOzs7O2dCQWZrQyxVQUFVO2dCQUtwQyxhQUFhO2dCQUNTLGlCQUFpQjs7OzRCQVkzQyxZQUFZLFNBQUMsaUNBQWlDOzt3Q0FsQm5EOztTQWdCYSw2QkFBNkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBZnRlclZpZXdJbml0LCBDb21wb25lbnQsIEVsZW1lbnRSZWYsIE9uRGVzdHJveSwgUXVlcnlMaXN0LCBWaWV3Q2hpbGRyZW4gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5hdmlnYXRpb25FeHRyYXMgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcy9CZWhhdmlvclN1YmplY3QnO1xuaW1wb3J0IHsgZGlzdGluY3RVbnRpbENoYW5nZWQgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzL1N1YnNjcmlwdGlvbic7XG5pbXBvcnQgeyBSZXNpemVTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vZGlyZWN0aXZlcy9yZXNpemUvaW5kZXgnO1xuaW1wb3J0IHsgUGFnZUhlYWRlck5hdmlnYXRpb24sIFBhZ2VIZWFkZXJTZXJ2aWNlIH0gZnJvbSAnLi4vcGFnZS1oZWFkZXIuc2VydmljZSc7XG5pbXBvcnQgeyBQYWdlSGVhZGVyTmF2aWdhdGlvbkl0ZW1Db21wb25lbnQgfSBmcm9tICcuL25hdmlnYXRpb24taXRlbS9uYXZpZ2F0aW9uLWl0ZW0uY29tcG9uZW50JztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd1eC1wYWdlLWhlYWRlci1ob3Jpem9udGFsLW5hdmlnYXRpb24nLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9uYXZpZ2F0aW9uLmNvbXBvbmVudC5odG1sJyxcbiAgICBob3N0OiB7XG4gICAgICAgICdyb2xlJzogJ21lbnViYXInXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBQYWdlSGVhZGVyTmF2aWdhdGlvbkNvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSB7XG5cbiAgICBAVmlld0NoaWxkcmVuKFBhZ2VIZWFkZXJOYXZpZ2F0aW9uSXRlbUNvbXBvbmVudCkgbWVudUl0ZW1zOiBRdWVyeUxpc3Q8UGFnZUhlYWRlck5hdmlnYXRpb25JdGVtQ29tcG9uZW50PjtcblxuICAgIGl0ZW1zJDogQmVoYXZpb3JTdWJqZWN0PFBhZ2VIZWFkZXJOYXZpZ2F0aW9uSXRlbVtdPiA9IHRoaXMuX3BhZ2VIZWFkZXJTZXJ2aWNlLml0ZW1zJDtcbiAgICBpbmRpY2F0b3JWaXNpYmxlOiBib29sZWFuID0gZmFsc2U7XG4gICAgaW5kaWNhdG9yWDogbnVtYmVyID0gMDtcbiAgICBpbmRpY2F0b3JXaWR0aDogbnVtYmVyID0gMDtcblxuICAgIHByaXZhdGUgX3N1YnNjcmlwdGlvbiA9IG5ldyBTdWJzY3JpcHRpb24oKTtcblxuICAgIGNvbnN0cnVjdG9yKGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsIHJlc2l6ZVNlcnZpY2U6IFJlc2l6ZVNlcnZpY2UsIHByaXZhdGUgX3BhZ2VIZWFkZXJTZXJ2aWNlOiBQYWdlSGVhZGVyU2VydmljZSkge1xuICAgICAgICB0aGlzLl9zdWJzY3JpcHRpb24uYWRkKHJlc2l6ZVNlcnZpY2UuYWRkUmVzaXplTGlzdGVuZXIoZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KS5zdWJzY3JpYmUodGhpcy51cGRhdGVTZWxlY3RlZEluZGljYXRvci5iaW5kKHRoaXMpKSk7XG4gICAgICAgIHRoaXMuX3N1YnNjcmlwdGlvbi5hZGQoX3BhZ2VIZWFkZXJTZXJ2aWNlLnNlbGVjdGVkJC5waXBlKGRpc3RpbmN0VW50aWxDaGFuZ2VkKCkpLnN1YnNjcmliZSh0aGlzLnVwZGF0ZVNlbGVjdGVkSW5kaWNhdG9yLmJpbmQodGhpcykpKTtcbiAgICAgICAgdGhpcy5fc3Vic2NyaXB0aW9uLmFkZChfcGFnZUhlYWRlclNlcnZpY2Uuc2Vjb25kYXJ5JC5waXBlKGRpc3RpbmN0VW50aWxDaGFuZ2VkKCkpLnN1YnNjcmliZSh0aGlzLnVwZGF0ZVNlbGVjdGVkSW5kaWNhdG9yLmJpbmQodGhpcykpKTtcbiAgICB9XG5cbiAgICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMudXBkYXRlU2VsZWN0ZWRJbmRpY2F0b3IoKTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuXG4gICAgdXBkYXRlU2VsZWN0ZWRJbmRpY2F0b3IoKTogdm9pZCB7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgLy8gZmluZCB0aGUgc2VsZWN0ZWQgaXRlbVxuICAgICAgICAgICAgY29uc3Qgc2VsZWN0ZWQgPSB0aGlzLm1lbnVJdGVtcy5maW5kKGl0ZW0gPT4gaXRlbS5pdGVtLnNlbGVjdGVkKTtcblxuICAgICAgICAgICAgLy8gZGV0ZXJtaW5lIHdoZXRoZXIgb3Igbm90IHRvIHNob3cgdGhlIGluZGljYXRvclxuICAgICAgICAgICAgdGhpcy5pbmRpY2F0b3JWaXNpYmxlID0gISFzZWxlY3RlZDtcblxuICAgICAgICAgICAgLy8gc2V0IHRoZSB3aWR0aCBvZiB0aGUgaW5kaWNhdG9yIHRvIG1hdGNoIHRoZSB3aWR0aCBvZiB0aGUgbmF2aWdhdGlvbiBpdGVtXG4gICAgICAgICAgICBpZiAoc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBzdHlsZXMgPSBnZXRDb21wdXRlZFN0eWxlKHNlbGVjdGVkLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmluZGljYXRvclggPSBzZWxlY3RlZC5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQub2Zmc2V0TGVmdDtcbiAgICAgICAgICAgICAgICB0aGlzLmluZGljYXRvcldpZHRoID0gcGFyc2VJbnQoc3R5bGVzLmdldFByb3BlcnR5VmFsdWUoJ3dpZHRoJykpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbn1cblxuZXhwb3J0IGludGVyZmFjZSBQYWdlSGVhZGVyTmF2aWdhdGlvbkl0ZW0ge1xuICAgIGljb24/OiBzdHJpbmc7XG4gICAgdGl0bGU6IHN0cmluZztcbiAgICBzZWxlY3RlZD86IGJvb2xlYW47XG4gICAgcm91dGVyTGluaz86IHN0cmluZyB8IGFueVtdO1xuICAgIHJvdXRlckV4dHJhcz86IE5hdmlnYXRpb25FeHRyYXM7XG4gICAgc2VsZWN0PzogKGl0ZW06IFBhZ2VIZWFkZXJOYXZpZ2F0aW9uSXRlbSkgPT4gdm9pZDtcbiAgICBjaGlsZHJlbj86IFBhZ2VIZWFkZXJOYXZpZ2F0aW9uRHJvcGRvd25JdGVtW107XG4gICAgcGFyZW50PzogUGFnZUhlYWRlck5hdmlnYXRpb247XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUGFnZUhlYWRlck5hdmlnYXRpb25Ecm9wZG93bkl0ZW0ge1xuICAgIHRpdGxlOiBzdHJpbmc7XG4gICAgc2VsZWN0ZWQ/OiBib29sZWFuO1xuICAgIHJvdXRlckxpbms/OiBzdHJpbmcgfCBhbnlbXTtcbiAgICByb3V0ZXJFeHRyYXM/OiBOYXZpZ2F0aW9uRXh0cmFzO1xuICAgIHNlbGVjdD86IChpdGVtOiBQYWdlSGVhZGVyTmF2aWdhdGlvbkRyb3Bkb3duSXRlbSkgPT4gdm9pZDtcbiAgICBjaGlsZHJlbj86IFBhZ2VIZWFkZXJOYXZpZ2F0aW9uRHJvcGRvd25JdGVtW107XG4gICAgcGFyZW50PzogUGFnZUhlYWRlck5hdmlnYXRpb247XG59XG5cbi8vIFRoaXMgaXMgYW4gYWxpYXMgZm9yIE1GIHVzZSBhcyBcIkRyb3Bkb3duSXRlbVwiIGRvZXNuJ3QgbWFrZSBzZW5zZSBpbiBjb250ZXh0IHdpdGggaG93IGl0IGlzIHVzZWRcbmV4cG9ydCBpbnRlcmZhY2UgUGFnZUhlYWRlclNlY29uZGFyeU5hdmlnYXRpb25JdGVtIGV4dGVuZHMgUGFnZUhlYWRlck5hdmlnYXRpb25Ecm9wZG93bkl0ZW0geyB9Il19