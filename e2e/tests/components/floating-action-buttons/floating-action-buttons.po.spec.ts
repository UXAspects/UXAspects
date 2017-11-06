import { browser, element, by, ElementFinder } from 'protractor';

export class FloatingActionButtonsPage {
        
    getPage(): void {
        browser.get('/floating-action-buttons');
    }
    
    actionButtonVerticalBottom = element(by.id('actionButtonVerticalBottom'));
    buttonVerticalBottomButton = this.actionButtonVerticalBottom.$('button.dir-bottom');
    buttonVerticalBottomButtonIcon = this.buttonVerticalBottomButton.$('span.hpe-icon');
    buttonVerticalBottomAction0 = this.actionButtonVerticalBottom.$('ul').$$('li').get(0);
    buttonVerticalBottomAction1 = this.actionButtonVerticalBottom.$('ul').$$('li').get(1);
    buttonVerticalBottomAction2 = this.actionButtonVerticalBottom.$('ul').$$('li').get(2);
    buttonVerticalBottomAction0Icon = this.buttonVerticalBottomAction0.$('span.hpe-icon');
    buttonVerticalBottomAction1Icon = this.buttonVerticalBottomAction1.$('span.hpe-icon');
    buttonVerticalBottomAction2Icon = this.buttonVerticalBottomAction2.$('button.btn-circular').$('span.hpe-icon');

    actionButtonHorizontalRight = element(by.id('actionButtonHorizontalRight'));
    buttonHorizontalRightButton = this.actionButtonHorizontalRight.$('button.dir-right');
    buttonHorizontalRightButtonIcon = this.buttonHorizontalRightButton.$('span.hpe-icon');
    buttonHorizontalRightAction0 = this.actionButtonHorizontalRight.$('span.child-btn-set-horizontal.right').$$('button.btn-circular').get(0);
    buttonHorizontalRightAction1 = this.actionButtonHorizontalRight.$('span.child-btn-set-horizontal.right').$$('button.btn-circular').get(1);
    buttonHorizontalRightAction2 = this.actionButtonHorizontalRight.$('span.child-btn-set-horizontal.right').$$('button.btn-circular').get(2);
    buttonHorizontalRightAction0Icon = this.buttonHorizontalRightAction0.$('span.hpe-icon');
    buttonHorizontalRightAction1Icon = this.buttonHorizontalRightAction1.$('span.hpe-icon');
    buttonHorizontalRightAction2Icon = this.buttonHorizontalRightAction2.$('span.hpe-icon');

    actionButtonVerticalUp = element(by.id('actionButtonVerticalUp'));
    buttonVerticalUpButton = this.actionButtonVerticalUp.$('button.dir-top');
    buttonVerticalUpButtonIcon = this.buttonVerticalUpButton.$('span.hpe-icon');
    buttonVerticalUpAction0 = this.actionButtonVerticalUp.$('ul').$$('li').get(0);
    buttonVerticalUpAction1 = this.actionButtonVerticalUp.$('ul').$$('li').get(1);
    buttonVerticalUpAction2 = this.actionButtonVerticalUp.$('ul').$$('li').get(2);
    buttonVerticalUpAction0Icon = this.buttonVerticalUpAction0.$('button.btn-circular').$('span.hpe-icon');
    buttonVerticalUpAction1Icon = this.buttonVerticalUpAction1.$('button.btn-circular').$('span.hpe-icon');
    buttonVerticalUpAction2Icon = this.buttonVerticalUpAction2.$('button.btn-circular').$('span.hpe-icon');

    actionButtonHorizontalLeft = element(by.id('actionButtonHorizontalLeft'));
    buttonHorizontalLeftButton = this.actionButtonHorizontalLeft.$('button.dir-left');
    buttonHorizontalLeftButtonIcon = this.buttonHorizontalLeftButton.$('span.hpe-icon');
    buttonHorizontalLeftAction0 = this.actionButtonHorizontalLeft.$('ul').$$('li').get(0);
    buttonHorizontalLeftAction1 = this.actionButtonHorizontalLeft.$('ul').$$('li').get(1);
    buttonHorizontalLeftAction2 = this.actionButtonHorizontalLeft.$('ul').$$('li').get(2);
    buttonHorizontalLeftAction0Icon = this.buttonHorizontalLeftAction0.$('button.btn-circular').$('span.hpe-icon');
    buttonHorizontalLeftAction1Icon = this.buttonHorizontalLeftAction1.$('button.btn-circular').$('span.hpe-icon');
    buttonHorizontalLeftAction2Icon = this.buttonHorizontalLeftAction2.$('button.btn-circular').$('span.hpe-icon');
    
}

