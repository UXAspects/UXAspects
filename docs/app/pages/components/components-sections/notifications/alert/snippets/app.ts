import { Component } from '@angular/core';

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent {

    private _alerts: ReadonlyArray<AlertExample> = [
        {
            type: 'info',
            icon: 'status-information-filled',
            description: 'This is an example of an info alert message <a class="alert-link">with a link</a>.',
        },
        {
            type: 'error',
            icon: 'status-error-filled',
            description: 'This is an example of an error alert message <a class="alert-link">with a link</a>.',
        },
        {
            type: 'success',
            icon: 'status-approved-filled',
            description: 'This is an example of a success alert message <a class="alert-link">with a link</a>.',
        },
        {
            type: 'warning',
            icon: 'status-warning-filled',
            description: 'This is an example of a warning alert message <a class="alert-link">with a link</a>.',
        },
        {
            type: 'dark',
            icon: 'status-information-filled',
            description: 'This is an example of a dark alert message <a class="alert-link">with a link</a>.',
        },
    ];

    alerts: AlertExample[] = [...this._alerts];

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
