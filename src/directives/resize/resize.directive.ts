import { Directive, Output, EventEmitter, ElementRef, Input, Renderer2 } from '@angular/core';
import { ResizeService, ResizeDimensions } from './resize.service';
import 'rxjs/add/operator/debounceTime';

@Directive({
    selector: '[uxResize]'
})
export class ResizeDirective {

    @Input() throttle: number = 0;
    @Output('uxResize') resize: EventEmitter<ResizeDimensions> = new EventEmitter<ResizeDimensions>();

    constructor(private _elementRef: ElementRef, private _resizeService: ResizeService, private _renderer: Renderer2) { }

    ngOnInit(): void {
        this._resizeService.addResizeListener(this._elementRef.nativeElement, this._renderer)
            .debounceTime(this.throttle)
            .subscribe(event => this.resize.emit(event));
    }
}