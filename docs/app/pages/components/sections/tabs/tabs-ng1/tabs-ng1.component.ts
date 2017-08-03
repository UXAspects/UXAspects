import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { ICodePenProvider } from '../../../../../interfaces/ICodePenProvider';
import { ICodePen } from '../../../../../interfaces/ICodePen';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';

@Component({
    selector: 'uxd-components-tabs-ng1',
    templateUrl: './tabs-ng1.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
@DocumentationSectionComponent('ComponentsTabsNg1Component')
export class ComponentsTabsNg1Component extends BaseDocumentationSection implements ICodePenProvider {

    tabContent = require('./wrapper/tab.html');

    codepen: ICodePen = {
        html: this.snippets.raw.sampleHtml,
        htmlAttributes: {
            'ng-controller': 'TabsCtrl as vm'
        },
        htmlTemplates: [
            {
                id: 'tab.html',
                content: this.tabContent
            }
        ],
        js: [this.snippets.raw.sampleJs]
    };

    constructor() {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));
    }

}