import {TemplateRef} from '@angular/core';
import {PredefinedWidgetConfig} from './predefined-widget';

export interface ActionsWidgetConfig extends PredefinedWidgetConfig {
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
