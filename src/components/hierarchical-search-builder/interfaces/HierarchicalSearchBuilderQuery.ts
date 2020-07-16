export interface QueryCondition {
    type: string;
    field: string;
    operator: string;
    value: any;
    editable?: boolean;
}

export interface QueryGroup {
    type: string;
    logicalOperator: string;
    children: (QueryCondition|QueryGroup)[];
}

export type HierarchicalSearchBuilderQuery = QueryCondition | QueryGroup;
