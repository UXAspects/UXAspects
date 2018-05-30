import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { OutsideClickModule } from '../../directives/outside-click/index';
import { PopoverComponent } from './popover.component';
import { PopoverDirective } from './popover.directive';

@NgModule({
  imports: [
    CommonModule,
    OverlayModule,
    OutsideClickModule
  ],
  exports: [PopoverDirective],
  declarations: [PopoverComponent, PopoverDirective],
  entryComponents: [PopoverComponent]
})
export class PopoverModule { }
