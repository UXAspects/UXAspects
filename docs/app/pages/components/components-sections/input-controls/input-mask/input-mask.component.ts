import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { IPlayground } from '../../../../../interfaces/IPlayground';
import { IPlaygroundProvider } from '../../../../../interfaces/IPlaygroundProvider';

@Component({
    selector: 'uxd-components-input-mask',
    templateUrl: './input-mask.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
@DocumentationSectionComponent('ComponentsInputMaskComponent')
export class ComponentsInputMaskComponent
    extends BaseDocumentationSection
    implements IPlaygroundProvider
{
    playground: IPlayground = {
        files: {
            'app.component.html': this.snippets.raw.appHtml,
            'app.component.ts': this.snippets.raw.appTs,
        },
        modules: [
            {
                imports: ['NgxMaskDirective', 'NgxMaskPipe'],
                providers: ['provideNgxMask()'],
                library: 'ngx-mask'
            }
        ],
    };

    constructor() {
        super(
            import.meta.webpackContext('./snippets/', {
                recursive: false,
                regExp: /\.(html|css|js|ts)$/,
            })
        );
    }
}
