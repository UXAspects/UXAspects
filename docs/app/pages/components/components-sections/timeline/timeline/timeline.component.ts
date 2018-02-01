import { Component } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';

@Component({
    selector: 'uxd-components-timeline',
    templateUrl: './timeline.component.html'
})
@DocumentationSectionComponent('ComponentsTimelineComponent')
export class ComponentsTimelineComponent extends BaseDocumentationSection {

    constructor() {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));
    }

    private _index: number = 0;
    
    events = [{
        badgeColor: 'warning',
        badgeTitle: 'Mon 29th',
        title: 'Testing failed',
        timestamp: new Date(2018, 0, 29, 11, 10),
        content: '<a class="hyperlink" href="#/">Incident details</a></br><a class="hyperlink" href="#/">Assigned to</a>'
    }, {
        badgeColor: 'alternate3',
        badgeTitle: 'Fri 26th',
        title: 'Incident assigned for testing',
        timestamp: new Date(2018, 0, 26, 14, 0),
        content: '<a class="hyperlink" href="#/">Incident details</a></br><a class="hyperlink" href="#/">Tested by</a>'
    }, {
        badgeColor: 'alternate1',
        badgeTitle: 'Wed 24th',
        title: 'Incident assigned to developer',
        timestamp: new Date(2018, 0, 24, 9, 20),
        content: '<a class="hyperlink" href="#/">Incident details</a></br><a class="hyperlink" href="#/">Assigned to</a>'
    }, {
        badgeColor: 'accent',
        badgeTitle: 'Mon 22nd',
        title: 'Incident recorded',
        timestamp: new Date(2018, 0, 22, 13, 45),
        content: '<a class="hyperlink" href="#/">Incident details</a>',
    }];
  
    addEvent = function () {
        this._index++;

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
            badgeColor: 'alternate2',
            badgeTitle: month + ' ' + day + suffix,
            title: 'Changes commited for review',
            timestamp: new Date(),
            content: '<a class="hyperlink" href="#/">Incident details</a></br><a class="hyperlink" href="#/">Assigned for review to</a>'
        });
    };
}

