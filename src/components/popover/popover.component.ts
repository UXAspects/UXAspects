import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { Subject } from 'rxjs';
import { TooltipComponent } from '../tooltip/index';

let uniquePopoverId = 0;

@Component({
  selector: 'ux-popover',
  templateUrl: './popover.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PopoverComponent extends TooltipComponent {

  /** Define a unique id for each popover */
  id: string = `ux-popover-${++uniquePopoverId}`;

  /** If specified allows the popover to show a title */
  title: string;

  /** This will emit an event any time the user clicks outside the popover */
  clickOutside$ = new Subject<MouseEvent>();

  constructor(changeDetectorRef: ChangeDetectorRef) {
    super(changeDetectorRef);
  }

  /** This will update the title of the popover and trigger change detection */
  setTitle(title: string): void {
    this.title = title;
    this._changeDetectorRef.markForCheck();
  }
}