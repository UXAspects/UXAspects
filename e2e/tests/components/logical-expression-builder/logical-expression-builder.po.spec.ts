import { $, $$, browser } from 'protractor';

export namespace LogicalExpressionBuilderPage {

    export class Page {
        async getPage(): Promise<void> {
            await browser.get('#/logical-expression-builder');
        }

        expression = $('pre');
        table = $('.leb-table');

        setEmptyExpressionBtn = $('#set-empty-expression');
        setInvalidExpressionBtn = $('#set-invalid-expression');
        setOneConditionBtn = $('#set-one-condition');

        validity = $('#valid');

        async getExpressionObject(): Promise<any> {
            return JSON.parse(await this.expression.getText());
        }

        async getTable(): Promise<any> {
            return this.table;
        }

        async getConditionRowCount(): Promise<any> {
            return $$('.leb-condition-row').count();
        }

        async getGroupRowCount(): Promise<any> {
            return $$('.leb-group').count();
        }

        async getGroupRowError(): Promise<any> {
            return $$('.leb-group').first().$('.text-error');
        }

        async getValid(): Promise<boolean> {
            let valid = await this.validity.getText();

            return valid === 'valid';
        }

        async setEmptyExpression(): Promise<any> {
            return this.setEmptyExpressionBtn.click();
        }

        async setInvalidExpression(): Promise<any> {
            return this.setInvalidExpressionBtn.click();
        }

        async setOneCondition(): Promise<any> {
            return this.setOneConditionBtn.click();
        }

        async addSecondCondition(): Promise<any> {
            return $$('tr').last().$('td').$('button').click();
        }

        async deleteLastCondition(): Promise<any> {
            return $$('.btn-delete-condition').last().click();
        }
    }
}
