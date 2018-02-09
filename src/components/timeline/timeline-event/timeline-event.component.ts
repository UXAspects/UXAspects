import { Component, Input, ElementRef, Renderer2 } from '@angular/core';

@Component({
    selector: 'ux-timeline-event',
    templateUrl: './timeline-event.component.html'
})
export class TimelineEventComponent {

    @Input() badgeColor: string;
    @Input() badgeTitle: string;
    @Input() title: string;
    @Input() timestamp: Date;
    
    constructor (
        private _elementRef: ElementRef,
        private _renderer: Renderer2,
    ) {}

    ngAfterViewInit(): void {
        this._renderer.setAttribute(this._elementRef.nativeElement, 'side', 'right');
    }

    
}