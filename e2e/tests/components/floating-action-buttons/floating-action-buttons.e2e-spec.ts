import { ElementArrayFinder } from 'protractor';
import { Functions } from '../common/common.spec';
import { imageCompare } from '../common/image-compare';
import { FloatingActionButtonsPage } from './floating-action-buttons.po.spec';

describe('Floating Action Button Tests', () => {

    const page: FloatingActionButtonsPage = new FloatingActionButtonsPage();

    beforeEach(async () => {
        await page.getPage();
    });

    const functions = new Functions();

    it('should have correct initial states', async () => {

        // there should only be the trigger button visible
        expect(await page.fabLeft.$$('ux-floating-action-button').count()).toBe(1);

        expect(await imageCompare('fab-initial')).toEqual(0);

    });

    it('should change the vertical (bottom) button\'s colour upon hover', async () => {

        await functions.moveToElement(page.fabBottomTriggerIcon);

        expect(await imageCompare('fab-initial-vertical-bottom-buttons-hover')).toEqual(0);

    });

    it('should display action buttons when the vertical (bottom) button is clicked', async () => {

        await page.fabBottom.click();

        const buttons: ElementArrayFinder = page.fabBottom.$$('ux-floating-action-button');

        expect(await buttons.count()).toBe(4);

        // check the icons are correct on each button
        expect(await buttons.get(1).$('ux-icon').getAttribute('name')).toContain('add');
        expect(await buttons.get(2).$('ux-icon').getAttribute('name')).toContain('analytics');
        expect(await buttons.get(3).$('ux-icon').getAttribute('name')).toContain('app');

        expect(await imageCompare('fab-bottom-open')).toEqual(0);
    });

    it('should display action buttons in the correct position when the vertical (bottom) button is clicked', async () => {

        await page.fabBottom.click();

        const buttons = page.fabBottom.$$('ux-floating-action-button');

        const location0 = await buttons.get(1).getLocation();
        const location1 = await buttons.get(2).getLocation();
        const location2 = await buttons.get(3).getLocation();

        expect(Number(location0['x'])).toBe(Number(location1['x']));
        expect(Number(location1['x'])).toBe(Number(location2['x']));

        expect(Number(location0['y'])).toBeLessThan(Number(location1['y']));
        expect(Number(location1['y'])).toBeLessThan(Number(location2['y']));

    });

    it('should change the horizontal (right) button\'s colour upon hover', async () => {

        await functions.moveToElement(page.fabRightTriggerIcon);

        expect(await imageCompare('fab-initial-horizontal-right-buttons-hover')).toEqual(0);

    });

    it('should display action buttons when the horizontal (right) button is clicked', async () => {

        await page.fabRight.click();

        const buttons = page.fabRight.$$('ux-floating-action-button');

        expect(await buttons.count()).toBe(4);

        // check the icons are correct on each button
        expect(await buttons.get(1).$('ux-icon').getAttribute('name')).toContain('add');
        expect(await buttons.get(2).$('ux-icon').getAttribute('name')).toContain('analytics');
        expect(await buttons.get(3).$('ux-icon').getAttribute('name')).toContain('app');

        expect(await imageCompare('fab-right-open')).toEqual(0);

    });

    it('should display action buttons in the correct position when the horizontal (right) button is clicked', async () => {

        await page.fabRight.click();

        const buttons = page.fabRight.$$('ux-floating-action-button');

        const location0 = await buttons.get(1).getLocation();
        const location1 = await buttons.get(2).getLocation();
        const location2 = await buttons.get(3).getLocation();

        expect(Number(location0['x'])).toBeLessThan(Number(location1['x']));
        expect(Number(location1['x'])).toBeLessThan(Number(location2['x']));

        expect(Number(location0['y'])).toBe(Number(location1['y']));
        expect(Number(location1['y'])).toBe(Number(location2['y']));

    });

    it('should change the vertical (up) button\'s colour upon hover', async () => {

        await functions.moveToElement(page.fabUpTriggerIcon);

        expect(await imageCompare('fab-initial-vertical-buttons-hover')).toEqual(0);

    });

    it('should display action buttons when the vertical (up) button is clicked', async () => {

        await page.fabUp.click();

        const buttons = page.fabUp.$$('ux-floating-action-button');

        expect(await buttons.count()).toBe(4);

        // check the icons are correct on each button
        expect(await buttons.get(1).$('ux-icon').getAttribute('name')).toContain('add');
        expect(await buttons.get(2).$('ux-icon').getAttribute('name')).toContain('analytics');
        expect(await buttons.get(3).$('ux-icon').getAttribute('name')).toContain('app');

        expect(await imageCompare('fab-up-open')).toEqual(0);

    });

    it('should display action buttons in the correct position when the vertical (up) button is clicked', async () => {

        await page.fabUp.click();

        const buttons = page.fabUp.$$('ux-floating-action-button');

        const location0 = await buttons.get(1).getLocation();
        const location1 = await buttons.get(2).getLocation();
        const location2 = await buttons.get(3).getLocation();

        expect(Number(location0['x'])).toBe(Number(location1['x']));
        expect(Number(location1['x'])).toBe(Number(location2['x']));

        expect(Number(location1['y'])).toBeLessThan(Number(location0['y']));
        expect(Number(location2['y'])).toBeLessThan(Number(location1['y']));

    });

    it('should change the horizontal (left) button\'s colour upon hover', async () => {

        await functions.moveToElement(page.fabLeftTriggerIcon);

        expect(await imageCompare('fab-initial-horizontal-buttons-hover')).toEqual(0);

    });

    it('should display action buttons when the horizontal (left) button is clicked', async () => {

        await page.fabLeft.click();

        const buttons = page.fabLeft.$$('ux-floating-action-button');

        expect(await buttons.count()).toBe(4);

        // check the icons are correct on each button
        expect(await buttons.get(1).$('ux-icon').getAttribute('name')).toContain('add');
        expect(await buttons.get(2).$('ux-icon').getAttribute('name')).toContain('analytics');
        expect(await buttons.get(3).$('ux-icon').getAttribute('name')).toContain('app');

        expect(await imageCompare('fab-left-open')).toEqual(0);

    });

    it('should display action buttons in the correct position when the horizontal (left) button is clicked', async () => {

        await page.fabLeft.click();

        const buttons = page.fabLeft.$$('ux-floating-action-button');

        const location0 = await buttons.get(1).getLocation();
        const location1 = await buttons.get(2).getLocation();
        const location2 = await buttons.get(3).getLocation();

        expect(Number(location1['x'])).toBeLessThan(Number(location0['x']));
        expect(Number(location2['x'])).toBeLessThan(Number(location1['x']));

        expect(Number(location0['y'])).toBe(Number(location1['y']));
        expect(Number(location1['y'])).toBe(Number(location2['y']));

    });
});