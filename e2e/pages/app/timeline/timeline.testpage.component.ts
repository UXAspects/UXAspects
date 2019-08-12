import { Component } from '@angular/core';

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
        date: new Date(2019, 9, 15),
        url: '#',
        id: 6831,
        action: 'tested',
        assignee: 'Lettie Bradley'
    }, {
        color: 'alternate2',
        date: new Date(2019, 9, 14),
        url: '#',
        id: 9774,
        action: 'reviewed',
        assignee: 'Joe Mills'
    }, {
        color: 'grey4',
        date: new Date(2019, 9, 13),
        url: '#',
        id: 6632,
        action: 'developed',
        assignee: 'Mable Hammond'
    }, {
        color: 'primary',
        date: new Date(2019, 9, 12),
        url: '#',
        id: 8185,
        action: 'recorded',
        assignee: 'Ellen Obrien'
    }];

    private _events = [...this.events];

    addEvent(): void {
        this._daysAfterFirstEvent++;
        this.events.unshift({
            color: 'grey4',
            date: new Date(2019, 9, 12 + this._daysAfterFirstEvent),
            url: '#',
            id: 2298,
            action: 'updated',
            assignee: 'Madge Simpson'
        });
    }

    reset(): void {
        this.events = [...this._events];
        this._daysAfterFirstEvent = 3;
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
