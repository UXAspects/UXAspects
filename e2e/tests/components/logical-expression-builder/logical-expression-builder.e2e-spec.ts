import { LogicalExpressionBuilderPage } from './logical-expression-builder.po.spec';

describe('Logical Expression Builder Tests', () => {
    let page: LogicalExpressionBuilderPage.Page;

    beforeEach(async () => {
        page = new LogicalExpressionBuilderPage.Page();
        await page.getPage();
    });

    it('should have no rows when expression is empty', async () => {
        await page.setEmptyExpression();

        const conditionRows = await page.getConditionsRows();

        expect(await page.getExpressionObject()).toEqual(null);
        expect(conditionRows.count()).toEqual(0);
        expect(await page.getValid()).toBeTruthy();
    });

    it('should display one row when expression is just a condition', async () => {
        await page.setOneCondition();

        const expression = await page.getExpressionObject();
        const conditionRows = await page.getConditionsRows();

        expect(expression).toBeDefined();
        expect(expression.children).toBeUndefined();
        expect(conditionRows.count()).toEqual(1);
        expect(await page.getValid()).toBeTruthy();
    });

    it('should embed condition in group when a second one is added', async () => {
        await page.setOneCondition();
        await page.addSecondCondition();

        const expression = await page.getExpressionObject();
        const conditionRows = await page.getConditionsRows();
        const groupRows = await page.getGroupRows();

        expect(expression).toBeDefined();
        expect(expression.children).toBeDefined();
        expect(expression.children.length).toEqual(2);
        expect(conditionRows.count()).toEqual(2);
        expect(groupRows.count()).toEqual(1);
        expect(await page.getValid()).toBeTruthy();
    });

    it('should display error when an invalid expression is set', async () => {
        await page.setInvalidExpression();

        const groupRows = await page.getGroupRows();

        expect(groupRows.first().$('td.text-error')).toBeDefined();
        expect(await page.getValid()).toBeFalsy();
    });
});
