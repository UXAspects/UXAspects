import { EventEmitter } from '@angular/core';

export interface TextWidgetConfig {
    text: string;
    editable?: boolean;
    localizedStrings: TextWidgetLocalizedStrings;
    textChange?: EventEmitter<string>;
}

export interface TextWidgetLocalizedStrings {
    edit: string;
    showFullText: string;
    save: string;
    cancel: string;
}
