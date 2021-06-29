import { Pipe, PipeTransform } from '@angular/core';
import { LogicalExpressionBuilderService } from '../services/logical-expression-builder.service';

/** Used to display translations provided in localizedStrings input property */
@Pipe({name: 'l10n'})
export class L10nPipe implements PipeTransform {
    constructor(private lebService: LogicalExpressionBuilderService) {
    }

    transform(l10nKey: string): string | string[] | undefined {
        return this.lebService.getLocalizedStrings()?.[l10nKey];
    }
}
