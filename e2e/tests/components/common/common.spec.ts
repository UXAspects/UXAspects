import { browser, ElementFinder } from 'protractor';

export class Functions {

  async moveToElement(item: ElementFinder): Promise<void> {
    return await browser.actions().
      mouseMove(item, { x: 0, y: 0 }).
      perform();
  }

  async moveToElementAndMouseUpDown(item: ElementFinder): Promise<void> {
    return await browser.actions().
      mouseMove(item, { x: 0, y: 0 }).
      mouseDown().
      mouseUp().
      perform();
  }

  async moveToElementAndClick(item: ElementFinder): Promise<void> {
    return await browser.actions().
      mouseMove(item, { x: 0, y: 0 }).
      click().
      perform();
  }
}

