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
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

@Component({
    selector: 'ux-leb-condition',
    templateUrl: './leb-condition.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LebConditionComponent implements OnInit, OnDestroy {

    @ViewChild('inputContainer', { read: ViewContainerRef, static: false }) set container(container: ViewContainerRef) {
        if (container) {
            this._inputContainer = container;
            this._createInputComponent();
        }
    }

    private _inputContainer: ViewContainerRef;
    private _inputComponentRef: ComponentRef<any>;

    @Input() condition: ExpressionCondition;
    @Output() conditionChange = new EventEmitter<ExpressionCondition>();

    @Input() id: number;
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

    constructor(private _lebService: LogicalExpressionBuilderService, private _cfr: ComponentFactoryResolver) {
        this._lebService.getEditBlocked()
            .pipe(takeUntil(this._destroy$))
            .subscribe((value) => {
                this._editBlocked = value;
            });
    }

    ngOnInit(): void {
        this.fields = this._lebService.getFields();
        this._field = this.fields.find((field) => field.name === this.condition.field) ?? null;

        this.operators = this._lebService.getOperatorsByFieldType(this._field?.fieldType);
        this._operator = this.operators.find((operator) => operator.name === this.condition.operator) ?? null;

        this._value = this.condition.value;

        this.editMode = this.condition?.editMode ?? true;
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
                    filter((value) => this._value !== value)
                )
                .subscribe((value: any) => {
                    this._value = value;
                    this._buildCondition();
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

        this.editMode = false;
        this._buildCondition(this.editMode);
        this.conditionChange.emit(this._condition);
    }

    public editCondition(): void {
        if (!this._editBlocked) {
            this._lebService.setEditBlocked(true);

            this.editMode = true;
            this._buildCondition(this.editMode);
            this.conditionChange.emit(this._condition);
        }
    }

    public deleteCondition(): void {
        if (!this._editBlocked) {
            this.conditionDeleted.emit(this.id);
        }
    }

    public embedConditionInGroup(): void {
        if (!this._editBlocked) {
            this.conditionEmbedded.emit(this.id);
        }
    }
}
