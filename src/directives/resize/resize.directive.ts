import { Directive, Output, EventEmitter, ElementRef, Input, Renderer2 } from '@angular/core';
import { ResizeService } from './resize.service';
import 'rxjs/add/operator/debounceTime';

@Directive({
    selector: '[uxResize]'
})
export class ResizeDirective {

    @Input() throttle: number = 0;
    @Output('uxResize') resize: EventEmitter<any> = new EventEmitter<any>();

    constructor(private elementRef: ElementRef, private resizeService: ResizeService, private renderer: Renderer2) { }

    ngOnInit(): void {
        this.resizeService.addResizeListener(this.elementRef.nativeElement, this.renderer).debounceTime(this.throttle).subscribe(event => {
            this.resize.emit();
        });
    }
}