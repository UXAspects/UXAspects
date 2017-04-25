import { Component } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { ICodePenProvider } from './../../../../../interfaces/ICodePenProvider';
import { ICodePen } from './../../../../../interfaces/ICodePen';


@Component({
    selector: 'uxd-components-side-navigation-app-navigator',
    templateUrl: './app-navigator.component.html'
})
@DocumentationSectionComponent('ComponentsAppNavigatorComponent')
export class ComponentsAppNavigatorComponent implements ICodePenProvider {

    private htmlCode = require('./snippets/sample.html');

    private popoverCode = require('./snippets/popover.html');

    private codepenSnippet = require('./codepen/codepen.html');

    private cssCode = require('./snippets/snippet.css');

    public codepen: ICodePen = {
        html: this.codepenSnippet,
        htmlTemplates: [{
            id: 'app_navigator_popover.tmpl.html',
            content: this.popoverCode,
        }],
        css: [this.cssCode]
    };

}