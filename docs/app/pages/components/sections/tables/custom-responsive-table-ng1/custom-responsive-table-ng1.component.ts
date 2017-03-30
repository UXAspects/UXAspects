import { Component } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { ICodePenProvider } from './../../../../../interfaces/ICodePenProvider';
import { ICodePen } from './../../../../../interfaces/ICodePen';

@Component({
    selector: 'uxd-components-custom-reposonsive-table',
    templateUrl: './custom-responsive-table-ng1.component.html'
})
@DocumentationSectionComponent('ComponentsCustomResponsiveTableNg1Component')
export class ComponentsCustomResponsiveTableNg1Component implements ICodePenProvider {

    private htmlCode = require('./snippets/sample.html');

    private codepenSnippet = require('./codepen/codepen.html');

    public codepen: ICodePen = {
        html: this.codepenSnippet
    };
    
}