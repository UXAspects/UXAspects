/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Pipe } from '@angular/core';
export class TimeFormatPipe {
    /**
     * @param {?} value
     * @param {?} pad
     * @return {?}
     */
    transform(value, pad) {
        return value < 10 && pad ? '0' + value : value;
    }
}
TimeFormatPipe.decorators = [
    { type: Pipe, args: [{
                name: 'timeFormat'
            },] }
];

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZS1mb3JtYXQucGlwZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJjb21wb25lbnRzL3RpbWUtcGlja2VyL3RpbWUtZm9ybWF0LnBpcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBS3BELE1BQU07Ozs7OztJQUNGLFNBQVMsQ0FBQyxLQUFhLEVBQUUsR0FBWTtRQUNqQyxNQUFNLENBQUMsS0FBSyxHQUFHLEVBQUUsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztLQUNsRDs7O1lBTkosSUFBSSxTQUFDO2dCQUNGLElBQUksRUFBRSxZQUFZO2FBQ3JCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AUGlwZSh7XG4gICAgbmFtZTogJ3RpbWVGb3JtYXQnXG59KVxuZXhwb3J0IGNsYXNzIFRpbWVGb3JtYXRQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG4gICAgdHJhbnNmb3JtKHZhbHVlOiBudW1iZXIsIHBhZDogYm9vbGVhbik6IHN0cmluZyB8IG51bWJlciB7XG4gICAgICAgIHJldHVybiB2YWx1ZSA8IDEwICYmIHBhZCA/ICcwJyArIHZhbHVlIDogdmFsdWU7XG4gICAgfVxufVxuIl19