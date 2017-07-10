import { Directive, ContentChildren, QueryList, HostListener } from '@angular/core';
import { HoverActionDirective } from './hover-action.directive';
import { HoverActionService } from './hover-action.service';

@Directive({
    selector: '[uxHoverActionContainer]',
    providers: [HoverActionService]
})
export class HoverActionContainerDirective {

    @ContentChildren(HoverActionDirective) hoverActions: QueryList<HoverActionDirective>;

    @HostListener('focus') focus(): void {
        this.hoverActions.forEach(action => action.active = true);
    }

    @HostListener('blur') blur(): void {
        this.hoverActions.forEach(action => action.active = false);
    }

    @HostListener('mouseenter') hover(): void {
        this.hoverActions.forEach(action => action.hovered = true);
    }

    @HostListener('mouseleave') leave(): void {
        this.hoverActions.forEach(action => action.hovered = false);
    }
}