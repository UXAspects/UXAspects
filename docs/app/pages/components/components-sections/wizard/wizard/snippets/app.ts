import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  private readonly _announcer = inject(LiveAnnouncer);

  orientation: string = 'horizontal';

  steps: WizardStep[] = [
    {
      header: '1. First Step',
      content: 'Content of step 1.',
    },
    {
      header: '2. Second Step',
      content: 'Content of step 2.',
    },
    {
      header: '3. Third Step',
      content: 'Content of step 3.',
    },
    {
      header: '4. Fourth Step',
      content: 'Content of step 4.',
    },
  ];

  onStepChange(index: number): void {
    this._announcer.announce(`${this.steps[index].header} activated`);
  }
}

export interface WizardStep {
  header: string;
  content: string;
}
