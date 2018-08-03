/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Attribute, ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';
import { FloatingActionButtonsService } from './floating-action-buttons.service';
export class FloatingActionButtonComponent {
    /**
     * @param {?} primary
     * @param {?} fab
     */
    constructor(primary, fab) {
        this.fab = fab;
        this.tabindex = 1;
        this.primary = false;
        this.primary = primary !== null;
    }
}
FloatingActionButtonComponent.decorators = [
    { type: Component, args: [{
                selector: 'ux-floating-action-button',
                template: "<button class=\"btn floating-action-button\" \n        [class.button-primary]=\"primary\" \n        [class.button-secondary]=\"!primary\" \n        (click)=\"primary ? fab.toggle() : fab.close()\">\n\n    <span class=\"hpe-icon floating-action-button-icon\" *ngIf=\"icon\" [ngClass]=\"icon\"></span>\n    <ng-content *ngIf=\"!icon\"></ng-content>\n\n</button>",
                changeDetection: ChangeDetectionStrategy.OnPush,
                preserveWhitespaces: false
            }] }
];
/** @nocollapse */
FloatingActionButtonComponent.ctorParameters = () => [
    { type: String, decorators: [{ type: Attribute, args: ['fab-primary',] }] },
    { type: FloatingActionButtonsService }
];
FloatingActionButtonComponent.propDecorators = {
    icon: [{ type: Input }],
    tabindex: [{ type: HostBinding }]
};
function FloatingActionButtonComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    FloatingActionButtonComponent.prototype.icon;
    /** @type {?} */
    FloatingActionButtonComponent.prototype.tabindex;
    /** @type {?} */
    FloatingActionButtonComponent.prototype.primary;
    /** @type {?} */
    FloatingActionButtonComponent.prototype.fab;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmxvYXRpbmctYWN0aW9uLWJ1dHRvbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9mbG9hdGluZy1hY3Rpb24tYnV0dG9ucy9mbG9hdGluZy1hY3Rpb24tYnV0dG9uLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNsRyxPQUFPLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQVFqRixNQUFNOzs7OztJQU9GLFlBQXNDLE9BQWUsRUFBUyxHQUFpQztRQUFqQyxRQUFHLEdBQUgsR0FBRyxDQUE4Qjt3QkFKckUsQ0FBQzt1QkFFUixLQUFLO1FBR3BCLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxLQUFLLElBQUksQ0FBQztLQUNuQzs7O1lBZkosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSwyQkFBMkI7Z0JBQ3JDLG1YQUFzRDtnQkFDdEQsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07Z0JBQy9DLG1CQUFtQixFQUFFLEtBQUs7YUFDN0I7Ozs7eUNBUWdCLFNBQVMsU0FBQyxhQUFhO1lBZi9CLDRCQUE0Qjs7O21CQVVoQyxLQUFLO3VCQUNMLFdBQVciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBdHRyaWJ1dGUsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIEhvc3RCaW5kaW5nLCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRmxvYXRpbmdBY3Rpb25CdXR0b25zU2VydmljZSB9IGZyb20gJy4vZmxvYXRpbmctYWN0aW9uLWJ1dHRvbnMuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAndXgtZmxvYXRpbmctYWN0aW9uLWJ1dHRvbicsXG4gICAgdGVtcGxhdGVVcmw6ICcuL2Zsb2F0aW5nLWFjdGlvbi1idXR0b24uY29tcG9uZW50Lmh0bWwnLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICAgIHByZXNlcnZlV2hpdGVzcGFjZXM6IGZhbHNlXG59KVxuZXhwb3J0IGNsYXNzIEZsb2F0aW5nQWN0aW9uQnV0dG9uQ29tcG9uZW50IHtcblxuICAgIEBJbnB1dCgpIGljb246IHN0cmluZztcbiAgICBASG9zdEJpbmRpbmcoKSB0YWJpbmRleCA9IDE7XG5cbiAgICBwcmltYXJ5OiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBjb25zdHJ1Y3RvcihAQXR0cmlidXRlKCdmYWItcHJpbWFyeScpIHByaW1hcnk6IHN0cmluZywgcHVibGljIGZhYjogRmxvYXRpbmdBY3Rpb25CdXR0b25zU2VydmljZSkge1xuICAgICAgICB0aGlzLnByaW1hcnkgPSBwcmltYXJ5ICE9PSBudWxsO1xuICAgIH1cbn0iXX0=