import { Component } from '@angular/core';
import { ICodePenProvider } from '../../../../../interfaces/ICodePenProvider';
import { ICodePen } from '../../../../../interfaces/ICodePen';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import './wrapper/toggle-buttons-wrapper.directive';

@Component({
    selector: 'uxd-components-toggle-buttons-ng1',
    templateUrl: './toggle-buttons-ng1.component.html'
})
@DocumentationSectionComponent('ComponentsToggleButtonsNg1Component')
export class ComponentsToggleButtonsNg1Component implements ICodePenProvider {
    public htmlCodeTop = require('./snippets/toggle-buttons-top.html');
    public htmlCodeBottom = require('./snippets/toggle-buttons-bottom.html');
    public codepen = {
        html: this.htmlCodeTop + '\n' + this.htmlCodeBottom
    };
}
