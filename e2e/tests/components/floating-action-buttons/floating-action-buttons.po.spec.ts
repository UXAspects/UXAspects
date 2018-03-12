import { browser, element, by, ElementFinder } from 'protractor';

export class FloatingActionButtonsPage {

    getPage(): void {
        browser.get('#/floating-action-buttons');
    }

    // Floating Action Buttons - Bottom

    fabBottom = element(by.id('actionButtonVerticalBottom'));
    fabButtomButtons = this.fabBottom.$('.floating-action-button-list');
    fabBottomTrigger = this.fabBottom.$('.button-primary');
    fabBottomTriggerIcon = this.fabBottomTrigger.$('span.hpe-icon');

    fabBottomBtn1 = this.fabButtomButtons.$$('.button-secondary').get(0);
    fabBottomBtn2 = this.fabButtomButtons.$$('.button-secondary').get(1);
    fabBottomBtn3 = this.fabButtomButtons.$$('.button-secondary').get(2);

    fabBottomBtn1Icon = this.fabBottomBtn1.$('span.hpe-icon');
    fabBottomBtn2Icon = this.fabBottomBtn2.$('span.hpe-icon');
    fabBottomBtn3Icon = this.fabBottomBtn3.$('span.hpe-icon');

    // Floating Action Buttons - Right

    fabRight = element(by.id('actionButtonHorizontalRight'));
    fabRightButtons = this.fabRight.$('.floating-action-button-list');
    
    fabRightTrigger = this.fabRight.$('.button-primary');
    fabRightTriggerIcon = this.fabRightTrigger.$('span.hpe-icon');

    fabRightBtn1 = this.fabRightButtons.$$('.button-secondary').get(0);
    fabRightBtn2 = this.fabRightButtons.$$('.button-secondary').get(1);
    fabRightBtn3 = this.fabRightButtons.$$('.button-secondary').get(2);

    fabRightBtn1Icon = this.fabRightBtn1.$('span.hpe-icon');
    fabRightBtn2Icon = this.fabRightBtn2.$('span.hpe-icon');
    fabRightBtn3Icon = this.fabRightBtn3.$('span.hpe-icon');

    // Floating Action Buttons - Up

    fabUp = element(by.id('actionButtonVerticalUp'));
    fabUpButtons = this.fabUp.$('.floating-action-button-list');
    fabUpTrigger = this.fabUp.$('.button-primary');
    fabUpTriggerIcon = this.fabUpTrigger.$('span.hpe-icon');

    fabUpBtn1 = this.fabUpButtons.$$('.button-secondary').get(0);
    fabUpBtn2 = this.fabUpButtons.$$('.button-secondary').get(1);
    fabUpBtn3 = this.fabUpButtons.$$('.button-secondary').get(2);

    fabUpBtn1Icon = this.fabUpBtn1.$('span.hpe-icon');
    fabUpBtn2Icon = this.fabUpBtn2.$('span.hpe-icon');
    fabUpBtn3Icon = this.fabUpBtn3.$('span.hpe-icon');

    // Floating Action Buttons - Left

    fabLeft = element(by.id('actionButtonHorizontalLeft'));
    fabLeftButtons = this.fabLeft.$('.floating-action-button-list');
    fabLeftTrigger = this.fabLeft.$('.button-primary');
    fabLeftTriggerIcon = this.fabLeftTrigger.$('span.hpe-icon');

    fabLeftBtn1 = this.fabLeftButtons.$$('.button-secondary').get(0);
    fabLeftBtn2 = this.fabLeftButtons.$$('.button-secondary').get(1);
    fabLeftBtn3 = this.fabLeftButtons.$$('.button-secondary').get(2);

    fabLeftBtn1Icon = this.fabLeftBtn1.$('span.hpe-icon');
    fabLeftBtn2Icon = this.fabLeftBtn2.$('span.hpe-icon');
    fabLeftBtn3Icon = this.fabLeftBtn3.$('span.hpe-icon');

}

