import { anchorData, buttonData } from '../../../pages/app/badge/badge.testpage.data';
import { imageCompare } from '../common/image-compare';
import { BadgePage } from './badge.po.spec';

describe('Badge Tests', () => {
    let page: BadgePage;

    beforeEach(async () => {
        page = new BadgePage();
        await page.getPage();
    });

    it('should have the correct initial state', async () => {
        // check the anchor initial state is correct
        const anchorClasses = await page.anchor.getAttribute('class');
        const anchorBadgeClasses = await page.anchorBadge.getAttribute('class');

        // check content is correctly displayed
        expect(await page.anchorBadge.getText()).toBe(anchorData.content);

        // check all classes that are expected are present
        expect(anchorClasses).toContain('ux-badge-container');
        expect(anchorClasses).toContain(`ux-badge-${anchorData.size}`);
        expect(anchorClasses).toContain('ux-badge-overlap');
        expect(anchorClasses).toContain(`ux-badge-${anchorData.horizontalPosition}`);
        expect(anchorClasses).toContain(`ux-badge-${anchorData.verticalPosition}`);

        expect(anchorBadgeClasses).toContain('ux-badge');

        // // check text and background colors
        expect(await page.anchorBadge.getCssValue('color')).toBe('rgba(0, 0, 0, 1)');
        expect(await page.anchorBadge.getCssValue('background-color')).toBe('rgba(0, 167, 162, 1)');

        // check not hidden
        expect(await page.anchorBadge.getCssValue('display')).toBe('block');

        // check the button initial state
        const buttonClasses = await page.button.getAttribute('class');
        const buttonBadgeClasses = await page.buttonBadge.getAttribute('class');

        // check content is correctly displayed
        expect(await page.buttonBadge.getText()).toBe(buttonData.content);

        // check all classes that are expected are present
        expect(buttonClasses).toContain('ux-badge-container');
        expect(buttonClasses).toContain(`ux-badge-${buttonData.size}`);
        expect(buttonClasses).toContain('ux-badge-overlap');
        expect(buttonClasses).toContain(`ux-badge-${buttonData.horizontalPosition}`);
        expect(buttonClasses).toContain(`ux-badge-${buttonData.verticalPosition}`);

        expect(buttonBadgeClasses).toContain('ux-badge');

        // check text and background colors
        expect(await page.buttonBadge.getCssValue('color')).toBe('rgba(255, 255, 255, 1)');
        expect(await page.buttonBadge.getCssValue('background-color')).toBe('rgba(2, 86, 98, 1)');

        // check not hidden
        expect(await page.buttonBadge.getCssValue('display')).toBe('block');

        expect(await imageCompare('badge-initial')).toEqual(0);
    });

    it('should be able to create an empty badge', async () => {
        const iconClasses = await page.iconNoContent.getAttribute('class');
        expect(iconClasses).toContain('ux-badge-no-content');
    });

    it('should update the anchor content based on max value being set', async () => {
        // set limit on anchor
        await page.limitOnAnchor();

        // check content is limited as number
        expect(await page.anchorBadge.getText()).toBe('999+');

        expect(await imageCompare('badge-anchor-max-value')).toEqual(0);
    });

    it('should update the anchor content when changed', async () => {
        // set anchor content
        await page.contentOnAnchor();

        // check content has the new value
        expect(await page.anchorBadge.getText()).toBe('1894');

        expect(await imageCompare('badge-anchor-change-content')).toEqual(0);
    });

    it('should set the anchor badge color when changed', async () => {
        // set background color on anchor badge
        await page.backgroundOnAnchor();

        // check background color is set
        expect(await page.anchorBadge.getCssValue('background-color')).toBe('rgba(153, 153, 153, 1)');

        expect(await imageCompare('badge-anchor-change-color')).toEqual(0);
    });

    it('should set the anchor badge size when changed', async () => {
        // set size on anchor
        await page.sizeOnAnchor();

        // check class for new size exists
        expect(await page.anchor.getAttribute('class')).toContain('ux-badge-large');

        expect(await imageCompare('badge-anchor-size-large')).toEqual(0);
    });

    it('should update the button content based on max value being set', async () => {
        // set max value on button to truncate text
        await page.limitOnButton();

        // check content is limited as string with ellipsis
        expect(await page.buttonBadge.getText()).toBe('Some really long…');

        expect(await imageCompare('badge-button-max-value')).toEqual(0);
    });

    it('should set the button badge color when changed', async () => {
        // set background on button
        await page.backgroundOnButton();

        // check background color is correct
        expect(await page.buttonBadge.getCssValue('background-color')).toBe('rgba(123, 99, 163, 1)');

        expect(await imageCompare('badge-button-change-button')).toEqual(0);
    });

    it('should toggle button badge visibility', async () => {
        // click to hide badge
        await page.toggleHideButtonBadge();

        // check badge is not visible
        expect(await page.buttonBadge.getCssValue('display')).toBe('none');

        expect(await imageCompare('badge-button-hide')).toEqual(0);

        // click again to unhide
        await page.toggleHideButtonBadge();

        // check badge is visible
        expect(await page.buttonBadge.getCssValue('display')).toBe('block');

        expect(await imageCompare('badge-button-show')).toEqual(0);
    });

    it('should set the badge position on the button', async () => {
        // click to reposition badge
        await page.repositionButtonBadge();

        // check correct position styles are present
        const buttonClasses = await page.button.getAttribute('class');
        expect(buttonClasses).not.toContain(`ux-badge-${buttonData.horizontalPosition}`);
        expect(buttonClasses).not.toContain(`ux-badge-${buttonData.verticalPosition}`);
        expect(buttonClasses).toContain('ux-badge-above');
        expect(buttonClasses).toContain('ux-badge-after');

        expect(await imageCompare('badge-button-reposition')).toEqual(0);
    });

    it('should remove the badge overlap on the button', async () => {
        // click to reposition badge
        await page.removeOverlapButtonBadge();

        // check correct position styles are present
        expect(await page.button.getAttribute('class')).not.toContain('ux-badge-overlap');

        expect(await imageCompare('badge-button-remove-overlap')).toEqual(0);
    });
});
