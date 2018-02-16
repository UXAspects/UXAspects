import { Component } from '@angular/core';
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

    tickets: TimelineEvent[] = [{
        color: 'critical',
        shortDate: 'Mon 29th',
        title: 'Addition of Timeline component',
        date: new Date(2018, 0, 29, 11, 10),
        url: '#',
        id: '1234',
        status: 'failed by',
        assignee: chance.name()
    }, {
        color: 'alternate3',
        shortDate: 'Fri 26th',
        title: 'Addition of Timeline component',
        date: new Date(2018, 0, 26, 14, 0),
        url: '#',
        id: '1234',
        status: 'reviewed by',
        assignee: chance.name()
    }, {
        color: 'alternate1',
        shortDate: 'Wed 24th',
        title: 'Addition of Timeline component',
        date: new Date(2018, 0, 24, 9, 20),
        url: '#',
        id: '1234',
        status: 'assigned for development to',
        assignee: chance.name()
    }, {
        color: 'accent',
        shortDate: 'Mon 22nd',
        title: 'Addition of Timeline component',
        date: new Date(2018, 0, 22, 13, 45),
        url: '#',
        id: '1234',
        status: 'recorded by',
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

        this.tickets.unshift({
            color: 'alternate2',
            shortDate: month + ' ' + day + suffix,
            title: 'Addition of Timeline component',
            date: now,
            url: '#',
            id: '1234',
            status: 'updated by',
            assignee: chance.name()
        });
    }
}

interface TimelineEvent {
    color?: string;
    shortDate: string;
    title?: string;
    date?: Date;
    url?: string;
    id?: string;
    status?: string;
    assignee?: string;
}