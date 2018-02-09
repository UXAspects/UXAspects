import { Component, AfterViewInit, ElementRef, Renderer2 } from '@angular/core';

@Component({
    selector: 'ux-timeline',
    templateUrl: './timeline.component.html'
})
export class TimelineComponent implements AfterViewInit {

    constructor (
        private _elementRef: ElementRef,
        private _renderer: Renderer2,
    ) {}

    ngAfterViewInit(): void {
        this._renderer.setAttribute(this._elementRef.nativeElement, 'side', 'right');
    }
}