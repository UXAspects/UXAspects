import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter, forwardRef,
    Input, OnChanges,
    OnDestroy,
    OnInit,
    Output,
    SimpleChanges
} from '@angular/core';
import { LogicalOperatorDefinition } from './interfaces/LogicalOperatorDefinition';
import { OperatorDefinitionList } from './interfaces/OperatorDefinitionList';
import { FieldDefinition } from './interfaces/FieldDefinition';
import { LogicalExpressionBuilderService } from './services/logical-expression-builder.service';
import { Expression } from './interfaces/Expression';
import { DisplayValueFunction } from './interfaces/DisplayValueFunction';
import { ValidationService } from './services/validation.service';
import { delay, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { FocusHandlerService } from './services/focus-handler.service';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'ux-logical-expression-builder',
    templateUrl: './logical-expression-builder.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: forwardRef(() => LogicalExpressionBuilderComponent)
        },
        LogicalExpressionBuilderService,
        FocusHandlerService,
        ValidationService
    ]
})
export class LogicalExpressionBuilderComponent implements OnChanges, OnDestroy, OnInit, ControlValueAccessor {
    @Output() expressionChange: EventEmitter<Expression> = new EventEmitter<Expression>();
    @Output() valid: EventEmitter<boolean> = new EventEmitter<boolean>();

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
    }

    get expression() {
        return this._expression;
    }

    private _expression: Expression;

    @Input()
    set localizedStrings(localizedStrings: { [key: string]: string | string[] }) {
        this._lebService.setLocalizedStrings(localizedStrings);
    }

    @Input()
    set displayValueFunction(displayValueFunction: DisplayValueFunction) {
        this._lebService.setDisplayValueFunction(displayValueFunction);
    }

    public _editBlocked$: Observable<boolean>;
    private _destroy$: Subject<void> = new Subject<void>();

    constructor(
        private _lebService: LogicalExpressionBuilderService,
        private _validationService: ValidationService,
        private _focusHandler: FocusHandlerService,
        private _cd: ChangeDetectorRef) {
        this._editBlocked$ = this._focusHandler.getEditBlocked();
    }

    ngOnInit(): void {
        // get the validation status of the entire expression
        this._validationService.getValidationStatus()
            .pipe(
                takeUntil(this._destroy$),
                distinctUntilChanged(),
                delay(0)
            )
            .subscribe((value: boolean) => {
                this.valid.emit(value);
            });
    }

    ngOnDestroy(): void {
        this._destroy$.next();
        this._destroy$.complete();
    }

    public handleSubExpressionChange(expression: Expression): void {
        this._expression = { ...expression } || null;

        this.expressionChange.emit(this._expression);
        this.onChange(this._expression);
        this.onTouched();
    }

    public deleteCondition(): void {
        this._expression = null;
        this.expressionChange.emit(this._expression);
        this.onChange(this._expression);
        this.onTouched();
        this._focusHandler.setRowInEditMode(null);
    }

    public addCondition(): void {
        // adds a condition to the expression if the expression is empty
        this._expression = { type: 'condition', field: null, operator: null, value: null };
        this.expressionChange.emit(this._expression);
        this.onChange(this._expression);
        this.onTouched();
        this._focusHandler.setRowInEditMode([0]);
        this._focusHandler.setPathToActivate([0]);
    }

    public addGroup(): void {
        // adds a group to the condition if there is only one condition to the expression and a second one is added
        const firstCondition = { ...this._expression };

        this._expression = {
            type: 'group',
            logicalOperator: this._lebService.getLogicalOperators()[0].name,
            children: [
                firstCondition,
                { type: 'condition', field: null, operator: null, value: null },
            ]
        };

        this.expressionChange.emit(this._expression);
        this.onChange(this._expression);
        this.onTouched();
        this._focusHandler.setRowInEditMode([0, 1]);
        this._focusHandler.setPathToActivate([0, 1]);
    }

    /** Store the change callback provided by Angular Forms */
    onChange: (_: Expression) => void = () => {
    }

    /** Store the touched callback provided by Angular Forms */
    onTouched: () => void = () => {
    }

    registerOnChange(fn: (_: Expression) => void): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }

    writeValue(obj: any): void {
        this.expression = obj;
        this._cd.markForCheck();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.expression && !changes.expression.firstChange) {
            this.onChange(changes.expression.currentValue);
            this.onTouched();
            this.expressionChange.emit(changes.expression.currentValue);
        }
    }
}
