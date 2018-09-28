/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { SearchBuilderFocusService } from '../search-builder-focus.service';
import { SearchBuilderGroupService } from './search-builder-group.service';
var SearchBuilderGroupComponent = /** @class */ (function () {
    function SearchBuilderGroupComponent(searchBuilderGroupService, _searchBuilderFocusService) {
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
    SearchBuilderGroupComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        // ensure we have a name otherwise throw an error
        if (!this.id) {
            throw new Error('Search builder group must have an id attribute.');
        }
        // otherwise register the group
        this.searchBuilderGroupService.init(this.id);
        // Track focus for child components
        this._searchBuilderFocusService.focus$.pipe(takeUntil(this._onDestroy)).subscribe(function (focus) {
            _this.focusIndex = (focus.groupId === _this.id) ? focus.index : -1;
        });
    };
    /**
     * @return {?}
     */
    SearchBuilderGroupComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._onDestroy.next();
        this._onDestroy.complete();
    };
    /**
     * @param {?} event
     * @return {?}
     */
    SearchBuilderGroupComponent.prototype.addField = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.add.emit(event);
    };
    /**
     * @param {?} index
     * @param {?} field
     * @return {?}
     */
    SearchBuilderGroupComponent.prototype.removeFieldAtIndex = /**
     * @param {?} index
     * @param {?} field
     * @return {?}
     */
    function (index, field) {
        this.searchBuilderGroupService.removeAtIndex(index);
        this.remove.emit(field);
    };
    /**
     * @param {?} index
     * @return {?}
     */
    SearchBuilderGroupComponent.prototype.setFocus = /**
     * @param {?} index
     * @return {?}
     */
    function (index) {
        this._searchBuilderFocusService.setFocus(this.id, index);
    };
    /**
     * @return {?}
     */
    SearchBuilderGroupComponent.prototype.clearFocus = /**
     * @return {?}
     */
    function () {
        this._searchBuilderFocusService.clearFocus();
    };
    SearchBuilderGroupComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ux-search-builder-group',
                    template: "<h4 class=\"search-group-title\">{{ header }}</h4>\n\n<div class=\"search-group-content\">\n\n  <div class=\"search-group-operator search-group-operator-{{ operator }}\"\n    [class.hidden-operator]=\"searchBuilderGroupService.getQuery().length < 2\">{{ operator }}</div>\n\n  <div class=\"search-group-items\">\n\n    <div *ngFor=\"let field of searchBuilderGroupService.getQuery(); let i = index\"\n      class=\"search-group-item-container\"\n      [class.search-group-item-focus]=\"focusIndex === i\"\n      (uxFocusWithin)=\"setFocus(i)\"\n      (uxBlurWithin)=\"clearFocus()\">\n\n      <div class=\"search-group-item\">\n        <ng-container *uxSearchBuilderOutlet=\"field.type; context: field; groupId: id; index: i\"></ng-container>\n      </div>\n\n      <button type=\"button\"\n        aria-label=\"Remove field\"\n        class=\"search-group-item-remove\"\n        (click)=\"removeFieldAtIndex(i, field)\">\n\n        <span class=\"hpe-icon hpe-close\"></span>\n\n      </button>\n\n    </div>\n\n    <!-- Placeholder Item -->\n    <ng-container *ngIf=\"showPlaceholder\">\n\n      <!-- The Default Placeholder -->\n      <div class=\"search-group-item-container placeholder-item\" *ngIf=\"!placeholder\">\n\n        <div class=\"search-group-item\">\n          <label class=\"form-label\">New field</label>\n          <div class=\"form-control\"></div>\n        </div>\n\n      </div>\n\n      <!-- Allow a custom placeholder -->\n      <ng-container *ngTemplateOutlet=\"placeholder\"></ng-container>\n\n    </ng-container>\n\n  </div>\n\n  <button type=\"button\" class=\"search-builder-group-add-field\" (click)=\"addField($event)\">\n    <span class=\"search-builder-group-add-field-icon hpe-icon hpe-add\" aria-hidden=\"true\"></span>\n    <span class=\"search-builder-group-add-field-label\">{{ addText }}</span>\n  </button>\n\n</div>\n\n<hr class=\"search-builder-group-divider\">\n",
                    providers: [SearchBuilderGroupService]
                }] }
    ];
    /** @nocollapse */
    SearchBuilderGroupComponent.ctorParameters = function () { return [
        { type: SearchBuilderGroupService },
        { type: SearchBuilderFocusService }
    ]; };
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
    return SearchBuilderGroupComponent;
}());
export { SearchBuilderGroupComponent };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLWJ1aWxkZXItZ3JvdXAuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvc2VhcmNoLWJ1aWxkZXIvc2VhcmNoLWJ1aWxkZXItZ3JvdXAvc2VhcmNoLWJ1aWxkZXItZ3JvdXAuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQXFCLE1BQU0sRUFBRSxXQUFXLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDdkcsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzNDLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFFdkMsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDNUUsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7O0lBdUJ6RSxxQ0FDUywyQkFDQztRQURELDhCQUF5QixHQUF6Qix5QkFBeUI7UUFDeEIsK0JBQTBCLEdBQTFCLDBCQUEwQjt3QkFkWSxLQUFLO3VCQUMxQixhQUFhOytCQUVKLEtBQUs7bUJBRUMsSUFBSSxZQUFZLEVBQWM7c0JBQ2QsSUFBSSxZQUFZLEVBQTJCOzBCQUVoRixDQUFDLENBQUM7MEJBRUYsSUFBSSxPQUFPLEVBQVE7S0FLbkM7Ozs7SUFFTCw4Q0FBUTs7O0lBQVI7UUFBQSxpQkFjQzs7UUFYQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ2IsTUFBTSxJQUFJLEtBQUssQ0FBQyxpREFBaUQsQ0FBQyxDQUFDO1NBQ3BFOztRQUdELElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDOztRQUc3QyxJQUFJLENBQUMsMEJBQTBCLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLFVBQUEsS0FBSztZQUNyRixLQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sS0FBSyxLQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ2xFLENBQUMsQ0FBQztLQUNKOzs7O0lBRUQsaURBQVc7OztJQUFYO1FBQ0UsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUN2QixJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRSxDQUFDO0tBQzVCOzs7OztJQUVELDhDQUFROzs7O0lBQVIsVUFBUyxLQUFpQjtRQUN4QixJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztLQUN0Qjs7Ozs7O0lBRUQsd0RBQWtCOzs7OztJQUFsQixVQUFtQixLQUFhLEVBQUUsS0FBOEI7UUFDOUQsSUFBSSxDQUFDLHlCQUF5QixDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNwRCxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztLQUN6Qjs7Ozs7SUFFRCw4Q0FBUTs7OztJQUFSLFVBQVMsS0FBYTtRQUNwQixJQUFJLENBQUMsMEJBQTBCLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7S0FDMUQ7Ozs7SUFFRCxnREFBVTs7O0lBQVY7UUFDRSxJQUFJLENBQUMsMEJBQTBCLENBQUMsVUFBVSxFQUFFLENBQUM7S0FDOUM7O2dCQTlERixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLHlCQUF5QjtvQkFDbkMsNjNEQUFvRDtvQkFDcEQsU0FBUyxFQUFFLENBQUMseUJBQXlCLENBQUM7aUJBQ3ZDOzs7O2dCQU5RLHlCQUF5QjtnQkFEekIseUJBQXlCOzs7cUJBVS9CLEtBQUs7eUJBQ0wsS0FBSzsyQkFDTCxLQUFLOzBCQUNMLEtBQUs7OEJBQ0wsS0FBSztrQ0FDTCxLQUFLO3NCQUVMLE1BQU07eUJBQ04sTUFBTTs7c0NBdEJUOztTQVlhLDJCQUEyQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25EZXN0cm95LCBPbkluaXQsIE91dHB1dCwgVGVtcGxhdGVSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzL1N1YmplY3QnO1xuaW1wb3J0IHsgU2VhcmNoQnVpbGRlckdyb3VwUXVlcnkgfSBmcm9tICcuLi9pbnRlcmZhY2VzL2dyb3VwLXF1ZXJ5LmludGVyZmFjZSc7XG5pbXBvcnQgeyBTZWFyY2hCdWlsZGVyRm9jdXNTZXJ2aWNlIH0gZnJvbSAnLi4vc2VhcmNoLWJ1aWxkZXItZm9jdXMuc2VydmljZSc7XG5pbXBvcnQgeyBTZWFyY2hCdWlsZGVyR3JvdXBTZXJ2aWNlIH0gZnJvbSAnLi9zZWFyY2gtYnVpbGRlci1ncm91cC5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAndXgtc2VhcmNoLWJ1aWxkZXItZ3JvdXAnLFxuICB0ZW1wbGF0ZVVybDogJy4vc2VhcmNoLWJ1aWxkZXItZ3JvdXAuY29tcG9uZW50Lmh0bWwnLFxuICBwcm92aWRlcnM6IFtTZWFyY2hCdWlsZGVyR3JvdXBTZXJ2aWNlXVxufSlcbmV4cG9ydCBjbGFzcyBTZWFyY2hCdWlsZGVyR3JvdXBDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG5cbiAgQElucHV0KCkgaWQ6IHN0cmluZztcbiAgQElucHV0KCkgaGVhZGVyOiBzdHJpbmc7XG4gIEBJbnB1dCgpIG9wZXJhdG9yOiBTZWFyY2hCdWlsZGVyR3JvdXBPcGVyYXRvciA9ICdhbmQnO1xuICBASW5wdXQoKSBhZGRUZXh0OiBzdHJpbmcgPSAnQWRkIGEgZmllbGQnO1xuICBASW5wdXQoKSBwbGFjZWhvbGRlcjogVGVtcGxhdGVSZWY8YW55PjtcbiAgQElucHV0KCkgc2hvd1BsYWNlaG9sZGVyOiBib29sZWFuID0gZmFsc2U7XG5cbiAgQE91dHB1dCgpIGFkZDogRXZlbnRFbWl0dGVyPE1vdXNlRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxNb3VzZUV2ZW50PigpO1xuICBAT3V0cHV0KCkgcmVtb3ZlOiBFdmVudEVtaXR0ZXI8U2VhcmNoQnVpbGRlckdyb3VwUXVlcnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxTZWFyY2hCdWlsZGVyR3JvdXBRdWVyeT4oKTtcblxuICBmb2N1c0luZGV4OiBudW1iZXIgPSAtMTtcblxuICBwcml2YXRlIF9vbkRlc3Ryb3kgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBzZWFyY2hCdWlsZGVyR3JvdXBTZXJ2aWNlOiBTZWFyY2hCdWlsZGVyR3JvdXBTZXJ2aWNlLFxuICAgIHByaXZhdGUgX3NlYXJjaEJ1aWxkZXJGb2N1c1NlcnZpY2U6IFNlYXJjaEJ1aWxkZXJGb2N1c1NlcnZpY2VcbiAgKSB7IH1cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcblxuICAgIC8vIGVuc3VyZSB3ZSBoYXZlIGEgbmFtZSBvdGhlcndpc2UgdGhyb3cgYW4gZXJyb3JcbiAgICBpZiAoIXRoaXMuaWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignU2VhcmNoIGJ1aWxkZXIgZ3JvdXAgbXVzdCBoYXZlIGFuIGlkIGF0dHJpYnV0ZS4nKTtcbiAgICB9XG5cbiAgICAvLyBvdGhlcndpc2UgcmVnaXN0ZXIgdGhlIGdyb3VwXG4gICAgdGhpcy5zZWFyY2hCdWlsZGVyR3JvdXBTZXJ2aWNlLmluaXQodGhpcy5pZCk7XG5cbiAgICAvLyBUcmFjayBmb2N1cyBmb3IgY2hpbGQgY29tcG9uZW50c1xuICAgIHRoaXMuX3NlYXJjaEJ1aWxkZXJGb2N1c1NlcnZpY2UuZm9jdXMkLnBpcGUodGFrZVVudGlsKHRoaXMuX29uRGVzdHJveSkpLnN1YnNjcmliZShmb2N1cyA9PiB7XG4gICAgICB0aGlzLmZvY3VzSW5kZXggPSAoZm9jdXMuZ3JvdXBJZCA9PT0gdGhpcy5pZCkgPyBmb2N1cy5pbmRleCA6IC0xO1xuICAgIH0pO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5fb25EZXN0cm95Lm5leHQoKTtcbiAgICB0aGlzLl9vbkRlc3Ryb3kuY29tcGxldGUoKTtcbiAgfVxuXG4gIGFkZEZpZWxkKGV2ZW50OiBNb3VzZUV2ZW50KTogdm9pZCB7XG4gICAgdGhpcy5hZGQuZW1pdChldmVudCk7XG4gIH1cblxuICByZW1vdmVGaWVsZEF0SW5kZXgoaW5kZXg6IG51bWJlciwgZmllbGQ6IFNlYXJjaEJ1aWxkZXJHcm91cFF1ZXJ5KTogdm9pZCB7XG4gICAgdGhpcy5zZWFyY2hCdWlsZGVyR3JvdXBTZXJ2aWNlLnJlbW92ZUF0SW5kZXgoaW5kZXgpO1xuICAgIHRoaXMucmVtb3ZlLmVtaXQoZmllbGQpO1xuICB9XG5cbiAgc2V0Rm9jdXMoaW5kZXg6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMuX3NlYXJjaEJ1aWxkZXJGb2N1c1NlcnZpY2Uuc2V0Rm9jdXModGhpcy5pZCwgaW5kZXgpO1xuICB9XG5cbiAgY2xlYXJGb2N1cygpOiB2b2lkIHtcbiAgICB0aGlzLl9zZWFyY2hCdWlsZGVyRm9jdXNTZXJ2aWNlLmNsZWFyRm9jdXMoKTtcbiAgfVxufVxuXG5leHBvcnQgdHlwZSBTZWFyY2hCdWlsZGVyR3JvdXBPcGVyYXRvciA9ICdhbmQnIHwgJ29yJyB8ICdub3QnO1xuIl19