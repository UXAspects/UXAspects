import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ColorInputDirective } from './color-input/color-input.directive';
import { BoldifyDirective } from './boldify/boldify.directive';

const DIRECTIVES = [
    ColorInputDirective,
    BoldifyDirective
];

@NgModule({
    imports: [
        CommonModule,
    ],
    exports: DIRECTIVES,
    declarations: DIRECTIVES
})
export class DirectivesModule { }
