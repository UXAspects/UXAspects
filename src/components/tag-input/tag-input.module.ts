import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FocusIfModule } from './../../directives/focus-if/index';

import { TagInputComponent } from './tag-input.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        FocusIfModule
    ],
    exports: [TagInputComponent],
    declarations: [TagInputComponent],
    providers: [],
})
export class TagInputModule { }
