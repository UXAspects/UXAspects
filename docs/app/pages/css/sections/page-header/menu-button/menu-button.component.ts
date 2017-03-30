import { Component } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';

@Component({
    selector: 'uxd-css-page-header-menu-button',
    templateUrl: './menu-button.component.html'
})
@DocumentationSectionComponent('CssMenuButtonComponent')
export class CssMenuButtonComponent {

    private htmlCode = require('./snippets/sample.html');

}