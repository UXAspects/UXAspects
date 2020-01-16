import { ElementFinder } from 'protractor';
import { imageCompare } from '../common/image-compare';
import { MarqueeWizardPage } from './marquee-wizard.po.spec';

describe('Marquee Wizard Tests', () => {

    let page: MarqueeWizardPage;

    beforeEach(async () => {
        page = new MarqueeWizardPage();
        await page.getPage();
    });

    it('should have correct number of steps', async () => {

        // there should initially be four steps
        expect(await page.stepHeaders.count()).toBe(4);

        expect(await imageCompare('marquee-wizard-initial')).toEqual(0);
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

    it('should disable the next button when the validation true', async () => {
        // enable validation
        await page.stepInvalidButton.click();
        await page.nextInvalidButton.click();

        let next: ElementFinder = await page.getNextButton();
        let attr = await next.getAttribute('disabled');
        expect(attr).not.toBeNull();
    });

    it('should not go to next step when the validation true', async () => {
        // enable validation
        await page.stepInvalidButton.click();

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

        // check the content of the wizard is correct
        let content: ElementFinder[] = await page.stepContents;

        // check that only the second step is showing its content
        page.stepContents.each(async (step, idx) =>
            expect(await step.$$('*').count()).toBe(idx === 1 ? 1 : 0));

       expect(await imageCompare('marquee-wizard-next-page')).toEqual(0);
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

        expect(await imageCompare('marquee-wizard-visited-header')).toEqual(0);
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

        expect(await imageCompare('marquee-wizard-final-step')).toEqual(0);
    });

    it('should allow a footerTemplate to be added', async () => {

        // check that the reset button is not visible
        expect(page.resetButton.isPresent()).toBeFalsy();

        // enable footerTemplate
        await page.footerTemplateButton.click();

        // check that the reset button is visible
        expect(await page.resetButton.isPresent()).toBeTruthy();
        expect(await page.resetButton.getText()).toBe('RESET STEP 0');

        expect(await imageCompare('marquee-wizard-footer-template')).toEqual(0);

        // Change step
        await page.goToNext();

        // Check that the step value has updated
        expect(await page.resetButton.getText()).toBe('RESET STEP 1');
    });


    /**
     * Resizable Marquee Wizard Tests
     */

    it('Side panel can be resized using the mouse when [resizable]="true"', async () => {
        // enable resizable
        await page.resizeableButton.click();

        // get initial values
        let valuenow = await page.getGutterAriaValue();
        let valuemin = await page.getGutterAriaValueMin();
        let valuemax = await page.getGutterAriaValueMax();

        expect(valuenow).toBe('25');
        expect(valuemin).toBe('0');
        expect(valuemax).toBe('100');

        // move to start
        await page.mouseMoveLeft();

        valuenow = await page.getGutterAriaValue();
        valuemin = await page.getGutterAriaValueMin();
        valuemax = await page.getGutterAriaValueMax();

        expect(valuenow).toBe('24');
        expect(valuemin).toBe('0');
        expect(valuemax).toBe('100');

        // move to start
        await page.mouseMoveRight();

        valuenow = await page.getGutterAriaValue();
        valuemin = await page.getGutterAriaValueMin();
        valuemax = await page.getGutterAriaValueMax();

        expect(valuenow).toBe('25');
        expect(valuemin).toBe('0');
        expect(valuemax).toBe('100');

        expect(await imageCompare('marquee-wizard-mouse')).toEqual(0);
    });

    it('Side panel can be resized using the keyboard when [resizable]="true"', async () => {
        // enable resizable
        await page.resizeableButton.click();

        // get initial values
        let valuenow = await page.getGutterAriaValue();
        let valuemin = await page.getGutterAriaValueMin();
        let valuemax = await page.getGutterAriaValueMax();

        expect(valuenow).toBe('25');
        expect(valuemin).toBe('0');
        expect(valuemax).toBe('100');

        // focus the gutter
        await page.setGutterFocused();

        // press the left key
        await page.sendLeftKey();

        valuenow = await page.getGutterAriaValue();
        valuemin = await page.getGutterAriaValueMin();
        valuemax = await page.getGutterAriaValueMax();

        expect(valuenow).toBe('24');
        expect(valuemin).toBe('0');
        expect(valuemax).toBe('100');

        // press the right key
        await page.sendRightKey();

        valuenow = await page.getGutterAriaValue();
        valuemin = await page.getGutterAriaValueMin();
        valuemax = await page.getGutterAriaValueMax();

        expect(valuenow).toBe('25');
        expect(valuemin).toBe('0');
        expect(valuemax).toBe('100');

        // press the home key
        await page.sendHomeKey();

        valuenow = await page.getGutterAriaValue();
        valuemin = await page.getGutterAriaValueMin();
        valuemax = await page.getGutterAriaValueMax();

        expect(valuenow).toBe('0');
        expect(valuemin).toBe('0');
        expect(valuemax).toBe('100');

        // press the end key
        await page.sendEndKey();

        valuenow = await page.getGutterAriaValue();
        valuemin = await page.getGutterAriaValueMin();
        valuemax = await page.getGutterAriaValueMax();

        expect(valuenow).toBe('100');
        expect(valuemin).toBe('0');
        expect(valuemax).toBe('100');

        // move to start
        await page.sendHomeKey();

        valuenow = await page.getGutterAriaValue();
        expect(valuenow).toBe('0');

        // press the left key
        await page.sendLeftKey();

        valuenow = await page.getGutterAriaValue();
        valuemin = await page.getGutterAriaValueMin();
        valuemax = await page.getGutterAriaValueMax();

        expect(valuenow).toBe('0');
        expect(valuemin).toBe('0');
        expect(valuemax).toBe('100');

        // move to end
        await page.sendEndKey();

        valuenow = await page.getGutterAriaValue();
        expect(valuenow).toBe('100');

        // press the right key
        await page.sendRightKey();

        valuenow = await page.getGutterAriaValue();
        valuemin = await page.getGutterAriaValueMin();
        valuemax = await page.getGutterAriaValueMax();

        expect(valuenow).toBe('100');
        expect(valuemin).toBe('0');
        expect(valuemax).toBe('100');

        expect(await imageCompare('marquee-wizard-keyboard')).toEqual(0);

    });

    it('Side panel can be initialized with a provided width', async () => {
        // enable resizable
        await page.resizeableButton.click();

        // check the input fields value
        const inputValue = await page.getInputField();

        expect(inputValue).toBe('25');

        // updating the input value for the side panel width
        await page.input.click();
        await page.input.clear();
        await page.input.click();
        await page.input.sendKeys('35');

        const inputValue2 = await page.getInputField();

        expect(inputValue2).toBe('35');

        // check emitted value from the output
        expect(await page.emittedWidth.getText()).toBe('35.0');

        expect(await imageCompare('marquee-wizard-width')).toEqual(0);
    });
});