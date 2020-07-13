import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { QueryCondition, QueryGroup } from '../interfaces/HierarchicalSearchBuilderQuery';
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

    @Output() groupChange = new EventEmitter<QueryGroup>();

    logicalOperators: LogicalOperatorDefinition[];

    selectedLogicalOperator: LogicalOperatorDefinition;

    constructor(private _hsbService: HierarchicalSearchBuilderService) {
    }

    ngOnInit(): void {
        this.logicalOperators = this._hsbService.getLogicalOperators();
        this.selectedLogicalOperator = this._hsbService.getLogicalOperatorByName(this.logicalOperatorName);
    }

    handleSelectedOperatorChange(selectedOperator: LogicalOperatorDefinition) {
        this.selectedLogicalOperator = selectedOperator;
        this.subquery.logicalOperator = this.selectedLogicalOperator.name;
        this.groupChange.emit(this.subquery);
    }

    handleGroupChange(event: QueryGroup) {
        this.subquery = event;
        this.groupChange.emit(event);
    }

    handleConditionChange(event: any, index: number): void {
        event = { ...event, type: 'condition' };
        this.subquery.children[index] = event;
        this.subquery = { ...this.subquery };

        this.groupChange.emit(this.subquery);
    }

    addCondition() {

    }
}
