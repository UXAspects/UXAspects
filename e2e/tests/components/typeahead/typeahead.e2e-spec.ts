import { TypeaheadPage } from './typeahead.po.spec';
import { imageCompareFullPageScreen } from '../common/image-compare';
import { browser } from 'protractor';

describe('TypeaheadPage Tests', () => {

    let page: TypeaheadPage;

    beforeEach(async () => {
        page = new TypeaheadPage();
        await page.getPage();
    });

    it('should allow dropDirection to be set to up and down and change the direction of the dropdown', async () => {

        await page.clickOnDropDirectionDown();

        await page.typeaheadInput.click();
        expect(await page.getTypeaheadOptionListClass()).toContain('ux-typeahead-all-options');
        expect(await page.getTypeaheadClass()).not.toContain('drop-up');

        await page.clickOnDropDirectionUp();

        await page.typeaheadInput.click();
        expect(await page.getTypeaheadOptionListClass()).toContain('ux-typeahead-all-options');
        expect(await page.getTypeaheadClass()).toContain('drop-up');
    });


    it('should allow dropDirection to be auto and automatically change the drop direction depending on the available space', async () => {

        await page.clickOnMaxHeight();

        await page.typeaheadInput.click();
        expect(await page.getTypeaheadOptionListClass()).toContain('ux-typeahead-all-options');
        expect(await page.getTypeaheadClass()).toContain('drop-up');

        await page.clickOnMaxHeightDecrease();

        await page.typeaheadInput.click();
        expect(await page.getTypeaheadOptionListClass()).toContain('ux-typeahead-all-options');
        expect(page.getTypeaheadClass()).not.toContain('drop-up');
    });

});