import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component, ComponentFactoryResolver,
    ComponentRef, EventEmitter,
    Input,
    OnDestroy,
    OnInit,
    Output,
    ViewChild,
    ViewContainerRef
} from '@angular/core';
import { HierarchicalSearchBuilderService } from '../hierarchical-search-builder.service';
import { FieldDefinition } from '../interfaces/FieldDefinition';
import { OperatorDefinition } from '../interfaces/OperatorDefinition';
import { QueryCondition } from '../interfaces/HierarchicalSearchBuilderQuery';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

@Component({
    selector: 'ux-hierarchical-search-builder-condition',
    templateUrl: './hierarchical-search-builder-condition.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HierarchicalSearchBuilderConditionComponent implements OnInit, AfterViewInit, OnDestroy {

    @ViewChild('inputContainer', { read: ViewContainerRef }) inputContainer: ViewContainerRef;
    private _inputComponentRef: ComponentRef<any>;

    @Input() condition: QueryCondition;
    @Output() conditionChange = new EventEmitter<QueryCondition>();

    @Input() id: number;
    @Output() conditionDeleted = new EventEmitter<number>();

    public fields: FieldDefinition[];
    public operators: OperatorDefinition[];

    public _field: FieldDefinition = null;
    public _operator: OperatorDefinition = null;
    public _value: any;

    public editable: boolean = true;

    private _condition: QueryCondition;
    private _destroy$ = new Subject<void>();

    constructor(private _hsbService: HierarchicalSearchBuilderService, private _cfr: ComponentFactoryResolver) {
    }

    ngOnInit(): void {
        this.fields = this._hsbService.getFields();

        if (!this._field) {
            this._field = this.fields.find((field) => field.name === this.condition.field) ?? null;
        }

        this.operators = this._hsbService.getOperatorsByFieldType(this._field?.fieldType);

        if (!this._operator) {
            this._operator = this.operators.find((operator) => operator.name === this.condition.operator) ?? null;
        }
        this._value = this.condition.value;

        this.editable = this.condition?.editable ?? true;
    }

    ngAfterViewInit(): void {
        if (this.editable) {
            this.createInputComponent();
        }
    }

    ngOnDestroy(): void {
        this._destroy$.next();
        this._destroy$.complete();
    }

    private createInputComponent(): void {
        if (this._operator?.component) {
            this.inputContainer.clear();
            const resolver = this._cfr.resolveComponentFactory(this._operator.component);
            this._inputComponentRef = this.inputContainer.createComponent(resolver);
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
            this.operators = this._hsbService.getOperatorsByFieldType(this._field.fieldType);
            this._operator = null;
            this._value = null;

            this.buildCondition();

            this.inputContainer.clear();
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
        this.editable = false;
        this.buildCondition();
        this._condition = { ...this._condition, editable: false };
        this.conditionChange.emit(this._condition);
    }

    public editCondition(): void {
        this.editable = true;
        this.buildCondition();
        this._condition = { ...this._condition, editable: true };
        this.conditionChange.emit(this._condition);
    }

    public deleteCondition(): void {
        this.conditionDeleted.emit(this.id);
    }
}
