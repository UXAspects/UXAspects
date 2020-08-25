import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { A11yModule } from '@angular/cdk/a11y';
import { SelectModule } from '../select/select.module';
import { NumberPickerModule } from '../number-picker/number-picker.module';
import { DateTimePickerModule } from '../date-time-picker/date-time-picker.module';
import { AccessibilityModule } from '../../directives/accessibility/accessibility.module';
import { PopoverModule } from '../popover/popover.module';
import { DateRangePickerModule } from '../date-range-picker/date-range-picker.module';
import { HoverActionModule } from '../../directives/hover-action/hover-action.module';
import { MenuModule } from '../menu/menu.module';
import { IconModule } from '../icon/icon.module';
import { AlertModule } from '../alert/alert.module';
import { LogicalExpressionBuilderComponent } from './logical-expression-builder.component';
import { LebGroupComponent } from './leb-group/leb-group.component';
import { LebConditionComponent } from './leb-condition/leb-condition.component';
import { ExpressionRowDirective } from './directives/expression-row.directive';
import { TextInputComponent } from './input-components/text-input/text-input.component';
import { NumberInputComponent } from './input-components/number-input/number-input.component';
import { SelectInputComponent } from './input-components/select-input/select-input.component';
import { DateInputComponent } from './input-components/date-input/date-input.component';
import { DateRangeInputComponent } from './input-components/date-range-input/date-range-input.component';
import { L10nPipe } from './pipes/l10n.pipe';
import { DisplayValuePipe } from './pipes/display-value.pipe';
import { RowPathPipe } from './leb-group/row-path.pipe';
import { DateFormatterPipeModule } from '../../pipes/date-formatter/date-formatter.module';

const EXPORTS = [
    TextInputComponent,
    NumberInputComponent,
    SelectInputComponent,
    DateInputComponent,
    DateRangeInputComponent,
    LogicalExpressionBuilderComponent,
    LebGroupComponent,
    LebConditionComponent,
    ExpressionRowDirective
];

const DECLARATIONS = [
    ...EXPORTS,
    L10nPipe,
    DisplayValuePipe,
    RowPathPipe
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
        IconModule,
        A11yModule,
        AlertModule,
        DateFormatterPipeModule
    ],
    exports: [...EXPORTS],
    declarations: DECLARATIONS,
})
export class LogicalExpressionBuilderModule {
}
