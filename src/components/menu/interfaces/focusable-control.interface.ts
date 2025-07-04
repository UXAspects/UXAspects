import { FocusableOption } from '@angular/cdk/a11y';

export interface FocusableControl extends FocusableOption {
  setInputTabIndex(tabindex: number): void;
}
