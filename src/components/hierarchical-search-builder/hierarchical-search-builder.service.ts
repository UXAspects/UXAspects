import { Injectable } from '@angular/core';
import { LogicalOperatorDefinition } from './interfaces/LogicalOperatorDefinition';
import { HierarchicalSearchBuilderModule } from './hierarchical-search-builder.module';
import { FieldDefinition } from './interfaces/FieldDefinition';
import { OperatorDefinitionList } from './interfaces/OperatorDefinitionList';
import { OperatorDefinition } from './interfaces/OperatorDefinition';

@Injectable({
    providedIn: HierarchicalSearchBuilderModule,
})
export class HierarchicalSearchBuilderService {
    private _logicalOperators: LogicalOperatorDefinition[];
    private _fields: FieldDefinition[];
    private _operators: OperatorDefinitionList;

    constructor() {
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
