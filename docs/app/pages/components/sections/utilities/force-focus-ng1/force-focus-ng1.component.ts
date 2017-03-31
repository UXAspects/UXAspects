import { Component } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { ICodePenProvider } from '../../../../../interfaces/ICodePenProvider';
import { ICodePen } from '../../../../../interfaces/ICodePen';

@Component({
    selector: 'uxd-components-force-focus-ng1',
    templateUrl: './force-focus-ng1.component.html'
})
@DocumentationSectionComponent('ComponentsForceFocusNg1Component')
export class ComponentsForceFocusNg1Component {

    private htmlCode = require('./snippets/sample.html');
    
}