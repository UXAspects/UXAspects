import { NgModule } from '@angular/core';
import { ResizeModule } from '../resize/index';
import { FixedHeaderTableDirective } from './fixed-header-table.directive';

@NgModule({
  imports: [ResizeModule, FixedHeaderTableDirective],
  exports: [FixedHeaderTableDirective],
})
export class FixedHeaderTableModule {}
