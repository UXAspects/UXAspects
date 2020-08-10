import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnDestroy,
    OnInit,
    Output
} from '@angular/core';
import { LogicalOperatorDefinition } from './interfaces/LogicalOperatorDefinition';
import { OperatorDefinitionList } from './interfaces/OperatorDefinitionList';
import { FieldDefinition } from './interfaces/FieldDefinition';
import { LogicalExpressionBuilderService } from './services/logical-expression-builder.service';
import {
    Expression,
    ExpressionGroup
} from './interfaces/Expression';
import { DisplayValueFunction } from './interfaces/DisplayValueFunction';
import { ValidationService } from './services/validation.service';
import { delay, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
    selector: 'ux-logical-expression-builder',
    templateUrl: './logical-expression-builder.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LogicalExpressionBuilderComponent implements OnDestroy, OnInit {

    @Input()
    set logicalOperators(logicalOperators: LogicalOperatorDefinition[]) {
        this._lebService.setLogicalOperators(logicalOperators);
    }

    @Input()
    set operators(operators: OperatorDefinitionList) {
        this._lebService.setOperators(operators);
    }

    @Input()
    set fields(fields: FieldDefinition[]) {
        this._lebService.setFields(fields);
    }

    @Input()
    set expression(expression: Expression) {
        this._expression = expression;
        this.expressionChange.emit(this._expression);
    }

    get expression() {
        return this._expression;
    }

    private _expression: Expression;

    @Input()
    set localizedStrings(localizedStrings: any) {
        this._lebService.setLocalizedStrings(localizedStrings);
    }

    @Input()
    set displayValueFunction(displayValueFunction: DisplayValueFunction) {
        this._lebService.setDisplayValueFunction(displayValueFunction);
    }

    @Output() expressionChange: EventEmitter<Expression> = new EventEmitter<Expression>();
    @Output() valid: EventEmitter<boolean> = new EventEmitter<boolean>();

    private _destroy$: Subject<void> = new Subject<void>();

    constructor(private _lebService: LogicalExpressionBuilderService, private _validationService: ValidationService) {
    }

    ngOnInit(): void {
        if (!this.logicalOperators) {
            this._lebService.setLogicalOperators([
                { name: 'and', label: 'and', minNumberOfChildren: 2, errorMessage: '\'and\' needs at least two children.' },
                { name: 'or', label: 'or', minNumberOfChildren: 2, errorMessage: '\'or\' needs at least two children.' },
                { name: 'not', label: 'not', maxNumberOfChildren: 1, minNumberOfChildren: 1, errorMessage: '\'not\' needs exactly one child.' }
            ]);
        }

        this._validationService.getValidationStatus()
            .pipe(
                takeUntil(this._destroy$),
                distinctUntilChanged(),
                delay(0)
            )
            .subscribe((value) => {
                this.valid.emit(value);
            });
    }

    ngOnDestroy(): void {
        this._destroy$.next();
        this._destroy$.complete();
    }

    public isExpressionEmpty(): boolean {
        return !this.expression?.type;
    }

    public getLogicalOperatorName(): string {
        return (<ExpressionGroup>this.expression).logicalOperator ?? null;
    }

    public handleGroupChange(expression: Expression): void {
        let temp = { ...expression };

        // make expression just a condition if it contains exactly one group with exactly one condition in it
        if (temp?.type === 'group'
            && (<ExpressionGroup>temp)?.children?.length === 1
            && (<ExpressionGroup>temp)?.children?.[0].type === 'condition') {
            temp = { ...(<ExpressionGroup>temp).children[0] };
        }

        this.expression = { ...temp };

        this.expressionChange.emit(this.expression);
    }

    public deleteCondition(): void {
        this.expression = null;
        this._lebService.setConditionInEditMode(null);
    }

    public addCondition(): void {
        // adds a condition to the expression if the expression is empty
        this.expression = { type: 'condition', field: null, operator: null, value: null };
        this.expressionChange.emit(this.expression);
        this._lebService.setConditionInEditMode([0]);
    }

    public addGroup(): void {
        // adds a group to the condition if there is only one condition to the expression and a second one is added
        const firstCondition = { ...this.expression };

        this.expression = {
            type: 'group',
            logicalOperator: this._lebService.getLogicalOperators()[0].name,
            children: [
                firstCondition,
                { type: 'condition', field: null, operator: null, value: null },
            ]
        };

        this.expressionChange.emit(this.expression);

        this._lebService.setConditionInEditMode([0, 1]);
    }
}
