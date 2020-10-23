import { browser, by, element, ElementFinder } from 'protractor';

export abstract class SlidersPageBase {

    topFocusTarget = element(by.id('top-focus'));

    async getPage(): Promise<void> {
        await browser.get('#/sliders');
    }

    getHandleAttribute(slider: ElementFinder, handle: string, attribute: string) {
        if (handle === 'lower') {
            return slider.$('div.track').$('div.thumb.lower').getAttribute(attribute);
        } else {
            return slider.$('div.track').$('div.thumb.upper').getAttribute(attribute);
        }
    }

    async mouseDownOnHandle(slider: ElementFinder, handle: string) {
        if (handle === 'lower') {
            await browser.actions().mouseDown(slider.$('div.track').$('div.thumb.lower')).perform();
        } else {
            await browser.actions().mouseDown(slider.$('div.track').$('div.thumb.upper')).perform();
        }
    }

    async mouseUpFromHandle(slider: ElementFinder, handle: string) {
        if (handle === 'lower') {
            await browser.actions().mouseUp(slider.$('div.track').$('div.thumb.lower')).perform();
        } else {
            await browser.actions().mouseUp(slider.$('div.track').$('div.thumb.upper')).perform();
        }
    }

    async moveMouseToHandle(slider: ElementFinder, handle: string) {
        if (handle === 'lower') {
            await browser.actions().mouseMove(slider.$('div.track').$('div.thumb.lower')).perform();
        } else {
            await browser.actions().mouseMove(slider.$('div.track').$('div.thumb.upper')).perform();
        }
    }

    async moveHandleToTick(slider: ElementFinder, handle: string, tick: number) {
        if (handle === 'lower') {
            await browser.actions().
                mouseDown(slider.$('div.track').$('div.thumb.lower')).
                mouseMove(slider.$('div.tick-container').$$('div.tick').get(tick)).
                mouseUp(slider.$('div.track').$('div.thumb.lower')).
                perform();
        } else {
            await browser.actions().
                mouseDown(slider.$('div.track').$('div.thumb.upper')).
                mouseMove(slider.$('div.tick-container').$$('div.tick').get(tick)).
                mouseUp(slider.$('div.track').$('div.thumb.upper')).
                perform();
        }
    }

    async moveMouseToTick(slider: ElementFinder, tick: number) {
        await browser.actions().mouseMove(slider.$('div.tick-container').$$('div.tick').get(tick)).perform();
    }

    async dragAndDropHandle(slider: ElementFinder, handle: string, offset: { x: number, y: number }) {
        if (handle === 'lower') {
            await browser.actions().dragAndDrop(slider.$('div.track').$('div.thumb.lower'), offset).perform();
        } else {
            await browser.actions().dragAndDrop(slider.$('div.track').$('div.thumb.upper'), offset).perform();
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

    getTooltipClass(slider: ElementFinder, handle: string) {
        if (handle === 'lower') {
            return slider.$('div.track').$('div.thumb.lower').$('div.tooltip-lower').getAttribute('class');
        } else {
            return slider.$('div.track').$('div.thumb.upper').$('div.tooltip-upper').getAttribute('class');
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
        return slider.$('.tick-container').isPresent();
    }

    getInputValue(input: ElementFinder) {
        return input.getAttribute('value');
    }

    async clickOnSlider(slider: ElementFinder) {
        await slider.$('div.track').click();
    }
}

export class SlidersPage extends SlidersPageBase {

    singleValueCustomLabels = element(by.id('single-value-custom-labels'));
    singleValueCalloutOnDrag = element(by.id('single-value-callout-on-drag'));
    singleValueNarrowSnapping = element(by.id('single-value-narrow-snapping'));
    singleValueNarrowCalloutOnHover = element(by.id('single-value-narrow-callout-on-hover'));
    rangeCalloutCustom = element(by.id('range-callout-custom'));
    rangeWithTextInputs = element(by.id('range-text-inputs'));
    input1 = element(by.id('input1'));
    input2 = element(by.id('input2'));
    colorChangeButton = element(by.id('track-color-change-btn'));
    disabledButton = element(by.id('disabled-btn'));
}
