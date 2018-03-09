import { Component } from '@angular/core';
import 'chance';

@Component({
    selector: 'timeline-app',
    templateUrl: './timeline.testpage.component.html'
})
export class TimelineTestPageComponent {

    private _now = Date.now();
    private _dayInMilliSeconds = 24 * 60 * 60 * 1000;
    private _daysAfterFirstEvent = 3;
    
    events: TimelineEvent[] = [{
        color: 'accent',
        date: new Date(this._now + (this._dayInMilliSeconds * 3)),
        url: '#',
        id: chance.integer({min: 1000, max: 9999}),
        action: 'tested',
        assignee: chance.name()
    }, {
        color: 'alternate2',
        date: new Date(this._now + (this._dayInMilliSeconds * 2)),
        url: '#',
        id: chance.integer({min: 1000, max: 9999}),
        action: 'reviewed',
        assignee: chance.name()
    }, {
        color: 'grey4',
        date: new Date(this._now + this._dayInMilliSeconds),
        url: '#',
        id: chance.integer({min: 1000, max: 9999}),
        action: 'developed',
        assignee: chance.name()
    }, {
        color: 'primary',
        date: new Date(this._now),
        url: '#',
        id: chance.integer({min: 1000, max: 9999}),
        action: 'recorded',
        assignee: chance.name()
    }];

    addEvent(): void {
        this._daysAfterFirstEvent++;
        this.events.unshift({
            color: 'grey4',
            date: new Date(this._now + (this._dayInMilliSeconds * this._daysAfterFirstEvent)),
            url: '#',
            id: chance.integer({min: 1000, max: 9999}),
            action: 'updated',
            assignee: chance.name()
        });
    }
}

interface TimelineEvent {
    color: string;
    date: Date;
    url: string;
    id: number;
    action: 'recorded' | 'developed' | 'updated' | 'reviewed' | 'tested' | 'closed';
    assignee: string;
}
