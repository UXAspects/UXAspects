import { L10nPipe } from './l10n.pipe';
import { LogicalExpressionBuilderService } from '../services/logical-expression-builder.service';

describe('L10nPipe', () => {
    let pipe: L10nPipe;
    let hsbServiceStub: LogicalExpressionBuilderService;

    beforeEach(() => {
        hsbServiceStub = {
            getLocalizedStrings: () => {
                return {
                    testValue: 'Test Value',
                    testArray: ['Item 1', 'Item 2'],
                    testEmptyString: '',
                };
            },
        } as any;

        pipe = new L10nPipe(hsbServiceStub);
    });

    it('should create an instance', () => {
        expect(pipe).toBeTruthy();
    });

    it('should return localized string if it exists', () => {
        expect(pipe.transform('testValue')).toEqual('Test Value');
    });

    it('should return undefined if localized string does not exists', () => {
        expect(pipe.transform('xy')).toBeUndefined();
    });

    it('should return undefined if localized string is empty', () => {
        expect(pipe.transform('testEmptyString')).toBeUndefined();
    });

    it('should return array of localized strings if it exists', () => {
        expect(pipe.transform('testArray')).toEqual(['Item 1', 'Item 2']);
    });
});
