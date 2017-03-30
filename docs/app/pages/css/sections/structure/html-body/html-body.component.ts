import { Component } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';

@Component({
    selector: 'uxd-css-structure-html-body',
    templateUrl: './html-body.component.html'
})
@DocumentationSectionComponent('CssHtmlBodyComponent')
export class CssHtmlBodyComponent {

    private htmlCode = require('./snippets/sample.html');

}