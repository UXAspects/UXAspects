/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { FocusMonitor } from '@angular/cdk/a11y';
import { Directive, ElementRef, EventEmitter, HostBinding, HostListener, Input, Output } from '@angular/core';
import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { tick } from '../../../common/index';
import { TabbableListService } from './tabbable-list.service';
var /** @type {?} */ nextId = 0;
var TabbableListItemDirective = /** @class */ (function () {
    function TabbableListItemDirective(_tabbableList, _elementRef, focusMonitor) {
        var _this = this;
        this._tabbableList = _tabbableList;
        this._elementRef = _elementRef;
        this.rank = 0;
        this.disabled = false;
        this.expanded = false;
        this.expandedChange = new EventEmitter();
        this.tabindex = -1;
        this.id = nextId++;
        this.initialized = false;
        this.children = [];
        this.keyboardExpanded$ = new Subject();
        this._onDestroy = new Subject();
        this.keyboardExpanded$.pipe(tick(), takeUntil(this._onDestroy)).subscribe(function (expanded) {
            // Emit event which may alter the DOM
            // Emit event which may alter the DOM
            _this.expandedChange.emit(expanded);
            // Activate the appropriate item
            if (expanded) {
                if (_this.children.length > 0) {
                    _this._tabbableList.activate(_this.children[0]);
                }
            }
            else {
                _this._tabbableList.activate(_this);
            }
        });
        // add classes to indicate the origin of the focus event
        focusMonitor.monitor(_elementRef.nativeElement, false).pipe(takeUntil(this._onDestroy)).subscribe();
    }
    /**
     * @return {?}
     */
    TabbableListItemDirective.prototype.onInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.initialized = true;
        this._tabbableList.focusKeyManager.change
            .pipe(takeUntil(this._onDestroy), map(function () { return _this._tabbableList.isItemActive(_this); }))
            .subscribe(function (active) { return _this.tabindex = active ? 0 : -1; });
    };
    /**
     * @return {?}
     */
    TabbableListItemDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        // check if this is the currently focused item - if so we need to make another item tabbable
        if (this.tabindex === 0) {
            this._tabbableList.setFirstItemTabbable();
        }
        this._onDestroy.next();
        this._onDestroy.complete();
    };
    /**
     * @return {?}
     */
    TabbableListItemDirective.prototype.focus = /**
     * @return {?}
     */
    function () {
        // apply focus to the element
        this._elementRef.nativeElement.focus();
        // ensure the focus key manager updates the active item correctly
        this._tabbableList.activate(this);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    TabbableListItemDirective.prototype.onKeydown = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this._tabbableList.onKeydown(this, event);
    };
    TabbableListItemDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[uxTabbableListItem]',
                    exportAs: 'ux-tabbable-list-item'
                },] }
    ];
    /** @nocollapse */
    TabbableListItemDirective.ctorParameters = function () { return [
        { type: TabbableListService },
        { type: ElementRef },
        { type: FocusMonitor }
    ]; };
    TabbableListItemDirective.propDecorators = {
        parent: [{ type: Input }],
        rank: [{ type: Input }],
        disabled: [{ type: Input }],
        expanded: [{ type: Input }],
        expandedChange: [{ type: Output }],
        tabindex: [{ type: HostBinding }],
        focus: [{ type: HostListener, args: ['focus',] }],
        onKeydown: [{ type: HostListener, args: ['keydown', ['$event'],] }]
    };
    return TabbableListItemDirective;
}());
export { TabbableListItemDirective };
function TabbableListItemDirective_tsickle_Closure_declarations() {
    /** @type {?} */
    TabbableListItemDirective.prototype.parent;
    /** @type {?} */
    TabbableListItemDirective.prototype.rank;
    /** @type {?} */
    TabbableListItemDirective.prototype.disabled;
    /** @type {?} */
    TabbableListItemDirective.prototype.expanded;
    /** @type {?} */
    TabbableListItemDirective.prototype.expandedChange;
    /** @type {?} */
    TabbableListItemDirective.prototype.tabindex;
    /** @type {?} */
    TabbableListItemDirective.prototype.id;
    /** @type {?} */
    TabbableListItemDirective.prototype.initialized;
    /** @type {?} */
    TabbableListItemDirective.prototype.children;
    /** @type {?} */
    TabbableListItemDirective.prototype.keyboardExpanded$;
    /** @type {?} */
    TabbableListItemDirective.prototype._onDestroy;
    /** @type {?} */
    TabbableListItemDirective.prototype._tabbableList;
    /** @type {?} */
    TabbableListItemDirective.prototype._elementRef;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiYmFibGUtbGlzdC1pdGVtLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJkaXJlY3RpdmVzL2FjY2Vzc2liaWxpdHkvdGFiYmFibGUtbGlzdC90YWJiYWJsZS1saXN0LWl0ZW0uZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQW1CLFlBQVksRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxXQUFXLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBYSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekgsT0FBTyxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNoRCxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQ3ZDLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUM3QyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUU5RCxxQkFBSSxNQUFNLEdBQUcsQ0FBQyxDQUFDOztJQThCWCxtQ0FBb0IsYUFBa0MsRUFBVSxXQUF1QixFQUFFLFlBQTBCO1FBQW5ILGlCQW1CQztRQW5CbUIsa0JBQWEsR0FBYixhQUFhLENBQXFCO1FBQVUsZ0JBQVcsR0FBWCxXQUFXLENBQVk7b0JBcEIvRCxDQUFDO3dCQUVJLEtBQUs7d0JBRUwsS0FBSzs4QkFFUCxJQUFJLFlBQVksRUFBVzt3QkFFcEIsQ0FBQyxDQUFDO2tCQUV2QixNQUFNLEVBQUU7MkJBRUUsS0FBSzt3QkFFWSxFQUFFO2lDQUV0QixJQUFJLE9BQU8sRUFBVzswQkFFckIsSUFBSSxPQUFPLEVBQVE7UUFJcEMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsRUFBRSxTQUFTLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLFVBQUEsUUFBUTs7WUFHOUUsQUFEQSxxQ0FBcUM7WUFDckMsS0FBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7O1lBR25DLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7Z0JBQ1gsRUFBRSxDQUFDLENBQUMsS0FBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDM0IsS0FBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsS0FBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2lCQUNqRDthQUNKO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ0osS0FBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsS0FBSSxDQUFDLENBQUM7YUFDckM7U0FDSixDQUFDLENBQUM7O1FBR0gsWUFBWSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsYUFBYSxFQUFFLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUM7S0FDdkc7Ozs7SUFFRCwwQ0FBTTs7O0lBQU47UUFBQSxpQkFNQztRQUxHLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO1FBRXhCLElBQUksQ0FBQyxhQUFhLENBQUMsZUFBZSxDQUFDLE1BQU07YUFDcEMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsR0FBRyxDQUFDLGNBQU0sT0FBQSxLQUFJLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxLQUFJLENBQUMsRUFBckMsQ0FBcUMsQ0FBQyxDQUFDO2FBQ2xGLFNBQVMsQ0FBQyxVQUFBLE1BQU0sSUFBSSxPQUFBLEtBQUksQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUEvQixDQUErQixDQUFDLENBQUM7S0FDN0Q7Ozs7SUFFRCwrQ0FBVzs7O0lBQVg7O1FBR0ksRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3RCLElBQUksQ0FBQyxhQUFhLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztTQUM3QztRQUVELElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDdkIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUUsQ0FBQztLQUM5Qjs7OztJQUdELHlDQUFLOzs7SUFETDs7UUFJSSxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsQ0FBQzs7UUFHdkMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDckM7Ozs7O0lBR0QsNkNBQVM7Ozs7SUFEVCxVQUNVLEtBQW9CO1FBQzFCLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztLQUM3Qzs7Z0JBakZKLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUsc0JBQXNCO29CQUNoQyxRQUFRLEVBQUUsdUJBQXVCO2lCQUNwQzs7OztnQkFQUSxtQkFBbUI7Z0JBSlIsVUFBVTtnQkFESixZQUFZOzs7eUJBZWpDLEtBQUs7dUJBRUwsS0FBSzsyQkFFTCxLQUFLOzJCQUVMLEtBQUs7aUNBRUwsTUFBTTsyQkFFTixXQUFXO3dCQW9EWCxZQUFZLFNBQUMsT0FBTzs0QkFVcEIsWUFBWSxTQUFDLFNBQVMsRUFBRSxDQUFDLFFBQVEsQ0FBQzs7b0NBdkZ2Qzs7U0FhYSx5QkFBeUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBGb2N1c2FibGVPcHRpb24sIEZvY3VzTW9uaXRvciB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9hMTF5JztcbmltcG9ydCB7IERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBIb3N0QmluZGluZywgSG9zdExpc3RlbmVyLCBJbnB1dCwgT25EZXN0cm95LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IG1hcCwgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMvU3ViamVjdCc7XG5pbXBvcnQgeyB0aWNrIH0gZnJvbSAnLi4vLi4vLi4vY29tbW9uL2luZGV4JztcbmltcG9ydCB7IFRhYmJhYmxlTGlzdFNlcnZpY2UgfSBmcm9tICcuL3RhYmJhYmxlLWxpc3Quc2VydmljZSc7XG5cbmxldCBuZXh0SWQgPSAwO1xuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ1t1eFRhYmJhYmxlTGlzdEl0ZW1dJyxcbiAgICBleHBvcnRBczogJ3V4LXRhYmJhYmxlLWxpc3QtaXRlbSdcbn0pXG5leHBvcnQgY2xhc3MgVGFiYmFibGVMaXN0SXRlbURpcmVjdGl2ZSBpbXBsZW1lbnRzIEZvY3VzYWJsZU9wdGlvbiwgT25EZXN0cm95IHtcblxuICAgIEBJbnB1dCgpIHBhcmVudDogVGFiYmFibGVMaXN0SXRlbURpcmVjdGl2ZTtcblxuICAgIEBJbnB1dCgpIHJhbms6IG51bWJlciA9IDA7XG5cbiAgICBASW5wdXQoKSBkaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgQElucHV0KCkgZXhwYW5kZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIEBPdXRwdXQoKSBleHBhbmRlZENoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcblxuICAgIEBIb3N0QmluZGluZygpIHRhYmluZGV4OiBudW1iZXIgPSAtMTtcblxuICAgIGlkOiBudW1iZXIgPSBuZXh0SWQrKztcblxuICAgIGluaXRpYWxpemVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBjaGlsZHJlbjogVGFiYmFibGVMaXN0SXRlbURpcmVjdGl2ZVtdID0gW107XG5cbiAgICBrZXlib2FyZEV4cGFuZGVkJCA9IG5ldyBTdWJqZWN0PGJvb2xlYW4+KCk7XG5cbiAgICBwcml2YXRlIF9vbkRlc3Ryb3kgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfdGFiYmFibGVMaXN0OiBUYWJiYWJsZUxpc3RTZXJ2aWNlLCBwcml2YXRlIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmLCBmb2N1c01vbml0b3I6IEZvY3VzTW9uaXRvcikge1xuXG4gICAgICAgIHRoaXMua2V5Ym9hcmRFeHBhbmRlZCQucGlwZSh0aWNrKCksIHRha2VVbnRpbCh0aGlzLl9vbkRlc3Ryb3kpKS5zdWJzY3JpYmUoZXhwYW5kZWQgPT4ge1xuXG4gICAgICAgICAgICAvLyBFbWl0IGV2ZW50IHdoaWNoIG1heSBhbHRlciB0aGUgRE9NXG4gICAgICAgICAgICB0aGlzLmV4cGFuZGVkQ2hhbmdlLmVtaXQoZXhwYW5kZWQpO1xuXG4gICAgICAgICAgICAvLyBBY3RpdmF0ZSB0aGUgYXBwcm9wcmlhdGUgaXRlbVxuICAgICAgICAgICAgaWYgKGV4cGFuZGVkKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuY2hpbGRyZW4ubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl90YWJiYWJsZUxpc3QuYWN0aXZhdGUodGhpcy5jaGlsZHJlblswXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLl90YWJiYWJsZUxpc3QuYWN0aXZhdGUodGhpcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIGFkZCBjbGFzc2VzIHRvIGluZGljYXRlIHRoZSBvcmlnaW4gb2YgdGhlIGZvY3VzIGV2ZW50XG4gICAgICAgIGZvY3VzTW9uaXRvci5tb25pdG9yKF9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsIGZhbHNlKS5waXBlKHRha2VVbnRpbCh0aGlzLl9vbkRlc3Ryb3kpKS5zdWJzY3JpYmUoKTtcbiAgICB9XG5cbiAgICBvbkluaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuaW5pdGlhbGl6ZWQgPSB0cnVlO1xuXG4gICAgICAgIHRoaXMuX3RhYmJhYmxlTGlzdC5mb2N1c0tleU1hbmFnZXIuY2hhbmdlXG4gICAgICAgICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5fb25EZXN0cm95KSwgbWFwKCgpID0+IHRoaXMuX3RhYmJhYmxlTGlzdC5pc0l0ZW1BY3RpdmUodGhpcykpKVxuICAgICAgICAgICAgLnN1YnNjcmliZShhY3RpdmUgPT4gdGhpcy50YWJpbmRleCA9IGFjdGl2ZSA/IDAgOiAtMSk7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG5cbiAgICAgICAgLy8gY2hlY2sgaWYgdGhpcyBpcyB0aGUgY3VycmVudGx5IGZvY3VzZWQgaXRlbSAtIGlmIHNvIHdlIG5lZWQgdG8gbWFrZSBhbm90aGVyIGl0ZW0gdGFiYmFibGVcbiAgICAgICAgaWYgKHRoaXMudGFiaW5kZXggPT09IDApIHtcbiAgICAgICAgICAgIHRoaXMuX3RhYmJhYmxlTGlzdC5zZXRGaXJzdEl0ZW1UYWJiYWJsZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fb25EZXN0cm95Lm5leHQoKTtcbiAgICAgICAgdGhpcy5fb25EZXN0cm95LmNvbXBsZXRlKCk7XG4gICAgfVxuXG4gICAgQEhvc3RMaXN0ZW5lcignZm9jdXMnKVxuICAgIGZvY3VzKCk6IHZvaWQge1xuXG4gICAgICAgIC8vIGFwcGx5IGZvY3VzIHRvIHRoZSBlbGVtZW50XG4gICAgICAgIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuXG4gICAgICAgIC8vIGVuc3VyZSB0aGUgZm9jdXMga2V5IG1hbmFnZXIgdXBkYXRlcyB0aGUgYWN0aXZlIGl0ZW0gY29ycmVjdGx5XG4gICAgICAgIHRoaXMuX3RhYmJhYmxlTGlzdC5hY3RpdmF0ZSh0aGlzKTtcbiAgICB9XG5cbiAgICBASG9zdExpc3RlbmVyKCdrZXlkb3duJywgWyckZXZlbnQnXSlcbiAgICBvbktleWRvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fdGFiYmFibGVMaXN0Lm9uS2V5ZG93bih0aGlzLCBldmVudCk7XG4gICAgfVxufSJdfQ==