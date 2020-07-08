import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { QueryGroup } from '../interfaces/HierarchicalSearchBuilderQuery';
import { LogicalOperatorDefinition } from '../interfaces/LogicalOperatorDefinition';
import { HierarchicalSearchBuilderService } from '../hierarchical-search-builder.service';

@Component({
    selector: 'ux-hierarchical-search-builder-group',
    templateUrl: './hierarchical-search-builder-group.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HierarchicalSearchBuilderGroupComponent implements OnInit {
    @Input() subquery: QueryGroup;
    @Input() logicalOperatorName: string;

    logicalOperators: LogicalOperatorDefinition[];

    selectedLogicalOperator: LogicalOperatorDefinition;

    constructor(private _hsbService: HierarchicalSearchBuilderService) {
    }

    ngOnInit(): void {
        this.logicalOperators = this._hsbService.getLogicalOperators();
        this.selectedLogicalOperator = this._hsbService.getLogicalOperatorByName(this.logicalOperatorName);
    }
}
