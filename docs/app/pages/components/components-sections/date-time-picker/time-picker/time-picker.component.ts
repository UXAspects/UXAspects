import { Component } from '@angular/core';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { IPlunk } from '../../../../../interfaces/IPlunk';
import { IPlunkProvider } from '../../../../../interfaces/IPlunkProvider';

@Component({
    selector: 'uxd-time-picker',
    templateUrl: './time-picker.component.html'
})
@DocumentationSectionComponent('ComponentsTimePickerComponent')
export class ComponentsTimePickerComponent extends BaseDocumentationSection implements IPlunkProvider {

    plunk: IPlunk = {
        files: {
            'app.component.html': this.snippets.raw.appHtml,
            'app.component.ts': this.snippets.raw.appTs,
        },
        modules: [
            {
                imports: ['TimePickerModule'],
                library: '@ux-aspects/ux-aspects'
            },
        ]
    };

    value = new Date();
    showMeridian = true;
    showHours = true;
    showMinutes = true;
    showSeconds = false;
    showSpinners = true;
    hourStep = 1;
    minuteStep = 1;
    secondStep = 1;
    disabled = false;

    constructor() {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));
    }
}