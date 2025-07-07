import { NgModule } from '@angular/core';
import { StringFilterPipe } from './string-filter.pipe';

@NgModule({
  exports: [StringFilterPipe],
  declarations: [StringFilterPipe],
})
export class StringFilterModule {}
