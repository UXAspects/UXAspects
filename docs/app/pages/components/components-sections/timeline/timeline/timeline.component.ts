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

    convertToDate(year: number, month: number, day: number, hour: number, minute: number, second: number) {
        day = arguments[2] || 1;
        hour = arguments[3] || 0;
        minute = arguments[4] || 0;
        second = arguments[5] || 0;

        return new Date(year, month, day, hour, minute, second);
    }

    addEvent = function () {

    };
}

