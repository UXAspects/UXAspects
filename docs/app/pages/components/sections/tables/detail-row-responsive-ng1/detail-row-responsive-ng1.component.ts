import { Component } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { ICodePenProvider } from '../../../../../interfaces/ICodePenProvider';
import { ICodePen } from '../../../../../interfaces/ICodePen';

@Component({
    selector: 'uxd-components-detail-row-responsive',
    templateUrl: './detail-row-responsive-ng1.component.html'
})
@DocumentationSectionComponent('ComponentsDetailRowResponsiveNg1Component')
export class ComponentsDetailRowResponsiveNg1Component implements ICodePenProvider {

    public htmlCode = require('./snippets/layout.html');
    public jsCode = require('./snippets/controller.js');
    public cssCode = require('./snippets/styles.css');

    public codepen: ICodePen = {
        html: require('./snippets/codepen.html'),
        htmlAttributes: {
            'ng-controller': 'DetailRowResponsiveTableCtrl as vm'
        },
        js: [require('./snippets/codepen.js')],
        css: [this.cssCode]
    };
}