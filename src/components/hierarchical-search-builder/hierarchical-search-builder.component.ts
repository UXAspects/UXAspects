import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { LogicalOperatorDefinition } from "./interfaces/LogicalOperatorDefinition";
import { OperatorDefinitionList } from "./interfaces/OperatorDefinitionList";
import { FieldDefinition } from "./interfaces/FieldDefinition";

@Component({
    selector: 'ux-hierarchical-search-builder',
    templateUrl: './hierarchical-search-builder.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HierarchicalSearchBuilderComponent {
    @Input() logicalOperators: LogicalOperatorDefinition[];
    @Input() operators: OperatorDefinitionList;
    @Input() fields: FieldDefinition[];
    @Input() query: any;
}
