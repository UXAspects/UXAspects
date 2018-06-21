/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, Input, Output, EventEmitter, TemplateRef } from '@angular/core';
import { SearchBuilderGroupService } from './search-builder-group.service';
import { SearchBuilderService } from '../search-builder.service';
var SearchBuilderGroupComponent = (function () {
    function SearchBuilderGroupComponent(searchBuilderGroupService, _searchBuilderService) {
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
    SearchBuilderGroupComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        // ensure we have a name otherwise throw an error
        if (!this.id) {
            throw new Error('Search builder group must have a name attribute.');
        }
        // otherwise register the group
        this.searchBuilderGroupService.init(this.id);
    };
    /**
     * @param {?} field
     * @return {?}
     */
    SearchBuilderGroupComponent.prototype.removeField = /**
     * @param {?} field
     * @return {?}
     */
    function (field) {
        this.searchBuilderGroupService.remove(field);
        this.remove.emit(field);
    };
    SearchBuilderGroupComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ux-search-builder-group',
                    template: "<h4 class=\"search-group-title\">{{ header }}</h4>\n\n<main class=\"search-group-content\">\n\n  <section class=\"search-group-operator search-group-operator-{{ operator }}\" [class.hidden-operator]=\"searchBuilderGroupService.getQuery().length < 2\">{{ operator }}</section>\n\n  <section class=\"search-group-items\">\n\n    <div class=\"search-group-item-container\" *ngFor=\"let field of searchBuilderGroupService.getQuery()\">\n\n      <div class=\"search-group-item\">\n        <ng-container *uxSearchBuilderOutlet=\"field.type; context: field\"></ng-container>\n      </div>\n\n      <div class=\"search-group-item-remove\" (click)=\"removeField(field)\">\n        <span class=\"hpe-icon hpe-close\"></span>\n      </div>\n    </div>\n\n    <!-- Placeholder Item -->\n    <ng-container *ngIf=\"showPlaceholder\">\n\n      <!-- The Default Placeholder -->\n      <div class=\"search-group-item-container placeholder-item\" *ngIf=\"!placeholder\">\n        \n        <div class=\"search-group-item\">\n          <label class=\"form-label\">New field</label>\n          <div class=\"form-control\"></div>\n        </div>\n  \n      </div>\n\n      <!-- Allow a custom placeholder -->\n    <ng-container *ngTemplateOutlet=\"placeholder\"></ng-container>\n\n    </ng-container>\n\n  </section>\n\n  <section class=\"search-builder-group-add-field\" (click)=\"add.emit($event)\">\n\n    <button type=\"button\" class=\"btn btn-icon btn-circular button-accent\" aria-label=\"Add Field\">\n      <span class=\"hpe-icon hpe-add\" aria-hidden=\"true\"></span>\n    </button>\n\n    <span class=\"search-builder-group-add-field-label\">{{ addText }}</span>\n\n  </section>\n\n</main>\n\n<hr class=\"search-builder-group-divider\">\n",
                    providers: [SearchBuilderGroupService]
                },] },
    ];
    /** @nocollapse */
    SearchBuilderGroupComponent.ctorParameters = function () { return [
        { type: SearchBuilderGroupService, },
        { type: SearchBuilderService, },
    ]; };
    SearchBuilderGroupComponent.propDecorators = {
        "id": [{ type: Input },],
        "header": [{ type: Input },],
        "operator": [{ type: Input },],
        "addText": [{ type: Input },],
        "placeholder": [{ type: Input },],
        "showPlaceholder": [{ type: Input },],
        "add": [{ type: Output },],
        "remove": [{ type: Output },],
    };
    return SearchBuilderGroupComponent;
}());
export { SearchBuilderGroupComponent };
function SearchBuilderGroupComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    SearchBuilderGroupComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    SearchBuilderGroupComponent.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    SearchBuilderGroupComponent.propDecorators;
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLWJ1aWxkZXItZ3JvdXAuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvc2VhcmNoLWJ1aWxkZXIvc2VhcmNoLWJ1aWxkZXItZ3JvdXAvc2VhcmNoLWJ1aWxkZXItZ3JvdXAuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLFdBQVcsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM1RixPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUMzRSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQzs7SUF3RS9ELHFDQUFtQix5QkFBb0QsRUFBVSxxQkFBMkM7UUFBekcsOEJBQXlCLEdBQXpCLHlCQUF5QixDQUEyQjtRQUFVLDBCQUFxQixHQUFyQixxQkFBcUIsQ0FBc0I7d0JBUjVFLEtBQUs7dUJBQzFCLGFBQWE7K0JBRUosS0FBSzttQkFFQyxJQUFJLFlBQVksRUFBYztzQkFDZCxJQUFJLFlBQVksRUFBMkI7S0FFNEI7Ozs7SUFFakksOENBQVE7OztJQUFSOztRQUdFLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDYixNQUFNLElBQUksS0FBSyxDQUFDLGtEQUFrRCxDQUFDLENBQUM7U0FDckU7O1FBR0QsSUFBSSxDQUFDLHlCQUF5QixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7S0FDOUM7Ozs7O0lBRUQsaURBQVc7Ozs7SUFBWCxVQUFZLEtBQThCO1FBQ3hDLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDN0MsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDekI7O2dCQXJGRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLHlCQUF5QjtvQkFDbkMsUUFBUSxFQUFFLGtzREFvRFg7b0JBQ0MsU0FBUyxFQUFFLENBQUMseUJBQXlCLENBQUM7aUJBQ3ZDOzs7O2dCQTVEUSx5QkFBeUI7Z0JBQ3pCLG9CQUFvQjs7O3VCQThEMUIsS0FBSzsyQkFDTCxLQUFLOzZCQUNMLEtBQUs7NEJBQ0wsS0FBSztnQ0FDTCxLQUFLO29DQUNMLEtBQUs7d0JBRUwsTUFBTTsyQkFDTixNQUFNOztzQ0F4RVQ7O1NBOERhLDJCQUEyQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIFRlbXBsYXRlUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTZWFyY2hCdWlsZGVyR3JvdXBTZXJ2aWNlIH0gZnJvbSAnLi9zZWFyY2gtYnVpbGRlci1ncm91cC5zZXJ2aWNlJztcbmltcG9ydCB7IFNlYXJjaEJ1aWxkZXJTZXJ2aWNlIH0gZnJvbSAnLi4vc2VhcmNoLWJ1aWxkZXIuc2VydmljZSc7XG5pbXBvcnQgeyBTZWFyY2hCdWlsZGVyR3JvdXBRdWVyeSB9IGZyb20gJy4uL2ludGVyZmFjZXMvZ3JvdXAtcXVlcnkuaW50ZXJmYWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAndXgtc2VhcmNoLWJ1aWxkZXItZ3JvdXAnLFxuICB0ZW1wbGF0ZTogYDxoNCBjbGFzcz1cInNlYXJjaC1ncm91cC10aXRsZVwiPnt7IGhlYWRlciB9fTwvaDQ+XG5cbjxtYWluIGNsYXNzPVwic2VhcmNoLWdyb3VwLWNvbnRlbnRcIj5cblxuICA8c2VjdGlvbiBjbGFzcz1cInNlYXJjaC1ncm91cC1vcGVyYXRvciBzZWFyY2gtZ3JvdXAtb3BlcmF0b3Ite3sgb3BlcmF0b3IgfX1cIiBbY2xhc3MuaGlkZGVuLW9wZXJhdG9yXT1cInNlYXJjaEJ1aWxkZXJHcm91cFNlcnZpY2UuZ2V0UXVlcnkoKS5sZW5ndGggPCAyXCI+e3sgb3BlcmF0b3IgfX08L3NlY3Rpb24+XG5cbiAgPHNlY3Rpb24gY2xhc3M9XCJzZWFyY2gtZ3JvdXAtaXRlbXNcIj5cblxuICAgIDxkaXYgY2xhc3M9XCJzZWFyY2gtZ3JvdXAtaXRlbS1jb250YWluZXJcIiAqbmdGb3I9XCJsZXQgZmllbGQgb2Ygc2VhcmNoQnVpbGRlckdyb3VwU2VydmljZS5nZXRRdWVyeSgpXCI+XG5cbiAgICAgIDxkaXYgY2xhc3M9XCJzZWFyY2gtZ3JvdXAtaXRlbVwiPlxuICAgICAgICA8bmctY29udGFpbmVyICp1eFNlYXJjaEJ1aWxkZXJPdXRsZXQ9XCJmaWVsZC50eXBlOyBjb250ZXh0OiBmaWVsZFwiPjwvbmctY29udGFpbmVyPlxuICAgICAgPC9kaXY+XG5cbiAgICAgIDxkaXYgY2xhc3M9XCJzZWFyY2gtZ3JvdXAtaXRlbS1yZW1vdmVcIiAoY2xpY2spPVwicmVtb3ZlRmllbGQoZmllbGQpXCI+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwiaHBlLWljb24gaHBlLWNsb3NlXCI+PC9zcGFuPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG5cbiAgICA8IS0tIFBsYWNlaG9sZGVyIEl0ZW0gLS0+XG4gICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cInNob3dQbGFjZWhvbGRlclwiPlxuXG4gICAgICA8IS0tIFRoZSBEZWZhdWx0IFBsYWNlaG9sZGVyIC0tPlxuICAgICAgPGRpdiBjbGFzcz1cInNlYXJjaC1ncm91cC1pdGVtLWNvbnRhaW5lciBwbGFjZWhvbGRlci1pdGVtXCIgKm5nSWY9XCIhcGxhY2Vob2xkZXJcIj5cbiAgICAgICAgXG4gICAgICAgIDxkaXYgY2xhc3M9XCJzZWFyY2gtZ3JvdXAtaXRlbVwiPlxuICAgICAgICAgIDxsYWJlbCBjbGFzcz1cImZvcm0tbGFiZWxcIj5OZXcgZmllbGQ8L2xhYmVsPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIj48L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gIFxuICAgICAgPC9kaXY+XG5cbiAgICAgIDwhLS0gQWxsb3cgYSBjdXN0b20gcGxhY2Vob2xkZXIgLS0+XG4gICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cInBsYWNlaG9sZGVyXCI+PC9uZy1jb250YWluZXI+XG5cbiAgICA8L25nLWNvbnRhaW5lcj5cblxuICA8L3NlY3Rpb24+XG5cbiAgPHNlY3Rpb24gY2xhc3M9XCJzZWFyY2gtYnVpbGRlci1ncm91cC1hZGQtZmllbGRcIiAoY2xpY2spPVwiYWRkLmVtaXQoJGV2ZW50KVwiPlxuXG4gICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLWljb24gYnRuLWNpcmN1bGFyIGJ1dHRvbi1hY2NlbnRcIiBhcmlhLWxhYmVsPVwiQWRkIEZpZWxkXCI+XG4gICAgICA8c3BhbiBjbGFzcz1cImhwZS1pY29uIGhwZS1hZGRcIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L3NwYW4+XG4gICAgPC9idXR0b24+XG5cbiAgICA8c3BhbiBjbGFzcz1cInNlYXJjaC1idWlsZGVyLWdyb3VwLWFkZC1maWVsZC1sYWJlbFwiPnt7IGFkZFRleHQgfX08L3NwYW4+XG5cbiAgPC9zZWN0aW9uPlxuXG48L21haW4+XG5cbjxociBjbGFzcz1cInNlYXJjaC1idWlsZGVyLWdyb3VwLWRpdmlkZXJcIj5cbmAsXG4gIHByb3ZpZGVyczogW1NlYXJjaEJ1aWxkZXJHcm91cFNlcnZpY2VdXG59KVxuZXhwb3J0IGNsYXNzIFNlYXJjaEJ1aWxkZXJHcm91cENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgQElucHV0KCkgaWQ6IHN0cmluZztcbiAgQElucHV0KCkgaGVhZGVyOiBzdHJpbmc7XG4gIEBJbnB1dCgpIG9wZXJhdG9yOiBTZWFyY2hCdWlsZGVyR3JvdXBPcGVyYXRvciA9ICdhbmQnO1xuICBASW5wdXQoKSBhZGRUZXh0OiBzdHJpbmcgPSAnQWRkIGEgZmllbGQnO1xuICBASW5wdXQoKSBwbGFjZWhvbGRlcjogVGVtcGxhdGVSZWY8YW55PjtcbiAgQElucHV0KCkgc2hvd1BsYWNlaG9sZGVyOiBib29sZWFuID0gZmFsc2U7XG5cbiAgQE91dHB1dCgpIGFkZDogRXZlbnRFbWl0dGVyPE1vdXNlRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxNb3VzZUV2ZW50PigpO1xuICBAT3V0cHV0KCkgcmVtb3ZlOiBFdmVudEVtaXR0ZXI8U2VhcmNoQnVpbGRlckdyb3VwUXVlcnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxTZWFyY2hCdWlsZGVyR3JvdXBRdWVyeT4oKTtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgc2VhcmNoQnVpbGRlckdyb3VwU2VydmljZTogU2VhcmNoQnVpbGRlckdyb3VwU2VydmljZSwgcHJpdmF0ZSBfc2VhcmNoQnVpbGRlclNlcnZpY2U6IFNlYXJjaEJ1aWxkZXJTZXJ2aWNlKSB7IH1cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcblxuICAgIC8vIGVuc3VyZSB3ZSBoYXZlIGEgbmFtZSBvdGhlcndpc2UgdGhyb3cgYW4gZXJyb3JcbiAgICBpZiAoIXRoaXMuaWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignU2VhcmNoIGJ1aWxkZXIgZ3JvdXAgbXVzdCBoYXZlIGEgbmFtZSBhdHRyaWJ1dGUuJyk7XG4gICAgfVxuXG4gICAgLy8gb3RoZXJ3aXNlIHJlZ2lzdGVyIHRoZSBncm91cFxuICAgIHRoaXMuc2VhcmNoQnVpbGRlckdyb3VwU2VydmljZS5pbml0KHRoaXMuaWQpO1xuICB9XG5cbiAgcmVtb3ZlRmllbGQoZmllbGQ6IFNlYXJjaEJ1aWxkZXJHcm91cFF1ZXJ5KTogdm9pZCB7XG4gICAgdGhpcy5zZWFyY2hCdWlsZGVyR3JvdXBTZXJ2aWNlLnJlbW92ZShmaWVsZCk7XG4gICAgdGhpcy5yZW1vdmUuZW1pdChmaWVsZCk7XG4gIH1cbn1cblxuZXhwb3J0IHR5cGUgU2VhcmNoQnVpbGRlckdyb3VwT3BlcmF0b3IgPSAnYW5kJyB8ICdvcicgfCAnbm90JztcbiJdfQ==