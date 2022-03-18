export interface LogicalOperatorDefinition {
    name: string;
    label: string;
    minNumberOfChildren?: number;
    maxNumberOfChildren?: number;
    errorMessage?: string;
}
