import { Component } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';

@Component({
    selector: 'uxd-components-layout-switching',
    templateUrl: './layout-switching-ng1.component.html'
})
@DocumentationSectionComponent('ComponentsLayoutSwitchingNg1Component')
export class ComponentsLayoutSwitchingNg1Component {
    
    private htmlCode = require('./snippets/sample.html');
}