import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import 'chance';

@Component({
    selector: 'uxd-components-timeline',
    templateUrl: './timeline.component.html'
})
@DocumentationSectionComponent('ComponentsTimelineComponent')
export class ComponentsTimelineComponent extends BaseDocumentationSection {

    constructor() {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));
    }

    events: TimelineEvent[] = [{
        color: 'alternate3',
        shortDate: 'Mon 29th',
        date: new Date(2018, 0, 29, 11, 10),
        url: '#',
        id: '1234',
        action: 'tested',
        assignee: chance.name()
    }, {
        color: 'alternate2',
        shortDate: 'Fri 26th',
        date: new Date(2018, 0, 26, 14, 0),
        url: '#',
        id: '1234',
        action: 'reviewed',
        assignee: chance.name()
    }, {
        color: 'alternate1',
        shortDate: 'Wed 24th',
        date: new Date(2018, 0, 24, 9, 20),
        url: '#',
        id: '1234',
        action: 'developed',
        assignee: chance.name()
    }, {
        color: 'primary',
        shortDate: 'Mon 22nd',
        date: new Date(2018, 0, 22, 13, 45),
        url: '#',
        id: '1234',
        action: 'recorded',
        assignee: chance.name()
    }];

    addEvent(): void {
        const now = new Date();
        const day = now.getDate();
        let suffix = 'th';
        if (day === 1 || day === 21) {
            suffix = 'st';
        } else if (day === 2 || day === 22) {
            suffix = 'nd';
        } else if (day === 3 || day === 23) {
            suffix = 'rd';
        }

        const months: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const month = months[now.getMonth()];

        this.events.unshift({
            color: 'alternate1',
            shortDate: month + ' ' + day + suffix,
            date: now,
            url: '#',
            id: '1234',
            action: 'updated',
            assignee: chance.name()
        });
    }
}

interface TimelineEvent {
    color?: string;
    shortDate: string;
    date?: Date;
    url?: string;
    id?: string;
    action?: 'recorded' | 'developed' | 'updated' | 'reviewed' | 'tested' | 'closed';
    assignee?: string;
}