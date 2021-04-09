import { browser, by, element, ElementFinder } from 'protractor';

export class PartitionMapPage {

    async getPage(): Promise<void> {
        await browser.get('#/partition-map');
    }

    container = element(by.id('partition-container'));
    changeDatasetBtn = element(by.id('change-dataset-btn'));

    async getNumberOfSegments() {
        return await this.container.$('ux-partition-map.partition-map').$$('div.partition-map-segment').count();
    }

    async getSegment(index: number) {
        return await this.container.$('ux-partition-map.partition-map').$$('div.partition-map-segment').get(index);
    }

    async getSegmentAttribute(segment: ElementFinder, attribute: string) {
        return await segment.getAttribute(attribute);
    }

    async getSegmentText(index: number) {
        return await this.container.$('ux-partition-map.partition-map').$$('div.partition-map-segment').get(index).$('span.partition-map-segment-label').innerHTML();
    }
}