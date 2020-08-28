import { Injectable } from '@angular/core';
import { LogicalOperatorDefinition } from '../interfaces/LogicalOperatorDefinition';
import { FieldDefinition } from '../interfaces/FieldDefinition';
import { OperatorDefinitionList, OperatorDefinition } from '../interfaces/OperatorDefinitionList';
import { DisplayValueFunction } from '../interfaces/DisplayValueFunction';

@Injectable()
export class LogicalExpressionBuilderService {
    private _logicalOperators: LogicalOperatorDefinition[] = [
        { name: 'and', label: 'and', minNumberOfChildren: 2, errorMessage: '\'and\' needs at least two children.' },
        { name: 'or', label: 'or', minNumberOfChildren: 2, errorMessage: '\'or\' needs at least two children.' },
        { name: 'not', label: 'not', maxNumberOfChildren: 1, minNumberOfChildren: 1, errorMessage: '\'not\' needs exactly one child.' }
    ];
    private _fields: FieldDefinition[] = [];
    private _operators: OperatorDefinitionList = {};
    private _localizedStrings = {};
    private _displayValueFunction: DisplayValueFunction;

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

    // Localized Strings
    setLocalizedStrings(localizedStrings: { [key: string]: string | string[] }): void {
        this._localizedStrings = localizedStrings;
    }

    getLocalizedStrings(): { [key: string]: string | string[] } {
        return this._localizedStrings;
    }

    // displayValueFunction for displaying values
    getDisplayValueFunction(): DisplayValueFunction {
        return this._displayValueFunction;
    }

    setDisplayValueFunction(transformFunction: DisplayValueFunction): void {
        this._displayValueFunction = transformFunction;
    }
}
