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
                template: "<label class=\"form-label\" *ngIf=\"label\">{{ label }}</label>\n\n<ux-select [(value)]=\"value\" \n           [options]=\"options\" \n           [multiple]=\"multiple\" \n           [placeholder]=\"placeholder\" \n           [dropDirection]=\"dropDirection\"\n           [pageSize]=\"pageSize\"\n           [allowNull]=\"allowNull\"\n           [disabled]=\"disabled\"\n           [maxHeight]=\"maxHeight\"\n           [key]=\"config.key\"\n           [display]=\"config.display\"\n           [loadingTemplate]=\"config.loadingTemplate\"\n           [optionTemplate]=\"config.optionTemplate\"\n           [noOptionsTemplate]=\"config.noOptionsTemplate\">\n</ux-select>"
            }] }
];
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJjb21wb25lbnRzL3NlYXJjaC1idWlsZGVyL3NlYXJjaC1jb21wb25lbnRzL3NlbGVjdC9zZWxlY3QuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzFDLE9BQU8sRUFBRSxtQkFBbUIsRUFBNkIsTUFBTSwwQkFBMEIsQ0FBQztBQU8xRixNQUFNLDRCQUE2QixTQUFRLG1CQUFtQjs7O29CQUU3QyxRQUFROzs7Ozs7SUFLdkIsSUFBSSxLQUFLO1FBQ1AsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDO0tBQzFCOzs7O0lBRUQsSUFBSSxPQUFPO1FBQ1QsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxJQUFJLEVBQUUsQ0FBQztLQUNsQzs7OztJQUVELElBQUksUUFBUTtRQUNWLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsSUFBSSxLQUFLLENBQUM7S0FDdEM7Ozs7SUFFRCxJQUFJLFdBQVc7UUFDYixNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLElBQUksYUFBYSxDQUFDO0tBQ2pEOzs7O0lBRUQsSUFBSSxhQUFhO1FBQ2YsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxJQUFJLE1BQU0sQ0FBQztLQUM1Qzs7OztJQUVELElBQUksU0FBUztRQUNYLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsSUFBSSxLQUFLLENBQUM7S0FDdkM7Ozs7SUFFRCxJQUFJLFFBQVE7UUFDVixNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLElBQUksS0FBSyxDQUFDO0tBQ3RDOzs7O0lBRUQsSUFBSSxTQUFTO1FBQ1gsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxJQUFJLE9BQU8sQ0FBQztLQUN6Qzs7OztJQUVELElBQUksUUFBUTtRQUNWLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsSUFBSSxFQUFFLENBQUM7S0FDbkM7OztZQTdDRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGtCQUFrQjtnQkFDNUIseXFCQUFzQzthQUN2QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQmFzZVNlYXJjaENvbXBvbmVudCwgQmFzZVNlYXJjaENvbXBvbmVudENvbmZpZyB9IGZyb20gJy4uL2Jhc2Utc2VhcmNoLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBJbmZpbml0ZVNjcm9sbExvYWRGdW5jdGlvbiB9IGZyb20gJy4uLy4uLy4uLy4uL2luZGV4JztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAndXgtc2VhcmNoLXNlbGVjdCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9zZWxlY3QuY29tcG9uZW50Lmh0bWwnXG59KVxuZXhwb3J0IGNsYXNzIFNlYXJjaFNlbGVjdENvbXBvbmVudCBleHRlbmRzIEJhc2VTZWFyY2hDb21wb25lbnQge1xuXG4gIHR5cGU6IHN0cmluZyA9ICdzZWxlY3QnO1xuXG4gIC8qKlxuICAgKiBQcm92aWRlIGRlZmF1bHRzIGZvciB1bmRlZmluZWQgcHJvcGVydGllc1xuICAgKi9cbiAgZ2V0IGxhYmVsKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuY29uZmlnLmxhYmVsO1xuICB9XG5cbiAgZ2V0IG9wdGlvbnMoKSB7XG4gICAgcmV0dXJuIHRoaXMuY29uZmlnLm9wdGlvbnMgfHwgW107XG4gIH1cblxuICBnZXQgbXVsdGlwbGUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuY29uZmlnLm11bHRpcGxlIHx8IGZhbHNlO1xuICB9XG5cbiAgZ2V0IHBsYWNlaG9sZGVyKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuY29uZmlnLnBsYWNlaG9sZGVyIHx8ICdTZWxlY3QgaXRlbSc7XG4gIH1cblxuICBnZXQgZHJvcERpcmVjdGlvbigpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLmNvbmZpZy5kcm9wRGlyZWN0aW9uIHx8ICdkb3duJztcbiAgfVxuXG4gIGdldCBhbGxvd051bGwoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuY29uZmlnLmFsbG93TnVsbCB8fCBmYWxzZTtcbiAgfVxuXG4gIGdldCBkaXNhYmxlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5jb25maWcuZGlzYWJsZWQgfHwgZmFsc2U7XG4gIH1cblxuICBnZXQgbWF4SGVpZ2h0KCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuY29uZmlnLm1heEhlaWdodCB8fCAnMjUwcHgnO1xuICB9XG5cbiAgZ2V0IHBhZ2VTaXplKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuY29uZmlnLnBhZ2VTaXplIHx8IDIwO1xuICB9XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgU2VhcmNoU2VsZWN0Q29uZmlnIGV4dGVuZHMgQmFzZVNlYXJjaENvbXBvbmVudENvbmZpZyB7XG4gIG9wdGlvbnM/OiBhbnlbXSB8IEluZmluaXRlU2Nyb2xsTG9hZEZ1bmN0aW9uO1xuICBtdWx0aXBsZT86IGJvb2xlYW47XG4gIGRyb3BEaXJlY3Rpb24/OiAndXAnIHwgJ2Rvd24nO1xuICBhbGxvd051bGw/OiBib29sZWFuO1xuICBkaXNhYmxlZD86IGJvb2xlYW47XG4gIG1heEhlaWdodD86IHN0cmluZztcbiAgcGFnZVNpemU/OiBudW1iZXI7XG59Il19