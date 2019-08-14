import { imageCompare } from '../common/image-compare';
import { ItemDisplayPanelPage } from './item-display-panel.po.spec';

describe('Item Display Panel Tests', () => {

    let page: ItemDisplayPanelPage;

    beforeEach(async () => {
        page = new ItemDisplayPanelPage();
        await page.getPage();
    });

    it('should have correct initial states', async () => {

        // Initial values.
        expect(await page.getNumberOfTableRows()).toEqual(5);
        expect(await page.confirmPanelIsDisplayed()).toBeFalsy();

        expect(await imageCompare('item-display-panel-initial')).toEqual(0);

    });

    it('should display the panel upon clicking', async () => {

        await page.clickARow(0);
        await page.waitForPanelToBeDisplayed();
        expect(await page.confirmPanelIsDisplayed()).toBeTruthy();
        expect(await page.getPanelHeader()).toEqual('Site Detail - UX Aspects (PPT)');
        expect(await page.getPanelContent()).toEqual('Preview PPT');
        expect(await page.confirmPanelCloseButtonIsVisible()).toBeTruthy();
        expect(await page.checkPanelPreviousButtonIsEnabled()).toBeFalsy();
        expect(await page.checkPanelNextButtonIsEnabled()).toBeTruthy();

        expect(await imageCompare('item-display-panel-open')).toEqual(0);

    });

    it('should display each item upon clicking next', async () => {

        await page.clickARow(0);
        await page.waitForPanelToBeDisplayed();
        expect(await page.confirmRowIsHighlighted(0)).toBeTruthy();
        expect(await page.getPanelHeader()).toEqual('Site Detail - UX Aspects (PPT)');
        expect(await page.getPanelContent()).toEqual('Preview PPT');

        await page.clickNextButton();
        expect(await page.confirmRowIsHighlighted(0)).toBeFalsy();
        expect(await page.confirmRowIsHighlighted(1)).toBeTruthy();
        expect(await page.getPanelHeader()).toEqual('Site Detail - UX Aspects (PDF)');
        expect(await page.getPanelContent()).toEqual('Preview PDF');

        await page.clickNextButton();
        await page.clickNextButton();
        await page.clickNextButton();
        expect(await page.confirmRowIsHighlighted(0)).toBeFalsy();
        expect(await page.confirmRowIsHighlighted(1)).toBeFalsy();
        expect(await page.confirmRowIsHighlighted(2)).toBeFalsy();
        expect(await page.confirmRowIsHighlighted(3)).toBeFalsy();
        expect(await page.confirmRowIsHighlighted(4)).toBeTruthy();
        expect(await page.getPanelHeader()).toEqual('Site Detail - UX Aspects (DOC)');
        expect(await page.getPanelContent()).toEqual('Preview DOC');

        expect(await page.checkPanelPreviousButtonIsEnabled()).toBeTruthy();
        expect(await page.checkPanelNextButtonIsEnabled()).toBeFalsy();
    });

    it('should display each item upon clicking previous', async () => {

        await page.clickARow(4);
        await page.waitForPanelToBeDisplayed();
        expect(await page.confirmRowIsHighlighted(4)).toBeTruthy();
        expect(await page.getPanelHeader()).toEqual('Site Detail - UX Aspects (DOC)');
        expect(await page.getPanelContent()).toEqual('Preview DOC');
        expect(await page.checkPanelPreviousButtonIsEnabled()).toBeTruthy();
        expect(await page.checkPanelNextButtonIsEnabled()).toBeFalsy();

        await page.clickPreviousButton();
        expect(await page.confirmRowIsHighlighted(4)).toBeFalsy();
        expect(await page.confirmRowIsHighlighted(3)).toBeTruthy();
        expect(await page.getPanelHeader()).toEqual('Site Detail - UX Aspects (PDF)');
        expect(await page.getPanelContent()).toEqual('Preview PDF');

        await page.clickPreviousButton();
        await page.clickPreviousButton();
        await page.clickPreviousButton();
        expect(await page.confirmRowIsHighlighted(4)).toBeFalsy();
        expect(await page.confirmRowIsHighlighted(3)).toBeFalsy();
        expect(await page.confirmRowIsHighlighted(2)).toBeFalsy();
        expect(await page.confirmRowIsHighlighted(1)).toBeFalsy();
        expect(await page.confirmRowIsHighlighted(0)).toBeTruthy();
        expect(await page.getPanelHeader()).toEqual('Site Detail - UX Aspects (PPT)');
        expect(await page.getPanelContent()).toEqual('Preview PPT');

        expect(await page.checkPanelPreviousButtonIsEnabled()).toBeFalsy();
        expect(await page.checkPanelNextButtonIsEnabled()).toBeTruthy();

    });

    it('should be possible to use the close button to close the panel', async () => {
        await page.clickARow(4);
        await page.waitForPanelToBeDisplayed();
        expect(await page.confirmPanelIsDisplayed()).toBeTruthy();
        await page.clickCloseButton();
        expect(await page.confirmPanelIsDisplayed()).toBeFalsy();
    });
});