import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReorderableDirective } from './reorderable.directive';
import { ReorderableHandleDirective } from './reorderable-handle.directive';
import { ReorderableModelDirective } from './reorderable-model.directive';
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
