/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Pipe } from '@angular/core';
export class DurationPipe {
    /**
     * @param {?} seconds
     * @return {?}
     */
    transform(seconds) {
        let /** @type {?} */ minutes = Math.floor(seconds / 60);
        let /** @type {?} */ hours = Math.floor(minutes / 60);
        let /** @type {?} */ days = Math.floor(hours / 24);
        hours = hours - (days * 24);
        minutes = minutes - (days * 24 * 60) - (hours * 60);
        seconds = Math.floor(seconds - (days * 24 * 60 * 60) - (hours * 60 * 60) - (minutes * 60));
        if (hours > 0) {
            return `${this.pad(hours)}:${this.pad(minutes)}:${this.pad(seconds)}`;
        }
        else {
            return `${this.pad(minutes)}:${this.pad(seconds)}`;
        }
    }
    /**
     * @param {?} value
     * @return {?}
     */
    pad(value) {
        if (value < 10) {
            return `0${value}`;
        }
        return value.toString();
    }
}
DurationPipe.decorators = [
    { type: Pipe, args: [{
                name: 'duration'
            },] },
];
function DurationPipe_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    DurationPipe.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    DurationPipe.ctorParameters;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHVyYXRpb24ucGlwZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJwaXBlcy9kdXJhdGlvbi9kdXJhdGlvbi5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFpQixNQUFNLGVBQWUsQ0FBQztBQUtwRCxNQUFNOzs7OztJQUVGLFNBQVMsQ0FBQyxPQUFlO1FBRXJCLHFCQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUMsQ0FBQztRQUN2QyxxQkFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDLENBQUM7UUFDckMscUJBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQyxDQUFDO1FBRWxDLEtBQUssR0FBRyxLQUFLLEdBQUcsQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDLENBQUM7UUFDNUIsT0FBTyxHQUFHLE9BQU8sR0FBRyxDQUFDLElBQUksR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDLENBQUM7UUFDcEQsT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLENBQUMsSUFBSSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFFM0YsRUFBRSxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDWixNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDO1NBQ3pFO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDSixNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQztTQUN0RDtLQUNKOzs7OztJQUVELEdBQUcsQ0FBQyxLQUFhO1FBQ2IsRUFBRSxDQUFDLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDYixNQUFNLENBQUMsSUFBSSxLQUFLLEVBQUUsQ0FBQztTQUN0QjtRQUVELE1BQU0sQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7S0FDM0I7OztZQTVCSixJQUFJLFNBQUM7Z0JBQ0YsSUFBSSxFQUFFLFVBQVU7YUFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBQaXBlKHtcbiAgICBuYW1lOiAnZHVyYXRpb24nXG59KVxuZXhwb3J0IGNsYXNzIER1cmF0aW9uUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuICAgIFxuICAgIHRyYW5zZm9ybShzZWNvbmRzOiBudW1iZXIpOiBhbnkge1xuXG4gICAgICAgIGxldCBtaW51dGVzID0gTWF0aC5mbG9vcihzZWNvbmRzIC8gNjApO1xuICAgICAgICBsZXQgaG91cnMgPSBNYXRoLmZsb29yKG1pbnV0ZXMgLyA2MCk7XG4gICAgICAgIGxldCBkYXlzID0gTWF0aC5mbG9vcihob3VycyAvIDI0KTtcblxuICAgICAgICBob3VycyA9IGhvdXJzIC0gKGRheXMgKiAyNCk7XG4gICAgICAgIG1pbnV0ZXMgPSBtaW51dGVzIC0gKGRheXMgKiAyNCAqIDYwKSAtIChob3VycyAqIDYwKTtcbiAgICAgICAgc2Vjb25kcyA9IE1hdGguZmxvb3Ioc2Vjb25kcyAtIChkYXlzICogMjQgKiA2MCAqIDYwKSAtIChob3VycyAqIDYwICogNjApIC0gKG1pbnV0ZXMgKiA2MCkpO1xuXG4gICAgICAgIGlmIChob3VycyA+IDApIHtcbiAgICAgICAgICAgIHJldHVybiBgJHt0aGlzLnBhZChob3Vycyl9OiR7dGhpcy5wYWQobWludXRlcyl9OiR7dGhpcy5wYWQoc2Vjb25kcyl9YDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBgJHt0aGlzLnBhZChtaW51dGVzKX06JHt0aGlzLnBhZChzZWNvbmRzKX1gO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcGFkKHZhbHVlOiBudW1iZXIpOiBzdHJpbmcge1xuICAgICAgICBpZiAodmFsdWUgPCAxMCkge1xuICAgICAgICAgICAgcmV0dXJuIGAwJHt2YWx1ZX1gO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHZhbHVlLnRvU3RyaW5nKCk7XG4gICAgfVxufSJdfQ==