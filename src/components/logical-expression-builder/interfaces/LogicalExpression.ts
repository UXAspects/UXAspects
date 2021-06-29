export interface ExpressionCondition {
    type: 'condition';
    field: string;
    operator: string;
    value: unknown;
}

export interface ExpressionGroup {
    type: 'group';
    logicalOperator: string;
    children: LogicalExpression[];
}

export type LogicalExpression = ExpressionCondition | ExpressionGroup;
