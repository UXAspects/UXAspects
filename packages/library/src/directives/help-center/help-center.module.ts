import { NgModule } from '@angular/core';
import { HelpCenterItemDirective } from './help-center-item.directive';
import { HelpCenterService } from './help-center.service';

@NgModule({
    imports: [],
    exports: [HelpCenterItemDirective],
    declarations: [HelpCenterItemDirective],
    providers: [HelpCenterService],
})
export class HelpCenterModule { }
