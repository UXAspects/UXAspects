///
/// Copyright 2015-2026 Micro Focus or one of its affiliates.
///
/// Licensed under the Apache License, Version 2.0 (the "License");
/// you may not use this file except in compliance with the License.
/// You may obtain a copy of the License at
///
///      http://www.apache.org/licenses/LICENSE-2.0
///
/// Unless required by applicable law or agreed to in writing, software
/// distributed under the License is distributed on an "AS IS" BASIS,
/// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
/// See the License for the specific language governing permissions and
/// limitations under the License.
///

import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ColorServiceModule, colorSets } from '../../services/color';
import { NotificationService } from './notification.service';

describe('Notification Service', () => {
  let notificationService: NotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ColorServiceModule.forRoot(colorSets.keppel)],
      providers: [NotificationService],
    });
    notificationService = TestBed.inject(NotificationService);
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
