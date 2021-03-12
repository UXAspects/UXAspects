import { ElementRef, Injectable } from '@angular/core';
import { ViewportRuler } from '@angular/cdk/scrolling';
import { ResizeService } from '../../directives/resize/index';
import { takeUntil } from 'rxjs/operators';
import { BehaviorSubject, fromEvent, Subject } from 'rxjs';

@Injectable()
export class PopoverOrientationService {

    constructor(
        public elementRef: ElementRef,
        public _resizeService: ResizeService,
        public _viewportRuler: ViewportRuler) {
    }

    public createPopoverOrientationListener(
        element: ElementRef | HTMLElement,
        parentElement?: ElementRef | HTMLElement): PopoverOrientationListener {

        const nativeElement = element instanceof ElementRef ? element.nativeElement : element;

        const nativeElementParent = parentElement instanceof ElementRef ? parentElement.nativeElement : element;

        return new PopoverOrientationListener(nativeElement, nativeElementParent, this._resizeService, this._viewportRuler);
    }

}

export class PopoverOrientationListener {

    /** Allow subscribing to state changes */
    orientation$ = new BehaviorSubject<PopoverOrientation>(1);

    /** Max value the height of the dropdown can be */
    maxHeight: number = 250;

    /** Store the last known position and size */
    private _rect: ClientRect;

    private _onDestroy = new Subject<void>();

    constructor(private _element: HTMLElement,
                private _elementParent: HTMLElement,
                private _resizeService: ResizeService,
                private _viewportRuler: ViewportRuler) {

        // watch for changes to the typeahead size
        this._resizeService.addResizeListener(this._element).pipe(takeUntil(this._onDestroy))
            .subscribe(() => {
                this.onScrollOrResize();
            });

        // watch for changes to the typeahead position when scrolling or resizing
        fromEvent(window, 'scroll', { passive: true }).pipe(takeUntil(this._onDestroy))
            .subscribe(() => this.onScrollOrResize());
        fromEvent(window, 'resize', { passive: true }).pipe(takeUntil(this._onDestroy))
            .subscribe(() => this.onScrollOrResize());

    }

    destroy(): void {
        this.orientation$.complete();
        this._onDestroy.next();
        this._onDestroy.complete();
        this._resizeService.removeResizeListener(this._element);
    }

    private onScrollOrResize() {
        this._rect = this._elementParent ? this._elementParent.parentElement.getBoundingClientRect() : this._element.parentElement.getBoundingClientRect();
        // use the maxHeight input value if the element does not exist yet to prevent the direction from immediately changing when opened
        const itemHeight = this._element.offsetHeight || this.maxHeight;
        const viewportSize = this._viewportRuler.getViewportSize();
        const bottomSpaceAvailable = viewportSize.height - this._rect.bottom - itemHeight;

        this.orientation$.next(bottomSpaceAvailable <= 0 ? PopoverOrientation.Up : PopoverOrientation.Down);
    }
}

export const enum PopoverOrientation {
    Up,
    Down
}
