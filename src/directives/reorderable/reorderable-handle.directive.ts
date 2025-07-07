import { CdkDragHandle, CDK_DRAG_HANDLE } from '@angular/cdk/drag-drop';
import { Directive } from '@angular/core';

@Directive({
  selector: '[uxReorderableHandle]',
  providers: [{ provide: CDK_DRAG_HANDLE, useExisting: ReorderableHandleDirective }],
  standalone: false,
})
export class ReorderableHandleDirective extends CdkDragHandle {}
