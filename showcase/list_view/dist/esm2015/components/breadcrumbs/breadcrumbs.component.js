/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, Input } from '@angular/core';
export class BreadcrumbsComponent {
    /**
     * @param {?} event
     * @param {?} crumb
     * @return {?}
     */
    clickCrumb(event, crumb) {
        if (crumb.onClick) {
            crumb.onClick.call(null, event);
        }
    }
}
BreadcrumbsComponent.decorators = [
    { type: Component, args: [{
                selector: 'ux-breadcrumbs',
                template: `<nav aria-label="Breadcrumb">
    <ol class="breadcrumb">
        <li *ngFor="let crumb of crumbs">

            <!-- If there is a router link then use a tag -->
            <a *ngIf="crumb.routerLink || crumb.onClick"
                tabindex="0"
                [routerLink]="crumb.routerLink"
                [fragment]="crumb.fragment"
                [queryParams]="crumb.queryParams"
                (click)="clickCrumb($event, crumb)">
                {{ crumb.title }}
            </a>

            <!-- If there is not router link then display text in a span -->
            <span *ngIf="!crumb.routerLink && !crumb.onClick">{{ crumb.title }}</span>
        </li>
    </ol>
</nav>`
            },] },
];
/** @nocollapse */
BreadcrumbsComponent.ctorParameters = () => [];
BreadcrumbsComponent.propDecorators = {
    "crumbs": [{ type: Input },],
};
function BreadcrumbsComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    BreadcrumbsComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    BreadcrumbsComponent.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    BreadcrumbsComponent.propDecorators;
    /** @type {?} */
    BreadcrumbsComponent.prototype.crumbs;
}
/**
 * @record
 */
export function Breadcrumb() { }
function Breadcrumb_tsickle_Closure_declarations() {
    /** @type {?} */
    Breadcrumb.prototype.title;
    /** @type {?|undefined} */
    Breadcrumb.prototype.routerLink;
    /** @type {?|undefined} */
    Breadcrumb.prototype.fragment;
    /** @type {?|undefined} */
    Breadcrumb.prototype.queryParams;
    /** @type {?|undefined} */
    Breadcrumb.prototype.onClick;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnJlYWRjcnVtYnMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvYnJlYWRjcnVtYnMvYnJlYWRjcnVtYnMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQXlCakQsTUFBTTs7Ozs7O0lBSUYsVUFBVSxDQUFDLEtBQWlCLEVBQUUsS0FBaUI7UUFDM0MsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDaEIsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO1NBQ25DO0tBQ0o7OztZQS9CSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLGdCQUFnQjtnQkFDMUIsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FrQlA7YUFDTjs7Ozs7dUJBSUksS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd1eC1icmVhZGNydW1icycsXG4gICAgdGVtcGxhdGU6IGA8bmF2IGFyaWEtbGFiZWw9XCJCcmVhZGNydW1iXCI+XG4gICAgPG9sIGNsYXNzPVwiYnJlYWRjcnVtYlwiPlxuICAgICAgICA8bGkgKm5nRm9yPVwibGV0IGNydW1iIG9mIGNydW1ic1wiPlxuXG4gICAgICAgICAgICA8IS0tIElmIHRoZXJlIGlzIGEgcm91dGVyIGxpbmsgdGhlbiB1c2UgYSB0YWcgLS0+XG4gICAgICAgICAgICA8YSAqbmdJZj1cImNydW1iLnJvdXRlckxpbmsgfHwgY3J1bWIub25DbGlja1wiXG4gICAgICAgICAgICAgICAgdGFiaW5kZXg9XCIwXCJcbiAgICAgICAgICAgICAgICBbcm91dGVyTGlua109XCJjcnVtYi5yb3V0ZXJMaW5rXCJcbiAgICAgICAgICAgICAgICBbZnJhZ21lbnRdPVwiY3J1bWIuZnJhZ21lbnRcIlxuICAgICAgICAgICAgICAgIFtxdWVyeVBhcmFtc109XCJjcnVtYi5xdWVyeVBhcmFtc1wiXG4gICAgICAgICAgICAgICAgKGNsaWNrKT1cImNsaWNrQ3J1bWIoJGV2ZW50LCBjcnVtYilcIj5cbiAgICAgICAgICAgICAgICB7eyBjcnVtYi50aXRsZSB9fVxuICAgICAgICAgICAgPC9hPlxuXG4gICAgICAgICAgICA8IS0tIElmIHRoZXJlIGlzIG5vdCByb3V0ZXIgbGluayB0aGVuIGRpc3BsYXkgdGV4dCBpbiBhIHNwYW4gLS0+XG4gICAgICAgICAgICA8c3BhbiAqbmdJZj1cIiFjcnVtYi5yb3V0ZXJMaW5rICYmICFjcnVtYi5vbkNsaWNrXCI+e3sgY3J1bWIudGl0bGUgfX08L3NwYW4+XG4gICAgICAgIDwvbGk+XG4gICAgPC9vbD5cbjwvbmF2PmBcbn0pXG5cbmV4cG9ydCBjbGFzcyBCcmVhZGNydW1ic0NvbXBvbmVudCB7XG5cbiAgICBASW5wdXQoKSBjcnVtYnM6IEJyZWFkY3J1bWJbXTtcblxuICAgIGNsaWNrQ3J1bWIoZXZlbnQ6IE1vdXNlRXZlbnQsIGNydW1iOiBCcmVhZGNydW1iKSB7XG4gICAgICAgIGlmIChjcnVtYi5vbkNsaWNrKSB7XG4gICAgICAgICAgICBjcnVtYi5vbkNsaWNrLmNhbGwobnVsbCwgZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIEJyZWFkY3J1bWIge1xuICAgIHRpdGxlOiBzdHJpbmc7XG4gICAgcm91dGVyTGluaz86IHN0cmluZztcbiAgICBmcmFnbWVudD86IHN0cmluZztcbiAgICBxdWVyeVBhcmFtcz86IGFueTtcbiAgICBvbkNsaWNrPzogKGV2ZW50OiBNb3VzZUV2ZW50KSA9PiB2b2lkO1xufSJdfQ==