import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectionModule } from './selection.module';
import { SelectionMode } from './selection.service';
import { AccessibilityModule } from '../accessibility/index';

@Component({
    selector: 'app-selection-test',
    template: `
        <ul [mode]="mode"
            [(uxSelection)]="selection"
            (uxSelectionChange)="onSelectedChange($event)">

            <li *ngFor="let option of options"
                [uxSelectionItem]="option"
                (selectedChange)="onSelectedItemChange($event)">
                {{ option }}
            </li>
        </ul>
    `
})
export class SelectionDirectiveSpec {

    mode: SelectionMode = 'simple';

    options: ReadonlyArray<string> = [
        'Option 1',
        'Option 2',
        'Option 3'
    ];

    selection: ReadonlyArray<string> = [
        'Option 2'
    ];

    onSelectedChange(_: string[]): void {
    }

    onSelectedItemChange(_: boolean): void {
    }
}

describe('Selection Directive', () => {
    let fixture: ComponentFixture<SelectionDirectiveSpec>;
    let component: SelectionDirectiveSpec;
    let onSelectedChangeSpy: jasmine.Spy;
    let onSelectedItemChangeSpy: jasmine.Spy;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                AccessibilityModule,
                SelectionModule
            ],
            declarations: [SelectionDirectiveSpec]
        }).compileComponents();

        fixture = TestBed.createComponent<SelectionDirectiveSpec>(SelectionDirectiveSpec);
        component = fixture.componentInstance;

        onSelectedChangeSpy = spyOn(component, 'onSelectedChange');
        onSelectedItemChangeSpy = spyOn(component, 'onSelectedItemChange');

        fixture.detectChanges();
    });

    fit('should not emit any outputs on init', () => {
        expect(onSelectedChangeSpy).not.toHaveBeenCalled();
        expect(onSelectedItemChangeSpy).not.toHaveBeenCalled();
    });

});
