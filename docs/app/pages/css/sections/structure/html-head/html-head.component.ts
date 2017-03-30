import { Component } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';

@Component({
    selector: 'uxd-css-structure-html-head',
    templateUrl: './html-head.component.html'
})
@DocumentationSectionComponent('CssHtmlHeadComponent')
export class CssHtmlHeadComponent {

    private htmlCode = require('./snippets/sample.html'); 

}