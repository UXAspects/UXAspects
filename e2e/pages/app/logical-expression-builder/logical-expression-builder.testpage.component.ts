import {Component} from '@angular/core';
import {
    FieldDefinition, LebDateInputComponent, LebDateRangeInputComponent, LebNumberInputComponent,
    LebSelectInputComponent, LebTextInputComponent, LogicalExpression, LogicalOperatorDefinition,
    OperatorDefinitionList
} from '@ux-aspects/ux-aspects';

@Component({
    selector: 'app-logical-expression-builder',
    templateUrl: './logical-expression-builder.testpage.component.html'
})
export class LogicalExpressionBuilderTestpageComponent {
    logicalOperators: LogicalOperatorDefinition[] = [
        { name: 'and', label: 'and', minNumberOfChildren: 2 },
        { name: 'or', label: 'or', minNumberOfChildren: 2 },
        { name: 'not', label: 'not', maxNumberOfChildren: 1 }
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
            { name: 'one_of', label: 'one of', component: LebSelectInputComponent }
        ],
        number: [
            { name: 'equals', label: 'equals', component: LebNumberInputComponent },
            { name: 'less_than', label: 'less than', component: LebNumberInputComponent },
            { name: 'greater_than', label: 'greater than', component: LebNumberInputComponent },
            { name: 'as_text', label: 'entered as text', component: LebTextInputComponent }
        ],
    };

    fields: FieldDefinition[] = [
        { name: 'author', label: 'Author', fieldType: 'text' },
        {
            name: 'created',
            label: 'Created',
            fieldType: 'date',
            configuration: { dateFormat: 'short', showTime: false, showNowBtn: true }
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

    expression: LogicalExpression = null;

    valid: boolean;

    complexExpression: LogicalExpression = {
        type: 'group',
        logicalOperator: 'and',
        children: [
            { type: 'condition', field: 'author', operator: 'equals', value: 'test' },
            {
                type: 'condition',
                field: 'edited',
                operator: 'between',
                value: { start: 1592979598445, end: 1592979598445 }
            },
            { type: 'condition', field: 'created', operator: 'before', value: 1595515231584 },
            { type: 'condition', field: 'category', operator: 'one_of', value: ['performance', 'security'] },
            { type: 'condition', field: 'version', operator: 'equals', value: 3 },
        ]
    };

    oneCondition: LogicalExpression = {
        type: 'condition',
        field: 'author',
        operator: 'equals',
        value: 'test'
    };

    invalidExpression: LogicalExpression = {
        type: 'group',
        logicalOperator: 'not',
        children: [
            { type: 'condition', field: 'created', operator: 'before', value: 1595515231584 },
            { type: 'condition', field: 'category', operator: 'one_of', value: ['performance', 'security'] },
        ]
    };

    groupWithTwoConditions: LogicalExpression = {
        type: 'group',
        logicalOperator: 'not',
        children: [
            { type: 'condition', field: 'created', operator: 'before', value: 1595515231584 },
            { type: 'condition', field: 'category', operator: 'one_of', value: ['performance', 'security'] },
        ]
    };

    preview: LogicalExpression = null;

    expressionChanged(query: LogicalExpression): void {
        this.preview = query;
    }

    resetExpression(): void {
        this.expression = { ...this.complexExpression };
    }
}
