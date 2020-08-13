import { TemplateRef } from '@angular/core';

export interface EnumWidgetConfig {
    value: string | number;
    enums: ReadonlyArray<EnumConfig>;
}

export interface EnumConfig {
    label: string;
    value: string | number;
    icon?: string;
    iconTemplate?: TemplateRef<any>;
}
