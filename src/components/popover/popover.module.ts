import { ObserversModule } from '@angular/cdk/observers';
import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClickOutsideModule } from '../../directives/click-outside/index';
import { TooltipModule } from '../tooltip/index';
import { PopoverComponent } from './popover.component';
import { PopoverDirective } from './popover.directive';

@NgModule({
  imports: [
    CommonModule,
    OverlayModule,
    ObserversModule,
    ClickOutsideModule,
    TooltipModule
  ],
  exports: [PopoverDirective],
  declarations: [PopoverComponent, PopoverDirective],
  entryComponents: [PopoverComponent]
})
export class PopoverModule { }
