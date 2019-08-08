import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectCustomComponent } from './select-custom.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ElementRef } from '@angular/core';
import { IconModule } from '../icon';
import { MenuModule } from '../menu';

describe('SelectCustomComponent', () => {
  let component: SelectCustomComponent;
  let fixture: ComponentFixture<SelectCustomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SelectCustomComponent],
      imports: [CommonModule, FormsModule, IconModule, MenuModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectCustomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.rootElement = new ElementRef({classList: {contains: () => true}});
    component.filterInputElement = new ElementRef({focus: () => true});
    component.filterChangeDebounce = 0;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should reset filter correctly', () => {
    spyOn(component.filterInputElement.nativeElement, 'focus');
    spyOn(component.filterTextChanged$, 'next');

    component.resetFilter(new MouseEvent('click'));

    fixture.detectChanges();

    expect(component.filterTextChanged$.next).toHaveBeenCalledWith('');
    expect(component.filterInputElement.nativeElement.focus).toHaveBeenCalledWith();
  });

  it('should focus filter when toggling drop-down', (done) => {
    const focusSpy = spyOn(component.filterInputElement.nativeElement, 'focus');

    component.onToggle();

    setTimeout(() => {
      expect(focusSpy).toHaveBeenCalledWith();
      done();
    }, 100);
  });

  it('should write value', () => {
    spyOn(component.selectedChange, 'emit');
    const newValue = 'Bla';

    component.writeValue(newValue);

    expect(component.selected).toEqual(newValue);
    expect(component.selectedChange.emit).toHaveBeenCalledWith(newValue);
  });

  it('should register onChange', () => {
    const callbackObject = {callback: () => true};
    spyOn(callbackObject, 'callback');
    const newValue = 'Blubb';

    component.registerOnChange(callbackObject.callback);
    component.onChange(newValue);

    expect(callbackObject.callback).toHaveBeenCalledWith(newValue);
  });

  it('should register onTouched', () => {
    const callbackObject = {callback: () => true};
    spyOn(callbackObject, 'callback');

    component.registerOnTouched(callbackObject.callback);
    component.onTouched();

    expect(callbackObject.callback).toHaveBeenCalledWith();
  });
});
