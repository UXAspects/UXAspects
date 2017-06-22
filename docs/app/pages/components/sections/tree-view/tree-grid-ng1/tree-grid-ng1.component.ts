import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { ICodePenProvider } from '../../../../../interfaces/ICodePenProvider';
import { ICodePen } from '../../../../../interfaces/ICodePen';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';

@Component({
    selector: 'uxd-components-tree-grid-ng1',
    templateUrl: './tree-grid-ng1.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
@DocumentationSectionComponent('ComponentsTreeGridNg1Component')
export class ComponentsTreeGridNg1Component extends BaseDocumentationSection implements ICodePenProvider {

    private actionsHtml = require('./wrapper/actions.html');
    private displayPanel = require('./wrapper/displayPanel.html');
    private displayPanelFooter = require('./wrapper/displayPanelFooter.html');

    public codepen: ICodePen = {
        html: this.snippets.raw.sampleHtml,
        htmlAttributes: {
            'ng-controller': 'TreeGridCtrl as vm'
        },
        htmlTemplates: [{
            id: 'actions.html',
            content: this.actionsHtml
        }, {
            id: 'displayPanel.html',
            content: this.displayPanel
        }, {
            id: 'displayPanelFooter.html',
            content: this.displayPanelFooter
        }],
        js: [this.snippets.raw.sampleJs, this.snippets.raw.actionsJs]
    };

    constructor() {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));
    }
    
}