/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { SearchBuilderFocusService } from '../search-builder-focus.service';
import { SearchBuilderGroupService } from './search-builder-group.service';
export class SearchBuilderGroupComponent {
    /**
     * @param {?} searchBuilderGroupService
     * @param {?} _searchBuilderFocusService
     */
    constructor(searchBuilderGroupService, _searchBuilderFocusService) {
        this.searchBuilderGroupService = searchBuilderGroupService;
        this._searchBuilderFocusService = _searchBuilderFocusService;
        this.operator = 'and';
        this.addText = 'Add a field';
        this.showPlaceholder = false;
        this.add = new EventEmitter();
        this.remove = new EventEmitter();
        this.focusIndex = -1;
        this._onDestroy = new Subject();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        // ensure we have a name otherwise throw an error
        if (!this.id) {
            throw new Error('Search builder group must have an id attribute.');
        }
        // otherwise register the group
        this.searchBuilderGroupService.init(this.id);
        // Track focus for child components
        this._searchBuilderFocusService.focus$.pipe(takeUntil(this._onDestroy)).subscribe(focus => {
            this.focusIndex = (focus.groupId === this.id) ? focus.index : -1;
        });
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._onDestroy.next();
        this._onDestroy.complete();
    }
    /**
     * @param {?} event
     * @return {?}
     */
    addField(event) {
        this.add.emit(event);
    }
    /**
     * @param {?} index
     * @param {?} field
     * @return {?}
     */
    removeFieldAtIndex(index, field) {
        this.searchBuilderGroupService.removeAtIndex(index);
        this.remove.emit(field);
    }
    /**
     * @param {?} index
     * @return {?}
     */
    setFocus(index) {
        this._searchBuilderFocusService.setFocus(this.id, index);
    }
    /**
     * @return {?}
     */
    clearFocus() {
        this._searchBuilderFocusService.clearFocus();
    }
}
SearchBuilderGroupComponent.decorators = [
    { type: Component, args: [{
                selector: 'ux-search-builder-group',
                template: "<h4 class=\"search-group-title\">{{ header }}</h4>\n\n<div class=\"search-group-content\">\n\n  <div class=\"search-group-operator search-group-operator-{{ operator }}\"\n    [class.hidden-operator]=\"searchBuilderGroupService.getQuery().length < 2\">{{ operator }}</div>\n\n  <div class=\"search-group-items\">\n\n    <div *ngFor=\"let field of searchBuilderGroupService.getQuery(); let i = index\"\n      class=\"search-group-item-container\"\n      [class.search-group-item-focus]=\"focusIndex === i\"\n      (uxFocusWithin)=\"setFocus(i)\"\n      (uxBlurWithin)=\"clearFocus()\">\n\n      <div class=\"search-group-item\">\n        <ng-container *uxSearchBuilderOutlet=\"field.type; context: field; groupId: id; index: i\"></ng-container>\n      </div>\n\n      <button type=\"button\"\n        aria-label=\"Remove field\"\n        class=\"search-group-item-remove\"\n        (click)=\"removeFieldAtIndex(i, field)\">\n\n        <span class=\"hpe-icon hpe-close\"></span>\n\n      </button>\n\n    </div>\n\n    <!-- Placeholder Item -->\n    <ng-container *ngIf=\"showPlaceholder\">\n\n      <!-- The Default Placeholder -->\n      <div class=\"search-group-item-container placeholder-item\" *ngIf=\"!placeholder\">\n\n        <div class=\"search-group-item\">\n          <label class=\"form-label\">New field</label>\n          <div class=\"form-control\"></div>\n        </div>\n\n      </div>\n\n      <!-- Allow a custom placeholder -->\n      <ng-container *ngTemplateOutlet=\"placeholder\"></ng-container>\n\n    </ng-container>\n\n  </div>\n\n  <button type=\"button\" class=\"search-builder-group-add-field\" (click)=\"addField($event)\">\n    <span class=\"search-builder-group-add-field-icon hpe-icon hpe-add\" aria-hidden=\"true\"></span>\n    <span class=\"search-builder-group-add-field-label\">{{ addText }}</span>\n  </button>\n\n</div>\n\n<hr class=\"search-builder-group-divider\">\n",
                providers: [SearchBuilderGroupService]
            }] }
];
/** @nocollapse */
SearchBuilderGroupComponent.ctorParameters = () => [
    { type: SearchBuilderGroupService },
    { type: SearchBuilderFocusService }
];
SearchBuilderGroupComponent.propDecorators = {
    id: [{ type: Input }],
    header: [{ type: Input }],
    operator: [{ type: Input }],
    addText: [{ type: Input }],
    placeholder: [{ type: Input }],
    showPlaceholder: [{ type: Input }],
    add: [{ type: Output }],
    remove: [{ type: Output }]
};
function SearchBuilderGroupComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    SearchBuilderGroupComponent.prototype.id;
    /** @type {?} */
    SearchBuilderGroupComponent.prototype.header;
    /** @type {?} */
    SearchBuilderGroupComponent.prototype.operator;
    /** @type {?} */
    SearchBuilderGroupComponent.prototype.addText;
    /** @type {?} */
    SearchBuilderGroupComponent.prototype.placeholder;
    /** @type {?} */
    SearchBuilderGroupComponent.prototype.showPlaceholder;
    /** @type {?} */
    SearchBuilderGroupComponent.prototype.add;
    /** @type {?} */
    SearchBuilderGroupComponent.prototype.remove;
    /** @type {?} */
    SearchBuilderGroupComponent.prototype.focusIndex;
    /** @type {?} */
    SearchBuilderGroupComponent.prototype._onDestroy;
    /** @type {?} */
    SearchBuilderGroupComponent.prototype.searchBuilderGroupService;
    /** @type {?} */
    SearchBuilderGroupComponent.prototype._searchBuilderFocusService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLWJ1aWxkZXItZ3JvdXAuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvc2VhcmNoLWJ1aWxkZXIvc2VhcmNoLWJ1aWxkZXItZ3JvdXAvc2VhcmNoLWJ1aWxkZXItZ3JvdXAuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQXFCLE1BQU0sRUFBRSxXQUFXLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDdkcsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzNDLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFFdkMsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDNUUsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFPM0UsTUFBTTs7Ozs7SUFnQkosWUFDUywyQkFDQztRQURELDhCQUF5QixHQUF6Qix5QkFBeUI7UUFDeEIsK0JBQTBCLEdBQTFCLDBCQUEwQjt3QkFkWSxLQUFLO3VCQUMxQixhQUFhOytCQUVKLEtBQUs7bUJBRUMsSUFBSSxZQUFZLEVBQWM7c0JBQ2QsSUFBSSxZQUFZLEVBQTJCOzBCQUVoRixDQUFDLENBQUM7MEJBRUYsSUFBSSxPQUFPLEVBQVE7S0FLbkM7Ozs7SUFFTCxRQUFROztRQUdOLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDYixNQUFNLElBQUksS0FBSyxDQUFDLGlEQUFpRCxDQUFDLENBQUM7U0FDcEU7O1FBR0QsSUFBSSxDQUFDLHlCQUF5QixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7O1FBRzdDLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDeEYsSUFBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLEtBQUssSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNsRSxDQUFDLENBQUM7S0FDSjs7OztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFLENBQUM7S0FDNUI7Ozs7O0lBRUQsUUFBUSxDQUFDLEtBQWlCO1FBQ3hCLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQ3RCOzs7Ozs7SUFFRCxrQkFBa0IsQ0FBQyxLQUFhLEVBQUUsS0FBOEI7UUFDOUQsSUFBSSxDQUFDLHlCQUF5QixDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNwRCxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztLQUN6Qjs7Ozs7SUFFRCxRQUFRLENBQUMsS0FBYTtRQUNwQixJQUFJLENBQUMsMEJBQTBCLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7S0FDMUQ7Ozs7SUFFRCxVQUFVO1FBQ1IsSUFBSSxDQUFDLDBCQUEwQixDQUFDLFVBQVUsRUFBRSxDQUFDO0tBQzlDOzs7WUE5REYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSx5QkFBeUI7Z0JBQ25DLDYzREFBb0Q7Z0JBQ3BELFNBQVMsRUFBRSxDQUFDLHlCQUF5QixDQUFDO2FBQ3ZDOzs7O1lBTlEseUJBQXlCO1lBRHpCLHlCQUF5Qjs7O2lCQVUvQixLQUFLO3FCQUNMLEtBQUs7dUJBQ0wsS0FBSztzQkFDTCxLQUFLOzBCQUNMLEtBQUs7OEJBQ0wsS0FBSztrQkFFTCxNQUFNO3FCQUNOLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uRGVzdHJveSwgT25Jbml0LCBPdXRwdXQsIFRlbXBsYXRlUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcy9TdWJqZWN0JztcbmltcG9ydCB7IFNlYXJjaEJ1aWxkZXJHcm91cFF1ZXJ5IH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9ncm91cC1xdWVyeS5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgU2VhcmNoQnVpbGRlckZvY3VzU2VydmljZSB9IGZyb20gJy4uL3NlYXJjaC1idWlsZGVyLWZvY3VzLnNlcnZpY2UnO1xuaW1wb3J0IHsgU2VhcmNoQnVpbGRlckdyb3VwU2VydmljZSB9IGZyb20gJy4vc2VhcmNoLWJ1aWxkZXItZ3JvdXAuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3V4LXNlYXJjaC1idWlsZGVyLWdyb3VwJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3NlYXJjaC1idWlsZGVyLWdyb3VwLmNvbXBvbmVudC5odG1sJyxcbiAgcHJvdmlkZXJzOiBbU2VhcmNoQnVpbGRlckdyb3VwU2VydmljZV1cbn0pXG5leHBvcnQgY2xhc3MgU2VhcmNoQnVpbGRlckdyb3VwQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuXG4gIEBJbnB1dCgpIGlkOiBzdHJpbmc7XG4gIEBJbnB1dCgpIGhlYWRlcjogc3RyaW5nO1xuICBASW5wdXQoKSBvcGVyYXRvcjogU2VhcmNoQnVpbGRlckdyb3VwT3BlcmF0b3IgPSAnYW5kJztcbiAgQElucHV0KCkgYWRkVGV4dDogc3RyaW5nID0gJ0FkZCBhIGZpZWxkJztcbiAgQElucHV0KCkgcGxhY2Vob2xkZXI6IFRlbXBsYXRlUmVmPGFueT47XG4gIEBJbnB1dCgpIHNob3dQbGFjZWhvbGRlcjogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIEBPdXRwdXQoKSBhZGQ6IEV2ZW50RW1pdHRlcjxNb3VzZUV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8TW91c2VFdmVudD4oKTtcbiAgQE91dHB1dCgpIHJlbW92ZTogRXZlbnRFbWl0dGVyPFNlYXJjaEJ1aWxkZXJHcm91cFF1ZXJ5PiA9IG5ldyBFdmVudEVtaXR0ZXI8U2VhcmNoQnVpbGRlckdyb3VwUXVlcnk+KCk7XG5cbiAgZm9jdXNJbmRleDogbnVtYmVyID0gLTE7XG5cbiAgcHJpdmF0ZSBfb25EZXN0cm95ID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgc2VhcmNoQnVpbGRlckdyb3VwU2VydmljZTogU2VhcmNoQnVpbGRlckdyb3VwU2VydmljZSxcbiAgICBwcml2YXRlIF9zZWFyY2hCdWlsZGVyRm9jdXNTZXJ2aWNlOiBTZWFyY2hCdWlsZGVyRm9jdXNTZXJ2aWNlXG4gICkgeyB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG5cbiAgICAvLyBlbnN1cmUgd2UgaGF2ZSBhIG5hbWUgb3RoZXJ3aXNlIHRocm93IGFuIGVycm9yXG4gICAgaWYgKCF0aGlzLmlkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1NlYXJjaCBidWlsZGVyIGdyb3VwIG11c3QgaGF2ZSBhbiBpZCBhdHRyaWJ1dGUuJyk7XG4gICAgfVxuXG4gICAgLy8gb3RoZXJ3aXNlIHJlZ2lzdGVyIHRoZSBncm91cFxuICAgIHRoaXMuc2VhcmNoQnVpbGRlckdyb3VwU2VydmljZS5pbml0KHRoaXMuaWQpO1xuXG4gICAgLy8gVHJhY2sgZm9jdXMgZm9yIGNoaWxkIGNvbXBvbmVudHNcbiAgICB0aGlzLl9zZWFyY2hCdWlsZGVyRm9jdXNTZXJ2aWNlLmZvY3VzJC5waXBlKHRha2VVbnRpbCh0aGlzLl9vbkRlc3Ryb3kpKS5zdWJzY3JpYmUoZm9jdXMgPT4ge1xuICAgICAgdGhpcy5mb2N1c0luZGV4ID0gKGZvY3VzLmdyb3VwSWQgPT09IHRoaXMuaWQpID8gZm9jdXMuaW5kZXggOiAtMTtcbiAgICB9KTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuX29uRGVzdHJveS5uZXh0KCk7XG4gICAgdGhpcy5fb25EZXN0cm95LmNvbXBsZXRlKCk7XG4gIH1cblxuICBhZGRGaWVsZChldmVudDogTW91c2VFdmVudCk6IHZvaWQge1xuICAgIHRoaXMuYWRkLmVtaXQoZXZlbnQpO1xuICB9XG5cbiAgcmVtb3ZlRmllbGRBdEluZGV4KGluZGV4OiBudW1iZXIsIGZpZWxkOiBTZWFyY2hCdWlsZGVyR3JvdXBRdWVyeSk6IHZvaWQge1xuICAgIHRoaXMuc2VhcmNoQnVpbGRlckdyb3VwU2VydmljZS5yZW1vdmVBdEluZGV4KGluZGV4KTtcbiAgICB0aGlzLnJlbW92ZS5lbWl0KGZpZWxkKTtcbiAgfVxuXG4gIHNldEZvY3VzKGluZGV4OiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLl9zZWFyY2hCdWlsZGVyRm9jdXNTZXJ2aWNlLnNldEZvY3VzKHRoaXMuaWQsIGluZGV4KTtcbiAgfVxuXG4gIGNsZWFyRm9jdXMoKTogdm9pZCB7XG4gICAgdGhpcy5fc2VhcmNoQnVpbGRlckZvY3VzU2VydmljZS5jbGVhckZvY3VzKCk7XG4gIH1cbn1cblxuZXhwb3J0IHR5cGUgU2VhcmNoQnVpbGRlckdyb3VwT3BlcmF0b3IgPSAnYW5kJyB8ICdvcicgfCAnbm90JztcbiJdfQ==