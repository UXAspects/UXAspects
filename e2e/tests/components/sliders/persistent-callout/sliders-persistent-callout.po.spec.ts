import { browser, by, element } from 'protractor';
import { SlidersPageBase } from '../sliders.po.spec';

export class SlidersPersistentCalloutPage extends SlidersPageBase {
  rangeCallout = element(by.id('range-callout'));
  rangeCalloutOnDrag = element(by.id('range-callout-on-drag'));

  async getPage(): Promise<void> {
    await browser.get('#/sliders/persistent-callout');
  }
}
