import { TemplateRef } from '@angular/core';

export interface EnumWidgetConfig {
    value: string;
    enums: ReadonlyArray<EnumConfig>;
}

export interface EnumConfig {
    label: string;
    value: string;
    icon?: string;
    iconTemplate?: TemplateRef<any>;
}
