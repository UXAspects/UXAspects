export interface OperatorDefinition {
    name: string;
    label: string;
    component: unknown;
}

export interface OperatorDefinitionList {
    [fieldType: string]: OperatorDefinition[];
}
