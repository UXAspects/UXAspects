/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, Input, Output, EventEmitter, TemplateRef } from '@angular/core';
import { SearchBuilderGroupService } from './search-builder-group.service';
import { SearchBuilderService } from '../search-builder.service';
export class SearchBuilderGroupComponent {
    /**
     * @param {?} searchBuilderGroupService
     * @param {?} _searchBuilderService
     */
    constructor(searchBuilderGroupService, _searchBuilderService) {
        this.searchBuilderGroupService = searchBuilderGroupService;
        this._searchBuilderService = _searchBuilderService;
        this.operator = 'and';
        this.addText = 'Add a field';
        this.showPlaceholder = false;
        this.add = new EventEmitter();
        this.remove = new EventEmitter();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        // ensure we have a name otherwise throw an error
        if (!this.id) {
            throw new Error('Search builder group must have a name attribute.');
        }
        // otherwise register the group
        this.searchBuilderGroupService.init(this.id);
    }
    /**
     * @param {?} field
     * @return {?}
     */
    removeField(field) {
        this.searchBuilderGroupService.remove(field);
        this.remove.emit(field);
    }
}
SearchBuilderGroupComponent.decorators = [
    { type: Component, args: [{
                selector: 'ux-search-builder-group',
                template: "<h4 class=\"search-group-title\">{{ header }}</h4>\n\n<main class=\"search-group-content\">\n\n  <section class=\"search-group-operator search-group-operator-{{ operator }}\" [class.hidden-operator]=\"searchBuilderGroupService.getQuery().length < 2\">{{ operator }}</section>\n\n  <section class=\"search-group-items\">\n\n    <div class=\"search-group-item-container\" *ngFor=\"let field of searchBuilderGroupService.getQuery()\">\n\n      <div class=\"search-group-item\">\n        <ng-container *uxSearchBuilderOutlet=\"field.type; context: field\"></ng-container>\n      </div>\n\n      <div class=\"search-group-item-remove\" (click)=\"removeField(field)\">\n        <span class=\"hpe-icon hpe-close\"></span>\n      </div>\n    </div>\n\n    <!-- Placeholder Item -->\n    <ng-container *ngIf=\"showPlaceholder\">\n\n      <!-- The Default Placeholder -->\n      <div class=\"search-group-item-container placeholder-item\" *ngIf=\"!placeholder\">\n        \n        <div class=\"search-group-item\">\n          <label class=\"form-label\">New field</label>\n          <div class=\"form-control\"></div>\n        </div>\n  \n      </div>\n\n      <!-- Allow a custom placeholder -->\n    <ng-container *ngTemplateOutlet=\"placeholder\"></ng-container>\n\n    </ng-container>\n\n  </section>\n\n  <section class=\"search-builder-group-add-field\" (click)=\"add.emit($event)\">\n\n    <button type=\"button\" class=\"btn btn-icon btn-circular button-accent\" aria-label=\"Add Field\">\n      <span class=\"hpe-icon hpe-add\" aria-hidden=\"true\"></span>\n    </button>\n\n    <span class=\"search-builder-group-add-field-label\">{{ addText }}</span>\n\n  </section>\n\n</main>\n\n<hr class=\"search-builder-group-divider\">\n",
                providers: [SearchBuilderGroupService]
            }] }
];
/** @nocollapse */
SearchBuilderGroupComponent.ctorParameters = () => [
    { type: SearchBuilderGroupService },
    { type: SearchBuilderService }
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
    SearchBuilderGroupComponent.prototype.searchBuilderGroupService;
    /** @type {?} */
    SearchBuilderGroupComponent.prototype._searchBuilderService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLWJ1aWxkZXItZ3JvdXAuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvc2VhcmNoLWJ1aWxkZXIvc2VhcmNoLWJ1aWxkZXItZ3JvdXAvc2VhcmNoLWJ1aWxkZXItZ3JvdXAuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLFdBQVcsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM1RixPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUMzRSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQVFqRSxNQUFNOzs7OztJQVlKLFlBQW1CLHlCQUFvRCxFQUFVLHFCQUEyQztRQUF6Ryw4QkFBeUIsR0FBekIseUJBQXlCLENBQTJCO1FBQVUsMEJBQXFCLEdBQXJCLHFCQUFxQixDQUFzQjt3QkFSNUUsS0FBSzt1QkFDMUIsYUFBYTsrQkFFSixLQUFLO21CQUVDLElBQUksWUFBWSxFQUFjO3NCQUNkLElBQUksWUFBWSxFQUEyQjtLQUU0Qjs7OztJQUVqSSxRQUFROztRQUdOLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDYixNQUFNLElBQUksS0FBSyxDQUFDLGtEQUFrRCxDQUFDLENBQUM7U0FDckU7O1FBR0QsSUFBSSxDQUFDLHlCQUF5QixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7S0FDOUM7Ozs7O0lBRUQsV0FBVyxDQUFDLEtBQThCO1FBQ3hDLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDN0MsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDekI7OztZQWpDRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLHlCQUF5QjtnQkFDbkMsNHNEQUFvRDtnQkFDcEQsU0FBUyxFQUFFLENBQUMseUJBQXlCLENBQUM7YUFDdkM7Ozs7WUFSUSx5QkFBeUI7WUFDekIsb0JBQW9COzs7aUJBVTFCLEtBQUs7cUJBQ0wsS0FBSzt1QkFDTCxLQUFLO3NCQUNMLEtBQUs7MEJBQ0wsS0FBSzs4QkFDTCxLQUFLO2tCQUVMLE1BQU07cUJBQ04sTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIFRlbXBsYXRlUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTZWFyY2hCdWlsZGVyR3JvdXBTZXJ2aWNlIH0gZnJvbSAnLi9zZWFyY2gtYnVpbGRlci1ncm91cC5zZXJ2aWNlJztcbmltcG9ydCB7IFNlYXJjaEJ1aWxkZXJTZXJ2aWNlIH0gZnJvbSAnLi4vc2VhcmNoLWJ1aWxkZXIuc2VydmljZSc7XG5pbXBvcnQgeyBTZWFyY2hCdWlsZGVyR3JvdXBRdWVyeSB9IGZyb20gJy4uL2ludGVyZmFjZXMvZ3JvdXAtcXVlcnkuaW50ZXJmYWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAndXgtc2VhcmNoLWJ1aWxkZXItZ3JvdXAnLFxuICB0ZW1wbGF0ZVVybDogJy4vc2VhcmNoLWJ1aWxkZXItZ3JvdXAuY29tcG9uZW50Lmh0bWwnLFxuICBwcm92aWRlcnM6IFtTZWFyY2hCdWlsZGVyR3JvdXBTZXJ2aWNlXVxufSlcbmV4cG9ydCBjbGFzcyBTZWFyY2hCdWlsZGVyR3JvdXBDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIEBJbnB1dCgpIGlkOiBzdHJpbmc7XG4gIEBJbnB1dCgpIGhlYWRlcjogc3RyaW5nO1xuICBASW5wdXQoKSBvcGVyYXRvcjogU2VhcmNoQnVpbGRlckdyb3VwT3BlcmF0b3IgPSAnYW5kJztcbiAgQElucHV0KCkgYWRkVGV4dDogc3RyaW5nID0gJ0FkZCBhIGZpZWxkJztcbiAgQElucHV0KCkgcGxhY2Vob2xkZXI6IFRlbXBsYXRlUmVmPGFueT47XG4gIEBJbnB1dCgpIHNob3dQbGFjZWhvbGRlcjogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIEBPdXRwdXQoKSBhZGQ6IEV2ZW50RW1pdHRlcjxNb3VzZUV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8TW91c2VFdmVudD4oKTtcbiAgQE91dHB1dCgpIHJlbW92ZTogRXZlbnRFbWl0dGVyPFNlYXJjaEJ1aWxkZXJHcm91cFF1ZXJ5PiA9IG5ldyBFdmVudEVtaXR0ZXI8U2VhcmNoQnVpbGRlckdyb3VwUXVlcnk+KCk7XG5cbiAgY29uc3RydWN0b3IocHVibGljIHNlYXJjaEJ1aWxkZXJHcm91cFNlcnZpY2U6IFNlYXJjaEJ1aWxkZXJHcm91cFNlcnZpY2UsIHByaXZhdGUgX3NlYXJjaEJ1aWxkZXJTZXJ2aWNlOiBTZWFyY2hCdWlsZGVyU2VydmljZSkgeyB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG5cbiAgICAvLyBlbnN1cmUgd2UgaGF2ZSBhIG5hbWUgb3RoZXJ3aXNlIHRocm93IGFuIGVycm9yXG4gICAgaWYgKCF0aGlzLmlkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1NlYXJjaCBidWlsZGVyIGdyb3VwIG11c3QgaGF2ZSBhIG5hbWUgYXR0cmlidXRlLicpO1xuICAgIH1cblxuICAgIC8vIG90aGVyd2lzZSByZWdpc3RlciB0aGUgZ3JvdXBcbiAgICB0aGlzLnNlYXJjaEJ1aWxkZXJHcm91cFNlcnZpY2UuaW5pdCh0aGlzLmlkKTtcbiAgfVxuXG4gIHJlbW92ZUZpZWxkKGZpZWxkOiBTZWFyY2hCdWlsZGVyR3JvdXBRdWVyeSk6IHZvaWQge1xuICAgIHRoaXMuc2VhcmNoQnVpbGRlckdyb3VwU2VydmljZS5yZW1vdmUoZmllbGQpO1xuICAgIHRoaXMucmVtb3ZlLmVtaXQoZmllbGQpO1xuICB9XG59XG5cbmV4cG9ydCB0eXBlIFNlYXJjaEJ1aWxkZXJHcm91cE9wZXJhdG9yID0gJ2FuZCcgfCAnb3InIHwgJ25vdCc7XG4iXX0=