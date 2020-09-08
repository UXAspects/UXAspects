import {
    ChangeDetectionStrategy,
    Component,
    ComponentFactoryResolver,
    ComponentRef,
    EventEmitter,
    Input, OnChanges,
    OnDestroy,
    OnInit,
    Output, SimpleChanges,
    ViewChild,
    ViewContainerRef
} from '@angular/core';
import { LogicalExpressionBuilderService } from '../services/logical-expression-builder.service';
import { FieldDefinition } from '../interfaces/FieldDefinition';
import { OperatorDefinition } from '../interfaces/OperatorDefinitionList';
import { ExpressionCondition } from '../interfaces/LogicalExpression';
import { Subject } from 'rxjs';
import { distinctUntilChanged, filter, map, takeUntil } from 'rxjs/operators';
import { ValidationService } from '../services/validation.service';
import { FocusHandlerService } from '../services/focus-handler.service';
import { DateFormatterPipe } from '../../../pipes/date-formatter/date-formatter.pipe';

@Component({
    selector: 'ux-leb-condition',
    templateUrl: './leb-condition.component.html',
    providers: [DateFormatterPipe],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LebConditionComponent implements OnChanges, OnInit, OnDestroy {

    @Output() conditionChange = new EventEmitter<ExpressionCondition>();
    @Output() conditionDeleted = new EventEmitter<number>();
    @Output() conditionEmbedded = new EventEmitter<number>();

    @Input()
    set condition(condition: ExpressionCondition) {
        this._condition = condition;
    }
    @Input() indent: number = 0;
    @Input() path: number[];

    private _condition: ExpressionCondition;

    // If editing is cancelled, the condition is reset to its former state
    private initialCondition: ExpressionCondition;

    // container for Input Component
    @ViewChild('inputContainer', { read: ViewContainerRef, static: false })
    set container(container: ViewContainerRef) {
        if (container) {
            this.inputContainer = container;
            this.createInputComponent();
        }
    }

    // Reference to the container of the Input component
    private inputContainer: ViewContainerRef;
    // Reference to the Input component
    private inputComponentRef: ComponentRef<any>;

    private id: number;

    fields: FieldDefinition[];
    operators: OperatorDefinition[];

    _field: FieldDefinition = null;
    _operator: OperatorDefinition = null;
    _value: any;

    _editBlocked: boolean;

    _isInEditMode: boolean;

    private destroy$ = new Subject<void>();

    _valid: boolean = true;

    constructor(
        private lebService: LogicalExpressionBuilderService,
        private validationService: ValidationService,
        private cfr: ComponentFactoryResolver,
        private focusHandlerService: FocusHandlerService
    ) {
    }

    ngOnInit(): void {
        // safe initial state for resetting the condition
        this.initialCondition = this._condition;

        // get all fields and find the currently selected one
        this.fields = this.lebService.getFields();
        this._field = this.fields.find((field) => field.name === this._condition.field) ?? null;

        // get all operators and find the currently selected one
        this.operators = this.lebService.getOperatorsByFieldType(this._field?.fieldType);
        this._operator = this.operators.find((operator) => operator.name === this._condition.operator) ?? null;

        this._value = this._condition.value;

        this.focusHandlerService.getRowInEditMode()
            .pipe(
                takeUntil(this.destroy$),
                map((path: number[]) => path?.join() === this.path.join())
            )
            .subscribe((value: boolean) => {
                this._isInEditMode = value;

                if (value) {
                    this.focusHandlerService.setEditBlocked(true);
                }
            });

        this.validationService.setValidationState(this.path, this._valid && !this._isInEditMode);

        this.id = this.path.slice(-1).pop();

        this.focusHandlerService.getEditBlocked()
            .pipe(takeUntil(this.destroy$))
            .subscribe((value: boolean) => {
                this._editBlocked = value;
            });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();

        this.validationService.removeValidationState(this.path);
    }

    private createInputComponent(): void {
        // create input component, set input properties and listen for changes on output properties
        if (this._operator?.component) {
            this.inputContainer.clear();
            const resolver = this.cfr.resolveComponentFactory(this._operator.component);
            this.inputComponentRef = this.inputContainer.createComponent(resolver);
            this.inputComponentRef.instance.value = this._value;
            this.inputComponentRef.instance.configuration = this._field?.configuration ?? {};

            this.inputComponentRef.instance.valueChange
                .pipe(
                    takeUntil(this.destroy$),
                    filter((value: any) => this._value !== value)
                )
                .subscribe((value: any) => {
                    this._value = value;
                    this.buildCondition();
                });

            this.inputComponentRef.instance.validChange
                .pipe(
                    takeUntil(this.destroy$),
                    distinctUntilChanged()
                )
                .subscribe((value: boolean) => {
                    this._valid = value;
                    this.validationService.setValidationState(this.path, this._valid && !this._isInEditMode);
                });
        }
    }

    handleFieldSelected(selectedField: FieldDefinition): void {
        // get operators for new field type
        if (selectedField) {
            this._field = selectedField;
            this.operators = this.lebService.getOperatorsByFieldType(this._field.fieldType);
            this._operator = null;
            this._value = null;

            this.inputContainer.clear();
        }
    }

    handleOperatorSelected(selectedOperator: OperatorDefinition): void {
        this._operator = selectedOperator;
        this.createInputComponent();
    }

    private buildCondition(): void {
        this._condition = {
            type: 'condition',
            field: this._field?.name ?? null,
            operator: this._operator?.name ?? null,
            value: this._value ?? null
        };
    }

    confirmCondition(): void {
        this.focusHandlerService.setRowInEditMode(null);
        this.focusHandlerService.setPathToActivate(this.path);

        this.validationService.setValidationState(this.path, this._valid);

        this.buildCondition();
        this.initialCondition = { ...this._condition };
        this.conditionChange.emit(this._condition);
    }

    cancelEdit(): void {
        this.focusHandlerService.setRowInEditMode(null);
        this.focusHandlerService.setPathToActivate(this.path);

        if (this.initialCondition.field || this.initialCondition.operator || this.initialCondition.value) {
            this.resetCondition(this.initialCondition);
            this.conditionChange.emit(this._condition);
        } else {
            this.conditionDeleted.emit(this.id);
        }

        this.validationService.setValidationState(this.path, this._valid);
    }

    editCondition(): void {
        if (!this._editBlocked) {
            this.focusHandlerService.setRowInEditMode(this.path);
            this.focusHandlerService.setPathToActivate(this.path);

            this.validationService.setValidationState(this.path, this._valid && !this._isInEditMode);

            this.buildCondition();
            this.conditionChange.emit(this._condition);
        }
    }

    deleteCondition(): void {
        if (!this._editBlocked) {
            this.conditionDeleted.emit(this.id);
            this.validationService.removeValidationState(this.path);
        }
    }

    embedConditionInGroup(): void {
        if (!this._editBlocked) {
            this.conditionEmbedded.emit(this.id);
        }
    }

    private resetCondition(initialCondition: ExpressionCondition): void {
        this._condition = { ...initialCondition };
        this._value = initialCondition.value;

        this._field = this.fields.find((field) => field.name === this._condition.field) ?? null;
        this._operator = this.operators.find((operator) => operator.name === this._condition.operator) ?? null;
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.path) {
            this.id = changes.path.currentValue.slice(-1).pop();
        }
    }
}
