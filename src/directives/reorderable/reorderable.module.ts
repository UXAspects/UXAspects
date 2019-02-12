import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReorderableHandleDirective } from './reorderable-handle.directive';
import { ReorderableModelDirective } from './reorderable-model.directive';
import { ReorderableDirective } from './reorderable.directive';
import { ReorderableService } from './reorderable.service';

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
    ],
    providers: [
        ReorderableService
    ]
})
export class ReorderableModule { }
