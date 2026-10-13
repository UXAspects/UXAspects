import { Component, Type } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { SearchBuilderComponentDefinition } from '../interfaces/component-definition.interface';
import { SearchBuilderQuery } from '../interfaces/query.interface';
import { SearchBuilderFocusService } from '../search-builder-focus.service';
import { SearchBuilderModule } from '../search-builder.module';
import { BaseSearchComponent } from '../search-components/base-search.component';
import { SearchTextComponent } from '../search-components/text/text.component';

@Component({
  selector: 'app-custom-search',
  template: '<span class="custom-search">{{ config.label }}</span>',
})
export class CustomSearchComponent extends BaseSearchComponent {
  type: string = 'custom';
}

@Component({
  selector: 'app-search-builder-outlet-test',
  template: `
    <ux-search-builder [(query)]="query" [components]="components">
      <ux-search-builder-group id="keywords" header="Keywords"></ux-search-builder-group>
    </ux-search-builder>
  `,
  imports: [SearchBuilderModule],
})
export class SearchBuilderOutletTestComponent {
  components: SearchBuilderComponentDefinition[] = [
    {
      name: 'keyword',
      component: SearchTextComponent,
      config: { placeholder: 'Enter keywords' },
    },
    {
      name: 'custom',
      component: CustomSearchComponent,
      config: { label: 'Default label' },
    },
  ];

  query: SearchBuilderQuery = {
    keywords: [
      { type: 'keyword', value: 'hello' },
      { type: 'custom', value: null, config: { label: 'Overridden label' } },
    ],
  };
}

describe('SearchBuilderOutletDirective', () => {
  let fixture: ComponentFixture<SearchBuilderOutletTestComponent>;
  let component: SearchBuilderOutletTestComponent;
  let nativeElement: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchBuilderOutletTestComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchBuilderOutletTestComponent);
    component = fixture.componentInstance;
    nativeElement = fixture.nativeElement;
    fixture.detectChanges();
  });

  afterEach(() => {
    TestBed.inject(SearchBuilderFocusService).clearFocus();
  });

  function getInstance<T extends BaseSearchComponent>(type: Type<T>): T {
    return fixture.debugElement.query(By.directive(type)).componentInstance;
  }

  it('should create the registered component for each field in the query', () => {
    expect(nativeElement.querySelectorAll('ux-search-text').length).toBe(1);
    expect(nativeElement.querySelectorAll('app-custom-search').length).toBe(1);
    expect(nativeElement.querySelector('.custom-search').textContent).toBe('Overridden label');
  });

  it('should pass the field context and the merged config to the component', () => {
    const text = getInstance(SearchTextComponent);
    expect<unknown>(text.context).toBe(component.query.keywords[0]);
    expect(text.config).toEqual({ placeholder: 'Enter keywords' });

    const custom = getInstance(CustomSearchComponent);
    expect<unknown>(custom.context).toBe(component.query.keywords[1]);
    expect(custom.config).toEqual({ label: 'Overridden label' });
  });

  it('should focus the component at the requested group and index', fakeAsync(() => {
    TestBed.inject(SearchBuilderFocusService).setFocus('keywords', 1);
    tick();

    expect(getInstance(CustomSearchComponent).focus).toBeTrue();
    expect(getInstance(SearchTextComponent).focus).toBeFalse();
  }));
});
