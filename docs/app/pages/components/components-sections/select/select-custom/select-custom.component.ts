import { Component, Pipe, PipeTransform } from '@angular/core';
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
    selector: 'uxd-components-select-custom',
    templateUrl: './select-custom.component.html',
    styleUrls: ['./select-custom.component.less']
})
@DocumentationSectionComponent('ComponentsSelectCustomComponent')
export class ComponentsSelectCustomComponent extends BaseDocumentationSection implements IPlaygroundProvider {

    selected: RadioOption;
    optionList: ReadonlyArray<RadioOption> = [
        { name: 'One' }, { name: 'Two' }, { name: 'Three' }, { name: 'Four' }
    ];
    filter: string = '';
    showBusyIndicator: boolean = false;
    allowNull: boolean = false;
    componentMaxHeight: number = 400;
    placeholder: string = 'Type to search...';
    focusIndex: number = 0;

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
                imports: ['AccordionModule', 'CheckboxModule', 'NumberPickerModule', 'RadioButtonModule', 'SelectCustomModule'],
                library: '@ux-aspects/ux-aspects'
            }
        ]
    };

    constructor() {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));
    }

    private index(text: string): number {
        return text.toLowerCase().indexOf(this.filter.toLowerCase());
    }

    isHidden(name: string): boolean {
        return this.filter && (this.filter.length > 0) && (this.index(name) === -1);
    }

    navigateUp(event: KeyboardEvent): void {
        if (this.focusIndex > 0) {
            this.focusIndex--;
            event.preventDefault();
        }
    }

    navigateDown(event: KeyboardEvent): void {
        if (this.focusIndex < this.optionList.length - 1) {
            this.focusIndex++;
            event.preventDefault();
        }
    }

    selectButton(event: KeyboardEvent): void {
        this.selected = this.optionList[this.focusIndex];
        event.preventDefault();
    }
}

export interface RadioOption {
    name: string;
}