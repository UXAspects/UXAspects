import { Component } from '@angular/core';
import {
    FieldDefinition,
    LogicalExpression,
    LogicalOperatorDefinition,
    LebNumberInputComponent,
    OperatorDefinitionList,
    LebTextInputComponent,
    LebSelectInputComponent,
    LebDateInputComponent,
    LebDateRangeInputComponent
} from '@ux-aspects/ux-aspects';

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
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
            data: { dateFormat: 'short', showTime: true, showNowBtn: true }
        },
        {
            name: 'edited',
            label: 'Edited',
            fieldType: 'dateRange',
            data: { dateFormat: 'short', showTime: false, showNowBtn: true }
        },
        { name: 'version', label: 'Version', fieldType: 'number' },
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

    expression: LogicalExpression = {
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
            {
                type: 'group',
                logicalOperator: 'or',
                children: [
                    { type: 'condition', field: 'created', operator: 'before', value: 1595515231584 },
                    { type: 'condition', field: 'category', operator: 'one_of', value: ['performance', 'security'] },
                ]
            },
            { type: 'condition', field: 'version', operator: 'equals', value: 3 },
        ]
    };

    valid: boolean;

    initialExpression: LogicalExpression = { ...this.expression };

    resetExpression(): void {
        this.expression = { ...this.initialExpression };
    }
}
