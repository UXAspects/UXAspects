import { browser, Key } from 'protractor';
import { ItemDisplayPanelPage } from './item-display-panel.po.spec';

describe('Item Display Panel Tests', () => {

  let page: ItemDisplayPanelPage;
  let browserName: string;

  beforeEach(() => {
    page = new ItemDisplayPanelPage();
    page.getPage();
    
    browser.getCapabilities().then(function(caps) {
        browserName = caps.get('browserName');
    });
  });

  it('should have correct initial states', () => {
  
    // Initial values.
    expect<any>(page.getNumberOfTableRows()).toEqual(5);
    expect(page.confirmPanelIsDisplayed()).toBeFalsy();

  });
  
  it('should display the panel upon clicking', () => {
  
    page.clickARow(0);
    page.waitForPanelToBeDisplayed().then(() => {
        expect(page.confirmPanelIsDisplayed()).toBeTruthy();
        expect<any>(page.getPanelHeader()).toEqual('Site Detail - UX Aspects (PPT)');
        expect<any>(page.getPanelContent()).toEqual('Preview PPT');
        expect(page.confirmPanelCloseButtonIsVisible()).toBeTruthy();
        expect<any>(page.checkPanelPreviousButtonIsEnabled()).toBeFalsy();
        expect<any>(page.checkPanelNextButtonIsEnabled()).toBeTruthy();
    });

  });
  
  it('should display each item upon clicking next', () => {
  
    page.clickARow(0);
    page.waitForPanelToBeDisplayed().then(() => {
        expect(page.confirmRowIsHighlighted(0)).toBeTruthy();
        expect<any>(page.getPanelHeader()).toEqual('Site Detail - UX Aspects (PPT)');
        expect<any>(page.getPanelContent()).toEqual('Preview PPT');
    
        page.clickNextButton();
        expect(page.confirmRowIsHighlighted(0)).toBeFalsy();
        expect(page.confirmRowIsHighlighted(1)).toBeTruthy();
        expect<any>(page.getPanelHeader()).toEqual('Site Detail - UX Aspects (PDF)');
        expect<any>(page.getPanelContent()).toEqual('Preview PDF');
    
        page.clickNextButton();
        page.clickNextButton();
        page.clickNextButton();
        expect(page.confirmRowIsHighlighted(0)).toBeFalsy();
        expect(page.confirmRowIsHighlighted(1)).toBeFalsy();
        expect(page.confirmRowIsHighlighted(2)).toBeFalsy();
        expect(page.confirmRowIsHighlighted(3)).toBeFalsy();
        expect(page.confirmRowIsHighlighted(4)).toBeTruthy();
        expect<any>(page.getPanelHeader()).toEqual('Site Detail - UX Aspects (DOC)');
        expect<any>(page.getPanelContent()).toEqual('Preview DOC');
    
        expect<any>(page.checkPanelPreviousButtonIsEnabled()).toBeTruthy();
        expect<any>(page.checkPanelNextButtonIsEnabled()).toBeFalsy();
    });

  });
  
  it('should display each item upon clicking previous', () => {
  
    page.clickARow(4);
    page.waitForPanelToBeDisplayed().then(() => {
        expect(page.confirmRowIsHighlighted(4)).toBeTruthy();
        expect<any>(page.getPanelHeader()).toEqual('Site Detail - UX Aspects (DOC)');
        expect<any>(page.getPanelContent()).toEqual('Preview DOC');
        expect<any>(page.checkPanelPreviousButtonIsEnabled()).toBeTruthy();
        expect<any>(page.checkPanelNextButtonIsEnabled()).toBeFalsy();   
    
        page.clickPreviousButton();
        expect(page.confirmRowIsHighlighted(4)).toBeFalsy();
        expect(page.confirmRowIsHighlighted(3)).toBeTruthy();
        expect<any>(page.getPanelHeader()).toEqual('Site Detail - UX Aspects (PDF)');
        expect<any>(page.getPanelContent()).toEqual('Preview PDF');
    
        page.clickPreviousButton();
        page.clickPreviousButton();
        page.clickPreviousButton();
        expect(page.confirmRowIsHighlighted(4)).toBeFalsy();
        expect(page.confirmRowIsHighlighted(3)).toBeFalsy();
        expect(page.confirmRowIsHighlighted(2)).toBeFalsy();
        expect(page.confirmRowIsHighlighted(1)).toBeFalsy();
        expect(page.confirmRowIsHighlighted(0)).toBeTruthy();
        expect<any>(page.getPanelHeader()).toEqual('Site Detail - UX Aspects (PPT)');
        expect<any>(page.getPanelContent()).toEqual('Preview PPT');
    
        expect<any>(page.checkPanelPreviousButtonIsEnabled()).toBeFalsy();
        expect<any>(page.checkPanelNextButtonIsEnabled()).toBeTruthy();
    });

  });
  
  it('should be possible to use the close button to close the panel', () => {
  
    page.clickARow(4);
    page.waitForPanelToBeDisplayed().then(() => {
        expect(page.confirmPanelIsDisplayed()).toBeTruthy();
        page.clickCloseButton();
        expect(page.confirmPanelIsDisplayed()).toBeFalsy();
    });
    
  });
});