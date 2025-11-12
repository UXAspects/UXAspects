import { NgModule } from '@angular/core';
import { ResizeDirective } from './resize.directive';
import { ResizeService } from './resize.service';

@NgModule({
  imports: [ResizeDirective],
  exports: [ResizeDirective],
  providers: [ResizeService],
})
export class ResizeModule {}
