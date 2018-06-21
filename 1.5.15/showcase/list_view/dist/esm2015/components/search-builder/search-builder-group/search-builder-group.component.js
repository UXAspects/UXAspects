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
                template: `<h4 class="search-group-title">{{ header }}</h4>

<main class="search-group-content">

  <section class="search-group-operator search-group-operator-{{ operator }}" [class.hidden-operator]="searchBuilderGroupService.getQuery().length < 2">{{ operator }}</section>

  <section class="search-group-items">

    <div class="search-group-item-container" *ngFor="let field of searchBuilderGroupService.getQuery()">

      <div class="search-group-item">
        <ng-container *uxSearchBuilderOutlet="field.type; context: field"></ng-container>
      </div>

      <div class="search-group-item-remove" (click)="removeField(field)">
        <span class="hpe-icon hpe-close"></span>
      </div>
    </div>

    <!-- Placeholder Item -->
    <ng-container *ngIf="showPlaceholder">

      <!-- The Default Placeholder -->
      <div class="search-group-item-container placeholder-item" *ngIf="!placeholder">
        
        <div class="search-group-item">
          <label class="form-label">New field</label>
          <div class="form-control"></div>
        </div>
  
      </div>

      <!-- Allow a custom placeholder -->
    <ng-container *ngTemplateOutlet="placeholder"></ng-container>

    </ng-container>

  </section>

  <section class="search-builder-group-add-field" (click)="add.emit($event)">

    <button type="button" class="btn btn-icon btn-circular button-accent" aria-label="Add Field">
      <span class="hpe-icon hpe-add" aria-hidden="true"></span>
    </button>

    <span class="search-builder-group-add-field-label">{{ addText }}</span>

  </section>

</main>

<hr class="search-builder-group-divider">
`,
                providers: [SearchBuilderGroupService]
            },] },
];
/** @nocollapse */
SearchBuilderGroupComponent.ctorParameters = () => [
    { type: SearchBuilderGroupService, },
    { type: SearchBuilderService, },
];
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLWJ1aWxkZXItZ3JvdXAuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvc2VhcmNoLWJ1aWxkZXIvc2VhcmNoLWJ1aWxkZXItZ3JvdXAvc2VhcmNoLWJ1aWxkZXItZ3JvdXAuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLFdBQVcsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM1RixPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUMzRSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQTREakUsTUFBTTs7Ozs7SUFZSixZQUFtQix5QkFBb0QsRUFBVSxxQkFBMkM7UUFBekcsOEJBQXlCLEdBQXpCLHlCQUF5QixDQUEyQjtRQUFVLDBCQUFxQixHQUFyQixxQkFBcUIsQ0FBc0I7d0JBUjVFLEtBQUs7dUJBQzFCLGFBQWE7K0JBRUosS0FBSzttQkFFQyxJQUFJLFlBQVksRUFBYztzQkFDZCxJQUFJLFlBQVksRUFBMkI7S0FFNEI7Ozs7SUFFakksUUFBUTs7UUFHTixFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ2IsTUFBTSxJQUFJLEtBQUssQ0FBQyxrREFBa0QsQ0FBQyxDQUFDO1NBQ3JFOztRQUdELElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0tBQzlDOzs7OztJQUVELFdBQVcsQ0FBQyxLQUE4QjtRQUN4QyxJQUFJLENBQUMseUJBQXlCLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzdDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQ3pCOzs7WUFyRkYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSx5QkFBeUI7Z0JBQ25DLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztDQW9EWDtnQkFDQyxTQUFTLEVBQUUsQ0FBQyx5QkFBeUIsQ0FBQzthQUN2Qzs7OztZQTVEUSx5QkFBeUI7WUFDekIsb0JBQW9COzs7bUJBOEQxQixLQUFLO3VCQUNMLEtBQUs7eUJBQ0wsS0FBSzt3QkFDTCxLQUFLOzRCQUNMLEtBQUs7Z0NBQ0wsS0FBSztvQkFFTCxNQUFNO3VCQUNOLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBUZW1wbGF0ZVJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU2VhcmNoQnVpbGRlckdyb3VwU2VydmljZSB9IGZyb20gJy4vc2VhcmNoLWJ1aWxkZXItZ3JvdXAuc2VydmljZSc7XG5pbXBvcnQgeyBTZWFyY2hCdWlsZGVyU2VydmljZSB9IGZyb20gJy4uL3NlYXJjaC1idWlsZGVyLnNlcnZpY2UnO1xuaW1wb3J0IHsgU2VhcmNoQnVpbGRlckdyb3VwUXVlcnkgfSBmcm9tICcuLi9pbnRlcmZhY2VzL2dyb3VwLXF1ZXJ5LmludGVyZmFjZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3V4LXNlYXJjaC1idWlsZGVyLWdyb3VwJyxcbiAgdGVtcGxhdGU6IGA8aDQgY2xhc3M9XCJzZWFyY2gtZ3JvdXAtdGl0bGVcIj57eyBoZWFkZXIgfX08L2g0PlxuXG48bWFpbiBjbGFzcz1cInNlYXJjaC1ncm91cC1jb250ZW50XCI+XG5cbiAgPHNlY3Rpb24gY2xhc3M9XCJzZWFyY2gtZ3JvdXAtb3BlcmF0b3Igc2VhcmNoLWdyb3VwLW9wZXJhdG9yLXt7IG9wZXJhdG9yIH19XCIgW2NsYXNzLmhpZGRlbi1vcGVyYXRvcl09XCJzZWFyY2hCdWlsZGVyR3JvdXBTZXJ2aWNlLmdldFF1ZXJ5KCkubGVuZ3RoIDwgMlwiPnt7IG9wZXJhdG9yIH19PC9zZWN0aW9uPlxuXG4gIDxzZWN0aW9uIGNsYXNzPVwic2VhcmNoLWdyb3VwLWl0ZW1zXCI+XG5cbiAgICA8ZGl2IGNsYXNzPVwic2VhcmNoLWdyb3VwLWl0ZW0tY29udGFpbmVyXCIgKm5nRm9yPVwibGV0IGZpZWxkIG9mIHNlYXJjaEJ1aWxkZXJHcm91cFNlcnZpY2UuZ2V0UXVlcnkoKVwiPlxuXG4gICAgICA8ZGl2IGNsYXNzPVwic2VhcmNoLWdyb3VwLWl0ZW1cIj5cbiAgICAgICAgPG5nLWNvbnRhaW5lciAqdXhTZWFyY2hCdWlsZGVyT3V0bGV0PVwiZmllbGQudHlwZTsgY29udGV4dDogZmllbGRcIj48L25nLWNvbnRhaW5lcj5cbiAgICAgIDwvZGl2PlxuXG4gICAgICA8ZGl2IGNsYXNzPVwic2VhcmNoLWdyb3VwLWl0ZW0tcmVtb3ZlXCIgKGNsaWNrKT1cInJlbW92ZUZpZWxkKGZpZWxkKVwiPlxuICAgICAgICA8c3BhbiBjbGFzcz1cImhwZS1pY29uIGhwZS1jbG9zZVwiPjwvc3Bhbj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuXG4gICAgPCEtLSBQbGFjZWhvbGRlciBJdGVtIC0tPlxuICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJzaG93UGxhY2Vob2xkZXJcIj5cblxuICAgICAgPCEtLSBUaGUgRGVmYXVsdCBQbGFjZWhvbGRlciAtLT5cbiAgICAgIDxkaXYgY2xhc3M9XCJzZWFyY2gtZ3JvdXAtaXRlbS1jb250YWluZXIgcGxhY2Vob2xkZXItaXRlbVwiICpuZ0lmPVwiIXBsYWNlaG9sZGVyXCI+XG4gICAgICAgIFxuICAgICAgICA8ZGl2IGNsYXNzPVwic2VhcmNoLWdyb3VwLWl0ZW1cIj5cbiAgICAgICAgICA8bGFiZWwgY2xhc3M9XCJmb3JtLWxhYmVsXCI+TmV3IGZpZWxkPC9sYWJlbD5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiZm9ybS1jb250cm9sXCI+PC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICBcbiAgICAgIDwvZGl2PlxuXG4gICAgICA8IS0tIEFsbG93IGEgY3VzdG9tIHBsYWNlaG9sZGVyIC0tPlxuICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJwbGFjZWhvbGRlclwiPjwvbmctY29udGFpbmVyPlxuXG4gICAgPC9uZy1jb250YWluZXI+XG5cbiAgPC9zZWN0aW9uPlxuXG4gIDxzZWN0aW9uIGNsYXNzPVwic2VhcmNoLWJ1aWxkZXItZ3JvdXAtYWRkLWZpZWxkXCIgKGNsaWNrKT1cImFkZC5lbWl0KCRldmVudClcIj5cblxuICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1pY29uIGJ0bi1jaXJjdWxhciBidXR0b24tYWNjZW50XCIgYXJpYS1sYWJlbD1cIkFkZCBGaWVsZFwiPlxuICAgICAgPHNwYW4gY2xhc3M9XCJocGUtaWNvbiBocGUtYWRkXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9zcGFuPlxuICAgIDwvYnV0dG9uPlxuXG4gICAgPHNwYW4gY2xhc3M9XCJzZWFyY2gtYnVpbGRlci1ncm91cC1hZGQtZmllbGQtbGFiZWxcIj57eyBhZGRUZXh0IH19PC9zcGFuPlxuXG4gIDwvc2VjdGlvbj5cblxuPC9tYWluPlxuXG48aHIgY2xhc3M9XCJzZWFyY2gtYnVpbGRlci1ncm91cC1kaXZpZGVyXCI+XG5gLFxuICBwcm92aWRlcnM6IFtTZWFyY2hCdWlsZGVyR3JvdXBTZXJ2aWNlXVxufSlcbmV4cG9ydCBjbGFzcyBTZWFyY2hCdWlsZGVyR3JvdXBDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIEBJbnB1dCgpIGlkOiBzdHJpbmc7XG4gIEBJbnB1dCgpIGhlYWRlcjogc3RyaW5nO1xuICBASW5wdXQoKSBvcGVyYXRvcjogU2VhcmNoQnVpbGRlckdyb3VwT3BlcmF0b3IgPSAnYW5kJztcbiAgQElucHV0KCkgYWRkVGV4dDogc3RyaW5nID0gJ0FkZCBhIGZpZWxkJztcbiAgQElucHV0KCkgcGxhY2Vob2xkZXI6IFRlbXBsYXRlUmVmPGFueT47XG4gIEBJbnB1dCgpIHNob3dQbGFjZWhvbGRlcjogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIEBPdXRwdXQoKSBhZGQ6IEV2ZW50RW1pdHRlcjxNb3VzZUV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8TW91c2VFdmVudD4oKTtcbiAgQE91dHB1dCgpIHJlbW92ZTogRXZlbnRFbWl0dGVyPFNlYXJjaEJ1aWxkZXJHcm91cFF1ZXJ5PiA9IG5ldyBFdmVudEVtaXR0ZXI8U2VhcmNoQnVpbGRlckdyb3VwUXVlcnk+KCk7XG5cbiAgY29uc3RydWN0b3IocHVibGljIHNlYXJjaEJ1aWxkZXJHcm91cFNlcnZpY2U6IFNlYXJjaEJ1aWxkZXJHcm91cFNlcnZpY2UsIHByaXZhdGUgX3NlYXJjaEJ1aWxkZXJTZXJ2aWNlOiBTZWFyY2hCdWlsZGVyU2VydmljZSkgeyB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG5cbiAgICAvLyBlbnN1cmUgd2UgaGF2ZSBhIG5hbWUgb3RoZXJ3aXNlIHRocm93IGFuIGVycm9yXG4gICAgaWYgKCF0aGlzLmlkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1NlYXJjaCBidWlsZGVyIGdyb3VwIG11c3QgaGF2ZSBhIG5hbWUgYXR0cmlidXRlLicpO1xuICAgIH1cblxuICAgIC8vIG90aGVyd2lzZSByZWdpc3RlciB0aGUgZ3JvdXBcbiAgICB0aGlzLnNlYXJjaEJ1aWxkZXJHcm91cFNlcnZpY2UuaW5pdCh0aGlzLmlkKTtcbiAgfVxuXG4gIHJlbW92ZUZpZWxkKGZpZWxkOiBTZWFyY2hCdWlsZGVyR3JvdXBRdWVyeSk6IHZvaWQge1xuICAgIHRoaXMuc2VhcmNoQnVpbGRlckdyb3VwU2VydmljZS5yZW1vdmUoZmllbGQpO1xuICAgIHRoaXMucmVtb3ZlLmVtaXQoZmllbGQpO1xuICB9XG59XG5cbmV4cG9ydCB0eXBlIFNlYXJjaEJ1aWxkZXJHcm91cE9wZXJhdG9yID0gJ2FuZCcgfCAnb3InIHwgJ25vdCc7XG4iXX0=