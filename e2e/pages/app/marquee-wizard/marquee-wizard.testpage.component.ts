import { Component } from '@angular/core';

@Component({
    selector: 'marquee-wizard-app',
    templateUrl: './marquee-wizard.testpage.component.html',
    styleUrls: ['./marquee-wizard.testpage.component.less'],
})
export class MarqueeWizardTestPageComponent {

    resizable: boolean = false;
    sidePanelWidth: number = 25;
    hasFooterTemplate: boolean = false;
    step1Invalid: boolean = false;
    step4Invalid: boolean = false;
    step2Invalid: boolean = false;
    disableNextWhenInvalidStep1: boolean = undefined;
    disableNextWhenInvalidWizard: boolean = false;
}