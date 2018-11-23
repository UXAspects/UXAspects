import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, TemplateRef } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { AnchorAlignment, AnchorPlacement } from './tooltip.directive';

let uniqueTooltipId = 0;

@Component({
  selector: 'ux-tooltip',
  templateUrl: './tooltip.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TooltipComponent implements OnDestroy {

  /** Define a unique id for each tooltip */
  id: string = `ux-tooltip-${++uniqueTooltipId}`;

  /** Define the tooltip role */
  role: string = 'tooltip';

  /** The content of the tooltip, either a string or a TemplateRef for further customization */
  content: string | TemplateRef<any>;

  /** Allow the user to supply a context for the tooltip TemplateRef */
  context: any;

  /** The position the tooltip should display relative to the associated element */
  placement: AnchorPlacement;

  /** The position the callout should display relative to the popover element */
  alignment: AnchorAlignment;

  /** Allow a custom class to be added to the tooltip to allow custom styling */
  customClass: string = '';

  /** Indicates whether or not the content is a string or a TemplateRef */
  isTemplateRef: boolean = false;

  /** Emit when the tooltip need to update it's position */
  reposition$ = new Subject<void>();

  constructor(protected _changeDetectorRef: ChangeDetectorRef) {}

  /** Cleanup after the component is destroyed */
  ngOnDestroy(): void {
    this.reposition$.complete();
  }

  /** Inform the parent directive that it needs to recalulate the position */
  reposition(): void {
    this.reposition$.next();
  }

  /** This will update the content of the tooltip and trigger change detection */
  setContent(content: string | TemplateRef<any>): void {
    this.content = content;
    this.isTemplateRef = content instanceof TemplateRef;
    this._changeDetectorRef.markForCheck();
  }

  /** This will update the tooltip placement and trigger change detection */
  setPlacement(placement: AnchorPlacement) {

    if (!placement) {
      return;
    }

    this.placement = placement;
    this._changeDetectorRef.markForCheck();
  }

  /** This will update the tooltip alignment and trigger change detection */
  setAlignment(alignment: AnchorAlignment) {

    if (!alignment) {
      return;
    }

    this.alignment = alignment;
    this._changeDetectorRef.markForCheck();
  }

  /** This will set a custom class on the tooltip and trigger change detection */
  setClass(customClass: string): void {

    if (!customClass) {
      return;
    }

    this.customClass = customClass;
    this._changeDetectorRef.markForCheck();
  }

  /** Updates the context used by the TemplateRef */
  setContext(context: any): void {

    if (!context) {
      return;
    }

    this.context = context;
    this._changeDetectorRef.markForCheck();
  }

  /** Specify the tooltip role attribute */
  setRole(role: string): void {

    if (!role) {
      return;
    }

    this.role = role;
    this._changeDetectorRef.markForCheck();
  }
}