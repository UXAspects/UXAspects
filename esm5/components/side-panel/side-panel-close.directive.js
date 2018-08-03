/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Directive, HostListener } from '@angular/core';
import { SidePanelService } from './side-panel.service';
var SidePanelCloseDirective = /** @class */ (function () {
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
                },] }
    ];
    /** @nocollapse */
    SidePanelCloseDirective.ctorParameters = function () { return [
        { type: SidePanelService }
    ]; };
    SidePanelCloseDirective.propDecorators = {
        clickHandler: [{ type: HostListener, args: ['click',] }]
    };
    return SidePanelCloseDirective;
}());
export { SidePanelCloseDirective };
function SidePanelCloseDirective_tsickle_Closure_declarations() {
    /** @type {?} */
    SidePanelCloseDirective.prototype._service;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lkZS1wYW5lbC1jbG9zZS5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9zaWRlLXBhbmVsL3NpZGUtcGFuZWwtY2xvc2UuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN4RCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQzs7SUFPcEQsaUNBQW9CLFFBQTBCO1FBQTFCLGFBQVEsR0FBUixRQUFRLENBQWtCO0tBQUs7Ozs7SUFHbkQsOENBQVk7OztJQURaO1FBRUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztLQUN6Qjs7Z0JBVkosU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSxvQkFBb0I7aUJBQ2pDOzs7O2dCQUpRLGdCQUFnQjs7OytCQVNwQixZQUFZLFNBQUMsT0FBTzs7a0NBVnpCOztTQU1hLHVCQUF1QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgSG9zdExpc3RlbmVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTaWRlUGFuZWxTZXJ2aWNlIH0gZnJvbSAnLi9zaWRlLXBhbmVsLnNlcnZpY2UnO1xuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ1t1eFNpZGVQYW5lbENsb3NlXSdcbn0pXG5leHBvcnQgY2xhc3MgU2lkZVBhbmVsQ2xvc2VEaXJlY3RpdmUge1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfc2VydmljZTogU2lkZVBhbmVsU2VydmljZSkgeyB9XG5cbiAgICBASG9zdExpc3RlbmVyKCdjbGljaycpXG4gICAgY2xpY2tIYW5kbGVyKCkge1xuICAgICAgICB0aGlzLl9zZXJ2aWNlLmNsb3NlKCk7XG4gICAgfVxufSJdfQ==