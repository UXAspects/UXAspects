import { NgModule } from '@angular/core';
import { OverflowDirective } from './overflow/overflow-observer.directive';

@NgModule({
  imports: [OverflowDirective],
  exports: [OverflowDirective],
})
export class ObserversModule {}
