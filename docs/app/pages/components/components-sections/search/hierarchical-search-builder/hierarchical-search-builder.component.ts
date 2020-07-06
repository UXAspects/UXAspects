import { Component } from '@angular/core';
import {
    ColorService,
    FieldDefinition,
    LogicalOperatorDefinition,
    OperatorDefinitionList, TextInputComponent
} from '@ux-aspects/ux-aspects';
import 'chance';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { IPlayground } from '../../../../../interfaces/IPlayground';
import { IPlaygroundProvider } from '../../../../../interfaces/IPlaygroundProvider';

@Component({
    selector: 'uxd-components-hierarchical-search-builder',
    templateUrl: './hierarchical-search-builder.component.html',
    styleUrls: ['./hierarchical-search-builder.component.less']
})
@DocumentationSectionComponent('ComponentsHierarchicalSearchBuilderComponent')
export class ComponentsHierarchicalSearchBuilderComponent extends BaseDocumentationSection implements IPlaygroundProvider {
    playground: IPlayground;

    logicalOperators: LogicalOperatorDefinition[] = [
        { name: "and", label: "and" },
        { name: "or", label: "or" },
        { name: "not", label: "not" },
    ]

    operators: OperatorDefinitionList = {
        text: [
            { name: "equals", label: "equals", component: TextInputComponent },
            { name: "contains", label: "contains", component: TextInputComponent },
        ]
    }

    fields: FieldDefinition[] = [
        { name: "name", label: "Name", fieldType: "text" }
    ]

    query: object = null;

    constructor(public colorService: ColorService) {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));
    }
}
