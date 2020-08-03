import { $, $$, browser } from 'protractor';

export namespace LogicalExpressionBuilderPage {

    export class Page {
        async getPage(): Promise<void> {
            await browser.get('#/logical-expression-builder');
        }

        expression = $('pre');
        buttons = $$('.search-builder-group-add-field');
        tableRows = $$('tr');

        setEmptyExpressionBtn = $('#set-empty-expression');

        validity = $('#valid');

        async getExpressionObject(): Promise<any> {
            return JSON.parse(await this.expression.getText());
        }

        async getValid(): Promise<boolean> {
            let valid = await this.validity.getText();

            return valid === 'valid';
        }

        async setEmptyExpression(): Promise<any> {
            return this.setEmptyExpressionBtn.click();
        }
    }
}
