import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ProgressBarComponent } from './progress-bar.component';

@NgModule({
  imports: [CommonModule],
  exports: [ProgressBarComponent],
  declarations: [ProgressBarComponent],
})
export class ProgressBarModule {}
