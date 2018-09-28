/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component } from '@angular/core';
import { SearchBuilderService } from '../search-builder.service';
export class BaseSearchComponent {
    /**
     * @param {?} _searchBuilderService
     */
    constructor(_searchBuilderService) {
        this._searchBuilderService = _searchBuilderService;
        this._id = this._searchBuilderService.generateComponentId();
        this._valid = true;
    }
    /**
     * @return {?}
     */
    get id() {
        return `ux-search-builder-search-component-${this._id}`;
    }
    /**
     * Get the current value of the component
     * @return {?}
     */
    get value() {
        return this.context.value;
    }
    /**
     * Set the current value of the component
     * @param {?} value
     * @return {?}
     */
    set value(value) {
        this.context.value = value;
        this._searchBuilderService.queryHasChanged();
        // if value has been set perform validation
        this.validate();
    }
    /**
     * @return {?}
     */
    get valid() {
        return this._valid;
    }
    /**
     * @param {?} valid
     * @return {?}
     */
    set valid(valid) {
        this._valid = valid;
        this._searchBuilderService.setValid(this._id, valid);
    }
    /**
     * Make sure we clean up after ourselves
     * @return {?}
     */
    ngOnDestroy() {
        this.valid = true;
    }
    /**
     * Perform any required validation on the value
     * @return {?}
     */
    validate() {
        // if a custom validation function has been provided then use it
        this.valid = this.config.validation ? this.config.validation(this, this.value) : true;
    }
}
BaseSearchComponent.decorators = [
    { type: Component, args: [{
                selector: 'ux-base-search',
                template: ''
            }] }
];
/** @nocollapse */
BaseSearchComponent.ctorParameters = () => [
    { type: SearchBuilderService }
];
function BaseSearchComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    BaseSearchComponent.prototype.type;
    /** @type {?} */
    BaseSearchComponent.prototype.config;
    /** @type {?} */
    BaseSearchComponent.prototype.context;
    /** @type {?} */
    BaseSearchComponent.prototype.focus;
    /** @type {?} */
    BaseSearchComponent.prototype._id;
    /** @type {?} */
    BaseSearchComponent.prototype._valid;
    /** @type {?} */
    BaseSearchComponent.prototype._searchBuilderService;
}
/**
 * @record
 */
export function BaseSearchComponentConfig() { }
function BaseSearchComponentConfig_tsickle_Closure_declarations() {
    /** @type {?|undefined} */
    BaseSearchComponentConfig.prototype.label;
    /** @type {?|undefined} */
    BaseSearchComponentConfig.prototype.placeholder;
    /** @type {?|undefined} */
    BaseSearchComponentConfig.prototype.validation;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS1zZWFyY2guY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvc2VhcmNoLWJ1aWxkZXIvc2VhcmNoLWNvbXBvbmVudHMvYmFzZS1zZWFyY2guY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFhLE1BQU0sZUFBZSxDQUFDO0FBRXJELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBTWpFLE1BQU07Ozs7SUF5Q0YsWUFBb0IscUJBQTJDO1FBQTNDLDBCQUFxQixHQUFyQixxQkFBcUIsQ0FBc0I7bUJBSHpDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxtQkFBbUIsRUFBRTtzQkFDNUMsSUFBSTtLQUVzQzs7OztJQXZDcEUsSUFBSSxFQUFFO1FBQ0YsTUFBTSxDQUFDLHNDQUFzQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7S0FDM0Q7Ozs7O0lBVUQsSUFBSSxLQUFLO1FBQ0wsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDO0tBQzdCOzs7Ozs7SUFLRCxJQUFJLEtBQUssQ0FBQyxLQUFVO1FBQ2hCLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUMzQixJQUFJLENBQUMscUJBQXFCLENBQUMsZUFBZSxFQUFFLENBQUM7O1FBRzdDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztLQUNuQjs7OztJQUVELElBQUksS0FBSztRQUNMLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO0tBQ3RCOzs7OztJQUVELElBQUksS0FBSyxDQUFDLEtBQWM7UUFDcEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDcEIsSUFBSSxDQUFDLHFCQUFxQixDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFDO0tBQ3hEOzs7OztJQVVELFdBQVc7UUFDUCxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztLQUNyQjs7Ozs7SUFLRCxRQUFROztRQUVKLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztLQUN6Rjs7O1lBNURKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsZ0JBQWdCO2dCQUMxQixRQUFRLEVBQUUsRUFBRTthQUNmOzs7O1lBTFEsb0JBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFNlYXJjaEJ1aWxkZXJDb21wb25lbnRDb250ZXh0IH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9jb21wb25lbnQtY29udGV4dC5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgU2VhcmNoQnVpbGRlclNlcnZpY2UgfSBmcm9tICcuLi9zZWFyY2gtYnVpbGRlci5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd1eC1iYXNlLXNlYXJjaCcsXG4gICAgdGVtcGxhdGU6ICcnXG59KVxuZXhwb3J0IGNsYXNzIEJhc2VTZWFyY2hDb21wb25lbnQgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuXG4gICAgZ2V0IGlkKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBgdXgtc2VhcmNoLWJ1aWxkZXItc2VhcmNoLWNvbXBvbmVudC0ke3RoaXMuX2lkfWA7XG4gICAgfVxuXG4gICAgdHlwZTogc3RyaW5nO1xuICAgIGNvbmZpZzogYW55O1xuICAgIGNvbnRleHQ6IFNlYXJjaEJ1aWxkZXJDb21wb25lbnRDb250ZXh0O1xuICAgIGZvY3VzOiBib29sZWFuO1xuXG4gICAgLyoqXG4gICAgICogR2V0IHRoZSBjdXJyZW50IHZhbHVlIG9mIHRoZSBjb21wb25lbnRcbiAgICAgKi9cbiAgICBnZXQgdmFsdWUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbnRleHQudmFsdWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0IHRoZSBjdXJyZW50IHZhbHVlIG9mIHRoZSBjb21wb25lbnRcbiAgICAgKi9cbiAgICBzZXQgdmFsdWUodmFsdWU6IGFueSkge1xuICAgICAgICB0aGlzLmNvbnRleHQudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgdGhpcy5fc2VhcmNoQnVpbGRlclNlcnZpY2UucXVlcnlIYXNDaGFuZ2VkKCk7XG5cbiAgICAgICAgLy8gaWYgdmFsdWUgaGFzIGJlZW4gc2V0IHBlcmZvcm0gdmFsaWRhdGlvblxuICAgICAgICB0aGlzLnZhbGlkYXRlKCk7XG4gICAgfVxuXG4gICAgZ2V0IHZhbGlkKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fdmFsaWQ7XG4gICAgfVxuXG4gICAgc2V0IHZhbGlkKHZhbGlkOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuX3ZhbGlkID0gdmFsaWQ7XG4gICAgICAgIHRoaXMuX3NlYXJjaEJ1aWxkZXJTZXJ2aWNlLnNldFZhbGlkKHRoaXMuX2lkLCB2YWxpZCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfaWQ6IG51bWJlciA9IHRoaXMuX3NlYXJjaEJ1aWxkZXJTZXJ2aWNlLmdlbmVyYXRlQ29tcG9uZW50SWQoKTtcbiAgICBwcml2YXRlIF92YWxpZDogYm9vbGVhbiA9IHRydWU7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9zZWFyY2hCdWlsZGVyU2VydmljZTogU2VhcmNoQnVpbGRlclNlcnZpY2UpIHsgfVxuXG4gICAgLyoqXG4gICAgICogTWFrZSBzdXJlIHdlIGNsZWFuIHVwIGFmdGVyIG91cnNlbHZlc1xuICAgICAqL1xuICAgIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgICAgICB0aGlzLnZhbGlkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQZXJmb3JtIGFueSByZXF1aXJlZCB2YWxpZGF0aW9uIG9uIHRoZSB2YWx1ZVxuICAgICAqL1xuICAgIHZhbGlkYXRlKCk6IHZvaWQge1xuICAgICAgICAvLyBpZiBhIGN1c3RvbSB2YWxpZGF0aW9uIGZ1bmN0aW9uIGhhcyBiZWVuIHByb3ZpZGVkIHRoZW4gdXNlIGl0XG4gICAgICAgIHRoaXMudmFsaWQgPSB0aGlzLmNvbmZpZy52YWxpZGF0aW9uID8gdGhpcy5jb25maWcudmFsaWRhdGlvbih0aGlzLCB0aGlzLnZhbHVlKSA6IHRydWU7XG4gICAgfVxuXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQmFzZVNlYXJjaENvbXBvbmVudENvbmZpZyB7XG4gICAgbGFiZWw/OiBzdHJpbmc7XG4gICAgcGxhY2Vob2xkZXI/OiBzdHJpbmc7XG4gICAgdmFsaWRhdGlvbj86ICh2YWx1ZTogYW55KSA9PiBib29sZWFuO1xufSJdfQ==