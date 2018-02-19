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

    events: TimelineEvent[] = [{
        color: 'alternate3',
        date: new Date(2018, 0, 29, 11, 10),
        url: '#',
        id: '1234',
        action: 'tested',
        assignee: chance.name()
    }, {
        color: 'alternate2',
        date: new Date(2018, 0, 26, 14, 0),
        url: '#',
        id: '1234',
        action: 'reviewed',
        assignee: chance.name()
    }, {
        color: 'alternate1',
        date: new Date(2018, 0, 24, 9, 20),
        url: '#',
        id: '1234',
        action: 'developed',
        assignee: chance.name()
    }, {
        color: 'primary',
        date: new Date(2018, 0, 22, 13, 45),
        url: '#',
        id: '1234',
        action: 'recorded',
        assignee: chance.name()
    }];

    constructor() {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));
    }

    addEvent(): void {
        this.events.unshift({
            color: 'alternate1',
            date: new Date(),
            url: '#',
            id: '1234',
            action: 'updated',
            assignee: chance.name()
        });
    }
}

interface TimelineEvent {
    color: string;
    date: Date;
    url: string;
    id: string;
    action: 'recorded' | 'developed' | 'updated' | 'reviewed' | 'tested' | 'closed';
    assignee: string;
}