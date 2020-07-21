import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { LogicalOperatorDefinition } from './interfaces/LogicalOperatorDefinition';
import { OperatorDefinitionList } from './interfaces/OperatorDefinitionList';
import { FieldDefinition } from './interfaces/FieldDefinition';
import { HierarchicalSearchBuilderService } from './hierarchical-search-builder.service';
import { HierarchicalSearchBuilderQuery, QueryCondition } from './interfaces/HierarchicalSearchBuilderQuery';

@Component({
    selector: 'ux-hierarchical-search-builder',
    templateUrl: './hierarchical-search-builder.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HierarchicalSearchBuilderComponent {

    @Input()
    set logicalOperators(logicalOperators: LogicalOperatorDefinition[]) {
        this._hsbService.setLogicalOperators(logicalOperators);
    }

    @Input()
    set operators(operators: OperatorDefinitionList) {
        this._hsbService.setOperators(operators);
    }

    @Input()
    set fields(fields: FieldDefinition[]) {
        this._hsbService.setFields(fields);
    }

    @Input()
    set query(query: HierarchicalSearchBuilderQuery) {
        this._query = this.addEditableFieldToConditionsInQuery(query);
    }

    get query() {
        return this._query;
    }

    @Input()
    set localizedStrings(localizedStrings: any) {
        this._hsbService.setLocalizedStrings(localizedStrings);
    }

    private _query: HierarchicalSearchBuilderQuery;

    @Output() queryChange = new EventEmitter<HierarchicalSearchBuilderQuery>();

    constructor(private _hsbService: HierarchicalSearchBuilderService) {
    }

    public isQueryEmpty(): boolean {
        return !this.query?.type;
    }

    public getLogicalOperatorName(): string {
        return ('logicalOperator' in this.query) ? this.query.logicalOperator : null;
    }

    public handleGroupChange(query: HierarchicalSearchBuilderQuery) {
        let temp = { ...query };

        // make query just a condition if it contains exactly one group with exactly one condition in it
        if (temp?.type === 'group'
            && ('children' in temp)
            && temp?.children?.length === 1
            && temp.children[0].type === 'condition') {
            temp = { ...temp.children[0] };
        }

        this.query = temp;

        this.queryChange.emit(this.cleanQuery(this.query));
    }

    public deleteCondition() {
        this.query = null;
    }

    public addCondition() {
        // adds a condition to the query if the query is empty
        this.query = { type: 'condition', field: null, operator: null, value: null, editable: true };
        this.queryChange.emit(this.cleanQuery(this.query));
    }

    public addGroup() {
        // adds a group to the condition if there is only one condition to the query and a second one is added
        const firstCondition = { ...this.query };

        this.query = {
            type: 'group',
            logicalOperator: this._hsbService.getLogicalOperators()[0].name,
            children: [
                firstCondition,
                { type: 'condition', field: null, operator: null, value: null, editable: true },
            ]
        };

        this.queryChange.emit(this.cleanQuery(this.query));
    }

    /* Helper methods for adding and removing the 'editable' property to and from conditions */

    private addEditableFieldToConditionsInQuery(query: HierarchicalSearchBuilderQuery): HierarchicalSearchBuilderQuery {
        // recursively adds the 'editable' property to all conditions in the query
        if (!query) {
            return query;
        }

        if (query.type === 'condition') {
            return { ...query, editable: (<QueryCondition>query)?.editable ?? false };
        }

        if (query.type === 'group' && ('children' in query)) {
            const children = query.children.map((child) => this.addEditableFieldToConditionsInQuery(child));

            return { ...query, children };
        }
    }

    private cleanQuery(query: HierarchicalSearchBuilderQuery): HierarchicalSearchBuilderQuery {
        // recursively removes the 'editable' property from all conditions in the query for output
        if (!query) {
            return query;
        }

        if (query.type === 'condition') {
            return {
                type: 'condition',
                field: (<QueryCondition>query).field,
                operator: (<QueryCondition>query).operator,
                value: (<QueryCondition>query).value,
            };
        }

        if (query.type === 'group' && ('children' in query)) {
            const children = query.children.map((child) => this.cleanQuery(child));

            return { ...query, children };
        }
    }
}
