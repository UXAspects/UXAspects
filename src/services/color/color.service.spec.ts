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

import { TestBed } from '@angular/core/testing';
import { ColorServiceModule } from '.';
import { colorSets } from './color-sets';
import { ColorService } from './color.service';

describe('Color Service - Micro Focus Color Set', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [ColorServiceModule.forRoot(colorSets.microFocus)],
      providers: [ColorService],
    })
  );

  it('should return the correct rgb values for aliases', () => {
    const service: ColorService = TestBed.inject(ColorService);

    expect(service.getColor('critical').toRgb()).toBe('rgb(229, 0, 76)');
    expect(service.getColor('danger').toRgb()).toBe('rgb(244, 139, 52)');
    expect(service.getColor('warning').toRgb()).toBe('rgb(252, 219, 31)');
    expect(service.getColor('ok').toRgb()).toBe('rgb(26, 172, 96)');
    expect(service.getColor('info').toRgb()).toBe('rgb(0, 171, 243)');
  });
});
