export interface OperatorDefinition {
    name: string;
    label: string;
    component: any;
}

export interface OperatorDefinitionList {
    [fieldType: string]: OperatorDefinition[];
}
