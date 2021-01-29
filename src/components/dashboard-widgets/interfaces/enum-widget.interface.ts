import { EventEmitter, TemplateRef } from '@angular/core';

export interface EnumWidgetConfig {
    value: string;
    options: ReadonlyArray<EnumConfig>;
    valueChange?: EventEmitter<string>;
}

export interface EnumConfig {
    label: string;
    value: string;
    icon?: string;
    iconTemplate?: TemplateRef<any>;
}
