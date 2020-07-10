import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component, ComponentFactoryResolver,
    ComponentRef,
    Input, OnDestroy,
    OnInit,
    ViewChild,
    ViewContainerRef
} from '@angular/core';
import { HierarchicalSearchBuilderService } from '../hierarchical-search-builder.service';
import { FieldDefinition } from '../interfaces/FieldDefinition';
import { OperatorDefinition } from '../interfaces/OperatorDefinition';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'ux-hierarchical-search-builder-condition',
    templateUrl: './hierarchical-search-builder-condition.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HierarchicalSearchBuilderConditionComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChild('inputContainer', { read: ViewContainerRef }) inputContainer: ViewContainerRef;
    private _inputComponentRef: ComponentRef<any>;

    @Input() fieldName: string;
    @Input() operatorName: string;
    @Input() value: any;

    fields: FieldDefinition[] = this._hsbService.getFields();
    operators: OperatorDefinition[];

    _field: FieldDefinition;
    _operator: OperatorDefinition;
    _value: any;

    private _condition: any;

    private _destroy$ = new Subject<void>();

    constructor(private _hsbService: HierarchicalSearchBuilderService, private _cfr: ComponentFactoryResolver) {
    }

    ngOnInit(): void {
        this._field = this.fields.find((field) => field.name === this.fieldName);
        this.operators = this._hsbService.getOperatorsByFieldType(this._field.fieldType);
        this._operator = this.operators.find((operator) => operator.name === this.operatorName);
        this._value = this.value;
    }

    ngAfterViewInit(): void {
        this.createInputComponent();
    }

    ngOnDestroy(): void {
        this._destroy$.next();
        this._destroy$.complete();
    }

    createInputComponent(): void {
        if (this._operator?.component) {
            this.inputContainer.clear();
            const resolver = this._cfr.resolveComponentFactory(this._operator.component);
            this._inputComponentRef = this.inputContainer.createComponent(resolver);
            this._inputComponentRef.instance.value = this._value;
            this._inputComponentRef.instance.data = this._field?.data ?? {};
            this._inputComponentRef.instance.valueChange.pipe(takeUntil(this._destroy$)).subscribe((value: any) => {
                this._value = value;
                this.buildCondition();
            });
        }
    }

    handleFieldSelected(): void {
        // get operators for new field type
        this.operators = this._hsbService.getOperatorsByFieldType(this._field.fieldType);
        this._operator = null;
        this._value = null;

        this.buildCondition();

        this.inputContainer.clear();
    }

    handleOperatorSelected(event: OperatorDefinition): void {
        this.createInputComponent();

        if (event) {
            this.buildCondition();
        }
    }

    buildCondition(): void {
        this._condition = { field: this._field, operator: this._operator, value: this._value };
        console.log(this._condition);
    }
}
