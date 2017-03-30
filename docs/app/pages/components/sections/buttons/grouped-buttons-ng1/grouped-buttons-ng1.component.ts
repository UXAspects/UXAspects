import { Component } from '@angular/core';
import { ICodePenProvider } from '../../../../../interfaces/ICodePenProvider';
import { ICodePen } from '../../../../../interfaces/ICodePen';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import './wrapper/grouped-buttons-wrapper.directive';

@Component({
    selector: 'uxd-components-grouped-buttons-ng1',
    templateUrl: './grouped-buttons-ng1.component.html'
})
@DocumentationSectionComponent('ComponentsGroupedButtonsNg1Component')
export class ComponentsGroupedButtonsNg1Component implements ICodePenProvider {
    private htmlCodeTop = require('./snippets/grouped-buttons-top.html');
    private htmlCodeBottom = require('./snippets/grouped-buttons-bottom.html');
    public codepen: ICodePen = {
        html: this.htmlCodeTop + '\n' + this.htmlCodeBottom,
        htmlAttributes: {
            'ng-controller': 'GroupedButtonsCtrl as vm'
        },
        js: [require('./snippets/grouped-buttons.controller.js')]
    };
}
