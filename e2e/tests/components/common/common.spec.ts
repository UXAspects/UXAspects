import { browser, ElementFinder } from 'protractor';

export class Constants {
        
    WHITE = '#ffffff';

    PRIMARY_BACKGROUND_COLOR = '#00a7a2';
    PRIMARY_BACKGROUND_HOVER_COLOR = '#008e89';
    PRIMARY_BORDER_COLOR = '#00a7a2';
    PRIMARY_COLOR = this.WHITE;

    SECONDARY_BACKGROUND_COLOR = this.WHITE;
    SECONDARY_BACKGROUND_HOVER_COLOR = '#f2f2f2';
    SECONDARY_BORDER_COLOR = '#00a7a2';
    SECONDARY_COLOR = '#999999';

    ACCENT_BACKGROUND_COLOR = '#7b63a3';
    ACCENT_BACKGROUND_HOVER_COLOR = '#6f5895';
    ACCENT_BORDER_COLOR = '#00a7a2';
    ACCENT_COLOR = this.WHITE;

    WARNING_BACKGROUND_COLOR = '#ff454f';
    WARNING_BACKGROUND_HOVER_COLOR = '#e63e46';
    WARNING_BORDER_COLOR = '#00a7a2';
    WARNING_COLOR = this.WHITE;

    DISABLED_BACKGROUND_COLOR = '#ededed';
    DISABLED_BACKGROUND_HOVER_COLOR = this.DISABLED_BACKGROUND_COLOR;
    DISABLED_BORDER_COLOR = '';
    DISABLED_COLOR = '#a8a8a8';

}

export class Functions {
        
    moveToElement(item: ElementFinder) {
      return browser.actions().
             mouseMove(item, { x: 0, y: 0 }).
             perform();
    }

    moveToElementAndMouseUpDown(item: ElementFinder) {
      return browser.actions().
             mouseMove(item, { x: 0, y: 0 }).
             mouseDown().
             mouseUp().
             perform();
    }

    moveToElementAndClick(item: ElementFinder) {
      return browser.actions().
             mouseMove(item, { x: 0, y: 0 }).
             click().
             perform();
    }

    getElementColourHex(item: ElementFinder, soughtValue: string) {
      return item.getCssValue(soughtValue).then((rgbaValue: string) => {
        var values = rgbaValue.substring(rgbaValue.indexOf('(') + 1, rgbaValue.length).split(',');
        
        var r = parseInt(values[0].trim(), 10).toString(16);
        var g = parseInt(values[1].trim(), 10).toString(16);
        var b = parseInt(values[2].trim(), 10).toString(16);
        
        if (r.length < 2) { r = '0' + r; }
        if (g.length < 2) { g = '0' + g; }
        if (b.length < 2) { b = '0' + b; }
        
        return '#' + r + g + b;
      });
    }
      
    confirmBackgroundColorIsTransparent(item: ElementFinder) {
      return item.getCssValue('background-color').then((backgroundColor: string) => {
        if (backgroundColor === 'transparent' || backgroundColor === 'rgba(0, 0, 0, 0)') {
          return true;
        } else {
          return false;
        }
      });
   }

   confirmColorIsTransparent(item: ElementFinder, property: string) {
    return item.getCssValue(property).then((color: string) => {
      if (color === 'transparent' || color === 'rgba(0, 0, 0, 0)') {
        return true;
      } else {
        return false;
      }
    });
 }    
}

