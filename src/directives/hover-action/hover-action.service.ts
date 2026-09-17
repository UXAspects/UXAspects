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

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HoverActionDirective } from './hover-action.directive';

@Injectable()
export class HoverActionService {
  active: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  private _focused: boolean = false;
  private _hovered: boolean = false;
  private _actions: HoverActionDirective[] = [];

  register(action: HoverActionDirective): void {
    this._actions.push(action);
  }

  unregister(action: HoverActionDirective): void {
    this._actions = this._actions.filter(actn => actn !== action);
  }

  setFocusState(focus: boolean): void {
    this._focused = focus;
    this.updateVisibility();
  }

  setHoverState(hover: boolean): void {
    this._hovered = hover;
    this.updateVisibility();
  }

  updateVisibility(): void {
    this.active.next(this._focused || this._hovered || this.actionHasFocus());
  }

  private actionHasFocus(): boolean {
    return !!this.getFocusedAction();
  }

  private getFocusedAction(): HoverActionDirective {
    return this._actions.find(action => action.focused);
  }
}
