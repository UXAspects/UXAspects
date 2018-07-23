import { Directive, ElementRef, EventEmitter, Input, NgZone, OnDestroy, OnInit, Output } from '@angular/core';
import { debounceTime } from 'rxjs/operators';
import { Subscription } from 'rxjs/Subscription';
import { ResizeDimensions, ResizeService } from './resize.service';

@Directive({
    selector: '[uxResize]',
    providers: [ResizeService]
})
export class ResizeDirective implements OnInit, OnDestroy {

    @Input() throttle: number = 0;
    @Output() uxResize: EventEmitter<ResizeDimensions> = new EventEmitter<ResizeDimensions>();

    private _subscription: Subscription;

    constructor(private _elementRef: ElementRef, private _resizeService: ResizeService, private _ngZone: NgZone) { }

    ngOnInit(): void {
        this._subscription = this._resizeService.addResizeListener(this._elementRef.nativeElement)
            .pipe(debounceTime(this.throttle))
            .subscribe((event: ResizeDimensions) => this._ngZone.run(() => this.uxResize.emit(event)));
    }

    ngOnDestroy(): void {
        this._resizeService.removeResizeListener(this._elementRef.nativeElement);
        this._subscription.unsubscribe();
    }
}