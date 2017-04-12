import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { ICodePenProvider } from '../../../../../interfaces/ICodePenProvider';
import { ICodePen } from '../../../../../interfaces/ICodePen';

@Component({
    selector: 'uxd-custom-dropdown-ng1',
    templateUrl: './custom-dropdown-ng1.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
@DocumentationSectionComponent('ComponentsCustomDropdownNg1Component')
export class ComponentsCustomDropdownNg1Component implements ICodePenProvider {

    private sampleHtml = require('./snippets/sample.html');
    private templateHtml = require('./snippets/template.html');
    private sampleCss = require('./snippets/sample.css');
    private sampleJs = require('./snippets/sample.js');

    public codepen: ICodePen = {
        html: this.sampleHtml,
        htmlTemplates: [{
            id: 'template.html',
            content: this.templateHtml
        }],
        css: [this.sampleCss],
        js: [this.sampleJs]
    };

}