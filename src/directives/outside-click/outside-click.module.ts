import { NgModule } from '@angular/core';
import { OutsideClickDirective } from './outside-click.directive';


@NgModule({
    exports: [OutsideClickDirective],
    declarations: [OutsideClickDirective]
})
export class OutsideClickModule { }
