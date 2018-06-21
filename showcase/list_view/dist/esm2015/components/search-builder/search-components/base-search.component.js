/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component } from '@angular/core';
import { SearchBuilderGroupService } from '../search-builder-group/search-builder-group.service';
import { SearchBuilderService } from '../search-builder.service';
export class BaseSearchComponent {
    /**
     * @param {?} _searchBuilderService
     * @param {?} _searchBuilderGroupService
     */
    constructor(_searchBuilderService, _searchBuilderGroupService) {
        this._searchBuilderService = _searchBuilderService;
        this._searchBuilderGroupService = _searchBuilderGroupService;
        this._id = this._searchBuilderService.generateComponentId();
        this._valid = true;
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
            },] },
];
/** @nocollapse */
BaseSearchComponent.ctorParameters = () => [
    { type: SearchBuilderService, },
    { type: SearchBuilderGroupService, },
];
function BaseSearchComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    BaseSearchComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    BaseSearchComponent.ctorParameters;
    /** @type {?} */
    BaseSearchComponent.prototype.type;
    /** @type {?} */
    BaseSearchComponent.prototype.config;
    /** @type {?} */
    BaseSearchComponent.prototype.context;
    /** @type {?} */
    BaseSearchComponent.prototype._id;
    /** @type {?} */
    BaseSearchComponent.prototype._valid;
    /** @type {?} */
    BaseSearchComponent.prototype._searchBuilderService;
    /** @type {?} */
    BaseSearchComponent.prototype._searchBuilderGroupService;
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS1zZWFyY2guY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvc2VhcmNoLWJ1aWxkZXIvc2VhcmNoLWNvbXBvbmVudHMvYmFzZS1zZWFyY2guY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFhLE1BQU0sZUFBZSxDQUFDO0FBRXJELE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLHNEQUFzRCxDQUFDO0FBQ2pHLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBTWpFLE1BQU07Ozs7O0lBb0NGLFlBQ1ksdUJBQ0E7UUFEQSwwQkFBcUIsR0FBckIscUJBQXFCO1FBQ3JCLCtCQUEwQixHQUExQiwwQkFBMEI7bUJBaENoQixJQUFJLENBQUMscUJBQXFCLENBQUMsbUJBQW1CLEVBQUU7c0JBQzVDLElBQUk7S0FnQ3pCOzs7OztJQTNCTCxJQUFJLEtBQUs7UUFDTCxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUM7S0FDN0I7Ozs7OztJQUtELElBQUksS0FBSyxDQUFDLEtBQVU7UUFDaEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQzNCLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxlQUFlLEVBQUUsQ0FBQzs7UUFHN0MsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO0tBQ25COzs7O0lBRUQsSUFBSSxLQUFLO1FBQ0wsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7S0FDdEI7Ozs7O0lBRUQsSUFBSSxLQUFLLENBQUMsS0FBYztRQUNwQixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUNwQixJQUFJLENBQUMscUJBQXFCLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLENBQUM7S0FDeEQ7Ozs7O0lBVUQsV0FBVztRQUNQLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO0tBQ3JCOzs7OztJQUtELFFBQVE7O1FBRUosSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQztLQUN6Rjs7O1lBMURKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsZ0JBQWdCO2dCQUMxQixRQUFRLEVBQUUsRUFBRTthQUNmOzs7O1lBTFEsb0JBQW9CO1lBRHBCLHlCQUF5QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTZWFyY2hCdWlsZGVyQ29tcG9uZW50Q29udGV4dCB9IGZyb20gJy4uL2ludGVyZmFjZXMvY29tcG9uZW50LWNvbnRleHQuaW50ZXJmYWNlJztcbmltcG9ydCB7IFNlYXJjaEJ1aWxkZXJHcm91cFNlcnZpY2UgfSBmcm9tICcuLi9zZWFyY2gtYnVpbGRlci1ncm91cC9zZWFyY2gtYnVpbGRlci1ncm91cC5zZXJ2aWNlJztcbmltcG9ydCB7IFNlYXJjaEJ1aWxkZXJTZXJ2aWNlIH0gZnJvbSAnLi4vc2VhcmNoLWJ1aWxkZXIuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAndXgtYmFzZS1zZWFyY2gnLFxuICAgIHRlbXBsYXRlOiAnJ1xufSlcbmV4cG9ydCBjbGFzcyBCYXNlU2VhcmNoQ29tcG9uZW50IGltcGxlbWVudHMgT25EZXN0cm95IHtcblxuICAgIHR5cGU6IHN0cmluZztcbiAgICBjb25maWc6IGFueTtcbiAgICBjb250ZXh0OiBTZWFyY2hCdWlsZGVyQ29tcG9uZW50Q29udGV4dDtcblxuICAgIHByaXZhdGUgX2lkOiBudW1iZXIgPSB0aGlzLl9zZWFyY2hCdWlsZGVyU2VydmljZS5nZW5lcmF0ZUNvbXBvbmVudElkKCk7XG4gICAgcHJpdmF0ZSBfdmFsaWQ6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgLyoqXG4gICAgICogR2V0IHRoZSBjdXJyZW50IHZhbHVlIG9mIHRoZSBjb21wb25lbnRcbiAgICAgKi9cbiAgICBnZXQgdmFsdWUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbnRleHQudmFsdWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0IHRoZSBjdXJyZW50IHZhbHVlIG9mIHRoZSBjb21wb25lbnRcbiAgICAgKi9cbiAgICBzZXQgdmFsdWUodmFsdWU6IGFueSkge1xuICAgICAgICB0aGlzLmNvbnRleHQudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgdGhpcy5fc2VhcmNoQnVpbGRlclNlcnZpY2UucXVlcnlIYXNDaGFuZ2VkKCk7XG5cbiAgICAgICAgLy8gaWYgdmFsdWUgaGFzIGJlZW4gc2V0IHBlcmZvcm0gdmFsaWRhdGlvblxuICAgICAgICB0aGlzLnZhbGlkYXRlKCk7XG4gICAgfVxuXG4gICAgZ2V0IHZhbGlkKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fdmFsaWQ7XG4gICAgfVxuXG4gICAgc2V0IHZhbGlkKHZhbGlkOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuX3ZhbGlkID0gdmFsaWQ7XG4gICAgICAgIHRoaXMuX3NlYXJjaEJ1aWxkZXJTZXJ2aWNlLnNldFZhbGlkKHRoaXMuX2lkLCB2YWxpZCk7XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgX3NlYXJjaEJ1aWxkZXJTZXJ2aWNlOiBTZWFyY2hCdWlsZGVyU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBfc2VhcmNoQnVpbGRlckdyb3VwU2VydmljZTogU2VhcmNoQnVpbGRlckdyb3VwU2VydmljZVxuICAgICkgeyB9XG5cbiAgICAvKipcbiAgICAgKiBNYWtlIHN1cmUgd2UgY2xlYW4gdXAgYWZ0ZXIgb3Vyc2VsdmVzXG4gICAgICovXG4gICAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgICAgIHRoaXMudmFsaWQgPSB0cnVlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFBlcmZvcm0gYW55IHJlcXVpcmVkIHZhbGlkYXRpb24gb24gdGhlIHZhbHVlXG4gICAgICovXG4gICAgdmFsaWRhdGUoKTogdm9pZCB7XG4gICAgICAgIC8vIGlmIGEgY3VzdG9tIHZhbGlkYXRpb24gZnVuY3Rpb24gaGFzIGJlZW4gcHJvdmlkZWQgdGhlbiB1c2UgaXRcbiAgICAgICAgdGhpcy52YWxpZCA9IHRoaXMuY29uZmlnLnZhbGlkYXRpb24gPyB0aGlzLmNvbmZpZy52YWxpZGF0aW9uKHRoaXMsIHRoaXMudmFsdWUpIDogdHJ1ZTtcbiAgICB9XG5cbn1cblxuZXhwb3J0IGludGVyZmFjZSBCYXNlU2VhcmNoQ29tcG9uZW50Q29uZmlnIHtcbiAgICBsYWJlbD86IHN0cmluZztcbiAgICBwbGFjZWhvbGRlcj86IHN0cmluZztcbiAgICB2YWxpZGF0aW9uPzogKHZhbHVlOiBhbnkpID0+IGJvb2xlYW47XG59Il19