import { Observable } from 'rxjs';

/**
 * This is a simple RxJS operator to allow us to avoid the
 * "expression has changed after it was checked issue"
 * by making the subscription asynchronous. We could just use a
 * delay operator but this uses a timeout which is significantly
 * slower than using requestAnimationFrame.
 */
export const tick = <T>() => (source: Observable<T>) => new Observable<T>((subscriber) => {
    source.subscribe({
        next(value: T) { requestAnimationFrame(() => subscriber.next(value)); },
        error(err: any) { subscriber.error(err); },
        complete() { subscriber.complete(); },
    });
});