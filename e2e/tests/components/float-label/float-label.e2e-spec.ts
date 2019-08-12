import { browser, Key } from 'protractor';
import { FloatLabelPage } from './float-label.po.spec';

describe('Float Label', () => {

    let page: FloatLabelPage;

    beforeEach(() => {
        page = new FloatLabelPage();
        page.getPage();
    });

    describe('with mode = input', () => {

        it('should be hidden on focus', async () => {
            expect(page.usernameLabel.getAttribute('class')).not.toContain('ux-float-label-raised');
            // Focus username
            await page.usernameInput.click();
            expect(page.usernameLabel.getAttribute('class')).not.toContain('ux-float-label-raised');
            // Blur username
            await page.locationInput.click();
            expect(page.usernameLabel.getAttribute('class')).not.toContain('ux-float-label-raised');

            expect(await browser.imageComparison.checkScreen('float-label-initial')).toEqual(0);
        });

        it('should be visible while input has text', async () => {
            // Enter text
            await page.usernameInput.click();
            await page.usernameInput.sendKeys('A');
            expect(page.usernameLabel.getAttribute('class')).toContain('ux-float-label-raised');
            // Blur
            await page.locationInput.click();
            expect(page.usernameLabel.getAttribute('class')).toContain('ux-float-label-raised');
            // Remove text
            await page.usernameInput.click();
            await page.usernameInput.sendKeys(Key.BACK_SPACE);
            expect(page.usernameLabel.getAttribute('class')).not.toContain('ux-float-label-raised');

            expect(await browser.imageComparison.checkScreen('float-label-raised')).toEqual(0);
        });

        it('should become visible when `raised` becomes true', async () => {
            expect(page.locationLabel.getAttribute('class')).not.toContain('ux-float-label-raised');
            await page.locationButton.click();
            expect(page.locationLabel.getAttribute('class')).toContain('ux-float-label-raised');
        });

        it('should be visible for an input with initial value', async () => {
            expect(await page.initialInput.getAttribute('value')).toBe('A');
            expect(page.initialLabel.getAttribute('class')).toContain('ux-float-label-raised');
            // Remove text
            await page.initialInput.click();
            await page.initialInput.sendKeys(Key.BACK_SPACE);
            expect(page.initialLabel.getAttribute('class')).not.toContain('ux-float-label-raised');
        });
    });

    describe('with mode = focus', () => {

        beforeEach(() => {
            page.modeFocusButton.click();
        });

        it('should be visible on focus', async () => {
            expect(page.usernameLabel.getAttribute('class')).not.toContain('ux-float-label-raised');
            // Focus username
            await page.usernameInput.click();
            expect(page.usernameLabel.getAttribute('class')).toContain('ux-float-label-raised');
            // Blur username
            await page.locationInput.click();
            expect(page.usernameLabel.getAttribute('class')).not.toContain('ux-float-label-raised');
        });

        it('should be visible while input has text', async () => {
            // Enter text
            await page.usernameInput.click();
            await page.usernameInput.sendKeys('A');
            expect(page.usernameLabel.getAttribute('class')).toContain('ux-float-label-raised');
            // Blur
            await page.locationInput.click();
            expect(page.usernameLabel.getAttribute('class')).toContain('ux-float-label-raised');
            // Remove text
            await page.usernameInput.click();
            await page.usernameInput.sendKeys(Key.BACK_SPACE);
            expect(page.usernameLabel.getAttribute('class')).toContain('ux-float-label-raised');
            // Blur
            await page.locationInput.click();
            expect(page.usernameLabel.getAttribute('class')).not.toContain('ux-float-label-raised');
        });

        it('should become visible when `raised` becomes true', async () => {
            expect(page.locationLabel.getAttribute('class')).not.toContain('ux-float-label-raised');
            await page.locationButton.click();
            expect(page.locationLabel.getAttribute('class')).toContain('ux-float-label-raised');
        });

        it('should be visible for an input with initial value', async () => {
            expect(await page.initialInput.getAttribute('value')).toBe('A');
            expect(page.initialLabel.getAttribute('class')).toContain('ux-float-label-raised');
            // Remove text
            await page.initialInput.click();
            await page.initialInput.sendKeys(Key.BACK_SPACE);
            expect(page.initialLabel.getAttribute('class')).toContain('ux-float-label-raised');
        });
    });

});