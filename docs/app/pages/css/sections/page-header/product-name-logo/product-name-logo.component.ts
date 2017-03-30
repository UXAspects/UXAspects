import { Component } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';

@Component({
    selector: 'uxd-css-page-header-product-name-logo',
    templateUrl: './product-name-logo.component.html'
})
@DocumentationSectionComponent('CssProductNameLogoComponent')
export class CssProductNameLogoComponent {
  
    private htmlCode = require('./snippets/sample.html');

}