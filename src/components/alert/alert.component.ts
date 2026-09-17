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
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  EventEmitter,
  inject,
  Input,
  Output,
} from '@angular/core';
import { FocusIndicatorDirective } from '../../directives/accessibility/focus-indicator/focus-indicator.directive';
import { ColorService } from '../../services/color/index';
import { IconComponent } from '../icon/icon.component';
import { AlertIconDirective } from './alert-icon.directive';

@Component({
  selector: 'ux-alert',
  templateUrl: './alert.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    role: 'alert',
    '[class.ux-alert-info]': 'type === "info" && !_isCustomColor',
    '[class.ux-alert-error]': 'type === "error" && !_isCustomColor',
    '[class.ux-alert-warning]': 'type === "warning" && !_isCustomColor',
    '[class.ux-alert-success]': 'type === "success" && !_isCustomColor',
    '[class.ux-alert-dark]': 'type === "dark" && !_isCustomColor',
    '[style.background-color]': '_backgroundColor',
    '[style.color]': '_foregroundColor',
  },
  imports: [FocusIndicatorDirective, IconComponent],
})
export class AlertComponent {
  private readonly colorService = inject(ColorService);

  /** Determine the style of the alert */
  @Input() type: AlertType = 'info';

  /** Determine the the alert can be dismissed */
  @Input() dismissible: boolean = false;

  /** Define a custom background color */
  @Input() backgroundColor: string;

  /** Define a custom foreground color */
  @Input() foregroundColor: string;

  /** Define a custom aria label for the dismiss button */
  @Input() dismissAriaLabel: string = 'Dismiss Alert';

  /** Emit when the dismiss button is pressed */
  @Output() dismiss = new EventEmitter<void>();

  /** Identify if we have an icon */
  @ContentChild(AlertIconDirective, { static: false }) icon: AlertIconDirective;

  /** Resolve the background color from the color set */
  get _backgroundColor(): string {
    return this.backgroundColor ? this.getColor(this.backgroundColor) : null;
  }

  /** Resolve the foreground color from the color set */
  get _foregroundColor(): string {
    return this.foregroundColor ? this.getColor(this.foregroundColor) : null;
  }

  /** Determine if we are using a prefined type or custom colors */
  get _isCustomColor(): boolean {
    return !!this.backgroundColor && !!this.foregroundColor;
  }

  private getColor(color: string): string | null {
    // check if it is a color name from the color palette or just return the CSS color value
    return this.colorService.resolve(color);
  }
}

export type AlertType = 'info' | 'error' | 'warning' | 'success' | 'dark';
