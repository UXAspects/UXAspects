import { Component, Inject } from '@angular/core';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { IPlayground } from '../../../../../interfaces/IPlayground';
import { IPlaygroundProvider } from '../../../../../interfaces/IPlaygroundProvider';
import 'chance';
import { DOCUMENTATION_TOKEN, DocumentationType } from '../../../../../services/playground/tokens/documentation.token';
import { TypeaheadKeyService } from '@ux-aspects/ux-aspects';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Component({
    selector: 'uxd-components-typeahead',
    templateUrl: 'typeahead.component.html',
    styleUrls: ['./typeahead.component.less']
})
@DocumentationSectionComponent('ComponentsTypeaheadComponent')
export class ComponentsTypeaheadComponent extends BaseDocumentationSection implements IPlaygroundProvider {

    tagDocumentationRoute: string;
    values: ReadonlyArray<string> = [];

    dropdownOpen: boolean = false;
    selectOnEnter: boolean = true;
    dropDirection: 'auto' | 'up' | 'down' = 'down';
    selectFirst: boolean = true;
    recentOptions: ReadonlyArray<string>;
    recentOptionsMaxCount: number = 5;

    input: string = '';

    loadOptionsFn = this.loadOptions.bind(this);


    /** Load the options and filter the them */
    loadOptions(pageNum: number, pageSize: number, filter: string): Promise<ReadonlyArray<string>> {

        // get the values for the current page based on the filter text provided
        const values = this.values.filter(tag => tag.toLowerCase().indexOf(filter.toLowerCase()) !== -1)
            .slice(pageNum * pageSize, (pageNum + 1) * pageSize);

        // return the values after a delay to simulate server response time
        return of(values).pipe(delay(1000)).toPromise();
    }

    playground: IPlayground = {
        files: {
            'app.component.html': this.snippets.raw.appHtml,
            'app.component.css': this.snippets.raw.appCss,
            'app.component.ts': this.snippets.raw.appTs
        },
        modules: [{
            imports: ['TypeaheadModule', 'CheckboxModule', 'RadioButtonModule', 'NumberPickerModule', 'AccordionModule'],
            library: '@ux-aspects/ux-aspects'
        }]
    };

    constructor(@Inject(DOCUMENTATION_TOKEN)
                private _documentationType: DocumentationType,
                public typeaheadKeyService: TypeaheadKeyService<string>) {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));

        /* Adding values to typeahead list */
        for (let index = 0; index < 200; index++) {
            this.values = [...this.values, chance.name()];
        }

        this.tagDocumentationRoute = _documentationType === DocumentationType.MicroFocus ? 'ui-components/input-controls' : 'components/input-controls';
    }
}