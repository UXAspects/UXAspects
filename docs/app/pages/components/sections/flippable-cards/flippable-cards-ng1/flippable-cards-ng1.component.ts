import { Component } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { ICodePenProvider } from '../../../../../interfaces/ICodePenProvider';
import { ICodePen } from '../../../../../interfaces/ICodePen';

@Component({
    selector: 'uxd-components-flippable-cards-ng1',
    templateUrl: './flippable-cards-ng1.component.html'
})
@DocumentationSectionComponent('ComponentsFlippableCardsNg1Component')
export class ComponentsFlippableCardsNg1Component implements ICodePenProvider {
    
    private htmlCode = require('./snippets/app.html');
    private jsCode = require('./snippets/app.js');
    private cssCode = require('./snippets/app.css');

    public codepen: ICodePen = {
        html: this.htmlCode,
        htmlAttributes: {
            'ng-controller': 'FlippableCardCtrl as vm'
        },
        js: [this.jsCode],
        css: [this.cssCode]
    };

}