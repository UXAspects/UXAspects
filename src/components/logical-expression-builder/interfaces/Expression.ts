export interface ExpressionCondition {
    type: 'condition';
    field: string;
    operator: string;
    value: any;
}

export interface ExpressionGroup {
    type: 'group';
    logicalOperator: string;
    children: (ExpressionCondition|ExpressionGroup)[];
}

type ExpressionType = 'condition' | 'group';

export type Expression = ExpressionCondition | ExpressionGroup;
