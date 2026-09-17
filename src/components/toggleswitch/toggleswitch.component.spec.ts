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

import { ChangeDetectionStrategy } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToggleSwitchComponent } from './toggleswitch.component';
import { ToggleSwitchModule } from './toggleswitch.module';

describe('Toggle Switch Component', () => {
  let fixture: ComponentFixture<ToggleSwitchComponent>;
  let component: ToggleSwitchComponent;
  let nativeElement: HTMLElement;
  let valueChangeSpy: jasmine.Spy;
  let changeCallbackSpy: jasmine.Spy;
  let touchedCallbackSpy: jasmine.Spy;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ToggleSwitchModule],
    })
      .overrideComponent(ToggleSwitchComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default },
      })
      .compileComponents();

    fixture = TestBed.createComponent(ToggleSwitchComponent);
    component = fixture.componentInstance;
    nativeElement = fixture.nativeElement;
    valueChangeSpy = spyOn(component.valueChange, 'emit');
    changeCallbackSpy = spyOn(component, 'onChangeCallback');
    touchedCallbackSpy = spyOn(component, 'onTouchedCallback');
    fixture.detectChanges();
  });

  it('should initialise with the correct values', () => {
    expect(component).toBeTruthy();
    expect(component.value).toBe(false);
  });

  it('should not emit valueChange initially', () => {
    expect(valueChangeSpy).not.toHaveBeenCalled();
    expect(changeCallbackSpy).not.toHaveBeenCalled();
    expect(touchedCallbackSpy).not.toHaveBeenCalled();
  });

  it('should not emit valueChange when the value input changes', async () => {
    component.value = true;
    fixture.detectChanges();
    await fixture.whenStable();
    expect(valueChangeSpy).not.toHaveBeenCalled();
    expect(changeCallbackSpy).not.toHaveBeenCalled();
    expect(touchedCallbackSpy).not.toHaveBeenCalled();
  });

  it('should not emit valueChange when the value input changes via ngModel or form control', async () => {
    component.writeValue(true);
    fixture.detectChanges();
    await fixture.whenStable();
    expect(valueChangeSpy).not.toHaveBeenCalled();
    expect(changeCallbackSpy).not.toHaveBeenCalled();
    expect(touchedCallbackSpy).not.toHaveBeenCalled();
  });

  it('should emit valueChange whenever the user toggle the input via clicking', async () => {
    expect(component.value).toBeFalsy();
    await toggle();

    expect(component.value).toBeTruthy();

    expect(valueChangeSpy).toHaveBeenCalledWith(true);
    expect(valueChangeSpy).toHaveBeenCalledTimes(1);

    expect(changeCallbackSpy).toHaveBeenCalledWith(true);
    expect(changeCallbackSpy).toHaveBeenCalledTimes(1);

    expect(touchedCallbackSpy).toHaveBeenCalled();
    expect(touchedCallbackSpy).toHaveBeenCalledTimes(1);

    await toggle();

    expect(component.value).toBeFalsy();

    expect(valueChangeSpy).toHaveBeenCalledWith(false);
    expect(valueChangeSpy).toHaveBeenCalledTimes(2);

    expect(changeCallbackSpy).toHaveBeenCalledWith(false);
    expect(changeCallbackSpy).toHaveBeenCalledTimes(2);

    expect(touchedCallbackSpy).toHaveBeenCalled();
    expect(touchedCallbackSpy).toHaveBeenCalledTimes(2);
  });

  it('should not allow toggling whenever the toggle switch is disabled via disabled input', async () => {
    component.disabled = true;
    await toggle();
    fixture.detectChanges();
    await fixture.whenStable();

    expect(component.value).toBeFalsy();
    expect(valueChangeSpy).not.toHaveBeenCalled();
    expect(changeCallbackSpy).not.toHaveBeenCalled();
    expect(touchedCallbackSpy).not.toHaveBeenCalled();
  });

  it('should not allow toggling whenever the toggle switch is disabled via Angular forms', async () => {
    component.setDisabledState(true);
    await toggle();
    fixture.detectChanges();
    await fixture.whenStable();

    expect(component.value).toBeFalsy();
    expect(valueChangeSpy).not.toHaveBeenCalled();
    expect(changeCallbackSpy).not.toHaveBeenCalled();
    expect(touchedCallbackSpy).not.toHaveBeenCalled();
  });

  it('should not allow toggling whenever the toggle switch is marked as not clickable', async () => {
    component.clickable = false;
    await toggle();
    fixture.detectChanges();
    await fixture.whenStable();

    expect(component.value).toBeFalsy();
    expect(valueChangeSpy).not.toHaveBeenCalled();
    expect(changeCallbackSpy).not.toHaveBeenCalled();
    expect(touchedCallbackSpy).not.toHaveBeenCalled();
  });

  it('should add a required attribute to the input when required is true', () => {
    component.required = true;

    fixture.detectChanges();

    const inputElementEmpty = nativeElement.querySelector<HTMLInputElement>(
      'input.ux-toggleswitch-input'
    );
    const attributeRequired = inputElementEmpty.hasAttribute('required');

    expect(attributeRequired).toBe(true);
  });

  function getInput(): HTMLInputElement {
    return nativeElement.querySelector('input');
  }

  async function toggle(): Promise<void> {
    getInput().click();
    fixture.detectChanges();
    await fixture.whenStable();
  }
});
