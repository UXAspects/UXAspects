export interface ExpressionCondition {
    type: ExpressionType;
    field: string;
    operator: string;
    value: any;
    editMode?: boolean;
}

export interface ExpressionGroup {
    type: ExpressionType;
    logicalOperator: string;
    children: (ExpressionCondition|ExpressionGroup)[];
}

type ExpressionType = 'condition' | 'group';

export type LogicalExpressionBuilderExpression = ExpressionCondition | ExpressionGroup;
