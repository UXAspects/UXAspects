import { Component } from '@angular/core';
import {
    ColorService,
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
        { name: 'and', label: 'and', minNumberOfChildren: 2 },
        { name: 'or', label: 'or', minNumberOfChildren: 2 },
        { name: 'not', label: 'not', maxNumberOfChildren: 1 }
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
        { name: 'author', label: 'Author', fieldType: 'text' },
        { name: 'created', label: 'Created', fieldType: 'date', data: { dateFormat: 'short', showTime: false, showNowBtn: true } },
        { name: 'edited', label: 'Edited', fieldType: 'dateRange', data: { dateFormat: 'short', showTime: false, showNowBtn: true } },
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

    expression: Expression = {
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

    public valid: boolean;

    initialExpression: Expression = { ...this.expression };

    preview: Expression;

    constructor(public colorService: ColorService) {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));
    }

    expressionChanged(query: Expression): void {
        this.preview = query;
    }

    resetExpression(): void {
        this.expression = { ...this.initialExpression };
    }
}
