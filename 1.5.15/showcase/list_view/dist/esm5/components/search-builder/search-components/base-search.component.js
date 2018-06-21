/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component } from '@angular/core';
import { SearchBuilderGroupService } from '../search-builder-group/search-builder-group.service';
import { SearchBuilderService } from '../search-builder.service';
var BaseSearchComponent = (function () {
    function BaseSearchComponent(_searchBuilderService, _searchBuilderGroupService) {
        this._searchBuilderService = _searchBuilderService;
        this._searchBuilderGroupService = _searchBuilderGroupService;
        this._id = this._searchBuilderService.generateComponentId();
        this._valid = true;
    }
    Object.defineProperty(BaseSearchComponent.prototype, "value", {
        /**
         * Get the current value of the component
         */
        get: /**
         * Get the current value of the component
         * @return {?}
         */
        function () {
            return this.context.value;
        },
        /**
         * Set the current value of the component
         */
        set: /**
         * Set the current value of the component
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.context.value = value;
            this._searchBuilderService.queryHasChanged();
            // if value has been set perform validation
            this.validate();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseSearchComponent.prototype, "valid", {
        get: /**
         * @return {?}
         */
        function () {
            return this._valid;
        },
        set: /**
         * @param {?} valid
         * @return {?}
         */
        function (valid) {
            this._valid = valid;
            this._searchBuilderService.setValid(this._id, valid);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Make sure we clean up after ourselves
     */
    /**
     * Make sure we clean up after ourselves
     * @return {?}
     */
    BaseSearchComponent.prototype.ngOnDestroy = /**
     * Make sure we clean up after ourselves
     * @return {?}
     */
    function () {
        this.valid = true;
    };
    /**
     * Perform any required validation on the value
     */
    /**
     * Perform any required validation on the value
     * @return {?}
     */
    BaseSearchComponent.prototype.validate = /**
     * Perform any required validation on the value
     * @return {?}
     */
    function () {
        // if a custom validation function has been provided then use it
        this.valid = this.config.validation ? this.config.validation(this, this.value) : true;
    };
    BaseSearchComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ux-base-search',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    BaseSearchComponent.ctorParameters = function () { return [
        { type: SearchBuilderService, },
        { type: SearchBuilderGroupService, },
    ]; };
    return BaseSearchComponent;
}());
export { BaseSearchComponent };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS1zZWFyY2guY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvc2VhcmNoLWJ1aWxkZXIvc2VhcmNoLWNvbXBvbmVudHMvYmFzZS1zZWFyY2guY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFhLE1BQU0sZUFBZSxDQUFDO0FBRXJELE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLHNEQUFzRCxDQUFDO0FBQ2pHLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLDJCQUEyQixDQUFDOztJQTBDN0QsNkJBQ1ksdUJBQ0E7UUFEQSwwQkFBcUIsR0FBckIscUJBQXFCO1FBQ3JCLCtCQUEwQixHQUExQiwwQkFBMEI7bUJBaENoQixJQUFJLENBQUMscUJBQXFCLENBQUMsbUJBQW1CLEVBQUU7c0JBQzVDLElBQUk7S0FnQ3pCO0lBM0JMLHNCQUFJLHNDQUFLO1FBSFQ7O1dBRUc7Ozs7O1FBQ0g7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUM7U0FDN0I7UUFFRDs7V0FFRzs7Ozs7O1FBQ0gsVUFBVSxLQUFVO1lBQ2hCLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztZQUMzQixJQUFJLENBQUMscUJBQXFCLENBQUMsZUFBZSxFQUFFLENBQUM7O1lBRzdDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztTQUNuQjs7O09BWEE7SUFhRCxzQkFBSSxzQ0FBSzs7OztRQUFUO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7U0FDdEI7Ozs7O1FBRUQsVUFBVSxLQUFjO1lBQ3BCLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1lBQ3BCLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQztTQUN4RDs7O09BTEE7SUFZRDs7T0FFRzs7Ozs7SUFDSCx5Q0FBVzs7OztJQUFYO1FBQ0ksSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7S0FDckI7SUFFRDs7T0FFRzs7Ozs7SUFDSCxzQ0FBUTs7OztJQUFSOztRQUVJLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLENBQUM7S0FDekY7O2dCQTFESixTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLGdCQUFnQjtvQkFDMUIsUUFBUSxFQUFFLEVBQUU7aUJBQ2Y7Ozs7Z0JBTFEsb0JBQW9CO2dCQURwQix5QkFBeUI7OzhCQUZsQzs7U0FTYSxtQkFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU2VhcmNoQnVpbGRlckNvbXBvbmVudENvbnRleHQgfSBmcm9tICcuLi9pbnRlcmZhY2VzL2NvbXBvbmVudC1jb250ZXh0LmludGVyZmFjZSc7XG5pbXBvcnQgeyBTZWFyY2hCdWlsZGVyR3JvdXBTZXJ2aWNlIH0gZnJvbSAnLi4vc2VhcmNoLWJ1aWxkZXItZ3JvdXAvc2VhcmNoLWJ1aWxkZXItZ3JvdXAuc2VydmljZSc7XG5pbXBvcnQgeyBTZWFyY2hCdWlsZGVyU2VydmljZSB9IGZyb20gJy4uL3NlYXJjaC1idWlsZGVyLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3V4LWJhc2Utc2VhcmNoJyxcbiAgICB0ZW1wbGF0ZTogJydcbn0pXG5leHBvcnQgY2xhc3MgQmFzZVNlYXJjaENvbXBvbmVudCBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG5cbiAgICB0eXBlOiBzdHJpbmc7XG4gICAgY29uZmlnOiBhbnk7XG4gICAgY29udGV4dDogU2VhcmNoQnVpbGRlckNvbXBvbmVudENvbnRleHQ7XG5cbiAgICBwcml2YXRlIF9pZDogbnVtYmVyID0gdGhpcy5fc2VhcmNoQnVpbGRlclNlcnZpY2UuZ2VuZXJhdGVDb21wb25lbnRJZCgpO1xuICAgIHByaXZhdGUgX3ZhbGlkOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgY3VycmVudCB2YWx1ZSBvZiB0aGUgY29tcG9uZW50XG4gICAgICovXG4gICAgZ2V0IHZhbHVlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jb250ZXh0LnZhbHVlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldCB0aGUgY3VycmVudCB2YWx1ZSBvZiB0aGUgY29tcG9uZW50XG4gICAgICovXG4gICAgc2V0IHZhbHVlKHZhbHVlOiBhbnkpIHtcbiAgICAgICAgdGhpcy5jb250ZXh0LnZhbHVlID0gdmFsdWU7XG4gICAgICAgIHRoaXMuX3NlYXJjaEJ1aWxkZXJTZXJ2aWNlLnF1ZXJ5SGFzQ2hhbmdlZCgpO1xuXG4gICAgICAgIC8vIGlmIHZhbHVlIGhhcyBiZWVuIHNldCBwZXJmb3JtIHZhbGlkYXRpb25cbiAgICAgICAgdGhpcy52YWxpZGF0ZSgpO1xuICAgIH1cblxuICAgIGdldCB2YWxpZCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3ZhbGlkO1xuICAgIH1cblxuICAgIHNldCB2YWxpZCh2YWxpZDogYm9vbGVhbikge1xuICAgICAgICB0aGlzLl92YWxpZCA9IHZhbGlkO1xuICAgICAgICB0aGlzLl9zZWFyY2hCdWlsZGVyU2VydmljZS5zZXRWYWxpZCh0aGlzLl9pZCwgdmFsaWQpO1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIF9zZWFyY2hCdWlsZGVyU2VydmljZTogU2VhcmNoQnVpbGRlclNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgX3NlYXJjaEJ1aWxkZXJHcm91cFNlcnZpY2U6IFNlYXJjaEJ1aWxkZXJHcm91cFNlcnZpY2VcbiAgICApIHsgfVxuXG4gICAgLyoqXG4gICAgICogTWFrZSBzdXJlIHdlIGNsZWFuIHVwIGFmdGVyIG91cnNlbHZlc1xuICAgICAqL1xuICAgIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgICAgICB0aGlzLnZhbGlkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQZXJmb3JtIGFueSByZXF1aXJlZCB2YWxpZGF0aW9uIG9uIHRoZSB2YWx1ZVxuICAgICAqL1xuICAgIHZhbGlkYXRlKCk6IHZvaWQge1xuICAgICAgICAvLyBpZiBhIGN1c3RvbSB2YWxpZGF0aW9uIGZ1bmN0aW9uIGhhcyBiZWVuIHByb3ZpZGVkIHRoZW4gdXNlIGl0XG4gICAgICAgIHRoaXMudmFsaWQgPSB0aGlzLmNvbmZpZy52YWxpZGF0aW9uID8gdGhpcy5jb25maWcudmFsaWRhdGlvbih0aGlzLCB0aGlzLnZhbHVlKSA6IHRydWU7XG4gICAgfVxuXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQmFzZVNlYXJjaENvbXBvbmVudENvbmZpZyB7XG4gICAgbGFiZWw/OiBzdHJpbmc7XG4gICAgcGxhY2Vob2xkZXI/OiBzdHJpbmc7XG4gICAgdmFsaWRhdGlvbj86ICh2YWx1ZTogYW55KSA9PiBib29sZWFuO1xufSJdfQ==