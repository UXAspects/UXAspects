import { NgModule } from '@angular/core';
import { EboxComponent, EboxContentDirective, EboxHeaderDirective } from './ebox.component';

@NgModule({
  imports: [EboxComponent, EboxContentDirective, EboxHeaderDirective],
  exports: [EboxComponent, EboxContentDirective, EboxHeaderDirective],
})
export class EboxModule {}
