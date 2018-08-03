/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Directive, HostListener } from '@angular/core';
import { SidePanelService } from './side-panel.service';
export class SidePanelCloseDirective {
    /**
     * @param {?} _service
     */
    constructor(_service) {
        this._service = _service;
    }
    /**
     * @return {?}
     */
    clickHandler() {
        this._service.close();
    }
}
SidePanelCloseDirective.decorators = [
    { type: Directive, args: [{
                selector: '[uxSidePanelClose]'
            },] }
];
/** @nocollapse */
SidePanelCloseDirective.ctorParameters = () => [
    { type: SidePanelService }
];
SidePanelCloseDirective.propDecorators = {
    clickHandler: [{ type: HostListener, args: ['click',] }]
};
function SidePanelCloseDirective_tsickle_Closure_declarations() {
    /** @type {?} */
    SidePanelCloseDirective.prototype._service;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lkZS1wYW5lbC1jbG9zZS5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9zaWRlLXBhbmVsL3NpZGUtcGFuZWwtY2xvc2UuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN4RCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUt4RCxNQUFNOzs7O0lBRUYsWUFBb0IsUUFBMEI7UUFBMUIsYUFBUSxHQUFSLFFBQVEsQ0FBa0I7S0FBSzs7OztJQUduRCxZQUFZO1FBQ1IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztLQUN6Qjs7O1lBVkosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxvQkFBb0I7YUFDakM7Ozs7WUFKUSxnQkFBZ0I7OzsyQkFTcEIsWUFBWSxTQUFDLE9BQU8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIEhvc3RMaXN0ZW5lciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU2lkZVBhbmVsU2VydmljZSB9IGZyb20gJy4vc2lkZS1wYW5lbC5zZXJ2aWNlJztcblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdbdXhTaWRlUGFuZWxDbG9zZV0nXG59KVxuZXhwb3J0IGNsYXNzIFNpZGVQYW5lbENsb3NlRGlyZWN0aXZlIHtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX3NlcnZpY2U6IFNpZGVQYW5lbFNlcnZpY2UpIHsgfVxuXG4gICAgQEhvc3RMaXN0ZW5lcignY2xpY2snKVxuICAgIGNsaWNrSGFuZGxlcigpIHtcbiAgICAgICAgdGhpcy5fc2VydmljZS5jbG9zZSgpO1xuICAgIH1cbn0iXX0=