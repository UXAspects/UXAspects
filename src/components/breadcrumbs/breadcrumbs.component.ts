import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { HasFocusIndicator, HasFocusIndicatorCtor, mixinFocusIndicator, _HasFocusIndicatorInputs } from '../../common/index';

// Boilerplate for applying mixins.
export class BreadcrumbsBase { }

// Add all focus indicator properties to a new base class
export const _BreadcrumbsMixinBase: HasFocusIndicatorCtor & typeof BreadcrumbsBase = mixinFocusIndicator(BreadcrumbsBase);

@Component({
    selector: 'ux-breadcrumbs',
    templateUrl: './breadcrumbs.component.html',
    inputs: [..._HasFocusIndicatorInputs],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BreadcrumbsComponent extends _BreadcrumbsMixinBase implements HasFocusIndicator {

    /** The list of breadcrumbs to display. */
    @Input() crumbs: Breadcrumb[];

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
    queryParams?: any;
    onClick?: (event: MouseEvent) => void;
}