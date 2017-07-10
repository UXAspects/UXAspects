import { browser, element, by } from 'protractor';

export class SlidersPage {
        
    getPage(): void {
        browser.get('/sliders');
    }
    
    titleText = browser.getTitle();
    
    slider1 = element(by.id('slider1'));
    slider2 = element(by.id('slider2'));
    slider3 = element(by.id('slider3'));
    slider4 = element(by.id('slider4'));
    slider5 = element(by.id('slider5'));
    slider6 = element(by.id('slider6'));
    slider7 = element(by.id('slider7'));
    input1 = element(by.id('input1'));
    input2 = element(by.id('input2'));
    
    getHandleAttribute = function(slider: any, handle: string, attribute: string) {
        if (handle === 'lower') {
            return slider.$('div.track').$('div.thumb.lower').getAttribute(attribute);
        } else {
            return slider.$('div.track').$('div.thumb.upper').getAttribute(attribute);
        }
    };
    
    mouseDownOnHandle = function(slider: any, handle: string) {
        if (handle === 'lower') {
            browser.actions().mouseDown(slider.$('div.track').$('div.thumb.lower')).perform();
        } else {
            browser.actions().mouseDown(slider.$('div.track').$('div.thumb.upper')).perform();
        }
    };
    
    mouseUpFromHandle = function(slider: any, handle: string) {
        if (handle === 'lower') {
            browser.actions().mouseUp(slider.$('div.track').$('div.thumb.lower')).perform();
        } else {
            browser.actions().mouseUp(slider.$('div.track').$('div.thumb.upper')).perform();
        }
    };
    
    moveMouseToHandle = function(slider: any, handle: string) {
        if (handle === 'lower') {
            browser.actions().mouseMove(slider.$('div.track').$('div.thumb.lower')).perform();
        } else {
            browser.actions().mouseMove(slider.$('div.track').$('div.thumb.upper')).perform();
        }
    };
    
    moveHandleToTick = function(slider: any, handle: string, tick: number) {
        if (handle === 'lower') {
            browser.actions().
                mouseDown(slider.$('div.track').$('div.thumb.lower')).
                mouseMove(slider.$('div.tick-container').$$('div.tick').get(tick)).
                mouseUp(slider.$('div.track').$('div.thumb.lower')).
                perform();
        } else {
            browser.actions().
                mouseDown(slider.$('div.track').$('div.thumb.upper')).
                mouseMove(slider.$('div.tick-container').$$('div.tick').get(tick)).
                mouseUp(slider.$('div.track').$('div.thumb.upper')).
                perform();
        }
    };
    
    moveMouseToTick = function(slider: any, tick: number) {
        browser.actions().mouseMove(slider.$('div.tick-container').$$('div.tick').get(tick)).perform();
    };
    
    dragAndDropHande = function(slider: any, handle: string, target: any) {
        if (handle === 'lower') {
            browser.actions().dragAndDrop(slider.$('div.track').$('div.thumb.lower'), target).perform();
        } else {
            browser.actions().dragAndDrop(slider.$('div.track').$('div.thumb.upper'), target).perform();
        }
    };
    
    getTooltipValue = function(slider: any, handle: string) {
        if (handle === 'lower') {
            return slider.$('div.track').$('div.thumb.lower').$('div.tooltip-lower').$('div.tooltip-inner').getText();
        } else {
            return slider.$('div.track').$('div.thumb.upper').$('div.tooltip-upper').$('div.tooltip-inner').getText();
        }
    };
    
    getTooltipAttribute = function(slider: any, handle: string, attribute: string) {
        if (handle === 'lower') {
            return slider.$('div.track').$('div.thumb.lower').$('div.tooltip-lower').$('div.tooltip-inner').getAttribute(attribute);
        } else {
            return slider.$('div.track').$('div.thumb.upper').$('div.tooltip-upper').$('div.tooltip-inner').getAttribute(attribute);
        }
    };
    
    confirmTooltipExists = function(slider: any, handle: string) {
        if (handle === 'lower') {
            return slider.$('div.track').$('div.thumb.lower').$('div.tooltip-lower').$('div.tooltip-inner').isPresent();
        } else {
            return slider.$('div.track').$('div.thumb.upper').$('div.tooltip-upper').$('div.tooltip-inner').isPresent();
        }
    };
    
    getSliderRangeAttribute = function(slider: any, attribute: string) {
        return slider.$('div.track').$('div.track-range').getAttribute(attribute);
    };
    
    getTickAttribute = function(slider: any, attribute: string, tick: any) {
        return slider.$('div.tick-container').$$('div.tick').get(tick).getAttribute(attribute);
    };
    
    getTickLabel = function(slider: any, tick: any) {
        return slider.$('div.tick-container').$$('div.tick').get(tick).$('div.tick-label').getText();
    };
    
    confirmTicksExist = function(slider: any) {
        return slider.$('div.tick-container').isPresent();
    };
    
    getInputValue = function(input: any) {
        return input.getAttribute('value');
    };
    
    clickOnSlider = function(slider: any) {
        slider.$('div.track').click();
    };
}
