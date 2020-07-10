import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { LogicalOperatorDefinition } from './interfaces/LogicalOperatorDefinition';
import { OperatorDefinitionList } from './interfaces/OperatorDefinitionList';
import { FieldDefinition } from './interfaces/FieldDefinition';
import { HierarchicalSearchBuilderQuery } from './interfaces/HierarchicalSearchBuilderQuery';
import { HierarchicalSearchBuilderService } from './hierarchical-search-builder.service';

@Component({
    selector: 'ux-hierarchical-search-builder',
    templateUrl: './hierarchical-search-builder.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HierarchicalSearchBuilderComponent implements OnInit {
    @Input() logicalOperators: LogicalOperatorDefinition[];
    @Input() operators: OperatorDefinitionList;
    @Input() fields: FieldDefinition[];
    @Input() query: any;
    @Input() addButtonText: string = 'Add condition';

    constructor(private _hsbService: HierarchicalSearchBuilderService) {
    }

    ngOnInit(): void {
        this._hsbService.setLogicalOperators(this.logicalOperators);
        this._hsbService.setFields(this.fields);
        this._hsbService.setOperators(this.operators);
    }

    isQueryEmpty(): boolean {
        return !this.query?.type;
    }

    getLogicalOperatorName(): string {
        return ('logicalOperator' in this.query) ? this.query.logicalOperator : null;
    }

    getCondition(): { field: string, operator: string, value: any } {
        const field = ('field' in this.query) ? this.query.field : null;
        const operator = ('operator' in this.query) ? this.query.operator : null;
        const value = ('value' in this.query) ? this.query.value : null;

        return { field, operator, value };
    }
}
