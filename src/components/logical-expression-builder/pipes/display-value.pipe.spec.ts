import { DisplayValuePipe } from './display-value.pipe';
import { LogicalExpressionBuilderService } from '../services/logical-expression-builder.service';
import { DateFormatterPipe } from '../../../pipes/date-formatter/date-formatter.pipe';

describe('L10nPipe', () => {
    let pipe: DisplayValuePipe;
    let lebServiceStub: LogicalExpressionBuilderService;
    let datePipeStub: DateFormatterPipe;

    beforeEach(() => {
        lebServiceStub = {
            getDisplayValueFunction: (): any => {
                return undefined;
            },
        } as any;

        datePipeStub = {
            transform(_: any): string | null {
                return 'Jul 23, 2020, 4:40:31 PM';
            }
        } as any;

        pipe = new DisplayValuePipe(lebServiceStub, datePipeStub);
    });

    it('should create an instance', () => {
        expect(pipe).toBeTruthy();
    });

    it('should transform text values', () => {
        expect(pipe.transform('testValue', 'text')).toEqual('testValue');
    });

    it('should transform number values', () => {
        expect(pipe.transform(12, 'number')).toEqual('12');
    });

    it('should transform enum values', () => {
        const fieldData = {
            options: [{ name: 'a', label: 'A' }, { name: 'b', label: 'B' }]
        };

        expect(pipe.transform(['a', 'b'], 'enum', fieldData)).toEqual('A, B');
    });

    it('should transform date values', () => {
        const date = 1595515231584;

        expect(pipe.transform(date, 'date', { dateFormat: 'medium' })).toEqual('Jul 23, 2020, 4:40:31 PM');
    });

    it('should transform date range values', () => {
        const start = 1595515231584;
        const end = 1595515231584;

        expect(pipe.transform({
            start: start,
            end: end
        }, 'dateRange', { dateFormat: 'medium' })).toEqual('Jul 23, 2020, 4:40:31 PM — Jul 23, 2020, 4:40:31 PM');
    });
});
