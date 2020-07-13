import { Injectable } from '@angular/core';
import { LogicalOperatorDefinition } from './interfaces/LogicalOperatorDefinition';
import { FieldDefinition } from './interfaces/FieldDefinition';
import { OperatorDefinitionList } from './interfaces/OperatorDefinitionList';
import { OperatorDefinition } from './interfaces/OperatorDefinition';
import { HierarchicalSearchBuilderQuery } from './interfaces/HierarchicalSearchBuilderQuery';
import { HierarchicalSearchBuilderModule } from './hierarchical-search-builder.module';

@Injectable({
    providedIn: HierarchicalSearchBuilderModule
})
export class HierarchicalSearchBuilderService {
    private _logicalOperators: LogicalOperatorDefinition[] = [];
    private _fields: FieldDefinition[] = [];
    private _operators: OperatorDefinitionList = {};

    private _query: any = {};
    private _queryItemId: number = 0;

    constructor() {
    }

    // Query
    getQuery(): any {
        return this._query;
    }

    setQuery(query: HierarchicalSearchBuilderQuery): void {
        this._query = this.addIdToQueryItem(query);
    }

    private addIdToQueryItem(queryItem: object): object {
        let tempQueryItem: any = { ...queryItem, id: this._queryItemId };
        this._queryItemId++;

        if (tempQueryItem.children) {
            tempQueryItem.children = tempQueryItem.children.map((child: any) => {
                child = { ...child, parentId: tempQueryItem.id };
                return this.addIdToQueryItem(child);
            });
        }

        return tempQueryItem;
    }

    addToQuery(item: any, parentId: number): void {
        console.log('add', item, parentId);

        item = this.addIdToQueryItem(item);


    }

    getQueryItemById(queryItem: any, id: number): object {
        if (queryItem.hasOwnProperty('id') && queryItem['id'] == id) {
            return queryItem;
        }

        for (let i = 0; i < Object.keys(queryItem).length; i++) {
            if (typeof queryItem[Object.keys(queryItem)[i]] === 'object') {
                let o = this.getQueryItemById(queryItem[Object.keys(queryItem)[i]], id);
                if (o !== null) {
                    return o;
                }
            }
        }

        return null;
    }

    // Logical operators
    setLogicalOperators(logicalOperators: LogicalOperatorDefinition[]): void {
        this._logicalOperators = [...logicalOperators];
    }

    getLogicalOperators(): LogicalOperatorDefinition[] {
        return this._logicalOperators;
    }

    getLogicalOperatorByName(name: string): LogicalOperatorDefinition {
        return this._logicalOperators.find((operator) => operator.name === name);
    }

    // Fields
    setFields(fields: FieldDefinition[]): void {
        this._fields = [...fields];
    }

    getFields(): FieldDefinition[] {
        return this._fields;
    }

    // Operators
    setOperators(operators: OperatorDefinitionList): void {
        this._operators = { ...operators };
    }

    getOperatorsByFieldType(fieldType: string): OperatorDefinition[] {
        return this._operators?.[fieldType] ?? [];
    }
}
