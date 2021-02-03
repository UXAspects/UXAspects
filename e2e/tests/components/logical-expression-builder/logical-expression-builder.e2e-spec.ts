import { LogicalExpressionBuilderPage } from './logical-expression-builder.po.spec';
import { imageCompare } from '../common/image-compare';

describe('Logical Expression Builder', () => {
    let page: LogicalExpressionBuilderPage.Page;

    beforeEach(async () => {
        page = new LogicalExpressionBuilderPage.Page();
        await page.getPage();
    });

    it('should have correct initial state', async () => {
        const btn = await page.getEmptyExpressionButton();

        expect(await imageCompare('logical-expression-builder-initial')).toEqual(0);

        expect(await page.getExpressionObject()).toEqual(null);
        expect(await page.getConditionRowCount()).toEqual(0);
        expect(await page.getGroupRowCount()).toEqual(0);
        expect(await page.getValid()).toBeTruthy();
        expect(btn).toBeDefined();
        expect(await btn.getText()).toEqual('ADD CONDITION');
    });

    it('should display one row when expression is just a condition', async () => {
        await page.setOneCondition();

        expect(await imageCompare('logical-expression-builder-one-row')).toEqual(0);

        const expression = await page.getExpressionObject();

        expect(expression).toBeDefined();
        expect(expression['children']).toBeUndefined();
        expect(await page.getConditionRowCount()).toEqual(1);
        expect(await page.getValid()).toBeTruthy();
    });

    it('should embed condition in group when a second one is added', async () => {
        await page.setOneCondition();
        await page.addSecondCondition();

        expect(await imageCompare('logical-expression-builder-two-rows')).toEqual(0);

        const expression = await page.getExpressionObject();
        const rows = await page.getTableRows();

        expect(expression).toBeDefined();
        expect(expression.type).toEqual('group');
        expect(expression.logicalOperator).toEqual('and');
        expect(expression.children).toBeDefined();
        expect(rows.length).toEqual(4);
        // second condition is in edit mode, the expression should therefore be invalid
        expect(await page.getValid()).toBeFalsy();
    });

    it('should allow exactly one group with exactly one condition', async () => {
        await page.setTwoConditions();
        await page.deleteLastCondition();

        expect(await imageCompare('logical-expression-builder-one-row-group')).toEqual(0);

        const expression = await page.getExpressionObject();

        expect(expression).toBeDefined();
        expect(expression.type).toEqual('group');
        expect(expression['children'].length).toEqual(1);
        expect(await page.getConditionRowCount()).toEqual(1);
        expect(await page.getGroupRowCount()).toEqual(1);
    });

    it('should display error when an invalid expression is set', async () => {
        await page.setInvalidExpression();

        expect(await imageCompare('logical-expression-builder-error')).toEqual(0);

        expect(await page.getGroupRowError()).toBeDefined();
        expect(await page.getValid()).toBeFalsy();
    });

    it('should be invalid if a condition is being edited', async () => {
        await page.setOneCondition();
        await page.editRow(0);

        expect(await imageCompare('logical-expression-builder-edit-mode')).toEqual(0);

        expect(await page.getValid()).toBeFalsy();
    });

    it('should set tabindexes correctly', async () => {
        await page.setComplexCondition();

        expect(await imageCompare('logical-expression-builder-complex')).toEqual(0);

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

    it('should set options for fields and operators correctly', async () => {
        await page.setComplexCondition();
        await page.editRow(1);
        const fieldOptions = await page.getOptionsForDropdown(0, 1);
        const operatorOptions = await page.getOptionsForDropdown(1, 1);

        expect(fieldOptions.length).toEqual(5);
        expect(fieldOptions).toContain('Author');
        expect(fieldOptions).toContain('Created');
        expect(fieldOptions).toContain('Edited');
        expect(fieldOptions).toContain('Version');
        expect(fieldOptions).toContain('Category');


        expect(operatorOptions.length).toEqual(2);
        expect(operatorOptions).toContain('equals');
        expect(operatorOptions).toContain('contains');
    });

    it('should update expression and label after editing', async () => {
        await page.setComplexCondition();
        await page.editTextInputComponentForRow(1);
        const expression = await page.getExpressionObject();

        expect(expression).toBeDefined();
        expect(expression.children.length).toEqual(5);
        expect(expression.children[0]['value']).toEqual('testing');
        expect(await page.getValueLabelForRow(1)).toEqual('testing');
    });

    it('should reset condition if editing is cancelled', async () => {
        await page.setOneCondition();
        await page.editTextInputComponentForRow(0, false);
        const expression = await page.getExpressionObject();

        expect(expression).toBeDefined();
        expect(expression.type).toEqual('condition');
        expect(expression.value).toEqual('test');
        expect(await page.getValid()).toBeTruthy();
    });

    it('should display correct values in static mode', async () => {
        await page.setComplexCondition();

        expect(await page.getValueLabelForRow(1)).toEqual('test');
        expect(await page.getValueLabelForRow(2)).toEqual('6/24/20, 6:19 AM — 6/24/20, 6:19 AM');
        expect(await page.getValueLabelForRow(3)).toEqual('7/23/20, 2:40 PM');
        expect(await page.getValueLabelForRow(4)).toEqual('Performance, Security');
        expect(await page.getValueLabelForRow(5)).toEqual('3');
    });

    describe('prefills Input Component:', () => {
        beforeEach(async () => {
            await page.setComplexCondition();
        });

        it('Text Input Component', async () => {
            expect(await page.getInputComponentTextForRow(1)).toEqual('test');
        });

        it('Date Range Input Component', async () => {
            expect(await page.getInputComponentTextForRow(2)).toEqual('6/24/20, 6:19 AM — 6/24/20, 6:19 AM');
        });

        it('Date Input Component', async () => {
            expect(await page.getInputComponentTextForRow(3)).toEqual('7/23/20, 2:40 PM');
        });

        it('Select Input Component', async () => {
            const tagContent: string[] = await page.getSelectInputComponentTextForRow(4);

            expect(tagContent).toContain('Security');
            expect(tagContent).toContain('Performance');
        });

        it('Number Input Component', async () => {
            expect(await page.getInputComponentTextForRow(5)).toEqual('3');
        });
    });
});
