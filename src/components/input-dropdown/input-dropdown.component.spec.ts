import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputDropdownComponent } from './input-dropdown.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ElementRef } from '@angular/core';
import { IconModule } from '../icon';
import { MenuModule } from '../menu';

describe('InputDropdownComponent', () => {
  let component: InputDropdownComponent<any>;
  let fixture: ComponentFixture<InputDropdownComponent<any>>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InputDropdownComponent],
      imports: [CommonModule, FormsModule, IconModule, MenuModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.filterInputElement = new ElementRef({focus: () => true});
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should reset filter correctly', () => {
    component.filterText = 'Tralala';

    spyOn(component.filterChange, 'emit');
    spyOn(component.filterInputElement.nativeElement, 'focus');

    component.resetFilter(new MouseEvent('click'));

    fixture.detectChanges();
    expect(component.filterText).toEqual('');
    expect(component.filterChange.emit).toHaveBeenCalledWith('');
    expect(component.filterInputElement.nativeElement.focus).toHaveBeenCalledWith();
  });

  it('should write value', () => {
    spyOn(component.selectedChange, 'emit');
    const newValue = 'Bla';

    component.writeValue(newValue);

    expect(component.selected).toEqual(newValue);
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
