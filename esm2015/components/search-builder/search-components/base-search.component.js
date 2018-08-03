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
            }] }
];
/** @nocollapse */
BaseSearchComponent.ctorParameters = () => [
    { type: SearchBuilderService },
    { type: SearchBuilderGroupService }
];
function BaseSearchComponent_tsickle_Closure_declarations() {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS1zZWFyY2guY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvc2VhcmNoLWJ1aWxkZXIvc2VhcmNoLWNvbXBvbmVudHMvYmFzZS1zZWFyY2guY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFhLE1BQU0sZUFBZSxDQUFDO0FBRXJELE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLHNEQUFzRCxDQUFDO0FBQ2pHLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBTWpFLE1BQU07Ozs7O0lBb0NGLFlBQ1ksdUJBQ0E7UUFEQSwwQkFBcUIsR0FBckIscUJBQXFCO1FBQ3JCLCtCQUEwQixHQUExQiwwQkFBMEI7bUJBaENoQixJQUFJLENBQUMscUJBQXFCLENBQUMsbUJBQW1CLEVBQUU7c0JBQzVDLElBQUk7S0FnQ3pCOzs7OztJQTNCTCxJQUFJLEtBQUs7UUFDTCxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUM7S0FDN0I7Ozs7OztJQUtELElBQUksS0FBSyxDQUFDLEtBQVU7UUFDaEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQzNCLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxlQUFlLEVBQUUsQ0FBQzs7UUFHN0MsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO0tBQ25COzs7O0lBRUQsSUFBSSxLQUFLO1FBQ0wsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7S0FDdEI7Ozs7O0lBRUQsSUFBSSxLQUFLLENBQUMsS0FBYztRQUNwQixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUNwQixJQUFJLENBQUMscUJBQXFCLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLENBQUM7S0FDeEQ7Ozs7O0lBVUQsV0FBVztRQUNQLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO0tBQ3JCOzs7OztJQUtELFFBQVE7O1FBRUosSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0tBQ3pGOzs7WUExREosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxnQkFBZ0I7Z0JBQzFCLFFBQVEsRUFBRSxFQUFFO2FBQ2Y7Ozs7WUFMUSxvQkFBb0I7WUFEcEIseUJBQXlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFNlYXJjaEJ1aWxkZXJDb21wb25lbnRDb250ZXh0IH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9jb21wb25lbnQtY29udGV4dC5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgU2VhcmNoQnVpbGRlckdyb3VwU2VydmljZSB9IGZyb20gJy4uL3NlYXJjaC1idWlsZGVyLWdyb3VwL3NlYXJjaC1idWlsZGVyLWdyb3VwLnNlcnZpY2UnO1xuaW1wb3J0IHsgU2VhcmNoQnVpbGRlclNlcnZpY2UgfSBmcm9tICcuLi9zZWFyY2gtYnVpbGRlci5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd1eC1iYXNlLXNlYXJjaCcsXG4gICAgdGVtcGxhdGU6ICcnXG59KVxuZXhwb3J0IGNsYXNzIEJhc2VTZWFyY2hDb21wb25lbnQgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuXG4gICAgdHlwZTogc3RyaW5nO1xuICAgIGNvbmZpZzogYW55O1xuICAgIGNvbnRleHQ6IFNlYXJjaEJ1aWxkZXJDb21wb25lbnRDb250ZXh0O1xuXG4gICAgcHJpdmF0ZSBfaWQ6IG51bWJlciA9IHRoaXMuX3NlYXJjaEJ1aWxkZXJTZXJ2aWNlLmdlbmVyYXRlQ29tcG9uZW50SWQoKTtcbiAgICBwcml2YXRlIF92YWxpZDogYm9vbGVhbiA9IHRydWU7XG5cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIGN1cnJlbnQgdmFsdWUgb2YgdGhlIGNvbXBvbmVudFxuICAgICAqL1xuICAgIGdldCB2YWx1ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29udGV4dC52YWx1ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXQgdGhlIGN1cnJlbnQgdmFsdWUgb2YgdGhlIGNvbXBvbmVudFxuICAgICAqL1xuICAgIHNldCB2YWx1ZSh2YWx1ZTogYW55KSB7XG4gICAgICAgIHRoaXMuY29udGV4dC52YWx1ZSA9IHZhbHVlO1xuICAgICAgICB0aGlzLl9zZWFyY2hCdWlsZGVyU2VydmljZS5xdWVyeUhhc0NoYW5nZWQoKTtcblxuICAgICAgICAvLyBpZiB2YWx1ZSBoYXMgYmVlbiBzZXQgcGVyZm9ybSB2YWxpZGF0aW9uXG4gICAgICAgIHRoaXMudmFsaWRhdGUoKTtcbiAgICB9XG5cbiAgICBnZXQgdmFsaWQoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl92YWxpZDtcbiAgICB9XG5cbiAgICBzZXQgdmFsaWQodmFsaWQ6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5fdmFsaWQgPSB2YWxpZDtcbiAgICAgICAgdGhpcy5fc2VhcmNoQnVpbGRlclNlcnZpY2Uuc2V0VmFsaWQodGhpcy5faWQsIHZhbGlkKTtcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBfc2VhcmNoQnVpbGRlclNlcnZpY2U6IFNlYXJjaEJ1aWxkZXJTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIF9zZWFyY2hCdWlsZGVyR3JvdXBTZXJ2aWNlOiBTZWFyY2hCdWlsZGVyR3JvdXBTZXJ2aWNlXG4gICAgKSB7IH1cblxuICAgIC8qKlxuICAgICAqIE1ha2Ugc3VyZSB3ZSBjbGVhbiB1cCBhZnRlciBvdXJzZWx2ZXNcbiAgICAgKi9cbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy52YWxpZCA9IHRydWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUGVyZm9ybSBhbnkgcmVxdWlyZWQgdmFsaWRhdGlvbiBvbiB0aGUgdmFsdWVcbiAgICAgKi9cbiAgICB2YWxpZGF0ZSgpOiB2b2lkIHtcbiAgICAgICAgLy8gaWYgYSBjdXN0b20gdmFsaWRhdGlvbiBmdW5jdGlvbiBoYXMgYmVlbiBwcm92aWRlZCB0aGVuIHVzZSBpdFxuICAgICAgICB0aGlzLnZhbGlkID0gdGhpcy5jb25maWcudmFsaWRhdGlvbiA/IHRoaXMuY29uZmlnLnZhbGlkYXRpb24odGhpcywgdGhpcy52YWx1ZSkgOiB0cnVlO1xuICAgIH1cblxufVxuXG5leHBvcnQgaW50ZXJmYWNlIEJhc2VTZWFyY2hDb21wb25lbnRDb25maWcge1xuICAgIGxhYmVsPzogc3RyaW5nO1xuICAgIHBsYWNlaG9sZGVyPzogc3RyaW5nO1xuICAgIHZhbGlkYXRpb24/OiAodmFsdWU6IGFueSkgPT4gYm9vbGVhbjtcbn0iXX0=