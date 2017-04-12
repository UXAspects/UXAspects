import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { ICodePenProvider } from '../../../../../interfaces/ICodePenProvider';
import { ICodePen } from '../../../../../interfaces/ICodePen';

@Component({
    selector: 'uxd-components-select-ng1',
    templateUrl: './select-ng1.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
@DocumentationSectionComponent('ComponentsSelectNg1Component')
export class ComponentsSelectNg1Component implements ICodePenProvider {

    private sampleHtml = require('./snippets/sample.html');
    private sampleJs = require('./snippets/sample.js');
    private sampleFullJs = require('./snippets/sampleFull.js');

    public codepen: ICodePen = {
        html: this.sampleHtml,
        htmlAttributes: {
            'ng-controller': 'SelectDemoCtrl as vm'
        },
        js: [this.sampleFullJs]
    };

}