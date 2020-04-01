import { NgModule } from '@angular/core';
import { ColorServiceModule } from './../../services/color/color.module';
import { BadgeDirective } from './badge.directive';

@NgModule({
    exports: [BadgeDirective],
    declarations: [BadgeDirective],
    imports: [ColorServiceModule]
})
export class BadgeModule { }
