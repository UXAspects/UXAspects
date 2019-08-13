import { Component, ElementRef, HostListener, Inject, ViewEncapsulation } from '@angular/core';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { IPlayground } from '../../../../../interfaces/IPlayground';
import { IPlaygroundProvider } from '../../../../../interfaces/IPlaygroundProvider';
import { TypeaheadOptionEvent } from '@ux-aspects/ux-aspects';
import 'chance';
import { DOCUMENTATION_TOKEN, DocumentationType } from '../../../../../services/playground/tokens/documentation.token';

@Component({
    selector: 'uxd-components-typeahead',
    templateUrl: 'typeahead.component.html',
    styleUrls: ['./typeahead.component.less'],
    encapsulation: ViewEncapsulation.None
})
@DocumentationSectionComponent('ComponentsTypeaheadComponent')
export class ComponentsTypeaheadComponent<T> extends BaseDocumentationSection implements IPlaygroundProvider {

    tagDocumentationRoute: string;
    values: string[] = [];

    dropdownOpen: boolean = false;
    selectOnEnter: boolean = false;
    dropDirection: 'up' | 'down' = 'down';
    selectFirst: boolean = false;

    value: string = '';
    input: string = '';

    loadOptionsFn = this.loadOptions.bind(this);

    /** Load the options and filter the them */
    loadOptions(pageNum: number, pageSize: number, filter: string): string[] {
        return this.values.filter(tag => tag.toLowerCase().indexOf(filter.toLowerCase()) !== -1).slice(pageNum * pageSize, (pageNum + 1) * pageSize);
    }

    /** selected typeahead option and closing dropdown **/
    select(event: TypeaheadOptionEvent): void {
        if (event.option) {
            this.value = event.option;
            this.dropdownOpen = false;
        }
    }

    /** close dropdown when click outside of typeahead*/
    @HostListener('document:click', ['$event'])
    handleOutsideClick(event: Event): void {
        if (!this.eRef.nativeElement.contains(event.target)) {
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
            imports: ['TypeaheadModule', 'CheckboxModule', 'RadioButtonModule', 'NumberPickerModule', 'AccordionModule'],
            library: '@ux-aspects/ux-aspects'
        }]
    };

    constructor(private eRef: ElementRef,
                @Inject(DOCUMENTATION_TOKEN) private _documentationType: DocumentationType) {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));

        /* Adding values to typeahead list */
        for (let index = 0; index < 40; index++) {
            this.values.push(chance.name());
        }

        this.tagDocumentationRoute = _documentationType === DocumentationType.MicroFocus ? 'ui-components/input-controls' : 'components/input-controls';
    }
}