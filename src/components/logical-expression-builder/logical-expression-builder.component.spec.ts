import { LogicalExpressionBuilderComponent } from './logical-expression-builder.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { FieldDefinition } from './interfaces/FieldDefinition';
import { OperatorDefinitionList } from './interfaces/OperatorDefinitionList';
import { LogicalExpressionBuilderModule } from './logical-expression-builder.module';
import { Expression } from './interfaces/Expression';

@Component({
    selector: 'ux-leb',
    template: `
        <ux-logical-expression-builder
            [expression]="expression"
            [fields]="fields"
            [operators]="operators">
        </ux-logical-expression-builder>
    `
})
export class LebTestComponent {
    fields: FieldDefinition[] = [{fieldType: 'test', name: 'test', label: 'test'}];
    operators: OperatorDefinitionList = {
        test: [{name: 'test', label: 'test', component: null}]
    };
    expression: Expression = {
        type: 'condition',
        field: 'test',
        operator: 'test',
        value: 'test'
    };
}

describe('LogicalExpressionBuilderComponent', () => {
    let component: LebTestComponent;
    let fixture: ComponentFixture<LebTestComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [ LogicalExpressionBuilderModule ],
            declarations: [LebTestComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LebTestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeDefined();
    });
});
