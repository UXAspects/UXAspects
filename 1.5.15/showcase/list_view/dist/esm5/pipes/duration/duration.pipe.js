/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Pipe } from '@angular/core';
var DurationPipe = (function () {
    function DurationPipe() {
    }
    /**
     * @param {?} seconds
     * @return {?}
     */
    DurationPipe.prototype.transform = /**
     * @param {?} seconds
     * @return {?}
     */
    function (seconds) {
        var /** @type {?} */ minutes = Math.floor(seconds / 60);
        var /** @type {?} */ hours = Math.floor(minutes / 60);
        var /** @type {?} */ days = Math.floor(hours / 24);
        hours = hours - (days * 24);
        minutes = minutes - (days * 24 * 60) - (hours * 60);
        seconds = Math.floor(seconds - (days * 24 * 60 * 60) - (hours * 60 * 60) - (minutes * 60));
        if (hours > 0) {
            return this.pad(hours) + ":" + this.pad(minutes) + ":" + this.pad(seconds);
        }
        else {
            return this.pad(minutes) + ":" + this.pad(seconds);
        }
    };
    /**
     * @param {?} value
     * @return {?}
     */
    DurationPipe.prototype.pad = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (value < 10) {
            return "0" + value;
        }
        return value.toString();
    };
    DurationPipe.decorators = [
        { type: Pipe, args: [{
                    name: 'duration'
                },] },
    ];
    return DurationPipe;
}());
export { DurationPipe };
function DurationPipe_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    DurationPipe.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    DurationPipe.ctorParameters;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHVyYXRpb24ucGlwZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJwaXBlcy9kdXJhdGlvbi9kdXJhdGlvbi5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFpQixNQUFNLGVBQWUsQ0FBQzs7Ozs7Ozs7SUFPaEQsZ0NBQVM7Ozs7SUFBVCxVQUFVLE9BQWU7UUFFckIscUJBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQyxDQUFDO1FBQ3ZDLHFCQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUMsQ0FBQztRQUNyQyxxQkFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDLENBQUM7UUFFbEMsS0FBSyxHQUFHLEtBQUssR0FBRyxDQUFDLElBQUksR0FBRyxFQUFFLENBQUMsQ0FBQztRQUM1QixPQUFPLEdBQUcsT0FBTyxHQUFHLENBQUMsSUFBSSxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUMsQ0FBQztRQUNwRCxPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsQ0FBQyxJQUFJLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLEtBQUssR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUUzRixFQUFFLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNaLE1BQU0sQ0FBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxTQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLFNBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUcsQ0FBQztTQUN6RTtRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0osTUFBTSxDQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLFNBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUcsQ0FBQztTQUN0RDtLQUNKOzs7OztJQUVELDBCQUFHOzs7O0lBQUgsVUFBSSxLQUFhO1FBQ2IsRUFBRSxDQUFDLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDYixNQUFNLENBQUMsTUFBSSxLQUFPLENBQUM7U0FDdEI7UUFFRCxNQUFNLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDO0tBQzNCOztnQkE1QkosSUFBSSxTQUFDO29CQUNGLElBQUksRUFBRSxVQUFVO2lCQUNuQjs7dUJBSkQ7O1NBS2EsWUFBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQFBpcGUoe1xuICAgIG5hbWU6ICdkdXJhdGlvbidcbn0pXG5leHBvcnQgY2xhc3MgRHVyYXRpb25QaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG4gICAgXG4gICAgdHJhbnNmb3JtKHNlY29uZHM6IG51bWJlcik6IGFueSB7XG5cbiAgICAgICAgbGV0IG1pbnV0ZXMgPSBNYXRoLmZsb29yKHNlY29uZHMgLyA2MCk7XG4gICAgICAgIGxldCBob3VycyA9IE1hdGguZmxvb3IobWludXRlcyAvIDYwKTtcbiAgICAgICAgbGV0IGRheXMgPSBNYXRoLmZsb29yKGhvdXJzIC8gMjQpO1xuXG4gICAgICAgIGhvdXJzID0gaG91cnMgLSAoZGF5cyAqIDI0KTtcbiAgICAgICAgbWludXRlcyA9IG1pbnV0ZXMgLSAoZGF5cyAqIDI0ICogNjApIC0gKGhvdXJzICogNjApO1xuICAgICAgICBzZWNvbmRzID0gTWF0aC5mbG9vcihzZWNvbmRzIC0gKGRheXMgKiAyNCAqIDYwICogNjApIC0gKGhvdXJzICogNjAgKiA2MCkgLSAobWludXRlcyAqIDYwKSk7XG5cbiAgICAgICAgaWYgKGhvdXJzID4gMCkge1xuICAgICAgICAgICAgcmV0dXJuIGAke3RoaXMucGFkKGhvdXJzKX06JHt0aGlzLnBhZChtaW51dGVzKX06JHt0aGlzLnBhZChzZWNvbmRzKX1gO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGAke3RoaXMucGFkKG1pbnV0ZXMpfToke3RoaXMucGFkKHNlY29uZHMpfWA7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwYWQodmFsdWU6IG51bWJlcik6IHN0cmluZyB7XG4gICAgICAgIGlmICh2YWx1ZSA8IDEwKSB7XG4gICAgICAgICAgICByZXR1cm4gYDAke3ZhbHVlfWA7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdmFsdWUudG9TdHJpbmcoKTtcbiAgICB9XG59Il19