import { Component } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { ICodePenProvider } from '../../../../../interfaces/ICodePenProvider';
import { ICodePen } from '../../../../../interfaces/ICodePen';

@Component({
    selector: 'uxd-components-focus-on-show-ng1',
    templateUrl: './focus-on-show-ng1.component.html'
})
@DocumentationSectionComponent('ComponentsFocusOnShowNg1Component')
export class ComponentsFocusOnShowNg1Component implements ICodePenProvider {
    
    private htmlCode = require('./snippets/sample.html');

    public codepen: ICodePen = {
        html: this.htmlCode
    };
    
}