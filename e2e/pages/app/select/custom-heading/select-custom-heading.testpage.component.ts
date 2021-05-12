import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-select-custom-heading',
    templateUrl: './select-custom-heading.testpage.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectCustomHeadingTestPageComponent {

    // ux-select configuration properties
    options: string[] = [ 'United States', 'United Kingdom', 'Afghanistan', 'Aland Islands', 'Albania', 'Algeria', 'American Samoa'];
    dropdownOpen: boolean;
    placeholder = 'Select a country';
    recentOptions: ReadonlyArray<string> = null;
}
