/*
import { LebConditionComponent } from './leb-condition.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectModule } from '../../select';
import { LogicalExpressionBuilderService } from '../services/logical-expression-builder.service';
import { Pipe, PipeTransform } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

// TODO: remove xdescribe
xdescribe('LebConditionComponent', () => {
    let component: LebConditionComponent;
    let fixture: ComponentFixture<LebConditionComponent>;
    let lebServiceStub: Partial<LogicalExpressionBuilderService> = {
        getEditBlocked(): any {
            return new BehaviorSubject<boolean>(false).asObservable();
        },
        getFields(): any[] {
            return [];
        },
        getOperatorsByFieldType(fieldType: string): any[] {
            return [];
        }
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [LebConditionComponent, L10nPipeMock, DisplayValuePipeMock],
            imports: [SelectModule],
            providers: [{ provide: LogicalExpressionBuilderService, useValue: lebServiceStub }]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LebConditionComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeDefined();
    });
});

@Pipe({ name: 'l10n' })
class L10nPipeMock implements PipeTransform {
    transform(...args: any[]) {
        console.log('mocking');
        return '';
    }
}

@Pipe({ name: 'displayValue' })
class DisplayValuePipeMock implements PipeTransform {
    transform(...args: any[]) {
        console.log('mocking');
        return '';
    }
}
*/
