import { Component } from '@angular/core';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { IPlayground } from '../../../../../interfaces/IPlayground';
import { IPlaygroundProvider } from '../../../../../interfaces/IPlaygroundProvider';

@Component({
    selector: 'uxd-components-radio-button',
    templateUrl: './radio-button.component.html',
    standalone: false
})
@DocumentationSectionComponent('ComponentsRadioButtonComponent')
export class ComponentsRadioButtonComponent
    extends BaseDocumentationSection
    implements IPlaygroundProvider
{
    selected: number | string | object = 100;

    radioOptions = {
        option1: 100,
        option2: 'string',
        option3: {
            test: 1,
        },
        option4: 'Wrap-Text',
    };

    disabled = false;
    simplified = false;

    playground: IPlayground = {
        files: {
            'app.component.html': this.snippets.raw.appHtml,
            'app.component.ts': this.snippets.raw.appTs,
        },
        modules: [
            {
                imports: ['RadioButtonModule'],
                library: '@ux-aspects/ux-aspects',
            },
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

    toggleDisabled(radio: number | string | object): void {
        this.disabled = !this.disabled;

        if (this.selected === radio && this.disabled) {
            this.selected = undefined;
        }
    }
}
