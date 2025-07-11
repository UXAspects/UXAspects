import { A11yModule } from '@angular/cdk/a11y';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AccessibilityModule } from '../../directives/accessibility/index';
import { ResizeModule } from '../../directives/resize/index';
import { ColorServiceModule } from '../../services/color/index';
import { PartitionMapSegmentEventsDirective } from './events/partition-map-segment-events.directive';
import { PartitionMapComponent } from './partition-map.component';

@NgModule({
  imports: [A11yModule, AccessibilityModule, CommonModule, ColorServiceModule, ResizeModule],
  declarations: [PartitionMapComponent, PartitionMapSegmentEventsDirective],
  exports: [PartitionMapComponent, PartitionMapSegmentEventsDirective],
})
export class PartitionMapModule {}
