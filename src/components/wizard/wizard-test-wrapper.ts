///
/// Copyright 2015-2026 Micro Focus or one of its affiliates.
///
/// Licensed under the Apache License, Version 2.0 (the "License");
/// you may not use this file except in compliance with the License.
/// You may obtain a copy of the License at
///
///      http://www.apache.org/licenses/LICENSE-2.0
///
/// Unless required by applicable law or agreed to in writing, software
/// distributed under the License is distributed on an "AS IS" BASIS,
/// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
/// See the License for the specific language governing permissions and
/// limitations under the License.
///

import { ComponentFixture } from '@angular/core/testing';

export class WizardTestWrapper<T> {
  nativeElement: HTMLElement;

  protected allStepsSelector = '.wizard-step';
  protected activeStepSelector = '.wizard-step.active';
  protected contentSelector = '.test-step-content';
  protected stepButtonsSelector = '.wizard-footer button';

  constructor(private readonly _fixture: ComponentFixture<T>) {
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
