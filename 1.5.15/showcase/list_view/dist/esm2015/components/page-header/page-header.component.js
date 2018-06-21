/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, ContentChildren, EventEmitter, Input, Output, QueryList, TemplateRef } from '@angular/core';
import { distinctUntilChanged, filter, map } from 'rxjs/operators';
import { ColorService } from '../../services/color/index';
import { PageHeaderCustomMenuDirective } from './custom-menu/custom-menu.directive';
import { PageHeaderService } from './page-header.service';
export class PageHeaderComponent {
    /**
     * @param {?} _colorService
     * @param {?} _pageHeaderService
     */
    constructor(_colorService, _pageHeaderService) {
        this._colorService = _colorService;
        this._pageHeaderService = _pageHeaderService;
        this.alignment = 'center';
        this.condensed = false;
        this.backVisible = true;
        this.secondaryNavigationAlignment = 'center';
        this.secondaryNavigationAutoselect = false;
        this.backClick = new EventEmitter();
        this.selected$ = this._pageHeaderService.selected$;
        this.selectedRoot$ = this._pageHeaderService.selectedRoot$;
        this._crumbs = [];
    }
    /**
     * @param {?} items
     * @return {?}
     */
    set items(items) {
        this._pageHeaderService.setItems(items);
    }
    /**
     * @param {?} enabled
     * @return {?}
     */
    set secondaryNavigation(enabled) {
        this._pageHeaderService.setSecondaryNavigation(enabled);
    }
    /**
     * @return {?}
     */
    get secondaryNavigation() {
        return this._pageHeaderService.secondary$.getValue();
    }
    /**
     * @param {?} crumbs
     * @return {?}
     */
    set crumbs(crumbs) {
        this._crumbs = crumbs;
    }
    /**
     * @return {?}
     */
    get crumbs() {
        return this.condensed ? [...this._crumbs, { title: this.header }] : this._crumbs;
    }
    /**
     * @param {?} color
     * @return {?}
     */
    set familyBackground(color) {
        this._familyBackground = this._colorService.resolve(color);
    }
    /**
     * @return {?}
     */
    get familyBackground() {
        return this._familyBackground;
    }
    /**
     * @param {?} color
     * @return {?}
     */
    set familyForeground(color) {
        this._familyForeground = this._colorService.resolve(color);
    }
    /**
     * @return {?}
     */
    get familyForeground() {
        return this._familyForeground;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this._subscription = this.selectedRoot$.pipe(distinctUntilChanged(), filter(() => this.secondaryNavigation && this.secondaryNavigationAutoselect), filter((item) => item && item.children && item.children.length > 0), map(item => item.children[0])).subscribe(item => this.select(item));
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
    goBack() {
        this.backClick.emit();
    }
    /**
     * @param {?} item
     * @return {?}
     */
    select(item) {
        this._pageHeaderService.select(item);
    }
}
PageHeaderComponent.decorators = [
    { type: Component, args: [{
                selector: 'ux-page-header',
                exportAs: 'ux-page-header',
                template: `<div class="ux-page-header" [class.page-header-condensed]="condensed" role="banner">

    <!-- Display Upper Section when not condensed -->
    <div class="page-header-actions" *ngIf="!condensed">

        <div class="page-header-logo-container" role="presentation" [hidden]="!logo">
            <img [attr.src]="logo" class="page-header-logo">
        </div>

        <div class="page-header-navigation" [ngClass]="alignment" role="navigation" aria-label="Primary Navigation">

            <!-- The Top Navigation Options -->
            <ux-page-header-horizontal-navigation></ux-page-header-horizontal-navigation>
        </div>

        <div class="page-header-icon-menus" role="toolbar">
            <ng-container *ngFor="let menu of customMenus" [ngTemplateOutlet]="menu"></ng-container>

            <ux-page-header-icon-menu *ngFor="let menu of iconMenus" [menu]="menu"></ux-page-header-icon-menu>
        </div>
    </div>

    <!-- Display Lower Section When Not Condensed -->
    <div class="page-header-details" *ngIf="!condensed">

        <div class="page-header-state-container" role="navigation">

            <button *ngIf="backVisible === true" class="page-header-back-button" (click)="goBack()" aria-label="Go Back">
                <span class="hpe-icon hpe-previous text-primary"></span>
            </button>

            <div class="page-header-title-container">

                <ux-breadcrumbs [crumbs]="crumbs"></ux-breadcrumbs>

                <h1 class="page-header-title" [style.backgroundColor]="familyBackground" [style.color]="familyForeground">{{ header }}</h1>
            </div>

        </div>

    </div>

    <!-- Display This Section Optimized for Condensed Mode -->
    <div class="page-header-condensed-content" *ngIf="condensed">

        <div class="page-header-breadcrumbs" role="navigation">
            <ux-breadcrumbs [crumbs]="crumbs"></ux-breadcrumbs>
        </div>

        <div class="page-header-navigation" [ngClass]="alignment" role="navigation" aria-label="Primary Navigation">

            <!-- The Top Navigation Options -->
            <ux-page-header-horizontal-navigation></ux-page-header-horizontal-navigation>
        </div>

        <div class="page-header-icon-menus" role="toolbar">
            <ng-container *ngFor="let menu of customMenus" [ngTemplateOutlet]="menu"></ng-container>
            <ux-page-header-icon-menu *ngFor="let menu of iconMenus" [menu]="menu"></ux-page-header-icon-menu>
        </div>

    </div>

</div>

<div class="page-header-secondary" [ngClass]="secondaryNavigationAlignment" role="navigation" *ngIf="secondaryNavigation && (selectedRoot$ | async)">
    <ul class="nav nav-tabs" role="tablist" aria-label="Secondary Navigation" *ngIf="(selectedRoot$ | async)?.children; let children">
        <li *ngFor="let child of children" [class.active]="child === (selected$ | async)" role="none">
            <a role="tab"
                [attr.aria-selected]="child === (selected$ | async)"
                tabindex="0"
                (click)="select(child)"
                (keydown.enter)="select(child)">{{ child.title }}</a>
        </li>
    </ul>
</div>`,
                providers: [PageHeaderService]
            },] },
];
/** @nocollapse */
PageHeaderComponent.ctorParameters = () => [
    { type: ColorService, },
    { type: PageHeaderService, },
];
PageHeaderComponent.propDecorators = {
    "logo": [{ type: Input },],
    "header": [{ type: Input },],
    "alignment": [{ type: Input },],
    "condensed": [{ type: Input },],
    "iconMenus": [{ type: Input },],
    "backVisible": [{ type: Input },],
    "secondaryNavigationAlignment": [{ type: Input },],
    "secondaryNavigationAutoselect": [{ type: Input },],
    "items": [{ type: Input },],
    "secondaryNavigation": [{ type: Input },],
    "crumbs": [{ type: Input },],
    "familyBackground": [{ type: Input },],
    "familyForeground": [{ type: Input },],
    "backClick": [{ type: Output },],
    "customMenus": [{ type: ContentChildren, args: [PageHeaderCustomMenuDirective, { read: TemplateRef },] },],
};
function PageHeaderComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    PageHeaderComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    PageHeaderComponent.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    PageHeaderComponent.propDecorators;
    /** @type {?} */
    PageHeaderComponent.prototype.logo;
    /** @type {?} */
    PageHeaderComponent.prototype.header;
    /** @type {?} */
    PageHeaderComponent.prototype.alignment;
    /** @type {?} */
    PageHeaderComponent.prototype.condensed;
    /** @type {?} */
    PageHeaderComponent.prototype.iconMenus;
    /** @type {?} */
    PageHeaderComponent.prototype.backVisible;
    /** @type {?} */
    PageHeaderComponent.prototype.secondaryNavigationAlignment;
    /** @type {?} */
    PageHeaderComponent.prototype.secondaryNavigationAutoselect;
    /** @type {?} */
    PageHeaderComponent.prototype.backClick;
    /** @type {?} */
    PageHeaderComponent.prototype.customMenus;
    /** @type {?} */
    PageHeaderComponent.prototype.selected$;
    /** @type {?} */
    PageHeaderComponent.prototype.selectedRoot$;
    /** @type {?} */
    PageHeaderComponent.prototype._crumbs;
    /** @type {?} */
    PageHeaderComponent.prototype._familyBackground;
    /** @type {?} */
    PageHeaderComponent.prototype._familyForeground;
    /** @type {?} */
    PageHeaderComponent.prototype._subscription;
    /** @type {?} */
    PageHeaderComponent.prototype._colorService;
    /** @type {?} */
    PageHeaderComponent.prototype._pageHeaderService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnZS1oZWFkZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvcGFnZS1oZWFkZXIvcGFnZS1oZWFkZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLGVBQWUsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFxQixNQUFNLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUduSSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ25FLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUUxRCxPQUFPLEVBQUUsNkJBQTZCLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUdwRixPQUFPLEVBQXdCLGlCQUFpQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFrRmhGLE1BQU07Ozs7O0lBNkRGLFlBQW9CLGFBQTJCLEVBQVUsa0JBQXFDO1FBQTFFLGtCQUFhLEdBQWIsYUFBYSxDQUFjO1FBQVUsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFtQjt5QkF6RDVDLFFBQVE7eUJBQzVCLEtBQUs7MkJBRUgsSUFBSTs0Q0FDWSxRQUFROzZDQUNOLEtBQUs7eUJBd0NqQyxJQUFJLFlBQVksRUFBRTt5QkFJZSxJQUFJLENBQUMsa0JBQWtCLENBQUMsU0FBUzs2QkFDN0IsSUFBSSxDQUFDLGtCQUFrQixDQUFDLGFBQWE7dUJBRWhFLEVBQUU7S0FLaUU7Ozs7O1FBbER0RixLQUFLLENBQUMsS0FBaUM7UUFDaEQsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQzs7Ozs7O1FBRy9CLG1CQUFtQixDQUFDLE9BQWdCO1FBQzdDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxzQkFBc0IsQ0FBQyxPQUFPLENBQUMsQ0FBQzs7Ozs7SUFHNUQsSUFBSSxtQkFBbUI7UUFDbkIsTUFBTSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFLENBQUM7S0FDeEQ7Ozs7O1FBRVksTUFBTSxDQUFDLE1BQW9CO1FBQ3BDLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDOzs7OztJQUcxQixJQUFJLE1BQU07UUFDTixNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sRUFBRSxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO0tBQ3BGOzs7OztRQUdHLGdCQUFnQixDQUFDLEtBQWE7UUFDOUIsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDOzs7OztJQUcvRCxJQUFJLGdCQUFnQjtRQUNoQixNQUFNLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDO0tBQ2pDOzs7OztRQUdHLGdCQUFnQixDQUFDLEtBQWE7UUFDOUIsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDOzs7OztJQUcvRCxJQUFJLGdCQUFnQjtRQUNoQixNQUFNLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDO0tBQ2pDOzs7O0lBZ0JELFFBQVE7UUFDSixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUN4QyxvQkFBb0IsRUFBRSxFQUN0QixNQUFNLENBQUMsTUFBTSxJQUFJLENBQUMsbUJBQW1CLElBQUksSUFBSSxDQUFDLDZCQUE2QixDQUFDLEVBQzVFLE1BQU0sQ0FBQyxDQUFDLElBQTBCLEtBQUssSUFBSSxJQUFJLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLEVBQ3pGLEdBQUcsQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUNoQyxDQUFDLFNBQVMsQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0tBQzFDOzs7O0lBRUQsV0FBVztRQUNQLElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxFQUFFLENBQUM7S0FDcEM7Ozs7SUFFRCxNQUFNO1FBQ0YsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztLQUN6Qjs7Ozs7SUFFRCxNQUFNLENBQUMsSUFBMEI7UUFDN0IsSUFBSSxDQUFDLGtCQUFrQixDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUN4Qzs7O1lBbEtKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsZ0JBQWdCO2dCQUMxQixRQUFRLEVBQUUsZ0JBQWdCO2dCQUMxQixRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BMEVQO2dCQUNILFNBQVMsRUFBRSxDQUFFLGlCQUFpQixDQUFFO2FBQ25DOzs7O1lBdEZRLFlBQVk7WUFLVSxpQkFBaUI7OztxQkFvRjNDLEtBQUs7dUJBQ0wsS0FBSzswQkFDTCxLQUFLOzBCQUNMLEtBQUs7MEJBQ0wsS0FBSzs0QkFDTCxLQUFLOzZDQUNMLEtBQUs7OENBQ0wsS0FBSztzQkFFTCxLQUFLO29DQUlMLEtBQUs7dUJBUUwsS0FBSztpQ0FRTCxLQUFLO2lDQVNMLEtBQUs7MEJBU0wsTUFBTTs0QkFFTixlQUFlLFNBQUMsNkJBQTZCLEVBQUUsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBDb250ZW50Q2hpbGRyZW4sIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uRGVzdHJveSwgT25Jbml0LCBPdXRwdXQsIFF1ZXJ5TGlzdCwgVGVtcGxhdGVSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMvQmVoYXZpb3JTdWJqZWN0JztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMvU3Vic2NyaXB0aW9uJztcbmltcG9ydCB7IGRpc3RpbmN0VW50aWxDaGFuZ2VkLCBmaWx0ZXIsIG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IENvbG9yU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2NvbG9yL2luZGV4JztcbmltcG9ydCB7IEJyZWFkY3J1bWIgfSBmcm9tICcuLi9icmVhZGNydW1icy9pbmRleCc7XG5pbXBvcnQgeyBQYWdlSGVhZGVyQ3VzdG9tTWVudURpcmVjdGl2ZSB9IGZyb20gJy4vY3VzdG9tLW1lbnUvY3VzdG9tLW1lbnUuZGlyZWN0aXZlJztcbmltcG9ydCB7IFBhZ2VIZWFkZXJJY29uTWVudSB9IGZyb20gJy4vaW50ZXJmYWNlcyc7XG5pbXBvcnQgeyBQYWdlSGVhZGVyTmF2aWdhdGlvbkl0ZW0gfSBmcm9tICcuL25hdmlnYXRpb24vbmF2aWdhdGlvbi5jb21wb25lbnQnO1xuaW1wb3J0IHsgUGFnZUhlYWRlck5hdmlnYXRpb24sIFBhZ2VIZWFkZXJTZXJ2aWNlIH0gZnJvbSAnLi9wYWdlLWhlYWRlci5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd1eC1wYWdlLWhlYWRlcicsXG4gICAgZXhwb3J0QXM6ICd1eC1wYWdlLWhlYWRlcicsXG4gICAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwidXgtcGFnZS1oZWFkZXJcIiBbY2xhc3MucGFnZS1oZWFkZXItY29uZGVuc2VkXT1cImNvbmRlbnNlZFwiIHJvbGU9XCJiYW5uZXJcIj5cblxuICAgIDwhLS0gRGlzcGxheSBVcHBlciBTZWN0aW9uIHdoZW4gbm90IGNvbmRlbnNlZCAtLT5cbiAgICA8ZGl2IGNsYXNzPVwicGFnZS1oZWFkZXItYWN0aW9uc1wiICpuZ0lmPVwiIWNvbmRlbnNlZFwiPlxuXG4gICAgICAgIDxkaXYgY2xhc3M9XCJwYWdlLWhlYWRlci1sb2dvLWNvbnRhaW5lclwiIHJvbGU9XCJwcmVzZW50YXRpb25cIiBbaGlkZGVuXT1cIiFsb2dvXCI+XG4gICAgICAgICAgICA8aW1nIFthdHRyLnNyY109XCJsb2dvXCIgY2xhc3M9XCJwYWdlLWhlYWRlci1sb2dvXCI+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxkaXYgY2xhc3M9XCJwYWdlLWhlYWRlci1uYXZpZ2F0aW9uXCIgW25nQ2xhc3NdPVwiYWxpZ25tZW50XCIgcm9sZT1cIm5hdmlnYXRpb25cIiBhcmlhLWxhYmVsPVwiUHJpbWFyeSBOYXZpZ2F0aW9uXCI+XG5cbiAgICAgICAgICAgIDwhLS0gVGhlIFRvcCBOYXZpZ2F0aW9uIE9wdGlvbnMgLS0+XG4gICAgICAgICAgICA8dXgtcGFnZS1oZWFkZXItaG9yaXpvbnRhbC1uYXZpZ2F0aW9uPjwvdXgtcGFnZS1oZWFkZXItaG9yaXpvbnRhbC1uYXZpZ2F0aW9uPlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8ZGl2IGNsYXNzPVwicGFnZS1oZWFkZXItaWNvbi1tZW51c1wiIHJvbGU9XCJ0b29sYmFyXCI+XG4gICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0Zvcj1cImxldCBtZW51IG9mIGN1c3RvbU1lbnVzXCIgW25nVGVtcGxhdGVPdXRsZXRdPVwibWVudVwiPjwvbmctY29udGFpbmVyPlxuXG4gICAgICAgICAgICA8dXgtcGFnZS1oZWFkZXItaWNvbi1tZW51ICpuZ0Zvcj1cImxldCBtZW51IG9mIGljb25NZW51c1wiIFttZW51XT1cIm1lbnVcIj48L3V4LXBhZ2UtaGVhZGVyLWljb24tbWVudT5cbiAgICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG5cbiAgICA8IS0tIERpc3BsYXkgTG93ZXIgU2VjdGlvbiBXaGVuIE5vdCBDb25kZW5zZWQgLS0+XG4gICAgPGRpdiBjbGFzcz1cInBhZ2UtaGVhZGVyLWRldGFpbHNcIiAqbmdJZj1cIiFjb25kZW5zZWRcIj5cblxuICAgICAgICA8ZGl2IGNsYXNzPVwicGFnZS1oZWFkZXItc3RhdGUtY29udGFpbmVyXCIgcm9sZT1cIm5hdmlnYXRpb25cIj5cblxuICAgICAgICAgICAgPGJ1dHRvbiAqbmdJZj1cImJhY2tWaXNpYmxlID09PSB0cnVlXCIgY2xhc3M9XCJwYWdlLWhlYWRlci1iYWNrLWJ1dHRvblwiIChjbGljayk9XCJnb0JhY2soKVwiIGFyaWEtbGFiZWw9XCJHbyBCYWNrXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJocGUtaWNvbiBocGUtcHJldmlvdXMgdGV4dC1wcmltYXJ5XCI+PC9zcGFuPlxuICAgICAgICAgICAgPC9idXR0b24+XG5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwYWdlLWhlYWRlci10aXRsZS1jb250YWluZXJcIj5cblxuICAgICAgICAgICAgICAgIDx1eC1icmVhZGNydW1icyBbY3J1bWJzXT1cImNydW1ic1wiPjwvdXgtYnJlYWRjcnVtYnM+XG5cbiAgICAgICAgICAgICAgICA8aDEgY2xhc3M9XCJwYWdlLWhlYWRlci10aXRsZVwiIFtzdHlsZS5iYWNrZ3JvdW5kQ29sb3JdPVwiZmFtaWx5QmFja2dyb3VuZFwiIFtzdHlsZS5jb2xvcl09XCJmYW1pbHlGb3JlZ3JvdW5kXCI+e3sgaGVhZGVyIH19PC9oMT5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDwvZGl2PlxuXG4gICAgPC9kaXY+XG5cbiAgICA8IS0tIERpc3BsYXkgVGhpcyBTZWN0aW9uIE9wdGltaXplZCBmb3IgQ29uZGVuc2VkIE1vZGUgLS0+XG4gICAgPGRpdiBjbGFzcz1cInBhZ2UtaGVhZGVyLWNvbmRlbnNlZC1jb250ZW50XCIgKm5nSWY9XCJjb25kZW5zZWRcIj5cblxuICAgICAgICA8ZGl2IGNsYXNzPVwicGFnZS1oZWFkZXItYnJlYWRjcnVtYnNcIiByb2xlPVwibmF2aWdhdGlvblwiPlxuICAgICAgICAgICAgPHV4LWJyZWFkY3J1bWJzIFtjcnVtYnNdPVwiY3J1bWJzXCI+PC91eC1icmVhZGNydW1icz5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPGRpdiBjbGFzcz1cInBhZ2UtaGVhZGVyLW5hdmlnYXRpb25cIiBbbmdDbGFzc109XCJhbGlnbm1lbnRcIiByb2xlPVwibmF2aWdhdGlvblwiIGFyaWEtbGFiZWw9XCJQcmltYXJ5IE5hdmlnYXRpb25cIj5cblxuICAgICAgICAgICAgPCEtLSBUaGUgVG9wIE5hdmlnYXRpb24gT3B0aW9ucyAtLT5cbiAgICAgICAgICAgIDx1eC1wYWdlLWhlYWRlci1ob3Jpem9udGFsLW5hdmlnYXRpb24+PC91eC1wYWdlLWhlYWRlci1ob3Jpem9udGFsLW5hdmlnYXRpb24+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxkaXYgY2xhc3M9XCJwYWdlLWhlYWRlci1pY29uLW1lbnVzXCIgcm9sZT1cInRvb2xiYXJcIj5cbiAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nRm9yPVwibGV0IG1lbnUgb2YgY3VzdG9tTWVudXNcIiBbbmdUZW1wbGF0ZU91dGxldF09XCJtZW51XCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICA8dXgtcGFnZS1oZWFkZXItaWNvbi1tZW51ICpuZ0Zvcj1cImxldCBtZW51IG9mIGljb25NZW51c1wiIFttZW51XT1cIm1lbnVcIj48L3V4LXBhZ2UtaGVhZGVyLWljb24tbWVudT5cbiAgICAgICAgPC9kaXY+XG5cbiAgICA8L2Rpdj5cblxuPC9kaXY+XG5cbjxkaXYgY2xhc3M9XCJwYWdlLWhlYWRlci1zZWNvbmRhcnlcIiBbbmdDbGFzc109XCJzZWNvbmRhcnlOYXZpZ2F0aW9uQWxpZ25tZW50XCIgcm9sZT1cIm5hdmlnYXRpb25cIiAqbmdJZj1cInNlY29uZGFyeU5hdmlnYXRpb24gJiYgKHNlbGVjdGVkUm9vdCQgfCBhc3luYylcIj5cbiAgICA8dWwgY2xhc3M9XCJuYXYgbmF2LXRhYnNcIiByb2xlPVwidGFibGlzdFwiIGFyaWEtbGFiZWw9XCJTZWNvbmRhcnkgTmF2aWdhdGlvblwiICpuZ0lmPVwiKHNlbGVjdGVkUm9vdCQgfCBhc3luYyk/LmNoaWxkcmVuOyBsZXQgY2hpbGRyZW5cIj5cbiAgICAgICAgPGxpICpuZ0Zvcj1cImxldCBjaGlsZCBvZiBjaGlsZHJlblwiIFtjbGFzcy5hY3RpdmVdPVwiY2hpbGQgPT09IChzZWxlY3RlZCQgfCBhc3luYylcIiByb2xlPVwibm9uZVwiPlxuICAgICAgICAgICAgPGEgcm9sZT1cInRhYlwiXG4gICAgICAgICAgICAgICAgW2F0dHIuYXJpYS1zZWxlY3RlZF09XCJjaGlsZCA9PT0gKHNlbGVjdGVkJCB8IGFzeW5jKVwiXG4gICAgICAgICAgICAgICAgdGFiaW5kZXg9XCIwXCJcbiAgICAgICAgICAgICAgICAoY2xpY2spPVwic2VsZWN0KGNoaWxkKVwiXG4gICAgICAgICAgICAgICAgKGtleWRvd24uZW50ZXIpPVwic2VsZWN0KGNoaWxkKVwiPnt7IGNoaWxkLnRpdGxlIH19PC9hPlxuICAgICAgICA8L2xpPlxuICAgIDwvdWw+XG48L2Rpdj5gLFxuICAgIHByb3ZpZGVyczogWyBQYWdlSGVhZGVyU2VydmljZSBdXG59KVxuZXhwb3J0IGNsYXNzIFBhZ2VIZWFkZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG5cbiAgICBASW5wdXQoKSBsb2dvOiBzdHJpbmc7XG4gICAgQElucHV0KCkgaGVhZGVyOiBzdHJpbmc7XG4gICAgQElucHV0KCkgYWxpZ25tZW50OiAnbGVmdCcgfCAncmlnaHQnIHwgJ2NlbnRlcicgPSAnY2VudGVyJztcbiAgICBASW5wdXQoKSBjb25kZW5zZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBASW5wdXQoKSBpY29uTWVudXM6IFBhZ2VIZWFkZXJJY29uTWVudVtdO1xuICAgIEBJbnB1dCgpIGJhY2tWaXNpYmxlOiBib29sZWFuID0gdHJ1ZTtcbiAgICBASW5wdXQoKSBzZWNvbmRhcnlOYXZpZ2F0aW9uQWxpZ25tZW50OiBzdHJpbmcgPSAnY2VudGVyJztcbiAgICBASW5wdXQoKSBzZWNvbmRhcnlOYXZpZ2F0aW9uQXV0b3NlbGVjdDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgQElucHV0KCkgc2V0IGl0ZW1zKGl0ZW1zOiBQYWdlSGVhZGVyTmF2aWdhdGlvbkl0ZW1bXSkge1xuICAgICAgICB0aGlzLl9wYWdlSGVhZGVyU2VydmljZS5zZXRJdGVtcyhpdGVtcyk7XG4gICAgfVxuXG4gICAgQElucHV0KCkgc2V0IHNlY29uZGFyeU5hdmlnYXRpb24oZW5hYmxlZDogYm9vbGVhbikge1xuICAgICAgICB0aGlzLl9wYWdlSGVhZGVyU2VydmljZS5zZXRTZWNvbmRhcnlOYXZpZ2F0aW9uKGVuYWJsZWQpO1xuICAgIH1cblxuICAgIGdldCBzZWNvbmRhcnlOYXZpZ2F0aW9uKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fcGFnZUhlYWRlclNlcnZpY2Uuc2Vjb25kYXJ5JC5nZXRWYWx1ZSgpO1xuICAgIH1cblxuICAgIEBJbnB1dCgpIHNldCBjcnVtYnMoY3J1bWJzOiBCcmVhZGNydW1iW10pIHtcbiAgICAgICAgdGhpcy5fY3J1bWJzID0gY3J1bWJzO1xuICAgIH1cblxuICAgIGdldCBjcnVtYnMoKTogQnJlYWRjcnVtYltdIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29uZGVuc2VkID8gWy4uLnRoaXMuX2NydW1icywgeyB0aXRsZTogdGhpcy5oZWFkZXIgfV0gOiB0aGlzLl9jcnVtYnM7XG4gICAgfVxuXG4gICAgQElucHV0KClcbiAgICBzZXQgZmFtaWx5QmFja2dyb3VuZChjb2xvcjogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuX2ZhbWlseUJhY2tncm91bmQgPSB0aGlzLl9jb2xvclNlcnZpY2UucmVzb2x2ZShjb2xvcik7XG4gICAgfVxuXG4gICAgZ2V0IGZhbWlseUJhY2tncm91bmQoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ZhbWlseUJhY2tncm91bmQ7XG4gICAgfVxuXG4gICAgQElucHV0KClcbiAgICBzZXQgZmFtaWx5Rm9yZWdyb3VuZChjb2xvcjogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuX2ZhbWlseUZvcmVncm91bmQgPSB0aGlzLl9jb2xvclNlcnZpY2UucmVzb2x2ZShjb2xvcik7XG4gICAgfVxuXG4gICAgZ2V0IGZhbWlseUZvcmVncm91bmQoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ZhbWlseUZvcmVncm91bmQ7XG4gICAgfVxuXG4gICAgQE91dHB1dCgpIGJhY2tDbGljayA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBDb250ZW50Q2hpbGRyZW4oUGFnZUhlYWRlckN1c3RvbU1lbnVEaXJlY3RpdmUsIHsgcmVhZDogVGVtcGxhdGVSZWYgfSkgY3VzdG9tTWVudXM6IFF1ZXJ5TGlzdDxUZW1wbGF0ZVJlZjxhbnk+PjtcblxuICAgIHNlbGVjdGVkJDogQmVoYXZpb3JTdWJqZWN0PFBhZ2VIZWFkZXJOYXZpZ2F0aW9uSXRlbT4gPSB0aGlzLl9wYWdlSGVhZGVyU2VydmljZS5zZWxlY3RlZCQ7XG4gICAgc2VsZWN0ZWRSb290JDogQmVoYXZpb3JTdWJqZWN0PFBhZ2VIZWFkZXJOYXZpZ2F0aW9uSXRlbT4gPSB0aGlzLl9wYWdlSGVhZGVyU2VydmljZS5zZWxlY3RlZFJvb3QkO1xuXG4gICAgcHJpdmF0ZSBfY3J1bWJzOiBCcmVhZGNydW1iW10gPSBbXTtcbiAgICBwcml2YXRlIF9mYW1pbHlCYWNrZ3JvdW5kOiBzdHJpbmc7XG4gICAgcHJpdmF0ZSBfZmFtaWx5Rm9yZWdyb3VuZDogc3RyaW5nO1xuICAgIHByaXZhdGUgX3N1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfY29sb3JTZXJ2aWNlOiBDb2xvclNlcnZpY2UsIHByaXZhdGUgX3BhZ2VIZWFkZXJTZXJ2aWNlOiBQYWdlSGVhZGVyU2VydmljZSkgeyB9XG5cbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fc3Vic2NyaXB0aW9uID0gdGhpcy5zZWxlY3RlZFJvb3QkLnBpcGUoXG4gICAgICAgICAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZCgpLFxuICAgICAgICAgICAgZmlsdGVyKCgpID0+IHRoaXMuc2Vjb25kYXJ5TmF2aWdhdGlvbiAmJiB0aGlzLnNlY29uZGFyeU5hdmlnYXRpb25BdXRvc2VsZWN0KSxcbiAgICAgICAgICAgIGZpbHRlcigoaXRlbTogUGFnZUhlYWRlck5hdmlnYXRpb24pID0+IGl0ZW0gJiYgaXRlbS5jaGlsZHJlbiAmJiBpdGVtLmNoaWxkcmVuLmxlbmd0aCA+IDApLFxuICAgICAgICAgICAgbWFwKGl0ZW0gPT4gaXRlbS5jaGlsZHJlblswXSlcbiAgICAgICAgKS5zdWJzY3JpYmUoaXRlbSA9PiB0aGlzLnNlbGVjdChpdGVtKSk7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX3N1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIH1cblxuICAgIGdvQmFjaygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5iYWNrQ2xpY2suZW1pdCgpO1xuICAgIH1cblxuICAgIHNlbGVjdChpdGVtOiBQYWdlSGVhZGVyTmF2aWdhdGlvbik6IHZvaWQge1xuICAgICAgICB0aGlzLl9wYWdlSGVhZGVyU2VydmljZS5zZWxlY3QoaXRlbSk7XG4gICAgfVxufSJdfQ==