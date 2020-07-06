import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { LogicalOperatorDefinition } from './interfaces/LogicalOperatorDefinition';
import { OperatorDefinitionList } from './interfaces/OperatorDefinitionList';
import { FieldDefinition } from './interfaces/FieldDefinition';
import { HierarchicalSearchBuilderQuery } from './interfaces/HierarchicalSearchBuilderQuery';

@Component({
    selector: 'ux-hierarchical-search-builder',
    templateUrl: './hierarchical-search-builder.component.html',
    styleUrls: ['./hierarchical-search-builder.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HierarchicalSearchBuilderComponent {
    @Input() logicalOperators: LogicalOperatorDefinition[];
    @Input() operators: OperatorDefinitionList;
    @Input() fields: FieldDefinition[];
    @Input() query: HierarchicalSearchBuilderQuery;
}
