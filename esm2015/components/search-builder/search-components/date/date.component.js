/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component } from '@angular/core';
import { BaseSearchComponent } from '../base-search.component';
export class SearchDateComponent extends BaseSearchComponent {
    constructor() {
        super(...arguments);
        this.type = 'date';
    }
    /**
     * @return {?}
     */
    get label() {
        return this.config.label;
    }
    /**
     * @return {?}
     */
    get placeholder() {
        return this.config.placeholder || 'Enter date';
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        // by default set to the current date if not specified
        if (!this.value) {
            this.value = new Date();
        }
    }
}
SearchDateComponent.decorators = [
    { type: Component, args: [{
                selector: 'ux-search-date',
                template: "<label class=\"form-label\" *ngIf=\"label\">{{ label }}</label>\n\n<div class=\"input-group date m-nil\">\n    <span class=\"input-group-addon\" tabindex=\"1\" (click)=\"popover.show()\">\n        <i class=\"hpe-icon hpe-calendar\" aria-hidden=\"true\"></i>\n    </span>\n    <input type=\"text\"\n        class=\"form-control\"\n        aria-label=\"Selected date\"\n        [placeholder]=\"placeholder\"\n        #popover=\"ux-popover\"\n        [ngModel]=\"value | date:'dd MMMM yyyy'\"\n        [uxPopover]=\"popoverTemplate\"\n        placement=\"bottom\"\n        popoverClass=\"date-time-picker-popover\"\n        [focusIf]=\"focus\">\n</div>\n\n<ng-template #popoverTemplate>\n    <ux-date-time-picker [(date)]=\"value\" [showTime]=\"false\"></ux-date-time-picker>\n</ng-template>"
            }] }
];
function SearchDateComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    SearchDateComponent.prototype.type;
}
/**
 * @record
 */
export function SearchDateConfig() { }
function SearchDateConfig_tsickle_Closure_declarations() {
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9zZWFyY2gtYnVpbGRlci9zZWFyY2gtY29tcG9uZW50cy9kYXRlL2RhdGUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLE1BQU0sZUFBZSxDQUFDO0FBQ2xELE9BQU8sRUFBRSxtQkFBbUIsRUFBNkIsTUFBTSwwQkFBMEIsQ0FBQztBQU0xRixNQUFNLDBCQUEyQixTQUFRLG1CQUFtQjs7O29CQUUzQyxNQUFNOzs7OztJQUVyQixJQUFJLEtBQUs7UUFDUCxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUM7S0FDMUI7Ozs7SUFFRCxJQUFJLFdBQVc7UUFDYixNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLElBQUksWUFBWSxDQUFDO0tBQ2hEOzs7O0lBRUQsUUFBUTs7UUFHTixFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ2hCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQztTQUN6QjtLQUNGOzs7WUF0QkYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxnQkFBZ0I7Z0JBQzFCLGd5QkFBb0M7YUFDckMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQmFzZVNlYXJjaENvbXBvbmVudCwgQmFzZVNlYXJjaENvbXBvbmVudENvbmZpZyB9IGZyb20gJy4uL2Jhc2Utc2VhcmNoLmNvbXBvbmVudCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3V4LXNlYXJjaC1kYXRlJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2RhdGUuY29tcG9uZW50Lmh0bWwnXG59KVxuZXhwb3J0IGNsYXNzIFNlYXJjaERhdGVDb21wb25lbnQgZXh0ZW5kcyBCYXNlU2VhcmNoQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICB0eXBlOiBzdHJpbmcgPSAnZGF0ZSc7XG5cbiAgZ2V0IGxhYmVsKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuY29uZmlnLmxhYmVsO1xuICB9XG5cbiAgZ2V0IHBsYWNlaG9sZGVyKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuY29uZmlnLnBsYWNlaG9sZGVyIHx8ICdFbnRlciBkYXRlJztcbiAgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuXG4gICAgLy8gYnkgZGVmYXVsdCBzZXQgdG8gdGhlIGN1cnJlbnQgZGF0ZSBpZiBub3Qgc3BlY2lmaWVkXG4gICAgaWYgKCF0aGlzLnZhbHVlKSB7XG4gICAgICB0aGlzLnZhbHVlID0gbmV3IERhdGUoKTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGludGVyZmFjZSBTZWFyY2hEYXRlQ29uZmlnIGV4dGVuZHMgQmFzZVNlYXJjaENvbXBvbmVudENvbmZpZyB7IH0iXX0=