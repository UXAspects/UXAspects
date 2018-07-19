/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Pipe } from '@angular/core';
var FileSizePipe = (function () {
    function FileSizePipe() {
    }
    /**
     * @param {?} value
     * @return {?}
     */
    FileSizePipe.prototype.transform = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        // allow for async values
        if (!value) {
            return value;
        }
        var /** @type {?} */ units = ['B', 'KB', 'MB', 'GB', 'TB'];
        // calculate the which unit bracket the values should be a part of
        var /** @type {?} */ idx = Math.floor(Math.log(value) / Math.log(1024));
        var /** @type {?} */ formattedValue = value / Math.pow(1024, idx);
        return formattedValue.toFixed(2) + " " + units[idx];
    };
    FileSizePipe.decorators = [
        { type: Pipe, args: [{
                    name: 'fileSize'
                },] },
    ];
    /** @nocollapse */
    FileSizePipe.ctorParameters = function () { return []; };
    return FileSizePipe;
}());
export { FileSizePipe };
function FileSizePipe_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    FileSizePipe.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    FileSizePipe.ctorParameters;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZS1zaXplLnBpcGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsicGlwZXMvZmlsZS1zaXplL2ZpbGUtc2l6ZS5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFpQixNQUFNLGVBQWUsQ0FBQzs7Ozs7Ozs7SUFPaEQsZ0NBQVM7Ozs7SUFBVCxVQUFVLEtBQWE7O1FBR25CLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUNULE1BQU0sQ0FBQyxLQUFLLENBQUM7U0FDaEI7UUFFRCxxQkFBSSxLQUFLLEdBQUcsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7O1FBRzFDLHFCQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ3ZELHFCQUFJLGNBQWMsR0FBRyxLQUFLLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFFakQsTUFBTSxDQUFJLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLFNBQUksS0FBSyxDQUFDLEdBQUcsQ0FBRyxDQUFDO0tBQ3ZEOztnQkFuQkosSUFBSSxTQUFDO29CQUNGLElBQUksRUFBRSxVQUFVO2lCQUNuQjs7Ozt1QkFKRDs7U0FLYSxZQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AUGlwZSh7XG4gICAgbmFtZTogJ2ZpbGVTaXplJ1xufSlcbmV4cG9ydCBjbGFzcyBGaWxlU2l6ZVBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcblxuICAgIHRyYW5zZm9ybSh2YWx1ZTogbnVtYmVyKTogYW55IHtcblxuICAgICAgICAvLyBhbGxvdyBmb3IgYXN5bmMgdmFsdWVzXG4gICAgICAgIGlmICghdmFsdWUpIHtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgbGV0IHVuaXRzID0gWydCJywgJ0tCJywgJ01CJywgJ0dCJywgJ1RCJ107XG5cbiAgICAgICAgLy8gY2FsY3VsYXRlIHRoZSB3aGljaCB1bml0IGJyYWNrZXQgdGhlIHZhbHVlcyBzaG91bGQgYmUgYSBwYXJ0IG9mXG4gICAgICAgIGxldCBpZHggPSBNYXRoLmZsb29yKE1hdGgubG9nKHZhbHVlKSAvIE1hdGgubG9nKDEwMjQpKTtcbiAgICAgICAgbGV0IGZvcm1hdHRlZFZhbHVlID0gdmFsdWUgLyBNYXRoLnBvdygxMDI0LCBpZHgpO1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIGAke2Zvcm1hdHRlZFZhbHVlLnRvRml4ZWQoMil9ICR7dW5pdHNbaWR4XX1gO1xuICAgIH1cbn0iXX0=