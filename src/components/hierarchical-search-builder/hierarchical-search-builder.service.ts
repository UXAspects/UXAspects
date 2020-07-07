import { Injectable } from '@angular/core';
import { LogicalOperatorDefinition } from './interfaces/LogicalOperatorDefinition';
import { HierarchicalSearchBuilderModule } from './hierarchical-search-builder.module';

@Injectable({
    providedIn: HierarchicalSearchBuilderModule,
})
export class HierarchicalSearchBuilderService {
    private _logicalOperators: LogicalOperatorDefinition[];

    constructor() {
    }

    setLogicalOperators(logicalOperators: LogicalOperatorDefinition[]): void {
        this._logicalOperators = [...logicalOperators];
    }

    getLogicalOperators(): LogicalOperatorDefinition[] {
        return this._logicalOperators;
    }

    getLogicalOperatorByName(name: string): LogicalOperatorDefinition {
        return this._logicalOperators.find((operator) => operator.name === name);
    }
}
