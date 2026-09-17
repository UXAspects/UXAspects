///
/// Copyright 2015-2026 Micro Focus or one of its affiliates.
///
/// Licensed under the Apache License, Version 2.0 (the "License");
/// you may not use this file except in compliance with the License.
/// You may obtain a copy of the License at
///
///      http://www.apache.org/licenses/LICENSE-2.0
///
/// Unless required by applicable law or agreed to in writing, software
/// distributed under the License is distributed on an "AS IS" BASIS,
/// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
/// See the License for the specific language governing permissions and
/// limitations under the License.
///

import { Directive, inject, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { ConduitZone } from './conduit-zone.service';
import { ConduitProperties } from './interfaces/conduit-properties';

@Directive({ selector: 'ux-conduit' })
export class ConduitComponent implements OnInit, OnDestroy {
  protected _zone = inject(ConduitZone, { optional: true });

  /** We need to register the conduits with the zone when the component is initialised */
  ngOnInit(): void {
    // register the conduit in the zone and ensure it gets the correct instance of the target
    this._zone.registerConduits(this);
  }

  /** We need to unregister the conduits when the component is destroyed */
  ngOnDestroy(): void {
    this._zone.unregisterConduits(this);
  }

  /** Alter the properties of a conduit dynamically */
  setConduitProperties(subject: Subject<string>, properties: Partial<ConduitProperties>): void {
    this._zone.setConduitProperties(subject, properties);
  }

  /** Programmatically create a conduit at runtime */
  createConduit(subject: Subject<void>, properties: ConduitProperties): void {
    this._zone.createConduit(subject, properties);
  }
}
