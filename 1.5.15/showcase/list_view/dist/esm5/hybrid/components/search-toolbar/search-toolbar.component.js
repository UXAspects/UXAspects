/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Directive, ElementRef, Injector, Input } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';
var SearchToolbarNg1Component = (function (_super) {
    tslib_1.__extends(SearchToolbarNg1Component, _super);
    function SearchToolbarNg1Component(elementRef, injector) {
        return _super.call(this, 'searchToolbar', elementRef, injector) || this;
    }
    SearchToolbarNg1Component.decorators = [
        { type: Directive, args: [{
                    selector: 'search-toolbar'
                },] },
    ];
    /** @nocollapse */
    SearchToolbarNg1Component.ctorParameters = function () { return [
        { type: ElementRef, },
        { type: Injector, },
    ]; };
    SearchToolbarNg1Component.propDecorators = {
        "searchTypeahead": [{ type: Input },],
        "placeHolder": [{ type: Input },],
        "closeSearch": [{ type: Input },],
        "onSearch": [{ type: Input },],
        "onFocus": [{ type: Input },],
    };
    return SearchToolbarNg1Component;
}(UpgradeComponent));
export { SearchToolbarNg1Component };
function SearchToolbarNg1Component_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    SearchToolbarNg1Component.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    SearchToolbarNg1Component.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    SearchToolbarNg1Component.propDecorators;
    /** @type {?} */
    SearchToolbarNg1Component.prototype.searchTypeahead;
    /** @type {?} */
    SearchToolbarNg1Component.prototype.placeHolder;
    /** @type {?} */
    SearchToolbarNg1Component.prototype.closeSearch;
    /** @type {?} */
    SearchToolbarNg1Component.prototype.onSearch;
    /** @type {?} */
    SearchToolbarNg1Component.prototype.onFocus;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLXRvb2xiYXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImh5YnJpZC9jb21wb25lbnRzL3NlYXJjaC10b29sYmFyL3NlYXJjaC10b29sYmFyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDdkUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0seUJBQXlCLENBQUM7O0lBS1oscURBQWdCO0lBUTNELG1DQUFZLFVBQXNCLEVBQUUsUUFBa0I7ZUFDbEQsa0JBQU0sZUFBZSxFQUFFLFVBQVUsRUFBRSxRQUFRLENBQUM7S0FDL0M7O2dCQWJKLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUsZ0JBQWdCO2lCQUM3Qjs7OztnQkFMbUIsVUFBVTtnQkFBRSxRQUFROzs7b0NBUW5DLEtBQUs7Z0NBQ0wsS0FBSztnQ0FDTCxLQUFLOzZCQUNMLEtBQUs7NEJBQ0wsS0FBSzs7b0NBWlY7RUFNK0MsZ0JBQWdCO1NBQWxELHlCQUF5QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgSW5qZWN0b3IsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBVcGdyYWRlQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvdXBncmFkZS9zdGF0aWMnO1xuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ3NlYXJjaC10b29sYmFyJ1xufSlcbmV4cG9ydCBjbGFzcyBTZWFyY2hUb29sYmFyTmcxQ29tcG9uZW50IGV4dGVuZHMgVXBncmFkZUNvbXBvbmVudCB7XG5cbiAgICBASW5wdXQoKSBzZWFyY2hUeXBlYWhlYWQ6IGFueVtdO1xuICAgIEBJbnB1dCgpIHBsYWNlSG9sZGVyOiBzdHJpbmc7XG4gICAgQElucHV0KCkgY2xvc2VTZWFyY2g6IHN0cmluZztcbiAgICBASW5wdXQoKSBvblNlYXJjaDogRnVuY3Rpb247XG4gICAgQElucHV0KCkgb25Gb2N1czogRnVuY3Rpb247XG5cbiAgICBjb25zdHJ1Y3RvcihlbGVtZW50UmVmOiBFbGVtZW50UmVmLCBpbmplY3RvcjogSW5qZWN0b3IpIHtcbiAgICAgICAgc3VwZXIoJ3NlYXJjaFRvb2xiYXInLCBlbGVtZW50UmVmLCBpbmplY3Rvcik7XG4gICAgfVxufSJdfQ==