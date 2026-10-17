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
import { Component, getDebugNode, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import {
  FormControl,
  FormGroup,
  FormsModule,
  NgForm,
  NgModel,
  ReactiveFormsModule,
} from '@angular/forms';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {
  AccessibilityModule,
  BaseSearchComponent,
  ColorPickerColor,
  ColorPickerComponent,
  DateTimePickerComponent,
  DateTimePickerModule,
  FacetService,
  FacetsModule,
  FacetTypeaheadListComponent,
  FilterDynamicComponent,
  FilterService,
  IconModule,
  InputDropdownComponent,
  MenuModule,
  NumberPickerComponent,
  NumberPickerModule,
  SearchBuilderFocusService,
  SearchBuilderService,
  SearchDateComponent,
  SearchDateRangeComponent,
  SearchTextComponent,
  SelectComponent,
  SelectModule,
  SpinButtonComponent,
  TagInputComponent,
  TooltipModule,
  TypeaheadModule,
} from '../index';

@Component({
  selector: 'app-internal-form-controls-test',
  imports: [FormsModule, ReactiveFormsModule],
  template: `
    @if (reactive) {
      <form [formGroup]="form">
        <input formControlName="sentinel" />
        <ng-container #outlet />
      </form>
    } @else {
      <form>
        <input name="sentinel" [(ngModel)]="sentinel" />
        <ng-container #outlet />
      </form>
    }
  `,
})
class InternalFormControlsTestComponent {
  @ViewChild('outlet', { read: ViewContainerRef }) outlet: ViewContainerRef;

  reactive = true;
  form = new FormGroup({ sentinel: new FormControl('unchanged') });
  sentinel = 'unchanged';
}

interface InternalControlCase {
  name: string;
  component: Type<unknown>;
  inputs?: Record<string, unknown>;
  selector?: string;
  searchValue?: unknown;
}

const cases: InternalControlCase[] = [
  {
    name: 'color picker (hex)',
    component: ColorPickerComponent,
    inputs: { showInput: true, selected: new ColorPickerColor('Black', '#000000') },
  },
  {
    name: 'color picker (RGBA)',
    component: ColorPickerComponent,
    inputs: {
      showInput: true,
      inputMode: 'rgba',
      selected: new ColorPickerColor('Black', '#000000'),
    },
  },
  { name: 'number picker', component: NumberPickerComponent },
  { name: 'spin button', component: SpinButtonComponent, inputs: { value: 5, readOnly: false } },
  {
    name: 'time view timezone',
    component: DateTimePickerComponent,
    inputs: {
      date: new Date(2026, 9, 17, 12, 30),
      showTime: true,
      showTimezone: true,
      showSpinners: false,
    },
    selector: '.time-zone-select',
  },
  {
    name: 'time view spinners',
    component: DateTimePickerComponent,
    inputs: { date: new Date(2026, 9, 17, 12, 30), showTime: true, showSeconds: true },
    selector: 'ux-spin-button input',
  },
  { name: 'facet typeahead', component: FacetTypeaheadListComponent, inputs: { facets: [] } },
  {
    name: 'dynamic filter',
    component: FilterDynamicComponent,
    inputs: { initial: { id: 'all', name: 'All', group: 'Status' }, filters: [] },
  },
  { name: 'input dropdown', component: InputDropdownComponent },
  { name: 'tag input', component: TagInputComponent, inputs: { tags: [] } },
  { name: 'single select', component: SelectComponent, inputs: { options: ['one', 'two'] } },
  {
    name: 'multiple select',
    component: SelectComponent,
    inputs: { options: ['one', 'two'], multiple: true },
    selector: 'ux-tag-input input',
  },
  {
    name: 'search date range',
    component: SearchDateRangeComponent,
    searchValue: { from: new Date(2026, 9, 17), to: new Date(2026, 9, 18) },
  },
  { name: 'search date', component: SearchDateComponent, searchValue: new Date(2026, 9, 17) },
  { name: 'search text', component: SearchTextComponent, searchValue: 'initial' },
];

// #1768: implementation controls must opt out explicitly, rather than forwarding
// ControlContainer or registering their private inputs with the consumer's form.
describe('Internal ngModel form isolation (#1768)', () => {
  for (const reactive of [true, false]) {
    for (const example of cases) {
      it(`should isolate ${example.name} inside a ${reactive ? 'reactive' : 'template-driven'} form`, async () => {
        const warnings = spyOn(console, 'warn').and.callThrough();
        await TestBed.configureTestingModule({
          imports: [
            InternalFormControlsTestComponent,
            AccessibilityModule,
            IconModule,
            DateTimePickerModule,
            FacetsModule,
            MenuModule,
            TooltipModule,
            TypeaheadModule,
            NoopAnimationsModule,
          ],
          providers: [FacetService, FilterService, SearchBuilderService, SearchBuilderFocusService],
        }).compileComponents();
        const fixture = TestBed.createComponent(InternalFormControlsTestComponent);
        fixture.componentInstance.reactive = reactive;
        fixture.detectChanges();
        const child = fixture.componentInstance.outlet.createComponent(example.component);
        for (const [key, value] of Object.entries(example.inputs || {})) {
          child.setInput(key, value);
        }
        if (example.searchValue !== undefined) {
          // SearchBuilderOutlet assigns these public properties before the first render.
          const search = child.instance as BaseSearchComponent;
          search.context = { name: example.name, value: example.searchValue };
          search.config = {};
        }
        fixture.detectChanges();
        await fixture.whenStable();
        if (
          example.component === InputDropdownComponent ||
          example.component === FilterDynamicComponent
        ) {
          fixture.debugElement
            .query(By.directive(example.component))
            .query(By.css('button'))
            .nativeElement.click();
          fixture.detectChanges();
          await fixture.whenStable();
        }

        // Menus render in overlays outside the fixture's element subtree.
        const internal = Array.from(document.querySelectorAll('input, select, textarea'))
          .map(element => getDebugNode(element))
          .filter(element => element?.injector.get(NgModel, null))
          .filter(element => element.injector.get(NgModel).name !== 'sentinel');
        expect(internal.length)
          .withContext('The test must render real internal controls')
          .toBeGreaterThan(0);
        if (example.selector) {
          expect(document.querySelector(example.selector)).withContext(example.name).not.toBeNull();
        }
        for (const element of internal) {
          const model = element.injector.get(NgModel);
          // This assertion also catches regressions on Angular 21, which does not
          // emit the Angular 22 NG01354 diagnostic.
          expect(model.options?.standalone).withContext(example.name).toBe(true);
          expect(model.formDirective).toBeNull();
          element.nativeNode.dispatchEvent(new Event('input', { bubbles: true }));
          element.nativeNode.dispatchEvent(new Event('blur', { bubbles: true }));
        }
        fixture.detectChanges();
        await fixture.whenStable();

        const form = reactive
          ? fixture.componentInstance.form
          : fixture.debugElement.query(By.directive(NgForm)).injector.get(NgForm).form;
        expect(Object.keys(form.controls)).toEqual(['sentinel']);
        expect(form.value).toEqual({ sentinel: 'unchanged' });
        expect(form.pristine).toBe(true);
        expect(form.untouched).toBe(true);
        expect(
          warnings.calls
            .allArgs()
            .map(args => args.join(' '))
            .join('\n')
        ).not.toMatch(/NG0135[024]/);
      });
    }
  }
});

@Component({
  selector: 'app-public-form-controls-test',
  imports: [FormsModule, ReactiveFormsModule, NumberPickerModule, SelectModule],
  template: `
    @if (reactive) {
      <form [formGroup]="form">
        <ux-number-picker formControlName="quantity" />
        <ux-select formControlName="choice" [options]="options" />
      </form>
    } @else {
      <form>
        <ux-number-picker name="quantity" [(ngModel)]="quantity" [disabled]="disabled" />
        <ux-select name="choice" [(ngModel)]="choice" [options]="options" />
      </form>
    }
  `,
})
class PublicFormControlsTestComponent {
  reactive = true;
  form = new FormGroup({ quantity: new FormControl(5), choice: new FormControl('one') });
  quantity = 5;
  choice = 'one';
  disabled = false;
  options = ['one', 'two'];
}

describe('Public form bindings with standalone implementation controls (#1768)', () => {
  for (const reactive of [true, false]) {
    it(`should preserve value propagation and disabled state in a ${reactive ? 'reactive' : 'template-driven'} form`, async () => {
      await TestBed.configureTestingModule({
        imports: [PublicFormControlsTestComponent, NoopAnimationsModule],
      }).compileComponents();
      const fixture = TestBed.createComponent(PublicFormControlsTestComponent);
      fixture.componentInstance.reactive = reactive;
      fixture.detectChanges();
      await fixture.whenStable();
      const input = fixture.nativeElement.querySelector(
        'ux-number-picker input'
      ) as HTMLInputElement;
      const parent = reactive
        ? fixture.componentInstance.form
        : fixture.debugElement.query(By.directive(NgForm)).injector.get(NgForm).form;
      expect(Object.keys(parent.controls).sort()).toEqual(['choice', 'quantity']);
      expect(input.value).toBe('5');
      input.value = '7';
      input.dispatchEvent(new Event('input', { bubbles: true }));
      input.dispatchEvent(new Event('blur', { bubbles: true }));
      fixture.detectChanges();
      await fixture.whenStable();
      expect(parent.value).toEqual({ quantity: 7, choice: 'one' });
      if (reactive) {
        fixture.componentInstance.form.controls.quantity.disable();
      } else {
        fixture.componentInstance.disabled = true;
      }
      fixture.detectChanges();
      await fixture.whenStable();
      expect(input.disabled).toBe(true);
      expect(parent.getRawValue()).toEqual({ quantity: 7, choice: 'one' });
    });
  }
});
