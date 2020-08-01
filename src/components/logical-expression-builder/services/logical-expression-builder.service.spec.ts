import { async, TestBed } from '@angular/core/testing';
import { LogicalExpressionBuilderService } from './logical-expression-builder.service';

describe('LogicalExpressionBuilderService', () => {
    let service: LogicalExpressionBuilderService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            providers: [LogicalExpressionBuilderService]
        });

        service = TestBed.inject(LogicalExpressionBuilderService);
    }));

    it('should be created and have the correct initial values', () => {
        expect(service).toBeTruthy();
        expect(service.getLogicalOperators()).toEqual([]);
        expect(service.getFields()).toEqual([]);
    });

    it('should set and return logical operators', () => {
        service.setLogicalOperators([{ name: 'and', label: 'and', minNumberOfChildren: 2 }]);
        const logicalOperators = service.getLogicalOperators();

        expect(logicalOperators).toBeDefined();
        expect(logicalOperators.length).toEqual(1);
        expect(logicalOperators[0].name).toEqual('and');
        expect(logicalOperators[0].label).toEqual('and');
        expect(logicalOperators[0].hasOwnProperty('minNumberOfChildren')).toEqual(true);
    });

    it('should get logical operator by name', () => {
        service.setLogicalOperators([{ name: 'and', label: 'and', minNumberOfChildren: 2 }]);

        expect(service.getLogicalOperatorByName('and')).toBeDefined();
        expect(service.getLogicalOperatorByName('and').name).toEqual('and');

        expect(service.getLogicalOperatorByName('or')).toBeUndefined();
    });

    it('should return a logical operator by name', () => {
        service.setLogicalOperators([{ name: 'and', label: 'and', minNumberOfChildren: 2 }]);
        const logicalOperator = service.getLogicalOperatorByName('and');

        expect(logicalOperator).toBeDefined();
        expect(logicalOperator.name).toEqual('and');

        service.setLogicalOperators([]);

        expect(service.getLogicalOperatorByName('and')).toBeUndefined();
    });

    it('should get operators by fieldType', () => {
        service.setFields([{ name: 'test', label: 'test', fieldType: 'test' }]);
        service.setOperators({ test: [{ name: 'test', label: 'test', component: null }] });

        expect(service.getOperatorsByFieldType('test').length).toEqual(1);
        expect(service.getOperatorsByFieldType('nothing').length).toEqual(0);
    });
});
