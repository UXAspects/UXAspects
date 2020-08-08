import { TemplateRef } from '@angular/core';

export interface ActionsWidgetConfig {
    actions: ReadonlyArray<ActionConfig>;
    status: ActionStatus;
}

export interface ActionConfig {
    label?: string;
    icon?: string;
    iconTemplate?: TemplateRef<any>;
    action: Function;
    buttonClasses?: string | ReadonlyArray<string>;
}

export interface ActionStatus {
    label: string;
    icon?: string;
    iconTemplate?: TemplateRef<any>;
}
