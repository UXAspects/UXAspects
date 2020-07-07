import { $$, browser, by, element, ElementFinder } from 'protractor';

export class NotificationPage {
    showNotificationButton = element(by.id('show-notification'));
    showNotificationWithSpacingButton = element(by.id('show-notification-spacing'));
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
        // Normalize case due to use of text-transform in the stylesheet
        return (await notification.$('.notification-title').getText()).toUpperCase();
    }

    async clickNotificationDismiss(index: number): Promise<void> {
        const notification = this.getNotification(index);
        const dismissButton = notification.$('.dismiss ux-icon');
        return await dismissButton.click();
    }

    async getNotificationTopPosition(index: number): Promise<number> {
        const notification = this.getNotification(index);
        const location = await notification.getLocation();
        return location.y;
    }

    async getNotificationBottomPosition(index: number): Promise<number> {
        const notification = this.getNotification(index);
        const location = await notification.getLocation();
        const size = await notification.getSize();
        return location.y + size.height;
    }
}
