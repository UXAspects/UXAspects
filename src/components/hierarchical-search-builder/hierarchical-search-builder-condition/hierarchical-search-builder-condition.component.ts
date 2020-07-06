import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
    selector: 'ux-hierarchical-search-builder-condition',
    templateUrl: './hierarchical-search-builder-condition.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HierarchicalSearchBuilderConditionComponent {
    @Input() field: string;
    @Input() operator: string;
    @Input() value: any;
}
