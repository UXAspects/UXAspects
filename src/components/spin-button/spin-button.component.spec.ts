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

import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SpinButtonModule } from './spin-button.module';

@Component({
  selector: 'app-spin-button-test',
  template: `
    <ux-spin-button [(value)]="value" [maxLength]="maxLength" type="type"> </ux-spin-button>
  `,
  imports: [SpinButtonModule],
})
export class SpinButtonTestComponent {
  value: number | string;
  maxLength = 2;
  type = 'number';
}

describe('Spin Button Component', () => {
  let component: SpinButtonTestComponent;
  let fixture: ComponentFixture<SpinButtonTestComponent>;
  let nativeElement: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SpinButtonModule, SpinButtonTestComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpinButtonTestComponent);
    component = fixture.componentInstance;
    nativeElement = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should allow numbers to be entered within maxLength', async () => {
    const input = nativeElement.querySelector<HTMLInputElement>('input');

    component.value = 20;
    fixture.detectChanges();
    await fixture.whenStable();

    expect(input.value).toBe('20');
  });

  it('should not allow value greater than maxLength value to be entered', async () => {
    const input = nativeElement.querySelector<HTMLInputElement>('input');

    component.value = 203;
    input.dispatchEvent(new Event('input'));

    fixture.detectChanges();
    await fixture.whenStable();

    expect(input.value).toBe('');
  });

  it('should not allow e to be entered when type is number', async () => {
    const input = nativeElement.querySelector<HTMLInputElement>('input');

    component.value = 'e';
    input.dispatchEvent(new Event('input'));

    fixture.detectChanges();
    await fixture.whenStable();

    expect(input.value).toBe('');
  });

  it('should allow e to be entered when type is text', async () => {
    component.type = 'text';
    fixture.detectChanges();

    const input = nativeElement.querySelector<HTMLInputElement>('input');

    component.value = 'e';
    input.dispatchEvent(new Event('input'));

    fixture.detectChanges();
    await fixture.whenStable();

    expect(input.value).toBe('');
  });
});
