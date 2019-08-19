import { browser, by, element } from 'protractor';

export class FloatingActionButtonsPage {

    getPage(): void {
        browser.get('#/floating-action-buttons');
    }

    // Floating Action Buttons - Bottom

    fabBottom = element(by.id('actionButtonVerticalBottom'));
    fabBottomTrigger = this.fabBottom.$('.button-primary');
    fabBottomTriggerIcon = this.fabBottomTrigger.$('ux-icon');

    // Floating Action Buttons - Right

    fabRight = element(by.id('actionButtonHorizontalRight'));
    fabRightTrigger = this.fabRight.$('.button-primary');
    fabRightTriggerIcon = this.fabRightTrigger.$('ux-icon');

    // Floating Action Buttons - Up

    fabUp = element(by.id('actionButtonVerticalUp'));
    fabUpTrigger = this.fabUp.$('.button-primary');
    fabUpTriggerIcon = this.fabUpTrigger.$('ux-icon');

    // Floating Action Buttons - Left

    fabLeft = element(by.id('actionButtonHorizontalLeft'));
    fabLeftTrigger = this.fabLeft.$('.button-primary');
    fabLeftTriggerIcon = this.fabLeftTrigger.$('ux-icon');

}

