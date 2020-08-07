import { Injectable } from '@angular/core';
import { LogicalOperatorDefinition } from '../interfaces/LogicalOperatorDefinition';
import { FieldDefinition } from '../interfaces/FieldDefinition';
import { OperatorDefinitionList, OperatorDefinition } from '../interfaces/OperatorDefinitionList';
import { LogicalExpressionBuilderModule } from '../logical-expression-builder.module';
import { BehaviorSubject, Observable } from 'rxjs';
import { DisplayValueFunction } from '../interfaces/DisplayValueFunction';

@Injectable({
    providedIn: 'root',
})
export class LogicalExpressionBuilderService {
    private _logicalOperators: LogicalOperatorDefinition[] = [];
    private _fields: FieldDefinition[] = [];
    private _operators: OperatorDefinitionList = {};
    private _localizedStrings = {};
    private _displayValueFunction: DisplayValueFunction;

    private _conditionInEditMode: BehaviorSubject<number[]> = new BehaviorSubject<number[]>(null);
    private _editBlocked: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    // Logical operators
    public setLogicalOperators(logicalOperators: LogicalOperatorDefinition[]): void {
        this._logicalOperators = [...logicalOperators];
    }

    public getLogicalOperators(): LogicalOperatorDefinition[] {
        return this._logicalOperators;
    }

    public getLogicalOperatorByName(name: string): LogicalOperatorDefinition {
        return this._logicalOperators.find((operator) => operator.name === name);
    }

    // Fields
    public setFields(fields: FieldDefinition[]): void {
        this._fields = [...fields];
    }

    public getFields(): FieldDefinition[] {
        return this._fields;
    }

    // Operators
    public setOperators(operators: OperatorDefinitionList): void {
        this._operators = { ...operators };
    }

    public getOperatorsByFieldType(fieldType: string): OperatorDefinition[] {
        return this._operators?.[fieldType] ?? [];
    }

    // Localized Strings
    public setLocalizedStrings(localizedStrings: any): void {
        this._localizedStrings = localizedStrings;
    }

    public getLocalizedStrings(): any {
        return this._localizedStrings;
    }

    // editBlocked
    public getEditBlocked(): Observable<boolean> {
        return this._editBlocked.asObservable();
    }

    // displayValueFunction for displaying values
    public getDisplayValueFunction(): DisplayValueFunction {
        return this._displayValueFunction;
    }

    public setDisplayValueFunction(transformFunction: DisplayValueFunction): void {
        this._displayValueFunction = transformFunction;
    }

    // Focus stuff
    private _lastFocused: BehaviorSubject<number[]> = new BehaviorSubject<number[]>([]);

    public getLastFocused(): Observable<number[]> {
        return this._lastFocused.asObservable();
    }

    public setLastFocused(path: number[]): void {
        this._lastFocused.next(path);
    }

    // Edit stuff
    public getConditionInEditMode(): Observable<number[]> {
        return this._conditionInEditMode.asObservable();
    }

    public setConditionInEditMode(path: number[]): void {
        this._conditionInEditMode.next(path);
        this._editBlocked.next(!!path);
    }
}
