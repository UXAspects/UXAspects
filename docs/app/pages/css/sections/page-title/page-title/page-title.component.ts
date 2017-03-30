import { Component } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';

@Component({
    selector: 'uxd-css-page-title-page-title',
    templateUrl: './page-title.component.html'
})
@DocumentationSectionComponent('CssPageTitleComponent')
export class CssPageTitleComponent {

    private jsCode = require('./snippets/sample.js');

    private htmlCode = require('./snippets/sample.html');

}