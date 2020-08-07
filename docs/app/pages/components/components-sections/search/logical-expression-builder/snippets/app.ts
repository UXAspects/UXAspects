import { Component } from '@angular/core';
import {
    FieldDefinition,
    Expression,
    LogicalOperatorDefinition,
    NumberInputComponent,
    OperatorDefinitionList,
    TextInputComponent,
    SelectInputComponent,
    DateInputComponent,
    DateRangeInputComponent
} from '@ux-aspects/ux-aspects';

@Component({
    selector: 'app',
    templateUrl: './app.html',
    styleUrls: ['./app.css']
})
export class AppComponent {
    logicalOperators: LogicalOperatorDefinition[] = [
        { name: 'and', label: 'and' },
        { name: 'or', label: 'or' },
        { name: 'not', label: 'not' }
    ];

    operators: OperatorDefinitionList = {
        text: [
            { name: 'equals', label: 'equals', component: TextInputComponent },
            { name: 'contains', label: 'contains', component: TextInputComponent }
        ],
        date: [
            { name: 'before', label: 'before', component: DateInputComponent },
            { name: 'equals', label: 'equals', component: DateInputComponent },
            { name: 'after', label: 'after', component: DateInputComponent }
        ],
        dateRange: [
            { name: 'between', label: 'is between', component: DateRangeInputComponent },
            { name: 'not_between', label: 'is not between', component: DateRangeInputComponent }
        ],
        enum: [
            { name: 'one_of', label: 'one of', component: SelectInputComponent }
        ],
        number: [
            { name: 'equals', label: 'equals', component: NumberInputComponent },
            { name: 'less_than', label: 'less than', component: NumberInputComponent },
            { name: 'greater_than', label: 'greater than', component: NumberInputComponent },
            { name: 'as_text', label: 'entered as text', component: TextInputComponent }
        ],
    };

    fields: FieldDefinition[] = [
        { name: 'name', label: 'Name', fieldType: 'text' },
        { name: 'date', label: 'Date', fieldType: 'date', data: { dateFormat: 'medium' } },
        { name: 'dateRange', label: 'Date Range', fieldType: 'dateRange', data: { dateFormat: 'medium' } },
        { name: 'number', label: 'Number', fieldType: 'number' },
        {
            name: 'category',
            label: 'Category',
            fieldType: 'enum',
            data: {
                options: [
                    { name: 'performance', label: 'Performance', icon: 'actions' },
                    { name: 'security', label: 'Security', icon: 'secure' },
                    { name: 'usability', label: 'Usability', icon: 'user' }
                ]
            }
        }
    ];

    localizedStrings = {};

    expression: Expression = {
        type: 'group',
        logicalOperator: 'and',
        children: [
            { type: 'condition', field: 'name', operator: 'equals', value: 'test' },
            {
                type: 'condition',
                field: 'dateRange',
                operator: 'between',
                value: { start: 1592979598445, end: 1592979598445 }
            },
            {
                type: 'group',
                logicalOperator: 'or',
                children: [
                    { type: 'condition', field: 'date', operator: 'before', value: 1595515231584 },
                    { type: 'condition', field: 'category', operator: 'one_of', value: ['performance', 'security'] },
                ]
            },
            { type: 'condition', field: 'number', operator: 'equals', value: 15 },
        ]
    };

    initialExpression: Expression = { ...this.expression };

    preview: Expression;

    expressionChanged(expression: Expression): void {
        this.preview = expression;
    }

    resetExpression(): void {
        this.expression = { ...this.initialExpression };
    }
}
