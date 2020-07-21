import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TextInputComponent } from './input-components/text-input/text-input.component';
import { HierarchicalSearchBuilderComponent } from './hierarchical-search-builder.component';
import { HierarchicalSearchBuilderGroupComponent } from './hierarchical-search-builder-group/hierarchical-search-builder-group.component';
import { HierarchicalSearchBuilderConditionComponent } from './hierarchical-search-builder-condition/hierarchical-search-builder-condition.component';
import { HierarchicalSearchBuilderService } from './hierarchical-search-builder.service';
import { SelectModule } from '../select';
import { NumberPickerModule } from '../number-picker';
import { NumberInputComponent } from './input-components/number-input/number-input.component';
import { SelectInputComponent } from './input-components/select-input/select-input.component';
import { DateInputComponent } from './input-components/date-input/date-input.component';
import { DateTimePickerModule } from '../date-time-picker';
import { PopoverModule } from '../popover';
import { AccessibilityModule } from '../../directives/accessibility';
import { L10nPipe } from './l10n.pipe';
import { DateRangeInputComponent } from './input-components/date-range-input/date-range-input.component';
import { DateRangePickerModule } from '../date-range-picker';
import { FormsModule } from '@angular/forms';
import { HoverActionModule } from '../../directives/hover-action';
import { MenuModule } from '../menu';

const EXPORTS = [
    TextInputComponent,
    NumberInputComponent,
    SelectInputComponent,
    DateInputComponent,
    DateRangeInputComponent,
    HierarchicalSearchBuilderComponent,
];

const DECLARATIONS = [
    ...EXPORTS,
    HierarchicalSearchBuilderGroupComponent,
    HierarchicalSearchBuilderConditionComponent,
    L10nPipe
];

@NgModule({
    imports: [
        CommonModule,
        SelectModule,
        NumberPickerModule,
        DateTimePickerModule,
        PopoverModule,
        AccessibilityModule,
        DateRangePickerModule,
        FormsModule,
        HoverActionModule,
        MenuModule
    ],
    exports: [...EXPORTS, L10nPipe],
    declarations: DECLARATIONS,
    providers: [HierarchicalSearchBuilderService, L10nPipe]
})
export class HierarchicalSearchBuilderModule {
}
