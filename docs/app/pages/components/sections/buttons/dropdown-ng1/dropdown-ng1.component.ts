import { Component, ViewEncapsulation } from '@angular/core';
import { ICodePenProvider } from '../../../../../interfaces/ICodePenProvider';
import { ICodePen } from '../../../../../interfaces/ICodePen';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import './wrapper/dropdown-wrapper.directive';

@Component({
    selector: 'uxd-dropdown-ng1',
    templateUrl: './dropdown-ng1.component.html',
    styleUrls: ['./dropdown-ng1.component.less'],
    encapsulation: ViewEncapsulation.None
})
@DocumentationSectionComponent('ComponentsDropdownNg1Component')
export class ComponentsDropdownNg1Component implements ICodePenProvider {
    private htmlCode = require('./snippets/dropdown.html');
    private htmlMenuCode = require('./snippets/dropdown-menu.html');
    private cssCode = require('./snippets/dropdown.css');
    private javascriptCode = require('./snippets/dropdown.js');
    public codepen: ICodePen = {
        html: this.htmlCode + '\n' + this.htmlMenuCode,
        htmlAttributes: {
            'ng-controller': 'DropdownCtrl as vm'
        },
        css: [this.cssCode],
        js: [this.javascriptCode]
    };
}
