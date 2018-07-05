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
    BreadcrumbsComponent.ctorParameters = function () { return []; };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnJlYWRjcnVtYnMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvYnJlYWRjcnVtYnMvYnJlYWRjcnVtYnMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQzs7Ozs7Ozs7O0lBNkI3Qyx5Q0FBVTs7Ozs7SUFBVixVQUFXLEtBQWlCLEVBQUUsS0FBaUI7UUFDM0MsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDaEIsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO1NBQ25DO0tBQ0o7O2dCQS9CSixTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLGdCQUFnQjtvQkFDMUIsUUFBUSxFQUFFLDB0QkFrQlA7aUJBQ047Ozs7OzJCQUlJLEtBQUs7OytCQTNCVjs7U0F5QmEsb0JBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3V4LWJyZWFkY3J1bWJzJyxcbiAgICB0ZW1wbGF0ZTogYDxuYXYgYXJpYS1sYWJlbD1cIkJyZWFkY3J1bWJcIj5cbiAgICA8b2wgY2xhc3M9XCJicmVhZGNydW1iXCI+XG4gICAgICAgIDxsaSAqbmdGb3I9XCJsZXQgY3J1bWIgb2YgY3J1bWJzXCI+XG5cbiAgICAgICAgICAgIDwhLS0gSWYgdGhlcmUgaXMgYSByb3V0ZXIgbGluayB0aGVuIHVzZSBhIHRhZyAtLT5cbiAgICAgICAgICAgIDxhICpuZ0lmPVwiY3J1bWIucm91dGVyTGluayB8fCBjcnVtYi5vbkNsaWNrXCJcbiAgICAgICAgICAgICAgICB0YWJpbmRleD1cIjBcIlxuICAgICAgICAgICAgICAgIFtyb3V0ZXJMaW5rXT1cImNydW1iLnJvdXRlckxpbmtcIlxuICAgICAgICAgICAgICAgIFtmcmFnbWVudF09XCJjcnVtYi5mcmFnbWVudFwiXG4gICAgICAgICAgICAgICAgW3F1ZXJ5UGFyYW1zXT1cImNydW1iLnF1ZXJ5UGFyYW1zXCJcbiAgICAgICAgICAgICAgICAoY2xpY2spPVwiY2xpY2tDcnVtYigkZXZlbnQsIGNydW1iKVwiPlxuICAgICAgICAgICAgICAgIHt7IGNydW1iLnRpdGxlIH19XG4gICAgICAgICAgICA8L2E+XG5cbiAgICAgICAgICAgIDwhLS0gSWYgdGhlcmUgaXMgbm90IHJvdXRlciBsaW5rIHRoZW4gZGlzcGxheSB0ZXh0IGluIGEgc3BhbiAtLT5cbiAgICAgICAgICAgIDxzcGFuICpuZ0lmPVwiIWNydW1iLnJvdXRlckxpbmsgJiYgIWNydW1iLm9uQ2xpY2tcIj57eyBjcnVtYi50aXRsZSB9fTwvc3Bhbj5cbiAgICAgICAgPC9saT5cbiAgICA8L29sPlxuPC9uYXY+YFxufSlcblxuZXhwb3J0IGNsYXNzIEJyZWFkY3J1bWJzQ29tcG9uZW50IHtcblxuICAgIEBJbnB1dCgpIGNydW1iczogQnJlYWRjcnVtYltdO1xuXG4gICAgY2xpY2tDcnVtYihldmVudDogTW91c2VFdmVudCwgY3J1bWI6IEJyZWFkY3J1bWIpIHtcbiAgICAgICAgaWYgKGNydW1iLm9uQ2xpY2spIHtcbiAgICAgICAgICAgIGNydW1iLm9uQ2xpY2suY2FsbChudWxsLCBldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQnJlYWRjcnVtYiB7XG4gICAgdGl0bGU6IHN0cmluZztcbiAgICByb3V0ZXJMaW5rPzogc3RyaW5nO1xuICAgIGZyYWdtZW50Pzogc3RyaW5nO1xuICAgIHF1ZXJ5UGFyYW1zPzogYW55O1xuICAgIG9uQ2xpY2s/OiAoZXZlbnQ6IE1vdXNlRXZlbnQpID0+IHZvaWQ7XG59Il19