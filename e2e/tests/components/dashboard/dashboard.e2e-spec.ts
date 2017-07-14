import { browser, Key, ElementFinder } from 'protractor';
import { DashboardPage } from './dashboard.po.spec';

describe('Dashboard Tests', () => {

  let page: DashboardPage;
  let browserName: string;
  let widget1: ElementFinder;
  let widget2: ElementFinder;
  let widget3: ElementFinder;
  let widget4: ElementFinder;

  beforeEach(() => {
    page = new DashboardPage();
    page.getPage();
    
    widget1 = page.getWidget(0);
    widget2 = page.getWidget(1);
    widget3 = page.getWidget(2);
    widget4 = page.getWidget(3);
    expect(widget1).not.toBeNull();
    expect(widget2).not.toBeNull();
    expect(widget3).not.toBeNull();
    expect(widget4).not.toBeNull();
    
    browser.getCapabilities().then(function(caps) {
        browserName = caps.get('browserName');
    });
  });

  it('should have correct initial states', () => {
  
    expect<any>(page.getNumberOfWidgets()).toEqual(4);
    
    // Widget 1 should be at the top of the page. The tops of the others should be below its base.
    expect<any>(page.getWidgetLocationValue(widget1, 'top')).toEqual(0);
    page.getWidgetLocationValue(widget1, 'top').then(function(top: number) {
        page.getWidgetLocationValue(widget1, 'height').then(function(height: number) {
            expect(page.getWidgetLocationValue(widget2, 'top')).toBeGreaterThan(top + height - 1);
            expect(page.getWidgetLocationValue(widget3, 'top')).toBeGreaterThan(top + height - 1);
            expect(page.getWidgetLocationValue(widget4, 'top')).toBeGreaterThan(top + height - 1);
        });
    });
    
    // Widget 2 should be at the left of the page. Widget 3 should be to its right.
    expect<any>(page.getWidgetLocationValue(widget1, 'left')).toEqual(0);
    page.getWidgetLocationValue(widget2, 'left').then(function(left: number) {
        page.getWidgetLocationValue(widget2, 'width').then(function(width: number) {
            expect(page.getWidgetLocationValue(widget3, 'left')).toBeGreaterThan(left + width - 1);
        });
    });    
    // Widget 4 should be to the right of widget 3.
    page.getWidgetLocationValue(widget3, 'left').then(function(left: number) {
        page.getWidgetLocationValue(widget3, 'width').then(function(width: number) {
            expect(page.getWidgetLocationValue(widget4, 'left')).toBeGreaterThan(left + width - 1);
        });
    });
  });

  it('should react correctly when a widget is moved down', () => {
  
    // Drag widget 1 to the location occupied by widget 2
    browser.actions().dragAndDrop(widget1, widget2).perform();
    expect<any>(page.getNumberOfWidgets()).toEqual(4);
    
    // Widgets 1, 2 and 3 should now be at the top of the page. Widget 1 should be below them.
    expect<any>(page.getWidgetLocationValue(widget2, 'top')).toEqual(0);
    expect<any>(page.getWidgetLocationValue(widget3, 'top')).toEqual(0);
    expect<any>(page.getWidgetLocationValue(widget4, 'top')).toEqual(0);
    page.getWidgetLocationValue(widget2, 'top').then(function(top: number) {
        page.getWidgetLocationValue(widget2, 'height').then(function(height: number) {
            expect(page.getWidgetLocationValue(widget1, 'top')).toBeGreaterThan(top + height - 1);
        });
    });
    
    // Widget 2 should still be at the left of the page. Widget 3 should be to its right.
    expect<any>(page.getWidgetLocationValue(widget2, 'left')).toEqual(0);
    page.getWidgetLocationValue(widget2, 'left').then(function(left: number) {
        page.getWidgetLocationValue(widget2, 'width').then(function(width: number) {
            expect(page.getWidgetLocationValue(widget3, 'left')).toBeGreaterThan(left + width - 1);
        });
    });    
    // Widget 4 should still be to the right of widget 3.
    page.getWidgetLocationValue(widget3, 'left').then(function(left: number) {
        page.getWidgetLocationValue(widget3, 'width').then(function(width: number) {
            expect(page.getWidgetLocationValue(widget4, 'left')).toBeGreaterThan(left + width - 1);
        });
    });
  });

  it('should react correctly when a widget is moved up', () => {
  
    // Drag widget 3 to the location occupied by widget 1.
    browser.actions().dragAndDrop(widget3, widget1).perform();
    expect<any>(page.getNumberOfWidgets()).toEqual(4);
    
    // Widgets 3 should now be at the top of the page. Widget 1 should be below it.
    expect<any>(page.getWidgetLocationValue(widget3, 'top')).toEqual(0);
    page.getWidgetLocationValue(widget3, 'top').then(function(top: number) {
        page.getWidgetLocationValue(widget3, 'height').then(function(height: number) {
            expect(page.getWidgetLocationValue(widget1, 'top')).toBeGreaterThan(top + height - 1);
        });
    });
    // Widgets 2 and 4 should now be below widget 1.
    page.getWidgetLocationValue(widget1, 'top').then(function(top: number) {
        page.getWidgetLocationValue(widget1, 'height').then(function(height: number) {
            expect(page.getWidgetLocationValue(widget2, 'top')).toBeGreaterThan(top + height - 1);
            expect(page.getWidgetLocationValue(widget4, 'top')).toBeGreaterThan(top + height - 1);
        });
    });
    
    // Widget 4 should still be to the right of widget 2.
    page.getWidgetLocationValue(widget2, 'left').then(function(left: number) {
        page.getWidgetLocationValue(widget2, 'width').then(function(width: number) {
            expect(page.getWidgetLocationValue(widget4, 'left')).toBeGreaterThan(left + width - 1);
        });
    });    
  });

  it('should react correctly when a widget is moved left', () => {
  
    // Drag widget 4 to the location occupied by widget 3.
    browser.actions().dragAndDrop(widget4, widget3).perform();
    expect<any>(page.getNumberOfWidgets()).toEqual(4);
    
    // Widget 1 should still be at the top of the page. The tops of the others should still be below its base.
    expect<any>(page.getWidgetLocationValue(widget1, 'top')).toEqual(0);
    page.getWidgetLocationValue(widget1, 'top').then(function(top: number) {
        page.getWidgetLocationValue(widget1, 'height').then(function(height: number) {
            expect(page.getWidgetLocationValue(widget2, 'top')).toBeGreaterThan(top + height - 1);
            expect(page.getWidgetLocationValue(widget3, 'top')).toBeGreaterThan(top + height - 1);
            expect(page.getWidgetLocationValue(widget4, 'top')).toBeGreaterThan(top + height - 1);
        });
    });
    
    // Widget 4 should now be to the right of widget 2.
    expect<any>(page.getWidgetLocationValue(widget2, 'left')).toEqual(0);
    page.getWidgetLocationValue(widget2, 'left').then(function(left: number) {
        page.getWidgetLocationValue(widget2, 'width').then(function(width: number) {
            expect(page.getWidgetLocationValue(widget4, 'left')).toBeGreaterThan(left + width - 1);
        });
    });    
    // Widget 3 should now be to the right of widget 4.
    page.getWidgetLocationValue(widget4, 'left').then(function(left: number) {
        page.getWidgetLocationValue(widget4, 'width').then(function(width: number) {
            expect(page.getWidgetLocationValue(widget3, 'left')).toBeGreaterThan(left + width - 1);
        });
    });
  });

  it('should react correctly when a widget is moved right', () => {
  
    // Drag widget 2 to the location occupied by widget 4.
    browser.actions().dragAndDrop(widget2, widget4).perform();
    expect<any>(page.getNumberOfWidgets()).toEqual(4);
    
    // Widget 1 should still be at the top of the page. The tops of the others should still be below its base.
    expect<any>(page.getWidgetLocationValue(widget1, 'top')).toEqual(0);
    page.getWidgetLocationValue(widget1, 'top').then(function(top: number) {
        page.getWidgetLocationValue(widget1, 'height').then(function(height: number) {
            expect(page.getWidgetLocationValue(widget2, 'top')).toBeGreaterThan(top + height - 1);
            expect(page.getWidgetLocationValue(widget3, 'top')).toBeGreaterThan(top + height - 1);
            expect(page.getWidgetLocationValue(widget4, 'top')).toBeGreaterThan(top + height - 1);
        });
    });
    
    // Widget 4 should still be to the right of widget 3.
    expect<any>(page.getWidgetLocationValue(widget3, 'left')).toEqual(0);
    page.getWidgetLocationValue(widget3, 'left').then(function(left: number) {
        page.getWidgetLocationValue(widget3, 'width').then(function(width: number) {
            expect(page.getWidgetLocationValue(widget4, 'left')).toBeGreaterThan(left + width - 1);
        });
    });    
    // Widget 2 should now be to the right of widget 4.
    page.getWidgetLocationValue(widget4, 'left').then(function(left: number) {
        page.getWidgetLocationValue(widget4, 'width').then(function(width: number) {
            expect(page.getWidgetLocationValue(widget2, 'left')).toBeGreaterThan(left + width - 1);
        });
    });
  });
});