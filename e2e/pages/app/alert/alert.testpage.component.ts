import { Component } from '@angular/core';

@Component({
    selector: 'app-alert',
    templateUrl: 'alert.testpage.component.html',
    styles: [`ux-alert { margin-bottom: 4px; }`]
})
export class AlertTestPageComponent {
    private _alerts: ReadonlyArray<AlertExample> = [
        {
            id: 'info',
            type: 'info',
            icon: 'status-information-filled',
            description: 'This is an example of an info alert message <a>with a link</a>.',
            dismissible: true,
        },
        {
            id: 'error',
            type: 'error',
            icon: 'status-error-filled',
            description: 'This is an example of an error alert message <a>with a link</a>.',
            dismissible: true,
        },
        {
            id: 'success',
            type: 'success',
            icon: 'status-approved-filled',
            description: 'This is an example of a success alert message <a>with a link</a>.',
            dismissible: true,
        },
        {
            id: 'warning',
            type: 'warning',
            icon: 'status-warning-filled',
            description: 'This is an example of a warning alert message <a>with a link</a>.',
            dismissible: true,
        },
        {
            id: 'dark',
            type: 'dark',
            icon: 'status-information-filled',
            description: 'This is an example of a dark alert message <a>with a link</a>.',
            dismissible: true,
        },
        {
            id: 'info-alert-link',
            type: 'info',
            icon: 'status-information-filled',
            description: 'This is an example of an info alert message <a class="alert-link">with an alert-link</a>.',
            dismissible: true,
        },
        {
            id: 'info-multiline',
            type: 'info',
            icon: 'status-information-filled',
            description:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            dismissible: true,
        },
        {
            id: 'info-without-icon',
            type: 'info',
            description: 'Alert without icon.',
            dismissible: true,
        },
        {
            id: 'info-without-dismiss',
            type: 'info',
            icon: 'status-information-filled',
            description: 'Alert without dismiss.',
        },
    ];

    alerts: AlertExample[] = [...this._alerts];

    remove(alert: AlertExample): void {
        this.alerts = this.alerts.filter((_alert) => _alert !== alert);
    }

    reset(): void {
        this.alerts = [...this._alerts];
    }
}

export interface AlertExample {
    id: string;
    type: string;
    icon?: string;
    description: string;
    dismissible?: boolean;
}
