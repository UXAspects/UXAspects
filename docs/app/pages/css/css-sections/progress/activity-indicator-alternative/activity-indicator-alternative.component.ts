import { Component } from '@angular/core';
 
import progressGif from '../../../../../../../src/img/progress.gif';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { IPlayground } from '../../../../../interfaces/IPlayground';
import { IPlaygroundProvider } from '../../../../../interfaces/IPlaygroundProvider';
import { playgroundAdapter } from '../../../../../services/playground/adapters/legacy-playground-adapter';

@Component({
    selector: 'uxd-css-progress-activity-indicator-alternative',
    templateUrl: './activity-indicator-alternative.component.html',
    standalone: false
})
@DocumentationSectionComponent('CssActivityIndicatorAlternativeComponent')
export class CssActivityIndicatorAlternativeComponent
    extends BaseDocumentationSection
    implements IPlaygroundProvider
{
    playground: IPlayground = playgroundAdapter({
        html: this.snippets.raw.sampleHtml,
    });

    progressGif = progressGif;

    constructor() {
        super(
            import.meta.webpackContext('./snippets/', {
                recursive: false,
                regExp: /\.(html|css|js|ts)$/,
            })
        );
    }
}
