export interface ExpressionCondition {
    type: string;
    field: string;
    operator: string;
    value: any;
    editable?: boolean;
}

export interface ExpressionGroup {
    type: string;
    logicalOperator: string;
    children: (ExpressionCondition|ExpressionGroup)[];
}

export type LogicalExpressionBuilderExpression = ExpressionCondition | ExpressionGroup;
