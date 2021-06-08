import { MenuPage } from './menu.po.spec';

describe('Menu', () => {

    let page: MenuPage;

    beforeEach(async () => {
        page = new MenuPage();
        await page.getPage();
    });

    it('should change menu placement after initialization', async () => {
        await console.log('start', page.getMenuPlacement());
    });
});
