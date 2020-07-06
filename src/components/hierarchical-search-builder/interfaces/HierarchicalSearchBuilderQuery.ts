interface QueryCondition {
    type: string;
    field: string;
    operator: string;
    value: any;
}

interface QueryGroup {
    type: string;
    logicalOperator: string;
    children: (QueryCondition|QueryGroup)[];
}

export type HierarchicalSearchBuilderQuery = QueryCondition | QueryGroup;
