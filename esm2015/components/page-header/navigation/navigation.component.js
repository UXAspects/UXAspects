/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { distinctUntilChanged } from 'rxjs/operators';
import { ResizeService } from '../../../directives/resize/index';
import { PageHeaderService } from '../page-header.service';
import { PageHeaderNavigationItemComponent } from './navigation-item/navigation-item.component';
export class PageHeaderNavigationComponent {
    /**
     * @param {?} elementRef
     * @param {?} resizeService
     * @param {?} _pageHeaderService
     */
    constructor(elementRef, resizeService, _pageHeaderService) {
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
    ngAfterViewInit() {
        this.updateSelectedIndicator();
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._subscription.unsubscribe();
    }
    /**
     * @return {?}
     */
    updateSelectedIndicator() {
        setTimeout(() => {
            // find the selected item
            const /** @type {?} */ selected = this.menuItems.find(item => item.item.selected);
            // determine whether or not to show the indicator
            this.indicatorVisible = !!selected;
            // set the width of the indicator to match the width of the navigation item
            if (selected) {
                const /** @type {?} */ styles = getComputedStyle(selected.elementRef.nativeElement);
                this.indicatorX = selected.elementRef.nativeElement.offsetLeft;
                this.indicatorWidth = parseInt(styles.getPropertyValue('width'));
            }
        });
    }
}
PageHeaderNavigationComponent.decorators = [
    { type: Component, args: [{
                selector: 'ux-page-header-horizontal-navigation',
                template: `<ux-page-header-horizontal-navigation-item
    *ngFor="let item of items$ | async"
    [item]="item">
</ux-page-header-horizontal-navigation-item>

<div class="selected-indicator"
    [style.opacity]="indicatorVisible ? 1 : 0"
    [style.margin-left.px]="indicatorX"
    [style.width.px]="indicatorWidth">
</div>`,
                host: {
                    'role': 'menubar'
                }
            },] },
];
/** @nocollapse */
PageHeaderNavigationComponent.ctorParameters = () => [
    { type: ElementRef, },
    { type: ResizeService, },
    { type: PageHeaderService, },
];
PageHeaderNavigationComponent.propDecorators = {
    "menuItems": [{ type: ViewChildren, args: [PageHeaderNavigationItemComponent,] },],
};
function PageHeaderNavigationComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    PageHeaderNavigationComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    PageHeaderNavigationComponent.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    PageHeaderNavigationComponent.propDecorators;
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF2aWdhdGlvbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9wYWdlLWhlYWRlci9uYXZpZ2F0aW9uL25hdmlnYXRpb24uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQWlCLFNBQVMsRUFBRSxVQUFVLEVBQWEsU0FBUyxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUV6RyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDakQsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDdEQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQ2pFLE9BQU8sRUFBd0IsaUJBQWlCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUNqRixPQUFPLEVBQUUsaUNBQWlDLEVBQUUsTUFBTSw2Q0FBNkMsQ0FBQztBQWtCaEcsTUFBTTs7Ozs7O0lBV0YsWUFBWSxVQUFzQixFQUFFLGFBQTRCLEVBQVUsa0JBQXFDO1FBQXJDLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBbUI7c0JBUHpELElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNO2dDQUN4RCxLQUFLOzBCQUNaLENBQUM7OEJBQ0csQ0FBQzs2QkFFRixJQUFJLFlBQVksRUFBRTtRQUd0QyxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsaUJBQWlCLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsdUJBQXVCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNySSxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLHVCQUF1QixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDckksSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsa0JBQWtCLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ3pJOzs7O0lBRUQsZUFBZTtRQUNYLElBQUksQ0FBQyx1QkFBdUIsRUFBRSxDQUFDO0tBQ2xDOzs7O0lBRUQsV0FBVztRQUNQLElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxFQUFFLENBQUM7S0FDcEM7Ozs7SUFFRCx1QkFBdUI7UUFDbkIsVUFBVSxDQUFDOztZQUVQLHVCQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQzs7WUFHakUsSUFBSSxDQUFDLGdCQUFnQixHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUM7O1lBR25DLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7Z0JBQ1gsdUJBQU0sTUFBTSxHQUFHLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLENBQUM7Z0JBRW5FLElBQUksQ0FBQyxVQUFVLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDO2dCQUMvRCxJQUFJLENBQUMsY0FBYyxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQzthQUNwRTtTQUNKLENBQUMsQ0FBQztLQUNOOzs7WUF6REosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxzQ0FBc0M7Z0JBQ2hELFFBQVEsRUFBRTs7Ozs7Ozs7O09BU1A7Z0JBQ0gsSUFBSSxFQUFFO29CQUNGLE1BQU0sRUFBRSxTQUFTO2lCQUNwQjthQUNKOzs7O1lBdkJrQyxVQUFVO1lBSXBDLGFBQWE7WUFDUyxpQkFBaUI7OzswQkFxQjNDLFlBQVksU0FBQyxpQ0FBaUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBZnRlclZpZXdJbml0LCBDb21wb25lbnQsIEVsZW1lbnRSZWYsIE9uRGVzdHJveSwgUXVlcnlMaXN0LCBWaWV3Q2hpbGRyZW4gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMvQmVoYXZpb3JTdWJqZWN0JztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMvU3Vic2NyaXB0aW9uJztcbmltcG9ydCB7IGRpc3RpbmN0VW50aWxDaGFuZ2VkIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgUmVzaXplU2VydmljZSB9IGZyb20gJy4uLy4uLy4uL2RpcmVjdGl2ZXMvcmVzaXplL2luZGV4JztcbmltcG9ydCB7IFBhZ2VIZWFkZXJOYXZpZ2F0aW9uLCBQYWdlSGVhZGVyU2VydmljZSB9IGZyb20gJy4uL3BhZ2UtaGVhZGVyLnNlcnZpY2UnO1xuaW1wb3J0IHsgUGFnZUhlYWRlck5hdmlnYXRpb25JdGVtQ29tcG9uZW50IH0gZnJvbSAnLi9uYXZpZ2F0aW9uLWl0ZW0vbmF2aWdhdGlvbi1pdGVtLmNvbXBvbmVudCc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAndXgtcGFnZS1oZWFkZXItaG9yaXpvbnRhbC1uYXZpZ2F0aW9uJyxcbiAgICB0ZW1wbGF0ZTogYDx1eC1wYWdlLWhlYWRlci1ob3Jpem9udGFsLW5hdmlnYXRpb24taXRlbVxyXG4gICAgKm5nRm9yPVwibGV0IGl0ZW0gb2YgaXRlbXMkIHwgYXN5bmNcIlxyXG4gICAgW2l0ZW1dPVwiaXRlbVwiPlxyXG48L3V4LXBhZ2UtaGVhZGVyLWhvcml6b250YWwtbmF2aWdhdGlvbi1pdGVtPlxyXG5cclxuPGRpdiBjbGFzcz1cInNlbGVjdGVkLWluZGljYXRvclwiXHJcbiAgICBbc3R5bGUub3BhY2l0eV09XCJpbmRpY2F0b3JWaXNpYmxlID8gMSA6IDBcIlxyXG4gICAgW3N0eWxlLm1hcmdpbi1sZWZ0LnB4XT1cImluZGljYXRvclhcIlxyXG4gICAgW3N0eWxlLndpZHRoLnB4XT1cImluZGljYXRvcldpZHRoXCI+XHJcbjwvZGl2PmAsXG4gICAgaG9zdDoge1xuICAgICAgICAncm9sZSc6ICdtZW51YmFyJ1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgUGFnZUhlYWRlck5hdmlnYXRpb25Db21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kge1xuXG4gICAgQFZpZXdDaGlsZHJlbihQYWdlSGVhZGVyTmF2aWdhdGlvbkl0ZW1Db21wb25lbnQpIG1lbnVJdGVtczogUXVlcnlMaXN0PFBhZ2VIZWFkZXJOYXZpZ2F0aW9uSXRlbUNvbXBvbmVudD47XG5cbiAgICBpdGVtcyQ6IEJlaGF2aW9yU3ViamVjdDxQYWdlSGVhZGVyTmF2aWdhdGlvbkl0ZW1bXT4gPSB0aGlzLl9wYWdlSGVhZGVyU2VydmljZS5pdGVtcyQ7XG4gICAgaW5kaWNhdG9yVmlzaWJsZTogYm9vbGVhbiA9IGZhbHNlO1xuICAgIGluZGljYXRvclg6IG51bWJlciA9IDA7XG4gICAgaW5kaWNhdG9yV2lkdGg6IG51bWJlciA9IDA7XG5cbiAgICBwcml2YXRlIF9zdWJzY3JpcHRpb24gPSBuZXcgU3Vic2NyaXB0aW9uKCk7XG5cbiAgICBjb25zdHJ1Y3RvcihlbGVtZW50UmVmOiBFbGVtZW50UmVmLCByZXNpemVTZXJ2aWNlOiBSZXNpemVTZXJ2aWNlLCBwcml2YXRlIF9wYWdlSGVhZGVyU2VydmljZTogUGFnZUhlYWRlclNlcnZpY2UpIHtcbiAgICAgICAgdGhpcy5fc3Vic2NyaXB0aW9uLmFkZChyZXNpemVTZXJ2aWNlLmFkZFJlc2l6ZUxpc3RlbmVyKGVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCkuc3Vic2NyaWJlKHRoaXMudXBkYXRlU2VsZWN0ZWRJbmRpY2F0b3IuYmluZCh0aGlzKSkpO1xuICAgICAgICB0aGlzLl9zdWJzY3JpcHRpb24uYWRkKF9wYWdlSGVhZGVyU2VydmljZS5zZWxlY3RlZCQucGlwZShkaXN0aW5jdFVudGlsQ2hhbmdlZCgpKS5zdWJzY3JpYmUodGhpcy51cGRhdGVTZWxlY3RlZEluZGljYXRvci5iaW5kKHRoaXMpKSk7XG4gICAgICAgIHRoaXMuX3N1YnNjcmlwdGlvbi5hZGQoX3BhZ2VIZWFkZXJTZXJ2aWNlLnNlY29uZGFyeSQucGlwZShkaXN0aW5jdFVudGlsQ2hhbmdlZCgpKS5zdWJzY3JpYmUodGhpcy51cGRhdGVTZWxlY3RlZEluZGljYXRvci5iaW5kKHRoaXMpKSk7XG4gICAgfVxuXG4gICAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLnVwZGF0ZVNlbGVjdGVkSW5kaWNhdG9yKCk7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX3N1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIH1cblxuICAgIHVwZGF0ZVNlbGVjdGVkSW5kaWNhdG9yKCk6IHZvaWQge1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIC8vIGZpbmQgdGhlIHNlbGVjdGVkIGl0ZW1cbiAgICAgICAgICAgIGNvbnN0IHNlbGVjdGVkID0gdGhpcy5tZW51SXRlbXMuZmluZChpdGVtID0+IGl0ZW0uaXRlbS5zZWxlY3RlZCk7XG5cbiAgICAgICAgICAgIC8vIGRldGVybWluZSB3aGV0aGVyIG9yIG5vdCB0byBzaG93IHRoZSBpbmRpY2F0b3JcbiAgICAgICAgICAgIHRoaXMuaW5kaWNhdG9yVmlzaWJsZSA9ICEhc2VsZWN0ZWQ7XG5cbiAgICAgICAgICAgIC8vIHNldCB0aGUgd2lkdGggb2YgdGhlIGluZGljYXRvciB0byBtYXRjaCB0aGUgd2lkdGggb2YgdGhlIG5hdmlnYXRpb24gaXRlbVxuICAgICAgICAgICAgaWYgKHNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgc3R5bGVzID0gZ2V0Q29tcHV0ZWRTdHlsZShzZWxlY3RlZC5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5pbmRpY2F0b3JYID0gc2VsZWN0ZWQuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50Lm9mZnNldExlZnQ7XG4gICAgICAgICAgICAgICAgdGhpcy5pbmRpY2F0b3JXaWR0aCA9IHBhcnNlSW50KHN0eWxlcy5nZXRQcm9wZXJ0eVZhbHVlKCd3aWR0aCcpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUGFnZUhlYWRlck5hdmlnYXRpb25JdGVtIHtcbiAgICBpY29uPzogc3RyaW5nO1xuICAgIHRpdGxlOiBzdHJpbmc7XG4gICAgc2VsZWN0ZWQ/OiBib29sZWFuO1xuICAgIHNlbGVjdD86IChpdGVtOiBQYWdlSGVhZGVyTmF2aWdhdGlvbkl0ZW0pID0+IHZvaWQ7XG4gICAgY2hpbGRyZW4/OiBQYWdlSGVhZGVyTmF2aWdhdGlvbkRyb3Bkb3duSXRlbVtdO1xuICAgIHBhcmVudD86IFBhZ2VIZWFkZXJOYXZpZ2F0aW9uO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFBhZ2VIZWFkZXJOYXZpZ2F0aW9uRHJvcGRvd25JdGVtIHtcbiAgICB0aXRsZTogc3RyaW5nO1xuICAgIHNlbGVjdGVkPzogYm9vbGVhbjtcbiAgICBzZWxlY3Q/OiAoaXRlbTogUGFnZUhlYWRlck5hdmlnYXRpb25Ecm9wZG93bkl0ZW0pID0+IHZvaWQ7XG4gICAgY2hpbGRyZW4/OiBQYWdlSGVhZGVyTmF2aWdhdGlvbkRyb3Bkb3duSXRlbVtdO1xuICAgIHBhcmVudD86IFBhZ2VIZWFkZXJOYXZpZ2F0aW9uO1xufVxuXG4vLyBUaGlzIGlzIGFuIGFsaWFzIGZvciBNRiB1c2UgYXMgXCJEcm9wZG93bkl0ZW1cIiBkb2Vzbid0IG1ha2Ugc2Vuc2UgaW4gY29udGV4dCB3aXRoIGhvdyBpdCBpcyB1c2VkXG5leHBvcnQgaW50ZXJmYWNlIFBhZ2VIZWFkZXJTZWNvbmRhcnlOYXZpZ2F0aW9uSXRlbSBleHRlbmRzIFBhZ2VIZWFkZXJOYXZpZ2F0aW9uRHJvcGRvd25JdGVtIHsgfSJdfQ==