import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TypeaheadModule } from './typeahead.module';
import 'chance';
import { FormsModule } from '@angular/forms';
import { InfiniteScrollModule } from '../../directives/infinite-scroll/index';
import { ScrollModule } from '../../directives/scroll/index';
import { TypeaheadKeyService } from './typeahead-key.service';
import { ResizeModule } from '../../directives/resize/index';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-typeahead-test',
    template: `
        <div class="row" [class.drop-direction-up]="dropDirection === 'up'">
            <div class="col-md-12 has-feedback">
                <form class="input-typeahead-form">
                    <input [(ngModel)]="input"
                           [ngModelOptions]="{standalone: true}"
                           placeholder="Enter Text"
                           class="form-control"
                           type="text"
                           (click)="dropdownOpen = true"
                           (keydown)="typeaheadKeyService.handleKey($event, typeahead)"
                           (keydown.escape)="dropdownOpen = false"
                           (blur)="dropdownOpen = false">

                    <ux-typeahead #typeahead
                                  class="typeahead-example"
                                  [(open)]="dropdownOpen"
                                  [filter]="input"
                                  [options]="loadOptionsFn"
                                  [openOnFilterChange]="true"
                                  [pageSize]="pageSize"
                                  [selectOnEnter]="selectOnEnter"
                                  [selectFirst]="selectFirst"
                                  [dropDirection]="dropDirection"
                                  (optionSelected)="input = $event.option"
                                  [(recentOptions)]="recentOptions"
                                  [recentOptionsMaxCount]="recentOptionsMaxCount">
                    </ux-typeahead>
                </form>
            </div>
        </div>
    `
})
export class TypeaheadTestComponent {

    values: ReadonlyArray<string> = [];

    dropdownOpen: boolean = false;
    selectOnEnter: boolean = true;
    dropDirection: 'down' | 'up' | 'auto' = 'auto';
    selectFirst: boolean = true;
    recentOptions: ReadonlyArray<string>;
    recentOptionsMaxCount: number = 5;
    maxHeight: string;
    pageSize: number = 40;

    input: string = '';

    loadOptionsFn = this.loadOptions.bind(this);

    /** Load the options and filter the them */
    loadOptions(pageNum: number, pageSize: number, filter: string): Promise<ReadonlyArray<string>> {

        // get the values for the current page based on the filter text provided
        const values = this.values.filter(tag => tag.toLowerCase().indexOf(filter.toLowerCase()) !== -1)
            .slice(pageNum * pageSize, (pageNum + 1) * pageSize);

        // return the values after a delay to simulate server response time
        return of(values).pipe(delay(1000)).toPromise();
    }

    constructor(public typeaheadKeyService: TypeaheadKeyService<string>) {

        /* Adding values to typeahead list */
        for (let index = 0; index < 200; index++) {
            this.values = [...this.values, chance.name()];
        }
    }

}

describe('Typeahead Component', () => {
    let component: TypeaheadTestComponent;
    let fixture: ComponentFixture<TypeaheadTestComponent>;
    let nativeElement: HTMLElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                CommonModule,
                TypeaheadModule,
                InfiniteScrollModule,
                FormsModule,
                ResizeModule,
                ScrollModule
                ],
            declarations: [TypeaheadTestComponent],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TypeaheadTestComponent);
        component = fixture.componentInstance;
        nativeElement = fixture.nativeElement;
        fixture.detectChanges();
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    it('should allow dropDirection to be set to down', () => {
        const typeaheadInput: HTMLElement = nativeElement.querySelector('input');
        const typeahead: HTMLElement = nativeElement.querySelector('ux-typeahead');

        component.dropDirection = 'down';
        fixture.detectChanges();
        fixture.whenStable();

        typeaheadInput.click();

        expect(typeahead.classList.contains('drop-up')).toBe(false);
    });

    it('should allow dropDirection to be set to up', () => {
        const typeaheadInput: HTMLElement = nativeElement.querySelector('input');
        const typeahead: HTMLElement = nativeElement.querySelector('ux-typeahead');

        component.dropDirection = 'up';
        fixture.detectChanges();
        fixture.whenStable();

        typeaheadInput.click();

        expect(typeahead.classList.contains('drop-up')).toBe(true);
    });
});