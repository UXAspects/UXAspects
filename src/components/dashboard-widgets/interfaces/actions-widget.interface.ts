import { EventEmitter, TemplateRef } from '@angular/core';

export interface ActionsWidgetConfig {
    actions: ReadonlyArray<ActionConfig>;
    status: ActionStatus;
    actionSelected?: EventEmitter<string>;
}

export interface ActionConfig {
    label: string;
    value: string;
    icon?: string;
    iconTemplate?: TemplateRef<any>;
}

export interface ActionStatus {
    label: string;
    icon?: string;
    iconTemplate?: TemplateRef<any>;
}
