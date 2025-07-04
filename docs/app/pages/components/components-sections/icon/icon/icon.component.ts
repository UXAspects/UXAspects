import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { IPlayground } from '../../../../../interfaces/IPlayground';
import { IPlaygroundProvider } from '../../../../../interfaces/IPlaygroundProvider';
import { DocumentationType, DOCUMENTATION_TOKEN } from '../../../../../tokens/documentation.token';

@Component({
    selector: 'uxd-components-icon',
    templateUrl: './icon.component.html',
    styleUrls: ['./icon.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
@DocumentationSectionComponent('ComponentsIconComponent')
export class ComponentsIconComponent
    extends BaseDocumentationSection
    implements IPlaygroundProvider
{
    iconSetDocumentationRoute: string;

    playground: IPlayground = {
        files: {
            'app.component.html': this.snippets.raw.appHtml,
            'app.component.ts': this.snippets.raw.appTs,
            'app.component.css': this.snippets.raw.appCss,
        },
    };

    constructor(@Inject(DOCUMENTATION_TOKEN) private readonly _documentationType: DocumentationType) {
        super(
            import.meta.webpackContext('./snippets/', {
                recursive: false,
                regExp: /\.(html|css|js|ts)$/,
            })
        );

        this.iconSetDocumentationRoute =
            _documentationType === DocumentationType.MicroFocus
                ? '/ui-components/styling'
                : '/css/icons';
    }
}
