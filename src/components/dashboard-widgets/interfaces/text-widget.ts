import {SidePanelComponent} from '../../side-panel';
import {ElementRef} from '@angular/core';
import {PredefinedWidgetConfig} from './predefined-widget';

export interface TextWidgetConfig extends PredefinedWidgetConfig {
    text: string;
    editable?: boolean;
    sidePanel: SidePanelComponent;
    textArea: ElementRef<HTMLTextAreaElement>;
    open: () => void;
    cancel: () => void;
    save: () => void;
}
