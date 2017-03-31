import { Component } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { ICodePenProvider } from '../../../../../interfaces/ICodePenProvider';
import { ICodePen } from '../../../../../interfaces/ICodePen';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';

@Component({
    selector: 'uxd-components-detail-row-responsive',
    templateUrl: './detail-row-responsive-ng1.component.html'
})
@DocumentationSectionComponent('ComponentsDetailRowResponsiveNg1Component')
export class ComponentsDetailRowResponsiveNg1Component extends BaseDocumentationSection implements ICodePenProvider {

    public htmlCode = this.snippets.compiled.layoutHtml;
    public jsCode = this.snippets.compiled.controllerJs;
    public cssCode = this.snippets.compiled.stylesCss;

    public codepen: ICodePen = {
        html: this.snippets.raw.codepenHtml,
        htmlAttributes: {
            'ng-controller': 'DetailRowResponsiveTableCtrl as vm'
        },
        js: [this.snippets.raw.codepenJs],
        css: [this.snippets.raw.stylesCss]
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