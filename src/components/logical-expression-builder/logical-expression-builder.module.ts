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
import { LebTextInputComponent } from './input-components/text-input/leb-text-input.component';
import { LebNumberInputComponent } from './input-components/number-input/leb-number-input.component';
import { LebSelectInputComponent } from './input-components/select-input/leb-select-input.component';
import { LebDateInputComponent } from './input-components/date-input/leb-date-input.component';
import { LebDateRangeInputComponent } from './input-components/date-range-input/leb-date-range-input.component';
import { L10nPipe } from './pipes/l10n.pipe';
import { DisplayValuePipe } from './pipes/display-value.pipe';
import { RowPathPipe } from './leb-group/row-path.pipe';
import { DateFormatterPipeModule } from '../../pipes/date-formatter/date-formatter.module';

const EXPORTS = [
    LebTextInputComponent,
    LebNumberInputComponent,
    LebSelectInputComponent,
    LebDateInputComponent,
    LebDateRangeInputComponent,
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
