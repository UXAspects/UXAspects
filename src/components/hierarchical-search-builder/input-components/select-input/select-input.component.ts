import { Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';

@Component({
    selector: 'ux-select-input',
    templateUrl: './select-input.component.html',
    // styleUrls: ['']
})
export class SelectInputComponent implements OnInit {
    @Input() value: string[];

    _value: ReadonlyArray<SelectOption>;

    @Input()
    set data(data: SelectInputConfig) {
        if (data?.options) {
            this._options = data.options;
        } else {
            this._options = [];
        }
    }

    _options: ReadonlyArray<SelectOption>;

    @Output() valueChange = new EventEmitter<string[]>();

    ngOnInit() {
        if (Array.isArray(this.value)) {
            this._value = this.value.map((v) => {
                const option = this._options?.find((o) => o.name === v);

                if (option) {
                    return option;
                } else {
                    return;
                }
            });
        }
    }

    handleValueChange(value: SelectOption[]) {
        const outputOptions = value.map((v) => v.name);
        this.valueChange.emit(outputOptions);
    }
}

type SelectOption = { name: string, label: string, iconTemplate?: TemplateRef<any> };
type SelectInputConfig = { options: SelectOption[] };
