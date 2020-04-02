import { NgModule } from "@angular/core";
import { ColorServiceModule } from "./../../services/color/color.module";
import { BadgeDirective } from "./badge.directive";

@NgModule({
    imports: [ColorServiceModule],
    exports: [BadgeDirective],
    declarations: [BadgeDirective]
})
export class BadgeModule {}
