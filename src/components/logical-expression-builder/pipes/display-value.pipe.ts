import { Pipe, PipeTransform } from '@angular/core';
import { LogicalExpressionBuilderService } from '../services/logical-expression-builder.service';
import { DisplayValueFunction } from '../interfaces/DisplayValueFunction';
import {DatePipe} from '@angular/common';


type EnumOptions = { name: string, label: string };

/** Used to display the value of a condition. Contains a standard transform function for the basic five Input
 * components. It can be overridden with the displayValueFunction input property. */
@Pipe({ name: 'displayValue' })
export class DisplayValuePipe implements PipeTransform {
    private readonly transformFunction: DisplayValueFunction;

    constructor(private lebService: LogicalExpressionBuilderService, private datePipe: DatePipe) {
        this.transformFunction = this.lebService.getDisplayValueFunction();
    }

    transform(value: unknown, fieldType: string, fieldData: unknown): string {
        if (this.transformFunction) {
            return this.transformFunction(value, fieldType, fieldData);
        }

        switch (fieldType) {
            case 'text':
                return value as string;
            case 'number':
                return `${ value }`;
            case 'date':
                const dateConfiguration = fieldData as {dateFormat: string};
                return this.datePipe.transform(value as Date, dateConfiguration.dateFormat || 'short');
            case 'dateRange':
                const range = value as {start: Date, end: Date};
                const rangeConfiguration = fieldData as {dateFormat: string};
                return this.datePipe.transform(range.start, rangeConfiguration.dateFormat || 'short') + ' — ' +
                    this.datePipe.transform(range.end, rangeConfiguration.dateFormat || 'short');
            case 'enum':
                const fieldValues = value as string[];
                const fieldOptions = fieldData as {options: EnumOptions[]};
                if (fieldOptions?.options) {
                    return fieldValues
                        .map((v: string) => fieldOptions.options.find((o: EnumOptions) => (o.name === v))?.label)
                        .filter((v: string) => v)
                        .join(', ');
                } else {
                    return fieldValues.join(', ');
                }
            default:
                return value?.toString() ?? '';
        }
    }
}
