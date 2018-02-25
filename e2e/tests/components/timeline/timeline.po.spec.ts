import { browser, element, by } from 'protractor';

export class TimelinePage {

    getPage(): void {
        browser.get('#/timeline');
    }

    addEvent = element(by.id('button'));
    timeline = element(by.id('timeline'));
    
    getNumberOfEvents() {
        return this.timeline.$('ul.timeline').$$('li').count();
    }
    
    getEvent(index: number) {
        return this.timeline.$('ul.timeline').$$('li').get(index).$('ux-timeline-event');
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
}
