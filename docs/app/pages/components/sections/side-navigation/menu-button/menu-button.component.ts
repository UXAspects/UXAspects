import { Component } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';

@Component({
    selector: 'uxd-components-side-navigation-menu-button',
    templateUrl: './menu-button.component.html'
})
@DocumentationSectionComponent('ComponentsMenuButtonComponent')
export class ComponentsMenuButtonComponent {

    private htmlCode = require('./snippets/sample.html');

}