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
export var /** @type {?} */ tick = function () { return function (source) { return new Observable(function (subscriber) {
    source.subscribe({
        next: /**
         * @param {?} value
         * @return {?}
         */
        function (value) { requestAnimationFrame(function () { return subscriber.next(value); }); },
        error: /**
         * @param {?} err
         * @return {?}
         */
        function (err) { subscriber.error(err); },
        complete: /**
         * @return {?}
         */
        function () { subscriber.complete(); },
    });
}); }; };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGljay5vcGVyYXRvci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJjb21tb24vb3BlcmF0b3JzL3RpY2sub3BlcmF0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQzs7Ozs7Ozs7QUFTN0MsTUFBTSxDQUFDLHFCQUFNLElBQUksR0FBRyxjQUFTLE9BQUEsVUFBQyxNQUFxQixJQUFLLE9BQUEsSUFBSSxVQUFVLENBQUksVUFBQyxVQUFVO0lBQ2pGLE1BQU0sQ0FBQyxTQUFTLENBQUM7UUFDYixJQUFJOzs7O2tCQUFDLEtBQVEsSUFBSSxxQkFBcUIsQ0FBQyxjQUFNLE9BQUEsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBdEIsQ0FBc0IsQ0FBQyxDQUFDLEVBQUU7UUFDdkUsS0FBSzs7OztrQkFBQyxHQUFRLElBQUksVUFBVSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFO1FBQzFDLFFBQVE7OztzQkFBSyxVQUFVLENBQUMsUUFBUSxFQUFFLENBQUMsRUFBRTtLQUN4QyxDQUFDLENBQUM7Q0FDTixDQUFDLEVBTnNELENBTXRELEVBTjJCLENBTTNCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcblxuLyoqXG4gKiBUaGlzIGlzIGEgc2ltcGxlIFJ4SlMgb3BlcmF0b3IgdG8gYWxsb3cgdXMgdG8gYXZvaWQgdGhlXG4gKiBcImV4cHJlc3Npb24gaGFzIGNoYW5nZWQgYWZ0ZXIgaXQgd2FzIGNoZWNrZWQgaXNzdWVcIlxuICogYnkgbWFraW5nIHRoZSBzdWJzY3JpcHRpb24gYXN5bmNocm9ub3VzLiBXZSBjb3VsZCBqdXN0IHVzZSBhXG4gKiBkZWxheSBvcGVyYXRvciBidXQgdGhpcyB1c2VzIGEgdGltZW91dCB3aGljaCBpcyBzaWduaWZpY2FudGx5XG4gKiBzbG93ZXIgdGhhbiB1c2luZyByZXF1ZXN0QW5pbWF0aW9uRnJhbWUuXG4gKi9cbmV4cG9ydCBjb25zdCB0aWNrID0gPFQ+KCkgPT4gKHNvdXJjZTogT2JzZXJ2YWJsZTxUPikgPT4gbmV3IE9ic2VydmFibGU8VD4oKHN1YnNjcmliZXIpID0+IHtcbiAgICBzb3VyY2Uuc3Vic2NyaWJlKHtcbiAgICAgICAgbmV4dCh2YWx1ZTogVCkgeyByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4gc3Vic2NyaWJlci5uZXh0KHZhbHVlKSk7IH0sXG4gICAgICAgIGVycm9yKGVycjogYW55KSB7IHN1YnNjcmliZXIuZXJyb3IoZXJyKTsgfSxcbiAgICAgICAgY29tcGxldGUoKSB7IHN1YnNjcmliZXIuY29tcGxldGUoKTsgfSxcbiAgICB9KTtcbn0pOyJdfQ==