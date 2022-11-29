import { browser, Key } from 'protractor';
import { imageCompare } from '../../common/image-compare';
import { MenuItemCustomControlPage } from './menu-item-custom-control.po.spec';

describe('Menu Item Custom Control Directive', () => {

    let page: MenuItemCustomControlPage;

    beforeEach(async () => {
        page = new MenuItemCustomControlPage();
        await page.getPage();

        await page.topFocus.click();

        // open menu
        await browser.actions()
            .sendKeys(Key.TAB)
            .sendKeys(Key.SPACE)
            .perform();
    });

    it('should open the and focus the component input and display the focus indicator', async () => {
        expect(await page.activeElementAttr('id')).toBe('ux-toggleswitch-1-input');
        expect(await imageCompare('menu-item-custom-control-focus-indicator')).toEqual(0);
    });

    it('should add role menuitem to the components using the directive', async () => {
        expect(await page.toggleSwitch.getAttribute('role')).toBe('menuitem');
        expect(await page.checkboxes.get(0).getAttribute('role')).toBe('menuitem');
        expect(await page.checkboxes.get(1).getAttribute('role')).toBe('menuitem');
        expect(await page.checkboxes.get(2).getAttribute('role')).toBe('menuitem');
        expect(await page.radioButtons.get(0).getAttribute('role')).toBe('menuitem');
        expect(await page.radioButtons.get(1).getAttribute('role')).toBe('menuitem');
        expect(await page.radioButtons.get(2).getAttribute('role')).toBe('menuitem');
    });


    it('should focus the inputs of the components when moving through the menu with keyboard navigation', async () => {
        await browser.actions()
            .sendKeys(Key.ARROW_DOWN)
            .sendKeys(Key.ARROW_DOWN)
            .perform();
        expect(await page.activeElementAttr('id')).toBe('ux-checkbox-2-input');

        await browser.actions().sendKeys(Key.ARROW_DOWN).perform();
        expect(await page.activeElementAttr('id')).toBe('ux-checkbox-3-input');

        await browser.actions()
            .sendKeys(Key.ARROW_DOWN)
            .sendKeys(Key.ARROW_DOWN)
            .perform();
        expect(await page.activeElementAttr('id')).toBe('ux-radio-button-1-input');
    });

    it('should disable the components and menu items when disabled is set to true', async () => {
        await page.disableCheckbox.click();
        await page.topFocus.click();

        await browser.actions()
            .sendKeys(Key.TAB)
            .sendKeys(Key.SPACE)
            .sendKeys(Key.ARROW_DOWN)
            .sendKeys(Key.ARROW_DOWN)
            .perform();

        expect(await imageCompare('menu-item-custom-control-disabled')).toEqual(0);
        expect(await page.activeElementAttr('id')).toBe('ux-checkbox-4-input');
    });

    it('should update the toggleswitch value using the keyboard', async () => {
        expect(await page.toggleSwitchValue.getAttribute('innerText')).toBe('false');

        await page.topFocus.click();

        await browser.actions()
            .sendKeys(Key.TAB)
            .sendKeys(Key.SPACE)
            .sendKeys(Key.SPACE)
            .perform();

        expect(await page.toggleSwitchValue.getAttribute('innerText')).toBe('true');
    });

    it('should update the checkbox value using the keyboard', async () => {
        expect(await page.checkboxValue.getAttribute('innerText')).toBe('{ "option1": true, "option2": false, "option3": false }');

        await page.topFocus.click();
        await browser.actions()
            .sendKeys(Key.TAB)
            .sendKeys(Key.SPACE)
            .sendKeys(Key.ARROW_DOWN)
            .sendKeys(Key.ARROW_DOWN)
            .sendKeys(Key.SPACE)
            .sendKeys(Key.ARROW_DOWN)
            .sendKeys(Key.SPACE)
            .perform();

        expect(await page.checkboxValue.getAttribute('innerText')).toBe('{ "option1": false, "option2": true, "option3": false }');
    });

    it('should update the radio button group value using the keyboard', async () => {
        expect(await page.radioValue.getAttribute('innerText')).toBe('option1');

        await page.topFocus.click();
        await browser.actions()
            .sendKeys(Key.TAB)
            .sendKeys(Key.SPACE)
            .sendKeys(Key.ARROW_DOWN)
            .sendKeys(Key.ARROW_DOWN)
            .sendKeys(Key.ARROW_DOWN)
            .sendKeys(Key.ARROW_DOWN)
            .sendKeys(Key.ARROW_DOWN)
            .sendKeys(Key.ARROW_DOWN)
            .sendKeys(Key.SPACE)
            .perform();

        expect(await page.radioValue.getAttribute('innerText')).toBe('option2');
    });

});
