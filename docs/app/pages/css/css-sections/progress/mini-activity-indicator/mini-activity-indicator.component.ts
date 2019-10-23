import { Component } from '@angular/core';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { IPlayground } from '../../../../../interfaces/IPlayground';
import { IPlaygroundProvider } from '../../../../../interfaces/IPlaygroundProvider';
import { playgroundAdapter } from '../../../../../services/playground/adapters/legacy-playground-adapter';

@Component({
    selector: 'uxd-css-progress-mini-activity-indicator',
    templateUrl: './mini-activity-indicator.component.html',
    styleUrls: ['./mini-activity-indicator.component.less']
})
@DocumentationSectionComponent('CssMiniActivityIndicatorComponent')
export class CssMiniActivityIndicatorComponent extends BaseDocumentationSection implements IPlaygroundProvider {

    playground: IPlayground = playgroundAdapter({
        html: this.snippets.raw.sample1Html
    });

    constructor() {
        super(require.context('./snippets/', false, /(html|css|js|ts)$/));
    }

}