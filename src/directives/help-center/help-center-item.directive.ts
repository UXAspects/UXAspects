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

import { Directive, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { HelpCenterItem, HelpCenterService } from './help-center.service';

@Directive({ selector: '[uxHelpCenterItem]' })
export class HelpCenterItemDirective implements OnInit, OnDestroy {
  private readonly _helpCenterService = inject(HelpCenterService);

  @Input() uxHelpCenterItem: HelpCenterItem;

  ngOnInit(): void {
    // register the item in the service
    this._helpCenterService.registerItem(this.uxHelpCenterItem);
  }

  ngOnDestroy(): void {
    // remove this item when it is destroyed
    this._helpCenterService.unregisterItem(this.uxHelpCenterItem);
  }
}
