/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { FacetBaseComponent } from '../base/facet-base/facet-base.component';
var FacetCheckListComponent = (function (_super) {
    tslib_1.__extends(FacetCheckListComponent, _super);
    function FacetCheckListComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.facets = [];
        _this.scrollbar = true;
        _this.expanded = true;
        return _this;
    }
    FacetCheckListComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ux-facet-check-list',
                    template: "<ux-facet-header [header]=\"header\" [(expanded)]=\"expanded\"></ux-facet-header>\n\n<!-- Create a container which will show when section is expanded -->\n<div class=\"facet-check-list-container\" [class.facet-check-list-scrollbar]=\"scrollbar\" *ngIf=\"expanded\">\n\n    <!-- Iterate through each possible facet -->\n    <div class=\"facet-check-list-item\" *ngFor=\"let facet of facets\" [class.facet-active]=\"isFacetSelected(facet)\" tabindex=\"0\"\n        (click)=\"toggleFacetSelection(facet)\" (keyup.enter)=\"toggleFacetSelection(facet)\" [class.disabled]=\"facet.disabled\">\n\n        <!-- Show check icon to indicate the state -->\n        <span class=\"facet-check-list-item-check\">\n            <span class=\"hpe-icon hpe-active\"></span>\n        </span>\n\n        <!-- Display the title -->\n        <span class=\"facet-check-list-item-title\">{{ facet.title }}</span>\n\n        <!-- Display the count if specified -->\n        <span class=\"facet-check-list-item-count\" *ngIf=\"facet.count !== undefined\">({{ facet.count }})</span>\n    </div>\n</div>"
                },] },
    ];
    /** @nocollapse */
    FacetCheckListComponent.propDecorators = {
        "facets": [{ type: Input },],
        "header": [{ type: Input },],
        "scrollbar": [{ type: Input },],
        "expanded": [{ type: Input },],
    };
    return FacetCheckListComponent;
}(FacetBaseComponent));
export { FacetCheckListComponent };
function FacetCheckListComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    FacetCheckListComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    FacetCheckListComponent.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    FacetCheckListComponent.propDecorators;
    /** @type {?} */
    FacetCheckListComponent.prototype.facets;
    /** @type {?} */
    FacetCheckListComponent.prototype.header;
    /** @type {?} */
    FacetCheckListComponent.prototype.scrollbar;
    /** @type {?} */
    FacetCheckListComponent.prototype.expanded;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmFjZXQtY2hlY2stbGlzdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9mYWNldHMvZmFjZXQtY2hlY2stbGlzdC9mYWNldC1jaGVjay1saXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2pELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHlDQUF5QyxDQUFDOztJQTJCaEMsbURBQWtCOzs7dUJBRWhDLEVBQUU7MEJBRUMsSUFBSTt5QkFDTCxJQUFJOzs7O2dCQTdCcEMsU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSxxQkFBcUI7b0JBQy9CLFFBQVEsRUFBRSxvakNBb0JQO2lCQUNOOzs7OzJCQUdJLEtBQUs7MkJBQ0wsS0FBSzs4QkFDTCxLQUFLOzZCQUNMLEtBQUs7O2tDQWpDVjtFQTRCNkMsa0JBQWtCO1NBQWxELHVCQUF1QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZhY2V0QmFzZUNvbXBvbmVudCB9IGZyb20gJy4uL2Jhc2UvZmFjZXQtYmFzZS9mYWNldC1iYXNlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBGYWNldCB9IGZyb20gJy4uL21vZGVscy9mYWNldCc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAndXgtZmFjZXQtY2hlY2stbGlzdCcsXG4gICAgdGVtcGxhdGU6IGA8dXgtZmFjZXQtaGVhZGVyIFtoZWFkZXJdPVwiaGVhZGVyXCIgWyhleHBhbmRlZCldPVwiZXhwYW5kZWRcIj48L3V4LWZhY2V0LWhlYWRlcj5cblxuPCEtLSBDcmVhdGUgYSBjb250YWluZXIgd2hpY2ggd2lsbCBzaG93IHdoZW4gc2VjdGlvbiBpcyBleHBhbmRlZCAtLT5cbjxkaXYgY2xhc3M9XCJmYWNldC1jaGVjay1saXN0LWNvbnRhaW5lclwiIFtjbGFzcy5mYWNldC1jaGVjay1saXN0LXNjcm9sbGJhcl09XCJzY3JvbGxiYXJcIiAqbmdJZj1cImV4cGFuZGVkXCI+XG5cbiAgICA8IS0tIEl0ZXJhdGUgdGhyb3VnaCBlYWNoIHBvc3NpYmxlIGZhY2V0IC0tPlxuICAgIDxkaXYgY2xhc3M9XCJmYWNldC1jaGVjay1saXN0LWl0ZW1cIiAqbmdGb3I9XCJsZXQgZmFjZXQgb2YgZmFjZXRzXCIgW2NsYXNzLmZhY2V0LWFjdGl2ZV09XCJpc0ZhY2V0U2VsZWN0ZWQoZmFjZXQpXCIgdGFiaW5kZXg9XCIwXCJcbiAgICAgICAgKGNsaWNrKT1cInRvZ2dsZUZhY2V0U2VsZWN0aW9uKGZhY2V0KVwiIChrZXl1cC5lbnRlcik9XCJ0b2dnbGVGYWNldFNlbGVjdGlvbihmYWNldClcIiBbY2xhc3MuZGlzYWJsZWRdPVwiZmFjZXQuZGlzYWJsZWRcIj5cblxuICAgICAgICA8IS0tIFNob3cgY2hlY2sgaWNvbiB0byBpbmRpY2F0ZSB0aGUgc3RhdGUgLS0+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwiZmFjZXQtY2hlY2stbGlzdC1pdGVtLWNoZWNrXCI+XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cImhwZS1pY29uIGhwZS1hY3RpdmVcIj48L3NwYW4+XG4gICAgICAgIDwvc3Bhbj5cblxuICAgICAgICA8IS0tIERpc3BsYXkgdGhlIHRpdGxlIC0tPlxuICAgICAgICA8c3BhbiBjbGFzcz1cImZhY2V0LWNoZWNrLWxpc3QtaXRlbS10aXRsZVwiPnt7IGZhY2V0LnRpdGxlIH19PC9zcGFuPlxuXG4gICAgICAgIDwhLS0gRGlzcGxheSB0aGUgY291bnQgaWYgc3BlY2lmaWVkIC0tPlxuICAgICAgICA8c3BhbiBjbGFzcz1cImZhY2V0LWNoZWNrLWxpc3QtaXRlbS1jb3VudFwiICpuZ0lmPVwiZmFjZXQuY291bnQgIT09IHVuZGVmaW5lZFwiPih7eyBmYWNldC5jb3VudCB9fSk8L3NwYW4+XG4gICAgPC9kaXY+XG48L2Rpdj5gXG59KVxuZXhwb3J0IGNsYXNzIEZhY2V0Q2hlY2tMaXN0Q29tcG9uZW50IGV4dGVuZHMgRmFjZXRCYXNlQ29tcG9uZW50IHtcblxuICAgIEBJbnB1dCgpIGZhY2V0czogRmFjZXRbXSA9IFtdO1xuICAgIEBJbnB1dCgpIGhlYWRlcjogc3RyaW5nO1xuICAgIEBJbnB1dCgpIHNjcm9sbGJhcjogYm9vbGVhbiA9IHRydWU7XG4gICAgQElucHV0KCkgZXhwYW5kZWQ6IGJvb2xlYW4gPSB0cnVlO1xufSJdfQ==