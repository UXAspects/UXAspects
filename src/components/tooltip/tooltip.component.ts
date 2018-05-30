import { ChangeDetectionStrategy, ChangeDetectorRef, Component, TemplateRef } from '@angular/core';
import { AnchorPlacement } from './tooltip.directive';

let uniqueTooltipId = 0;

@Component({
  selector: 'ux-tooltip',
  templateUrl: './tooltip.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TooltipComponent {

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

  /** Allow a custom class to be added to the tooltip to allow custom styling */
  customClass: string = '';

  /** Indicates whether or not the content is a string or a TemplateRef */
  isTemplateRef: boolean = false;

  constructor(protected _changeDetectorRef: ChangeDetectorRef) {}

  /** This will update the content of the tooltip and trigger change detection */
  setContent(content: string | TemplateRef<any>): void {
    this.content = content;
    this.isTemplateRef = content instanceof TemplateRef;
    this._changeDetectorRef.markForCheck();
  }

  /** This will update the tooltip placement and trigger change detection */
  setPlacement(placement: AnchorPlacement) {
    this.placement = placement;
    this._changeDetectorRef.markForCheck();
  }

  /** This will set a custom class on the tooltip and trigger change detection */
  setClass(customClass: string = ''): void {
    this.customClass = customClass;
    this._changeDetectorRef.markForCheck();
  }

  /** Updates the context used by the TemplateRef */
  setContext(context: any): void {
    this.context = context;
    this._changeDetectorRef.markForCheck();
  }

  /** Specify the tooltip role attribute */
  setRole(role: string): void {
    this.role = role;
    this._changeDetectorRef.markForCheck();
  }
}