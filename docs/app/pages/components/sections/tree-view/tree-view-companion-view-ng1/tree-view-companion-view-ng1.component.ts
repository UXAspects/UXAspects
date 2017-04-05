import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { ICodePenProvider } from '../../../../../interfaces/ICodePenProvider';
import { ICodePen } from '../../../../../interfaces/ICodePen';

@Component({
    selector: 'uxd-components-tree-view-companion-view-ng1',
    templateUrl: './tree-view-companion-view-ng1.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
@DocumentationSectionComponent('ComponentsTreeViewCompanionViewNg1Component')
export class ComponentsTreeViewCompanionViewNg1Component implements ICodePenProvider {

    private htmlCode = require('./snippets/sample.html');
    private jsCode = require('./snippets/sample.js');

    public codepen: ICodePen = {
        html: this.htmlCode,
        htmlAttributes: {
            'ng-controller': 'TreeViewCompanionViewCtrl as vm'
        },
        js: [this.jsCode]
    };
    
}