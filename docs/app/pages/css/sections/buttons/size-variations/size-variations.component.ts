import { Component } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { ICodePenProvider } from './../../../../../interfaces/ICodePenProvider';
import { ICodePen } from './../../../../../interfaces/ICodePen';

@Component({
    selector: 'uxd-css-buttons-size-variation',
    templateUrl: './size-variations.component.html'
})
@DocumentationSectionComponent('CssButtonsSizeVariationsComponent')
export class CssButtonsSizeVariationsComponent implements ICodePenProvider {

    private textCode = require('./snippets/textSample.html');

    private textIconCode = require('./snippets/textIconSample.html');

    private iconOnlyCode = require('./snippets/iconOnly.html');

    private codepenSnippet = require('./codepen/codepen.html');

    public codepen: ICodePen = {
        html: this.codepenSnippet
    };
}