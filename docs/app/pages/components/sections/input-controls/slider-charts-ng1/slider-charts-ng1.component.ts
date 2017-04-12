import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { ICodePenProvider } from '../../../../../interfaces/ICodePenProvider';
import { ICodePen } from '../../../../../interfaces/ICodePen';

@Component({
    selector: 'uxd-components-slider-charts-ng1',
    templateUrl: './slider-charts-ng1.component.html'
})
@DocumentationSectionComponent('ComponentsSliderChartsNg1Component')
export class ComponentsSliderChartsNg1Component implements ICodePenProvider {

    private sampleHtml = require('./snippets/sample.html');
    private codepenHtml = require('./snippets/codepen.html');
    private codepenJs = require('./snippets/codepen.js');

    public codepen: ICodePen = {
        html: this.codepenHtml,
        htmlAttributes: {
            'ng-controller': 'SlidersChartsCtrl as vm'
        },
        js: [this.codepenJs]
    };

}