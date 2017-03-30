import { Component } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { ICodePenProvider } from '../../../../../interfaces/ICodePenProvider';
import { ICodePen } from '../../../../../interfaces/ICodePen';

@Component({
    selector: 'uxd-components-facet-line-chart-ng1',
    templateUrl: './facet-line-chart-ng1.component.html'
})
@DocumentationSectionComponent('ComponentsFacetLineChartNg1Component')
export class ComponentsFacetLineChartNg1Component implements ICodePenProvider {

    private htmlCode = require('./snippets/app.html');
    private jsCode = require('./snippets/app.js');
    private cssCode = require('./snippets/app.css');

    public codepen: ICodePen = {
        html: this.htmlCode,
        js: [this.jsCode],
        css: [this.cssCode]
    };

}