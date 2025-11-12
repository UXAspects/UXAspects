import { ObserversModule } from '@angular/cdk/observers';
import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TooltipComponent } from './tooltip.component';
import { TooltipDirective } from './tooltip.directive';
import { TooltipService } from './tooltip.service';

@NgModule({
  imports: [CommonModule, OverlayModule, ObserversModule, TooltipComponent, TooltipDirective],
  exports: [TooltipDirective, TooltipComponent],
  providers: [TooltipService],
})
export class TooltipModule {}
