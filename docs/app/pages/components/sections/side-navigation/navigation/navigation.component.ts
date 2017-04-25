import { Component } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { ICodePenProvider } from './../../../../../interfaces/ICodePenProvider';
import { ICodePen } from './../../../../../interfaces/ICodePen';


@Component({
    selector: 'uxd-components-side-navigation-navigation',
    templateUrl: './navigation.component.html'
})
@DocumentationSectionComponent('ComponentsNavigationComponent')
export class ComponentsNavigationComponent implements ICodePenProvider {

    private htmlCode = require('./snippets/sample.html');

    private jsCode = require('./snippets/sample.js');

    private noteCode = require('./snippets/ng-class.html');

    public codepen: ICodePen = {
        html: this.htmlCode,
        js: [this.jsCode]
    };

}