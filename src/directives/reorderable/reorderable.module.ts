import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReorderableHandleDirective } from './reorderable-handle.directive';
import { ReorderableModelDirective } from './reorderable-model.directive';
import { ReorderableDirective } from './reorderable.directive';


@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        ReorderableDirective,
        ReorderableHandleDirective,
        ReorderableModelDirective
    ],
    exports: [
        ReorderableDirective,
        ReorderableHandleDirective,
        ReorderableModelDirective
    ]
})
export class ReorderableModule { }
