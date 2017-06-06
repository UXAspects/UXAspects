import { NgModule } from '@angular/core';
import { FocusIfDirective } from './focus-if.directive';


@NgModule({
    exports: [FocusIfDirective],
    declarations: [FocusIfDirective]
})
export class FocusIfModule { }
