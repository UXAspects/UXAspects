import { $, $$, browser, ElementArrayFinder, ElementFinder } from 'protractor';
import { Expression } from '../../../../src/components/logical-expression-builder';

export namespace LogicalExpressionBuilderPage {

    export class Page {
        async getPage(): Promise<void> {
            await browser.get('#/logical-expression-builder');
        }

        expression = $('pre');

        setInvalidExpressionBtn = $('#set-invalid-expression');
        setOneConditionBtn = $('#set-one-condition');
        setTwoConditionsBtn = $('#set-two-conditions');
        setComplexConditionBtn = $('#set-complex-expression');

        validity = $('#valid');

        async getExpressionObject(): Promise<Expression> {
            return JSON.parse(await this.expression.getText());
        }

        async getTableRows(): Promise<ElementArrayFinder> {
            const tbody = $('tbody');
            return await tbody.$$('tr');
        }

        async getTableRow(index: number): Promise<ElementFinder> {
            return $('tbody').$$('tr').get(index);
        }

        async clickOnTableRow(index: number): Promise<void> {
            return $('tbody').$$('tr').get(index).click();
        }

        async getTabIndex(index: number): Promise<string> {
            const row: ElementFinder = await this.getTableRow(index);
            return row.getAttribute('tabindex');
        }

        async getConditionRowCount(): Promise<number> {
            return $$('.leb-condition-row').count();
        }

        async getGroupRowCount(): Promise<number> {
            return $$('.leb-group').count();
        }

        async getGroupRowError(): Promise<ElementFinder> {
            return $$('.leb-group').first().$('.text-error');
        }

        async getValid(): Promise<boolean> {
            let valid = await this.validity.getText();

            return valid === 'valid';
        }

        async setInvalidExpression(): Promise<void> {
            return this.setInvalidExpressionBtn.click();
        }

        async setOneCondition(): Promise<void> {
            return this.setOneConditionBtn.click();
        }

        async setTwoConditions(): Promise<void> {
            return this.setTwoConditionsBtn.click();
        }

        async setComplexCondition(): Promise<void> {
            return this.setComplexConditionBtn.click();
        }

        async addSecondCondition(): Promise<void> {
            const row = await this.getTableRow(1);
            return row.$('button').click();
        }

        async editRow(index: number): Promise<void> {
            const row = await this.getTableRow(index);
            return row.$$('button').first().click();
        }

        async getInputComponentTextForRow(index: number): Promise<string> {
            await this.editRow(index);
            const row = await this.getTableRow(index);
            return row.$$('input').last().getAttribute('value');
        }

        async getSelectInputComponentTextForRow(index: number): Promise<string[]> {
            await this.editRow(index);
            const row = await this.getTableRow(index);
            return row.$$('ol[role=combobox]').last().$$('li').map((_item: ElementFinder) => _item.getText());
        }

        async editTextInputComponentForRow(index: number, confirm: boolean = true): Promise<void> {
            await this.editRow(index);

            // Send keys to input and confirm
            const row: ElementFinder = await this.getTableRow(index);
            await row.$$('input').last().clear();
            await row.$$('input').last().sendKeys('testing');

            if (confirm) {
                await row.$$('button').first().click();
            } else {
                await row.$$('button').last().click();
            }
        }

        async getEmptyExpressionButton(): Promise<ElementFinder> {
            const expression = await this.getExpressionObject();

            if (!expression) {
                return $$('button').first();
            } else {
                return Promise.resolve(undefined);
            }
        }

        async getOptionsForDropdown(dropdownIndex: number, rowIndex: number): Promise<string[]> {
            const row: ElementFinder = await this.getTableRow(rowIndex);
            await row.$$('input').get(dropdownIndex).click();
            const dropdownElement: ElementFinder = await row.$$('ol').get(dropdownIndex);

            return dropdownElement.$$('li').map((_li: ElementFinder) => _li.getText());
        }

        async deleteLastCondition(): Promise<any> {
            return $$('.delete-btn').last().click();
        }

        async getFieldLabelForRow(index: number): Promise<string> {
            const row = await this.getTableRow(index);
            return row.$('.leb-field-display').getText();
        }

        async getOperatorLabelForRow(index: number): Promise<string> {
            const row = await this.getTableRow(index);
            return row.$('.leb-operator-display').getText();
        }

        async getValueLabelForRow(index: number): Promise<string> {
            const row = await this.getTableRow(index);
            return row.$('.leb-value-display').getText();
        }
    }
}
