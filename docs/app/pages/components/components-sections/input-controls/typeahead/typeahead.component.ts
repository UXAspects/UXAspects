import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { IPlayground } from '../../../../../interfaces/IPlayground';
import { IPlaygroundProvider } from '../../../../../interfaces/IPlaygroundProvider';
import 'chance';
import { DOCUMENTATION_TOKEN, DocumentationType } from '../../../../../services/playground/tokens/documentation.token';
import { TypeaheadOptionEvent, TypeaheadKeyService } from '@ux-aspects/ux-aspects';

@Component({
    selector: 'uxd-components-typeahead',
    templateUrl: 'typeahead.component.html',
    styleUrls: ['./typeahead.component.less'],
    encapsulation: ViewEncapsulation.None
})
@DocumentationSectionComponent('ComponentsTypeaheadComponent')
export class ComponentsTypeaheadComponent<T> extends BaseDocumentationSection implements IPlaygroundProvider {

    tagDocumentationRoute: string;
    values: ReadonlyArray<string> = [];

    dropdownOpen: boolean = false;
    selectOnEnter: boolean = false;
    dropDirection: 'up' | 'down' = 'down';
    selectFirst: boolean = false;

    value: string = '';
    input: string = '';

    loadOptionsFn = this.loadOptions.bind(this);

    /** Load the options and filter the them */
    loadOptions(pageNum: number, pageSize: number, filter: string): ReadonlyArray<string> {
        return this.values.filter(tag => tag.toLowerCase().indexOf(filter.toLowerCase()) !== -1).slice(pageNum * pageSize, (pageNum + 1) * pageSize);
    }

    /** selected typeahead option and closing dropdown **/
    select(event: TypeaheadOptionEvent): void {
        if (event.option) {
            this.value = event.option;
            this.dropdownOpen = false;
        }
    }

    playground: IPlayground = {
        files: {
            'app.component.html': this.snippets.raw.appHtml,
            'app.component.css': this.snippets.raw.appCss,
            'app.component.ts': this.snippets.raw.appTs
        },
        modules: [{
            imports: ['TypeaheadModule', 'CheckboxModule', 'RadioButtonModule', 'NumberPickerModule', 'AccordionModule', 'ClickOutsideModule'],
            library: '@ux-aspects/ux-aspects'
        }]
    };

    constructor(@Inject(DOCUMENTATION_TOKEN)
                private _documentationType: DocumentationType,
                public typeaheadKeyService: TypeaheadKeyService) {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));

        /* Adding values to typeahead list */
        for (let index = 0; index < 40; index++) {
            this.values = [...this.values, chance.name()];
        }

        this.tagDocumentationRoute = _documentationType === DocumentationType.MicroFocus ? 'ui-components/input-controls' : 'components/input-controls';
    }
}