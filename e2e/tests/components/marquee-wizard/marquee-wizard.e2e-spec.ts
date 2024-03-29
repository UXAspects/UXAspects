import { browser, ElementFinder, Key } from 'protractor';
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

    it('should have steps with the correct titles', () => {
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
            expect(await step.$$('*').count() > 0).toBe(idx === 0));
    });

    it('should show the correct buttons by default', async () => {
        const previous = await page.getPreviousButton();
        const next = await page.getNextButton();
        const cancel = await page.getCancelButton();
        const finish = await page.getFinishButton();

        expect(previous).not.toBeNull();
        expect(next).not.toBeNull();
        expect(cancel).not.toBeNull();
        expect(finish).toBeNull();
    });

    it('should prevent the user from going back on the first step', async () => {
        const previous: ElementFinder = await page.getPreviousButton();
        const attr = await previous.getAttribute('disabled');
        expect(attr).not.toBeNull();
    });

    it('should allow the user to go next on the first step', async () => {
        const next: ElementFinder = await page.getNextButton();
        const attr = await next.getAttribute('disabled');
        expect(attr).toBeNull();
    });

    it('should disable the next and finish buttons when the step is invalid and disableNextWhenInvalid = true', async () => {
        // Set disableNextWhenInvalid = true
        await page.disableNextWhenInvalidWizardButton.click();

        // Setting step 1 to be invalid
        await page.step1InvalidButton.click();

        // Next button should be disabled
        const next: ElementFinder = await page.getNextButton();
        expect(await next.isEnabled()).toBe(false, 'Step 1 next button should be disabled when invalid');

        // setting the step to be valid by clicking it a second time
        await page.step1InvalidButton.click();
        expect(await next.isEnabled()).toBe(true, 'Step 1 next button should be enabled when valid');

        // go to last step
        await page.goToNext();
        await page.goToNext();
        await page.goToNext();

        // Setting step 4 to be invalid
        await page.step4InvalidButton.click();

        // Checks if finish button is disabled
        const finish: ElementFinder = await page.getFinishButton();
        expect(await finish.isEnabled()).toBe(false, 'Step 4 finish button should be disabled when invalid');

        // Set step 4 to be valid
        await page.step4InvalidButton.click();
        expect(await finish.isEnabled()).toBe(true, 'Step 4 finish button should be enabled when valid');
    });

    it('should not disable the next and finish buttons when the step is invalid and disableNextWhenInvalid = false', async () => {
        // Setting step 1 to be invalid
        await page.step1InvalidButton.click();

        // Next button should not be disabled
        const next: ElementFinder = await page.getNextButton();
        expect(await next.isEnabled()).toBe(true, 'Step 1 next button should be enabled when invalid');

        // setting the step to be valid by clicking it a second time
        await page.step1InvalidButton.click();
        expect(await next.isEnabled()).toBe(true, 'Step 1 next button should be enabled when valid');

        // go to last step
        await page.goToNext();
        await page.goToNext();
        await page.goToNext();

        // Setting step 4 to be invalid
        await page.step4InvalidButton.click();

        // Finish button should not be disabled
        const finish: ElementFinder = await page.getFinishButton();
        expect(await finish.isEnabled()).toBe(true, 'Step 4 finish button should be enabled when invalid');

        // Set step 4 to be valid
        await page.step4InvalidButton.click();
        expect(await finish.isEnabled()).toBe(true, 'Step 4 finish button should be enabled when valid');
    });

    it('should allow disableNextWhenInvalid at the step level to override the wizard input', async () => {
        // Set disableNextWhenInvalid = true on ux-marquee-wizard-step.
        // disableNextWhenInvalid on ux-marquee-wizard remains false
        await page.disableNextWhenInvalidStep1Button.click();

        // Setting step 1 to be invalid
        await page.step1InvalidButton.click();

        // Check the next button is disabled
        const next = await page.getNextButton();
        expect(await next.isEnabled()).toBe(false, 'Step 1 next button should be disabled when invalid');

        // Setting step 1 to be valid
        await page.step1InvalidButton.click();
        expect(await next.isEnabled()).toBe(true, 'Step 1 next button should be enabled when valid');

        // go to last step
        await page.goToNext();
        await page.goToNext();
        await page.goToNext();

        // Setting step 4 to be invalid
        await page.step4InvalidButton.click();

        // Finish button should not be disabled due to not overriding disableNextWhenInvalid
        const finish: ElementFinder = await page.getFinishButton();
        expect(await finish.isEnabled()).toBe(true, 'Step 4 finish button should be enabled when invalid');

        // Set step 4 to be valid
        await page.step4InvalidButton.click();
        expect(await finish.isEnabled()).toBe(true, 'Step 4 finish button should be enabled when valid');
    });

    it('should navigate to the next page when the next button is clicked', async () => {
        // go to the next step
        await page.goToNext();

        // check that the first header is not still active
        const steps: ElementFinder[] = await page.stepHeaders;

        // check the first step header classes are updated correctly
        expect(await steps[0].getAttribute('class')).toContain('visited');
        expect(await steps[0].getAttribute('class')).not.toContain('active');

        // check the second step classes are correct
        expect(await steps[1].getAttribute('class')).toContain('visited');
        expect(await steps[1].getAttribute('class')).toContain('active');

        // check the content of the wizard is correct
        const content: ElementFinder[] = await page.stepContents;

        // check that only the second step is showing its content
        page.stepContents.each(async (step, idx) =>
            expect(await step.$$('*').count() > 0).toBe(idx === 1));
        expect(await imageCompare('marquee-wizard-next-page')).toEqual(0);
    });

    it('should navigate back to the first step if clicking on a visited step header', async () => {
        await page.goToNext();

        const headers: ElementFinder[] = await page.stepHeaders;

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

        expect(await imageCompare('marquee-wizard-visited-header')).toEqual(0);
    });

    it('should be able to go to the final step', async () => {
        await page.goToNext();
        await page.goToNext();
        await page.goToNext();

        // check that only the last step is showing its content
        page.stepContents.each(async (step, idx) =>
            expect(await step.$$('*').count() > 0).toBe(idx === 3));

        // check that the finish button is visible
        const finish = await page.getFinishButton();
        const next = await page.getNextButton();
        const cancel = await page.getCancelButton();

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
        expect(await page.resetButton.getText()).toContain('0');

        expect(await imageCompare('marquee-wizard-footer-template')).toEqual(0);

        // Change step
        await page.goToNext();

        // Check that the step value has updated
        expect(await page.resetButton.getText()).toContain('1');
    });

    it('should allow tabbing to the first step when using the keyboard', async () => {

        // tab to first item on list
        await browser.actions().sendKeys(Key.TAB).perform();

        expect(await page.activeElementAttr('id')).toBe('ux-wizard-0-step-0-label');
    });

    it('should allow tabbing to the first step and moving focus with the arrow keys when using the keyboard', async () => {

        // move to next button and skip to 4th step
        await browser.actions().click(await page.getNextButton()).perform();

        // tab on to steps
        await browser.actions().sendKeys(Key.chord(Key.SHIFT, Key.TAB)).perform();
        expect(await page.activeElementAttr('aria-label')).toBe('Go to the previous step');
        await browser.actions().sendKeys(Key.chord(Key.SHIFT, Key.TAB)).perform();
        expect(await page.activeElementAttr('id')).toBe('step2Invalid-input');
        await browser.actions().sendKeys(Key.chord(Key.SHIFT, Key.TAB)).perform();

        // expect step 2 focused
        expect(await page.activeElementAttr('id')).toBe('ux-wizard-0-step-0-label');

        // move focus up
        await browser.actions().sendKeys(Key.ARROW_UP).perform();

        // expect step 1 focused
        expect(await page.activeElementAttr('id')).toBe('ux-wizard-0-step-1-label');
    });

    it('should show a close icon when the step is invalid', async () => {

        // Setting step 1 to be invalid
        await page.step1InvalidButton.click();

        expect(await imageCompare('marquee-wizard-step-invalid')).toEqual(0);
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

        expect(valuenow).toContain('25');
        expect(valuemin).toContain('0');
        expect(valuemax).toContain('100');

        // move to start
        await page.mouseMoveLeft();

        valuenow = await page.getGutterAriaValue();
        valuemin = await page.getGutterAriaValueMin();
        valuemax = await page.getGutterAriaValueMax();

        expect(valuenow).toContain('24');
        expect(valuemin).toContain('0');
        expect(valuemax).toContain('100');

        // move to start
       await page.mouseMoveRight();

        valuenow = await page.getGutterAriaValue();
        valuemin = await page.getGutterAriaValueMin();
        valuemax = await page.getGutterAriaValueMax();

        expect(valuenow).toContain('25');
        expect(valuemin).toContain('0');
        expect(valuemax).toContain('100');

        expect(await imageCompare('marquee-wizard-mouse')).toEqual(0);
    });

    it('Side panel can be resized using the keyboard when [resizable]="true"', async () => {
        // enable resizable
        await page.resizeableButton.click();

        // get initial values
        let valuenow = await page.getGutterAriaValue();
        let valuemin = await page.getGutterAriaValueMin();
        let valuemax = await page.getGutterAriaValueMax();

        expect(valuenow).toContain('25');
        expect(valuemin).toContain('0');
        expect(valuemax).toContain('100');

        // focus the gutter
        await page.setGutterFocused();

        // press the up key
        await page.sendUpKey();

        valuenow = await page.getGutterAriaValue();
        valuemin = await page.getGutterAriaValueMin();
        valuemax = await page.getGutterAriaValueMax();

        expect(valuenow).toContain('24');
        expect(valuemin).toContain('0');
        expect(valuemax).toContain('100');

        // press the down key
        await page.sendDownKey();

        valuenow = await page.getGutterAriaValue();
        valuemin = await page.getGutterAriaValueMin();
        valuemax = await page.getGutterAriaValueMax();

        expect(valuenow).toContain('25');
        expect(valuemin).toContain('0');
        expect(valuemax).toContain('100');

        // press the left key
        await page.sendLeftKey();

        valuenow = await page.getGutterAriaValue();
        valuemin = await page.getGutterAriaValueMin();
        valuemax = await page.getGutterAriaValueMax();

        expect(valuenow).toContain('18');
        expect(valuemin).toContain('0');
        expect(valuemax).toContain('100');

        // press the right key
        await page.sendRightKey();

        valuenow = await page.getGutterAriaValue();
        valuemin = await page.getGutterAriaValueMin();
        valuemax = await page.getGutterAriaValueMax();

        expect(valuenow).toContain('25');
        expect(valuemin).toContain('0');
        expect(valuemax).toContain('100');

        // press the home key
        await page.sendHomeKey();

        valuenow = await page.getGutterAriaValue();
        valuemin = await page.getGutterAriaValueMin();
        valuemax = await page.getGutterAriaValueMax();

        expect(valuenow).toContain('0');
        expect(valuemin).toContain('0');
        expect(valuemax).toContain('100');

        // press the end key
        await page.sendEndKey();

        valuenow = await page.getGutterAriaValue();
        valuemin = await page.getGutterAriaValueMin();
        valuemax = await page.getGutterAriaValueMax();

        expect(valuenow).toContain('100');
        expect(valuemin).toContain('0');
        expect(valuemax).toContain('100');

        // move to start
        await page.sendHomeKey();

        valuenow = await page.getGutterAriaValue();
        expect(valuenow).toContain('0');

        // press the left key
        await page.sendLeftKey();

        valuenow = await page.getGutterAriaValue();
        valuemin = await page.getGutterAriaValueMin();
        valuemax = await page.getGutterAriaValueMax();

        expect(valuenow).toContain('0');
        expect(valuemin).toContain('0');
        expect(valuemax).toContain('100');

        // move to end
        await page.sendEndKey();

        valuenow = await page.getGutterAriaValue();
        expect(valuenow).toContain('100');

        // press the right key
        await page.sendRightKey();

        valuenow = await page.getGutterAriaValue();
        valuemin = await page.getGutterAriaValueMin();
        valuemax = await page.getGutterAriaValueMax();

        expect(valuenow).toContain('100');
        expect(valuemin).toContain('0');
        expect(valuemax).toContain('100');

        expect(await imageCompare('marquee-wizard-keyboard')).toEqual(0);

    });

    it('Side panel can be initialized with a provided width', async () => {
        // enable resizable
        await page.resizeableButton.click();

        // check the input fields value
        const inputValue = await page.getInputField();

        expect(inputValue).toContain('25');

        // updating the input value for the side panel width
        await page.input.click();
        await page.input.clear();
        await page.input.click();
        await page.input.sendKeys('35');

        const inputValue2 = await page.getInputField();

        expect(inputValue2).toContain('35');

        // check emitted value from the output
        expect(await page.emittedWidth.getText()).toBe('35.0');

        expect(await imageCompare('marquee-wizard-width')).toEqual(0);
    });
});
