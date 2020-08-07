export interface ExpressionCondition {
    type: ExpressionType;
    field: string;
    operator: string;
    value: any;
}

export interface ExpressionGroup {
    type: ExpressionType;
    logicalOperator: string;
    children: (ExpressionCondition|ExpressionGroup)[];
}

type ExpressionType = 'condition' | 'group';

export type Expression = ExpressionCondition | ExpressionGroup;
