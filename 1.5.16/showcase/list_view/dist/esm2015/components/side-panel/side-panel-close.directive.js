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
            },] },
];
/** @nocollapse */
SidePanelCloseDirective.ctorParameters = () => [
    { type: SidePanelService, },
];
SidePanelCloseDirective.propDecorators = {
    "clickHandler": [{ type: HostListener, args: ['click',] },],
};
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lkZS1wYW5lbC1jbG9zZS5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9zaWRlLXBhbmVsL3NpZGUtcGFuZWwtY2xvc2UuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN4RCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUt4RCxNQUFNOzs7O0lBRUYsWUFBb0IsUUFBMEI7UUFBMUIsYUFBUSxHQUFSLFFBQVEsQ0FBa0I7S0FBSzs7OztJQUduRCxZQUFZO1FBQ1IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsQ0FBQzs7OztZQVQ3QixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLG9CQUFvQjthQUNqQzs7OztZQUpRLGdCQUFnQjs7OzZCQVNwQixZQUFZLFNBQUMsT0FBTyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgSG9zdExpc3RlbmVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTaWRlUGFuZWxTZXJ2aWNlIH0gZnJvbSAnLi9zaWRlLXBhbmVsLnNlcnZpY2UnO1xuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ1t1eFNpZGVQYW5lbENsb3NlXSdcbn0pXG5leHBvcnQgY2xhc3MgU2lkZVBhbmVsQ2xvc2VEaXJlY3RpdmUge1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfc2VydmljZTogU2lkZVBhbmVsU2VydmljZSkgeyB9XG5cbiAgICBASG9zdExpc3RlbmVyKCdjbGljaycpXG4gICAgY2xpY2tIYW5kbGVyKCkge1xuICAgICAgICB0aGlzLl9zZXJ2aWNlLmNsb3NlKCk7XG4gICAgfVxufSJdfQ==