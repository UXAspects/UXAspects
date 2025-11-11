import { NgModule } from '@angular/core';
import { StringFilterPipe } from './string-filter.pipe';

@NgModule({
  imports: [StringFilterPipe],
  exports: [StringFilterPipe],
})
export class StringFilterModule {}
