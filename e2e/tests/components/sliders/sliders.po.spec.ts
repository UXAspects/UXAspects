import { browser, element, by, ElementFinder } from 'protractor';

export class SlidersPage {
        
    getPage(): void {
        browser.get('#/sliders');
    }
    
    slider1 = element(by.id('slider1'));
    slider2 = element(by.id('slider2'));
    slider3 = element(by.id('slider3'));
    slider4 = element(by.id('slider4'));
    slider5 = element(by.id('slider5'));
    slider6 = element(by.id('slider6'));
    slider7 = element(by.id('slider7'));
    input1 = element(by.id('input1'));
    input2 = element(by.id('input2'));
    
    getHandleAttribute(slider: ElementFinder, handle: string, attribute: string) {
        if (handle === 'lower') {
            return slider.$('div.track').$('div.thumb.lower').getAttribute(attribute);
        } else {
            return slider.$('div.track').$('div.thumb.upper').getAttribute(attribute);
        }
    }
    
    mouseDownOnHandle(slider: ElementFinder, handle: string) {
        if (handle === 'lower') {
            browser.actions().mouseDown(slider.$('div.track').$('div.thumb.lower')).perform();
        } else {
            browser.actions().mouseDown(slider.$('div.track').$('div.thumb.upper')).perform();
        }
    }
    
    mouseUpFromHandle(slider: ElementFinder, handle: string) {
        if (handle === 'lower') {
            browser.actions().mouseUp(slider.$('div.track').$('div.thumb.lower')).perform();
        } else {
            browser.actions().mouseUp(slider.$('div.track').$('div.thumb.upper')).perform();
        }
    }
    
    moveMouseToHandle(slider: ElementFinder, handle: string) {
        if (handle === 'lower') {
            browser.actions().mouseMove(slider.$('div.track').$('div.thumb.lower')).perform();
        } else {
            browser.actions().mouseMove(slider.$('div.track').$('div.thumb.upper')).perform();
        }
    }
    
    moveHandleToTick(slider: ElementFinder, handle: string, tick: number) {
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
    }
    
    moveMouseToTick(slider: ElementFinder, tick: number) {
        browser.actions().mouseMove(slider.$('div.tick-container').$$('div.tick').get(tick)).perform();
    }
    
    dragAndDropHandle(slider: ElementFinder, handle: string, offset: { x: number, y: number }) {
        if (handle === 'lower') {
            browser.actions().dragAndDrop(slider.$('div.track').$('div.thumb.lower'), offset).perform();
        } else {
            browser.actions().dragAndDrop(slider.$('div.track').$('div.thumb.upper'), offset).perform();
        }
    }
    
    getTooltipValue(slider: ElementFinder, handle: string) {
        if (handle === 'lower') {
            return slider.$('div.track').$('div.thumb.lower').$('div.tooltip-lower').$('div.tooltip-inner').getText();
        } else {
            return slider.$('div.track').$('div.thumb.upper').$('div.tooltip-upper').$('div.tooltip-inner').getText();
        }
    }
    
    getTooltipAttribute(slider: ElementFinder, handle: string, attribute: string) {
        if (handle === 'lower') {
            return slider.$('div.track').$('div.thumb.lower').$('div.tooltip-lower').$('div.tooltip-inner').getAttribute(attribute);
        } else {
            return slider.$('div.track').$('div.thumb.upper').$('div.tooltip-upper').$('div.tooltip-inner').getAttribute(attribute);
        }
    }
    
    confirmTooltipExists(slider: ElementFinder, handle: string) {
        if (handle === 'lower') {
            return slider.$('div.track').$('div.thumb.lower').$('div.tooltip-lower').$('div.tooltip-inner').isPresent();
        } else {
            return slider.$('div.track').$('div.thumb.upper').$('div.tooltip-upper').$('div.tooltip-inner').isPresent();
        }
    }
    
    getSliderRangeAttribute(slider: ElementFinder, attribute: string) {
        return slider.$('div.track').$('div.track-range').getAttribute(attribute);
    }
    
    getTickAttribute(slider: ElementFinder, attribute: string, tick: number) {
        return slider.$('div.tick-container').$$('div.tick').get(tick).getAttribute(attribute);
    }
    
    getTickLabel(slider: ElementFinder, tick: number) {
        return slider.$('div.tick-container').$$('div.tick').get(tick).$('div.tick-label').getText();
    }
    
    confirmTicksExist(slider: ElementFinder) {
        return slider.$('div.tick-container').isPresent();
    }
    
    getInputValue(input: ElementFinder) {
        return input.getAttribute('value');
    }
    
    clickOnSlider(slider: ElementFinder) {
        slider.$('div.track').click();
    }
}