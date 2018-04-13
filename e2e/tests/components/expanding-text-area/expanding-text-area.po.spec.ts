import { browser, by, element } from 'protractor';

export class ExpandingTextAreaPage {
        
    textarea = element(by.tagName('textarea'));

    getPage(): void {
        browser.get('#/expanding-text-area');
    }

    async setText(text: string): Promise<void> {
        return await this.textarea.sendKeys(text);
    }

    async getText(): Promise<string> {
        return await this.textarea.getAttribute('value');
    }

    async getHeight(): Promise<number> {
        return (await this.textarea.getSize()).height;
    }
}
