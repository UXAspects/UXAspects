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

export type Expression = ExpressionCondition | ExpressionGroup;
