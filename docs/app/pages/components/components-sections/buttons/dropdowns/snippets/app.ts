import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None,
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

  export(): void {}

  saveList(): void {}

  saveQuery(): void {}
}
