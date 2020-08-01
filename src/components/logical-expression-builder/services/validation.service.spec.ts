import { async, TestBed } from '@angular/core/testing';
import { ValidationService } from './validation.service';

describe('LogicalExpressionBuilderService', () => {
    let service: ValidationService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            providers: [ValidationService]
        });

        service = TestBed.inject(ValidationService);
    }));

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should return validationIds', () => {
        let id = service.getValidationId();
        expect(id).toEqual(0);
        id = service.getValidationId();
        expect(id).toEqual(1);
    });

    it('should set group validation states correctly', () => {
        service.setGroupValidationState(1, true);
        let state = service.getGroupValidationStates();

        expect(state.has(1)).toEqual(true);
        expect(state.get(1)).toEqual(true);

        service.setGroupValidationState(1, false);
        state = service.getGroupValidationStates();

        expect(state.has(1)).toEqual(true);
        expect(state.get(1)).toEqual(false);
    });

    it('should set condition validation states correctly', () => {
        service.setConditionValidationState(1, 1, true);
        let state = service.getConditionValidationStates();

        expect(state.has(1)).toEqual(true);
        expect(state.get(1).length).toEqual(1);
        expect(state.get(1).find((entry) => entry.id === 1)).toBeDefined();
        expect(state.get(1).find((entry) => entry.id === 1).valid).toEqual(true);

        service.setConditionValidationState(1, 2, false);
        state = service.getConditionValidationStates();

        expect(state.has(1)).toEqual(true);
        expect(state.get(1).length).toEqual(2);
        expect(state.get(1).find((entry) => entry.id === 2)).toBeDefined();
        expect(state.get(1).find((entry) => entry.id === 2).valid).toEqual(false);
    });
});
