import { Directive, Output, EventEmitter, ElementRef, Input, NgZone, OnInit } from '@angular/core';
import { ResizeService, ResizeDimensions } from './resize.service';
import { debounceTime } from 'rxjs/operators/debounceTime';

@Directive({
    selector: '[uxResize]'
})
export class ResizeDirective implements OnInit {

    @Input() throttle: number = 0;
    @Output() uxResize: EventEmitter<ResizeDimensions> = new EventEmitter<ResizeDimensions>();

    constructor(private _elementRef: ElementRef, private _resizeService: ResizeService, private _ngZone: NgZone) { }

    ngOnInit(): void {
        this._resizeService.addResizeListener(this._elementRef.nativeElement)
            .pipe(debounceTime(this.throttle))
            .subscribe((event: ResizeDimensions) => this._ngZone.run(() => this.uxResize.emit(event)));
    }
}