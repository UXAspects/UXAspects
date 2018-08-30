/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
var AccordionService = /** @class */ (function () {
    function AccordionService() {
        this.collapseOthers = false;
        this.collapse = new Subject();
    }
    /**
     * @return {?}
     */
    AccordionService.prototype.collapseAll = /**
     * @return {?}
     */
    function () {
        this.collapse.next();
    };
    AccordionService.decorators = [
        { type: Injectable }
    ];
    return AccordionService;
}());
export { AccordionService };
function AccordionService_tsickle_Closure_declarations() {
    /** @type {?} */
    AccordionService.prototype.collapseOthers;
    /** @type {?} */
    AccordionService.prototype.collapse;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNjb3JkaW9uLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9hY2NvcmRpb24vYWNjb3JkaW9uLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLGNBQWMsQ0FBQzs7OzhCQUtULEtBQUs7d0JBQ3BCLElBQUksT0FBTyxFQUFROzs7OztJQUU5QixzQ0FBVzs7O0lBQVg7UUFDSSxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO0tBQ3hCOztnQkFSSixVQUFVOzsyQkFIWDs7U0FJYSxnQkFBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcy9TdWJqZWN0JztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEFjY29yZGlvblNlcnZpY2Uge1xuXG4gICAgY29sbGFwc2VPdGhlcnM6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBjb2xsYXBzZSA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG5cbiAgICBjb2xsYXBzZUFsbCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5jb2xsYXBzZS5uZXh0KCk7XG4gICAgfVxufSJdfQ==