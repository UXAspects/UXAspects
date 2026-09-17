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

import { Directive, ElementRef, inject, OnDestroy, OnInit } from '@angular/core';
import { ManagedFocusContainerService } from './managed-focus-container.service';

@Directive({ selector: '[uxManagedFocusContainer]' })
export class ManagedFocusContainerDirective implements OnInit, OnDestroy {
  private readonly _elementRef = inject(ElementRef);

  private readonly _managedFocusContainerService = inject(ManagedFocusContainerService);

  ngOnInit(): void {
    this._managedFocusContainerService.register(this._elementRef.nativeElement, this);
  }

  ngOnDestroy(): void {
    this._managedFocusContainerService.unregister(this._elementRef.nativeElement, this);
  }
}
