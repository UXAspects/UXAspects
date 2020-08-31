import {ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {PredefinedWidgetConfig} from '../interfaces/predefined-widget.interface';
import {TextWidgetConfig, TextWidgetLocalizedStrings} from '../interfaces/text-widget.interface';
import {SidePanelComponent} from '../../side-panel';

@Component({
    selector: 'ux-dashboard-text-widget',
    templateUrl: './dashboard-text-widget.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardTextWidgetComponent implements PredefinedWidgetConfig, TextWidgetConfig {
    @Input() id: string = '';
    @Input() name: string = '';
    @Input() heading: string = '';
    @Input() fixedMode: boolean = false;
    @Input() colSpan: number = 1;
    @Input() rowSpan: number = 1;
    @Input() localizedStrings: TextWidgetLocalizedStrings = {
        save: 'Save',
        cancel: 'Cancel',
        edit: 'Edit',
        showFullText: 'Show full text'
    };

    @Input() text: string = '';
    @Input() editable: boolean = false;

    @ViewChild('sidePanel') sidePanel: SidePanelComponent;
    @ViewChild('textArea') textArea: ElementRef<HTMLTextAreaElement>;

    @Output() textChange = new EventEmitter<string>();

    open() {
        this.textArea.nativeElement.value = this.text;
        this.sidePanel.openPanel();
        if (this.editable) {
            setTimeout(() => {
                this.textArea.nativeElement.focus();
            }, 0);
        }
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
