import { ElementRef, Injectable, OnDestroy, Renderer2 } from '@angular/core';
import { ViewportRuler } from '@angular/cdk/scrolling';
import { ResizeService } from '../../directives/resize/index';
import { takeUntil } from 'rxjs/operators';
import { fromEvent, Subject } from 'rxjs';

@Injectable()
/** Rename  */
export class ViewportListenerService {

    constructor(
        public elementRef: ElementRef,
        public _resizeService: ResizeService,
        public _viewportRuler: ViewportRuler,
        public _renderer: Renderer2) {
    }

    public createViewportListener(element: ElementRef | HTMLElement, parentElement?: ElementRef | HTMLElement): ViewportListener {

        const nativeElement = element instanceof ElementRef ? element.nativeElement : element;

        const nativeElementParent = parentElement instanceof ElementRef ? parentElement.nativeElement : element;

        return new ViewportListener(nativeElement, nativeElementParent, this._resizeService, this._viewportRuler, this._renderer);
    }

}

export class ViewportListener implements OnDestroy {

    /** Allow subscribing to state changes */
    change$ = new Subject<ViewportDirection>();

    /** Store the last known position and size */
    private _rect: ClientRect;

    private _onDestroy = new Subject<void>();

    constructor(private _element: HTMLElement,
                private _elementParent: HTMLElement,
                private _resizeService: ResizeService,
                private _viewportRuler: ViewportRuler,
                private _renderer: Renderer2) {

        // watch for changes to the typeahead size
        this._resizeService.addResizeListener(this._element).pipe(takeUntil(this._onDestroy))
            .subscribe(() => {
                this.onScrollOrResize();
            });

        // watch for changes to the typeahead position when scrolling
        fromEvent(window, 'scroll', { passive: true }).pipe(takeUntil(this._onDestroy))
            .subscribe(() => this.onScrollOrResize());

    }

    ngOnDestroy(): void {
        this.change$.complete();
        this._onDestroy.next();
        this._onDestroy.complete();
        this._resizeService.removeResizeListener(this._element);
    }

    private onScrollOrResize() {
        this._rect = this._elementParent ? this._elementParent.parentElement.getBoundingClientRect() : this._element.parentElement.getBoundingClientRect();
        const itemHeight = this._element.offsetHeight;
        const viewportSize = this._viewportRuler.getViewportSize();
        const bottomSpaceAvailable = viewportSize.height - this._rect.bottom - itemHeight;

        this.change$.next(bottomSpaceAvailable <= 0 ? ViewportDirection.Up : ViewportDirection.Down);
    }
}

export const enum ViewportDirection {
    Up,
    Down
}