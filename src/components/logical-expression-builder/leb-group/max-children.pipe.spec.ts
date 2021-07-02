import {MaxChildrenPipe} from './max-children.pipe';
import {LogicalExpressionBuilderService} from '../services/logical-expression-builder.service';

describe('MaxChildren Pipe', () => {
    let pipe: MaxChildrenPipe;
    let lebService = {
        getLogicalOperatorByName: (_: string): Object => ({maxNumberOfChildren: 3})
    };

    beforeEach(() => {
        pipe = new MaxChildrenPipe();
    });

    it('should create an instance', () => {
        expect(pipe).toBeTruthy();
    });

    it('should create a new row path based on logical operator and parent path', () => {
        const logicalOperator = 'something';
        const parentPath = [1];
        const expected = [1, 3];

        const actual = pipe.transform(logicalOperator, parentPath, lebService as LogicalExpressionBuilderService);

        expect(actual).toBeTruthy();
        expect(actual.length).toEqual(expected.length);
        expect(actual.join()).toEqual(expected.join());
    });
});
