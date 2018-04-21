import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ToolbarSearchComponent } from './toolbar-search.component';
import { ToolbarSearchFieldDirective } from './toolbar-search-field.directive';
import { ToolbarSearchButtonDirective } from './toolbar-search-button.directive';

const DECLARATIONS = [
    ToolbarSearchComponent,
    ToolbarSearchFieldDirective,
    ToolbarSearchButtonDirective
];

@NgModule({
    imports: [
        CommonModule
    ],
    exports: DECLARATIONS,
    declarations: DECLARATIONS,
    providers: [],
})
export class ToolbarSearchModule { }
