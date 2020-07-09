/*
import { TestBed } from '@angular/core/testing';
import { HierarchicalSearchBuilderService } from './hierarchical-search-builder.service';
import { HierarchicalSearchBuilderModule } from './hierarchical-search-builder.module';

describe('HierarchicalSearchBuilderService', () => {
    let service: HierarchicalSearchBuilderService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [HierarchicalSearchBuilderService]
        });

        service = TestBed.inject(HierarchicalSearchBuilderService);
    });

    it('should be created and have the correct initial values', () => {
        const service = new HierarchicalSearchBuilderService();
        expect(service).toBeTruthy();
        expect(service.getLogicalOperators()).toEqual([]);
        expect(service.getFields()).toEqual([]);
    });

    it('should set and return logical operators', () => {
        const service = new HierarchicalSearchBuilderService();
        service.setLogicalOperators([{name: 'and', label: 'and'}]);
        const logicalOperators = service.getLogicalOperators();

        expect(logicalOperators).toBeDefined();
        expect(logicalOperators.length).toEqual(1);
        expect(logicalOperators[0].name).toEqual('and');
        expect(logicalOperators[0].label).toEqual('and');
    });

    it('should return a logical operator by name', () => {
        const service = new HierarchicalSearchBuilderService();
        service.setLogicalOperators([{name: 'and', label: 'and'}]);
        const logicalOperator = service.getLogicalOperatorByName('and');

        expect(logicalOperator).toBeDefined();
        expect(logicalOperator.name).toEqual('and');
        expect(logicalOperator.label).toEqual('and');

        service.setLogicalOperators([]);

        expect(service.getLogicalOperatorByName('and')).toBeUndefined();
    });
});
*/
