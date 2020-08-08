import { ElementRef } from '@angular/core';
import { SidePanelComponent } from '../../side-panel';

export interface TextWidgetConfig {
    text: string;
    editable?: boolean;
    sidePanel: SidePanelComponent;
    textArea: ElementRef<HTMLTextAreaElement>;
    open: () => void;
    cancel: () => void;
    save: () => void;
}
