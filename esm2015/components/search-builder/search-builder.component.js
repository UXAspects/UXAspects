/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { distinctUntilChanged } from 'rxjs/operators';
import { SearchBuilderService } from './search-builder.service';
export class SearchBuilderComponent {
    /**
     * Register the default search builder components
     * @param {?} _searchBuilderService
     */
    constructor(_searchBuilderService) {
        this._searchBuilderService = _searchBuilderService;
        this.queryChange = new EventEmitter();
        this.valid = new EventEmitter(true);
        // watch for any query changes
        this._querySubscription = _searchBuilderService.queryChange.subscribe(query => this.queryChange.emit(query));
        // watch for any changes to the validation
        this._validSubscription = _searchBuilderService.validationChange.pipe(distinctUntilChanged()).subscribe(valid => this.valid.emit(valid));
    }
    /**
     * @param {?} components
     * @return {?}
     */
    set components(components) {
        this._searchBuilderService.registerComponents(components);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set query(value) {
        this._searchBuilderService.setQuery(value);
    }
    /**
     * @return {?}
     */
    get query() {
        return this._searchBuilderService.getQuery();
    }
    /**
     * Remove any subscriptions and cleanup
     * @return {?}
     */
    ngOnDestroy() {
        this._querySubscription.unsubscribe();
        this._validSubscription.unsubscribe();
    }
}
SearchBuilderComponent.decorators = [
    { type: Component, args: [{
                selector: 'ux-search-builder',
                template: `<ng-content></ng-content>`,
                providers: [SearchBuilderService]
            },] },
];
/** @nocollapse */
SearchBuilderComponent.ctorParameters = () => [
    { type: SearchBuilderService, },
];
SearchBuilderComponent.propDecorators = {
    "components": [{ type: Input },],
    "query": [{ type: Input },],
    "queryChange": [{ type: Output },],
    "valid": [{ type: Output },],
};
function SearchBuilderComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    SearchBuilderComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    SearchBuilderComponent.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    SearchBuilderComponent.propDecorators;
    /** @type {?} */
    SearchBuilderComponent.prototype.queryChange;
    /** @type {?} */
    SearchBuilderComponent.prototype.valid;
    /** @type {?} */
    SearchBuilderComponent.prototype._querySubscription;
    /** @type {?} */
    SearchBuilderComponent.prototype._validSubscription;
    /** @type {?} */
    SearchBuilderComponent.prototype._searchBuilderService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLWJ1aWxkZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvc2VhcmNoLWJ1aWxkZXIvc2VhcmNoLWJ1aWxkZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQWEsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2xGLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBSXRELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBT2hFLE1BQU07Ozs7O0lBeUJKLFlBQW9CLHFCQUEyQztRQUEzQywwQkFBcUIsR0FBckIscUJBQXFCLENBQXNCOzJCQVRMLElBQUksWUFBWSxFQUFzQjtxQkFDdkQsSUFBSSxZQUFZLENBQVUsSUFBSSxDQUFDOztRQVd0RSxJQUFJLENBQUMsa0JBQWtCLEdBQUcscUJBQXFCLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQzs7UUFHN0csSUFBSSxDQUFDLGtCQUFrQixHQUFHLHFCQUFxQixDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0tBQzFJOzs7OztRQTdCRyxVQUFVLENBQUMsVUFBOEM7UUFDM0QsSUFBSSxDQUFDLHFCQUFxQixDQUFDLGtCQUFrQixDQUFDLFVBQVUsQ0FBQyxDQUFDOzs7Ozs7UUFJeEQsS0FBSyxDQUFDLEtBQXlCO1FBQ2pDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7Ozs7O0lBRzdDLElBQUksS0FBSztRQUNQLE1BQU0sQ0FBQyxJQUFJLENBQUMscUJBQXFCLENBQUMsUUFBUSxFQUFFLENBQUM7S0FDOUM7Ozs7O0lBdUJELFdBQVc7UUFDVCxJQUFJLENBQUMsa0JBQWtCLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDdEMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFdBQVcsRUFBRSxDQUFDO0tBQ3ZDOzs7WUE3Q0YsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxtQkFBbUI7Z0JBQzdCLFFBQVEsRUFBRSwyQkFBMkI7Z0JBQ3JDLFNBQVMsRUFBRSxDQUFDLG9CQUFvQixDQUFDO2FBQ2xDOzs7O1lBTlEsb0JBQW9COzs7MkJBUzFCLEtBQUs7c0JBS0wsS0FBSzs0QkFTTCxNQUFNO3NCQUNOLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uRGVzdHJveSwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBkaXN0aW5jdFVudGlsQ2hhbmdlZCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMvU3Vic2NyaXB0aW9uJztcbmltcG9ydCB7IFNlYXJjaEJ1aWxkZXJDb21wb25lbnREZWZpbml0aW9uIH0gZnJvbSAnLi9pbnRlcmZhY2VzL2NvbXBvbmVudC1kZWZpbml0aW9uLmludGVyZmFjZSc7XG5pbXBvcnQgeyBTZWFyY2hCdWlsZGVyUXVlcnkgfSBmcm9tICcuL2ludGVyZmFjZXMvcXVlcnkuaW50ZXJmYWNlJztcbmltcG9ydCB7IFNlYXJjaEJ1aWxkZXJTZXJ2aWNlIH0gZnJvbSAnLi9zZWFyY2gtYnVpbGRlci5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAndXgtc2VhcmNoLWJ1aWxkZXInLFxuICB0ZW1wbGF0ZTogYDxuZy1jb250ZW50PjwvbmctY29udGVudD5gLFxuICBwcm92aWRlcnM6IFtTZWFyY2hCdWlsZGVyU2VydmljZV1cbn0pXG5leHBvcnQgY2xhc3MgU2VhcmNoQnVpbGRlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG5cbiAgQElucHV0KClcbiAgc2V0IGNvbXBvbmVudHMoY29tcG9uZW50czogU2VhcmNoQnVpbGRlckNvbXBvbmVudERlZmluaXRpb25bXSkge1xuICAgIHRoaXMuX3NlYXJjaEJ1aWxkZXJTZXJ2aWNlLnJlZ2lzdGVyQ29tcG9uZW50cyhjb21wb25lbnRzKTtcbiAgfVxuXG4gIEBJbnB1dCgpXG4gIHNldCBxdWVyeSh2YWx1ZTogU2VhcmNoQnVpbGRlclF1ZXJ5KSB7XG4gICAgdGhpcy5fc2VhcmNoQnVpbGRlclNlcnZpY2Uuc2V0UXVlcnkodmFsdWUpO1xuICB9XG5cbiAgZ2V0IHF1ZXJ5KCkge1xuICAgIHJldHVybiB0aGlzLl9zZWFyY2hCdWlsZGVyU2VydmljZS5nZXRRdWVyeSgpO1xuICB9XG5cbiAgQE91dHB1dCgpIHF1ZXJ5Q2hhbmdlOiBFdmVudEVtaXR0ZXI8U2VhcmNoQnVpbGRlclF1ZXJ5PiA9IG5ldyBFdmVudEVtaXR0ZXI8U2VhcmNoQnVpbGRlclF1ZXJ5PigpO1xuICBAT3V0cHV0KCkgdmFsaWQ6IEV2ZW50RW1pdHRlcjxib29sZWFuPiA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4odHJ1ZSk7XG5cbiAgcHJpdmF0ZSBfcXVlcnlTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcbiAgcHJpdmF0ZSBfdmFsaWRTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICAvKipcbiAgICogUmVnaXN0ZXIgdGhlIGRlZmF1bHQgc2VhcmNoIGJ1aWxkZXIgY29tcG9uZW50c1xuICAgKi9cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfc2VhcmNoQnVpbGRlclNlcnZpY2U6IFNlYXJjaEJ1aWxkZXJTZXJ2aWNlKSB7XG5cbiAgICAvLyB3YXRjaCBmb3IgYW55IHF1ZXJ5IGNoYW5nZXNcbiAgICB0aGlzLl9xdWVyeVN1YnNjcmlwdGlvbiA9IF9zZWFyY2hCdWlsZGVyU2VydmljZS5xdWVyeUNoYW5nZS5zdWJzY3JpYmUocXVlcnkgPT4gdGhpcy5xdWVyeUNoYW5nZS5lbWl0KHF1ZXJ5KSk7XG5cbiAgICAvLyB3YXRjaCBmb3IgYW55IGNoYW5nZXMgdG8gdGhlIHZhbGlkYXRpb25cbiAgICB0aGlzLl92YWxpZFN1YnNjcmlwdGlvbiA9IF9zZWFyY2hCdWlsZGVyU2VydmljZS52YWxpZGF0aW9uQ2hhbmdlLnBpcGUoZGlzdGluY3RVbnRpbENoYW5nZWQoKSkuc3Vic2NyaWJlKHZhbGlkID0+IHRoaXMudmFsaWQuZW1pdCh2YWxpZCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZSBhbnkgc3Vic2NyaXB0aW9ucyBhbmQgY2xlYW51cFxuICAgKi9cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5fcXVlcnlTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl92YWxpZFN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICB9XG5cbn1cbiJdfQ==