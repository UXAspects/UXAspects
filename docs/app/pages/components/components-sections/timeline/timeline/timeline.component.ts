import { Component } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { IPlunkProvider } from '../../../../../interfaces/IPlunkProvider';
import { IPlunk } from '../../../../../interfaces/IPlunk';

@Component({
    selector: 'uxd-components-timeline',
    templateUrl: './timeline.component.html',
    styleUrls: ['./timeline.component.less']
})
@DocumentationSectionComponent('ComponentsTimelineComponent')
export class ComponentsTimelineComponent extends BaseDocumentationSection {

    constructor() {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));
    }
}

