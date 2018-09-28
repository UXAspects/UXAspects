/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component } from '@angular/core';
import { SearchBuilderService } from '../search-builder.service';
var BaseSearchComponent = /** @class */ (function () {
    function BaseSearchComponent(_searchBuilderService) {
        this._searchBuilderService = _searchBuilderService;
        this._id = this._searchBuilderService.generateComponentId();
        this._valid = true;
    }
    Object.defineProperty(BaseSearchComponent.prototype, "id", {
        get: /**
         * @return {?}
         */
        function () {
            return "ux-search-builder-search-component-" + this._id;
        },
        enumerable: true,
        configurable: true
    });
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
                }] }
    ];
    /** @nocollapse */
    BaseSearchComponent.ctorParameters = function () { return [
        { type: SearchBuilderService }
    ]; };
    return BaseSearchComponent;
}());
export { BaseSearchComponent };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS1zZWFyY2guY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvc2VhcmNoLWJ1aWxkZXIvc2VhcmNoLWNvbXBvbmVudHMvYmFzZS1zZWFyY2guY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFhLE1BQU0sZUFBZSxDQUFDO0FBRXJELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLDJCQUEyQixDQUFDOztJQStDN0QsNkJBQW9CLHFCQUEyQztRQUEzQywwQkFBcUIsR0FBckIscUJBQXFCLENBQXNCO21CQUh6QyxJQUFJLENBQUMscUJBQXFCLENBQUMsbUJBQW1CLEVBQUU7c0JBQzVDLElBQUk7S0FFc0M7SUF2Q3BFLHNCQUFJLG1DQUFFOzs7O1FBQU47WUFDSSxNQUFNLENBQUMsd0NBQXNDLElBQUksQ0FBQyxHQUFLLENBQUM7U0FDM0Q7OztPQUFBO0lBVUQsc0JBQUksc0NBQUs7UUFIVDs7V0FFRzs7Ozs7UUFDSDtZQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQztTQUM3QjtRQUVEOztXQUVHOzs7Ozs7UUFDSCxVQUFVLEtBQVU7WUFDaEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1lBQzNCLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxlQUFlLEVBQUUsQ0FBQzs7WUFHN0MsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1NBQ25COzs7T0FYQTtJQWFELHNCQUFJLHNDQUFLOzs7O1FBQVQ7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztTQUN0Qjs7Ozs7UUFFRCxVQUFVLEtBQWM7WUFDcEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7WUFDcEIsSUFBSSxDQUFDLHFCQUFxQixDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFDO1NBQ3hEOzs7T0FMQTtJQVlEOztPQUVHOzs7OztJQUNILHlDQUFXOzs7O0lBQVg7UUFDSSxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztLQUNyQjtJQUVEOztPQUVHOzs7OztJQUNILHNDQUFROzs7O0lBQVI7O1FBRUksSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0tBQ3pGOztnQkE1REosU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSxnQkFBZ0I7b0JBQzFCLFFBQVEsRUFBRSxFQUFFO2lCQUNmOzs7O2dCQUxRLG9CQUFvQjs7OEJBRjdCOztTQVFhLG1CQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTZWFyY2hCdWlsZGVyQ29tcG9uZW50Q29udGV4dCB9IGZyb20gJy4uL2ludGVyZmFjZXMvY29tcG9uZW50LWNvbnRleHQuaW50ZXJmYWNlJztcbmltcG9ydCB7IFNlYXJjaEJ1aWxkZXJTZXJ2aWNlIH0gZnJvbSAnLi4vc2VhcmNoLWJ1aWxkZXIuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAndXgtYmFzZS1zZWFyY2gnLFxuICAgIHRlbXBsYXRlOiAnJ1xufSlcbmV4cG9ydCBjbGFzcyBCYXNlU2VhcmNoQ29tcG9uZW50IGltcGxlbWVudHMgT25EZXN0cm95IHtcblxuICAgIGdldCBpZCgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gYHV4LXNlYXJjaC1idWlsZGVyLXNlYXJjaC1jb21wb25lbnQtJHt0aGlzLl9pZH1gO1xuICAgIH1cblxuICAgIHR5cGU6IHN0cmluZztcbiAgICBjb25maWc6IGFueTtcbiAgICBjb250ZXh0OiBTZWFyY2hCdWlsZGVyQ29tcG9uZW50Q29udGV4dDtcbiAgICBmb2N1czogYm9vbGVhbjtcblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgY3VycmVudCB2YWx1ZSBvZiB0aGUgY29tcG9uZW50XG4gICAgICovXG4gICAgZ2V0IHZhbHVlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jb250ZXh0LnZhbHVlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldCB0aGUgY3VycmVudCB2YWx1ZSBvZiB0aGUgY29tcG9uZW50XG4gICAgICovXG4gICAgc2V0IHZhbHVlKHZhbHVlOiBhbnkpIHtcbiAgICAgICAgdGhpcy5jb250ZXh0LnZhbHVlID0gdmFsdWU7XG4gICAgICAgIHRoaXMuX3NlYXJjaEJ1aWxkZXJTZXJ2aWNlLnF1ZXJ5SGFzQ2hhbmdlZCgpO1xuXG4gICAgICAgIC8vIGlmIHZhbHVlIGhhcyBiZWVuIHNldCBwZXJmb3JtIHZhbGlkYXRpb25cbiAgICAgICAgdGhpcy52YWxpZGF0ZSgpO1xuICAgIH1cblxuICAgIGdldCB2YWxpZCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3ZhbGlkO1xuICAgIH1cblxuICAgIHNldCB2YWxpZCh2YWxpZDogYm9vbGVhbikge1xuICAgICAgICB0aGlzLl92YWxpZCA9IHZhbGlkO1xuICAgICAgICB0aGlzLl9zZWFyY2hCdWlsZGVyU2VydmljZS5zZXRWYWxpZCh0aGlzLl9pZCwgdmFsaWQpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2lkOiBudW1iZXIgPSB0aGlzLl9zZWFyY2hCdWlsZGVyU2VydmljZS5nZW5lcmF0ZUNvbXBvbmVudElkKCk7XG4gICAgcHJpdmF0ZSBfdmFsaWQ6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfc2VhcmNoQnVpbGRlclNlcnZpY2U6IFNlYXJjaEJ1aWxkZXJTZXJ2aWNlKSB7IH1cblxuICAgIC8qKlxuICAgICAqIE1ha2Ugc3VyZSB3ZSBjbGVhbiB1cCBhZnRlciBvdXJzZWx2ZXNcbiAgICAgKi9cbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy52YWxpZCA9IHRydWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUGVyZm9ybSBhbnkgcmVxdWlyZWQgdmFsaWRhdGlvbiBvbiB0aGUgdmFsdWVcbiAgICAgKi9cbiAgICB2YWxpZGF0ZSgpOiB2b2lkIHtcbiAgICAgICAgLy8gaWYgYSBjdXN0b20gdmFsaWRhdGlvbiBmdW5jdGlvbiBoYXMgYmVlbiBwcm92aWRlZCB0aGVuIHVzZSBpdFxuICAgICAgICB0aGlzLnZhbGlkID0gdGhpcy5jb25maWcudmFsaWRhdGlvbiA/IHRoaXMuY29uZmlnLnZhbGlkYXRpb24odGhpcywgdGhpcy52YWx1ZSkgOiB0cnVlO1xuICAgIH1cblxufVxuXG5leHBvcnQgaW50ZXJmYWNlIEJhc2VTZWFyY2hDb21wb25lbnRDb25maWcge1xuICAgIGxhYmVsPzogc3RyaW5nO1xuICAgIHBsYWNlaG9sZGVyPzogc3RyaW5nO1xuICAgIHZhbGlkYXRpb24/OiAodmFsdWU6IGFueSkgPT4gYm9vbGVhbjtcbn0iXX0=