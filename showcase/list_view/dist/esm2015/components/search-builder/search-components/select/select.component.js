/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component } from '@angular/core';
import { BaseSearchComponent } from '../base-search.component';
export class SearchSelectComponent extends BaseSearchComponent {
    constructor() {
        super(...arguments);
        this.type = 'select';
    }
    /**
     * Provide defaults for undefined properties
     * @return {?}
     */
    get label() {
        return this.config.label;
    }
    /**
     * @return {?}
     */
    get options() {
        return this.config.options || [];
    }
    /**
     * @return {?}
     */
    get multiple() {
        return this.config.multiple || false;
    }
    /**
     * @return {?}
     */
    get placeholder() {
        return this.config.placeholder || 'Select item';
    }
    /**
     * @return {?}
     */
    get dropDirection() {
        return this.config.dropDirection || 'down';
    }
    /**
     * @return {?}
     */
    get allowNull() {
        return this.config.allowNull || false;
    }
    /**
     * @return {?}
     */
    get disabled() {
        return this.config.disabled || false;
    }
    /**
     * @return {?}
     */
    get maxHeight() {
        return this.config.maxHeight || '250px';
    }
    /**
     * @return {?}
     */
    get pageSize() {
        return this.config.pageSize || 20;
    }
}
SearchSelectComponent.decorators = [
    { type: Component, args: [{
                selector: 'ux-search-select',
                template: `<label class="form-label" *ngIf="label">{{ label }}</label>

<ux-select [(value)]="value" 
           [options]="options" 
           [multiple]="multiple" 
           [placeholder]="placeholder" 
           [dropDirection]="dropDirection"
           [pageSize]="pageSize"
           [allowNull]="allowNull"
           [disabled]="disabled"
           [maxHeight]="maxHeight"
           [key]="config.key"
           [display]="config.display"
           [loadingTemplate]="config.loadingTemplate"
           [optionTemplate]="config.optionTemplate"
           [noOptionsTemplate]="config.noOptionsTemplate">
</ux-select>`
            },] },
];
function SearchSelectComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    SearchSelectComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    SearchSelectComponent.ctorParameters;
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJjb21wb25lbnRzL3NlYXJjaC1idWlsZGVyL3NlYXJjaC1jb21wb25lbnRzL3NlbGVjdC9zZWxlY3QuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzFDLE9BQU8sRUFBRSxtQkFBbUIsRUFBNkIsTUFBTSwwQkFBMEIsQ0FBQztBQXVCMUYsTUFBTSw0QkFBNkIsU0FBUSxtQkFBbUI7OztvQkFFN0MsUUFBUTs7Ozs7O0lBS3ZCLElBQUksS0FBSztRQUNQLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQztLQUMxQjs7OztJQUVELElBQUksT0FBTztRQUNULE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sSUFBSSxFQUFFLENBQUM7S0FDbEM7Ozs7SUFFRCxJQUFJLFFBQVE7UUFDVixNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLElBQUksS0FBSyxDQUFDO0tBQ3RDOzs7O0lBRUQsSUFBSSxXQUFXO1FBQ2IsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxJQUFJLGFBQWEsQ0FBQztLQUNqRDs7OztJQUVELElBQUksYUFBYTtRQUNmLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsSUFBSSxNQUFNLENBQUM7S0FDNUM7Ozs7SUFFRCxJQUFJLFNBQVM7UUFDWCxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLElBQUksS0FBSyxDQUFDO0tBQ3ZDOzs7O0lBRUQsSUFBSSxRQUFRO1FBQ1YsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxJQUFJLEtBQUssQ0FBQztLQUN0Qzs7OztJQUVELElBQUksU0FBUztRQUNYLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsSUFBSSxPQUFPLENBQUM7S0FDekM7Ozs7SUFFRCxJQUFJLFFBQVE7UUFDVixNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLElBQUksRUFBRSxDQUFDO0tBQ25DOzs7WUE3REYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxrQkFBa0I7Z0JBQzVCLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7OzthQWdCQzthQUNaIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCYXNlU2VhcmNoQ29tcG9uZW50LCBCYXNlU2VhcmNoQ29tcG9uZW50Q29uZmlnIH0gZnJvbSAnLi4vYmFzZS1zZWFyY2guY29tcG9uZW50JztcbmltcG9ydCB7IEluZmluaXRlU2Nyb2xsTG9hZEZ1bmN0aW9uIH0gZnJvbSAnLi4vLi4vLi4vLi4vaW5kZXgnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd1eC1zZWFyY2gtc2VsZWN0JyxcbiAgdGVtcGxhdGU6IGA8bGFiZWwgY2xhc3M9XCJmb3JtLWxhYmVsXCIgKm5nSWY9XCJsYWJlbFwiPnt7IGxhYmVsIH19PC9sYWJlbD5cblxuPHV4LXNlbGVjdCBbKHZhbHVlKV09XCJ2YWx1ZVwiIFxuICAgICAgICAgICBbb3B0aW9uc109XCJvcHRpb25zXCIgXG4gICAgICAgICAgIFttdWx0aXBsZV09XCJtdWx0aXBsZVwiIFxuICAgICAgICAgICBbcGxhY2Vob2xkZXJdPVwicGxhY2Vob2xkZXJcIiBcbiAgICAgICAgICAgW2Ryb3BEaXJlY3Rpb25dPVwiZHJvcERpcmVjdGlvblwiXG4gICAgICAgICAgIFtwYWdlU2l6ZV09XCJwYWdlU2l6ZVwiXG4gICAgICAgICAgIFthbGxvd051bGxdPVwiYWxsb3dOdWxsXCJcbiAgICAgICAgICAgW2Rpc2FibGVkXT1cImRpc2FibGVkXCJcbiAgICAgICAgICAgW21heEhlaWdodF09XCJtYXhIZWlnaHRcIlxuICAgICAgICAgICBba2V5XT1cImNvbmZpZy5rZXlcIlxuICAgICAgICAgICBbZGlzcGxheV09XCJjb25maWcuZGlzcGxheVwiXG4gICAgICAgICAgIFtsb2FkaW5nVGVtcGxhdGVdPVwiY29uZmlnLmxvYWRpbmdUZW1wbGF0ZVwiXG4gICAgICAgICAgIFtvcHRpb25UZW1wbGF0ZV09XCJjb25maWcub3B0aW9uVGVtcGxhdGVcIlxuICAgICAgICAgICBbbm9PcHRpb25zVGVtcGxhdGVdPVwiY29uZmlnLm5vT3B0aW9uc1RlbXBsYXRlXCI+XG48L3V4LXNlbGVjdD5gXG59KVxuZXhwb3J0IGNsYXNzIFNlYXJjaFNlbGVjdENvbXBvbmVudCBleHRlbmRzIEJhc2VTZWFyY2hDb21wb25lbnQge1xuXG4gIHR5cGU6IHN0cmluZyA9ICdzZWxlY3QnO1xuXG4gIC8qKlxuICAgKiBQcm92aWRlIGRlZmF1bHRzIGZvciB1bmRlZmluZWQgcHJvcGVydGllc1xuICAgKi9cbiAgZ2V0IGxhYmVsKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuY29uZmlnLmxhYmVsO1xuICB9XG5cbiAgZ2V0IG9wdGlvbnMoKSB7XG4gICAgcmV0dXJuIHRoaXMuY29uZmlnLm9wdGlvbnMgfHwgW107XG4gIH1cblxuICBnZXQgbXVsdGlwbGUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuY29uZmlnLm11bHRpcGxlIHx8IGZhbHNlO1xuICB9XG5cbiAgZ2V0IHBsYWNlaG9sZGVyKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuY29uZmlnLnBsYWNlaG9sZGVyIHx8ICdTZWxlY3QgaXRlbSc7XG4gIH1cblxuICBnZXQgZHJvcERpcmVjdGlvbigpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLmNvbmZpZy5kcm9wRGlyZWN0aW9uIHx8ICdkb3duJztcbiAgfVxuXG4gIGdldCBhbGxvd051bGwoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuY29uZmlnLmFsbG93TnVsbCB8fCBmYWxzZTtcbiAgfVxuXG4gIGdldCBkaXNhYmxlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5jb25maWcuZGlzYWJsZWQgfHwgZmFsc2U7XG4gIH1cblxuICBnZXQgbWF4SGVpZ2h0KCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuY29uZmlnLm1heEhlaWdodCB8fCAnMjUwcHgnO1xuICB9XG5cbiAgZ2V0IHBhZ2VTaXplKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuY29uZmlnLnBhZ2VTaXplIHx8IDIwO1xuICB9XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgU2VhcmNoU2VsZWN0Q29uZmlnIGV4dGVuZHMgQmFzZVNlYXJjaENvbXBvbmVudENvbmZpZyB7XG4gIG9wdGlvbnM/OiBhbnlbXSB8IEluZmluaXRlU2Nyb2xsTG9hZEZ1bmN0aW9uO1xuICBtdWx0aXBsZT86IGJvb2xlYW47XG4gIGRyb3BEaXJlY3Rpb24/OiAndXAnIHwgJ2Rvd24nO1xuICBhbGxvd051bGw/OiBib29sZWFuO1xuICBkaXNhYmxlZD86IGJvb2xlYW47XG4gIG1heEhlaWdodD86IHN0cmluZztcbiAgcGFnZVNpemU/OiBudW1iZXI7XG59Il19