import { imageCompare } from '../common/image-compare';
import { TimelinePage } from './timeline.po.spec';

describe('TimelinePage Tests', () => {

    let page: TimelinePage = new TimelinePage();

    beforeAll(async () => {
        await page.getPage();
    });

    it('should start with 4 events', async () => {

        // Four events should be visible.
        expect(await page.timeline.isPresent()).toBeTruthy();
        expect(await page.getNumberOfEvents()).toEqual(4);
        expect(await page.addEvent.isPresent()).toBeTruthy();

        expect(await imageCompare('timeline-initial')).toEqual(0);

        await page.reset();
    });

    it('should allow the addition of events', async () => {

        // Create events, checking the number displayed.
        await page.addEvent.click();
        await page.addEvent.click();
        expect(await page.getNumberOfEvents()).toEqual(6);

        await page.reset();
    });

    it('should display the correct information for events', async () => {

        expect(await page.getEventBadgeTitle(1)).toEqual('Mon Oct 14');

        expect(await page.getEventBadge(1).getAttribute('class')).toContain('alternate2');

        // First event.
        expect(await page.getEventBadge(3).getAttribute('class')).toContain('primary');

        expect(await page.getEventPanelText(3)).toContain('was recorded by');

        // Add a fifth event and check it.
        await page.addEvent.click();

        expect(await page.getEventBadgeTitle(0)).toEqual('Wed Oct 16');

        expect(await page.getEventBadge(0).getAttribute('class')).toContain('grey4');

        expect(await page.getEventPanelText(0)).toContain('was updated by');

        await page.reset();
    });
});