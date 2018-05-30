import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TooltipComponent } from './tooltip.component';
import { TooltipDirective } from './tooltip.directive';

@NgModule({
  imports: [
    CommonModule,
    OverlayModule
  ],
  exports: [TooltipDirective],
  declarations: [TooltipComponent, TooltipDirective],
  entryComponents: [TooltipComponent]
})
export class TooltipModule { }
