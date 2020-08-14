import { LebConditionComponent } from './leb-condition.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import {
    ExpressionCondition,
    FieldDefinition,
    LogicalExpressionBuilderModule,
    OperatorDefinition
} from '..';
import { LogicalExpressionBuilderService } from '../services/logical-expression-builder.service';
import { DisplayValueFunction } from '../interfaces/DisplayValueFunction';

@Component({
    selector: 'ux-condition',
    template: `
        <ux-leb-condition
            [path]="path"
            [indent]="indent"
            [condition]="condition">
        </ux-leb-condition>
    `
})
export class ConditionTestComponent {
    condition: ExpressionCondition = { type: 'condition', field: 'test', operator: 'test', value: 'test' };
    path: number[] = [0, 0];
    indent: 40;
}

describe('LebConditionComponent', () => {
    let component: ConditionTestComponent;
    let fixture: ComponentFixture<ConditionTestComponent>;

    const lebService: Partial<LogicalExpressionBuilderService> = {
        getLocalizedStrings(): any {
            return {};
        },
        getDisplayValueFunction(): DisplayValueFunction {
            return () => '';
        },
        getFields(): FieldDefinition[] {
            return [{fieldType: 'test', name: 'test', label: 'test'}];
        },
        getOperatorsByFieldType(_fieldType: string): OperatorDefinition[] {
            return [{name: 'test', label: 'test', component: null}];
        }
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ConditionTestComponent],
            imports: [LogicalExpressionBuilderModule],
            providers: [{ provide: LogicalExpressionBuilderService, useValue: lebService }]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ConditionTestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeDefined();
    });
});
