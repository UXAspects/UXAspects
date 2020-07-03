import { $$, browser, by, element, ElementFinder } from 'protractor';

export class NotificationPage {
    showNotificationButton = element(by.id('show-notification'));
    dismissAllButton = element(by.id('dismiss-all'));
    directionBelowButton = element(by.id('direction-below'));
    positionTopLeftButton = element(by.id('position-top-left'));
    positionBottomLeftButton = element(by.id('position-bottom-left'));
    positionBottomRightButton = element(by.id('position-bottom-right'));

    async getPage(): Promise<void> {
        await browser.get('#/notification');
    }

    async getNotificationCount(): Promise<number> {
        return $$('.notification').count();
    }

    getNotification(index: number): ElementFinder {
        const notifications = $$('.notification');
        return notifications.get(index);
    }

    async getNotificationTitle(index: number): Promise<string> {
        const notification = this.getNotification(index);
        return notification.$('.notification-title').getText();
    }

    async clickNotificationDismiss(index: number): Promise<void> {
        const notification = this.getNotification(index);
        const dismissButton = notification.$('.dismiss ux-icon');
        return await dismissButton.click();
    }
}
