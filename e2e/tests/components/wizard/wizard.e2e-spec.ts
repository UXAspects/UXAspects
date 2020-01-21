import { ElementFinder } from 'protractor';
import { imageCompare } from '../common/image-compare';
import { WizardPage } from './wizard.po.spec';

describe('Wizard Tests', () => {

    let page: WizardPage;

    beforeEach(async () => {
        page = new WizardPage();
        await page.getPage();
    });

    it('should have correct initial state', async () => {

        // there should initially be four steps
        expect(await page.stepHeaders.count()).toBe(4);

        // there should initially be four steps
        expect(await page.wizard.getAttribute('class')).toContain('horizontal');

        // check that each header contains the correct text
        page.stepHeaders.each(async (step, idx) =>
            expect(await step.getText()).toBe(`Step ${idx + 1}`)
        );

        // check the only the first step is active and visited
        page.stepHeaders.each(async (step, idx) => {

            if (idx === 0) {
                expect(await step.getAttribute('class')).toContain('active');
                expect(await step.getAttribute('class')).toContain('visited');
            } else {
                expect(await step.getAttribute('class')).not.toContain('active');
                expect(await step.getAttribute('class')).not.toContain('visited');
            }
        });

        // only the first one should actually have any content
        page.stepContents.each(async (step, idx) =>
            expect(await step.$$('*').count() > 0).toBe(idx === 0)
        );

        // Initial set of buttons
        let previous = await page.getPreviousButton();
        let next = await page.getNextButton();
        let cancel = await page.getCancelButton();
        let finish = await page.getFinishButton();

        // Previous button exists and is disabled
        expect(previous).not.toBeNull();
        expect(await previous.getAttribute('disabled')).not.toBeNull();

        // Next button exists and not disabled
        expect(next).not.toBeNull();
        expect(await next.getAttribute('disabled')).toBeNull();

        // Cancel button exists
        expect(cancel).not.toBeNull();

        // Finish button not present
        expect(finish).toBeNull();

        expect(await imageCompare('wizard-initial')).toEqual(0);
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

        // check that only the second step is showing its content
        page.stepContents.each(async (step, idx) =>
            expect(await step.$$('*').count()).toBe(idx === 1 ? 1 : 0));

        expect(await imageCompare('wizard-step2')).toEqual(0);
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
            expect(await step.$$('*').count() > 0).toBe(idx === 0));
    });

    it('should disable the next button when the step is invalid and disableNextWhenInvalid = true', async () => {
        // Setting step to be invalid
        await page.step1InvalidButton.click();
        await page.disableNextWhenInvalidButton.click();

        // Checks if next button is disabled
        const next: ElementFinder = await page.getNextButton();
        const attr = await next.getAttribute('disabled');
        expect(attr).not.toBeNull();

        // setting the step to be valid by clicking it a second time
        await page.step1InvalidButton.click();
        let attr2 = await next.getAttribute('disabled');
        expect(attr2).toBeNull();
    });

    it('should disable the finish button when the final step is invalid and disableNextWhenInvalid = true', async () => { 
        // go to last step
        await page.goToNext();
        await page.goToNext();
        await page.goToNext();

        await page.step4InvalidButton.click();
        await page.disableNextWhenInvalidButton.click();

        // Checks if finish button is disabled
        const finish = await page.getFinishButton();
        let attr = await finish.getAttribute('disabled');
        expect(attr).not.toBeNull();

        await page.step4InvalidButton.click();
        let attr2 = await finish.getAttribute('disabled');
        expect(attr2).toBeNull();
    });

    it('should be able to go to the final step', async () => {
        await page.goToNext();
        await page.goToNext();
        await page.goToNext();

        // check that only the last step is showing its content
        page.stepContents.each(async (step, idx) =>
            expect(await step.$$('*').count() > 0).toBe(idx === 3));


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

    it('should update when a step is added and removed', async () => {

        // there should initially be four steps
        expect(await page.stepHeaders.count()).toBe(4);

        // Enable step 5
        await page.addStep5();
        expect(await page.stepHeaders.count()).toBe(5);

        // Go to step 5
        await page.goToNext();
        await page.goToNext();
        await page.goToNext();
        await page.goToNext();

        // check that only the last step is showing its content
        page.stepContents.each(async (step, idx) =>
            expect(await step.$$('*').count() > 0).toBe(idx === 4)
        );

        // the finish button should now be visible
        expect(await page.getFinishButton()).not.toBe(null);

        // the next and cancel button should now be hidden
        expect(await page.getNextButton()).toBe(null);
        expect(await page.getCancelButton()).toBe(null);

        // Go back to step 4
        await page.goToPrevious();

        // the finish button should now be hidden
        expect(await page.getFinishButton()).toBe(null);

        // the next and cancel button should now be visible
        expect(await page.getNextButton()).not.toBe(null);
        expect(await page.getCancelButton()).not.toBe(null);

        // Remove step 5 from the wizard
        await page.removeStep5();

        // Back to four total steps
        expect(await page.stepHeaders.count()).toBe(4);

        // (Still on step 4)
        // the finish button should now be visible
        expect(await page.getFinishButton()).not.toBe(null);

        // the next and cancel button should now be hidden
        expect(await page.getNextButton()).toBe(null);
        expect(await page.getCancelButton()).toBe(null);
    });

    it('should allow a footerTemplate to be added', async () => {

        // check that the reset button is not visible
        expect(page.resetButton.isPresent()).toBeFalsy();

        // enable footerTemplate
        await page.footerTemplateButton.click();

        // check that the reset button is visible
        expect(await page.resetButton.isPresent()).toBeTruthy();
        expect(await page.resetButton.getText()).toBe('RESET STEP 0');

        expect(await imageCompare('wizard-footer-template')).toEqual(0);

        // Change step
        await page.goToNext();

        // Check that the step value has updated
        expect(await page.resetButton.getText()).toBe('RESET STEP 1');
    });


});