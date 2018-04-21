import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { IPlunk } from '../../../../../interfaces/IPlunk';
import { IPlunkProvider } from '../../../../../interfaces/IPlunkProvider';

@Component({
    selector: 'uxd-components-sorting',
    templateUrl: './sorting.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
@DocumentationSectionComponent('ComponentsSortingComponent')
export class ComponentsSortingComponent extends BaseDocumentationSection implements IPlunkProvider {
    
    options: string[] = [
        'Date Modified',
        'Name',
        'Author'
    ];

    selected: string = this.options[0];
    descending: boolean = true;

    plunk: IPlunk = {
        files: {
            'app.component.html': this.snippets.raw.appHtml,
            'app.component.ts': this.snippets.raw.appTs
        },
        modules: [
            {
                imports: ['BsDropdownModule'],
                library: 'ngx-bootstrap',
                forRoot: true
            }
        ]
    };

    constructor() {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));
    }

    sort(option: string): void {
        // ... perform sorting here ...
        this.selected = option;
    }

}