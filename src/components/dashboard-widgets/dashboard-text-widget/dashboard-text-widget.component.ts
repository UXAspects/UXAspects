import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { SidePanelComponent } from '../../side-panel';
import { TextWidgetConfig } from '../interfaces/text-widget';

@Component({
    selector: 'ux-dashboard-text-widget',
    templateUrl: './dashboard-text-widget.component.html',
})
export class DashboardTextWidgetComponent implements TextWidgetConfig {
    @Input() id: string = '';
    @Input() name: string = '';
    @Input() heading: string = '';
    @Input() fixedMode: boolean = false;
    @Input() colSpan: number = 1;
    @Input() rowSpan: number = 1;

    @ViewChild('sidePanel') sidePanel: SidePanelComponent;
    @ViewChild('textArea') textArea: ElementRef<HTMLTextAreaElement>;
    @Input() text: string = '';
    @Input() editable: boolean = false;

    @Output() textChange = new EventEmitter<string>();

    constructor() {

    }

    open() {
        this.textArea.nativeElement.value = this.text;
        this.sidePanel.openPanel();
    }

    save() {
        this.text = this.textArea.nativeElement.value;
        this.textChange.emit(this.text);
        this.sidePanel.closePanel();
    }

    cancel() {
        this.sidePanel.closePanel();
    }
}
