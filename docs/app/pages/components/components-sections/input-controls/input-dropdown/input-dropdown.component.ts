import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { IPlayground } from '../../../../../interfaces/IPlayground';
import { IPlaygroundProvider } from '../../../../../interfaces/IPlaygroundProvider';


@Pipe({name: 'highlightSearch'})
export class HighlightSearch implements PipeTransform {
    transform(text: string, filter: string): string {
        const highlightIndex = text.toLowerCase().indexOf(filter.toLowerCase());
        return (highlightIndex < 0) ?
               text :
               text.substr(0, highlightIndex) +
                 '<b>' + text.substr(highlightIndex, filter.length) + '</b>' +
                 text.substr(highlightIndex + filter.length);
    }
}


@Component({
    selector: 'uxd-components-input-dropdown',
    templateUrl: './input-dropdown.component.html',
    styleUrls: ['./input-dropdown.component.less']
})
@DocumentationSectionComponent('ComponentsInputDropdownComponent')
export class ComponentsInputDropdownComponent extends BaseDocumentationSection implements IPlaygroundProvider, OnInit {

    selected: RadioOption;
    optionList: ReadonlyArray<RadioOption> = [
        { name: 'One' }, { name: 'Two' }, { name: 'Three' }, { name: 'Four' }
    ];
    filteredOptionList: ReadonlyArray<RadioOption> = this.optionList;
    filter: string = '';
    allowNull: boolean = false;
    componentMaxHeight: number = 400;
    placeholder: string = 'Type to search...';

    playground: IPlayground = {
        files: {
            'app.component.html': this.snippets.raw.appHtml,
            'app.component.ts': this.snippets.raw.appTs,
            'app.component.css': this.snippets.raw.appCss
        },
        modules: [
            {
                imports: ['HighlightSearch'],
                library: './app.component',
                declaration: true
            }, 
            {
                imports: ['AccordionModule', 'CheckboxModule', 'NumberPickerModule', 'RadioButtonModule', 'InputDropdownModule'],
                library: '@ux-aspects/ux-aspects'
            }
        ]
    };

    constructor() {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));
    }

    ngOnInit(): void {
        this.filterList();
    }

    private index(text: string): number {
        return text.toLowerCase().indexOf(this.filter.toLowerCase());
    }

    isHidden(name: string): boolean {
        return this.filter && (this.filter.length > 0) && (this.index(name) === -1);
    }
    
    selectButton(event: KeyboardEvent, option: RadioOption): void {
        this.selected = option;
        event.preventDefault();
    }

    setFilter($event: string) {
        this.filter = $event;
        this.filterList();
    }

    private filterList() {
        this.filteredOptionList =
          this.filter && (this.filter.length > 0) ?
          this.optionList.filter(option => (this.index(option.name) > -1)) :
          this.optionList;
    }
}

export interface RadioOption {
    name: string;
}