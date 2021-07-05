import {IsEmphasizedPipe} from './is-emphasized.pipe';

describe('IsEmphasized Pipe', () => {
    let pipe: IsEmphasizedPipe;

    beforeEach(() => {
        pipe = new IsEmphasizedPipe();
    });

    it('should create an instance', () => {
        expect(pipe).toBeTruthy();
    });

    it('should return true if same path until index', () => {
        expect(pipe.transform([0, 1], [0, 0], 0)).toBeTrue();
        expect(pipe.transform([1, 0, 5], [1, 0, 3], 1)).toBeTrue();
        expect(pipe.transform([3, 4, 7, 8, 4, 7], [3, 4, 7, 8, 4, 0], 4)).toBeTrue();
        expect(pipe.transform([1, 1], [0, 0], 0)).toBeTrue();
        expect(pipe.transform([1, 1, 5], [1, 0, 6], 1)).toBeTrue();
    });

    it('should return false if not same path until', () => {
        expect(pipe.transform([1, 0, 5], [1, 0, 3], 0)).toBeFalse();
        expect(pipe.transform([3, 4, 7, 8, 4, 7], [3, 4, 7, 8, 4, 0], 2)).toBeFalse();
        expect(pipe.transform([3, 5, 7, 8, 4, 7], [3, 4, 7, 0, 3, 8], 4)).toBeFalse();
        expect(pipe.transform([3, 5, 7, 8, 4, 7], [3, 4, 7, 0, 3, 8], 2)).toBeFalse();
    });
});
