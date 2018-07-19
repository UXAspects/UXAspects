/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Directive, ElementRef, EventEmitter, Input, NgZone, Output } from '@angular/core';
import { debounceTime } from 'rxjs/operators';
import { ResizeService } from './resize.service';
export class ResizeDirective {
    /**
     * @param {?} _elementRef
     * @param {?} _resizeService
     * @param {?} _ngZone
     */
    constructor(_elementRef, _resizeService, _ngZone) {
        this._elementRef = _elementRef;
        this._resizeService = _resizeService;
        this._ngZone = _ngZone;
        this.throttle = 0;
        this.uxResize = new EventEmitter();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this._subscription = this._resizeService.addResizeListener(this._elementRef.nativeElement)
            .pipe(debounceTime(this.throttle))
            .subscribe((event) => this._ngZone.run(() => this.uxResize.emit(event)));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._subscription.unsubscribe();
    }
}
ResizeDirective.decorators = [
    { type: Directive, args: [{
                selector: '[uxResize]',
                providers: [ResizeService]
            },] },
];
/** @nocollapse */
ResizeDirective.ctorParameters = () => [
    { type: ElementRef, },
    { type: ResizeService, },
    { type: NgZone, },
];
ResizeDirective.propDecorators = {
    "throttle": [{ type: Input },],
    "uxResize": [{ type: Output },],
};
function ResizeDirective_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    ResizeDirective.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    ResizeDirective.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    ResizeDirective.propDecorators;
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzaXplLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJkaXJlY3RpdmVzL3Jlc2l6ZS9yZXNpemUuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBcUIsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzlHLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUU5QyxPQUFPLEVBQW9CLGFBQWEsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBTW5FLE1BQU07Ozs7OztJQU9GLFlBQW9CLFdBQXVCLEVBQVUsY0FBNkIsRUFBVSxPQUFlO1FBQXZGLGdCQUFXLEdBQVgsV0FBVyxDQUFZO1FBQVUsbUJBQWMsR0FBZCxjQUFjLENBQWU7UUFBVSxZQUFPLEdBQVAsT0FBTyxDQUFRO3dCQUwvRSxDQUFDO3dCQUN3QixJQUFJLFlBQVksRUFBb0I7S0FJdUI7Ozs7SUFFaEgsUUFBUTtRQUNKLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQzthQUNyRixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQzthQUNqQyxTQUFTLENBQUMsQ0FBQyxLQUF1QixLQUFLLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ2xHOzs7O0lBRUQsV0FBVztRQUNQLElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxFQUFFLENBQUM7S0FDcEM7OztZQXJCSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLFlBQVk7Z0JBQ3RCLFNBQVMsRUFBRSxDQUFDLGFBQWEsQ0FBQzthQUM3Qjs7OztZQVJtQixVQUFVO1lBR0gsYUFBYTtZQUhhLE1BQU07Ozt5QkFXdEQsS0FBSzt5QkFDTCxNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsIElucHV0LCBOZ1pvbmUsIE9uRGVzdHJveSwgT25Jbml0LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGRlYm91bmNlVGltZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMvU3Vic2NyaXB0aW9uJztcbmltcG9ydCB7IFJlc2l6ZURpbWVuc2lvbnMsIFJlc2l6ZVNlcnZpY2UgfSBmcm9tICcuL3Jlc2l6ZS5zZXJ2aWNlJztcblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdbdXhSZXNpemVdJyxcbiAgICBwcm92aWRlcnM6IFtSZXNpemVTZXJ2aWNlXVxufSlcbmV4cG9ydCBjbGFzcyBSZXNpemVEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG5cbiAgICBASW5wdXQoKSB0aHJvdHRsZTogbnVtYmVyID0gMDtcbiAgICBAT3V0cHV0KCkgdXhSZXNpemU6IEV2ZW50RW1pdHRlcjxSZXNpemVEaW1lbnNpb25zPiA9IG5ldyBFdmVudEVtaXR0ZXI8UmVzaXplRGltZW5zaW9ucz4oKTtcblxuICAgIHByaXZhdGUgX3N1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfZWxlbWVudFJlZjogRWxlbWVudFJlZiwgcHJpdmF0ZSBfcmVzaXplU2VydmljZTogUmVzaXplU2VydmljZSwgcHJpdmF0ZSBfbmdab25lOiBOZ1pvbmUpIHsgfVxuXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX3N1YnNjcmlwdGlvbiA9IHRoaXMuX3Jlc2l6ZVNlcnZpY2UuYWRkUmVzaXplTGlzdGVuZXIodGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KVxuICAgICAgICAgICAgLnBpcGUoZGVib3VuY2VUaW1lKHRoaXMudGhyb3R0bGUpKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgoZXZlbnQ6IFJlc2l6ZURpbWVuc2lvbnMpID0+IHRoaXMuX25nWm9uZS5ydW4oKCkgPT4gdGhpcy51eFJlc2l6ZS5lbWl0KGV2ZW50KSkpO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9zdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG59Il19