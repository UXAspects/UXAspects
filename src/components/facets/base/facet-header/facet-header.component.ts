import {
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  inject,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';
import { FocusIndicator, FocusIndicatorService } from '../../../../directives/accessibility/index';

@Component({
  selector: 'ux-facet-header',
  templateUrl: './facet-header.component.html',
  host: {
    role: 'button',
    tabindex: '0',
    '(click)': 'toggleExpand()',
    '(keyup.enter)': 'toggleExpand()',
    '[attr.aria-expanded]': 'expanded',
    '[attr.aria-label]': "header + ' Facet: Activate to ' + (expanded ? 'collapse' : 'expand')",
  },
  standalone: false,
})
export class FacetHeaderComponent implements OnDestroy {
  readonly focusIndicatorService = inject(FocusIndicatorService);
  readonly elementRef = inject(ElementRef);

  /** Defines the text to display in the header. */
  @Input() header: string;

  /** Defines whether or not clicking on the header will toggle the expanded state. */
  @Input() canExpand: boolean = true;

  /** Can be used to set the initial expanded state. */
  @Input() @HostBinding('class.expanded') expanded: boolean = true;

  /** If two-way binding is used it will be updated when the expanded state changes. */
  @Output() expandedChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  /** Store Focus Indicator instance */
  private readonly _focusIndicator: FocusIndicator;

  constructor() {
    this._focusIndicator = this.focusIndicatorService.monitor(this.elementRef.nativeElement);
  }

  ngOnDestroy(): void {
    this._focusIndicator.destroy();
  }

  toggleExpand(): void {
    // if not expandable then do nothing
    if (this.canExpand) {
      this.expanded = !this.expanded;
      this.expandedChange.emit(this.expanded);
    }
  }
}
