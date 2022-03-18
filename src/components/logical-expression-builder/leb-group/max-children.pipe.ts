import {Pipe, PipeTransform} from '@angular/core';
import {LogicalExpressionBuilderService} from '../services/logical-expression-builder.service';


/** Add the maximum number of children of the logical operator to the end of the path */
@Pipe({
    name: 'maxChildren'
})
export class MaxChildrenPipe implements PipeTransform {
    transform(logicalOperator: string, parentPath: number[], lebService: LogicalExpressionBuilderService): number[] {
        const maxChildren: number = lebService.getLogicalOperatorByName(logicalOperator).maxNumberOfChildren ?? 99;
        return [...parentPath, maxChildren];
    }
}
