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
    declarations: [
        ConduitComponent,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ConduitZoneComponent as any // Any is required as this is an abstract class
    ]
})
export class ConduitModule { }
