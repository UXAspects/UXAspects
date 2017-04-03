import { Component, ViewEncapsulation } from '@angular/core';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { ICodePenProvider } from '../../../../../interfaces/ICodePenProvider';
import { ICodePen } from '../../../../../interfaces/ICodePen';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import './wrapper/keyboard-service-wrapper.directive';

@Component({
    selector: 'uxd-keyboard-service-ng1',
    templateUrl: './keyboard-service-ng1.component.html'
})
@DocumentationSectionComponent('ComponentsKeyboardServiceNg1Component')
export class ComponentsKeyboardServiceNg1Component extends BaseDocumentationSection implements ICodePenProvider {
    public codepen: ICodePen = {
        html: this.snippets.raw.layoutHtml,
        htmlAttributes: {
            'ng-controller': 'KeyboardServiceDemoCtrl as vm'
        },
        js: [this.snippets.raw.controllerJs]
    };

    constructor() {
        super(
            require.context('!!prismjs-loader?lang=html!./snippets/', false, /\.html$/),
            require.context('!!prismjs-loader?lang=css!./snippets/', false, /\.css$/),
            require.context('!!prismjs-loader?lang=javascript!./snippets/', false, /\.js$/),
            require.context('!!prismjs-loader?lang=typescript!./snippets/', false, /\.ts$/),
            require.context('./snippets/', false, /\.(html|css|js|ts)$/)
        );
    }
}
