import { A11yModule } from '@angular/cdk/a11y';
import { NgModule } from '@angular/core';
import { FocusWithinDirective } from './focus-within/focus-within.directive';
import { SplitterAccessibilityDirective } from './splitter/splitter-accessibility.directive';
import { TabbableListItemDirective } from './tabbable-list/tabbable-list-item.directive';
import { TabbableListDirective } from './tabbable-list/tabbable-list.directive';

@NgModule({
    declarations: [
        FocusWithinDirective,
        TabbableListDirective,
        TabbableListItemDirective,
        SplitterAccessibilityDirective
    ],
    imports: [
        A11yModule
    ],
    exports: [
        FocusWithinDirective,
        TabbableListDirective,
        TabbableListItemDirective,
        SplitterAccessibilityDirective,
    ]
})
export class AccessibilityModule {}