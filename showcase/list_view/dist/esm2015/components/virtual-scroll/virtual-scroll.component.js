/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, EventEmitter, Output, Input, HostListener, ElementRef, ContentChild, TemplateRef } from '@angular/core';
import { ResizeService } from '../../directives/resize/index';
import { VirtualScrollLoadingDirective } from './directives/virtual-scroll-loading.directive';
import { VirtualScrollLoadButtonDirective } from './directives/virtual-scroll-load-button.directive';
import { VirtualScrollCellDirective } from './directives/virtual-scroll-cell.directive';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
export class VirtualScrollComponent {
    /**
     * @param {?} _elementRef
     * @param {?} resizeService
     */
    constructor(_elementRef, resizeService) {
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
        resizeService.addResizeListener(_elementRef.nativeElement).subscribe(event => this._height = event.height);
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (!this.cellHeight) {
            throw new Error('Virtual Scroll Component requires "cellHeight" property to be defined.');
        }
        // subscribe to the collection
        this.setupObservable();
        // load the first page of data
        this.loadNextPage();
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        // re-render cells now that we can display any loading indicator or loading button
        this.renderCells();
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (changes["collection"] && changes["collection"].currentValue !== changes["collection"].previousValue && !changes["collection"].isFirstChange()) {
            this.setupObservable();
            this.reset();
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._subscription.unsubscribe();
    }
    /**
     * @return {?}
     */
    setupObservable() {
        // if there is a current subscription, unsubscribe
        if (this._subscription && this._subscription.unsubscribe) {
            this._subscription.unsubscribe();
        }
        this._subscription = this.collection.subscribe(collection => {
            this.data.push(...collection);
            this.renderCells();
            this.isLoading = false;
        }, null, () => {
            this.loadingComplete = true;
        });
    }
    /**
     * @return {?}
     */
    renderCells() {
        this.cells.next(this.getVisibleCells());
        if (this.loadOnScroll && !this.isLoading && !this.loadingComplete) {
            const /** @type {?} */ remainingScroll = this._elementRef.nativeElement.scrollHeight - (this._elementRef.nativeElement.scrollTop + this._elementRef.nativeElement.clientHeight);
            // if the current cells take up less than the height of the component then load the next page
            if (remainingScroll <= this._elementRef.nativeElement.clientHeight) {
                this.loadNextPage();
            }
        }
    }
    /**
     * @return {?}
     */
    getVisibleCells() {
        // store the initial element height
        if (!this._height) {
            this._height = this._elementRef.nativeElement.offsetHeight;
        }
        // perform some calculations
        const /** @type {?} */ scrollTop = this._elementRef.nativeElement.scrollTop;
        const /** @type {?} */ startCell = Math.floor(scrollTop / this.cellHeight);
        const /** @type {?} */ endCell = Math.ceil(this._height / this.cellHeight) + 1;
        // update the scroll position
        this.scrollTop = scrollTop - (scrollTop % this.cellHeight);
        // return a sublist of items visible on the screen
        return this.data.slice(startCell, startCell + endCell);
    }
    /**
     * @return {?}
     */
    getTotalHeight() {
        return this.cellHeight * this.data.length;
    }
    /**
     * @return {?}
     */
    loadNextPage() {
        this.isLoading = true;
        this.loading.next(this.pageNumber);
        this.pageNumber++;
    }
    /**
     * @return {?}
     */
    reset() {
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
    }
}
VirtualScrollComponent.decorators = [
    { type: Component, args: [{
                selector: 'ux-virtual-scroll',
                template: `<div class="virtual-scroll-content-height" [style.height.px]="getTotalHeight()"></div>
<div class="virtual-scroll-content" [style.transform]="'translateY(' + scrollTop + 'px)'">

    <!-- Virtually Render Cells -->
    <ng-container *ngFor="let cell of cells | async">
        <ng-container *ngTemplateOutlet="cellTemplate; context: { cell: cell }"></ng-container>
    </ng-container>

    <!-- Loading Indicator -->
    <ng-container *ngIf="loadingIndicatorTemplate && isLoading" [ngTemplateOutlet]="loadingIndicatorTemplate"></ng-container>

    <!-- Loading Button -->
    <div class="virtual-scroll-load-button" *ngIf="loadButtonTemplate && !loadOnScroll && !loadingComplete && !isLoading" (click)="loadNextPage()">
        <ng-container *ngTemplateOutlet="loadButtonTemplate"></ng-container>
    </div>
    
</div>`
            },] },
];
/** @nocollapse */
VirtualScrollComponent.ctorParameters = () => [
    { type: ElementRef, },
    { type: ResizeService, },
];
VirtualScrollComponent.propDecorators = {
    "collection": [{ type: Input },],
    "cellHeight": [{ type: Input },],
    "loadOnScroll": [{ type: Input },],
    "loading": [{ type: Output },],
    "cellTemplate": [{ type: ContentChild, args: [VirtualScrollCellDirective, { read: TemplateRef },] },],
    "loadingIndicatorTemplate": [{ type: ContentChild, args: [VirtualScrollLoadingDirective, { read: TemplateRef },] },],
    "loadButtonTemplate": [{ type: ContentChild, args: [VirtualScrollLoadButtonDirective, { read: TemplateRef },] },],
    "renderCells": [{ type: HostListener, args: ['scroll',] },],
};
function VirtualScrollComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    VirtualScrollComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    VirtualScrollComponent.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    VirtualScrollComponent.propDecorators;
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlydHVhbC1zY3JvbGwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvdmlydHVhbC1zY3JvbGwvdmlydHVhbC1zY3JvbGwuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLFlBQVksRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLFlBQVksRUFBRSxVQUFVLEVBQW9CLFlBQVksRUFBRSxXQUFXLEVBQTRCLE1BQU0sZUFBZSxDQUFDO0FBQ2hMLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUM5RCxPQUFPLEVBQUUsNkJBQTZCLEVBQUUsTUFBTSwrQ0FBK0MsQ0FBQztBQUM5RixPQUFPLEVBQUUsZ0NBQWdDLEVBQUUsTUFBTSxtREFBbUQsQ0FBQztBQUNyRyxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSw0Q0FBNEMsQ0FBQztBQUN4RixPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDdkQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBdUI3QyxNQUFNOzs7OztJQXNCRixZQUFvQixXQUF1QixFQUFFLGFBQTRCO1FBQXJELGdCQUFXLEdBQVgsV0FBVyxDQUFZOzBCQXBCRixVQUFVLENBQUMsTUFBTSxFQUFFOzRCQUUzQixJQUFJO3VCQUVLLElBQUksWUFBWSxFQUFVO3FCQU1wQyxJQUFJLGVBQWUsQ0FBQyxFQUFFLENBQUM7eUJBQ25DLENBQUM7eUJBQ0EsS0FBSzswQkFDTCxDQUFDO29CQUNSLEVBQUU7K0JBQ1csS0FBSzs7UUFRNUIsYUFBYSxDQUFDLGlCQUFpQixDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsQ0FBQyxTQUFTLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxD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NkIsRUFBRSxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUU7bUNBQ2pFLFlBQVksU0FBQyxnQ0FBZ0MsRUFBRSxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUU7NEJBK0RwRSxZQUFZLFNBQUMsUUFBUSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBFdmVudEVtaXR0ZXIsIE91dHB1dCwgSW5wdXQsIEhvc3RMaXN0ZW5lciwgRWxlbWVudFJlZiwgQWZ0ZXJDb250ZW50SW5pdCwgQ29udGVudENoaWxkLCBUZW1wbGF0ZVJlZiwgT25EZXN0cm95LCBTaW1wbGVDaGFuZ2VzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSZXNpemVTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vZGlyZWN0aXZlcy9yZXNpemUvaW5kZXgnO1xuaW1wb3J0IHsgVmlydHVhbFNjcm9sbExvYWRpbmdEaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZXMvdmlydHVhbC1zY3JvbGwtbG9hZGluZy5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgVmlydHVhbFNjcm9sbExvYWRCdXR0b25EaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZXMvdmlydHVhbC1zY3JvbGwtbG9hZC1idXR0b24uZGlyZWN0aXZlJztcbmltcG9ydCB7IFZpcnR1YWxTY3JvbGxDZWxsRGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmVzL3ZpcnR1YWwtc2Nyb2xsLWNlbGwuZGlyZWN0aXZlJztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMvQmVoYXZpb3JTdWJqZWN0JztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcy9TdWJzY3JpcHRpb24nO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3V4LXZpcnR1YWwtc2Nyb2xsJyxcbiAgICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJ2aXJ0dWFsLXNjcm9sbC1jb250ZW50LWhlaWdodFwiIFtzdHlsZS5oZWlnaHQucHhdPVwiZ2V0VG90YWxIZWlnaHQoKVwiPjwvZGl2PlxuPGRpdiBjbGFzcz1cInZpcnR1YWwtc2Nyb2xsLWNvbnRlbnRcIiBbc3R5bGUudHJhbnNmb3JtXT1cIid0cmFuc2xhdGVZKCcgKyBzY3JvbGxUb3AgKyAncHgpJ1wiPlxuXG4gICAgPCEtLSBWaXJ0dWFsbHkgUmVuZGVyIENlbGxzIC0tPlxuICAgIDxuZy1jb250YWluZXIgKm5nRm9yPVwibGV0IGNlbGwgb2YgY2VsbHMgfCBhc3luY1wiPlxuICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiY2VsbFRlbXBsYXRlOyBjb250ZXh0OiB7IGNlbGw6IGNlbGwgfVwiPjwvbmctY29udGFpbmVyPlxuICAgIDwvbmctY29udGFpbmVyPlxuXG4gICAgPCEtLSBMb2FkaW5nIEluZGljYXRvciAtLT5cbiAgICA8bmctY29udGFpbmVyICpuZ0lmPVwibG9hZGluZ0luZGljYXRvclRlbXBsYXRlICYmIGlzTG9hZGluZ1wiIFtuZ1RlbXBsYXRlT3V0bGV0XT1cImxvYWRpbmdJbmRpY2F0b3JUZW1wbGF0ZVwiPjwvbmctY29udGFpbmVyPlxuXG4gICAgPCEtLSBMb2FkaW5nIEJ1dHRvbiAtLT5cbiAgICA8ZGl2IGNsYXNzPVwidmlydHVhbC1zY3JvbGwtbG9hZC1idXR0b25cIiAqbmdJZj1cImxvYWRCdXR0b25UZW1wbGF0ZSAmJiAhbG9hZE9uU2Nyb2xsICYmICFsb2FkaW5nQ29tcGxldGUgJiYgIWlzTG9hZGluZ1wiIChjbGljayk9XCJsb2FkTmV4dFBhZ2UoKVwiPlxuICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwibG9hZEJ1dHRvblRlbXBsYXRlXCI+PC9uZy1jb250YWluZXI+XG4gICAgPC9kaXY+XG4gICAgXG48L2Rpdj5gXG59KVxuZXhwb3J0IGNsYXNzIFZpcnR1YWxTY3JvbGxDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyQ29udGVudEluaXQsIE9uRGVzdHJveSB7XG5cbiAgICBASW5wdXQoKSBjb2xsZWN0aW9uOiBPYnNlcnZhYmxlPGFueVtdPiA9IE9ic2VydmFibGUuY3JlYXRlKCk7XG4gICAgQElucHV0KCkgY2VsbEhlaWdodDogbnVtYmVyO1xuICAgIEBJbnB1dCgpIGxvYWRPblNjcm9sbDogYm9vbGVhbiA9IHRydWU7XG5cbiAgICBAT3V0cHV0KCkgbG9hZGluZzogRXZlbnRFbWl0dGVyPG51bWJlcj4gPSBuZXcgRXZlbnRFbWl0dGVyPG51bWJlcj4oKTtcblxuICAgIEBDb250ZW50Q2hpbGQoVmlydHVhbFNjcm9sbENlbGxEaXJlY3RpdmUsIHsgcmVhZDogVGVtcGxhdGVSZWYgfSkgY2VsbFRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuICAgIEBDb250ZW50Q2hpbGQoVmlydHVhbFNjcm9sbExvYWRpbmdEaXJlY3RpdmUsIHsgcmVhZDogVGVtcGxhdGVSZWYgfSkgbG9hZGluZ0luZGljYXRvclRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuICAgIEBDb250ZW50Q2hpbGQoVmlydHVhbFNjcm9sbExvYWRCdXR0b25EaXJlY3RpdmUsIHsgcmVhZDogVGVtcGxhdGVSZWYgfSkgbG9hZEJ1dHRvblRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gICAgY2VsbHM6IEJlaGF2aW9yU3ViamVjdDxhbnlbXT4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0KFtdKTtcbiAgICBzY3JvbGxUb3A6IG51bWJlciA9IDA7XG4gICAgaXNMb2FkaW5nOiBib29sZWFuID0gZmFsc2U7XG4gICAgcGFnZU51bWJlcjogbnVtYmVyID0gMDtcbiAgICBkYXRhOiBhbnlbXSA9IFtdO1xuICAgIGxvYWRpbmdDb21wbGV0ZTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgcHJpdmF0ZSBfc3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG4gICAgcHJpdmF0ZSBfaGVpZ2h0OiBudW1iZXI7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmLCByZXNpemVTZXJ2aWNlOiBSZXNpemVTZXJ2aWNlKSB7XG5cbiAgICAgICAgLy8gd2F0Y2ggZm9yIGFueSBmdXR1cmUgY2hhbmdlcyB0byBzaXplXG4gICAgICAgIHJlc2l6ZVNlcnZpY2UuYWRkUmVzaXplTGlzdGVuZXIoX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCkuc3Vic2NyaWJlKGV2ZW50ID0+IHRoaXMuX2hlaWdodCA9IGV2ZW50LmhlaWdodCk7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG5cbiAgICAgICAgaWYgKCF0aGlzLmNlbGxIZWlnaHQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVmlydHVhbCBTY3JvbGwgQ29tcG9uZW50IHJlcXVpcmVzIFwiY2VsbEhlaWdodFwiIHByb3BlcnR5IHRvIGJlIGRlZmluZWQuJyk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBzdWJzY3JpYmUgdG8gdGhlIGNvbGxlY3Rpb25cbiAgICAgICAgdGhpcy5zZXR1cE9ic2VydmFibGUoKTtcblxuICAgICAgICAvLyBsb2FkIHRoZSBmaXJzdCBwYWdlIG9mIGRhdGFcbiAgICAgICAgdGhpcy5sb2FkTmV4dFBhZ2UoKTtcbiAgICB9XG5cbiAgICBuZ0FmdGVyQ29udGVudEluaXQoKTogdm9pZCB7XG4gICAgICAgIC8vIHJlLXJlbmRlciBjZWxscyBub3cgdGhhdCB3ZSBjYW4gZGlzcGxheSBhbnkgbG9hZGluZyBpbmRpY2F0b3Igb3IgbG9hZGluZyBidXR0b25cbiAgICAgICAgdGhpcy5yZW5kZXJDZWxscygpO1xuICAgIH1cblxuICAgIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICAgICAgaWYgKGNoYW5nZXMuY29sbGVjdGlvbiAmJiBjaGFuZ2VzLmNvbGxlY3Rpb24uY3VycmVudFZhbHVlICE9PSBjaGFuZ2VzLmNvbGxlY3Rpb24ucHJldmlvdXNWYWx1ZSAmJiAhY2hhbmdlcy5jb2xsZWN0aW9uLmlzRmlyc3RDaGFuZ2UoKSkge1xuICAgICAgICAgICAgdGhpcy5zZXR1cE9ic2VydmFibGUoKTtcbiAgICAgICAgICAgIHRoaXMucmVzZXQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9zdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG5cbiAgICBzZXR1cE9ic2VydmFibGUoKTogdm9pZCB7XG5cbiAgICAgICAgLy8gaWYgdGhlcmUgaXMgYSBjdXJyZW50IHN1YnNjcmlwdGlvbiwgdW5zdWJzY3JpYmVcbiAgICAgICAgaWYgKHRoaXMuX3N1YnNjcmlwdGlvbiAmJiB0aGlzLl9zdWJzY3JpcHRpb24udW5zdWJzY3JpYmUpIHtcbiAgICAgICAgICAgIHRoaXMuX3N1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fc3Vic2NyaXB0aW9uID0gdGhpcy5jb2xsZWN0aW9uLnN1YnNjcmliZShjb2xsZWN0aW9uID0+IHtcbiAgICAgICAgICAgIHRoaXMuZGF0YS5wdXNoKC4uLmNvbGxlY3Rpb24pO1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJDZWxscygpO1xuICAgICAgICAgICAgdGhpcy5pc0xvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgfSwgbnVsbCwgKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5sb2FkaW5nQ29tcGxldGUgPSB0cnVlO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBASG9zdExpc3RlbmVyKCdzY3JvbGwnKSByZW5kZXJDZWxscygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5jZWxscy5uZXh0KHRoaXMuZ2V0VmlzaWJsZUNlbGxzKCkpO1xuXG4gICAgICAgIGlmICh0aGlzLmxvYWRPblNjcm9sbCAmJiAhdGhpcy5pc0xvYWRpbmcgJiYgIXRoaXMubG9hZGluZ0NvbXBsZXRlKSB7XG4gICAgICAgICAgICBjb25zdCByZW1haW5pbmdTY3JvbGwgPSB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuc2Nyb2xsSGVpZ2h0IC0gKHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5zY3JvbGxUb3AgKyB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuY2xpZW50SGVpZ2h0KTtcblxuICAgICAgICAgICAgLy8gaWYgdGhlIGN1cnJlbnQgY2VsbHMgdGFrZSB1cCBsZXNzIHRoYW4gdGhlIGhlaWdodCBvZiB0aGUgY29tcG9uZW50IHRoZW4gbG9hZCB0aGUgbmV4dCBwYWdlXG4gICAgICAgICAgICBpZiAocmVtYWluaW5nU2Nyb2xsIDw9IHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5jbGllbnRIZWlnaHQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWROZXh0UGFnZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0VmlzaWJsZUNlbGxzKCk6IGFueVtdIHtcblxuICAgICAgICAvLyBzdG9yZSB0aGUgaW5pdGlhbCBlbGVtZW50IGhlaWdodFxuICAgICAgICBpZiAoIXRoaXMuX2hlaWdodCkge1xuICAgICAgICAgICAgdGhpcy5faGVpZ2h0ID0gdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50Lm9mZnNldEhlaWdodDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHBlcmZvcm0gc29tZSBjYWxjdWxhdGlvbnNcbiAgICAgICAgY29uc3Qgc2Nyb2xsVG9wID0gdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnNjcm9sbFRvcDtcbiAgICAgICAgY29uc3Qgc3RhcnRDZWxsID0gTWF0aC5mbG9vcihzY3JvbGxUb3AgLyB0aGlzLmNlbGxIZWlnaHQpO1xuICAgICAgICBjb25zdCBlbmRDZWxsID0gTWF0aC5jZWlsKHRoaXMuX2hlaWdodCAvIHRoaXMuY2VsbEhlaWdodCkgKyAxO1xuXG4gICAgICAgIC8vIHVwZGF0ZSB0aGUgc2Nyb2xsIHBvc2l0aW9uXG4gICAgICAgIHRoaXMuc2Nyb2xsVG9wID0gc2Nyb2xsVG9wIC0gKHNjcm9sbFRvcCAlIHRoaXMuY2VsbEhlaWdodCk7XG5cbiAgICAgICAgLy8gcmV0dXJuIGEgc3VibGlzdCBvZiBpdGVtcyB2aXNpYmxlIG9uIHRoZSBzY3JlZW5cbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5zbGljZShzdGFydENlbGwsIHN0YXJ0Q2VsbCArIGVuZENlbGwpO1xuICAgIH1cblxuICAgIGdldFRvdGFsSGVpZ2h0KCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLmNlbGxIZWlnaHQgKiB0aGlzLmRhdGEubGVuZ3RoO1xuICAgIH1cblxuICAgIGxvYWROZXh0UGFnZSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5pc0xvYWRpbmcgPSB0cnVlO1xuICAgICAgICB0aGlzLmxvYWRpbmcubmV4dCh0aGlzLnBhZ2VOdW1iZXIpO1xuICAgICAgICB0aGlzLnBhZ2VOdW1iZXIrKztcbiAgICB9XG5cbiAgICByZXNldCgpOiB2b2lkIHtcblxuICAgICAgICAvLyByZXNldCBhbGwgdmFsdWVzXG4gICAgICAgIHRoaXMuc2Nyb2xsVG9wID0gMDtcbiAgICAgICAgdGhpcy5kYXRhID0gW107XG4gICAgICAgIHRoaXMuX2hlaWdodCA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5wYWdlTnVtYmVyID0gMDtcbiAgICAgICAgdGhpcy5sb2FkaW5nQ29tcGxldGUgPSBmYWxzZTtcblxuICAgICAgICAvLyBzZXQgc2Nyb2xsIHBvc2l0aW9uXG4gICAgICAgIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5zY3JvbGxUb3AgPSAwO1xuXG4gICAgICAgIC8vIGNsZWFyIHRoZSBjdXJyZW50IGNlbGxzXG4gICAgICAgIHRoaXMucmVuZGVyQ2VsbHMoKTtcblxuICAgICAgICAvLyByZWxvYWQgZmlyc3QgcGFnZVxuICAgICAgICB0aGlzLmxvYWROZXh0UGFnZSgpO1xuICAgIH1cblxufSJdfQ==