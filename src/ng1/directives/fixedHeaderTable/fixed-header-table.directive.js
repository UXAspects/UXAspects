import { FixedHeaderTableController } from './fixed-header-table.controller';

export function fixedHeaderTableDirective() {
    return {
        restrict: 'A',
        controller: FixedHeaderTableController,
        controllerAs: '$ctrl',
        bindToController: true,
        scope: {
            tablePaging: '&?',
            tableHeight: '='
        }
    };
}