import { browser } from 'protractor';
import { imageCompare } from '../common/image-compare';
import { FlippableCardsPage } from './flippable-cards.po.spec';

describe('Flippable Cards Tests', () => {

    // Time, in milliseconds, to pause while waiting for the a card to flip.
    const FLIP_DELAY_MS = 700;

    let page: FlippableCardsPage = new FlippableCardsPage();

    beforeAll(async () => {
        await page.getPage();
    });

    it('should have correct initial states', async () => {

        // Initial values.
        expect(await page.confirmIsFlipped(page.flippableCard1)).toBeFalsy();
        expect(await page.confirmIsFlipped(page.flippableCard2)).toBeFalsy();
        expect(await page.confirmIsFlipped(page.flippableCard3)).toBeFalsy();

        expect(await imageCompare('flippable-card-initial')).toEqual(0);

    });

    it('should only be possible to flip card 1 by clicking on the icon', async () => {

        // Click at the top left of the card.
        await page.clickOnCard(page.flippableCard1, { x: 0, y: 0 });
        await browser.sleep(FLIP_DELAY_MS);
        expect(await page.confirmIsFlipped(page.flippableCard1)).toBeFalsy();    // Front

        // Click at the middle of the card.
        let height = await page.getCardDimension(page.flippableCard1, 'height');
        let width = await page.getCardDimension(page.flippableCard1, 'width');
        await page.clickOnCard(page.flippableCard1, { x: (Number(width) / 2), y: (Number(height) / 2) });
        await browser.sleep(FLIP_DELAY_MS);
        expect(await page.confirmIsFlipped(page.flippableCard1)).toBeFalsy();    // Front

        // Click at the bottom right of the card.
        height = await page.getCardDimension(page.flippableCard1, 'height');
        width = await page.getCardDimension(page.flippableCard1, 'width');
        await page.clickOnCard(page.flippableCard1, { x: (Number(width) - 1), y: (Number(height) - 1) });
        await browser.sleep(FLIP_DELAY_MS);
        await expect(page.confirmIsFlipped(page.flippableCard1)).toBeFalsy();    // Front

        // Click beyond the bottom right of the card.
        height = await page.getCardDimension(page.flippableCard1, 'height');
        width = await page.getCardDimension(page.flippableCard1, 'width');
        await page.clickOnCard(page.flippableCard1, { x: (Number(width) * 2), y: Number(height) });
        await browser.sleep(FLIP_DELAY_MS);
        await expect(page.confirmIsFlipped(page.flippableCard1)).toBeFalsy();    // Front

        // Click on the icon.
        await page.clickOnCardIcon(page.flippableCard1);
        await browser.sleep(FLIP_DELAY_MS);
        expect(await page.confirmIsFlipped(page.flippableCard1)).toBeTruthy();    // Back
        expect(await imageCompare('flippable-card-flipped')).toEqual(0);

        // Click on the icon again.
        await page.clickOnCardIcon(page.flippableCard1);
        await browser.sleep(FLIP_DELAY_MS);
        expect(await page.confirmIsFlipped(page.flippableCard1)).toBeFalsy();    // Front

    });

    it('should be possible to flip card 2 by hovering over it', async () => {

        // Hover over the top left of the card.
        await page.hoverOverCard(page.flippableCard2, { x: 0, y: 0 });
        await browser.sleep(FLIP_DELAY_MS);
        expect(await page.confirmIsFlipped(page.flippableCard2)).toBeTruthy();    // Back

        // Hover to the left of the card.
        await page.hoverOverCard(page.flippableCard2, { x: -10, y: 0 });
        await browser.sleep(FLIP_DELAY_MS);
        expect(await page.confirmIsFlipped(page.flippableCard2)).toBeFalsy();    // Front


        // Hover over the middle of the card.
        let height = await page.getCardDimension(page.flippableCard2, 'height');
        let width = await page.getCardDimension(page.flippableCard2, 'width');
        await page.hoverOverCard(page.flippableCard2, { x: (Number(width) / 2), y: (Number(height) / 2) });
        await browser.sleep(FLIP_DELAY_MS);
        expect(await page.confirmIsFlipped(page.flippableCard2)).toBeTruthy();    // Back

        // Hover to the left of the card.
        await page.hoverOverCard(page.flippableCard2, { x: -10, y: 0 });
        await browser.sleep(FLIP_DELAY_MS);
        expect(await page.confirmIsFlipped(page.flippableCard2)).toBeFalsy();    // Front

        // Hover over the bottom right of the card.
        height = await page.getCardDimension(page.flippableCard2, 'height');
        width = await page.getCardDimension(page.flippableCard2, 'width');
        await page.hoverOverCard(page.flippableCard2, { x: (Number(width) - 1), y: (Number(height) - 1) });
        await browser.sleep(FLIP_DELAY_MS);
        expect(await page.confirmIsFlipped(page.flippableCard2)).toBeTruthy();    // Back

        // Hover to the left of the card.
        await page.hoverOverCard(page.flippableCard2, { x: -10, y: 0 });
        await browser.sleep(FLIP_DELAY_MS);
        expect(await page.confirmIsFlipped(page.flippableCard2)).toBeFalsy();    // Front

        // Hover beyond the bottom right of the card.
        height = await page.getCardDimension(page.flippableCard2, 'height');
        width = await page.getCardDimension(page.flippableCard2, 'width');
        await page.clickOnCard(page.flippableCard2, { x: (Number(width) * 2), y: Number(height) });
        await browser.sleep(FLIP_DELAY_MS);
        expect(await page.confirmIsFlipped(page.flippableCard2)).toBeFalsy();    // Front

    });

    it('should be possible to flip card 3 by clicking anywhere on the card', async () => {

        // Click at the top left of the card.
        page.clickOnCard(page.flippableCard3, { x: 0, y: 0 }).then(() => {
            browser.sleep(FLIP_DELAY_MS);
            expect(page.confirmIsFlipped(page.flippableCard3)).toBeTruthy();    // Front
        });

        // Click at the middle of the card.
        let height = await page.getCardDimension(page.flippableCard3, 'height');
        let width = await page.getCardDimension(page.flippableCard3, 'width');
        await page.clickOnCard(page.flippableCard3, { x: (Number(width) / 2), y: (Number(height) / 2) });
        await browser.sleep(FLIP_DELAY_MS);
        expect(await page.confirmIsFlipped(page.flippableCard3)).toBeFalsy();    // Back

        // Click at the bottom right of the card.
        height = await page.getCardDimension(page.flippableCard3, 'height');
        width = await page.getCardDimension(page.flippableCard3, 'width');
        await page.clickOnCard(page.flippableCard3, { x: (Number(width) - 1), y: (Number(height) - 1) });
        await browser.sleep(FLIP_DELAY_MS);
        expect(await page.confirmIsFlipped(page.flippableCard3)).toBeTruthy();    // Front

        // Click beyond the bottom right of the card.
        height = await page.getCardDimension(page.flippableCard3, 'height');
        width = await page.getCardDimension(page.flippableCard3, 'width');
        await page.clickOnCard(page.flippableCard3, { x: (Number(width) + 1), y: (Number(height) + 1) });
        await browser.sleep(FLIP_DELAY_MS);
        expect(await page.confirmIsFlipped(page.flippableCard3)).toBeTruthy();    // Front

    });
});