import { Pipe, PipeTransform } from '@angular/core';
import { LogicalExpressionBuilderService } from '../services/logical-expression-builder.service';
import { DisplayValueFunction } from '../interfaces/DisplayValueFunction';
import { DatePipe } from '@angular/common';

@Pipe({ name: 'displayValue' })
export class DisplayValuePipe implements PipeTransform {
    private readonly _transformFunction: DisplayValueFunction;

    constructor(private _lebService: LogicalExpressionBuilderService, private _datePipe: DatePipe) {
        this._transformFunction = this._lebService.getDisplayValueFunction();
    }

    transform(value: any, fieldType?: string, fieldData?: any): string {
        if (this._transformFunction) {
            return this._transformFunction(value, fieldType, fieldData);
        }

        if (fieldType) {
            switch (fieldType) {
                case 'text':
                    return value;
                case 'number':
                    return `${ value }`;
                case 'date':
                    return this.transformDate(value);
                case 'dateRange':
                    return `${ this.transformDate(value[0]) } — ${ this.transformDate(value[1]) }`;
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
            return value;
        }
    }

    private transformEnum(value: string[], fieldData: any): string {
        let transformedValue = value.map((v) => {
            const option = fieldData.options.find((o: any) => o.name === v);

            if (option) {
                return option.label;
            } else {
                return;
            }
        });

        return transformedValue.join(', ');
    }

    private transformDate(value: number): string {
        const format = this._lebService.getLocalizedStrings()?.['dateFormat'] || 'dd MMMM yyyy';

        return this._datePipe.transform(new Date(value), format);
    }
}
