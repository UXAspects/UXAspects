import {EventEmitter, TemplateRef} from '@angular/core';

export interface SelectWidgetConfig {
    value: string;
    options: ReadonlyArray<SelectConfig>;
    valueChange?: EventEmitter<string>;
}

export interface SelectConfig {
    label: string;
    value: string;
    icon?: string;
    iconTemplate?: TemplateRef<any>;
}
