import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'ux-select-input',
    templateUrl: './select-input.component.html'
})
export class SelectInputComponent implements OnInit {
    @Input() value: string[];

    _value: ReadonlyArray<SelectOption>;

    @Input()
    set data(data: { options: SelectOption[] }) {
        this._options = data?.options ?? [];
    }

    _options: ReadonlyArray<SelectOption>;

    @Output() valueChange = new EventEmitter<string[]>();

    ngOnInit() {
        if (Array.isArray(this.value)) {
            this._value = this.value
                .map((v: string) => {
                    return this._options?.find((o: SelectOption) => o.name === v);
                })
                .filter((o: SelectOption) => o);
        }
    }

    handleValueChange(value: SelectOption[]): void {
        const outputOptions = value.map((v: SelectOption) => v.name);
        this.valueChange.emit(outputOptions);
    }
}

type SelectOption = { name: string, label: string, icon?: string };
