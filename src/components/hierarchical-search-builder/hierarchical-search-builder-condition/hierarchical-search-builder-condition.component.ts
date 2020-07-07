import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { HierarchicalSearchBuilderService } from '../hierarchical-search-builder.service';
import { FieldDefinition } from '../interfaces/FieldDefinition';
import { OperatorDefinition } from '../interfaces/OperatorDefinition';

@Component({
    selector: 'ux-hierarchical-search-builder-condition',
    templateUrl: './hierarchical-search-builder-condition.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HierarchicalSearchBuilderConditionComponent implements OnInit {
    @Input() field: string;
    @Input() operator: string;
    @Input() value: any;

    fields: FieldDefinition[] = this._hsbService.getFields();
    operators: OperatorDefinition[] = this._hsbService.getOperatorsByFieldType('text');

    constructor(private _hsbService: HierarchicalSearchBuilderService) {}

    ngOnInit(): void {
    }
}
