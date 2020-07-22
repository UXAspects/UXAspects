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
import { OperatorDefinition } from '../interfaces/OperatorDefinition';
import { ExpressionCondition } from '../interfaces/LogicalExpressionBuilderExpression';
import { Subject, Subscription } from 'rxjs';
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
            this.createInputComponent();
        }
    }

    private _inputContainer: ViewContainerRef;
    private _inputComponentRef: ComponentRef<any>;

    @Input() condition: ExpressionCondition;
    @Output() conditionChange = new EventEmitter<ExpressionCondition>();

    @Input() id: number;
    @Output() conditionDeleted = new EventEmitter<number>();

    public fields: FieldDefinition[];
    public operators: OperatorDefinition[];

    public _field: FieldDefinition = null;
    public _operator: OperatorDefinition = null;
    public _value: any;

    public editable: boolean = true;
    private _editBlockedSubscription: Subscription;
    _editBlocked: boolean;

    private _condition: ExpressionCondition;
    private _destroy$ = new Subject<void>();

    constructor(private _lebService: LogicalExpressionBuilderService, private _cfr: ComponentFactoryResolver) {
        this._editBlockedSubscription = this._lebService.getEditBlocked()
            .pipe(takeUntil(this._destroy$))
            .subscribe((value) => {
                this._editBlocked = value;
            });
    }

    ngOnInit(): void {
        this.fields = this._lebService.getFields();

        if (!this._field) {
            this._field = this.fields.find((field) => field.name === this.condition.field) ?? null;
        }

        this.operators = this._lebService.getOperatorsByFieldType(this._field?.fieldType);

        if (!this._operator) {
            this._operator = this.operators.find((operator) => operator.name === this.condition.operator) ?? null;
        }
        this._value = this.condition.value;

        this.editable = this.condition?.editable ?? true;
    }

    ngOnDestroy(): void {
        this._destroy$.next();
        this._destroy$.complete();
    }

    private createInputComponent(): void {
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
                    this.buildCondition();
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

            this.buildCondition();

            this._inputContainer.clear();
        }
    }

    public handleOperatorSelected(selectedOperator: OperatorDefinition): void {
        this._operator = selectedOperator;
        this.createInputComponent();

        if (selectedOperator) {
            this.buildCondition();
        }
    }

    private buildCondition(): void {
        this._condition = {
            type: 'condition',
            field: this._field?.name ?? null,
            operator: this._operator?.name ?? null,
            value: this._value ?? null
        };
    }

    public confirmCondition(): void {
        this._lebService.setEditBlocked(false);

        this.editable = false;
        this.buildCondition();
        this._condition = { ...this._condition, editable: false };
        this.conditionChange.emit(this._condition);
    }

    public editCondition(): void {
        if (!this._editBlocked) {
            this._lebService.setEditBlocked(true);

            this.editable = true;
            this.buildCondition();
            this._condition = { ...this._condition, editable: true };
            this.conditionChange.emit(this._condition);
        }
    }

    public deleteCondition(): void {
        if (!this._editBlocked) {
            this.conditionDeleted.emit(this.id);
        }
    }
}
