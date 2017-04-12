import { NgModule } from '@angular/core';

import { ColorInputDirective } from './color-input/color-input.directive';
import { BoldifyDirective } from './boldify/boldify.directive';

const DOCUMENTATION_DIRECTIVES = [
    ColorInputDirective,
    BoldifyDirective
];


@NgModule({
    imports: [],
    exports: DOCUMENTATION_DIRECTIVES,
    declarations: DOCUMENTATION_DIRECTIVES,
    providers: [],
})
export class DocumentationDirectivesModule { }

