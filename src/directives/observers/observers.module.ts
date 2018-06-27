import { NgModule } from '@angular/core';
import { OverflowDirective } from './overflow/overflow-observer.directive';

@NgModule({
  exports: [OverflowDirective],
  declarations: [OverflowDirective]
})
export class ObserversModule { }
