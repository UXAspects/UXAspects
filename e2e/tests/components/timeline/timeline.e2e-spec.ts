import { TimelinePage } from './timeline.po.spec';

describe('TimelinePage Tests', () => {

    let page: TimelinePage = new TimelinePage();
    page.getPage();

    it('should start with 4 events', async () => {

        // Four events should be visible.
        expect(page.timeline.isPresent()).toBeTruthy();
        expect<any>(page.getNumberOfEvents()).toEqual(4);
        expect(page.addEvent.isPresent()).toBeTruthy();


        await page.reset();
    });

    it('should allow the addition of events', async () => {

        // Create events, checking the number displayed.
        page.addEvent.click();
        page.addEvent.click();
        expect<any>(page.getNumberOfEvents()).toEqual(6);


        await page.reset();
    });

    it('should display the correct information for events', async () => {

        // Check elements of various events.

        const now = Date.now();

        const weekdays: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const months: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const dayInMilliSeconds = 24 * 60 * 60 * 1000;

        // Third event.
        let thirdEvent = new Date(now + (dayInMilliSeconds * 2));
        let dayOfWeek = weekdays[thirdEvent.getDay()];
        let month = months[thirdEvent.getMonth()];
        let day = thirdEvent.getDate();
        let badgeTitle = dayOfWeek + ' ' + month + ' ' + day;
        expect<any>(page.getEventBadgeTitle(1)).toEqual(badgeTitle);

        expect<any>(page.getEventBadge(1).getAttribute('class')).toContain('alternate2');

        // First event.
        expect<any>(page.getEventBadge(3).getAttribute('class')).toContain('primary');

        expect<any>(page.getEventPanelText(3)).toContain('was recorded by');

        // Add a fifth event and check it.
        page.addEvent.click();

        let newEvent = new Date(now + (dayInMilliSeconds * 4));
        dayOfWeek = weekdays[newEvent.getDay()];
        month = months[newEvent.getMonth()];
        day = newEvent.getDate();
        badgeTitle = dayOfWeek + ' ' + month + ' ' + day;
        expect<any>(page.getEventBadgeTitle(0)).toEqual(badgeTitle);

        expect<any>(page.getEventBadge(0).getAttribute('class')).toContain('grey4');

        expect<any>(page.getEventPanelText(0)).toContain('was updated by');

        await page.reset();
    });
});