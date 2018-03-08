import { Component, ChangeDetectionStrategy } from '@angular/core';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { IPlunkProvider } from '../../../../../interfaces/IPlunkProvider';
import { IPlunk } from '../../../../../interfaces/IPlunk';

@Component({
    selector: 'uxd-splitter',
    templateUrl: './splitter.component.html',
    styleUrls: ['./splitter.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
@DocumentationSectionComponent('ComponentsSplitterComponent')
export class ComponentsSplitterComponent extends BaseDocumentationSection implements IPlunkProvider {

    plunk: IPlunk = {
        files: {
            'app.component.html': this.snippets.raw.appHtml,
            'app.component.ts': this.snippets.raw.appTs,
            'app.component.css': this.snippets.raw.appCss,
        },
        modules: [
            {
                imports: ['AngularSplitModule'],
                library: 'angular-split'
            }
        ]
    };

    constructor() {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));
    }
}
