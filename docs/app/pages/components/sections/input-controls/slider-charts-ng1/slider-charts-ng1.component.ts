import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { ICodePenProvider } from '../../../../../interfaces/ICodePenProvider';
import { ICodePen } from '../../../../../interfaces/ICodePen';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';

@Component({
    selector: 'uxd-components-slider-charts-ng1',
    templateUrl: './slider-charts-ng1.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
@DocumentationSectionComponent('ComponentsSliderChartsNg1Component')
export class ComponentsSliderChartsNg1Component extends BaseDocumentationSection implements ICodePenProvider {

    constructor() {
        super(
            require.context('!!prismjs-loader?lang=html!./snippets/', false, /\.html$/),
            require.context('!!prismjs-loader?lang=css!./snippets/', false, /\.css$/),
            require.context('!!prismjs-loader?lang=javascript!./snippets/', false, /\.js$/),
            require.context('!!prismjs-loader?lang=typescript!./snippets/', false, /\.ts$/),
            require.context('./snippets/', false, /\.(html|css|js|ts)$/)
        );
    }

    public codepen: ICodePen = {
        html: this.snippets.raw.codepenHtml,
        htmlAttributes: {
            'ng-controller': 'SlidersChartsCtrl as vm'
        },
        js: [this.snippets.raw.codepenJs]
    };

}