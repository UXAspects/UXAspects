/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, Input } from '@angular/core';
var BreadcrumbsComponent = (function () {
    function BreadcrumbsComponent() {
    }
    /**
     * @param {?} event
     * @param {?} crumb
     * @return {?}
     */
    BreadcrumbsComponent.prototype.clickCrumb = /**
     * @param {?} event
     * @param {?} crumb
     * @return {?}
     */
    function (event, crumb) {
        if (crumb.onClick) {
            crumb.onClick.call(null, event);
        }
    };
    BreadcrumbsComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ux-breadcrumbs',
                    template: "<nav aria-label=\"Breadcrumb\">\n    <ol class=\"breadcrumb\">\n        <li *ngFor=\"let crumb of crumbs\">\n\n            <!-- If there is a router link then use a tag -->\n            <a *ngIf=\"crumb.routerLink || crumb.onClick\"\n                tabindex=\"0\"\n                [routerLink]=\"crumb.routerLink\"\n                [fragment]=\"crumb.fragment\"\n                [queryParams]=\"crumb.queryParams\"\n                (click)=\"clickCrumb($event, crumb)\">\n                {{ crumb.title }}\n            </a>\n\n            <!-- If there is not router link then display text in a span -->\n            <span *ngIf=\"!crumb.routerLink && !crumb.onClick\">{{ crumb.title }}</span>\n        </li>\n    </ol>\n</nav>"
                },] },
    ];
    /** @nocollapse */
    BreadcrumbsComponent.propDecorators = {
        "crumbs": [{ type: Input },],
    };
    return BreadcrumbsComponent;
}());
export { BreadcrumbsComponent };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnJlYWRjcnVtYnMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvYnJlYWRjcnVtYnMvYnJlYWRjcnVtYnMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQzs7Ozs7Ozs7O0lBNkI3Qyx5Q0FBVTs7Ozs7SUFBVixVQUFXLEtBQWlCLEVBQUUsS0FBaUI7UUFDM0MsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDaEIsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO1NBQ25DO0tBQ0o7O2dCQS9CSixTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLGdCQUFnQjtvQkFDMUIsUUFBUSxFQUFFLDB0QkFrQlA7aUJBQ047Ozs7MkJBSUksS0FBSzs7K0JBM0JWOztTQXlCYSxvQkFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAndXgtYnJlYWRjcnVtYnMnLFxuICAgIHRlbXBsYXRlOiBgPG5hdiBhcmlhLWxhYmVsPVwiQnJlYWRjcnVtYlwiPlxuICAgIDxvbCBjbGFzcz1cImJyZWFkY3J1bWJcIj5cbiAgICAgICAgPGxpICpuZ0Zvcj1cImxldCBjcnVtYiBvZiBjcnVtYnNcIj5cblxuICAgICAgICAgICAgPCEtLSBJZiB0aGVyZSBpcyBhIHJvdXRlciBsaW5rIHRoZW4gdXNlIGEgdGFnIC0tPlxuICAgICAgICAgICAgPGEgKm5nSWY9XCJjcnVtYi5yb3V0ZXJMaW5rIHx8IGNydW1iLm9uQ2xpY2tcIlxuICAgICAgICAgICAgICAgIHRhYmluZGV4PVwiMFwiXG4gICAgICAgICAgICAgICAgW3JvdXRlckxpbmtdPVwiY3J1bWIucm91dGVyTGlua1wiXG4gICAgICAgICAgICAgICAgW2ZyYWdtZW50XT1cImNydW1iLmZyYWdtZW50XCJcbiAgICAgICAgICAgICAgICBbcXVlcnlQYXJhbXNdPVwiY3J1bWIucXVlcnlQYXJhbXNcIlxuICAgICAgICAgICAgICAgIChjbGljayk9XCJjbGlja0NydW1iKCRldmVudCwgY3J1bWIpXCI+XG4gICAgICAgICAgICAgICAge3sgY3J1bWIudGl0bGUgfX1cbiAgICAgICAgICAgIDwvYT5cblxuICAgICAgICAgICAgPCEtLSBJZiB0aGVyZSBpcyBub3Qgcm91dGVyIGxpbmsgdGhlbiBkaXNwbGF5IHRleHQgaW4gYSBzcGFuIC0tPlxuICAgICAgICAgICAgPHNwYW4gKm5nSWY9XCIhY3J1bWIucm91dGVyTGluayAmJiAhY3J1bWIub25DbGlja1wiPnt7IGNydW1iLnRpdGxlIH19PC9zcGFuPlxuICAgICAgICA8L2xpPlxuICAgIDwvb2w+XG48L25hdj5gXG59KVxuXG5leHBvcnQgY2xhc3MgQnJlYWRjcnVtYnNDb21wb25lbnQge1xuXG4gICAgQElucHV0KCkgY3J1bWJzOiBCcmVhZGNydW1iW107XG5cbiAgICBjbGlja0NydW1iKGV2ZW50OiBNb3VzZUV2ZW50LCBjcnVtYjogQnJlYWRjcnVtYikge1xuICAgICAgICBpZiAoY3J1bWIub25DbGljaykge1xuICAgICAgICAgICAgY3J1bWIub25DbGljay5jYWxsKG51bGwsIGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZXhwb3J0IGludGVyZmFjZSBCcmVhZGNydW1iIHtcbiAgICB0aXRsZTogc3RyaW5nO1xuICAgIHJvdXRlckxpbms/OiBzdHJpbmc7XG4gICAgZnJhZ21lbnQ/OiBzdHJpbmc7XG4gICAgcXVlcnlQYXJhbXM/OiBhbnk7XG4gICAgb25DbGljaz86IChldmVudDogTW91c2VFdmVudCkgPT4gdm9pZDtcbn0iXX0=