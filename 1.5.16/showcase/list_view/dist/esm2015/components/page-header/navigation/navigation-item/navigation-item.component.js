/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, ElementRef, Input, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { BsDropdownDirective } from 'ngx-bootstrap/dropdown';
import { MenuNavigationToggleDirective } from '../../../../directives/menu-navigation/menu-navigation-toggle.directive';
import { PageHeaderService } from '../../page-header.service';
import { PageHeaderNavigationDropdownItemComponent } from '../navigation-dropdown-item/navigation-dropdown-item.component';
export class PageHeaderNavigationItemComponent {
    /**
     * @param {?} elementRef
     * @param {?} _pageHeaderService
     */
    constructor(elementRef, _pageHeaderService) {
        this.elementRef = elementRef;
        this._pageHeaderService = _pageHeaderService;
        this.secondary$ = this._pageHeaderService.secondary$;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        // Close submenus when selected item changes
        this._subscription = this._pageHeaderService.selected$.subscribe((next) => {
            if (next && this.isOpen) {
                this.isOpen = false;
                // If menu was closed, keep focus on the toggle button
                this.button.focus();
            }
        });
        if (this.menu) {
            this._subscription.add(this.menu.onHidden.subscribe(() => this.dropdowns.forEach(dropdown => dropdown.close())));
        }
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
    select() {
        // if the item has children then do nothing at this stage
        if (this.item.children && this._pageHeaderService.secondary$.getValue() === false) {
            return;
        }
        // otherwise select the current item
        this._pageHeaderService.select(this.item);
    }
}
PageHeaderNavigationItemComponent.decorators = [
    { type: Component, args: [{
                selector: 'ux-page-header-horizontal-navigation-item',
                template: `<div *ngIf="item.children && item.children.length > 0 && !(secondary$ | async)"
    dropdown
    #menu="bs-dropdown"
    [(isOpen)]="isOpen"
    container="body"
    placement="bottom left">

    <button role="menuitem"
        class="horizontal-navigation-button"
        [class.selected]="item.selected"
        [class.open]="isOpen"
        aria-haspopup="true"
        [attr.aria-expanded]="isOpen"
        [attr.aria-selected]="item.selected"
        dropdownToggle
        uxMenuNavigationToggle
        #button="uxMenuNavigationToggle"
        [(menuOpen)]="isOpen">

        <span class="hpe-icon navigation-item-icon" *ngIf="item.icon" [ngClass]="item?.icon"></span>
        <span class="navigation-item-label">{{ item?.title }}</span>
        <span class="hpe-icon hpe-down"></span>

    </button>

    <div *dropdownMenu
        role="menu"
        class="dropdown-menu horizontal-navigation-dropdown-menu"
        uxMenuNavigation
        [toggleButton]="button"
        toggleButtonPosition="top">

        <div *ngFor="let item of item?.children" uxMenuNavigationItem (activated)="dropdownItem.focus()">
            <ux-page-header-horizontal-navigation-dropdown-item
                #dropdownItem="ux-page-header-horizontal-navigation-dropdown-item"
                [item]="item">
            </ux-page-header-horizontal-navigation-dropdown-item>
        </div>

    </div>

</div>

<button *ngIf="!item.children || item.children.length === 0 || (secondary$ | async)"
    role="menuitem"
    class="horizontal-navigation-button"
    [class.selected]="item.selected"
    [attr.aria-selected]="item.selected"
    (click)="select()">

    <span class="hpe-icon navigation-item-icon" *ngIf="item.icon" [ngClass]="item?.icon"></span>
    <span class="navigation-item-label">{{ item?.title }}</span>

</button>`
            },] },
];
/** @nocollapse */
PageHeaderNavigationItemComponent.ctorParameters = () => [
    { type: ElementRef, },
    { type: PageHeaderService, },
];
PageHeaderNavigationItemComponent.propDecorators = {
    "button": [{ type: ViewChild, args: ['button',] },],
    "menu": [{ type: ViewChild, args: ['menu',] },],
    "dropdowns": [{ type: ViewChildren, args: [PageHeaderNavigationDropdownItemComponent,] },],
    "item": [{ type: Input },],
};
function PageHeaderNavigationItemComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    PageHeaderNavigationItemComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    PageHeaderNavigationItemComponent.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    PageHeaderNavigationItemComponent.propDecorators;
    /** @type {?} */
    PageHeaderNavigationItemComponent.prototype.button;
    /** @type {?} */
    PageHeaderNavigationItemComponent.prototype.menu;
    /** @type {?} */
    PageHeaderNavigationItemComponent.prototype.dropdowns;
    /** @type {?} */
    PageHeaderNavigationItemComponent.prototype.item;
    /** @type {?} */
    PageHeaderNavigationItemComponent.prototype.secondary$;
    /** @type {?} */
    PageHeaderNavigationItemComponent.prototype.isOpen;
    /** @type {?} */
    PageHeaderNavigationItemComponent.prototype._subscription;
    /** @type {?} */
    PageHeaderNavigationItemComponent.prototype.elementRef;
    /** @type {?} */
    PageHeaderNavigationItemComponent.prototype._pageHeaderService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF2aWdhdGlvbi1pdGVtLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJjb21wb25lbnRzL3BhZ2UtaGVhZGVyL25hdmlnYXRpb24vbmF2aWdhdGlvbi1pdGVtL25hdmlnYXRpb24taXRlbS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBcUIsU0FBUyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDcEgsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFHN0QsT0FBTyxFQUFFLDZCQUE2QixFQUFFLE1BQU0seUVBQXlFLENBQUM7QUFDeEgsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDOUQsT0FBTyxFQUFFLHlDQUF5QyxFQUFFLE1BQU0sZ0VBQWdFLENBQUM7QUE0RDNILE1BQU07Ozs7O0lBY0YsWUFDVyxZQUNDO1FBREQsZUFBVSxHQUFWLFVBQVU7UUFDVCx1QkFBa0IsR0FBbEIsa0JBQWtCOzBCQVJTLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxVQUFVO0tBU3BFOzs7O0lBRUwsUUFBUTs7UUFHSixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSTtZQUNsRSxFQUFFLENBQUMsQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7Z0JBQ3RCLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDOztnQkFHcEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQzthQUN2QjtTQUNKLENBQUMsQ0FBQztRQUVILEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ1osSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQ2xCLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxNQUFNLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLFFBQVEsSUFBSSxRQUFRLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUMzRixDQUFDO1NBQ0w7S0FDSjs7OztJQUVELFdBQVc7UUFDUCxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsRUFBRSxDQUFDO0tBQ3BDOzs7O0lBRUQsTUFBTTs7UUFHRixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsa0JBQWtCLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRSxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDaEYsTUFBTSxDQUFDO1NBQ1Y7O1FBR0QsSUFBSSxDQUFDLGtCQUFrQixDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDN0M7OztZQTVHSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLDJDQUEyQztnQkFDckQsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztVQXFESjthQUNUOzs7O1lBakVtQixVQUFVO1lBS3JCLGlCQUFpQjs7O3VCQStEckIsU0FBUyxTQUFDLFFBQVE7cUJBQ2xCLFNBQVMsU0FBQyxNQUFNOzBCQUNoQixZQUFZLFNBQUMseUNBQXlDO3FCQUV0RCxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBJbnB1dCwgT25EZXN0cm95LCBPbkluaXQsIFF1ZXJ5TGlzdCwgVmlld0NoaWxkLCBWaWV3Q2hpbGRyZW4gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJzRHJvcGRvd25EaXJlY3RpdmUgfSBmcm9tICduZ3gtYm9vdHN0cmFwL2Ryb3Bkb3duJztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMvQmVoYXZpb3JTdWJqZWN0JztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMvU3Vic2NyaXB0aW9uJztcbmltcG9ydCB7IE1lbnVOYXZpZ2F0aW9uVG9nZ2xlRGlyZWN0aXZlIH0gZnJvbSAnLi4vLi4vLi4vLi4vZGlyZWN0aXZlcy9tZW51LW5hdmlnYXRpb24vbWVudS1uYXZpZ2F0aW9uLXRvZ2dsZS5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgUGFnZUhlYWRlclNlcnZpY2UgfSBmcm9tICcuLi8uLi9wYWdlLWhlYWRlci5zZXJ2aWNlJztcbmltcG9ydCB7IFBhZ2VIZWFkZXJOYXZpZ2F0aW9uRHJvcGRvd25JdGVtQ29tcG9uZW50IH0gZnJvbSAnLi4vbmF2aWdhdGlvbi1kcm9wZG93bi1pdGVtL25hdmlnYXRpb24tZHJvcGRvd24taXRlbS5jb21wb25lbnQnO1xuaW1wb3J0IHsgUGFnZUhlYWRlck5hdmlnYXRpb25JdGVtIH0gZnJvbSAnLi4vbmF2aWdhdGlvbi5jb21wb25lbnQnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3V4LXBhZ2UtaGVhZGVyLWhvcml6b250YWwtbmF2aWdhdGlvbi1pdGVtJyxcbiAgICB0ZW1wbGF0ZTogYDxkaXYgKm5nSWY9XCJpdGVtLmNoaWxkcmVuICYmIGl0ZW0uY2hpbGRyZW4ubGVuZ3RoID4gMCAmJiAhKHNlY29uZGFyeSQgfCBhc3luYylcIlxuICAgIGRyb3Bkb3duXG4gICAgI21lbnU9XCJicy1kcm9wZG93blwiXG4gICAgWyhpc09wZW4pXT1cImlzT3BlblwiXG4gICAgY29udGFpbmVyPVwiYm9keVwiXG4gICAgcGxhY2VtZW50PVwiYm90dG9tIGxlZnRcIj5cblxuICAgIDxidXR0b24gcm9sZT1cIm1lbnVpdGVtXCJcbiAgICAgICAgY2xhc3M9XCJob3Jpem9udGFsLW5hdmlnYXRpb24tYnV0dG9uXCJcbiAgICAgICAgW2NsYXNzLnNlbGVjdGVkXT1cIml0ZW0uc2VsZWN0ZWRcIlxuICAgICAgICBbY2xhc3Mub3Blbl09XCJpc09wZW5cIlxuICAgICAgICBhcmlhLWhhc3BvcHVwPVwidHJ1ZVwiXG4gICAgICAgIFthdHRyLmFyaWEtZXhwYW5kZWRdPVwiaXNPcGVuXCJcbiAgICAgICAgW2F0dHIuYXJpYS1zZWxlY3RlZF09XCJpdGVtLnNlbGVjdGVkXCJcbiAgICAgICAgZHJvcGRvd25Ub2dnbGVcbiAgICAgICAgdXhNZW51TmF2aWdhdGlvblRvZ2dsZVxuICAgICAgICAjYnV0dG9uPVwidXhNZW51TmF2aWdhdGlvblRvZ2dsZVwiXG4gICAgICAgIFsobWVudU9wZW4pXT1cImlzT3BlblwiPlxuXG4gICAgICAgIDxzcGFuIGNsYXNzPVwiaHBlLWljb24gbmF2aWdhdGlvbi1pdGVtLWljb25cIiAqbmdJZj1cIml0ZW0uaWNvblwiIFtuZ0NsYXNzXT1cIml0ZW0/Lmljb25cIj48L3NwYW4+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwibmF2aWdhdGlvbi1pdGVtLWxhYmVsXCI+e3sgaXRlbT8udGl0bGUgfX08L3NwYW4+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwiaHBlLWljb24gaHBlLWRvd25cIj48L3NwYW4+XG5cbiAgICA8L2J1dHRvbj5cblxuICAgIDxkaXYgKmRyb3Bkb3duTWVudVxuICAgICAgICByb2xlPVwibWVudVwiXG4gICAgICAgIGNsYXNzPVwiZHJvcGRvd24tbWVudSBob3Jpem9udGFsLW5hdmlnYXRpb24tZHJvcGRvd24tbWVudVwiXG4gICAgICAgIHV4TWVudU5hdmlnYXRpb25cbiAgICAgICAgW3RvZ2dsZUJ1dHRvbl09XCJidXR0b25cIlxuICAgICAgICB0b2dnbGVCdXR0b25Qb3NpdGlvbj1cInRvcFwiPlxuXG4gICAgICAgIDxkaXYgKm5nRm9yPVwibGV0IGl0ZW0gb2YgaXRlbT8uY2hpbGRyZW5cIiB1eE1lbnVOYXZpZ2F0aW9uSXRlbSAoYWN0aXZhdGVkKT1cImRyb3Bkb3duSXRlbS5mb2N1cygpXCI+XG4gICAgICAgICAgICA8dXgtcGFnZS1oZWFkZXItaG9yaXpvbnRhbC1uYXZpZ2F0aW9uLWRyb3Bkb3duLWl0ZW1cbiAgICAgICAgICAgICAgICAjZHJvcGRvd25JdGVtPVwidXgtcGFnZS1oZWFkZXItaG9yaXpvbnRhbC1uYXZpZ2F0aW9uLWRyb3Bkb3duLWl0ZW1cIlxuICAgICAgICAgICAgICAgIFtpdGVtXT1cIml0ZW1cIj5cbiAgICAgICAgICAgIDwvdXgtcGFnZS1oZWFkZXItaG9yaXpvbnRhbC1uYXZpZ2F0aW9uLWRyb3Bkb3duLWl0ZW0+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgPC9kaXY+XG5cbjwvZGl2PlxuXG48YnV0dG9uICpuZ0lmPVwiIWl0ZW0uY2hpbGRyZW4gfHwgaXRlbS5jaGlsZHJlbi5sZW5ndGggPT09IDAgfHwgKHNlY29uZGFyeSQgfCBhc3luYylcIlxuICAgIHJvbGU9XCJtZW51aXRlbVwiXG4gICAgY2xhc3M9XCJob3Jpem9udGFsLW5hdmlnYXRpb24tYnV0dG9uXCJcbiAgICBbY2xhc3Muc2VsZWN0ZWRdPVwiaXRlbS5zZWxlY3RlZFwiXG4gICAgW2F0dHIuYXJpYS1zZWxlY3RlZF09XCJpdGVtLnNlbGVjdGVkXCJcbiAgICAoY2xpY2spPVwic2VsZWN0KClcIj5cblxuICAgIDxzcGFuIGNsYXNzPVwiaHBlLWljb24gbmF2aWdhdGlvbi1pdGVtLWljb25cIiAqbmdJZj1cIml0ZW0uaWNvblwiIFtuZ0NsYXNzXT1cIml0ZW0/Lmljb25cIj48L3NwYW4+XG4gICAgPHNwYW4gY2xhc3M9XCJuYXZpZ2F0aW9uLWl0ZW0tbGFiZWxcIj57eyBpdGVtPy50aXRsZSB9fTwvc3Bhbj5cblxuPC9idXR0b24+YFxufSlcbmV4cG9ydCBjbGFzcyBQYWdlSGVhZGVyTmF2aWdhdGlvbkl0ZW1Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG5cbiAgICBAVmlld0NoaWxkKCdidXR0b24nKSBidXR0b246IE1lbnVOYXZpZ2F0aW9uVG9nZ2xlRGlyZWN0aXZlO1xuICAgIEBWaWV3Q2hpbGQoJ21lbnUnKSBtZW51OiBCc0Ryb3Bkb3duRGlyZWN0aXZlO1xuICAgIEBWaWV3Q2hpbGRyZW4oUGFnZUhlYWRlck5hdmlnYXRpb25Ecm9wZG93bkl0ZW1Db21wb25lbnQpIGRyb3Bkb3duczogUXVlcnlMaXN0PFBhZ2VIZWFkZXJOYXZpZ2F0aW9uRHJvcGRvd25JdGVtQ29tcG9uZW50PjtcblxuICAgIEBJbnB1dCgpIGl0ZW06IFBhZ2VIZWFkZXJOYXZpZ2F0aW9uSXRlbTtcblxuICAgIHNlY29uZGFyeSQ6IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPiA9IHRoaXMuX3BhZ2VIZWFkZXJTZXJ2aWNlLnNlY29uZGFyeSQ7XG5cbiAgICBpc09wZW46IGJvb2xlYW47XG5cbiAgICBwcml2YXRlIF9zdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwdWJsaWMgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICAgICAgcHJpdmF0ZSBfcGFnZUhlYWRlclNlcnZpY2U6IFBhZ2VIZWFkZXJTZXJ2aWNlXG4gICAgKSB7IH1cblxuICAgIG5nT25Jbml0KCkge1xuXG4gICAgICAgIC8vIENsb3NlIHN1Ym1lbnVzIHdoZW4gc2VsZWN0ZWQgaXRlbSBjaGFuZ2VzXG4gICAgICAgIHRoaXMuX3N1YnNjcmlwdGlvbiA9IHRoaXMuX3BhZ2VIZWFkZXJTZXJ2aWNlLnNlbGVjdGVkJC5zdWJzY3JpYmUoKG5leHQpID0+IHtcbiAgICAgICAgICAgIGlmIChuZXh0ICYmIHRoaXMuaXNPcGVuKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5pc09wZW4gPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgIC8vIElmIG1lbnUgd2FzIGNsb3NlZCwga2VlcCBmb2N1cyBvbiB0aGUgdG9nZ2xlIGJ1dHRvblxuICAgICAgICAgICAgICAgIHRoaXMuYnV0dG9uLmZvY3VzKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmICh0aGlzLm1lbnUpIHtcbiAgICAgICAgICAgIHRoaXMuX3N1YnNjcmlwdGlvbi5hZGQoXG4gICAgICAgICAgICAgICAgdGhpcy5tZW51Lm9uSGlkZGVuLnN1YnNjcmliZSgoKSA9PiB0aGlzLmRyb3Bkb3ducy5mb3JFYWNoKGRyb3Bkb3duID0+IGRyb3Bkb3duLmNsb3NlKCkpKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9zdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG5cbiAgICBzZWxlY3QoKSB7XG5cbiAgICAgICAgLy8gaWYgdGhlIGl0ZW0gaGFzIGNoaWxkcmVuIHRoZW4gZG8gbm90aGluZyBhdCB0aGlzIHN0YWdlXG4gICAgICAgIGlmICh0aGlzLml0ZW0uY2hpbGRyZW4gJiYgdGhpcy5fcGFnZUhlYWRlclNlcnZpY2Uuc2Vjb25kYXJ5JC5nZXRWYWx1ZSgpID09PSBmYWxzZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gb3RoZXJ3aXNlIHNlbGVjdCB0aGUgY3VycmVudCBpdGVtXG4gICAgICAgIHRoaXMuX3BhZ2VIZWFkZXJTZXJ2aWNlLnNlbGVjdCh0aGlzLml0ZW0pO1xuICAgIH1cbn0iXX0=