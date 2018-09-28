/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { ContentChildren, Directive, ElementRef, QueryList } from '@angular/core';
import { ResizableTableColumnComponent } from './resizable-table-column.component';
import { ResizableTableService } from './resizable-table.service';
export class ResizableTableDirective {
    /**
     * @param {?} _elementRef
     * @param {?} _table
     */
    constructor(_elementRef, _table) {
        this._elementRef = _elementRef;
        this._table = _table;
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this._table.setTable(this._elementRef.nativeElement);
        this._table.setColumns(this.columns);
    }
}
ResizableTableDirective.decorators = [
    { type: Directive, args: [{
                selector: '[uxResizableTable]',
                providers: [ResizableTableService],
                host: {
                    class: 'ux-resizable-table'
                }
            },] }
];
/** @nocollapse */
ResizableTableDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: ResizableTableService }
];
ResizableTableDirective.propDecorators = {
    columns: [{ type: ContentChildren, args: [ResizableTableColumnComponent,] }]
};
function ResizableTableDirective_tsickle_Closure_declarations() {
    /** @type {?} */
    ResizableTableDirective.prototype.columns;
    /** @type {?} */
    ResizableTableDirective.prototype._elementRef;
    /** @type {?} */
    ResizableTableDirective.prototype._table;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzaXphYmxlLXRhYmxlLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJjb21wb25lbnRzL3RhYmxlL3RhYmxlLWNvbHVtbi1yZXNpemUvcmVzaXphYmxlLXRhYmxlLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFpQixlQUFlLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDakcsT0FBTyxFQUFFLDZCQUE2QixFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFDbkYsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFTbEUsTUFBTTs7Ozs7SUFJSixZQUFvQixXQUF1QixFQUFVLE1BQTZCO1FBQTlELGdCQUFXLEdBQVgsV0FBVyxDQUFZO1FBQVUsV0FBTSxHQUFOLE1BQU0sQ0FBdUI7S0FBSzs7OztJQUV2RixlQUFlO1FBQ2IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUNyRCxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7S0FDdEM7OztZQWhCRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLG9CQUFvQjtnQkFDOUIsU0FBUyxFQUFFLENBQUMscUJBQXFCLENBQUM7Z0JBQ2xDLElBQUksRUFBRTtvQkFDSixLQUFLLEVBQUUsb0JBQW9CO2lCQUM1QjthQUNGOzs7O1lBVm1ELFVBQVU7WUFFckQscUJBQXFCOzs7c0JBVzNCLGVBQWUsU0FBQyw2QkFBNkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBZnRlclZpZXdJbml0LCBDb250ZW50Q2hpbGRyZW4sIERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgUXVlcnlMaXN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSZXNpemFibGVUYWJsZUNvbHVtbkNvbXBvbmVudCB9IGZyb20gJy4vcmVzaXphYmxlLXRhYmxlLWNvbHVtbi5jb21wb25lbnQnO1xuaW1wb3J0IHsgUmVzaXphYmxlVGFibGVTZXJ2aWNlIH0gZnJvbSAnLi9yZXNpemFibGUtdGFibGUuc2VydmljZSc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1t1eFJlc2l6YWJsZVRhYmxlXScsXG4gIHByb3ZpZGVyczogW1Jlc2l6YWJsZVRhYmxlU2VydmljZV0sXG4gIGhvc3Q6IHtcbiAgICBjbGFzczogJ3V4LXJlc2l6YWJsZS10YWJsZSdcbiAgfVxufSlcbmV4cG9ydCBjbGFzcyBSZXNpemFibGVUYWJsZURpcmVjdGl2ZSBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQge1xuXG4gIEBDb250ZW50Q2hpbGRyZW4oUmVzaXphYmxlVGFibGVDb2x1bW5Db21wb25lbnQpIGNvbHVtbnM6IFF1ZXJ5TGlzdDxSZXNpemFibGVUYWJsZUNvbHVtbkNvbXBvbmVudD47XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfZWxlbWVudFJlZjogRWxlbWVudFJlZiwgcHJpdmF0ZSBfdGFibGU6IFJlc2l6YWJsZVRhYmxlU2VydmljZSkgeyB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgIHRoaXMuX3RhYmxlLnNldFRhYmxlKHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCk7XG4gICAgdGhpcy5fdGFibGUuc2V0Q29sdW1ucyh0aGlzLmNvbHVtbnMpO1xuICB9XG59Il19