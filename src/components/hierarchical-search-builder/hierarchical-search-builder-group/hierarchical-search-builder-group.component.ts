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

    public logicalOperators: LogicalOperatorDefinition[];
    public selectedLogicalOperator: LogicalOperatorDefinition;

    constructor(private _hsbService: HierarchicalSearchBuilderService) {
    }

    ngOnInit(): void {
        this.logicalOperators = this._hsbService.getLogicalOperators();
        this.selectedLogicalOperator = this._hsbService.getLogicalOperatorByName(this.logicalOperatorName);
    }

    public handleSelectedOperatorChange(selectedOperator: LogicalOperatorDefinition) {
        this.selectedLogicalOperator = selectedOperator;
        this.subquery = { ...this.subquery, logicalOperator: this.selectedLogicalOperator.name };
        this.groupChange.emit(this.subquery);
    }

    public handleGroupChange(event: QueryGroup | QueryCondition, index: number) {
        this.subquery.children[index] = event;

        // remove children that have been deleted
        this.subquery.children = this.subquery.children.filter((child) => child);

        this.groupChange.emit(this.subquery);
    }

    public addCondition() {
        this.subquery.children = [...this.subquery.children, {
            type: 'condition',
            field: null,
            operator: null,
            value: null,
            editable: true,
        }];
    }

    public addGroup() {
        this.subquery.children = [...this.subquery.children, {
            type: 'group',
            logicalOperator: this._hsbService.getLogicalOperators()[0].name,
            children: [
                { type: 'condition', field: null, operator: null, value: null, editable: true },
            ],
        }];
    }

    public removeConditionAtIndex(id: number) {
        this.subquery.children = this.subquery.children.filter((child, index) => {
            return index !== id;
        });

        this.groupChange.emit(this.subquery);
    }

    public deleteGroup(): void {
        this.subquery = null;
        this.groupChange.emit(this.subquery);
    }
}
