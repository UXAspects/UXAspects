import { Component } from '@angular/core';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { IPlayground } from '../../../../../interfaces/IPlayground';
import { IPlaygroundProvider } from '../../../../../interfaces/IPlaygroundProvider';
import { playgroundAdapter } from '../../../../../services/playground/adapters/legacy-playground-adapter';

@Component({
    selector: 'uxd-css-responsive-design-stacked-to-horizontal',
    templateUrl: './stacked-to-horizontal.component.html',
})
@DocumentationSectionComponent('CssStackedToHorizontalComponent')
export class CssStackedToHorizontalComponent
    extends BaseDocumentationSection
    implements IPlaygroundProvider
{
    playground: IPlayground = playgroundAdapter({
        html: this.snippets.raw.sampleHtml,
    });

    constructor() {
        super(
            import.meta.webpackContext('./snippets/', {
                recursive: false,
                regExp: /\.(html|css|js|ts)$/,
            })
        );
    }
}
