import { LebGroupComponent } from './leb-group.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { Expression, LogicalExpressionBuilderModule, LogicalOperatorDefinition } from '..';
import { LogicalExpressionBuilderService } from '../services/logical-expression-builder.service';

@Component({
    selector: 'ux-group',
    template: `
        <ux-leb-group
            [path]="path"
            [indent]="indent"
            [logicalOperatorName]="logicalOperatorName"
            [subExpression]="subExpression">
        </ux-leb-group>
    `
})
export class GroupTestComponent {
    path = [0];
    indent = 0;
    logicalOperatorName = 'and';
    subExpression: Expression = {type: 'group', logicalOperator: 'and', children: []};
}

describe('LebGroupComponent', () => {
    let component: GroupTestComponent;
    let fixture: ComponentFixture<GroupTestComponent>;

    const lebService: Partial<LogicalExpressionBuilderService> = {
        getLogicalOperatorByName(_name: string): LogicalOperatorDefinition {
            return { name: 'and', label: 'and' };
        },
        getLogicalOperators(): LogicalOperatorDefinition[] {
            return [{ name: 'and', label: 'and' }];
        },
        getLocalizedStrings(): any {
            return {};
        }
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [GroupTestComponent],
            imports: [LogicalExpressionBuilderModule],
            providers: [{ provide: LogicalExpressionBuilderService, useValue: lebService }]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(GroupTestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeDefined();
    });
});
