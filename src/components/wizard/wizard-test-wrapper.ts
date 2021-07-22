import { ComponentFixture } from '@angular/core/testing';

export class WizardTestWrapper<T> {
    nativeElement: HTMLElement;

    protected allStepsSelector = '.wizard-step';
    protected activeStepSelector = '.wizard-step.active';
    protected contentSelector = '.test-step-content';
    protected stepButtonsSelector = '.wizard-footer button';

    constructor(private _fixture: ComponentFixture<T>) {
        this.nativeElement = _fixture.nativeElement;
    }

    isStepVisited(index: number): boolean {
        const stepHeaders = this.getStepHeaders();
        return stepHeaders[index].classList.contains('visited');
    }

    isStepValid(index: number): boolean {
        const stepHeaders = this.getStepHeaders();
        return !stepHeaders[index].classList.contains('invalid');
    }

    getStepHeaders(): HTMLElement[] {
        return Array.from(this.nativeElement.querySelectorAll(this.allStepsSelector));
    }

    getActiveStepHeader(): HTMLElement {
        return this.nativeElement.querySelector(this.activeStepSelector);
    }

    getContentText(): string {
        return this.nativeElement.querySelector<HTMLElement>(this.contentSelector).innerText;
    }

    getStepButtons(): HTMLButtonElement[] {
        return Array.from(this.nativeElement.querySelectorAll(this.stepButtonsSelector));
    }

    getStepButton(buttonText: string): HTMLButtonElement {
        const buttons = this.getStepButtons();
        return buttons.find(button => button.innerText.toUpperCase() === buttonText.toUpperCase());
    }

    async clickStepButton(buttonText: string): Promise<void> {
        const button = this.getStepButton(buttonText);
        if (!button) {
            throw new Error(`Button "${buttonText}" not found`);
        }

        button.click();
        this._fixture.detectChanges();
        return await this._fixture.whenStable();
    }
}
