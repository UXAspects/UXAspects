import { Observable } from 'rxjs/Observable';
/**
 * This is a simple RxJS operator to allow us to avoid the
 * "expression has changed after it was checked issue"
 * by making the subscription asynchronous. We could just use a
 * delay operator but this uses a timeout which is significantly
 * slower than using requestAnimationFrame.
 */
export declare const tick: <T>() => (source: Observable<T>) => Observable<T>;
