import { browser, Key, ElementFinder } from 'protractor';
import { WizardPage } from './wizard.po.spec';

describe('Wizard Tests', () => {

    let page: WizardPage;

    beforeEach(() => {
        page = new WizardPage();
        page.getPage();
    });

    it('should have correct number of steps', async () => {

        // there should initially be four steps
        expect(await page.stepHeaders.count()).toBe(4);
    });

    it('should have correct orientation by default', async () => {

        // there should initially be four steps
        expect(await page.wizard.getAttribute('class')).toContain('horizontal');
    });

    it('should have steps with the correct titles', async () => {
        // check that each header contains the correct text
        page.stepHeaders.each(async (step, idx) =>
            expect(await step.getText()).toBe(`Step ${idx + 1}`));
    });

    it('should activate the first step by default', () => {

        // check the only the first step is active
        page.stepHeaders.each(async (step, idx) => {

            if (idx === 0) {
                expect(await step.getAttribute('class')).toContain('active');
            } else {
                expect(await step.getAttribute('class')).not.toContain('active');
            }
        });
    });

    it('should only mark the first step as visited', () => {

        // check the only the first step is active
        page.stepHeaders.each(async (step, idx) => {

            if (idx === 0) {
                expect(await step.getAttribute('class')).toContain('visited');
            } else {
                expect(await step.getAttribute('class')).not.toContain('visited');
            }
        });
    });

    it('should only show the content of the first step', async () => {

        // there should be four step contents
        expect(await page.stepContents.count()).toBe(4);

        // only the first one should actually have any content
        page.stepContents.each(async (step, idx) =>
            expect(await step.$$('*').count()).toBe(idx === 0 ? 1 : 0));
    });

    it('should show the correct buttons by default', async () => {
        let previous = await page.getPreviousButton();
        let next = await page.getNextButton();
        let cancel = await page.getCancelButton();
        let finish = await page.getFinishButton();

        expect(previous).not.toBeNull();
        expect(next).not.toBeNull();
        expect(cancel).not.toBeNull();
        expect(finish).toBeNull();
    });

    it('should prevent the user from going back on the first step', async () => {
        let previous: ElementFinder = await page.getPreviousButton();
        let attr = await previous.getAttribute('disabled');
        expect(attr).not.toBeNull();
    });

    it('should allow the user to go next on the first step', async () => {
        let next: ElementFinder = await page.getNextButton();
        let attr = await next.getAttribute('disabled');
        expect(attr).toBeNull();
    });

    it('should navigate to the next page when the next button is clicked', async () => {
        // go to the next step
        await page.goToNext();

        // check that the first header is not still active
        let steps: ElementFinder[] = await page.stepHeaders;

        // check the first step header classes are updated correctly
        expect(await steps[0].getAttribute('class')).toContain('visited');
        expect(await steps[0].getAttribute('class')).not.toContain('active');

        // check the second step classes are correct
        expect(await steps[1].getAttribute('class')).toContain('visited');
        expect(await steps[1].getAttribute('class')).toContain('active');

        // check the content of the wizard is corrent
        let content: ElementFinder[] = await page.stepContents;

        // check that only the second step is showing its content
        page.stepContents.each(async (step, idx) =>
            expect(await step.$$('*').count()).toBe(idx === 1 ? 1 : 0));
    });

    it('should navigate back to the first step if clicking on a visted step header', async () => {
        await page.goToNext();

        let headers: ElementFinder[] = await page.stepHeaders;

        // click on the first header
        await headers[0].click();

        // check the first step header classes are updated correctly
        expect(await headers[0].getAttribute('class')).toContain('visited');
        expect(await headers[0].getAttribute('class')).toContain('active');

        // check the second step classes are correct
        expect(await headers[1].getAttribute('class')).toContain('visited');
        expect(await headers[1].getAttribute('class')).not.toContain('active');

        // check that only the first step is showing its content
        page.stepContents.each(async (step, idx) =>
            expect(await step.$$('*').count()).toBe(idx === 0 ? 1 : 0));
    });

    it('should be able to go to the final step', async () => {
        await page.goToNext();
        await page.goToNext();
        await page.goToNext();

        // check that only the last step is showing its content
        page.stepContents.each(async (step, idx) =>
            expect(await step.$$('*').count()).toBe(idx === 3 ? 1 : 0));

        // check that the finish button is visible
        let finish = await page.getFinishButton();
        let next = await page.getNextButton();
        let cancel = await page.getCancelButton();

        // the finish button should now be visible
        expect(finish).not.toBe(null);

        // the next and cancel button should now be hidden
        expect(next).toBe(null);
        expect(cancel).toBe(null);
    });

});