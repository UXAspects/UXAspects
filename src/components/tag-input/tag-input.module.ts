import { FocusIfModule } from '../../directives/focus-if/index';
import { TypeaheadModule } from '../typeahead/index';
import { TagInputComponent } from './tag-input.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        FocusIfModule,
        TypeaheadModule
    ],
    exports: [TagInputComponent],
    declarations: [TagInputComponent],
    providers: [],
})
export class TagInputModule { }
