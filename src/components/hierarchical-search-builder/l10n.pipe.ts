import { Pipe, PipeTransform } from '@angular/core';
import { HierarchicalSearchBuilderService } from './hierarchical-search-builder.service';

@Pipe({name: 'l10n'})
export class L10nPipe implements PipeTransform {
    constructor(private _hsbService: HierarchicalSearchBuilderService) {
    }

    transform(l10nKey: string): any {
        return this._hsbService.getLocalizedStrings()?.[l10nKey] || undefined;
    }
}
