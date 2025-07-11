import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  inject,
  Input,
  Output,
  TemplateRef,
} from '@angular/core';
import { HierarchyBarService } from '../hierarchy-bar.service';
import { HierarchyBarNode } from '../interfaces/hierarchy-bar-node.interface';

@Component({
  selector: 'ux-hierarchy-bar-node',
  templateUrl: './hierarchy-bar-node.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[style.visibility]': 'visible ? "visible" : "hidden"',
  },
  standalone: false,
})
export class HierarchyBarNodeComponent {
  readonly hierarchyBar = inject(HierarchyBarService);
  private readonly _elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

  /** Specify the node data */
  @Input() node: HierarchyBarNode;

  /** Define the template for the popover */
  @Input() popoverTemplate: TemplateRef<void>;

  /** Determine the mode of the hierarchy bar */
  @Input() mode: string;

  /** Determine read only state */
  @Input() readonly: boolean;

  /** Optionally define the horizontal offset */
  @Input() offset: number = 0;

  /** Emit when the node is selected */
  @Output() selected = new EventEmitter<HierarchyBarNode>();

  /** Determine if this node should be hidden due to overflow */
  visible: boolean = true;

  /** Get the width of the element */
  get width(): number {
    return this._elementRef.nativeElement.offsetWidth;
  }
}
