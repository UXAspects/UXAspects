import { NgModule } from '@angular/core';
import { ConduitZoneComponent } from './conduit-zone.component';
import { ConduitComponent } from './conduit.component';

/**
 * This module is not required to be imported but is required
 * by the Angular compiler, otherwise it will complain that
 * ConduitZoneComponent is not part of an NgModule and will
 * fail to build
 */
@NgModule({
  imports: [ConduitComponent, ConduitZoneComponent as any],
})
export class ConduitModule {}
