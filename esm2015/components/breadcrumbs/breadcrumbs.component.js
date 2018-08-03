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
                template: "<nav aria-label=\"Breadcrumb\">\n    <ol class=\"breadcrumb\">\n        <li *ngFor=\"let crumb of crumbs\">\n\n            <!-- If there is a router link then use a tag -->\n            <a *ngIf=\"crumb.routerLink || crumb.onClick\"\n                tabindex=\"0\"\n                [routerLink]=\"crumb.routerLink\"\n                [fragment]=\"crumb.fragment\"\n                [queryParams]=\"crumb.queryParams\"\n                (click)=\"clickCrumb($event, crumb)\">\n                {{ crumb.title }}\n            </a>\n\n            <!-- If there is not router link then display text in a span -->\n            <span *ngIf=\"!crumb.routerLink && !crumb.onClick\">{{ crumb.title }}</span>\n        </li>\n    </ol>\n</nav>"
            }] }
];
BreadcrumbsComponent.propDecorators = {
    crumbs: [{ type: Input }]
};
function BreadcrumbsComponent_tsickle_Closure_declarations() {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnJlYWRjcnVtYnMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvYnJlYWRjcnVtYnMvYnJlYWRjcnVtYnMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQU9qRCxNQUFNOzs7Ozs7SUFJRixVQUFVLENBQUMsS0FBaUIsRUFBRSxLQUFpQjtRQUMzQyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUNoQixLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7U0FDbkM7S0FDSjs7O1lBYkosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxnQkFBZ0I7Z0JBQzFCLG91QkFBeUM7YUFDNUM7OztxQkFJSSxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3V4LWJyZWFkY3J1bWJzJyxcbiAgICB0ZW1wbGF0ZVVybDogJ2JyZWFkY3J1bWJzLmNvbXBvbmVudC5odG1sJ1xufSlcblxuZXhwb3J0IGNsYXNzIEJyZWFkY3J1bWJzQ29tcG9uZW50IHtcblxuICAgIEBJbnB1dCgpIGNydW1iczogQnJlYWRjcnVtYltdO1xuXG4gICAgY2xpY2tDcnVtYihldmVudDogTW91c2VFdmVudCwgY3J1bWI6IEJyZWFkY3J1bWIpIHtcbiAgICAgICAgaWYgKGNydW1iLm9uQ2xpY2spIHtcbiAgICAgICAgICAgIGNydW1iLm9uQ2xpY2suY2FsbChudWxsLCBldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQnJlYWRjcnVtYiB7XG4gICAgdGl0bGU6IHN0cmluZztcbiAgICByb3V0ZXJMaW5rPzogc3RyaW5nO1xuICAgIGZyYWdtZW50Pzogc3RyaW5nO1xuICAgIHF1ZXJ5UGFyYW1zPzogYW55O1xuICAgIG9uQ2xpY2s/OiAoZXZlbnQ6IE1vdXNlRXZlbnQpID0+IHZvaWQ7XG59Il19