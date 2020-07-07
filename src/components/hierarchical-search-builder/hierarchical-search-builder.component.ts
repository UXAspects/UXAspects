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
    @Input() query: HierarchicalSearchBuilderQuery;
    @Input() addButtonText: string = 'Add condition';

    constructor(private _hsbService: HierarchicalSearchBuilderService) {
    }

    ngOnInit(): void {
        this._hsbService.setLogicalOperators(this.logicalOperators);
    }

    isQueryEmpty(): boolean {
        return !this.query?.type;
    }
}
