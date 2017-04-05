import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { ICodePenProvider } from '../../../../../interfaces/ICodePenProvider';
import { ICodePen } from '../../../../../interfaces/ICodePen';

@Component({
    selector: 'uxd-components-tabs-ng1',
    templateUrl: './tabs-ng1.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
@DocumentationSectionComponent('ComponentsTabsNg1Component')
export class ComponentsTabsNg1Component implements ICodePenProvider {
    
    private htmlCode = require('./snippets/sample.html');

    private jsCode = require('./snippets/sample.js');

    private tabContent = require('./wrapper/tab.html');

    public codepen: ICodePen = {
        html: this.htmlCode,
        htmlAttributes: {
            'ng-controller': 'TabsCtrl as vm'
        },
        htmlTemplates: [
            {
                id: 'tab.html',
                content: this.tabContent
            }
        ],
        js: [this.jsCode]
    };

}