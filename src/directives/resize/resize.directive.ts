import { Directive, ElementRef, EventEmitter, Input, NgZone, OnDestroy, OnInit, Output } from '@angular/core';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { ResizeDimensions, ResizeService } from './resize.service';

@Directive({
    selector: '[uxResize]',
    providers: [ResizeService]
})
export class ResizeDirective implements OnInit, OnDestroy {

    /** Debounce the resize event emitter */
    @Input() throttle: number = 0;

    /** Emits whenever a resize event occurs */
    @Output() uxResize: EventEmitter<ResizeDimensions> = new EventEmitter<ResizeDimensions>();

    /** Remove all subscriptions on component destroy */
    private _onDestroy = new Subject<void>();

    constructor(private _elementRef: ElementRef, private _resizeService: ResizeService, private _ngZone: NgZone) { }

    ngOnInit(): void {
        this._resizeService.addResizeListener(this._elementRef.nativeElement)
            .pipe(takeUntil(this._onDestroy), debounceTime(this.throttle))
            .subscribe((event: ResizeDimensions) => this._ngZone.run(() => this.uxResize.emit(event)));
    }

    ngOnDestroy(): void {
        this._resizeService.removeResizeListener(this._elementRef.nativeElement);
        this._onDestroy.next();
        this._onDestroy.complete();
    }
}