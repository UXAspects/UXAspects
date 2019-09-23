import { Injectable, NgZone, OnDestroy } from '@angular/core';
import ResizeObserver from 'resize-observer-polyfill';
import { ReplaySubject } from 'rxjs';

@Injectable()
export class ResizeService implements OnDestroy {

    private _observer = new ResizeObserver(this.elementDidResize.bind(this));
    private _targets = new WeakMap<HTMLElement, ReplaySubject<ResizeDimensions>>();

    constructor(private _zone: NgZone) {}

    ngOnDestroy(): void {
        this._observer.disconnect();
    }

    addResizeListener(target: HTMLElement): ReplaySubject<ResizeDimensions> {
        this._zone.runOutsideAngular(() => this._observer.observe(target));

        if (this._targets.has(target)) {
            return this._targets.get(target);
        } else {
            const emitter = new ReplaySubject<ResizeDimensions>();
            this._targets.set(target, emitter);
            return emitter;
        }
    }

    removeResizeListener(target: HTMLElement): void {
        this._observer.unobserve(target);
    }

    private elementDidResize(entries: ResizeObserverEntry[]): void {
        this._zone.run(() => {
            for (const entry of entries) {
                if (this._targets.has(entry.target as HTMLElement)) {
                    const emitter = this._targets.get(entry.target as HTMLElement);
                    emitter.next({ width: (entry.target as HTMLElement).offsetWidth, height: (entry.target as HTMLElement).offsetHeight });
                }
            }
        });
    }
}

export interface ResizeDimensions {
    width: number;
    height: number;
}