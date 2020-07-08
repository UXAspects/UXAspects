import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component, ComponentFactoryResolver,
    ComponentRef,
    Input,
    OnInit,
    ViewChild,
    ViewContainerRef
} from '@angular/core';
import { HierarchicalSearchBuilderService } from '../hierarchical-search-builder.service';
import { FieldDefinition } from '../interfaces/FieldDefinition';
import { OperatorDefinition } from '../interfaces/OperatorDefinition';

@Component({
    selector: 'ux-hierarchical-search-builder-condition',
    templateUrl: './hierarchical-search-builder-condition.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HierarchicalSearchBuilderConditionComponent implements OnInit, AfterViewInit {
    @ViewChild('inputContainer', { read: ViewContainerRef }) inputContainer: ViewContainerRef;
    private _inputComponentRef: ComponentRef<any>;

    @Input() fieldName: string;
    @Input() operatorName: string;
    @Input() value: any;

    fields: FieldDefinition[] = this._hsbService.getFields();
    operators: OperatorDefinition[];

    _field: FieldDefinition;
    _operator: OperatorDefinition;

    constructor(private _hsbService: HierarchicalSearchBuilderService, private _cfr: ComponentFactoryResolver) {}

    ngOnInit(): void {
        this._field = this.fields.find((field) => field.name === this.fieldName);
        this.operators = this._hsbService.getOperatorsByFieldType(this._field.fieldType);
        this._operator = this.operators.find((operator) => operator.name === this.operatorName);
    }

    ngAfterViewInit(): void {
        this.createInputComponent();
    }

    createInputComponent(): void {
        this.inputContainer.clear();
        const resolver = this._cfr.resolveComponentFactory(this._operator.component);
        this._inputComponentRef = this.inputContainer.createComponent(resolver);
        this._inputComponentRef.instance.value = this.value;
        this._inputComponentRef.instance.data = this._field?.data ?? {};
        this._inputComponentRef.instance.valueChange.subscribe((value: any) => {
            console.log(value);
        });
    }

    handleFieldSelected(): void {
        // get operators for new field type
        this.operators = this._hsbService.getOperatorsByFieldType(this._field.fieldType);
        this._operator = null;

        this.inputContainer.clear();
    }

    handleOperatorSelected(): void {
        this.createInputComponent();
    }
}
