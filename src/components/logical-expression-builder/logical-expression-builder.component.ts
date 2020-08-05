import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { LogicalOperatorDefinition } from './interfaces/LogicalOperatorDefinition';
import { OperatorDefinitionList } from './interfaces/OperatorDefinitionList';
import { FieldDefinition } from './interfaces/FieldDefinition';
import { LogicalExpressionBuilderService } from './services/logical-expression-builder.service';
import {
    LogicalExpressionBuilderExpression,
    ExpressionCondition,
    ExpressionGroup
} from './interfaces/LogicalExpressionBuilderExpression';
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
    set expression(expression: LogicalExpressionBuilderExpression) {
        this._expression = this._addEditModeFieldToConditionsInExpression(expression);
        this.expressionChange.emit(this._cleanExpression(this._expression));
    }

    get expression() {
        return this._expression;
    }

    @Input()
    set localizedStrings(localizedStrings: any) {
        this._lebService.setLocalizedStrings(localizedStrings);
    }

    @Input()
    set displayValueFunction(displayValueFunction: DisplayValueFunction) {
        this._lebService.setDisplayValueFunction(displayValueFunction);
    }

    private _expression: LogicalExpressionBuilderExpression;

    @Output() expressionChange: EventEmitter<LogicalExpressionBuilderExpression> = new EventEmitter<LogicalExpressionBuilderExpression>();
    @Output() valid: EventEmitter<boolean> = new EventEmitter<boolean>();

    private _destroy$: Subject<void> = new Subject<void>();

    constructor(private _lebService: LogicalExpressionBuilderService, private _validationService: ValidationService) {
    }

    ngOnInit(): void {
        if (!this.logicalOperators) {
            this._lebService.setLogicalOperators([
                { name: 'and', label: 'and', minNumberOfChildren: 2 },
                { name: 'or', label: 'or', minNumberOfChildren: 2 },
                { name: 'not', label: 'not', maxNumberOfChildren: 1, minNumberOfChildren: 1 }
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

    public handleGroupChange(expression: LogicalExpressionBuilderExpression) {
        let temp = { ...expression };

        // make expression just a condition if it contains exactly one group with exactly one condition in it
        if (temp?.type === 'group'
            && (<ExpressionGroup>temp)?.children?.length === 1
            && (<ExpressionGroup>temp)?.children?.[0].type === 'condition') {
            temp = { ...(<ExpressionGroup>temp).children[0] };
        }

        this.expression = { ...temp };

        this.expressionChange.emit(this._cleanExpression(this.expression));
    }

    public deleteCondition() {
        this.expression = null;
    }

    public addCondition() {
        // adds a condition to the expression if the expression is empty
        this.expression = { type: 'condition', field: null, operator: null, value: null, editMode: true };
        this.expressionChange.emit(this._cleanExpression(this.expression));
    }

    public addGroup() {
        // adds a group to the condition if there is only one condition to the expression and a second one is added
        const firstCondition = { ...this.expression };

        this.expression = {
            type: 'group',
            logicalOperator: this._lebService.getLogicalOperators()[0].name,
            children: [
                firstCondition,
                { type: 'condition', field: null, operator: null, value: null, editMode: true },
            ]
        };

        this._lebService.setEditBlocked(true);
        this.expressionChange.emit(this._cleanExpression(this.expression));

        this._validationService.removeConditionValidationState(-1, -1);
    }

    /* Helper methods for adding and removing the 'editable' property to and from conditions */

    private _addEditModeFieldToConditionsInExpression(expression: LogicalExpressionBuilderExpression): LogicalExpressionBuilderExpression {
        // recursively adds the 'editable' property to all conditions in the expression
        if (!expression) {
            return expression;
        }

        if (expression.type === 'condition') {
            return { ...expression, editMode: (<ExpressionCondition>expression)?.editMode ?? false };
        }

        if (expression.type === 'group' && ('children' in expression)) {
            const children = expression.children.map((child) => this._addEditModeFieldToConditionsInExpression(child));

            return { ...expression, children };
        }
    }

    private _cleanExpression(expression: LogicalExpressionBuilderExpression): LogicalExpressionBuilderExpression {
        // recursively removes the 'editMode' property from all conditions in the expression for output
        if (!expression) {
            return expression;
        }

        if (expression.type === 'condition') {
            return {
                type: 'condition',
                field: (<ExpressionCondition>expression).field,
                operator: (<ExpressionCondition>expression).operator,
                value: (<ExpressionCondition>expression).value,
            };
        }

        if (expression.type === 'group' && ('children' in expression)) {
            const children = expression.children.map((child) => this._cleanExpression(child));

            return { ...expression, children };
        }
    }
}
