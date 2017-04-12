import { Component, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { ICodePenProvider } from '../../../../../interfaces/ICodePenProvider';
import { ICodePen } from '../../../../../interfaces/ICodePen';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';

@Component({
    selector: 'uxd-side-inset-panel-ng1',
    templateUrl: './side-inset-panel-ng1.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
@DocumentationSectionComponent('ComponentsSideInsetPanelNg1Component')
export class ComponentsSideInsetPanelNg1Component implements ICodePenProvider {

    private layoutHtml = require('./snippets/layout.html');
    private stylesCss = require('./snippets/styles.css');
    private layoutExampleHtml = require('./snippets/layout.example.html');
    private panelExampleHtml = require('./snippets/panel.example.html');

    public codepen: ICodePen = {
        html: this.layoutHtml,
        htmlAttributes: {
            'id': 'ux-codepen-container-ns'
        },
        css: [this.stylesCss]
    };
}
