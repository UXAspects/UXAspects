import { Component, TemplateRef, ViewChild } from '@angular/core';
import {
    ColorService,
    FieldDefinition,
    LogicalExpressionBuilderExpression,
    LogicalOperatorDefinition,
    NumberInputComponent,
    OperatorDefinitionList,
    TextInputComponent,
    SelectInputComponent,
    DateInputComponent,
    DateRangeInputComponent
} from '@ux-aspects/ux-aspects';
import 'chance';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { IPlayground } from '../../../../../interfaces/IPlayground';
import { IPlaygroundProvider } from '../../../../../interfaces/IPlaygroundProvider';

@Component({
    selector: 'uxd-components-logical-expression-builder',
    templateUrl: './logical-expression-builder.component.html',
    styleUrls: ['./logical-expression-builder.component.less']
})
@DocumentationSectionComponent('ComponentsLogicalExpressionBuilderComponent')
export class ComponentsLogicalExpressionBuilderComponent extends BaseDocumentationSection implements IPlaygroundProvider {
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
            { name: 'before', label: 'before', component: DateInputComponent },
            { name: 'equals', label: 'equals', component: DateInputComponent },
            { name: 'after', label: 'after', component: DateInputComponent },
        ],
        dateRange: [
            { name: 'between', label: 'is between', component: DateRangeInputComponent },
            { name: 'not_between', label: 'is not between', component: DateRangeInputComponent },
        ],
        enum: [
            { name: 'one_of', label: 'one of', component: SelectInputComponent },
        ],
        number: [
            { name: 'equals', label: 'equals', component: NumberInputComponent },
            { name: 'less than', label: 'less than', component: NumberInputComponent },
            { name: 'greater than', label: 'greater than', component: NumberInputComponent },
        ],
    };

    fields: FieldDefinition[] = [
        { name: 'name', label: 'Name', fieldType: 'text' },
        { name: 'date', label: 'Date', fieldType: 'date', data: {} },
        { name: 'dateRange', label: 'Date Range', fieldType: 'dateRange', data: {} },
        { name: 'number', label: 'Number', fieldType: 'number' },
        {
            name: 'category',
            label: 'Category',
            fieldType: 'enum',
            data: {
                options: [
                    { name: 'performance', label: 'Performance', icon: 'actions' },
                    { name: 'security', label: 'Security', icon: 'secure' },
                    { name: 'usability', label: 'Usability', icon: 'user' },
                ]
            }
        },
    ];

    localizedStrings = {
        dateFormat: 'medium',
    };

    expression: LogicalExpressionBuilderExpression = {
        type: 'group',
        logicalOperator: 'and',
        children: [
            { type: 'condition', field: 'name', operator: 'equals', value: 'test' },
            { type: 'condition', field: 'dateRange', operator: 'between', value: [1592979598445, 1592979598445] },
            {
                type: 'group',
                logicalOperator: 'or',
                children: [
                    { type: 'condition', field: 'date', operator: 'before', value: 1595515231584 },
                    { type: 'condition', field: 'category', operator: 'one_of', value: ['performance'] },
                ]
            },
            { type: 'condition', field: 'number', operator: 'equals', value: 15 },
        ]
    };

    // expression: LogicalExpressionBuilderExpression = { type: 'condition', field: 'name', operator: 'equals', value: 'test' };

    // expression: LogicalExpressionBuilderExpression = null;

    /*displayValueFunction(value: any, fieldType: string): string {
        switch (fieldType) {
            case 'text':
                return value;
            case 'number':
                return `${ value }`;
            case 'date':
                return `${ new Date(value) }`;
            case 'dateRange':
                return `${ new Date(value[0]) } - ${ new Date(value[1]) }`;
            case 'enum':
                return value.join(', ');
            default:
                return value;
        }
    }*/

    preview: LogicalExpressionBuilderExpression;

    constructor(public colorService: ColorService) {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));
    }

    expressionChanged(query: LogicalExpressionBuilderExpression): void {
        this.preview = query;
    }
}
