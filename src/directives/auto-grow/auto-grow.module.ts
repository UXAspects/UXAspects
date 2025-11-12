import { NgModule } from '@angular/core';
import { AutoGrowDirective } from './auto-grow.directive';

@NgModule({
  imports: [AutoGrowDirective],
  exports: [AutoGrowDirective],
})
export class AutoGrowModule {}
