/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Pipe } from '@angular/core';
var FileSizePipe = /** @class */ (function () {
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
                },] }
    ];
    return FileSizePipe;
}());
export { FileSizePipe };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZS1zaXplLnBpcGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsicGlwZXMvZmlsZS1zaXplL2ZpbGUtc2l6ZS5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFpQixNQUFNLGVBQWUsQ0FBQzs7Ozs7Ozs7SUFPaEQsZ0NBQVM7Ozs7SUFBVCxVQUFVLEtBQWE7O1FBR25CLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUNULE1BQU0sQ0FBQyxLQUFLLENBQUM7U0FDaEI7UUFFRCxxQkFBSSxLQUFLLEdBQUcsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7O1FBRzFDLHFCQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ3ZELHFCQUFJLGNBQWMsR0FBRyxLQUFLLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFFakQsTUFBTSxDQUFJLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLFNBQUksS0FBSyxDQUFDLEdBQUcsQ0FBRyxDQUFDO0tBQ3ZEOztnQkFuQkosSUFBSSxTQUFDO29CQUNGLElBQUksRUFBRSxVQUFVO2lCQUNuQjs7dUJBSkQ7O1NBS2EsWUFBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQFBpcGUoe1xuICAgIG5hbWU6ICdmaWxlU2l6ZSdcbn0pXG5leHBvcnQgY2xhc3MgRmlsZVNpemVQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG5cbiAgICB0cmFuc2Zvcm0odmFsdWU6IG51bWJlcik6IGFueSB7XG5cbiAgICAgICAgLy8gYWxsb3cgZm9yIGFzeW5jIHZhbHVlc1xuICAgICAgICBpZiAoIXZhbHVlKSB7XG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGxldCB1bml0cyA9IFsnQicsICdLQicsICdNQicsICdHQicsICdUQiddO1xuXG4gICAgICAgIC8vIGNhbGN1bGF0ZSB0aGUgd2hpY2ggdW5pdCBicmFja2V0IHRoZSB2YWx1ZXMgc2hvdWxkIGJlIGEgcGFydCBvZlxuICAgICAgICBsZXQgaWR4ID0gTWF0aC5mbG9vcihNYXRoLmxvZyh2YWx1ZSkgLyBNYXRoLmxvZygxMDI0KSk7XG4gICAgICAgIGxldCBmb3JtYXR0ZWRWYWx1ZSA9IHZhbHVlIC8gTWF0aC5wb3coMTAyNCwgaWR4KTtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBgJHtmb3JtYXR0ZWRWYWx1ZS50b0ZpeGVkKDIpfSAke3VuaXRzW2lkeF19YDtcbiAgICB9XG59Il19