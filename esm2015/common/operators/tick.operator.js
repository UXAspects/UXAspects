/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Observable } from 'rxjs/Observable';
/**
 * This is a simple RxJS operator to allow us to avoid the
 * "expression has changed after it was checked issue"
 * by making the subscription asynchronous. We could just use a
 * delay operator but this uses a timeout which is significantly
 * slower than using requestAnimationFrame.
 */
export const /** @type {?} */ tick = () => (source) => new Observable((subscriber) => {
    source.subscribe({
        /**
         * @param {?} value
         * @return {?}
         */
        next(value) { requestAnimationFrame(() => subscriber.next(value)); },
        /**
         * @param {?} err
         * @return {?}
         */
        error(err) { subscriber.error(err); },
        /**
         * @return {?}
         */
        complete() { subscriber.complete(); },
    });
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGljay5vcGVyYXRvci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJjb21tb24vb3BlcmF0b3JzL3RpY2sub3BlcmF0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQzs7Ozs7Ozs7QUFTN0MsTUFBTSxDQUFDLHVCQUFNLElBQUksR0FBRyxHQUFNLEVBQUUsQ0FBQyxDQUFDLE1BQXFCLEVBQUUsRUFBRSxDQUFDLElBQUksVUFBVSxDQUFJLENBQUMsVUFBVSxFQUFFLEVBQUU7SUFDckYsTUFBTSxDQUFDLFNBQVMsQ0FBQzs7Ozs7UUFDYixJQUFJLENBQUMsS0FBUSxJQUFJLHFCQUFxQixDQUFDLEdBQUcsRUFBRSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFOzs7OztRQUN2RSxLQUFLLENBQUMsR0FBUSxJQUFJLFVBQVUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRTs7OztRQUMxQyxRQUFRLEtBQUssVUFBVSxDQUFDLFFBQVEsRUFBRSxDQUFDLEVBQUU7S0FDeEMsQ0FBQyxDQUFDO0NBQ04sQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XG5cbi8qKlxuICogVGhpcyBpcyBhIHNpbXBsZSBSeEpTIG9wZXJhdG9yIHRvIGFsbG93IHVzIHRvIGF2b2lkIHRoZVxuICogXCJleHByZXNzaW9uIGhhcyBjaGFuZ2VkIGFmdGVyIGl0IHdhcyBjaGVja2VkIGlzc3VlXCJcbiAqIGJ5IG1ha2luZyB0aGUgc3Vic2NyaXB0aW9uIGFzeW5jaHJvbm91cy4gV2UgY291bGQganVzdCB1c2UgYVxuICogZGVsYXkgb3BlcmF0b3IgYnV0IHRoaXMgdXNlcyBhIHRpbWVvdXQgd2hpY2ggaXMgc2lnbmlmaWNhbnRseVxuICogc2xvd2VyIHRoYW4gdXNpbmcgcmVxdWVzdEFuaW1hdGlvbkZyYW1lLlxuICovXG5leHBvcnQgY29uc3QgdGljayA9IDxUPigpID0+IChzb3VyY2U6IE9ic2VydmFibGU8VD4pID0+IG5ldyBPYnNlcnZhYmxlPFQ+KChzdWJzY3JpYmVyKSA9PiB7XG4gICAgc291cmNlLnN1YnNjcmliZSh7XG4gICAgICAgIG5leHQodmFsdWU6IFQpIHsgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHN1YnNjcmliZXIubmV4dCh2YWx1ZSkpOyB9LFxuICAgICAgICBlcnJvcihlcnI6IGFueSkgeyBzdWJzY3JpYmVyLmVycm9yKGVycik7IH0sXG4gICAgICAgIGNvbXBsZXRlKCkgeyBzdWJzY3JpYmVyLmNvbXBsZXRlKCk7IH0sXG4gICAgfSk7XG59KTsiXX0=