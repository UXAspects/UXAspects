import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { QueryGroup } from '../interfaces/HierarchicalSearchBuilderQuery';

@Component({
    selector: 'ux-hierarchical-search-builder-group',
    templateUrl: './hierarchical-search-builder-group.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HierarchicalSearchBuilderGroupComponent {
    @Input() subquery: QueryGroup;
    @Input() logicalOperatorName: string;
}
