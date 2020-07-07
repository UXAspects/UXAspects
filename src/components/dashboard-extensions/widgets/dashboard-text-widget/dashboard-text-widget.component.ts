import { Component, Input } from '@angular/core';
import { SidePanelComponent } from '../../../side-panel';

@Component({
    selector: 'ux-dashboard-text-widget',
    templateUrl: './dashboard-text-widget.component.html',
})
export class DashboardTextWidgetComponent {
    @Input() fixedMode: boolean = false;
    @Input() colSpan: number = 1;
    @Input() rowSpan: number = 1;
    @Input() heading: string = '';
    @Input() id: string = '';
    @Input() name: string = '';
    @Input() text: string = '';
    @Input() editable: boolean = false;

    constructor() {

    }

    open(sidePanelElement: SidePanelComponent, textAreaElement: HTMLTextAreaElement, inputElement: HTMLInputElement) {
        textAreaElement.value = this.text;
        inputElement.value = this.heading;
        sidePanelElement.openPanel();
    }

    save(sidePanelElement: SidePanelComponent, textAreaElement: HTMLTextAreaElement, inputElement: HTMLInputElement) {
        this.text = textAreaElement.value;
        this.heading = inputElement.value;
        sidePanelElement.closePanel();
    }

    cancel(sidePanelElement: SidePanelComponent) {
        sidePanelElement.closePanel();
    }
}
