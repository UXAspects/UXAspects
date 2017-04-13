import { NgModule } from '@angular/core';

import { ChartsFlotOptionsNg1Component } from './flot-options-ng1/flot-options-ng1.component';

const SECTIONS = [
    ChartsFlotOptionsNg1Component
];

@NgModule({
    imports: [],
    exports: SECTIONS,
    declarations: SECTIONS,
    providers: [],
})
export class FlotOptionsModule { }
