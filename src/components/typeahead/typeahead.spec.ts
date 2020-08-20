import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TypeaheadModule } from './typeahead.module';
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
                                  [options]="values"
                                  [openOnFilterChange]="true"
                                  [selectOnEnter]="selectOnEnter"
                                  [selectFirst]="selectFirst"
                                  [dropDirection]="dropDirection"
                                  (optionSelected)="input = $event.option"
                                  [disabledOptions]="disabledOptions"
                                  [(recentOptions)]="recentOptions"
                                  [recentOptionsMaxCount]="recentOptionsMaxCount">
                    </ux-typeahead>
                </form>
            </div>
        </div>
    `
})
export class TypeaheadTestComponent {

    values: ReadonlyArray<string> = ['One', 'Two', 'Three'];
    dropdownOpen: boolean = false;
    selectOnEnter: boolean = true;
    dropDirection: 'down' | 'up' | 'auto' = 'auto';
    selectFirst: boolean = true;
    recentOptions: ReadonlyArray<string>;
    recentOptionsMaxCount: number = 5;
    disabledOptions: string[] = [];
    input: string = '';

    constructor(public typeaheadKeyService: TypeaheadKeyService<string>) {
    }

}

describe('Typeahead Component', () => {
    let component: TypeaheadTestComponent;
    let fixture: ComponentFixture<TypeaheadTestComponent>;
    let nativeElement: HTMLElement;
    let typeaheadInput: HTMLElement;
    let typeahead: HTMLElement;

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

        typeaheadInput = nativeElement.querySelector('input');
        typeahead = nativeElement.querySelector('ux-typeahead');
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    it('should allow dropDirection to be set to down', () => {
        component.dropDirection = 'down';
        fixture.detectChanges();
        typeaheadInput.click();

        expect(typeahead.classList.contains('drop-up')).toBe(false);
    });

    it('should allow dropDirection to be set to up', () => {
        component.dropDirection = 'up';
        fixture.detectChanges();
        typeaheadInput.click();

        expect(typeahead.classList.contains('drop-up')).toBe(true);
    });

    it('should disable any options in the disabledOptions array', () => {
        component.disabledOptions = [component.values[1]];
        fixture.detectChanges();
        typeaheadInput.click();
        fixture.detectChanges();

        expect(getTypeaheadItem(0).classList).not.toContain('disabled');
        expect(getTypeaheadItem(1).classList).toContain('disabled');
        expect(getTypeaheadItem(2).classList).not.toContain('disabled');

        // if the item is removed from the disabledOptions list
        component.disabledOptions = [];
        fixture.detectChanges();

        expect(getTypeaheadItem(0).classList).not.toContain('disabled');
        expect(getTypeaheadItem(1).classList).not.toContain('disabled');
        expect(getTypeaheadItem(2).classList).not.toContain('disabled');
    });

    function getTypeaheadItems(): NodeListOf<HTMLElement> {
        return typeahead.querySelectorAll('li');
    }

    function getTypeaheadItem(index: number): HTMLElement {
        return getTypeaheadItems().item(index);
    }
});
