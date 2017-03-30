import { Component } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';

@Component({
    selector: 'uxd-css-page-header-condensed-header',
    templateUrl: './condensed-header.component.html'
})
@DocumentationSectionComponent('CssCondensedHeaderComponent')
export class CssCondensedHeaderComponent {

    private htmlCode = require('./snippets/sample.html');

}