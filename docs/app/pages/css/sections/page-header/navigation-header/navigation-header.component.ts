import { Component } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';

@Component({
    selector: 'uxd-css-page-header-navigation-header',
    templateUrl: './navigation-header.component.html'
})
@DocumentationSectionComponent('CssNavigationHeaderComponent')
export class CssNavigationHeaderComponent {

    private htmlCode = require('./snippets/sample.html');

}