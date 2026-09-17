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

import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Directive, inject, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({ selector: '[uxInfiniteScrollLoading]' })
export class InfiniteScrollLoadingDirective {
  private readonly _templateRef = inject<TemplateRef<void>>(TemplateRef);

  private readonly _viewContainer = inject(ViewContainerRef);

  @Input('uxInfiniteScrollLoading')
  get visible() {
    return this._visible;
  }
  set visible(value: boolean | string) {
    value = coerceBooleanProperty(value);

    if (value !== this._visible) {
      if (value) {
        this._viewContainer.createEmbeddedView(this._templateRef);
      } else {
        this._viewContainer.clear();
      }
    }

    this._visible = value;
  }

  private _visible: boolean = false;
}
