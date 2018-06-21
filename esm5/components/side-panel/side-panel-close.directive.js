/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Directive, HostListener } from '@angular/core';
import { SidePanelService } from './side-panel.service';
var SidePanelCloseDirective = (function () {
    function SidePanelCloseDirective(_service) {
        this._service = _service;
    }
    /**
     * @return {?}
     */
    SidePanelCloseDirective.prototype.clickHandler = /**
     * @return {?}
     */
    function () {
        this._service.close();
    };
    SidePanelCloseDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[uxSidePanelClose]'
                },] },
    ];
    /** @nocollapse */
    SidePanelCloseDirective.ctorParameters = function () { return [
        { type: SidePanelService, },
    ]; };
    SidePanelCloseDirective.propDecorators = {
        "clickHandler": [{ type: HostListener, args: ['click',] },],
    };
    return SidePanelCloseDirective;
}());
export { SidePanelCloseDirective };
function SidePanelCloseDirective_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    SidePanelCloseDirective.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    SidePanelCloseDirective.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    SidePanelCloseDirective.propDecorators;
    /** @type {?} */
    SidePanelCloseDirective.prototype._service;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lkZS1wYW5lbC1jbG9zZS5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9zaWRlLXBhbmVsL3NpZGUtcGFuZWwtY2xvc2UuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN4RCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQzs7SUFPcEQsaUNBQW9CLFFBQTBCO1FBQTFCLGFBQVEsR0FBUixRQUFRLENBQWtCO0tBQUs7Ozs7SUFHbkQsOENBQVk7Ozs7UUFDUixJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxDQUFDOzs7Z0JBVDdCLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUsb0JBQW9CO2lCQUNqQzs7OztnQkFKUSxnQkFBZ0I7OztpQ0FTcEIsWUFBWSxTQUFDLE9BQU87O2tDQVZ6Qjs7U0FNYSx1QkFBdUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIEhvc3RMaXN0ZW5lciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU2lkZVBhbmVsU2VydmljZSB9IGZyb20gJy4vc2lkZS1wYW5lbC5zZXJ2aWNlJztcblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdbdXhTaWRlUGFuZWxDbG9zZV0nXG59KVxuZXhwb3J0IGNsYXNzIFNpZGVQYW5lbENsb3NlRGlyZWN0aXZlIHtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX3NlcnZpY2U6IFNpZGVQYW5lbFNlcnZpY2UpIHsgfVxuXG4gICAgQEhvc3RMaXN0ZW5lcignY2xpY2snKVxuICAgIGNsaWNrSGFuZGxlcigpIHtcbiAgICAgICAgdGhpcy5fc2VydmljZS5jbG9zZSgpO1xuICAgIH1cbn0iXX0=