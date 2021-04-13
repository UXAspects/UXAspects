import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccessibilityModule } from '../../directives/accessibility/index';
import { FocusIfModule } from '../../directives/focus-if/index';
import { DateTimePickerModule } from '../date-time-picker/date-time-picker.module';
import { IconModule } from '../icon/index';
import { PopoverModule } from '../popover/index';
import { SelectModule } from '../select/index';
import { SearchBuilderGroupComponent } from './search-builder-group/search-builder-group.component';
import { SearchBuilderOutletDirective } from './search-builder-outlet/search-builder-outlet.directive';
import { SearchBuilderComponent } from './search-builder.component';
import { BaseSearchComponent } from './search-components/base-search.component';
import { SearchDateRangeComponent } from './search-components/date-range/date-range.component';
import { SearchDateComponent } from './search-components/date/date.component';
import { SearchSelectComponent } from './search-components/select/select.component';
import { SearchTextComponent } from './search-components/text/text.component';

@NgModule({
    imports: [
        AccessibilityModule,
        CommonModule,
        DateTimePickerModule,
        FocusIfModule,
        FormsModule,
        IconModule,
        PopoverModule,
        SelectModule,
    ],
    exports: [
        SearchBuilderComponent,
        SearchBuilderGroupComponent,
        BaseSearchComponent
    ],
    declarations: [
        SearchBuilderComponent,
        SearchBuilderGroupComponent,
        SearchTextComponent,
        SearchDateComponent,
        SearchDateRangeComponent,
        SearchBuilderOutletDirective,
        SearchSelectComponent,
        BaseSearchComponent
    ],
    entryComponents: [
        SearchTextComponent,
        SearchDateComponent,
        SearchDateRangeComponent,
        SearchSelectComponent
    ]
})
export class SearchBuilderModule { }
