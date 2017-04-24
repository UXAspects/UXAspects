import { Component } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { ICodePenProvider } from './../../../../../interfaces/ICodePenProvider';
import { ICodePen } from './../../../../../interfaces/ICodePen';


@Component({
    selector: 'uxd-css-side-navigation-navigation-menu-service-ng1',
    templateUrl: './navigation-menu-service-ng1.component.html'
})
@DocumentationSectionComponent('CssNavigationMenuServiceNg1Component')
export class CssNavigationMenuServiceNg1Component implements ICodePenProvider {

    private controllerJs = require('./snippets/controller.js');

    public codepen: ICodePen = {
        html: require('./snippets/layout.codepen.html'),
        css: [require('./snippets/styles.codepen.css')],
        js: [this.controllerJs]
    };

}