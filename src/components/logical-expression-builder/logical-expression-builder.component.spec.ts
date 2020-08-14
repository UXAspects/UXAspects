import { LogicalExpressionBuilderComponent } from './logical-expression-builder.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform } from '@angular/core';
import { LebGroupComponent } from './leb-group/leb-group.component';
import { LebConditionComponent } from './leb-condition/leb-condition.component';
import { ExpressionRow } from './directives/expression-row.directive';
import { SelectModule } from '../select';
import { IconModule } from '../icon';
import { RowPathPipe } from './leb-group/row-path.pipe';
import { MenuModule } from '../menu';
import { A11yModule } from '@angular/cdk/a11y';

@Pipe({ name: 'l10n' })
class L10nPipeMock implements PipeTransform {
    transform(...args: any[]) {
        return '';
    }
}

@Pipe({ name: 'displayValue' })
class DisplayValuePipeMock implements PipeTransform {
    transform(...args: any[]) {
        return '';
    }
}

describe('LogicalExpressionBuilderComponent', () => {
    let component: LogicalExpressionBuilderComponent;
    let fixture: ComponentFixture<LogicalExpressionBuilderComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [ SelectModule, IconModule, MenuModule, A11yModule ],
            declarations: [LogicalExpressionBuilderComponent, LebGroupComponent, LebConditionComponent, ExpressionRow, L10nPipeMock, RowPathPipe, DisplayValuePipeMock]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LogicalExpressionBuilderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeDefined();
    });
});
