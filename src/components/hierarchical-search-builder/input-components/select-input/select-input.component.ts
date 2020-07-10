import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'ux-select-input',
    templateUrl: './select-input.component.html',
    // styleUrls: ['']
})
export class SelectInputComponent implements OnInit {
    @Input() value: string[];
    @Input() data: { options: SelectOption[] };
    @Output() valueChange = new EventEmitter<any>();

    _value: SelectOption[];

    ngOnInit() {
        let temp: SelectOption[] = [];
        this.value.forEach((value) => {
            const option = this.data.options?.find((o) => o.name === value);

            if (option) {
                temp.push(option);
            }
        });
        this._value = temp;
    }

    handleValueChange(value: SelectOption[]) {
        const outputOptions = value.map((v) => v.name);
        this.valueChange.emit(outputOptions);
    }
}

type SelectOption = { name: string, label: string };
