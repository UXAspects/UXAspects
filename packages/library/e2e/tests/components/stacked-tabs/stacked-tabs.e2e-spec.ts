import { browser, Key } from 'protractor';
import { StackedTabsTestPageComponent } from './stacked-tabs.po.spec';
import { Constants, Functions } from '../common/common.spec';

describe('Stacked Tabs Tests', () => {

  let page: StackedTabsTestPageComponent;
  let browserName: string;
  let constants: Constants;
  let functions: Functions;

  beforeEach(() => {
    page = new StackedTabsTestPageComponent();
    page.getPage();
    
    constants = new Constants();
    functions = new Functions();

    browser.getCapabilities().then(function(caps) {
        browserName = caps.get('browserName');
    });
  });
  
  it('should have correct initial states', () => {

    // Icon only (tabs left)
    expect(page.getIconOnlyLeftTabHeader(0).getAttribute('class')).toContain('active');
    expect(page.getIconOnlyLeftTabHeader(1).getAttribute('class')).not.toContain('active');
    expect(page.getIconOnlyLeftTabHeader(2).getAttribute('class')).not.toContain('active');

    expect(page.getIconOnlyLeftTabHeaderIcon(0).getAttribute('class')).toContain('hpe-schedule');
    expect(page.getIconOnlyLeftTabHeaderIcon(1).getAttribute('class')).toContain('hpe-shield');
    expect(page.getIconOnlyLeftTabHeaderIcon(2).getAttribute('class')).toContain('hpe-information');

    expect(page.getIconOnlyLeftTabContent(0).getAttribute('class')).toContain('active');
    expect(page.getIconOnlyLeftTabContent(1).getAttribute('class')).not.toContain('active');
    expect(page.getIconOnlyLeftTabContent(2).getAttribute('class')).not.toContain('active');

    // Icon only (tabs right)
    expect(page.getIconOnlyRightTabHeader(0).getAttribute('class')).toContain('active');
    expect(page.getIconOnlyRightTabHeader(1).getAttribute('class')).not.toContain('active');
    expect(page.getIconOnlyRightTabHeader(2).getAttribute('class')).not.toContain('active');

    expect(page.getIconOnlyRightTabHeaderIcon(0).getAttribute('class')).toContain('hpe-schedule');
    expect(page.getIconOnlyRightTabHeaderIcon(1).getAttribute('class')).toContain('hpe-shield');
    expect(page.getIconOnlyRightTabHeaderIcon(2).getAttribute('class')).toContain('hpe-information');

    expect(page.getIconOnlyRightTabContent(0).getAttribute('class')).toContain('active');
    expect(page.getIconOnlyRightTabContent(1).getAttribute('class')).not.toContain('active');
    expect(page.getIconOnlyRightTabContent(2).getAttribute('class')).not.toContain('active');

  });

  it('should arrange the tabs vertically', () => {

    // Icon only (tabs left)
    page.getIconOnlyLeftTabHeader(0).getLocation().then((location0: object) => {
      page.getIconOnlyLeftTabHeader(1).getLocation().then((location1: object) => {
        page.getIconOnlyLeftTabHeader(2).getLocation().then((location2: object) => {
          expect(Number(location0['x'])).toBe(Number(location1['x']));
          expect(Number(location1['x'])).toBe(Number(location2['x']));
        });
      });
    });

    // Icon only (tabs right)
    page.getIconOnlyRightTabHeader(0).getLocation().then((location0: object) => {
      page.getIconOnlyRightTabHeader(1).getLocation().then((location1: object) => {
        page.getIconOnlyRightTabHeader(2).getLocation().then((location2: object) => {
          expect(Number(location0['x'])).toBe(Number(location1['x']));
          expect(Number(location1['x'])).toBe(Number(location2['x']));
        });
      });
    });

  });

  it('should display the tab content to the side of the tab headers', () => {

    // Icon only (tabs right)
    page.getIconOnlyRightTabHeader(0).getLocation().then((locationHeader0: object) => {
      page.getIconOnlyRightTabContent(0).getLocation().then((locationContent0: object) => {
        expect(Number(locationHeader0['x'])).toBeGreaterThan(Number(locationContent0['x']));
      });
    });

  });
});