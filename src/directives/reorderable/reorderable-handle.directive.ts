import { CdkDragHandle } from '@angular/cdk/drag-drop';
import { Directive } from '@angular/core';

@Directive({
    selector: '[uxReorderableHandle]'
})
export class ReorderableHandleDirective extends CdkDragHandle { }
