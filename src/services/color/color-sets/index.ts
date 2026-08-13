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

import { InjectionToken } from '@angular/core';
import { KEPPEL_COLOR_SET } from './keppel-color-set';
import { MICRO_FOCUS_COLOR_SET } from './micro-focus-color-set';

export const colorSets = {
  keppel: {
    colorValueSet: KEPPEL_COLOR_SET,
  },
  microFocus: {
    colorValueSet: MICRO_FOCUS_COLOR_SET,
  },
};

export type ColorSet = {
  colorValueSet: { [key: string]: string };
};

/** Provide a default color set for an application */
export const COLOR_SET_TOKEN = new InjectionToken<ColorSet>('COLOR_SET_TOKEN');
