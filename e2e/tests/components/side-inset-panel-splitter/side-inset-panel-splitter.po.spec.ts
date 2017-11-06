import { browser, element, by, ElementFinder } from 'protractor';

export class SideInsetPanelSplitterPage {
        
    getPage(): void {
        browser.get('/side-inset-panel-splitter');
    }
    
    splitterHoriz = element(by.id('splitter-horiz'));
    splitterHorizMain = element(by.id('splitter-horiz-main'));
    splitterHorizSide = element(by.id('splitter-horiz-side'));
    buttonHoriz = element(by.id('splitter-horiz')).$('div.side-inset-splitter-toggle-container.left').
                  $('div.side-inset-splitter-toggle');
    buttonHorizIcon = this.buttonHoriz.$('a.hpe-icon');
    dividerHoriz = element(by.id('splitter-horiz')).$('div.gutter.gutter-horizontal');
    dividerHorizHandle = this.dividerHoriz.$('div');

    splitterVert = element(by.id('splitter-vert'));
    splitterVertMain = element(by.id('splitter-vert-main'));
    splitterVertSide = element(by.id('splitter-vert-side'));
    buttonVert = element(by.id('splitter-vert')).$('div.side-inset-splitter-toggle-container.bottom').
                 $('div.side-inset-splitter-toggle');
    buttonVertIcon = this.buttonVert.$('a.hpe-icon');
    dividerVert = element(by.id('splitter-vert')).$('div.gutter.gutter-vertical');
    dividerVertHandle = this.dividerVert.$('div');

    getPanelDimension(panel: ElementFinder, dimension: string) {
      return panel.getCssValue(dimension).then((value: string) => {
        var valueNum = /^\s*[0-9]*/.exec(value);
        return valueNum[0];
      });
    }
}

