import {EventEmitter} from '@angular/core';

export interface TextWidgetConfig {
    text: string;
    editable?: boolean;
    editLabel: string;
    showFullTextLabel: string;
    saveLabel: string;
    cancelLabel: string;
    textChange?: EventEmitter<string>;
}
