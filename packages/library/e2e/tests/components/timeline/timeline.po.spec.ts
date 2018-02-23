import { browser, element, by } from 'protractor';

export class TimelinePage {

    getPage(): void {
        browser.get('#/timeline');
    }

    addEvent = element(by.id('button'));
    timeline = element(by.id('timeline'));
    
    getNumberOfEvents() {
        return this.timeline.$('ul.timeline').$$('ux-timeline-event').count();
    }
    
    getEvent(index: number) {
        return this.timeline.$('ul.timeline').$$('ux-timeline-event').get(index);
    }    

    getEventBadge(index: number) {
        return this.getEvent(index).$('li').$('.timeline-badge');
    }

    getEventPanel(index: number) {
        return this.getEvent(index).$('li').$('.timeline-panel');
    }

    getEventBadgeTitle(index: number) {
        return this.getEventBadge(index).getText();
    }

    getEventTimestamp(index: number) {
        return this.getEventPanel(index).$('div').$('span > span').getText();
    }

    getEventPanelText(index: number) {
        return this.getEventPanel(index).$('p').getText();
    }
}
