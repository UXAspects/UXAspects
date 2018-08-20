import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'ux-color-picker',
    templateUrl: 'color-picker.component.html'
})
export class ColorPickerComponent {

    @Input()
    colors: ColorPickerItem[];

    @Input()
    selected: string;

    @Input()
    buttonStyle: 'square' | 'circle';

    @Input()
    showDetails: boolean;

    @Input()
    colorEntryType: 'hex' | 'rgb' = 'hex';

    @Output()
    selectedChange = new EventEmitter<string>();

    selectedInput: string = '#00a7a2';

    toggleColorEntryType(): void {
        this.colorEntryType = (this.colorEntryType === 'hex') ? 'rgb' : 'hex';
    }
}

export class ColorPickerItem {
    constructor(public name: string, public color: string) {}
}