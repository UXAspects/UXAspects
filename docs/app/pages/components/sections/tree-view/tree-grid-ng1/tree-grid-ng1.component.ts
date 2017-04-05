import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { ICodePenProvider } from '../../../../../interfaces/ICodePenProvider';
import { ICodePen } from '../../../../../interfaces/ICodePen';

@Component({
    selector: 'uxd-components-tree-grid-ng1',
    templateUrl: './tree-grid-ng1.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
@DocumentationSectionComponent('ComponentsTreeGridNg1Component')
export class ComponentsTreeGridNg1Component implements ICodePenProvider {

    private sampleHtml = require('./snippets/sample.html');
    private sampleJs = require('./snippets/sample.js');
    private jsCode1 = require('./snippets/code1.js');
    private jsCode2 = require('./snippets/code2.js');
    private jsCode3 = require('./snippets/code3.js');
    private jsCode4 = require('./snippets/code4.js');
    private actionsJs = require('./snippets/actions.js');
    private actionsHtml = require('./wrapper/actions.html');
    private displayPanel = require('./wrapper/displayPanel.html');
    private displayPanelFooter = require('./wrapper/displayPanelFooter.html');

    public codepen: ICodePen = {
        html: this.sampleHtml,
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
        js: [this.sampleJs, this.actionsJs]
    };
    
}