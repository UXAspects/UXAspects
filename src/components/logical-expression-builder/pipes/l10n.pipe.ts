import { Pipe, PipeTransform } from '@angular/core';
import { LogicalExpressionBuilderService } from '../services/logical-expression-builder.service';

@Pipe({name: 'l10n'})
export class L10nPipe implements PipeTransform {
    constructor(private _lebService: LogicalExpressionBuilderService) {
    }

    transform(l10nKey: string): any {
        // returns non-empty string or undefined
        return this._lebService.getLocalizedStrings()?.[l10nKey] || undefined;
    }
}
