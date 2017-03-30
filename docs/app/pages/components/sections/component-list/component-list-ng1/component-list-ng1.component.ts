import { Component, ViewEncapsulation } from '@angular/core';
import { ICodePenProvider } from '../../../../../interfaces/ICodePenProvider';
import { ICodePen } from '../../../../../interfaces/ICodePen';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import './wrapper/component-list-wrapper.directive';

@Component({
    selector: 'uxd-component-list-ng1',
    templateUrl: './component-list-ng1.component.html'
})
@DocumentationSectionComponent('ComponentsComponentListNg1Component')
export class ComponentsComponentListNg1Component implements ICodePenProvider {
    private htmlCode = require('./snippets/component-list.html');
    private javascriptCode = require('./snippets/component-list.js');
    public codepen: ICodePen = {
        html: this.htmlCode,
        htmlAttributes: {
            'ng-controller': 'ComponentListDemoCtrl as vm'
        },
        js: [this.javascriptCode]
    };
}
