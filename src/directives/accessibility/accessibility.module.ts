import { NgModule } from '@angular/core';
import { FocusWithinDirective } from './focus-within/focus-within.directive';

@NgModule({
    declarations: [
        FocusWithinDirective
    ],
    exports: [
        FocusWithinDirective
    ]
})
export class AccessibilityModule {}