import { NgModule } from '@angular/core';
import { PopoverOrientationService } from './popover-orientation.service';
import { ResizeModule } from '../../directives/resize/index';

@NgModule({
    imports: [ResizeModule],
    providers: [PopoverOrientationService]
})
export class PopoverOrientationServiceModule { }
