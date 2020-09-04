import { LebTextInputComponent } from './leb-text-input.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { LogicalExpressionBuilderModule } from '../../logical-expression-builder.module';

@Component({
    selector: 'ux-text-input-test',
    template: `
        <ux-text-input
            [data]="data"
            (valid)="onValidChange($event)"
            [value]="value"
            (valueChange)="onValueChange($event)">
        </ux-text-input>
    `
})
class TextInputTestComponent {
    value: string = 'test';
    data: any = null;

    onValueChange(_: string): void {
    }

    onValidChange(_: boolean): void {
    }
}

describe('TextInputComponent', () => {
    let component: TextInputTestComponent;
    let fixture: ComponentFixture<TextInputTestComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TextInputTestComponent],
            imports: [LogicalExpressionBuilderModule]
        });
    }));

    beforeEach(async(() => {
        fixture = TestBed.createComponent(TextInputTestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should be created', () => {
        expect(component).toBeDefined();
    });

    it('should fire valid event when value received', async(() => {
        spyOn(component, 'onValidChange');

        component.value = 'testing';

        fixture.detectChanges();
        fixture.whenStable().then(() => {
            expect(component.onValidChange).toHaveBeenCalled();
        });
    }));
});
