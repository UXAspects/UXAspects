import { AfterViewInit, ChangeDetectionStrategy, Component } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { TooltipComponent } from '../tooltip/index';

let uniquePopoverId = 0;

@Component({
  selector: 'ux-popover',
  templateUrl: './popover.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PopoverComponent extends TooltipComponent implements AfterViewInit {

  /** Define a unique id for each popover */
  id: string = `ux-popover-${++uniquePopoverId}`;

  /** If specified allows the popover to show a title */
  title: string;

  /** This will emit an event any time the user clicks outside the popover */
  clickOutside$ = new Subject<MouseEvent>();

  /** Determine when the component is properly initialized so we don't emit events too early */
  private _isInitialized: boolean = false;

  /** Indicate the component is now fully initialised */
  ngAfterViewInit(): void {
    setTimeout(() => this._isInitialized = true);
  }

  /** Emit the outside click event - ensure it is only triggered after component is fully open */
  triggerClickOutside(event: MouseEvent): void {
    if (this._isInitialized) {
      this.clickOutside$.next(event);
    }
  }

  /** This will update the title of the popover and trigger change detection */
  setTitle(title: string): void {
    this.title = title;
    this._changeDetectorRef.markForCheck();
  }
}