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

    it('should set validation states correctly', () => {
        service.setValidationState([0, 1], true);
        let state = service.getValidationStates();

        expect(state.has('0-1')).toEqual(true);
        expect(state.get('0-1')).toEqual(true);

        service.setValidationState([0, 2], false);
        state = service.getValidationStates();

        expect(state.has('0-2')).toEqual(true);
        expect(state.get('0-2')).toEqual(false);
    });
});
