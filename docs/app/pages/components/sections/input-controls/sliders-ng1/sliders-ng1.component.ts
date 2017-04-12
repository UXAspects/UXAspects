import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { ICodePenProvider } from '../../../../../interfaces/ICodePenProvider';
import { ICodePen } from '../../../../../interfaces/ICodePen';

@Component({
    selector: 'uxd-components-sliders-ng1',
    templateUrl: './sliders-ng1.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
@DocumentationSectionComponent('ComponentsSlidersNg1Component')
export class ComponentsSlidersNg1Component implements ICodePenProvider {

    private codepenHtml = require('./snippets/codepen.html');
    private codepenJs = require('./snippets/codepen.js');
    private sample1Html = require('./snippets/sample1.html');
    private sample1Js = require('./snippets/sample1.js');
    private sample2Html = require('./snippets/sample2.html');
    private sample2Js = require('./snippets/sample2.js');
    private sample3Js = require('./snippets/sample3.js');

    public codepen: ICodePen = {
        html: this.codepenHtml,
        htmlAttributes: {
            'ng-controller': 'SlidersCtrl as vm'
        },
        js: [this.codepenJs]
    };

}