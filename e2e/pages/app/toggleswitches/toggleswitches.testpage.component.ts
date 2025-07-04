import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'toggleswitches-app',
    templateUrl: './toggleswitches.testpage.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class ToggleSwitchesTestPageComponent {
    toggleSwitches = {
        option1: true,
        option2: false,
        option3: false,
        option4: false
    };

    toggleSwitchDisable: boolean = false;

    reset(): void {
        this.toggleSwitches = {
            option1: true,
            option2: false,
            option3: false,
            option4: false
        };

        this.toggleSwitchDisable = false;
    }
}

