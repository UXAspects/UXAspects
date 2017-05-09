import { StringFilterPipe } from './string-filter.pipe';
import { NgModule } from '@angular/core';

@NgModule({
    exports: [StringFilterPipe],
    declarations: [StringFilterPipe]
})
export class StringFilterModule { }
