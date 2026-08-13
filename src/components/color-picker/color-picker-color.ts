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

import { ThemeColor } from '../../services/color/index';
import { ColorPickerInputMode } from './color-picker.type';

/**
 * Type representing a color, including its descriptive name.
 */
export class ColorPickerColor {
  /**
   * Human-readable name of the color.
   */
  name: string;

  /**
   * Hex value of the color, e.g. `#ffffff`.
   */
  get hex(): string {
    return this._originalHexValue ? this._originalHexValue : this._color.toHex();
  }

  /**
   * RGBA value of the color, e.g. `rgba(255, 255, 255, 1)`.
   */
  get rgba(): string {
    return this._originalRgbaValue ? this._originalRgbaValue : this._color.toRgba();
  }

  get r(): number {
    return parseInt(this._color.getRed());
  }

  get g(): number {
    return parseInt(this._color.getGreen());
  }

  get b(): number {
    return parseInt(this._color.getBlue());
  }

  get a(): number {
    return parseFloat(this._color.getAlpha());
  }

  private readonly _color: ThemeColor;
  private readonly _originalHexValue: string;
  private readonly _originalRgbaValue: string;

  constructor(name: string, value: string, inputMode?: ColorPickerInputMode) {
    this.name = name;
    this._color = ThemeColor.parse(value);

    // Preserve the format entered by the user if it's valid
    if (inputMode === 'hex') {
      this._originalHexValue = value;
    } else if (inputMode === 'rgba') {
      this._originalRgbaValue = value;
    }
  }

  toString(): string {
    return this._color.toRgba();
  }
}
