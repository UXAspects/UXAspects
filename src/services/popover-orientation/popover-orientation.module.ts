import { NgModule } from '@angular/core';
import { ResizeModule } from '../../directives/resize/index';
import { PopoverOrientationService } from './popover-orientation.service';

@NgModule({
  imports: [ResizeModule],
  providers: [PopoverOrientationService],
})
export class PopoverOrientationServiceModule {}
