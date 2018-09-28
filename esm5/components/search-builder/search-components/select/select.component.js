/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { BaseSearchComponent } from '../base-search.component';
var SearchSelectComponent = /** @class */ (function (_super) {
    tslib_1.__extends(SearchSelectComponent, _super);
    function SearchSelectComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.type = 'select';
        return _this;
    }
    Object.defineProperty(SearchSelectComponent.prototype, "label", {
        /**
         * Provide defaults for undefined properties
         */
        get: /**
         * Provide defaults for undefined properties
         * @return {?}
         */
        function () {
            return this.config.label;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SearchSelectComponent.prototype, "options", {
        get: /**
         * @return {?}
         */
        function () {
            return this.config.options || [];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SearchSelectComponent.prototype, "multiple", {
        get: /**
         * @return {?}
         */
        function () {
            return this.config.multiple || false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SearchSelectComponent.prototype, "placeholder", {
        get: /**
         * @return {?}
         */
        function () {
            return this.config.placeholder || 'Select item';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SearchSelectComponent.prototype, "dropDirection", {
        get: /**
         * @return {?}
         */
        function () {
            return this.config.dropDirection || 'down';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SearchSelectComponent.prototype, "allowNull", {
        get: /**
         * @return {?}
         */
        function () {
            return this.config.allowNull || false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SearchSelectComponent.prototype, "disabled", {
        get: /**
         * @return {?}
         */
        function () {
            return this.config.disabled || false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SearchSelectComponent.prototype, "maxHeight", {
        get: /**
         * @return {?}
         */
        function () {
            return this.config.maxHeight || '250px';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SearchSelectComponent.prototype, "pageSize", {
        get: /**
         * @return {?}
         */
        function () {
            return this.config.pageSize || 20;
        },
        enumerable: true,
        configurable: true
    });
    SearchSelectComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ux-search-select',
                    template: "<label class=\"form-label\" *ngIf=\"label\">{{ label }}</label>\n\n<ux-select [(value)]=\"value\"\n           [options]=\"options\"\n           [multiple]=\"multiple\"\n           [placeholder]=\"placeholder\"\n           [dropDirection]=\"dropDirection\"\n           [pageSize]=\"pageSize\"\n           [allowNull]=\"allowNull\"\n           [disabled]=\"disabled\"\n           [maxHeight]=\"maxHeight\"\n           [key]=\"config.key\"\n           [display]=\"config.display\"\n           [loadingTemplate]=\"config.loadingTemplate\"\n           [optionTemplate]=\"config.optionTemplate\"\n           [noOptionsTemplate]=\"config.noOptionsTemplate\"\n           [focusIf]=\"focus\">\n</ux-select>"
                }] }
    ];
    return SearchSelectComponent;
}(BaseSearchComponent));
export { SearchSelectComponent };
function SearchSelectComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    SearchSelectComponent.prototype.type;
}
/**
 * @record
 */
export function SearchSelectConfig() { }
function SearchSelectConfig_tsickle_Closure_declarations() {
    /** @type {?|undefined} */
    SearchSelectConfig.prototype.options;
    /** @type {?|undefined} */
    SearchSelectConfig.prototype.multiple;
    /** @type {?|undefined} */
    SearchSelectConfig.prototype.dropDirection;
    /** @type {?|undefined} */
    SearchSelectConfig.prototype.allowNull;
    /** @type {?|undefined} */
    SearchSelectConfig.prototype.disabled;
    /** @type {?|undefined} */
    SearchSelectConfig.prototype.maxHeight;
    /** @type {?|undefined} */
    SearchSelectConfig.prototype.pageSize;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJjb21wb25lbnRzL3NlYXJjaC1idWlsZGVyL3NlYXJjaC1jb21wb25lbnRzL3NlbGVjdC9zZWxlY3QuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMxQyxPQUFPLEVBQUUsbUJBQW1CLEVBQTZCLE1BQU0sMEJBQTBCLENBQUM7O0lBTy9DLGlEQUFtQjs7O3FCQUU3QyxRQUFROzs7SUFLdkIsc0JBQUksd0NBQUs7UUFIVDs7V0FFRzs7Ozs7UUFDSDtZQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQztTQUMxQjs7O09BQUE7SUFFRCxzQkFBSSwwQ0FBTzs7OztRQUFYO1lBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxJQUFJLEVBQUUsQ0FBQztTQUNsQzs7O09BQUE7SUFFRCxzQkFBSSwyQ0FBUTs7OztRQUFaO1lBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxJQUFJLEtBQUssQ0FBQztTQUN0Qzs7O09BQUE7SUFFRCxzQkFBSSw4Q0FBVzs7OztRQUFmO1lBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxJQUFJLGFBQWEsQ0FBQztTQUNqRDs7O09BQUE7SUFFRCxzQkFBSSxnREFBYTs7OztRQUFqQjtZQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsSUFBSSxNQUFNLENBQUM7U0FDNUM7OztPQUFBO0lBRUQsc0JBQUksNENBQVM7Ozs7UUFBYjtZQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsSUFBSSxLQUFLLENBQUM7U0FDdkM7OztPQUFBO0lBRUQsc0JBQUksMkNBQVE7Ozs7UUFBWjtZQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsSUFBSSxLQUFLLENBQUM7U0FDdEM7OztPQUFBO0lBRUQsc0JBQUksNENBQVM7Ozs7UUFBYjtZQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsSUFBSSxPQUFPLENBQUM7U0FDekM7OztPQUFBO0lBRUQsc0JBQUksMkNBQVE7Ozs7UUFBWjtZQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsSUFBSSxFQUFFLENBQUM7U0FDbkM7OztPQUFBOztnQkE3Q0YsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxrQkFBa0I7b0JBQzVCLHFzQkFBc0M7aUJBQ3ZDOztnQ0FQRDtFQVEyQyxtQkFBbUI7U0FBakQscUJBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCYXNlU2VhcmNoQ29tcG9uZW50LCBCYXNlU2VhcmNoQ29tcG9uZW50Q29uZmlnIH0gZnJvbSAnLi4vYmFzZS1zZWFyY2guY29tcG9uZW50JztcbmltcG9ydCB7IEluZmluaXRlU2Nyb2xsTG9hZEZ1bmN0aW9uIH0gZnJvbSAnLi4vLi4vLi4vLi4vaW5kZXgnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd1eC1zZWFyY2gtc2VsZWN0JyxcbiAgdGVtcGxhdGVVcmw6ICcuL3NlbGVjdC5jb21wb25lbnQuaHRtbCdcbn0pXG5leHBvcnQgY2xhc3MgU2VhcmNoU2VsZWN0Q29tcG9uZW50IGV4dGVuZHMgQmFzZVNlYXJjaENvbXBvbmVudCB7XG5cbiAgdHlwZTogc3RyaW5nID0gJ3NlbGVjdCc7XG5cbiAgLyoqXG4gICAqIFByb3ZpZGUgZGVmYXVsdHMgZm9yIHVuZGVmaW5lZCBwcm9wZXJ0aWVzXG4gICAqL1xuICBnZXQgbGFiZWwoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5jb25maWcubGFiZWw7XG4gIH1cblxuICBnZXQgb3B0aW9ucygpIHtcbiAgICByZXR1cm4gdGhpcy5jb25maWcub3B0aW9ucyB8fCBbXTtcbiAgfVxuXG4gIGdldCBtdWx0aXBsZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5jb25maWcubXVsdGlwbGUgfHwgZmFsc2U7XG4gIH1cblxuICBnZXQgcGxhY2Vob2xkZXIoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5jb25maWcucGxhY2Vob2xkZXIgfHwgJ1NlbGVjdCBpdGVtJztcbiAgfVxuXG4gIGdldCBkcm9wRGlyZWN0aW9uKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuY29uZmlnLmRyb3BEaXJlY3Rpb24gfHwgJ2Rvd24nO1xuICB9XG5cbiAgZ2V0IGFsbG93TnVsbCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5jb25maWcuYWxsb3dOdWxsIHx8IGZhbHNlO1xuICB9XG5cbiAgZ2V0IGRpc2FibGVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmNvbmZpZy5kaXNhYmxlZCB8fCBmYWxzZTtcbiAgfVxuXG4gIGdldCBtYXhIZWlnaHQoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5jb25maWcubWF4SGVpZ2h0IHx8ICcyNTBweCc7XG4gIH1cblxuICBnZXQgcGFnZVNpemUoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5jb25maWcucGFnZVNpemUgfHwgMjA7XG4gIH1cbn1cblxuZXhwb3J0IGludGVyZmFjZSBTZWFyY2hTZWxlY3RDb25maWcgZXh0ZW5kcyBCYXNlU2VhcmNoQ29tcG9uZW50Q29uZmlnIHtcbiAgb3B0aW9ucz86IGFueVtdIHwgSW5maW5pdGVTY3JvbGxMb2FkRnVuY3Rpb247XG4gIG11bHRpcGxlPzogYm9vbGVhbjtcbiAgZHJvcERpcmVjdGlvbj86ICd1cCcgfCAnZG93bic7XG4gIGFsbG93TnVsbD86IGJvb2xlYW47XG4gIGRpc2FibGVkPzogYm9vbGVhbjtcbiAgbWF4SGVpZ2h0Pzogc3RyaW5nO1xuICBwYWdlU2l6ZT86IG51bWJlcjtcbn0iXX0=