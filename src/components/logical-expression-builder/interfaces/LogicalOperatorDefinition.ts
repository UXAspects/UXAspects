// export interface LogicalOperatorDefinition {
//     name: string;
//     label: string;
// }

export type LogicalOperatorDefinition = {
    name: string;
    label: string;
} & ({ minNumberOfChildren?: number; } | { maxNumberOfChildren?: number; });
