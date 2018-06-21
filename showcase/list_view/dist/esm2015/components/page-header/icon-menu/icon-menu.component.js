/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, Input, ViewChild } from '@angular/core';
import { MenuNavigationToggleDirective } from '../../../directives/menu-navigation/menu-navigation-toggle.directive';
import { PageHeaderService } from '../page-header.service';
export class PageHeaderIconMenuComponent {
    /**
     * @param {?} _service
     */
    constructor(_service) {
        this._service = _service;
        this._subscription = _service.activeIconMenu$.subscribe((next) => {
            // Close all but the most recently opened menu
            if (next !== this.menu) {
                this._isOpen = false;
            }
        });
    }
    /**
     * @return {?}
     */
    get isOpen() {
        return this._isOpen;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set isOpen(value) {
        this._isOpen = value;
        if (value) {
            this._service.activeIconMenu$.next(this.menu);
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._subscription.unsubscribe();
    }
    /**
     * @param {?} item
     * @return {?}
     */
    select(item) {
        if (item.select) {
            item.select.call(item, item);
        }
    }
    /**
     * @param {?} item
     * @param {?} event
     * @return {?}
     */
    keydownHandler(item, event) {
        switch (event.key) {
            case 'Enter':
            case ' ':
                this.select(item);
                this.isOpen = false;
                this.menuNavigationToggle.focus();
                event.preventDefault();
                event.stopPropagation();
                break;
        }
    }
}
PageHeaderIconMenuComponent.decorators = [
    { type: Component, args: [{
                selector: 'ux-page-header-icon-menu',
                template: `<div class="page-header-icon-menu"
    dropdown
    placement="bottom right"
    [(isOpen)]="isOpen">

    <a role="button"
        class="page-header-icon-menu-button"
        [attr.aria-label]="menu.label"
        aria-haspopup="true"
        tabindex="0"
        (click)="select(menu)"
        dropdownToggle
        uxMenuNavigationToggle
        #menuNavigationToggle="uxMenuNavigationToggle"
        [(menuOpen)]="isOpen">

        <i class="hpe-icon" [ngClass]="menu.icon"></i>
        <span class="label label-primary" *ngIf="menu?.badge" aria-hidden="true">{{ menu.badge }}</span>

    </a>

    <ul *dropdownMenu
        class="dropdown-menu"
        role="menu"
        uxMenuNavigation
        [toggleButton]="menuNavigationToggle">

        <li *ngFor="let dropdown of menu?.dropdown"
            role="none"
            [class.dropdown-header]="dropdown.header"
            [class.dropdown-divider]="dropdown.divider">

            <span class="font-bold" *ngIf="dropdown.header">{{ dropdown.title }}</span>

            <a *ngIf="!dropdown.header"
                role="menuitem"
                class="dropdown-item"
                tabindex="-1"
                (click)="select(dropdown)"
                (keydown)="keydownHandler(dropdown, $event)"
                uxMenuNavigationItem>


                <span class="dropdown-item-title">
                    <i class="hpe-icon hpe-fw" [ngClass]="dropdown.icon"></i>
                    {{ dropdown.title }}
                </span>
                <span *ngIf="dropdown.subtitle" class="dropdown-item-subtitle">{{ dropdown.subtitle }}</span>

            </a>
        </li>

    </ul>
</div>`
            },] },
];
/** @nocollapse */
PageHeaderIconMenuComponent.ctorParameters = () => [
    { type: PageHeaderService, },
];
PageHeaderIconMenuComponent.propDecorators = {
    "menu": [{ type: Input },],
    "menuNavigationToggle": [{ type: ViewChild, args: ['menuNavigationToggle',] },],
};
function PageHeaderIconMenuComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    PageHeaderIconMenuComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    PageHeaderIconMenuComponent.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    PageHeaderIconMenuComponent.propDecorators;
    /** @type {?} */
    PageHeaderIconMenuComponent.prototype.menu;
    /** @type {?} */
    PageHeaderIconMenuComponent.prototype.menuNavigationToggle;
    /** @type {?} */
    PageHeaderIconMenuComponent.prototype._isOpen;
    /** @type {?} */
    PageHeaderIconMenuComponent.prototype._subscription;
    /** @type {?} */
    PageHeaderIconMenuComponent.prototype._service;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWNvbi1tZW51LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJjb21wb25lbnRzL3BhZ2UtaGVhZGVyL2ljb24tbWVudS9pY29uLW1lbnUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBYSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFdkUsT0FBTyxFQUFFLDZCQUE2QixFQUFFLE1BQU0sc0VBQXNFLENBQUM7QUFFckgsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUEyRDNELE1BQU07Ozs7SUFvQkYsWUFBb0IsUUFBMkI7UUFBM0IsYUFBUSxHQUFSLFFBQVEsQ0FBbUI7UUFDM0MsSUFBSSxDQUFDLGFBQWEsR0FBRyxRQUFRLENBQUMsZUFBZSxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUk7O1lBRXpELEVBQUUsQ0FBQyxDQUFDLElBQUksS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDckIsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7YUFDeEI7U0FDSixDQUFDLENBQUM7S0FDTjs7OztJQXZCRCxJQUFJLE1BQU07UUFDTixNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztLQUN2Qjs7Ozs7SUFFRCxJQUFJLE1BQU0sQ0FBQyxLQUFjO1FBQ3JCLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1FBQ3JCLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDUixJQUFJLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ2pEO0tBQ0o7Ozs7SUFnQkQsV0FBVztRQUNQLElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxFQUFFLENBQUM7S0FDcEM7Ozs7O0lBRUQsTUFBTSxDQUFDLElBQXlEO1FBQzVELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ2QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1NBQ2hDO0tBQ0o7Ozs7OztJQUVELGNBQWMsQ0FBQyxJQUF5RCxFQUFFLEtBQW9CO1FBRTFGLE1BQU0sQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ2hCLEtBQUssT0FBTyxDQUFDO1lBQ2IsS0FBSyxHQUFHO2dCQUNKLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ2xCLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO2dCQUNwQixJQUFJLENBQUMsb0JBQW9CLENBQUMsS0FBSyxFQUFFLENBQUM7Z0JBQ2xDLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztnQkFDdkIsS0FBSyxDQUFDLGVBQWUsRUFBRSxDQUFDO2dCQUN4QixLQUFLLENBQUM7U0FDYjtLQUNKOzs7WUE1R0osU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSwwQkFBMEI7Z0JBQ3BDLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FxRFA7YUFDTjs7OztZQTFEUSxpQkFBaUI7OztxQkE2RHJCLEtBQUs7cUNBYUwsU0FBUyxTQUFDLHNCQUFzQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uRGVzdHJveSwgVmlld0NoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzL1N1YnNjcmlwdGlvbic7XG5pbXBvcnQgeyBNZW51TmF2aWdhdGlvblRvZ2dsZURpcmVjdGl2ZSB9IGZyb20gJy4uLy4uLy4uL2RpcmVjdGl2ZXMvbWVudS1uYXZpZ2F0aW9uL21lbnUtbmF2aWdhdGlvbi10b2dnbGUuZGlyZWN0aXZlJztcbmltcG9ydCB7IFBhZ2VIZWFkZXJJY29uTWVudSwgUGFnZUhlYWRlckljb25NZW51RHJvcGRvd25JdGVtIH0gZnJvbSAnLi4vaW50ZXJmYWNlcyc7XG5pbXBvcnQgeyBQYWdlSGVhZGVyU2VydmljZSB9IGZyb20gJy4uL3BhZ2UtaGVhZGVyLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3V4LXBhZ2UtaGVhZGVyLWljb24tbWVudScsXG4gICAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwicGFnZS1oZWFkZXItaWNvbi1tZW51XCJcbiAgICBkcm9wZG93blxuICAgIHBsYWNlbWVudD1cImJvdHRvbSByaWdodFwiXG4gICAgWyhpc09wZW4pXT1cImlzT3BlblwiPlxuXG4gICAgPGEgcm9sZT1cImJ1dHRvblwiXG4gICAgICAgIGNsYXNzPVwicGFnZS1oZWFkZXItaWNvbi1tZW51LWJ1dHRvblwiXG4gICAgICAgIFthdHRyLmFyaWEtbGFiZWxdPVwibWVudS5sYWJlbFwiXG4gICAgICAgIGFyaWEtaGFzcG9wdXA9XCJ0cnVlXCJcbiAgICAgICAgdGFiaW5kZXg9XCIwXCJcbiAgICAgICAgKGNsaWNrKT1cInNlbGVjdChtZW51KVwiXG4gICAgICAgIGRyb3Bkb3duVG9nZ2xlXG4gICAgICAgIHV4TWVudU5hdmlnYXRpb25Ub2dnbGVcbiAgICAgICAgI21lbnVOYXZpZ2F0aW9uVG9nZ2xlPVwidXhNZW51TmF2aWdhdGlvblRvZ2dsZVwiXG4gICAgICAgIFsobWVudU9wZW4pXT1cImlzT3BlblwiPlxuXG4gICAgICAgIDxpIGNsYXNzPVwiaHBlLWljb25cIiBbbmdDbGFzc109XCJtZW51Lmljb25cIj48L2k+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwibGFiZWwgbGFiZWwtcHJpbWFyeVwiICpuZ0lmPVwibWVudT8uYmFkZ2VcIiBhcmlhLWhpZGRlbj1cInRydWVcIj57eyBtZW51LmJhZGdlIH19PC9zcGFuPlxuXG4gICAgPC9hPlxuXG4gICAgPHVsICpkcm9wZG93bk1lbnVcbiAgICAgICAgY2xhc3M9XCJkcm9wZG93bi1tZW51XCJcbiAgICAgICAgcm9sZT1cIm1lbnVcIlxuICAgICAgICB1eE1lbnVOYXZpZ2F0aW9uXG4gICAgICAgIFt0b2dnbGVCdXR0b25dPVwibWVudU5hdmlnYXRpb25Ub2dnbGVcIj5cblxuICAgICAgICA8bGkgKm5nRm9yPVwibGV0IGRyb3Bkb3duIG9mIG1lbnU/LmRyb3Bkb3duXCJcbiAgICAgICAgICAgIHJvbGU9XCJub25lXCJcbiAgICAgICAgICAgIFtjbGFzcy5kcm9wZG93bi1oZWFkZXJdPVwiZHJvcGRvd24uaGVhZGVyXCJcbiAgICAgICAgICAgIFtjbGFzcy5kcm9wZG93bi1kaXZpZGVyXT1cImRyb3Bkb3duLmRpdmlkZXJcIj5cblxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJmb250LWJvbGRcIiAqbmdJZj1cImRyb3Bkb3duLmhlYWRlclwiPnt7IGRyb3Bkb3duLnRpdGxlIH19PC9zcGFuPlxuXG4gICAgICAgICAgICA8YSAqbmdJZj1cIiFkcm9wZG93bi5oZWFkZXJcIlxuICAgICAgICAgICAgICAgIHJvbGU9XCJtZW51aXRlbVwiXG4gICAgICAgICAgICAgICAgY2xhc3M9XCJkcm9wZG93bi1pdGVtXCJcbiAgICAgICAgICAgICAgICB0YWJpbmRleD1cIi0xXCJcbiAgICAgICAgICAgICAgICAoY2xpY2spPVwic2VsZWN0KGRyb3Bkb3duKVwiXG4gICAgICAgICAgICAgICAgKGtleWRvd24pPVwia2V5ZG93bkhhbmRsZXIoZHJvcGRvd24sICRldmVudClcIlxuICAgICAgICAgICAgICAgIHV4TWVudU5hdmlnYXRpb25JdGVtPlxuXG5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImRyb3Bkb3duLWl0ZW0tdGl0bGVcIj5cbiAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJocGUtaWNvbiBocGUtZndcIiBbbmdDbGFzc109XCJkcm9wZG93bi5pY29uXCI+PC9pPlxuICAgICAgICAgICAgICAgICAgICB7eyBkcm9wZG93bi50aXRsZSB9fVxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8c3BhbiAqbmdJZj1cImRyb3Bkb3duLnN1YnRpdGxlXCIgY2xhc3M9XCJkcm9wZG93bi1pdGVtLXN1YnRpdGxlXCI+e3sgZHJvcGRvd24uc3VidGl0bGUgfX08L3NwYW4+XG5cbiAgICAgICAgICAgIDwvYT5cbiAgICAgICAgPC9saT5cblxuICAgIDwvdWw+XG48L2Rpdj5gXG59KVxuZXhwb3J0IGNsYXNzIFBhZ2VIZWFkZXJJY29uTWVudUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG5cbiAgICBASW5wdXQoKSBtZW51OiBQYWdlSGVhZGVySWNvbk1lbnU7XG5cbiAgICBnZXQgaXNPcGVuKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5faXNPcGVuO1xuICAgIH1cblxuICAgIHNldCBpc09wZW4odmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5faXNPcGVuID0gdmFsdWU7XG4gICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5fc2VydmljZS5hY3RpdmVJY29uTWVudSQubmV4dCh0aGlzLm1lbnUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgQFZpZXdDaGlsZCgnbWVudU5hdmlnYXRpb25Ub2dnbGUnKSBtZW51TmF2aWdhdGlvblRvZ2dsZTogTWVudU5hdmlnYXRpb25Ub2dnbGVEaXJlY3RpdmU7XG5cbiAgICBwcml2YXRlIF9pc09wZW46IGJvb2xlYW47XG4gICAgcHJpdmF0ZSBfc3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9zZXJ2aWNlOiBQYWdlSGVhZGVyU2VydmljZSkge1xuICAgICAgICB0aGlzLl9zdWJzY3JpcHRpb24gPSBfc2VydmljZS5hY3RpdmVJY29uTWVudSQuc3Vic2NyaWJlKChuZXh0KSA9PiB7XG4gICAgICAgICAgICAvLyBDbG9zZSBhbGwgYnV0IHRoZSBtb3N0IHJlY2VudGx5IG9wZW5lZCBtZW51XG4gICAgICAgICAgICBpZiAobmV4dCAhPT0gdGhpcy5tZW51KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5faXNPcGVuID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9zdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG5cbiAgICBzZWxlY3QoaXRlbTogUGFnZUhlYWRlckljb25NZW51IHwgUGFnZUhlYWRlckljb25NZW51RHJvcGRvd25JdGVtKSB7XG4gICAgICAgIGlmIChpdGVtLnNlbGVjdCkge1xuICAgICAgICAgICAgaXRlbS5zZWxlY3QuY2FsbChpdGVtLCBpdGVtKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGtleWRvd25IYW5kbGVyKGl0ZW06IFBhZ2VIZWFkZXJJY29uTWVudSB8IFBhZ2VIZWFkZXJJY29uTWVudURyb3Bkb3duSXRlbSwgZXZlbnQ6IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcblxuICAgICAgICBzd2l0Y2ggKGV2ZW50LmtleSkge1xuICAgICAgICAgICAgY2FzZSAnRW50ZXInOlxuICAgICAgICAgICAgY2FzZSAnICc6XG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3QoaXRlbSk7XG4gICAgICAgICAgICAgICAgdGhpcy5pc09wZW4gPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLm1lbnVOYXZpZ2F0aW9uVG9nZ2xlLmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cbn0iXX0=