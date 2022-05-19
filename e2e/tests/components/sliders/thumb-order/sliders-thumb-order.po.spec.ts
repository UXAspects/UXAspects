import { browser, by, element } from 'protractor';
import { SlidersPageBase } from '../sliders.po.spec';

export class SlidersThumbOrderPage extends SlidersPageBase {

    async getPage(): Promise<void> {
        await browser.get('#/sliders/thumb-order');
    }

    rangeValueMin = element(by.id('range-value-min'));
    rangeValueMiddle = element(by.id('range-value-middle'));
    rangeValueMax = element(by.id('range-value-max'));
    rangeValueNearlyMax = element(by.id('range-value-nearly-max'));
    rangeValueMinNotZero = element(by.id('range-value-min-not-zero'));
}
