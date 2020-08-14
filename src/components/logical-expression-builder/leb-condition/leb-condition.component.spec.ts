import { LebConditionComponent } from './leb-condition.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import {
    ExpressionCondition,
    LogicalExpressionBuilderModule,
} from '..';

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

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ConditionTestComponent],
            imports: [LogicalExpressionBuilderModule]
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
