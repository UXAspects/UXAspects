import { $, browser } from 'protractor';

export class MenuPage {

    menu = $('menu');

    async getPage(): Promise<void> {
        await browser.get('#/menu');
    }

    async getMenuPlacement(): Promise<boolean> {
        const classes = await this.menu.getAttribute('class');
        console.log('🚀 ~ file: menu.po.spec.ts ~ line 13 ~ MenuPage ~ getMenuPlacement ~ classes', classes);

        return classes.split(' ').indexOf('active') !== -1;
    }
}
