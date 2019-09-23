import { NgModule } from '@angular/core';
import { ClickOutsideDirective } from './click-outside.directive';


@NgModule({
    exports: [ClickOutsideDirective],
    declarations: [ClickOutsideDirective]
})
export class ClickOutsideModule { }
