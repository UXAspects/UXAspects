import {
    ChangeDetectionStrategy,
    Component,
    ComponentFactoryResolver,
    ComponentRef,
    EventEmitter,
    Input,
    OnDestroy,
    OnInit,
    Output,
    ViewChild,
    ViewContainerRef
} from '@angular/core';
import { LogicalExpressionBuilderService } from '../services/logical-expression-builder.service';
import { FieldDefinition } from '../interfaces/FieldDefinition';
import { OperatorDefinition } from '../interfaces/OperatorDefinitionList';
import { ExpressionCondition } from '../interfaces/Expression';
import { Observable, Subject } from 'rxjs';
import { distinctUntilChanged, filter, map, takeUntil } from 'rxjs/operators';
import { ValidationService } from '../services/validation.service';

@Component({
    selector: 'ux-leb-condition',
    templateUrl: './leb-condition.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LebConditionComponent implements OnInit, OnDestroy {

    // container for Input Component
    @ViewChild('inputContainer', { read: ViewContainerRef, static: false })
    set container(container: ViewContainerRef) {
        if (container) {
            this._inputContainer = container;
            this._createInputComponent();
        }
    }

    private _inputContainer: ViewContainerRef;
    private _inputComponentRef: ComponentRef<any>;

    @Input() condition: ExpressionCondition;
    @Output() conditionChange = new EventEmitter<ExpressionCondition>();
    private _condition: ExpressionCondition;

    // If editing is cancelled, the condition is reset
    private _initialCondition: ExpressionCondition;

    private _id: number;
    @Output() conditionDeleted = new EventEmitter<number>();
    @Output() conditionEmbedded = new EventEmitter<number>();

    @Input() indent: number = 0;
    @Input() path: number[];

    public fields: FieldDefinition[];
    public operators: OperatorDefinition[];

    public _field: FieldDefinition = null;
    public _operator: OperatorDefinition = null;
    public _value: any;

    public _editBlocked: boolean;

    public _isInEditMode: boolean;

    private _destroy$ = new Subject<void>();
    public _wasLastFocused$: Observable<boolean>;

    public _valid: boolean = true;

    constructor(
        private _lebService: LogicalExpressionBuilderService,
        private _validationService: ValidationService,
        private _cfr: ComponentFactoryResolver
    ) {
    }

    ngOnInit(): void {
        this._initialCondition = this.condition;

        this.fields = this._lebService.getFields();
        this._field = this.fields.find((field) => field.name === this.condition.field) ?? null;

        this.operators = this._lebService.getOperatorsByFieldType(this._field?.fieldType);
        this._operator = this.operators.find((operator) => operator.name === this.condition.operator) ?? null;

        this._value = this.condition.value;

        this._lebService.getConditionInEditMode()
            .pipe(
                takeUntil(this._destroy$),
                map((path: number[]) => path && path.length === this.path.length && path.every((value: number, index: number) => value === this.path[index]))
            )
            .subscribe((value: boolean) => {
                this._isInEditMode = value;

                if (this._isInEditMode) {
                    this._lebService.setLastFocused(this.path);
                }
            });

        this._validationService.setValidationState(this.path, this._valid && !this._isInEditMode);

        this._id = this.path.slice(-1).pop();

        this._lebService.getEditBlocked()
            .pipe(takeUntil(this._destroy$))
            .subscribe((value: boolean) => {
                this._editBlocked = value;
            });

        this._wasLastFocused$ = this._lebService.getLastFocused().pipe(
            takeUntil(this._destroy$),
            map((path: number[]) => path.length === this.path.length && path.every((value: number, index: number) => value === this.path[index]))
        );
    }

    ngOnDestroy(): void {
        this._destroy$.next();
        this._destroy$.complete();

        this._validationService.removeValidationState(this.path);
    }

    private _createInputComponent(): void {
        if (this._operator?.component) {
            this._inputContainer.clear();
            const resolver = this._cfr.resolveComponentFactory(this._operator.component);
            this._inputComponentRef = this._inputContainer.createComponent(resolver);
            this._inputComponentRef.instance.value = this._value;
            this._inputComponentRef.instance.data = this._field?.data ?? {};
            this._inputComponentRef.instance.valueChange
                .pipe(
                    takeUntil(this._destroy$),
                    filter((value: any) => this._value !== value)
                )
                .subscribe((value: any) => {
                    this._value = value;
                    this._buildCondition();
                });
            this._inputComponentRef.instance.valid
                .pipe(
                    takeUntil(this._destroy$),
                    distinctUntilChanged()
                )
                .subscribe((value: boolean) => {
                    this._valid = value;
                    this._validationService.setValidationState(this.path, this._valid && !this._isInEditMode);
                });
        }
    }

    public handleFieldSelected(selectedField: FieldDefinition): void {
        // get operators for new field type
        if (selectedField) {
            this._field = selectedField;
            this.operators = this._lebService.getOperatorsByFieldType(this._field.fieldType);
            this._operator = null;
            this._value = null;

            this._inputContainer.clear();
        }
    }

    public handleOperatorSelected(selectedOperator: OperatorDefinition): void {
        this._operator = selectedOperator;
        this._createInputComponent();
    }

    private _buildCondition(): void {
        this._condition = {
            type: 'condition',
            field: this._field?.name ?? null,
            operator: this._operator?.name ?? null,
            value: this._value ?? null
        };
    }

    public confirmCondition(): void {
        this._lebService.setLastFocused(this.path);
        this._lebService.setConditionInEditMode(null);

        this._validationService.setValidationState(this.path, this._valid);

        this._buildCondition();
        this._initialCondition = { ...this._condition };
        this.conditionChange.emit(this._condition);
    }

    public cancelEdit(): void {
        this._lebService.setLastFocused(this.path);
        this._lebService.setConditionInEditMode(null);

        if (this._initialCondition.field || this._initialCondition.operator || this._initialCondition.value) {
            this._resetCondition(this._initialCondition);
            this.conditionChange.emit(this._condition);
        } else {
            this.conditionDeleted.emit(this._id);
        }

        this._validationService.setValidationState(this.path, this._valid);
    }

    public editCondition(): void {
        if (!this._editBlocked) {
            this._lebService.setLastFocused(this.path);
            this._lebService.setConditionInEditMode(this.path);

            this._validationService.setValidationState(this.path, this._valid && !this._isInEditMode);

            this._buildCondition();
            this.conditionChange.emit(this._condition);
        }
    }

    public deleteCondition(): void {
        if (!this._editBlocked) {
            this.conditionDeleted.emit(this._id);
            this._validationService.removeValidationState(this.path);
        }
    }

    public embedConditionInGroup(): void {
        if (!this._editBlocked) {
            this.conditionEmbedded.emit(this._id);
        }
    }

    private _resetCondition(initialCondition: ExpressionCondition): void {
        this._condition = { ...initialCondition };
        this._value = initialCondition.value;

        this._field = this.fields.find((field) => field.name === this.condition.field) ?? null;
        this._operator = this.operators.find((operator) => operator.name === this.condition.operator) ?? null;
    }
}
