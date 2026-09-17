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

import { Directive, HostBinding, inject, Input } from '@angular/core';
import { ColorService, ThemeColor } from '../../../services/color/index';
import { ContrastService } from './contrast.service';

@Directive({ selector: '[uxColorContrast]' })
export class ColorContrastDirective {
  private readonly _colorService = inject(ColorService);

  private readonly _contrastService = inject(ContrastService);

  /**
   * Define the background color for contrast comparison.
   * This can be a CSS color value or the name of a
   * color from the color palette.
   */
  @Input() set uxColorContrast(backgroundColor: string) {
    this._backgroundColor = ThemeColor.parse(this._colorService.resolve(backgroundColor));
  }

  /**
   * Define the light color for contrast comparison.
   * This can be a CSS color value or the name of a
   * color from the color palette.
   */
  @Input() set lightColor(lightColor: string) {
    this._lightColor = ThemeColor.parse(this._colorService.resolve(lightColor));
  }

  /**
   * Define the dark color for contrast comparison.
   * This can be a CSS color value or the name of a
   * color from the color palette.
   */
  @Input() set darkColor(darkColor: string) {
    this._darkColor = ThemeColor.parse(this._colorService.resolve(darkColor));
  }

  /** Determine the color to set based on the supplied parameters */
  @HostBinding('style.color')
  get _color(): string | null {
    return this._backgroundColor
      ? this._contrastService
          .getContrastColor(this._backgroundColor, this._lightColor, this._darkColor)
          .toRgba()
      : null;
  }

  /** Store the background color as a ThemeColor object */
  private _backgroundColor: ThemeColor;

  /** Store the light color as a ThemeColor object */
  private _lightColor: ThemeColor = ThemeColor.parse('#fff');

  /** Store the light color as a ThemeColor object */
  private _darkColor: ThemeColor = ThemeColor.parse('#000');
}
