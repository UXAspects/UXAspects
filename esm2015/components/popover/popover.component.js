/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { TooltipComponent } from '../tooltip/index';
let /** @type {?} */ uniquePopoverId = 0;
export class PopoverComponent extends TooltipComponent {
    constructor() {
        super(...arguments);
        /**
         * Define a unique id for each popover
         */
        this.id = `ux-popover-${++uniquePopoverId}`;
        /**
         * This will emit an event any time the user clicks outside the popover
         */
        this.clickOutside$ = new Subject();
    }
    /**
     * This will update the title of the popover and trigger change detection
     * @param {?} title
     * @return {?}
     */
    setTitle(title) {
        this.title = title;
        this._changeDetectorRef.markForCheck();
    }
}
PopoverComponent.decorators = [
    { type: Component, args: [{
                selector: 'ux-popover',
                template: "<div class=\"popover show\" [ngClass]=\"[placement, customClass]\" [id]=\"id\" [attr.role]=\"role\" (uxClickOutside)=\"clickOutside$.next($event)\">\n    <div class=\"arrow\"></div>\n    <h3 class=\"popover-title\" *ngIf=\"title\">{{ title }}</h3>\n    <div class=\"popover-content\" (cdkObserveContent)=\"reposition()\">\n        <ng-container *ngIf=\"!isTemplateRef\">{{ content }}</ng-container>\n        <ng-container *ngIf=\"isTemplateRef\" [ngTemplateOutlet]=\"content\" [ngTemplateOutletContext]=\"context\"></ng-container>\n    </div>\n</div>",
                changeDetection: ChangeDetectionStrategy.OnPush
            }] }
];
function PopoverComponent_tsickle_Closure_declarations() {
    /**
     * Define a unique id for each popover
     * @type {?}
     */
    PopoverComponent.prototype.id;
    /**
     * If specified allows the popover to show a title
     * @type {?}
     */
    PopoverComponent.prototype.title;
    /**
     * This will emit an event any time the user clicks outside the popover
     * @type {?}
     */
    PopoverComponent.prototype.clickOutside$;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wb3Zlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9wb3BvdmVyL3BvcG92ZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25FLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDdkMsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFFcEQscUJBQUksZUFBZSxHQUFHLENBQUMsQ0FBQztBQU94QixNQUFNLHVCQUF3QixTQUFRLGdCQUFnQjs7Ozs7O2tCQUd2QyxjQUFjLEVBQUUsZUFBZSxFQUFFOzs7OzZCQU05QixJQUFJLE9BQU8sRUFBYzs7Ozs7OztJQUd6QyxRQUFRLENBQUMsS0FBYTtRQUNwQixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNuQixJQUFJLENBQUMsa0JBQWtCLENBQUMsWUFBWSxFQUFFLENBQUM7S0FDeEM7OztZQXBCRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLFlBQVk7Z0JBQ3RCLGtqQkFBdUM7Z0JBQ3ZDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2FBQ2hEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMvU3ViamVjdCc7XG5pbXBvcnQgeyBUb29sdGlwQ29tcG9uZW50IH0gZnJvbSAnLi4vdG9vbHRpcC9pbmRleCc7XG5cbmxldCB1bmlxdWVQb3BvdmVySWQgPSAwO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd1eC1wb3BvdmVyJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3BvcG92ZXIuY29tcG9uZW50Lmh0bWwnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBQb3BvdmVyQ29tcG9uZW50IGV4dGVuZHMgVG9vbHRpcENvbXBvbmVudCB7XG5cbiAgLyoqIERlZmluZSBhIHVuaXF1ZSBpZCBmb3IgZWFjaCBwb3BvdmVyICovXG4gIGlkOiBzdHJpbmcgPSBgdXgtcG9wb3Zlci0keysrdW5pcXVlUG9wb3ZlcklkfWA7XG5cbiAgLyoqIElmIHNwZWNpZmllZCBhbGxvd3MgdGhlIHBvcG92ZXIgdG8gc2hvdyBhIHRpdGxlICovXG4gIHRpdGxlOiBzdHJpbmc7XG5cbiAgLyoqIFRoaXMgd2lsbCBlbWl0IGFuIGV2ZW50IGFueSB0aW1lIHRoZSB1c2VyIGNsaWNrcyBvdXRzaWRlIHRoZSBwb3BvdmVyICovXG4gIGNsaWNrT3V0c2lkZSQgPSBuZXcgU3ViamVjdDxNb3VzZUV2ZW50PigpO1xuXG4gIC8qKiBUaGlzIHdpbGwgdXBkYXRlIHRoZSB0aXRsZSBvZiB0aGUgcG9wb3ZlciBhbmQgdHJpZ2dlciBjaGFuZ2UgZGV0ZWN0aW9uICovXG4gIHNldFRpdGxlKHRpdGxlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLnRpdGxlID0gdGl0bGU7XG4gICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gIH1cbn0iXX0=