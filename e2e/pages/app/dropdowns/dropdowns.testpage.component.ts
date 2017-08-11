import { Component } from '@angular/core';
@Component({
    selector: 'app',
    templateUrl: './dropdowns.testpage.component.html',
    styleUrls: ['./dropdowns.testpage.component.css']
})
export class DropdownsTestPageComponent {
    public cases = [
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
    public caseFilter = '';
}
