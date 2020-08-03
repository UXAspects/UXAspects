import { $, $$, browser } from 'protractor';

export namespace LogicalExpressionBuilderPage {

    export class Page {
        async getPage(): Promise<void> {
            await browser.get('#/logical-expression-builder');
        }

        expression = $('pre');
        table = $('.leb-table');

        setEmptyExpressionBtn = $('#set-empty-expression');
        setOneConditionBtn = $('#set-one-condition');

        validity = $('#valid');

        async getExpressionObject(): Promise<any> {
            return JSON.parse(await this.expression.getText());
        }

        async getTable(): Promise<any> {
            return this.table;
        }

        async getConditionsRowsCount(): Promise<any> {
            return $$('.leb-condition-row').count();
        }

        async getValid(): Promise<boolean> {
            let valid = await this.validity.getText();

            return valid === 'valid';
        }

        async setEmptyExpression(): Promise<any> {
            return this.setEmptyExpressionBtn.click();
        }

        async setOneCondition(): Promise<any> {
            return this.setOneConditionBtn.click();
        }
    }
}
