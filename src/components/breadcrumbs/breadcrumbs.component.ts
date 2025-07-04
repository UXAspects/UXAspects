import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'ux-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class BreadcrumbsComponent {
  /** The list of breadcrumbs to display. */
  @Input() crumbs: ReadonlyArray<Breadcrumb>;

  clickCrumb(event: MouseEvent, crumb: Breadcrumb) {
    if (crumb.onClick) {
      crumb.onClick.call(null, event);
    }
  }
}

export interface Breadcrumb {
  title: string;
  routerLink?: string;
  fragment?: string;
  queryParams?: unknown;
  onClick?: (event: MouseEvent) => void;
}
