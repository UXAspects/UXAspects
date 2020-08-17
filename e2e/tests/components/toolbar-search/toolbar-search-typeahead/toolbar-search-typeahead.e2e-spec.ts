import { browser, protractor } from 'protractor';
import { imageCompare } from '../../common/image-compare';
import { ToolbarSearchTypeheadPage } from './toolbar-search-typeahead.po.spec';


const ec = protractor.ExpectedConditions;

describe('Toolbar Search Typeahead', () => {

    const ANIMATION_TIMEOUT = 500;

    let page: ToolbarSearchTypeheadPage;

    beforeEach(async () => {
        page = new ToolbarSearchTypeheadPage();
        await page.getPage();
    });

    it('should have correct initial states', async () => {

        expect(await page.leftInput.isDisplayed()).toBeFalsy();
        expect(await page.leftButton.isDisplayed()).toBeTruthy();
        expect(await page.leftClear.isPresent()).toBeFalsy();

        expect(await page.searchedFor.getText()).toBe('');

        expect(await imageCompare('toolbar-search-typeahead-initial')).toEqual(0);

    });

    it('should display the dropdown correctly', async () => {

        await page.openDropdown();
        expect(await page.isDropdownExpanded()).toBeTruthy();

        expect(await imageCompare('toolbar-search-typeahead-open')).toEqual(0);
    });

    describe('key handling', () => {

        it('should execute search handler when the enter key is pressed', async () => {

            await page.leftButton.click();
            await browser.wait(ec.visibilityOf(page.leftInput), ANIMATION_TIMEOUT);

            // Verify states (left)
            expect(await page.leftInput.isDisplayed()).toBeTruthy();
            expect(await page.leftButton.isDisplayed()).toBeTruthy();
            expect(await page.leftClear.isPresent()).toBeFalsy();
            expect(await page.searchedFor.getText()).toBe('');

            // Enter search text
            await page.leftInput.sendKeys('one');

            // Press enter
            await browser.actions().sendKeys(protractor.Key.ENTER).perform();
            await browser.wait(ec.invisibilityOf(page.leftInput), ANIMATION_TIMEOUT);

            expect(await page.leftInput.isDisplayed()).toBeFalsy();
            expect(await page.leftButton.isDisplayed()).toBeTruthy();
            expect(await page.leftClear.isPresent()).toBeFalsy();

            // Verify that the search handler updated the page
            expect(await page.searchedFor.getText()).toBe('one');

        });

    });

});
