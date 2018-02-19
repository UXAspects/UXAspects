import { browser, Key } from 'protractor';
import { TimelinePage } from './timeline.po.spec';
import { Constants, Functions } from '../common/common.spec';
import * as moment from 'moment-timezone';

describe('TimelinePage Tests', () => {

  let page: TimelinePage;
  let browserName: string;
  let constants: Constants;
  let functions: Functions;

  beforeEach(() => {
    page = new TimelinePage();
    page.getPage();
    
    constants = new Constants();
    functions = new Functions();
    
    browser.getCapabilities().then(function(caps) {
        browserName = caps.get('browserName');
    });
  });

  it('should start with 4 events', () => {
    
    // Four events should be visible.
    expect(page.timeline.isPresent()).toBeTruthy();
    expect<any>(page.getNumberOfEvents()).toEqual(4);
    expect(page.addEvent.isPresent()).toBeTruthy();
    
  });
  
  it('should allow the addition of events', () => {
    
    // Create events, checking the number displayed.
    page.addEvent.click();
    page.addEvent.click();
    expect<any>(page.getNumberOfEvents()).toEqual(6);
    
  });

  it('should display the correct information for events', () => {
    
    // Check elements of various events.
    expect<any>(page.getEventBadgeTitle(1)).toEqual('Fri Jan 26');
    expect<any>(page.getEventBadge(1).getAttribute('class')).toContain('alternate2');

    expect<any>(page.getEventTimestamp(2)).toEqual('Wednesday, January 24, 2018, 9:20:00 AM');
    
    expect<any>(functions.getElementColourHex(page.getEventBadge(3), 'background-color')).toBe(constants.PRIMARY_BACKGROUND_COLOR);
    expect<any>(functions.getElementColourHex(page.getEventBadge(3), 'color')).toBe(constants.WHITE);

    expect<any>(page.getEventPanelText(3)).toContain('was recorded by');

    // Add another event and check it.
    page.addEvent.click();

    const badgeTitle = moment().format('ddd MMM D');
    expect<any>(page.getEventBadgeTitle(0)).toEqual(badgeTitle);
    expect<any>(page.getEventBadge(0).getAttribute('class')).toContain('alternate1');

    expect<any>(functions.getElementColourHex(page.getEventBadge(0), 'background-color')).toBe(constants.ALTERNATE1_BACKGROUND_COLOR);
    expect<any>(functions.getElementColourHex(page.getEventBadge(0), 'color')).toBe(constants.WHITE);

    expect<any>(page.getEventPanelText(0)).toContain('was updated by');
  });
});