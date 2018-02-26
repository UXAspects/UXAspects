import { Component, Input, Output, EventEmitter, QueryList, ViewChildren, ChangeDetectionStrategy } from '@angular/core';
import { FloatingActionButtonComponent } from './floating-action-button.component';
import { FloatingActionButtonsService } from './floating-action-buttons.service';

@Component({
    selector: 'ux-floating-action-buttons',
    templateUrl: './floating-action-buttons.component.html',
    providers: [FloatingActionButtonsService],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FloatingActionButtonsComponent {

    constructor(public fab: FloatingActionButtonsService) { }
}