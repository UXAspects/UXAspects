import { LebNumberInputComponent } from './leb-number-input.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { LogicalExpressionBuilderModule } from '../../logical-expression-builder.module';

@Component({
    selector: 'ux-number-input-test',
    template: `
        <ux-number-input
            [configuration]="configuration"
            (validChange)="onValidChange($event)"
            [value]="value"
            (valueChange)="onValueChange($event)">
        </ux-number-input>
    `
})
class NumberInputTestComponent {
    value: number = 4;
    configuration: any = {};

    onValueChange(_: number): void {
    }

    onValidChange(_: boolean): void {
    }
}

describe('NumberInputComponent', () => {
    let component: NumberInputTestComponent;
    let fixture: ComponentFixture<NumberInputTestComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [NumberInputTestComponent],
            imports: [LogicalExpressionBuilderModule]
        });
    }));

    beforeEach(async(() => {
        fixture = TestBed.createComponent(NumberInputTestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should be created', () => {
        expect(component).toBeDefined();
    });

    it('should fire valid event when value received', async(() => {
        spyOn(component, 'onValidChange');

        component.value = 5;

        fixture.detectChanges();
        fixture.whenStable().then(() => {
            expect(component.onValidChange).toHaveBeenCalled();
        });
    }));
});

