import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'ux-timeline',
    templateUrl: './timeline.component.html',
    encapsulation: ViewEncapsulation.None
})
export class TimelineComponent {

    constructor () {}

    private _events: any[] = [];
  
    @Input('events')
    get events() {
        if (!this._events) {
            this._events = [];
        }
        return this._events;
    }
    set events(value: any[]) {
        this._events = value;
    }
}