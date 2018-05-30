import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClickOutsideModule } from '../../directives/click-outside/index';
import { PopoverComponent } from './popover.component';
import { PopoverDirective } from './popover.directive';

@NgModule({
  imports: [
    CommonModule,
    OverlayModule,
    ClickOutsideModule
  ],
  exports: [PopoverDirective],
  declarations: [PopoverComponent, PopoverDirective],
  entryComponents: [PopoverComponent]
})
export class PopoverModule { }
