import { $$, browser, Key } from 'protractor';
import { imageCompare } from '../../common/image-compare';
import { MenuFallbackPage } from './menu-fallback.po.spec';

describe('Menu (Fallback) Tests', () => {
  let page: MenuFallbackPage;

  beforeEach(async () => {
    page = new MenuFallbackPage();
    await page.getPage();
  });

  it('should fallback to right when left is unavailable', async () => {
    await page.leftMenu.click();

    expect(await page.cdkOverlayContainer.isPresent()).toBe(true);
    expect(await imageCompare('menu-fallback-right')).toEqual(0);
  });

  it('should fallback to left when right is unavailable', async () => {
    await page.rightMenu.click();

    expect(await page.cdkOverlayContainer.isPresent()).toBe(true);
    expect(await imageCompare('menu-fallback-left')).toEqual(0);
  });

  it('should fallback to bottom when top is unavailable', async () => {
    await page.topMenu.click();

    expect(await page.cdkOverlayContainer.isPresent()).toBe(true);
    expect(await imageCompare('menu-fallback-bottom')).toEqual(0);
  });

  it('should fallback to top when bottom is unavailable', async () => {
    await page.bottomMenu.click();

    expect(await page.cdkOverlayContainer.isPresent()).toBe(true);
    expect(await imageCompare('menu-fallback-top')).toEqual(0);
  });

  it('should fallback to the top right when left botto is unavailable', async () => {
    await page.bottomLeftMenu.click();

    expect(await page.cdkOverlayContainer.isPresent()).toBe(true);
    expect(await imageCompare('menu-fallback-top-right')).toEqual(0);
  });

  describe('Sub Menu', () => {
    it('should default to bottom right', async () => {
      await page.leftMenu.click();
      await browser.actions().sendKeys(Key.SPACE).perform();
      await browser.actions().sendKeys(Key.SPACE).perform();
      await browser.actions().sendKeys(Key.ARROW_RIGHT).perform();

      // check menu and submenu are open
      expect((await $$('.ux-menu')).length).toBe(2);
      expect(await imageCompare('menu-fallback-submenu-bottom-right')).toEqual(0);
    });

    it('should fallback to top right when space at the bottom is unavailable', async () => {
      await page.bottomMenu.click();
      await browser.actions().sendKeys(Key.SPACE).perform();
      await browser.actions().sendKeys(Key.SPACE).perform();
      await browser.actions().sendKeys(Key.ARROW_RIGHT).perform();

      // check menu and submenu are open
      expect((await $$('.ux-menu')).length).toBe(2);
      expect(await imageCompare('menu-fallback-submenu-top-right')).toEqual(0);
    });

    it('should fallback to top left when space at the bottom and right is unavailable', async () => {
      await page.bottomRightMenu.click();
      await browser.actions().sendKeys(Key.SPACE).perform();
      await browser.actions().sendKeys(Key.SPACE).perform();
      await browser.actions().sendKeys(Key.ARROW_RIGHT).perform();

      // check menu and submenu are open
      expect((await $$('.ux-menu')).length).toBe(2);
      expect(await imageCompare('menu-fallback-submenu-top-left')).toEqual(0);
    });

    it('should fallback to bottom left when space at the right is unavailable', async () => {
      await page.rightMenu.click();
      await browser.actions().sendKeys(Key.SPACE).perform();
      await browser.actions().sendKeys(Key.SPACE).perform();
      await browser.actions().sendKeys(Key.ARROW_RIGHT).perform();

      // check menu and submenu are open
      expect((await $$('.ux-menu')).length).toBe(2);
      expect(await imageCompare('menu-fallback-submenu-bottom-left')).toEqual(0);
    });
  });
});
