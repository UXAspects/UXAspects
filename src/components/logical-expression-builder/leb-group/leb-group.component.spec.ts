import { LebGroupComponent } from './leb-group.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { LogicalExpression } from '../interfaces/LogicalExpression';
import { LogicalOperatorDefinition } from '../interfaces/LogicalOperatorDefinition';
import { LogicalExpressionBuilderModule } from '../logical-expression-builder.module';
import { FocusHandlerService  }from '../services/focus-handler.service';
import { ValidationService  }from '../services/validation.service';
import { LogicalExpressionBuilderService } from '../services/logical-expression-builder.service';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Component({
    selector: 'ux-group',
    template: `
        <ux-leb-group
            [path]="path"
            [indent]="indent"
            [subExpression]="subExpression">
        </ux-leb-group>
    `
})
export class GroupTestComponent {
    path = [0];
    indent = 0;
    subExpression: LogicalExpression = {type: 'group', logicalOperator: 'and', children: []};
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

    const validationService: Partial<ValidationService> = {
        setValidationState(_: number[], __: boolean) {
        },
        removeValidationState(_: number[]) {
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
        },
        unregister(_: any) {
        }
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [GroupTestComponent],
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
        fixture = TestBed.createComponent(GroupTestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeDefined();
    });
});
