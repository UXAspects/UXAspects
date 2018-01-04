import { browser, element, by, ElementFinder, protractor, $, $$ } from 'protractor';

export namespace SearchBuilderPage {
    
    export class Page {
            
        getPage(): void {
            browser.get('search-builder');
        }
        
        query = $('pre');
        buttons = $$('.search-builder-group-add-field');
        textButton = this.buttons.get(0);
        anyButton = this.buttons.get(1);
        allButton = this.buttons.get(2);
        noneButton = this.buttons.get(3);

        setQueryBtn = $('#set-query');
        setInvalidQueryBtn = $('#set-invalid-query');
        validity = $('#validity');

        async getQueryObject(): Promise<any> {
            return JSON.parse(await this.query.getText());
        }

        async addTextField(): Promise<void> {
            return this.textButton.click();
        }

        async addDateField(): Promise<void> {
            return this.anyButton.click();
        }

        async addDateRangeField(): Promise<void> {
            return this.allButton.click();
        }

        async addSelectField(): Promise<void> {
            return this.noneButton.click();
        }

        async setQuery(): Promise<void> {
            return this.setQueryBtn.click();
        }

        async setInvalidQuery(): Promise<void> {
            return this.setInvalidQueryBtn.click();
        }

        async getValid(): Promise<boolean> {
            let valid = await this.validity.getText();

            return valid === 'valid';
        }
       
    }
}