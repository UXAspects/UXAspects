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
import { ThemeColor } from '../../../services/color/index';

@Injectable()
export class ContrastService {
  /**
   * Calculate the contract ratio between two colors.
   * This uses the official WCAG Color Contrast Ratio
   * Algorithm: https://www.w3.org/TR/WCAG20-TECHS/G17.html
   */
  getContrastColor(
    backgroundColor: ThemeColor,
    lightColor: ThemeColor,
    darkColor: ThemeColor
  ): ThemeColor {
    // get a ThemeColor from the ColorPickerColor
    const themeColor = ThemeColor.parse(backgroundColor.toHex());

    const background = this.getLuminance(themeColor);
    const light = this.getLuminance(lightColor);
    const dark = this.getLuminance(darkColor);

    // determine the contrast for both black and white
    const whiteContrast = (light + 0.05) / (background + 0.05);
    const blackContrast = (background + 0.05) / (dark + 0.05);

    // return the color with the most contrast ratio
    return blackContrast > whiteContrast ? darkColor : lightColor;
  }

  private getLuminance(color: ThemeColor): number {
    // normalize the colors
    let r = +color.getRed() / 255;
    let g = +color.getGreen() / 255;
    let b = +color.getBlue() / 255;

    // calculate the value required for each color component
    r = r <= 0.03928 ? r / 12.92 : Math.pow((r + 0.055) / 1.055, 2.4);
    g = g <= 0.03928 ? g / 12.92 : Math.pow((g + 0.055) / 1.055, 2.4);
    b = b <= 0.03928 ? b / 12.92 : Math.pow((b + 0.055) / 1.055, 2.4);

    // return the luminance
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  }
}
