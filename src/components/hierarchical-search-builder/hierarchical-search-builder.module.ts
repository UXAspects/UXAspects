import { A11yModule } from '@angular/cdk/a11y';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TextInputComponent } from './input-components/text-input/text-input.component';
import { HierarchicalSearchBuilderComponent } from './hierarchical-search-builder.component';
import { HierarchicalSearchBuilderGroupComponent } from './hierarchical-search-builder-group/hierarchical-search-builder-group.component';
import { HierarchicalSearchBuilderConditionComponent } from './hierarchical-search-builder-condition/hierarchical-search-builder-condition.component';

const DECLARATIONS = [
    TextInputComponent,
    HierarchicalSearchBuilderComponent,
    HierarchicalSearchBuilderGroupComponent,
    HierarchicalSearchBuilderConditionComponent,
];

@NgModule({
    imports: [
        A11yModule,
        CommonModule,
    ],
    exports: DECLARATIONS,
    declarations: DECLARATIONS,
})
export class HierarchicalSearchBuilderModule {
}
