import { Injectable } from '@angular/core';
import { LogicalOperatorDefinition } from '../interfaces/LogicalOperatorDefinition';
import { FieldDefinition } from '../interfaces/FieldDefinition';
import { OperatorDefinitionList } from '../interfaces/OperatorDefinitionList';
import { OperatorDefinition } from '../interfaces/OperatorDefinition';
import { LogicalExpressionBuilderModule } from '../logical-expression-builder.module';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class LogicalExpressionBuilderService {
    private _logicalOperators: LogicalOperatorDefinition[] = [];
    private _fields: FieldDefinition[] = [];
    private _operators: OperatorDefinitionList = {};
    private _localizedStrings = {};
    private _editBlocked: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

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
    setLocalizedStrings(localizedStrings: any): void {
        this._localizedStrings = localizedStrings;
    }

    getLocalizedStrings(): any {
        return this._localizedStrings;
    }

    // editBlocked
    getEditBlocked(): Observable<boolean> {
        return this._editBlocked.asObservable();
    }

    setEditBlocked(editBlocked: boolean): void {
        this._editBlocked.next(editBlocked);
    }
}
