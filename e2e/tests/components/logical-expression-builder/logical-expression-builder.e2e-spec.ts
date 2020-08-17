import { LogicalExpressionBuilderPage } from './logical-expression-builder.po.spec';
import { ExpressionCondition, ExpressionGroup } from '../../../../src/components/logical-expression-builder';

describe('Logical Expression Builder Tests', () => {
    let page: LogicalExpressionBuilderPage.Page;

    beforeEach(async () => {
        page = new LogicalExpressionBuilderPage.Page();
        await page.getPage();
    });

    it('should have correct initial state', async () => {
        const btn = await page.getEmptyExpressionButton();

        expect(await page.getExpressionObject()).toEqual(null);
        expect(await page.getConditionRowCount()).toEqual(0);
        expect(await page.getGroupRowCount()).toEqual(0);
        expect(await page.getValid()).toBeTruthy();
        expect(btn).toBeDefined();
        expect(await btn.getText()).toEqual('ADD CONDITION');
    });

    it('should display one row when expression is just a condition', async () => {
        await page.setOneCondition();

        const expression = await page.getExpressionObject() as ExpressionCondition;

        expect(expression).toBeDefined();
        expect(expression['children']).toBeUndefined();
        expect(await page.getConditionRowCount()).toEqual(1);
        expect(await page.getValid()).toBeTruthy();
    });

    it('should embed condition in group when a second one is added', async () => {
        await page.setOneCondition();
        await page.addSecondCondition();

        const expression: ExpressionGroup = await page.getExpressionObject() as ExpressionGroup;
        const rows = await page.getTableRows();

        expect(expression).toBeDefined();
        expect(expression.type).toEqual('group');
        expect(expression.logicalOperator).toEqual('and');
        expect(expression.children).toBeDefined();
        expect(rows.length).toEqual(4);
        // second condition is in edit mode, the expression should therefore be invalid
        expect(await page.getValid()).toBeFalsy();
    });

    it('should only show one condition if there is one group with one condition', async () => {
        await page.setTwoConditions();
        await page.deleteLastCondition();

        const expression = await page.getExpressionObject();

        expect(expression).toBeDefined();
        expect(expression.type).toEqual('condition');
        expect(expression['children']).toBeUndefined();
        expect(await page.getConditionRowCount()).toEqual(1);
        expect(await page.getValid()).toBeTruthy();
    });

    it('should display error when an invalid expression is set', async () => {
        await page.setInvalidExpression();

        expect(await page.getGroupRowError()).toBeDefined();
        expect(await page.getValid()).toBeFalsy();
    });

    it('should set tabindexes correctly', async () => {
        await page.setComplexCondition();

        const expression = await page.getExpressionObject();

        expect(expression).toBeDefined();
        expect(expression.type).toEqual('group');

        expect(await page.getTabIndex(0)).toBe('0');
        expect(await page.getTabIndex(1)).toBe('-1');
        expect(await page.getTabIndex(2)).toBe('-1');
        expect(await page.getTabIndex(3)).toBe('-1');
        expect(await page.getTabIndex(4)).toBe('-1');
        expect(await page.getTabIndex(5)).toBe('-1');
        expect(await page.getTabIndex(6)).toBe('-1');

        await page.clickOnTableRow(1);

        expect(await page.getTabIndex(0)).toBe('-1');
        expect(await page.getTabIndex(1)).toBe('0');
        expect(await page.getTabIndex(2)).toBe('-1');
        expect(await page.getTabIndex(3)).toBe('-1');
        expect(await page.getTabIndex(4)).toBe('-1');
        expect(await page.getTabIndex(5)).toBe('-1');
        expect(await page.getTabIndex(6)).toBe('-1');
    });

    it('should prefill the Text Input Component', async () => {
        await page.setComplexCondition();

        expect(await page.getTextInputComponentTextForRow(1)).toEqual('test');
    });

    it('should update expression and label after editing', async () => {
        await page.setComplexCondition();
        await page.editTextInputComponentForRow(1);
        const expression = await page.getExpressionObject() as ExpressionGroup;

        expect(expression).toBeDefined();
        expect(expression.children.length).toEqual(5);
        expect(expression.children[0]['value']).toEqual('testing');
        expect(await page.getValueLabelForRow(1)).toEqual('testing');
    });

    it('should display correct values in static mode', async () => {
        await page.setComplexCondition();

        expect(await page.getValueLabelForRow(1)).toEqual('test');
        expect(await page.getValueLabelForRow(2)).toEqual('6/24/20, 6:19 AM — 6/24/20, 6:19 AM');
        expect(await page.getValueLabelForRow(3)).toEqual('7/23/20, 2:40 PM');
        expect(await page.getValueLabelForRow(4)).toEqual('Performance, Security');
        expect(await page.getValueLabelForRow(5)).toEqual('3');
    });
});
