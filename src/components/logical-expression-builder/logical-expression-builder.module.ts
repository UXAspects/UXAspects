import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { TextInputComponent } from './input-components/text-input/text-input.component';
import { LogicalExpressionBuilderComponent } from './logical-expression-builder.component';
import { LebGroupComponent } from './leb-group/leb-group.component';
import { LebConditionComponent } from './leb-condition/leb-condition.component';
import { LogicalExpressionBuilderService } from './services/logical-expression-builder.service';
import { SelectModule } from '../select';
import { NumberPickerModule } from '../number-picker';
import { NumberInputComponent } from './input-components/number-input/number-input.component';
import { SelectInputComponent } from './input-components/select-input/select-input.component';
import { DateInputComponent } from './input-components/date-input/date-input.component';
import { DateTimePickerModule } from '../date-time-picker';
import { PopoverModule } from '../popover';
import { AccessibilityModule } from '../../directives/accessibility';
import { L10nPipe } from './pipes/l10n.pipe';
import { DateRangeInputComponent } from './input-components/date-range-input/date-range-input.component';
import { DateRangePickerModule } from '../date-range-picker';
import { FormsModule } from '@angular/forms';
import { HoverActionModule } from '../../directives/hover-action';
import { MenuModule } from '../menu';
import { IconModule } from '../icon';
import { DisplayValuePipe } from './pipes/display-value.pipe';

const EXPORTS = [
    TextInputComponent,
    NumberInputComponent,
    SelectInputComponent,
    DateInputComponent,
    DateRangeInputComponent,
    LogicalExpressionBuilderComponent,
];

const DECLARATIONS = [
    ...EXPORTS,
    LebGroupComponent,
    LebConditionComponent,
    L10nPipe,
    DisplayValuePipe
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
    MenuModule,
    IconModule
  ],
    exports: [...EXPORTS],
    declarations: DECLARATIONS,
    providers: [LogicalExpressionBuilderService, L10nPipe, DatePipe]
})
export class LogicalExpressionBuilderModule {
}
