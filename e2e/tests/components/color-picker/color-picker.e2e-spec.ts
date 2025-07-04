import { browser, Key } from 'protractor';
import { imageCompare } from '../common/image-compare';
import { ColorPickerPage } from './color-picker.po.spec';

describe('Color Picker', () => {
  let page: ColorPickerPage;

  beforeEach(async () => {
    page = new ColorPickerPage();
    await page.getPage();
  });

  it('should focus the first color when accessing via the keyboard', async () => {
    await page.colorPickerToggle.sendKeys(Key.ENTER);
    expect(await browser.driver.switchTo().activeElement().getAttribute('aria-label')).toEqual(
      'Select color Primary'
    );
    expect(await imageCompare('color-picker-initial')).toEqual(0);
  });

  it('should focus the most recently selected color when accessing via the keyboard', async () => {
    // Select the secondary color
    await page.colorPickerToggle.sendKeys(Key.ENTER);
    await browser.actions().sendKeys(Key.RIGHT, Key.RIGHT, Key.ENTER).perform();
    expect(await page.selectedColorHex.getText()).toEqual('#ffffff');
    expect(await browser.driver.switchTo().activeElement().getAttribute('id')).toEqual(
      'color-picker-toggle'
    );

    // Reopen the dropdown
    await page.colorPickerToggle.sendKeys(Key.ENTER);
    expect(await browser.driver.switchTo().activeElement().getAttribute('aria-label')).toEqual(
      'Select color Secondary'
    );
  });
});
