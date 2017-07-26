import { browser, Key } from 'protractor';
import { FlippableCardsPage } from './flippable-cards.po.spec';

describe('Flippable Cards Tests', () => {

  let page: FlippableCardsPage;
  let browserName: string;

  beforeEach(() => {
    page = new FlippableCardsPage();
    page.getPage();
    
    browser.getCapabilities().then(function(caps) {
        browserName = caps.get('browserName');
    });
  });

  it('should have correct initial states', () => {
    
    // Initial values.
    expect(page.confirmIsFlipped(page.flippableCard1)).toBeFalsy();
    expect(page.confirmIsFlipped(page.flippableCard2)).toBeFalsy();
    expect(page.confirmIsFlipped(page.flippableCard3)).toBeFalsy();
    
  });

  it('should only be possible to flip card 1 by clicking on the icon', () => {
    
    // Click at the top left of the card.
    page.clickOnCard(page.flippableCard1, {x: 0, y: 0});
    expect(page.confirmIsFlipped(page.flippableCard1)).toBeFalsy();    // Front
    
    // Click at the middle of the card.
    page.getCardDimension(page.flippableCard1, 'height').then(function(height: string) {
        page.getCardDimension(page.flippableCard1, 'width').then(function(width: string) {
            page.clickOnCard(page.flippableCard1, {x: (Number(width) / 2), y: (Number(height) / 2)});
            expect(page.confirmIsFlipped(page.flippableCard1)).toBeFalsy();    // Front
        });
    });
    
    // Click at the bottom right of the card.
    page.getCardDimension(page.flippableCard1, 'height').then(function(height: string) {
        page.getCardDimension(page.flippableCard1, 'width').then(function(width: string) {
            page.clickOnCard(page.flippableCard1, {x: (Number(width) - 1), y: (Number(height) - 1)});
            expect(page.confirmIsFlipped(page.flippableCard1)).toBeFalsy();    // Front
        });
    });
    
    // Click beyond the bottom right of the card.
    page.getCardDimension(page.flippableCard1, 'height').then(function(height: string) {
        page.getCardDimension(page.flippableCard1, 'width').then(function(width: string) {
            page.clickOnCard(page.flippableCard1, {x: (Number(width) * 2), y: Number(height)});
            expect(page.confirmIsFlipped(page.flippableCard1)).toBeFalsy();    // Front
        });
    });
    
    // Click on the icon.
    page.clickOnCardIcon(page.flippableCard1);
    expect(page.confirmIsFlipped(page.flippableCard1)).toBeTruthy();    // Back
    // Click on the icon again.
    page.clickOnCardIcon(page.flippableCard1);
    expect(page.confirmIsFlipped(page.flippableCard1)).toBeFalsy();    // Front
    
  });

  it('should be possible to flip card 2 by hovering over it', () => {
    
    // Hover over the top left of the card.
    page.hoverOverCard(page.flippableCard2, {x: 0, y: 0});
    expect(page.confirmIsFlipped(page.flippableCard2)).toBeTruthy();    // Back    
    // Hover to the left of the card.
    page.hoverOverCard(page.flippableCard2, {x: -10, y: 0});
    expect(page.confirmIsFlipped(page.flippableCard2)).toBeFalsy();    // Front    
    
    // Hover over the middle of the card.
    page.getCardDimension(page.flippableCard2, 'height').then(function(height: string) {
        page.getCardDimension(page.flippableCard2, 'width').then(function(width: string) {
            page.hoverOverCard(page.flippableCard2, {x: (Number(width) / 2), y: (Number(height) / 2)});
            expect(page.confirmIsFlipped(page.flippableCard2)).toBeTruthy();    // Back
        });
    });
    // Hover to the left of the card.
    page.hoverOverCard(page.flippableCard2, {x: -10, y: 0});
    expect(page.confirmIsFlipped(page.flippableCard2)).toBeFalsy();    // Front    
    
    // Hover over the bottom right of the card.
    page.getCardDimension(page.flippableCard2, 'height').then(function(height: string) {
        page.getCardDimension(page.flippableCard2, 'width').then(function(width: string) {
            page.hoverOverCard(page.flippableCard2, {x: (Number(width) - 1), y: (Number(height) - 1)});
            expect(page.confirmIsFlipped(page.flippableCard2)).toBeTruthy();    // Back
        });
    });
    // Hover to the left of the card.
    page.hoverOverCard(page.flippableCard2, {x: -10, y: 0});
    expect(page.confirmIsFlipped(page.flippableCard2)).toBeFalsy();    // Front    
    
    // Hover beyond the bottom right of the card.
    page.getCardDimension(page.flippableCard2, 'height').then(function(height: string) {
        page.getCardDimension(page.flippableCard2, 'width').then(function(width: string) {
            page.clickOnCard(page.flippableCard2, {x: (Number(width) * 2), y: Number(height)});
            expect(page.confirmIsFlipped(page.flippableCard2)).toBeFalsy();    // Front
        });
    });
    
  });

  it('should be possible to flip card 3 by clicking anywhere on the card', () => {
    
    // Click at the top left of the card.
    page.clickOnCard(page.flippableCard3, {x: 0, y: 0});
    expect(page.confirmIsFlipped(page.flippableCard3)).toBeTruthy();    // Front
    
    // Click at the middle of the card.
    page.getCardDimension(page.flippableCard3, 'height').then(function(height: string) {
        page.getCardDimension(page.flippableCard3, 'width').then(function(width: string) {
            page.clickOnCard(page.flippableCard3, {x: (Number(width) / 2), y: (Number(height) / 2)});
            expect(page.confirmIsFlipped(page.flippableCard3)).toBeFalsy();    // Back
        });
    });
    
    // Click at the bottom right of the card.
    page.getCardDimension(page.flippableCard3, 'height').then(function(height: string) {
        page.getCardDimension(page.flippableCard3, 'width').then(function(width: string) {
            page.clickOnCard(page.flippableCard3, {x: (Number(width) - 1), y: (Number(height) - 1)});
            expect(page.confirmIsFlipped(page.flippableCard3)).toBeTruthy();    // Front
        });
    });
    
    // Click beyond the bottom right of the card.
    page.getCardDimension(page.flippableCard3, 'height').then(function(height: string) {
        page.getCardDimension(page.flippableCard3, 'width').then(function(width: string) {
            page.clickOnCard(page.flippableCard3, {x: (Number(width) + 1), y: (Number(height) + 1)});
            expect(page.confirmIsFlipped(page.flippableCard3)).toBeTruthy();    // Front
        });
    });
    
  });
});