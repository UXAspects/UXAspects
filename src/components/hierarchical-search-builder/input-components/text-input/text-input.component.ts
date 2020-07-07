import {
    Component, EventEmitter, Input, Output,
} from '@angular/core';

@Component({
    selector: 'ux-text-input',
    templateUrl: './text-input.component.html',
    // styleUrls: ['./dashboard-text-widget.component.less']
})
export class TextInputComponent {
    @Input() value: string = '';
    @Input() data: object;
    @Output() valueChange = new EventEmitter<string>();

    handleValueChange(event: KeyboardEvent) {
        this.valueChange.emit((event.target as HTMLInputElement).value);
    }
}
