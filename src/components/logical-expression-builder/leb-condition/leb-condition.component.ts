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
import { ExpressionCondition } from '../interfaces/LogicalExpressionBuilderExpression';
import { Observable, Subject } from 'rxjs';
import { distinctUntilChanged, filter, map, takeUntil } from 'rxjs/operators';
import { ValidationService } from '../services/validation.service';

@Component({
    selector: 'ux-leb-condition',
    templateUrl: './leb-condition.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LebConditionComponent implements OnInit, OnDestroy {

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

    private _initialCondition: ExpressionCondition;

    @Input() id: number;
    @Input() groupId: number;
    @Output() conditionDeleted = new EventEmitter<number>();
    @Output() conditionEmbedded = new EventEmitter<number>();

    @Input() indent: number = 0;

    public fields: FieldDefinition[];
    public operators: OperatorDefinition[];

    public _field: FieldDefinition = null;
    public _operator: OperatorDefinition = null;
    public _value: any;

    public editMode: boolean = true;
    public _editBlocked: boolean;

    private _condition: ExpressionCondition;
    private _destroy$ = new Subject<void>();

    public _wasLastFocused$: Observable<boolean>;

    public _valid: boolean = true;

    constructor(
        private _lebService: LogicalExpressionBuilderService,
        private _validationService: ValidationService,
        private _cfr: ComponentFactoryResolver
    ) {
        this._lebService.getEditBlocked()
            .pipe(takeUntil(this._destroy$))
            .subscribe((value: boolean) => {
                this._editBlocked = value;
            });
    }

    ngOnInit(): void {
        this._initialCondition = this.condition;

        this.fields = this._lebService.getFields();
        this._field = this.fields.find((field) => field.name === this.condition.field) ?? null;

        this.operators = this._lebService.getOperatorsByFieldType(this._field?.fieldType);
        this._operator = this.operators.find((operator) => operator.name === this.condition.operator) ?? null;

        this._value = this.condition.value;

        this.editMode = this.condition?.editMode ?? true;

        this._validationService.setConditionValidationState(this.groupId, this.id, this._valid);

        this._wasLastFocused$ = this._lebService.getLastFocused().pipe(
            takeUntil(this._destroy$),
            map((ids: [number, number]) => ids[0] === this.groupId && ids[1] === this.id && !this._editBlocked)
        );
    }

    ngOnDestroy(): void {
        this._destroy$.next();
        this._destroy$.complete();
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
                    this._validationService.setConditionValidationState(this.groupId, this.id, this._valid);
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

    private _buildCondition(editMode?: boolean): void {
        this._condition = {
            type: 'condition',
            field: this._field?.name ?? null,
            operator: this._operator?.name ?? null,
            value: this._value ?? null,
            editMode: editMode ?? false
        };
    }

    public confirmCondition(): void {
        this._lebService.setEditBlocked(false);
        this._lebService.setLastFocused([this.groupId, this.id]);

        this.editMode = false;
        this._buildCondition(this.editMode);
        this.conditionChange.emit(this._condition);
    }

    public cancelEdit(): void {
        this._lebService.setEditBlocked(false);
        this._lebService.setLastFocused([this.groupId, this.id]);

        this.editMode = false;

        if (this._initialCondition.field || this._initialCondition.operator || this._initialCondition.value) {
            this._resetCondition(this._initialCondition);
            this.conditionChange.emit(this._condition);
        } else {
            this.conditionDeleted.emit(this.id);
        }
    }

    public editCondition(): void {
        if (!this._editBlocked) {
            this._lebService.setEditBlocked(true);
            this._lebService.setLastFocused([this.groupId, this.id]);

            this.editMode = true;
            this._buildCondition(this.editMode);
            this.conditionChange.emit(this._condition);
        }
    }

    public deleteCondition(): void {
        if (!this._editBlocked) {
            this.conditionDeleted.emit(this.id);
            this._validationService.removeConditionValidationState(this.groupId, this.id);
        }
    }

    public embedConditionInGroup(): void {
        if (!this._editBlocked) {
            this.conditionEmbedded.emit(this.id);
        }
    }

    private _resetCondition(initialCondition: ExpressionCondition): void {
        this._condition = { ...initialCondition, editMode: false };
    }
}
