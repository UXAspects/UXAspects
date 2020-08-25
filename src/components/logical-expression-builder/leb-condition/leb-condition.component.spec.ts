import { LebConditionComponent } from './leb-condition.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import {
    ExpressionCondition,
    FieldDefinition, FocusHandlerService,
    LogicalExpressionBuilderModule,
    OperatorDefinition, ValidationService
} from '..';
import { LogicalExpressionBuilderService } from '../services/logical-expression-builder.service';
import { DisplayValueFunction } from '../interfaces/DisplayValueFunction';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

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
            return [{ fieldType: 'test', name: 'test', label: 'test' }];
        },
        getOperatorsByFieldType(_: string): OperatorDefinition[] {
            return [{ name: 'test', label: 'test', component: null }];
        }
    };

    const validationService: Partial<ValidationService> = {
        setValidationState(_: number[], __: boolean) {
        }
    };

    const focusHandlerService: Partial<FocusHandlerService> = {
        getRowInEditMode(): Observable<number[]> {
            return new BehaviorSubject<number[]>([0]).asObservable();
        },
        getEditBlocked(): Observable<boolean> {
            return new BehaviorSubject<boolean>(false).asObservable();
        },
        onTabindexChange$: new Subject<void>(),
        isItemActive(_: any): boolean {
            return false;
        },
        register(_: any) {
        }
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ConditionTestComponent],
            imports: [LogicalExpressionBuilderModule],
            providers: [
                {
                    provide: LogicalExpressionBuilderService,
                    useValue: lebService
                }, {
                    provide: ValidationService,
                    useValue: validationService
                }, {
                    provide: FocusHandlerService,
                    useValue: focusHandlerService
                }
            ]
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
