import { RowPathPipe } from './row-path.pipe';

describe('RowPath Pipe', () => {
    let pipe: RowPathPipe;

    beforeEach(() => pipe = new RowPathPipe());

    it('should create an instance', () => {
        expect(pipe).toBeTruthy();
    });

    it('should create a new row path based on index and parent path', () => {
        const index = 0;
        const parentPath = [0];
        const expected = [0, 0];

        const actual = pipe.transform(index, parentPath);

        expect(actual).toBeTruthy();
        expect(actual.length).toEqual(expected.length);
        expect(actual.join()).toEqual(expected.join());
    });
});
