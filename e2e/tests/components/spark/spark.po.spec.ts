import { $, browser, ElementArrayFinder, ElementFinder } from 'protractor';

export class SparkPage {

    singleValueChart = $('#single-value');
    multiValueChart = $('#multi-value');

    async getPage(): Promise<void> {
        await browser.get('#/spark');
    }

    getSegments(chart: ElementFinder): ElementArrayFinder {
        return chart.$$('.ux-spark-bar');
    }

    async getSparkHeight(chart: ElementFinder): Promise<string> {
        return await chart.$('.ux-spark').getCssValue('height');
    }

    async getSegmentWidth(segment: ElementFinder): Promise<number> {
        return parseInt(await segment.getCssValue('width'));
    }

    async getTheme(chart: ElementFinder): Promise<string> {
        const element = chart.$('.ux-spark');
        const classes = await element.getAttribute('class');

        return classes.split(' ').find(className => className.trim().indexOf('ux-spark-theme') === 0);
    }

    async getTopLeftLabel(chart: ElementFinder): Promise<string> {
        try {
            return await chart.$('.ux-spark-label-top-left').getText();
        } catch (err) {
            return null;
        }
    }

    async getTopRightLabel(chart: ElementFinder): Promise<string> {
        try {
            return await chart.$('.ux-spark-label-top-right').getText();
        } catch (err) {
            return null;
        }
    }

    async getBottomLeftLabel(chart: ElementFinder): Promise<string> {
        try {
            return await chart.$('.ux-spark-label-bottom-left').getText();
        } catch (err) {
            return null;
        }
    }

    async getBottomRightLabel(chart: ElementFinder): Promise<string> {
        try {
            return await chart.$('.ux-spark-label-bottom-right').getText();
        } catch (err) {
            return null;
        }
    }

    async getAriaLabel(chart: ElementFinder): Promise<string> {
        return await chart.$('.ux-spark').getAttribute('aria-label');
    }

    async getSegmentAriaLabels(chart: ElementFinder): Promise<string[]> {
        const segments = await this.getSegments(chart);
        const labels: string[] = [];

        for (let idx = 0; idx < segments.length; idx++) {
            const label = await segments[idx].getAttribute('aria-label');

            if (label) {
                labels.push(label);
            }
        }

        return labels;
    }
}