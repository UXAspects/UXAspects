import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { ICodePenProvider } from '../../../../../interfaces/ICodePenProvider';
import { ICodePen } from '../../../../../interfaces/ICodePen';

@Component({
    selector: 'uxd-components-date-range-picker-ng1',
    templateUrl: './date-range-picker-ng1.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
@DocumentationSectionComponent('ComponentsDateRangePickerNg1Component')
export class ComponentsDateRangePickerNg1Component implements ICodePenProvider {

    private sampleHtml = require('./snippets/sample.html');
    private sampleJs = require('./snippets/sample.js');
    private sampleCss = require('./snippets/sample.css');

    public codepen: ICodePen = {
        html: this.sampleHtml,
        htmlAttributes: {
            'ng-controller': 'DateRangePickerCtrl as vm'
        },
        js: [this.sampleJs],
        css: [this.sampleCss]
    };

}