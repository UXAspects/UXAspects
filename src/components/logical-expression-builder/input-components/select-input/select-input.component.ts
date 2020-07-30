import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'ux-select-input',
    templateUrl: './select-input.component.html'
})
export class SelectInputComponent implements OnInit {
    @Output() valueChange: EventEmitter<string[]> = new EventEmitter<string[]>();
    @Output() valid: EventEmitter<boolean> = new EventEmitter<boolean>();

    @Input() value: string[];

    _value: ReadonlyArray<SelectOption>;

    @Input()
    set data(data: { options: SelectOption[], validateFunction: (value: string[]) => boolean }) {
        this._options = data?.options ?? [];
        this._validate = data?.validateFunction ?? this._validate;
    }

    _options: ReadonlyArray<SelectOption>;

    private _validate: (value: string[]) => boolean = () => true;

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
        this.valid.emit(this._validate(outputOptions));
    }
}

type SelectOption = { name: string, label: string, icon?: string };
