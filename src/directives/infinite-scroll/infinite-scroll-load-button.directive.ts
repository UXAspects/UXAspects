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

import {
  Directive,
  inject,
  Input,
  Output,
  Renderer2,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Directive({ selector: '[uxInfiniteScrollLoadButton]' })
export class InfiniteScrollLoadButtonDirective {
  private readonly _template = inject<TemplateRef<void>>(TemplateRef);

  private readonly _viewContainer = inject(ViewContainerRef);

  private readonly _renderer = inject(Renderer2);

  @Input('uxInfiniteScrollLoadButton')
  get visible() {
    return this._visible;
  }
  set visible(value: boolean) {
    if (value !== this._visible) {
      if (value) {
        const viewRef = this._viewContainer.createEmbeddedView(this._template);
        this._renderer.listen(viewRef.rootNodes[0], 'click', this.onClick.bind(this));
      } else {
        this._viewContainer.clear();
      }
    }

    this._visible = value;
  }

  @Output() loading: Observable<Event>;

  private _visible: boolean = false;
  private readonly _load = new Subject();

  constructor() {
    this.loading = this._load.asObservable() as Observable<Event>;
  }

  private onClick(event: MouseEvent) {
    this._load.next(event);
  }
}
