import { Component } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { ICodePenProvider } from './../../../../../interfaces/ICodePenProvider';
import { ICodePen } from './../../../../../interfaces/ICodePen';

@Component({
    selector: 'uxd-css-buttons-hyperlinks',
    templateUrl: './hyperlinks.component.html'
})
@DocumentationSectionComponent('CssHyperlinksComponent')
export class CssHyperlinksComponent implements ICodePenProvider {

    private singleCode = require('./snippets/singleSample.html'); 

    private listCode = require('./snippets/listSample.html');

    private codepenSnippet = require('./codepen/codepen.html');

    public codepen: ICodePen = {
        html: this.codepenSnippet
    };

}