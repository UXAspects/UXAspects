import { imageCompare } from '../common/image-compare';
import { NotificationPage } from './notification.po.spec';

describe('Notification', () => {
  const page = new NotificationPage();

  beforeEach(async () => {
    await page.getPage();
  });

  it('should stack notifications when showing and hiding', async () => {
    await page.showNotificationButton.click();

    expect(await page.getNotificationCount()).toBe(1, 'notification count after first click');
    expect(await page.getNotificationTitle(0)).toBe(
      'MESSAGE 0',
      'notification 0 title after first click'
    );

    await page.showNotificationButton.click();

    expect(await page.getNotificationCount()).toBe(2, 'notification count after second click');
    expect(await page.getNotificationTitle(0)).toBe(
      'MESSAGE 1',
      'notification 0 title after second click'
    );
    expect(await page.getNotificationTitle(1)).toBe(
      'MESSAGE 0',
      'notification 1 title after second click'
    );

    await page.showNotificationButton.click();

    expect(await page.getNotificationCount()).toBe(3, 'notification count after third click');
    expect(await page.getNotificationTitle(0)).toBe(
      'MESSAGE 2',
      'notification 0 title after third click'
    );
    expect(await page.getNotificationTitle(1)).toBe(
      'MESSAGE 1',
      'notification 1 title after third click'
    );
    expect(await page.getNotificationTitle(2)).toBe(
      'MESSAGE 0',
      'notification 1 title after third click'
    );

    await page.clickNotificationDismiss(1);

    expect(await page.getNotificationCount()).toBe(2, 'notification count after dismiss');
    expect(await page.getNotificationTitle(0)).toBe(
      'MESSAGE 2',
      'notification 0 title after dismiss'
    );
    expect(await page.getNotificationTitle(1)).toBe(
      'MESSAGE 0',
      'notification 1 title after dismiss'
    );

    expect(await imageCompare('notification-stacked')).toBe(0);
  });

  it('should stack notifications from the bottom when direction = below', async () => {
    await page.directionBelowButton.click();

    await page.showNotificationButton.click();
    await page.showNotificationButton.click();

    expect(await page.getNotificationCount()).toBe(2, 'notification count after second click');
    expect(await page.getNotificationTitle(0)).toBe(
      'MESSAGE 0',
      'notification 0 title after second click'
    );
    expect(await page.getNotificationTitle(1)).toBe(
      'MESSAGE 1',
      'notification 1 title after second click'
    );

    expect(await imageCompare('notification-direction-below')).toBe(0);
  });

  it('should display notifications in the configured screen position', async () => {
    await page.showNotificationButton.click();

    expect(await imageCompare('notification-position-top-right')).toBe(0);

    await page.dismissAllButton.click();
    await page.positionBottomLeftButton.click();
    await page.showNotificationButton.click();

    expect(await imageCompare('notification-position-bottom-left')).toBe(0);

    await page.dismissAllButton.click();
    await page.positionBottomRightButton.click();
    await page.showNotificationButton.click();

    expect(await imageCompare('notification-position-bottom-right')).toBe(0);

    await page.dismissAllButton.click();
    await page.positionTopLeftButton.click();
    await page.showNotificationButton.click();

    expect(await imageCompare('notification-position-top-left')).toBe(0);
  });

  it('should adjust the margin between notifications when the spacing setting is used', async () => {
    await page.showNotificationWithSpacingButton.click();
    await page.showNotificationWithSpacingButton.click();

    const notification0Bottom = await page.getNotificationBottomPosition(0);
    const notification1Top = await page.getNotificationTopPosition(1);
    expect(notification1Top - notification0Bottom).toBe(42);
  });
});
