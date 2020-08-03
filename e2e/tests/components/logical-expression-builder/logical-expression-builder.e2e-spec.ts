import { LogicalExpressionBuilderPage } from './logical-expression-builder.po.spec';

describe('Logical Expression Builder Tests', () => {
    let page: LogicalExpressionBuilderPage.Page;

    beforeEach(async () => {
        page = new LogicalExpressionBuilderPage.Page();
        await page.getPage();
    });

    it('should have no rows when expression is empty', async () => {
        await page.setEmptyExpression();

        expect(await page.getExpressionObject()).toEqual('null');
        expect(await page.getValid()).toBeTruthy();
    });
});
