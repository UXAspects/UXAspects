import { PlatformModule } from '@angular/cdk/platform';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InfiniteScrollModule } from '../../directives/infinite-scroll/index';
import { TagInputModule } from '../tag-input/index';
import { TypeaheadModule } from '../typeahead/index';
import { SelectComponent } from './select.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        InfiniteScrollModule,
        TagInputModule,
        TypeaheadModule,
        PlatformModule
    ],
    exports: [SelectComponent],
    declarations: [SelectComponent]
})
export class SelectModule { }
