import { OperatorDefinition } from "./OperatorDefinition";

export interface OperatorDefinitionList {
    [fieldType: string]: OperatorDefinition[];
}
