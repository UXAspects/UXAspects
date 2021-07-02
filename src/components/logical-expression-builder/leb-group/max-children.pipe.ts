import {Pipe, PipeTransform} from '@angular/core';
import {LogicalExpressionBuilderService} from '../services/logical-expression-builder.service';


/** Simple pipe that generates a path based on the parent's path and the child's id */
@Pipe({
    name: 'maxChildren'
})
export class MaxChildrenPipe implements PipeTransform {
    transform(logicalOperator: string, parentPath: number[], lebService: LogicalExpressionBuilderService): number[] {
        const maxChildren: number = lebService.getLogicalOperatorByName(logicalOperator).maxNumberOfChildren ?? 99;
        return [...parentPath, maxChildren];
    }
}
