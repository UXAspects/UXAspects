import { $, $$, browser, ElementFinder } from 'protractor';
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

        async getTableRows(): Promise<ElementFinder[]> {
            const tbody = $('tbody');
            return await tbody.$$('tr');
        }

        async getTableRow(index: number): Promise<ElementFinder> {
            const rows = await this.getTableRows();
            return rows[index];
        }

        async clickOnTableRow(index: number): Promise<void> {
            const rows = await this.getTableRows();
            return rows[index].click();
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

        async deleteLastCondition(): Promise<void> {
            return $$('.btn-delete-condition').last().click();
        }

        async editRow(index: number): Promise<void> {
            const row = await this.getTableRow(index);
            return row.$$('button').first().click();
        }

        async getTextInputComponentTextForRow(index: number): Promise<string> {
            await this.editRow(index);
            const row = await this.getTableRow(index);
            return row.$$('input').last().getAttribute('value');
        }

        async getDateRangeInputComponentTextForRow(index: number): Promise<string> {
            await this.editRow(index);
            const row = await this.getTableRow(index);
            return row.$$('input').last().getAttribute('value');
        }

        async editTextInputComponentForRow(index: number): Promise<void> {
            await this.editRow(index);

            // Send keys to input and confirm
            const row = await this.getTableRow(index);
            await row.$$('input').last().clear();
            await row.$$('input').last().sendKeys('testing');
            await row.$$('button').first().click();
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

        async getEmptyExpressionButton(): Promise<ElementFinder> {
            const expression = await this.getExpressionObject();

            if (!expression) {
                return $$('button').first();
            } else {
                return Promise.resolve(undefined);
            }
        }

        async getOptionsForDropdown(index: number): Promise<string[]> {
            const dropdown: ElementFinder = await $$('.ux-typeahead-options')[index];

            let options: string[] = [];

            return dropdown.$$('li').map((_li: ElementFinder) => _li.getText());
        }
    }
}
