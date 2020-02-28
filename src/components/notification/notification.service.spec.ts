import { NotificationService } from './notification.service';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';

fdescribe('Notification Service', () => {
    let notificationService: NotificationService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [NotificationService]
        });
        notificationService = TestBed.get(NotificationService);
    });

    it('should have the correct initial values', () => {
        expect(notificationService).toBeTruthy();
        expect(notificationService.direction).toBe('above');
        expect(notificationService.notifications).toEqual([]);
        expect(notificationService.getHistory()).toEqual([]);
    });

    it('should show notification and add it to notification history', () => {
        notificationService.show(null);
        expect(notificationService.notifications.length).toBe(1);
        expect(notificationService.getHistory().length).toBe(1);
    });

    it('should dismiss a notification after the default duration', fakeAsync(() => {
        notificationService.show(null);
        expect(notificationService.notifications[0].visible).toBeTruthy();
        tick(4000);
        expect(notificationService.notifications[0].visible).toBeFalsy();
    }));

    it('should dismiss a notification after the custom duration', fakeAsync(() => {
        notificationService.show(null, { duration: 2 });
        expect(notificationService.notifications[0].visible).toBeTruthy();
        tick(2000);
        expect(notificationService.notifications[0].visible).toBeFalsy();
    }));

    it('should allow a notification to be dismissed', () => {
        const ref = notificationService.show(null);
        expect(notificationService.notifications[0].visible).toBeTruthy();
        notificationService.dismiss(ref);
        expect(notificationService.notifications[0].visible).toBeFalsy();
    });

    it('should allow all notifications to be dismissed', () => {
        notificationService.show(null);
        notificationService.show(null);

        expect(notificationService.notifications[0].visible).toBeTruthy();
        expect(notificationService.notifications[1].visible).toBeTruthy();
        notificationService.dismissAll();

        expect(notificationService.notifications[0].visible).toBeFalsy();
        expect(notificationService.notifications[1].visible).toBeFalsy();
    });

    it('should allow a notification to be removed', () => {
        const refOne = notificationService.show(null);
        const refTwo = notificationService.show(null);
        expect(notificationService.notifications.length).toBe(2);
        notificationService.remove(refOne);
        expect(notificationService.notifications).toEqual([refTwo]);
    });

    it('should allow all notifications to be removed', () => {
        notificationService.show(null);
        notificationService.show(null);
        expect(notificationService.notifications.length).toBe(2);
        notificationService.removeAll();
        expect(notificationService.notifications.length).toBe(0);
    });
});