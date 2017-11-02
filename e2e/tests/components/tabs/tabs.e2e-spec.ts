import { browser, Key } from 'protractor';
import { TabsTestPageComponent } from './tabs.po.spec';
import { Constants, Functions } from '../common/common.spec';

describe('Tabs Tests', () => {

  let page: TabsTestPageComponent;
  let browserName: string;
  let constants: Constants;
  let functions: Functions;

  beforeEach(() => {
    page = new TabsTestPageComponent();
    page.getPage();
    
    constants = new Constants();
    functions = new Functions();
    
    browser.getCapabilities().then(function(caps) {
        browserName = caps.get('browserName');
    });
  });
  
  it('should have correct initial states', () => {

    // Icon only
    expect(page.getIconOnlyTabHeader(0).getAttribute('class')).toContain('active');
    expect(page.getIconOnlyTabHeader(1).getAttribute('class')).not.toContain('active');
    expect(page.getIconOnlyTabHeader(2).getAttribute('class')).not.toContain('active');
    expect(page.getIconOnlyTabHeader(3).getAttribute('class')).not.toContain('active');

    expect(page.getIconOnlyTabHeaderIcon(0).getAttribute('class')).toContain('hpe-schedule');
    expect(page.getIconOnlyTabHeaderIcon(1).getAttribute('class')).toContain('hpe-shield');
    expect(page.getIconOnlyTabHeaderIcon(2).getAttribute('class')).toContain('hpe-information');
    expect(page.getIconOnlyTabHeaderIcon(3).getAttribute('class')).toContain('hpe-analytics');

    expect(page.getIconOnlyTabContent(0).getAttribute('class')).toContain('active');
    expect(page.getIconOnlyTabContent(1).getAttribute('class')).not.toContain('active');
    expect(page.getIconOnlyTabContent(2).getAttribute('class')).not.toContain('active');
    expect(page.getIconOnlyTabContent(3).getAttribute('class')).not.toContain('active');

    // Text and icon
    expect(page.getTextAndIconTabHeader(0).getAttribute('class')).toContain('active');
    expect(page.getTextAndIconTabHeader(1).getAttribute('class')).not.toContain('active');
    expect(page.getTextAndIconTabHeader(2).getAttribute('class')).not.toContain('active');
    expect(page.getTextAndIconTabHeader(3).getAttribute('class')).not.toContain('active');

    expect(page.getTextAndIconTabHeaderIcon(0).getAttribute('class')).toContain('hpe-schedule');
    expect(page.getTextAndIconTabHeaderIcon(1).getAttribute('class')).toContain('hpe-shield');
    expect(page.getTextAndIconTabHeaderIcon(2).getAttribute('class')).toContain('hpe-information');
    expect(page.getTextAndIconTabHeaderIcon(3).getAttribute('class')).toContain('hpe-analytics');

    expect(page.getTextAndIconTabContent(0).getAttribute('class')).toContain('active');
    expect(page.getTextAndIconTabContent(1).getAttribute('class')).not.toContain('active');
    expect(page.getTextAndIconTabContent(2).getAttribute('class')).not.toContain('active');
    expect(page.getTextAndIconTabContent(3).getAttribute('class')).not.toContain('active');
    
    // Text only
    expect(page.getTextOnlyTabHeader(0).getAttribute('class')).toContain('active');
    expect(page.getTextOnlyTabHeader(1).getAttribute('class')).not.toContain('active');
    expect(page.getTextOnlyTabHeader(2).getAttribute('class')).not.toContain('active');
    expect(page.getTextOnlyTabHeader(3).getAttribute('class')).not.toContain('active');

    expect<any>(page.getTextOnlyTabHeaderText(0).getText()).toBe('Schedule');
    expect<any>(page.getTextOnlyTabHeaderText(1).getText()).toBe('Protection');
    expect<any>(page.getTextOnlyTabHeaderText(2).getText()).toBe('Solution');
    expect<any>(page.getTextOnlyTabHeaderText(3).getText()).toBe('Analytics');

    expect(page.getTextOnlyTabContent(0).getAttribute('class')).toContain('active');
    expect(page.getTextOnlyTabContent(1).getAttribute('class')).not.toContain('active');
    expect(page.getTextOnlyTabContent(2).getAttribute('class')).not.toContain('active');
    expect(page.getTextOnlyTabContent(3).getAttribute('class')).not.toContain('active');
    
    // Alternative style
    expect(page.getAlternativeStyleTabHeader(0).getAttribute('class')).toContain('active');
    expect(page.getAlternativeStyleTabHeader(1).getAttribute('class')).not.toContain('active');
    expect(page.getAlternativeStyleTabHeader(2).getAttribute('class')).not.toContain('active');
    expect(page.getAlternativeStyleTabHeader(3).getAttribute('class')).not.toContain('active');

    expect<any>(page.getAlternativeStyleTabHeaderText(0).getText()).toBe('Schedule');
    expect<any>(page.getAlternativeStyleTabHeaderText(1).getText()).toBe('Protection');
    expect<any>(page.getAlternativeStyleTabHeaderText(2).getText()).toBe('Solution');
    expect<any>(page.getAlternativeStyleTabHeaderText(3).getText()).toBe('Analytics');

    expect(page.getAlternativeStyleTabContent(0).getAttribute('class')).toContain('active');
    expect(page.getAlternativeStyleTabContent(1).getAttribute('class')).not.toContain('active');
    expect(page.getAlternativeStyleTabContent(2).getAttribute('class')).not.toContain('active');
    expect(page.getAlternativeStyleTabContent(3).getAttribute('class')).not.toContain('active');
    
    // Dynamic tabs
    expect(page.getDynamicTabsTabHeader(0).getAttribute('class')).toContain('active');
    expect(page.getDynamicTabsTabHeader(1).getAttribute('class')).not.toContain('active');
    expect(page.getDynamicTabsTabHeader(2).getAttribute('class')).not.toContain('active');
    expect(page.getDynamicTabsTabHeader(3).getAttribute('class')).not.toContain('active');

    expect<any>(page.getDynamicTabsTabHeaderText(0).getText()).toBe('Schedule');
    expect<any>(page.getDynamicTabsTabHeaderText(1).getText()).toBe('Protection');
    expect<any>(page.getDynamicTabsTabHeaderText(2).getText()).toBe('Solution');
    expect<any>(page.getDynamicTabsTabHeaderText(3).getText()).toBe('Analytics');

    expect(page.getDynamicTabsTabContent(0).getAttribute('class')).toContain('active');
    expect(page.getDynamicTabsTabContent(1).getAttribute('class')).not.toContain('active');
    expect(page.getDynamicTabsTabContent(2).getAttribute('class')).not.toContain('active');
    expect(page.getDynamicTabsTabContent(3).getAttribute('class')).not.toContain('active');
    
    // Dynamic tabs dropdown menu should not be expanded
    expect(page.buttonGroup.getAttribute('class')).not.toContain('open');
    
  });

  it('should arrange the tabs horizontally', () => {

    // Icon only
    page.getIconOnlyTabHeader(0).getLocation().then((location0: object) => {
      page.getIconOnlyTabHeader(1).getLocation().then((location1: object) => {
        page.getIconOnlyTabHeader(2).getLocation().then((location2: object) => {
          page.getIconOnlyTabHeader(3).getLocation().then((location3: object) => {
            expect(Number(location0['y'])).toBe(Number(location1['y']));
            expect(Number(location1['y'])).toBe(Number(location2['y']));
            expect(Number(location2['y'])).toBe(Number(location3['y']));
          });
        });
      });
    });

    // Text and icon
    page.getTextAndIconTabHeader(0).getLocation().then((location0: object) => {
      page.getTextAndIconTabHeader(1).getLocation().then((location1: object) => {
        page.getTextAndIconTabHeader(2).getLocation().then((location2: object) => {
          page.getTextAndIconTabHeader(3).getLocation().then((location3: object) => {
            expect(Number(location0['y'])).toBe(Number(location1['y']));
            expect(Number(location1['y'])).toBe(Number(location2['y']));
            expect(Number(location2['y'])).toBe(Number(location3['y']));
          });
        });
      });
    });

    // Text only
    page.getTextOnlyTabHeader(0).getLocation().then((location0: object) => {
      page.getTextOnlyTabHeader(1).getLocation().then((location1: object) => {
        page.getTextOnlyTabHeader(2).getLocation().then((location2: object) => {
          page.getTextOnlyTabHeader(3).getLocation().then((location3: object) => {
            expect(Number(location0['y'])).toBe(Number(location1['y']));
            expect(Number(location1['y'])).toBe(Number(location2['y']));
            expect(Number(location2['y'])).toBe(Number(location3['y']));
          });
        });
      });
    });

    // Alternative style
    page.getAlternativeStyleTabHeader(0).getLocation().then((location0: object) => {
      page.getAlternativeStyleTabHeader(1).getLocation().then((location1: object) => {
        page.getAlternativeStyleTabHeader(2).getLocation().then((location2: object) => {
          page.getAlternativeStyleTabHeader(3).getLocation().then((location3: object) => {
            expect(Number(location0['y'])).toBe(Number(location1['y']));
            expect(Number(location1['y'])).toBe(Number(location2['y']));
            expect(Number(location2['y'])).toBe(Number(location3['y']));
          });
        });
      });
    });

    // Dynamic tabs
    page.getDynamicTabsTabHeader(0).getLocation().then((location0: object) => {
      page.getDynamicTabsTabHeader(1).getLocation().then((location1: object) => {
        page.getDynamicTabsTabHeader(2).getLocation().then((location2: object) => {
          page.getDynamicTabsTabHeader(3).getLocation().then((location3: object) => {
            expect(Number(location0['y'])).toBe(Number(location1['y']));
            expect(Number(location1['y'])).toBe(Number(location2['y']));
            expect(Number(location2['y'])).toBe(Number(location3['y']));
          });
        });
      });
    });

  });

  it('should change content when a tab header is clicked', () => {

    // Icon only
    page.getIconOnlyTabHeader(1).click();

    expect(page.getIconOnlyTabHeader(0).getAttribute('class')).not.toContain('active');
    expect(page.getIconOnlyTabHeader(1).getAttribute('class')).toContain('active');
    expect(page.getIconOnlyTabHeader(2).getAttribute('class')).not.toContain('active');
    expect(page.getIconOnlyTabHeader(3).getAttribute('class')).not.toContain('active');

    expect(page.getIconOnlyTabContent(0).getAttribute('class')).not.toContain('active');
    expect(page.getIconOnlyTabContent(1).getAttribute('class')).toContain('active');
    expect(page.getIconOnlyTabContent(2).getAttribute('class')).not.toContain('active');
    expect(page.getIconOnlyTabContent(3).getAttribute('class')).not.toContain('active');
    
    // Text and icon
    page.getTextAndIconTabHeader(2).click();

    expect(page.getTextAndIconTabHeader(0).getAttribute('class')).not.toContain('active');
    expect(page.getTextAndIconTabHeader(1).getAttribute('class')).not.toContain('active');
    expect(page.getTextAndIconTabHeader(2).getAttribute('class')).toContain('active');
    expect(page.getTextAndIconTabHeader(3).getAttribute('class')).not.toContain('active');

    expect(page.getTextAndIconTabContent(0).getAttribute('class')).not.toContain('active');
    expect(page.getTextAndIconTabContent(1).getAttribute('class')).not.toContain('active');
    expect(page.getTextAndIconTabContent(2).getAttribute('class')).toContain('active');
    expect(page.getTextAndIconTabContent(3).getAttribute('class')).not.toContain('active');

    // Text only
    page.getTextOnlyTabHeader(3).click();

    expect(page.getTextOnlyTabHeader(0).getAttribute('class')).not.toContain('active');
    expect(page.getTextOnlyTabHeader(1).getAttribute('class')).not.toContain('active');
    expect(page.getTextOnlyTabHeader(2).getAttribute('class')).not.toContain('active');
    expect(page.getTextOnlyTabHeader(3).getAttribute('class')).toContain('active');

    expect(page.getTextOnlyTabContent(0).getAttribute('class')).not.toContain('active');
    expect(page.getTextOnlyTabContent(1).getAttribute('class')).not.toContain('active');
    expect(page.getTextOnlyTabContent(2).getAttribute('class')).not.toContain('active');
    expect(page.getTextOnlyTabContent(3).getAttribute('class')).toContain('active');
    
    // Alternative style
    page.getAlternativeStyleTabHeader(1).click();

    expect(page.getAlternativeStyleTabHeader(0).getAttribute('class')).not.toContain('active');
    expect(page.getAlternativeStyleTabHeader(1).getAttribute('class')).toContain('active');
    expect(page.getAlternativeStyleTabHeader(2).getAttribute('class')).not.toContain('active');
    expect(page.getAlternativeStyleTabHeader(3).getAttribute('class')).not.toContain('active');

    expect(page.getAlternativeStyleTabContent(0).getAttribute('class')).not.toContain('active');
    expect(page.getAlternativeStyleTabContent(1).getAttribute('class')).toContain('active');
    expect(page.getAlternativeStyleTabContent(2).getAttribute('class')).not.toContain('active');
    expect(page.getAlternativeStyleTabContent(3).getAttribute('class')).not.toContain('active');

  });

  it('should add tabs chosen from the dropdown', () => {

    // Expand the dropdown menu
    page.dropdown.click();
    expect(page.buttonGroup.getAttribute('class')).toContain('open');

    // Select second tab from list
    page.selectTabFromList(1);

    // Confirm tab has been added
    expect<any>(page.getDynamicTabsTabHeaderText(4).getText()).toBe('Progress');

    // Confirm selected tab is disabled in dropdown menu
    expect(page.getDropdownMenuItem(1).getAttribute('class')).toContain('tab-option-selected');
  
  });
  
});