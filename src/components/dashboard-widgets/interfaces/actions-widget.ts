import {TemplateRef} from '@angular/core';
import {PredefinedWidgetConfig} from './predefined-widget';

export interface ActionsWidgetConfig extends PredefinedWidgetConfig {
    actions: ReadonlyArray<ActionConfig>;
    status: { label: string, icon: string | TemplateRef<any> };
}

export interface ActionConfig {
    label?: string;
    icon?: string;
    iconTemplate?: TemplateRef<any>;
    action: Function;
}

export interface ActionStatus {
    label: string;
    icon: string | TemplateRef<any>;
}
