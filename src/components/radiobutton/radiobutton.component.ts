import { Component, Input, forwardRef, HostListener } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

export const RADIOBUTTON_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => RadioButtonComponent),
    multi: true
};

@Component({
    selector: 'ux-radiobutton',
    templateUrl: './radiobutton.component.html',
    styleUrls: ['./radiobutton.component.less'],
    providers: [RADIOBUTTON_VALUE_ACCESSOR]
})
export class RadioButtonComponent implements ControlValueAccessor {

    @Input() simplified: boolean = false;
    @Input() disabled: boolean = false;
    @Input() name: string = '';
    @Input() clickable: boolean = true;
    @Input() value: any;
    @Input() id: string;

    private model: boolean = false;

    private onTouchedCallback: () => void = () => { };
    private onChangeCallback: (_: any) => void = () => { };


    constructor() { }

    @HostListener('click', [])
    checkItem() {

        if (this.disabled === true || this.clickable === false) {
            return;
        }

        // toggle the checked state
        this.model = this.value;

        // call callback
        this.onChangeCallback(this.model);
    }

    keyDown(event: KeyboardEvent) {

        // if spacebar key is pressed
        if (event.keyCode === 32) {

            // then toggle the checkbox
            this.checkItem();

            // prevent default browser behavior
            event.stopPropagation();
            event.preventDefault();
        }
    }

    // Functions required to update ng-model
    writeValue(value: boolean) {
        if (value !== this.model) {
            this.model = value;
        }
    }

    registerOnChange(fn: any) {
        this.onChangeCallback = fn;
    }

    registerOnTouched(fn: any) {
        this.onTouchedCallback = fn;
    }
}
