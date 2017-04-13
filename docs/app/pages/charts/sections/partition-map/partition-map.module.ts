import { NgModule } from '@angular/core';

import { ChartsPartitionMapNg1Component } from './partition-map-ng1/partition-map-ng1.component';

const SECTIONS = [
    ChartsPartitionMapNg1Component
];

@NgModule({
    imports: [],
    exports: SECTIONS,
    declarations: SECTIONS,
    providers: [],
})
export class PartitionMapModule { }
