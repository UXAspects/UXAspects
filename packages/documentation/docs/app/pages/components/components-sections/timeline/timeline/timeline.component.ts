import { Component } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { IPlunkProvider } from '../../../../../interfaces/IPlunkProvider';
import { IPlunk } from '../../../../../interfaces/IPlunk';
import 'chance';

@Component({
    selector: 'uxd-components-timeline',
    templateUrl: './timeline.component.html'
})
@DocumentationSectionComponent('ComponentsTimelineComponent')
export class ComponentsTimelineComponent extends BaseDocumentationSection implements IPlunkProvider {

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
        date: new Date(this._now + (this._dayInMilliSeconds * 1)),
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

    plunk: IPlunk = {
        files: {
            'app.component.html': this.snippets.raw.appHtml,
            'app.component.ts': this.snippets.raw.appTs,
        },
        modules: [{
            imports: ['TimelineModule'],
            library: '@ux-aspects/ux-aspects'
        }]
    };

    constructor() {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));
    }

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