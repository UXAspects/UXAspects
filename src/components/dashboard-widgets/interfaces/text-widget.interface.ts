import { EventEmitter } from '@angular/core';

export interface TextWidgetConfig {
    text: string;
    editable?: boolean;
    textChange?: EventEmitter<string>;
}
