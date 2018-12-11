import { browser, by, element } from 'protractor';

export class TimelinePage {

    getPage(): void {
        browser.get('#/timeline');
    }

    addEvent = element(by.id('button'));
    timeline = element(by.id('timeline'));
    resetBtn = element(by.id('reset-btn'));

    getNumberOfEvents() {
        return this.timeline.$('div.timeline').$$('ux-timeline-event').count();
    }

    getEvent(index: number) {
        return this.timeline.$('div.timeline').$$('ux-timeline-event').get(index);
    }

    getEventBadge(index: number) {
        return this.getEvent(index).$('.timeline-badge');
    }

    getEventPanel(index: number) {
        return this.getEvent(index).$('.timeline-panel');
    }

    getEventBadgeTitle(index: number) {
        return this.getEventBadge(index).getText();
    }

    getEventPanelText(index: number) {
        return this.getEventPanel(index).$('p').getText();
    }

    reset() {
        return this.resetBtn.click();
    }
}
