import { Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class AppComponent {
    cases: string[] = [
        'Alpha',
        'Beta',
        'Gamma',
        'Delta',
        'Epsilon',
        'Zeta',
        'Eta',
        'Theta',
        'Iota',
        'Kappa',
        'Alpha 2',
        'Alpha 3',
    ];

    caseFilter: string = '';

    toggleSwitchValue: boolean = false;

        // eslint-disable-next-line @typescript-eslint/no-empty-function
    export(): void {}
        // eslint-disable-next-line @typescript-eslint/no-empty-function
    saveList(): void {}
        // eslint-disable-next-line @typescript-eslint/no-empty-function
    saveQuery(): void {}
}
