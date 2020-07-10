import { Component } from '@angular/core';
import {
    ColorService,
    FieldDefinition,
    HierarchicalSearchBuilderQuery,
    LogicalOperatorDefinition, NumberInputComponent,
    OperatorDefinitionList,
    TextInputComponent
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
        { name: 'and', label: 'and' },
        { name: 'or', label: 'or' },
        { name: 'not', label: 'not' },
    ];

    operators: OperatorDefinitionList = {
        text: [
            { name: 'equals', label: 'equals', component: TextInputComponent },
            { name: 'contains', label: 'contains', component: TextInputComponent },
        ],
        date: [
            { name: 'before', label: 'before', component: TextInputComponent },
        ],
        enum: [
            { name: 'one_of', label: 'one of', component: TextInputComponent },
        ],
        number: [
            { name: 'equals', label: 'equals', component: NumberInputComponent },
            { name: 'less than', label: 'contains', component: NumberInputComponent },
            { name: 'greater than', label: 'contains', component: NumberInputComponent },
        ],
    };

    fields: FieldDefinition[] = [
        { name: 'name', label: 'Name', fieldType: 'text' },
        { name: 'date', label: 'Date', fieldType: 'date' },
        { name: 'number', label: 'Number', fieldType: 'number' },
        { name: 'category', label: 'Category', fieldType: 'enum' },
    ];

    query: HierarchicalSearchBuilderQuery = {
        type: 'group',
        logicalOperator: 'and',
        children: [
            { type: 'condition', field: 'name', operator: 'equals', value: 'test' },
            {
                type: 'group',
                logicalOperator: 'or',
                children: [
                    { type: 'condition', field: 'date', operator: 'before', value: 1592979598445 },
                    { type: 'condition', field: 'category', operator: 'one_of', value: ['Performance', 'Security'] },
                ]
            },
        ]
    };

    constructor(public colorService: ColorService) {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));
    }
}
