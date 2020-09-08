import { Component } from '@angular/core';
import {
    FieldDefinition,
    LogicalExpression,
    LogicalOperatorDefinition,
    LebNumberInputComponent,
    OperatorDefinitionList,
    LocalizedStrings,
    LebTextInputComponent,
    LebSelectInputComponent,
    LebDateInputComponent,
    LebDateRangeInputComponent
} from '@ux-aspects/ux-aspects';
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
    playground: IPlayground = {
        files: {
            'app.component.ts': this.snippets.raw.appTs,
            'app.component.html': this.snippets.raw.appHtml,
            'app.component.css': this.snippets.raw.appCss
        },
        modules: [
            {
                imports: ['LogicalExpressionBuilderModule'],
                library: '@ux-aspects/ux-aspects'
            }
        ]
    };

    logicalOperators: LogicalOperatorDefinition[] = [
        { name: 'and', label: 'and', minNumberOfChildren: 2, errorMessage: '\'and\' needs at least two children.' },
        { name: 'or', label: 'or', minNumberOfChildren: 2, errorMessage: '\'or\' needs at least two children.' },
        {
            name: 'not',
            label: 'not',
            maxNumberOfChildren: 1,
            minNumberOfChildren: 1,
            errorMessage: '\'not\' needs exactly one child.'
        }
    ];

    operators: OperatorDefinitionList = {
        text: [
            { name: 'equals', label: 'equals', component: LebTextInputComponent },
            { name: 'contains', label: 'contains', component: LebTextInputComponent }
        ],
        date: [
            { name: 'before', label: 'before', component: LebDateInputComponent },
            { name: 'equals', label: 'equals', component: LebDateInputComponent },
            { name: 'after', label: 'after', component: LebDateInputComponent }
        ],
        dateRange: [
            { name: 'between', label: 'is between', component: LebDateRangeInputComponent },
            { name: 'not_between', label: 'is not between', component: LebDateRangeInputComponent }
        ],
        enum: [
            { name: 'one_of', label: 'is one of', component: LebSelectInputComponent }
        ],
        number: [
            { name: 'equals', label: 'equals', component: LebNumberInputComponent },
            { name: 'less_than', label: 'is less than', component: LebNumberInputComponent },
            { name: 'greater_than', label: 'is greater than', component: LebNumberInputComponent }
        ],
    };

    fields: FieldDefinition[] = [
        { name: 'author', label: 'Author', fieldType: 'text' },
        {
            name: 'created',
            label: 'Created',
            fieldType: 'date',
            configuration: { dateFormat: 'short', showTime: true, showNowBtn: true }
        },
        {
            name: 'edited',
            label: 'Edited',
            fieldType: 'dateRange',
            configuration: { dateFormat: 'short', showTime: false, showNowBtn: true }
        },
        { name: 'version', label: 'Version', fieldType: 'number' },
        {
            name: 'category',
            label: 'Category',
            fieldType: 'enum',
            configuration: {
                options: [
                    { name: 'performance', label: 'Performance', icon: 'actions' },
                    { name: 'security', label: 'Security', icon: 'secure' },
                    { name: 'usability', label: 'Usability', icon: 'user' }
                ]
            }
        }
    ];

    localizedStrings: LocalizedStrings = {};

    expression: LogicalExpression = {
        type: 'group',
        logicalOperator: 'and',
        children: [
            { type: 'condition', field: 'author', operator: 'equals', value: 'test' },
            {
                type: 'condition',
                field: 'edited',
                operator: 'between',
                value: { start: new Date(1599561226072), end: new Date(1599562426072) }
            },
            {
                type: 'group',
                logicalOperator: 'or',
                children: [
                    { type: 'condition', field: 'created', operator: 'before', value: new Date(1599565926072) },
                    { type: 'condition', field: 'category', operator: 'one_of', value: ['performance', 'security'] },
                ]
            },
            { type: 'condition', field: 'version', operator: 'equals', value: 3 },
        ]
    };

    valid: boolean;

    initialExpression: LogicalExpression = { ...this.expression };

    constructor() {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));
    }

    resetExpression(): void {
        this.expression = { ...this.initialExpression };
    }
}
