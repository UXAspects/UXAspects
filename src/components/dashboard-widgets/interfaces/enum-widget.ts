import {SidePanelComponent} from '../../side-panel';
import {TemplateRef} from '@angular/core';
import {PredefinedWidgetConfig} from './predefined-widget';

export interface EnumWidgetConfig extends PredefinedWidgetConfig {
    value: string | number;
    enums: ReadonlyArray<EnumConfig>;
    sidePanel: SidePanelComponent;
    open: () => void;
    cancel: () => void;
    save: () => void;
}

export interface EnumConfig {
    label: string;
    value: string | number;
    icon?: string;
    iconTemplate?: TemplateRef<any>;
}
