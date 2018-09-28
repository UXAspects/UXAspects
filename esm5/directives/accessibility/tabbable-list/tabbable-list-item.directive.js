/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Directive, ElementRef, EventEmitter, HostBinding, HostListener, Input, Output } from '@angular/core';
import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { tick } from '../../../common/index';
import { TabbableListService } from './tabbable-list.service';
var /** @type {?} */ nextId = 0;
var TabbableListItemDirective = /** @class */ (function () {
    function TabbableListItemDirective(_tabbableList, _elementRef) {
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
        { type: ElementRef }
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiYmFibGUtbGlzdC1pdGVtLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJkaXJlY3RpdmVzL2FjY2Vzc2liaWxpdHkvdGFiYmFibGUtbGlzdC90YWJiYWJsZS1saXN0LWl0ZW0uZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFDQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsV0FBVyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQWEsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pILE9BQU8sRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDaEQsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUN2QyxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDN0MsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFFOUQscUJBQUksTUFBTSxHQUFHLENBQUMsQ0FBQzs7SUE4QlgsbUNBQW9CLGFBQWtDLEVBQVUsV0FBdUI7UUFBdkYsaUJBZ0JDO1FBaEJtQixrQkFBYSxHQUFiLGFBQWEsQ0FBcUI7UUFBVSxnQkFBVyxHQUFYLFdBQVcsQ0FBWTtvQkFwQi9ELENBQUM7d0JBRUksS0FBSzt3QkFFTCxLQUFLOzhCQUVQLElBQUksWUFBWSxFQUFXO3dCQUVwQixDQUFDLENBQUM7a0JBRXZCLE1BQU0sRUFBRTsyQkFFRSxLQUFLO3dCQUVZLEVBQUU7aUNBRXRCLElBQUksT0FBTyxFQUFXOzBCQUVyQixJQUFJLE9BQU8sRUFBUTtRQUlwQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxFQUFFLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBQSxRQUFROztZQUc5RSxBQURBLHFDQUFxQztZQUNyQyxLQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQzs7WUFHbkMsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztnQkFDWCxFQUFFLENBQUMsQ0FBQyxLQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUMzQixLQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxLQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7aUJBQ2pEO2FBQ0o7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDSixLQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxLQUFJLENBQUMsQ0FBQzthQUNyQztTQUNKLENBQUMsQ0FBQztLQUNOOzs7O0lBRUQsMENBQU07OztJQUFOO1FBQUEsaUJBTUM7UUFMRyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztRQUV4QixJQUFJLENBQUMsYUFBYSxDQUFDLGVBQWUsQ0FBQyxNQUFNO2FBQ3BDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxjQUFNLE9BQUEsS0FBSSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsS0FBSSxDQUFDLEVBQXJDLENBQXFDLENBQUMsQ0FBQzthQUNsRixTQUFTLENBQUMsVUFBQSxNQUFNLElBQUksT0FBQSxLQUFJLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBL0IsQ0FBK0IsQ0FBQyxDQUFDO0tBQzdEOzs7O0lBRUQsK0NBQVc7OztJQUFYOztRQUdJLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN0QixJQUFJLENBQUMsYUFBYSxDQUFDLG9CQUFvQixFQUFFLENBQUM7U0FDN0M7UUFFRCxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFLENBQUM7S0FDOUI7Ozs7SUFHRCx5Q0FBSzs7O0lBREw7O1FBSUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLENBQUM7O1FBR3ZDLElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQ3JDOzs7OztJQUdELDZDQUFTOzs7O0lBRFQsVUFDVSxLQUFvQjtRQUMxQixJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7S0FDN0M7O2dCQTlFSixTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLHNCQUFzQjtvQkFDaEMsUUFBUSxFQUFFLHVCQUF1QjtpQkFDcEM7Ozs7Z0JBUFEsbUJBQW1CO2dCQUpSLFVBQVU7Ozt5QkFjekIsS0FBSzt1QkFFTCxLQUFLOzJCQUVMLEtBQUs7MkJBRUwsS0FBSztpQ0FFTCxNQUFNOzJCQUVOLFdBQVc7d0JBaURYLFlBQVksU0FBQyxPQUFPOzRCQVVwQixZQUFZLFNBQUMsU0FBUyxFQUFFLENBQUMsUUFBUSxDQUFDOztvQ0FwRnZDOztTQWFhLHlCQUF5QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEZvY3VzYWJsZU9wdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9hMTF5JztcbmltcG9ydCB7IERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBIb3N0QmluZGluZywgSG9zdExpc3RlbmVyLCBJbnB1dCwgT25EZXN0cm95LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IG1hcCwgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMvU3ViamVjdCc7XG5pbXBvcnQgeyB0aWNrIH0gZnJvbSAnLi4vLi4vLi4vY29tbW9uL2luZGV4JztcbmltcG9ydCB7IFRhYmJhYmxlTGlzdFNlcnZpY2UgfSBmcm9tICcuL3RhYmJhYmxlLWxpc3Quc2VydmljZSc7XG5cbmxldCBuZXh0SWQgPSAwO1xuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ1t1eFRhYmJhYmxlTGlzdEl0ZW1dJyxcbiAgICBleHBvcnRBczogJ3V4LXRhYmJhYmxlLWxpc3QtaXRlbSdcbn0pXG5leHBvcnQgY2xhc3MgVGFiYmFibGVMaXN0SXRlbURpcmVjdGl2ZSBpbXBsZW1lbnRzIEZvY3VzYWJsZU9wdGlvbiwgT25EZXN0cm95IHtcblxuICAgIEBJbnB1dCgpIHBhcmVudDogVGFiYmFibGVMaXN0SXRlbURpcmVjdGl2ZTtcblxuICAgIEBJbnB1dCgpIHJhbms6IG51bWJlciA9IDA7XG5cbiAgICBASW5wdXQoKSBkaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgQElucHV0KCkgZXhwYW5kZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIEBPdXRwdXQoKSBleHBhbmRlZENoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcblxuICAgIEBIb3N0QmluZGluZygpIHRhYmluZGV4OiBudW1iZXIgPSAtMTtcblxuICAgIGlkOiBudW1iZXIgPSBuZXh0SWQrKztcblxuICAgIGluaXRpYWxpemVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBjaGlsZHJlbjogVGFiYmFibGVMaXN0SXRlbURpcmVjdGl2ZVtdID0gW107XG5cbiAgICBrZXlib2FyZEV4cGFuZGVkJCA9IG5ldyBTdWJqZWN0PGJvb2xlYW4+KCk7XG5cbiAgICBwcml2YXRlIF9vbkRlc3Ryb3kgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfdGFiYmFibGVMaXN0OiBUYWJiYWJsZUxpc3RTZXJ2aWNlLCBwcml2YXRlIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmKSB7XG5cbiAgICAgICAgdGhpcy5rZXlib2FyZEV4cGFuZGVkJC5waXBlKHRpY2soKSwgdGFrZVVudGlsKHRoaXMuX29uRGVzdHJveSkpLnN1YnNjcmliZShleHBhbmRlZCA9PiB7XG5cbiAgICAgICAgICAgIC8vIEVtaXQgZXZlbnQgd2hpY2ggbWF5IGFsdGVyIHRoZSBET01cbiAgICAgICAgICAgIHRoaXMuZXhwYW5kZWRDaGFuZ2UuZW1pdChleHBhbmRlZCk7XG5cbiAgICAgICAgICAgIC8vIEFjdGl2YXRlIHRoZSBhcHByb3ByaWF0ZSBpdGVtXG4gICAgICAgICAgICBpZiAoZXhwYW5kZWQpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5jaGlsZHJlbi5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3RhYmJhYmxlTGlzdC5hY3RpdmF0ZSh0aGlzLmNoaWxkcmVuWzBdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuX3RhYmJhYmxlTGlzdC5hY3RpdmF0ZSh0aGlzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgb25Jbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLmluaXRpYWxpemVkID0gdHJ1ZTtcblxuICAgICAgICB0aGlzLl90YWJiYWJsZUxpc3QuZm9jdXNLZXlNYW5hZ2VyLmNoYW5nZVxuICAgICAgICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMuX29uRGVzdHJveSksIG1hcCgoKSA9PiB0aGlzLl90YWJiYWJsZUxpc3QuaXNJdGVtQWN0aXZlKHRoaXMpKSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoYWN0aXZlID0+IHRoaXMudGFiaW5kZXggPSBhY3RpdmUgPyAwIDogLTEpO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCk6IHZvaWQge1xuXG4gICAgICAgIC8vIGNoZWNrIGlmIHRoaXMgaXMgdGhlIGN1cnJlbnRseSBmb2N1c2VkIGl0ZW0gLSBpZiBzbyB3ZSBuZWVkIHRvIG1ha2UgYW5vdGhlciBpdGVtIHRhYmJhYmxlXG4gICAgICAgIGlmICh0aGlzLnRhYmluZGV4ID09PSAwKSB7XG4gICAgICAgICAgICB0aGlzLl90YWJiYWJsZUxpc3Quc2V0Rmlyc3RJdGVtVGFiYmFibGUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX29uRGVzdHJveS5uZXh0KCk7XG4gICAgICAgIHRoaXMuX29uRGVzdHJveS5jb21wbGV0ZSgpO1xuICAgIH1cblxuICAgIEBIb3N0TGlzdGVuZXIoJ2ZvY3VzJylcbiAgICBmb2N1cygpOiB2b2lkIHtcblxuICAgICAgICAvLyBhcHBseSBmb2N1cyB0byB0aGUgZWxlbWVudFxuICAgICAgICB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcblxuICAgICAgICAvLyBlbnN1cmUgdGhlIGZvY3VzIGtleSBtYW5hZ2VyIHVwZGF0ZXMgdGhlIGFjdGl2ZSBpdGVtIGNvcnJlY3RseVxuICAgICAgICB0aGlzLl90YWJiYWJsZUxpc3QuYWN0aXZhdGUodGhpcyk7XG4gICAgfVxuXG4gICAgQEhvc3RMaXN0ZW5lcigna2V5ZG93bicsIFsnJGV2ZW50J10pXG4gICAgb25LZXlkb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KTogdm9pZCB7XG4gICAgICAgIHRoaXMuX3RhYmJhYmxlTGlzdC5vbktleWRvd24odGhpcywgZXZlbnQpO1xuICAgIH1cbn0iXX0=