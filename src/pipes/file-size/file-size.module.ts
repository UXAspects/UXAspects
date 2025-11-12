import { NgModule } from '@angular/core';
import { FileSizePipe } from './file-size.pipe';

@NgModule({
  imports: [FileSizePipe],
  exports: [FileSizePipe],
})
export class FileSizePipeModule {}
