import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { bufferCount } from 'rxjs/operators';
import { AccessibilityModule } from '../../directives/accessibility/index';
import { FocusIfModule } from '../../directives/focus-if/index';
import { IconModule } from '../icon/index';
import { TypeaheadModule } from '../typeahead/index';
import { TagInputComponent } from './tag-input.component';

describe('Tag Input Component', () => {

    let component: TagInputComponent<string>;
    let nativeElement: HTMLElement;
    let fixture: ComponentFixture<TagInputComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                AccessibilityModule,
                CommonModule,
                FormsModule,
                FocusIfModule,
                IconModule,
                TypeaheadModule
            ],
            declarations: [TagInputComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(TagInputComponent);
        component = fixture.componentInstance;
        nativeElement = fixture.nativeElement;
    });

    afterEach(() => fixture.nativeElement.remove());

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    it('should emit tagsChange each time an item is selected', (done) => {

        // run initial change detection
        fixture.detectChanges();

        // listen for tags
        const subscription = component.tagsChange.pipe(bufferCount(2)).subscribe(response => {
            expect(response.length).toBe(2);
            done();
        });

        // add tags
        component.commitTypeahead('One');
        component.commitTypeahead('Two');

        subscription.unsubscribe();
    });

    it('should not emit inputChange on initialization', () => {
        const onInputChange = jasmine.createSpy('inputChange');
        const subscription = component.inputChange.subscribe(onInputChange);

        // run initial change detection
        fixture.detectChanges();

        expect(onInputChange).not.toHaveBeenCalled();

        subscription.unsubscribe();
    });

    it('should not emit tagsChange on initialization', () => {
        const onTagsChange = jasmine.createSpy('TagsChange');
        const subscription = component.inputChange.subscribe(onTagsChange);

        // run initial change detection
        fixture.detectChanges();

        expect(onTagsChange).not.toHaveBeenCalled();

        subscription.unsubscribe();
    });

    it('should initialize value to empty string', () => {
        // run initial change detection
        fixture.detectChanges();

        expect(component.input).toBe('');
    });

     it('should emit inputChange when input changed', () => {
         const onInputChange = jasmine.createSpy('inputChange');
         const subscription = component.inputChange.subscribe(onInputChange);
         // run initial change detection
         fixture.detectChanges();

         component.setInputValue('one');

         expect(onInputChange).toHaveBeenCalled();

         subscription.unsubscribe();
    });

    it('should add a required attribute to the input when required is true', () => {
        component.required = true;

        fixture.detectChanges();

        const inputElementEmpty = nativeElement.querySelector<HTMLInputElement>('input.ux-tag-input');
        const attributeRequired = inputElementEmpty.hasAttribute('required');

        expect(attributeRequired).toBe(true);
    });

    it('should emit inputBlur when the input field loses focus', () => {
        fixture.detectChanges();

        const onInputBlur = jasmine.createSpy('inputBlur');
        const subscription = component.inputBlur.subscribe(onInputBlur);
        const inputElement = nativeElement.querySelector<HTMLInputElement>('input.ux-tag-input');

        inputElement.dispatchEvent(new Event('blur'));

        fixture.detectChanges();

        expect(onInputBlur).toHaveBeenCalled();
        subscription.unsubscribe();
    });

});
