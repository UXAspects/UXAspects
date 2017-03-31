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
    private jsCode = require('./snippets/sample.js');
    private cssCode = require('./snippets/sample.css');

    public codepen: ICodePen = {
        html: this.htmlCode,
        htmlAttributes: {
            'ng-controller': 'CustomResponsiveTableCtrl as vm'
        },
        js: [this.jsCode],
        css: [this.cssCode]
    };
    
}