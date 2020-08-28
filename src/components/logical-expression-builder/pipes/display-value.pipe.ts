import { Pipe, PipeTransform } from '@angular/core';
import { LogicalExpressionBuilderService } from '../services/logical-expression-builder.service';
import { DisplayValueFunction } from '../interfaces/DisplayValueFunction';
import { DateFormatterPipe } from '../../../pipes/date-formatter/date-formatter.pipe';

/** Used to display the value of a condition. Contains a standard transform function for the basic five Input
 * components. It can be overridden with the displayValueFunction input property. */
@Pipe({ name: 'displayValue' })
export class DisplayValuePipe implements PipeTransform {
    private readonly transformFunction: DisplayValueFunction;

    constructor(private lebService: LogicalExpressionBuilderService, private dateFormatterPipe: DateFormatterPipe) {
        this.transformFunction = this.lebService.getDisplayValueFunction();
    }

    transform(value: any, fieldType?: string, fieldData?: any): string {
        if (this.transformFunction) {
            return this.transformFunction(value, fieldType, fieldData);
        }

        if (fieldType) {
            switch (fieldType) {
                case 'text':
                    return value;
                case 'number':
                    return `${ value }`;
                case 'date':
                    return this.transformDate(value, fieldData);
                case 'dateRange':
                    return `${ this.transformDate(value.start, fieldData) } — ${ this.transformDate(value.end, fieldData) }`;
                case 'enum':
                    if (fieldData?.options) {
                        return this.transformEnum(value, fieldData);
                    } else {
                        return value.join(', ');
                    }
                default:
                    return value;
            }
        } else {
            return undefined;
        }
    }

    private transformEnum(value: string[], fieldData: any): string {
        let transformedValue = value
            .map((v: string) => {
                const option = fieldData.options.find((o: any) => o.name === v);

                if (option) {
                    return option.label;
                } else {
                    return;
                }
            })
            .filter((v: string) => v);

        return transformedValue.join(', ');
    }

    private transformDate(value: number, fieldData: any): string {
        const format = fieldData.dateFormat || 'short';

        return this.dateFormatterPipe.transform(new Date(value), format);
    }
}
