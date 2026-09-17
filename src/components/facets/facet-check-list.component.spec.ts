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
import { FacetsModule } from './facets.module';
import { Facet } from './models/facet';

@Component({
  selector: 'app',
  template: `
    <ux-facet-container>
      <ux-facet-check-list header="Authors" [facets]="facets" [id]="chosenID"></ux-facet-check-list>
    </ux-facet-container>
  `,
  imports: [FacetsModule],
})
export class FacetCheckListTestComponent {
  facets: Facet[] = [];
  chosenID: string = 'my-facet';

  constructor() {
    this.facets.push(new Facet('Allen Lucas'));
    this.facets.push(new Facet('Austin Allison'));
    this.facets.push(new Facet('Bertie Manning'));
  }
}

describe('Facet-Check-List', () => {
  let component: FacetCheckListTestComponent;
  let fixture: ComponentFixture<FacetCheckListTestComponent>;
  let nativeElement: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FacetsModule, FacetCheckListTestComponent],
    }).compileComponents();
  });

  beforeEach(async () => {
    fixture = TestBed.createComponent(FacetCheckListTestComponent);
    component = fixture.componentInstance;
    nativeElement = fixture.nativeElement;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should initialise', () => {
    expect(component).toBeTruthy();
  });

  it('should propagate ids down to child components', () => {
    const checkListItem = nativeElement.querySelectorAll('ux-facet-check-list-item');
    const uxCheckbox = nativeElement.querySelectorAll('ux-facet-check-list-item ux-checkbox input');

    // check the ux-facet-check-list-item has added the input ID
    expect(checkListItem[0].id).toBe(component.chosenID + '-check-list-item-0');
    expect(checkListItem[1].id).toBe(component.chosenID + '-check-list-item-1');
    expect(checkListItem[2].id).toBe(component.chosenID + '-check-list-item-2');

    // check the input ID has been propagated down to child components
    expect(uxCheckbox[0].id).toBe(component.chosenID + '-check-list-item-0-checkbox-input');
    expect(uxCheckbox[1].id).toBe(component.chosenID + '-check-list-item-1-checkbox-input');
    expect(uxCheckbox[2].id).toBe(component.chosenID + '-check-list-item-2-checkbox-input');
  });
});
