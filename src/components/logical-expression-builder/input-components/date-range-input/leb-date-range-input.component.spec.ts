import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LogicalExpressionBuilderModule } from '../../logical-expression-builder.module';
import { FieldDefinition } from '../../interfaces/FieldDefinition';
import { OperatorDefinition } from '../../interfaces/OperatorDefinitionList';
import { DisplayValueFunction } from '../../interfaces/DisplayValueFunction';
import { LogicalExpressionBuilderService } from '../../services/logical-expression-builder.service';

@Component({
    selector: 'ux-date-range-input-test',
    template: `
        <ux-date-range-input
            [configuration]="configuration"
            (validChange)="onValidChange($event)"
            [value]="value"
            (valueChange)="onValueChange($event)">
        </ux-date-range-input>
    `
})
class DateRangeInputTestComponent {
    value = { start: new Date(), end: new Date() };
    configuration: any = { dateFormat: 'short' };

    onValueChange(_: { start: Date, end: Date }): void {
    }

    onValidChange(_: boolean): void {
    }
}

describe('DateRangeInputComponent', () => {
    let component: DateRangeInputTestComponent;
    let fixture: ComponentFixture<DateRangeInputTestComponent>;

    const lebService: Partial<LogicalExpressionBuilderService> = {
        getLocalizedStrings(): any {
            return {};
        },
        getDisplayValueFunction(): DisplayValueFunction {
            return () => '';
        },
        getFields(): FieldDefinition[] {
            return [{ fieldType: 'test', name: 'test', label: 'test' }];
        },
        getOperatorsByFieldType(_: string): OperatorDefinition[] {
            return [{ name: 'test', label: 'test', component: null }];
        }
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DateRangeInputTestComponent],
            imports: [LogicalExpressionBuilderModule],
            providers: [{ provide: LogicalExpressionBuilderService, useValue: lebService }]
        });
    }));

    beforeEach(async(() => {
        fixture = TestBed.createComponent(DateRangeInputTestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should be created', () => {
        expect(component).toBeDefined();
    });

    it('should fire valid event when value received', async(() => {
        spyOn(component, 'onValidChange');

        component.value = { start: new Date(), end: new Date() };

        fixture.detectChanges();
        fixture.whenStable().then(() => {
            expect(component.onValidChange).toHaveBeenCalled();
        });
    }));
});
