import { Component } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { ICodePenProvider } from './../../../../../interfaces/ICodePenProvider';
import { ICodePen } from './../../../../../interfaces/ICodePen';

@Component({
    selector: 'uxd-css-progress-mini-activity-indicator',
    templateUrl: './mini-activity-indicator.component.html'
})
@DocumentationSectionComponent('CssMiniActivityIndicatorComponent')
export class CssMiniActivityIndicatorComponent implements ICodePenProvider {

    private htmlCode1 = require('./snippets/sample1.html');

    private htmlCode2 = require('./snippets/sample2.html');

    private htmlCode3 = require('./snippets/sample3.html');

    private htmlCode4 = require('./snippets/sample4.html');

    public codepen: ICodePen = {
        html: `${this.htmlCode1} ${this.htmlCode2} ${this.htmlCode3} ${this.htmlCode4}`
    };

}