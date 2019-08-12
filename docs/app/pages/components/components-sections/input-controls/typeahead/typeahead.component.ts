import { Component, ElementRef, EventEmitter, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { IPlayground } from '../../../../../interfaces/IPlayground';
import { IPlaygroundProvider } from '../../../../../interfaces/IPlaygroundProvider';
import { TypeaheadKeyService, TypeaheadOptionEvent } from '@ux-aspects/ux-aspects';
import { BehaviorSubject } from 'rxjs';

@Component({
    selector: 'uxd-components-typeahead',
    templateUrl: 'typeahead.component.html',
    styleUrls: ['./typeahead.component.less'],
})
@DocumentationSectionComponent('ComponentsTypeaheadComponent')
export class ComponentsTypeaheadComponent<T> extends BaseDocumentationSection implements IPlaygroundProvider {

    dropdownOpened: boolean = false;

    allTags = ['Alpha', 'Beta', 'Gamma', 'Delta', 'Epsilon', 'Zeta', 'Eta', 'Theta', 'Iota', 'Kappa', 'Lambda', 'Mu', 'Nu', 'Xi', 'Omicron', 'Pi', 'Rho', 'Sigma', 'Tau', 'Upsilon', 'Phi', 'Chi', 'Psi', 'Omega'];

    private _input$ = new BehaviorSubject<string>('');

    private _value$ = new BehaviorSubject<T>(null);

    selectFirst: boolean = true;
    dropDirection: 'up' | 'down' = 'down';

    @ViewChild('singleInput', { static: false }) singleInput: ElementRef;

    /** The selected option (for single select) or array of options (for multiple select). */
    @Input()
    set value(value: T) {
        this._value$.next(value);
    }
    get value() {
        return this._value$.value;
    }

    singleOptionSelected(event: TypeaheadOptionEvent): void {
        console.log(event);
        if (event.option) {
            this.value = event.option;
            this.dropdownOpened = false;
        }
    }

    dropdown() {
        this.dropdownOpened = true;
    }

    /** The text in the input area. This is used to filter the options dropdown. */
    @Input()
    set input(value: string) {
        this._input$.next(value);
    }
    get input() {
        return this._input$.value;
    }

    playground: IPlayground = {
        files: {
            'app.component.html': this.snippets.raw.appHtml,
            'app.component.ts': this.snippets.raw.appTs
        },
        modules: [{
            imports: ['TagInputModule', 'TypeaheadModule', 'CheckboxModule', 'RadioButtonModule', 'NumberPickerModule', 'AccordionModule'],
            library: '@ux-aspects/ux-aspects'
        }]
    };

    constructor(public typeaheadKeyService: TypeaheadKeyService) {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));
    }
}