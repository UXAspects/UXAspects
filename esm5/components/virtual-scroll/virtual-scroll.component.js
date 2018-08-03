/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, EventEmitter, Output, Input, HostListener, ElementRef, ContentChild, TemplateRef } from '@angular/core';
import { ResizeService } from '../../directives/resize/index';
import { VirtualScrollLoadingDirective } from './directives/virtual-scroll-loading.directive';
import { VirtualScrollLoadButtonDirective } from './directives/virtual-scroll-load-button.directive';
import { VirtualScrollCellDirective } from './directives/virtual-scroll-cell.directive';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
var VirtualScrollComponent = /** @class */ (function () {
    function VirtualScrollComponent(_elementRef, resizeService) {
        var _this = this;
        this._elementRef = _elementRef;
        this.collection = Observable.create();
        this.loadOnScroll = true;
        this.loading = new EventEmitter();
        this.cells = new BehaviorSubject([]);
        this.scrollTop = 0;
        this.isLoading = false;
        this.pageNumber = 0;
        this.data = [];
        this.loadingComplete = false;
        // watch for any future changes to size
        resizeService.addResizeListener(_elementRef.nativeElement).subscribe(function (event) { return _this._height = event.height; });
    }
    /**
     * @return {?}
     */
    VirtualScrollComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        if (!this.cellHeight) {
            throw new Error('Virtual Scroll Component requires "cellHeight" property to be defined.');
        }
        // subscribe to the collection
        this.setupObservable();
        // load the first page of data
        this.loadNextPage();
    };
    /**
     * @return {?}
     */
    VirtualScrollComponent.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        // re-render cells now that we can display any loading indicator or loading button
        this.renderCells();
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    VirtualScrollComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (changes["collection"] && changes["collection"].currentValue !== changes["collection"].previousValue && !changes["collection"].isFirstChange()) {
            this.setupObservable();
            this.reset();
        }
    };
    /**
     * @return {?}
     */
    VirtualScrollComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._subscription.unsubscribe();
    };
    /**
     * @return {?}
     */
    VirtualScrollComponent.prototype.setupObservable = /**
     * @return {?}
     */
    function () {
        var _this = this;
        // if there is a current subscription, unsubscribe
        if (this._subscription && this._subscription.unsubscribe) {
            this._subscription.unsubscribe();
        }
        this._subscription = this.collection.subscribe(function (collection) {
            (_a = _this.data).push.apply(_a, tslib_1.__spread(collection));
            _this.renderCells();
            _this.isLoading = false;
            var _a;
        }, null, function () {
            _this.loadingComplete = true;
        });
    };
    /**
     * @return {?}
     */
    VirtualScrollComponent.prototype.renderCells = /**
     * @return {?}
     */
    function () {
        this.cells.next(this.getVisibleCells());
        if (this.loadOnScroll && !this.isLoading && !this.loadingComplete) {
            var /** @type {?} */ remainingScroll = this._elementRef.nativeElement.scrollHeight - (this._elementRef.nativeElement.scrollTop + this._elementRef.nativeElement.clientHeight);
            // if the current cells take up less than the height of the component then load the next page
            if (remainingScroll <= this._elementRef.nativeElement.clientHeight) {
                this.loadNextPage();
            }
        }
    };
    /**
     * @return {?}
     */
    VirtualScrollComponent.prototype.getVisibleCells = /**
     * @return {?}
     */
    function () {
        // store the initial element height
        if (!this._height) {
            this._height = this._elementRef.nativeElement.offsetHeight;
        }
        // perform some calculations
        var /** @type {?} */ scrollTop = this._elementRef.nativeElement.scrollTop;
        var /** @type {?} */ startCell = Math.floor(scrollTop / this.cellHeight);
        var /** @type {?} */ endCell = Math.ceil(this._height / this.cellHeight) + 1;
        // update the scroll position
        this.scrollTop = scrollTop - (scrollTop % this.cellHeight);
        // return a sublist of items visible on the screen
        return this.data.slice(startCell, startCell + endCell);
    };
    /**
     * @return {?}
     */
    VirtualScrollComponent.prototype.getTotalHeight = /**
     * @return {?}
     */
    function () {
        return this.cellHeight * this.data.length;
    };
    /**
     * @return {?}
     */
    VirtualScrollComponent.prototype.loadNextPage = /**
     * @return {?}
     */
    function () {
        this.isLoading = true;
        this.loading.next(this.pageNumber);
        this.pageNumber++;
    };
    /**
     * @return {?}
     */
    VirtualScrollComponent.prototype.reset = /**
     * @return {?}
     */
    function () {
        // reset all values
        this.scrollTop = 0;
        this.data = [];
        this._height = undefined;
        this.pageNumber = 0;
        this.loadingComplete = false;
        // set scroll position
        this._elementRef.nativeElement.scrollTop = 0;
        // clear the current cells
        this.renderCells();
        // reload first page
        this.loadNextPage();
    };
    VirtualScrollComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ux-virtual-scroll',
                    template: "<div class=\"virtual-scroll-content-height\" [style.height.px]=\"getTotalHeight()\"></div>\n<div class=\"virtual-scroll-content\" [style.transform]=\"'translateY(' + scrollTop + 'px)'\">\n\n    <!-- Virtually Render Cells -->\n    <ng-container *ngFor=\"let cell of cells | async\">\n        <ng-container *ngTemplateOutlet=\"cellTemplate; context: { cell: cell }\"></ng-container>\n    </ng-container>\n\n    <!-- Loading Indicator -->\n    <ng-container *ngIf=\"loadingIndicatorTemplate && isLoading\" [ngTemplateOutlet]=\"loadingIndicatorTemplate\"></ng-container>\n\n    <!-- Loading Button -->\n    <div class=\"virtual-scroll-load-button\" *ngIf=\"loadButtonTemplate && !loadOnScroll && !loadingComplete && !isLoading\" (click)=\"loadNextPage()\">\n        <ng-container *ngTemplateOutlet=\"loadButtonTemplate\"></ng-container>\n    </div>\n    \n</div>"
                }] }
    ];
    /** @nocollapse */
    VirtualScrollComponent.ctorParameters = function () { return [
        { type: ElementRef },
        { type: ResizeService }
    ]; };
    VirtualScrollComponent.propDecorators = {
        collection: [{ type: Input }],
        cellHeight: [{ type: Input }],
        loadOnScroll: [{ type: Input }],
        loading: [{ type: Output }],
        cellTemplate: [{ type: ContentChild, args: [VirtualScrollCellDirective, { read: TemplateRef },] }],
        loadingIndicatorTemplate: [{ type: ContentChild, args: [VirtualScrollLoadingDirective, { read: TemplateRef },] }],
        loadButtonTemplate: [{ type: ContentChild, args: [VirtualScrollLoadButtonDirective, { read: TemplateRef },] }],
        renderCells: [{ type: HostListener, args: ['scroll',] }]
    };
    return VirtualScrollComponent;
}());
export { VirtualScrollComponent };
function VirtualScrollComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    VirtualScrollComponent.prototype.collection;
    /** @type {?} */
    VirtualScrollComponent.prototype.cellHeight;
    /** @type {?} */
    VirtualScrollComponent.prototype.loadOnScroll;
    /** @type {?} */
    VirtualScrollComponent.prototype.loading;
    /** @type {?} */
    VirtualScrollComponent.prototype.cellTemplate;
    /** @type {?} */
    VirtualScrollComponent.prototype.loadingIndicatorTemplate;
    /** @type {?} */
    VirtualScrollComponent.prototype.loadButtonTemplate;
    /** @type {?} */
    VirtualScrollComponent.prototype.cells;
    /** @type {?} */
    VirtualScrollComponent.prototype.scrollTop;
    /** @type {?} */
    VirtualScrollComponent.prototype.isLoading;
    /** @type {?} */
    VirtualScrollComponent.prototype.pageNumber;
    /** @type {?} */
    VirtualScrollComponent.prototype.data;
    /** @type {?} */
    VirtualScrollComponent.prototype.loadingComplete;
    /** @type {?} */
    VirtualScrollComponent.prototype._subscription;
    /** @type {?} */
    VirtualScrollComponent.prototype._height;
    /** @type {?} */
    VirtualScrollComponent.prototype._elementRef;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlydHVhbC1zY3JvbGwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvdmlydHVhbC1zY3JvbGwvdmlydHVhbC1zY3JvbGwuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxZQUFZLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxZQUFZLEVBQUUsVUFBVSxFQUFvQixZQUFZLEVBQUUsV0FBVyxFQUE0QixNQUFNLGVBQWUsQ0FBQztBQUNoTCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDOUQsT0FBTyxFQUFFLDZCQUE2QixFQUFFLE1BQU0sK0NBQStDLENBQUM7QUFDOUYsT0FBTyxFQUFFLGdDQUFnQyxFQUFFLE1BQU0sbURBQW1ELENBQUM7QUFDckcsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0sNENBQTRDLENBQUM7QUFDeEYsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQzs7SUE2QnpDLGdDQUFvQixXQUF1QixFQUFFLGFBQTRCO1FBQXpFLGlCQUlDO1FBSm1CLGdCQUFXLEdBQVgsV0FBVyxDQUFZOzBCQXBCRixVQUFVLENBQUMsTUFBTSxFQUFFOzRCQUUzQixJQUFJO3VCQUVLLElBQUksWUFBWSxFQUFVO3FCQU1wQyxJQUFJLGVBQWUsQ0FBQyxFQUFFLENBQUM7eUJBQ25DLENBQUM7eUJBQ0EsS0FBSzswQkFDTCxDQUFDO29CQUNSLEVBQUU7K0JBQ1csS0FBSzs7UUFRNUIsYUFBYSxDQUFDLGlCQUFpQixDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBQSxLQUFLLElBQUksT0FBQSxLQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQyxN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Szs2QkFDTCxLQUFLOytCQUNMLEtBQUs7MEJBRUwsTUFBTTsrQkFFTixZQUFZLFNBQUMsMEJBQTBCLEVBQUUsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFOzJDQUM5RCxZQUFZLFNBQUMsNkJBQTZCLEVBQUUsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFO3FDQUNqRSxZQUFZLFNBQUMsZ0NBQWdDLEVBQUUsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFOzhCQStEcEUsWUFBWSxTQUFDLFFBQVE7O2lDQXRGMUI7O1NBYWEsc0JBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIEV2ZW50RW1pdHRlciwgT3V0cHV0LCBJbnB1dCwgSG9zdExpc3RlbmVyLCBFbGVtZW50UmVmLCBBZnRlckNvbnRlbnRJbml0LCBDb250ZW50Q2hpbGQsIFRlbXBsYXRlUmVmLCBPbkRlc3Ryb3ksIFNpbXBsZUNoYW5nZXMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJlc2l6ZVNlcnZpY2UgfSBmcm9tICcuLi8uLi9kaXJlY3RpdmVzL3Jlc2l6ZS9pbmRleCc7XG5pbXBvcnQgeyBWaXJ0dWFsU2Nyb2xsTG9hZGluZ0RpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlcy92aXJ0dWFsLXNjcm9sbC1sb2FkaW5nLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBWaXJ0dWFsU2Nyb2xsTG9hZEJ1dHRvbkRpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlcy92aXJ0dWFsLXNjcm9sbC1sb2FkLWJ1dHRvbi5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgVmlydHVhbFNjcm9sbENlbGxEaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZXMvdmlydHVhbC1zY3JvbGwtY2VsbC5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcy9CZWhhdmlvclN1YmplY3QnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzL1N1YnNjcmlwdGlvbic7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAndXgtdmlydHVhbC1zY3JvbGwnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi92aXJ0dWFsLXNjcm9sbC5jb21wb25lbnQuaHRtbCdcbn0pXG5leHBvcnQgY2xhc3MgVmlydHVhbFNjcm9sbENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgQWZ0ZXJDb250ZW50SW5pdCwgT25EZXN0cm95IHtcblxuICAgIEBJbnB1dCgpIGNvbGxlY3Rpb246IE9ic2VydmFibGU8YW55W10+ID0gT2JzZXJ2YWJsZS5jcmVhdGUoKTtcbiAgICBASW5wdXQoKSBjZWxsSGVpZ2h0OiBudW1iZXI7XG4gICAgQElucHV0KCkgbG9hZE9uU2Nyb2xsOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIEBPdXRwdXQoKSBsb2FkaW5nOiBFdmVudEVtaXR0ZXI8bnVtYmVyPiA9IG5ldyBFdmVudEVtaXR0ZXI8bnVtYmVyPigpO1xuXG4gICAgQENvbnRlbnRDaGlsZChWaXJ0dWFsU2Nyb2xsQ2VsbERpcmVjdGl2ZSwgeyByZWFkOiBUZW1wbGF0ZVJlZiB9KSBjZWxsVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG4gICAgQENvbnRlbnRDaGlsZChWaXJ0dWFsU2Nyb2xsTG9hZGluZ0RpcmVjdGl2ZSwgeyByZWFkOiBUZW1wbGF0ZVJlZiB9KSBsb2FkaW5nSW5kaWNhdG9yVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG4gICAgQENvbnRlbnRDaGlsZChWaXJ0dWFsU2Nyb2xsTG9hZEJ1dHRvbkRpcmVjdGl2ZSwgeyByZWFkOiBUZW1wbGF0ZVJlZiB9KSBsb2FkQnV0dG9uVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgICBjZWxsczogQmVoYXZpb3JTdWJqZWN0PGFueVtdPiA9IG5ldyBCZWhhdmlvclN1YmplY3QoW10pO1xuICAgIHNjcm9sbFRvcDogbnVtYmVyID0gMDtcbiAgICBpc0xvYWRpbmc6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBwYWdlTnVtYmVyOiBudW1iZXIgPSAwO1xuICAgIGRhdGE6IGFueVtdID0gW107XG4gICAgbG9hZGluZ0NvbXBsZXRlOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBwcml2YXRlIF9zdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcbiAgICBwcml2YXRlIF9oZWlnaHQ6IG51bWJlcjtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWYsIHJlc2l6ZVNlcnZpY2U6IFJlc2l6ZVNlcnZpY2UpIHtcblxuICAgICAgICAvLyB3YXRjaCBmb3IgYW55IGZ1dHVyZSBjaGFuZ2VzIHRvIHNpemVcbiAgICAgICAgcmVzaXplU2VydmljZS5hZGRSZXNpemVMaXN0ZW5lcihfZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KS5zdWJzY3JpYmUoZXZlbnQgPT4gdGhpcy5faGVpZ2h0ID0gZXZlbnQuaGVpZ2h0KTtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcblxuICAgICAgICBpZiAoIXRoaXMuY2VsbEhlaWdodCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdWaXJ0dWFsIFNjcm9sbCBDb21wb25lbnQgcmVxdWlyZXMgXCJjZWxsSGVpZ2h0XCIgcHJvcGVydHkgdG8gYmUgZGVmaW5lZC4nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHN1YnNjcmliZSB0byB0aGUgY29sbGVjdGlvblxuICAgICAgICB0aGlzLnNldHVwT2JzZXJ2YWJsZSgpO1xuXG4gICAgICAgIC8vIGxvYWQgdGhlIGZpcnN0IHBhZ2Ugb2YgZGF0YVxuICAgICAgICB0aGlzLmxvYWROZXh0UGFnZSgpO1xuICAgIH1cblxuICAgIG5nQWZ0ZXJDb250ZW50SW5pdCgpOiB2b2lkIHtcbiAgICAgICAgLy8gcmUtcmVuZGVyIGNlbGxzIG5vdyB0aGF0IHdlIGNhbiBkaXNwbGF5IGFueSBsb2FkaW5nIGluZGljYXRvciBvciBsb2FkaW5nIGJ1dHRvblxuICAgICAgICB0aGlzLnJlbmRlckNlbGxzKCk7XG4gICAgfVxuXG4gICAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuICAgICAgICBpZiAoY2hhbmdlcy5jb2xsZWN0aW9uICYmIGNoYW5nZXMuY29sbGVjdGlvbi5jdXJyZW50VmFsdWUgIT09IGNoYW5nZXMuY29sbGVjdGlvbi5wcmV2aW91c1ZhbHVlICYmICFjaGFuZ2VzLmNvbGxlY3Rpb24uaXNGaXJzdENoYW5nZSgpKSB7XG4gICAgICAgICAgICB0aGlzLnNldHVwT2JzZXJ2YWJsZSgpO1xuICAgICAgICAgICAgdGhpcy5yZXNldCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX3N1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIH1cblxuICAgIHNldHVwT2JzZXJ2YWJsZSgpOiB2b2lkIHtcblxuICAgICAgICAvLyBpZiB0aGVyZSBpcyBhIGN1cnJlbnQgc3Vic2NyaXB0aW9uLCB1bnN1YnNjcmliZVxuICAgICAgICBpZiAodGhpcy5fc3Vic2NyaXB0aW9uICYmIHRoaXMuX3N1YnNjcmlwdGlvbi51bnN1YnNjcmliZSkge1xuICAgICAgICAgICAgdGhpcy5fc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9zdWJzY3JpcHRpb24gPSB0aGlzLmNvbGxlY3Rpb24uc3Vic2NyaWJlKGNvbGxlY3Rpb24gPT4ge1xuICAgICAgICAgICAgdGhpcy5kYXRhLnB1c2goLi4uY29sbGVjdGlvbik7XG4gICAgICAgICAgICB0aGlzLnJlbmRlckNlbGxzKCk7XG4gICAgICAgICAgICB0aGlzLmlzTG9hZGluZyA9IGZhbHNlO1xuICAgICAgICB9LCBudWxsLCAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmxvYWRpbmdDb21wbGV0ZSA9IHRydWU7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIEBIb3N0TGlzdGVuZXIoJ3Njcm9sbCcpIHJlbmRlckNlbGxzKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmNlbGxzLm5leHQodGhpcy5nZXRWaXNpYmxlQ2VsbHMoKSk7XG5cbiAgICAgICAgaWYgKHRoaXMubG9hZE9uU2Nyb2xsICYmICF0aGlzLmlzTG9hZGluZyAmJiAhdGhpcy5sb2FkaW5nQ29tcGxldGUpIHtcbiAgICAgICAgICAgIGNvbnN0IHJlbWFpbmluZ1Njcm9sbCA9IHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5zY3JvbGxIZWlnaHQgLSAodGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnNjcm9sbFRvcCArIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5jbGllbnRIZWlnaHQpO1xuXG4gICAgICAgICAgICAvLyBpZiB0aGUgY3VycmVudCBjZWxscyB0YWtlIHVwIGxlc3MgdGhhbiB0aGUgaGVpZ2h0IG9mIHRoZSBjb21wb25lbnQgdGhlbiBsb2FkIHRoZSBuZXh0IHBhZ2VcbiAgICAgICAgICAgIGlmIChyZW1haW5pbmdTY3JvbGwgPD0gdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmNsaWVudEhlaWdodCkge1xuICAgICAgICAgICAgICAgIHRoaXMubG9hZE5leHRQYWdlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRWaXNpYmxlQ2VsbHMoKTogYW55W10ge1xuXG4gICAgICAgIC8vIHN0b3JlIHRoZSBpbml0aWFsIGVsZW1lbnQgaGVpZ2h0XG4gICAgICAgIGlmICghdGhpcy5faGVpZ2h0KSB7XG4gICAgICAgICAgICB0aGlzLl9oZWlnaHQgPSB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQub2Zmc2V0SGVpZ2h0O1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gcGVyZm9ybSBzb21lIGNhbGN1bGF0aW9uc1xuICAgICAgICBjb25zdCBzY3JvbGxUb3AgPSB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuc2Nyb2xsVG9wO1xuICAgICAgICBjb25zdCBzdGFydENlbGwgPSBNYXRoLmZsb29yKHNjcm9sbFRvcCAvIHRoaXMuY2VsbEhlaWdodCk7XG4gICAgICAgIGNvbnN0IGVuZENlbGwgPSBNYXRoLmNlaWwodGhpcy5faGVpZ2h0IC8gdGhpcy5jZWxsSGVpZ2h0KSArIDE7XG5cbiAgICAgICAgLy8gdXBkYXRlIHRoZSBzY3JvbGwgcG9zaXRpb25cbiAgICAgICAgdGhpcy5zY3JvbGxUb3AgPSBzY3JvbGxUb3AgLSAoc2Nyb2xsVG9wICUgdGhpcy5jZWxsSGVpZ2h0KTtcblxuICAgICAgICAvLyByZXR1cm4gYSBzdWJsaXN0IG9mIGl0ZW1zIHZpc2libGUgb24gdGhlIHNjcmVlblxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLnNsaWNlKHN0YXJ0Q2VsbCwgc3RhcnRDZWxsICsgZW5kQ2VsbCk7XG4gICAgfVxuXG4gICAgZ2V0VG90YWxIZWlnaHQoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2VsbEhlaWdodCAqIHRoaXMuZGF0YS5sZW5ndGg7XG4gICAgfVxuXG4gICAgbG9hZE5leHRQYWdlKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmlzTG9hZGluZyA9IHRydWU7XG4gICAgICAgIHRoaXMubG9hZGluZy5uZXh0KHRoaXMucGFnZU51bWJlcik7XG4gICAgICAgIHRoaXMucGFnZU51bWJlcisrO1xuICAgIH1cblxuICAgIHJlc2V0KCk6IHZvaWQge1xuXG4gICAgICAgIC8vIHJlc2V0IGFsbCB2YWx1ZXNcbiAgICAgICAgdGhpcy5zY3JvbGxUb3AgPSAwO1xuICAgICAgICB0aGlzLmRhdGEgPSBbXTtcbiAgICAgICAgdGhpcy5faGVpZ2h0ID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLnBhZ2VOdW1iZXIgPSAwO1xuICAgICAgICB0aGlzLmxvYWRpbmdDb21wbGV0ZSA9IGZhbHNlO1xuXG4gICAgICAgIC8vIHNldCBzY3JvbGwgcG9zaXRpb25cbiAgICAgICAgdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnNjcm9sbFRvcCA9IDA7XG5cbiAgICAgICAgLy8gY2xlYXIgdGhlIGN1cnJlbnQgY2VsbHNcbiAgICAgICAgdGhpcy5yZW5kZXJDZWxscygpO1xuXG4gICAgICAgIC8vIHJlbG9hZCBmaXJzdCBwYWdlXG4gICAgICAgIHRoaXMubG9hZE5leHRQYWdlKCk7XG4gICAgfVxuXG59Il19