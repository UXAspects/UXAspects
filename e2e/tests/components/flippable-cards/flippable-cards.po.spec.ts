import { browser, by, element, ElementFinder } from 'protractor';

export class FlippableCardsPage {

    async getPage(): Promise<void> {
        await browser.get('#/flippable-cards');
    }

    flippableCard1 = element(by.id('flippableCard1'));
    flippableCard2 = element(by.id('flippableCard2'));
    flippableCard3 = element(by.id('flippableCard3'));

    confirmIsFlipped(card: ElementFinder) {
        return card.$('div.ux-flip-card').isPresent();
    }

    clickOnCard(card: ElementFinder, offset: { x: number, y: number }) {
        return browser.actions().
            mouseMove(card, offset).
            mouseDown().
            mouseUp().
            perform();
    }

    clickOnCardIcon(card: ElementFinder) {
        return this.confirmIsFlipped(card).then(function (isFlipped: boolean) {
            if (isFlipped) {
                card.$('div.ux-flipper').$('div.ux-flippable-card-back').$('ux-flippable-card-back').$('i').click();
            } else {
                card.$('div.ux-flipper').$('div.ux-flippable-card-front').$('ux-flippable-card-front').$('i').click();
            }
        });
    }

    getCardDimension(card: ElementFinder, attribute: string) {
        return card.getAttribute(attribute);
    }

    hoverOverCard(card: ElementFinder, offset: { x: number, y: number }) {
        return browser.actions().
            mouseMove(card, offset).
            perform();
    }
}

