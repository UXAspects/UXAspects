/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Directive, ElementRef, EventEmitter, Input, NgZone, Output } from '@angular/core';
import { debounceTime } from 'rxjs/operators';
import { ResizeService } from './resize.service';
var ResizeDirective = /** @class */ (function () {
    function ResizeDirective(_elementRef, _resizeService, _ngZone) {
        this._elementRef = _elementRef;
        this._resizeService = _resizeService;
        this._ngZone = _ngZone;
        this.throttle = 0;
        this.uxResize = new EventEmitter();
    }
    /**
     * @return {?}
     */
    ResizeDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this._subscription = this._resizeService.addResizeListener(this._elementRef.nativeElement)
            .pipe(debounceTime(this.throttle))
            .subscribe(function (event) { return _this._ngZone.run(function () { return _this.uxResize.emit(event); }); });
    };
    /**
     * @return {?}
     */
    ResizeDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._resizeService.removeResizeListener(this._elementRef.nativeElement);
        this._subscription.unsubscribe();
    };
    ResizeDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[uxResize]',
                    providers: [ResizeService]
                },] }
    ];
    /** @nocollapse */
    ResizeDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: ResizeService },
        { type: NgZone }
    ]; };
    ResizeDirective.propDecorators = {
        throttle: [{ type: Input }],
        uxResize: [{ type: Output }]
    };
    return ResizeDirective;
}());
export { ResizeDirective };
function ResizeDirective_tsickle_Closure_declarations() {
    /** @type {?} */
    ResizeDirective.prototype.throttle;
    /** @type {?} */
    ResizeDirective.prototype.uxResize;
    /** @type {?} */
    ResizeDirective.prototype._subscription;
    /** @type {?} */
    ResizeDirective.prototype._elementRef;
    /** @type {?} */
    ResizeDirective.prototype._resizeService;
    /** @type {?} */
    ResizeDirective.prototype._ngZone;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzaXplLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJkaXJlY3RpdmVzL3Jlc2l6ZS9yZXNpemUuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBcUIsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzlHLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUU5QyxPQUFPLEVBQW9CLGFBQWEsRUFBRSxNQUFNLGtCQUFrQixDQUFDOztJQWEvRCx5QkFBb0IsV0FBdUIsRUFBVSxjQUE2QixFQUFVLE9BQWU7UUFBdkYsZ0JBQVcsR0FBWCxXQUFXLENBQVk7UUFBVSxtQkFBYyxHQUFkLGNBQWMsQ0FBZTtRQUFVLFlBQU8sR0FBUCxPQUFPLENBQVE7d0JBTC9FLENBQUM7d0JBQ3dCLElBQUksWUFBWSxFQUFvQjtLQUl1Qjs7OztJQUVoSCxrQ0FBUTs7O0lBQVI7UUFBQSxpQkFJQztRQUhHLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQzthQUNyRixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQzthQUNqQyxTQUFTLENBQUMsVUFBQyxLQUF1QixJQUFLLE9BQUEsS0FBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBTSxPQUFBLEtBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUF6QixDQUF5QixDQUFDLEVBQWpELENBQWlELENBQUMsQ0FBQztLQUNsRzs7OztJQUVELHFDQUFXOzs7SUFBWDtRQUNJLElBQUksQ0FBQyxjQUFjLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUN6RSxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsRUFBRSxDQUFDO0tBQ3BDOztnQkF0QkosU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSxZQUFZO29CQUN0QixTQUFTLEVBQUUsQ0FBQyxhQUFhLENBQUM7aUJBQzdCOzs7O2dCQVJtQixVQUFVO2dCQUdILGFBQWE7Z0JBSGEsTUFBTTs7OzJCQVd0RCxLQUFLOzJCQUNMLE1BQU07OzBCQVpYOztTQVNhLGVBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE5nWm9uZSwgT25EZXN0cm95LCBPbkluaXQsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgZGVib3VuY2VUaW1lIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcy9TdWJzY3JpcHRpb24nO1xuaW1wb3J0IHsgUmVzaXplRGltZW5zaW9ucywgUmVzaXplU2VydmljZSB9IGZyb20gJy4vcmVzaXplLnNlcnZpY2UnO1xuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ1t1eFJlc2l6ZV0nLFxuICAgIHByb3ZpZGVyczogW1Jlc2l6ZVNlcnZpY2VdXG59KVxuZXhwb3J0IGNsYXNzIFJlc2l6ZURpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcblxuICAgIEBJbnB1dCgpIHRocm90dGxlOiBudW1iZXIgPSAwO1xuICAgIEBPdXRwdXQoKSB1eFJlc2l6ZTogRXZlbnRFbWl0dGVyPFJlc2l6ZURpbWVuc2lvbnM+ID0gbmV3IEV2ZW50RW1pdHRlcjxSZXNpemVEaW1lbnNpb25zPigpO1xuXG4gICAgcHJpdmF0ZSBfc3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmLCBwcml2YXRlIF9yZXNpemVTZXJ2aWNlOiBSZXNpemVTZXJ2aWNlLCBwcml2YXRlIF9uZ1pvbmU6IE5nWm9uZSkgeyB9XG5cbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fc3Vic2NyaXB0aW9uID0gdGhpcy5fcmVzaXplU2VydmljZS5hZGRSZXNpemVMaXN0ZW5lcih0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpXG4gICAgICAgICAgICAucGlwZShkZWJvdW5jZVRpbWUodGhpcy50aHJvdHRsZSkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKChldmVudDogUmVzaXplRGltZW5zaW9ucykgPT4gdGhpcy5fbmdab25lLnJ1bigoKSA9PiB0aGlzLnV4UmVzaXplLmVtaXQoZXZlbnQpKSk7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX3Jlc2l6ZVNlcnZpY2UucmVtb3ZlUmVzaXplTGlzdGVuZXIodGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KTtcbiAgICAgICAgdGhpcy5fc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxufSJdfQ==