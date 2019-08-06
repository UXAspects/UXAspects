import {ChangeDetectionStrategy, Component, Inject} from '@angular/core';
import {BaseDocumentationSection} from '../../../../../components/base-documentation-section/base-documentation-section';
import {DocumentationSectionComponent} from '../../../../../decorators/documentation-section-component';
import {IPlayground} from '../../../../../interfaces/IPlayground';
import {IPlaygroundProvider} from '../../../../../interfaces/IPlaygroundProvider';
import {
    DOCUMENTATION_TOKEN,
    DocumentationType
} from '../../../../../services/playground/tokens/documentation.token';

@Component({
    selector: 'uxd-components-icon',
    templateUrl: './icon.component.html',
    styleUrls: ['./icon.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

@DocumentationSectionComponent('ComponentsIconComponent')
export class ComponentsIconComponent extends BaseDocumentationSection implements IPlaygroundProvider {

    iconSetDocumentationRoute: string;

    playground: IPlayground = {
        files: {
            'app.component.html': this.snippets.raw.appHtml,
            'app.component.ts': this.snippets.raw.appTs,
            'app.component.less': this.snippets.raw.appCss
        },
        modules: [
            {
                imports: ['IconModule'],
                library: '@ux-aspects/ux-aspects'
            }
        ]
    };

    constructor(@Inject(DOCUMENTATION_TOKEN) private _documentationType: DocumentationType) {
        super(require.context('./snippets/', false, /(html|css|js|ts)$/));

        this.iconSetDocumentationRoute = _documentationType === DocumentationType.MicroFocus ? '/ui-components/styling#ux-icons' : '/css/icons';
    }

}