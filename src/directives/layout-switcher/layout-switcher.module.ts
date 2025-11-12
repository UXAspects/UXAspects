import { NgModule } from '@angular/core';
import { ResizeModule } from '../resize/index';
import { LayoutSwitcherItemDirective } from './layout-switcher-item.directive';
import { LayoutSwitcherDirective } from './layout-switcher.directive';

const DECLARATIONS = [LayoutSwitcherDirective, LayoutSwitcherItemDirective];

@NgModule({
  imports: [ResizeModule, ...DECLARATIONS],
  exports: DECLARATIONS,
  providers: [],
})
export class LayoutSwitcherModule {}
