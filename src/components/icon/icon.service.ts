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

import { inject, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ICON_OPTIONS_TOKEN } from './icon-options.token';
import { IconDefinition, SingleIconDefinition } from './iconsets/iconset.interface';
import { uxIconset } from './iconsets/ux-iconset';

@Injectable()
export class IconService {
  readonly options = inject(ICON_OPTIONS_TOKEN, { optional: true });

  private readonly _iconService = inject(IconService, { optional: true, skipSelf: true });

  /** Emit whenever the iconset changes */
  iconsChanged$ = new Subject<IconChangeEvent>();

  /** Store a list of all icon */
  private _icons: ReadonlyArray<SingleIconDefinition> = [...uxIconset];

  /** Inject a parent service if one exists */
  constructor() {
    // if the iconset was defined at the root or child module level apply this configuration
    if (this.options && this.options.icons) {
      this.setIcons(this.options.icons);
    }
  }

  /** Define multiple icon definitions. This will override icon definitions if a name and size collision occurs */
  setIcons(icons: ReadonlyArray<IconDefinition>): void {
    icons.forEach(icon => this.setIcon(icon));
  }

  /** Provide an icon definition which will override if necessary */
  setIcon({ name, icon, iconset, size }: IconDefinition): void {
    // if there are multiple sizes specified add them all as individual records
    if (Array.isArray(size)) {
      return size.forEach(variant => this.setIcon({ name, icon, iconset, size: variant }));
    }

    // remove any existing definition with the same parameters
    this._icons = this._icons.filter(
      definition => !(definition.name === name && definition.size === size)
    );

    // insert the new definition
    this._icons = [...this._icons, { name, icon, iconset, size }];

    // emit the icon change
    this.iconsChanged$.next({ name, size });
  }

  /** Find an icon based on the given name and size if provided */
  getIcon(name: string, size?: string): SingleIconDefinition {
    // if no name was specified then do nothing (this can occur if the name input on the component is not initially defined)
    if (!name) {
      return;
    }

    // if there is a size specified then check for an exact match
    if (size) {
      // get an icon definition that matches both name and size
      const sizedIcon = this._icons.find(
        definition => definition.name === name && definition.size === size
      );

      // if there is a match then return otherwise fallthrough to the default
      if (sizedIcon) {
        return sizedIcon;
      }
    }

    // find a general match with no size constraint
    const icon = this._icons.find(
      definition => definition.name === name && definition.size === undefined
    );

    // if no match is found and there is a parent service then we should check it
    if (!icon && this._iconService) {
      return this._iconService.getIcon(name, size);
    } else if (!icon) {
      console.warn(`Icon '${name}' was not found.`);
    }

    return icon;
  }
}

export interface IconChangeEvent {
  name: string;
  size?: string;
}
