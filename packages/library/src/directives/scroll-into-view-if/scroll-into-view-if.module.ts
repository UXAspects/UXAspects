import { NgModule } from '@angular/core';

import { ScrollIntoViewIfDirective } from './scroll-into-view-if.directive';
import { ScrollIntoViewService } from './scroll-into-view.service';

@NgModule({
    imports: [],
    exports: [ScrollIntoViewIfDirective],
    declarations: [ScrollIntoViewIfDirective],
    providers: [ScrollIntoViewService],
})
export class ScrollIntoViewIfModule { }
