import { NgModule } from '@angular/core';
import { DurationPipe } from './duration.pipe';

@NgModule({
  imports: [DurationPipe],
  exports: [DurationPipe],
})
export class DurationPipeModule {}
