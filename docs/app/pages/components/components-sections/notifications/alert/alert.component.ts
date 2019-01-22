import { Component } from '@angular/core';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { IPlunk } from '../../../../../interfaces/IPlunk';
import { IPlunkProvider } from '../../../../../interfaces/IPlunkProvider';

@Component({
    selector: 'uxmd-pages-alert',
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.less']
})
@DocumentationSectionComponent('ComponentsAlertComponent')
export class ComponentsAlertComponent extends BaseDocumentationSection implements IPlunkProvider {

    private _alerts: ReadonlyArray<AlertExample> = [
        {
            type: 'info',
            icon: 'hpe-status-information-filled',
            description: 'This is an example of an info alert message',
        },
        {
            type: 'error',
            icon: 'hpe-status-error-filled',
            description: 'This is an example of an error alert message',
        },
        {
            type: 'success',
            icon: 'hpe-status-approved-filled',
            description: 'This is an example of a success alert message',
        },
        {
            type: 'warning',
            icon: 'hpe-status-warning-filled',
            description: 'This is an example of a warning alert message',
        },
        {
            type: 'dark',
            icon: 'hpe-status-information-filled',
            description: 'This is an example of a dark alert message',
        }
    ];

    alerts: AlertExample[] = [...this._alerts];

    plunk: IPlunk = {
        files: {
            'app.component.ts': this.snippets.raw.appTs,
            'app.component.html': this.snippets.raw.appHtml,
            'app.component.css': this.snippets.raw.appCss,
        },
        modules: [
            {
                imports: ['AlertModule', 'AccordionModule', 'CheckboxModule'],
                library: '@ux-aspects/ux-aspects'
            }
        ]
    };

    constructor() {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));
    }

    remove(alert: AlertExample): void {
        this.alerts = this.alerts.filter(_alert => _alert !== alert);
    }

    reset(): void {
        this.alerts = [...this._alerts];
    }
}

export interface AlertExample {
    type: string;
    icon: string;
    description: string;
}