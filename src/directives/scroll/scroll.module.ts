import { NgModule } from '@angular/core';
import { ScrollIntoViewIfDirective } from './scroll-into-view-if.directive';
import { ScrollIntoViewDirective } from './scroll-into-view.directive';


@NgModule({
    exports: [ScrollIntoViewIfDirective, ScrollIntoViewDirective],
    declarations: [ScrollIntoViewIfDirective, ScrollIntoViewDirective]
})
export class ScrollModule { }